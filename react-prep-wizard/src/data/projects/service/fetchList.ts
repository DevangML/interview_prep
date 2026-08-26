import type { ProjectBlueprint } from '../types';

/** Foundations — HTTP, promises, and the four states every async view has. */
export const fetchListProject: ProjectBlueprint = {
  id: 'basic-fetch-list',
  title: 'Fetch a List: Loading, Error, Empty, Data',
  tagline: 'The four states, a race condition, and an abort — in about a hundred lines.',
  realWorldAnalog: 'Every list screen in every product',
  track: 'service',
  tier: 'foundation',
  difficulty: 'Junior',
  estimatedBuildTimeHours: 4,
  architecturePattern: 'Component-owned async state with an AbortController',
  prerequisites: ['basic-react-first'],
  summary:
    'Fetch and render a searchable list. The interesting part is not the happy path — it is the request that resolves after a newer one, the error that leaves a spinner running forever, and the empty result that renders as a blank screen. All three are graded in a real machine-coding round.',
  tags: ['React', 'Async', 'HTTP', 'Fetch', 'Junior'],
  xpBounty: 170,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'A cross-origin endpoint, so preflight and the opaque failure are met rather than read about.',
      'A cached last-good response with a visible staleness marker for offline reloads.',
      'All four view states rendered distinctly: loading, error, empty, data.',
      'A debounced search that cancels the in-flight request with AbortController.',
      'Correct handling of a non-2xx response — fetch does not reject on 404.',
      'A retry that clears the previous error.',
    ],
    outOfScopeBloat: [
      'TanStack Query or SWR — write it once by hand first.',
      'Pagination, infinite scroll, or caching.',
      'A backend; a public API or a mocked delay is enough.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The happy path only',
      focus: 'One boolean, no cancellation, no status check',
      codeSnippet: `useEffect(() => {\n  setLoading(true);\n  fetch(\`/api/search?q=\${query}\`)\n    .then(r => r.json())          // 404 body parsed as success\n    .then(setItems)\n    .finally(() => setLoading(false));\n}, [query]);\n\nreturn loading ? <Spinner /> : <ul>{items.map(...)}</ul>;`,
      failureModeOrInvariant:
        'Typing "react" fires five requests; whichever resolves last wins, so results can belong to "rea". fetch resolves for a 404, so an error page is rendered as data. An empty array renders as a blank screen with no explanation.',
      architecturalLesson:
        'fetch rejects only on network failure. Response.ok is the check, and out-of-order resolution is a correctness bug, not a performance one.',
    },
    {
      stageNumber: 2,
      stageName: 'Four states and a cancellation',
      focus: 'AbortController, status checks, a discriminated state union',
      codeSnippet: `useEffect(() => {\n  const ac = new AbortController();\n  setState({ status: 'loading' });\n  fetch(url, { signal: ac.signal })\n    .then(async r => {\n      if (!r.ok) throw new Error(\`HTTP \${r.status}\`);\n      return r.json();\n    })\n    .then(items => setState(\n      items.length ? { status: 'data', items } : { status: 'empty' }))\n    .catch(e => { if (e.name !== 'AbortError') setState({ status: 'error', e }); });\n  return () => ac.abort();          // stale request cancelled on re-run\n}, [url]);`,
      failureModeOrInvariant:
        'Only the newest request can write state, because the effect cleanup aborts the previous one. A 404 lands in the error branch. Empty and error are distinct screens, so a user never sees an unexplained blank list.',
      architecturalLesson:
        'Modelling async as one union — loading | error | empty | data — makes impossible combinations unrepresentable. Two booleans allow four states, of which two are nonsense.',
    },
  ],
  deliverables: [
    { id: 'Cache', title: 'Cache', spec: 'The last successful response is stored and served on an offline reload, with a visible marker showing how old it is.' },
    { id: 'Results', title: 'Results', spec: 'Result rows rendered from a mapped view model, keyed by a stable id, with third-party text escaped and result links checked against a scheme allowlist.' },
    { id: 'Search', title: 'Search', spec: 'A debounced search box written from scratch, including cancel, wired so each keystroke aborts the previous request.' },
    { id: 'Views', title: 'Views', spec: 'Four distinct components — Spinner, ErrorPanel with retry, EmptyState, ResultList — selected by the state union and never rendered together.' },
    { id: 'Structure', title: 'Structure', spec: 'The fetch wrapper is its own module so it can be replaced at a boundary by a later testing project.' },
  ],
  layers: [
    {
      layer: 'View',
      components: ['Spinner', 'ErrorPanel with retry', 'EmptyState', 'ResultList'],
      invariants: ['Exactly one of the four states renders at a time.'],
    },
    {
      layer: 'Data',
      components: ['fetch wrapper', 'AbortController per request', 'debounce'],
      invariants: ['No response from a superseded request may write state.'],
    },
  ],
  explicitTopics: [
    // Declared because the manifest claims them against a stage rather than a
    // deliverable — a stage anchor evidences nothing on its own.
    { category: 'Web Platform', topic: 'CORS, the same-origin policy, and preflight', subtopic: 'Stage 2', howCovered: 'The third-party endpoint triggers a preflight, and the opaque failure is diagnosed from the network panel, not guessed', conceptIds: ['web-cors'] },
    { category: 'TypeScript', topic: 'Types, narrowing, generics and typing React props', subtopic: 'Stage 2', howCovered: 'The four states are one discriminated union, so a loading-and-error combination cannot be constructed', conceptIds: ['ts-essentials'] },
    { category: 'JavaScript', topic: 'Scope, hoisting, TDZ and closures', subtopic: 'Stage 2', howCovered: 'Each effect run closes over its own controller, which is precisely why the stale one can be aborted', conceptIds: ['js-scope-closures'] },
    { category: 'React Core', topic: 'State Batching, Updaters & Closure Capture Semantics', subtopic: 'Stage 2', howCovered: 'State transitions go through a reducer, since four states with typed payloads outgrow four useState calls', conceptIds: ['react-state'] },
    { category: 'React Core', topic: 'useRef, useContext, useReducer and custom hooks', subtopic: 'Stage 2', howCovered: 'useReducer models the state machine and useRef holds the controller, neither of which should trigger a render', conceptIds: ['react-hooks-rest'] },
    { category: 'React Advanced', topic: 'Error boundaries, portals, refs and imperative escape hatches', subtopic: 'Stage 2', howCovered: 'A boundary catches a render failure on malformed data so the whole page does not go blank', conceptIds: ['react-errors-portals'] },
    { category: 'Accessibility', topic: 'ARIA, keyboard navigation and focus management', subtopic: 'Stage 2', howCovered: 'Loading, error and empty are announced through a live region, since a visual-only spinner tells a screen reader nothing', conceptIds: ['a11y-core'] },
    { category: 'Data & APIs', topic: 'Server State, TanStack Query, SWR & Real-Time WebSockets', subtopic: 'Stage 2', howCovered: 'Fetching, loading states, errors and cancellation are the whole subject of this build', conceptIds: ['rd-react-data-fetching'] },
    { category: 'React Core', topic: 'Complete Hooks Hierarchy: State, Effects, Context & Custom Hooks', subtopic: 'Stage 2', howCovered: 'useEffect and cleanup are what make a request cancellable rather than leaked', conceptIds: ['rd-react-hooks'] },
    {
      category: 'Web Platform',
      topic: 'Network',
      subtopic: 'HTTP, status codes, methods and idempotency',
      howCovered: 'Response.ok and status branching are written by hand, including 4xx vs 5xx retry policy.',
      conceptIds: ['web-http'],
    },
    {
      category: 'JavaScript',
      topic: 'Async',
      subtopic: 'Promises, async/await and cancellation',
      howCovered: 'The race is reproduced, then removed with AbortController wired to the effect cleanup.',
      conceptIds: ['js-promises'],
    },
    {
      category: 'React Core',
      topic: 'Hooks',
      subtopic: 'useEffect cleanup for async work',
      howCovered: 'Cleanup is used as the cancellation point, which is the canonical answer to the stale-response question.',
      conceptIds: ['react-effects'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'Internet & Protocols',
      title: 'Request lifecycle',
      mechanism: 'DNS, TCP, TLS and HTTP round trips precede the first byte of the response body.',
      realWorldImpact: 'Explains why a spinner appears before any data can possibly arrive.',
      conceptIds: ['web-http', 'web-how-page-loads'],
    },
    {
      domain: 'Language Semantics',
      title: 'Microtask ordering',
      mechanism: 'Promise callbacks run on the microtask queue, draining before the next macrotask.',
      realWorldImpact: 'Explains the exact interleaving of two in-flight requests resolving.',
      conceptIds: ['js-event-loop'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Re-render on state change'],
    manualEngineeringRequired: [
      'Cancellation, status handling and the state union — no data library allowed.',
      'A debounce written from scratch.',
    ],
  },
};
