# Dart + Flutter — Coverage-Complete Syllabus

**Built:** 2026-09-04 · **For:** LTIMindtree Flutter role, ~3 YOE lateral
**Evidence base:** `_bmad-output/planning-artifacts/research/dart_flutter/` (5 dossiers, ~330 KB, source-verified)
**Companion docs:** [SPRINT_3DAY.md](SPRINT_3DAY.md) · [CAPSTONE.md](CAPSTONE.md)

---

## How to read this

Every concept in Dart and Flutter that a 3-YOE interview can plausibly touch is listed here. That
is the point — **nothing should be a surprise**. But 15 hours cannot master 280 rows, so every row
carries a tier that says what "done" means for it:

| Tier | Meaning | "Done" test | Rows |
|---|---|---|---|
| **P1 · DRILL** | Write it by hand, unaided, from memory | You typed it and it compiled | **71** |
| **P2 · SPEAK** | Explain it aloud in 2–3 sentences with the trap named | You said it out loud, correctly, without notes | **106** |
| **P3 · KNOW-OF** | Recognise the term, one-line gist, admit the boundary honestly | You could say "I know what that is, I haven't used it" | **42** |

**P3 is not failure.** "I know what a federated plugin is; I've not authored one" is a *strong*
answer at 3 YOE. Fabricating depth is the failure. The honest boundary is the differentiator.

**Column key:** `§` = dossier section for the detail. `⚠` = a named interview trap lives here.

---

## Domain 0 — The OA Gate (fires FIRST, before any Flutter round)

> The LTIMindtree funnel opens with a ~120–130 min proctored assessment: English/comprehension,
> logical + quantitative aptitude, **CS fundamentals (OOP/DBMS/OS/networks)**, and 1–2 **easy**
> coding problems. This is gate zero and it is *not* a Flutter test. Devang's existing 90-day
> curriculum material covers it at near-zero extra cost — reuse, don't rebuild.

| ID | Topic | Tier | Note |
|---|---|---|---|
| OA-01 | Quantitative aptitude — ratios, percentages, time/work/speed | P2 | Standard Indian-services OA fare |
| OA-02 | Logical reasoning — series, puzzles, syllogisms | P2 | |
| OA-03 | English comprehension + (2026 accounts) a spoken-English AI section | P2 | ⚠ one 2026 source reports ~20 min spoken assessment |
| OA-04 | OOP fundamentals — encapsulation, inheritance, polymorphism, abstraction | P2 | Reuse existing curriculum |
| OA-05 | DBMS — normalisation, ACID, joins, indexes | P2 | **Already covered** by SQL 10-day track |
| OA-06 | OS — processes vs threads, scheduling, deadlock, memory | P2 | Already in 90-day plan |
| OA-07 | Networks — TCP/IP, HTTP, DNS | P2 | Already in 90-day plan |
| OA-08 | Easy coding problems — arrays, strings, hashmaps | **P1** | ⚠ **Use your most fluent language, not Dart**, unless Dart is genuinely comfortable |

---

## Domain 1 — Dart Language Surface

