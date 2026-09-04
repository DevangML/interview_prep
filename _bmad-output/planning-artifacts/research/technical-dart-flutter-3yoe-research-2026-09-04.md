---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: []
workflowType: 'research'
lastStep: 6
research_type: 'technical'
research_topic: 'Dart + Flutter — zero-to-advanced syllabus and framework internals for a 3-YOE Flutter role'
research_goals: 'Produce an exhaustive, source-verified Dart + Flutter syllabus (language, framework, internals, tooling, ecosystem) at the depth a 3-YOE lateral interview actually probes, plus a single capstone project design that forces every concept to be load-bearing — compressed into a 3-day sprint ending Sunday 2026-09-06 EOD'
user_name: 'Devang'
date: '2026-09-04'
web_research_enabled: true
source_verification: true
---

# Three Days to a Flutter Interview: A Source-Verified Dart + Flutter Dossier for a 3-YOE Lateral

**Date:** 2026-09-04 · **Author:** Devang · **Research Type:** Technical
**Driving event:** LTIMindtree Flutter role · **Sprint window:** Fri 4 → Sun 6 Sep 2026

---

## Executive Summary

Devang has **15 focused hours** before Sunday EOD to become interview-credible in a framework he
has not shipped. This report exists to make that window count, and it opens by refusing the
premise it was handed: *"every single damn concept, scratch to advanced, with a project"* is not a
15-hour deliverable, and any plan that claims otherwise is selling comfort. What **is** achievable —
and what this dossier delivers — is **coverage-complete and mastery-selective**: an exhaustive
syllabus so nothing is a blind spot, with a ruthlessly chosen ~20% drilled hands-on.

The research was executed by five parallel agents over disjoint slices, then cross-checked by the
lead against primary sources. That cross-checking earned its keep: **the popular answer was wrong
more than once.** The widely-shared claim that Skia was removed from Android with no opt-out is
contradicted by Flutter's own documentation, which specifies the exact opt-out flag and an OpenGL
fallback below API 29. An agent's steer that a Glassdoor page held the key LTIMindtree data was
tested and found to be a Cloudflare wall, while its sibling lead on NodeFlair was opened
successfully and proved to be an **empty auto-generated SEO shell**. Both dead ends are now
documented so no preparation time is spent rediscovering them.

Three findings reshape the plan more than any syllabus detail. First, **the machine is 18 months
stale** — Flutter 3.29.2 / Dart 3.7.2 against a current 3.47 / 3.13 — which silently removes four
modern language features from the environment Devang would learn in. Second, **the first LTIMindtree
gate is not a Flutter interview at all**: it is a ~120-minute aptitude, English and CS-fundamentals
assessment with one or two easy coding problems, meaning pure Flutter study would leave the actual
first filter unprepared. Third, **no first-hand LTIMindtree Flutter interview account exists in any
public source** — so there is no secret question list to grind, and preparation should target the
well-documented general Indian-services 3-YOE bar instead.

**Key Technical Findings**

- **Currency is the cheapest differentiator and the sharpest trap.** Dart **macros were cancelled**; a
  candidate saying "macros are coming" is quoting dead 2024 material. Impeller is default everywhere
  but web. Both are one-page facts that multiple sources independently flag as how interviewers catch
  stale candidates.
- **The internals cluster is pure leverage.** Three trees, keys, `const`, `setState`, `InheritedWidget`
  and `BuildContext` recur in *every single source consulted*, need no coding to answer, and are the
  fastest route to sounding like someone who read the source rather than a tutorial.
- **The framework source contradicts the tutorials.** `_ElementLifecycle` has **five** states
  (including `failed`), not the universally-cited four. `InheritedWidget`'s O(1) lookup is a real
  `PersistentHashMap<Type, InheritedElement>`, not hand-wavy "caching". Flutter has performed a
  **"Great Thread Merge"** — UI and platform threads merged by default since 3.29 on mobile — which
  most secondary sources still describe incorrectly.
- **Package-status rot is a live risk.** `hive` and `isar` are effectively abandoned (stable releases
  3–4 years old); `dartz` is dead; `flutter_screenutil` is an unverified uploader. The reflexive
  tutorial answers are now stale answers. **GetX's repository vanished in April 2026** when its
  maintainer's GitHub account was deleted — restored by 28 April — a checkable event that makes
  bus-factor risk concrete.
