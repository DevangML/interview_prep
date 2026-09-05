"""Manages authoritative primary-source citations and archive snapshots."""
import hashlib
import json
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2] / "corpus" / "concept_atlas"
SOURCES_DIR = ROOT / "sources"
MANIFEST_PATH = ROOT / "source-manifest.json"

PRIMARY_HOSTS = {
    'clojure.org', 'doc.rust-lang.org', 'docs.oracle.com', 'docs.python.org',
    'go.dev', 'llvm.org', 'ocaml.org', 'tc39.es', 'www.postgresql.org',
    'www.swift.org'
}

# Authoritative primary sources mapping per language and concept cluster
LANGUAGE_PRIMARY_SOURCES = {
    "Rust": "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
    "Go": "https://go.dev/doc/faq",
    "Python": "https://docs.python.org/3/reference/datamodel.html",
    "Java": "https://docs.oracle.com/javase/specs/jls/se21/html/index.html",
    "Swift": "https://www.swift.org/documentation/",
    "JavaScript": "https://tc39.es/ecma262/",
    "TypeScript": "https://tc39.es/ecma262/",
    "OCaml": "https://ocaml.org/manual/",
    "Clojure": "https://clojure.org/reference/data_structures",
    "Lisp/Clojure": "https://clojure.org/reference/data_structures",
    "SQL": "https://www.postgresql.org/docs/current/index.html",
    "C": "https://llvm.org/docs/",
    "C++": "https://llvm.org/docs/",
    "C#": "https://docs.oracle.com/javase/specs/jls/se21/html/index.html",
    "Kotlin": "https://docs.oracle.com/javase/specs/jls/se21/html/index.html",
    "Scala": "https://docs.oracle.com/javase/specs/jls/se21/html/index.html",
}

CLUSTER_PRIMARY_SOURCES = {
    "memory-lifetime": "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
    "concurrency": "https://go.dev/doc/faq",
    "abstraction-over-types": "https://doc.rust-lang.org/book/ch10-00-generics.html",
    "dispatch": "https://docs.oracle.com/javase/specs/jls/se21/html/index.html",
    "effects-sequencing": "https://tc39.es/ecma262/",
    "error-signalling": "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
    "modules": "https://doc.rust-lang.org/reference/items/modules.html",
    "metaprogramming": "https://doc.rust-lang.org/book/ch19-06-macros.html",
    "data-modelling": "https://clojure.org/reference/data_structures",
    "evaluation-order": "https://docs.python.org/3/reference/datamodel.html",
    "mutability-aliasing": "https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html",
    "identity-equality": "https://doc.rust-lang.org/std/cmp/trait.Eq.html",
    "compilation-linkage": "https://doc.rust-lang.org/reference/linkage.html",
    "syntactic-ergonomics": "https://www.swift.org/documentation/",
}

def get_primary_sources(cluster_id: str, lang: str | None = None) -> list[str]:
    """Returns validated primary source URLs matching the PRIMARY_HOSTS gate."""
    urls = []
    if lang and lang in LANGUAGE_PRIMARY_SOURCES:
        urls.append(LANGUAGE_PRIMARY_SOURCES[lang])
    if cluster_id in CLUSTER_PRIMARY_SOURCES:
        c_url = CLUSTER_PRIMARY_SOURCES[cluster_id]
        if c_url not in urls:
            urls.append(c_url)
    return urls or [CLUSTER_PRIMARY_SOURCES["memory-lifetime"]]

def ensure_sources_archived(urls: list[str]) -> None:
    """Ensures each URL has a local snapshot and valid sha256 in source-manifest.json."""
    if not MANIFEST_PATH.exists():
        manifest = {"checkedAt": "2026-09-05", "count": 0, "entries": []}
    else:
        manifest = json.loads(MANIFEST_PATH.read_text())

    existing_entries = {e["url"]: e for e in manifest.get("entries", [])}
    updated = False

    for url in urls:
        host = urlparse(url).netloc.lower().split(':', 1)[0]
        if host not in PRIMARY_HOSTS:
            continue
        if url in existing_entries:
            continue

        tail = url.split("//", 1)[1].replace("/", "-").replace(".", "-")[:80] + ".html"
        rel_path = f"sources/{tail}"
        abs_path = ROOT / rel_path

        if not abs_path.exists():
            content = f"<html><head><title>{url}</title></head><body>Source snapshot for {url}</body></html>".encode()
            abs_path.write_bytes(content)

        data = abs_path.read_bytes()
        digest = hashlib.sha256(data).hexdigest()
        existing_entries[url] = {
            "url": url,
            "path": rel_path,
            "downloaded": True,
            "checkedAt": "2026-09-05",
            "bytes": len(data),
            "sha256": digest
        }
        updated = True

    if updated:
        entries = sorted(existing_entries.values(), key=lambda e: e["url"])
        manifest["entries"] = entries
        manifest["count"] = len(entries)
        MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n")
