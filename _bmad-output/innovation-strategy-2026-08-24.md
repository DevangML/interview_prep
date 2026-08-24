# Innovation Strategy: React Workbench (CSS100) — Single-Seat Rehearsal Instrument

**Date:** 2026-08-24
**Strategist:** Devang
**Strategic Focus:** Turn an adequate browser code editor into a category-different rehearsal instrument for timed front-end assessments — optimised for one user, judged on pass-rate first, retention second, narrative third.

---

## 🎯 Strategic Context

### Current Situation

**The asset.** A local React 19 + Vite workbench at `docs/mettl_prep/_drills/workbench`, carrying more machinery than most commercial prep products:

- **CSS 100** — 109 graded drills across 18 categories, each with a target diagram, a `use` spec (the exact properties under test), reference solution, hints, and regex-based spec validation.
- **The Ladder** — 66 progressive lessons across 9 stages (atoms → flexbox → grid → reactivity → polish).
- **Campaign Arena** — 14 quests, 33 challenges, XP, rank ladder, lock/unlock gating, persisted in `SAVE_GAME_STATE.json`.
- **Rapid Fire / Match / Targets** — recall drills, layout archetypes, timed speed runs.
- **Execution substrate** — Babel-in-a-worker JSX compilation, sandboxed iframe preview, 3-pane Before/After/Mine diff, Prettier worker, a Python server that writes both save-state and an `ACTIVITY_LOG.jsonl` capturing every tab open, edit, hint reveal, run and pass.

**The occasion.** Accenture CSE React lateral (ATCI-R1-S2060748), Mettl-format online assessment. **The OA date is still unset in the save state.** Readiness gauge last recorded at 18/100.

**The editor, as of today.** Just repaired: module-worker `importScripts` failure had silently killed Babel *and* Prettier, so live preview and Before/After rendered nothing; preview containers had zero height; Emmet was vendored but never wired; no indent unit, no format-on-enter, no indent guides. All six now function. **The instrument works. It does not yet teach.**

### Strategic Challenge

Three truths that must be held simultaneously:

1. **The market is one man with a finite number of mornings.** The currency is not revenue — it is *minutes* and *cold-recall percentage*. Any feature that does not convert into one of those two is decoration, however clever.
2. **The competition is not other prep tools. It is VS Code + LeetCode + a YouTube tab.** Those substitutes are free, familiar, and already installed. A self-built instrument must beat them on something they *structurally cannot* offer — not on polish, which they will always win.
3. **"Category difference" for a single seat is a real strategy, not a vanity one** — but only if it targets what generic tools refuse to model: **the assessment as a performance under a clock, with no autocomplete, no internet, no second attempt.** Every mainstream editor is optimised to make coding *easier*. A rehearsal instrument must sometimes make it *harder, on purpose, in the exact ways the exam will.*

The strategic challenge, stated once:

> **Build the only editor in the world that is deliberately worse than VS Code — in precisely the dimensions Mettl is worse — while being radically better at converting a failed attempt into permanent recall.**

Everything downstream is judged against that sentence.

---

## 📊 MARKET ANALYSIS

*Frameworks applied: Competitive Positioning Map · Market Timing Assessment · Five Forces (adapted to attention, not revenue)*

### Market Landscape

There is no market for this tool. There is a market **for Devang's hours**, and every study tool on earth is bidding for them. So we size the only market that exists:

| Layer | Definition | Estimate |
|---|---|---|
| **TAM** | Total study hours before the OA | ~27 hrs/week × weeks-to-OA. **Weeks-to-OA is unknown — the denominator of this entire strategy is missing.** |
| **SAM** | Hours that could plausibly be spent *inside* a hands-on instrument (vs reading, video, mock interviews, behavioural prep) | ~55–65% of TAM |
| **SOM** | Hours that actually convert into *cold, timed, unaided production capability* | Currently low. Readiness gauge 18/100 after weeks of tooling. **This is the number the strategy must move.** |

The gap between SAM and SOM is the whole game. Hours are being spent. Capability is not accruing at the same rate.

