#!/usr/bin/env python3
"""Merge authored content into programming_tower.json.
HARD RULE: edges come from empowered_by + inheritsFrom/specializesInto ONLY. Never from `empowers`."""
import json, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
sys.path.insert(0, str(pathlib.Path(__file__).parents[1] / "catalog"))
from prog_enrichment import PROG
from prog_enrichment2 import PROG2
from link_map import LINKS
from lang_expand import expand_tower, write_public_catalog

ALL = {**PROG, **PROG2}
DATA = pathlib.Path(__file__).parents[2] / "app/public/data"
tower = json.loads((DATA / "programming_tower.json").read_text())

filled = 0
for n in tower["nodes"]:
    a = ALL.get(n["id"])
    if not a: continue
    eb = []
    for d in a["empowered_by"]:
        e = dict(d)
        e["nodeId"] = LINKS.get(d["uses"])          # None when no tower node corresponds
        eb.append(e)
    n["details"] = {
        "definition": a["definition"], "does": a["does"], "outcome": a["outcome"],
        "motivation": a["motivation"], "origin": a["origin"],
        "first_principles": a["first_principles"],
        "empowered_by": eb,
        "empowers_note": a["empowers"],             # renamed: prose only, never an edge
        "inheritsFrom": a["inheritsFrom"], "specializesInto": a["specializesInto"],
        "byLanguage": a["byLanguage"], "traceDown": a["traceDown"],
        "authored": True,
    }
    filled += 1

# ---- edge generation: empowered_by + taxonomy only ----
existing = {e.get("id") for e in tower.get("edges", [])}
ids = {n["id"] for n in tower["nodes"]}
new = []
for n in tower["nodes"]:
    d = n.get("details")
    if not d or not d.get("authored"): continue
    for dep in d["empowered_by"]:
        if dep["nodeId"]:
            eid = f"uses::{n['id']}::{dep['nodeId']}"
            if eid not in existing:
                new.append({"id":eid,"source":n["id"],"target":dep["nodeId"],"type":"empowered_by",
                            "label":f"uses: {dep['uses']}","color":"#38bdf8",
                            "details":[dep["how"], f"For: {dep['forCase']}", f"Confidence: {dep['confidence']}"],
                            "crossTower": dep["nodeId"] not in ids})
                existing.add(eid)
    for rel, kind, col in (("inheritsFrom","is_a","#a78bfa"),("specializesInto","specialises","#fbbf24")):
        for t in d[rel]:
            eid=f"{kind}::{n['id']}::{t['id']}"
            if eid not in existing:
                new.append({"id":eid,"source":n["id"],"target":t["id"],"type":kind,
                            "label":f"{kind.replace('_',' ')}: {t['label']}","color":col,
                            "details":[t["why"]],"crossTower":t["id"] not in ids})
                existing.add(eid)
tower.setdefault("edges", []).extend(new)
tower["version"] = "6.1.0-catalog"
tower = expand_tower(tower)
write_public_catalog()
(DATA / "programming_tower.json").write_text(json.dumps(tower, indent=1))
print(f"filled {filled}/{len(ALL)} authored nodes; added {len(new)} edges "
      f"({sum(1 for e in new if e['type']=='empowered_by')} uses / "
      f"{sum(1 for e in new if e['type']!='empowered_by')} taxonomy)")
print(f"cross-tower edges (programming -> bedrock): {sum(1 for e in new if e.get('crossTower'))}")
