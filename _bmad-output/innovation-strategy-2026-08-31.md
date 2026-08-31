# Innovation Strategy: The Interview-Readiness Asset

**Date:** 2026-08-31
**Strategist:** Devang
**Strategic Focus:** Maximum verifiable topic mastery per unit of build surface — collapsing an 8-day, 30-file e-commerce simulation into a minimal, architecturally clean artifact with equal or greater coverage.

---

## 🎯 Strategic Context

### Current Situation

Three completed Akshay Saini courses have produced ~70% self-assessed coverage of the JS/CSS/HTML interview surface. The diagnosed gap is not missing material — it is **unexercised material**: topics that can be defined but have never been *chosen* under constraint, quirks read about but never *survived*, and the seams between topics where interview questions actually live.

The current remedy on the table is **SecureCart**: a zero-dependency e-commerce platform, ~30 files, 8 build days, 188 mapped topics. It is well-specified and it would work. That is precisely why it is dangerous — a plan that would work is the hardest kind to kill.

New constraints have now been imposed by the principal:

- Minimalistic; must not consume excessive time
- Full topic coverage retained — non-negotiable
- Not a production project; no production theater
- No heavy CSS — properties present for coverage, not for visual weight
- Small, sleek code; few files
- Extremely clean architecture

### Strategic Challenge

**SecureCart optimizes for the wrong variable.** It maximizes *realism* when the job requires maximizing *density* and *legibility*.

Three structural failures:

1. **Incidental complexity dominates.** A catalog of 500 products exercises exactly the same `map`/`filter`/`reduce`/`sort` topics as a catalog of 5. Checkout wizards, admin CRUD, auth flows, and order histories are *domain scaffolding* — they carry enormous build cost and near-zero marginal topic coverage. Conservative estimate: **55–60% of SecureCart's build effort buys zero additional coverage.**

2. **The coverage is invisible to the buyer.** An interviewer has 45 minutes and will never open 30 files. You would pay full price for value the purchaser structurally cannot perceive. Unverifiable value is not value.

3. **It is a commodity.** "Vanilla e-commerce, no frameworks" is a differentiated *implementation* of a *completely undifferentiated concept*. You would arrive holding the most common object in the market.

And a fourth, quieter failure: SecureCart does not serve the drilling need you diagnosed yourself. Your own Tier-1 warning reads *"do those as timed drills with actual code execution to verify, not by reading explanations."* SecureCart contains no drill mechanism. **The plan does not satisfy the requirement that generated it.**

---

## 📊 MARKET ANALYSIS

*Frameworks applied: Jobs to be Done, Competitive Positioning Map, Market Timing Assessment.*

Unflinching clarity about the market must precede any innovation, because the most expensive mistake available here is building the right thing for the wrong buyer. The "market" is not employers in the abstract. It is a specific, time-boxed evaluation funnel with three distinct gatekeepers who value entirely different things.

### Market Landscape

The buyer is a three-stage funnel, and each stage buys something different:

| Stage | Gatekeeper | Time budget | What is actually purchased |
|---|---|---|---|
| **Mettl OA** | Automated scoring | ~50 min, 36 MCQ | Reflexive, precise recall of quirks. Partial knowledge scores zero. |
| **Technical round** | Working engineer | 30–45 min | Ability to *write* a pattern live and explain *why*, not *that*. |
| **Portfolio / HR screen** | Recruiter, then engineer | 2–10 min scan | A memorable, legible story. Depth is invisible at this speed. |

**Critical observation:** SecureCart serves stage 2 partially, stage 3 weakly, and **stage 1 not at all** — despite stage 1 being the gate that eliminates the most candidates, and the gate whose date is currently unknown.

### Competitive Dynamics

Competitive positioning across the two dimensions that matter — *concept novelty* and *demonstrated depth*:

- **Bottom-left (crowded):** Todo apps, weather apps, calculator clones. Common concept, shallow depth. The bulk of the field.
- **Bottom-right (crowded):** Netflix/Amazon/Spotify clones, React e-commerce. Common concept, moderate depth. Heavily populated by bootcamp output.
- **Top-left (thin):** Novel concept, shallow depth. Cute, forgettable.
- **Top-right (near-empty):** Novel concept, demonstrable depth. **This is the white space.**

