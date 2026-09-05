#!/usr/bin/env python3
"""Copy generated atlas delivery artifacts into the React app.

The corpus remains the source of truth. This deterministic copy is a browser
delivery step, not a second authored corpus.
"""

from __future__ import annotations

import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GENERATED = ROOT / "corpus" / "concept_atlas" / "generated"
DESTINATION = ROOT / "app" / "public" / "cs-museum"
DOCS = {
    "PROJECT-CONTEXT.md": ROOT / "PROJECT-CONTEXT.md",
    "COMPLETENESS-CONTRACT.md": ROOT / "corpus" / "concept_atlas" / "COMPLETENESS-CONTRACT.md",
    "SOURCE-QUALITY-AUDIT.md": ROOT / "corpus" / "concept_atlas" / "SOURCE-QUALITY-AUDIT.md",
}


def sync() -> int:
    if not GENERATED.is_dir():
        raise SystemExit(f"generated corpus directory is missing: {GENERATED}")

    DESTINATION.mkdir(parents=True, exist_ok=True)
    copied = 0
    for source in sorted(GENERATED.iterdir()):
        if source.suffix not in {".json", ".csv"}:
            continue
        target = DESTINATION / source.name
        shutil.copy2(source, target)
        copied += 1
    for name, source in DOCS.items():
        shutil.copy2(source, DESTINATION / name)
        copied += 1

    print(f"synced {copied} generated atlas artifacts to {DESTINATION}")
    return copied


if __name__ == "__main__":
    sync()