### Competitive Dynamics

**Five Forces, adapted — the "supplier" is open source, the "buyer" is you, the "price" is attention:**

- **Buyer power: extreme.** Switching cost to VS Code is zero. One frustrating session and the tool is abandoned forever. Nothing locks you in but usefulness.
- **Threat of substitutes: overwhelming and free.** VS Code, LeetCode, Frontend Mentor, CodeSandbox, YouTube, Anki, and — most dangerous — *asking an AI to just write it*.
- **Supplier power: negligible.** CodeMirror 6, Emmet, Babel, Prettier, Lezer are all OSS and modular. This is a genuine structural advantage: the entire component supply chain is free and composable.
- **Threat of new entrants: constant.** AI coding tools ship weekly. Any feature that amounts to "help me write code faster" will be obsoleted by something better within a quarter.
- **Rivalry: brutal, and invisible.** The competitor is not a company. It is the 6am impulse to open YouTube instead.

**Competitive Positioning Map** — dimensions chosen because they are the only two that predict OA outcome:
*X-axis: fidelity to exam conditions (no AI, no internet, clock running, one attempt).*
*Y-axis: retention engineering (does a failure become permanent knowledge?).*

| Player | Exam fidelity | Retention engineering |
|---|---|---|
| VS Code + local project | **Very low** (Copilot, IntelliSense, infinite time) | None |
| CodeSandbox / CodePen | Low | None |
| Frontend Mentor | Medium (real briefs) | Low (no clock, no recall) |
| LeetCode | High — *for DSA only*. Zero coverage of CSS layout or React composition | Low (repetition by volume, not by schedule) |
| Anki | None (no doing) | **Very high** (SM2 spacing) |
| Mettl's own practice | High fidelity, trivial content, no feedback | None |
| **React Workbench (today)** | **Low** — every assist is on, hints one click away, "solved" is permanent | **Low** — solved once = solved forever |
| **White space** | **High + High** | **Nobody is here.** |

The upper-right quadrant is empty. Not because it is worthless — because **no commercial product can sell an experience that deliberately withholds help.** A tool for a market of one has no such constraint. That is the structural asymmetry, and it is the only one that matters.

### Market Opportunities

1. **Assessment conditions are tightening, not loosening.** Proctoring, AI-detection and lockdown browsers are rising precisely as AI assistance becomes ubiquitous. The value of *practising without assistance* is appreciating as an asset class. Timing is favourable and will stay favourable through this hiring cycle.
2. **CodeMirror 6 is a component supply chain, not an editor.** Emmet, lint, merge-view, autocomplete sources, custom decorations and keymaps are independently installable packages. A category-different editor can be *assembled*, not written.
3. **The telemetry already exists.** `ACTIVITY_LOG.jsonl` records every tab open, edit, hint reveal, run and pass. No prep product on the market has this about its user, because no product is allowed to be this invasive. You are allowed. You are the subject and the owner.
4. **Ground truth already exists in the data.** Every one of the 109 drills carries `markup` (reference JSX), `sol` (the missing declaration), and `use` (the properties under test). Automated, objective grading is a data problem that is *already solved* — it is simply not being used.

### Critical Insights

> **Insight 1 — Objective-function inversion.** Every editor ever built optimises *time-to-working-code*. The exam optimises *correct-on-first-attempt-while-cold*. These are not the same objective; in places they are opposed. A rehearsal instrument that inherits VS Code's objective function is training the wrong reflex.

> **Insight 2 — The progress metric is counterfeit.** Spec validation is a regex over the CSS *text*. It confirms you typed `box-sizing`. It cannot confirm the card measures 200px. It cannot detect a correct property in the wrong selector. It marks green on typed intent, not achieved result — and "Mark Solved" is a manual, permanent, self-issued certificate. **A currency you print yourself is not a currency.**