**SecureCart lands bottom-right.** Its vanilla-JS constraint raises depth but does not move concept novelty at all. It is a better-executed version of the most common thing in the market — competing on the axis where the field is thickest.

### Market Opportunities

1. **The OA gate is unserved and undated.** No asset currently exists that drills output-prediction under timed conditions. This is the highest-elimination gate and it has zero coverage. *It is also the gate whose date you do not know — which makes readiness-on-demand a strategic requirement, not a nicety.*
2. **Legibility is unpriced.** Every candidate competes on what they built. Almost none compete on making mastery *inspectable in ninety seconds*.
3. **Meta-tooling is unoccupied.** Engineers who build their own instruments read as senior. Nobody in this candidate pool builds instruments.
4. **Existing asset leverage.** A 3D knowledge graph, a React Crucible campaign with save-state, an adaptive learning engine, a 188-topic coverage matrix already exist. SecureCart uses **none** of it. That is abandoned capital.

### Critical Insights

> **Insight 1 — Coverage lives in the seams, not the surface.**
> Topic coverage is a function of *how many distinct decisions* the code forces, not how many features it has. Feature count and topic count are only weakly correlated. Once decoupled, most of the build collapses.

> **Insight 2 — You are not selling an application. You are selling evidence.**
> The e-commerce framing was an unexamined inherited assumption about what a portfolio piece must look like. Remove it and the cost structure collapses without touching the coverage.

> **Insight 3 — The strongest differentiator you own is already in your hands.**
> Your genuine edge is *systems thinking about learning* — the graph, the curriculum, the adaptive engine, the coverage matrix. SecureCart discards that edge to compete on a commodity. The asset should be built from your advantage, not despite it.

---

## 💼 BUSINESS MODEL ANALYSIS

*Frameworks applied: Value Proposition Canvas, Cost Structure Innovation.*

Understanding where the current model is vulnerable matters more than admiring what it does well — vulnerabilities are where the innovation enters.

### Current Business Model

**SecureCart's implicit model:** Invest heavily up front in a broad, realistic application → assume coverage emerges as a by-product of scope → hope the interviewer probes the areas that were covered.

Every link in that chain is a hope, not a mechanism.

### Value Proposition Assessment

| Customer job | SecureCart delivery | Verdict |
|---|---|---|
| Learn the missing 30% | Strong — building does force decisions | ✅ Genuine |
| Prove mastery in 45 min | Weak — 30 files are unreadable at interview speed | ⚠️ Structurally invisible |
| Drill before the OA | Absent — no drill mechanism exists | ❌ Unserved |
| Be memorable | Weak — most common project concept in the market | ❌ Commodity |

**One job of four is genuinely served.**

### Revenue and Cost Structure

Currency here is *hours* and *cognitive carrying capacity*.

| Cost centre | Share of build | Coverage purchased | Verdict |
|---|---|---|---|
| Domain scaffolding (catalog, checkout, admin, auth, orders) | ~55% | Near zero — same topics, more surface | **Pure waste** |
| Visual/CSS polish for production feel | ~15% | Low — violates the no-heavy-CSS constraint | **Pure waste** |
| Core mechanisms (store, runner, events, async, polyfills) | ~25% | Very high | **Keep** |
| Documentation & interview notes | ~5% | High — this is the legibility layer | **Keep and expand** |

**~70% of the budget buys ~15% of the value.** The cost structure is the innovation opportunity.

There is a second, subtler cost: **cognitive carrying cost.** Thirty files must all be held in working memory to be defensible under questioning. A project you cannot fully recall under pressure is a liability wearing the costume of an asset.

### Business Model Weaknesses

1. **Coverage-by-hope.** No mechanism verifies a topic was truly exercised — the matrix is an aspiration, not an assertion.
2. **Invisible value.** Depth exists but cannot be perceived within the buyer's time budget.
3. **Zero OA leverage.** The highest-elimination gate gets nothing.
4. **Discarded advantage.** Existing learning-system capital goes unused.
5. **Fragile under scope pressure.** Cut days from an 8-day plan and coverage degrades unpredictably, because coverage is a *side effect* rather than the *specification*.