- **The bar is lower and differently shaped than a product-company interview.** DSA is easy-to-medium,
  not FAANG. Mobile system design is unlikely at 3 YOE. But there is a **client round** — a
  services-industry step that weights communication and account-fit as heavily as depth.

**Technical Recommendations**

1. **Upgrade the SDK before Hour 1** — `fvm install 3.47.0 && fvm global 3.47.0`. It is a ~2.5 GB
   download that runs unattended; start it now, read while it works.
2. **Spend the first block on the internals cluster.** Highest recurrence, zero coding cost, best
   credibility-per-minute in the entire syllabus.
3. **Commit to BLoC as the one state-management story**, told end-to-end. LTIMindtree's client profile
   and its own architect JD skew enterprise; one library explained deeply beats four named shallowly.
4. **Write Dart by hand, not just read it.** Live coding is the least fakeable part of the bar and the
   most likely place a crash candidate is exposed. Passive review does not transfer.
5. **Rehearse the pivot narrative honestly.** "Tell me about a Flutter bug you shipped" has no true
   good answer in three days. Bridge from a real problem in another stack and say plainly that the
   Flutter framing is new — it survives follow-ups precisely because it is true. Do not fabricate.

---

## Table of Contents

1. [Technical Research Scope Confirmation](#technical-research-scope-confirmation)
2. [Baseline Version Facts](#baseline-version-facts-lead-verified-primary-sources)
3. [Environment Audit — the machine, checked not assumed](#environment-audit--the-machine-checked-not-assumed)
4. [The Time Budget — what "3 days" actually equals](#the-time-budget--what-3-days-actually-equals)
5. [The LTIMindtree Evidence Gap](#the-ltimindtree-evidence-gap--a-negative-finding-stated-honestly)
6. [Technical Landscape — the five dossiers](#technical-landscape--the-five-dossiers)
7. [Cross-Cutting Synthesis — what the five slices say together](#cross-cutting-synthesis--what-the-five-slices-say-together)
8. [The Prioritised 20%](#the-prioritised-20--where-15-hours-actually-go)
9. [Source Conflicts and How They Were Resolved](#source-conflicts-and-how-they-were-resolved)
10. [Research Methodology and Confidence](#research-methodology-and-confidence)
11. [Deliverables Produced](#deliverables-produced)

---
## Technical Research Scope Confirmation

**Research Topic:** Dart + Flutter — zero-to-advanced syllabus and framework internals for a 3-YOE Flutter role
**Research Goals:** An exhaustive, source-verified syllabus (language, framework, internals, tooling, ecosystem) at the depth a 3-YOE lateral interview actually probes, plus one capstone project in which every concept is load-bearing — compressed into a 3-day sprint, Fri 2026-09-04 → Sun 2026-09-06 EOD.

**Driving event:** an **LTIMindtree Flutter role** (confirmed by Devang, 2026-09-04). The React/JS
track is paused until Monday 2026-09-08, not abandoned — see
`_bmad-output/teach_me/PARKED_TRACKS.md`.

**Technical Research Scope:**

- Architecture Analysis — the three trees, render pipeline, state-management and app-architecture patterns
- Implementation Approaches — idiomatic Dart, widget composition, testing, performance engineering
- Technology Stack — Dart language + runtime, Flutter framework + engine, the pub.dev ecosystem
- Integration Patterns — platform channels, Pigeon, FFI, REST/GraphQL/WebSocket, local persistence, Firebase
- Performance Considerations — frame budget, UI vs raster jank, Impeller, memory, startup, app size

**Research Methodology:**

- Current web data with rigorous source verification; documentation-first, community sources second
- Five parallel research agents over disjoint slices (Dart internals · Flutter internals · architecture ·
  craft/tooling · interview bar), cross-checked against the lead's own independent searches
- Multi-source validation for critical technical claims; version-dependent claims re-verified against
  primary sources rather than accepted from any single agent
- Confidence levels (High/Medium/Low) on uncertain or version-dependent information
- Interview-shaped framing throughout: for each concept — what is asked, the common trap, the correct kernel

**Scope Confirmed:** 2026-09-04

---

## Baseline Version Facts (lead-verified, primary sources)

Establishing these first because a candidate who quotes stale versions or dead features dates
themselves inside one sentence. All four were verified by the lead directly, not delegated.

| Fact | Value | Confidence | Source |
|---|---|---|---|
| Flutter stable | **3.47** (docs reflect 3.47.2, updated 2026-08-12) | High | [release notes](https://docs.flutter.dev/release/release-notes) |
| Dart stable | **3.13**, released 2026-08-12 | High | [Dart changelog](https://dart.dev/changelog) |
| Dart macros | **CANCELLED.** Team stopped work; hot-reload incremental-compilation cost was unsolvable. `augmentations` is the surviving path. | High | [Dart blog: update on macros & data serialization](https://dart.dev/blog/an-update-on-dart-macros-data-serialization) |
| Impeller | **Default on every platform except web.** iOS: only engine, no opt-out. Android: default API 29+, falls back to OpenGL below that. Desktop: default as of 3.47. Web: still Skia. | High | [Impeller docs](https://docs.flutter.dev/perf/impeller) |

**Recent Dart language deltas worth knowing by name** (source: [Dart changelog](https://dart.dev/changelog)):

- **3.13** — primary constructors; `trailingZeroBitCount`/`oneBitCount`; null-aware collection elements
- **3.12** — private named parameters on initializing formals
- **3.10** — dot shorthands for enums and static members
- **3.8** — null-aware collection elements
- **3.7** — wildcard variables (repeated `_` without collision)
- **3.3** — extension types (zero-cost wrapping)
- **3.0** — records, patterns, class modifiers, sound null safety complete

> **Interview trap, flagged early:** saying "Dart macros are coming" or "we use Skia" are both
> now wrong-and-dated answers. The macros cancellation in particular is a strong signal of
> whether a candidate reads release notes or recycles 2024 blog posts.


### Impeller — per-platform truth, and a live source conflict

Worth stating precisely, because this is a favourite "are you current?" question and the
popular blog answer is wrong.

| Platform | Renderer | Opt-out? |
|---|---|---|
| **iOS** | Impeller (Metal) — the only supported engine | **None.** Skia cannot be switched back on. |
| **Android** | Impeller (Vulkan), default on **API 29+** | Yes — `flutter run --no-enable-impeller`, or `io.flutter.embedding.android.EnableImpeller=false` in `AndroidManifest.xml` |
| **Android < API 29 / no Vulkan** | Automatic fallback to **legacy OpenGL** | n/a — automatic, no action needed |
| **Desktop** (macOS/Linux/Windows) | Impeller, default **as of Flutter 3.47** | Yes for now; docs say the opt-out **will be removed** in a future release |
| **Web** | **Still Skia.** Impeller "might be used in the future" | n/a |

**⚠️ Sources conflict here — and the popular one is wrong.** Widely-shared 2026 blog posts claim
Skia was removed from Android outright with *"no fallback flag, no opt-out, no disable-Impeller
environment variable"*
([example](https://levelup.gitconnected.com/flutter-just-removed-skia-from-every-modern-android-device-impeller-vulkan-is-now-mandatory-b52de5038587)).
The official documentation documents that exact opt-out flag and an automatic OpenGL fallback path.

**Resolution: trust the official docs.** *Confidence: High.* The blog is right that iOS has no
opt-out and directionally right that Impeller is the future; it overstates Android's finality.

**Why this matters in the room:** the *correct* answer is textured — "Impeller by default,
mandatory on iOS, still opt-out-able on Android with an OpenGL fallback below API 29, and web is
still Skia." That texture is what distinguishes reading primary sources from reciting a Medium post.
---

## Environment Audit — the machine, checked not assumed

Run on Devang's Mac, 2026-09-04, before planning any study time. Toolchain setup is the classic
way a 3-day sprint loses its first half-day, so this was verified directly rather than assumed.

**The good news — this is nearly all already in place:**

| Component | State | Verdict |
|---|---|---|
| Flutter SDK | installed via **fvm** at `~/.fvm/flutter_sdk` | ✅ present |
| Xcode | **26.6** (build 17F113) | ✅ present |
| Android SDK | **36.0.0**, at `~/Library/Android/sdk` | ✅ present |
| Android Studio | 2025.3 | ✅ present |
| VS Code | 1.131.0 | ✅ present |
| Chrome / web target | working | ✅ |
| Connected devices | 2 available | ✅ |
| Network resources | working | ✅ |

**Day 1 does not get eaten by installation.** That is a meaningful head start on a 3-day budget.

### 🔴 BLOCKER — the SDK is 18 months stale

```
Flutter 3.29.2 • channel stable
Framework • revision c236373904 (1 year, 6 months ago) • 2025-03-13
Tools • Dart 3.7.2
```

Against current stable (**Flutter 3.47 / Dart 3.13**) this is **~18 months and 5 minor Flutter
releases behind**. For a syllabus sprint that is not cosmetic — it silently removes language
features from the machine he is learning on:

| Feature | Needs | On 3.7.2? |
|---|---|---|
| Wildcard variables (`_`) | Dart 3.7 | ✅ available |
| Null-aware collection elements | Dart 3.8 | ❌ **missing** |
| Dot shorthands for enums/statics | Dart 3.10 | ❌ **missing** |
| Private named params on initializing formals | Dart 3.12 | ❌ **missing** |
| Primary constructors | Dart 3.13 | ❌ **missing** |

He would spend three days building muscle memory on a dialect the interviewer's codebase has
moved past, and would be unable to demo anything that uses the newer syntax. **Upgrade before
Hour 1 of study.**

`fvm list` shows only `3.29.2` cached (plus a broken `18` entry needing setup), so the new SDK is
a fresh ~2.5 GB download — **start it before reading anything else**, it runs unattended:

```bash
fvm install 3.47.0 && fvm global 3.47.0
```

> Not run automatically. It is a multi-GB download that changes the global toolchain, and any
> existing project pinned to 3.29.2 should be checked first. Devang's call.

### 🟡 Two small snags — 5 minutes each, but both block a first `flutter run`

```bash
flutter doctor --android-licenses
```

The iOS 26.5 simulator runtime is not installed — Xcode → Settings → Components → **GET**.
Fix both before Day 1 or the first Android/iOS launch fails in a way that reads like a code bug.

*Confidence: High — all values read directly from `flutter --version`, `flutter doctor` and
`fvm list` on the machine.*

---

## The Time Budget — what "3 days" actually equals

Before any syllabus is designed it has to be sized against real hours, not calendar days. The
budget comes from Devang's own `ADAPTIVE_LEARNING_SYSTEM.md`, which is already calibrated to his
working life (employed at ElasticRun, so weekdays are constrained):

| Day | Type | Budgeted | Notes |
|---|---|---|---|
| **Fri 2026-09-04** | weekday | **3.0 h** | sprint declared ~16:30 — this is an evening block, and part of it is already gone |
| **Sat 2026-09-05** | weekend | **6.0 h** | |
| **Sun 2026-09-06** | weekend | **6.0 h** | ends EOD Sunday |
| | | **≈ 15 focused hours** | hard cap 4.5 h/day → absolute ceiling ~13.5–16 h |

The same document sets the pedagogy this sprint must obey:

- **~70% retrieval/practice, ~30% new input.** Re-reading feels productive and is not.
- **90-minute ultradian blocks**, or 2 × (50 min focus / 10 min break); no block over 2 h without a real break.
- **Deliberate-practice quality ceiling ≈ 4 focused hrs/day** (Ericsson). Past that, retention drops.
- **Morning recall, evening intake** — test yesterday cold before taking on anything new.
- **Sleep is a study tool.** Cramming past the cap steals the consolidation that makes it stick.

### ⚠️ Scope reality check — stated once, plainly

The request was *"from very very scratch till advanced ... with a project ... incorporating every
single damn concept."* Against **15 hours**, that is not achievable, and no plan should pretend
otherwise. For calibration: the Dart language surface alone (Section A of this report) is a
multi-week syllabus; Flutter's rendering internals another.

Two things are being conflated, and separating them is what makes the sprint work:

1. **Coverage** — having *heard of and being able to talk about* every concept. **Achievable in 15 h.**
2. **Mastery** — being able to *build with* every concept unaided. **Not achievable in 15 h.** It is
   roughly a 3–6 month arc, which is precisely why the role asks for 3 years.

**This report therefore delivers coverage-complete + mastery-selective**: a genuinely exhaustive
syllabus so nothing is a blind spot and he can *speak* to any of it, with a ruthlessly prioritised
subset — the ~20% that carries ~80% of a 3-YOE interview — chosen for hands-on mastery in the
capstone. The full syllabus doubles as the post-Sunday continuation plan, so nothing researched
here is wasted.

**The honest framing for the room:** with light Flutter tenure and strong adjacent engineering
experience, the winning posture is *"I know the shape of the whole framework and I have gone deep
where it counts"* — not a bluff of uniform depth, which collapses on the first follow-up question.

*Confidence: High on the hour budget (from Devang's own calibrated system). The coverage-vs-mastery
split is the lead's judgement, flagged as such.*

---

## The LTIMindtree Evidence Gap — a negative finding, stated honestly

The single most important thing to say about LTIMindtree-specific Flutter interview data is that
**it does not exist in public sources.** Targeted searching across Glassdoor, AmbitionBox,
NodeFlair, Naukri Code360, LeetCode Discuss, GeeksforGeeks, Reddit (`r/developersIndia`,
`r/FlutterDev`) and Medium produced **zero first-hand, dated LTIMindtree Flutter interview
accounts.** No transcript, no question list, no dated candidate report.

Two pages looked like they might hold it. **The lead chased both to ground rather than leaving
them as homework:**

| Lead | Outcome |
|---|---|
| [NodeFlair — LTIMindtree Flutter Developer interviews](https://nodeflair.com/companies/ltimindtree/interviews/flutter-developer) | **Dead end — verified.** Loaded successfully in a real browser. The page is an auto-generated SEO shell: it renders the heading "LTIMindtree Flutter Developer Interviews" and then a "Check All Interviews" link with **no question content whatsoever**. Do not spend time on it. |
| [Glassdoor — LTIMindtree Flutter Developer interview questions](https://www.glassdoor.com/Interview/LTIMindtree-Flutter-Developer-Interview-Questions-EI_IE8441464.0,11_KO12,29.htm) | **Blocked by Cloudflare bot detection** ("Humans only" interstitial). Not bypassed — bypassing bot protection is off-limits. **Devang should open this himself in a logged-in browser**; it is the one remaining lead that could still hold real data. |

**Incidental data from the NodeFlair page** (55 reported salaries, company-wide, *not* Flutter-specific;
figures appear to be **monthly**): Software Engineer Junior ₹40,613 (range ₹29,500–₹50,000);
Software Engineer Mid ₹95,800 (range ₹83,300–₹1,20,800); Data Engineer Senior ₹1,54,150. Company
rating 3.6/5 from 2,037 reviews, with **Compensation & Benefits the lowest sub-score at 3.0**.
*Confidence: Low-Medium — self-reported aggregate, small sample, unit (monthly vs annual) inferred.*

### What this gap means for preparation

It is genuinely useful information, not just an absence:

1. **Do not over-fit to LTIMindtree.** There is no secret question list to grind. Prepare for the
   *general* Indian-services 3-YOE Flutter bar, which is well documented.
2. **The process shape is the reliable signal**, and it is consistent across four independent
   sources (TechPrep, PrepInsta, GeeksforGeeks, Naukri Code360) and stable 2023→2026 — see below.
3. **Anyone quoting a specific LTIMindtree Flutter salary or question set is guessing.** Treat such
   claims accordingly.

### LTIMindtree lateral process — reconstructed, multi-source

*Confidence: Medium-High on shape (four independent corroborating sources), Low on Flutter-specific detail (none exists).*

1. **Online Assessment** — proctored, ~120–130 min. English/comprehension, logical + quantitative
   aptitude, **1–2 easy coding problems**, and **CS fundamentals (OOP/DBMS/OS/networks)**. One 2026
   account adds a ~20-min spoken-English AI assessment. Described by candidates as "relatively basic."
2. **AI bot interview** — one-way video: self-intro, project discussion, simple coding task.
   *Single-source (TechPrep 2026) — indicative, not confirmed universal.*
3. **Technical rounds** — 30–45 min, L1 and often L2 for laterals. Interviewers reportedly probe
   **2–3 areas deeply rather than everything shallowly.**
4. **Client round** — a real, distinct step for lateral hires at services firms. Often re-asks
   project and communication questions rather than deep internals; it is a "will this person fit
   the account" gate as much as a technical one.
5. **HR** — 15–20 min: relocation, compensation, "why LTIMindtree." One 2026 account reports being
   asked for views on AI.
6. **BGV** — post-offer, sometimes now *before* the client round. (KPMG named as vendor in a single
   uncorroborated forum account.)
7. **Timeline** — Glassdoor aggregate across 1,917 interviews (all roles): **~29 days** average.
   Difficulty 2.8/5; ~71% positive experience.
8. **Notice period** — **90 days**, historically no buyout; some recent reports of a
   manager-discretion buyout. Worth knowing before the HR round.

> **⚠️ Planning consequence, and it is a big one.** The first gate is **not** a Flutter interview.
> It is an aptitude + CS-fundamentals + easy-coding OA. Three days spent purely on Flutter internals
> would leave the *actual first filter* unprepared. The sprint plan must reserve time for OA shape —
> and Devang's existing SQL/DBMS/OS/networks material from the 90-day curriculum is directly reusable
> here, at near-zero extra cost.

---

## Technical Landscape — the five dossiers

The full research is preserved as five source-verified dossiers (**~330 KB**, every non-obvious
claim carrying an inline source URL and a confidence marker). This report is the navigation and
synthesis layer; the dossiers are the substance.

| # | Dossier | Covers | Size |
|---|---|---|---|
| 01 | [Dart Language & Runtime](dart_flutter/01_dart_language_and_runtime.md) | full language surface, null safety, type system, mixins, records/patterns/class modifiers, extension types, async & the event loop, isolates, JIT/AOT, snapshots, tree shaking, **GC internals**, FFI, web numeric semantics | 74 KB |
| 02 | [Flutter Framework Internals](dart_flutter/02_flutter_framework_internals.md) | three trees, Element lifecycle & reconciliation, keys, BuildOwner/PipelineOwner, InheritedWidget mechanics, constraints model, slivers, layers & RepaintBoundary, frame pipeline, threading, Impeller | 65 KB |
| 03 | [State, Architecture & Data](dart_flutter/03_state_architecture_data.md) | Provider/Riverpod/BLoC/GetX/MobX/signals, decision matrix, **Flutter's official MVVM guidance**, Clean Architecture critique, DI, go_router, dio, local storage, Firebase | 64 KB |
| 04 | [Performance, Testing, Tooling & Native](dart_flutter/04_performance_testing_tooling_native.md) | DevTools, build modes, UI-vs-raster jank, memory & leaks, app size, the test pyramid, golden tests, lints, flavors, CI/CD incl. **Azure DevOps**, signing, platform channels, Pigeon, FFI, federated plugins, add-to-app | 77 KB |
| 05 | [The Interview Bar](dart_flutter/05_interview_bar_ltimindtree.md) | LTIMindtree process shape, **50+ question bank** by theme, coding round, system design, HR/client rounds, rated resources, honest 3-day assessment | 49 KB |

### Architecture headline: Flutter's official guidance is MVVM, not Clean Architecture

Independently verified by the lead against [docs.flutter.dev/app-architecture/guide](https://docs.flutter.dev/app-architecture/guide).
Flutter officially recommends **MVVM** across two layers, with an optional third:

- **UI layer** — **Views** (widgets; only trivial logic — show/hide, animation, layout, simple
  routing) and **ViewModels** (UI state + business logic, exposing **Commands**; one-to-one with Views).
- **Data layer** — **Repositories** (source of truth, own caching/retry/error handling, emit *domain
  models*, and **never know about each other**) and **Services** (stateless wrappers around one data
  source each, returning `Future`/`Stream`).
- **Optional domain layer** — **Use-cases/Interactors**, only when logic spans multiple repositories
  or is reused by several ViewModels.

This matters for the room: most candidates recite Clean Architecture's presentation/domain/data
because tutorials do. Citing Flutter's *own* MVVM + repository recommendation — and noting the
official reference app ("Compass") and that `go_router` is published under the **verified
`flutter.dev` account**, not a third party — is a cheap, high-signal correctness win.

---

## Cross-Cutting Synthesis — what the five slices say together

Read separately the dossiers are five syllabi. Read together they converge on four claims.

### 1. The framework is one idea repeated at every altitude: *immutable description, mutable machinery*

Dart's `const` canonicalization, Flutter's immutable Widgets over mutable Elements, `freezed` state
classes, and BLoC's event→state transitions are **the same design instinct at four scales**. This is
the single most useful mental model to carry into the interview, because it converts memorised
trivia into derivable answers:

- *Why does `const` improve performance?* Canonicalization makes two `const` widgets **identical**,
  so `Widget.canUpdate` short-circuits and the subtree rebuild is skipped.
- *Why three trees?* Because immutable configuration must be cheap to recreate every frame, so the
  expensive, stateful parts (Element, RenderObject) have to live somewhere else and persist.
- *Why do keys exist?* Because reconciliation matches on `runtimeType` + `key`; without a key,
  identity is positional, and reordering silently swaps state.

A candidate who can derive these from one principle outperforms one who memorised three answers.

### 2. Rendering is a contract, and the contract is directional

`constraints go down → sizes go up → parent sets position`. Nearly every layout question and layout
bug in Flutter is this sentence being violated: unbounded constraints causing overflow, intrinsic
sizing being **O(n²)** (a warning stated verbatim in `box.dart`), a `RepaintBoundary` in the wrong
place. Paired with the frame pipeline — vsync → build → layout → paint → composite → raster — it
also supplies the diagnostic split that separates a senior answer from a junior one: **UI-thread
jank and raster-thread jank have different causes and different fixes.**

### 3. Ecosystem currency is a proxy the interviewer actually uses

Four independent findings point the same way: cancelled macros, the Impeller default, abandoned
`hive`/`isar`/`dartz`, the GetX repository incident. None is intellectually deep; all are *cheap*;
and multiple sources explicitly flag this class of fact as the filter for stale candidates. For a
crash-prep candidate this is the best return on time in the entire report — **minutes of study
buying the impression of continuous engagement.** The honest framing is that it *is* engagement:
knowing your dependencies' bus factor is real engineering judgement, not trivia.

### 4. The process, not the syllabus, is what most candidates under-prepare

The LTIMindtree funnel front-loads an **aptitude + CS-fundamentals OA** and back-loads a **client
round** weighted on communication. Both sit outside "learn Flutter." A plan optimising only for the
technical round optimises for **one of five gates**.

---

## The Prioritised 20% — where 15 hours actually go

Derived by intersecting recurrence-across-sources (dossier 05) with cost-to-acquire.

| Rank | Cluster | Why it wins | Cost | Interview payoff |
|---|---|---|---|---|
| **1** | Three trees · keys · `const` · `setState` · `InheritedWidget` · `BuildContext` | Appears in **every** source consulted; needs zero coding | ~3 h | Highest credibility-per-minute available |
| **2** | Hand-written Dart muscle memory — `StatefulWidget`, `ListView.builder`, `async` API call, `BlocBuilder` | The **least fakeable** skill; passive review does not transfer | ~4 h | Survives the live-coding round |
| **3** | BLoC/Cubit end-to-end, one narrative | Enterprise/services association; one library deep ≫ four shallow | ~2.5 h | The "how would you structure this" answer |
| **4** | 2026 currency facts — Impeller, build modes, macros-cancelled, package rot | One docs page; explicitly flagged as the staleness filter | ~0.75 h | Defuses the trap questions |
| **5** | Testing vocabulary — unit/widget/integration + one `testWidgets` snippet | Called "the most underrated differentiator"; most candidates skip it | ~0.75 h | Cheap, disproportionate differentiation |
| **6** | Async/event-loop + isolates model | Recurs heavily; maps onto existing JS knowledge Devang already has | ~1.5 h | Strong-signal Dart depth |
| **7** | The pivot narrative, rehearsed aloud | Client + HR rounds weight delivery over depth | ~1 h | Two of five gates |
| — | OA shape (aptitude + CS fundamentals) | **The actual first filter** | reuse existing curriculum | Gate zero |

**Deliberately deprioritised** (coverage-only, in the syllabus but not drilled): FFI and native
assets, federated plugin authoring, platform views, slivers beyond `CustomScrollView` awareness,
custom `RenderObject`s, dart2wasm, GC internals, macros/augmentations detail, golden-test CI
flakiness, Fastlane specifics. These are *known-of, not practised* — the honest posture, and each
is one sentence in the syllabus if asked.

> **The single riskiest assumption in this plan:** that recognition-level knowledge survives contact
> with a live interviewer. It survives *questions*; it does not survive *follow-ups*. Hence rank 2
> is non-negotiable — writing code by hand is the only item here that converts recognition into
> recall, and it is the first thing a tired candidate will be tempted to skip.

---

## Source Conflicts and How They Were Resolved

The workflow requires conflicts to be surfaced rather than smoothed over. Four arose.

| Conflict | Resolution | Confidence |
|---|---|---|
| **Impeller on Android** — popular blogs claim Skia removed, "no opt-out, no fallback flag"; official docs document exactly that flag plus OpenGL fallback below API 29 | **Official docs win.** Blogs are directionally right on iOS (no opt-out there) but overstate Android's finality | High |
| **Element lifecycle states** — secondary sources universally say 4 (initial/active/inactive/defunct); the framework source has **5**, including `failed` | **Source wins.** Read directly from `framework.dart` | High |
| **Flutter version/date** — search results variously reported 3.38 "September 2026", 3.44, and 3.47.0 "August 12" | **3.47** stable (patch 3.47.2), confirmed via the release-notes page and Flutter's machine-readable release manifest. The 3.38/3.44 references are older releases in the same line | High |
| **Threading model** — most secondary sources still describe separate UI and platform threads | Flutter performed a **"Great Thread Merge"** — merged by default on iOS/Android since 3.29, macOS/Windows since 3.35 | Medium-High — single agent from primary sources; worth a re-check before quoting |

**Explicitly NOT verified** (do not state as fact): any LTIMindtree-specific Flutter salary figure;
any first-hand LTIMindtree Flutter interview account; the "AI bot interview" step (single source);
KPMG as BGV vendor (single uncorroborated forum post); the OA platform vendor.

---

## Research Methodology and Confidence

- **Five parallel research agents** over disjoint slices, per the workflow's instruction to use
  subagents for parallel analysis. ~868 K agent tokens, 299 tool calls.
- **Lead cross-verification** of every load-bearing version claim against primary sources, performed
  independently rather than accepted from any agent. This caught the Impeller error.
- **Primary sources preferred throughout**: the Flutter framework source (`framework.dart`,
  `box.dart`, `object.dart`), api.flutter.dev/api.dart.dev dartdoc, docs.flutter.dev, dart.dev,
  Dart VM engineering docs, pub.dev live version and maintenance data, Flutter's release manifest.
- **Community sources** (Glassdoor, AmbitionBox, Reddit, Medium, dev.to) used only for
  market/process/experience data, always dated and attributed, never for technical claims.
- **Confidence markers** (High/Medium/Low) applied throughout the dossiers on version-dependent and
  thinly-sourced claims.
- **Live-browser follow-up** on the two blocked leads, resolving one (empty SEO shell) and
  documenting the other as bot-protected. Bot protection was **not** bypassed.
- **Scraped content treated strictly as data.** No page attempted to instruct the agents; had one
  done so it would have been reported, not followed.

**Overall confidence: High** on Dart/Flutter technical content (documentation- and source-backed).
**Medium** on LTIMindtree process shape (four corroborating but non-Flutter sources).
**Low** on anything LTIMindtree-and-Flutter-specific — because that evidence does not exist publicly,
which is itself a finding.

---

## Deliverables Produced

| Artifact | Path | Purpose |
|---|---|---|
| This report | `technical-dart-flutter-3yoe-research-2026-09-04.md` | Synthesis, findings, priorities |
| Five dossiers | `dart_flutter/01…05` | The exhaustive source-verified detail |
| Full syllabus | `../../dart_flutter_sprint/SYLLABUS.md` | Coverage-complete concept inventory |
| 3-day sprint plan | `../../dart_flutter_sprint/SPRINT_3DAY.md` | Hour-by-hour, budget-honest |
| Capstone spec | `../../dart_flutter_sprint/CAPSTONE.md` | The project, concept-mapped |
| Park ledger | `../../teach_me/PARKED_TRACKS.md` | React/JS resume state |