§ = [dossier 01](../planning-artifacts/research/dart_flutter/01_dart_language_and_runtime.md)

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| D-01 | `var` / `dynamic` / `Object?` — the three "any type" impostors | P2 | A.1 | ⚠ `dynamic` disables static checking; `Object?` does not |
| D-02 | `final` vs `const` — runtime vs compile-time constant | **P1** | A.1 | ⚠ `final` list contents are still mutable |
| D-03 | `late` — deferred init, late final, LateInitializationError | P2 | A.1 | |
| D-04 | Type inference rules | P2 | A.1 | |
| D-05 | Sound null safety — the full model, NNBD | **P1** | A.2 | |
| D-06 | Flow analysis, definite assignment, promotion | P2 | A.2 | ⚠ promotion fails on non-local/public fields |
| D-07 | `!` `?.` `??` `??=` `?..` | **P1** | A.2 | ⚠ `!` is an assertion, not a conversion |
| D-08 | Nullability + generics interaction | P3 | A.2 | |
| D-09 | Soundness — what Dart guarantees | P2 | A.3 | |
| D-10 | Covariance / contravariance; `covariant` keyword | P2 | A.3 | ⚠ **generics are the one deliberately unsound corner**; runtime write-checks patch it |
| D-11 | Declaration-site variance (`in`/`out`/`inout`) | P3 | A.3 | Status = Medium confidence |
| D-12 | Bounded type parameters | P2 | A.3 | |
| D-13 | Top/bottom types — `Object?`, `dynamic`, `Never`, `void` | P2 | A.3 | |
| D-14 | `FutureOr<T>` | P2 | A.3 | |
| D-15 | Constructors — generative, named, factory, redirecting, const | **P1** | A.4 | ⚠ `factory` can return a cached/subtype instance |
| D-16 | Initializer lists, `super` parameters | P2 | A.4 | |
| D-17 | Getters / setters / operator overloading | P2 | A.4 | |
| D-18 | `call()` — callable objects | P3 | A.4 | |
| D-19 | `noSuchMethod` | P3 | A.4 | |
| D-20 | `extends` vs `implements` vs `with` vs `on` | **P1** | A.5 | ⚠ `implements` forces reimplementing *everything* |
| D-21 | **Mixin linearization order** | P2 | A.5 | ⚠ **the sharpest Dart trap** — last mixin wins lookup, but `super` resolves *backward* |
| D-22 | `mixin class`, diamond resolution | P3 | A.5 | |
| D-23 | Class modifiers — `sealed` `final` `base` `interface` | P2 | A.6 | ⚠ `sealed` ⇒ exhaustive switch; that's the *reason* to use it |
| D-24 | Records + destructuring | **P1** | A.7 | |
| D-25 | Patterns, switch expressions, exhaustiveness, if-case | **P1** | A.7 | |
| D-26 | Extension methods | P2 | A.8 | |
| D-27 | **Extension types** (3.3+) — zero-cost wrappers | P2 | A.8 | ⚠ compile-time only; **no runtime identity**, unlike a wrapper class |
| D-28 | Enhanced enums, generics on enums | P2 | A.9 | |
| D-29 | List / Set / Map / Iterable; growable vs fixed | **P1** | A.10 | |
| D-30 | Spread, collection-if, collection-for | **P1** | A.10 | |
| D-31 | `Iterable` laziness; `sync*` custom iterators | P2 | A.10 | ⚠ `map()` is lazy — nothing runs until iterated |
| D-32 | `const` canonicalization — identical instances | **P1** | A.11 | ⚠ **this is why `const` widgets are fast** — see FW-31 |
| D-33 | Exception vs Error; `throw` / `rethrow` / finally | **P1** | A.12 | ⚠ `Error` = programmer bug, don't catch it |
| D-34 | Stack traces, `assert` (debug-only) | P2 | A.12 | |
| D-35 | Closures + capture semantics; tear-offs | P2 | A.13 | |
| D-36 | Cascade `..` | **P1** | A.10 | |
| D-37 | Metadata / annotations | P3 | A.14 | |
| D-38 | Codegen — `build_runner`, `source_gen`, `json_serializable`, `freezed` | P2 | A.14 | ⚠ **permanent**, not a stopgap — macros are cancelled |
| D-39 | Primary constructors (3.13) | P3 | §0 | Needs SDK ≥ 3.13 |
| D-40 | Dot shorthands (3.10), null-aware elements (3.8), wildcards (3.7) | P3 | §0 | |

---