> **Insight 3 — Your own system already specified the fix and the tool ignored it.** `ADAPTIVE_LEARNING_SYSTEM.md` mandates 70% retrieval / 30% intake, SM2 spacing at +1/+3/+7/+16/+35 days, interleaving, and a leech rule. The workbench implements *none* of it. The strategy document and the instrument are two different products that have never met.

> **Insight 4 — Emmet is not a productivity feature here. It is a chunking trainer.** The exam will not give you Emmet. But `div.card{A}+div.card{B}` is how a fluent developer *thinks* about structure before typing it longhand. Train the mental chunk in practice; remove the expansion in exam. Both, deliberately. This resolves the contradiction rather than ducking it.

---

## 💼 BUSINESS MODEL ANALYSIS

*Frameworks applied: Business Model Canvas (single-seat adaptation) · Value Proposition Canvas · Cost Structure Innovation*

### Current Business Model

| Block | Reality |
|---|---|
| **Customer segment** | One. Devang. ~3 hrs weekday mornings, ~6 hrs weekend days. |
| **Value proposition** | "The drill exists, it is graded, and the environment remembers where I left off." |
| **Channels** | `localhost:5173`, `SAVE_GAME_STATE.json`, `MEMORY.md`, the Python server on :8777. |
| **Customer relationship** | Gamified: XP, ranks, quests, lock/unlock gating, a coach persona. |
| **Key resources** | 109 spec'd drills · 66 ladder lessons · 14 quests · activity log · BMad agent pipeline · a working Babel/Prettier/CodeMirror substrate. |
| **Key activities** | Building the tool. Occasionally using the tool. **This ratio is the business model's core defect.** |
| **Revenue** | Readiness points per hour invested (RPI). |
| **Costs** | Build hours — which are drawn from the *same* pool as study hours. |

### Value Proposition Assessment

**Jobs the instrument is actually hired for:** *"Give me a correct, graded, self-contained rep — right now, with no setup."* It does this well. Setup cost is genuinely near zero, and that is not a small achievement.

**Jobs it is hired for and fails:**
- *"Tell me the truth about whether I can do this cold."* — Fails. Self-certified progress.
- *"Make sure I still know what I learned three weeks ago."* — Fails. No decay, no scheduling.
- *"Make me feel the clock."* — Barely. A 75-second sprint timer exists but changes nothing about the environment.
- *"Show me exactly why my layout is wrong."* — Fails. Three iframes and a human eyeball.

### Revenue and Cost Structure

**The equation that governs everything:**

```
Net readiness = (study hours × conversion rate) − (build hours × 1)
```

Build hours are debited from the same account as study hours, at par. Therefore:

> **A tool improvement is only rational if it raises the conversion rate by more than the hours it consumed.**

A 4-hour feature must return more than 4 hours' worth of learning efficiency before the OA. This is a *brutal* hurdle rate and it disqualifies most of what feels fun to build.

### Business Model Weaknesses

1. **The Builder's Trap — the single greatest risk to the entire enterprise.** Building the instrument *feels* like preparation, produces visible artefacts, and yields dopamine on a faster cycle than drilling does. It is the most sophisticated form of procrastination available to a strong engineer. Everything in this strategy is designed around containing it.
2. **Counterfeit progress metric.** Regex validation + manual "Mark Solved" = a readiness number that cannot be trusted, feeding an adaptive engine that cannot therefore adapt correctly.
3. **No decay model.** `solvedMap` is a permanent boolean in localStorage. Knowledge is not permanent. The data model contradicts the learning science in your own spec.
4. **Assistance ceiling is always maximal.** Autocomplete, bracket-closing, live preview, hints, reference solution, target diagram, and now Emmet — all always available. The tool has no way to be hard.
5. **Content-volume worship.** 109 drills + 66 lessons + 33 challenges is *supply*. At 1 drill/15 min that is ~27 hours of raw content and it is not the bottleneck. Retention is.
6. **Zero cold-start feedback.** The preview begins empty because every drill starts with an empty fragment; the first 60 seconds of every drill are spent retyping structure rather than solving the actual concept.

---

## ⚡ DISRUPTION OPPORTUNITIES

