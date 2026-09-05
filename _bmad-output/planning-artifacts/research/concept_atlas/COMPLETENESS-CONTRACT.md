# Concept Atlas completeness contract

This contract answers five completeness questions without turning an open-ended subject into a false absolute.

## The only defensible yes

The release can say **yes** to being complete when the statement includes its frozen boundary: all records in `scope.json`, all 14 clusters, all 26 comparison columns, all required record fields, all cited URLs in `source-manifest.json`, and all generated release artifacts. The build and validator enforce those structural claims.

The release cannot say “all languages ever,” “all concepts ever,” or “every fine-grained topic” without a closed authoritative universe and a reviewable definition of equivalence. No such universal registry exists. New languages, dialects, implementations, research results and pedagogical decompositions continue to appear. A finite atlas can be exhaustive only relative to a declared corpus and version.

## Five-question gate

| Question | Absolute answer today | Bounded release answer | Closure artifact |
|---|---|---|---|
| All languages of all time? | No, not a meaningful closed set | Yes for the 26 declared language/family columns, with unknown cells visible | `scope.json`, `generated/language-matrix.csv` |
| All concepts and fine granularity? | No, concept boundaries are open-ended | Yes for the 200 enumerated concept IDs; deferred material is retained separately | `generated/INVENTORY.md`, `deferred/` |
| Entire bedrock→HCI/UX breadth and depth? | No, current release is a language-concept atlas with selected stack connections | Yes only for the explicitly declared layer claims; depth is not certified until records and assessments pass review | `SHARED_SPEC.md`, `LEARNING-EVALUATION.md` |
| Every datum diamond-source verified? | No, only cited claims with sources; 5,168 cells are unknown and many records await expert review | Yes for each individual claim only after source-review promotion state is recorded | `EVIDENCE-LEDGER.md`, `source-manifest.json` |
| Everything downloaded; only React page left? | No | Content/build inputs are local and reproducible; source snapshots are archived where downloadable; reader/React implementation, source review and empirical gates remain | `source-manifest.json`, `generated/manifest.json`, `BENCHMARK-PLAN.md` |

## Promotion rule

Do not replace the absolute answers with marketing language. Promote a bounded claim only when the denominator, source snapshot/hash, record status, expert reviewer, and validation run are recorded. A downloaded HTML page proves possession of a snapshot, not that its claims are true or current. Official specifications and original papers are preferred; official documentation can establish a mechanism without establishing historical priority.

## React readiness gate

The atlas is **data/build ready**, not “only React page left.” The minimum remaining work is: source-review and expert-review promotion; concept-specific traces and transfer rubrics; typed semantic edges; accessible reader behavior; runtime manifest/hash validation; and named-device performance and learning pilots. The React page may be built against the current manifest, but its existence cannot upgrade the evidence or coverage claims.

