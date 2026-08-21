# The Coding Round Playbook — Mettl React Build Task
### Companion to `7_EXHAUSTIVE_SYLLABUS_V3.md` (syllabus) and `8_RESOURCE_CURRICULUM.md` (theory)
### Accenture · Custom Software Engineer (React.js) · ATCI-R1-S2060748 · Pune · 3+ yrs

> **Confirmed by candidate:** a React coding round is part of this assessment. Format probability in file 7
> is updated accordingly — coding is **certain**, not a coin flip.
> **Governing rule (your directive):** a theory unit is not "done" when you can answer its MCQs. It is done
> when you have **shipped the builds it unlocks.** Theory → unlock → build → *only then* advance.

---

## PART I — WHAT THE ROUND ACTUALLY IS (evidence, not folklore)

### The environment
Mettl's front-end simulator presents **HTML, CSS and JavaScript tabs with live-rendering output and access to
the browser console**. React is a *named competency* inside the simulator library —
`React – State`, `React – Properties`, `React – Lifecycle`, `React – JSX`, `React – Rendering` — so React
tasks are delivered as a pre-scaffolded sandbox rather than a project you set up yourself.

### The grading model — this is the single most important fact
> Submitted code runs against **predefined test cases**. Each case carries a **grade weight**.
> Your question score is the **sum of the grades of the cases you pass.** Hidden cases probe
> **edge cases, boundaries, empty inputs, duplicates, nulls.**

Four consequences that should reshape how you code on the day:

1. **Partial credit is real.** A working 70% solution beats an elegant 0%. **Ship a baseline first, always.**
2. **The grader asserts on the DOM, not on your taste.** Element IDs, class names, `data-testid`s and
   button labels given in the prompt are a **contract**. Copy them character-for-character.
3. **Edge cases are explicitly graded, not incidental.** Empty list, zero results, single item, last page,
   duplicate entry, null/undefined field, whitespace-only input — these are *where the hidden marks live.*
4. **Determinism is required.** Anything time-dependent, random, or animation-dependent cannot be asserted,
   which is precisely why the task corpus is narrower than the internet's "41 machine coding questions" lists.

### Environment discipline
- In-browser editor; you can run and see pass/fail before submitting. **Run early, run often.**
- No external snippets. Proctoring may include a secure browser, tab-switch counting, webcam, and
  **code-similarity checks** — pasted, memorised-verbatim code is a flagged risk. Type your own.
- The invite specifies available languages/frameworks. **Read the invite, do not assume.**

### Honest gap
There is **no public, verified Accenture-specific Mettl React "PYQ" bank.** Anyone selling one is guessing.
What *does* exist is a stable, well-documented machine-coding corpus, which the auto-gradability filter below
narrows to a genuinely small, high-confidence target set. Treat Tier S as your PYQ proxy.

---

## PART II — THE 8 PRIMITIVES (learn these, not 41 apps)

Every task in the corpus decomposes into a handful of reusable moves. Master these and the specific
prompt stops mattering. **This is the highest-leverage page in this document.**

| # | Primitive | The move | Feeds |
|---|---|---|---|
| **P1** | **Controlled input** | `value={x}` + `onChange={e=>setX(e.target.value)}` | every form, search, filter |
| **P2** | **Immutable list ops** | add `[...xs, n]` · delete `xs.filter(x=>x.id!==id)` · update `xs.map(x=>x.id===id?{...x,done:!x.done}:x)` | todo, cart, CRUD |
| **P3** | **Derived state** | compute during render; **never** store what you can derive | filtered list, totals, page slice, counts |
| **P4** | **Index / selection state** | one number (or id, or Set) in state decides which of N is open/active | accordion, tabs, carousel, star rating, stepper |
| **P5** | **Effect + cleanup** | `useEffect(() => { const id = …; return () => clear(id) }, [deps])` | timer, debounce, outside-click, subscriptions |
| **P6** | **Async triad** | `loading` / `error` / `data` — all three rendered, plus `AbortController` | any fetch task |
| **P7** | **Boundary math** | `Math.ceil(total/size)` · `slice((p-1)*size, p*size)` · clamp with `Math.min/max` | pagination, carousel, stepper |
| **P8** | **Recursion on trees** | component renders itself over `node.children` | nested comments, file directory |

