# Product Roadmap: Tremor Capstone
**Goal:** Build a production-grade Earthquake tracking application that naturally forces the application of 100% of LTIMindtree/LTTS interview requirements (Dart, Flutter, DSA, OOP, DBMS, and CN).

## 🧭 Strategy
We are killing standalone theory. Every concept will be learned *while* building a feature. The "Hidden Syllabus" for each Epic maps exactly to what you will be asked in the interview.

---

### Epic 1: The Core Domain & App Shell
**The Feature:** We set up the Flutter app shell, navigation, and model the core `Earthquake` data entities and abstractions. 
*   **User Story:** As a user, I want to open the app and see a basic UI skeleton so I know the app is functioning.
*   **The Hidden Syllabus (What you are actually learning):**
    *   **OOP & SOLID:** Abstracting the `EarthquakeRepository`. Using Encapsulation for data models, Polymorphism for mock vs. live data sources. 
    *   **Dart Fundamentals:** Classes, named constructors, `factory` constructors, sound null safety (`?`, `!`, `late`).
    *   **Flutter Core:** `main()` vs `runApp()`, `StatelessWidget` vs `StatefulWidget`, the Widget Tree.

### Epic 2: Networking & Concurrency
**The Feature:** Connect to the live USGS Earthquake REST API. Fetch the data, handle loading states, and catch network failures gracefully.
*   **User Story:** As a user, I want the app to securely fetch real-time earthquake data from the web.
*   **The Hidden Syllabus (What you are actually learning):**
    *   **Computer Networks (CN):** HTTP verbs (GET, POST), REST constraints, JSON parsing, API Status Codes (200, 400, 500).
    *   **Dart Async:** The Event Loop, `Future`, `async/await`. 
    *   **Networking in Flutter:** Using `Dio`, configuring Interceptors (for auth/logging), handling timeouts.

### Epic 3: State Management & Reactivity
**The Feature:** Implement BLoC to manage the complex states of the app (Loading, Success, Error, Empty). Make the UI react instantly to state changes.
*   **User Story:** As a user, I want to see a loading spinner while data fetches, and an error screen if my internet dies.
*   **The Hidden Syllabus (What you are actually learning):**
    *   **State Management:** The complete BLoC pattern (Events -> Bloc -> States), `BlocBuilder`, `BlocListener`.
    *   **Reactivity:** Dart `Streams`, StreamControllers, Yielding states.
    *   **Architecture:** Clean Architecture separation (Data layer -> Domain layer -> Presentation layer).
    *   **Widget Lifecycle:** Deep dive into `initState()`, `didChangeDependencies()`, and `dispose()` when managing controllers.

### Epic 4: Data Processing, Algorithms, & Performance
**The Feature:** Add the ability to search earthquakes, filter them by magnitude, sort by distance, and ensure scrolling through 10,000 records doesn't lag the UI.
*   **User Story:** As a user, I want to instantly search and sort through thousands of earthquakes without the app freezing.
*   **The Hidden Syllabus (What you are actually learning):**
    *   **DSA (Data Structures & Algorithms):** 
        *   *Arrays/Sorting:* Implementing custom sorting algorithms for magnitude/distance.
        *   *HashMaps:* Using Maps to cache recent searches for O(1) lookups.
        *   *Strings/Search:* Two-pointer techniques or binary search logic for fast filtering.
    *   **Heavy Computation:** Using `Isolates` and `compute()` to parse massive JSON payloads off the main thread.
    *   **Flutter Performance:** `ListView.builder` for lazy loading, proper use of `const` constructors, avoiding unnecessary rebuilds, and understanding `Keys`.

### Epic 5: Offline Persistence & Edge Cases
**The Feature:** Save the user's preferences, cache the last fetched earthquake list for offline viewing, and handle app backgrounding.
*   **User Story:** As a user, I want to see the last known data even if I open the app in airplane mode.
*   **The Hidden Syllabus (What you are actually learning):**
    *   **DBMS:** Setting up SQLite/Hive. Understanding tables, primary/foreign keys, joins, and normalization in a mobile context.
    *   **App Lifecycle:** Handling `AppLifecycleState` (paused, resumed, detached).
    *   **Edge Cases (Katas):** Dealing with mixin linearizations, tricky UI constraints, and context across async gaps.

---

## 🚀 Execution Plan
We will start at **Epic 1**. I will provide the feature requirement, and as you write the code, we will interrogate the OOP/Dart fundamentals underneath it. When we hit Epic 4, you will write the actual DSA logic to filter the UI.

This gives you a real-world project to talk about in the interview, where you can say: *"I implemented BLoC because..."* or *"I used an Isolate to parse the JSON because the Event Loop was blocking..."*
