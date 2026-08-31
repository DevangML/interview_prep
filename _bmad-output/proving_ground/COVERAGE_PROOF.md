# Coverage Proof: The Load-Bearing Syllabus

> **The Rule of Falsification:** A concept earns a place in this product only if removing it breaks a feature. This document proves the 360 product rows are structurally necessary to the Live Ops Console, mapping every single topic directly to its architectural purpose.


---

## 🏗️ F01 · Feed Ingestion Layer — 60 rows

> **Purpose:** Connects to 3+ independent public feeds. Each has different latency, reliability and shape. Normalises them into one internal event stream with retry, backoff and cancellation.
>
> **Falsification (Why it is necessary):** remove `Promise.allSettled` and one dead feed takes the whole dashboard down. > Remove `AbortController` and a feed switch leaks the previous stream forever. **Why each combinator is honest here:** `Promise.all` — the initial config fetch, all must succeed · `allSettled` — the periodic multi-feed poll, a dead feed must not kill the others · `race` — request timeout · `any` — mirror endpoints, first healthy one wins. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **J101**: `fetch` — *Response, `.ok`, `.json()`, status codes, no auto-throw*
- **J135**: Same-origin policy — *origin = scheme + host + port*
- **J136**: CORS — *`Origin`, `Access-Control-Allow-`, simple vs preflighted, credentials*
- **J159**: First-class functions — *functions as values: assign, pass, return, store in arrays/objects · anonymous vs named function expressions*
- **J161**: `AbortController` & cancellation — *`new AbortController()` · `signal` passed to fetch · `.abort()` · `AbortError` · timeout pattern*
- **J30**: Parameters — *default, rest, destructured, `arguments`, `fn.length`*
- **J37**: Higher-order functions — *functions as args/returns*
- **J38**: Currying — *manual + generic `curry`, arity*
- **J39**: Partial application — *`bind` for partials vs currying*
- **J40**: Composition — *`compose` (right→left) vs `pipe` (left→right)*
- **J51**: ES6 `class` — *desugaring, methods non-enumerable, class body strict*
- **J52**: `extends` / `super` — *constructor chaining, `super` before `this`*
- **J53**: `static` & `#private` — *class-level members, hard privacy*
- **J54**: `instanceof` & type checks — *prototype-chain walk, `Object.prototype.toString`, `Array.isArray`*
- **J72**: Single-threaded model — *call stack, blocking*
- **J73**: Call stack — *frames, stack overflow*
- **J74**: Web APIs / host environment — *timers, XHR/fetch, DOM events — not part of the JS engine*
- **J75**: Task (macrotask) queue — *timers, I/O, UI events; one per tick*
- **J76**: Microtask queue — *promises, `queueMicrotask`, `MutationObserver`; drained fully*
- **J77**: Event loop ordering — *sync → all microtasks → render → one macrotask*
- **J79**: `requestAnimationFrame` — *before paint, ~60fps, `cancelAnimationFrame`*
- **J80**: `queueMicrotask` — *when over `Promise.resolve().then`*
- **J81**: Callbacks & callback hell — *inversion of control, pyramid*
- **J82**: Error-first callbacks — *Node convention*
- **J83**: Promise states — *pending/fulfilled/rejected, settle-once immutability*
- **J84**: Promise constructor — *executor runs synchronously*
- **J85**: `.then` chaining — *returns a new promise, return-value semantics*
- **J86**: Thenable assimilation — *any `{then}` object is adopted*
- **J87**: `.catch` / `.finally` — *catch is `.then(null, fn)`, finally passes through*
- **J88**: Error propagation — *skipping to the nearest catch, rethrowing*
- **J89**: `Promise.all` — *fail-fast, result order = input order*
- **J90**: `Promise.allSettled` — *never rejects, `{status, value/reason}`*
- **J91**: `Promise.race` — *first to settle (fulfil or reject)*
- **J92**: `Promise.any` — *first to fulfil; `AggregateError`*
- **J93**: `Promise.resolve/reject` — *wrapping, passthrough of existing promises*
- **J94**: `async` functions — *always return a promise, implicit wrapping*
- **J95**: `await` — *pauses, unwraps thenables, only in async (or top-level module)*
- **J96**: Sequential vs parallel awaits — *the cost model*
- **J97**: `await` in a loop — *when it's a bug, when it's correct*
- **J98**: `try/catch/finally` in async — *what catch does and doesn't catch*
- **R099**: Webpack `entry` — *single vs multiple entry points*
- **R100**: Webpack `output` — *`path`, `filename`, `publicPath`, `[contenthash]`*
- **R101**: Loaders — *`babel-loader`, `css-loader`, `style-loader`*
- **R102**: Plugins — *`HtmlWebpackPlugin`, `MiniCssExtractPlugin`*
- **R103**: `mode` — *development vs production defaults*
- **R104**: `devServer` + HMR — *hot reload, proxy*
- **R105**: Code splitting — *`SplitChunksPlugin`, dynamic `import()`*
- **R106**: Babel — *`@babel/preset-react`, `preset-env`, polyfills*
- **R107**: Vite contrast — *native ESM in dev, Rollup in prod*
- **R108**: Source maps — *`devtool`, prod trade-offs*
- **X21**: Immutable update — arrays — *`concat`/spread/`filter`/`map`, never `push`/`splice`/`sort`*
- **X22**: `combineReducers` — *slice keys map to state shape*
- **X23**: Reducer composition — *slices own their branch only*
- **X24**: Switch vs lookup map — *style, exhaustiveness*
- **X25**: Middleware signature — *`store => next => action` — three curried levels*
- **X26**: `applyMiddleware` — *order matters, left to right*
- **X27**: `redux-thunk` — *dispatch a function instead of an object*
- **X28**: Thunk internals — *`(dispatch, getState) => …`*
- **X29**: Async action triad — *pending / fulfilled / rejected*
- **X30**: `redux-saga` — *generators, `yield` effects, declarative*

