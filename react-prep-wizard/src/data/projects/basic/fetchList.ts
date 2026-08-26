import type { ProjectBlueprint } from '../types';

/** Foundations — HTTP, promises, and the four states every async view has. */
export const fetchListProject: ProjectBlueprint = {
  id: 'basic-fetch-list',
  title: 'Fetch a List: Loading, Error, Empty, Data',
  tagline: 'The four states, a race condition, and an abort — in about a hundred lines.',
  realWorldAnalog: 'Every list screen in every product',
  tier: 'basic',
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
