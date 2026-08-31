# Live Ops Console — Feature → Topic Map

**Date:** 2026-08-31 · **React-first.** JS used extensively *through* React, not beside it.
**Companion to:** `SYLLABUS.md` (the 444-row ledger) · `sprint-change-proposal-2026-08-31.md`

---

## The product

A **live operations console** — a real-time monitoring dashboard over public data feeds. Someone
opens it on a wall screen or a second monitor and leaves it running all day. It ingests several
independent feeds, surfaces what needs attention, and stays responsive while doing it.

No backend. Public feeds only. The concrete feed (transit / seismic / markets / air quality) is
still open — it changes the entity model, not the architecture.

## What makes this binding (added 2026-08-31)

An earlier version of this map was inert — it described a mapping nothing enforced. Two mechanisms
now close that:

1. **`row_evidence`** — a row cannot be marked closed without naming a `{file, symbol}` in your
   source. *"I understand closures"* is not evidence; `src/feeds/health/monitor.js ::
   createFeedMonitor` is.
2. **NFRs** — every feature in `SAVE_GAME_STATE.json` carries non-functional requirements whose only
   purpose is to make its concepts unavoidable (5000+ rows under 200 DOM nodes · two mirror URLs per
   feed · one hand-written middleware · ConnectionManager **must** be a class). A feature that
   visibly works but misses its NFRs does not clear.

## The rule this map enforces

> **A concept earns a place in the product only if removing it breaks a feature.**
> Everything else goes to `kata/`.

Each feature below carries a **falsification line** — the specific thing that stops working. If a
feature can't produce one for a topic, that topic doesn't belong there.

## The split

| Destination | Rows | Share |
|---|---|---|
| **Product** (`src/`, 14 features) | **360** | 81% |
| **`kata/`** — no honest home in a React product | **77** | 17% |
| **OUT** — prepared spoken answer only | **7** | 2% |
| **Total** | **444** | |

---

# THE PRODUCT — 14 features

---

## F01 · Feed Ingestion Layer — 60 rows

**What it does.** Connects to 3+ independent public feeds. Each has different latency, reliability
and shape. Normalises them into one internal event stream with retry, backoff and cancellation.

**Why it exists.** A console with one feed is a widget. Multiple independent sources with different
failure modes is what makes it an *operations* console — and it is the single richest concept
surface in the project.

> **Falsification:** remove `Promise.allSettled` and one dead feed takes the whole dashboard down.
> Remove `AbortController` and a feed switch leaks the previous stream forever.

| Area | Rows | What lands here |
|---|---|---|
| **JS — async** | `J72`–`J77` `J79`–`J98` `J101` `J161` | The whole async syllabus. Call stack, task vs microtask, all four Promise combinators **used where each is genuinely correct**, async/await, sequential-vs-parallel, `fetch`, `AbortController` |
| **JS — functional** | `J30` `J37`–`J40` `J159` | HOF, currying, compose/pipe — the normalisation pipeline is literally `pipe(parse, validate, normalise)` |
| **JS — classes** | `J51`–`J54` | `Feed` base class, `PollingFeed`/`StreamFeed` subclasses, `FeedError`/`NetworkError` subclasses. `instanceof` in the retry handler |
| **JS — security** | `J135`–`J136` | Same-origin and CORS are **real here** — you will hit a preflight |
| **React** | `R099`–`R108` | Webpack: entry, output, loaders, plugins, mode, devServer, code splitting, Babel, source maps |
| **Redux** | `X21`–`X30` | Middleware `store => next => action`, `applyMiddleware`, thunk, async triad, saga awareness |

**Why each combinator is honest here:**
`Promise.all` — the initial config fetch, all must succeed · `allSettled` — the periodic multi-feed
poll, a dead feed must not kill the others · `race` — request timeout · `any` — mirror endpoints,
first healthy one wins.

---

## F02 · Live Metric Tiles — 28 rows

**What it does.** A grid of tiles updating at high frequency — value, delta, sparkline, threshold
state. Must hold 60fps while feeds push continuously.