---

## 🏗️ F02 · Live Metric Tiles — 28 rows

> **Purpose:** A grid of tiles updating at high frequency — value, delta, sparkline, threshold state. Must hold 60fps while feeds push continuously.
>
> **Falsification (Why it is necessary):** remove `throttle`/rAF batching and the UI drops frames under load. Remove > `React.memo` and every tile re-renders on every tick. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **C15**: Box model — *content, padding, border, margin*
- **C16**: `box-sizing` — *content-box vs border-box, the global reset*
- **C17**: Margin collapsing — *adjacent siblings, parent/first-child, empty blocks*
- **C18**: Block formatting context — *what creates one, float containment*
- **C19**: `display` — *block, inline, inline-block, flow-root, contents, none*
- **C26**: Flexbox — container — *`flex-direction wrap justify-content align-items align-content gap`*
- **C27**: Flexbox — items — *`flex-grow shrink basis`, `flex` shorthand, `align-self`, `order`*
- **C28**: Flex sizing gotchas — *`min-width:auto` floor, overflow*
- **C29**: Grid — tracks — *`template-columns/rows`, `fr`, `repeat`, `minmax`, `auto-fit` vs `auto-fill`*
- **C30**: Grid — placement — *line numbers, `span`, named areas, implicit tracks, `auto-flow`*
- **C31**: Container queries — *`container-type`, `@container`, units `cqw`*
- **H09**: `data-` attributes — *naming, `dataset` camelCase mapping*
- **H38**: SVG inline vs `<img>` — *styling reach, `currentColor`*
- **J133**: `ResizeObserver` — *element-level, loop-limit error*
- **J41**: Memoization — *cache key strategy, LRU, side effects*
- **R007**: Render phase vs commit phase — *render = pure & interruptible; commit = DOM writes*
- **R011**: Batching — *React 17 = events only; React 18 = automatic everywhere*
- **R012**: Element vs component vs instance — *`<A/>` is an object, `A` is a function*
- **R051**: `useState` — *returns `[value, setter]`*
- **R052**: Lazy initialiser — *`useState(() => expensive())`*
- **R053**: Functional update — *`setX(prev => prev + 1)`*
- **R074**: The four re-render causes — *own state, new props, context change, parent re-render*
- **R075**: `React.memo` + comparator — *second argument, returns "are equal"*
- **R076**: When memo hooks HURT — *comparison + memory cost*
- **R077**: Inline props break memoisation — *`{}`, `[]`, `() => {}`*
- **R078**: Key stability & list perf — *stable ids vs index*
- **R081**: Profiler — *`<Profiler>` API, DevTools flame chart*
- **R082**: Context re-render cost — *every consumer re-renders on value change*

---

## 🏗️ F03 · Alert Stream — 20 rows