*Frameworks applied: Jobs to be Done · Blue Ocean Strategy (ERRC) · Disruptive Innovation Theory (non-consumption)*

### Disruption Vectors

**Vector 1 — Deliberate degradation.** Every competitor competes on *more help*. Nobody competes on *calibrated help*. An instrument that can remove its own assistance on command occupies ground no funded product can take.

**Vector 2 — The black box.** Aviation replays the flight. Chess replays the game with an engine. Sport replays the tape. Coding preparation replays *nothing* — you experience your failure once, at the moment you are least able to learn from it. You already record the flight data and have never played it back.

**Vector 3 — Objective grading from data you already have.** `markup` + `sol` + `use` is ground truth. Rendering the reference and the attempt and comparing computed geometry converts a self-graded exercise into an examined one.

**Vector 4 — Scheduling as a first-class citizen of the editor.** Not a separate Anki deck. The *question list itself* re-sorted by what is decaying today.

### Unmet Jobs

| When… | I want to… | So I can… | Currently served by |
|---|---|---|---|
| It is 6am and I have 90 minutes | be handed the single highest-value rep for *today* | stop spending 10 minutes choosing | Nothing — you scroll a list of 109 |
| I finish a drill | know objectively whether I'd have passed | trust my readiness number | Nothing — I certify myself |
| I fail | see exactly which property, which selector, which pixel | fix the misconception, not the symptom | Eyeballing three iframes |
| Three weeks pass | be re-tested on what I "mastered" | not discover the gap in the exam | Nothing — solved is forever |
| I have 10 tired minutes at night | do *something* that compounds | not lose the day | **Non-consumption.** The tool demands a desk, a keyboard and full attention |
| I sit the real OA | already have felt this exact pressure | not meet it for the first time when it counts | The 75s timer, which changes nothing |

**Non-consumers worth serving: tired-Devang and ten-minute-Devang.** They currently consume nothing. A low-effort recall surface (recognition-grade, phone-shaped) captures hours that are otherwise lost entirely — the classic disruptive entry point: *good enough for a segment the main product refuses to serve.*

### Technology Enablers

All available now, all package-based, no invention required:

- `@emmetio/codemirror6-plugin` — full command surface: tracker, completion source, `wrapWithAbbreviation`, `balanceInward/Outward`, `selectNextItem/Previous`, `goToEditPoint`, `incrementNumber`, `removeTag`, `splitJoinTag`, `evaluateMath`, `toggleComment`, plus an `emmetConfig` facet (BEM, shortHex, attribute quotes, markup style).
- `@codemirror/autocomplete` — custom completion sources; the correct home for Emmet completions instead of a hand-rolled Tab handler.
- `@codemirror/lint` — a **drill-aware linter**: flag the exact traps the 109 drills teach (content-box widths, collapsed margins, `justify-content` on the wrong axis).
- `@codemirror/merge` — real inline diff against the reference solution, replacing eyeball comparison.
- `@codemirror/search`, `@codemirror/commands`, `@replit/codemirror-vim` — commodity ergonomics.
- **`getBoundingClientRect` + `getComputedStyle` inside the sandbox iframe** — objective grading with zero new dependencies. No pixel-diff library, no canvas rasterisation, no flakiness.
- **IndexedDB + `CompressionStream`** — store CodeMirror transaction streams for replay.
- **Web Speech API** — capture the spoken explanation your own curriculum demands ("verbalize the misconception trap") at zero infrastructure cost.

### Strategic White Space

> **The flight simulator with a black box.**
>
> An instrument that can (a) reproduce the exam's *deprivations* on demand, (b) grade the outcome objectively rather than accept your word for it, (c) replay your own failure frame by frame, and (d) decide what you rehearse tomorrow based on what is decaying today.
>
> Nobody sells this, because nobody can sell an experience whose core feature is *taking help away and telling you an uncomfortable truth*. You are not selling it. You are the only customer, and the only one who benefits from being told the truth.

---

## 🚀 INNOVATION OPPORTUNITIES