---

## ⚡ DISRUPTION OPPORTUNITIES

*Frameworks applied: Jobs to be Done, Blue Ocean Strategy, Disruptive Innovation Theory.*

Incremental innovation would trim SecureCart. Disruption asks a different question entirely: what if the application is not the deliverable?

### Disruption Vectors

**Vector 1 — Collapse the demonstrator and the demonstrated.**

In SecureCart, code *uses* topics and documentation *explains* topics. Two artifacts, two costs, and a permanent gap between them.

Collapse them. Build an artifact whose **subject matter is the topics themselves**. Then implementation and content stop competing for budget and start compounding.

The proof this is real: to build a drill that tests event-loop ordering, you must *instrument* the event loop. To grade a `map` polyfill, you must *implement* the parity test against native. **The hardest features to build are exactly the highest-value topics to master.** Effort and coverage stop being a trade-off.

**Vector 2 — Make coverage the specification, not the by-product.**

Invert the dependency. Topics become *data*. The application renders and executes that data. Coverage becomes an assertion the program can make about itself — countable, testable, and impossible to fake.

**Vector 3 — Serve the non-consumer: your future self at 6am before the OA.**

Classic disruption serves an overlooked segment with something "good enough." The overlooked user here is *you, needing a timed drill*, currently served by nothing.

### Unmet Customer Jobs

| Job | Currently served by | Gap |
|---|---|---|
| "Drill quirks until reflexive" | Nothing | **Total** |
| "Prove coverage in 90 seconds" | Nothing | **Total** |
| "Practice writing polyfills with real verification" | Nothing | **Total** |
| "Explain the event loop with confidence" | Reading | Needs live instrumentation |
| "Be memorable to an interviewer" | A commodity project | **Total** |

### Technology Enablers

Genuinely interesting mechanisms, all vanilla, all high signal:

- **`new Function(...)` sandboxed execution** — run user code, capture the result
- **`console.log` interception** — temporarily replace `console.log`, restore in `finally`. Directly demonstrates closures, higher-order functions, and cleanup discipline.
- **Event-loop instrumentation** — wrap `setTimeout`/`Promise.then` to record execution order and replay it visually. *You cannot build this without truly understanding it.*
- **Polyfill parity testing** — run a hand-written polyfill and the native method against identical inputs, including sparse arrays, `thisArg`, and `NaN`. The grader **is** the test suite.
- **`<template>` + delegation rendering** — a full UI with no framework and no innerHTML injection

### Strategic White Space

**Blue Ocean four-actions on the SecureCart concept:**

| Action | Items |
|---|---|
| **ELIMINATE** | The entire e-commerce domain. Catalog, checkout wizard, admin CRUD, auth, order history, payment simulation, product models, routing between shop pages. All of it. |
| **REDUCE** | File count 30 → ~7. CSS to a single deliberate specimen sheet. Feature count to three. Visual polish to legible-and-quiet. |
| **RAISE** | Topic density per line. Coverage *visibility*. Architectural cleanliness. Defensibility under questioning. |
| **CREATE** | A drill mechanism. Self-asserting coverage. Live event-loop instrumentation. A story no other candidate can tell. |

**The white space, stated plainly:**

> **A tool whose implementation demonstrates the topics, whose content teaches the topics, and whose test suite proves the topics — where all three are the same small codebase.**

---

## 🚀 INNOVATION OPPORTUNITIES

*Frameworks applied: Innovation Ambition Matrix, Value Chain Analysis, Unbundling Analysis.*

### Innovation Initiatives

**I1 — Topics as data, not as features.**
All 188 topics live in one flat data module: id, tier, snippet, expected output, explanation, trap. The app renders and executes them. Adding a topic costs one object literal, not one feature. *Coverage becomes cheap to extend and impossible to fake.*

**I2 — The unified runner: one mechanism, three jobs.**
A single sandboxed execution engine serves as (a) drill grader, (b) polyfill parity tester, (c) event-loop instrument. **Three high-value capabilities, one piece of machinery.** This is the core architectural insight — most of the minimalism follows from it.

**I3 — The self-asserting coverage matrix.**
The app computes and displays its own coverage from the data at runtime. An interviewer sees the topic count on screen and can click any one to watch it execute. **Ninety-second proof of depth.**

