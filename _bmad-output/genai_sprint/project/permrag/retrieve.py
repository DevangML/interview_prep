"""Retrieval: permission-aware, hybrid, diversified.

THE CENTRAL CLAIM OF THIS PROJECT LIVES IN `retrieve()`:

    the ACL mask is applied to the candidate set BEFORE the similarity search,
    not to the results afterwards.

Post-filtering is what most tutorials do, and it is wrong twice:

  (a) LEAKAGE. Every chunk in the corpus is scored against the query, and
      whatever the pipeline does next -- log the scores, feed a reranker, show
      a "sources considered" panel, cache the neighbours -- now handles content
      the user is not cleared for. Even if you drop it before rendering, you have
      already leaked the EXISTENCE and the RELEVANCE of a restricted document.

  (b) TOP-K STARVATION. You ask for 10, the ACL removes 8, and you answer from 2.
      The user does not get a smaller answer, they get a WORSE one, and nothing
      in the system reports that it happened. It degrades silently, which is the
      worst property a security control can have.

`acl_mode` is a config knob with three values -- pre / post / off -- precisely so
that the difference is a measurement in `evaluate.py`, not an assertion in a
README.
"""

from __future__ import annotations

import time
from dataclasses import dataclass, field

import numpy as np

from .config import Config
from .index import Index, _tokenize_for_bm25
from .principals import Principal


@dataclass
class Hit:
    chunk_id: str
    doc_id: str
    title: str
    heading: str
    text: str
    classification: str
    department: str
    allowed_roles: list[str]
    score: float
    dense_rank: int | None = None
    sparse_rank: int | None = None
    authorised: bool = True

    def citation(self) -> str:
        return f"[{self.doc_id} > {self.heading or 'intro'}]"


@dataclass
class RetrievalResult:
    hits: list[Hit]
    timings_ms: dict[str, float] = field(default_factory=dict)
    stats: dict = field(default_factory=dict)

    @property
    def leaked(self) -> list[Hit]:
        """Hits the principal was NOT authorised to see. Must be empty in 'pre'."""
        return [h for h in self.hits if not h.authorised]


def _dense_scores(index: Index, qvec: np.ndarray) -> np.ndarray:
    # Vectors are L2-normalised, so a dot product IS cosine similarity.
    return index.vectors @ qvec


def _sparse_scores(index: Index, query: str) -> np.ndarray:
    return np.asarray(index.bm25.get_scores(_tokenize_for_bm25(query)), dtype=np.float32)


def _ranks_from_scores(scores: np.ndarray, candidates: np.ndarray, k: int) -> dict[int, int]:
    """Return {chunk_idx: rank} for the top-k candidates, rank starting at 1."""
    if candidates.size == 0:
        return {}
    order = candidates[np.argsort(-scores[candidates], kind="stable")][:k]
    return {int(idx): rank for rank, idx in enumerate(order, start=1)}


def _rrf(rank_maps: list[dict[int, int]], k: int) -> dict[int, float]:
    """Reciprocal Rank Fusion: score = sum(1 / (k + rank)).

    Rank-based, so it needs no score normalisation. That is the whole reason to
    prefer it: a cosine score in [-1, 1] and a BM25 score in [0, 30] are not
    comparable, and any attempt to normalise them is fragile across query types.
    """
    fused: dict[int, float] = {}
    for rmap in rank_maps:
        for idx, rank in rmap.items():
            fused[idx] = fused.get(idx, 0.0) + 1.0 / (k + rank)
    return fused


def _mmr(
    index: Index, qvec: np.ndarray, candidates: list[int], k: int, lam: float
) -> list[int]:
    """Maximal Marginal Relevance.

    Pure top-k returns near-duplicates: three overlapping chunks of the same
    section, all similar to the query AND to each other. MMR greedily picks the
    next document maximising  lam*rel(q,d) - (1-lam)*max_sim(d, already_chosen).
    """
    if not candidates:
        return []
    selected: list[int] = []
    remaining = list(candidates)
    rel = {i: float(index.vectors[i] @ qvec) for i in remaining}
    while remaining and len(selected) < k:
        if not selected:
            best = max(remaining, key=lambda i: rel[i])
        else:
            sel_mat = index.vectors[selected]
            best, best_score = None, -1e9
            for i in remaining:
                redundancy = float(np.max(sel_mat @ index.vectors[i]))
                score = lam * rel[i] - (1 - lam) * redundancy
                if score > best_score:
                    best, best_score = i, score
        selected.append(best)
        remaining.remove(best)
    return selected