**Why it exists.** This is the frame-budget pressure that makes performance work real instead of
theoretical.

> **Falsification:** remove `throttle`/rAF batching and the UI drops frames under load. Remove
> `React.memo` and every tile re-renders on every tick.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H09` `H38` | `data-*` for tile identity · inline SVG sparklines (`currentColor` for theming) |
| **CSS** | `C15`–`C19` `C26`–`C31` | Box model, `box-sizing`, margin collapsing, BFC, `display` · Flexbox container + items · Grid tracks, placement, container queries |
| **JS** | `J41` `J133` | Memoised derivations · `ResizeObserver` for tile-responsive sparklines |
| **React** | `R007` `R011`–`R012` `R051`–`R053` `R074`–`R078` `R081`–`R082` | Render vs commit phase · batching (17 vs 18) · element vs component · `useState` + lazy init + functional update · the four re-render causes · `memo` + comparator · when memo hooks hurt · inline props defeating memo · Profiler · Context re-render cost |

---

## F03 · Alert Stream — 20 rows

**What it does.** A virtualised, append-only log of events. Thousands of rows, only what's visible
in the DOM, auto-scroll with a pause-on-hover.

**Why it exists.** Volume forces virtualisation, and virtualisation forces key stability.

> **Falsification:** use index keys and pausing the stream corrupts every visible row. Skip
> virtualisation and 5,000 rows freeze the tab.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H04` `H10` `H37` | Semantic lists · entity escaping for feed-supplied text · `loading="lazy"` |
| **CSS** | `C56`–`C57` | Scroll containers, `overscroll-behavior` · `tabular-nums` so timestamps don't jitter |
| **JS** | `J65`–`J71` `J131` `J137` | Array creation & holes, all iteration methods, mutating vs non-mutating, `sort` comparator, `Map`/`Set`, `WeakMap`, iteration protocols · `IntersectionObserver` · **XSS — feed text is untrusted** |
| **React** | `R004`–`R006` `R019` `R079`–`R080` | Both diffing heuristics · `key` identity and the index-key bug · list rendering · `lazy`+`Suspense` · windowing |

---

## F04 · Entity Detail Drawer — 19 rows

**What it does.** Click an alert or tile → a drawer opens with full detail, history and imagery.
Deep-linkable, keyboard-operable, focus-managed.

**Why it exists.** A modal is where accessibility stops being a checklist and becomes a mechanism.

> **Falsification:** drop the focus trap and a keyboard user falls out of the drawer into the page
> behind it. Drop the ref-based measurement and the drawer can't size to its content.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H07` `H34`–`H36` `H42`–`H44` | `<dialog>` · `img` `alt`/`srcset`/`<picture>` for entity imagery · `aria-expanded`/`-controls` · focus management · focus trap |
| **CSS** | `C20`–`C25` | All five position values · **stacking contexts** — the drawer-over-sticky-header bug is real here · `z-index` |
| **React** | `R029`–`R030` `R065`–`R068` | **Portals** (drawer renders outside the tree, events still bubble through React) · **error boundary** around the detail pane · `useRef` as a box and for DOM · `forwardRef` · `useImperativeHandle` |

---

## F05 · Search & Filter — 12 rows

**What it does.** Type-ahead filter across entities. Every keystroke cancels the previous request.

**Why it exists.** The purest, most honest home for cancellation and race conditions in any product.

