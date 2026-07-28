"""The LangGraph control plane.

WHY A GRAPH AND NOT A CHAIN. The plain pipeline in `pipeline.py` is a one-pass
DAG: retrieve, then generate. It has no way to notice that retrieval failed and
try again. That is exactly what LangGraph buys -- it is a state machine, so it
supports CYCLES: grade the context, and if it is weak, rewrite the query and go
back to retrieve. Act, observe, decide, act again.

THE GRAPH

    START -> authorize -> retrieve -> grade
                 |                      |
                 |            (weak, tries<2)  -> rewrite -> retrieve   [CYCLE]
                 |                      |
                 |            (weak, tries>=2) -> escalate -> END       [HITL]
                 |                      |
                 |                  (good) -> generate -> END
                 |
              (no authorised chunks at all) -> deny -> END

FOUR THINGS IN HERE ARE DELIBERATE INTERVIEW SURFACE:

1. REDUCER. `attempts` uses `Annotated[list, operator.add]` so each pass APPENDS
   its trace instead of clobbering it. With the default reducer (replace) the
   history of the earlier attempts silently vanishes -- no error, just missing
   data. That silent case is the one that reaches production.

2. BOUNDED CYCLE. `max_attempts` in state, checked by the router. An unbounded
   agent loop is how you get a GraphRecursionError in dev and a runaway bill in
   prod. Always bound the loop.

3. CHECKPOINTER + thread_id. State is persisted after every super-step, keyed by
   thread. That is what makes the escalation resumable: the graph interrupts,
   a human approves, and we resume from the exact saved state rather than
   re-running from the top.

4. SIDE EFFECT AFTER THE INTERRUPT. On resume, LangGraph re-runs the interrupted
   node FROM THE TOP. So anything with a side effect -- writing an audit record,
   sending a mail, charging a card -- must sit AFTER the interrupt call or be
   idempotent, or it fires twice for one approval. The audit write below is
   placed after the interrupt on purpose, and it is keyed by thread_id so a
   replay is a no-op.

This is the IAM approval workflow, ported: default-deny, an approval gate on the
privileged path, and an audit record of who approved what.
"""

from __future__ import annotations

import operator
from typing import Annotated, Any, TypedDict

from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, START, StateGraph
from langgraph.types import Command, interrupt

from .config import DEFAULT, Config
from .embedding import get_embedder
from .generate import ABSTAIN, generate
from .index import load_index
from .principals import get_principal
from .retrieve import Hit, retrieve

# Module-level audit log so a replay is visibly a no-op (idempotency demo).
AUDIT_LOG: dict[str, dict] = {}


class RagState(TypedDict, total=False):
    question: str
    principal_id: str
    query: str                                   # possibly rewritten
    n_authorised: int
    # Plain dicts, not Hit objects. State crosses a serialisation boundary every
    # super-step (the checkpointer msgpacks it), so anything in state must be a
    # primitive. Putting a dataclass in here works in memory and breaks the day
    # you swap MemorySaver for the SQLite or Postgres checkpointer.
    hits: list[dict]                             # replaced each retrieval (correct here)
    attempts: Annotated[list[dict], operator.add]  # APPENDED -- the reducer
    max_attempts: int
    top_score: float
    answer: str
    citations: list[str]
    route: str
    escalation: dict


def _cfg_index_embedder(cfg: Config):
    return load_index(cfg), get_embedder(cfg)


