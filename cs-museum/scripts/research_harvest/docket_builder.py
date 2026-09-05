"""Builds a 50-item Research Review Docket pairing questions with evidence snippets and quality scores."""
import json
from pathlib import Path
from sources_catalog import get_language_sources, calculate_quality_score, PRIMARY_HOSTS
from concept_resolver import resolve_concept
from knowledge_base import get_vetted_implementation
from retriever import extract_key_passages, search_wikipedia_summary

ROOT = Path(__file__).resolve().parents[2] / "corpus" / "concept_atlas"
COVERAGE_PATH = ROOT / "generated" / "coverage.json"
CLUSTERS_DIR = ROOT / "clusters"

def load_unknown_queue(batch_size: int = 50, offset: int = 0) -> list[dict]:
    """Loads the next batch of unverified cells from coverage.json."""
    if not COVERAGE_PATH.exists():
        return []
    cov = json.loads(COVERAGE_PATH.read_text())
    unknowns = cov.get("unknownCells", [])
    return unknowns[offset:offset + batch_size]

def build_docket_item(item_id: int, concept_id: str, lang: str) -> dict:
    """Investigates a single concept-language pair using primary catalogs and extracts dense evidence."""
    cluster_id = concept_id.split(".", 1)[0]
    concept_meta = resolve_concept(concept_id)
    canonical_name = concept_meta["name"]
    problem = concept_meta["problem"]

    question = (
        f"How does {lang} implement {canonical_name}? "
        f"What is the mechanism (syntax keywords, static/dynamic lowering, vtables/monomorphization), "
        f"why was it chosen, when to use it, and what price is paid?"
    )

    # Gather ranked primary sources
    candidates = get_language_sources(lang)

    # Optional technical encyclopedia context
    wiki_text, wiki_url, wiki_score = search_wikipedia_summary(f"{canonical_name} (computer science)")
    if not wiki_text:
        wiki_text, wiki_url, wiki_score = search_wikipedia_summary(canonical_name)
    if wiki_text:
        candidates.append({
            "source_type": "Technical Encyclopedia",
            "url": wiki_url,
            "quality_score": wiki_score,
            "snippet": extract_key_passages(wiki_text, [lang, canonical_name, "syntax", "polymorphism"])
        })
    candidates.sort(key=lambda c: c["quality_score"], reverse=True)

    # Check vetted knowledge base for authoritative high-precision answers
    vetted = get_vetted_implementation(concept_id, lang)
    if vetted:
        proposed = {
            "status": vetted["status"],
            "mechanism": vetted["mechanism"],
            "why": vetted["why"],
            "useWhen": vetted["useWhen"],
            "price": vetted["price"],
            "versionScope": vetted.get("versionScope", f"{lang} Standard"),
            "citations": vetted.get("citations", [])
        }
    else:
        top_citations = [c["url"] for c in candidates if c["quality_score"] >= 9]
        proposed = {
            "status": "unknown",
            "mechanism": f"Pending verification: determine whether {lang} implements {canonical_name}.",
            "why": f"To align with {lang}'s primary programming model and execution constraints.",
            "useWhen": f"When building idiomatic {lang} solutions requiring {canonical_name}.",
            "price": f"Operational overhead and adherence to {lang}'s runtime model.",
            "versionScope": f"{lang} Standard Specification",
            "citations": top_citations[:2] if top_citations else []
        }

    return {
        "id": item_id,
        "conceptId": concept_id,
        "conceptName": canonical_name,
        "language": lang,
        "clusterId": cluster_id,
        "question": question,
        "problemFaced": problem,
        "topSources": candidates[:4],
        "proposedDefinition": proposed
    }

def generate_docket(batch_size: int = 50, batch_num: int = 1) -> Path:
    """Generates a complete 50-item review docket ready for AI or operator decision."""
    offset = (batch_num - 1) * batch_size
    items_to_process = load_unknown_queue(batch_size, offset)

    docket = {
        "batchNumber": batch_num,
        "batchSize": len(items_to_process),
        "totalRemainingUnknowns": len(json.loads(COVERAGE_PATH.read_text()).get("unknownCells", [])),
        "items": []
    }

    print(f"Gathering authoritative evidence for Batch {batch_num} ({len(items_to_process)} items)...")
    for idx, raw in enumerate(items_to_process, 1):
        item = build_docket_item(idx, raw["conceptId"], raw["language"])
        docket["items"].append(item)

    out_path = ROOT / "scripts" / f"docket_batch_{batch_num:03d}.json"
    out_path.write_text(json.dumps(docket, indent=2) + "\n")
    print(f"Generated Review Docket: {out_path} ({len(docket['items'])} items)")
    return out_path

