"""Move excess generated inventory records to a recoverable deferred area.

The declared release remains the reconciled 200-concept scope; deferred records
are retained on disk and can be promoted after individual source review.
"""
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def main():
    scope = json.loads((ROOT / "scope.json").read_text())
    deferred = ROOT / "deferred"
    moved = 0
    for cluster in scope["clusters"]:
        directory = ROOT / "clusters" / cluster["id"]
        files = sorted(directory.glob("*.json"))
        keep = cluster["target"]
        for path in files[keep:]:
            target = deferred / cluster["id"] / path.name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(path), str(target))
            moved += 1
        if moved:
            note = deferred / cluster["id"] / "README.md"
            note.parent.mkdir(parents=True, exist_ok=True)
            if not note.exists():
                note.write_text("# Deferred records\n\nRetained generated records outside the current release inventory. Promote only after source review.\n")
    print(f"moved {moved} records to recoverable deferred inventory")

if __name__ == "__main__":
    main()