> **Falsification:** remove the abort and a slow early response overwrites a fast later one — the
> user sees results for a query they already deleted.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H27` | `<select>`, `optgroup`, `<datalist>` for filter controls |
| **React** | `R072` `R089`–`R098` | `useTransition`/`useDeferredValue` for non-blocking filter · controlled vs uncontrolled · `defaultValue` vs `value` · multi-input handlers · the `useEffect` fetch pattern · **abort on unmount** · **race conditions and the stale-response fix** · loading/error/empty states |

*(`debounce` and `throttle` — `J142`/`J143` — are written here but counted under F14 where they're specified.)*

---

## F06 · Time Range & Replay — 35 rows

**What it does.** Scrub back through the last N minutes. Pause, rewind, replay the event stream.
Redux holds the timeline; the action log *is* the replay mechanism.

**Why it exists.** This is what makes Redux structurally necessary rather than decorative — and it
carries the entire Redux syllabus honestly.

> **Falsification:** mutate state in a reducer and replay silently produces the wrong past. Skip
> immutability and time-travel is impossible by construction.

| Area | Rows | What lands here |
|---|---|---|
| **JS** | `J13` `J42`–`J46` `J55` `J139` | Reference vs value semantics · pure functions · object literals, property access, descriptors, `Object.freeze` · `hasOwnProperty` vs `in` · **`Intl`** for timestamps and units |
| **React** | `R049`–`R050` `R061` | Rules of Hooks and *why* · `useReducer` |
| **Redux** | `X01`–`X20` `X31`–`X34` | **Flux** (Action→Dispatcher→Store→View) · Flux vs Redux · three principles · store/actions/creators · reducers, purity, **immutable update patterns for objects and arrays** · `combineReducers` · `Provider`/`useSelector`/`useDispatch` · `connect` · selectors + `reselect` · **RTK + Immer** |

---

## F07 · Connection Health & Resilience — 26 rows

**What it does.** Per-feed connection status with exponential backoff, jitter, circuit-breaking and
an offline banner. Each feed owns a private retry budget.

**Why it exists.** The single best home for closures in the entire product — and the class-lifecycle
rows, because a connection manager has a genuine mount/update/unmount story.

> **Falsification:** remove the closure and the backoff budget becomes global — one flaky feed
> throttles all of them. Remove effect cleanup and reconnects stack until the tab dies.

| Area | Rows | What lands here |
|---|---|---|
| **JS** | `J09`–`J10` | **Closures** — definition and practical. `createFeedMonitor()` returns a closure over `attempts`, `nextDelay`, `timerId` |
| **React — lifecycle** | `R033`–`R048` | The full class lifecycle. **One connection manager is written as a class component on purpose** — `constructor`/`super(props)`, `setState` async + batched + functional updater, `shouldComponentUpdate`, `componentDidUpdate` and its infinite-loop trap, `componentWillUnmount`, `getDerivedStateFromProps`, `getSnapshotBeforeUpdate`, error-boundary methods, legacy `UNSAFE_`, `PureComponent`, `this` binding |
| **React — hooks** | `R054`–`R059` `R069`–`R070` | `useEffect`, deps comparison, **cleanup**, effect timing, `[]` vs no array vs deps, `useLayoutEffect`, custom hooks, **the stale closure** — a reconnect timer reading frozen state is the real bug, not a demo |

> **Why a class component in a modern React app:** deliberate. It gives you the lifecycle rows
> honestly, and *"here's the one place I used a class and why"* is a better interview answer than
> having never written one.

---

## F08 · Workspace Preferences & Theming — 49 rows

**What it does.** Layout, density, theme, per-feed thresholds, column choices — persisted, synced
across tabs, restored on load.

**Why it exists.** The honest home for the entire CSS syllabus and the storage triad.

> **Falsification:** define a colour only inside the dark media query and the default (un-stamped)
> theme renders unreadable. Remove the `storage` listener and two open tabs disagree.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H47` | WCAG AA contrast across both themes |
| **CSS — cascade** | `C01`–`C14` | Selectors, combinators, **specificity**, `!important`, cascade order, **`@layer`**, inheritance, the four resets, pseudo-classes, pseudo-elements, attribute selectors, **custom properties** |
| **CSS — visual** | `C32`–`C52` | Font loading, type scale, `line-height`, units, viewport units, `clamp()`, colour notations, gradients, shadows, truncation, media queries, **three-state `prefers-color-scheme`**, `prefers-reduced-motion`, `@supports`, transitions, `@keyframes`, transforms, **compositing**, filters |
| **JS** | `J120`–`J128` | `localStorage` (prefs) · `sessionStorage` (unsaved layout) · **cookies** (session token) · the storage decision matrix · **`storage` event cross-tab sync** · `JSON.stringify`/`parse` limits · `structuredClone` · shallow vs deep copy |
| **React** | `R060` `R062`–`R064` | `useContext` for theme · `useCallback` · `useMemo` · referential identity |

