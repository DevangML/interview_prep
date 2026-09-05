#!/usr/bin/env python3
"""Compile a promotion docket from already-hashed source snapshots.

This does not invent language cells. It scores (concept × snapshot) hits
inside corpus/concept_atlas/sources and writes a ranked queue. Promotion
to coverage=verified remains a human/AI step with a quote + URL.

Run with the system interpreter if conda python3 hangs:
  /usr/bin/python3 corpus/ingest/compile_docket.py
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ATLAS = ROOT / "concept_atlas"
INGEST = Path(__file__).resolve().parent
STOP = {
    "data", "free", "by", "code", "file", "call", "error", "effect", "build",
    "check", "debug", "cross", "late", "hoc", "io", "ast", "abi", "dsl",
}


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self._chunks: list[str] = []
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in {"script", "style", "noscript"}:
            self._skip += 1

    def handle_endtag(self, tag):
        if tag in {"script", "style", "noscript"} and self._skip:
            self._skip -= 1

    def handle_data(self, data):
        if self._skip:
            return
        t = data.strip()
        if t:
            self._chunks.append(t)

    def text(self) -> str:
        return " ".join(self._chunks)


def html_to_text(raw: bytes) -> str:
    parser = TextExtractor()
    try:
        parser.feed(raw.decode("utf-8", errors="ignore"))
    except Exception:
        return raw.decode("utf-8", errors="ignore")
    return parser.text()


def load_host_map() -> dict[str, str]:
    return json.loads((INGEST / "host_lang_map.json").read_text())


def lang_for_url(url: str, host_map: dict[str, str]) -> str | None:
    host = re.sub(r"^https?://", "", url).split("/")[0].lower()
    if host in host_map:
        return host_map[host]
    for suffix, lang in host_map.items():
        if host.endswith(suffix):
            return lang
    return None


def concept_queries() -> list[dict]:
    index = json.loads((ATLAS / "generated" / "index.json").read_text())
    out = []
    for row in index:
        name = (row.get("name") or "").strip()
        token = re.sub(r"[^a-z0-9]+", " ", name.lower()).strip()
        words = [w for w in token.split() if len(w) > 3 and w not in STOP]
        if len(words) < 1:
            continue
        if len(name) < 5:
            continue
        # Drop the scaffold titles that are a single generic word.
        if len(words) == 1 and words[0] in {
            "bounded", "generic", "generics", "erasure", "inference", "allocation",
            "cleanup", "lifetime", "channel", "lock", "actor", "async",
        }:
            continue
        out.append({
            "id": row["id"],
            "name": name,
            "clusterId": row.get("clusterId"),
            "needles": [name.lower()] + ([" ".join(words)] if len(words) > 1 else []),
        })
    return out


def window(text: str, needle: str, radius: int = 280) -> str | None:
    idx = text.lower().find(needle.lower())
    if idx < 0:
        return None
    start = max(0, idx - radius)
    end = min(len(text), idx + len(needle) + radius)
    quote = re.sub(r"\s+", " ", text[start:end]).strip()
    return quote[:700]


def main() -> None:
    host_map = load_host_map()
    manifest = json.loads((ATLAS / "source-manifest.json").read_text())
    queries = concept_queries()
    hits = []
    per_lang = defaultdict(int)
    scanned = 0

    for entry in manifest.get("entries", []):
        if not entry.get("downloaded"):
            continue
        path = ATLAS / entry["path"]
        if not path.exists():
            continue
        scanned += 1
        lang = lang_for_url(entry["url"], host_map)
        raw = path.read_bytes()
        text = html_to_text(raw) if path.suffix in {".html", ".htm"} else raw.decode("utf-8", errors="ignore")
        text_l = text.lower()
        for q in queries:
            for needle in q["needles"]:
                if len(needle) < 5:
                    continue
                if needle not in text_l:
                    continue
                quote = window(text, needle)
                if not quote:
                    continue
                hits.append({
                    "conceptId": q["id"],
                    "conceptName": q["name"],
                    "clusterId": q["clusterId"],
                    "langId": lang,
                    "url": entry["url"],
                    "snapshot": entry["path"],
                    "sha256": entry.get("sha256"),
                    "quote": quote,
                    "needle": needle,
                    "status": "extracted_candidate",
                    "note": "Quote from hashed snapshot. Not a verified cell. Do not copy into coverage=verified without a mechanism/why/useWhen/price rewrite grounded in this quote.",
                })
                if lang:
                    per_lang[lang] += 1
                break

    hits.sort(key=lambda h: (h.get("langId") or "zzz", h["conceptId"]))
    docket = {
        "kind": "promotion-docket",
        "snapshotsScanned": scanned,
        "candidateCount": len(hits),
        "byLanguage": dict(sorted(per_lang.items(), key=lambda kv: -kv[1])),
        "rule": "Local retrieval only. No LLM fill. Unknown cells stay unknown until a candidate is rewritten as a cell.",
        "candidates": hits[:2000],
        "truncated": len(hits) > 2000,
        "totalUntruncated": len(hits),
    }
    out = INGEST / "docket.json"
    out.write_text(json.dumps(docket, indent=2) + "\n")
    print(
        f"scanned {scanned} snapshots; {len(hits)} candidates "
        f"(wrote {min(len(hits), 2000)} to {out})"
    )
    print("byLanguage", dict(list(docket["byLanguage"].items())[:12]))


if __name__ == "__main__":
    main()