## Domain 2 — Async & Concurrency

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| A-01 | **Event loop: microtask queue vs event queue** | **P1** | B.1 | ⚠ `Future(fn)` → **event** queue; `.then`/`await`/`scheduleMicrotask` → **microtask**. Not equal priority |
| A-02 | Microtask starvation | P2 | B.1 | ⚠ recursive microtasks can starve timers indefinitely |
| A-03 | `Future` states, `.then` / `catchError` / `whenComplete` | **P1** | B.2 | |
| A-04 | `Future.wait` / `any` / `value` / `error` / `delayed` / `microtask` / `sync` | **P1** | B.2 | ⚠ `Future.wait` fails fast on first error |
| A-05 | Unhandled future errors | P2 | B.2 | |
| A-06 | `async`/`await` desugaring | P2 | B.3 | |
| A-07 | Streams — single-subscription vs broadcast | **P1** | B.4 | ⚠ single-subscription can only be listened to **once** |
| A-08 | `StreamController`, `listen`/`onDone`/`onError`, subscription lifecycle | **P1** | B.4 | ⚠ **not cancelling = memory leak** |
| A-09 | Pause / resume / backpressure | P2 | B.4 | |
| A-10 | `async*` / `yield` / `yield*` | P2 | B.4 | |
| A-11 | Stream transformers & operators | P2 | B.4 | |
| A-12 | Zones, `runZonedGuarded` | P3 | B.5 | Why Flutter uses them for error capture |
| A-13 | **Isolates — no shared memory** | P2 | B.6 | ⚠ *the* Dart concurrency answer; contrast with Java threads |
| A-14 | `SendPort` / `ReceivePort`, what can cross | P2 | B.6 | |
| A-15 | `Isolate.run` / `compute()` | **P1** | B.6 | ⚠ **async ≠ parallel** — `await` never leaves the thread |
| A-16 | Isolate groups, transferable typed data | P3 | B.6 | |
| A-17 | Dart vs JS event loop; Dart vs Java threads | P2 | B.7 | Interviewers love this contrast — Devang's JS knowledge transfers directly |

---

## Domain 3 — Runtime & Compilation Internals

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| R-01 | JIT (dev) vs AOT (release) | P2 | C.1 | |
| R-02 | **Hot reload vs hot restart vs full restart** | **P1** | C.1 | ⚠ hot reload **never** re-runs `main()`, static init, or `initState()` |
| R-03 | What forces a full restart | P2 | C.1 | ⚠ class-shape changes (type-arg count, enum↔class) are hard-rejected |
| R-04 | Kernel/dill, CFE, snapshot kinds | P3 | C.2 | |
| R-05 | Tree shaking; what defeats it | P2 | C.3 | |
| R-06 | VM object model — Smis (tag 0), heap objects (tag 1) | P3 | C.4 | |
| R-07 | **GC** — generational; Cheney scavenger (new), mark-sweep/compact (old) | P3 | C.4 | Why it suits UI workloads |
| R-08 | dart2js vs dart2wasm | P3 | C.5 | ⚠ dart2js loses int precision past 2^53; dart2wasm restores true 64-bit |
| R-09 | FFI basics | P3 | C.6 | |
| R-10 | int/double semantics, overflow, `==` vs `identical` | P2 | C.7 | |

---

## Domain 4 — Flutter Framework Internals ★ HIGHEST LEVERAGE

§ = [dossier 02](../planning-artifacts/research/dart_flutter/02_flutter_framework_internals.md)

