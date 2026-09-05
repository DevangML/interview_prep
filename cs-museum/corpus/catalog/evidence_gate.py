# -*- coding: utf-8 -*-
"""Two-publisher gate. Same-org pages do not count as independent."""
from __future__ import annotations
import json
from pathlib import Path
from urllib.parse import urlparse

EVIDENCE_DIR = Path(__file__).resolve().parent / "evidence"
FACT_KEYS = (
    "fp", "oop", "decl", "actor", "static", "strong", "hm", "dep", "gen",
    "malloc", "gc", "trace", "rc", "own", "thr", "coro", "csp", "loop",
)


def registrable(host: str) -> str:
    host = (host or "").lower().rstrip(".")
    if host.startswith("www."):
        host = host[4:]
    parts = host.split(".")
    if len(parts) >= 2 and parts[-2] in ("co", "com", "org", "ac", "gov") and len(parts[-1]) == 2:
        return ".".join(parts[-3:])
    return ".".join(parts[-2:]) if len(parts) >= 2 else host


def publisher(url: str) -> str:
    p = urlparse(url)
    host = registrable(p.netloc)
    if host in ("github.com", "githubusercontent.com") and p.path:
        org = p.path.strip("/").split("/")[0].lower()
        return f"github:{org}"
    return host


def two_publishers(urls: list[str]) -> bool:
    pubs = []
    for u in urls:
        if not (u or "").startswith("https://"):
            return False
        pubs.append(publisher(u))
    return len(pubs) >= 2 and len(set(pubs)) >= 2 and all(pubs)


def load_lang_evidence(lang_id: str) -> dict | None:
    path = EVIDENCE_DIR / f"{lang_id}.json"
    if not path.exists():
        return None
    data = json.loads(path.read_text())
    if data.get("langId") != lang_id:
        return None
    return data


def record_for(lang_id: str, fact_key: str) -> dict | None:
    data = load_lang_evidence(lang_id)
    if not data:
        return None
    rec = (data.get("facts") or {}).get(fact_key)
    if not rec:
        return None
    urls = []
    for s in rec.get("sources") or []:
        if isinstance(s, str):
            urls.append(s)
        elif isinstance(s, dict) and s.get("url"):
            urls.append(s["url"])
    if not two_publishers(urls):
        return None
    return rec


def dual_sourced(lang_id: str, fact_key: str) -> bool:
    return record_for(lang_id, fact_key) is not None
