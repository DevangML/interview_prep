#!/usr/bin/env python3
"""AI-facing helpers: scaffold a language, a cell, a concept; validate catalog + cells."""
from __future__ import annotations
import argparse, json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "catalog"))
from languages import LANGUAGES  # noqa: E402

CELLS = Path(__file__).resolve().parent / "cells"
SCHEMA = ROOT / "schema" / "extension.contract.json"
CATALOG_PY = ROOT / "catalog" / "languages.py"


def cmd_new_language(args):
    print(
        f"Add this object to LANGUAGES in {CATALOG_PY}, then re-run build_authored.py:\n"
        "    L("
        f"\"{args.id}\", \"{args.label}\", \"{args.family}\", \"{args.kind}\", "
        f"{args.pct if args.pct is not None else 'None'}, "
        f"[\"{args.label}\"], GP, note={args.note!r})"
    )
    CELLS.joinpath(args.id).mkdir(parents=True, exist_ok=True)
    print(f"Created cell directory {CELLS / args.id}")


def cmd_new_cell(args):
    dest = CELLS / args.lang / f"{args.concept}.json"
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and not args.force:
        print(f"exists: {dest} (use --force)", file=sys.stderr)
        sys.exit(1)
    template = {
        "langId": args.lang,
        "coverage": args.coverage,
        "mechanism": "",
        "why": "",
        "useWhen": "",
        "price": "",
        "source": "",
        "authority": 8,
        "confidence": "HIGH",
        "syntaxExample": None,
        "empowered_by": [],
        "dependsOn": [],
        "traceDown": [],
        "absentReason": None,
    }
    dest.write_text(json.dumps(template, indent=2) + "\n")
    print(dest)


def cmd_new_concept(args):
    template = json.loads((SCHEMA).read_text())["addConcept"]["templateConcept"]
    print(json.dumps({"id": args.id, "label": args.label, "layerId": args.layer, **template}, indent=2))


def cmd_validate(_args):
    fails = []
    ids = []
    for lang in LANGUAGES:
        if lang["id"] in ids:
            fails.append(f"duplicate language id {lang['id']}")
        ids.append(lang["id"])
        if not lang.get("jobRelevant"):
            fails.append(f"{lang['id']}: jobRelevant must be true in this catalog")
        for key in ("paradigms", "types", "memory", "concurrency"):
            if key not in lang["clusterDefault"]:
                fails.append(f"{lang['id']}: missing clusterDefault.{key}")
    if CELLS.exists():
        known = set(ids)
        for f in CELLS.glob("*/*.json"):
            cell = json.loads(f.read_text())
            lang_id = cell.get("langId") or f.parent.name
            if lang_id not in known:
                fails.append(f"{f}: langId {lang_id} not in catalog")
            if f.parent.name != lang_id:
                fails.append(f"{f}: directory {f.parent.name} != langId {lang_id}")
            if cell.get("coverage") == "verified":
                for field in ("mechanism", "why", "useWhen", "price", "source"):
                    if not cell.get(field):
                        fails.append(f"{f}: verified cell missing {field}")
    print(f"catalog languages: {len(LANGUAGES)}")
    print(f"cell files: {len(list(CELLS.glob('*/*.json'))) if CELLS.exists() else 0}")
    if fails:
        print("FAILURES:")
        for x in fails:
            print("  ✗", x)
        sys.exit(1)
    print("PASS")


def main():
    p = argparse.ArgumentParser(description="Extend the concept atlas without breaking the evidence contract.")
    sub = p.add_subparsers(dest="cmd", required=True)

    n = sub.add_parser("new-language")
    n.add_argument("--id", required=True)
    n.add_argument("--label", required=True)
    n.add_argument("--family", default="systems")
    n.add_argument("--kind", default="general")
    n.add_argument("--pct", type=float, default=None)
    n.add_argument("--note", default=None)
    n.set_defaults(func=cmd_new_language)

    c = sub.add_parser("new-cell")
    c.add_argument("--lang", required=True)
    c.add_argument("--concept", required=True)
    c.add_argument("--coverage", default="verified")
    c.add_argument("--force", action="store_true")
    c.set_defaults(func=cmd_new_cell)

    k = sub.add_parser("new-concept")
    k.add_argument("--id", required=True)
    k.add_argument("--label", required=True)
    k.add_argument("--layer", required=True)
    k.set_defaults(func=cmd_new_concept)

    v = sub.add_parser("validate")
    v.set_defaults(func=cmd_validate)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
