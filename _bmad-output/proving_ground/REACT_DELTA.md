# The React Delta — Everything React-Exclusive on Top of Vanilla Mastery

**Date:** 2026-08-31 · **Context:** Accenture Mettl OA ~5 Sept · 36 MCQ / 50 min
**Companion to:** `SYLLABUS.md` (the 282-row vanilla ledger)

---

> ## ⚠️ SUPERSEDED as a topic list — 2026-08-31
>
> The 140 topics here now live in **`SYLLABUS.md`** as tracked rows **`R001`–`R122`** (React) and
> **`X01`–`X34`** (Redux/Flux), bound to quests Q13–Q16 and counted in the coverage ledger.
> **Do not study from the tables below** — they carry no row IDs and no completion state.
>
> This file remains valid ONLY for its analysis: **Part 0** (is the layer thin — the 9/11/81% split),
> **Part 1** (time-to-master model), **Part 3** (the 27 topics vanilla pays for) and
> **Part 4** (OA triage order). Read those; take topics from the master syllabus.


## Part 0 — "The React layer is thin." Is it true?

**Half true, and the half that's false is the half the OA tests.**

| Claim | Verdict |
|---|---|
| "React is mostly JavaScript you already know" | **True for mechanism.** Hooks are closures. Deps arrays are `Object.is`. State updates are immutability. `memo` is referential identity. `this` in class handlers is just `this`. |
| "So vanilla mastery gets me most of React" | **False for vocabulary.** You can own every closure in existence and still not know that `getDerivedStateFromProps` is static, that error boundaries are class-only, or what a Flux *dispatcher* is. |

**The split, counted from the 140 topics below:**

| Category | Count | Share |
|---|---|---|
| **V** — Vanilla gives it free; you only learn the React *name* | 12 | 9% |
| **V+R** — Mechanism is vanilla, API surface is React | 15 | 11% |
| **R** — React-exclusive; derives from nothing you already know | 113 | **81%** |

> **The conclusion that matters:** vanilla mastery makes React *fast to understand* and does
> almost nothing for *MCQ recall*. An MCQ asks "which lifecycle method runs before the DOM
> updates?" — no amount of closure mastery produces `getSnapshotBeforeUpdate`.
>
> **React is thin in depth and thick in surface. The OA tests surface.**

---

## Part 1 — Time to master

### Cold vs on-top-of-vanilla

| Starting point | To pass a React MCQ OA | To be interview-defensible |
|---|---|---|
| No JS foundation | ~60–80 h | ~100 h+ |
| **On vanilla mastery** | **~25–27 h** | **~45–50 h** |

Your own React campaign cost model says **35 h OA-ready / 57 h fully ready** — and that figure
*already includes* ~8–10 h of vanilla insurance (its Q1, Q2, Q3, Q7, Q9 are execution model,
async, ES6 and DOM). Strip the vanilla you'd already own and the React-exclusive remainder is
**~25–27 h**.

**So: vanilla mastery roughly halves React.** That is the real value of the Proving Ground — but
it is a *multiplier on a later investment*, not a substitute for it.

### A React project, specifically

| Deliverable | On vanilla mastery |
|---|---|
| Tutorial-grade CRUD app | ~8–12 h |
| Portfolio-grade app (routing, state, data, tests) | ~30–40 h |
| Something that survives a senior interrogation | ~50–60 h |

---

## Part 2 — The exhaustive React-exclusive list (140)

**Legend** — **V** = vanilla gives it free · **V+R** = vanilla mechanism, React API ·
**R** = React-exclusive · **OA** = Mettl frequency (H/M/L)

### G1 · Paradigm & Rendering Model (12)

| # | Topic | Type | OA |
|---|---|---|---|
| 1 | Declarative vs imperative UI | R | M |
| 2 | Virtual DOM — what it is and what it is *not* (it is not "faster than the DOM") | R | **H** |
| 3 | Reconciliation algorithm | R | **H** |
| 4 | The two diffing heuristics: different element type ⇒ discard subtree; keys give stable identity | R | **H** |
| 5 | `key` prop — why index keys corrupt state on reorder | V+R | **H** |
| 6 | Render phase vs commit phase | R | M |
| 7 | Fiber architecture — interruptible work units | R | L |
| 8 | One-way / unidirectional data flow | R | **H** |
| 9 | Composition over inheritance | R | M |
| 10 | Batching — React 17 (events only) vs 18 (automatic everywhere) | R | **H** |
| 11 | `StrictMode` double-invoke in development | R | M |
| 12 | Element vs component vs instance | R | **H** |

