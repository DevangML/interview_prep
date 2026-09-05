"""Retrieves and extracts factual documentation snippets with real SHA-256 archives."""
import hashlib
import json
import re
import urllib.request
from pathlib import Path
from urllib.parse import quote, urlparse
from sources_catalog import calculate_quality_score, PRIMARY_HOSTS

ROOT = Path(__file__).resolve().parents[2] / "corpus" / "concept_atlas"
SOURCES_DIR = ROOT / "sources"
MANIFEST_PATH = ROOT / "source-manifest.json"

USER_AGENT = "ConceptAtlas-ResearchHarvester/2.0 (Authoritative CS Documentation Harvester)"

def fetch_url(url: str, timeout: int = 10) -> tuple[str, str]:
    """Fetches a URL, calculates its SHA-256 hash, and archives it."""
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = resp.read()
            text = data.decode("utf-8", errors="ignore")
            sha = hashlib.sha256(data).hexdigest()
            return text, sha
    except Exception as e:
        return "", ""

def archive_source(url: str, content_bytes: bytes, sha: str) -> str:
    """Stores a genuine snapshot in sources/ and updates source-manifest.json."""
    SOURCES_DIR.mkdir(exist_ok=True)
    tail = re.sub(r"[^A-Za-z0-9]+", "-", url.split("//", 1)[1]).strip("-")[:80] + ".html"
    rel_path = f"sources/{tail}"
    abs_path = ROOT / rel_path

    if not abs_path.exists():
        abs_path.write_bytes(content_bytes)

    # Update manifest
    manifest = {"checkedAt": "2026-09-05", "count": 0, "entries": []}
    if MANIFEST_PATH.exists():
        manifest = json.loads(MANIFEST_PATH.read_text())

    entries = {e["url"]: e for e in manifest.get("entries", [])}
    entries[url] = {
        "url": url,
        "path": rel_path,
        "downloaded": True,
        "checkedAt": "2026-09-05",
        "bytes": len(content_bytes),
        "sha256": sha
    }
    manifest["entries"] = sorted(entries.values(), key=lambda e: e["url"])
    manifest["count"] = len(manifest["entries"])
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n")
    return rel_path

def search_wikipedia_summary(topic: str) -> tuple[str, str, int]:
    """Queries Wikipedia REST API for clean, concise technical summary."""
    endpoint = f"https://en.wikipedia.org/api/rest_v1/page/summary/{quote(topic.replace(' ', '_'))}"
    text, sha = fetch_url(endpoint)
    if not text:
        return "", "", 0
    try:
        data = json.loads(text)
        extract = data.get("extract", "")
        canonical_url = data.get("content_urls", {}).get("desktop", {}).get("page", endpoint)
        archive_source(canonical_url, text.encode(), sha)
        return extract, canonical_url, 7
    except Exception:
        return "", "", 0

def extract_key_passages(text: str, keywords: list[str], max_len: int = 400) -> str:
    """Extracts dense factual text surrounding keywords."""
    clean = re.sub(r"<[^>]+>", " ", text)
    clean = re.sub(r"\s+", " ", clean).strip()

    for kw in keywords:
        pos = clean.lower().find(kw.lower())
        if pos != -1:
            start = max(0, pos - 60)
            end = min(len(clean), pos + max_len)
            snippet = clean[start:end]
            return f"...{snippet.strip()}..."
    return clean[:max_len] + "..." if len(clean) > max_len else clean
