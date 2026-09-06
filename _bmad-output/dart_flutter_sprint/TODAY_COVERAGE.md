# Tremor: finish today, cover every requested topic

**Deadline: 2026-09-06, today.** This is the project deadline; the interview date remains unknown. This document overrides the build scope and ordering in RESUME_PIVOT.md, CAPSTONE.md and SPRINT_3DAY.md. All topics from the user's four-week list are included below. Coverage means a small demonstrated example or an explicit design defense; it does not mean four weeks of mastery in a day.

## One product, small exercises

Ship one earthquake list → detail flow, a magnitude filter, a tiny severity graphic and one native device value. Use fixtures for deterministic demonstrations and tests, plus a live USGS read if ready. Keep BLoC/Cubit in the main app; exercise Riverpod against the same repository contract in a separate test/example, avoiding two state systems owning the same screen. Keep native work to one already-available target platform.

Devang writes the implementation. Coach reviews and runs checks under the project contract. Every row starts **pending**; links and checkboxes are not proof of completion.

## Complete coverage map

| Requested topic | Smallest meaningful Tremor exercise | Evidence required | Status |
|---|---|---|---|
| Streams and Sinks | StreamController receives filter input through its sink; subscriber observes filtered state; close/cancel ownership explicit | Test input/output and disposal | pending |
| flutter_bloc | Main feed UI uses BlocBuilder; side effect uses BlocListener where needed | Loading → ready/error visible | pending |
| Cubit vs Bloc | Main feed Cubit; tiny equivalent filter Bloc in an isolated example/test | Explain method versus event flow; test both | pending |
| Riverpod provider types | Provider injects repo; FutureProvider loads fixture; StreamProvider consumes filter stream | Three focused provider tests; explain lifetimes | pending |
| State notifiers | Notifier or AsyncNotifier handles refresh/filter in example; compare one legacy StateNotifier snippet | State transition test plus migration explanation | pending |
| Dependency injection | Constructor injection in domain/application; provider override supplies fake repo | Swap fake/live without changing business logic | pending |
| Clean Architecture layers | Presentation depends on domain use case; data implements domain repository interface | Trace import direction; domain has no Flutter/network imports | pending |
| Repository pattern | EarthquakeRepository interface plus fixture/live implementation | Same contract tests independent of UI | pending |
| Use cases | One GetEarthquakes or FilterEarthquakes operation with a real policy | Pure test; explain why other methods need no wrapper | pending |
| Refactor to Clean Architecture | Move one initially direct data call behind use case/repository after establishing behavior | Before/after diff and unchanged behavior test | pending |
| Implicit animations | AnimatedContainer changes selected filter appearance | Show state-triggered transition | pending |
| Explicit animations | One finite AnimationController pulse on refresh | Start/stop/dispose; deterministic test pumps | pending |
| Hero animations | Stable earthquake-ID Hero between list/detail severity graphic | Navigate forward/back without duplicate tags | pending |
| CustomPainter | Paint a tiny magnitude bar/ring | shouldRepaint rationale and fixed-size rendering test | pending |
| RenderObjects basics | Inspect a built-in render object for the graphic in Inspector; annotate constraints → size → paint | Short written explanation and spoken trace; no custom layout engine | pending |
| Slivers | CustomScrollView with SliverAppBar and SliverList | Scroll the same feed; explain lazy children | pending |
| Platform channels | Explain Dart/native message boundary for device value | Diagram of codec, request/result and error | pending |
| Method channels | One getBatteryLevel or equivalent supported native method | Real native response plus mocked missing/error response | pending |
| Device features | Display the returned device value on the detail screen | Run on available target; label simulator limitations | pending |
| Test structure | Arrange/act/assert mapper and use-case tests | Test suite passes | pending |
| Mockito | Generate one mock repository/service and stub success/failure | Verify meaningful call and observable result | pending |
| Test coverage | Run flutter test --coverage | Inspect uncovered branch and add meaningful assertion; no arbitrary % promise | pending |
| WidgetTester | Pump feed with fake dependency; tap row | Assert list → detail behavior | pending |
| Finding widgets | Use byKey/byType/text for appropriate assertions | Stable finder choice explained | pending |
| Golden tests | One deterministic severity graphic golden | Review baseline visually; comparison passes on pinned environment | pending |
| integration_test package | One fixture-backed launch → filter → detail smoke path | Run on available device/emulator | pending |
| Test automation | Repeatable generation/analyze/unit/widget/integration commands | Re-run documented sequence successfully | pending |
| CI/CD basics | Local CI workflow: pinned SDK, dependencies/codegen, analyze, tests/coverage; document separate signed release stage | YAML validated; distinguish authored workflow from hosted run/deployment | pending |
| App architecture design | One-page diagram of actual implemented boundaries | Defend one tradeoff and one failure | pending |
| Database schema design | Sketch earthquake cache + tenant-scoped triage/outbox schema | Keys, atomicity, revision and retention explained | pending |
| API design considerations | Specify separate simulated triage mutation and replay/conflict outcomes | Walk lost acknowledgement and stale revision examples | pending |
| Mock interviews | One 20-minute mixed mock | Record answers/gaps; no invented score | pending |
| System design problems | Offline warehouse sync scenario using triage design | Changed condition handled aloud | pending |
| Behavioral questions | Rehearse WMS ownership and Campaigns reuse stories | Personal action, result evidence and limitation | pending |