def retrieve(
    index: Index,
    query: str,
    principal: Principal,
    cfg: Config,
    embedder=None,
) -> RetrievalResult:
    from .embedding import get_embedder

    embedder = embedder or get_embedder(cfg)
    timings: dict[str, float] = {}
    n = index.n

    t0 = time.perf_counter()
    mask = index.acl_mask(principal)
    timings["acl_mask"] = (time.perf_counter() - t0) * 1000

    # ---- THE DECISION ----------------------------------------------------
    if cfg.acl_mode == "pre":
        candidates = np.flatnonzero(mask)      # search only what they may read
    else:                                      # "post" and "off" search everything
        candidates = np.arange(n)
    # ----------------------------------------------------------------------

    t0 = time.perf_counter()
    qvec = embedder.encode_query(query)
    timings["embed_query"] = (time.perf_counter() - t0) * 1000

    t0 = time.perf_counter()
    dense = _dense_scores(index, qvec)
    timings["dense_search"] = (time.perf_counter() - t0) * 1000

    rank_maps = [_ranks_from_scores(dense, candidates, cfg.candidate_k)]
    if cfg.use_hybrid:
        t0 = time.perf_counter()
        sparse = _sparse_scores(index, query)
        rank_maps.append(_ranks_from_scores(sparse, candidates, cfg.candidate_k))
        timings["sparse_search"] = (time.perf_counter() - t0) * 1000

    t0 = time.perf_counter()
    fused = _rrf(rank_maps, cfg.rrf_k)
    pool = sorted(fused, key=lambda i: -fused[i])[: cfg.candidate_k]
    timings["fuse"] = (time.perf_counter() - t0) * 1000

    t0 = time.perf_counter()
    if cfg.use_mmr:
        ordered = _mmr(index, qvec, pool, cfg.top_k, cfg.mmr_lambda)
    else:
        ordered = pool[: cfg.top_k]
    timings["rerank_mmr"] = (time.perf_counter() - t0) * 1000

    n_before_post = len(ordered)
    if cfg.acl_mode == "post":
        # The tutorial version: search everything, drop the forbidden ones now.
        ordered = [i for i in ordered if mask[i]]

    hits: list[Hit] = []
    for i in ordered:
        c = index.chunks[i]
        hits.append(
            Hit(
                chunk_id=c["chunk_id"],
                doc_id=c["doc_id"],
                title=c["title"],
                heading=c["heading"],
                text=c["text"],
                classification=c["classification"],
                department=c["department"],
                allowed_roles=c["allowed_roles"],
                score=float(dense[i]),
                dense_rank=rank_maps[0].get(i),
                sparse_rank=rank_maps[1].get(i) if cfg.use_hybrid else None,
                authorised=bool(mask[i]),
            )
        )

    timings["total"] = round(sum(timings.values()), 3)
    stats = {
        "acl_mode": cfg.acl_mode,
        "n_chunks": n,
        "n_authorised": int(mask.sum()),
        "n_searched": int(len(candidates)),
        "n_returned": len(hits),
        "n_requested": cfg.top_k,
        # post-filter starvation: asked for top_k, kept fewer
        "starved_by": max(0, min(cfg.top_k, n_before_post) - len(hits))
        if cfg.acl_mode == "post"
        else 0,
        "n_unauthorised_returned": sum(1 for h in hits if not h.authorised),
        "top_score": round(hits[0].score, 4) if hits else 0.0,
    }
    return RetrievalResult(
        hits=hits,
        timings_ms={k: round(v, 3) for k, v in timings.items()},
        stats=stats,
    )
