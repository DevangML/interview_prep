# API and data contracts

Version1, 2026-09-05. These are normative design contracts. The local reader implements static browsing and local self-assessment; a remote guide service is specified, not deployed.

## Canonical records

`scope.json` defines cluster IDs/counts, language order, status legend and release version. Each concept record carries the nine shared-spec educational fields plus concrete examples, counterexamples, assessment and stable IDs. `schemas/concept.schema.json` validates record shape; `scripts/validate_atlas.py` checks counts, language completeness and semantic constraints. Missing evidence must use unknown status rather than empty asserted-support citations.

A language support cell is `{status, mechanism, sources, versionScope}`. Sources are URLs scoped to the mechanism described; passing a URL-format check is not source review. Grouped columns state the observed language, not universal family support. Historical origin carries its own confidence separate from mechanism confidence. No global publication flag upgrades unknown history.

## Static endpoints

| Resource | Contract |
|---|---|
| `GET generated/manifest.json` | schemaVersion, version, conceptCount, chunks[{id,path,sha256,count}], graph and coverage references |
| `GET generated/{cluster}.json` | Complete cluster array for the manifest version; hash checked by production repository |
| `GET generated/graph.json` | nodes[{id,label,kind}], edges[{from,to,type,conditions,limitation,sources}] |
| `GET generated/coverage.json` | Structural results, per-status cell counts, uncertain-origin counts and limitations |

Prototype paths are relative to the atlas root. Production URLs add an immutable release directory; the mutable release pointer revalidates, while hashed immutable chunks may use long max-age. Never mark an unversioned mutable chunk immutable. A404, failed hash or unsupported schema prevents joining that chunk and offers retry/use-prior-release. Retrying GET is safe; retries are capped and user-cancellable. [HTTP caching](https://www.rfc-editor.org/rfc/rfc9111.html).

## Guide request — optional service

`POST /guide` accepts `{requestId, atlasVersion, question, selectedIds}`. Bounds: question≤4000 characters,≤12 known selected IDs, requestId≤80 characters. Gateway authenticates deployment-appropriate callers, rate-limits by principal/session and imposes a provider deadline. These limits are initial configuration, not measured capacity.

Response: `{requestId, atlasVersion, text, claimIds, actions}`. Actions are at most3 items of `{action:'SELECT_CONCEPT', target:<known concept ID>}`. No arbitrary URL, HTML, script, storage mutation or assessment action. Unknown properties are rejected. Text is rendered as text or sanitized content; sources are looked up from published records. Validate source/claim referential integrity and response version before rendering citations. Commands pass only when requestId matches the active request; response from an older request is discarded even if it is otherwise valid.

Error envelope: `{requestId, code, retryable, message}`. `INVALID_INPUT`400; `STALE_ATLAS`409; `RATE_LIMITED`429 with Retry-After; `GUIDE_UNAVAILABLE`503. Cancellation stops the client wait and suppresses late navigation. Never automatically repeat an unbounded billable request; the gateway can deduplicate requestId if retries are supported. No LLM response is allowed to assert administrative authority.

## Local learning state

Store under versioned key `concept-atlas-attempts-v1`. Each attempt: `{conceptId, contentVersion, rubricVersion, answer, rating, assessedBy:'self', timestamp}`. A local storage failure displays an explicit unsaved state; reading continues. Export JSON includes schemaVersion. No cross-device sync is implied. A future importer validates all fields and known IDs before merging; invalid/older records are retained separately rather than silently overwritten.

## Release and migration

Changes to required fields increment schemaVersion. Compatible editorial changes increment content version and preserve concept IDs. A rename uses aliases; a split references superseded IDs and explicit redirects. Generate the entire release in staging, validate hashes/references, then publish one release pointer. Keep prior releases intact for rollback. Reader session version prevents a new deployment from silently changing a displayed rubric mid-attempt.

## Failure examples

- Correct JSON but unknown target: reject command, preserve existing selection.
- Known target from another version: reject command and offer reload without deleting answer.
- A→B and B→A prerequisite cycle: fail build; the same cycle in analogous-to is valid.
- Declared first-class support with no source: fail build; unknown support is allowed and counted.
- Guide outage: read/search/compare/answer continue locally.
- Storage quota failure: show unsaved attempt and allow copy/export; never claim saved.