Current Riverpod guidance prefers Notifier/AsyncNotifier over StateNotifier. The requested StateNotifier topic remains as a comparison/migration exercise. [Riverpod migration guide](https://riverpod.dev/docs/migration/from_state_notifier). Mockito is explicitly included even though earlier plans used Mocktail; avoid adding both for the same test. [Official Mockito recipe](https://docs.flutter.dev/cookbook/testing/unit/mocking). Integration tests need actual execution evidence on an available target. [Flutter integration testing](https://docs.flutter.dev/testing/integration-tests).

## Today-only execution order

These are **timeboxes, not a completion guarantee**: 8 hours focused work plus breaks, assuming the existing SDK and one device target work. Re-estimate after the first working slice. If less time remains, reduce the depth of secondary exercises and label their actual coverage level; never mark an unrun example tested.

| Block | Timebox | Deliverable |
|---|---:|---|
| 1 | 90 min | Valid model, fixture-backed list/detail, first tests; refactor one data path to domain/repository/use case |
| 2 | 75 min | Main Cubit flow, filter stream/sink, small Bloc equivalent, Riverpod provider/notifier/DI comparison tests |
| 3 | 60 min | Same screens gain slivers, one painter, three tiny animation examples; render-object inspection |
| 4 | 45 min | One native method/device value on one target, with error handling |
| 5 | 90 min | Mockito case, widget/golden/integration checks and coverage; CI workflow documented and checked |
| 6 | 45 min | Schema/API diagram, replay/conflict tabletop example, résumé design defense |
| 7 | 45 min | Mock interview, targeted repair, final launch and verification |

Take breaks between blocks. Tests start in block 1; block 5 finishes them. If a setup problem lasts more than 15 minutes, isolate it: use a fixture/fake to preserve the working app, record the real-device/hosted-CI portion as blocked, and revisit once. Design coverage is valid when explicitly labeled; it is not implementation evidence.

## What is deliberately smaller today

Full durable triage persistence, production sync scheduling, two-client network infrastructure, multi-tenant authentication, complete Campaigns recreation and real scanner/OCR integration are design/defense coverage today. Optionally add one deterministic in-memory replay/conflict test using a fake remote, clearly labeled non-durable. No new backend, polished dashboard, multi-platform release, map, custom RenderObject implementation or long animation sequence.

The previous résumé pivot's outbox contract remains the design reference. Do not describe it as implemented offline support. MVVM describes presentation organization and can sit inside Clean Architecture; the dependency direction and useful boundaries matter more than labels.

## Finish line and handoff

A finished **today build** launches the list/detail flow, demonstrates filter/visual/native behavior, and has passing generation/analyze/relevant tests with known limitations recorded. A finished **coverage pass** has evidence for every row, explicitly labeled implemented/tested/explained or blocked. A finished **interview preparation** requires observed answers; it cannot be auto-awarded at the end of the build.

Record evidence in the table or a linked run log as work happens: file/test identifier or explanation, result, environment and unresolved issue. Freeze feature additions before the final block. Never make CI green by skipping failing checks or blindly regenerating golden baselines.

First move remains the unfinished Earthquake model and a single fixture mapping. Finish that before opening multiple tutorials.

Ruflo evidence: hooks_route for today's coverage pivot; learned deadline and scope constraint stored in learnings/tremor-today-coverage-2026-09-06, recalled with memory_retrieve before authoring, applied in this file. This turn changes planning documents only; code/CI creation and their ARGUS checks belong to implementation sessions.
