"""Evaluation.

The framing that matters: I do not evaluate "the RAG system". I evaluate TWO
systems -- retrieval and generation -- plus one security property. When an answer
is wrong I need to know which of the three broke, and a single end-to-end score
cannot tell me.

RETRIEVAL   Recall@k, Precision@k, MRR, Hit@k   -> did the right chunk arrive?
SECURITY    leakage rate, starvation rate       -> did only allowed chunks arrive?
BEHAVIOUR   abstention precision/recall          -> did it shut up when it should?

Leakage is the metric this project exists for, and it is the one metric with a
target of exactly zero. Recall@5 of 0.85 is a good day. A leakage rate of 0.001
is a breach.

Everything here runs offline on 40 hand-written golden questions in `data/golden.jsonl`.
The golden set was written from the corpus, BEFORE running the system, so it is a
specification and not a recording of what the system happens to do.
"""

from __future__ import annotations

import json
import statistics
import time
from dataclasses import dataclass, replace
from pathlib import Path

from .config import DATA_DIR, DEFAULT, Config
from .embedding import get_embedder
from .index import Index, build_index, load_index
from .principals import get_principal
from .retrieve import retrieve


@dataclass
class GoldenItem:
    qid: str
    question: str
    principal: str
    expected_docs: list[str]
    expect_abstain: bool
    note: str = ""


def load_golden(path: Path | None = None) -> list[GoldenItem]:
    path = Path(path or DATA_DIR / "golden.jsonl")
    items = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            d = json.loads(line)
            items.append(
                GoldenItem(
                    d["qid"], d["question"], d["principal"],
                    d["expected_docs"], d["expect_abstain"], d.get("note", ""),
                )
            )
    return items


def evaluate(index: Index, cfg: Config, golden: list[GoldenItem] | None = None) -> dict:
    golden = golden or load_golden()
    embedder = get_embedder(cfg)

    recalls, precisions, rrs, hits_at_k = [], [], [], []
    latencies = []
    leaked_total = leaked_queries = starved_queries = 0
    abstain_tp = abstain_fp = abstain_fn = abstain_tn = 0
    failures = []

    for item in golden:
        principal = get_principal(item.principal)
        t0 = time.perf_counter()
        res = retrieve(index, item.question, principal, cfg, embedder)
        latencies.append((time.perf_counter() - t0) * 1000)

        got_docs = [h.doc_id for h in res.hits]
        top = res.hits[0].score if res.hits else 0.0
        abstained = (not res.hits) or top < cfg.abstain_threshold

        # --- security ---
        n_leak = sum(1 for h in res.hits if not h.authorised)
        leaked_total += n_leak
        leaked_queries += 1 if n_leak else 0
        starved_queries += 1 if res.stats["starved_by"] else 0

        # --- abstention behaviour ---
        if item.expect_abstain:
            if abstained:
                abstain_tp += 1
            else:
                abstain_fn += 1
                failures.append((item.qid, "ANSWERED WHEN IT SHOULD ABSTAIN", got_docs[:2]))
        else:
            if abstained:
                abstain_fp += 1
                failures.append((item.qid, "ABSTAINED WHEN IT SHOULD ANSWER", got_docs[:2]))
            else:
                abstain_tn += 1

        # --- retrieval quality (only meaningful where an answer exists) ---
        if item.expected_docs:
            expected = set(item.expected_docs)
            found = expected & set(got_docs)
            recalls.append(len(found) / len(expected))
            precisions.append(
                sum(1 for d in got_docs if d in expected) / max(len(got_docs), 1)
            )
            hits_at_k.append(1.0 if found else 0.0)
            rr = 0.0
            for rank, d in enumerate(got_docs, start=1):
                if d in expected:
                    rr = 1.0 / rank
                    break
            rrs.append(rr)
            if not found:
                failures.append((item.qid, "MISS", f"wanted {sorted(expected)} got {got_docs[:3]}"))

    n_answerable = len(recalls)
    return {
        "config": {
            "acl_mode": cfg.acl_mode,
            "chunk_tokens": cfg.chunk_tokens,
            "overlap": cfg.chunk_overlap_tokens,
            "top_k": cfg.top_k,
            "hybrid": cfg.use_hybrid,
            "mmr": cfg.use_mmr,
            "abstain_threshold": cfg.abstain_threshold,
        },
        "n_questions": len(golden),
        "n_answerable": n_answerable,
        "retrieval": {
            f"recall@{cfg.top_k}": round(statistics.mean(recalls), 3) if recalls else 0.0,
            f"precision@{cfg.top_k}": round(statistics.mean(precisions), 3) if precisions else 0.0,
            f"hit@{cfg.top_k}": round(statistics.mean(hits_at_k), 3) if hits_at_k else 0.0,
            "mrr": round(statistics.mean(rrs), 3) if rrs else 0.0,
        },
        "security": {
            "leaked_chunks": leaked_total,
            "leaked_queries": leaked_queries,
            "leakage_rate": round(leaked_queries / len(golden), 4),
            "starved_queries": starved_queries,
            "starvation_rate": round(starved_queries / len(golden), 4),
        },
        "abstention": {
            "correct_abstain": abstain_tp,
            "missed_abstain": abstain_fn,
            "over_abstain": abstain_fp,
            "correct_answer": abstain_tn,
            "accuracy": round((abstain_tp + abstain_tn) / len(golden), 3),
        },
        "latency_ms": {
            "p50": round(statistics.median(latencies), 2),
            "p95": round(sorted(latencies)[int(0.95 * len(latencies)) - 1], 2),
            "mean": round(statistics.mean(latencies), 2),
        },
        "failures": failures,
    }


# ---------------------------------------------------------------------------
# ABLATIONS -- the tables that turn "it depends" into an answer
# ---------------------------------------------------------------------------

