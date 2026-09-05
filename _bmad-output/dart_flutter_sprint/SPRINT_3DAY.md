# 3-DAY SPRINT — Dart + Flutter

**Fri 2026-09-04 → Sun 2026-09-06 EOD** · **15 focused hours** · Target: LTIMindtree Flutter, ~3 YOE
**Companions:** [SYLLABUS.md](SYLLABUS.md) · [CAPSTONE.md](CAPSTONE.md) · [research report](../planning-artifacts/research/technical-dart-flutter-3yoe-research-2026-09-04.md)

---

## ⚡ DO THIS BEFORE READING ANY FURTHER

Three commands. The first is a ~2.5 GB download that runs unattended while you study — **every
minute it isn't running is a minute wasted.**

```bash
fvm install 3.47.0 && fvm global 3.47.0
```

```bash
flutter doctor --android-licenses
```

Then Xcode → Settings → Components → **GET** the iOS 26.5 simulator runtime.

**Why this is not optional:** your machine has Flutter 3.29.2 / Dart 3.7.2 — **18 months stale**.
Four modern language features (primary constructors, dot shorthands, null-aware collection
elements, private named params) do not exist in that SDK. Three days of muscle memory in a dead
dialect is three days spent badly.

---

## The rules this plan obeys

From your own `ADAPTIVE_LEARNING_SYSTEM.md` — not invented for this sprint:

- **~70% retrieval / 30% intake.** Re-reading feels productive and is not.
- **90-minute blocks**, or 2 × (50/10). No block over 2 h without a real break — walk or food, not phone.
- **Morning recall, evening intake.** Test yesterday cold, *then* take on new material.
- **Hard cap 4.5 h/day.** Beyond that you are stealing the sleep that consolidates it.
- **Speak the P2 rows out loud.** Silent reading does not produce spoken fluency, and four of the
  five LTIMindtree gates are spoken.

**The one non-negotiable:** you write every line of code. No generated function bodies. Rank 2 of
the prioritised 20% is hand-written muscle memory, and reading code does not build it.

---

## FRIDAY — 3 h · setup + the highest-leverage cluster

> Evening block. The SDK is downloading in another terminal the whole time.

### F0 · 10 min — kick off the toolchain
Run the three commands above. Do not wait for them.

### F1 · 90 min — the internals cluster ★ *(intake, spoken)*
**The single best credibility-per-minute in the entire syllabus.** Every source consulted asks
from here, and none of it requires code.

Cover, and **say each answer out loud** before moving on:

| Rows | Question you must be able to answer cold |
|---|---|
| FW-01/02/03 | What are the three trees and why does Flutter need three? |
| FW-06/08 | What is the reconciliation rule? (`runtimeType` + `key`) When is a key *required*? |
| FW-31, D-32 | Why does `const` make things faster? — the full chain: canonicalization → identity → `canUpdate` short-circuit → subtree skipped |
| FW-12 | What does `setState` actually do? (`markNeedsBuild` + schedule) |
| FW-14 | What *is* `BuildContext`? (it IS the Element) |
| FW-15/16/18 | How does `InheritedWidget` lookup stay O(1)? Why "provider not found"? |
| FW-10/11 | Full `State` lifecycle; `didUpdateWidget` vs `didChangeDependencies` |
| FW-20/21 | "Constraints go down, sizes go up, parent sets position" — and what unbounded constraints break |
| R-02 | Hot reload vs hot restart — and what hot reload **never** does (`main()`, static init, `initState`) |

**Source of truth:** [dossier 02](../planning-artifacts/research/dart_flutter/02_flutter_framework_internals.md) — it quotes the framework source directly.

☕ **Break — 10 min, away from the screen.**

### F2 · 80 min — first Dart by hand *(practice)*
```bash
fvm flutter create --org dev.devang tremor && cd tremor
fvm flutter run
```
Then, **typing every character yourself**:
1. `Quake` domain model — nullable `mag` and `alert`, no `!` anywhere *(D-05, D-07)*
2. `QuakeDto` + a hand-written `fromJson` *(do it manually first — you need to feel what `freezed` removes)*
3. The DTO→domain mapper *(AR-07)*
4. `sealed class QuakeListState` with four subtypes; switch over it exhaustively *(AR-10, D-23, D-25)*

**Done when:** `fvm flutter analyze` is clean and the app runs.

