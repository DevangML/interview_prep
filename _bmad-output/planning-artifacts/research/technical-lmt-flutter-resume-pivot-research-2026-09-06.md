---
stepsCompleted: [1, 2, 3, 4, 5, 6]
workflowType: research
research_type: technical
research_topic: LMT Flutter interview preparation through resume defense and Tremor
research_goals: Verify technical answers, prioritize resume claims, pivot the learner-owned capstone
user_name: Devang
date: 2026-09-06
status: provisional_company_and_round
workflow_execution: User-authorized research and pivot; intermediate confirmation menus consolidated
inputDocuments:
  - /Users/devang/Downloads/Devang Manjramkar.pdf
  - /Users/devang/Desktop/tremor/lib/main.dart
  - /Users/devang/Desktop/tremor/lib/src/features/earthquake/domain/earthquake.dart
  - /Users/devang/Desktop/interview_prep/_bmad-output/dart_flutter_sprint/CAPSTONE.md
web_research_enabled: true
source_verification: true
---

# Flutter interview research: defend the résumé, then prove it in Tremor

## Executive summary

The résumé presents an experienced enterprise mobile engineer: offline warehouse operations, a reusable config-driven Campaigns framework, device capture, and IAM workflows. Those claims provide the strongest basis for preparation. A generic list of Flutter definitions misses the obvious follow-up: explain a production decision, show the failure case, and defend the tradeoff. These are preparation inferences from the résumé, not a verified employer question bank or proof of the shortlisting reason.

Keep Tremor's seismic domain and add a small incident-triage exercise with offline writes. Prioritize correctness and explanation over animation, framework novelty or many packages. The current source is an app shell plus an incomplete domain model. The plan must not describe a shipped app or measured optimization that does not yet exist.

Company is provisionally LTIMindtree from the active subject config; the user subsequently supplied a Hyderabad LTM venue opposite IKEA in Knowledge City. The address confirms venue context, not the interview round or date. The user wrote both “L1 skipped” and “directly L1”; L2/client/managerial status and interview date remain unknown. Prepare for both fundamentals and scenario discussion. No current employer-owned Flutter vacancy or reliable Flutter-specific L2 account was verified in this search. Do not infer the actual panel or duration from other-role reports.

## Contents

1. Evidence and research method
2. Résumé-to-interview priorities
3. Architecture, stack and integration decisions
4. Implementation, performance and validation
5. Risks, timing and next action
6. Sources and orchestration evidence

## 1. Evidence and research method

Both résumé pages were extracted and visually inspected. Contact details are omitted from this report. Résumé assertions are candidate claims, not independently audited employment evidence. Read the existing capstone, subject registry and current source. No project-context.md was found in the project scan. Old mastery values are not a fresh diagnostic.

Live inspection found `/Users/devang/Desktop/tremor`, replacing the absent path `/Users/devang/Desktop/flutter_project` in older state. `flutter --version` from its FVM SDK reports Flutter 3.47.2, Dart 3.13.2. Therefore the old mandatory 3.47.0 global install is obsolete for this project. No package upgrade is needed merely to prepare for the interview.