> Every source consulted asks from this domain. It needs **no coding** to answer. This is the
> single best credibility-per-minute in the syllabus.

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| FW-01 | **Widget vs Element vs RenderObject — what each IS** | **P1** | A.1 | ⚠ the widget is *not* the thing on screen |
| FW-02 | Why three trees exist | **P1** | A.1 | Derive from: immutable config must be cheap to recreate |
| FW-03 | Widget = immutable configuration; `createElement()` | **P1** | A.1 | |
| FW-04 | **Element lifecycle — 5 states** | P2 | A.2 | ⚠ `initial/active/inactive/**failed**/defunct` — secondary sources wrongly say 4 |
| FW-05 | `mount` / `activate` / `deactivate` / `unmount` | P2 | A.2 | |
| FW-06 | **`Element.updateChild()` + `Widget.canUpdate()`** | **P1** | A.3 | ⚠ match rule = `runtimeType` **+** `key` |
| FW-07 | `updateChildren()` keyed-list diff (multi-pass) | P2 | A.4 | |
| FW-08 | **Keys** — Value / Object / Unique / Global | **P1** | A.5 | ⚠ without a key, identity is **positional** — reorder swaps state |
| FW-09 | `GlobalKey` — cost, moving elements, preserving state | P2 | A.5 | ⚠ expensive; not a default tool |
| FW-10 | **State lifecycle** — createState → initState → didChangeDependencies → build → didUpdateWidget → deactivate → dispose | **P1** | A.6 | ⚠ can't use `context` for inherited lookups in `initState` |
| FW-11 | `didUpdateWidget` vs `didChangeDependencies` triggers | P2 | A.6 | ⚠ parent rebuild vs InheritedWidget change |
| FW-12 | **`setState` = `markNeedsBuild` + schedule** | **P1** | A.7 | ⚠ rebuilds the whole subtree from that element down; throws after dispose |
| FW-13 | BuildOwner, dirty list, `buildScope`, depth sorting | P2 | B.1 | Why rebuilds are top-down |
| FW-14 | **BuildContext IS the Element** | **P1** | B.2 | ⚠ explains every `of(context)` behaviour |
| FW-15 | **`InheritedWidget` + `dependOnInheritedWidgetOfExactType`** | **P1** | B.3 | |
| FW-16 | The real O(1) mechanism — `PersistentHashMap<Type, InheritedElement>` | P2 | B.3 | ⚠ not "Flutter caches it" folklore; a real map propagated down |
| FW-17 | `updateShouldNotify`; InheritedModel / InheritedNotifier | P2 | B.3 | |
| FW-18 | "Provider not found" / context-above-provider error | **P1** | B.3 | ⚠ classic bug — the context is above the provider |
| FW-19 | PipelineOwner — flushLayout / CompositingBits / Paint / Semantics | P2 | B.4 | |
| FW-20 | **Constraints model: down → sizes up → parent positions** | **P1** | B.5 | ⚠ *the* layout sentence; nearly every layout bug violates it |
| FW-21 | BoxConstraints — tight / loose / bounded / unbounded | **P1** | B.5 | ⚠ unbounded ⇒ the classic overflow / infinite-height errors |
| FW-22 | `performLayout`, `parentUsesSize`, relayout boundaries, `sizedByParent` | P2 | B.5 | |
| FW-23 | Intrinsic sizes | P2 | B.6 | ⚠ **O(n²)** — stated verbatim in `box.dart`; avoid |
| FW-24 | Sliver protocol — SliverConstraints / SliverGeometry | P3 | B.7 | |
| FW-25 | Painting, PaintingContext, Canvas | P2 | B.8 | |
| FW-26 | **Layer tree, `RepaintBoundary`, compositing** | P2 | B.8 | ⚠ misuse *costs* memory — not a free win |
| FW-27 | CustomPainter, `shouldRepaint`, `saveLayer` cost | P2 | B.8 | |
| FW-28 | **Frame pipeline** — vsync → build → layout → paint → composite → raster | **P1** | C.1 | |
| FW-29 | `SchedulerPhase`; transient / persistent / post-frame callbacks | P2 | C.1 | |
| FW-30 | **UI vs raster vs platform vs IO threads** | P2 | C.2 | ⚠ **"Great Thread Merge"** — UI+platform merged by default since 3.29 (mobile) / 3.35 (desktop) |
| FW-31 | **Why `const` matters** — canonicalization → identity → `canUpdate` short-circuit | **P1** | D.1 | ⚠ the full mechanical chain, not "it's faster" |
| FW-32 | Ticker, TickerProvider, `vsync` | P2 | C.3 | ⚠ `vsync` stops offscreen animations burning CPU |
| FW-33 | AnimationController / Animation / Tween / Curve | **P1** | C.3 | |
| FW-34 | AnimatedBuilder vs AnimatedWidget; implicit vs explicit | P2 | C.3 | |
| FW-35 | Hero animations | P3 | C.3 | |
| FW-36 | **Skia vs Impeller — current per-platform truth** | P2 | C.4 | ⚠ iOS: no opt-out. Android: default API 29+, OpenGL fallback below. **Web: still Skia** |
| FW-37 | Shader-compilation jank — the problem Impeller solved | P2 | A6/C.4 | |
| FW-38 | Embedder architecture, `dart:ui`, C++ engine boundary | P3 | C.5 | |
| FW-39 | Semantics tree — the fourth tree | P3 | C.6 | |
| FW-40 | `ListView` vs `ListView.builder`, `cacheExtent`, `itemExtent` | **P1** | D.2 | ⚠ non-builder builds **every** child eagerly |
| FW-41 | Rebuild vs relayout vs repaint — three separable costs | P2 | D.3 | |