> **Purpose:** A virtualised, append-only log of events. Thousands of rows, only what's visible in the DOM, auto-scroll with a pause-on-hover.
>
> **Falsification (Why it is necessary):** use index keys and pausing the stream corrupts every visible row. Skip > virtualisation and 5,000 rows freeze the tab. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **C56**: Overflow & scroll containers — *`auto scroll hidden clip`, `overscroll-behavior`, scrollbar gutter*
- **C57**: `font-variant-numeric: tabular-nums` — *aligning digit columns*
- **H04**: Lists — *`ul` `ol` `dl`/`dt`/`dd`, nesting*
- **H10**: Character entities & escaping — *`&lt; &gt; &amp; &quot;`, raw `<` in text*
- **H37**: `loading="lazy"` — *native lazy-loading, above-fold caveat*
- **J131**: `IntersectionObserver` — *root, rootMargin, threshold, unobserve*
- **J137**: XSS & escaping — *stored/reflected/DOM-based, sinks, CSP*
- **J65**: Array creation & holes — *literal, `Array(n)`, `Array.from`, `.fill`, sparse arrays*
- **J66**: Iteration methods — *`map filter reduce forEach find findIndex some every flat flatMap`*
- **J67**: Mutating methods — *`push pop shift unshift splice sort reverse fill copyWithin`*
- **J68**: Non-mutating methods — *`slice concat join at includes indexOf toSorted`*
- **J69**: `Map` & `Set` — *any key type, insertion order, size, iteration, vs object/array*
- **J70**: `WeakMap` / `WeakSet` — *weak refs, no iteration, no size, GC*
- **J71**: Iteration protocols — *`for…of` vs `for…in` vs `forEach`, iterables*
- **R004**: Diffing heuristic 1 — *different element type ⇒ discard whole subtree*
- **R005**: Diffing heuristic 2 — *keys give stable identity across renders*
- **R006**: `key` — index vs stable id — *reorder, insert-at-front, delete*
- **R019**: Rendering lists — *`.map` returning elements*
- **R079**: `React.lazy` + `Suspense` — *dynamic import, fallback*
- **R080**: Windowing / virtualisation — *render only what's visible*

---

## 🏗️ F04 · Entity Detail Drawer — 19 rows

> **Purpose:** Click an alert or tile → a drawer opens with full detail, history and imagery. Deep-linkable, keyboard-operable, focus-managed.
>
> **Falsification (Why it is necessary):** drop the focus trap and a keyboard user falls out of the drawer into the page > behind it. Drop the ref-based measurement and the drawer can't size to its content. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **C20**: Positioning — static/relative — *offset without removing from flow*
- **C21**: Positioning — absolute — *containing block = nearest positioned ancestor*
- **C22**: Positioning — fixed — *viewport-relative*
- **C23**: Positioning — sticky — *threshold, scroll container, needs an offset*
- **C24**: Stacking contexts — *what creates one, `z-index` scoping*
- **C25**: `z-index` — *integer/auto, only on positioned + flex/grid items*
- **H07**: `<dialog>` — *`show()` vs `showModal()`, `::backdrop`, Escape*
- **H34**: `<img>` fundamentals — *`alt`, `width`/`height`, intrinsic size*
- **H35**: `srcset` / `sizes` — *density vs width descriptors*
- **H36**: `<picture>` — *art direction, `<source type>`*
- **H42**: State attributes — *`aria-expanded -controls -current -selected -hidden -describedby`*
- **H43**: Focus management — *`.focus()`, return focus on close, `inert`*
- **H44**: Focus trap — *Tab/Shift+Tab cycling in a modal*
- **R029**: Portals — *`createPortal`, DOM elsewhere, events still bubble through the React tree*
- **R030**: Error boundaries — *`getDerivedStateFromError` + `componentDidCatch`, class-only*
- **R065**: `useRef` as a mutable box — *`.current`, survives renders, no re-render*
- **R066**: `useRef` for DOM — *`ref={node}`, null before mount*
- **R067**: `forwardRef` — *pass a ref through a component*
- **R068**: `useImperativeHandle` — *expose a custom ref API*

---

## 🏗️ F05 · Search & Filter — 12 rows

