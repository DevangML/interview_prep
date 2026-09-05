"""Download every URL currently cited by release records and write a hash manifest."""
import hashlib
import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "sources"
DOCUMENTS = [
    ROOT / "SHARED_SPEC.md", ROOT / "SOURCES.md", ROOT / "EVIDENCE-LEDGER.md",
    ROOT / "COMPLETENESS-CONTRACT.md", ROOT / "LANGUAGE-COVERAGE.md",
    ROOT / "STACK-COVERAGE.md", ROOT / "GRANULARITY-COVERAGE.md",
    ROOT / "SOURCE-POLICY.md",
    ROOT.parent / "technical-cross-language-concept-atlas-research-2026-09-05.md",
    ROOT.parent.parent / "architecture/architecture-concept-atlas-2026-09-05/COMPREHENSIVE-ARCHITECTURE-REVIEW.md",
    ROOT.parent.parent.parent / "innovation-strategy-2026-09-05.md",
]

# A small number of cited URLs have moved, require a publisher session, or are
# malformed in the historical notes.  Keep the original citation as the
# manifest key, but retrieve the publisher/authoritative copy when one exists.
FALLBACKS = {
    "https://aws.amazon.com/blogs/architecture/optimizing-costs-in-serverless-web-applications/":
        "https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/cost-optimization.html",
    "https://dl.acm.org/doi/10.1145/3453483.3454039":
        "https://api.repository.cam.ac.uk/server/api/core/bitstreams/a46d3ba5-c51f-4f56-bb01-66822b14c0f0/content",
    "https://docs.pmnd.rs/zustand/getting-started/introduction":
        "https://zustand.docs.pmnd.rs/learn/getting-started/introduction",
    "https://doi.org/10.1126/science.1199327":
        "https://learninglab.psych.purdue.edu/downloads/2011/2011_Karpicke_Blunt_Science.pdf",
    "https://en.wikipedia.org/wiki/History_of_Programming_Languages_(conference":
        "https://cacm.acm.org/news/a-history-of-the-history-of-programming-languages/",
    "https://langindex.dev/concepts/algebraic-data-types-and-pattern-matching/":
        "https://openjdk.org/jeps/441",
    "https://www.mdpi.com/":
        "https://ccecc.acm.org/guidance",
}

def urls():
    found = set()
    for path in ROOT.glob("clusters/*/*.json"):
        item = json.loads(path.read_text())
        found.update(item.get("sources", []))
        found.update(item.get("origin", {}).get("sources", []))
        for cell in item.get("languageSupport", {}).values():
            found.update(cell.get("sources", []))
    for document in DOCUMENTS:
        if document.exists():
            for match in re.findall(r"https?://[^\s)\]>,]+", document.read_text(errors="ignore")):
                found.add(match.rstrip(".,;:_`"))
    return sorted(url for url in found if re.match(r"^https?://", url))

def safe_name(url):
    tail = re.sub(r"[^A-Za-z0-9]+", "-", url.split("//", 1)[1]).strip("-")
    return tail[:120] + ".html"

def main():
    OUT.mkdir(exist_ok=True)
    def download(url):
        name = safe_name(url)
        path = OUT / name
        retrieval_url = FALLBACKS.get(url, url)
        entry = {"url": url, "path": f"sources/{name}", "downloaded": False, "checkedAt": str(date.today())}
        if retrieval_url != url:
            entry["retrievedFrom"] = retrieval_url
        try:
            request = urllib.request.Request(retrieval_url, headers={"User-Agent": "ConceptAtlas-source-archiver/1.0"})
            with urllib.request.urlopen(request, timeout=20) as response:
                data = response.read(8 * 1024 * 1024 + 1)
            if len(data) > 8 * 1024 * 1024:
                raise ValueError("response exceeds 8 MiB archive limit")
            path.write_bytes(data)
            entry.update({"downloaded": True, "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()})
        except Exception as error:
            # Preserve a previously archived publisher snapshot when a later
            # run is blocked by a transient 403/rate limit.
            if path.exists() and path.stat().st_size:
                data = path.read_bytes()
                entry.update({"downloaded": True, "reusedExisting": True,
                              "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()})
            else:
                entry["error"] = f"{type(error).__name__}: {error}"
        return entry
    manifest = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(download, url) for url in urls()]
        for future in as_completed(futures):
            manifest.append(future.result())
    manifest.sort(key=lambda item: item["url"])
    (ROOT / "source-manifest.json").write_text(json.dumps({"checkedAt": str(date.today()), "count": len(manifest), "entries": manifest}, indent=2) + "\n")
    ok = sum(item["downloaded"] for item in manifest)
    print(f"archived {ok}/{len(manifest)} cited sources")

if __name__ == "__main__":
    main()
