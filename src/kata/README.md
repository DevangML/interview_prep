# Pure Dart Edge-Case Katas

This directory houses the 7 surgical executable katas covering the 14 pure Dart syllabus topics not forced by the Tremor Capstone project.

## Kata Index

| # | File | Syllabus Topics | Goal |
|---|---|---|---|
| 1 | `01_mixin_linearization.dart` | `D-20, D-21, D-22` | Diamond mixin hierarchy and reverse `super` resolution. |
| 2 | `02_event_loop_traps.dart` | `A-01, A-02, A-04` | Microtask starvation and execution priority ordering. |
| 3 | `03_generators_and_laziness.dart` | `D-31, A-10` | `sync*` vs `async*`, `yield*`, and `Iterable.map()` laziness. |
| 4 | `04_extension_types.dart` | `D-26, D-27` | Dart 3.3 zero-cost extension types vs runtime wrappers. |
| 5 | `05_custom_operators_and_call.dart` | `D-17, D-18` | `operator ==`, `hashCode`, `operator []`, and callable `call()`. |
| 6 | `06_two_way_isolates.dart` | `A-13, A-14, A-16` | Persistent `Isolate.spawn()` worker with bidirectional ports. |
| 7 | `07_zones_and_error_capture.dart` | `A-12, D-33` | Scoped asynchronous error boundary via `runZonedGuarded`. |

## Execution Protocol

Run any kata with:
```bash
dart run src/kata/<filename>.dart
```