---

## Domain 5 — State Management

§ = [dossier 03](../planning-artifacts/research/dart_flutter/03_state_architecture_data.md)

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| SM-01 | `setState` + lifting state up — when genuinely correct | **P1** | A.1 | |
| SM-02 | Raw InheritedWidget / InheritedNotifier | P2 | A.2 | The substrate everything else is built on |
| SM-03 | ChangeNotifier, ValueNotifier, ListenableBuilder, ValueListenableBuilder | **P1** | A.3 | ⚠ `ChangeNotifier` must be disposed |
| SM-04 | **Provider** — ChangeNotifierProvider, Consumer, MultiProvider, ProxyProvider | **P1** | A.4 | |
| SM-05 | `context.watch` / `read` / `select` | **P1** | A.4 | ⚠ `read` in build / `watch` in callbacks = the two classic errors |
| SM-06 | Riverpod — providers, `ref.watch/read/listen` | P2 | A.5 | |
| SM-07 | `AsyncValue`, family, autoDispose, `@riverpod` codegen | P2 | A.5 | ⚠ `AsyncValue` models loading/error **built-in** — Provider doesn't |
| SM-08 | Notifier / AsyncNotifier; testing via ProviderContainer + overrides | P3 | A.5 | |
| SM-09 | **BLoC — events → states, streams underneath** ★ | **P1** | A.6 | **The chosen narrative** — LTIMindtree client profile |
| SM-10 | **Cubit — when it beats Bloc** | **P1** | A.6 | ⚠ no event class; simpler; still testable |
| SM-11 | BlocProvider / BlocBuilder / BlocListener / BlocConsumer / BlocSelector | **P1** | A.6 | |
| SM-12 | `buildWhen` / `listenWhen` | P2 | A.6 | |
| SM-13 | `bloc_concurrency` transformers — concurrent/sequential/droppable/restartable | P3 | A.6 | Strong senior signal if it comes up |
| SM-14 | `hydrated_bloc` | P3 | A.6 | |
| SM-15 | GetX — and the **April 2026 repository disappearance** | P2 | A.7 | ⚠ maintainer's GitHub account deleted, restored 28 Apr. Naming this unprompted = strong currency signal |
| SM-16 | MobX, signals, Redux — honest current standing | P3 | A.7 | |
| SM-17 | **The decision matrix** — testability, compile-time vs runtime errors, boilerplate vs team size, bus factor | **P1** | A.8 | ⚠ articulate **in that order** — it's what interviewers want |

---

## Domain 6 — Architecture

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| AR-01 | **Flutter's OFFICIAL guidance = MVVM** (not Clean Architecture) | **P1** | B.1 | ⚠ most candidates recite Clean; citing official MVVM is a cheap correctness win |
| AR-02 | UI layer — Views (trivial logic only) + ViewModels (state + Commands) | **P1** | B.1 | |
| AR-03 | Data layer — Repositories (source of truth, caching/retry) + Services (stateless, one per source) | **P1** | B.1 | ⚠ **repositories never know about each other** |
| AR-04 | Optional domain layer — Use-cases/Interactors, only when justified | P2 | B.1 | |
| AR-05 | Clean Architecture in Flutter — and the honest over-application critique | P2 | B.2 | |
| AR-06 | Layer-first vs **feature-first** folder structure | P2 | B.3 | |
| AR-07 | Repository pattern, data sources, DTOs & mappers | **P1** | B.4 | ⚠ entities ≠ models — map at the boundary |
| AR-08 | DI — `get_it`, `injectable`, Riverpod-as-DI; service locator vs constructor injection | P2 | B.5 | |
| AR-09 | Immutability — `freezed`, `equatable`, `json_serializable` | **P1** | B.6 | ⚠ value equality is why state comparison works |
| AR-10 | Sealed classes / union types for state | **P1** | B.6 | |
| AR-11 | Error handling — exceptions vs Result/Either; **`fpdart` (dartz is dead)** | P2 | B.7 | ⚠ citing `dartz` dates you |
| AR-12 | Modularisation — melos, multi-package monorepos | P3 | B.8 | |

