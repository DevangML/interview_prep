# Flutter State Management, Architecture, Navigation & Data Layer — 2026 Production Landscape
### Research slice for lateral 3-YOE Flutter role at LTIMindtree
Compiled 2026-09-04. All package versions verified live against pub.dev on this date unless noted.

---

## 0. Top-line surprises (read this first)

1. **GetX's GitHub repo vanished without notice in April 2026** — the single most-downloaded package in pub.dev history had its upstream source disappear with no announcement, no migration guide, no successor, triggering a community fork (`getx_community`). The `jonataslaw` account and repo were later restored, but the incident is now the canonical cautionary tale about single-maintainer risk in Flutter's package ecosystem. This is a live, checkable 2026 event, not folklore — verified via GitHub issue threads and independent developer posts on X. ([Fall of GetX](https://medium.com/@yash22202/the-fall-of-getx-what-happened-why-it-matters-and-what-flutter-developers-must-do-now-984bb618d303), [GetX repo is back](https://medium.com/@yurinovicow/flutter-the-getx-repository-is-back-714720959843), [Gabor Varadi on X](https://x.com/Zhuinden/status/2043984331694035304), [Mike Rydstrom on X](https://x.com/RydMike/status/2044017632546873470), [jonataslaw/getx GitHub](https://github.com/jonataslaw/getx))
2. **Hive and Isar are both community-zombie packages, not actively developed ones.** Hive's last stable (2.2.3) shipped ~4 years ago; Isar's last stable (3.1.0+1) shipped ~3 years ago. Both were built by the same author (`simc`/isar.dev), who went quiet; a `4.0.0-dev` prerelease exists for each but has not gone stable in years, and a GitHub issue explicitly asks maintainers to mark Hive deprecated (500+ open issues, broken docs site). Community consensus for 2026 production work: **treat Hive/Isar as legacy to migrate off, not a platform to build on**; **Drift** is the recommended SQL-backed default. ([Hive issue #1331](https://github.com/isar/hive/issues/1331), [Luci Studio 2026 DB landscape](https://luci-studio.com/blog/the-flutter-local-database-landscape-in-2026-a-maintenance-first-guide-fe6d267c/), [pub.dev/isar](https://pub.dev/packages/isar), [pub.dev/hive](https://pub.dev/packages/hive))
3. **`flutter_screenutil` has not published in ~2 years** and is now under an **unverified uploader** on pub.dev, despite still being widely used in tutorials. It still works but is a stagnation risk to flag if named in an interview. ([pub.dev/flutter_screenutil](https://pub.dev/packages/flutter_screenutil))
4. **`go_router` is now published directly by the `flutter.dev` verified publisher** (i.e., it is Flutter-team-owned, not third-party) at v18.0.1, updated within the last two days at time of writing — this is as close to "official" as navigation gets in Flutter, and Flutter's own architecture docs call it "the preferred way to write 90% of Flutter applications." ([pub.dev/go_router](https://pub.dev/packages/go_router), [Flutter architecture recommendations](https://docs.flutter.dev/app-architecture/recommendations))
5. **`dartz` is dead; `fpdart` is the only living functional-programming package** for Dart in 2026 (Flutter Favorite, verified publisher, active — though even fpdart is mid-rewrite for a 2.0). If a candidate says "we use dartz for Either," that is now a stale answer.
6. Flutter **does have an official, current architecture guide** (`docs.flutter.dev/app-architecture`), published/maintained by the Flutter team, recommending **MVVM + repository pattern + unidirectional data flow**, demonstrated in a real sample app ("Compass"). This is the single most citable authority for an architecture interview answer in 2026.

---

## A. State management — landscape and decision framework

### A.1 `setState` and lifting state up
- **Correct when**: state is local to a single widget subtree, ephemeral (e.g., a checkbox's checked flag, a text field's focus, an animation controller's progress), and does not need to be read anywhere else in the tree. Flutter's own docs distinguish **ephemeral/UI state** (fine for `setState`) from **app state** (shared across features — needs a real state management approach).
- **The interview trap**: candidates either (a) claim `setState` is "bad" categorically, which is wrong — it is the correct minimal-cost tool for local widget state — or (b) use it for data that should be lifted, causing prop-drilling and rebuild storms. The correct kernel: **lift state up to the nearest common ancestor that needs it, no further**; if more than 2–3 levels of prop drilling result, that's the signal to reach for `InheritedWidget`/Provider/Riverpod/Bloc instead, not a signal that `setState` was wrong to use in the leaf widgets.

### A.2 InheritedWidget / InheritedNotifier (raw)
- `InheritedWidget` is the low-level primitive that `Provider`, `Riverpod`'s widget bridge, and essentially every other DI/state package builds on top of. It propagates data down the tree and notifies dependents via `context.dependOnInheritedWidgetOfExactType<T>()`, triggering rebuilds only in widgets that actually called that method during build.
- `InheritedNotifier` pairs an `InheritedWidget` with a `Listenable` (typically a `ChangeNotifier`) so it auto-rebuilds dependents when the notifier fires `notifyListeners()`, without hand-rolling `updateShouldNotify`.
- **Interview trap**: being asked "what does Provider actually do under the hood?" — correct answer: Provider is a convenience wrapper around `InheritedWidget`, nothing magic. Interviewers use this to test whether a candidate understands Flutter's actual rebuild mechanism rather than treating state packages as black boxes.

### A.3 ChangeNotifier + ValueNotifier + ListenableBuilder/ValueListenableBuilder
- `ChangeNotifier`: mutable class holding state + `notifyListeners()`; the object itself is mutable (not immutable data), so equality checks don't help — every `notifyListeners()` call is a broadcast to *all* listeners regardless of what actually changed. This is the #1 source of "why does my whole screen rebuild" bugs with Provider/ChangeNotifier-based apps.
- `ValueNotifier<T>`: a `ChangeNotifier` specialized to hold one value; pairs with `ValueListenableBuilder` to scope a rebuild to exactly the subtree depending on that value — cheaper than wrapping a whole `ChangeNotifier` subclass for a single primitive.
- `ListenableBuilder` (added to Flutter SDK directly, not a package): generic version of `ValueListenableBuilder` for any `Listenable`, letting you rebuild a subtree off a `ChangeNotifier`/`Animation`/etc. without pulling in Provider.
- Flutter's own architecture docs explicitly endorse `ChangeNotifier`+`Listenable` for the ViewModel layer as "a convenient way to have your widgets observe changes in your ViewModels" — conditional, not "strongly recommend."

### A.4 Provider (package)
- **Version**: `provider ^6.1.5+1`, last published ~12 months ago, 11k likes, 150 pub points, ~1.09M weekly downloads. Still solidly maintained, no deprecation signal. ([pub.dev/provider](https://pub.dev/packages/provider))
- Core API: `ChangeNotifierProvider`, `Consumer`/`Consumer2..6`, `MultiProvider` (flattens nested providers), `ProxyProvider` (build a provider's value *from* other providers — e.g., a repository that needs an `ApiClient` and an `AuthState`).
- `context.watch<T>()` — subscribes to rebuilds; only valid in `build()`.
- `context.read<T>()` — one-off read, no subscription; **must not be called inside `build()`** for genuine reads (fine for event handlers/`initState`); using `read` in build silently doesn't rebuild on change → stale UI bug.
- `context.select<T, R>(selector)` — subscribe to a *derived* slice of `T`, rebuild only when that slice changes; the correct fix when someone reaches for `read` inside `build` "for performance."
- **Common errors** (heavily interview-tested):
  1. `ProviderNotFoundException` — thrown when `context.watch/read<T>()` can't find a `T` above it in the tree. Classic beginner mistake: trying to read the provider from the **same context that creates it** (e.g., inside the `child` of the `ChangeNotifierProvider` itself) — the provided context is the *parent's* context, not a descendant's, so lookups fail. Fix: read via `Consumer`/`Builder` with a genuinely descendant context, or `context.watch<T?>()` to get `null` instead of throwing.
  2. "Tried to use `context.read<T>` inside a `build` method or the `update` callback of a provider" — Provider throws deliberately here because reading without subscribing inside build produces state that silently doesn't refresh.
- Provider still underlies Flutter's own official Compass sample app's DI layer — it's explicitly named in the current official architecture recommendations as the package for DI.

### A.5 Riverpod
- **Versions** (verified live): `riverpod` core, `flutter_riverpod ^3.4.3` (published 12 hours before this research), `riverpod_generator`/`riverpod_annotation` in the 2.x line for codegen tooling as of the most recent public guides, with **Riverpod 3.0 stable now current** (v2 is legacy). ([pub.dev/flutter_riverpod](https://pub.dev/packages/flutter_riverpod), [riverpod.dev/docs/whats_new](https://riverpod.dev/docs/whats_new))
- **v2 → v3 changes** (high interview value):
  - `AutoDisposeNotifier` and `Notifier` merged into one interface (no more separate autoDispose class hierarchy).
  - All providers now use `==` for equality (previously identity-based in some paths) to decide whether to notify — matters for `freezed`/value-equality models.
  - `StateProvider` and `ChangeNotifierProvider` are now explicitly **legacy**, moved to `package:riverpod/legacy.dart`.
  - New `Ref.mounted` (mirrors `BuildContext.mounted`) to guard against setting state after a provider is disposed mid-`async`.
  - Automatic retry with exponential backoff (200ms → 6.4s cap) on provider initialization failure — useful for flaky network calls.
  - Experimental **offline persistence** (cache a provider to a local DB, restore on relaunch) and experimental **Mutations** (track loading/success/error/idle for side-effectful actions like form submits) — new primitives that didn't exist in v2.
  - Exceptions inside providers are now wrapped in `ProviderException`.
- Providers as **global-but-scoped**: a Riverpod `Provider` declared as a top-level global variable is *not* global state in the traditional sense — it's a *reference* to state that lives inside a `ProviderContainer`/`ProviderScope`, so different `ProviderScope`s (e.g., in tests, or nested `ProviderScope(overrides: ...)`) get independent instances. This "global identity, scoped lifetime" model is the crux of why Riverpod claims better testability than a real global singleton — expect this to be probed directly ("if providers are global variables, how is this not just a singleton?").
- `ref.watch` (subscribe + rebuild), `ref.read` (one-off, safe in callbacks, unsafe as a substitute for `watch` in build), `ref.listen` (side-effect on change without rebuilding — e.g., show a `SnackBar` on error).
- `AsyncValue<T>` — sealed-ish union of `data`/`loading`/`error` for wrapping `Future`/`Stream`-backed providers; `.when(data:, loading:, error:)` forces exhaustive handling — a very common interview whiteboard ask ("how do you show a spinner and an error banner from one provider without nested if/else").
- `.family` — parameterize a provider by an argument (e.g., `userProvider.family(userId)`); `.autoDispose` — tear down provider state when no widget listens anymore (critical for avoiding memory leaks in list/detail flows). Combining `.family` + `.autoDispose` is idiomatic for "load detail screen data, discard when navigated away."
- Code generation with `@riverpod` (via `riverpod_generator` + `build_runner`) is now the **documented default** way to declare providers — hand-written `Provider((ref) => ...)` still works but generated `Notifier`/`AsyncNotifier` classes are what current docs/tutorials lead with.
- `Notifier`/`AsyncNotifier` are the v3 replacement for `StateNotifier`/`StateNotifierProvider` (also legacy now) — mutable-state class with an explicit `build()` for the initial/derived value, mutated via methods on the class rather than external functions.
- **Testing**: `ProviderContainer` (optionally `ProviderContainer.test()` in v3 for automatic disposal) lets you read/override providers without a widget tree at all — a major reason Riverpod is favored for "test business logic in plain Dart, no `WidgetTester` needed." Overrides (`provider.overrideWith(...)`, `overrideWithValue(...)`) swap real implementations for fakes per test.
- **Confidence**: high on version numbers (fetched live from pub.dev/riverpod.dev within this session); medium on exact ecosystem sentiment numbers (survey blog posts, not a controlled instrument).

### A.6 BLoC / Cubit — weighted heavily (Indian services companies over-index here)
- **Versions**: `bloc ^9.2.x`, `flutter_bloc ^9.1.1` (published ~16 months ago, 8.07k likes, 160 pub points, ~1.87M weekly downloads, "Flutter Favorite", verified publisher `bloclibrary.dev`); `bloc_concurrency ^0.3.0` (19 months ago); `hydrated_bloc ^11.0.0` (5 months ago). All still actively used and maintained under one publisher umbrella. ([pub.dev/flutter_bloc](https://pub.dev/packages/flutter_bloc), [pub.dev/bloc_concurrency](https://pub.dev/packages/bloc_concurrency), [pub.dev/hydrated_bloc](https://pub.dev/packages/hydrated_bloc))
- **Core model**: events flow in, states flow out — `Bloc<Event, State>` is literally `Stream<State>` under a `StreamController`/`sink` mapping events to states via `on<Event>((event, emit) { ... })` handlers. `Cubit<State>` is the same idea *minus* the event layer: you call methods directly on the cubit (`cubit.increment()`) which call `emit(newState)`.
- **When Cubit beats Bloc**: simple, direct state mutations with no need for an audit trail of *why* state changed, no complex event-driven choreography, and a smaller team that doesn't need the event-sourcing-like traceability. Cubit is less boilerplate; Bloc's advantage is that every state transition is provably caused by a named, loggable `Event`, which is valuable for **regulated / audit-heavy enterprise domains** — exactly what a services-company client (BFSI, healthcare) will ask about. This is the single most quoted 2026 heuristic: *"Choose BLoC... when you need strict event-driven architecture for audit trails (financial or healthcare apps)."*
- **Widgets**:
  - `BlocProvider` — DI-style widget that creates/provides a bloc/cubit to descendants (parallels `ChangeNotifierProvider`).
  - `BlocBuilder` — rebuilds on every state change (optionally gated by `buildWhen`).
  - `BlocListener` — runs a one-off side effect (navigation, snackbar, dialog) on state change, no rebuild — gated by `listenWhen`.
  - `BlocConsumer` — combines both `builder` + `listener` in one widget (avoids nesting a `BlocListener` inside a `BlocBuilder`).
  - `BlocSelector` — like `BlocBuilder` but subscribes to a **derived value** of state (parallel to Provider's `context.select`), avoiding rebuilds when the selected slice hasn't changed — a common "how do you avoid unnecessary rebuilds in Bloc" interview answer.
  - `buildWhen`/`listenWhen` — optional predicates `(previous, current) => bool` gating whether `builder`/`listener` fire on a given transition; the correct kernel for "the whole screen flickers on every emit" complaints.
- **Event transformers** (`bloc_concurrency` package, inspired by ember-concurrency): control how concurrently-added events of the *same type* are processed by an event handler —
  - `concurrent()` (bloc default) — processes events in parallel, no ordering guarantee.
  - `sequential()` — queues and processes one at a time in order (classic use: chat message send-in-order).
  - `droppable()` — ignores new events of that type while one is already being processed (classic use: debounce a "submit" button so double-taps don't double-fire).
  - `restartable()` — cancels the in-flight handler and starts over on a new event of that type (classic use: search-as-you-type, only the latest query's results matter).
  - Interview trap: candidates conflate `droppable` and `restartable` — droppable *ignores* the new one, restartable *cancels the old one and takes the new one*. Also a known real bug reported against `bloc` where `restartable()` didn't actually cancel a previous event's in-flight async work in some emit patterns — worth knowing this isn't magically bulletproof and still needs `emit.isDone`/`CancelableOperation` discipline in the handler body.
- **`bloc_test`**: `blocTest<MyBloc, MyState>('description', build: () => MyBloc(...), act: (bloc) => bloc.add(Event()), expect: () => [State1(), State2()])` — the idiomatic BLoC unit-test DSL; interviewers expect a candidate to be able to write one from memory.
- **`hydrated_bloc`**: extends `Bloc`/`Cubit` with automatic persistence — `toJson`/`fromJson` on the bloc are called around every state change to write/restore state to disk (via `HydratedStorage`, backed by platform storage). Used for "resume where the user left off" flows (draft forms, cart contents) without wiring manual `shared_preferences` calls.
- **Streams underneath**: because Bloc is stream-based, teams that already understand `StreamController`/`StreamTransformer` semantics tend to onboard onto Bloc faster, and BLoC exposes real backpressure/concurrency control (via `bloc_concurrency`) that ad-hoc `ChangeNotifier` code doesn't — a legitimate technical differentiator to cite, not just "it's what our client already uses."

### A.7 GetX, MobX, Signals, Redux — honest coverage including 2026 status
- **GetX (`get` package)**: v4.7.3 stable, 15.5k+ likes (historically the most-liked/downloaded Flutter package ever), but **structurally and organizationally troubled**: single-maintainer risk materialized in April 2026 when the GitHub source vanished (see §0.1); architecturally, `Get.to()` bypasses the real `Navigator`, causing web/deep-link incompatibilities, and its DI (`Get.put`/`Get.find`) is a **global service locator**, which hides dependencies and produces run-time (not compile-time) errors, and makes isolated unit testing harder. 2026 community consensus: **fine to maintain an existing GetX codebase, actively discouraged for new production code** due to maintenance risk + architectural anti-patterns compounding. This is a fair, citable, non-hyperbolic answer to give in an interview if asked "have you used GetX."
- **MobX**: `mobx`/`mobx_codegen` v2.6.1, published 14 days ago, 1.33k likes, "Flutter Favorite" — genuinely still maintained, reactive/observable-based (`@observable`, `@action`, `Observer` widget), closer to a Vue/MobX-JS mental model than Bloc/Riverpod's explicit-container model. Niche but not dead; teams with prior JS/MobX experience sometimes pick it deliberately.
- **Signals** (`signals` package, by Rody Davis): v7.1.0, published 3 months ago, 704 likes — a newer reactive-primitives approach (mirrors the JS "signals" pattern popularized by SolidJS/Preact/Angular) bringing fine-grained automatic dependency tracking to Dart/Flutter without a widget-rebuild-scoping API to hand-manage. Positioned in 2026 comparison content as a third serious contender alongside Riverpod/Bloc for teams that want minimal boilerplate + fine-grained reactivity, but it has far smaller adoption/downloads than Riverpod or Bloc — a defensible "aware of it, wouldn't bet a client project on it yet" answer.
- **Redux (`redux`/`flutter_redux`)**: single-store, pure-reducer, action-dispatch model borrowed directly from JS Redux. Still published and documented in 2026, but adoption has clearly declined — mirrors the broader JS ecosystem trend away from Redux toward simpler primitives. **`fish_redux`** (Alibaba's Flutter-specific Redux framework) shows no meaningful recent activity — treat it as effectively dormant, not something to propose today. Correct interview stance: Redux is "know the pattern, wouldn't choose it for a new Flutter app in 2026" — Bloc essentially subsumes what Redux offered (unidirectional flow, single source of truth) with better Flutter-native tooling.

### A.8 Decision matrix (what an interviewer wants articulated)

| Factor | setState/InheritedWidget | Provider | Riverpod | BLoC/Cubit | GetX |
|---|---|---|---|---|---|
| Team size sweet spot | 1 (local widget) | 1–5 | 1–15 | 5–50+ | legacy only |
| Boilerplate | none | low | low–medium (less with codegen) | medium–high | very low |
| Compile-time safety | n/a | partial (runtime `ProviderNotFoundException`) | strong | strong | weak (runtime lookups) |
| Testability w/o widget tree | no | partial | excellent (`ProviderContainer`) | excellent (`bloc_test`) | poor (singletons) |
| Async/loading/error modeling | manual | manual | `AsyncValue` built-in | manual (state classes) | manual |
| Audit trail / traceability | none | none | moderate | strong (named events) | none |
| 2026 maintenance risk | n/a (SDK) | low | low (funded, active) | low (active) | **high** (single maintainer, 2026 outage) |
| Fit for LTIMindtree-style enterprise/BFSI client work | rarely sufficient alone | onboarding/small modules | growing default for new greenfield | **most likely already in client codebase; expect this** | avoid proposing |

The trade-off an interviewer actually wants to hear articulated, in order: (1) *testability without a widget tree*, (2) *compile-time vs runtime error surfacing*, (3) *boilerplate vs explicitness trade-off as team size grows*, (4) *maintenance/bus-factor risk of the chosen package*. Naming GetX's April 2026 incident unprompted is a strong signal of being current, not stale-course-material.

---

## B. Architecture

### B.1 Flutter's official guidance (verified live, 2026)
Flutter publishes and actively maintains `docs.flutter.dev/app-architecture` (Architecting Flutter apps → Common architecture concepts → Recommendations → Design patterns → Case study), current as of Flutter 3.47.2 (docs updated May 2026). Its explicit position:
- **Separation of concerns is "the most important architectural principle."**
- Recommended shape: **UI layer** (Views + ViewModels) and **Data layer** (Repositories + Services), with an *optional* Domain layer/use-cases only for very large apps with genuinely complex shared business logic — **not by default**.
- This is explicitly **MVVM**: "The architecture most resembles the MVVM architectural pattern."
- **Unidirectional data flow**: state flows Data → Logic → UI; events/user interaction flow UI → Logic → Data. "Data updates should only flow from the data layer to the UI layer."
- **Repository pattern**: "strongly recommend" — repositories are "the sources of truth for all data in your app," abstracting over one or more data sources (remote API, local DB, cache).
- **Immutability**: "strongly recommend" immutable data models so state changes only happen in the proper layer.
- **Dependency injection**: "strongly recommend" — explicitly to avoid globally accessible objects ("makes your code less error prone"). Named package: **`provider`**.
- **ViewModels built on `ChangeNotifier`/`Listenable`** — conditional/"likely to improve" tier, not mandatory; docs explicitly note the same architecture can be implemented with **Riverpod, Bloc, or Signals** instead.
- **Commands** pattern recommended to standardize how UI events reach the data layer and to prevent rendering errors (a wrapper object around an action that tracks running/error/result state — conceptually similar to Riverpod 3's new Mutations).
- **Navigation**: **go_router named explicitly** — "the preferred way to write 90% of Flutter applications."
- The **Compass app** is Flutter's official reference implementation: `lib/ui/<feature>/view_models` + `widgets`, `lib/domain/models`, `lib/data/repositories` + `services` + `model`, `lib/routing`, multiple `main_*.dart` entrypoints for dev/staging/prod — i.e., **feature-first inside the UI layer, type-first inside the data layer**, a hybrid, not a pure layer-first tree.
- Sources: [Architecting Flutter apps](https://docs.flutter.dev/app-architecture), [Recommendations](https://docs.flutter.dev/app-architecture/recommendations), [Common architecture concepts](https://docs.flutter.dev/app-architecture/concepts), [Case study](https://docs.flutter.dev/app-architecture/case-study), [Design patterns](https://docs.flutter.dev/app-architecture/design-patterns).

### B.2 Clean Architecture in Flutter — and the honest critique
- Textbook shape borrowed from Uncle Bob via the Flutter community (not Google's own docs, which are lighter-weight): **presentation** (widgets, state holders) → **domain** (entities, use cases, repository *interfaces*) → **data** (repository *implementations*, remote/local data sources, DTOs/models that map to domain entities).
- **Entities vs Models**: entity = pure business object with no serialization concerns; model = data-layer DTO with `fromJson`/`toJson`, mapped to/from the entity at the repository boundary. This mapping layer is the most commonly *skipped* step in real codebases (entity and model collapse into one class) — a fair thing to admit in an interview as a pragmatic trade-off, not a mistake, in small-to-medium apps.
- **Honest critique widely repeated in 2026 sources, and matching Flutter's own docs**: Clean Architecture's full four-ring ceremony (use-cases for every single action, entity/model duplication everywhere) is **over-applied**. Flutter's own recommendations explicitly say to add a domain/use-case layer "only when needed," not by default, calling out unnecessary use-cases as "boilerplate and cognitive load without benefit." The correct interview kernel: *architecture is a tool for managing complexity; apply exactly as much of it as the app's actual complexity justifies, and be ready to defend why you added (or didn't add) a domain layer on a specific project.*

### B.3 Layer-first vs feature-first folder structure
- **Layer-first** (`lib/presentation`, `lib/domain`, `lib/data`, each subdivided by feature inside): clean at small scale, but at ~20+ screens developers scroll through a `repositories/` folder with 30 unrelated files to find one feature's code.
- **Feature-first** (`lib/features/<feature>/{presentation,domain,data}`): co-locates everything for one feature; commonly cited to roughly halve new-developer ramp-up time on a feature.
- **2026 consensus best practice**: a **hybrid** — feature-first at the top level, with each feature internally still following the MVVM/Clean layering Flutter recommends, plus a shared `core`/`common` folder for cross-cutting UI (matches the Compass sample's `lib/ui/core/` + `lib/ui/<feature>/`). This is the safest, most defensible answer to "how do you structure a large Flutter app" — cite the trade-off (small app → layer-first is fine and simpler; multi-team large app → feature-first isolates change).

### B.4 Repository pattern, data sources, mappers/DTOs
- Repository = single interface the domain/UI layer talks to; internally it decides whether to hit a **remote data source** (API client) or a **local data source** (cache/DB), and owns cache-invalidation/refresh policy. This is the load-bearing abstraction for offline-first behavior (§D.5) and for testability (mock the repository interface, never mock `Dio` directly in a ViewModel test).
- DTO/mapper layer: remote/local data sources return raw models (JSON-shaped); a mapper (often a `toDomain()` extension or a `Mapper` class) converts to the domain entity before it crosses into the domain/UI layer, so a backend API shape change doesn't ripple into UI code.

### B.5 Dependency injection
- **`get_it`**: a **service locator**, v9.2.1 (published ~6 months ago, 4.7k likes, verified) — you register singletons/factories against types in a central locator (`GetIt.instance.registerLazySingleton<ApiClient>(...)`) and pull them out anywhere with `getIt<ApiClient>()`. Simple, framework-agnostic (works with any state management choice), but it is **explicitly the anti-pattern flagged elsewhere in this doc** (§A.7) when done Get.find()-style: it hides a class's real dependencies from its constructor signature, turning missing-registration bugs into runtime crashes instead of compile errors. ([pub.dev/get_it](https://pub.dev/packages/get_it))
- **`injectable`**: v3.0.0 (published ~4 months ago) — a code-generation layer on top of `get_it` that lets you annotate classes (`@injectable`, `@singleton`, `@LazySingleton(as: AbstractType)`) and generates the registration boilerplate, restoring some compile-time safety (the generator fails the build if a dependency can't be resolved) while keeping `get_it`'s runtime lookup underneath. ([pub.dev/injectable](https://pub.dev/packages/injectable))
- **Riverpod-as-DI**: Riverpod's own `Provider`s can *be* the entire DI graph — a `Provider<ApiClient>` is functionally a compile-time-checked, override-able dependency registration, so teams on Riverpod frequently skip `get_it` entirely. This is a legitimate, common 2026 answer to "how do you do DI" if the app is Riverpod-based.
- **Service locator vs constructor injection trade-off** (the actual interview question underneath all of this): constructor injection is more testable and makes dependencies explicit/visible in the type signature, at the cost of manually wiring/passing dependencies down; a service locator (`get_it`) is more convenient at scale (no manual wiring chains) but trades away that explicitness and moves failures to runtime. `injectable` is a popular middle ground because it keeps `get_it`'s convenience while regaining compile-time registration checking.

### B.6 Immutability and modelling
- **`freezed`**: v4.0.1 (published days ago — actively maintained, top-tier code-gen package for immutable data classes with `copyWith`, value equality, `toString`, union/sealed-class support via multiple named constructors, and JSON support when paired with `json_serializable`.
- **Important 2026 nuance**: since Dart 3 shipped native `sealed` classes + exhaustive pattern matching (`switch` on a sealed hierarchy), **for the narrow "sealed union, exhaustive `switch`" use case, hand-written sealed classes are now genuinely competitive with `freezed`** with zero codegen/build_runner cost. Freezed remains clearly worth it when you also need `copyWith`, deep value-equality, and JSON codegen across a large data model — i.e., "do you still need freezed" has a nuanced 2026 answer, not a reflexive "yes."
- **`equatable`**: v2.1.0 (published ~2 months ago) — lighter-weight alternative for value equality only (no `copyWith`/unions), very commonly paired with **Bloc/Cubit state classes** specifically (the two ecosystems are culturally linked — expect flutter_bloc example code and tutorials to reach for `equatable` by default).
- **`json_serializable`**: v6.14.1 (published ~35 days ago) — the standard codegen partner for `fromJson`/`toJson`, typically combined with `freezed` via `@freezed` + `@JsonSerializable` in one class.
- **Sealed classes / union types for state**: the idiomatic 2026 pattern for Bloc/Cubit/Riverpod state is a sealed class hierarchy (`sealed class AuthState {}` with `Authenticated`, `Unauthenticated`, `AuthLoading` subclasses, or the freezed-generated equivalent) consumed via exhaustive `switch`/`when` — the compiler enforces every state is handled, which is the concrete technical reason "use sealed classes for state" is repeatedly cited as a best practice, not just style preference.

### B.7 Error handling: exceptions vs result types
- Plain `try/catch` + custom `Exception` subclasses is still the majority pattern in typical enterprise Flutter code, especially where the team is more Java/.NET-background (as is common at Indian IT-services shops) — exceptions map naturally to what backend teams already do.
- **`Either<L, R>`-based functional error handling** (via **`fpdart`**, v1.2.0, Flutter Favorite, actively maintained — **not `dartz`**, which is dead, see §0.5) makes error paths a first-class, compiler-checked return type (`Either<Failure, Success>`) instead of a hidden control-flow branch via exceptions — repositories return `Future<Either<Failure, T>>`, forcing every call site to explicitly handle the failure branch.
- **When it's worth it**: teams that already think in Kotlin `Result`/Rust `Result`/functional patterns, or codebases where *silently swallowed exceptions* have been a real production bug source, benefit from the compiler-enforced handling. **When it's not worth it**: small teams or teams unfamiliar with FP idioms pay a real onboarding/readability cost for `Either`/`flatMap`/`fold` chains — a fair, honest interview answer is "I'd reach for it on a payments/critical-path module, not force it across an entire enterprise CRUD app maintained by rotating services-company engineers."

### B.8 Modularisation
- **Melos**: v8.6.0 (published days ago, verified publisher Invertase.io) — the standard Dart/Flutter monorepo tool: manages versioning, changelogs, and running commands (`melos bootstrap`, `melos run`) across many local packages in one repo. Used when an app is split into independent **feature packages** (e.g., `packages/auth`, `packages/checkout`, each a standalone pub package with its own `pubspec.yaml`) so features can be built, tested, and (in theory) reused independently, and so CI can parallelize/scope test runs per changed package. This is a "large app / large team" answer — correctly flagging that a 3-YOE candidate isn't expected to have driven a melos monorepo from scratch, but should recognize the term and know what problem it solves (build/test isolation, independent versioning, enforced module boundaries) if asked about scaling a codebase.

---

## C. Navigation

### C.1 Navigator 1.0 (imperative)
- `Navigator.push/pop`, named routes via `Navigator.pushNamed(context, '/details', arguments: id)`, with `onGenerateRoute` in `MaterialApp` mapping route-name strings to `Route` builders (and `arguments` extracted via `ModalRoute.of(context)!.settings.arguments`).
- Still entirely valid for **simple, mobile-only apps with no deep linking / no need to sync URL state** — the correct kernel is that Navigator 1.0 is not "deprecated," it's just insufficient once URL-driven state (web, deep links, browser back button) matters.

### C.2 Navigator 2.0 / Router API — and why it's considered hard
- Declarative model: `RouterDelegate` (owns the `Page` stack and rebuilds it in response to app-state changes), `RouteInformationParser` (converts a `RouteInformation`/URL into your app's internal route configuration object and back), `RouteInformationProvider`, `BackButtonDispatcher` (routes the Android back button / browser back button into the delegate).
- **Why it's hard, precisely**: `RouterDelegate` is a "does everything at once" class — it must build the `Navigator` with the correct `Page` list *and* handle system back-button pops *and* keep itself in sync with app state changes, all without a clean single responsibility, and there's substantial boilerplate to wire the pieces together correctly. The common framing: "like learning to fly a helicopter when you just wanted to cross town." This is precisely the pain **go_router exists to hide** — go_router implements `RouterDelegate`/`RouteInformationParser`/`BackButtonDispatcher` for you and exposes a declarative `GoRoute` list instead.
- Interview kernel: know that go_router *is* Navigator 2.0 under the hood, not an alternative to it — a common trick question is "what's the difference between go_router and Navigator 2.0," correct answer: go_router is an ergonomic implementation *of* the Router API, not a competing system.

### C.3 go_router — current default (v18.0.1, flutter.dev-published, verified above)
- **Declarative routes**: a flat or nested `List<RouteBase>` of `GoRoute(path: ..., builder: ...)`.
- **Nested / shell routes**: `ShellRoute` and `StatefulShellRoute` wrap child routes in a persistent shell (e.g., a `BottomNavigationBar`/`NavigationRail` that stays mounted while the active tab's content navigates) — `StatefulShellRoute` specifically preserves each branch's own navigation stack/state when switching tabs, which plain `ShellRoute` does not.
- **Redirects & auth guards**: a top-level (or per-route) `redirect: (context, state) => ...` callback runs before every navigation, returning a new location string to force a redirect (e.g., "not authenticated → send to `/login`") or `null` to allow the navigation through. Known gotcha (raised as a real GitHub issue against `go_router`/`ShellRoute`): redirect loops if the guard doesn't explicitly check "am I already heading to the login route" before redirecting again.
- **Deep linking**: go_router is built to parse incoming URIs (universal/app links) directly into the declared route tree — no separate parsing layer needed, unlike hand-rolled Navigator 1.0 deep-link handling.
- **Typed routes with codegen**: `go_router_builder` (paired via `@TypedGoRoute` annotations) generates strongly-typed route classes (e.g., `OfferRoute(id: 123).go(context)`) from the declared routes, eliminating stringly-typed `context.go('/offer/$id')` calls and the runtime bugs (typos, wrong param count) that come with them. `go_router_builder` current line ~`^4.0.1`/companion of `go_router ^16+/18` per pub.dev.

### C.4 Alternatives — current standing
- **`auto_route`**: v11.1.0, published ~8 months ago, 3.4k likes, verified publisher (`codeness.ly`) — actively maintained, codegen-first from the start (unlike go_router where codegen is an opt-in add-on), popular where a team wants typed routes without wiring a separate builder package. Still a legitimate #2 choice in 2026, particularly among teams that adopted it before go_router's typed-routes story matured.
- **`beamer`**: v1.7.0, published ~23 months ago (a `2.0.0-dev` prerelease exists but stalled) — noticeably slower cadence than auto_route/go_router; treat as a **declining third option**, not a recommended pick for a new 2026 project, though still functioning for existing apps built on it.
- Overall 2026 standing: go_router has effectively become "the only router most production apps use" per multiple 2026 community sources, cemented further by its flutter.dev-verified publisher status — auto_route survives as a real but smaller alternative; beamer is legacy-maintenance territory.

### C.5 Deep links / app links (Android & iOS)
- **Android**: App Links (verified `https` deep links via Digital Asset Links `assetlinks.json` hosted at `/.well-known/`) vs classic custom-scheme intent filters (unverified, any app can claim a scheme) — App Links are the current recommended approach since they can't be hijacked by another app.
- **iOS**: Universal Links (verified via an `apple-app-site-association` file hosted at `/.well-known/`) function analogously; custom URL schemes remain supported but are the less secure/less preferred mechanism, same caveat as Android's raw custom scheme.
- Flutter/go_router integrates with both by registering the app for the respective platform verification file and letting `RouteInformationParser` receive the resulting URI — no Flutter-specific magic beyond standard platform configuration (`AndroidManifest.xml` intent-filter with `autoVerify="true"`, iOS `Associated Domains` capability + entitlement).

---

## D. Data, networking, storage

### D.1 `http` vs `dio`
- **`http`**: the Dart-team-maintained minimal HTTP client — fine for very simple GET/POST needs, but has **no built-in interceptors, no cancel tokens, no automatic retry/timeout config beyond what you hand-roll**.
- **`dio`**: v5.11.1 (published hours before this research, 8.3k+ likes, 160 pub points, ~4.08M weekly downloads, published by the verified `flutter.cn` publisher) — the de facto standard for any Flutter app doing real networking. Key production features:
  - **Interceptors**: `InterceptorsWrapper`/custom `Interceptor` subclasses hook `onRequest`/`onResponse`/`onError` globally — used for attaching auth headers, logging, and (critically) **token-refresh-on-401 re-auth flows** (§D.7).
  - **CancelToken**: cancel in-flight requests (e.g., abandon a search-as-you-type request when a newer one supersedes it, or cancel all requests on user logout/screen dispose).
  - **Retry**: not built in by default but standard via the community `dio_smart_retry`/hand-written retry interceptor pattern, or configurable backoff logic layered on top of an interceptor.
  - **Error mapping**: `DioException` carries `type` (`connectionTimeout`, `badResponse`, `cancel`, etc.) and the raw `Response?`, which apps map into their own domain-level failure/exception types at the repository boundary (tying back to §B.7's error-handling discussion).
  - **FormData**: multipart file upload support built in (`FormData.fromMap({...})`), no separate package needed.
- **`retrofit` (Dart)**: v4.9.0 + `retrofit_generator` v10.0.1 — a `dio`-client generator (source_gen-based, explicitly inspired by Java/Kotlin Retrofit and Chopper) that turns an annotated abstract class (`@GET('/users/{id}')`) into a generated implementation calling `dio` under the hood, avoiding hand-written boilerplate for each endpoint. Minimum SDK bumped to Dart 3.8 in recent releases; experimental `lean_builder` support (a faster alternative build pipeline to `build_runner`) is emerging but not yet the default.

### D.2 REST, GraphQL, WebSockets, gRPC
- **REST + JSON**: standard `json_serializable`/`freezed` codegen for (de)serialization, as covered in §B.6.
- **GraphQL**: `graphql_flutter` v5.3.0 (published ~5 months ago, verified publisher `zino.company`, ~232k weekly downloads) — still the standard GraphQL client for Flutter, actively maintained; less commonly seen at India-services-company clients than REST, but worth knowing the package name and that it wraps caching + subscriptions.
- **WebSockets**: `web_socket_channel` — the standard cross-platform `WebSocketChannel` abstraction (wraps `dart:io`'s `WebSocket` natively, and browser WebSocket on web) used for chat/live-update features.
- **gRPC**: the official `grpc` Dart package (grpc.io-documented) supports both native gRPC (`ClientChannel`) and gRPC-Web (`GrpcWebClientChannel`) — relevant mainly for enterprise backends already standardized on gRPC/protobuf contracts, which is plausible at an IT-services client working with an internal microservices backend.

### D.3 Local storage — the single biggest "verify before you say it" area
- **`shared_preferences`**: v2.5.5 (published ~5 months ago) — simple key-value storage for small, non-sensitive preferences (theme choice, onboarding-seen flag). Not encrypted, not for tokens/secrets.
- **`flutter_secure_storage`**: v11.0.0 (published ~29 days ago) — Keychain (iOS)/Keystore (Android)-backed encrypted key-value storage; the correct place for auth tokens (§D.7), not `shared_preferences`.
- **`sqflite`**: v2.4.3 (published ~3 months ago) — thin, actively maintained SQLite plugin; the low-level engine many higher-level libraries (including `drift`'s IO backend, via `drift_sqflite`) build on.
- **`drift`** (formerly `moor`): the **2026-recommended default for structured local data** — SQL-backed (compile-time-checked queries via generated code from `.drift` files or annotated Dart), reactive (`Stream<List<Row>>` query results that auto-update on writes), works across all platforms including web (via `sqlite3.wasm`), and has built-in isolate-based background query execution. `drift_sqflite` remains a maintained adapter to run drift atop `sqflite` specifically, though the newer FFI-based backend is generally preferred for new projects.
- **`hive` / `isar` — VERIFIED CURRENT STATUS, MAINTENANCE-CRITICAL**: as detailed in §0.2 — Hive stable v2.2.3 (~4 years stale), Isar stable v3.1.0+1 (~3 years stale), both originally by the same author, both effectively **community-abandoned with unreleased `4.0.0-dev` prereleases**, an open GitHub issue explicitly requesting deprecation status, and 500+ unresolved issues on Hive. **The correct 2026 answer if asked "would you use Hive/Isar on a new project": no — they were excellent, fast, ergonomic NoSQL options in their day, but they are now unmaintained; use `drift` (SQL, structured data) or `ObjectBox` (NoSQL object DB, still actively maintained) instead.** This is a materially different answer than most 2023–2024-vintage tutorials would give, and is exactly the kind of "gap" an interviewer probing for currency would want to hear closed correctly.
- **ObjectBox**: latest stable **5.3.2** (with a `6.0.0-preview.2` prerelease), published within the last ~2 months — genuinely actively maintained (unlike Hive/Isar), NoSQL object database with strong performance claims and, notably, is now marketing itself around **on-device vector search for AI/ML use cases** — a distinctive 2026 feature to mention if asked to differentiate it from Hive/Isar.

### D.4 Offline-first: caching, sync, conflict handling, connectivity
- Standard pattern: repository checks local cache (via drift/ObjectBox) first or in parallel with a network call (`stale-while-revalidate`-style), writes network responses back to the local store, and exposes a reactive stream (drift's `Stream<T>` queries, or a `ValueNotifier`/Riverpod stream provider layered on top) so the UI updates automatically whether the data came from cache or network.
- Conflict handling for write-back sync (e.g., offline edits later pushed to server): typical enterprise-app approach is last-write-wins with a server-side timestamp, or a dirty/pending-sync flag column plus a background sync worker that retries on connectivity restoration — full CRDT-style merge is rare outside collaborative-editing-specific apps and would be over-engineering to claim for a typical CRUD business app.
- **`connectivity_plus`**: v7.3.1 (published ~42 days ago) — the standard package for detecting online/offline/connection-type changes, used to gate sync attempts and show offline banners.

### D.5 Firebase suite
- Verified current: **`firebase_core` v4.14.0** (published ~10 days before this research, `firebase.google.com`-verified publisher) — confirms the whole FlutterFire plugin family is actively, officially maintained at high cadence in 2026. Standard companion packages at the same major-version family: `firebase_auth`, `cloud_firestore`, `firebase_messaging` (FCM push), `firebase_crashlytics`, `firebase_remote_config`, `firebase_analytics` — all published under the same verified `firebase.google.com` account and expected to be version-locked together via `flutterfire_cli`'s `flutterfire configure`.
- Typical enterprise usage split: **Auth** for identity (often federated to a corporate IdP rather than pure Firebase Auth at an enterprise client — worth flagging that many IT-services clients actually front Firebase Auth or skip it for an internal OAuth2/OIDC provider); **Crashlytics** near-universal for crash reporting; **Remote Config** for feature flags/gradual rollout; **FCM** for push; **Firestore** less universal at enterprise clients who already have a REST/SQL backend of record — often it's *not* the primary datastore there, just used for specific realtime features if at all.

### D.6 Auth patterns
- **Token storage**: access/refresh tokens go in `flutter_secure_storage`, never `shared_preferences` (interview trap: candidates who say "shared_preferences" for tokens should be corrected — it's unencrypted plain storage on both platforms).
- **Refresh + interceptor-based re-auth**: the standard `dio` pattern is an `Interceptor.onError` hook that detects a `401`, pauses the failed request, fires a single in-flight token-refresh call (guarding against multiple concurrent 401s triggering *parallel* refresh calls — typically via a `Completer`/lock), retries the original request with the new token, and only if refresh itself fails does it propagate to a global "log the user out" flow.
- **Biometric**: `local_auth` v3.0.2 (published ~56 days ago, verified `flutter.dev` publisher) — wraps Face ID/Touch ID (iOS) and BiometricPrompt (Android) behind one API (`authenticate(localizedReason: ...)`), typically gating access to a securely-stored token rather than replacing the token/refresh mechanism itself.

---

## E. Other production concerns

### E.1 Theming, Material 3, Cupertino, adaptive layouts
- **Material 3 has been the Flutter SDK default since Flutter 3.16** and remains current in 2026 — `ThemeData(useMaterial3: true)` is now the implicit default rather than an opt-in flag in new projects; a candidate should know M3 is not "the new thing," it's simply "the current thing," and be able to speak to `ColorScheme.fromSeed()`-driven theming.
- **Cupertino**: Flutter ships Cupertino widgets (`CupertinoPageScaffold`, `CupertinoButton`, `CupertinoAlertDialog`, etc.) for iOS-HIG-faithful UI; **adaptive constructors** (`Switch.adaptive`, `Slider.adaptive`, etc.) auto-select the Cupertino look on iOS while staying Material elsewhere from one call site — the standard, low-effort way to get "feels native on both platforms" without maintaining two widget trees.
- **Responsive/adaptive layout tools**: `LayoutBuilder` (react to the *available space* of the current constraints, not the whole screen — correct for building components that adapt inside e.g. a resizable pane) vs `MediaQuery.sizeOf(context)` (whole-screen/device metrics — correct for top-level breakpoint decisions, but overuse for local sizing causes needless whole-widget rebuilds and is explicitly called out in 2026 community writing as an anti-pattern ["stop using MediaQuery" is a recurring post title]). Breakpoints are typically hand-defined (`< 600` mobile / `600–1024` tablet / `> 1024` desktop) — Flutter has no single official breakpoint constant set, teams standardize their own.
- **`flutter_screenutil`**: v5.9.3, **last published ~2 years ago**, now under an **unverified uploader**. Still functionally works (scaling values relative to a fixed design canvas size) and is heavily used in existing/legacy codebases and tutorials, but its stagnation is a real, checkable 2026 fact — see §0.3. The defensible 2026 position: it's a sizing convenience, not a layout engine, should be paired with (not substituted for) `LayoutBuilder`/proper constraint-based layout, and its lack of recent releases is worth naming if directly asked to justify choosing it today.

### E.2 Internationalisation
- Standard stack: `intl` (v0.20.3, published ~2 months ago, `dart.dev`-verified — actively maintained by the Dart team itself) + `flutter_localizations` (SDK-bundled) + ARB (`.arb`) files per locale, code-generated into a `AppLocalizations` class via `flutter gen-l10n` (built into the Flutter SDK tooling, configured via `l10n.yaml` — no separate package needed for the generation step itself, `intl` supplies the runtime formatting APIs for dates/numbers/plurals).

### E.3 Forms & validation
- `Form` (wraps a `GlobalKey<FormState>`) + `TextFormField` (validator callback returning an error string or `null`) is the standard SDK-native approach; `formState.validate()` runs all field validators and `formState.save()` triggers each field's `onSaved`. `FocusNode` manages focus traversal (e.g., "next field" on submit, dismissing keyboard). No dominant third-party forms package has displaced this SDK-native approach in typical enterprise Flutter work (unlike, say, React's crowded forms-library landscape) — worth noting as a genuine platform strength to mention.

### E.4 Accessibility
- `Semantics` widget is the core primitive for exposing role/label/state/value to platform assistive tech (TalkBack on Android, VoiceOver on iOS); Flutter's `SemanticsRole` enum maps to ARIA roles for Flutter Web specifically.
- Enterprise checklist items repeatedly cited: minimum 48×48 logical-pixel tap targets, ≥4.5:1 text contrast (≥3:1 for large text), no color-only status indicators, and widget-test-level semantics assertions via `tester.ensureSemantics()`/the accessibility guideline API that checks contrast/target-size/labeling automatically in tests. For an IT-services client shipping to enterprise/government-adjacent customers, accessibility compliance (WCAG-aligned) is a genuinely common explicit requirement — worth having this vocabulary ready even though most personal/portfolio projects skip it.

### E.5 Common enterprise packages an LTIMindtree-style shop will likely have in its pubspec
Based on the verified landscape above, a realistic enterprise Flutter `pubspec.yaml` in 2026 combines: `flutter_bloc` (or `provider`/`riverpod` depending on team lineage) + `equatable` for state; `go_router` for navigation; `dio` (+ possibly `retrofit`) for networking; `get_it`/`injectable` for DI; `freezed` + `json_serializable` for models; `drift` or `sqflite` for local persistence (increasingly *not* Hive/Isar on new modules); `shared_preferences` + `flutter_secure_storage`; the `firebase_*` family for crash reporting/push/remote config; `intl` + generated `AppLocalizations`; `flutter_lints` for static analysis; and, if the app predates 2024–2025, a real chance of encountering legacy `get`/GetX or `hive` code that a lateral hire will be asked to help migrate off — which is itself a very plausible interview scenario ("we have a legacy screen on GetX/Hive, how would you approach migrating it") given everything documented in §0.

---

## F. Interview-shaped summary (quick reference)

| Area | What a 3-YOE candidate is actually asked | The trap | Correct kernel |
|---|---|---|---|
| setState | "When is setState still fine?" | Saying it's always bad, or using it for shared state | Fine for ephemeral, single-widget state; lift up only as far as needed |
| Provider internals | "What does Provider actually do?" | Treating it as magic | Thin wrapper over `InheritedWidget` |
| watch/read/select | "Why is my whole screen rebuilding?" | Using `read` in build, or missing `select` | `watch`=subscribe, `read`=one-off (not in build), `select`=scoped subscribe |
| Riverpod global providers | "Isn't a global provider just a singleton?" | Agreeing it's the same | Global *reference*, scoped *instance* per `ProviderContainer` |
| BLoC vs Cubit | "When would you use Cubit over Bloc?" | "Bloc is always better/more enterprise" | Cubit for simple direct mutation; Bloc when event traceability/audit matters |
| Event transformers | "How do you stop duplicate submits / implement search-as-you-type?" | Confusing droppable vs restartable | droppable=ignore new; restartable=cancel old, take new |
| GetX | "Have you used GetX, thoughts?" | Either blind praise or ignorance of 2026 event | Popular but architecturally risky (service locator, bypasses Navigator) + April 2026 maintainer outage — avoid for new work |
| Architecture | "How do you structure a large app?" | Reciting Clean Architecture dogma with 4 layers everywhere | Cite Flutter's own MVVM+repository guidance; add domain/use-cases only when complexity justifies it |
| Folder structure | "Feature-first or layer-first?" | Picking one dogmatically | Hybrid: feature-first top-level, MVVM layering inside each feature (matches Compass sample) |
| DI | "get_it vs constructor injection?" | Defending pure service-locator style as best practice | Constructor injection = explicit/testable; get_it/service locator = convenient at scale but hides deps and defers errors to runtime; `injectable` bridges both |
| Local storage | "Which local DB would you pick today?" | Naming Hive/Isar as the modern default | Both are unmaintained (verified 2026) — pick `drift` (SQL) or `ObjectBox` (NoSQL, actively maintained) |
| Navigation | "go_router vs Navigator 2.0?" | Treating them as alternatives | go_router *implements* the Router API; it's not a competitor to it |
| Error handling | "Exceptions or Either/Result types?" | Reflexively reaching for `dartz` | `dartz` is dead; `fpdart` is the living option; use Either selectively on critical paths, not everywhere |
| Auth tokens | "Where do you store the access token?" | Saying `shared_preferences` | `flutter_secure_storage` (Keychain/Keystore-backed) |
| Responsive UI | "How do you handle different screen sizes?" | Reaching for flutter_screenutil as the whole answer | LayoutBuilder/MediaQuery first; screenutil (if used at all) is a convenience layer on top, and is currently stale on pub.dev |

---

## Sources

- [Architecting Flutter apps (official)](https://docs.flutter.dev/app-architecture)
- [Flutter architecture recommendations (official)](https://docs.flutter.dev/app-architecture/recommendations)
- [Common architecture concepts (official)](https://docs.flutter.dev/app-architecture/concepts)
- [Flutter architecture case study — Compass app (official)](https://docs.flutter.dev/app-architecture/case-study)
- [Riverpod — What's new in 3.0](https://riverpod.dev/docs/whats_new)
- [riverpod.dev](https://riverpod.dev/)
- [pub.dev/provider](https://pub.dev/packages/provider)
- [pub.dev/get_it](https://pub.dev/packages/get_it)
- [pub.dev/get (GetX)](https://pub.dev/packages/get)
- [jonataslaw/getx GitHub repo](https://github.com/jonataslaw/getx)
- [The Fall of GetX — Medium](https://medium.com/@yash22202/the-fall-of-getx-what-happened-why-it-matters-and-what-flutter-developers-must-do-now-984bb618d303)
- [Flutter: The GetX repository is back — Medium](https://medium.com/@yurinovicow/flutter-the-getx-repository-is-back-714720959843)
- [GetX Repository Deleted — DEV Community](https://dev.to/hrushikesh_desai/getx-repository-deleted-what-flutter-developers-should-do-now-1a5c)
- [Gabor Varadi on X re: GetX gone from GitHub](https://x.com/Zhuinden/status/2043984331694035304)
- [Mike Rydstrom on X re: GetX gone from GitHub](https://x.com/RydMike/status/2044017632546873470)
- [pub.dev/isar](https://pub.dev/packages/isar)
- [pub.dev/hive](https://pub.dev/packages/hive)
- [isar/hive GitHub Issue #1331 — deprecation request](https://github.com/isar/hive/issues/1331)
- [The Flutter Local Database Landscape in 2026 — Luci Studio](https://luci-studio.com/blog/the-flutter-local-database-landscape-in-2026-a-maintenance-first-guide-fe6d267c/)
- [pub.dev/drift](https://pub.dev/packages/drift), [drift.simonbinder.eu](https://drift.simonbinder.eu/)
- [pub.dev/objectbox](https://pub.dev/packages/objectbox)
- [pub.dev/drift_sqflite](https://pub.dev/packages/drift_sqflite)
- [pub.dev/sqflite](https://pub.dev/packages/sqflite)
- [pub.dev/shared_preferences](https://pub.dev/packages/shared_preferences)
- [pub.dev/flutter_secure_storage](https://pub.dev/packages/flutter_secure_storage)
- [pub.dev/local_auth](https://pub.dev/packages/local_auth)
- [pub.dev/dio](https://pub.dev/packages/dio)
- [retrofit.dart GitHub](https://github.com/trevorwang/retrofit.dart)
- [pub.dev/retrofit](https://pub.dev/packages/retrofit)
- [pub.dev/graphql_flutter](https://pub.dev/packages/graphql_flutter)
- [pub.dev/connectivity_plus](https://pub.dev/packages/connectivity_plus)
- [pub.dev/firebase_core](https://pub.dev/packages/firebase_core)
- [grpc.io Dart quickstart](https://grpc.io/docs/languages/dart/quickstart/)
- [pub.dev/go_router](https://pub.dev/packages/go_router)
- [Flutter go_router Typed Routes 2026 Guide — The Flutter Kit](https://theflutterk.it.com/blog/flutter-go-router-typed-routes-2026)
- [GoRouter Advanced Tutorial 2026 — Medium](https://techwithsam.medium.com/gorouter-advanced-tutorial-2026-bottom-nav-nested-routes-auth-redirects-typed-navigation-9bebad5b4993)
- [Routing Best Practices in Flutter — Very Good Ventures](https://verygood.ventures/blog/routing-best-practices-in-flutter/)
- [go_router ShellRoute redirect issue — flutter/flutter #114559](https://github.com/flutter/flutter/issues/114559)
- [pub.dev/auto_route](https://pub.dev/packages/auto_route)
- [pub.dev/beamer](https://pub.dev/packages/beamer)
- [Understanding Flutter Navigator 2.0 — Codemagic](https://blog.codemagic.io/flutter-navigator2/)
- [pub.dev/flutter_bloc](https://pub.dev/packages/flutter_bloc)
- [pub.dev/bloc_concurrency](https://pub.dev/packages/bloc_concurrency)
- [pub.dev/hydrated_bloc](https://pub.dev/packages/hydrated_bloc)
- [Flutter Bloc Concepts — bloclibrary.dev](https://bloclibrary.dev/flutter-bloc-concepts/)
- [Flutter Bloc with Streams: Concurrency Patterns — Very Good Ventures](https://verygood.ventures/blog/how-to-use-bloc-with-streams-and-concurrency/)
- [bloc restartable() cancellation bug — felangel/bloc #3349](https://github.com/felangel/bloc/issues/3349)
- [pub.dev/mobx](https://pub.dev/packages/mobx)
- [pub.dev/signals](https://pub.dev/packages/signals)
- [fish-redux GitHub — Alibaba](https://github.com/alibaba/fish-redux)
- [Flutter State Management 2026: BLoC vs Riverpod — ASOasis](https://asoasis.tech/articles/2026-04-17-2054-flutter-bloc-vs-riverpod-comparison-2026/)
- [BLoC vs Riverpod in 2026 — Flutter Studio](https://flutterstudio.dev/blog/bloc-vs-riverpod.html)
- [GetX vs BLoC vs Riverpod 2026 — Flutter Studio](https://flutterstudio.dev/blog/state-management-comparison-2026.html)
- [Provider vs Riverpod vs Bloc 2026 — Start Debugging](https://startdebugging.net/2026/06/provider-vs-riverpod-vs-bloc-for-flutter-state-management-in-2026/)
- [Memory Profiling GetX Applications — Medium](https://medium.com/@alaxhenry0121/memory-profiling-getx-applications-the-critical-performance-blind-spot-85-of-developers-miss-484cba25bd11)
- [Why 90% of Flutter Developers Create Memory Leaks with GetX — Medium](https://medium.com/@alaxhenry0121/why-90-of-flutter-developers-are-unknowingly-creating-memory-leaks-with-getx-and-how-to-fix-it-48c14699c391)
- [Service Locator anti-pattern discussion — Flutterando/modular #638](https://github.com/Flutterando/modular/discussions/638)
- [pub.dev/injectable](https://pub.dev/packages/injectable)
- [pub.dev/freezed](https://pub.dev/packages/freezed)
- [pub.dev/equatable](https://pub.dev/packages/equatable)
- [pub.dev/json_serializable](https://pub.dev/packages/json_serializable)
- [Do you still need Freezed? — John Thiriet](https://johnthiriet.com/do-you-still-need-freezed-sealed-classes-and-pattern-matching-in-modern-dart/)
- [No macros in Dart: how to replace Freezed — LeanCode](https://leancode.medium.com/no-macros-in-dart-how-to-replace-freezed-40547e6381fc)
- [pub.dev/fpdart](https://pub.dev/packages/fpdart)
- [I highly recommend avoiding dartz — Medium](https://medium.com/@realmerlyn/i-highly-recommend-avoiding-the-dartz-dead-package-and-switching-to-fpdart-which-is-under-active-8a5fae689cea)
- [pub.dev/melos](https://pub.dev/packages/melos)
- [Flutter clean architecture — what actually works in production — Medium](https://ottomancoder.medium.com/flutter-clean-architecture-what-actually-works-in-production-not-just-tutorials-627bfaadddae)
- [Feature-First vs Layered Architecture in Flutter — Medium](https://medium.com/@sandarulashanherman/feature-first-vs-layered-architecture-in-flutter-a-practical-guide-7a7ace0139aa)
- [Flutter Project Structure: Feature-first or Layer-first? — Code With Andrea](https://codewithandrea.com/articles/flutter-project-structure/)
- [Material component widgets (official)](https://docs.flutter.dev/ui/widgets/material)
- [Automatic platform adaptations (official)](https://docs.flutter.dev/ui/adaptive-responsive/platform-adaptations)
- [Cupertino widgets (official)](https://docs.flutter.dev/ui/widgets/cupertino)
- [pub.dev/flutter_screenutil](https://pub.dev/packages/flutter_screenutil)
- [Mastering Responsive UI in Flutter with flutter_screenutil (2026 Edition) — Medium](https://medium.com/@shaheerzia22/mastering-responsive-ui-in-flutter-with-flutter-screenutil-2026-edition-98db0443104a)
- [Stop Using MediaQuery in Flutter — Medium](https://medium.com/@ashfaque-khokhar/stop-using-mediaquery-in-flutter-53f4dac48bb2)
- [pub.dev/intl](https://pub.dev/packages/intl)
- [Accessibility (official)](https://docs.flutter.dev/ui/accessibility)
- [Accessibility testing (official)](https://docs.flutter.dev/ui/accessibility/accessibility-testing)
- [Web accessibility (official)](https://docs.flutter.dev/ui/accessibility/web-accessibility)