### G2 · JSX (10)

| # | Topic | Type | OA |
|---|---|---|---|
| 13 | JSX compiles to `React.createElement` / `jsx()` | R | **H** |
| 14 | Single root requirement · Fragments `<></>` | R | **H** |
| 15 | `className`, `htmlFor`, camelCase DOM props | R | **H** |
| 16 | Expressions only — no `if`/`for` statements in braces | R | **H** |
| 17 | Conditional rendering: `&&`, ternary, early return | R | **H** |
| 18 | The `{count && <X/>}` trap — renders `0` | **V+R** | **H** |
| 19 | Rendering lists with `.map` + keys | V+R | **H** |
| 20 | `dangerouslySetInnerHTML` | R | M |
| 21 | `children` as a prop | R | M |
| 22 | Comments and whitespace handling in JSX | R | L |

### G3 · Components & Props (10)

| # | Topic | Type | OA |
|---|---|---|---|
| 23 | Function vs class components | R | **H** |
| 24 | Props are read-only | V | **H** |
| 25 | `defaultProps` vs default parameters | R | M |
| 26 | `PropTypes` validation | R | M |
| 27 | `React.Children` utilities (`map`, `count`, `only`) | R | L |
| 28 | Keyed Fragments (`<React.Fragment key>`) | R | M |
| 29 | Portals — render outside the parent DOM node, events still bubble through React tree | R | M |
| 30 | **Error boundaries — class-only, no hook equivalent** | R | **H** |
| 31 | `React.memo` | R | **H** |
| 32 | Capitalisation rule — lowercase = DOM element | R | **H** |

### G4 · Class Components & Lifecycle (16) — *Mettl explicitly tests this*

| # | Topic | Type | OA |
|---|---|---|---|
| 33 | `constructor` + `super(props)` — why `props` must be passed | R | **H** |
| 34 | `this.state` initialisation | R | **H** |
| 35 | `setState` is asynchronous and batched | R | **H** |
| 36 | Functional updater `setState(prev => …)` | V+R | **H** |
| 37 | `setState` second-argument callback | R | M |
| 38 | `render()` must be pure | R | **H** |
| 39 | `componentDidMount` | R | **H** |
| 40 | `shouldComponentUpdate` | R | **H** |
| 41 | `componentDidUpdate` — and the infinite-loop trap | R | **H** |
| 42 | `componentWillUnmount` | R | **H** |
| 43 | `static getDerivedStateFromProps` | R | **H** |
| 44 | `getSnapshotBeforeUpdate` — runs *before* DOM mutation | R | M |
| 45 | `getDerivedStateFromError` / `componentDidCatch` | R | M |
| 46 | Legacy `UNSAFE_componentWillMount / WillReceiveProps / WillUpdate` | R | M |
| 47 | `PureComponent` — shallow compare | R | **H** |
| 48 | `this` binding in class handlers (bind in constructor vs class field) | **V** | **H** |

**Full mount / update / unmount order is a guaranteed MCQ. Memorise the sequence, not the prose.**

### G5 · Hooks (25)

