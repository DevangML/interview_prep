# LTIMindtree & L&T Tech Services (LTTS) - Flutter Interview Question Bank (V2)
**Target Profile:** 2.5 YOE Lateral Flutter Developer
**Research Synthesis:** 2026 Industry Data (Enterprise Enterprise Grade)

## 1. Dart 3 & Concurrency (High Priority)
*   **Q1:** How does Dart execute asynchronous code? (Explain the Event Loop, Microtasks vs Event Queue).
*   **Q2:** What is the difference between `Future` and `Stream`? How do you prevent memory leaks when listening to Streams?
*   **Q3:** Explain Dart 3 features: How do you use Records and Pattern Matching to handle complex API responses?
*   **Q4:** What is an `Isolate`? When would you use `compute()` instead of async/await?
*   **Q5:** What are Mixins and how does linearization work if multiple mixins share a method?

## 2. Flutter UI, Forms & Navigation (High Priority)
*   **Q1:** Explain the lifecycle of a `StatefulWidget`. (Focus on `initState`, `didChangeDependencies`, `didUpdateWidget`, and `dispose`).
*   **Q2:** How do you safely use `BuildContext` across async gaps in modern Flutter? (Explain the `mounted` check).
*   **Q3:** How do you handle deep linking and complex routing? (Defend the use of `GoRouter` or Navigator 2.0).
*   **Q4:** How do you manage complex form validations and keyboard focus using `FocusNode`?
*   **Q5:** What is the purpose of `Keys`? When must you use a `ValueKey` vs a `GlobalKey`?

## 3. State Management & Architecture (Core Differentiator)
*   **Q1:** Compare BLoC, Riverpod, and Provider. Why did you choose your specific state management solution for your last project?
*   **Q2:** Explain the flow of data in BLoC using `sealed` classes for state representation.
*   **Q3:** How do you handle one-off side effects (like Snackbars or Dialogs) without triggering full UI rebuilds?
*   **Q4:** Describe Clean Architecture. How do you map Data Transfer Objects (DTOs) to Domain Models?
*   **Q5:** How do you architect an offline-first application? (Explain SQLite/Hive caching, queuing failed network requests, and conflict resolution).

## 4. Networking, Security & Firebase (Medium/High Priority)
*   **Q1:** How do you handle HTTP requests and token refresh logic? (Explain Dio interceptors).
*   **Q2:** Where do you store JWT tokens securely on the device? (Explain `flutter_secure_storage` vs SharedPreferences).
*   **Q3:** How do you handle push notifications when the app is terminated? (Explain Firebase Cloud Messaging - FCM).
*   **Q4:** How do you track and resolve production crashes? (Explain Firebase Crashlytics and custom error logging).

## 5. Native Interop, Release & CI/CD (Gatekeeper for Enterprise)
*   **Q1:** How do you communicate with native Android/iOS code? (Compare legacy `MethodChannel` vs type-safe `Pigeon`).
*   **Q2:** How do you manage different environments (Dev, QA, Prod) in a Flutter app? (Explain Flavors and `--dart-define` for secretless config).
*   **Q3:** How do you reduce the size of your production app and protect the code? (Explain AABs, `--split-debug-info`, and `--obfuscate`).
*   **Q4:** What tools do you use to diagnose UI jank or memory leaks? (Explain Flutter DevTools and `leak_tracker`).

## 6. Testing (Non-Negotiable)
*   **Q1:** How do you write a Widget test? (Explain `testWidgets`, `pump`, vs `pumpAndSettle`).
*   **Q2:** How do you mock dependencies in your tests? (Explain Mocktail vs Mockito).
*   **Q3:** What are Golden tests and why are they useful?

## 7. CS Fundamentals & Basic DSA (OA Gatekeeper)
*   **OOPs & SOLID:** Define Interface Segregation and Dependency Injection with real Flutter examples.
*   **DBMS:** Basic SQL joins, indexing, and transactions.
*   **DSA (Easy Level):** Array/String manipulation, HashMaps for caching, two-pointer techniques.
