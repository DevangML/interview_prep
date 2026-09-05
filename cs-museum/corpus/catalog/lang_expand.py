# -*- coding: utf-8 -*-
"""Canonicalize free-text lang labels and expand every authored concept to the job catalog."""
from __future__ import annotations
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from languages import LANGUAGES, catalog_document

ROOT = Path(__file__).resolve().parents[1]
CATALOG_DIR = Path(__file__).resolve().parent
AUTHORED = ROOT / "authored"
PUBLIC = ROOT.parent / "app/public/data"

COVERAGE_RANK = {
    "verified": 0,
    "partial": 1,
    "unverified": 2,
    "absent_by_design": 3,
}


def load_catalog():
    return LANGUAGES, {x["id"]: x for x in LANGUAGES}


def alias_index(langs):
    idx = {}
    splits = {
        "HTML/CSS": ["html", "css"],
        "CSS / HTML": ["css", "html"],
        "Erlang/Elixir": ["erlang", "elixir"],
    }
    for lang in langs:
        idx[lang["id"].lower()] = [lang["id"]]
        idx[lang["label"].lower()] = [lang["id"]]
        for a in lang["aliases"]:
            idx[a.lower()] = [lang["id"]]
    for k, v in splits.items():
        idx[k.lower()] = v
    return idx


def resolve_label(raw: str, idx: dict) -> list[str]:
    s = (raw or "").strip()
    if not s:
        return []
    hit = idx.get(s.lower())
    if hit:
        return list(hit)
    if " / " in s:
        out = []
        for part in s.split(" / "):
            out.extend(resolve_label(part.strip(), idx))
        return list(dict.fromkeys(out))
    if "/" in s and not s.startswith("http"):
        out = []
        for part in s.split("/"):
            out.extend(resolve_label(part.strip(), idx))
        return list(dict.fromkeys(out))
    return []


def load_overlay_cells() -> dict[str, dict[str, dict]]:
    """langId -> conceptId -> cell"""
    out: dict[str, dict[str, dict]] = {}
    cells_root = AUTHORED / "cells"
    if not cells_root.exists():
        return out
    for lang_dir in sorted(cells_root.iterdir()):
        if not lang_dir.is_dir():
            continue
        lang_id = lang_dir.name
        out.setdefault(lang_id, {})
        for f in lang_dir.glob("*.json"):
            cell = json.loads(f.read_text())
            concept_id = f.stem
            cell.setdefault("langId", lang_id)
            out[lang_id][concept_id] = cell
    return out


def _display(cell, lang_meta, original_label):
    if cell.get("variant"):
        return f"{lang_meta['label']} ({cell['variant']})"
    if original_label and original_label not in lang_meta["aliases"] and " / " not in original_label:
        return original_label
    return lang_meta["label"]


def canonicalize_existing(by_language, idx, by_id):
    """Turn legacy labels into langId cells. Split compounds. Keep variants."""
    result = []
    seen_keys = set()
    for item in by_language or []:
        label = item.get("lang") or ""
        ids = resolve_label(label, idx)
        if not ids:
            # Keep as unverified extra so we do not silently drop Agda-only labels if catalog misses them.
            key = ("_raw", label)
            if key in seen_keys:
                continue
            seen_keys.add(key)
            result.append({
                **item,
                "langId": None,
                "lang": label,
                "coverage": "verified" if item.get("mechanism") else "unverified",
            })
            continue
        for lang_id in ids:
            meta = by_id[lang_id]
            variant = None
            if "(" in label and ")" in label and " / " not in label and "/" not in label.split("(")[0]:
                variant = label[label.find("(") + 1 : label.rfind(")")]
            key = (lang_id, variant)
            if key in seen_keys:
                continue
            seen_keys.add(key)
            coverage = "verified" if item.get("mechanism") else "unverified"
            result.append({
                "langId": lang_id,
                "lang": _display({"variant": variant}, meta, label),
                "variant": variant,
                "coverage": coverage,
                "mechanism": item.get("mechanism") or "",
                "why": item.get("why") or "",
                "useWhen": item.get("useWhen") or "",
                "price": item.get("price") or "",
            })
    return result


def apply_overlays(concept_id: str, cells: list, overlays: dict, by_id: dict):
    for lang_id, by_concept in overlays.items():
        cell = by_concept.get(concept_id)
        if not cell:
            continue
        meta = by_id[lang_id]
        merged = {
            "langId": lang_id,
            "lang": _display(cell, meta, meta["label"]),
            "variant": cell.get("variant"),
            "coverage": cell["coverage"],
            "mechanism": cell.get("mechanism") or "",
            "why": cell.get("why") or "",
            "useWhen": cell.get("useWhen") or "",
            "price": cell.get("price") or "",
            "source": cell.get("source") or "",
            "authority": cell.get("authority"),
            "confidence": cell.get("confidence") or "",
            "syntaxExample": cell.get("syntaxExample"),
            "empowered_by": cell.get("empowered_by") or [],
            "dependsOn": cell.get("dependsOn") or [],
            "traceDown": cell.get("traceDown") or [],
            "absentReason": cell.get("absentReason"),
        }
        cells = [c for c in cells if not (c.get("langId") == lang_id and not c.get("variant"))]
        cells.append(merged)
    return cells


def expand_catalog(cells: list, layer_id: str, by_id: dict, langs: list):
    present = {c.get("langId") for c in cells if c.get("langId")}
    cluster = layer_id or "paradigms"
    extras = []
    for lang in langs:
        if lang["id"] in present:
            continue
        cov = lang["clusterDefault"].get(cluster, "unverified")
        extras.append({
            "langId": lang["id"],
            "lang": lang["label"],
            "coverage": cov,
            "mechanism": "",
            "why": "",
            "useWhen": "",
            "price": "",
            "absentReason": lang.get("absentReason") if cov == "absent_by_design" else None,
        })
    all_cells = cells + extras

    def sort_key(c):
        pct = 0
        meta = by_id.get(c.get("langId") or "")
        if meta and meta.get("so2025_pct") is not None:
            pct = -float(meta["so2025_pct"])
        return (COVERAGE_RANK.get(c.get("coverage"), 9), pct, c.get("lang") or "")

    all_cells.sort(key=sort_key)
    return all_cells


def expand_tower(tower: dict) -> dict:
    langs, by_id = load_catalog()
    idx = alias_index(langs)
    overlays = load_overlay_cells()
    for node in tower.get("nodes", []):
        details = node.get("details")
        if not details or not details.get("authored"):
            continue
        cells = canonicalize_existing(details.get("byLanguage"), idx, by_id)
        cells = apply_overlays(node["id"], cells, overlays, by_id)
        details["byLanguage"] = expand_catalog(cells, node.get("layerId"), by_id, langs)
    return tower


def write_public_catalog():
    PUBLIC.mkdir(parents=True, exist_ok=True)
    (PUBLIC / "languages.json").write_text(json.dumps(catalog_document(), indent=2) + "\n")