| # | Topic | Type | OA |
|---|---|---|---|
| 49 | Rules of Hooks — top level only, components/custom hooks only | R | **H** |
| 50 | *Why* the rules exist — hooks are a call-order-indexed list | R | **H** |
| 51 | `useState` | R | **H** |
| 52 | Lazy initialiser `useState(() => expensive())` | R | M |
| 53 | Functional update form | V+R | **H** |
| 54 | `useEffect` | R | **H** |
| 55 | Deps array — compared with `Object.is` | **V+R** | **H** |
| 56 | Cleanup function — runs before re-run *and* on unmount | V+R | **H** |
| 57 | Effect timing — after paint, asynchronous | R | **H** |
| 58 | `[]` vs no array vs `[deps]` — three different behaviours | R | **H** |
| 59 | `useLayoutEffect` — synchronous, before paint | R | M |
| 60 | `useContext` | R | **H** |
| 61 | `useReducer` | R | **H** |
| 62 | `useCallback` | R | **H** |
| 63 | `useMemo` | R | **H** |
| 64 | Referential identity — why these hooks exist at all | **V** | **H** |
| 65 | `useRef` as a mutable box that does not trigger re-render | R | **H** |
| 66 | `useRef` for DOM access | R | **H** |
| 67 | `forwardRef` | R | M |
| 68 | `useImperativeHandle` | R | L |
| 69 | Custom hooks — extraction and composition | R | **H** |
| 70 | **The stale closure trap** — the single most common hooks bug | **V+R** | **H** |
| 71 | `useId` | R | L |
| 72 | `useTransition` / `useDeferredValue` | R | L |
| 73 | `useSyncExternalStore` / `useDebugValue` | R | L |

### G6 · State Management, Flux & Redux (18) — *Mettl tests Flux by name*

| # | Topic | Type | OA |
|---|---|---|---|
| 74 | Local state vs lifted state | R | **H** |
| 75 | Prop drilling | R | **H** |
| 76 | Context API — `createContext`, `Provider`, consumer | R | **H** |
| 77 | Context re-render problem — every consumer re-renders | R | M |
| 78 | Context is not a state manager | R | M |
| 79 | **Flux architecture** — Action → Dispatcher → Store → View | R | **H** |
| 80 | Flux vs Redux — Redux has one store, no dispatcher | R | M |
| 81 | Redux three principles — single source of truth, read-only state, pure reducers | R | **H** |
| 82 | Store, actions, action creators | R | **H** |
| 83 | Reducers must be pure and immutable | **V+R** | **H** |
| 84 | `dispatch` | R | **H** |
| 85 | Middleware — the `store => next => action` signature | R | M |
| 86 | `redux-thunk` | R | M |
| 87 | `redux-saga` (awareness only) | R | L |
| 88 | `react-redux`: `Provider`, `useSelector`, `useDispatch` | R | **H** |
| 89 | Legacy `connect` / `mapStateToProps` / `mapDispatchToProps` | R | M |
| 90 | Redux Toolkit: `createSlice`, `configureStore`, `createAsyncThunk` | R | M |
| 91 | Immer — why RTK lets you "mutate" · selectors & `reselect` · normalisation | R | M |

### G7 · Performance (9)

| # | Topic | Type | OA |
|---|---|---|---|
| 92 | The four re-render causes: state, props, context, parent re-render | R | **H** |
| 93 | `React.memo` with a custom comparator | R | **H** |
| 94 | When `useMemo`/`useCallback` *hurt* — they are not free | R | **H** |
| 95 | Inline objects and arrow props break memoisation | **V+R** | **H** |
| 96 | Key stability and list performance | R | **H** |
| 97 | `React.lazy` + `Suspense` — code splitting | R | M |
| 98 | Windowing / virtualisation (concept) | R | L |
| 99 | Profiler API and the DevTools Profiler | R | M |
| 100 | Why reconciliation is O(n) not O(n³) | R | M |

### G8 · Routing (6)

| # | Topic | Type | OA |
|---|---|---|---|
| 101 | Client-side routing — no full page reload | R | M |
| 102 | `BrowserRouter` vs `HashRouter` (and why static hosting cares) | V+R | M |
| 103 | `Routes` / `Route` / nested routes / `Outlet` | R | M |
| 104 | `useParams` / `useNavigate` / `useLocation` / `useSearchParams` | R | M |
| 105 | `<Link>` vs `<a>` | R | M |
| 106 | Protected-route pattern | R | L |

### G9 · Forms (5)

| # | Topic | Type | OA |
|---|---|---|---|
| 107 | Controlled components — value + onChange | R | **H** |
| 108 | Uncontrolled components with refs | R | M |
| 109 | `defaultValue` vs `value` — and the read-only-input warning | R | M |
| 110 | Handling many inputs with one handler | R | M |
| 111 | Formik / React Hook Form (awareness) | R | L |

### G10 · Data Fetching (5)