> **Purpose:** Type-ahead filter across entities. Every keystroke cancels the previous request.
>
> **Falsification (Why it is necessary):** remove the abort and a slow early response overwrites a fast later one — the > user sees results for a query they already deleted. *(`debounce` and `throttle` — `J142`/`J143` — are written here but counted under F14 where they're specified.)* ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **H27**: `<select>` / `optgroup` / `<datalist>` — *value vs text, multiple*
- **R072**: `useTransition` / `useDeferredValue` — *mark updates non-urgent*
- **R089**: Controlled components — *`value` + `onChange`, React owns state*
- **R090**: Uncontrolled components — *`ref`, DOM owns state*
- **R091**: `defaultValue` vs `value` — *initial vs controlled*
- **R092**: Many inputs, one handler — *`name` + computed key*
- **R093**: Form libraries — *Formik, React Hook Form (uncontrolled-first)*
- **R094**: `useEffect` fetch pattern — *deps, loading/error state*
- **R095**: Cleanup / abort on unmount — *`AbortController` in the cleanup*
- **R096**: Race conditions — *stale response overwrites fresh*
- **R097**: Loading / error / empty states — *the three every fetch needs*
- **R098**: React Query / SWR — *cache, dedupe, revalidate*

---

## 🏗️ F06 · Time Range & Replay — 35 rows

> **Purpose:** Scrub back through the last N minutes. Pause, rewind, replay the event stream. Redux holds the timeline; the action log *is* the replay mechanism.
>
> **Falsification (Why it is necessary):** mutate state in a reducer and replay silently produces the wrong past. Skip > immutability and time-travel is impossible by construction. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **J13**: Primitives vs objects — *7 primitives, reference semantics*
- **J139**: `Intl` — *`NumberFormat` (currency), `DateTimeFormat`, `RelativeTimeFormat`, locales*
- **J42**: Pure functions & immutability — *referential transparency, side effects*
- **J43**: Object literals — *shorthand, computed keys, methods, `__proto__` key*
- **J44**: Property access — *dot vs bracket, optional chaining*
- **J45**: Property descriptors — *`writable enumerable configurable`, getters/setters*
- **J46**: `Object.freeze` / `seal` / `preventExtensions` — *shallow only*
- **J55**: `hasOwnProperty` vs `in` — *own vs inherited, `Object.hasOwn`*
- **R049**: Rules of Hooks — *top level only; components + custom hooks only*
- **R050**: Why the rules exist — *hooks are matched by call order, not name*
- **R061**: `useReducer` — *`(state, action) => state`, dispatch*
- **X01**: Flux architecture — *Action → Dispatcher → Store → View*
- **X02**: The Dispatcher — *single registry, `waitFor`*
- **X03**: Flux vs Redux — *many stores vs one; dispatcher vs reducers*
- **X04**: Why Redux exists — *prop drilling, shared state, predictability*
- **X05**: Principle 1 — single source of truth — *one store tree*
- **X06**: Principle 2 — state is read-only — *change only via dispatched actions*
- **X07**: Principle 3 — pure reducers — *same input ⇒ same output, no side effects*
- **X08**: Creating a store — *`createStore` (legacy) vs `configureStore` (RTK)*
- **X09**: `store.getState()` — *full tree snapshot*
- **X10**: `store.dispatch(action)` — *the only mutation path*
- **X11**: `store.subscribe(listener)` — *returns unsubscribe*
- **X12**: Action object shape — *`{ type, payload }`, `type` required*
- **X13**: Action creators — *functions returning actions*
- **X14**: Action type constants — *string constants, collisions, `slice/action` naming*
- **X15**: Payload conventions — *FSA, `error`, `meta`*
- **X16**: `store.replaceReducer` — *hot reloading, code splitting*
- **X17**: Reducer signature — *`(state, action) => newState`*
- **X18**: Initial state — *default parameter, `undefined` on first call*
- **X19**: The `default` case — *must return existing state unchanged*
- **X20**: Immutable update — objects — *spread, nested levels*
- **X31**: `Provider` · `useSelector` · `useDispatch` — *store via context; selector subscribes*
- **X32**: `connect` / `mapStateToProps` / `mapDispatchToProps` — *legacy HOC, `ownProps`*
- **X33**: Selectors & `reselect` — *`createSelector`, memoised derivation*
- **X34**: Redux Toolkit — *`createSlice`, `configureStore`, `createAsyncThunk`, Immer*

---

## 🏗️ F07 · Connection Health & Resilience — 26 rows

> **Purpose:** Per-feed connection status with exponential backoff, jitter, circuit-breaking and an offline banner. Each feed owns a private retry budget.
>
> **Falsification (Why it is necessary):** remove the closure and the backoff budget becomes global — one flaky feed > throttles all of them. Remove effect cleanup and reconnects stack until the tab dies. > **Why a class component in a modern React app:** deliberate. It gives you the lifecycle rows > honestly, and *"here's the one place I used a class and why"* is a better interview answer than > having never written one. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **J09**: Closures — definition — *function + lexical environment*
- **J10**: Closures — practical — *counter, private state, factory, memo cache*
- **R033**: `constructor` + `super(props)` — *why props must be forwarded*
- **R034**: `this.state` initialisation — *assign directly in constructor only*
- **R035**: `setState` is async + batched — *queued, not immediate*
- **R036**: Functional updater — *`setState(prev => …)`*
- **R037**: `setState` callback — *second argument, runs post-commit*
- **R038**: `render()` purity — *no side effects, no setState*
- **R039**: `componentDidMount` — *after first commit, DOM available*
- **R040**: `shouldComponentUpdate` — *returns boolean, skips render*
- **R041**: `componentDidUpdate(prevProps, prevState)` — *compare before acting*
- **R042**: `componentWillUnmount` — *cleanup only, no setState*
- **R043**: `static getDerivedStateFromProps` — *static, no `this`, runs on EVERY render*
- **R044**: `getSnapshotBeforeUpdate` — *runs after render, before DOM mutation; return feeds `componentDidUpdate`*
- **R045**: `getDerivedStateFromError` vs `componentDidCatch` — *render fallback vs log side effect*
- **R046**: Legacy `UNSAFE_` methods — *`componentWillMount / WillReceiveProps / WillUpdate`*
- **R047**: `PureComponent` — *implements shallow `shouldComponentUpdate`*
- **R048**: `this` binding in handlers — *constructor bind vs class field arrow*
- **R054**: `useEffect` — *side effects after commit*
- **R055**: Deps array comparison — *`Object.is`, shallow, per-item*
- **R056**: Cleanup function — *runs before every re-run AND on unmount*
- **R057**: Effect timing — *asynchronous, after paint*
- **R058**: `[]` vs no array vs `[deps]` — *three distinct behaviours*
- **R059**: `useLayoutEffect` — *synchronous, before paint*
- **R069**: Custom hooks — *`use` prefix, composition, isolated state*
- **R070**: The stale closure trap — *effect/callback capturing an old value*

---

## 🏗️ F08 · Workspace Preferences & Theming — 49 rows

> **Purpose:** Layout, density, theme, per-feed thresholds, column choices — persisted, synced across tabs, restored on load.
>
> **Falsification (Why it is necessary):** define a colour only inside the dark media query and the default (un-stamped) > theme renders unreadable. Remove the `storage` listener and two open tabs disagree. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **C01**: Selector types — *element, class, id, universal, attribute*
- **C02**: Combinators — *descendant, `>`, `+`, `~`, and the missing "parent"*
- **C03**: Specificity arithmetic — *(id, class, element); inline; `!important`*
- **C04**: `!important` — *when legitimate, why usually a smell*
- **C05**: Cascade order — *origin → layer → specificity → source order*
- **C06**: `@layer` — *declaration order defines priority*
- **C07**: Inheritance — *inherited vs non-inherited properties*
- **C08**: `inherit` `initial` `unset` `revert` `revert-layer` — *the four resets*
- **C09**: Pseudo-classes — state — *`:hover :focus :focus-visible :focus-within :active :disabled :checked`*
- **C10**: Pseudo-classes — structural — *`:nth-child(an+b) :first/:last-child :only-child :empty`*
- **C11**: Functional pseudo-classes — *`:is()` `:where()` `:not()` `:has()`*
- **C12**: Pseudo-elements — *`::before ::after ::placeholder ::selection ::marker ::first-line ::backdrop`*
- **C13**: Attribute selectors — *`[a] [a=v] [a^=] [a$=] [a=] [a~=] [a i]`*
- **C14**: Custom properties — *`--x`, `var(--x, fallback)`, scope, inheritance, invalid-at-computed-value*
- **C32**: Font loading — *`@font-face`, `font-display`, Google Fonts, fallback stacks*
- **C33**: Font shorthand & metrics — *`font-size line-height font-weight font-family`*
- **C34**: `line-height` — *unitless vs unit values*
- **C35**: `letter-spacing`, `word-spacing`, `text-transform` — *uppercase tracking*
- **C36**: Absolute vs relative units — *`px em rem % vw vh ch ex fr`*
- **C37**: Viewport units — *`vw vh vmin vmax dvh svh lvh`*
- **C38**: `clamp()` / `min()` / `max()` — *fluid type without breakpoints*
- **C39**: Colour notations — *hex, `rgb()`, `hsl()`, `oklch()`, alpha, `currentColor`*
- **C40**: Gradients — *linear, radial, conic, colour stops, hard stops*
- **C41**: Shadows & borders — *`box-shadow` (inset, spread), `text-shadow`, `border-radius`, `outline`*
- **C42**: Text overflow — *`text-overflow: ellipsis`, `-webkit-line-clamp`, `word-break`, `text-wrap: balance`*
- **C43**: Media queries — *`min-width` mobile-first, ranges, `and`/`or`*
- **C44**: `prefers-color-scheme` — *three states: system / explicit light / explicit dark*
- **C45**: `prefers-reduced-motion` — *gating all animation*
- **C46**: Other feature queries — *`pointer`, `hover`, `@supports`*
- **C47**: Transitions — *property, duration, timing, delay, `transitionend`*
- **C48**: Timing functions — *`linear ease cubic-bezier steps`*
- **C49**: `@keyframes` — *percentages, `animation-` longhands, `fill-mode`*
- **C50**: Transforms — *`translate rotate scale skew`, `transform-origin`, 3D, `perspective`*
- **C51**: Compositing & performance — *only `transform`/`opacity` are cheap; `will-change`*
- **C52**: Filters — *`blur brightness grayscale drop-shadow`, `backdrop-filter`*
- **H47**: Colour contrast — *WCAG AA 4.5:1 / 3:1 large*
- **J120**: `localStorage` — *sync, string-only, ~5MB, per-origin*
- **J121**: `sessionStorage` — *per-tab lifetime*
- **J122**: `storage` event — *fires in other tabs only*
- **J123**: Cookies — *`document.cookie`, `path domain max-age expires Secure SameSite HttpOnly`*
- **J124**: Storage decision matrix — *which of the three, when*
- **J125**: `JSON.stringify` — *replacer, space, `toJSON`, what's dropped*
- **J126**: `JSON.parse` — *reviver, throws on invalid*
- **J127**: `structuredClone` — *deep clone, handles cycles/Map/Set/Date, rejects functions*
- **J128**: Shallow vs deep copy — *spread, `assign`, recursive clone, cycles*
- **R060**: `useContext` — *reads nearest Provider*
- **R062**: `useCallback` — *memoised function identity*
- **R063**: `useMemo` — *memoised value*
- **R064**: Referential identity — *why the memo hooks exist at all*

---

## 🏗️ F09 · Session & Auth — 6 rows

> **Falsification (Why it is necessary):** forget `clearInterval` on the idle timer and it fires against a dead session. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **H31**: `autocomplete` tokens — *spec values, `off`*
- **J100**: Unhandled rejections — *`unhandledrejection` event, late `.catch`*
- **J78**: `setTimeout` / `setInterval` — *clamping (4ms), drift, `clearTimeout`, `this`*
- **J99**: Custom `Error` subclasses — *`extends Error`, `name`, `cause`, `captureStackTrace`*
- **R071**: `useId` — *SSR-stable unique ids*
- **R073**: `useSyncExternalStore` / `useDebugValue` — *external store subscription; devtools label*

---

## 🏗️ F10 · Notifications — 18 rows

> **Falsification (Why it is necessary):** render the live region *with* its content already in it and a screen reader > announces nothing. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **H41**: `aria-live` regions — *`polite` vs `assertive`, `atomic`*
- **R013**: JSX → `React.createElement` — *classic vs automatic runtime*
- **R014**: Single root · Fragments — *`<></>` vs `<React.Fragment>`*
- **R015**: Reserved-word attributes — *`className`, `htmlFor`, camelCase events*
- **R016**: Expressions only — *no `if`/`for` inside braces*
- **R017**: Conditional rendering — *`&&`, ternary, early return, `null`*
- **R018**: The `{count && <X/>}` trap — *falsy leakage into output*
- **R020**: `dangerouslySetInnerHTML` — *`{{__html}}` shape, XSS*
- **R021**: `children` as a prop — *`props.children`, function-as-child*
- **R022**: JSX whitespace & comments — *`{/ /}`, newline collapsing*
- **R023**: Function vs class components — *which supports what*
- **R024**: Props are read-only — *never mutate*
- **R025**: `defaultProps` vs default params — *deprecated for function components in React 19*
- **R026**: `PropTypes` — *dev-only runtime validation*
- **R027**: `React.Children` — *`map`, `count`, `only`, `toArray`*
- **R028**: Keyed Fragments — *`<React.Fragment key>` in a list*
- **R031**: `React.memo` — *shallow prop compare, custom comparator*
- **R032**: Capitalisation rule — *lowercase = DOM tag*

---

## 🏗️ F11 · Threshold Settings — 17 rows

> **Purpose:** Per-metric alert rules — comparator, value, duration, severity. Validated, saved, editable inline.
>
> **Falsification (Why it is necessary):** set a custom validity message and never clear it, and the form is permanently > unsubmittable. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **H08**: `<details>`/`<summary>` — *`open`, `toggle` event*
- **H20**: `<form>` basics — *`action`, `method`, `novalidate`, implicit submit*
- **H21**: `<label>` association — *`for`/`id`, wrapping*
- **H22**: Input types — *`text email tel number url date range color search password checkbox radio`*
- **H23**: Native validation attributes — *`required pattern min max minlength maxlength step`*
- **H24**: Constraint Validation API — *`checkValidity` `reportValidity` `setCustomValidity` `validity.`*
- **H25**: `:invalid` / `:valid` / `:user-invalid` — *styling timing*
- **H26**: `fieldset` / `legend` — *radio grouping, `disabled` cascade*
- **H28**: Checkbox & radio state — *`checked` property vs attribute, `name` grouping*
- **H29**: `FormData` — *construction, `.get/.getAll/.entries`*
- **H30**: `Object.fromEntries(FormData)` — *the idiom and its loss*
- **H32**: Form events — *`submit input change invalid reset`*
- **R109**: Jest basics — *`describe`/`it`/`expect`, mocks*
- **R110**: RTL queries — *`getBy` throws · `queryBy` null · `findBy` async*
- **R111**: `user-event` vs `fireEvent` — *real interaction sequence vs single event*
- **R112**: Testing hooks — *`renderHook`, `act`*
- **R113**: Snapshot testing — *brittle, rots*

---

## 🏗️ F12 · Export & Reporting — 7 rows

> **Falsification (Why it is necessary):** no print stylesheet and the dark theme prints as a black rectangle. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **C53**: `@media print` — *page breaks, colour adjust, hiding chrome*
- **H05**: Tables — *`thead tbody tfoot th scope caption`*
- **R114**: Higher-Order Components — *function returning a component*
- **R115**: Render props — *function-as-child*
- **R116**: Compound components — *shared implicit state via context*
- **R117**: Controlled vs uncontrolled design — *who owns state, in your own API*
- **R118**: Container / presentational — *legacy split, superseded by hooks*

---

## 🏗️ F13 · App Shell & Routing — 45 rows

> **Falsification (Why it is necessary):** open a deep link directly on static hosting with `BrowserRouter` and you get a 404. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **C54**: Logical properties — *`margin-inline`, `padding-block`, `inset`*
- **C55**: `aspect-ratio` & `object-fit` — *`cover contain fill`, `object-position`*
- **H01**: `DOCTYPE` & standards mode — *quirks vs standards, `lang`, `charset`*
- **H02**: Semantic landmarks — *`header nav main aside footer section article`*
- **H03**: Heading hierarchy — *one `h1`/view, no level skips*
- **H11**: Comments & conditional content — *`<!-- -->`, not for secrets*
- **H12**: `<meta viewport>` — *`width=device-width, initial-scale=1`*
- **H13**: Meta description & OG tags — *`og:title/description/image`, `twitter:card`*
- **H14**: Favicon — *`<link rel=icon>`, sizes*
- **H15**: `<script>` loading — *default (blocking), `defer`, `async`, `type=module`*
- **H16**: `<link>` stylesheet loading — *render-blocking, `preload`, `media`*
- **H17**: ESM in the browser — *`type="module"`, CORS requirement, strict mode*
- **H18**: `<noscript>` — *graceful degradation*
- **H40**: ARIA roles & landmarks — *when native beats ARIA (first rule of ARIA)*
- **H45**: Keyboard navigation — *tab order, no positive `tabindex`, `tabindex="-1"`*
- **H46**: Skip link — *first focusable, visible on focus*
- **J02**: `let` / `const` — *block scope, no redeclaration, `const` ≠ immutable*
- **J11**: Strict mode — *modules always strict, `this` = undefined, no implicit globals*
- **J129**: Hash routing — *`location.hash`, `hashchange`*
- **J130**: History API — *`pushState replaceState popstate`*
- **J29**: Declarations vs expressions vs arrows — *hoisting, naming, `arguments`*
- **J56**: Destructuring — array — *order, skipping, defaults, swap, nested*
- **J57**: Destructuring — object — *rename, defaults, nested, rest, in parameters*
- **J58**: Spread — *arrays, objects, function calls, strings, order of overwrite*
- **J59**: Rest — *rest params, rest in destructuring*
- **J60**: Template literals — *interpolation, multiline, nesting, tagged templates*
- **J61**: Optional chaining — *`?.` `?.[]` `?.()`, short-circuit*
- **J62**: Nullish coalescing — *`??`, `??=`, vs `\*
- **J63**: `Object` statics — *`keys values entries fromEntries assign groupBy`*
- **J64**: ESM — *named/default, `import()`, live bindings, circular imports, tree shaking*
- **R001**: Declarative vs imperative UI — *describe state, not steps*
- **R002**: Virtual DOM — *in-memory tree, what it is NOT*
- **R003**: Reconciliation — *diffing two trees, O(n)*
- **R008**: Fiber — *interruptible units of work, linked list*
- **R009**: One-way data flow — *props down, events up*
- **R010**: Composition over inheritance — *children, slots, wrapper components*
- **R083**: Client-side routing — *no full reload, history manipulation*
- **R084**: `BrowserRouter` vs `HashRouter` — *server rewrite requirement*
- **R085**: `Routes` / `Route` / nesting — *`element`, `Outlet`, index routes*
- **R086**: Router hooks — *`useParams` `useNavigate` `useLocation` `useSearchParams`*
- **R087**: `<Link>` vs `<a>` — *prevents default, no reload*
- **R088**: Protected routes — *guard component, redirect, `replace`*
- **R120**: Next.js awareness — *file routing, RSC, `use client`*
- **R121**: React styling approaches — *CSS Modules, styled-components, Tailwind, inline*
- **R122**: React 18/19 delta — *concurrent, automatic batching, Actions, `use()`*

---

## 🏗️ F14 · Performance & Observability — 18 rows

> **Purpose:** The console monitors *itself* — frame budget, render counts, memory, long tasks — and shows it in a diagnostics panel.
>
> **Falsification (Why it is necessary):** leave the feed subscription attached on unmount and the heap climbs all day > until the tab dies. This is not a simulated leak. ---

### 🧩 Required Knowledge (Syllabus Concepts covered)

- **H19**: Critical rendering path — *HTML→DOM, CSS→CSSOM, render tree, layout, paint*
- **J116**: Event object — *`target vs currentTarget`, `relatedTarget`, `isTrusted`, `defaultPrevented`*
- **J140**: Reflow vs repaint vs composite — *which properties trigger which*
- **J141**: Layout thrashing — *read-write-read forced sync layout*
- **J142**: Debounce — *trailing/leading, cancel, the closure timer*
- **J143**: Throttle — *interval limiting, trailing call*
- **J144**: rAF-based scheduling — *batching per frame vs throttling by time*
- **J145**: Garbage collection — *reachability, mark-and-sweep, generational*
- **J146**: Leak — detached DOM nodes — *removed but still referenced*
- **J147**: Leak — forgotten timers — *`setInterval` on an unmounted view*
- **J148**: Leak — listeners & closures — *listeners retaining scope*
- **J149**: `WeakMap` as a registry — *metadata that dies with the key*
- **J150**: DevTools — Memory — *heap snapshots, comparison, retainers*
- **J151**: DevTools — Performance — *flame chart, long tasks, layout markers*
- **J152**: Lighthouse / Core Web Vitals — *LCP, CLS, INP*
- **J153**: Bundle & load strategy — *no build step, ESM, dynamic `import()`*
- **J154**: Testing without a framework — *assert helpers, a tiny runner, parity tests*
- **R119**: CSR vs SSR vs SSG · hydration — *where HTML is produced*
