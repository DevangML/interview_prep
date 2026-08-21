# The Exhaustive Syllabus v3 — Mercer Mettl OA
### Accenture · Custom Software Engineer (React.js) · Req ATCI-R1-S2060748 · Pune · 3+ yrs · LATERAL

> **Method:** Reconstructed from Mercer|Mettl's *own published competency taxonomy* for each React/front-end
> test product (Mettl sells tests as named skill-libraries with sub-skills listed on the product page), then
> intersected with the Accenture JD, then extended by first-principles derivation.
> This supersedes files 3, 5 and 6. File 5 (fresher AXIS pattern) is **void for this requisition**.

---

## LAYER 0 — THE FORMAT MODEL (what test object are you actually sitting?)

Mettl does not sell "the Accenture test." Accenture picks a product (or a custom blend) from Mettl's library.
Four products are plausible for this requisition. Published specs (from mettl.com product pages):

| # | Mettl product | Structure | Duration | Exp band | P(chosen) | Why |
|---|---|---|---|---|---|---|
| **A** | **React Redux Developer Test** | **36 MCQ, no coding** | 50 min | **2–5 yrs** | **~40%** | Exp band matches "3+ yrs" exactly. MCQ-only = cheapest to auto-screen at Accenture volume. |
| **B** | **ReactJS Online Test** | **19–20 MCQ + 1 front-end simulator coding** | 60 min | 1–3 yrs | ~30% | The default "React" SKU. Band slightly junior but commonly used anyway. |
| **C** | **Front-end Developer (Experienced)** | 19 MCQ + 1 coding | 60 min | 5–10 yrs | ~15% | Adds HTML5/CSS3 weight. Used when JD says "responsive design" — **yours does**. |
| **D** | Accenture custom blend from same libraries | 25–40 MCQ ± 1 coding | 45–60 min | — | ~15% | Enterprise clients routinely re-mix. Topic pool is still the union below. |

**Planning envelope: 19–40 MCQs in 45–60 minutes; a coding question is CONFIRMED present** (candidate-verified,
2026-08-20 — this overrides the earlier ~50% estimate; see `9_CODING_ROUND_PLAYBOOK.md`).
Effective pace: **75–95 seconds per MCQ.** Speed is a scored variable, not a comfort.

### Two format facts that change how you prepare
1. **A coding question, if it appears, runs on Mettl's "Front-end Simulator", which Mettl states assesses
   candidates "exclusively on HTML, CSS & JavaScript concepts"** with pre-built auto-graded test cases and a
   JS error console. → **Assume vanilla DOM JS, not React, in the IDE.** (File 1's vanilla-JS block was
   correct instinct; keep it, shrink it.)
2. Mettl's React question banks are **version-lagged but React-19-tagged**: the ReactJS product page
   explicitly lists *Server Components, createRoot/hydrateRoot, Actions, new hooks*. So React 19 is real
   but thin — treat it as ~2–4 questions, not a pillar.

---

## LAYER 1 — EXPLICIT SYLLABUS (verbatim from Mettl's published sub-skill lists)

Everything below is *named by Mettl on the product pages*. This is the non-negotiable core.

### 1.1 ReactJS Basics *(both React SKUs)*
`ReactJS components` · `Events` · `ReactJS functions` · `Props` · `Pure Component` · `Render method` · `State`
Plus, from the React-Redux SKU: `State application` · `Props application` · `Lifecycle application` ·
`Virtual DOM vs Actual DOM` · `Higher Order Components`
Plus, from the Front-end (Experienced) SKU: `React – JSX` · `React – Rendering` · `React – Lifecycle`

### 1.2 React Tools & Ecosystem *(ReactJS SKU)*
`React 19 – JavaScript` · `React Router` · `Redux` · `Flux` · `Webpack`

### 1.3 React 19 Concepts *(ReactJS SKU)*
`Server Components` · `Rendering: createRoot, hydrateRoot` · `Actions` · `New hooks`

### 1.4 Redux *(React-Redux SKU)*
`Pure functions` · `Actions` · `Reducers` · `Store` · `Data flow` · `React-Redux integration`

### 1.5 ECMAScript / ES6 *(React-Redux SKU)*
`Template and extended literals` · `Arrow functions` · `De-structuring assignments` · `Modules` · `Classes`