**I4 — The event-loop instrument (the showpiece).**
Run a snippet; visualize call stack → microtask queue → macrotask queue as it actually executes. One screen. The single highest-signal artifact available in this entire strategy, and the one you'll be asked to explain most often.

**I5 — CSS as a specimen sheet.**
One stylesheet. Every required CSS topic appears exactly once, deliberately, with a comment naming why it is there. No design system, no component library, no polish budget. **This directly honours the no-heavy-CSS constraint and is more honest than production theater** — you are demonstrating command of the language, not decorating.

**I6 — Polyfills as drills, not as a library.**
Each of the 21 polyfills is a drill: write it, run parity tests against native, see red or green. The polyfill file and the drill content are the same asset.

**I7 — Spaced-repetition state in a closure store.**
Mastery tracking with SM2-style scheduling. Serves the learning job *and* exercises closures, observers, `localStorage`, and cross-tab `storage` events — all as a natural consequence of the feature, not as contrivance.

**I8 — The quirk vault.**
Coercion, `typeof null`, `NaN`, `0.1+0.2`, `[]+{}` — topics that are *awkward to force* into an e-commerce app are the **native content** of a drill tool. The pivot converts your hardest-to-cover topics into your easiest.

**I9 — Graph integration (optional, high leverage).**
The existing 3D knowledge graph reads live progress from the same store. Two artifacts, one system. Reuses abandoned capital.

### Business Model Innovation

**From:** Build big → hope coverage emerges → hope it gets probed.
**To:** Specify coverage as data → build the minimum machine that executes it → coverage is *asserted and demonstrable on demand*.

The shift is from **hope-based** to **mechanism-based** readiness.

### Value Chain Opportunities

Unbundling the SecureCart value chain reveals what was actually load-bearing:

| Activity | Verdict |
|---|---|
| Domain modelling (products, orders, users) | **Cut** — zero marginal coverage |
| UI scaffolding (pages, routing between shop views) | **Cut** — replaced by three tabs |
| Visual design system | **Cut** — replaced by specimen sheet |
| State management | **Keep** — closure store, high density |
| Async orchestration | **Keep** — relocate into the runner |
| Polyfills | **Keep and upgrade** — becomes drill content |
| Event/DOM handling | **Keep** — delegation, `<template>` |
| Documentation | **Keep and expand** — the legibility layer |

Roughly **60% of the chain is removable without losing a single topic.**

### Partnership and Ecosystem Plays

- **Your own existing system** — graph, curriculum, save-state. Reuse, don't rebuild.
- **The Mettl syllabus** — already researched; use it to *prioritise drill ordering* so the highest-frequency OA topics surface first.
- **The referral pipeline (Ranjeet → Mangesh → Rushikesh)** — a tool that visibly demonstrates competence is far more shareable than an e-commerce clone. *A referrer can forward a link to a drill tool; nobody forwards a cart.*
- **Open source** — genuinely useful to other candidates, which converts the artifact into social proof.

---

## 🎲 STRATEGIC OPTIONS

### Option A: Slim SecureCart

Keep the e-commerce framing. Cut to catalog + cart + one form. ~8 files. Drop admin, auth, orders, checkout wizard.

**Pros:** Lowest change cost, spec already written, familiar shape, still covers most JS/DOM/CSS topics.

**Cons:** Remains bottom-right on the positioning map — a *smaller* commodity is still a commodity. Coverage of coercion/quirk topics stays contrived. **Still no drill mechanism, so the OA gate remains unserved.** Cutting features cuts coverage unpredictably because coverage was never the specification.

### Option B: The Proving Ground

Pivot entirely. A single-page vanilla tool with three surfaces: **Drills** (predict output → run real code → grade), **Polyfills** (write → parity-test against native), **Loop** (live event-loop visualizer). Topics live as data. ~7 files. CSS is one specimen sheet.

**Pros:** Top-right white space — novel concept, demonstrable depth. Coverage becomes an assertion, not a hope. **Directly serves the OA gate that eliminates the most candidates.** Quirk topics become native content rather than contrivance. Implementation difficulty and topic value are *aligned* — the hard parts are the valuable parts. Radically smaller. Reuses existing capital. Genuinely memorable story: *"I built the instrument I trained on."*

