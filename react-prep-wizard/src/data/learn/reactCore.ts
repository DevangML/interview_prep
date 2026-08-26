import type { LearnTopic } from './types';

/** The React mental model: rendering, state, hooks, lifecycle. */
export const reactCoreTopics: LearnTopic[] = [
  {
    id: 'react-rendering-model',
    area: 'React Core',
    group: 'Mental model',
    title: 'Rendering, reconciliation, keys and the virtual DOM',
    status: 'partial',
    minutes: 8,
    summary:
      'Almost every React bug and every React interview question resolves to one sentence: rendering is a pure function of props and state, and React decides what changed by comparing trees.',
    body: [
      'A render is React **calling your component function** to get a description of the UI — a tree of plain objects, the "virtual DOM". Nothing has touched the real DOM yet. React then **reconciles**: it diffs the new tree against the previous one and produces the minimal list of real DOM mutations, which it applies in the **commit** phase. Render can be interrupted and re-run; commit cannot.',
      'The virtual DOM is not magic and is not faster than a precise hand-written DOM update. It is faster than naive full re-rendering, and vastly easier to write correctly. Saying that out loud in an interview signals you understand the trade rather than repeating marketing.',
      'The diff uses two heuristics. **Different element type ⇒ discard the subtree and rebuild** — which is why a component defined *inside* another component remounts on every render and loses its state, a subtle and expensive bug. **Same type ⇒ keep the DOM node, update the changed props, recurse.**',
      '**Keys** identify children across renders in a list. With `key={index}`, inserting at the front shifts every index, so React matches the old first row to the new first item and carries its DOM state — a focused input, a checkbox — onto the wrong data. Keys must be stable, unique among siblings, and derived from the data. They are not passed to the component and are not a prop.',
      'A component re-renders for exactly three reasons: its own state changed, its parent re-rendered, or a context it consumes changed. Notably, a *parent* re-rendering re-renders children even when their props are identical — that is what `React.memo` exists to interrupt.',
    ],
    keyPoints: [
      'Render describes; commit mutates. Render may be discarded and re-run.',
      'Different element type discards the whole subtree — never define a component inside a component.',
      'Index keys corrupt row state on insertion or reorder.',
      'Three re-render causes: own state, parent render, consumed context.',
    ],
    interview:
      '"Why do we need keys?" is asked constantly, and the strong answer describes the failure: without stable keys, state attaches to the wrong row. "Is the virtual DOM faster than the DOM?" is a trap — the honest answer is "no, it is faster than re-rendering everything, and much easier to get right".',
    pitfalls: [
      'Declaring a child component inside a parent component body — remounts every render.',
      'Using an array index as key in a list that can reorder, filter or insert.',
    ],
    resources: [
      { label: 'React — Preserving and resetting state', url: 'https://react.dev/learn/preserving-and-resetting-state', kind: 'docs', note: 'The clearest explanation of why position and key decide identity.' },
      { label: 'React — Render and commit', url: 'https://react.dev/learn/render-and-commit', kind: 'docs' },
      { label: 'React — Rendering lists', url: 'https://react.dev/learn/rendering-lists', kind: 'docs' },
    ],
  },
  {
    id: 'react-state',
    area: 'React Core',
    group: 'State',
    title: 'State, batching, updaters and derived values',
    status: 'covered',
    minutes: 7,
    summary:
      'State updates are asynchronous, batched, and read from a closure — three facts that together explain the most common React confusion of all.',
    body: [
      'Calling a setter does not change the variable you are holding; it schedules a re-render. The `count` in the current closure keeps its old value for the rest of that render. Three calls to `setCount(count + 1)` therefore all compute the same number, and the count goes up by one. `setCount(c => c + 1)` reads the pending value instead and goes up by three.',
      '**Batching**: React groups multiple updates into a single re-render. Since React 18 this is automatic everywhere, including inside promises, timeouts and native event handlers — before 18 it only happened inside React event handlers, which is why old articles disagree.',
      'State is compared with `Object.is`. Setting it to a value that is already there bails out of the re-render — but mutating an object or array in place keeps the same reference, so React sees no change and does not render. This is why immutable updates are mandatory rather than stylish.',
      '**Derived state is an anti-pattern.** If a value can be computed from props or other state, compute it during render rather than storing it in a second `useState` synchronised by an effect. Storing it creates two sources of truth that can disagree, plus an extra render. `const fullName = first + " " + last` is better than any effect.',
      'The lazy initialiser matters: `useState(expensive())` calls `expensive` on **every** render and throws the result away; `useState(() => expensive())` calls it once. Same trap as building a new object literal in props for a memoised child.',
    ],
    keyPoints: [
      'The setter schedules; it does not assign. The current render keeps the old value.',
      'Use the functional updater whenever the next value depends on the previous.',
      'Mutating state in place leaves the reference unchanged, so nothing re-renders.',
      'Never store what you can derive.',
    ],
    interview:
      'The three-increments question is near-universal. Answer "1", then explain the closure, then give the updater fix. If they follow up with "why is state asynchronous", the answer is batching and interruptible rendering.',
    code: `const [count, setCount] = useState(0);

// all three read the same captured value → +1 total
const wrong = () => { setCount(count + 1); setCount(count + 1); setCount(count + 1); };

// each reads the pending value → +3 total
const right = () => { setCount(c => c + 1); setCount(c => c + 1); setCount(c => c + 1); };`,
    resources: [
      { label: 'React — Queueing a series of state updates', url: 'https://react.dev/learn/queueing-a-series-of-state-updates', kind: 'docs' },
      { label: 'React — You might not need an effect', url: 'https://react.dev/learn/you-might-not-need-an-effect', kind: 'docs', note: 'The single most useful page on the site. Read it before writing any effect.' },
    ],
  },
  {
    id: 'react-effects',
    area: 'React Core',
    group: 'Hooks',
    title: 'useEffect — dependencies, cleanup and when not to use it',
    status: 'covered',
    minutes: 9,
    summary:
      'The most misused hook in React. Most effects in most codebases should not exist, and the official documentation now says so explicitly.',
    body: [
      'An effect synchronises your component with an **external system** — a subscription, a network request, a DOM measurement, a timer. That is its purpose. It is not a lifecycle hook, and thinking of it as `componentDidMount` is what produces the misuse.',
      'The dependency array is compared with `Object.is`. No array means "after every commit"; `[]` means "once after mount"; `[a, b]` means "whenever `a` or `b` changes by reference". Because objects and functions get new identities every render, depending on one re-runs the effect every time — the classic infinite loop. Depend on primitives, or memoise the object with `useMemo`/`useCallback`.',
      '**Cleanup runs before the next effect and on unmount**, not only on unmount. That is why the return function is where you unsubscribe, clear intervals, and abort fetches. React 18\'s StrictMode deliberately mounts, unmounts and remounts in development to expose effects that lack cleanup — an effect that breaks under StrictMode was already broken.',
      'The cases that should **not** be effects, from the official guidance: transforming data for rendering (compute during render), handling user events (put it in the handler), resetting state when a prop changes (use a `key` instead), and synchronising two pieces of state (derive one from the other). Each removal deletes a render and a class of bugs.',
      '`useLayoutEffect` runs synchronously after DOM mutation and **before paint** — correct for measuring layout and adjusting it without a visible flicker, and wrong for anything else because it blocks painting.',
    ],
    keyPoints: [
      'Effects synchronise with external systems. Rendering data is not an external system.',
      'Cleanup runs between effects, not just at unmount.',
      'Object and function dependencies change identity every render — that is the infinite-loop cause.',
      '`useLayoutEffect` blocks paint; use it only for measurement.',
    ],
    interview:
      'Expect "what does the dependency array do" (three cases), "why does my effect loop" (object identity), and increasingly "when would you *not* use an effect". That last one separates people who have read the modern docs from people who learned React in 2019.',
    code: `// Loops forever: a fresh object each render
useEffect(() => { load(filters); }, [{ page, size }]);

// Correct: depend on the primitives
useEffect(() => { load({ page, size }); }, [page, size]);

// Correct cleanup: cancel rather than set state after unmount
useEffect(() => {
  const ctrl = new AbortController();
  fetchUser(id, ctrl.signal).then(setUser).catch(ignoreAbort);
  return () => ctrl.abort();
}, [id]);`,
    resources: [
      { label: 'React — Synchronising with effects', url: 'https://react.dev/learn/synchronizing-with-effects', kind: 'docs' },
      { label: 'React — You might not need an effect', url: 'https://react.dev/learn/you-might-not-need-an-effect', kind: 'docs' },
      { label: 'Dan Abramov — A complete guide to useEffect', url: 'https://overreacted.io/a-complete-guide-to-useeffect/', kind: 'article', note: 'Long, and the best thing written about the hook.' },
    ],
  },
  {
    id: 'react-hooks-rest',
    area: 'React Core',
    group: 'Hooks',
    title: 'useRef, useContext, useReducer and custom hooks',
    status: 'partial',
    minutes: 8,
    summary:
      'The rest of the core hook set, plus the rule that governs all of them and the one place that rule now bends.',
    body: [
      '**Rules of hooks**: call them at the top level, never inside conditions, loops or nested functions, and only from components or other hooks. The reason is mechanical — React identifies hooks by **call order** into a per-component list, so skipping one shifts every later hook onto the wrong slot. React 19\'s `use()` is the single documented exception.',
      '**`useRef`** is a stable mutable box that survives renders and is invisible to rendering: changing `.current` triggers nothing. That makes it right for DOM handles, timer ids, previous values and "did I already do this" flags — and wrong for anything the UI displays, because the UI will not update.',
      '**`useContext`** reads the nearest provider. Its performance characteristic is the thing to know: **every consumer re-renders when the value\'s reference changes**, so passing an inline object literal as `value` re-renders all consumers on every provider render. Memoise the value, or split read and write into two contexts. Context is a dependency-injection mechanism, not a state manager — it does not batch, select or prevent re-renders.',
      '**`useReducer`** centralises transitions when the next state depends on the previous in non-trivial ways, or when several values change together. It makes state changes describable as actions, which is easier to test and to reason about than five setters called in sequence. It is `useState` with the update logic hoisted out.',
      '**Custom hooks** share *logic*, never state. Two components calling `useCounter()` get two independent counters — a point interviewers probe. A custom hook is simply a function whose name begins with `use` and which calls other hooks; that naming convention is what lets the linter check the rules.',
    ],
    keyPoints: [
      'Hooks are matched by call order — that is why the rules exist.',
      'A ref change never re-renders. That is the feature.',
      'Context re-renders every consumer on reference change; memoise the value.',
      'Custom hooks share logic, not state.',
    ],
    interview:
      '"Difference between state and ref", "why can\'t hooks be conditional", and "two components use the same custom hook — do they share state?" are all standard. The last one is answered "no" with an explanation of per-call-site hook slots.',
    code: `// Stable identity for a context value, so consumers do not re-render needlessly
const value = useMemo(() => ({ user, setUser }), [user]);
return <UserContext.Provider value={value}>{children}</UserContext.Provider>;`,
    resources: [
      { label: 'React — Rules of hooks', url: 'https://react.dev/reference/rules/rules-of-hooks', kind: 'docs' },
      { label: 'React — Passing data deeply with context', url: 'https://react.dev/learn/passing-data-deeply-with-context', kind: 'docs' },
      { label: 'React — Reusing logic with custom hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', kind: 'docs' },
    ],
  },
  {
    id: 'react-class-lifecycle',
    area: 'React Core',
    group: 'Legacy',
    title: 'Class components and the lifecycle vocabulary',
    status: 'missing',
    minutes: 6,
    summary:
      'On the Mettl competency list as "Lifecycle Application", and unavoidable in any codebase older than 2019. A hooks-only preparation cannot answer these.',
    body: [
      'Mounting: `constructor` → `static getDerivedStateFromProps` → `render` → `componentDidMount`. The last is where subscriptions and initial fetches belong, because the DOM now exists and `setState` is safe.',
      'Updating: `getDerivedStateFromProps` → `shouldComponentUpdate` → `render` → `getSnapshotBeforeUpdate` → `componentDidUpdate`. `shouldComponentUpdate` returning `false` skips the render for that subtree — `React.PureComponent` implements it as a shallow prop and state comparison, making it the class-era `React.memo`.',
      'Unmounting: `componentWillUnmount`, where you remove listeners, clear timers and cancel requests. Forgetting it is the classic memory leak, and it is the exact job the effect cleanup function inherited.',
      'The deprecated trio — `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate` — were unsafe under concurrent rendering because they could run more than once per commit. They survive as `UNSAFE_`-prefixed names.',
      'Mapping to hooks: `componentDidMount` ≈ `useEffect(fn, [])`; `componentDidUpdate` ≈ `useEffect(fn, [deps])`; `componentWillUnmount` ≈ the cleanup return; `shouldComponentUpdate` ≈ `React.memo`. The mapping is approximate, not exact — effects run after paint, `componentDidUpdate` runs after commit but before paint, which is why `useLayoutEffect` is the closer analogue for measurement.',
    ],
    keyPoints: [
      '`componentDidMount` = after first commit, DOM available.',
      '`shouldComponentUpdate` skips the render; `PureComponent` implements it shallowly.',
      '`componentWillUnmount` is the cleanup; missing it leaks.',
      'The `componentWill*` trio is unsafe under concurrent rendering.',
    ],
    interview:
      'Directly on the Mettl syllabus: "which lifecycle method for an API call" (`componentDidMount`), "what does `shouldComponentUpdate` do", and "map lifecycles to hooks". Say the mapping is approximate and name why — it shows depth rather than memorisation.',
    resources: [
      { label: 'React — Component (legacy API reference)', url: 'https://react.dev/reference/react/Component', kind: 'docs', note: 'The complete lifecycle reference, still maintained.' },
      { label: 'React lifecycle methods diagram', url: 'https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/', kind: 'practice', note: 'Interactive diagram — the fastest way to memorise the order.' },
    ],
  },
];