### 1.6 JavaScript Basics *(ReactJS + JS SKUs)*
`Scopes and namespaces` · `Parsing` · `Events and event handlers` · `Functions` · `Arrays` ·
`Object usage and properties` · `Forms` · `HTML` · `Links`
Front-end (Experienced) adds: `JavaScript – DOM` · `JavaScript – Asynchronous` · `JavaScript – State management`

### 1.7 HTML5 *(only if product C/D — but JD says "responsive design", so do not skip)*
`HTML5 Semantics` · `HTML5 API` · `HTML5 Elements` · `HTML5 Attributes` · `HTML5 Multimedia`

### 1.8 CSS3 *(same condition)*
`CSS3 Responsive design` · `CSS3 Flexbox` · `CSS3 Layout` · `CSS3 Backgrounds` · `CSS3 Text & font styling`
(basic SKU also lists: margins, borders, shadows, transformations)

### 1.9 Hands-on Programming
`Front-end Simulator – JavaScript` — auto-graded via pre-built test cases; JS errors surfaced in a console.

---

## LAYER 2 — IMPLICIT SYLLABUS (first principles you must own to *decode* Layer 1)

Mettl asks Layer 1 topics, but the *distractors* are built out of Layer 2. This is where tests are lost.
Read each row as: **you cannot answer X without already owning Y.**

### 2.A The JavaScript memory & identity model → unlocks Props, PureComponent, Redux purity, memo
- Primitives vs objects; the heap and the reference/handle
- **Pass-by-sharing** (not "by reference"): reassigning a param ≠ mutating it
- `===` vs `Object.is` vs deep equality; why `{} !== {}` and `[] !== []`
- **Shallow comparison** as an algorithm — the exact loop `React.PureComponent`/`React.memo` runs
- Immutability: structural sharing, why spread is shallow, why nested spread is required
- Consequence chain: *mutate state → same reference → bail-out → no re-render.* Memorise this chain, not the fact.

### 2.B Execution model → unlocks Scopes, Functions, Async, Hooks, Event loop questions
- Execution context, the call stack, lexical environment records
- **Hoisting**: `var` vs `let/const`, the Temporal Dead Zone, function vs class declaration hoisting
- **Closures**: a function + the environment it captured; why every render creates a *new* closure
- `this`: the four binding rules (default / implicit / explicit / `new`), lost `this` on callback handoff,
  `call`/`apply`/`bind`, arrow functions capturing lexical `this`
- **Event loop**: call stack → microtask queue (Promises, `queueMicrotask`) → macrotask queue
  (`setTimeout`, I/O, `requestAnimationFrame` caveat). Output-ordering questions are pure Mettl currency.
- Promise states, `then` chaining, `async/await` as syntax over the same machine, `Promise.all/race/allSettled`

### 2.C The DOM & browser → unlocks Events, DOM, Forms, Links, the coding simulator
- The DOM as a tree; nodes vs elements; parsing → DOM+CSSOM → render tree → layout → paint → composite
- **Event propagation**: capture → target → bubble; `stopPropagation` vs `preventDefault` vs
  `stopImmediatePropagation`; `event.target` vs `event.currentTarget`
- **Event delegation** — and therefore why React attaches one listener at the root container (React 17+),
  and what a **SyntheticEvent** is
- Forms: controlled vs uncontrolled, default form submission and page reload, `FormData`
- Reflow vs repaint; why DOM writes are the expensive part (this is the *reason* the VDOM exists)

### 2.D Rendering theory → unlocks Virtual DOM, render method, reconciliation, keys, lifecycle
- Why a diff is cheaper than a re-layout; the O(n³)→O(n) heuristic and its two assumptions
- **Keys**: identity across renders; why array index keys corrupt state on insert/reorder/delete
- Render phase (pure, interruptible) vs commit phase (side-effectful) — the actual reason
  "render must be pure" and why `useEffect` exists at all
- Mount / update / unmount as the *only* three real lifecycle events; class methods and hooks are two
  spellings of the same three
- Batching: React 18+ automatic batching everywhere; why two `setState`s with stale reads yield +1 not +2
- Strict Mode double-invoke in development — a probe for missing cleanup, not a bug

