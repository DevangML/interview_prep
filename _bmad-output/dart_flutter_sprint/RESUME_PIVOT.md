> **Updated deadline:** Finish the project today, 2026-09-06. [TODAY_COVERAGE.md](TODAY_COVERAGE.md) is now the controlling build scope: all requested topics, small examples, limited features. The deeper sync contract below is design coverage unless implemented and tested.

# Tremor: résumé-driven interview pivot

Effective 2026-09-06. This file overrides the priority order and dated setup instructions in CAPSTONE.md and SPRINT_3DAY.md for the current Flutter interview. Company/round/deadline await clarification. Code remains Devang's; the coach supplies contracts, reviews and one task at a time.

## Baseline

Actual project: `/Users/devang/Desktop/tremor`. Verified SDK: Flutter 3.47.2 / Dart 3.13.2. App shell and incomplete Earthquake model only; no implemented service, sync, list or test suite was found in the inspected Dart files. Do not reuse the old absent flutter_project path, reinstall globally or claim 53 topics are implemented.

## Priority order

| Order | Concrete exercise | Résumé connection | Completion evidence |
|---|---|---|---|
| 1 | Repair domain model; map one GeoJSON fixture; show feed/list and distinct failure state | Dart, typed config, Flutter delivery | Generation and analyze succeed; mapping tests; list renders |
| 2 | Add triage status with a durable local outbox and simulated remote | Offline WMS | Pending survives restart; lost acknowledgement replay applies once |
| 3 | Reject outdated triage revisions and show explicit conflict | Concurrency/conflict control | Two simulated clients; neither update silently lost |
| 4 | Render one severity banner from versioned JSON rules | Campaigns framework | Unknown rule/schema safely handled; rule evaluator tested |
| 5 | Practice capture stream lifecycle and replay-safe actions | Scanner/OCR/device work | Fake stream proves duplicate policy and cancellation; hardware later |
| Throughout | Test each slice and defend its design aloud | Unit testing, ownership | Explain decision, failure, test and limitation cold |

First exercise is the model already on disk. Coach asks for a verbal shape first; learner fixes the unfinished declaration, matching part filenames and nullable field treatment. Review that attempt before presenting traps. Use a fixture before live network to isolate parsing behavior.

## Separate the two data flows

USGS → service → repository → list state → view.
Triage UI → triage repository → local record + outbox transaction → sync worker → fake triage server.

USGS receives no writes. Triage is an educational simulation, not an emergency-response product or production backend. Preserve earthquake IDs and associate local triage records with them.

## Sync contract to implement

Record identity: tenantId + earthquakeId. Operation: operationId, record identity, baseRevision, intended status/note, createdAt, syncStatus, attemptCount. The precise serialization and storage adapter are learner decisions.

Persist the local record and pending operation atomically before showing durable success. Reuse operationId for identical retries. The fake server scopes deduplication by tenant, compares payload identity, and atomically records the business change plus replay result. Replay recognition happens before rejecting the old base revision, so a lost acknowledgement can return its original success. A new conflicting edit returns conflict with current server revision. It does not silently overwrite or endlessly retry.

Process a record's queued writes in order. On acknowledgement, clear only that operation and avoid overwriting newer local edits; rebase the next operation onto the acknowledged revision if appropriate. Recover in-flight work on restart. Surface offline, pending, failed and conflict states distinctly. Bound retry attempts/backoff; permanent validation or permission failure requires user correction. Connectivity is a hint; the request result determines success.

For the first slice, prohibit account switching while pending work exists or explicitly retain it under the original account without replaying under another tenant. Explain the limitation. A realistic background scheduler is a later extension; a foreground timer does not guarantee execution after OS suspension.

## Keep, promote and defer

Keep seismic feed, repository boundaries, one state mechanism and list/detail. Promote persistence, conflict scenarios and tests. Use a JSON rule rather than building the entire Campaigns system. Rehearse IAM permissions and capture integration against actual employment experience. Defer animations, extra routing/codegen machinery, isolate demonstrations without measured need, complex plugin authoring and unrelated AI integration.

MVVM and Clean Architecture are not mutually exclusive. A practice Cubit does not prove BLoC was used at ElasticRun. Icons supplement understandable labels and semantics; they do not replace all localization. No package is described as dead without a fresh, specific source check.

## Time budget until date arrives

Under 24h: three real résumé stories, core Dart/Flutter retrieval, one repaired working slice, timed mock. Two to three days: durable replay + conflict simulation before polish. More time: config rules and hardware/performance evidence. Estimate only after the first slice; the previous 6.5h whole-build estimate is not a promise.

## Coaching and assessment

Treat résumé topics as brush-up candidates, but test recall. Ask one question, hear reasoning, then introduce one changed condition. Score only observed answers; log correctness, reasoning, personal evidence and transfer separately. A suggested local readiness check is 3/4 on each dimension, no critical sync/security misconception, and a cold retest later. This is a practice rubric, not an employer pass mark. Do not change global mastery or mark challenges complete on a claim.

Use RESUME_DEFENSE.md for answer criteria after the attempt. First resource, only if sync recall is weak: [Flutter offline-first guide](https://docs.flutter.dev/app-architecture/design-patterns/offline-first), approximately 20–25 minutes. Do not hand over the whole resource catalogue in chat.

Research: [résumé-driven report](../planning-artifacts/research/technical-lmt-flutter-resume-pivot-research-2026-09-06.md).
