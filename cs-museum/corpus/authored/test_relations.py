#!/usr/bin/env python3
"""Enforces schema_note.md. Fails the build if `empowers` ever becomes an edge."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parents[1] / "catalog"))
from languages import LANGUAGES
D = pathlib.Path(__file__).parents[2] / "app/public/data"
fails = []
t = json.loads((D / "programming_tower.json").read_text())
for e in t.get("edges", []):
    if e.get("type") in ("empowers", "enables"):
        fails.append(f"FORBIDDEN edge type {e['type']!r} on {e.get('id')} - `empowers` is presumption, not a dependency")

auth = [n for n in t["nodes"] if (n.get("details") or {}).get("authored")]
catalog_ids = {x["id"] for x in LANGUAGES}
for n in auth:
    d = n["details"]
    if "empowers" in d:
        fails.append(f"{n['id']}: raw `empowers` key present; must be `empowers_note` (prose, non-structural)")
    if not d.get("empowered_by"):
        fails.append(f"{n['id']}: empowered_by is REQUIRED for every concept and is missing/empty")
    for dep in d.get("empowered_by", []):
        for f in ("uses","how","forCase","confidence"):
            if not dep.get(f): fails.append(f"{n['id']}: empowered_by[{dep.get('uses')!r}] missing {f}")
    langs = d.get("byLanguage") or []
    if len(langs) < len(LANGUAGES):
        fails.append(f"{n['id']}: byLanguage has {len(langs)} cells; catalog has {len(LANGUAGES)}")
    for cell in langs:
        cov = cell.get("coverage")
        if cov == "verified":
            for f in ("mechanism", "why", "useWhen", "price"):
                if not cell.get(f):
                    fails.append(f"{n['id']} {cell.get('lang')}: verified cell missing {f}")
        if cell.get("langId") and cell["langId"] not in catalog_ids:
            fails.append(f"{n['id']}: unknown langId {cell['langId']}")
ids = {n["id"] for n in t["nodes"]}
bedrock = {n["id"] for n in json.loads((D/"tower.json").read_text())["nodes"]}
for e in t.get("edges", []):
    for side in ("source","target"):
        if e[side] not in ids | bedrock:
            fails.append(f"dangling edge {e['id']}: {side}={e[side]!r} resolves to no node")
print(f"authored nodes: {len(auth)}   edges: {len(t.get('edges',[]))}")
if fails:
    print("\nFAILURES:"); [print("  ✗", f) for f in fails]; sys.exit(1)
print("PASS - no edge derived from `empowers`; every concept has empowered_by with uses/how/forCase/confidence; no dangling edges")
