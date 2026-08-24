/**
 * Mettl-shaped rapid-fire bank.
 *
 * Built from the vendor's own published competency lists rather than from
 * generic React quizzes — see `_bmad-output/research/technical-mettl-react-oa-research-2026-08-25.md`.
 *
 * The paper most likely to land for a 2–5 year React lateral is
 * **36 MCQs in 50 minutes — 83 seconds per question**. Every item here is
 * written to be answerable in that time. If an item needs a scratchpad, it is
 * not a Mettl item and does not belong in this bank.
 *
 * Three competencies appear on the vendor list that almost no 2026 prep bank
 * covers, and they are covered here on purpose: **Flux**, **Webpack**, and the
 * **class lifecycle**. Modern practice has moved on; the competency list has not.
 */

/** Mirrors Mercer | Mettl's published competency names. */
export type MettlCompetency =
  | 'ECMAScript'
  | 'JS Logic'
  | 'Async & Event Loop'
  | 'React Core'
  | 'React Hooks'
  | 'React 19'
  | 'Redux'
  | 'React Tools'
  | 'Performance'
  | 'Forms & Events'
  | 'HTML & CSS';

export type BankDifficulty = 'basic' | 'intermediate' | 'advanced';

export interface BankQuestion {
  id: string;
  category: MettlCompetency;
  /** The vendor's own sub-skill name, so a gap can be traced to the syllabus. */
  skill: string;
  difficulty: BankDifficulty;
  question: string;
  codeSnippet?: string;
  options: string[];
  correct: number;
  /** States the rule, not just the answer — the next unseen item is the target. */
  explanation: string;
}

/**
 * Inferred from the order and granularity of the vendor's competency lists.
 * Weighting is an inference; the competency names are not.
 */
export const METTL_BLUEPRINT: { competency: MettlCompetency; share: number }[] = [
  { competency: 'React Core', share: 0.25 },
  { competency: 'Redux', share: 0.19 },
  { competency: 'ECMAScript', share: 0.17 },
  { competency: 'React Hooks', share: 0.14 },
  { competency: 'JS Logic', share: 0.08 },
  { competency: 'React 19', share: 0.08 },
  { competency: 'Async & Event Loop', share: 0.05 },
  { competency: 'React Tools', share: 0.04 },
];

/** The real paper: 36 questions, 50 minutes. */
export const METTL_PAPER = { questions: 36, minutes: 50 } as const;

