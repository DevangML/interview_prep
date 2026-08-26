import type { LearnTopic } from './types';

/** Redux is billed equal to React itself on the Mettl 2–5 year competency list. */
export const stateTopics: LearnTopic[] = [
  {
    id: 'redux-core',
    area: 'State Management',
    group: 'Redux',
    title: 'Redux core: store, actions, reducers, pure functions, data flow',
    status: 'partial',
    minutes: 8,
    summary:
      'Mettl lists Redux as one of three competencies for the 2–5 year React test, alongside ECMAScript and React itself. A bank with no Redux is missing roughly a third of the paper.',
    body: [
      '**One store, one state tree, one way in.** The store holds all application state; the only way to change it is to `dispatch` an **action**, a plain object whose sole required property is `type`. A **reducer** — `(state, action) => newState` — computes the next state. That is the whole architecture, and its constraints are what make time-travel debugging possible.',
      'A reducer must be a **pure function**: same input, same output, no side effects. That forbids `Date.now()`, `Math.random()`, API calls, and mutation. It must also **return the existing `state` unchanged for actions it does not recognise** — returning `undefined` breaks the store, and returning the initial state would wipe data whenever another slice\'s action passed through.',
      'The immutability requirement is the same one React has, for the same reason: subscribers compare by reference. `state.items.push(x); return state` mutates and returns the identical reference, so nothing re-renders. Correct is `return { ...state, items: [...state.items, action.payload] }`.',
      'The store API is deliberately tiny: `getState()`, `dispatch(action)`, `subscribe(listener)`, `replaceReducer()`. Everything else — `connect`, `useSelector`, middleware — is built on those four. `combineReducers` splits the tree into slices, each reducer owning its own key.',
      '**Data flow, in order:** UI dispatches an action → middleware may intercept → the root reducer runs → the store holds new state → subscribers are notified → connected components re-render. Strictly unidirectional; nothing writes to the store directly.',
    ],
    keyPoints: [
      '`type` is the only required property of an action.',
      'A reducer returns `state` unchanged for unknown actions — never `undefined`.',
      'Purity forbids `Date.now()`, randomness, API calls and mutation.',
      'One store. Modularity comes from `combineReducers`, not from multiple stores.',
    ],
    interview:
      '"Why must a reducer be pure?" wants: predictability, replay, and time-travel debugging. "What happens if you mutate state in a reducer?" wants: the reference is unchanged, so connected components never re-render.',
    code: `function todos(state = [], action) {
  switch (action.type) {
    case 'todos/added':
      return [...state, action.payload];          // new array, new reference
    case 'todos/toggled':
      return state.map(t =>
        t.id === action.payload ? { ...t, done: !t.done } : t);
    default:
      return state;                                // never undefined
  }
}`,
    resources: [
      { label: 'Redux — Core concepts', url: 'https://redux.js.org/tutorials/essentials/part-1-overview-concepts', kind: 'docs' },
      { label: 'Redux — Three principles', url: 'https://redux.js.org/understanding/thinking-in-redux/three-principles', kind: 'docs' },
      { label: 'Redux — Reducers', url: 'https://redux.js.org/usage/structuring-reducers/structuring-reducers', kind: 'docs' },
    ],
  },
  {
    id: 'redux-react-toolkit',
    area: 'State Management',
    group: 'Redux',
    title: 'react-redux, middleware, thunks and Redux Toolkit',
    status: 'partial',
    minutes: 8,
    summary:
      'How Redux actually reaches a component, how asynchrony is handled without breaking purity, and why modern Redux looks nothing like the tutorials from 2017.',
    body: [
      '`connect(mapStateToProps, mapDispatchToProps)` is the classic HOC binding: the first selects slices of state into props, the second binds action creators. Hooks replaced it with **`useSelector(selector)`** and **`useDispatch()`**, but `connect` is still named on the Mettl competency list, so be able to describe both.',
      '`useSelector` compares its result with `===`. Returning a **new object literal** — `useSelector(s => ({ a: s.a, b: s.b }))` — creates a fresh reference on every dispatch, so the component re-renders on every action in the app. Fix by selecting primitives separately, passing `shallowEqual` as the second argument, or memoising with `createSelector`.',
      '**Middleware** sits between `dispatch` and the reducer, which is where side effects legally live. `redux-thunk` lets you dispatch a *function* instead of an object; that function receives `(dispatch, getState)`, performs async work, and dispatches plain actions when it resolves — keeping the reducer pure. `redux-saga` does the same job with generators and is worth naming as an alternative.',
      '**Redux Toolkit (RTK)** is the official modern approach and eliminates most of the ceremony. `createSlice` generates action creators and types from one object; it uses **Immer** internally so you write `state.items.push(x)` and get an immutable update — a point that confuses people who learned the older rules. `configureStore` wires thunk, DevTools and immutability checks by default. `createAsyncThunk` handles the pending/fulfilled/rejected trio.',
      '**RTK Query** goes further, generating hooks that handle caching, deduplication, invalidation and refetching — the same problem TanStack Query solves. The senior framing: most "state management" in modern apps is **server cache**, not client state, and conflating the two is why Redux stores used to be full of loading flags.',
    ],
    keyPoints: [
      '`useSelector` compares with `===` — a new object literal re-renders on every dispatch.',
      'Middleware exists so reducers can stay pure while side effects happen elsewhere.',
      'RTK\'s `createSlice` uses Immer: mutating syntax, immutable result.',
      'Distinguish server cache from client state — most Redux stores held the wrong one.',
    ],
    interview:
      '"When would you not use Redux?" is the modern question. Answer: when the state is server cache (use RTK Query or TanStack Query), or when it is local UI state (use `useState`), or when a small global need is met by context or Zustand. Redux earns its place with complex, shared, frequently-updated client state that benefits from traceable transitions.',
    code: `const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    added(state, action) { state.push(action.payload); },   // Immer: safe to "mutate"
    toggled(state, action) {
      const t = state.find(x => x.id === action.payload);
      if (t) t.done = !t.done;
    },
  },
});
export const { added, toggled } = todosSlice.actions;

// selecting: primitives, or shallowEqual, never a fresh object
const count = useSelector(s => s.todos.length);`,
    resources: [
      { label: 'Redux Toolkit — Quick start', url: 'https://redux-toolkit.js.org/tutorials/quick-start', kind: 'docs', note: 'The official "how Redux is written now" page.' },
      { label: 'React-Redux — Hooks', url: 'https://react-redux.js.org/api/hooks', kind: 'docs' },
      { label: 'Redux — Deriving data with createSelector', url: 'https://redux.js.org/usage/deriving-data-selectors', kind: 'docs' },
      { label: 'Mark Erikson — Why Redux Toolkit is how to use Redux today', url: 'https://redux.js.org/introduction/why-rtk-is-redux-today', kind: 'article' },
    ],
  },
  {
    id: 'state-alternatives',
    area: 'State Management',
    group: 'Choosing',
    title: 'Context, Zustand, TanStack Query — choosing the right tool',
    status: 'missing',
    minutes: 6,
    summary:
      'The senior question is never "how does Redux work" but "why did you choose it". Four categories of state, four different right answers.',
    body: [
      'Sort state into four kinds before choosing anything. **Local UI state** (is this dropdown open) → `useState`. **Shared client state** (theme, auth user, cart) → context for rarely-changing values, a store for frequently-changing ones. **Server cache** (fetched data) → a query library. **URL state** (filters, pagination, the current tab) → search params, so the view is shareable and survives reload.',
      '**Context is not a state manager.** It is dependency injection: it has no selectors, no batching, and every consumer re-renders when the value reference changes. It is excellent for a stable value like a theme or a locale, and poor for anything that updates often — which is exactly the mistake that leads people to reach for Redux next.',
      '**Zustand** is the minimal store: a hook, a setter, and selector-based subscriptions so a component re-renders only when its slice changes. No provider, no boilerplate, roughly 1KB. It suits the "I need a little global state" case that Redux over-serves — and this app uses it.',
      '**TanStack Query** (or RTK Query) owns server cache: fetching, caching, deduplication, background refetch, stale-while-revalidate, retries and invalidation. Most of what teams historically put in Redux was this, badly re-implemented with loading booleans. Adopting a query library usually shrinks the client store to almost nothing.',
      '**URL state deserves its own mention** because it is so often missed. Filters, sort order, page number and the open tab belong in the query string: it makes the state shareable, bookmarkable, back-button-correct, and free of a synchronisation bug you would otherwise have to write.',
    ],
    keyPoints: [
      'Four kinds of state: local, shared client, server cache, URL.',
      'Context is dependency injection, not state management — no selectors, no batching.',
      'Most "global state" is server cache; a query library is the right tool.',
      'Filters and pagination belong in the URL.',
    ],
    interview:
      '"How do you decide where state lives?" is a design question with a structured answer — name the four categories, then map the feature onto them. That structure is worth more than any specific library preference.',
    resources: [
      { label: 'TanStack Query — Overview', url: 'https://tanstack.com/query/latest/docs/framework/react/overview', kind: 'docs' },
      { label: 'Zustand', url: 'https://zustand.docs.pmnd.rs/', kind: 'docs' },
      { label: 'Kent C. Dodds — Application state management', url: 'https://kentcdodds.com/blog/application-state-management-with-react', kind: 'article' },
    ],
  },
];