---

## Domain 7 — Navigation

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| NV-01 | Navigator 1.0 — push/pop, named routes, `onGenerateRoute`, arguments | **P1** | C.1 | |
| NV-02 | Navigator 2.0 / Router — RouterDelegate, RouteInformationParser, Pages API | P2 | C.2 | ⚠ know *why* it's considered hard; you needn't have used it raw |
| NV-03 | **`go_router`** — published under the **verified `flutter.dev` account** | **P1** | C.3 | ⚠ it's Flutter-team-owned, not third-party |
| NV-04 | Nested / shell routes, redirects & auth guards, typed routes | P2 | C.3 | |
| NV-05 | auto_route, beamer — current standing | P3 | C.4 | |
| NV-06 | Deep links / app links on Android & iOS | P2 | C.5 | |

---

## Domain 8 — Data, Networking & Storage

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| DA-01 | `http` vs **`dio`** — interceptors, cancel tokens, retry, error mapping | **P1** | D.1 | ⚠ interceptors are the answer to "how do you refresh tokens?" |
| DA-02 | REST + JSON serialization strategies | **P1** | D.2 | |
| DA-03 | GraphQL, WebSockets, gRPC in Flutter | P3 | D.2 | |
| DA-04 | `shared_preferences`, `flutter_secure_storage` | **P1** | D.3 | ⚠ never put tokens in shared_preferences |
| DA-05 | `sqflite`, **`drift`** | P2 | D.3 | |
| DA-06 | **`hive` / `isar` are effectively ABANDONED** | P2 | D.3 | ⚠ stables 3–4 yrs old; **drift / ObjectBox are the 2026 answers** |
| DA-07 | Offline-first — caching, sync, conflict handling, connectivity | P2 | D.4 | |
| DA-08 | Firebase — auth, firestore, FCM, crashlytics, remote config, analytics | P2 | D.5 | |
| DA-09 | Auth — token storage, refresh, interceptor re-auth, biometrics | P2 | D.6 | |

---

## Domain 9 — UI, Widgets & Product Concerns

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| UI-01 | Stateless vs Stateful — and when Stateless is right | **P1** | — | |
| UI-02 | Core layout — Row/Column/Stack/Expanded/Flexible/Container/Padding | **P1** | — | ⚠ Expanded vs Flexible (`fit`) |
| UI-03 | Scrolling — ListView, GridView, SingleChildScrollView, CustomScrollView | **P1** | — | |
| UI-04 | Forms — `Form`, `TextFormField`, validators, `FocusNode` | **P1** | E.3 | |
| UI-05 | Theming, **Material 3**, Cupertino | P2 | E.1 | |
| UI-06 | Responsive/adaptive — LayoutBuilder, MediaQuery, breakpoints | P2 | E.1 | ⚠ `flutter_screenutil` is **unverified uploader**, ~2 yrs stale |
| UI-07 | i18n — `intl`, ARB, `flutter_localizations`, `gen-l10n` | P2 | E.2 | |
| UI-08 | Accessibility — Semantics, contrast, screen readers | P2 | E.4 | |
| UI-09 | Images — caching, resolution, `cacheWidth`, `precacheImage` | P2 | A5 | |

---

## Domain 10 — Performance Engineering