---

## F09 · Session & Auth — 6 rows

**What it does.** Token-based session with expiry, idle timeout and refresh.

> **Falsification:** forget `clearInterval` on the idle timer and it fires against a dead session.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H31` | `autocomplete` tokens on the sign-in form |
| **JS** | `J78` `J99`–`J100` | `setTimeout`/`setInterval`, clamping, drift · **custom `Error` subclasses** (`AuthError`, `TokenExpiredError`) · `unhandledrejection` handler |
| **React** | `R071` `R073` | `useId` for SSR-stable field ids · `useSyncExternalStore` for the session store |

---

## F10 · Notifications — 18 rows

**What it does.** Toast queue for threshold breaches and connection events. Announced to screen
readers, dismissible, auto-expiring.

> **Falsification:** render the live region *with* its content already in it and a screen reader
> announces nothing.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H41` | **`aria-live`** — polite vs assertive, and why the region must exist before the content |
| **React — JSX** | `R013`–`R018` `R020`–`R022` | `createElement` transform, Fragments, `className`/`htmlFor`, expressions-only, conditional rendering, **the `{count && <X/>}` trap** (a zero-count toast renders a literal `0`), `dangerouslySetInnerHTML`, `children`, JSX comments |
| **React — components** | `R023`–`R028` `R031`–`R032` | Function vs class · props read-only · `defaultProps` · `PropTypes` · `React.Children` · keyed Fragments · `memo` · capitalisation rule |

---

## F11 · Threshold Settings — 17 rows

**What it does.** Per-metric alert rules — comparator, value, duration, severity. Validated, saved,
editable inline.

**Why it exists.** One real form, not a checkout. Carries the whole forms and validation syllabus.

> **Falsification:** set a custom validity message and never clear it, and the form is permanently
> unsubmittable.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H08` `H20`–`H26` `H28`–`H30` `H32` | `<details>` · form basics, **label association**, input types, native validation attributes, **Constraint Validation API**, `:invalid` vs `:user-invalid`, `fieldset`/`legend`, checkbox/radio state, **`FormData`**, `Object.fromEntries`, form events |
| **React** | `R109`–`R113` | Jest · **RTL queries** (`getBy` vs `queryBy` vs `findBy`) · `user-event` vs `fireEvent` · testing hooks · snapshot testing — the settings form is the thing worth testing |

---

## F12 · Export & Reporting — 7 rows

**What it does.** Export the current view as a printable incident report.

> **Falsification:** no print stylesheet and the dark theme prints as a black rectangle.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H05` | Tables with `thead`/`tbody`/`th scope`/`caption` |
| **CSS** | `C53` | `@media print` |
| **React** | `R114`–`R118` | **HOCs** (`withPrintLayout`) · render props · compound components · controlled vs uncontrolled design · container/presentational |

---

## F13 · App Shell & Routing — 45 rows

**What it does.** The frame: landmarks, navigation, routing, deep links, module loading, boot.