### F3 · 5 min — log
Six fields into `DAILY_LOG.md`: hours / covered / recall% / confidence / blockers / energy.

---

## SATURDAY — 6 h · build day

### S1 · 30 min — cold recall *(retrieval, no notes)*
Close every document. Say all nine Friday answers aloud. Anything you fumble → mark it and
re-drill it tonight, **not now**.

### S2 · 90 min — Capstone Stage 1A: the data layer
`UsgsService` over `dio` → `QuakeRepository` → sealed state stream.
Wire `freezed` + `json_serializable`, run `build_runner`, and notice what it generated versus your
hand-written `fromJson` from last night. *(DA-01, DA-02, AR-03, AR-09, D-38)*

☕ **Break — 15 min.**

### S3 · 90 min — Capstone Stage 1B: SHIP IT
`QuakeListCubit` → `BlocBuilder` → `ListView.builder` with `ValueKey` and `const` tiles → tap →
`go_router` detail. *(SM-09/10/11, FW-40, FW-08, FW-31, NV-03)*

**🎯 Stage 1 must ship before you eat.** Live quakes on screen, airplane-mode toggle survived,
`analyze` clean. A shipped Stage 1 beats a broken Stage 3 in every interview.

🍽 **Break — 30 min, real food.**

### S4 · 90 min — Capstone Stage 2: reactive
Magnitude filter, debounced search via `StreamController`, pull-to-refresh with an in-flight guard,
filter persisted to `shared_preferences`. *(A-07, A-08, A-11, A-03, DA-04)*

### S5 · 60 min — async theory, spoken *(intake + retrieval)*
While the debounce is fresh, this stops being abstract:
- **Microtask queue vs event queue** — and that `Future(fn)` goes to the **event** queue while
  `.then`/`await` continuations go to the **microtask** queue *(A-01)* ⚠ most-missed Dart question
- Microtask starvation *(A-02)*
- `Future.wait` fail-fast *(A-04)*
- Single-subscription vs broadcast streams; **not cancelling = leak** *(A-07, A-08, PF-06)*
- **Isolates: async ≠ parallel** *(A-13, A-15)*
- Map it onto the JS event loop you already know *(A-17)* — this is your unfair advantage, use it

### S6 · 10 min — log

---

## SUNDAY — 6 h · harden, prove, rehearse

### U1 · 30 min — cold recall
Friday's nine + Saturday's async set. Aloud, no notes.

### U2 · 90 min — Capstone Stage 3: the bug story ★
1. Point the app at `all_month` (a big payload). Parse it on the main isolate. **Watch it jank.**
2. Open DevTools, profile mode, find it on the timeline. *(PF-01, PF-02, PF-03)*
3. Move the parse into `Isolate.run`/`compute`. Watch it stop. *(A-15)*
4. Offline cache + stale badge *(DA-07)*; `MethodChannel` for battery/device info *(NT-01)*.

> **This block manufactures a true answer to "tell me about a Flutter bug you fixed."** It is the
> question with no honest answer available otherwise. Do not skip it. Write down what you saw on
> the timeline — the specifics are what make the story survive follow-ups.

☕ **Break — 15 min.**

### U3 · 60 min — Capstone Stage 4: tests
Mapper unit test (incl. null `mag`) · `bloc_test` loading→ready and loading→failed · one
`testWidgets` with a `mocktail` fake repo. *(TS-01, TS-08, TS-03, TS-02)*

Learn the two trap answers cold: **`pump` vs `pumpAndSettle`** (the latter hangs forever on an
infinite animation) and **mocktail needs no codegen**. *(TS-04, TS-02)*

🍽 **Break — 30 min.**

