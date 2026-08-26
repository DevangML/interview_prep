import type { ProjectBlueprint } from '../types';

/**
 * The single most-asked live build in a service-company React round.
 *
 * It looks like an input with a dropdown and is actually four hard problems
 * stacked: a race condition, a cache, a keyboard contract and an announcement
 * policy. Candidates who have only ever used a component library fail it in the
 * first ten minutes, because every one of those four is invisible until the
 * network is slow.
 */
export const typeaheadProject: ProjectBlueprint = {
  id: 'service-typeahead',
  title: 'Typeahead: The Race You Cannot See Locally',
  tagline: 'An input, a dropdown, and the four bugs that only appear on a bad connection.',
  realWorldAnalog: 'Every search box in every product, and the round-one live build',
  track: 'service',
  tier: 'flagship',
  difficulty: 'Junior',
  estimatedBuildTimeHours: 9,
  architecturePattern: 'Controlled input · debounced query · cancellable request · combobox',
  summary:
    'Build a search-as-you-type against a slow API, then break it on purpose. Type fast and the third response renders after the fifth. Hold a key and you fire forty requests. Unplug the mouse and the dropdown is unreachable. Each failure has a named fix, and being able to say the name before the interviewer does is the difference between passing this round and explaining yourself.',
  tags: ['React', 'Async', 'Debounce', 'a11y', 'Machine coding', 'OA favourite'],
  xpBounty: 260,
  prerequisites: ['basic-fetch-list'],
  coreScopeBoundaries: {
    inScopeMinimal: [
      'A controlled input that queries a deliberately slow, deliberately cross-origin API.',
      'Debounce on input, so holding a key does not fire a request per character.',
      'An AbortController per keystroke, so a superseded response can never render.',
      'An in-memory cache keyed by query, with a stated eviction rule.',
      'The full ARIA combobox pattern: roles, aria-activedescendant, and a listbox.',
      'Arrow keys, Enter, Escape and Tab all behaving as a native control would.',
      'Result count announced politely, so a screen reader knows the list changed.',
      'Loading, empty, error and no-results rendered as four distinct states.',
    ],
    outOfScopeBloat: [
      'A combobox library. Using one removes the entire exercise.',
      'Virtualization — cap results at fifty and say why that is the right call here.',
      'Fuzzy matching or ranking. The API returns an order; respect it.',
      'Multi-select, tags, or an "advanced search" panel.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The one that works on your laptop',
      focus: 'Controlled input, a fetch per keystroke, and a list',
      codeSnippet: `const [q, setQ] = useState('');\nconst [results, setResults] = useState<Result[]>([]);\n\nuseEffect(() => {\n  fetch(\`/api/search?q=\${q}\`).then(r => r.json()).then(setResults); // fires per keystroke\n}, [q]);`,
      failureModeOrInvariant:
        'On localhost with a 2ms API this looks perfect, which is exactly why it ships. Throttle to Slow 3G and type "react": five requests leave, and whichever the network returns last wins — often the response for "re". The UI now shows results for a query the user has already finished typing past.',
      architecturalLesson:
        'A response is not an answer to the current question. Without an ordering rule, concurrency decides your UI.',
    },
    {
      stageNumber: 2,
      stageName: 'The one that survives a slow network',
      focus: 'Debounce, abort, cache — and knowing which fixes which',
      codeSnippet: `useEffect(() => {\n  if (!q) return;\n  const cached = cache.get(q);\n  if (cached) { setResults(cached); return; }\n\n  const ac = new AbortController();\n  const t = setTimeout(() => {\n    fetch(\`/api/search?q=\${q}\`, { signal: ac.signal })\n      .then(r => r.json()).then(rs => { cache.set(q, rs); setResults(rs); })\n      .catch(e => { if (e.name !== 'AbortError') setError(e); });\n  }, 250);\n\n  return () => { clearTimeout(t); ac.abort(); };   // both, not either\n}, [q]);`,
      failureModeOrInvariant:
        'Debounce reduces how many requests you send; it does not order the ones you sent. Abort discards superseded work; it does not reduce the count. Ship only one and the other bug remains. Forget to special-case AbortError and every cancellation renders as a failure.',
      architecturalLesson:
        'Debounce, cancellation and caching solve three different problems. Name which problem you are solving before reaching for one.',
    },
    {
      stageNumber: 3,
      stageName: 'The one you can use without a mouse',
      focus: 'The combobox contract, focus, and what gets announced',
      codeSnippet: `<input role="combobox" aria-expanded={open} aria-controls="lb"\n       aria-autocomplete="list"\n       aria-activedescendant={i >= 0 ? \`opt-\${i}\` : undefined}\n       onKeyDown={onKey} />\n<ul id="lb" role="listbox">\n  {results.map((r, n) => (\n    <li id={\`opt-\${n}\`} role="option" aria-selected={n === i}>{r.label}</li>\n  ))}\n</ul>\n<p role="status" aria-live="polite">{results.length} results</p>`,
      failureModeOrInvariant:
        'Moving DOM focus into the list breaks typing. The combobox pattern exists precisely because focus must stay in the input while selection moves — that is what aria-activedescendant is for. Announce with aria-live="assertive" and every keystroke interrupts the user mid-word.',
      architecturalLesson:
        'A custom control inherits none of a native one\'s behaviour. The ARIA pattern is the specification you are now responsible for implementing.',
    },
  ],
  deliverables: [
    { id: 'Combobox', title: 'ARIA combobox', spec: 'Input and listbox wired with roles, aria-expanded, aria-controls and aria-activedescendant, verified against the WAI-ARIA authoring practice.' },
    { id: 'Debounce hook', title: 'Hand-written debounce', spec: 'A useDebouncedValue hook written from scratch with a cleanup that cancels the pending timer on every change and on unmount.' },
    { id: 'Request cache', title: 'Query cache', spec: 'A Map keyed by trimmed lowercased query with a stated maximum size and eviction rule, hit before any request is made.' },
    { id: 'Keyboard model', title: 'Keyboard contract', spec: 'Arrow keys move the active option with wraparound, Enter commits, Escape closes then clears, and Tab leaves without selecting.' },
    { id: 'State machine', title: 'Four rendered states', spec: 'Idle, loading, empty-query and no-results are four distinct renders, plus an error state that survives an aborted request.' },
    { id: 'Highlight renderer', title: 'Match highlighting', spec: 'The matched substring is marked without dangerouslySetInnerHTML, so an API result containing markup cannot inject anything.' },
    { id: 'Token theme', title: 'Token-driven styling', spec: 'Colour, spacing and radius come from custom properties on one layer, with the active option styled by state not by class juggling.' },
    { id: 'Test suite', title: 'Behavioural tests', spec: 'Tests assert the user-visible guarantees: a stale response never renders, Escape restores the prior value, and the list is keyboard reachable.' },
  ],
  layers: [
    { layer: 'Input', components: ['controlled input', 'debounce hook', 'key handler'], invariants: ['Focus never leaves the input while the listbox is open.'] },
    { layer: 'Data', components: ['abort controller', 'query cache', 'error mapper'], invariants: ['A response for a superseded query can never reach state.'] },
    { layer: 'Presentation', components: ['listbox', 'option', 'live region', 'highlight'], invariants: ['Result text is rendered as text, never as HTML.'] },
  ],
  explicitTopics: [
    { category: 'HTML', topic: 'Forms and semantics', subtopic: 'Labels, native input, document structure', howCovered: 'The control starts as a labelled native input, so what ARIA has to replace later is explicit.', conceptIds: ['html-forms', 'html-semantics'] },
    { category: 'JavaScript', topic: 'DOM events', subtopic: 'Key handling and default actions', howCovered: 'Arrow keys, Enter and Escape are intercepted with preventDefault reasoned about per key.', conceptIds: ['js-dom-events'] },
    { category: 'React', topic: 'State', subtopic: 'Controlled inputs and batching', howCovered: 'Query, results and active index are separate state, and the reason they are not one object is stated.', conceptIds: ['react-state'] },
    { category: 'TypeScript', topic: 'Modelling', subtopic: 'A union for the request state', howCovered: 'Idle, loading, error and loaded are a discriminated union, so rendering a spinner with results is unrepresentable.', conceptIds: ['ts-essentials'] },
    { category: 'JavaScript', topic: 'Debounce', subtopic: 'Timers, cleanup and cancellation', howCovered: 'The debounce hook is hand-written, including the cleanup that cancels on unmount.', conceptIds: ['js-polyfills'] },
    { category: 'JavaScript', topic: 'Async', subtopic: 'Cancellation, ordering, AbortError', howCovered: 'An AbortController per keystroke, with AbortError distinguished from a real failure.', conceptIds: ['js-promises', 'js-event-loop'] },
    { category: 'React', topic: 'Effects', subtopic: 'Cleanup as the ordering mechanism', howCovered: 'The effect cleanup both clears the timer and aborts the request, and the test proves it on unmount.', conceptIds: ['react-effects'] },
    { category: 'JavaScript', topic: 'Closures', subtopic: 'Each attempt owns its handle', howCovered: 'Every debounced attempt closes over its own controller, which is why a stale one cannot abort the live request.', conceptIds: ['js-scope-closures'] },
    { category: 'Web', topic: 'HTTP and origins', subtopic: 'Query strings, status handling, preflight', howCovered: 'The API is deliberately cross-origin so CORS is configured rather than discovered in production.', conceptIds: ['web-http', 'web-cors'] },
    { category: 'State', topic: 'Caching', subtopic: 'Keying, eviction, and when to skip the network', howCovered: 'A hand-rolled cache first, then the argument for when a query library earns its bytes.', conceptIds: ['state-alternatives'] },
    { category: 'Accessibility', topic: 'Combobox', subtopic: 'Roles, activedescendant, live regions', howCovered: 'Built to the WAI-ARIA pattern and driven end to end with the mouse unplugged.', conceptIds: ['a11y-core'] },
    { category: 'CSS', topic: 'States', subtopic: 'Focus, active option, hover', howCovered: 'The active option is styled from state; :focus-visible stays on the input where focus actually is.', conceptIds: ['css-states'] },
    { category: 'React', topic: 'Hooks', subtopic: 'useRef and custom hooks', howCovered: 'The controller and the latest-query ref live outside render; the debounce is extracted as a reusable hook.', conceptIds: ['react-hooks-rest', 'rd-react-hooks'] },
    { category: 'React', topic: 'Composition', subtopic: 'Headless hook, presentational list', howCovered: 'The behaviour is a hook and the markup is a component, so the same logic can drive a different UI.', conceptIds: ['react-composition', 'rd-react-components'] },
    { category: 'React', topic: 'Performance', subtopic: 'Why fifty results needs no virtualization', howCovered: 'The cap is chosen with a measurement, and the point at which windowing would pay is stated.', conceptIds: ['react-perf'] },
    { category: 'React', topic: 'Data fetching', subtopic: 'Loading, error, empty, no-results', howCovered: 'Four states are rendered distinctly, which is the roadmap data-fetching topic in miniature.', conceptIds: ['rd-react-data-fetching'] },
    { category: 'Testing', topic: 'Behavioural tests', subtopic: 'Asserting the guarantee, not the call', howCovered: 'A test proves a stale response never renders, by resolving two requests out of order.', conceptIds: ['testing-react', 'rd-react-testing'] },
  ],
  implicitFoundations: [
    { domain: 'Security & Invariants', title: 'Results are untrusted text', mechanism: 'Highlighting marks a substring without setting raw HTML.', realWorldImpact: 'A search result containing a script tag is a stored XSS if you interpolate it.', conceptIds: ['web-security'] },
    { domain: 'Language Semantics', title: 'Normalising the key', mechanism: 'Cache keys are trimmed and lowercased, so two spellings of the same query hit once.', realWorldImpact: 'An unnormalised key silently halves the hit rate.', conceptIds: ['js-types-coercion', 'js-equality-matrix', 'js-defaulting-operators'] },
    { domain: 'Language Semantics', title: 'Results are transformed, not mutated', mechanism: 'Mapping and slicing produce new arrays so a cached entry is never edited in place.', realWorldImpact: 'Mutating a cached array makes the next cache hit return corrupted data.', conceptIds: ['js-arrays-objects', 'react-immutability', 'react-references-copying'] },
    { domain: 'DOM & Browser Pipeline', title: 'Keys decide what survives a keystroke', mechanism: 'Stable option keys stop React destroying and rebuilding the list on every render.', realWorldImpact: 'Index keys make the active option jump when results reorder.', conceptIds: ['react-rendering-model'] },
    { domain: 'DOM & Browser Pipeline', title: 'The dropdown is an anchored overlay', mechanism: 'The listbox positions against the input, which makes the containing block load-bearing.', realWorldImpact: 'A transformed ancestor silently re-parents the overlay and it lands in the wrong place.', conceptIds: ['css-positioning', 'css-box-display'] },
    { domain: 'DOM & Browser Pipeline', title: 'A row is a flex line', mechanism: 'Each option lays out as icon, label, then trailing meta that holds its basis.', realWorldImpact: 'A long label must not push the type badge off the row.', conceptIds: ['css-flex-axes', 'css-flex-sizing', 'css-flex-align'] },
    { domain: 'Tooling & Build', title: 'One definition per token', mechanism: 'Colour, space and radius are custom properties in a layer that themes override without escalating specificity.', realWorldImpact: 'Restyling for a second product becomes one file.', conceptIds: ['css-tokens-modern', 'css-cascade', 'css-selectors', 'css-units', 'rd-fe-modern-css'] },
    { domain: 'DOM & Browser Pipeline', title: 'Sized to its container', mechanism: 'The dropdown responds to the field width with a container query rather than the viewport.', realWorldImpact: 'The same control is correct in a narrow sidebar and a full-width header.', conceptIds: ['css-media-container'] },
    { domain: 'V8 Engine & Memory', title: 'Recent queries outlive a reload', mechanism: 'The last few queries persist to sessionStorage with a size cap.', realWorldImpact: 'A refresh mid-search does not send the user back to an empty box.', conceptIds: ['web-storage'] },
  ],
  frameworkVsManual: {
    frameworkHandled: [
      'Nothing. A combobox library is explicitly out of scope for this build.',
    ],
    manualEngineeringRequired: [
      'The debounce, including its cleanup on unmount.',
      'The cancellation rule that makes a superseded response unrenderable.',
      'The cache key, its eviction policy, and the argument for both.',
      'The whole ARIA combobox contract and the announcement policy.',
    ],
  },
};
