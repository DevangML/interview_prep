#!/usr/bin/env python3
"""Fetch official docs URLs from the language catalog into a local snapshot cache.

Does not write verified cells. Use compile_docket.py on concept_atlas/sources
(already hashed) first; this command grows the cache for langs whose docs
field is set.
"""
from __future__ import annotations

import hashlib
import json
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "catalog"))
from languages import LANGUAGES  # noqa: E402

OUT = Path(__file__).resolve().parent / "snapshots"
UA = "ConceptAtlas-doc-puller/1.0 (+local research cache)"


def fetch(lang: dict) -> dict:
    url = lang.get("docs")
    entry = {
        "langId": lang["id"],
        "url": url,
        "downloaded": False,
        "checkedAt": str(date.today()),
    }
    if not url:
        entry["skip"] = "no docs URL in catalog"
        return entry
    dest = OUT / f"{lang['id']}.html"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read(2 * 1024 * 1024 + 1)
        if len(data) > 2 * 1024 * 1024:
            raise ValueError("over 2 MiB")
        dest.write_bytes(data)
        entry.update({
            "downloaded": True,
            "path": str(dest.relative_to(Path(__file__).resolve().parent)),
            "bytes": len(data),
            "sha256": hashlib.sha256(data).hexdigest(),
        })
    except Exception as err:
        entry["error"] = str(err)
        if dest.exists() and dest.stat().st_size:
            entry["downloaded"] = True
            entry["path"] = str(dest.relative_to(Path(__file__).resolve().parent))
            entry["reused"] = True
    return entry


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    langs = [x for x in LANGUAGES if x.get("docs")]
    results = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futs = {pool.submit(fetch, lang): lang["id"] for lang in langs}
        for fut in as_completed(futs):
            results.append(fut.result())
    results.sort(key=lambda r: r["langId"])
    manifest = {"checkedAt": str(date.today()), "count": len(results), "entries": results}
    (Path(__file__).resolve().parent / "doc-manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n"
    )
    ok = sum(1 for r in results if r.get("downloaded"))
    print(f"docs with URL: {len(langs)}; snapshots ok: {ok}")


if __name__ == "__main__":
    main()