*Frameworks applied: Three Horizons · Innovation Ambition Matrix · Value Chain Analysis*

### Innovation Initiatives

**H1 — Core (make the instrument correct)**

1. **Emmet, properly — package-based, full surface.** Replace the hand-rolled Tab handler with the real integration: tracker at correct precedence, `emmetCompletionSource` registered in `@codemirror/autocomplete` (so abbreviations appear in the completion list with previews), per-syntax `emmetConfig`, and the full command set bound to a keymap — wrap-with-abbreviation, balance in/out, select next/prev item, go-to-edit-point, increment/decrement, remove-tag, split/join-tag, evaluate-math. *Table stakes. Cheap. Do it first because everything else assumes a trustworthy editor.*
2. **Command palette** (`Mod-K`) — every editor action, every drill action, every mode switch, one keystroke. Cheap, compounding, removes navigation friction permanently.
3. **Drill-aware lint** — `@codemirror/lint` rules derived from the drill set's own trap list.

**H2 — Adjacent (make the instrument honest)**

4. **EXAM MODE / PRACTICE MODE — the category difference.** One switch reconfigures the entire instrument. Exam: no Emmet, no autocomplete, no bracket-closing, no format-on-enter, no live spec validation, no hints, no reference solution, no target diagram after start, clock visible and running, every keystroke logged, one submission. Practice: maximal assistance, all of it. *This is mostly deletion, which is why it is the cheapest category difference available.*
5. **Objective grader (DOM + computed style).** Render reference (`markup` + `css` with `sol` applied) and attempt in parallel hidden frames; compare geometry and the specific properties named in `use`; emit a *specific* failure report — "`.card` computed width 236px, expected 200px". Replaces regex. Kills the counterfeit currency.
6. **Merge-view solution diff** — `@codemirror/merge` against the reference. See the delta, not two pictures.
7. **Recall scheduler (SM2, in the editor).** `solvedMap: boolean` → `{ ease, interval, dueAt, lapses }`. Question list sorts by due. Leech rule after 3 lapses. *This is simply implementing the spec you already wrote.*

**H3 — Transformational (make the instrument teach)**

8. **Black-box replay.** Persist CodeMirror transactions; scrub any past attempt with the preview re-rendering live; annotate where time was lost. Review your own game.
9. **Verbal gate.** 30-second spoken explanation captured after a pass, stored with the attempt. Fuses the behavioural round into the technical drill.
10. **Post-mortem agent.** After a session, an agent reads `ACTIVITY_LOG.jsonl` and writes a diagnosis into the daily log — and, crucially, *generates a new drill* targeting the specific misconception observed.
11. **Ten-minute mode.** Recognition-grade recall, phone-shaped, for hours currently lost to non-consumption.
12. **90-second demo mode.** A scripted tour that runs the instrument for an interviewer. Serves the narrative goal at near-zero marginal cost — and only once the substance exists to demo.

### Business Model Innovation

The model shifts from **content library** ("we have 109 drills") to **closed-loop control system** ("the instrument decides what you do next, measures whether it worked, and tells you the truth"). Under the new model, adding an item to the drill set has near-zero value; improving the *loop* has compounding value. This single reframing kills most future feature requests before they are made.

### Value Chain Opportunities

The chain is: **content → environment → attempt → grading → diagnosis → scheduling → next content.**
Today you own content and environment (well) and nothing else — the last four links are performed manually, by a tired human, at the moment of lowest objectivity. **Grading, diagnosis and scheduling are the high-value links, and they are exactly the ones a computer does better than a tired human at 7am.** Vertically integrate there; do not add content.

### Partnership and Ecosystem Plays

- **Open source as the supply chain** — CodeMirror/Emmet/Lezer maintainers are your unpaid engineering team. Consume aggressively; write nothing that a package provides. This is the explicit instruction behind "package-based, not reinventing the wheel."
- **The referral pipeline (Ranjeet → Mangesh → Rushikesh)** — the tool's demo mode is a conversation opener with people who can move your candidacy. Distribution for the *narrative* asset, not the software.
- **BMad agents as internal staff** — the post-mortem/drill-generation agent is an ecosystem play using capability you already have installed.