**Cons:** Discards the written SecureCart spec. Weaker on a handful of app-shaped topics (multi-step forms, `FormData`, routing, print stylesheet) — **mitigated by I5 and a single settings form.** Requires discipline to keep the runner from sprawling. Slightly unusual shape, so the README must do real work.

### Option C: The Instrument

Build only the event-loop visualizer. Beautiful, deep, singular. ~4 files.

**Pros:** Highest per-topic signal in the async domain. Smallest possible build. Extremely memorable demo.

**Cons:** **Coverage collapses.** Async and DOM are covered brilliantly; CSS, forms, a11y, arrays, prototypes, and coercion get nothing. Violates the non-negotiable full-coverage constraint. Excellent *component*, insufficient *strategy*.

---

## 🏆 RECOMMENDED STRATEGY

### Strategic Direction

**Option B — The Proving Ground — with Option C absorbed as its showpiece surface.**

Not a compromise. C is the sharpest thing in this document, but alone it fails the coverage mandate. Inside B, it becomes the third tab and the demo you open first in an interview.

**Why this direction over the alternatives:**

Option A optimises a plan that was aimed at the wrong target. Making a commodity smaller does not make it differentiated, and it leaves the highest-elimination gate — the OA — completely unserved.

Option B is the only option that satisfies **every** stated constraint simultaneously while *improving* the strategic position:

| Your constraint | How B satisfies it |
|---|---|
| Minimalistic | ~7 files, three surfaces, one shared mechanism |
| Not excessive time | ~60% of the value chain eliminated with zero coverage loss |
| Full coverage retained | Topics are *data* — coverage is specified, asserted, and countable |
| Not a production project | It is honestly a tool, not production theater |
| No heavy CSS | One specimen sheet; each property present once, deliberately, commented |
| Small, sleek code | One runner serves three features; no duplicated machinery |
| Clean architecture | Strict layering: data → runner → store → ui → main. No cycles. |

**What makes me confident:** The alignment between build difficulty and topic value is not a nice coincidence — it is *structural*. Every hard problem in this build (sandboxing, console capture, loop instrumentation, polyfill parity) is simultaneously a top-tier interview topic. You cannot build this project badly and still have it work. **The project grades itself.**

**What scares me:** The runner is the single point of architectural failure. If it accretes special cases for individual drills, the codebase degrades into exactly the sprawl you asked to escape. **The runner must stay a pure function: `(code, expectation) → result`.** Any drill needing runner modification is a drill that must be reshaped instead. Hold that line and the architecture stays clean regardless of how many topics you add.

### Key Hypotheses to Validate

| # | Hypothesis | Kill signal |
|---|---|---|
| **H1** | A sandboxed runner with console capture can execute ~90% of drill snippets without per-drill special-casing. | Runner needs branching for more than ~3 drills → reshape the data model before proceeding. |
| **H2** | Topics-as-data yields equal or better coverage than SecureCart's feature-driven approach. | Mapping the matrix onto the data model leaves more than ~15 topics genuinely unreachable. |
| **H3** | Event-loop instrumentation is achievable in vanilla JS at reasonable size. | Exceeds ~120 lines or requires monkey-patching beyond `setTimeout`/`then` → downgrade to a static animated diagram, keep the tab. |
| **H4** | The three surfaces cover the app-shaped topics that the e-commerce framing was carrying. | Forms/`FormData`/routing/print remain genuinely uncovered → add one small settings form; do **not** re-add a domain. |
| **H5** | A 90-second demo communicates depth better than a 30-file repository. | Test on one referral contact. Confusion → the README, not the code, is the problem. |

**H1 is the load-bearing hypothesis. Validate it first, before anything else is built.**

### Critical Success Factors

