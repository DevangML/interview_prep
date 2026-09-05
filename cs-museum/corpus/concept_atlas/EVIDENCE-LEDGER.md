# Concept Atlas evidence ledger

Release: `2026-09-05.1`. This ledger is generated from the canonical record contract and reviewed for truthful status reporting.

The current citation set contains 104 unique URLs. `scripts/download_sources.py` archived all 104 locally with SHA-256 hashes in [source-manifest.json](source-manifest.json). Seven moved, gated or malformed citations are recorded with an explicit `retrievedFrom` authoritative or author-hosted fallback; the original URL remains the manifest key. The archive is a reproducible snapshot, not proof that every statement in every source is correct or remains current.

## Current counts

| Measure | Count | Meaning |
|---|---:|---|
| Concepts in release | 200 | Structural inventory target and build input |
| Clusters | 14 | Fixed editorial groupings |
| Language cells | 5,200 | 200 concepts × 26 columns |
| First-class cells | 11 | A record currently asserts idiomatic native support with a source |
| Partial cells | 21 | A record currently asserts qualified/library/opt-in support with a source |
| Unknown cells | 5,168 | Not researched or not settled; never evidence of absence |
| Deliberate absence cells | 0 | None are asserted without a design/spec source |
| Historical origins | 200 low-confidence by default | Mechanism sources do not establish first invention |

The counts are from `generated/coverage.json`. They are not a readiness score. A concept is editorially publishable only after its problem, competing mechanisms, guarantee, cost, trace, counterexample, assessment, and affected language cells have been reviewed by a domain owner.

The validator reports `primarySourceStatus=pass` for the 40 canonical source URLs. This is a source-domain gate, not semantic proof of the 200 records.

## Promotion states

1. **Authored:** required JSON fields exist and the record parses.
2. **Structurally valid:** all26 language keys exist; IDs, cluster IDs and required relation constraints pass.
3. **Source reviewed:** each asserted mechanism/origin/support claim has claim-specific evidence and a verification date.
4. **Expert reviewed:** a domain reviewer accepts the mechanism, boundary and counterexample.
5. **Assessment ready:** the prompt has a worked answer rubric and an unfamiliar transfer variant.
6. **Published:** the record is included in an immutable manifest after all required gates for its intended audience pass.

The build currently proves states 1 and 2. It does not upgrade records to states 3–6. Unknown cells and low-confidence origins are the explicit research queue.

## Review queue

- Replace generic scaffold traces with concrete, concept-specific executions before calling a record assessment-ready.
- Promote unknown cells only with a source that establishes the named mechanism and version scope.
- Add contested historical alternatives rather than choosing an origin by popularity.
- Add typed `prerequisite`, `analogous-to`, `contrasts-with` and `influences` edges only with conditions, limitations and sources.
- Have a domain owner review the first complete record in each cluster before bulk promotion.