### U4 · 60 min — currency + judgement, spoken
The cheapest points on the board:
- **Impeller per-platform truth** — read [the official page](https://docs.flutter.dev/perf/impeller) directly, not a summary. iOS: no opt-out. Android: default API 29+, OpenGL fallback below. **Web: still Skia.** *(FW-36)*
- **Dart macros are cancelled** — `augmentations` is the surviving path; `build_runner` is permanent *(D-38)*
- **Package rot** — `hive`/`isar` abandoned, `dartz` dead, GetX's April 2026 repo disappearance *(DA-06, SM-15, AR-11)*
- **Flutter's official architecture is MVVM**, not Clean *(AR-01/02/03)*
- **The state-management decision matrix**, argued in this order: testability without a widget tree → compile-time vs runtime errors → boilerplate vs team size → **bus factor** *(SM-17)*

### U5 · 90 min — mock interview, out loud
Work the question bank **speaking every answer**, not reading it:
- [justsandip/flutter-interview-questions](https://github.com/justsandip/flutter-interview-questions) (250★, pushed Jun 2026)
- [debasmitasarkar/flutter_interview_guide_2026](https://github.com/debasmitasarkar/flutter_interview_guide_2026) (329★, Feb 2026)
- [fluttersolution.com](https://www.fluttersolution.com/) — actively publishing through Sept 2026, explicitly targets sounding current

⚠ **Avoid** `power19942` (2023) and `whatsupcoders` (2021) — pre-null-safety in places.

**Last 20 minutes — rehearse the pivot narrative aloud** *(HR-01, HR-02)*:
> "My Flutter tenure is short and I'll be straight about that. What I bring is *n* years of
> [real adjacent work]. Here's a console I built on Flutter's own recommended architecture over a
> live public feed — and here's a jank bug I diagnosed in DevTools and fixed by moving the parse
> off the main isolate."

**Never fabricate a Flutter project history.** It unravels on the first follow-up. The honest
boundary is the differentiator — say it plainly, then pivot to what's true.

### U6 · 30 min — OA gate + handoff
The **first** LTIMindtree filter is *not* Flutter: ~120–130 min of aptitude, English, CS
fundamentals and 1–2 easy coding problems. Confirm what's reusable from your 90-day curriculum
(SQL/DBMS is already covered) and **decide now which language you'll code the OA in** — use your
most fluent one, not Dart, unless Dart is genuinely comfortable *(OA-08)*.

Then write the handoff: what shipped, what's shaky, what Monday picks up.

---

## If you fall behind — the sacrifice order

Decided now, in daylight, so it isn't a panic decision on Sunday night. **Cut from the bottom.**

| Cut # | Sacrifice | Why it's safe to lose |
|---|---|---|
| 1 | Capstone **Stage 3.4** (MethodChannel) | NT-01 is answerable spoken; the code adds little |
| 2 | Capstone **Stage 2.4** (persist filter) | DA-04 is a two-line concept |
| 3 | **Stage 3.1** (offline cache) | keep 3.2/3.3 — the isolate jank demo is the bug story, it's worth more |
| 4 | **U4 architecture detail** | keep the currency facts; they're cheaper and higher-yield |
| 5 | **Stage 2.1/2.2** (search + debounce) | painful — A-01 is a top question — so re-drill it *spoken* in U5 |

**Never cut:** Stage 1 (there is no story without a shipped app) · Stage 4 tests (30 min, flagged
as the most underrated differentiator) · U5 spoken rehearsal (four of five gates are spoken) ·
the Friday internals block (highest leverage in the syllabus).

---

## Definition of done, Sunday EOD

- [ ] SDK on 3.47.0; `flutter doctor` clean
- [ ] **Tremor Stage 1 shipped** — live feed, list, detail, no crash on airplane-mode toggle
- [ ] At least one test green
- [ ] A **true** bug story with DevTools specifics you personally observed
- [ ] All nine Friday internals answers spoken cold, no notes
- [ ] The state-management matrix argued in the right order
- [ ] Impeller / macros / package-rot currency facts held
- [ ] The pivot narrative rehearsed **aloud**, honest about the boundary
- [ ] OA language decided; reusable CS-fundamentals material identified
- [ ] `DAILY_LOG.md` written all three nights

---

## What this sprint does *not* achieve — stated plainly

15 hours buys **coverage-complete and mastery-selective**: 53 of 71 P1 rows forced by the capstone,
the rest spoken. It does **not** buy 3 years of Flutter, and the plan never pretends otherwise.

Not achieved: fluent idiomatic Dart under live-coding time pressure · genuine edge-case experience
with any state-management library · FFI, federated plugins, platform views, custom `RenderObject`s,
slivers in depth.

**The posture that wins:** *"I know the shape of the whole framework and I've gone deep where it
counts."* Uniform-depth bluffing collapses on the first follow-up. This does not.

**After Sunday:** [SYLLABUS.md](SYLLABUS.md) is the continuation plan — the unsacrificed P1s, then
P2 → P3. React/JS resumes Monday 8 Sep per [PARKED_TRACKS.md](../teach_me/PARKED_TRACKS.md), where
one flag is still open: **confirm the 2026-09-10 Accenture technical round with Sameer.**