| # | Topic | Type | OA |
|---|---|---|---|
| 112 | The `useEffect` fetch pattern | R | **H** |
| 113 | Abort/cleanup on unmount — the "state update on unmounted component" warning | **V+R** | **H** |
| 114 | Race conditions and stale responses | **V+R** | M |
| 115 | Loading / error / empty state handling | R | M |
| 116 | React Query / SWR (awareness) | R | L |

### G11 · Build Tooling (10) — *Mettl tests Webpack by name*

| # | Topic | Type | OA |
|---|---|---|---|
| 117 | Webpack `entry` | R | M |
| 118 | Webpack `output` (`path`, `filename`, `publicPath`) | R | M |
| 119 | Loaders — `babel-loader`, `css-loader`, `style-loader`; **right-to-left order** | R | **H** |
| 120 | Plugins — `HtmlWebpackPlugin`, `MiniCssExtractPlugin` | R | M |
| 121 | `mode: development` vs `production` | R | M |
| 122 | `devServer` + Hot Module Replacement | R | M |
| 123 | Code splitting / `SplitChunksPlugin` | R | M |
| 124 | Babel — `@babel/preset-react`, classic vs automatic JSX runtime | R | M |
| 125 | Vite contrast — native ESM dev server, no bundling in dev | R | L |
| 126 | Source maps | R | L |

### G12 · Testing (5)

| # | Topic | Type | OA |
|---|---|---|---|
| 127 | Jest basics — `describe`/`it`/`expect`, mocks | R | L |
| 128 | React Testing Library queries — `getBy` vs `queryBy` vs `findBy` | R | M |
| 129 | `user-event` vs `fireEvent` | R | L |
| 130 | Testing custom hooks | R | L |
| 131 | Snapshot testing and why it rots | R | L |

### G13 · Patterns & Ecosystem (9)

| # | Topic | Type | OA |
|---|---|---|---|
| 132 | Higher-Order Components | V+R | M |
| 133 | Render props | R | M |
| 134 | Compound components | R | L |
| 135 | Controlled vs uncontrolled component design | R | M |
| 136 | Container / presentational split | R | L |
| 137 | CSR vs SSR vs SSG · hydration | R | M |
| 138 | Next.js (awareness) | R | L |
| 139 | PropTypes vs TypeScript | R | L |
| 140 | React 18/19 delta — concurrent rendering, Actions, `use()` | R | M |

---

## Part 3 — The 27 topics vanilla actually pays for

These are the ones where deep JS makes React nearly free. **Learn the React name and move on:**

`key` identity · the `0 &&` render trap · `.map` for lists · props read-only · functional
`setState` · `this` binding in class handlers · deps array `Object.is` · effect cleanup ·
referential identity · the stale closure · inline-prop memo breakage · reducer purity/immutability ·
abort-on-unmount · race conditions · `HashRouter` rationale · HOCs as higher-order functions

**Everything else on the list must be memorised.** That is the honest shape of "thin."

---

## Part 4 — OA triage

If time is short, the ordering is not negotiable. **High-frequency first, and stop when time runs out.**

| Priority | Groups | Why |
|---|---|---|
| **1** | G4 Lifecycle · G5 Hooks | The densest MCQ ground. Lifecycle order alone is worth several questions. |
| **2** | G1 Rendering · G2 JSX | Virtual DOM, reconciliation, keys, batching — asked every time. |
| **3** | G6 Flux + Redux | Vendor-published as in scope. Flux terminology is free marks. |
| **4** | G11 Webpack · G7 Performance | Loader order and memo semantics are common. |
| **5** | G3 Components · G9 Forms | Controlled/uncontrolled, error boundaries. |
| **6** | G8 Routing · G10 Data · G13 Patterns | Lower yield. |
| **7** | G12 Testing | Lowest yield for an MCQ. Skip under pressure. |

---

## Part 5 — Where this leaves the Proving Ground

The Proving Ground is not wasted — it is **mistimed relative to this OA**.

- It builds the 19% of React that comes free, plus the entire foundation beneath it.
- It is the strongest asset you will own for the **technical rounds**, where "I instrumented the
  event loop" outperforms any React fact.
- It halves the cost of every React hour you spend afterwards.

**It is a post-OA asset. Park it, don't kill it.**