> **Falsification:** open a deep link directly on static hosting with `BrowserRouter` and you get a 404.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H01`–`H03` `H11`–`H18` `H40` `H45`–`H46` | Doctype/`lang`, **semantic landmarks**, heading hierarchy, comments, viewport, OG tags, favicon, **`defer`/`async`/`type=module`**, stylesheet loading, **ESM in the browser**, `<noscript>`, ARIA roles, keyboard nav, skip link |
| **CSS** | `C54`–`C55` | Logical properties · `aspect-ratio`/`object-fit` |
| **JS** | `J02` `J11` `J29` `J56`–`J64` `J129`–`J130` | `let`/`const` · strict mode · function forms · **destructuring, spread/rest, template literals, optional chaining, nullish coalescing, `Object` statics, ESM** · hash routing · History API |
| **React** | `R001`–`R003` `R008`–`R010` `R083`–`R088` `R120`–`R122` | Declarative vs imperative · **Virtual DOM** · **reconciliation** · Fiber · one-way data flow · composition over inheritance · the full React Router set · Next.js awareness · **React styling approaches** · React 18/19 delta |

---

## F14 · Performance & Observability — 18 rows

**What it does.** The console monitors *itself* — frame budget, render counts, memory, long tasks —
and shows it in a diagnostics panel.

**Why it exists.** Turns the memory-leak lab from an exercise into a product feature. A long-lived
dashboard genuinely leaks, and you genuinely need to see it.

> **Falsification:** leave the feed subscription attached on unmount and the heap climbs all day
> until the tab dies. This is not a simulated leak.

| Area | Rows | What lands here |
|---|---|---|
| **HTML** | `H19` | Critical rendering path |
| **JS** | `J116` `J140`–`J154` | Event object (`target` vs `currentTarget`) · reflow/repaint/composite · **layout thrashing** · **`debounce` and `throttle` written from scratch** · rAF scheduling · **garbage collection** · **detached DOM nodes, forgotten timers, listener leaks** · `WeakMap` registry · DevTools Memory and Performance · Lighthouse/CWV · bundle strategy · testing without a framework |
| **React** | `R119` | CSR/SSR/hydration |

---

# `kata/` — 77 rows

**In the repo. Outside the build. `src/` may never import it.**

These have no honest home in a React product. Forcing them in would be theatre an interviewer spots
in one question. Each is listed with the reason.

```
kata/
├── polyfills/     21 hand-written, with parity tests against native
├── quirks/        coercion, hoisting, TDZ, output-prediction
├── this-and-protos/
├── dom/           imperative DOM — what React does for you
└── README.md      "MCQ fundamentals. Deliberately outside the product."
```

| Group | Rows | Why no product home |
|---|---|---|
| **Polyfills** | `P01`–`P21` | You ship `core-js` or nothing. Hand-writing `map` in production is not a real decision. |
| **Coercion quirks** | `J14`–`J28` | `typeof null`, `[] == false`, `{} + []`, `ToPrimitive`. You never write these deliberately — you avoid them. |
| **Hoisting / TDZ / IIFE** | `J01` `J03`–`J08` `J12` | `var`, the loop-variable classic, IIFE, scope chain. Modules and `const` make these unreachable in modern code. |
| **`this` contexts** | `J31`–`J36` | Function components have no `this`. One class component in F07 covers `R048`; the other five contexts are MCQ-only. |
| **Prototype plumbing** | `J47`–`J50` | Chain, `__proto__` vs `prototype`, constructor functions, `Object.create` inheritance. `class` is used in F01; hand-wiring prototypes is not. |
| **Imperative DOM** | `J102`–`J115` `J117`–`J119` | Selection APIs, `createElement`, `DocumentFragment`, `innerHTML`, `classList`, raw `addEventListener`, capture/bubble, delegation. **React owns the DOM** — the refs you legitimately need are in F04. |
| **Misc** | `J132` `J134` `J157`–`J158` `J160` | `MutationObserver`, `new Function`/`eval`, **Execution Context**, `undefined` vs not defined, **CommonJS** |
| **`<template>`** | `H06` | JSX replaces it entirely. |

> **The interview line:** *"The product doesn't need a `map` polyfill, so I didn't put one there.
> Fundamentals practice lives in `kata/` — separate, tested, not shipped."* That reads as judgement,
> which is what the question is probing.

---

# OUT — 7 rows

Prepared spoken answers. Not built, not practised.

`H33` file input · `H39` audio/video · `C58` Sass/Less · `J138` CSRF · `J155` Web Workers ·
`J156` Service Workers · `J162` V8 internals

---

## Reconciliation

```
444 rows = 360 product (14 features) + 77 kata + 7 out
zero unassigned · zero duplicated · zero phantom
```

Every product row has a feature that breaks without it. Every kata row has a stated reason no real
React product would force it. **Nothing is merely "mentioned."**