### 2.E Data-flow theory → unlocks Flux, Redux, Context, HOCs, lifting state
- **Unidirectional data flow** as the founding constraint; what two-way binding cost Angular 1
- Flux: action → **dispatcher** → *multiple* stores → view. Redux: action → *single* store → reducer, **no dispatcher**
- **Pure function**: same input → same output, no observable side effect, no I/O, no `Date.now()`/`Math.random()`
- Reducer as a fold: `(state, action) => newState`; why it must be pure (time-travel, replay, SSR, tests)
- Middleware as function composition (`store => next => action => …`) — the shape thunk/saga plug into
- Composition patterns: HOC (function of a component) vs render props vs custom hooks; what each solves
- Prop drilling and the two escapes (Context, store) plus each escape's re-render cost

### 2.F Module & build theory → unlocks Webpack, Babel, modules, code splitting
- CommonJS vs ESM; named vs default exports; static analysability → **tree shaking**
- Why browsers cannot execute JSX: JSX is *syntax*, transpiled by Babel to `React.createElement` /
  the React 17+ automatic runtime `jsx()` call
- Dependency graph → entry → loaders (transform) vs plugins (lifecycle) → chunks → output
- Code splitting = dynamic `import()` → separate chunk → `React.lazy` + `<Suspense>`
- Dev server / HMR / source maps; Vite (esbuild + native ESM) vs Webpack — why Vite is faster in dev

### 2.G Routing theory → unlocks React Router
- MPA vs SPA; `history.pushState` and `popstate`; why a hard refresh on a deep route 404s without server rewrite
- Route matching, dynamic segments (`:id`), nested routes and **`<Outlet />`** as the injection point
- `<Link>` vs `<a>` (preventing full reload); `useNavigate`, `useParams`, `NavLink` active state
- Route-level code splitting and protected/guarded routes

### 2.H Layout theory → unlocks CSS3 flexbox/layout/responsive
- Box model + `box-sizing`; block vs inline vs inline-block formatting contexts
- Cascade, specificity, inheritance; what actually wins
- Flexbox axes: `flex-direction` defines main axis; `justify-content` = main, `align-items` = cross;
  the `flex: grow shrink basis` shorthand and `flex: 1` expansion
- Positioning and stacking contexts; margin collapse
- Responsive: the viewport meta tag, media queries, mobile-first, relative units (`rem`/`em`/`%`/`vw`), fluid images

---

## LAYER 3 — SUPPLEMENTARY (not published, but live in the same libraries — ranked by real risk)

| Risk | Topic | Why it can appear |
|---|---|---|
| **HIGH** | `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`, `useReducer` | "New hooks" is explicitly listed; hooks dominate every modern React bank regardless of SKU |
| **HIGH** | **Rules of Hooks** (top level only, React functions only) + why (call-order indexing) | Classic single-MCQ, near-guaranteed |
| **HIGH** | Stale closure in `useEffect`; missing dep array; missing cleanup → memory leak | The three canonical hook traps |
| **HIGH** | Controlled vs uncontrolled inputs | Named in JD-adjacent skills and in every bank |
| **HIGH** | Conditional-render traps: falsy `0` bleed, `&&` vs ternary, rendering `null/undefined/false/NaN` | Cheap to author, brutal to the unprepared |
| **MED** | Context API vs Redux; Redux Toolkit (`createSlice`, Immer, `createAsyncThunk`) | RTK is the 2026 default; "Redux" bank items increasingly RTK-flavoured |
| **MED** | `React.memo`, lazy/`Suspense`, virtualization, debounce/throttle | JD literally says "optimize application performance" |
| **MED** | Error boundaries; Portals; `forwardRef`; fragments; `key` warnings | Standard "advanced React" MCQ tail |
| **MED** | HTTP/fetch: verbs, status codes, `fetch` vs `axios`, `AbortController`, CORS preflight | "state management" + async JS bleed into this |
| **MED** | TypeScript surface (`interface` vs `type`, generics in props, `React.FC`) | Increasingly bundled into enterprise React blends |
| **MED** | Git: merge vs rebase, branching, conflict resolution | JD names "version control systems and collaborative workflows" |
| **LOW** | Testing: Jest, React Testing Library queries, `act` | Rarely in screening MCQs, common in interview |
| **LOW** | Next.js / SSR / SSG / hydration mismatch | Only via `hydrateRoot` + Server Components edge |
| **LOW** | Web security: XSS via `dangerouslySetInnerHTML`, CSRF, token storage | Present in Accenture *fresher* bank; unlikely here |
| **LOW** | Accessibility: semantic landmarks, ARIA basics, label association | Rides in on "HTML5 semantics" |
| **~ZERO** | Pseudocode, quantitative aptitude, cloud (AWS/Azure), networking, DBMS/SQL | **Fresher-track only.** Do not spend an hour here. |

