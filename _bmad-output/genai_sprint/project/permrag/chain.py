"""The same pipeline, expressed as a LangChain LCEL chain.

This file exists to make one interview answer honest rather than memorised:

    "What is the difference between LangChain and LangGraph, and when do you use
     which?"

I can answer it by pointing at two implementations of the SAME pipeline in the
same repo. LCEL composes Runnables into a DAG with `|`. It gives you a uniform
interface (invoke / batch / stream / async), automatic parallelism where the
graph branches, and a place to hang callbacks and retries. What it does NOT give
you is a cycle: there is no `|` that means "go back". The moment I needed
grade -> rewrite -> retrieve -> grade again, LCEL stopped being the right tool
and I moved that control flow to LangGraph. See `graph.py`.

So the rule I actually use: LCEL for the linear data plane, LangGraph for the
control plane that has to loop, branch, pause, or persist.

The four LCEL primitives on show here:
  RunnableLambda           - wrap any function as a Runnable
  RunnablePassthrough      - thread the input forward
  .assign(...)             - add a key to the dict, running steps in PARALLEL
  |                        - compose

No LLM provider is required. The "model" step is our own pluggable generator,
wrapped as a RunnableLambda, which is exactly how you would drop in a real chat
model later.
"""

from __future__ import annotations

from langchain_core.runnables import RunnableLambda, RunnablePassthrough

from .config import DEFAULT, Config
from .embedding import get_embedder
from .generate import ABSTAIN, build_context, generate
from .index import load_index
from .principals import get_principal
from .retrieve import retrieve

PROMPT_TEMPLATE = """Answer ONLY from the context. Cite [doc_id > section].
If the context does not answer the question, say: {abstain}

CONTEXT:
{context}

QUESTION: {question}
ANSWER:"""


def build_chain(cfg: Config = DEFAULT):
    index = load_index(cfg)
    embedder = get_embedder(cfg)

    def _authorize(x: dict) -> dict:
        principal = get_principal(x["principal"])
        return {
            **x,
            "principal_obj": principal,
            "n_authorised": int(index.acl_mask(principal).sum()),
        }

    def _retrieve(x: dict) -> list:
        # The retriever is permission-aware by construction: the principal is
        # part of the retrieval input, not a post-processing step. If you can
        # call the retriever without a principal, you have already lost.
        return retrieve(index, x["question"], x["principal_obj"], cfg, embedder).hits

    def _format_prompt(x: dict) -> str:
        return PROMPT_TEMPLATE.format(
            abstain=ABSTAIN,
            context=build_context(x["hits"], cfg.max_context_chunks) or "(nothing)",
            question=x["question"],
        )

    def _generate(x: dict) -> dict:
        hits = x["hits"]
        top = hits[0].score if hits else 0.0
        if not hits or top < cfg.abstain_threshold:
            return {**x, "answer": ABSTAIN, "citations": [], "abstained": True}
        ans = generate(x["question"], hits, cfg, embedder)
        return {**x, "answer": ans.text, "citations": ans.citations,
                "abstained": ans.abstained}

    chain = (
        RunnableLambda(_authorize)
        | RunnablePassthrough.assign(hits=RunnableLambda(_retrieve))
        | RunnablePassthrough.assign(prompt=RunnableLambda(_format_prompt))
        | RunnableLambda(_generate)
    )
    return chain


if __name__ == "__main__":
    chain = build_chain()
    for uid in ("arjun", "priya"):
        out = chain.invoke(
            {"question": "What is the time to detect for incident 2026-014?",
             "principal": uid}
        )
        print(f"--- {uid}: authorised={out['n_authorised']} abstained={out['abstained']}")
        print(out["answer"], "\n")
