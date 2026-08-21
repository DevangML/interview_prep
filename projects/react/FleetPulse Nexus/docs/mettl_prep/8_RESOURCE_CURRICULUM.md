> 🔗 **A React coding round is confirmed for this assessment.** Theory alone no longer completes a unit.
> Each unit below now has a **coding gate** — see `9_CODING_ROUND_PLAYBOOK.md` Part IV (Unlock Map).
> Rule: finish a unit's theory → build everything it unlocks, closed-book and timed → *only then* advance.
> Part V of file 9 supersedes the time tables in Part III below (split is now 60% theory / 40% coding).

# The Resource Curriculum — Mettl MCQ, Built for Retention
### Companion to `7_EXHAUSTIVE_SYLLABUS_V3.md` · Accenture CSE React · Req ATCI-R1-S2060748

> **Design rule:** an MCQ test is not won by reading. It is won by **retrieval under time pressure**.
> So this document is ordered by *pedagogy*, not by topic. Every unit is `MODEL → MECHANISM → DRILL → PROOF`.
> Aligned to your existing adaptive engine: **70% retrieval / 30% intake**, interleaved, SM2-spaced.

---

## PART I — THE LEARNING ARCHITECTURE

### The four-move unit (never skip a move, never reorder)

| Move | Purpose | Format | Time share |
|---|---|---|---|
| **1. MODEL** | Build the *causal picture* — why the thing exists at all | One canonical read or one video | 15% |
| **2. MECHANISM** | Trace the machine step-by-step on a concrete snippet | Hand-trace on paper / console | 15% |
| **3. DRILL** | Retrieval under time — MCQs, output prediction | Question banks, closed-book | **55%** |
| **4. PROOF** | Explain it aloud in 60s without notes; log every miss | Feynman + error log | 15% |

**Why this order:** Mettl distractors are built from mechanism confusions, not vocabulary gaps. If you skip
MECHANISM and jump to DRILL, you memorise answers and fail the variant. If you skip DRILL, you have
*recognition* knowledge, which collapses at 80 seconds per question.

### Resource tiering (how to pick, so you never over-collect)

- **CANONICAL** — one authoritative source per topic. Read this, and stop. *(react.dev, MDN, redux.js.org)*
- **EXPLAINER** — one mental-model boost when canonical is dry. *(Josh Comeau, Dan Abramov, one talk)*
- **DRILL** — high-volume retrieval material. *(lydiahallie quiz, sudheerj bank, GreatFrontEnd)*
- **PROOF** — a place to be wrong safely. *(browser console, StackBlitz)*

**Hard rule: one CANONICAL + one EXPLAINER per topic, maximum.** Resource hoarding is procrastination
wearing a lab coat. Everything below is already filtered to the single best option.

### The error log (the highest-leverage artifact you will build)
One line per miss, in this exact shape — nothing else:

```
[topic] | what I answered | what is true | THE ONE SENTENCE THAT WOULD HAVE SAVED ME
```

Review the log at every session start (5 min) and immediately before the exam. Items reviewed at
**+1d, +3d, +7d** (SM2 short arc). A miss repeated 3× is a **leech** — rewrite it as a heuristic
(see `7_EXHAUSTIVE_SYLLABUS_V3.md` Layer 4) and drill only that heuristic.

---

## PART II — THE RESOURCE MAP (by syllabus layer)