export const RAPID_FIRE_BANK: BankQuestion[] = [
  /* ── ECMAScript — template literals · arrow functions · destructuring · modules · classes ── */
  {
    id: 'es-1', category: 'ECMAScript', skill: 'Arrow Functions', difficulty: 'intermediate',
    question: 'What does this log?',
    codeSnippet: `const obj = {
  name: 'React',
  greet: () => console.log(this.name),
  greet2() { console.log(this.name); }
};
obj.greet();
obj.greet2();`,
    options: ['React, React', 'undefined, React', 'React, undefined', 'undefined, undefined'],
    correct: 1,
    explanation: 'Arrow functions have no own `this` — they close over the enclosing lexical scope, which here is the module/global, not `obj`. A shorthand method gets `this` from the call site, so `obj.greet2()` sees `obj`. Rule: never use an arrow for an object method that needs `this`.',
  },
  {
    id: 'es-2', category: 'ECMAScript', skill: 'De-Structuring Assignments', difficulty: 'intermediate',
    question: 'What is `b`?',
    codeSnippet: `const { a: { b = 5 } = {} } = { a: {} };`,
    options: ['5', 'undefined', 'TypeError', '{}'],
    correct: 0,
    explanation: 'Defaults in destructuring apply only when the value is `undefined`. `a` is `{}`, so the `= {}` default is skipped; `b` is missing from it, so `b` takes its default of 5. Rule: destructuring defaults fire on `undefined`, never on `null` or `0`.',
  },
  {
    id: 'es-3', category: 'ECMAScript', skill: 'De-Structuring Assignments', difficulty: 'basic',
    question: 'How do you swap two variables in one line with destructuring?',
    codeSnippet: `let a = 1, b = 2;`,
    options: ['`[a, b] = [b, a];`', '`{a, b} = {b, a};`', '`a, b = b, a;`', '`swap(a, b);`'],
    correct: 0,
    explanation: 'Array destructuring evaluates the right-hand side first, then assigns positionally. Object destructuring cannot swap because the keys, not the positions, do the binding.',
  },
  {
    id: 'es-4', category: 'ECMAScript', skill: 'Template and Extended Literals', difficulty: 'intermediate',
    question: 'A tagged template `tag`x${1}y`` receives which first argument?',
    options: [
      'An array of the string chunks: `["x", "y"]`',
      'The fully interpolated string `"x1y"`',
      'The value `1`',
      'An object `{ raw: "x1y" }`',
    ],
    correct: 0,
    explanation: 'A tag function receives the array of literal chunks first (with a `.raw` property), then each interpolated value as a separate argument. This is how libraries like styled-components read the CSS you write.',
  },
  {
    id: 'es-5', category: 'ECMAScript', skill: 'Modules and Classes', difficulty: 'intermediate',
    question: 'Which statement about ES modules is TRUE?',
    options: [
      'Imports are hoisted and bindings are live — reassigning the export updates the importer',
      'Imports are copies, so later changes in the module are invisible',
      '`import` can be used conditionally inside an `if` block',
      'ES modules execute in non-strict mode by default',
    ],
    correct: 0,
    explanation: 'ES module bindings are live views, not copies; the importer sees a later reassignment. Static `import` is hoisted and cannot be conditional — that is what dynamic `import()` is for. Modules are always strict mode.',
  },
  {
    id: 'es-6', category: 'ECMAScript', skill: 'Modules and Classes', difficulty: 'intermediate',
    question: 'What happens?',
    codeSnippet: `class A {
  #count = 0;
  inc() { this.#count++; return this.#count; }
}
const a = new A();
console.log(a.inc(), a.#count);`,
    options: ['1, 1', '1, undefined', 'SyntaxError', '1, 0'],
    correct: 2,
    explanation: 'Private class fields (`#count`) are only accessible inside the class body. Touching `a.#count` from outside is a **syntax** error, caught at parse time — not a runtime `undefined`.',
  },
  {
    id: 'es-7', category: 'ECMAScript', skill: 'Extended Literals', difficulty: 'basic',
    question: 'What does `[...new Set([1, 2, 2, 3])]` produce?',
    options: ['`[1, 2, 3]`', '`[1, 2, 2, 3]`', '`Set(3)`', '`[[1], [2], [3]]`'],
    correct: 0,
    explanation: 'A `Set` stores unique values by SameValueZero; spreading it back into an array is the idiomatic dedupe. Note `NaN` is considered equal to itself here, unlike `===`.',
  },
  {
    id: 'es-8', category: 'ECMAScript', skill: 'Modules and Classes', difficulty: 'advanced',
    question: 'What does this log?',
    codeSnippet: `class Base { static who() { return 'Base'; } greet() { return this.constructor.who(); } }
class Child extends Base { static who() { return 'Child'; } }
console.log(new Child().greet());`,
    options: ["'Child'", "'Base'", 'undefined', 'TypeError'],
    correct: 0,
    explanation: '`this.constructor` on a `Child` instance is `Child`, and static methods are inherited through the prototype chain — so the override wins. Static inheritance is real inheritance, not a copy.',
  },

  /* ── React Core — state · props · lifecycle · virtual vs actual DOM · HOC ── */
  {
    id: 'rc-1', category: 'React Core', skill: 'State Application', difficulty: 'intermediate',
    question: 'What is the count after clicking once?',
    codeSnippet: `const [count, setCount] = useState(0);
const onClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};`,
    options: ['1', '3', '0', '2'],
    correct: 0,
    explanation: '`count` is captured by the closure at render time, so all three calls compute `0 + 1`. Rule: to build on the previous value use the functional updater — `setCount(c => c + 1)` — which would give 3.',
  },
  {
    id: 'rc-2', category: 'React Core', skill: 'Virtual and Actual DOM', difficulty: 'intermediate',
    question: 'What does React actually do with the virtual DOM?',
    options: [
      'Diffs the new tree against the previous one and applies the minimal set of real DOM mutations',
      'Renders the whole tree to the real DOM on every state change, and the browser deduplicates it',
      'Keeps a copy of the real DOM in memory to read layout values faster',
      'Replaces the browser DOM entirely with its own rendering engine',
    ],
    correct: 0,
    explanation: 'The virtual DOM is a plain-object description of the UI. Reconciliation diffs old against new and commits only the differences. It is not faster than a hand-written minimal DOM update — it is faster than naive full re-rendering, and far easier to write.',
  },
  {
    id: 'rc-3', category: 'React Core', skill: 'Lifecycle Application', difficulty: 'intermediate',
    question: 'Which class lifecycle method is the correct place to fire a network request after the component first appears?',
    options: ['`componentDidMount`', '`componentWillMount`', '`render`', '`constructor`'],
    correct: 0,
    explanation: '`componentDidMount` runs once after the first commit, when the DOM exists and it is safe to `setState`. `componentWillMount` is deprecated, `render` must stay pure, and the constructor runs before mounting.',
  },
  {
    id: 'rc-4', category: 'React Core', skill: 'Lifecycle Application', difficulty: 'advanced',
    question: 'What does `shouldComponentUpdate` returning `false` do?',
    options: [
      'Skips re-rendering this component and its children for that update',
      'Skips this component but still re-renders its children',
      'Cancels the state update entirely so state does not change',
      'Throws in StrictMode',
    ],
    correct: 0,
    explanation: 'It skips the render phase for that subtree; the state still changes. `React.PureComponent` implements it as a shallow prop/state comparison — the class equivalent of `React.memo`.',
  },
  {
    id: 'rc-5', category: 'React Core', skill: 'Higher Order Components', difficulty: 'intermediate',
    question: 'A Higher Order Component is best described as:',
    options: [
      'A function that takes a component and returns a new component',
      'A component that renders other components as children',
      'A component defined at the top of the file',
      'A hook that wraps another hook',
    ],
    correct: 0,
    explanation: '`withRouter`, `connect` and `withTheme` are HOCs: `Component => Component`. They compose behaviour without inheritance. Hooks largely replaced them, but Mettl lists HOCs as a named React competency.',
  },
  {
    id: 'rc-6', category: 'React Core', skill: 'Props Application', difficulty: 'basic',
    question: 'Which statement about props is TRUE?',
    options: [
      'Props are read-only — a component must never mutate its own props',
      'Props can be mutated as long as you call `forceUpdate` afterwards',
      'Props are copied deeply on every render',
      'Props and state are the same thing with different names',
    ],
    correct: 0,
    explanation: 'React components must behave like pure functions with respect to their props. Mutating props breaks the data flow the parent owns, and React will not re-render from it.',
  },
  {
    id: 'rc-7', category: 'React Core', skill: 'Reconciliation / keys', difficulty: 'advanced',
    question: 'A list is rendered with `key={index}` and a new item is inserted at the front. What goes wrong?',
    options: [
      'Every item after the insertion is treated as changed, so state inside those rows is attached to the wrong data',
      'Nothing — index keys are equivalent to id keys',
      'React throws a duplicate-key error',
      'Only the first row re-renders',
    ],
    correct: 0,
    explanation: 'Keys identify an element across renders. With index keys, inserting at the front shifts every index, so React matches row 0 to the new item and carries the old row state along with it. Rule: keys must be stable, unique and tied to the data.',
  },
  {
    id: 'rc-8', category: 'React Core', skill: 'State Application', difficulty: 'intermediate',
    question: 'Why must you not mutate state directly, e.g. `state.items.push(x)`?',
    options: [
      'React compares by reference — the same array reference means no re-render',
      'It throws a runtime error in production',
      'Arrays cannot be mutated in JavaScript',
      'It only breaks in class components',
    ],
    correct: 0,
    explanation: 'React (and `memo`, and `PureComponent`) compares old and new values by reference. Mutating in place leaves the reference identical, so the update is invisible. Rule: replace, never mutate — `setItems([...items, x])`.',
  },
  {
    id: 'rc-9', category: 'React Core', skill: 'Components and events', difficulty: 'intermediate',
    question: 'What renders?',
    codeSnippet: `function App() {
  const items = [];
  return <div>{items.length && <span>Has items</span>}</div>;
}`,
    options: ['`<div>0</div>`', '`<div></div>`', '`<div>false</div>`', 'A runtime error'],
    correct: 0,
    explanation: '`0 && x` short-circuits to `0`, and React renders the number 0 as text. `false`, `null` and `undefined` render nothing — `0` does not. Rule: guard with `items.length > 0 &&`.',
  },
  {
    id: 'rc-10', category: 'React Core', skill: 'Pure components', difficulty: 'intermediate',
    question: 'A `React.memo` component still re-renders on every parent render. The most likely cause is:',
    options: [
      'A prop is a new object/array/function literal created during the parent render',
      '`React.memo` only works on class components',
      'The component uses hooks',
      'Memo was removed in React 19',
    ],
    correct: 0,
    explanation: '`memo` does a shallow comparison. `<Child style={{a:1}} onX={() => …} />` creates fresh references every render, so the comparison always fails. Stabilise with `useMemo`/`useCallback` or hoist the literal.',
  },
  {
    id: 'rc-11', category: 'React Core', skill: 'Lifecycle Application', difficulty: 'advanced',
    question: 'In React 18+ StrictMode (development), what happens to a component on mount?',
    options: [
      'It mounts, unmounts and remounts — effects run, clean up, then run again',
      'It mounts once, exactly as in production',
      'Renders are skipped entirely',
      'Only class components are double-invoked',
    ],
    correct: 0,
    explanation: 'StrictMode double-invokes render and re-runs effects in development to surface missing cleanup. It is a bug detector, not a bug: an effect that breaks under it is an effect with no cleanup.',
  },
  {
    id: 'rc-12', category: 'React Core', skill: 'Props Application', difficulty: 'basic',
    question: 'What does `props.children` contain?',
    options: [
      'Whatever was written between the component’s opening and closing tags',
      'All the DOM nodes the component rendered',
      'The component’s state tree',
      'The parent component instance',
    ],
    correct: 0,
    explanation: '`children` is an ordinary prop that JSX fills from the element body. It is what makes layout wrappers, providers and slots possible.',
  },

  /* ── React Hooks ── */
  {
    id: 'rh-1', category: 'React Hooks', skill: 'Rules of Hooks', difficulty: 'basic',
    question: 'Why can hooks not be called inside a condition or loop?',
    options: [
      'React identifies hooks by call order, so the order must be identical on every render',
      'It is only a lint style preference',
      'Conditions make hooks asynchronous',
      'Because hooks are class methods internally',
    ],
    correct: 0,
    explanation: 'React stores hook state in a per-component list indexed by call order. Skipping a hook on one render shifts every later hook onto the wrong slot. The single exception in React 19 is `use()`.',
  },
  {
    id: 'rh-2', category: 'React Hooks', skill: 'useEffect', difficulty: 'intermediate',
    question: 'When does the effect run?',
    codeSnippet: `useEffect(() => {
  console.log('run');
});`,
    options: ['After every render', 'Only once after mount', 'Only when props change', 'Never — the dependency array is required'],
    correct: 0,
    explanation: 'No dependency array means "after every commit". `[]` means once after mount. `[a]` means whenever `a` changes by `Object.is`. The three cases are a favourite Mettl discrimination item.',
  },
  {
    id: 'rh-3', category: 'React Hooks', skill: 'useEffect cleanup', difficulty: 'intermediate',
    question: 'What is the returned function from `useEffect` for?',
    options: [
      'Cleanup — it runs before the next effect and on unmount',
      'It is the value the effect produces for the component',
      'It runs only on unmount, never between renders',
      'Nothing — the return value is ignored',
    ],
    correct: 0,
    explanation: 'Cleanup runs before the effect re-runs *and* at unmount. That is why subscriptions, intervals and listeners belong there — and why StrictMode’s double-invoke catches the ones that are missing.',
  },
  {
    id: 'rh-4', category: 'React Hooks', skill: 'useRef', difficulty: 'intermediate',
    question: 'Which is TRUE of `useRef`?',
    options: [
      'Changing `.current` does not trigger a re-render',
      'Changing `.current` re-renders the component',
      '`useRef` may only hold DOM nodes',
      '`useRef` recreates its object on every render',
    ],
    correct: 0,
    explanation: 'A ref is a stable mutable box that survives renders and is invisible to the render cycle. That is exactly why it suits timer IDs, previous values and DOM handles — and why it must not hold anything the UI displays.',
  },
  {
    id: 'rh-5', category: 'React Hooks', skill: 'useMemo vs useCallback', difficulty: 'intermediate',
    question: '`useCallback(fn, deps)` is equivalent to:',
    options: [
      '`useMemo(() => fn, deps)`',
      '`useMemo(() => fn(), deps)`',
      '`useRef(fn)`',
      '`useEffect(() => fn, deps)`',
    ],
    correct: 0,
    explanation: '`useCallback` memoises the function itself; `useMemo` memoises the result of calling something. Both exist to keep a **reference** stable across renders, usually for a `memo`’d child or a dependency array.',
  },
  {
    id: 'rh-6', category: 'React Hooks', skill: 'Custom hooks', difficulty: 'intermediate',
    question: 'Two components call the same custom hook `useCounter()`. What do they share?',
    options: [
      'Nothing — each call gets its own independent state',
      'The same state, like a global store',
      'State, but not effects',
      'Only the first mounted component gets state',
    ],
    correct: 0,
    explanation: 'A custom hook shares *logic*, never state. Each call site gets its own hook slots. Sharing state needs context or a store — a very common interview trap.',
  },
  {
    id: 'rh-7', category: 'React Hooks', skill: 'useState initialiser', difficulty: 'advanced',
    question: 'What is the difference between `useState(expensive())` and `useState(() => expensive())`?',
    options: [
      'The first calls `expensive()` on every render; the second only on the first render',
      'They are identical',
      'The second never calls it',
      'The first is invalid syntax',
    ],
    correct: 0,
    explanation: 'Arguments are evaluated before the call, so `useState(expensive())` runs the work every render and throws the result away. The lazy initialiser form runs it once. Same trap as inline objects in `memo` props.',
  },
  {
    id: 'rh-8', category: 'React Hooks', skill: 'useEffect dependencies', difficulty: 'advanced',
    question: 'An effect with `[user]` where `user = { id }` is built inline in render. What happens?',
    options: [
      'The effect runs after every render, because the object identity changes each time',
      'The effect runs only when `id` changes',
      'React deep-compares objects in dependency arrays',
      'React throws a dependency error',
    ],
    correct: 0,
    explanation: 'Dependencies are compared with `Object.is` — reference equality for objects. Depend on the primitive (`[user.id]`) or memoise the object. This is the single most common cause of infinite effect loops.',
  },

  /* ── Redux — pure functions · actions · reducers · store · data flow · react-redux ── */
  {
    id: 'rx-1', category: 'Redux', skill: 'Pure Functions', difficulty: 'basic',
    question: 'A reducer must be a pure function. Which of these breaks that rule?',
    options: [
      'Calling `Date.now()` inside the reducer to stamp the new state',
      'Returning a new object built with the spread operator',
      'Returning the existing state unchanged for an unknown action',
      'Using a `switch` on `action.type`',
    ],
    correct: 0,
    explanation: 'A pure function returns the same output for the same input and causes no side effects. `Date.now()`, `Math.random()`, API calls and mutation are all disqualifying — they make time-travel debugging and replay impossible.',
  },
  {
    id: 'rx-2', category: 'Redux', skill: 'Data flow', difficulty: 'basic',
    question: 'What is the correct Redux data flow?',
    options: [
      'dispatch(action) → reducer(state, action) → new store state → subscribed UI re-renders',
      'Component → store → action → reducer → component',
      'reducer → dispatch → action → store',
      'Component mutates the store directly, then notifies the reducer',
    ],
    correct: 0,
    explanation: 'Strictly unidirectional. The only way to change state is to dispatch an action; the only thing that computes new state is a reducer; the store is the single source of truth.',
  },
  {
    id: 'rx-3', category: 'Redux', skill: 'Actions', difficulty: 'basic',
    question: 'What is the one required property of a Redux action?',
    options: ['`type`', '`payload`', '`meta`', '`id`'],
    correct: 0,
    explanation: '`type` is mandatory and should be a string constant. `payload`, `meta` and `error` are Flux Standard Action conventions, not requirements.',
  },
  {
    id: 'rx-4', category: 'Redux', skill: 'Reducers', difficulty: 'intermediate',
    question: 'What must a reducer return for an action it does not recognise?',
    options: [
      'The existing state, unchanged',
      '`undefined`',
      '`null`',
      'The initial state',
    ],
    correct: 0,
    explanation: 'The `default` branch returns `state`. Returning `undefined` breaks the store; returning the initial state would wipe data every time any other slice’s action passed through.',
  },
  {
    id: 'rx-5', category: 'Redux', skill: 'Store', difficulty: 'intermediate',
    question: 'How many stores should a typical Redux application have?',
    options: [
      'One — a single source of truth, split into slices by `combineReducers`',
      'One per feature module',
      'One per route',
      'One per component tree branch',
    ],
    correct: 0,
    explanation: 'Redux mandates a single store. Modularity comes from combining reducers into slices of one state tree — this is a defining difference from Flux, which allows multiple stores.',
  },
  {
    id: 'rx-6', category: 'Redux', skill: 'Integrating React with Redux', difficulty: 'intermediate',
    question: 'What do the two arguments of `connect(mapStateToProps, mapDispatchToProps)` do?',
    options: [
      'Select state slices as props, and bind action creators as props',
      'Create the store, and create the reducer',
      'Subscribe to routes, and to actions',
      'Memoise the component, and its children',
    ],
    correct: 0,
    explanation: '`connect` is the classic HOC binding the store to a component. `mapStateToProps` reads; `mapDispatchToProps` writes. Hooks replaced it with `useSelector` / `useDispatch`, but the competency list still names `connect`.',
  },
  {
    id: 'rx-7', category: 'Redux', skill: 'Middleware', difficulty: 'advanced',
    question: 'Why is middleware such as `redux-thunk` needed?',
    options: [
      'Reducers must stay pure, so asynchronous work has to happen outside them',
      'Because reducers cannot handle `switch` statements',
      'To make the store faster',
      'To allow multiple stores',
    ],
    correct: 0,
    explanation: 'Middleware sits between `dispatch` and the reducer. Thunks let you dispatch a *function* that performs async work and dispatches plain actions when it resolves — keeping the reducer pure.',
  },
  {
    id: 'rx-8', category: 'Redux', skill: 'Reducers', difficulty: 'intermediate',
    question: 'What is wrong here?',
    codeSnippet: `function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      state.items.push(action.payload);
      return state;
    default:
      return state;
  }
}`,
    options: [
      'It mutates state and returns the same reference, so subscribers see no change',
      'Nothing — this is the standard pattern',
      '`switch` is not allowed in reducers',
      'It is missing a `break`',
    ],
    correct: 0,
    explanation: 'Two faults from one line: mutation (impure) and an unchanged reference (`===` comparison sees no update, so connected components never re-render). Correct: `return { ...state, items: [...state.items, action.payload] }`.',
  },
  {
    id: 'rx-9', category: 'Redux', skill: 'Store', difficulty: 'intermediate',
    question: 'Which pair of store methods reads state and registers a listener?',
    options: [
      '`getState()` and `subscribe(listener)`',
      '`readState()` and `onChange(listener)`',
      '`state()` and `watch(listener)`',
      '`select()` and `connect(listener)`',
    ],
    correct: 0,
    explanation: 'The store API is deliberately tiny: `getState`, `dispatch`, `subscribe`, `replaceReducer`. Everything else — `connect`, `useSelector` — is built on those four.',
  },
  {
    id: 'rx-10', category: 'Redux', skill: 'react-redux', difficulty: 'advanced',
    question: '`useSelector(state => ({ a: state.a, b: state.b }))` re-renders on every dispatch. Why?',
    options: [
      'It returns a new object each call, and the default comparison is reference equality',
      '`useSelector` always re-renders on every action',
      'Selectors may not return objects',
      'The store is missing a `Provider`',
    ],
    correct: 0,
    explanation: '`useSelector` compares the previous and next result with `===`. A fresh object literal never equals the last one. Fix: select primitives separately, or pass `shallowEqual` as the second argument.',
  },

  /* ── React 19 — Server Components · Actions · new hooks · createRoot/hydrateRoot ── */
  {
    id: 'r19-1', category: 'React 19', skill: 'Rendering: createRoot / hydrateRoot', difficulty: 'intermediate',
    question: 'What is the difference between `createRoot` and `hydrateRoot`?',
    options: [
      '`createRoot` renders into empty DOM; `hydrateRoot` attaches to server-rendered HTML that already exists',
      '`hydrateRoot` is the legacy API replaced by `createRoot`',
      '`createRoot` is for class components, `hydrateRoot` for function components',
      'They are aliases of each other',
    ],
    correct: 0,
    explanation: '`hydrateRoot` reuses existing server-rendered markup and attaches event handlers to it; mismatches produce hydration errors. `createRoot` (React 18+) replaced `ReactDOM.render` for client-only rendering.',
  },
  {
    id: 'r19-2', category: 'React 19', skill: 'New hook — useActionState', difficulty: 'advanced',
    question: '`useActionState` returns which tuple?',
    options: [
      '`[state, formAction, isPending]`',
      '`[state, setState]`',
      '`[isPending, error]`',
      '`[formAction, reset]`',
    ],
    correct: 0,
    explanation: 'It collapses the `useState` + `onSubmit` + loading-flag triad into one hook, and adds `isPending` as the third element. It was `useFormState` in canary and moved from `react-dom` to `react`.',
  },
  {
    id: 'r19-3', category: 'React 19', skill: 'New hook — useOptimistic', difficulty: 'advanced',
    question: 'What does `useOptimistic` do?',
    options: [
      'Shows a temporary expected value immediately, then reconciles when the async action settles',
      'Caches API responses between renders',
      'Retries a failed request automatically',
      'Defers a state update to a lower priority',
    ],
    correct: 0,
    explanation: 'It renders the optimistic value while an action is in flight and reverts or confirms when the real result lands — the "like button responds instantly" pattern, without hand-rolled rollback state.',
  },
  {
    id: 'r19-4', category: 'React 19', skill: 'New hook — useFormStatus', difficulty: 'advanced',
    question: 'Where must a component calling `useFormStatus` sit?',
    options: [
      'Inside a `<form>` that has an action — it reads the parent form’s pending state',
      'Anywhere; it reads global submission state',
      'Directly in the component that owns the form state',
      'Inside a Server Component only',
    ],
    correct: 0,
    explanation: '`useFormStatus` (from `react-dom`) lets a nested submit button read the enclosing form’s status without prop drilling or context — the point is that a shared `<SubmitButton>` needs no props.',
  },
  {
    id: 'r19-5', category: 'React 19', skill: 'New hook — use()', difficulty: 'advanced',
    question: 'What makes `use()` unlike every other hook?',
    options: [
      'It can be called conditionally, and it reads promises as well as context',
      'It may only be called at the top level of a Server Component',
      'It replaces `useState` entirely',
      'It cannot read context',
    ],
    correct: 0,
    explanation: '`use()` reads a resource during render — a promise (suspending until it resolves) or a context — and is explicitly exempt from the top-level rule that binds every other hook.',
  },
  {
    id: 'r19-6', category: 'React 19', skill: 'Server Components', difficulty: 'advanced',
    question: 'Which is TRUE of React Server Components?',
    options: [
      'They run on the server, ship no JavaScript to the client, and cannot use state or effects',
      'They are client components rendered ahead of time',
      'They can call `useState` as long as they are async',
      'They replace SSR entirely',
    ],
    correct: 0,
    explanation: 'RSCs execute on the server and stream a serialised result; they have no state, no effects and no browser APIs. Interactivity lives in client components marked `"use client"`. `"use server"` marks server actions.',
  },
  {
    id: 'r19-7', category: 'React 19', skill: 'ref as a prop', difficulty: 'intermediate',
    question: 'What changed about `ref` for function components in React 19?',
    options: [
      '`ref` can be passed as a normal prop — `forwardRef` is no longer required',
      '`ref` was removed in favour of `useRef` only',
      'Refs must now be objects, never callbacks',
      'Nothing changed',
    ],
    correct: 0,
    explanation: 'React 19 lets function components accept `ref` directly in props, deprecating the `forwardRef` wrapper for new code. Callback refs also gained a cleanup return.',
  },

  /* ── JS Logic — equality · coercion · closures · this · prototypes ── */
  {
    id: 'jl-1', category: 'JS Logic', skill: 'Equality', difficulty: 'intermediate',
    question: 'What does this log?',
    codeSnippet: `console.log([] == false, [] === false, !![]);`,
    options: ['true false true', 'true true true', 'false false true', 'true false false'],
    correct: 0,
    explanation: '`==` coerces: `[]` → `""` → `0`, and `false` → `0`, so it is `true`. `===` compares types first, so `false`. Every object is truthy, so `!![]` is `true` — an array is falsy in comparison and truthy in a condition.',
  },
  {
    id: 'jl-2', category: 'JS Logic', skill: 'Closures', difficulty: 'intermediate',
    question: 'What is logged?',
    codeSnippet: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j), 0);`,
    options: ['3 3 3 then 0 1 2', '0 1 2 then 0 1 2', '3 3 3 then 3 3 3', '0 1 2 then 3 3 3'],
    correct: 0,
    explanation: '`var` is function-scoped — one binding, read after the loop finishes. `let` creates a fresh binding per iteration, which the closure captures. This is the classic closure item and it appears in almost every bank.',
  },
  {
    id: 'jl-3', category: 'JS Logic', skill: 'this binding', difficulty: 'advanced',
    question: 'What is logged?',
    codeSnippet: `const o = { n: 1, get() { return this.n; } };
