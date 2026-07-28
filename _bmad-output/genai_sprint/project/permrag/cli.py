"""Command line interface.

    python -m permrag.cli build
    python -m permrag.cli ask   "what is the salary band for a senior engineer" --as rahul
    python -m permrag.cli demo                # the two-principal side-by-side demo
    python -m permrag.cli eval
    python -m permrag.cli ablate acl|chunk|mix|topk|all
    python -m permrag.cli graph "..." --as arjun
    python -m permrag.cli chain "..." --as neha
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import replace

from .config import DEFAULT, INDEX_DIR
from .embedding import get_embedder
from .evaluate import (ablate_acl_mode, ablate_chunk_size, ablate_chunk_strategy,
                       ablate_retrieval_mix, ablate_threshold, ablate_top_k,
                       evaluate, print_table)
from .index import build_index, load_index, save_index
from .pipeline import ask
from .principals import PRINCIPALS, get_principal


def cmd_build(args, cfg):
    index, manifest = build_index(cfg)
    save_index(index, INDEX_DIR)
    print(json.dumps(manifest, indent=2))
    print(f"\nindex written to {INDEX_DIR}")


def cmd_ask(args, cfg):
    index = load_index(cfg)
    principal = get_principal(args.principal)
    print(principal.describe())
    print(ask(index, args.query, principal, cfg).render())


def cmd_demo(args, cfg):
    """The 30-second demo: one query, one index, two principals, two outcomes."""
    index = load_index(cfg)
    embedder = get_embedder(cfg)
    pairs = [
        ("How many accounts were compromised in the credential stuffing incident?",
         ["arjun", "priya"]),
        ("What is the salary range for a senior engineer?", ["priya", "rahul"]),
        ("What do I need before I can merge to main?", ["rahul", "arjun"]),
    ]
    for query, users in pairs:
        print("=" * 78)
        for uid in users:
            p = get_principal(uid)
            print(f"\n--- {p.describe()}")
            print(ask(index, query, p, cfg, embedder).render())
        print()

    print("=" * 78)
    print("Same query, same index, same embeddings. Different principal, different"
          "\nauthorised candidate set. The filter is applied before the search.\n")
    q = "How many accounts were compromised in the credential stuffing incident?"
    for mode in ("pre", "post"):
        c = replace(cfg, acl_mode=mode)
        res = ask(index, q, get_principal("priya"), c, embedder)
        s = res.retrieval.stats
        print(f"acl_mode={mode:<5} searched={s['n_searched']:>3}  returned={s['n_returned']}"
              f"  starved_by={s['starved_by']}  unauthorised_scored="
              f"{s['n_searched'] - s['n_authorised']}")


def cmd_probe(args, cfg):
    """Show the dense ranking and the BM25 ranking side by side for one query.

    This is the artefact behind "why hybrid search". Try:
        cli probe 429          -> dense ranks an incident chunk first; BM25 nails it
        cli probe "how do I claim a hotel bill"  -> dense wins, BM25 flounders
    """
    import numpy as np

    from .retrieve import _dense_scores, _sparse_scores

    index = load_index(cfg)
    embedder = get_embedder(cfg)
    d = _dense_scores(index, embedder.encode_query(args.query))
    s = _sparse_scores(index, args.query)
    print(f"query: {args.query!r}\n")
    print(f"{'rank':<5}{'DENSE (cosine)':<46}{'BM25 (lexical)':<46}")
    for r in range(5):
        i, j = int(np.argsort(-d)[r]), int(np.argsort(-s)[r])
        left = f"{d[i]:.3f} {index.chunks[i]['chunk_id']}"
        right = f"{s[j]:.3f} {index.chunks[j]['chunk_id']}"
        print(f"{r + 1:<5}{left:<46}{right:<46}")


def cmd_eval(args, cfg):
    index = load_index(cfg)
    r = evaluate(index, cfg)
    print(json.dumps({k: v for k, v in r.items() if k != "failures"}, indent=2))
    if r["failures"]:
        print(f"\n{len(r['failures'])} failing cases (this is signal, not shame):")
        for qid, kind, detail in r["failures"]:
            print(f"  {qid}  {kind:<34} {detail}")


def cmd_ablate(args, cfg):
    which = args.which
    if which in ("acl", "all"):
        print_table(ablate_acl_mode(load_index(cfg), cfg), "ACL MODE: pre vs post vs off")
    if which in ("mix", "all"):
        print_table(ablate_retrieval_mix(load_index(cfg), cfg), "RETRIEVAL MIX")
    if which in ("topk", "all"):
        print_table(ablate_top_k(load_index(cfg), cfg), "TOP-K SWEEP")
    if which in ("threshold", "all"):
        print_table(ablate_threshold(load_index(cfg), cfg), "ABSTAIN THRESHOLD SWEEP")
    if which in ("chunk", "all"):
        print_table(ablate_chunk_size(cfg), "CHUNK SIZE SWEEP (rebuilds the index each row)")
    if which in ("strategy", "all"):
        print_table(ablate_chunk_strategy(cfg),
                    "CHUNK STRATEGY: structure-aware vs naive fixed windows")


def cmd_graph(args, cfg):
    from .graph import run_graph

    out = run_graph(args.query, args.principal, cfg, thread_id=args.thread,
                    approval=args.approval)
    print(out)


def cmd_chain(args, cfg):
    from .chain import build_chain

    chain = build_chain(cfg)
    out = chain.invoke({"question": args.query, "principal": args.principal})
    print(out["answer"])
    print("  sources:", ", ".join(out["citations"]) or "-")


def main(argv=None):
    ap = argparse.ArgumentParser(prog="permrag")
    ap.add_argument("--acl", default=DEFAULT.acl_mode, choices=["pre", "post", "off"])
    ap.add_argument("--generator", default=DEFAULT.generator,
                    choices=["extractive", "ollama", "hf"])
    ap.add_argument("--chunk-tokens", type=int, default=DEFAULT.chunk_tokens)
    ap.add_argument("--top-k", type=int, default=DEFAULT.top_k)
    ap.add_argument("--no-hybrid", action="store_true")
    ap.add_argument("--mmr", action="store_true", help="enable MMR (off by default: measured, it hurt precision here)")
    sub = ap.add_subparsers(dest="cmd", required=True)

    sub.add_parser("build").set_defaults(fn=cmd_build)
    sub.add_parser("demo").set_defaults(fn=cmd_demo)
    sub.add_parser("eval").set_defaults(fn=cmd_eval)

    p = sub.add_parser("probe"); p.add_argument("query"); p.set_defaults(fn=cmd_probe)

    p = sub.add_parser("ask"); p.add_argument("query")
    p.add_argument("--as", dest="principal", default="sam", choices=sorted(PRINCIPALS))
    p.set_defaults(fn=cmd_ask)

    p = sub.add_parser("ablate")
    p.add_argument("which", nargs="?", default="all",
                   choices=["acl", "chunk", "strategy", "mix", "topk", "threshold", "all"])
    p.set_defaults(fn=cmd_ablate)

    p = sub.add_parser("graph"); p.add_argument("query")
    p.add_argument("--as", dest="principal", default="sam", choices=sorted(PRINCIPALS))
    p.add_argument("--thread", default="t1")
    p.add_argument("--approval", default="deny",
                   help="what the human answers at the escalation interrupt")
    p.set_defaults(fn=cmd_graph)

    p = sub.add_parser("chain"); p.add_argument("query")
    p.add_argument("--as", dest="principal", default="sam", choices=sorted(PRINCIPALS))
    p.set_defaults(fn=cmd_chain)

    args = ap.parse_args(argv)
    cfg = replace(
        DEFAULT,
        acl_mode=args.acl,
        generator=args.generator,
        chunk_tokens=args.chunk_tokens,
        top_k=args.top_k,
        use_hybrid=not args.no_hybrid,
        use_mmr=args.mmr,
    )
    return args.fn(args, cfg)


if __name__ == "__main__":
    sys.exit(main())
