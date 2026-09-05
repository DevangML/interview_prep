"""Applies vetted docket items to canonical cluster files and triggers rebuilding."""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "corpus" / "concept_atlas"
CLUSTERS_DIR = ROOT / "clusters"

def apply_docket(docket_path: Path) -> int:
    """Reads vetted docket and updates canonical cluster records with genuine evidence."""
    if not docket_path.exists():
        raise FileNotFoundError(f"Docket not found: {docket_path}")

    docket = json.loads(docket_path.read_text())
    items = docket.get("items", [])
    applied_count = 0

    # Group updates by concept file
    updates_by_concept = {}
    for it in items:
        cid = it["conceptId"]
        updates_by_concept.setdefault(cid, []).append(it)

    for cid, updates in updates_by_concept.items():
        cluster_id = cid.split(".", 1)[0]
        concept_stem = cid.split(".", 1)[1] if "." in cid else cid
        target_file = CLUSTERS_DIR / cluster_id / f"{concept_stem}.json"

        if not target_file.exists():
            print(f"Warning: Concept file not found: {target_file}")
            continue

        cdata = json.loads(target_file.read_text())
        lang_support = cdata.setdefault("languageSupport", {})
        existing_sources = set(cdata.get("sources", []))

        for u in updates:
            lang = u["language"]
            prop = u.get("proposedDefinition", {})
            citations = prop.get("citations", [])

            lang_support[lang] = {
                "status": prop.get("status", "first-class"),
                "mechanism": prop.get("mechanism", ""),
                "why": prop.get("why", ""),
                "useWhen": prop.get("useWhen", ""),
                "price": prop.get("price", ""),
                "sources": citations,
                "versionScope": prop.get("versionScope", f"{lang} Standard")
            }
            existing_sources.update(citations)
            applied_count += 1

        cdata["sources"] = sorted(existing_sources)
        target_file.write_text(json.dumps(cdata, indent=2) + "\n")

    print(f"Successfully applied {applied_count} vetted records across {len(updates_by_concept)} concepts.")

    # Trigger canonical build and sync
    build_script = ROOT / "scripts" / "build_atlas.py"
    subprocess.run([sys.executable, str(build_script)], check=True)
    return applied_count