**Coverage: P1–P7 alone account for roughly 90% of the realistic task set.**

---

## PART III — THE TASK CORPUS, FILTERED BY AUTO-GRADABILITY

Ranked by `P(asked) = corpus frequency × assertability × fit to Mettl's named React sub-skills`.

### TIER S — build these until they are muscle memory (≈85% of the probability mass)

| # | Task | Primitives | The hidden test cases you must pre-empt |
|---|---|---|---|
| S1 | **Todo list** — add / delete / toggle complete | P1 P2 | empty input rejected · whitespace-only rejected · delete last item → empty state · toggle does not reorder · unique keys |
| S2 | **Live search filter** over a given list | P1 P3 | zero matches → explicit "no results" · case-insensitive · empty query → full list · trailing spaces |
| S3 | **Form with validation** (email + password / required fields) | P1 P3 | error shows on invalid · error clears on fix · submit blocked while invalid · empty submit · per-field messages |
| S4 | **Pagination** over a data array | P3 P7 | page 1 has no Prev · last page has no Next · exact-multiple total · total < pageSize · correct slice on every page |
| S5 | **Counter** — increment / decrement / reset (± min-max clamp) | P4 | clamp at bounds · reset from any value · rapid successive clicks (functional updater) |
| S6 | **Fetch list from API + render** | P5 P6 | loading state rendered · error state rendered · empty array → empty state · no state update after unmount |
| S7 | **Timer / stopwatch** — start / stop / reset | P4 P5 | double-start does not double the interval · reset while running · **cleanup on unmount** |
| S8 | **Accordion / Tabs** | P4 | only one open at a time · clicking the open one closes it (accordion) · default active index |
| S9 | **Star rating** (n stars, click to set, hover preview) | P4 P7 | rating 0 · rating n · click same star again · hover then leave restores committed value |
| S10 | **Debounced search input** (setTimeout/clearTimeout) | P1 P5 | only one call after rapid typing · timer cleared on unmount · empty query short-circuits |

### TIER A — plausible; build after Tier S is clean
Shopping cart with totals (P2+P3) · Theme toggle with `localStorage` (P4+P5) · Modal with outside-click close
(P5) · Custom dropdown / multi-select (P4+P5) · Character counter textarea (P1+P3) · Nested comments (P8) ·
Undo / redo (P2+P4)

### TIER B — low probability in an auto-graded round (common in a *live* round; park until after the OA)
Drag-and-drop Kanban · animated carousel · virtualized list · Tic-Tac-Toe · file explorer · infinite scroll ·
anything whose correctness depends on animation, drag physics, or scroll position

### Redux / Router coding variants (only if the task statement names them)
RTK counter slice · RTK todo slice · two-page Router app with `<Link>` · `/product/:id` with `useParams` ·
protected route redirecting to `/login`

### If the sandbox turns out to be vanilla (HTML/CSS/JS tabs, no React)
Same tasks, different tools: `document.createElement`, `addEventListener('input'|'click')`,
`textContent`, `element.remove()`, event delegation on a parent `<ul>`, manual `setTimeout`/`clearTimeout`.
**S1, S2 and S10 in vanilla cover the entire vanilla surface.** Budget 40 minutes total for this insurance.

---

## PART IV — THE UNLOCK MAP (your gating rule, made concrete)

**Rule of advancement:** finish a unit's theory → *immediately* build everything it unlocks, closed-book,
on the clock → only then move to the next unit. A unit with an unbuilt unlock is an **incomplete unit**.

