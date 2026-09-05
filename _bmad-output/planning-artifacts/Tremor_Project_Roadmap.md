# Product Roadmap: Tremor Capstone (V3 - Final Production Spec)
**Goal:** Build a production-grade Earthquake tracking application that forces the application of **100%** of LTIMindtree/LTTS syllabus domains (Dart 3, Flutter, DSA, OOP, DBMS, CN, Testing, CI/CD, and Native Interop) using strictly modern 2026 standards.

## 🧭 Strategy
Every concept will be learned *while* building a feature. The "Hidden Syllabus" for each Epic maps exactly to what you will be asked in the interview. No legacy patterns allowed.

---

### Epic 0: Inception & Static Analysis
**The Feature:** Initialize the project with strict linting rules before a single line of application code is written.
*   **The Hidden Syllabus:**
    *   **Tooling (Domain 12):** `pubspec.yaml` vs `pubspec.lock`, configuring `analysis_options.yaml` using strict rulesets (`very_good_analysis` or `flutter_lints`).

### Epic 1: Domain Modeling & Dart 3 Paradigms
**The Feature:** Model the Earthquake entities using modern codegen and modern Dart syntax.
*   **User Story:** As a developer, I want complex API JSON payloads mapped to type-safe models automatically.
*   **The Hidden Syllabus:**
    *   **Dart 3 Core (Domain 1):** Records, Pattern Matching, and `sealed` classes for exhaustive switch statements.
    *   **Data & Codegen (Domain 8):** Using `freezed` and `json_serializable` to eliminate hand-written `fromJson` boilerplate.

### Epic 2: App Shell, Responsive Navigation & Native Boundary
**The Feature:** Set up deep-linking, multi-language support, accessibility, responsive breakpoints, and fetch the device's battery level using type-safe native channels.
*   **User Story:** As a user, I want the app to route securely, support my language, read well on a tablet, and warn me if an earthquake alert drains my battery.
*   **The Hidden Syllabus:**
    *   **Navigation (Domain 7):** `GoRouter` or Navigator 2.0 with deep linking.
    *   **UI/Product (Domain 9):** `LayoutBuilder` / `MediaQuery` (Responsive), `gen-l10n` (i18n), and `Semantics` (Accessibility).
    *   **Native Interop (Domain 14):** Using **`Pigeon`** for type-safe native codegen instead of legacy string-based MethodChannels.

### Epic 3: Networking, Secure Auth & Concurrency
**The Feature:** Authenticate the user securely, fetch live USGS REST data, and connect a WebSocket for real-time tsunami warnings.
*   **User Story:** As a user, I want to securely log in and see live, real-time earthquake data.
*   **The Hidden Syllabus:**
    *   **Auth (Domain 8):** `flutter_secure_storage` (Keychain/Keystore) for JWTs, refresh loops, interceptor re-auth.
    *   **Computer Networks (CN):** HTTP verbs, REST vs WebSockets, TCP/UDP.
    *   **Dart Async:** The Event Loop, `Future`, `async/await`, Streams.

### Epic 4: State Management & Forms
**The Feature:** Implement a complex search and filter form to find specific earthquakes, governed entirely by BLoC using Sealed states.
*   **User Story:** As a user, I want to search for earthquakes by region without the UI lagging while I type.
*   **The Hidden Syllabus:**
    *   **Forms (Domain 9):** `TextFormField`, custom validators, managing `FocusNode`.
    *   **State Management (Domain 5):** BLoC pattern with `sealed` states, `BlocListener` for snackbars.
    *   **Reactivity:** Debouncing the search input via Stream transformers.

### Epic 5: Advanced UI, DSA & Performance Tooling
**The Feature:** Render thousands of earthquakes in a high-performance feed. Sort them by magnitude or distance.
*   **User Story:** As a user, I want to scroll through thousands of records smoothly and sort them instantly.
*   **The Hidden Syllabus:**
    *   **Advanced UI (Domain 9):** `CustomScrollView` and `Slivers` (SliverAppBar, SliverList) for complex scrolling.
    *   **DSA:** Array manipulation, custom sorting algorithms, HashMaps for O(1) caching.
    *   **Heavy Computation:** `Isolates` / `compute()` to parse massive JSON payloads off the main thread.
    *   **Tooling (Domain 12/10):** DevTools CPU profiler, `leak_tracker` for memory leaks, debug vs release modes.

### Epic 6: Offline Persistence & Mixins
**The Feature:** Save user preferences and cache the earthquake feed for offline viewing. Use a shared logger.
*   **User Story:** As a user, I want to see the last known data even if I am offline.
*   **The Hidden Syllabus:**
    *   **DBMS (Domain 8):** SQLite/Hive. Normalization, primary/foreign keys in a mobile context.
    *   **App Lifecycle:** Handling `AppLifecycleState` (paused/resumed).
    *   **Dart Core:** Mixin linearization.

### Epic 7: Quality Assurance, Release & Telemetry
**The Feature:** Write automated tests (including E2E), configure environments, integrate crash reporting, and build an optimized CI pipeline.
*   **User Story:** As a developer, I want my app to be fully tested, monitored in production, and as small as possible.
*   **The Hidden Syllabus:**
    *   **Testing (Domain 11):** Unit, Widget, Mocktail, Golden tests, AND **E2E Integration Tests** (`integration_test` or Patrol).
    *   **Release & CI/CD (Domain 13):** Build Flavors, `--dart-define`, GitHub Actions.
    *   **Telemetry & App Size (Domain 13/10):** Firebase Crashlytics/Sentry, `--split-debug-info`, and `--obfuscate` to strip payload size.

### Epic 8: The Human Round (STAR Stories)
**The Feature:** Extract the engineering decisions made in Epics 0-7 into communicable interview answers.
*   **User Story:** As a candidate, I want to confidently defend why I chose Pigeon over MethodChannel, or how I secured my JWTs.
*   **The Hidden Syllabus:**
    *   **HR / Behavioral (Domain 15):** The pivot narrative, STAR stories (Situation, Task, Action, Result).

---

## 🚀 Execution Plan
We start at **Epic 0**. We do not advance until the previous epic's code is working, strictly linted, tested, and you can defend the underlying theory out loud.
