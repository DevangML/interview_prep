import type { ProjectBlueprint } from '../types';

/** Working engineer — Flux, a Redux store written from scratch, then RTK. */
export const fluxToReduxProject: ProjectBlueprint = {
  id: 'inter-flux-to-rtk',
  title: 'Write Redux Yourself, Then Delete It',
  tagline: 'Forty lines of createStore, then the same app on Redux Toolkit — and you can defend both.',
  realWorldAnalog: 'The state layer of any enterprise React application',
  track: 'service',
  tier: 'flagship',
  difficulty: 'Intermediate',
  estimatedBuildTimeHours: 8,
  architecturePattern: 'Unidirectional data flow: dispatcher → store → view',
  prerequisites: ['basic-routed-app'],
  summary:
    'Implement a working store — subscribe, dispatch, getState, a reducer, and a middleware chain — in about forty lines, then rebuild the same feature on Redux Toolkit. Mettl bills Redux at parity with React itself on its React assessment, and Flux appears by name on the ReactJS paper; almost no 2026 preparation material covers either.',
  tags: ['Redux', 'Flux', 'State', 'Middleware', 'Intermediate'],
  xpBounty: 320,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'createStore with getState, dispatch, subscribe and replaceReducer.',
      'combineReducers and one applyMiddleware chain including a logger and a thunk.',
      'The same feature ported to configureStore and createSlice.',
      'One memoised selector, and a demonstration of what it stops re-rendering.',
    ],
    outOfScopeBloat: [
      'Redux Saga or Observable.',
      'A normalised entity cache beyond one small example.',
      'Server state — that belongs to TanStack Query, and the project says why.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Flux, as originally described',
      focus: 'Dispatcher, multiple stores, emitted change events',
      codeSnippet: `// Flux: many stores, one dispatcher, no return value\nDispatcher.register(payload => {\n  switch (payload.type) {\n    case 'ADD_TODO':\n      _todos.push(payload.todo);      // stores mutate their own data\n      TodoStore.emitChange();          // views listen for 'change'\n  }\n});`,
      failureModeOrInvariant:
        'Stores mutate private arrays and emit an untyped change event, so a view knows something changed but not what. Cross-store dependencies need waitFor with explicit dispatch tokens, and the order becomes load-bearing.',
      architecturalLesson:
        'Flux got the direction right — one way, always — and the storage wrong. Redux keeps the direction and replaces N mutable stores with one immutable tree.',
    },
    {
      stageNumber: 2,
      stageName: 'createStore in forty lines',
      focus: 'Pure reducers, subscription, middleware as function composition',
      codeSnippet: `function createStore(reducer, preloaded) {\n  let state = preloaded, listeners = [];\n  const getState = () => state;\n  const dispatch = (action) => {\n    state = reducer(state, action);       // pure: same in, same out\n    listeners.forEach(l => l());\n    return action;\n  };\n  const subscribe = (l) => { listeners.push(l);\n    return () => { listeners = listeners.filter(x => x !== l); }; };\n  dispatch({ type: '@@INIT' });\n  return { getState, dispatch, subscribe };\n}\n\n// middleware is currying, nothing more\nconst logger = store => next => action => { console.log(action); return next(action); };`,
      failureModeOrInvariant:
        'A reducer that mutates state or reads Date.now() breaks time-travel debugging and makes tests flaky. A subscriber that dispatches during notification recurses.',
      architecturalLesson:
        'The three Redux rules — single source of truth, read-only state, changes via pure functions — are what make the devtools, replay and undo possible. They are constraints that buy capabilities.',
    },
    {
      stageNumber: 3,
      stageName: 'Redux Toolkit, understood rather than copied',
      focus: 'createSlice, Immer drafts, thunks, memoised selectors',
      codeSnippet: `const todos = createSlice({\n  name: 'todos',\n  initialState: [],\n  reducers: {\n    added(state, action) { state.push(action.payload); },  // Immer draft, still immutable\n  },\n});\n\nconst selectVisible = createSelector(\n  [s => s.todos, s => s.filter],\n  (todos, filter) => todos.filter(t => match(t, filter)),   // recomputes only on input change\n);`,
      failureModeOrInvariant:
        'state.push looks like mutation and is not — Immer records the draft operations and produces a new tree. A selector returning a fresh array literal each call re-renders every subscriber; createSelector is what stops it.',
      architecturalLesson:
        'RTK removes boilerplate, not concepts. You still have to know that the reducer is pure, or the draft syntax will mislead you in code review.',
    },
  ],
  deliverables: [
    { id: 'Reducers', title: 'Reducers', spec: 'Pure reducers with no I/O, no Date.now and no random, each covered by a test that replays the same actions twice for the same result.' },
    { id: 'Bindings', title: 'Bindings', spec: 'A hand-written useSyncExternalStore connecting the custom store, replaced later by react-redux with no component changes.' },
    { id: 'Structure', title: 'Structure', spec: 'One module per slice with named exports; a deliberate circular import between two slices is created and then resolved.' },
    { id: 'Middleware', title: 'Middleware', spec: 'An applyMiddleware chain of at least a logger and a thunk, written as store => next => action with no library.' },
    { id: 'Thunks', title: 'Thunks', spec: 'Async thunks modelling pending, fulfilled and rejected, where a superseded request cannot overwrite newer state.' },
    { id: 'Actions', title: 'Actions', spec: 'Actions as a discriminated union so the reducer switch is exhaustive and an unhandled type fails the compile.' },
    { id: 'Selectors', title: 'Selectors', spec: 'A memoised selector with the render count recorded before and after, plus a demonstration of an inline argument defeating it.' },
    { id: 'Screens', title: 'Screens', spec: 'A board screen and a detail screen, both reading filters from the URL and reconciling them with the store.' },
    { id: 'Forms', title: 'Forms', spec: 'A task form dispatching on submit, with native validation running before any action is created.' },
    { id: 'Persistence', title: 'Persistence', spec: 'The store persists to localStorage behind a version key, with a migration that runs when the shape changes.' },
    { id: 'Board', title: 'Board', spec: 'A kanban board as a CSS grid whose column count follows the data, each column its own scroll container with a sticky header.' },
    { id: 'Card', title: 'Card', spec: 'A card as a flex column with a growing body, an auto-margin footer, an absolutely positioned ribbon and a container query for narrow slots.' },
    { id: 'Theme', title: 'Theme', spec: 'Per-column accent colours as custom properties, layered so a feature stylesheet cannot outrank the shell.' },
  ],
  layers: [
    {
      layer: 'Domain',
      components: ['action types', 'pure reducers', 'selectors'],
      invariants: ['A reducer is a pure function of (state, action) with no I/O.'],
    },
    {
      layer: 'Application',
      components: ['store', 'middleware chain', 'thunks'],
      invariants: ['All side effects live in middleware, never in a reducer.'],
    },
    {
      layer: 'View',
      components: ['useSelector', 'useDispatch', 'memoised list rows'],
      invariants: ['A component subscribes to the narrowest slice it can.'],
    },
  ],
  explicitTopics: [
    // Declared because the manifest claims them against a stage rather than a
    // deliverable — a stage anchor evidences nothing on its own.
    { category: 'React Advanced', topic: 'memo, useMemo, useCallback, virtualization, profiling', subtopic: 'Stage 3', howCovered: 'A selector returning a fresh array re-renders every subscriber; createSelector is introduced with the render count either side', conceptIds: ['react-perf'] },
    { category: 'React Core', topic: 'State Batching, Updaters & Closure Capture Semantics', subtopic: 'Stage 3', howCovered: 'The line between component state and store state is drawn deliberately, and the drafts stay local', conceptIds: ['react-state'] },
    { category: 'JavaScript', topic: '`this`, call/apply/bind and arrow functions', subtopic: 'Stage 1', howCovered: 'Flux stores are objects with methods, so a handler registered with the dispatcher loses its receiver unless bound', conceptIds: ['js-this'] },
    { category: 'JavaScript', topic: 'Prototypes, the prototype chain and classes', subtopic: 'Stage 1', howCovered: 'The Flux store extends EventEmitter, so emitChange resolves up a prototype chain you inspect', conceptIds: ['js-prototypes'] },
    { category: 'JavaScript', topic: 'DOM APIs, events, bubbling and delegation', subtopic: 'Stage 1', howCovered: 'The Flux emitter is a hand-rolled event system, compared directly against DOM event dispatch', conceptIds: ['js-dom-events'] },
    { category: 'Architecture', topic: 'Front-end system design: components, data, states, failure', subtopic: 'Stage 3', howCovered: 'The state inventory — what is server state, URL state, store state and local state — is written before the port', conceptIds: ['frontend-system-design'] },
    { category: 'React Core', topic: 'Fiber WorkLoop, Double-Buffering & Virtual DOM Reconciliation', subtopic: 'Stage 3', howCovered: 'Which components re-render on a dispatch is measured, since that is what a selector actually controls', conceptIds: ['react-rendering-model'] },
    { category: 'React Core', topic: 'Class components and the lifecycle vocabulary', subtopic: 'Stage 1', howCovered: 'The Flux era was class components, so the original container is written as one before being ported', conceptIds: ['react-class-lifecycle'] },
    { category: 'React 19', topic: '`use()`, Server Components, `createRoot` vs `hydrateRoot`', subtopic: 'Stage 3', howCovered: 'Where a store belongs once the server owns data is discussed and demonstrated with one server component', conceptIds: ['r19-use-rsc'] },
    { category: 'State Management', topic: 'Modern State Management: Zustand, Jotai, Context API & Redux', subtopic: 'Stage 2', howCovered: 'Flux, Redux and RTK are the state-management ladder the roadmap walks, in order', conceptIds: ['rd-react-state-mgmt'] },
    {
      category: 'State Management',
      topic: 'Redux',
      subtopic: 'Store, actions, reducers, pure functions, data flow',
      howCovered: 'createStore is implemented from scratch, so every one of the five terms is code you wrote.',
      conceptIds: ['redux-core'],
    },
    {
      category: 'State Management',
      topic: 'Redux',
      subtopic: 'react-redux, middleware, thunks and Redux Toolkit',
      howCovered: 'The hand-built store is replaced by configureStore and createSlice with the same feature behaviour.',
      conceptIds: ['redux-react-toolkit'],
    },
    {
      category: 'Tooling',
      topic: 'Architecture history',
      subtopic: 'Flux — and why Mettl still asks about it',
      howCovered: 'The original dispatcher-and-stores design is built first, so the Redux comparison is first-hand.',
      conceptIds: ['tooling-flux'],
    },
    {
      category: 'State Management',
      topic: 'Choosing',
      subtopic: 'Context, Zustand, TanStack Query — picking the tool',
      howCovered: 'Ends with an explicit written argument for which of the four this feature should have used.',
      conceptIds: ['state-alternatives'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'Language Semantics',
      title: 'Closures as private state',
      mechanism: 'createStore keeps state and listeners in closure scope rather than on an object.',
      realWorldImpact: 'The store is unreachable except through its three methods — encapsulation without classes.',
      conceptIds: ['js-scope-closures'],
    },
    {
      domain: 'Language Semantics',
      title: 'Structural sharing',
      mechanism: 'Immutable updates copy only the path to the change, leaving siblings referentially equal.',
      realWorldImpact: 'Makes shallow reference comparison a sufficient re-render check for a large tree.',
      conceptIds: ['react-immutability', 'react-references-copying'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Immer draft tracking in RTK', 'react-redux subscription plumbing'],
    manualEngineeringRequired: [
      'The store, the middleware chain and the selector memoisation, written before importing any of them.',
      'The written justification for the final choice of tool.',
    ],
  },
};
