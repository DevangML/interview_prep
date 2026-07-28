"""The plain-Python end-to-end pipeline.

This exists so I can answer the question "what does LangChain actually give you?"
honestly. `ask()` below is the whole RAG system in ~40 lines with no framework.
`chain.py` expresses the SAME pipeline in LangChain LCEL and `graph.py` expresses
it in LangGraph. Having all three lets me argue about frameworks from evidence
instead of from vibes.

The abstain gate is here rather than in the generator on purpose: abstention is a
RETRIEVAL decision. If the best authorised chunk scores below threshold, no
prompt engineering downstream is going to rescue it, and letting the model see
weak context is exactly how you get a confident wrong answer.
"""

from __future__ import annotations

import time
from dataclasses import dataclass, field

from .config import DEFAULT, Config
from .generate import ABSTAIN, Answer, generate
from .index import Index
from .principals import Principal
from .retrieve import RetrievalResult, retrieve


@dataclass
class PipelineResult:
    query: str
    principal: str
    answer: Answer
    retrieval: RetrievalResult
    timings_ms: dict = field(default_factory=dict)

    def render(self) -> str:
        r, s = self.retrieval, self.retrieval.stats
        lines = [
            f"Q ({self.principal}): {self.query}",
            "",
            self.answer.text,
            "",
            f"  sources    : {', '.join(self.answer.citations) or '-'}",
            f"  acl        : mode={s['acl_mode']} authorised={s['n_authorised']}/"
            f"{s['n_chunks']} searched={s['n_searched']} returned={s['n_returned']}"
            f"{'  STARVED by ' + str(s['starved_by']) if s['starved_by'] else ''}",
            f"  leaked     : {s['n_unauthorised_returned']}"
            + ("   <-- ACL VIOLATION" if s["n_unauthorised_returned"] else ""),
            f"  latency ms : {self.timings_ms}",
        ]
        return "\n".join(lines)


def ask(
    index: Index,
    query: str,
    principal: Principal,
    cfg: Config = DEFAULT,
    embedder=None,
) -> PipelineResult:
    t_all = time.perf_counter()

    result = retrieve(index, query, principal, cfg, embedder)

    # Abstain gate: a wrong answer delivered confidently is worse than no answer.
    top = result.hits[0].score if result.hits else 0.0
    if not result.hits or top < cfg.abstain_threshold:
        answer = Answer(ABSTAIN, [], cfg.generator, True)
        t_gen = 0.0
    else:
        t0 = time.perf_counter()
        answer = generate(query, result.hits, cfg, embedder)
        t_gen = (time.perf_counter() - t0) * 1000

    timings = dict(result.timings_ms)
    timings["generate"] = round(t_gen, 3)
    timings["end_to_end"] = round((time.perf_counter() - t_all) * 1000, 3)
    return PipelineResult(query, principal.user_id, answer, result, timings)