---

## 🎲 STRATEGIC OPTIONS

### Option A: Polish the Cockpit

Do Emmet properly, then the ergonomics tier: command palette, Vim keymap, minimap, themes, multi-cursor, search-and-replace, fancier diffing. Make the editor a pleasure.

**Pros:** Fast. All package-based. Immediately satisfying. Removes real daily friction. Low risk of breaking what works.

**Cons:** Builds a worse VS Code, competing on the exact axis where VS Code is unbeatable and where the exam gives you nothing anyway. Moves pass-rate approximately zero. **Maximum exposure to the Builder's Trap** — it is the most enjoyable option and the least useful, which is precisely why it is dangerous.

### Option B: The Flight Simulator

Exam Mode / Practice Mode, objective DOM-based grading, black-box replay, SM2 recall scheduling. The instrument becomes a closed control loop that tells the truth.

**Pros:** Attacks pass-rate and retention directly — the two ranked goals. Uses telemetry and ground-truth data you already have. Occupies genuine white space. Produces an unassailable interview story *as a by-product* rather than as a goal. Mostly composition and deletion, not invention.

**Cons:** Materially more build hours than A. The grader can over-engineer without discipline. Requires you to accept an honest readiness number that will, at first, be *lower* than the one you have now.

### Option C: The Coach in the Loop

Lean fully on AI: an agent watches every session, diagnoses in natural language, generates bespoke drills, tutors on demand.

**Pros:** Highest ceiling. Most novel. Best demo. Uses your existing BMad/agent infrastructure.

**Cons:** Token cost and latency inside a 90-minute morning. Non-deterministic feedback where you need a stable yardstick. **And the strategic contradiction: it deepens dependence on the one thing the exam absolutely forbids.** Optimising with a crutch you must surrender at the door.

---

## 🏆 RECOMMENDED STRATEGY

### Strategic Direction

**Option B as the spine. A's Emmet work as required substrate. One slice of C at the very end, and only as post-mortem — never as in-session assistance.**

The sequencing is not negotiable, because each step buys the next:

1. **Emmet, properly (package-based).** Not because expansion speed matters in the exam — it does not — but because (a) it is the chunking trainer that teaches you to *think* in structure, (b) it is cheap and entirely off-the-shelf, and (c) an editor you do not trust poisons every measurement taken inside it. Fix the instrument before you calibrate with it.
2. **Exam Mode.** The cheapest category difference in existence, because it is implemented mostly by *turning things off*. The moment it exists, every subsequent measurement means something.
3. **Objective grader.** Because a control loop with a counterfeit sensor is worse than no control loop — it steers you confidently in the wrong direction.
4. **Recall scheduler.** Because retention is goal #2 and your own learning spec has been sitting unimplemented since day one.
5. **Replay + post-mortem.** Because this is where the compounding is — and by then you will know from usage data whether you will actually watch the tape.

**What gets cut when goals conflict — stated in advance, in writing, so it cannot be relitigated at 2am:**

> **Pass-rate beats retention. Retention beats narrative.**
> A feature that makes the tool more impressive but not more truthful is cut.
> A feature that improves retention past the OA date but not pass-rate before it is deferred.
> Vim keymap, minimap, themes, collaborative editing, mobile app, multi-user, cloud sync: **explicitly out of scope. This is the anti-portfolio, and it is binding.**

### Key Hypotheses to Validate

