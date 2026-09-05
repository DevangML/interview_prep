# CS Museum project context

Read this file before changing or answering questions about this project. It is the contract for other AIs working on the self-contained `cs-museum` project.

## Boundary

- `corpus/` is the canonical data layer. `corpus/concept_atlas/` is the published release; its JSON records, source archive, schemas, coverage reports, and research notes are the evidence.
- `app/` is the React presentation layer. It may request and transform corpus records into view models, but it must not retype or fork their explanatory prose.
- `app/public/cs-museum/` is a generated delivery copy for the browser. Refresh it with `python3 scripts/sync_corpus_to_app.py` from the project root after corpus changes.
- `scripts/` owns repeatable synchronization and validation glue. Keep transformations deterministic and small.

`react-prep-wizard/` is an external reference in the parent workspace only. This project has no runtime or source dependency on it.

The source corpus remains intact outside this folder as the upstream working copy. This folder is the portable project boundary: an AI can work from it without searching the rest of the workspace.

## Current release and honest scope

The canonical release is bounded, not a claim to contain all computer science. It has 200 concept records in 14 clusters, 26 language/family columns, and 5,200 language cells. At the last validation, 11 cells were `first-class`, 21 `partial`, and 5,168 `unknown`. The source archive contains 104 downloaded and hash-checked snapshots; 40 unique canonical URLs pass the primary/official source allowlist. Read `corpus/concept_atlas/COMPLETENESS-CONTRACT.md` and `SOURCE-QUALITY-AUDIT.md` before making coverage claims.

## Required answer envelope

Every corpus answer must expose these fields, even when a value is unknown:

1. **Who said this** — use the record's origin summary and named source/author when present. Do not invent historical attribution; say attribution is unresolved when the record says so.
2. **Authority (1–10)** — score the evidence source, not a person's fame. Use the rubric in `docs/ANSWER-CONTRACT.md`; label a score as provisional when it is inferred from source tier rather than human-reviewed.
3. **Confidence** — preserve the record's confidence and language-cell status. `unknown` means unverified, not absent.
4. **Reasoning chain** — show problem → mechanism → solution family → costs/trade-off → transfer rule, then cite the source that supports the mechanism.
5. **Exhaustiveness** — state the release denominator and boundary. Distinguish “exhaustive within this 200-record release” from “exhaustive in CS”; the latter is never allowed without a new, explicit audit.
6. **Further research** — list unknown cells, unresolved origin, missing source promotion, or open links. A bounded result can still have an open research frontier.

## Answers to the six product questions

The UI should answer “yes, within this bounded release” for holding the published atlas and for preserving the data/presentation separation. It should answer “partially” for universal computer-science coverage, fine-grained coverage, bedrock-to-HCI coverage, and diamond-level verification, with exact counts and links to the relevant audit. Mental-model value is supported by the reasoning chain, transfer rule, counterexample, assessment prompt, typed graph, and learning metadata; it must be presented as a design claim backed by the record, not as measured learning efficacy.

## Change rules for AIs

- Inspect the manifest and coverage report before editing the reader.
- Prefer pure adapters and selectors over duplicated content. A UI label can be a relabelled field; it must not become a second copy of a mechanism paragraph.
- Preserve source URLs, hashes, statuses, version scopes, and unknown semantics.
- Add a schema or migration when adding fields. Run corpus validation, contract tests, and the app build after changes.
- Keep claims falsifiable: expose denominators, provenance, confidence, and what remains unverified.

Useful commands:

```bash
python3 scripts/sync_corpus_to_app.py
python3 corpus/concept_atlas/scripts/validate_atlas.py
cd app && npm run build && npm test
```