§ = [dossier 04](../planning-artifacts/research/dart_flutter/04_performance_testing_tooling_native.md)

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| PF-01 | DevTools — inspector, performance, CPU profiler, memory, app-size | P2 | A1 | |
| PF-02 | **Build modes — debug / profile / release** | **P1** | A2 | ⚠ **never profile in debug** — it's the #1 wrong-answer |
| PF-03 | **UI-thread jank vs raster-thread jank — different causes, different fixes** | **P1** | A3 | ⚠ *the* senior-signal performance answer |
| PF-04 | Debug flags — `debugProfileBuildsEnabled`, `debugRepaintRainbowEnabled`, `timeDilation` | P3 | A4 | |
| PF-05 | Widget optimisations — const, splitting, RepaintBoundary, avoid Opacity/saveLayer | **P1** | A5 | |
| PF-06 | Memory leaks — undisposed controllers/streams/listeners; `leak_tracker` | **P1** | A7 | ⚠ the most common real Flutter bug |
| PF-07 | Startup time, deferred loading | P3 | A8 | |
| PF-08 | App size — `--split-debug-info` + `--obfuscate`, `--analyze-size`, ABI splits | P3 | A8 | ⚠ the two flags must ship **together** for symbolication |
| PF-09 | Perf regression testing in CI | P3 | A9 | |

---

## Domain 11 — Testing

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| TS-01 | Unit tests — `test`, matchers, setUp/tearDown, groups | **P1** | B1 | |
| TS-02 | **`mocktail` vs `mockito`** | P2 | B2 | ⚠ mocktail = no codegen, now the default recommendation |
| TS-03 | **Widget tests — `testWidgets`, WidgetTester, finders** | **P1** | B3 | ★ "most underrated differentiator" |
| TS-04 | **`pump` vs `pumpAndSettle`** | **P1** | B3 | ⚠ `pumpAndSettle` **hangs forever** on infinite animations |
| TS-05 | Mocking platform channels in tests | P3 | B3 | |
| TS-06 | Golden tests — `matchesGoldenFile`, golden_toolkit→Alchemist, CI font flakiness | P3 | B4 | |
| TS-07 | Integration tests — `integration_test`, **Patrol** for native | P3 | B5 | |
| TS-08 | `bloc_test`; Riverpod overrides | P2 | B6 | |
| TS-09 | Coverage, lcov, CI thresholds | P3 | B7 | |
| TS-10 | Testable architecture = dependency inversion | P2 | B8 | |

---

## Domain 12 — Tooling & Workflow

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| TO-01 | Flutter CLI — doctor/run/build/test/analyze/pub/clean/gen-l10n | **P1** | C1 | |
| TO-02 | `analysis_options.yaml`; `flutter_lints` vs `very_good_analysis` | P2 | C2 | |
| TO-03 | `pubspec.yaml` — caret constraints, dev_dependencies, assets/fonts | **P1** | C3 | |
| TO-04 | **`pubspec.lock` — commit for apps, not for packages** | P2 | C3 | ⚠ a crisp, checkable answer |
| TO-05 | `build_runner`, watch mode, `--delete-conflicting-outputs` | P2 | C4 | |
| TO-06 | Debugging — breakpoints, `debugPrint`, DevTools debugger | P2 | C6 | |
| TO-07 | **fvm** + Flutter channels | P2 | C7 | Devang already uses fvm |

---

## Domain 13 — CI/CD, Flavors & Release

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| RL-01 | **Flavors** — Gradle productFlavors, Xcode schemes, `--flavor` | P2 | D1 | |
| RL-02 | `--dart-define` / `--dart-define-from-file` — secretless config | P2 | D1 | ⚠ how you avoid committing secrets |
| RL-03 | Android — signing, keystore, minSdk/targetSdk, R8/ProGuard, **AAB mandatory** | P2 | D2 | |
| RL-04 | iOS — provisioning profiles, certificates, code signing, TestFlight | P2 | D3 | |
| RL-05 | CI — GitHub Actions, Codemagic, Bitrise, **Azure DevOps** | P2 | D4 | ★ Azure is common at IT-services shops |
| RL-06 | Fastlane — match/gym/deliver/pilot/supply | P3 | D5 | |
| RL-07 | Crashlytics vs Sentry | P2 | D6 | |
| RL-08 | **Shorebird** OTA — Dart-only patches, store-compliance boundary | P3 | D7 | ⚠ cannot patch native code or assets |