1. **Runner purity.** `(code, expectation) → result`. No drill-specific branches. Ever.
2. **Data-first sequencing.** The topic data model is finalised *before* UI work begins. Get this wrong and everything downstream bends around the mistake.
3. **CSS discipline.** One stylesheet. Every property commented with the topic it covers. The moment you are choosing colours for aesthetics rather than coverage, stop.
4. **Write the wrong version first.** For every trap, run the broken version, watch it fail, then fix it. This survived from the SecureCart plan because it is the actual learning mechanism — **it is the single most important practice in this entire strategy.**
5. **README carries the story.** Live link, 90-second demo path, coverage count, and the sentence explaining why a drill tool beats an e-commerce clone.
6. **Ruthless scope defence.** Any feature not traceable to a topic is deleted without debate.

---

## 📋 EXECUTION ROADMAP

### Phase 1: Immediate Impact

**Objective:** Kill or confirm H1 before committing to the pivot.

- Build the runner alone: `new Function` sandbox, `console.log` interception with `finally` restoration, error capture, async result awaiting.
- Hand-feed it 10 drills spanning the hardest shapes: sync output, async ordering, thrown errors, coercion quirks, a polyfill parity test.
- Write the topic data model (`{ id, tier, code, expects, explain, trap }`) and map 30 matrix topics onto it.

**Deliverables:** `runner.js`, `drills.js` seed, H1 verdict.

**Decision gate:** *10/10 drills execute with zero runner special-casing.* Fail → reshape the data model, retest. Two consecutive failures → fall back to Option A.

---

### Phase 2: Foundation Building

**Objective:** All three surfaces live, full topic data loaded.

- **Store:** closure factory, observers, `localStorage`, cross-tab `storage` sync, SM2 scheduling.
- **UI:** `<template>` cloning, event delegation, `dialog` for explanations, `aria-live` for results. One render path.
- **Drills surface:** predict → run → grade → explain, with a timed mode mirroring OA conditions.
- **Polyfills surface:** all 21, each with parity tests including sparse arrays, `thisArg`, `NaN`, and `new`-binding.
- **CSS specimen sheet:** `@layer`, custom properties, grid, flexbox, one container query, `:has`, `::before`, `clamp`, one keyframe, `prefers-reduced-motion`, `prefers-color-scheme`, print. Each once. Each commented.
- Full 188-topic data load.

**Deliverables:** `store.js`, `ui.js`, `polyfills.js`, `style.css`, `index.html`, complete `drills.js`.

**Decision gate:** *Self-reported coverage ≥ 170 topics, every drill runnable, keyboard-only operable, two tabs stay in sync.*

---

### Phase 3: Scale & Optimization

**Objective:** The showpiece, the proof, and the story.

- **Loop surface:** instrument `setTimeout` and `Promise.then`, record execution order, replay as an animated three-lane view (stack / microtask / macrotask).
- **Memory-leak lab:** build the leak, find it in DevTools, fix it. Retained from SecureCart because it is the only way to genuinely own the GC topics.
- **Docs:** `README.md` (link, demo path, coverage claim), `ARCHITECTURE.md` (layering, runner contract, why-this-not-e-commerce), `NOTES.md` (40 output-prediction snippets drawn from your own source).
- Deploy to GitHub Pages. Optionally wire the 3D graph to the live store.

**Deliverables:** `loop.js`, three docs, live URL.

**Decision gate:** *A referral contact understands the value in under 90 seconds without narration from you.*

---

## 📈 SUCCESS METRICS

### Leading Indicators

- **Runner purity ratio** — drills requiring special-casing. Target: **0**. This is the architectural health metric; watch it every session.
- **Topics-per-file** — total topics ÷ source files. Target: **> 20**. Falling means domain scaffolding is creeping back.
- **Drill accuracy on first attempt** — the real learning signal. Rising = mastery. Flat = you are reading, not drilling.
- **Time-to-explain** — can you explain any file from memory in under two minutes? Failure means cognitive carrying cost is too high.
- **CSS line count** — target under ~200. Every line beyond is design creep.

### Lagging Indicators

- **Self-asserted coverage** ≥ 170/188, each provable by clicking one drill
- **Mettl-style timed accuracy** ≥ 85% on the Tier-1 drill set
- **Polyfill recall** — 21/21 written from memory, passing parity tests
- **Interview conversion** — technical rounds where the project is discussed at depth
- **Referral shareability** — whether contacts forward the link unprompted

### Decision Gates