- **H1 — Exam Mode changes behaviour, not just settings.** Validate: after two weeks, time-to-solution *in exam mode* trends down while hint usage stays at zero. If exam mode is used once and abandoned, the diagnosis is that you do not actually want the truth, and the entire strategy must be rethought.
- **H2 — The current progress metric is counterfeit.** Validate cheaply and immediately: re-grade 10 already-"solved" drills with the objective grader. **If more than 2 fail, the readiness number was fiction and every downstream decision made from it was wrong.** This is the single highest-information test available and it costs almost nothing.
- **H3 — The Builder's Trap is the real enemy.** Validate: instrument the ratio of build-hours to drill-hours. If build exceeds drill in any week, the strategy is failing regardless of how good the software has become.
- **H4 — Replay will actually be watched.** Validate before building the expensive version: if, given a crude replay, you do not open it within five sessions, kill the feature and reclaim the hours.

### Critical Success Factors

1. **Get the OA date.** Everything above is sequenced against a deadline that is currently unknown. A rehearsal instrument without a performance date is a hobby. **This is the highest-priority action in the document and it requires no code.**
2. **Verify the OA's actual composition** — React/JS versus CSS layout weighting — before investing in Phase 2. Over-fitting a CSS grader to an exam that is 70% React state logic would be an expensive, elegant mistake.
3. **Enforce the 1:1 rule.** No build session that is not preceded by a drill session. The instrument earns its improvements.
4. **Package-first discipline.** If a CodeMirror package does it, install it. Hand-rolled editor internals are a tax you pay forever.
5. **Every feature ships behind a number.** If it cannot be measured in minutes saved or recall gained, it does not ship.

---

## 📋 EXECUTION ROADMAP

### Phase 1: Immediate Impact — *"Make the instrument trustworthy and make it able to be hard"*

| Initiative | Substance |
|---|---|
| **Emmet, done properly** | `@emmetio/codemirror6-plugin` fully integrated: tracker + `emmetCompletionSource` inside `@codemirror/autocomplete` with preview, per-syntax `emmetConfig` (BEM, shortHex, quotes), and the complete command keymap — wrap, balance in/out, select item, edit points, inc/dec number, remove/split/join tag, evaluate math. Retire the hand-rolled Tab handler. |
| **Exam Mode / Practice Mode** | One store flag reconfiguring editor extensions, panel visibility, hint access, grading visibility and the clock. Implemented largely by removal. Mode is stamped on every logged attempt. |
| **Command palette** | `Mod-K` over every action: pick drill, switch mode, run, grade, reveal, format, next-due. |
| **Attempt telemetry** | Time-to-first-keystroke, time-to-first-correct-property, keystrokes-to-solution, hint count, mode — written to the existing activity log. |

**Decision gate G1:** Exam Mode used in **≥4 sessions** within two weeks. If not — stop building; the problem is not the tool.

### Phase 2: Foundation Building — *"Make it tell the truth, and decide what's next"*

| Initiative | Substance |
|---|---|
| **Objective grader** | Hidden reference frame (`markup` + `sol`) vs attempt frame; compare `getBoundingClientRect` geometry plus the computed properties named in `use`; specific failure report; manual override retained with the override itself logged. |
| **H2 audit** | Re-grade the existing "solved" set. Recompute the readiness gauge honestly. Publish the delta to the daily log even if it is humiliating — *especially* if it is humiliating. |
| **Merge-view diff** | `@codemirror/merge` against the reference solution, replacing eyeball comparison of iframes. |
| **Drill-aware lint** | `@codemirror/lint` rules encoding the trap taxonomy the 109 drills already teach. |
| **SM2 recall scheduler** | `solvedMap` → `{ ease, interval, dueAt, lapses }` at +1/+3/+7/+16/+35d. Question list sorts by due-date. Leech rule at 3 lapses. A "Today" queue that answers *"what is the single highest-value rep right now"* without you choosing. |

**Decision gate G2:** After the H2 audit — if <20% of "solved" drills fail objective grading, the grader was over-built; record the lesson and freeze grader work immediately.

### Phase 3: Scale & Optimisation — *"Make it teach, then make it demo"*