---

## Domain 14 — Native Interop

| ID | Topic | Tier | § | Trap |
|---|---|---|---|---|
| NT-01 | **MethodChannel / EventChannel / BasicMessageChannel** | **P1** | E1 | ⚠ **always async**, even for trivial calls |
| NT-02 | StandardMessageCodec; `PlatformException` propagation | P2 | E1 | |
| NT-03 | **Pigeon** — type-safe codegen over hand-written channels | P2 | E2 | ⚠ the current recommendation; hand-written channels are stringly-typed |
| NT-04 | `dart:ffi` — structs, callbacks, `NativeFinalizer`, ownership | P3 | E3 | |
| NT-05 | Native assets (stable Dart 3.10, default Flutter 3.38) | P3 | E3 | |
| NT-06 | **Federated plugin architecture** + `plugin_platform_interface` | P3 | E4 | ⚠ good P3 honesty answer |
| NT-07 | Background isolates, `BackgroundIsolateBinaryMessenger`, WorkManager vs iOS BGTaskScheduler | P3 | E5 | ⚠ iOS guarantees are weaker — a real answer |
| NT-08 | Platform views — hybrid composition cost | P3 | E6 | |
| NT-09 | `permission_handler` | P2 | E7 | |
| NT-10 | **Add-to-app** — embedding Flutter in an existing native app | P2 | E8 | ★ the legacy-modernisation pattern services firms actually sell |

---

## Domain 15 — The Human Rounds

| ID | Topic | Tier | Note |
|---|---|---|---|
| HR-01 | **The pivot narrative** — adjacent depth, honest Flutter boundary | **P1** | ⚠ never fabricate a Flutter project history |
| HR-02 | STAR stories from real cross-stack work (race condition, leak, bad API contract) | **P1** | These are *true* and survive follow-ups |
| HR-03 | "Why LTIMindtree" | P2 | |
| HR-04 | Client round — fit + communication weighted as heavily as depth | P2 | ⚠ delivery matters more than perfection here |
| HR-05 | Notice period (90 days, buyout is manager-discretion), relocation, comp | P2 | Know before HR round |
| HR-06 | Views on AI | P3 | One 2026 account reports this asked |

---

## Coverage Ledger

Counts below are **machine-counted from the tables above**, not estimated.

| Domain | Rows | P1 | P2 | P3 |
|---|---|---|---|---|
| 0 · OA Gate | 8 | 1 | 7 | 0 |
| 1 · Dart Language | 40 | 12 | 20 | 8 |
| 2 · Async | 17 | 6 | 9 | 2 |
| 3 · Runtime | 10 | 1 | 4 | 5 |
| 4 · Flutter Internals ★ | 41 | 16 | 21 | 4 |
| 5 · State Management | 17 | 8 | 5 | 4 |
| 6 · Architecture | 12 | 6 | 5 | 1 |
| 7 · Navigation | 6 | 2 | 3 | 1 |
| 8 · Data & Storage | 9 | 3 | 5 | 1 |
| 9 · UI & Product | 9 | 4 | 5 | 0 |
| 10 · Performance | 9 | 4 | 1 | 4 |
| 11 · Testing | 10 | 3 | 3 | 4 |
| 12 · Tooling | 7 | 2 | 5 | 0 |
| 13 · Release | 8 | 0 | 6 | 2 |
| 14 · Native | 10 | 1 | 4 | 5 |
| 15 · Human | 6 | 2 | 3 | 1 |
| **TOTAL** | **219** | **71** | **106** | **42** |

> **71 P1 rows is more than 15 hours can drill to true fluency.** That is a deliberate, stated
> overshoot, not an oversight: the syllabus is sized for the *role*, not for the weekend.
> [SPRINT_3DAY.md](SPRINT_3DAY.md) sequences P1 by leverage and names explicitly which P1 rows get
> sacrificed first if time runs short — so the cut is a decision made in advance, not a panic on
> Sunday night.
>
> **After Sunday**, this file becomes the continuation plan: the unsacrificed P1s, then P2 → P3.
> Nothing researched here is wasted.