const f = o.get;
console.log(o.get(), f());`,
    options: ['1 undefined', '1 1', 'undefined undefined', '1 TypeError'],
    correct: 0,
    explanation: '`this` is determined by the call site, not where the function was defined. Detaching the method loses the receiver — in a module (strict mode) `this` is `undefined`, so `this.n` is `undefined`. Fix with `bind`, an arrow wrapper, or a class field.',
  },

  /* ── Async & Event Loop ── */
  {
    id: 'ae-1', category: 'Async & Event Loop', skill: 'Microtasks vs macrotasks', difficulty: 'advanced',
    question: 'What is the output order?',
    codeSnippet: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');`,
    options: ['A D C B', 'A D B C', 'A B C D', 'A C D B'],
    correct: 0,
    explanation: 'Synchronous code first (A, D). Then the entire microtask queue — promise callbacks — drains (C). Only then does the event loop take a macrotask such as a timer (B). Microtasks always beat timers.',
  },
  {
    id: 'ae-2', category: 'Async & Event Loop', skill: 'async/await', difficulty: 'intermediate',
    question: 'What does an `async` function always return?',
    options: [
      'A Promise, whatever you return inside it',
      'The value you return, unwrapped',
      '`undefined` unless you `await` it',
      'A generator',
    ],
    correct: 0,
    explanation: '`async` wraps the return value in a resolved promise and a thrown error in a rejected one. That is why the caller must `await` it or chain `.then`, and why `try/catch` inside works for awaited rejections.',
  },

  /* ── React Tools — Router · Flux · Webpack ── */
  {
    id: 'rt-1', category: 'React Tools', skill: 'Flux', difficulty: 'advanced',
    question: 'What distinguishes Flux from Redux?',
    options: [
      'Flux allows multiple stores and uses a central dispatcher; Redux has one store and no dispatcher',
      'Flux is unidirectional, Redux is bidirectional',
      'Flux uses reducers, Redux uses stores',
      'They are the same library under different names',
    ],
    correct: 0,
    explanation: 'Both are unidirectional. Flux has many stores coordinated by a singleton dispatcher; Redux collapses that to one store, pure reducers and no dispatcher object. Named on the vendor competency list despite being long out of fashion.',
  },
  {
    id: 'rt-2', category: 'React Tools', skill: 'Webpack', difficulty: 'intermediate',
    question: 'In Webpack, what is a loader?',
    options: [
      'A transform applied to a file as it is added to the bundle — e.g. `babel-loader` for JSX',
      'A plugin that runs after the bundle is written',
      'The entry point of the application',
      'A cache of previously built modules',
    ],
    correct: 0,
    explanation: 'Loaders transform individual files during the build (JSX → JS, SCSS → CSS). Plugins act on the whole compilation (HTML generation, define, split-chunks). Confusing the two is the classic Webpack item.',
  },
  {
    id: 'rt-3', category: 'React Tools', skill: 'React Router', difficulty: 'intermediate',
    question: 'Which hook reads the dynamic segment of `/user/:id` in React Router?',
    options: ['`useParams()`', '`useLocation()`', '`useNavigate()`', '`useSearchParams()`'],
    correct: 0,
    explanation: '`useParams` returns path parameters; `useSearchParams` handles the query string; `useLocation` gives the whole location object; `useNavigate` performs navigation.',
  },
  {
    id: 'rt-4', category: 'React Tools', skill: 'Code splitting', difficulty: 'intermediate',
    question: '`React.lazy(() => import("./X"))` must be rendered inside which component?',
    options: ['`<Suspense fallback={…}>`', '`<ErrorBoundary>`', '`<StrictMode>`', '`<Profiler>`'],
    correct: 0,
    explanation: 'A lazy component suspends while its chunk downloads, so it needs a `Suspense` boundary to render a fallback. An error boundary handles a *failed* chunk load — a different job.',
  },

  /* ── Performance ── */
  {
    id: 'pf-1', category: 'Performance', skill: 'Re-render causes', difficulty: 'intermediate',
    question: 'Which does NOT cause a component to re-render?',
    options: [
      'Mutating a `useRef` `.current` value',
      'Its parent re-rendering',
      'A `useState` setter called with a new value',
      'A context value it consumes changing',
    ],
    correct: 0,
    explanation: 'Refs are deliberately outside the render cycle. The other three are exactly the three causes of a re-render: own state, parent render, consumed context.',
  },
  {
    id: 'pf-2', category: 'Performance', skill: 'Context', difficulty: 'advanced',
    question: 'A context provider passes `value={{ user, setUser }}`. Why do all consumers re-render on every provider render?',
    options: [
      'The object literal is a new reference every render',
      'Context always re-renders all consumers',
      '`setUser` changes identity every render',
      'Consumers cannot be memoised',
    ],
    correct: 0,
    explanation: 'Context compares the value by reference. A fresh literal breaks every consumer’s bail-out. Wrap it in `useMemo` keyed on the real dependencies — or split read and write into two contexts.',
  },

  /* ── Forms & Events ── */
  {
    id: 'fe-1', category: 'Forms & Events', skill: 'Controlled vs uncontrolled', difficulty: 'intermediate',
    question: 'What makes an input "controlled"?',
    options: [
      'Its `value` comes from React state and changes only through `onChange`',
      'It has a `ref` attached',
      'It is inside a `<form>` element',
      'It has a `defaultValue`',
    ],
    correct: 0,
    explanation: 'Controlled = React state is the single source of truth. `defaultValue` plus a ref is the uncontrolled pattern, where the DOM owns the value. Passing `value` with no `onChange` produces a read-only input and a React warning.',
  },
  {
    id: 'fe-2', category: 'Forms & Events', skill: 'Synthetic events', difficulty: 'intermediate',
    question: 'React’s `onClick` is:',
    options: [
      'A synthetic event — React attaches a listener at the root and delegates',
      'A direct DOM listener attached to that exact element',
      'An inline HTML attribute compiled into the markup',
      'Only available on native HTML elements in class components',
    ],
    correct: 0,
    explanation: 'React uses a synthetic event system with delegation at the root container (the app root since React 17, `document` before that). This normalises cross-browser behaviour and keeps listener count low.',
  },

  /* ── HTML & CSS floor — named in the front-end competency list ── */
  {
    id: 'hc-1', category: 'HTML & CSS', skill: 'CSS box model', difficulty: 'basic',
    question: 'An element has `width: 200px; padding: 16px; border: 2px solid`. How wide is it on screen with the default `box-sizing`?',
    options: ['236px', '200px', '218px', '204px'],
    correct: 0,
    explanation: 'Default `content-box` means `width` sizes the content only: 200 + 16×2 + 2×2 = 236. `box-sizing: border-box` makes 200 the total — which is why the universal reset exists.',
  },
  {
    id: 'hc-2', category: 'HTML & CSS', skill: 'Semantics', difficulty: 'basic',
    question: 'Which is the correct semantic element for the primary navigation links?',
    options: ['`<nav>`', '`<div class="nav">`', '`<section>`', '`<aside>`'],
    correct: 0,
    explanation: 'Semantic elements carry implicit ARIA roles: `<nav>` is a navigation landmark screen readers can jump to. `<section>` needs a heading to be meaningful; `<aside>` is complementary content.',
  },
  {
    id: 'hc-3', category: 'HTML & CSS', skill: 'Flexbox vs Grid', difficulty: 'intermediate',
    question: 'You need rows AND columns to align across the whole layout. Which is the right tool?',
    options: [
      'CSS Grid — two-dimensional and parent-driven',
      'Flexbox — it handles both axes at once',
      'Floats with clearfix',
      'Absolute positioning',
    ],
    correct: 0,
    explanation: 'Flexbox lays out along one axis at a time and is content-driven; Grid defines both axes on the parent, so tracks line up across rows and columns. "One axis or two" is the whole decision.',
  },
];