def ablate_acl_mode(index: Index, cfg: Config) -> list[dict]:
    """The headline experiment: pre-filter vs post-filter vs no filter."""
    rows = []
    for mode in ["pre", "post", "off"]:
        r = evaluate(index, replace(cfg, acl_mode=mode))
        rows.append(
            {
                "acl_mode": mode,
                **r["retrieval"],
                **r["security"],
                "abstain_accuracy": r["abstention"]["accuracy"],
                "p50_ms": r["latency_ms"]["p50"],
            }
        )
    return rows


def ablate_chunk_size(cfg: Config, sizes=(80, 128, 200, 320, 512)) -> list[dict]:
    """Re-chunk, re-embed, re-measure. This is why chunk size is not a vibe.

    Note that this rebuilds the index each time, which is the honest cost: you
    cannot change chunk size without re-embedding the whole corpus.
    """
    rows = []
    for size in sizes:
        c = replace(cfg, chunk_tokens=size, chunk_overlap_tokens=max(8, int(size * 0.15)))
        idx, manifest = build_index(c)
        r = evaluate(idx, c)
        rows.append(
            {
                "chunk_tokens": size,
                "overlap": c.chunk_overlap_tokens,
                "n_chunks": manifest["n_chunks"],
                "mean_tokens": manifest["tokens_mean"],
                **r["retrieval"],
                "abstain_accuracy": r["abstention"]["accuracy"],
                "index_mb": round(manifest["vector_bytes"] / 1e6, 3),
            }
        )
    return rows


def ablate_chunk_strategy(cfg: Config, sizes=(128, 200, 320)) -> list[dict]:
    """Structure-aware vs naive fixed-size windows, at several sizes.

    This is the table that answers "what chunk size did you use and why" without
    quoting a number I read on a blog. It also shows WHY the size sweep on the
    structure-aware splitter is flat: on this corpus the document structure binds
    before the token ceiling does, so chunk_tokens is a GUARD RAIL, not a target.
    """
    rows = []
    for strategy in ("structure", "fixed"):
        for size in sizes:
            c = replace(
                cfg, chunk_strategy=strategy, chunk_tokens=size,
                chunk_overlap_tokens=max(8, int(size * 0.15)),
            )
            idx, manifest = build_index(c)
            r = evaluate(idx, c)
            rows.append(
                {
                    "strategy": strategy,
                    "chunk_tokens": size,
                    "n_chunks": manifest["n_chunks"],
                    "mean_tokens": manifest["tokens_mean"],
                    "max_tokens": manifest["tokens_max"],
                    **r["retrieval"],
                    "abstain_accuracy": r["abstention"]["accuracy"],
                }
            )
    return rows


def ablate_retrieval_mix(index: Index, cfg: Config) -> list[dict]:
    """Dense only vs dense+BM25 vs +MMR. Shows what each stage actually buys."""
    variants = [
        ("dense only", replace(cfg, use_hybrid=False, use_mmr=False)),
        ("dense + mmr", replace(cfg, use_hybrid=False, use_mmr=True)),
        ("hybrid (rrf)", replace(cfg, use_hybrid=True, use_mmr=False)),
        ("hybrid + mmr", replace(cfg, use_hybrid=True, use_mmr=True)),
    ]
    rows = []
    for name, c in variants:
        r = evaluate(index, c)
        rows.append({"variant": name, **r["retrieval"], "p50_ms": r["latency_ms"]["p50"]})
    return rows


def ablate_threshold(index: Index, cfg: Config,
                     thresholds=(0.30, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70)) -> list[dict]:
    """Pick the abstain threshold by measurement, not by taste.

    The two score distributions OVERLAP, so no threshold is error-free. The table
    is the argument: it shows the false-answer / false-abstain trade explicitly,
    and in an access-control product I would rather over-abstain than answer.
    """
    rows = []
    for t in thresholds:
        r = evaluate(index, replace(cfg, abstain_threshold=t))
        a = r["abstention"]
        rows.append(
            {
                "threshold": t,
                "correct_abstain": f"{a['correct_abstain']}/"
                                   f"{a['correct_abstain'] + a['missed_abstain']}",
                "correct_answer": f"{a['correct_answer']}/"
                                  f"{a['correct_answer'] + a['over_abstain']}",
                "missed_abstain": a["missed_abstain"],
                "over_abstain": a["over_abstain"],
                "accuracy": a["accuracy"],
            }
        )
    return rows


def ablate_top_k(index: Index, cfg: Config, ks=(1, 3, 5, 10)) -> list[dict]:
    rows = []
    for k in ks:
        c = replace(cfg, top_k=k)
        r = evaluate(index, c)
        ret = r["retrieval"]
        rows.append(
            {
                "top_k": k,
                "recall": ret[f"recall@{k}"],
                "precision": ret[f"precision@{k}"],
                "hit": ret[f"hit@{k}"],
                "mrr": ret["mrr"],
            }
        )
    return rows


def print_table(rows: list[dict], title: str) -> None:
    if not rows:
        return
    cols = list(rows[0].keys())
    widths = [max(len(c), *(len(str(r[c])) for r in rows)) for c in cols]
    print(f"\n== {title} ==")
    print("  ".join(c.ljust(w) for c, w in zip(cols, widths)))
    print("  ".join("-" * w for w in widths))
    for r in rows:
        print("  ".join(str(r[c]).ljust(w) for c, w in zip(cols, widths)))


if __name__ == "__main__":
    cfg = DEFAULT
    index = load_index(cfg)
    r = evaluate(index, cfg)
    print(json.dumps({k: v for k, v in r.items() if k != "failures"}, indent=2))
    for f in r["failures"]:
        print("  FAIL", f)