| Unit *(from file 8)* | Theory done → **UNLOCKS** | Gate to pass before advancing |
|---|---|---|
| **U1** identity & immutability | **P2** → S1 Todo (add/delete/toggle) | Todo works; you can state why `push` + `setState` fails to re-render |
| **U2** closures, `this`, scope | stale-closure counter; `useRef` for the live value | Interval counter counts correctly *and* you can explain both the broken and fixed versions |
| **U3** async & event loop | **P6** → S6 Fetch list; `AbortController` cleanup | All three of loading/error/empty render; no post-unmount setState warning |
| **U4** DOM & events | **vanilla** S1 + S2 + S10 | Vanilla debounced filter rebuilt from blank file in ≤12 min, twice |
| **U5** React core (state/props/keys/render) | **P1 P3 P4** → S5 Counter, S2 Search filter, S8 Accordion/Tabs | All three built ≤10 min each; zero key warnings in console |
| **U6** hooks + the three traps | **P5** → S7 Timer, S10 Debounced input, Modal outside-click, custom `useDebounce`/`useFetch` | Every effect has a correct cleanup; you can name the trap each one avoids |
| **U7** Redux / RTK | RTK counter slice + todo slice | Store wired, `useSelector`/`useDispatch` correct, reducers pure |
| **U8** ES6 | *(no standalone build)* — destructured props + spread used throughout S1–S10 | Props destructured in every component you write from here on |
| **U9** React Router | 2-page app · `/product/:id` · protected route | All three routes work including a deep-link refresh |
| **U10** build tooling | *(no build)* | — |
| **U11** React 19 | `<form action={…}>` + `useActionState` version of S3 | Form submits without `onSubmit`; pending state shown via `useFormStatus` in a **child** |
| **U12** HTML/CSS | responsive card grid (flexbox + one media query) | Grid reflows at breakpoint without horizontal scroll |
| **CAPSTONE** | after U6 | **S3 Form validation + S4 Pagination** — the two densest edge-case tasks | Both pass every edge case in the Part III table, from scratch, in ≤25 min each |

**Sequencing note:** S4 Pagination is deliberately held to the capstone. It is the most test-case-dense task
in the corpus (off-by-one boundaries everywhere) and it is the best possible rehearsal for how Mettl grades.

---

## PART V — REVISED TIME ALLOCATION (coding is now confirmed)

Split the total budget **60% theory / 40% coding**. Within each unit, theory-then-build.

| Unit | Theory | Coding gate | Unit total (of whole budget) |
|---|---|---|---|
| U1 identity | 4% | 4% (S1) | 8% |
| U2 execution/closures | 6% | 3% | 9% |
| U3 async/event loop | 6% | 4% (S6) | 10% |
| U5 React core | 10% | 8% (S5,S2,S8) | 18% |
| U6 hooks + traps | 10% | 9% (S7,S10,modal,hooks) | 19% |
| U7 Redux/RTK | 7% | 3% | 10% |
| U4 DOM/vanilla | 3% | 4% | 7% |
| U9 Router | 3% | 2% | 5% |
| U8 ES6 | 3% | — | 3% |
| U11 React 19 | 2% | 1% | 3% |
| U10 build tooling | 2% | — | 2% |
| U12 HTML/CSS | 1% | 1% | 2% |
| **Capstone** (S3 + S4) | — | 4% | **4%** |

**Compression rule (unchanged in spirit):** shed from the bottom — U12 → U10 → U11 → U9 → U4.
**Never** compress U5, U6, U3, or the capstone. Between them they carry both the MCQ mass *and* every
primitive the build task will demand.

### Session shape, revised
```
00–05  Error-log review (misses only, closed book)
05–25  MODEL + MECHANISM — canonical read, hand-trace one snippet
25–45  DRILL — MCQs closed-book at 80 s/question
45–75  BUILD — the unlocked task, timer running, from a blank file
75–85  EDGE PASS — run the edge-case list from Part III against your own build
85–90  PROOF — 60 s aloud; log every miss and every edge case you forgot
```
**The EDGE PASS block is non-negotiable.** It is a direct simulation of the hidden test cases, and it is the
difference between a 60% and a 95% on the coding question.

---

## PART VI — EXAM-DAY PROTOCOL FOR THE BUILD TASK

Assume ~20–30 minutes for the coding question inside a 50–60 minute paper. Spend it like this:

