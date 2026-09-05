# Executive Product Brief: Tremor Capstone

## 1. The Premise
The candidate (Devang) is targeting a **2.5 YOE Lateral Flutter Developer** role at enterprise IT services firms (specifically LTIMindtree and L&T Technology Services) in 2026. 

To clear these interviews, candidates must demonstrate practical, production-grade competence. Spending weeks memorizing theoretical C++ engine internals or 10-hour tutorial videos yields a negative ROI. The most effective way to build interview muscle memory is through ruthless, feature-driven execution. 

## 2. The Problem We Are Solving
**Theoretical fragility.** Candidates often know *what* a concept is (e.g., "BLoC is a state management pattern"), but fail when asked to defend *why* they used it, *how* they secured it, or *what* edge cases they encountered. 

Furthermore, building standard "To-Do" or "Weather" apps rarely forces a developer to confront enterprise-grade problems. They miss critical domains like Native Interop, E2E Integration Testing, App Size Obfuscation, and Secure Token Storage—the exact domains that separate junior developers from mid-level lateral hires.

## 3. What This Project Promises
The **Tremor** project (an advanced, real-time Earthquake tracking application) is designed as a pedagogical trojan horse. It promises:

*   **100% Empirical Syllabus Coverage:** Every feature in the app is reverse-engineered from the LTM/LTTS interview syllabus. You will not read about a concept; you will code it.
*   **Enterprise-Grade Architecture:** Tremor is not a toy. It enforces Dart 3 sealed classes, Clean Architecture, BLoC, offline-first SQLite synchronization, and type-safe `Pigeon` native channels.
*   **Built-in STAR Story Generation:** By the end of the project, you won't need to invent behavioral answers. You will have authentic stories about resolving memory leaks, managing CI/CD pipelines, and writing complex custom sorting algorithms (DSA).
*   **Zero Theoretical Gaps:** From the `GoRouter` navigation shell down to the `flutter_secure_storage` implementation, the project forces you to hit every gatekeeper question a panel can ask.

## 4. The Technical Scope
To deliver on these promises, Tremor will be executed across **8 strict Epics**:

1.  **Epic 0:** Strict Static Analysis (`very_good_analysis`).
2.  **Epic 1:** Dart 3 Domain Modeling (`freezed`, `json_serializable`, Records).
3.  **Epic 2:** App Shell & Native Boundary (`GoRouter`, `Pigeon`, `gen-l10n`, `Semantics`).
4.  **Epic 3:** Networking & Security (Dio interceptors, WebSockets, `flutter_secure_storage`).
5.  **Epic 4:** State Management & Forms (BLoC with sealed states, `FocusNode`).
6.  **Epic 5:** Advanced UI & DSA (`Slivers`, Isolates, custom array sorting).
7.  **Epic 6:** Offline Persistence (SQLite/Hive, AppLifecycle caching).
8.  **Epic 7:** QA, Release & Telemetry (`integration_test`, Firebase Crashlytics, `--obfuscate`, GitHub Actions).

## 5. Definition of Done
The project is not considered complete until:
1. The app compiles with zero linting errors.
2. The UI renders 10,000 records smoothly without raster jank.
3. The CI/CD pipeline successfully builds an obfuscated AAB.
4. **Crucially:** The candidate can verbally defend every architectural choice made in the codebase without looking at notes.