def build_graph(cfg: Config = DEFAULT, checkpointer=None):
    index, embedder = _cfg_index_embedder(cfg)

    # ---------------- nodes ----------------

    def authorize(state: RagState) -> dict:
        """Default-deny gate. Runs before any retrieval touches a vector."""
        principal = get_principal(state["principal_id"])
        n = int(index.acl_mask(principal).sum())
        return {
            "n_authorised": n,
            "query": state.get("query") or state["question"],
            "max_attempts": state.get("max_attempts", 2),
            "route": "deny" if n == 0 else "retrieve",
        }

    def retrieve_node(state: RagState) -> dict:
        principal = get_principal(state["principal_id"])
        res = retrieve(index, state["query"], principal, cfg, embedder)
        top = res.hits[0].score if res.hits else 0.0
        return {
            "hits": [h.__dict__ for h in res.hits],
            "top_score": top,
            # appended, not replaced -- this is the reducer doing its job
            "attempts": [
                {
                    "query": state["query"],
                    "top_score": round(top, 4),
                    "n_returned": len(res.hits),
                    "docs": [h.doc_id for h in res.hits],
                }
            ],
        }

    def grade(state: RagState) -> dict:
        """Corrective-RAG style grader: is this context good enough to answer?

        Cheap version: the relevance floor measured in `ablate threshold`. In
        production I would put a small cross-encoder or an LLM grader here; the
        point is that the DECISION EXISTS as a node, so retrieval failure becomes
        a routed state instead of a confident wrong answer.
        """
        good = state["top_score"] >= cfg.abstain_threshold
        if good:
            return {"route": "generate"}
        if len(state["attempts"]) < state["max_attempts"]:
            return {"route": "rewrite"}
        return {"route": "escalate"}

    def rewrite(state: RagState) -> dict:
        """Query rewriting, deterministically. No LLM needed to demonstrate it.

        Strips interrogative scaffolding so the query looks more like the ANSWER
        passage than like a question -- the same query/document asymmetry problem
        HyDE solves with a generated hypothetical answer.
        """
        stop = {"what", "is", "the", "how", "do", "i", "does", "who", "when",
                "why", "are", "a", "an", "of", "for", "to", "in", "my", "me",
                "can", "should", "must", "and", "it", "that", "we"}
        words = [w for w in state["query"].lower().replace("?", "").split()
                 if w not in stop]
        return {"query": " ".join(words) or state["query"], "route": "retrieve"}

    def generate_node(state: RagState) -> dict:
        hits = [Hit(**h) for h in state["hits"]]   # rehydrate from state
        ans = generate(state["question"], hits, cfg, embedder)
        return {"answer": ans.text, "citations": ans.citations, "route": "done"}

    def deny(state: RagState) -> dict:
        principal = get_principal(state["principal_id"])
        return {
            "answer": ABSTAIN,
            "citations": [],
            "route": "denied",
            "escalation": {
                "reason": "no_authorised_content",
                "principal": principal.user_id,
            },
        }

    def escalate(state: RagState) -> dict:
        """Human in the loop -- the IAM approval gate, as a graph node.

        The system could not answer from what this principal is allowed to read.
        Rather than fabricate, it stops and asks a human whether to widen scope.
        `interrupt()` suspends the graph; the checkpointer holds the state; a
        resume delivers the human's decision as the return value.
        """
        principal = get_principal(state["principal_id"])
        decision = interrupt(
            {
                "type": "access_escalation",
                "principal": principal.user_id,
                "question": state["question"],
                "best_score": round(state["top_score"], 4),
                "attempted_queries": [a["query"] for a in state["attempts"]],
                "ask": "approve widening scope for this query? reply approve/deny",
            }
        )
        # --- SIDE EFFECT DEPLIBERATELY AFTER THE INTERRUPT, AND IDEMPOTENT ---
        approved = str(decision).strip().lower().startswith("approve")
        key = f"{principal.user_id}:{state['question']}"
        if key not in AUDIT_LOG:                       # replay-safe
            AUDIT_LOG[key] = {"approved": approved, "principal": principal.user_id}
        if approved:
            return {
                "answer": "Escalation approved. Routing to a human owner with the "
                          "request logged for audit.",
                "citations": [],
                "route": "escalated_approved",
                "escalation": AUDIT_LOG[key],
            }
        return {
            "answer": ABSTAIN,
            "citations": [],
            "route": "escalated_denied",
            "escalation": AUDIT_LOG[key],
        }

    # ---------------- wiring ----------------

    g = StateGraph(RagState)
    g.add_node("authorize", authorize)
    g.add_node("retrieve", retrieve_node)
    g.add_node("grade", grade)
    g.add_node("rewrite", rewrite)
    g.add_node("generate", generate_node)
    g.add_node("deny", deny)
    g.add_node("escalate", escalate)

    g.add_edge(START, "authorize")
    g.add_conditional_edges("authorize", lambda s: s["route"],
                            {"deny": "deny", "retrieve": "retrieve"})
    g.add_edge("retrieve", "grade")
    g.add_conditional_edges("grade", lambda s: s["route"],
                            {"generate": "generate", "rewrite": "rewrite",
                             "escalate": "escalate"})
    g.add_edge("rewrite", "retrieve")      # <-- THE CYCLE
    g.add_edge("generate", END)
    g.add_edge("deny", END)
    g.add_edge("escalate", END)

    return g.compile(checkpointer=checkpointer or MemorySaver())


def run_graph(question: str, principal_id: str, cfg: Config = DEFAULT,
              thread_id: str = "t1", approval: str | None = None) -> str:
    app = build_graph(cfg)
    config: dict[str, Any] = {"configurable": {"thread_id": thread_id}}
    state = app.invoke(
        {"question": question, "principal_id": principal_id, "attempts": []}, config
    )

    lines = []
    if "__interrupt__" in state:
        payload = state["__interrupt__"][0].value
        lines.append("PAUSED FOR HUMAN APPROVAL:")
        for k, v in payload.items():
            lines.append(f"    {k}: {v}")
        decision = approval or "deny"
        lines.append(f"  -> resuming with human decision: {decision!r}")
        state = app.invoke(Command(resume=decision), config)

    lines.append("")
    lines.append(f"route     : {state.get('route')}")
    lines.append(f"authorised: {state.get('n_authorised')} chunks")
    for i, a in enumerate(state.get("attempts", []), 1):
        lines.append(f"attempt {i} : score={a['top_score']:<7} q={a['query']!r}")
    lines.append("")
    lines.append(state.get("answer", ""))
    if state.get("citations"):
        lines.append("  sources: " + ", ".join(state["citations"]))
    if state.get("escalation"):
        lines.append(f"  audit  : {state['escalation']}")
    return "\n".join(lines)
