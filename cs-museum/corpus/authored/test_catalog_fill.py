#!/usr/bin/env python3
"""Every catalog language has a body on every authored concept after expand."""
from __future__ import annotations
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "catalog"))
sys.path.insert(0, str(ROOT / "authored"))
from languages import LANGUAGES  # noqa: E402
from lang_expand import expand_tower  # noqa: E402

DATA = ROOT.parent / "app/public/data"
NEED = ("mechanism", "why", "useWhen", "price")


def test_catalog_cells_are_filled():
    tower = json.loads((DATA / "programming_tower.json").read_text())
    authored = [n for n in tower["nodes"] if (n.get("details") or {}).get("authored")]
    assert authored, "no authored concepts"
    catalog = {x["id"] for x in LANGUAGES}
    empty = []
    mechs = []
    for n in authored:
        cells = n["details"].get("byLanguage") or []
        ids = {c.get("langId") for c in cells if c.get("langId")}
        if ids != catalog:
            empty.append(f"{n['id']}: missing {sorted(catalog - ids)}")
        for c in cells:
            lid = c.get("langId")
            if not lid:
                continue
            cov = c.get("coverage")
            if cov == "absent_by_design":
                if not (c.get("absentReason") or "").strip():
                    empty.append(f"{n['id']} {lid}: absent without reason")
            elif cov in ("verified", "partial"):
                missing = [k for k in NEED if not (c.get(k) or "").strip()]
                if missing:
                    empty.append(f"{n['id']} {lid}: {cov} missing {missing}")
                if not (c.get("source") or "").strip():
                    empty.append(f"{n['id']} {lid}: {cov} missing source")
                mechs.append((lid, n["id"], c.get("mechanism") or ""))
                if cov == "partial":
                    meta = next(x for x in LANGUAGES if x["id"] == lid)
                    if meta["label"] not in (c.get("mechanism") or "") and lid not in (c.get("mechanism") or ""):
                        empty.append(f"{n['id']} {lid}: partial mechanism does not name the language")
    dups = []
    seen = {}
    for lid, cid, m in mechs:
        if not m:
            continue
        prev = seen.get(m)
        if prev and prev[0] != lid:
            dups.append(f"identical mechanism {prev} vs {lid}/{cid}")
        seen[m] = (lid, cid)
    assert not empty, "\n".join(empty[:40])
    assert not dups, "\n".join(dups[:20])


if __name__ == "__main__":
    tower = json.loads((DATA / "programming_tower.json").read_text())
    tower = expand_tower(tower)
    (DATA / "programming_tower.json").write_text(json.dumps(tower, indent=1))
    test_catalog_cells_are_filled()
    print("PASS catalog fill")