| Gate | Criterion | Failure action |
|---|---|---|
| **G1** | 10/10 seed drills, zero runner branches | Reshape data model; twice failed → Option A |
| **G2** | ≥ 170 topics live, keyboard-operable | Cut the Loop surface, ship two tabs |
| **G3** | Contact grasps value in < 90s | Rewrite README; the code is not the problem |
| **G4** | Timed drill accuracy ≥ 85% | Delay referral activation; keep drilling |

---

## ⚠️ RISKS AND MITIGATION

### Key Risks

**R1 — Runner sprawl.** *(Highest severity.)* Special cases accumulate until the codebase is the sprawl you pivoted to escape. This is the failure mode that kills the strategy.

**R2 — Coverage shortfall.** App-shaped topics — `FormData`, multi-step forms, routing, print styles — have no natural home in a drill tool.

**R3 — Novelty misread.** An interviewer sees "quiz app" and dismisses it as trivial, missing the instrumentation depth entirely.

**R4 — Content-volume fatigue.** 188 topic entries is real authoring work; energy collapses at ~topic 90.

**R5 — Sunk-cost drag.** The SecureCart spec is written, detailed, and seductive. Half-pivoting yields the worst of both.

**R6 — Loop instrumentation defeats you.** Genuinely hard; could consume disproportionate effort.

**R7 — Unknown OA date.** The Accenture OA date is still unset. An indefinite build against an unknown deadline is a strategic hazard independent of which option you choose.

### Mitigation Strategies

| Risk | Mitigation |
|---|---|
| **R1** | Codify the runner contract in `ARCHITECTURE.md` **before** writing it. Any drill needing a branch gets reshaped, not accommodated. Track the purity ratio every session — it is your early-warning system. |
| **R2** | One settings form covers `FormData`, validation, and the Constraint Validation API. Hash routing covers the three tabs. One print stylesheet for a progress report. **Three small additions, not a domain.** |
| **R3** | Lead the demo with the **Loop** tab, never the drills. Watching a live event loop reframes the whole project in ten seconds. README opens with instrumentation, not quizzing. |
| **R4** | Author in tier order — Tier 1 first, since it is both the OA-critical set and the highest-value content. If energy fails at topic 90, the 90 you have are the 90 that matter most. **This ordering makes partial completion safe.** |
| **R5** | Decide once, now. Archive the SecureCart spec as a superseded document. **Do not build both.** |
| **R6** | Timebox to the G2 gate. If it exceeds budget, ship a static animated diagram driven by the same recorded data and keep the tab. The recording is the valuable part; the animation is polish. |
| **R7** | **Ask Sameer/the recruiter for the OA date immediately** — before Phase 2. The phase structure is deliberately ordered so that stopping after Phase 2 still leaves a complete, deployable, OA-serving artifact. Phase 3 is upside, not a dependency. |

---

## Appendix: Target Architecture

```
proving-ground/
├── index.html        semantic shell · <template> · <dialog> · 3 tabs
├── style.css         ONE specimen sheet — each property once, commented
├── README.md         live link · 90-second demo path · coverage claim
├── ARCHITECTURE.md   layering · runner contract · why not e-commerce
├── NOTES.md          40 output-prediction snippets from your own source
└── src/
    ├── main.js       bootstrap + hash router
    ├── data.js       188 topics as data — the specification
    ├── runner.js     THE core: sandbox · console capture · parity · instrument
    ├── store.js      closure state · observers · localStorage · cross-tab
    ├── ui.js         template cloning · delegation · one render path
    └── loop.js       event-loop recorder + replay (the showpiece)
```

**Six source files. Strict one-directional layering:**

```
data.js  ──►  runner.js  ──►  store.js  ──►  ui.js  ──►  main.js
                  ▲                                        │
                  └──────────── loop.js ◄──────────────────┘
```

No cycles. No file imports upward. `data.js` imports nothing. `main.js` is imported by nothing.

**The single architectural rule that keeps this clean:**

> `runner.js` exports one pure function: `run(code, expectation) → { output, passed, error, timeline }`.
> It knows nothing about drills, UI, storage, or topics. Every feature is a caller.

Hold that line and the architecture cannot degrade — regardless of how many topics you add.

---

_Generated using BMAD Creative Intelligence Suite - Innovation Strategy Workflow_
