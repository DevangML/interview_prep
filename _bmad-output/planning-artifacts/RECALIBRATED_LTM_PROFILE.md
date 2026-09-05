┌─────────────────────────────────────────────────────────────────────────────┐
│                 RECALIBRATED 2.5 YOE LTIMINDTREE PROFILE (V2)               │
└─────────────────────────────────────────────────────────────────────────────┘
  ⭐⭐⭐⭐⭐ CORE (The 80% That Wins the Offer):
  ├── BLoC & Architecture: Clean Architecture (DTO -> Domain), BLoC with sealed classes,
  │   context.read vs watch, offline-first sync strategies, state management trade-offs.
  ├── Dart Async & Dart 3: Future vs Stream, Event Loop, cancelling StreamSubscriptions,
  │   Records, Pattern Matching, and exhaustive switch statements.
  ├── API, Security & Firebase: Dio interceptors (token refresh), flutter_secure_storage,
  │   FCM push notifications, and Firebase Crashlytics.
  ├── UI, Forms & Navigation: GoRouter (deep linking), FocusNode lifecycles, form validation,
  │   handling BuildContext safely across async gaps (`if (!mounted) return;`).
  ├── Lifecycle Scenarios: initState, didUpdateWidget, didChangeDependencies, dispose.
  └── OOP, SOLID & Null Safety: Interface segregation, Dependency Injection, zero '!'.

  ⭐⭐⭐ ENTERPRISE & INTERNALS (Kept at L2–L3 Conceptual Depth):
  ├── Testing: testWidgets (pump vs pumpAndSettle), Mocktail dependency mocking, Golden tests.
  ├── Release & CI/CD: Flavors, --dart-define for secretless config, AAB builds, 
  │   --obfuscate and --split-debug-info for app size/security.
  ├── Native Interop: Pigeon (type-safe codegen) vs legacy stringly-typed MethodChannels.
  ├── Three Trees: Widget (config) -> Element (identity) -> RenderObject (paint/layout).
  ├── Keys: Why keys? ValueKey(id) for reordering stateful items.
  ├── Tooling: DevTools CPU profiler, leak_tracker for memory leaks.
  └── setState: markNeedsBuild() -> dirty Element pipeline.

  ⭐⭐ CS & OA GATE (The Baseline):
  ├── OOP & SOLID (8/10) | DSA: Easy-Medium Arrays, Strings, HashMaps (5-6/10)
  └── DBMS: SQLite/Joins, Indexes (5/10) | Networks: REST, WebSockets, HTTP/JWT (5/10)