1. **0–3 min — Read and extract the contract.** Write down, verbatim, every ID, class, `data-testid`, button
   label and text string the prompt specifies. **These are graded. Your naming is not.**
2. **3–5 min — Name the primitives.** "This is P1 + P3 + P7." Now you already know the shape of the answer.
3. **5–15 min — Ship the baseline.** Simplest correct version. No CSS, no polish, no abstraction.
   **Run it.** Partial credit banked.
4. **15–22 min — Edge pass.** Walk the Part III checklist for that task type: empty · zero results · single
   item · first/last boundary · duplicate · null/undefined · whitespace-only. Each one you handle is a
   hidden test case bought.
5. **22–25 min — Hygiene.** Remove `console.log`. Confirm every specified selector still exists and is spelled
   exactly right. Confirm keys are stable ids, not array indices. Run once more.
6. **Never** refactor a passing solution for elegance. There are no style marks in an auto-graded round.

### Five failure modes that cost real candidates the round
- Renaming an element the prompt specified → every assertion on it fails → near-zero despite working UI.
- Building the pretty version first, running out of time, submitting nothing runnable.
- Mutating an array with `push`/`splice` → no re-render → "my code works but nothing updates."
- `setInterval` with no `clearInterval` → double-speed timer after a re-click, plus an unmount leak.
- Array-index keys on a list with delete → wrong row's state persists → silent, confusing assertion failures.

---

## PART VII — PRACTICE RESOURCES (build-focused; one per job)

- **PRIMARY DRILL SET — [sanchit0496/reactjs-machine-coding-challenges](https://github.com/sanchit0496/reactjs-machine-coding-challenges)** — 41 challenges with solutions. **Do not do all 41.** Do exactly: Todo List, Star Rating, Pagination, Accordion, Form Validation, Countdown Timer, Typeahead Debounce, useDebounce, Progress Bar, Shopping Cart. That is your Tier S.
- **STRUCTURED LIST — [codinggita react coding round](https://github.com/codinggita/full_stack_development_2025/blob/main/interview/machine_coding/02.react_coding_round.md)** — 17 tasks already mapped to the concept each tests; the Router and RTK sections are the cleanest versions of those five variants.
- **GRADING MINDSET — [GreatFrontEnd: Machine Coding Round guide](https://www.greatfrontend.com/blog/machine-coding-round)** — read once for the evaluation dimensions; ignore its live-interview framing.
- **CANONICAL PATTERNS — [react.dev/learn](https://react.dev/learn)** — *Updating Arrays in State*, *Updating Objects in State*, *Sharing State Between Components*, *You Might Not Need an Effect*. These four pages are literally P2, P3 and P5.
- **SANDBOX — [StackBlitz](https://stackblitz.com/) or Vite locally.** Build from a **blank file every time.** Re-opening yesterday's solution and editing it teaches recognition, not recall — the exact failure mode this whole plan exists to prevent.
- **VANILLA INSURANCE — [javascript.info/forms-controls](https://javascript.info/forms-controls) + [event-delegation](https://javascript.info/event-delegation)** — enough for the HTML/CSS/JS-tab variant.

### Anti-resources for the coding round
Grinding all 41 challenges (breadth without depth — the primitives repeat) · LeetCode DSA (wrong instrument;
this is a UI build round, not algorithms) · animation-heavy showpieces (unassertable, therefore unasked) ·
copying solutions to "understand" them (code-similarity checks aside, it builds zero recall).

---

## THE FOUR CODING GATES (mirror of the theory gates in file 8)

1. **Primitive gate** — write P1, P2, P3 and P5 from memory in under 5 minutes total, no reference.
2. **Speed gate** — S1 Todo and S2 Search filter, each from a blank file, each in ≤10 minutes.
3. **Edge gate** — S4 Pagination passing all five boundary cases in Part III, first attempt, no debugging round.
4. **Cleanup gate** — S7 Timer and S10 Debounce with correct cleanup, verified by unmounting and watching the console stay silent.

Fail a gate → rebuild that task from blank. Do not advance on a failed gate.