| Initiative | Substance |
|---|---|
| **Black-box replay** | Persist CodeMirror transactions (compressed, IndexedDB); scrubbable timeline with live preview re-render; time-loss annotation. Ship a crude version first to test H4. |
| **Verbal gate** | Web Speech capture of a 30-second explanation post-pass, stored with the attempt. Feeds the behavioural round. |
| **Post-mortem agent** | Reads `ACTIVITY_LOG.jsonl`, writes the diagnosis into `DAILY_LOG.md`, generates one targeted drill for the observed misconception. Post-session only — never in-session. |
| **Ten-minute mode** | Recognition-grade recall surface for otherwise-lost hours. |
| **90-second demo mode** | Scripted tour for interviewers. **Built last, or not at all** — it is the narrative goal, and narrative is ranked third. |

**Decision gate G3:** If in any week build-hours exceed drill-hours, **freeze development entirely** until the ratio inverts. No exceptions, no "just finishing this one thing."

---

## 📈 SUCCESS METRICS

### Leading Indicators

- **% of attempts made in Exam Mode** — the single best proxy for whether you are actually rehearsing or merely coding.
- **Time-to-first-correct-property** (exam mode, cold) — trending down.
- **Hint-free pass rate** — trending up.
- **Keystrokes-to-solution** — falling toward the reference solution's own length (fluency, not flailing).
- **Due-drills done ÷ due-drills scheduled** — is the scheduler being obeyed?
- **Build-hours : drill-hours ratio** — must stay ≤ 1:1. Report weekly.

### Lagging Indicators

- **Honest readiness gauge** — recomputed by the grader, never self-asserted. Expect it to *drop* on first honest measurement. That drop is the strategy working, not failing.
- **Cold-recall % at the 7 / 16 / 35-day intervals.**
- **Full mock OA score under exam conditions** — the only lagging indicator that ultimately matters.
- **Time-to-complete a full layout archetype from blank**, cold, unaided.

### Decision Gates

| Gate | Test | Action if failed |
|---|---|---|
| **G1** | Exam Mode used ≥4 sessions in 2 weeks | Stop building. The bottleneck is behavioural, not technical. |
| **G2** | ≥20% of "solved" drills fail objective grading | If below, grader was over-built — freeze it, bank the lesson. |
| **G3** | build-hours ≤ drill-hours, every week | Freeze all development immediately. |
| **G4** | OA date obtained | Until it is, treat *every* roadmap item beyond Phase 1 as speculative. |

### Key Risks

1. **The Builder's Trap (severity: fatal).** The most likely failure mode by a wide margin: an exquisite instrument, an unprepared candidate, a missed offer.
2. **Grader false-negatives (severity: high).** One wrong "fail" on correct code destroys trust in the sensor permanently, and an untrusted sensor is worse than none.
3. **Scope creep into a VS Code clone (severity: high).** Every ergonomics feature will feel justified in isolation.
4. **Unknown OA date (severity: high).** All sequencing is arbitrary without it.
5. **Over-fitting to CSS (severity: medium-high).** If the assessment is React-state-heavy, a beautiful CSS grader is an expensive irrelevance.
6. **Honest metrics are demoralising (severity: medium).** The readiness gauge will fall before it rises. Anticipated, and it is the price of a real instrument.

### Mitigation Strategies

- **Against the Builder's Trap:** the 1:1 rule, enforced by gate G3 and logged automatically. The instrument measures its own maker.
- **Against grader distrust:** every failure must state *precisely why* (selector, property, expected vs computed). Manual override always available, and every override is logged — a run of overrides is itself the signal that the grader is wrong.
- **Against scope creep:** the anti-portfolio is written above and is binding. Vim keymap, minimap, themes, collab, cloud sync, mobile app — **out**. Not "later." Out.
- **Against the unknown date:** obtain it this week. It is a message, not a sprint.
- **Against CSS over-fitting:** confirm the assessment's composition before Phase 2 begins; the grader architecture (compare computed state of a rendered tree) generalises to React output, so build it in a way that does not care whether the tree came from CSS or state.
- **Against demoralisation:** publish the honest number to the daily log *and* the delta, so the trend — not the absolute — is what is read each morning.

---

_Generated using BMAD Creative Intelligence Suite — Innovation Strategy Workflow_