---

## LAYER 4 — HOW METTL ASKS (question archetypes, so you can pattern-match under time pressure)

1. **Output prediction** — "What is printed / rendered?" *(event loop ordering, closures, `setState` batching, falsy `0`)*
2. **Defect localisation** — "Why does this component re-render / not re-render / loop infinitely?"
3. **Definitional discrimination** — "Which statement about `useMemo` and `useCallback` is TRUE?" (2 plausible distractors)
4. **Code completion** — a snippet with a blank; pick the line
5. **Ordering / matching** — lifecycle ↔ hook equivalence; Flux ↔ Redux component mapping
6. **Negative framing** — "Which is NOT a valid…" (read the stem twice; this is where careless marks die)
7. **Simulator task** — build/repair a small DOM feature against hidden assertions on **exact IDs/classes given in the prompt**

### Standing exam heuristics
- Any snippet containing `useEffect` + `[]` + a state variable → **stale closure**, unless a functional updater is used.
- Any snippet with `.length &&` → **renders `0`**.
- Any two consecutive `setState({x: this.state.x+1})` → **+1, not +2**.
- Any `<Route>` child that doesn't render → **missing `<Outlet />`**.
- Any memoized child re-rendering → **a new function/object reference was passed**.
- Any handler losing `this` → **unbound method passed as callback**.
- On the simulator: **copy the IDs from the prompt verbatim.** Auto-graders assert on selectors, not on beauty.

---

## LAYER 5 — WEIGHTED STUDY BUDGET (for a 36-MCQ / 50-min worst case)

| Block | Expected Qs | Share of study time |
|---|---|---|
| React core (components/props/state/JSX/render/lifecycle/keys/VDOM) | 10–13 | **30%** |
| Hooks + the three traps | 6–9 | **20%** |
| Redux / Flux / data flow | 5–7 | **15%** |
| Core JS + ES6 + event loop + closures + `this` | 6–8 | **20%** |
| React Router | 2–3 | 5% |
| Webpack/Babel/build | 1–2 | 4% |
| React 19 (Server Components, Actions, createRoot/hydrateRoot) | 2–4 | 3% |
| HTML5 + CSS3 (only if product C/D) | 0–6 | 3% |

---

## OPEN UNCERTAINTIES (stated, not hidden)
- **Which SKU Accenture bought is not publicly knowable.** Layer 1 is the *union* of the plausible SKUs, so
  preparing it dominates every configuration. Format numbers are a range, not a fact.
- Mettl's own pages disagree with their catalogue listing on question counts (catalogue says ReactJS = 36Q/50min;
  product page says 19–20Q + 1 code/60min). Treat all counts as an envelope.
- ~~Whether a coding question appears is ~coin-flip.~~ **RESOLVED: confirmed present.** Prepare the Tier S build
  set in `9_CODING_ROUND_PLAYBOOK.md`, plus one vanilla-JS pattern as sandbox insurance.

**Sources:** [Mettl ReactJS Test](https://mettl.com/test/reactjs-assessments-test/) ·
[Mettl React-Redux Test](https://mettl.com/en/test/react-redux-developer-test/) ·
[Mettl Front-end (Experienced)](https://mettl.com/en/test/front-end-developer-assessment-for-experienced-professionals/) ·
[Mettl Front-end Developer](https://mettl.com/en/test/front-end-skills-assessment/) ·
[Mettl JS Programming Skills](https://mettl.com/test/javascript-programming-skills-test/) ·
[Mettl IT test catalogue](https://mettl.com/core-functions/it-tests/web-developer-test/) ·
[Accenture JD ATCI-R1-S2060748](https://www.accenture.com/in-en/careers/jobdetails?id=ATCI-R1-S2060748_en) ·
[Glassdoor: Accenture 3+ yr Mettl OA report](https://www.glassdoor.co.in/Community/tech-india/i-just-took-the-online-assessment-for-accenture-node-js-profile-3-years-of-experience-on-the-mettl-platform-the-test-had-30-bozp-5)
