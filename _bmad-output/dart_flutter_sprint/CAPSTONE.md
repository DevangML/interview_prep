# CAPSTONE — "Tremor" · Seismic Ops Console

**Built for:** the 3-day Dart + Flutter sprint, 2026-09-04 → 09-06
**Companions:** [SYLLABUS.md](SYLLABUS.md) · [SPRINT_3DAY.md](SPRINT_3DAY.md)

---

## The rule that governs this build

> **Devang writes 100% of the code. The coach never writes a function body.**
> Contracts, signatures, data shapes and step-skeletons only. If asked for an implementation,
> the answer is the skeleton and a refusal of the body.

This is carried forward unchanged from the Live Ops Console campaign, because it is the reason
that campaign was designed the way it was — and because **rank 2 of the prioritised 20% is
"hand-written Dart muscle memory," which reading generated code does not build.**

Second governing rule, also carried forward:

> **Concepts are load-bearing STRUCTURE, not content.** Every feature below exists because it
> forces a syllabus row. Remove the concept and the feature stops working. Nothing is decorative.

---

## Why this product

**Tremor** is a real-time seismic monitoring console over the USGS public earthquake feed.

| Reason | Detail |
|---|---|
| **The data is real, live, and keyless** | Verified 2026-09-04: `GET https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson` → **HTTP 200**, GeoJSON `FeatureCollection`, API v2.7.0. No signup, no key, no rate-limit friction. |
| **The schema is hostile in useful ways** | `mag` and `alert` are **nullable**; `time` is epoch millis; geometry is `[lon, lat, depth]` — *lon first*. Null safety, parsing and mapping stop being academic. |
| **It updates on its own** | A feed that genuinely changes makes refresh, caching and staleness real problems rather than invented ones. |
| **It reads as enterprise, not toy** | A monitoring/triage console is the shape of work LTIMindtree actually sells. A todo app is not. |
| **★ It answers the question that blocked the React build** | The parked Live Ops Console has an unanswered `feed_choice` (transit / **seismic** / market / air quality). Choosing seismic here means Monday's React work resumes with that decision already made — and yields a **genuinely strong interview story: "I built the same real-time console in React and in Flutter; here is what actually differs between them."** That story is unfakeable and it is *true*. |

Endpoints available (same shape, different windows): `all_hour`, `all_day`, `all_week`,
`all_month`, plus magnitude-filtered variants (`2.5_day`, `4.5_week`, `significant_month`).
Use `all_day` as the default — enough rows to make list performance real.

---

## Architecture — Flutter's OFFICIAL MVVM, deliberately

