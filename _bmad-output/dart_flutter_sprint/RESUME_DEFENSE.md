# Résumé defense: answer criteria and retest prompts

Based on both pages of `/Users/devang/Downloads/Devang Manjramkar.pdf`, reviewed 2026-09-06. These are technically grounded answer criteria, not invented accounts of what Devang implemented. Explain the real implementation first; use “I would” for alternatives and “in the Tremor exercise” for new work. No topic has been tested in this session.

Coach: present one prompt at a time. Keep the criteria and follow-up until after the first attempt. The learner can consult this file as a reference, but reading it does not establish mastery.

## 1. Walk me through your strongest Flutter work

Anchor: WMS Field App. Structure: operator problem → personal responsibility → one feature's UI/state/repository/API/data path → difficult failure → test/rollout → supported result. Select one of the six warehouse lifecycle stages and expand only that one. Name the actual state manager, database and ownership boundary; none can be deduced from this résumé. Distinguish the internship from the full-time role.

Retest: draw the flow from memory and identify where one operation can fail. Missing evidence: exact stack, concrete incident, team boundary.

## 2. How did offline-first work?

Correct core: specify which operations work offline, what is persisted before acknowledgement to the user, how pending changes reach the server, and how conflicts become visible. Cached reads alone do not prove offline writes. A local transaction can couple a record change with a durable pending operation; server correctness still needs its own contract. State the actual WMS design rather than borrowing the proposed Tremor outbox as history. [Flutter offline-first](https://docs.flutter.dev/app-architecture/design-patterns/offline-first).

Retest: kill the app immediately after the local save. What survives?

## 3. Server committed, response lost: what now?

Correct core: timeout leaves an uncertain outcome. Retry the same logical operation with a stable operation ID and unchanged payload. The server must atomically prevent duplicate application and return a recognized replay result. Generating a new ID per retry defeats deduplication. Describe key scope/retention and what happens to retries outside the retention window; do not promise universal exactly-once delivery. [Concrete idempotency semantics](https://docs.stripe.com/api/idempotent_requests).

Retest: the user makes a second legitimate change while the first is unacknowledged. Different intent needs a different operation, preserving order.

## 4. Two warehouse operators update the same stock

Correct core: mutual exclusion in one Flutter isolate cannot coordinate separate devices. An authoritative server validates the business invariant using transactional state/version checks or another explicit concurrency policy. A stale version may be rejected and require refresh/merge/operator resolution. Last-write-wins is a choice with possible data loss, especially for quantities; explain why the actual policy is safe. HTTP If-Match provides a standard conditional-write mechanism. [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#name-if-match).

Retest: both clients read revision 7 and submit incompatible changes.

## 5. Explain Campaigns without saying “dynamic UI” repeatedly

Correct core from the résumé: Frappe JSON → validated typed config → local persistence → runtime event/rule matching → supported widget rendering. Explain how package code stays independent of app-specific navigation, storage and event producers. Describe compatibility for older app versions and an unsupported config. The decision to use schema versions, allowlisted renderers and fallback config is a recommended design; confirm whether production actually used each.

Retest: a new campaign widget type reaches an older Courier app. What happens, and where?

## 6. BLoC, Cubit or another state manager?

Correct core: Cubit exposes methods that emit states; Bloc handles events and emits states. Choose based on workflow and event handling needs, not popularity. Async method calls can overlap; use an explicit ordering/latest-request policy. Immutable state and equality choices affect whether changes are emitted and observed. First identify the manager you used at work; the résumé says only “state management.” [Bloc concepts](https://bloclibrary.dev/bloc-concepts/).

Retest: a slow previous search finishes after the new search.

## 7. Future, Stream, async and isolate

Correct core: Future represents one eventual completion; Stream represents a sequence. Await yields while waiting, but synchronous CPU work remains on that isolate. Native isolates have separate memory and event loops and communicate via messages. Use one for sufficiently costly CPU work after measuring the overhead; do not add one merely because an API is asynchronous. [Dart concurrency](https://dart.dev/language/concurrency), [isolates](https://dart.dev/language/isolates).

Retest: why can a JSON decode inside an async function still cause jank?

## 8. Widget lifecycle and asynchronous callbacks

Correct core: initState is one-time initialization per State; didChangeDependencies handles inherited dependency changes; didUpdateWidget responds to a new widget configuration reusing the State. Dispose resources owned by the State. After asynchronous work, check mounted before using a widget context/state, and cancel obsolete work where possible. A mounted check is not cancellation. [State lifecycle](https://api.flutter.dev/flutter/widgets/State-class.html).

Retest: subscription input changes while the widget keeps the same key.

## 9. Keys and the three trees

Correct core: widgets are immutable configuration, elements maintain mounted identity and State relationships, render objects perform layout/painting. Type and key participate in matching updates. Stable domain keys help preserve the correct row state during reorder; random keys discard identity. A rebuild is not automatically a repaint. [Flutter architecture overview](https://docs.flutter.dev/resources/architectural-overview).

Retest: two editable rows swap positions and retain the wrong text.

## 10. Null safety and your unfinished Earthquake model

Correct core: represent unknown values with nullable types when the domain allows them; validate required identity at the boundary. Null assertion defers proof to runtime; it does not validate an API payload. A final reference does not make a mutable object deeply immutable. Verify generated part basenames, factory syntax and generator compatibility against the installed package before relying on codegen. [Dart null safety](https://dart.dev/null-safety/understanding-null-safety).

Retest: missing magnitude versus magnitude zero. They must not become the same fact.

## 11. Debounced search

Correct core: debounce waits for a quiet interval; throttle limits processing rate. Cancel/reset the pending timer and clean up on disposal. If the action fetches remote data, debounce alone does not stop an older in-flight response overwriting the latest result; gate responses by request identity or another deliberate policy. Explain queue behavior using the concrete scheduling primitives. [Dart asynchronous runtime](https://dart.dev/blog/dart-asynchronous-programming-isolates-and-event-loops).

Retest: dispose the screen before the timer fires.

## 12. Scanner, OCR, camera and torch

Correct core: identify whether capture came from keyboard input, a plugin or custom native code. Normalize inputs at one boundary and apply an explicit duplicate policy without dropping legitimate repeated scans. Handle permissions, unavailable hardware, pause/resume, controller cleanup and error feedback. Custom method channels support request/response; streaming native events may use an EventChannel. Do not claim to have authored a native plugin if you configured an existing package. [Platform integration](https://docs.flutter.dev/platform-integration/platform-channels).

Retest: scanner sends the same SKU twice; distinguish duplicate emission from quantity two. For torch switching, explain the actual threshold policy and whether hysteresis was used.

## 13. Diagnose a slow Flutter screen

Correct core: reproduce in profile mode on a relevant device, inspect UI/raster work and identify the expensive operation before changing it. Narrow state/rebuild scope, use lazy lists, and evaluate layout/paint/image/CPU cost separately. Const helps reuse configuration but is not a blanket no-rebuild guarantee; RepaintBoundary is not a rebuild blocker. Report measured results only. [Performance guidance](https://docs.flutter.dev/perf/best-practices).

Retest: a raster-heavy animation remains slow after adding an isolate.

## 14. Material 3, icons and whitelabelling

Correct core: explain one actual migration beyond enabling a theme: component behavior, layout, interaction and regression checks. Icons can reduce reading burden but still need comprehensible semantics, accessible controls and localization where meaning depends on language. Flavor configuration can change app identity/branding; it does not enforce tenant data isolation. [Accessibility](https://docs.flutter.dev/ui/accessibility), [flavors](https://docs.flutter.dev/deployment/flavors).

Retest: tenant A signs out with unsynced work and tenant B signs in.

## 15. Package versus plugin; reusable components

Correct core: describe the stable public API and injected app-specific dependencies. A package can share Dart/Flutter code; a plugin adds platform-specific integration. Demonstrate that a consumer can update without breaking its expected contract. Specify cache identity, invalidation and error behavior; “reusable” is not sufficient proof of sound coupling. [Platform-specific code and plugins](https://docs.flutter.dev/platform-integration/platform-channels).

Retest: remove one app-specific navigation dependency from the shared module design.

## 16. Can hidden fields secure IAM?

Correct core: no. Authorize mutations server-side using the authenticated identity, resource scope, allowed fields and workflow state. UI visibility improves usability but cannot prevent a crafted request. Distinguish roles, user-specific restrictions and workflow transitions; test a denied API action. Name the actual Frappe enforcement points you used. [Frappe permissions](https://docs.frappe.io/framework/user/en/basics/users-and-permissions).

Retest: user's role changes after a form loads but before submission.

## 17. Testing and “coverage improved”

Correct core: unit tests target pure behavior; widget tests exercise UI behavior in the test environment; integration tests exercise interactions across larger boundaries/on target environments. Explain a failing assertion before the fix, not only a percentage. A useful sync test recreates a lost acknowledgement, replay and unchanged final quantity. For the résumé's improvement claim, provide baseline, measurement window and covered modules or state that the precise figures are unavailable. [Flutter testing](https://docs.flutter.dev/testing/overview).

Retest: 95% line coverage but no test of concurrent replay. What is missing?

## 18. Metrics, ownership and causality

585/588 rounds to 99.5%, but ticket closure is not defect rate, throughput or proof that every task was independent. Explain the time window, ticket types, exclusions/reopened work and personal responsibility. “Same-day self-service,” “zero downtime,” “first 200 users” and “measurably reduced defects” each need a source and denominator if challenged. Do not fabricate missing metrics. A qualitative observed improvement can be stated as qualitative.

Retest: which result can you personally substantiate without relying on someone else's work?

## 19. Web, API, database and operations backup

This remains a Flutter interview backup, not a new subject track. Prepare one real Vue/Frappe screen: user action → request → authentication/authorization → transaction/query → response → UI update. For REST, distinguish missing/invalid authentication (401) from forbidden access (403), and conflict/precondition outcomes according to the API contract. Idempotency follows operation semantics, not the comforting presence of a retry loop. [HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110.html).

For SQL/Redis, describe the actual query, index/cache purpose, invalidation and failure behavior from your work; database and cache details are absent from the résumé. For Docker/CI/CD, name the stages and artifact you personally owned. For GA4, explain the event trigger, duplication policy and how you verified capture. These facts must come from Devang, not inferred tools or fabricated architecture.

Retest: walk one endpoint through a permission rejection and a network retry.

## 20. AI Operating System and Adaptive Learning System

Correct core: distinguish a delivery framework from an OS kernel. Show one change tied to an acceptance criterion, a wrong output that failed an independent check, and the corrected artifact. Explain what role orchestration improved, the latency/cost tradeoff and what remains human-reviewed. For the learning system, separate a scheduled plan change from actual measured mastery. Do not claim a control loop automatically validates its own ground truth.

Retest: the implementer and reviewer share the same mistaken assumption. What independently catches it?

## Practice problems to recheck

No past failure list for these exact prompts was supplied; these are proposed diagnostics, not previously failed questions. Present only one at a time and show additional conditions after the attempt.

| Exercise | Reasoning to demonstrate | Later variation |
|---|---|---|
| Parse one earthquake fixture | Required identity, nullable values, numeric conversion, boundary validation | Absent geometry or malformed magnitude |
| Deduplicate capture events | Stable event identity, bounded memory, preserve intentional repeat | Same SKU with distinct event IDs |
| Latest search wins | Quiet interval plus stale-response policy | Old response arrives last |
| Replay queued triage | Durable intent, idempotency, ordered application | Server commits then connection drops |
| Reorder editable list | State identity follows domain ID | Insert row at front |
| Evaluate AND rules | Explicit semantics for no rules, unknown fields and invalid config | New schema reaches old renderer |

For each attempt record the actual answer, mistake, corrected reasoning, evidence and next retest. Start all scores as unassessed. Practice goal: explain within 90 seconds, handle a changed condition, then repeat cold later. Passing here is preparation evidence, never a guarantee of interview outcome.
