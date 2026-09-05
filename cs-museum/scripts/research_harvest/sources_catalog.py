"""Registry of authoritative language specification repositories and quality scores."""
import json
from pathlib import Path
from urllib.parse import urlparse

PRIMARY_HOSTS = {
    'ada-auth.org', 'clojure.org', 'common-lisp.net', 'cppreference.com',
    'dart.dev', 'developer.mozilla.org', 'doc.rust-lang.org',
    'docs.oracle.com', 'docs.python.org', 'docs.scala-lang.org', 'dyalog.com', 'ecma-international.org',
    'elixir-lang.org', 'erlang.org', 'forth-standard.org', 'go.dev',
    'haskell.org', 'hexdocs.pm', 'isocpp.org', 'jsoftware.com', 'kotlinlang.org',
    'learn.microsoft.com', 'llvm.org', 'ocaml.org', 'open-std.org', 'pharo.org',
    'ruby-doc.org', 'scala-lang.org', 'sqlite.org', 'squeak.org', 'swift.org',
    'tc39.es', 'www.adaic.org', 'www.gnu.org', 'www.haskell.org',
    'www.lispworks.com', 'www.php.net', 'www.postgresql.org',
    'www.ruby-lang.org', 'www.scala-lang.org', 'www.swift.org',
    'www.swi-prolog.org', 'www.typescriptlang.org', 'ziglang.org',
}

# Quality Scoring Tiers (1-10)
# Tier 1 (10/10): Canonical Specification or Official Language Reference Manual
# Tier 2 (9/10): HOPL / ACM SIGPLAN Historical Papers & Official RFCs
# Tier 3 (8/10): Official Stdlib Documentation & Implementation Architecture Docs
# Tier 4 (7/10): Academic & Technical Encyclopedia (Wikipedia CS)

REGISTRY_PATH = Path(__file__).parent / "endpoints_registry.json"

def _load_endpoints() -> dict:
    if REGISTRY_PATH.exists():
        try:
            return json.loads(REGISTRY_PATH.read_text())
        except Exception:
            pass
    return {}

AUTHORITATIVE_ENDPOINTS = _load_endpoints()

def calculate_quality_score(url: str) -> int:
    """Calculates factual quality score for a citation based on authority."""
    host = urlparse(url).netloc.lower().split(':', 1)[0]
    if host in PRIMARY_HOSTS:
        if any(kw in url for kw in ["/specs/", "/ref/spec", "/reference/", "ecma262", "/specification/"]):
            return 10
        if any(kw in url for kw in ["/book/", "/docs/", "/manual/", "/guide/"]):
            return 9
        return 9
    if any(h in host for h in ["acm.org", "sigplan.org", "doi.org"]):
        return 9
    if any(h in host for h in ["cppreference.com", "developer.mozilla.org", "hexdocs.pm"]):
        return 8
    if "wikipedia.org" in host:
        return 7
    return 5

def get_language_sources(lang: str) -> list[dict]:
    """Retrieves ranked primary source endpoints for a specified language."""
    auth_info = AUTHORITATIVE_ENDPOINTS.get(lang, {})
    candidates = []
    for k, url in auth_info.items():
        if k in ["host", "default_score"]:
            continue
        score = calculate_quality_score(url)
        candidates.append({
            "source_type": "Official Specification / Manual",
            "url": url,
            "quality_score": score,
            "snippet": f"Canonical specification and documentation for {lang} ({k})."
        })
    candidates.sort(key=lambda c: c["quality_score"], reverse=True)
    return candidates