Not Clean Architecture. This build follows [Flutter's own published guidance](https://docs.flutter.dev/app-architecture/guide),
because being able to say *"I used the architecture Flutter itself recommends, and here's how it
differs from the Clean Architecture most tutorials teach"* is a cheap, high-signal correctness win
(syllabus **AR-01**).

```
┌─ UI LAYER ─────────────────────────────────────────────┐
│  QuakeListView ────────► QuakeListViewModel (Cubit)     │
│  QuakeDetailView ──────► QuakeDetailViewModel           │
│    · views hold NO business logic                       │
│    · view models expose Commands + sealed state         │
└──────────────────────────┬─────────────────────────────┘
                           │  domain models only
┌─ DATA LAYER ─────────────▼─────────────────────────────┐
│  QuakeRepository   ← source of truth, cache, retry      │
│    │                 (never knows another repository)   │
│    ├──► UsgsService      (HTTP, stateless)              │
│    └──► QuakeCacheService (local, stateless)            │
└─────────────────────────────────────────────────────────┘
```

**Contracts — signatures only. Bodies are Devang's.**

```dart
// domain
sealed class QuakeListState {}
class QuakeListLoading  extends QuakeListState {}
class QuakeListReady    extends QuakeListState { final List<Quake> quakes; final bool stale; }
class QuakeListEmpty    extends QuakeListState {}
class QuakeListFailed   extends QuakeListState { final QuakeError error; }

// data
abstract interface class UsgsService {
  Future<List<QuakeDto>> fetchWindow(FeedWindow window);   // throws UsgsException
}
abstract interface class QuakeCacheService {
  Future<void> write(List<QuakeDto> dtos, DateTime at);
  Future<({List<QuakeDto> dtos, DateTime at})?> read();
}
abstract interface class QuakeRepository {
  Stream<QuakeListState> watch(FeedWindow window);
  Future<void> refresh({bool force = false});
}
```

---

## Build stages — ship each before starting the next

Sized against the ~6.5 h the [sprint plan](SPRINT_3DAY.md) allocates to building. **Stage 1 is the
deliverable**; 2–4 are upside. A shipped Stage 1 beats a broken Stage 3 in every interview.

### Stage 1 · CORE — feed → list → detail *(must ship · ~3 h)*

| # | Feature | Forces |
|---|---|---|
| 1.1 | `Quake` domain model + `QuakeDto`, `freezed` + `json_serializable`, mapper at the boundary | AR-07, AR-09, D-38 |
| 1.2 | Nullable `mag`/`alert` handled without `!` anywhere | **D-05, D-07**, D-33 |
| 1.3 | `UsgsService` over `dio`, typed errors | DA-01, DA-02 |
| 1.4 | `QuakeRepository` mapping DTO → domain, emitting sealed state | AR-03, **AR-10** |
| 1.5 | `QuakeListCubit` — Commands, no logic in the view | **SM-09, SM-10**, AR-02 |
| 1.6 | `BlocBuilder` + exhaustive `switch` over sealed state | **SM-11, D-25**, D-23 |
| 1.7 | `ListView.builder` with `itemExtent`, `const` rows, `ValueKey(quake.id)` | **FW-40, FW-31, FW-08** |
| 1.8 | Loading / empty / error states all reachable and visibly distinct | AR-10, UI-01 |
| 1.9 | Tap → detail via `go_router` typed route | **NV-03**, NV-01 |
| 1.10 | Dispose every controller and subscription | **PF-06, A-08** |

**Definition of done:** launches on a device, shows live quakes, survives airplane-mode toggling
without a crash or an unhandled exception, and `flutter analyze` is clean.

### Stage 2 · REACTIVE — search, filter, refresh *(~1.5 h)*

| # | Feature | Forces |
|---|---|---|
| 2.1 | Magnitude filter + text search over `place` | UI-02, D-29 |
| 2.2 | **Debounced** search via `StreamController` + timer | **A-01, A-07, A-08**, A-11 |
| 2.3 | Pull-to-refresh (`RefreshIndicator`) with in-flight guard | A-03, A-04 |
| 2.4 | Persist last filter in `shared_preferences` | DA-04 |
| 2.5 | Explain aloud *why* debounce is a microtask/event-queue question | **A-01, A-02** |

### Stage 3 · RESILIENT — offline, isolates, native *(~1.5 h)*

| # | Feature | Forces |
|---|---|---|
| 3.1 | Cache last good payload; show it with a **stale** badge when offline | DA-07, AR-03 |
| 3.2 | Parse a large window (`all_month`) in `Isolate.run` / `compute` | **A-15, A-13** |
| 3.3 | Prove *async ≠ parallel* — a jank demo before and after | **A-15, PF-03** |
| 3.4 | `MethodChannel` reading device/battery info in the status bar | **NT-01**, NT-02 |
| 3.5 | `AnimationController` pulse on new high-magnitude arrivals | **FW-33**, FW-32 |
| 3.6 | `RepaintBoundary` around the animating element, justified aloud | **FW-26, PF-05** |

### Stage 4 · PROVEN — tests *(~0.5 h, do not skip)*

| # | Feature | Forces |
|---|---|---|
| 4.1 | Unit test the DTO→domain mapper incl. null `mag` | TS-01 |
| 4.2 | `bloc_test` over the Cubit: loading → ready, loading → failed | **TS-08, SM-09** |
| 4.3 | One `testWidgets`: pump with a fake repo, assert list renders | **TS-03, TS-04** |
| 4.4 | Mock the service with `mocktail` (no codegen) | TS-02 |

> **Testing is 30 minutes and is flagged by a current source as "the most underrated
> differentiator."** Most candidates skip it. Do not.

### Stretch — only if genuinely ahead

Flavors + `--dart-define-from-file` (RL-01/02) · golden test (TS-06) · Material 3 theming polish
(UI-05) · i18n scaffold (UI-07) · release build + `--analyze-size` (PF-08).

---

## Concept coverage — honest accounting

**This project forces 53 of the 71 P1 rows.** It does not cover all 219, and no 15-hour project
could. What it does is make every concept it touches *load-bearing* — remove it and a feature breaks.

| Domain | P1 rows | Forced by capstone | Gap covered by |
|---|---|---|---|
| 0 · OA Gate | 1 | 0 | separate — it is not a Flutter gate |
| 1 · Dart language | 12 | 9 | drills + recall (D-15, D-21 spoken) |
| 2 · Async | 6 | 5 | drills (A-17 is a spoken comparison) |
| 3 · Runtime | 1 | 1 | R-02 hot reload — exercised every minute of building |
| 4 · Flutter internals | 16 | 9 | **spoken drilling — the largest deliberate gap** |
| 5 · State management | 8 | 6 | drills (SM-04/05 Provider spoken) |
| 6 · Architecture | 6 | 6 | ✅ fully forced |
| 7 · Navigation | 2 | 2 | ✅ |
| 8 · Data & storage | 3 | 3 | ✅ |
| 9 · UI & product | 4 | 3 | UI-04 forms — stretch only |
| 10 · Performance | 4 | 3 | PF-02 build modes = one command |
| 11 · Testing | 3 | 3 | ✅ |
| 12 · Tooling | 2 | 2 | ✅ |
| 13 · Release | 0 | 0 | all P2/P3 |
| 14 · Native | 1 | 1 | ✅ |
| 15 · Human rounds | 2 | 0 | rehearsal, not code |
| **TOTAL** | **71** | **53** | |

> **The largest deliberate gap is Flutter internals (9 of 16 P1 forced).** That is *correct*, not a
> flaw: the internals cluster is answered by *explanation*, not by code — you cannot "build a
> `RepaintBoundary` question." Those rows are drilled aloud in the sprint's recall blocks. The
> capstone's job is to make them *concrete* so the explanation has a referent: when asked why
> `const` matters, the answer is a row in this list, not an abstraction.

**Explicitly NOT covered by this build, and that is fine** — these are P3 "know-of" rows, and
"I know what that is, I haven't authored one" is a strong 3-YOE answer: FFI and native assets,
federated plugin authoring, platform views, slivers beyond `CustomScrollView`, custom
`RenderObject`s, dart2wasm, GC internals, augmentations, Shorebird, Fastlane, add-to-app.

---

## Repository shape

```
tremor/
├─ lib/
│  ├─ main.dart
│  ├─ router.dart                      # go_router, typed routes
│  ├─ domain/
│  │   ├─ quake.dart                   # freezed domain model
│  │   └─ quake_list_state.dart        # sealed states
│  ├─ data/
│  │   ├─ dto/quake_dto.dart           # json_serializable
│  │   ├─ usgs_service.dart
│  │   ├─ quake_cache_service.dart
│  │   └─ quake_repository_impl.dart
│  └─ ui/
│      ├─ list/  quake_list_view.dart · quake_list_cubit.dart · quake_tile.dart
│      └─ detail/ quake_detail_view.dart
└─ test/
   ├─ mapper_test.dart · cubit_test.dart · list_widget_test.dart
```

```bash
fvm flutter create --org dev.devang tremor && cd tremor
```

Dependencies (all verified current in dossier 03/04 — **note what is deliberately absent**):
`dio` · `flutter_bloc` · `freezed_annotation` · `json_annotation` · `go_router` ·
`shared_preferences` · `equatable`
Dev: `build_runner` · `freezed` · `json_serializable` · `mocktail` · `bloc_test` · `flutter_lints`

> **Absent on purpose, and know why if asked:** `hive`/`isar` (effectively abandoned — stables 3–4
> years old), `dartz` (dead; `fpdart` if functional error handling is wanted), `get`/GetX (April 2026
> repository disappearance), `flutter_screenutil` (unverified uploader, ~2 years stale).
> Being able to justify an *omission* is a stronger signal than listing dependencies.

---

## The interview artifact this produces

Ship this and three otherwise-unavailable answers become true:

1. **"Walk me through a Flutter app you built."** — a real architecture, on Flutter's own recommended
   pattern, over a live public API.
2. **"Tell me about a Flutter bug you fixed."** — Stage 3.3 manufactures a *genuine* one: a
   main-isolate parse janking the UI, diagnosed with DevTools, fixed with `compute`. Real, yours,
   survives follow-ups.
3. **"How do you decide on state management?"** — you chose BLoC, can name the alternatives, and can
   justify four *omitted* packages on maintenance risk.

None of this requires claiming Flutter tenure you don't have. **That is the point.**