### UNIT 1 — JavaScript identity & memory *(Syllabus 2.A — unlocks props, PureComponent, Redux purity)*
- **CANONICAL:** javascript.info → [Object references and copying](https://javascript.info/object-copy)
- **EXPLAINER:** MDN → [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) *(the `==` / `===` / `Object.is` table — read the table, not the prose)*
- **DRILL:** [lydiahallie/javascript-questions](https://github.com/lydiahallie/javascript-questions) — filter to object/reference items
- **PROOF:** In console, prove `{a:1} === {a:1}` is `false` and that a spread copy is shallow. Two minutes.

### UNIT 2 — Execution model: scope, closures, `this`, hoisting *(Syllabus 2.B)*
- **CANONICAL:** javascript.info → [Variable scope, closure](https://javascript.info/closure) → [Object methods, "this"](https://javascript.info/object-methods) → [Function binding](https://javascript.info/bind)
- **EXPLAINER:** Dan Abramov → [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/) *(the single best explanation of why React closures capture)*
- **DRILL:** lydiahallie quiz (scope/this/hoisting items) · [BigFrontEnd.dev quizzes](https://bigfrontend.dev/quiz)
- **PROOF:** Write a counter with `setInterval` inside `useEffect([])` and explain out loud why it sticks at 1.

### UNIT 3 — Async & the event loop *(Syllabus 2.B — highest ROI per minute in the whole syllabus)*
- **CANONICAL:** javascript.info → [Event loop](https://javascript.info/event-loop) → [Microtasks](https://javascript.info/microtask-queue) → [Promise chaining](https://javascript.info/promise-chaining)
- **EXPLAINER:** Jake Archibald, *In The Loop* (JSConf Asia 2018) — [youtube.com/watch?v=cCOL7MC4Pl0](https://www.youtube.com/watch?v=cCOL7MC4Pl0). If short on time, Philip Roberts, *What the heck is the event loop anyway?* — [youtube.com/watch?v=8aGhZQkoFbQ](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- **DRILL:** Output-ordering questions — write 5 snippets mixing `setTimeout(…,0)`, `Promise.resolve().then`, and sync `console.log`; predict before running.
- **PROOF:** Predict the order of a 6-line mixed snippet with 100% accuracy, twice.

### UNIT 4 — DOM, events, forms *(Syllabus 2.C — also your coding-simulator insurance)*
- **CANONICAL:** javascript.info → [Bubbling and capturing](https://javascript.info/bubbling-and-capturing) → [Event delegation](https://javascript.info/event-delegation) → [Forms, controls](https://javascript.info/forms-controls)
- **EXPLAINER:** MDN → [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
- **DRILL:** Build, from a blank file, a debounced search filter in **vanilla** HTML+JS: `input` listener, `setTimeout`/`clearTimeout`, `document.createElement`, render into a `<ul>`. **This one exercise covers the entire realistic coding-question surface.**
- **PROOF:** Rebuild it from scratch in under 12 minutes, twice, using the exact element IDs you were given.

### UNIT 5 — React core: components, props, state, JSX, rendering, keys *(Syllabus 1.1, 2.D)*
- **CANONICAL:** [react.dev/learn](https://react.dev/learn) — read exactly these, in order:
  *Describing the UI* → *Rendering Lists* (keys) → *Keeping Components Pure* → *Adding Interactivity* →
  *State as a Snapshot* → *Queueing a Series of State Updates* → *Preserving and Resetting State*
- **EXPLAINER:** Josh Comeau → [Why React Re-Renders](https://www.joshwcomeau.com/react/why-react-re-renders/)
- **DEEP (optional, if you want to be unbeatable here):** Mark Erikson → [A (Mostly) Complete Guide to React Rendering Behavior](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/)
- **DRILL:** [sudheerj/reactjs-interview-questions](https://github.com/sudheerj/reactjs-interview-questions) Q1–Q60 — self-quiz, answer *before* revealing
- **PROOF:** Explain in 60s why an index key breaks a list on deletion but not on append.

### UNIT 6 — Hooks and their three traps *(Syllabus 3-HIGH — the densest scoring band)*
- **CANONICAL:** [react.dev/learn](https://react.dev/learn) *Escape Hatches* chapter — *Synchronizing with Effects* → **[You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)** → *Lifecycle of Reactive Effects* → *Removing Effect Dependencies* → *Referencing Values with Refs*
- **CANONICAL (reference):** [react.dev/reference/react](https://react.dev/reference/react) — skim every hook's "Caveats" section. Caveats *are* the MCQ bank.
- **EXPLAINER:** Dan Abramov → [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) · Josh Comeau → [Understanding useMemo and useCallback](https://www.joshwcomeau.com/react/usememo-and-usecallback/)
- **DRILL:** sudheerj bank, hooks section · [GreatFrontEnd React questions](https://www.greatfrontend.com/questions/react-interview-questions)
- **PROOF:** From memory, state the Rules of Hooks *and the reason* (call-order indexing), plus the three traps: stale closure, missing dependency, missing cleanup.

### UNIT 7 — Redux, Flux, data flow *(Syllabus 1.4, 2.E)*
- **CANONICAL:** [Redux Essentials tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) Parts 1–2 (concepts + app structure), then [Redux Style Guide](https://redux.js.org/style-guide/) *(the "Priority A" rules are direct MCQ fodder)*
- **CANONICAL (RTK):** [createSlice](https://redux-toolkit.js.org/api/createSlice) + [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk) — API pages only
- **EXPLAINER:** Kent C. Dodds → [Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react) *(gives you the Context-vs-Redux answer)*
- **DRILL:** sudheerj bank, Redux section
- **PROOF:** Draw Flux and Redux side by side from memory. The discriminator: **Flux has a dispatcher and multiple stores; Redux has one store and no dispatcher.**

### UNIT 8 — ES6 surface *(Syllabus 1.5 — fast, high-certainty marks)*
- **CANONICAL:** javascript.info → [Destructuring assignment](https://javascript.info/destructuring-assignment) · [Arrow functions revisited](https://javascript.info/arrow-functions) · [Modules, introduction](https://javascript.info/modules-intro) · [Class basic syntax](https://javascript.info/class)
- **DRILL:** Write, from memory: nested destructuring with defaults and rename; template literal with expression; spread vs rest in the same line; named vs default export/import.
- **PROOF:** 10 syntax recalls in 5 minutes, zero errors.

### UNIT 9 — React Router *(Syllabus 1.2, 2.G)*
- **CANONICAL:** [React Router tutorial](https://reactrouter.com/start/framework/routing) + the API pages for `<Outlet>`, `useNavigate`, `useParams`, `NavLink`
- **DRILL:** Answer: what breaks without `<Outlet/>`? `<Link>` vs `<a>`? how do you read `:id`? how do you guard a route?
- **PROOF:** Sketch a nested route config and name the exact component that injects children.

### UNIT 10 — Build tooling *(Syllabus 1.2, 2.F — small but free marks)*
- **CANONICAL:** [webpack Concepts](https://webpack.js.org/concepts/) — entry, output, loaders, plugins, mode. That page only.
- **EXPLAINER:** [Babel: what is it](https://babeljs.io/docs/) intro paragraph + [Why Vite](https://vite.dev/guide/why.html)
- **PROOF:** One sentence each: loader vs plugin, tree shaking, code splitting, why the browser can't run JSX.

### UNIT 11 — React 19 delta *(Syllabus 1.3 — cap this at 45 minutes, it is 2–4 questions)*
- **CANONICAL:** [React 19 release blog post](https://react.dev/blog/2024/12/05/react-19) — read once, top to bottom
- **TARGETS:** Actions in `<form action={…}>` · `useActionState` · `useFormStatus` (**must be called in a child of the form**) · `use` · `createRoot` (CSR) vs `hydrateRoot` (SSR) · Server vs Client Components and the `"use client"` boundary · ref as a prop
- **PROOF:** Name the one gotcha for each of the three new form hooks.

### UNIT 12 — HTML5 + CSS3 *(Syllabus 1.7/1.8, 2.H — only if you have time left; ~3% weight)*
- **CANONICAL:** [web.dev Learn CSS](https://web.dev/learn/css/) — *Box Model*, *Cascade*, *Specificity*, *Flexbox* only
- **EXPLAINER:** Josh Comeau → [An Interactive Guide to Flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)
- **DRILL (gamified, fastest path):** [Flexbox Froggy](https://flexboxfroggy.com/) — 24 levels, ~20 minutes, and it is genuinely sufficient for flexbox MCQs
- **PROOF:** Say aloud which axis `justify-content` acts on when `flex-direction: column`. *(Answer: the main axis, which is now vertical.)*

---

## PART III — FORMATION (the order and the clock)

### Canonical sequence — never reorder; each unit is a prerequisite for the next
```
U1 identity → U2 execution → U3 async → U5 React core → U6 hooks
      → U7 Redux → U8 ES6 → U9 Router → U4 DOM/simulator → U10 build → U11 React19 → U12 CSS
```
Rationale: U1–U3 are the *substrate* — every React answer decomposes into them. U4 sits late because it is
insurance for the coin-flip coding question, not a scoring pillar.

### Time allocation (proportions hold at any total budget)

| Unit | Share | 8-hr sprint | 3-day (18 hr) |
|---|---|---|---|
| U1 identity | 6% | 30 m | 65 m |
| U2 execution/closures/this | 10% | 50 m | 110 m |
| U3 async/event loop | 10% | 50 m | 110 m |
| U5 React core | 18% | 85 m | 3 h 15 m |
| U6 hooks + traps | 18% | 85 m | 3 h 15 m |
| U7 Redux/Flux | 12% | 60 m | 2 h 10 m |
| U8 ES6 | 5% | 25 m | 55 m |
| U9 Router | 5% | 25 m | 55 m |
| U4 DOM + vanilla drill | 8% | 40 m | 85 m |
| U10 build tooling | 3% | 15 m | 32 m |
| U11 React 19 | 3% | 15 m | 32 m |
| U12 HTML/CSS | 2% | 10 m | 22 m |

**Compression rule (if the clock shrinks):** drop from the bottom of that table upward. U12 → U11 → U10 → U4.
**Never** compress U6, U5, or U3 — they carry ~46% of expected marks between them.

### Session shape (repeat per unit)
```
00–05  Error-log review (previous misses only, closed book)
05–20  MODEL     — canonical read
20–30  MECHANISM — hand-trace one snippet, no running it
30–55  DRILL     — MCQs closed-book, timed at 80 s/question
55–60  PROOF     — 60-second aloud explanation + log every miss
```

### The 48 hours before the exam
- **T-48h:** Full mixed drill — 40 interleaved questions from all units, 55-minute clock. Score it honestly.
- **T-24h:** Error log only. Re-drill *only* missed items. Do not open new material.
- **T-3h:** Read Layer 4 heuristics in `7_EXHAUSTIVE_SYLLABUS_V3.md` twice. Nothing else.
- **T-0:** Read every stem twice; the word **NOT** is the most expensive word on the paper.

---

## PART IV — ANTI-RESOURCES (what to actively avoid, and why)

| Avoid | Why |
|---|---|
| PrepInsta / Accenture "previous papers" / AXIS pattern videos | **Fresher-track content.** Different test object entirely. This is the single biggest time sink available to you. |
| Full React video courses (Scrimba, Udemy 40-hr) | Intake-heavy, retrieval-light. Wrong instrument for an MCQ deadline. |
| Building another portfolio project before the OA | Zero MCQ transfer. Project work belongs *after* you clear the screen. |
| Random "Top 100 React MCQ" content farms | Frequently wrong on hooks/React 18 batching, and wrong answers *learned* are worse than gaps. Use sudheerj/GreatFrontEnd instead. |
| Cloud, networking, OWASP, SQL, pseudocode, aptitude | Not in any Mettl React SKU for this band. |
| Deep Server Components / Next.js study | 1–2 questions maximum. Read the release post, move on. |

---

## PART V — THE FOUR PROOF GATES (pass these, and the test is decided)

1. **Substrate gate** — predict output of 5 mixed sync/micro/macro snippets, 5/5, closed-book.
2. **React gate** — explain, unprompted and in 60s each: reconciliation & keys · why state is a snapshot · why a mutated array doesn't re-render.
3. **Hooks gate** — reproduce all three `useEffect` traps as code *and* their fixes, from memory.
4. **Speed gate** — 40 interleaved MCQs in 50 minutes at ≥80% accuracy.

Fail a gate → return to that unit's DRILL move. Do not advance on a failed gate.