/**
 * Samples a paper with the blueprint's competency mix — a rehearsal of the
 * real thing rather than a shuffle of everything. Falls back gracefully when a
 * competency is under-supplied, so the paper is always full length.
 */
export function buildMettlPaper(
  size: number = METTL_PAPER.questions,
  pool: BankQuestion[] = RAPID_FIRE_BANK,
): BankQuestion[] {
  const shuffle = <T,>(xs: T[]) => [...xs].sort(() => Math.random() - 0.5);
  const picked: BankQuestion[] = [];
  const used = new Set<string>();

  for (const { competency, share } of METTL_BLUEPRINT) {
    const want = Math.round(size * share);
    const available = shuffle(pool.filter((q) => q.category === competency && !used.has(q.id)));
    for (const q of available.slice(0, want)) { picked.push(q); used.add(q.id); }
  }
  // Top up from anything left so the paper is always the requested length.
  for (const q of shuffle(pool.filter((x) => !used.has(x.id)))) {
    if (picked.length >= size) break;
    picked.push(q); used.add(q.id);
  }
  return shuffle(picked).slice(0, size);
}

/** Coverage report — which named competencies are thin. */
export function bankCoverage(pool: BankQuestion[] = RAPID_FIRE_BANK) {
  const counts = new Map<MettlCompetency, number>();
  for (const q of pool) counts.set(q.category, (counts.get(q.category) ?? 0) + 1);
  return METTL_BLUEPRINT.map(({ competency, share }) => ({
    competency,
    have: counts.get(competency) ?? 0,
    neededForOnePaper: Math.round(METTL_PAPER.questions * share),
  }));
}