Searches included LTIMindtree Flutter developer responsibilities, Flutter L2 interview experience, employer career listings, and Flutter/BLoC hiring. Results contained generic interview pages, other-role anecdotes, profiles, and third-party job copies. A private-looking candidate evaluation on Scribd was excluded as unauthenticated evidence. [NodeFlair's role page](https://nodeflair.com/companies/ltimindtree/interviews/flutter-developer) did not establish an actual question sequence. A [third-party 6–10-year vacancy](https://www.jobaaj.com/job/ltimindtree-flutter-developer-maharashtra-pune-6-to-10-years-925895) is not this candidate's JD. Neither is used to assign question frequencies.

Technical answer criteria use official Flutter, Dart, Bloc, Frappe, USGS and HTTP documentation. Sources accessed 2026-09-06; website crawl dates are not publication dates. Confidence is high for documented API behavior, moderate for résumé-based preparation priorities, and low for exact company/round predictions. This is a focused preparation study, not an exhaustive market survey.

## 2. Résumé-to-interview priorities

All prompts below are predicted probes based on explicit claims, not reported LMT questions.

| Priority | Résumé claim | Predicted probe | Evidence Devang should supply |
|---|---|---|---|
| First | Offline-first WMS; authored sync design | Server commits but response is lost; two operators edit same item | Real local schema, retry policy, conflict rule and personal ownership |
| First | Campaigns package across four apps | Trace JSON to typed object to event match to widget; handle schema changes | Actual package boundary, config example, compatibility incident |
| First | Four capture paths | Prevent duplicate capture; handle permission denial and lifecycle | Exact plugins/native integration used and one device bug |
| First | Flutter state management | Which mechanism did each real app use, and why? | Actual library and state ownership; résumé does not name BLoC |
| First | Material 2 → 3 rebuild | What changed beyond theme? What regressed? | One screen, constraint, rollout/test and observable result |
| First | Delivery ownership | Explain one feature across requirements, code, tests and release | Personal contribution versus shared/team work |
| Second | IAM RBAC/field permissions | Can a crafted API request bypass hidden fields? | Server permission/workflow enforcement and negative test |
| Second | Multi-tenant whitelabelling | Branding versus tenant isolation; logout while offline | Cache/data namespace, credentials and tenant switching behavior |
| Second | Unit testing and coverage | Show a test that found a real bug | Assertion, failure before fix, relevant coverage scope |
| Second | Reusable packages/cached components | Package versus plugin, public API evolution, invalidation | Compatibility policy and one consuming application |
| Second | GA4 instrumentation | Duplicate events, event names, verification | Actual event contract and instrumentation validation |
| Backup | Vue/Frappe, REST, Python, SQL/Redis | Walk one audit workflow through client, server and storage | Actual endpoint, query, permission and cache decision |
| Backup | Docker/CI/CD, Git | What did your pipeline do? How did you roll back? | Real stage sequence; do not claim infrastructure ownership by association |
| Backup | AI delivery and adaptive learning projects | How did you detect a wrong agent output? | One acceptance criterion, failing check, repair and measured comparison |

Do not start separate React, SQL or AI curricula. Prepare these only as résumé follow-ups for the Flutter role. Education, papers, hackathon awards, ActualOne and event ticketing need a short truthful explanation of contribution and limits, not a new build.

## 3. Architecture, stack and integration decisions

Retain a view/view-model/repository/service structure. Flutter documents this MVVM organization as adaptable guidance; Clean Architecture can coexist with it. Avoid arguing that one label automatically makes the other wrong. A Cubit is reasonable for this exercise's command-driven UI, but explain the mechanism actually used in production separately. [Flutter architecture](https://docs.flutter.dev/app-architecture/guide), [Bloc concepts](https://bloclibrary.dev/bloc-concepts/).

The important expansion is from cached reads to durable pending mutations. Flutter's offline-first guide separates reads, writes and synchronization; the application must choose behavior explicitly. Use a local transactional store for an outbox exercise, with a fake remote service first. A key-value preference is enough for a filter, not the proposed atomic write-plus-outbox contract. This storage choice is a design recommendation for Tremor, not a claim about the WMS implementation. [Offline-first guidance](https://docs.flutter.dev/app-architecture/design-patterns/offline-first).

Keep the [USGS GeoJSON feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) as read-only earthquake data. Triage notes and status belong to a separate simulated API. Contract: tenant, operation ID, record ID, base revision, payload, sync status and attempt metadata. Replaying an unchanged operation reuses its ID; changing the intended operation creates a new ID. Server-side idempotency and revision checks solve different problems. [Stripe's concrete idempotency example](https://docs.stripe.com/api/idempotent_requests), [HTTP conditional requests](https://www.rfc-editor.org/rfc/rfc9110.html#name-if-match).

A versioned local JSON rule drives a severity banner; an allowlisted renderer maps the rule to widgets. This is a small analogue of Campaigns, not a recreation of the employer package. A simulated capture stream is sufficient to rehearse lifecycle and duplicate-event reasoning before spending time on hardware setup. Custom native communication uses platform channels when existing plugins are insufficient. [Platform channels](https://docs.flutter.dev/platform-integration/platform-channels).

For security, a disabled button is presentation. The simulated server checks role, tenant and workflow state before accepting a mutation. Frappe distinguishes permissions and user restrictions; use the actual production checks in the historical account. Branding/flavors are a separate concern from authorization. [Frappe permissions](https://docs.frappe.io/framework/user/en/basics/users-and-permissions), [Flutter flavors](https://docs.flutter.dev/deployment/flavors).

## 4. Implementation, performance and validation

Implement in small slices: valid model and feed/list; persistent triage write and replay; conflict handling; config rule; tests and spoken defense. Tests accompany every slice rather than waiting until the final half-hour. Keep real source modifications learner-owned, consistent with the capstone learning contract.

For performance, measure on a target device in profile mode, identify UI versus raster work, then change one cause. Async does not move CPU work off the main isolate; a native isolate can help expensive parsing but has overhead. No invented before/after figures. [Flutter performance](https://docs.flutter.dev/perf/best-practices), [Dart concurrency](https://dart.dev/language/concurrency).

Use unit tests for parsing and sync decisions, widget tests for visible pending/conflict states, and an integration check for restart and replay. Deterministic fakes should reproduce a lost acknowledgement and conflicting revision. Passing a happy-path test does not establish offline correctness. [Flutter testing](https://docs.flutter.dev/testing/overview).

The current `earthquake.dart` contains a misspelled Freezed part basename, a truncated field declaration and an unfinished factory. This is source inspection, not a completed analyzer run. Source was not repaired by the coach. The first build session should correct it and run generation/analyze/tests through the project's pinned SDK.

## 5. Risks, timing and next action

The main risk is overbuilding before a near-term interview. Until the date is known, allocate practice time roughly 40% résumé defense, 30% Flutter/Dart retrieval, 20% one reproducible Tremor failure case and 10% mock/debrief. These are coaching choices, not company statistics.

If fewer than 24 hours remain, rehearse the three strongest real stories, repair the model as a short Dart exercise, and demonstrate only a working slice. With 2–3 days, add durable replay and config rules. With more time, add scanner integration and actual device performance measurements. Avoid speculative future framework features and unsupported package-obituary claims from older prep notes; those are not required to defend this résumé.

The accompanying RESUME_DEFENSE.md contains answer criteria and evidence gaps; RESUME_PIVOT.md is the new capstone priority order. No mastery or completed problems are recorded because no answers have yet been observed. Confidence must come from a cold explanation, a changed scenario and a later retest. The exact employer, round and deadline remain to be confirmed.

## 6. Orchestration and application evidence

Skills applied: bmad-teach-me (one-at-a-time coaching and observed mastery), bmad-technical-research (source verification and synthesis), pdf (two-page extraction and visual inspection).

Ruflo route: hooks_route for LMT Flutter research and Tremor pivot; keyword fallback recommended coder/researcher. No agent was spawned. Learn: résumé claims and actual code baseline. Store: knowledge/tremor-resume-pivot-2026-09-06 and learnings/tremor-pivot-scope-2026-09-06. Recall: memory_retrieve returned found=true for both before authoring the pivot. Applied file: `/Users/devang/Desktop/interview_prep/_bmad-output/dart_flutter_sprint/RESUME_PIVOT.md`.

ARGUS coding gates are not claimed: this turn edits preparation documents/configuration only, not Dart, generated code, dependencies or public interfaces. The subsequent learner code session must inspect ARGUS and run repository-native validation before and after meaningful code changes under the workspace contract.
