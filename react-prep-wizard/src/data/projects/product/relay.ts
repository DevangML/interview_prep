import type { ProjectBlueprint } from '../types';

/**
 * The credible flagship.
 *
 * The other six product-track builds are dares — CRDTs, compute shaders, a
 * lock-free ring buffer. Nobody finishes them, so nobody can defend them in a
 * room. This one is deliberately ordinary in domain and unforgiving in
 * engineering: an issue tracker is understood by every interviewer alive, which
 * means the conversation moves immediately to how you built it.
 *
 * Breadth here is earned rather than claimed. Each phase names its own
 * deliverables, and every coverage edge anchors to one of them, so "build this
 * as specified" and "cover these concepts" are the same instruction.
 */
export const relayProject: ProjectBlueprint = {
  id: 'product-relay',
  title: 'Relay: An Issue Tracker That Never Loses An Edit',
  tagline: 'Seven phases, one repository — the build you defend for forty minutes.',
  realWorldAnalog: 'Linear, Jira, GitHub Issues — the tool every team actually lives in',
  track: 'product',
  tier: 'flagship',
  difficulty: 'Intermediate',
  estimatedBuildTimeHours: 55,
  architecturePattern: 'URL-driven shell · server-state cache · offline mutation queue',
  summary:
    'One product, built in seven phases, each ending in something you can demo. The thesis is the last-write policy: an edit made on a train, in a second tab, against a stale cache must still arrive intact and explainable. That single constraint forces the routing, the cache, the queue, the conflict rule and the tests to agree with each other — which is exactly the conversation a product-company interview wants to have.',
  tags: ['TypeScript', 'TanStack Query', 'Offline-first', 'a11y', 'Testing', 'CI', 'Flagship'],
  xpBounty: 1200,
  prerequisites: ['inter-tested-library', 'inter-perf-audit'],
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Issues with title, state, assignee, labels and an ordered comment thread.',
      'Every view is a URL: filters, sort and the open issue survive a refresh and a paste into Slack.',
      'A typed domain model where an impossible state is a compile error.',
      'Optimistic create, edit and reorder, each with a rollback that restores the exact prior value.',
      'A command palette driving every action, with the mouse unplugged.',
      'A list of 10,000 issues that scrolls at 60fps on a mid-range laptop.',
      'An offline queue that replays on reconnect under a written conflict policy.',
      'Tests that act as the acceptance criteria, run in CI, gating a real deploy.',
    ],
    outOfScopeBloat: [
      'Authentication beyond a stubbed session — it teaches nothing new here and eats a week.',
      'A backend of your own. Use a mock server; the interesting failures are all client-side.',
      'Rich text, file attachments, notifications, billing, or a second entity type.',
      'A design system. Style it once, with tokens, and move on.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The shell that is a URL',
      focus: 'Nested routes, URL as the only view state, and a domain model that refuses bad states',
      codeSnippet: `// An issue cannot be closed and unresolved at once, so do not let it be typed that way.\ntype IssueState =\n  | { kind: 'open' }\n  | { kind: 'closed'; resolution: 'fixed' | 'wontfix'; closedAt: string };\n\n// Filters live in the URL, not in useState — a refresh is not a state reset.\nconst [params, setParams] = useSearchParams();\nconst filter = parseFilter(params); // total, validated, defaulted`,
      failureModeOrInvariant:
        'Hold filters in component state and the first refresh throws the view away, the back button does nothing, and a shared link opens a different screen than the sender saw. Model state as a boolean pair and `closed && !resolution` becomes representable — which means one day it will be represented.',
      architecturalLesson:
        'The URL is a state container the user can edit, bookmark and send. Anything they would expect to survive a paste belongs in it, and nowhere else.',
    },
    {
      stageNumber: 2,
      stageName: 'The list that stays correct',
      focus: 'Server state as a cache, and all five states of every surface',
      codeSnippet: `// The cache key IS the filter. Change the filter, get a different entry —\n// no manual invalidation, no stale list from the previous query.\nuseQuery({\n  queryKey: ['issues', filter],\n  queryFn: ({ signal }) => fetchIssues(filter, { signal }),\n  placeholderData: keepPreviousData,\n});`,
      failureModeOrInvariant:
        'Loading, empty, partial, error and success are five different screens. Teams ship two and discover the rest in production: an empty result rendering a spinner forever, or a failed sidebar taking down a working list. Without a request signal, a fast filter change renders the slower earlier response last.',
      architecturalLesson:
        'Server state is a cache with a staleness policy, not application state. Deriving the key from the filter makes correctness structural instead of remembered.',
    },
    {
      stageNumber: 3,
      stageName: 'The edit that survives a bad network',
      focus: 'Optimistic mutation, exact rollback, and the races that follow',
      codeSnippet: `onMutate: async (next) => {\n  await qc.cancelQueries({ queryKey: ['issues'] });    // stop an in-flight refetch\n  const prev = qc.getQueryData(['issues']);           // snapshot for rollback\n  qc.setQueryData(['issues'], (l) => l.map(i => i.id === next.id ? { ...i, ...next } : i));\n  return { prev };                                   // NOT a mutated copy\n},\nonError: (_e, _v, ctx) => qc.setQueryData(['issues'], ctx.prev),`,
      failureModeOrInvariant:
        'Roll back to a value you mutated in place and you restore the broken state you were escaping. Forget to cancel in-flight queries and a refetch that started before the edit lands after it, silently reverting the user. Both bugs are invisible on a fast connection and constant on a train.',
      architecturalLesson:
        'An optimistic update is a promise you must be able to break cleanly. That requires an untouched snapshot, which requires immutability to have been real the whole time.',
    },
    {
      stageNumber: 4,
      stageName: 'The keyboard contract',
      focus: 'Command palette, focus management and the announcements nobody hears',
      codeSnippet: `// A combobox is a contract, not a styled input.\n<input role="combobox" aria-expanded={open} aria-controls="cmd-list"\n       aria-activedescendant={active ? \`cmd-\${active}\` : undefined} />\n<ul id="cmd-list" role="listbox">…</ul>\n\n// The result of an optimistic action must be spoken, not just drawn.\n<p role="status" aria-live="polite">{announcement}</p>`,
      failureModeOrInvariant:
        'Unplug the mouse. If the palette cannot be opened, escaped, or arrowed through; if focus escapes the dialog behind it; if closing it drops focus to `<body>` instead of the trigger — the feature does not exist for a real subset of users, and the interviewer will unplug the mouse.',
      architecturalLesson:
        'Accessibility is a keyboard model and an announcement policy decided at design time. Retrofitted ARIA is decoration over a broken interaction.',
    },
    {
      stageNumber: 5,
      stageName: 'The list at ten thousand',
      focus: 'Virtualization, honest memo boundaries and a budget you measure against',
      codeSnippet: `// Render the window, not the collection.\nconst rows = useVirtualizer({ count: issues.length, estimateSize: () => 44, overscan: 8 });\n\n// memo does nothing while the parent hands a new function down every render.\nconst onSelect = useCallback((id: string) => setSelected(id), []);`,
      failureModeOrInvariant:
        'Ten thousand rows is roughly a second of scripting per keystroke. Wrap the row in memo while passing an inline arrow and you have paid for the comparison and skipped none of the work. Write the budget down first — interaction under 200ms — or "faster" is a feeling.',
      architecturalLesson:
        'Performance work starts with a number and a profile. memo is a claim about referential stability that the call site has to keep.',
    },
    {
      stageNumber: 6,
      stageName: 'Offline, and a second tab',
      focus: 'A durable queue, cross-tab consistency and a conflict policy in writing',
      codeSnippet: `// The queue must outlive the tab, so it is not in memory.\nawait idb.put('outbox', { id, op: 'patch', body, baseVersion, at: Date.now() });\n\n// Two tabs are two clients. Tell the other one.\nnew BroadcastChannel('relay').postMessage({ type: 'invalidate', key: ['issues'] });`,
      failureModeOrInvariant:
        'localStorage is synchronous and blocks the main thread, so a large outbox janks every write. Without a base version the replay overwrites a newer server edit and the user silently loses someone else\'s work. Two tabs with independent caches show two different truths.',
      architecturalLesson:
        'Offline is a conflict policy, not a cache. Write down which write wins and why, then make the code enforce that sentence.',
    },
    {
      stageNumber: 7,
      stageName: 'The repository someone reads',
      focus: 'Tests as acceptance, a CI gate, a deploy, and the trade-off you rejected',
      codeSnippet: `// Test the guarantee, not the implementation.\nit('restores the previous title when the patch fails', async () => {\n  server.use(http.patch('/issues/:id', () => HttpResponse.error()));\n  await user.type(screen.getByRole('textbox', { name: /title/i }), 'new');\n  await user.keyboard('{Enter}');\n  expect(await screen.findByDisplayValue('original')).toBeInTheDocument();\n});`,
      failureModeOrInvariant:
        'Tests asserting that useState was called with a value prove the code is the code. A README describing what the app does, rather than what you chose and refused, gives a reviewer nothing to ask about — and reviewers ask about the thing you rejected.',
      architecturalLesson:
        'A repository is an argument. Tests are the evidence, CI is the claim that the evidence still holds, and the README is where you show the alternative you considered and why it lost.',
    },
  ],
  deliverables: [
    { id: 'Domain model', title: 'Typed domain model', spec: 'Discriminated unions for issue state and queue operations; adding a variant makes every unhandled site a compile error, verified by deliberately adding one.' },
    { id: 'Route map', title: 'URL-driven shell', spec: 'Nested layout routes with filters, sort and selection encoded in search params, parsed through one total validated function with defaults.' },
    { id: 'Query layer', title: 'Server-state cache', spec: 'Filter-derived query keys, request signals threaded to fetch, and all five surface states rendered distinctly for the list and the detail pane.' },
    { id: 'Mutation queue', title: 'Optimistic mutations', spec: 'Create, patch and reorder each snapshot prior state, apply immutably, and restore exactly on failure; a pure reducer owns queue transitions.' },
    { id: 'Command palette', title: 'Keyboard command palette', spec: 'An ARIA combobox over every action, reachable and fully operable with no pointer, returning focus to its trigger on close.' },
    { id: 'Virtual list', title: 'Virtualized issue list', spec: 'Ten thousand rows scrolling within a stated interaction budget, with a before-and-after profile committed to the repository.' },
    { id: 'Sync engine', title: 'Offline queue and cross-tab sync', spec: 'An IndexedDB outbox that replays on reconnect under a written conflict policy, with BroadcastChannel keeping open tabs consistent.' },
    { id: 'Design tokens', title: 'Token-driven theme', spec: 'Every colour, space and radius is a custom property on one layer; no literal hex value appears in any component stylesheet.' },
    { id: 'Test suite', title: 'Tests as acceptance criteria', spec: 'Each phase ships behavioural tests naming a user-visible guarantee, with the network mocked at the boundary rather than the module.' },
    { id: 'CI pipeline', title: 'CI gate and deploy', spec: 'Typecheck, lint, unit and component tests, and a bundle-size ceiling run on every push, blocking a deploy to a public URL.' },
    { id: 'Architecture README', title: 'Architecture README', spec: 'States the conflict policy in one sentence, the interaction budget, and one alternative you rejected with the reason it lost.' },
  ],
  layers: [
    { layer: 'Shell', components: ['nested routes', 'search-param state', 'error boundary', 'layout grid'], invariants: ['Any view a user can reach is reproducible from its URL alone.'] },
    { layer: 'Data', components: ['query cache', 'mutation queue reducer', 'outbox', 'broadcast channel'], invariants: ['No mutation is applied without a snapshot that can restore the prior value exactly.'] },
    { layer: 'Interaction', components: ['command palette', 'dialog', 'live region', 'virtual list'], invariants: ['Every action is reachable from the keyboard and announced when it completes.'] },
    { layer: 'Evidence', components: ['test suite', 'CI workflow', 'perf profile', 'README'], invariants: ['A guarantee named in the README has a test that fails when it breaks.'] },
  ],
  explicitTopics: [
    { category: 'Routing', topic: 'URL as state', subtopic: 'Nested layouts, search params, restoration', howCovered: 'Filters, sort and selection move out of component state into the URL and survive refresh, back and paste.', conceptIds: ['router-core'] },
    { category: 'TypeScript', topic: 'Modelling', subtopic: 'Discriminated unions and exhaustiveness', howCovered: 'Issue state and queue operations are unions; a new variant is a compile error at every unhandled site.', conceptIds: ['ts-essentials'] },
    { category: 'Architecture', topic: 'System design', subtopic: 'Boundaries, data flow, failure', howCovered: 'The conflict policy is chosen in phase 1 and every later phase is constrained by it.', conceptIds: ['frontend-system-design'] },
    { category: 'State', topic: 'Server state', subtopic: 'Cache keys, staleness, the five states', howCovered: 'Query keys derive from the filter; loading, empty, partial, error and success are rendered distinctly.', conceptIds: ['state-alternatives'] },
    { category: 'JavaScript', topic: 'Async', subtopic: 'Cancellation and races', howCovered: 'Request signals thread through fetch so a superseded filter change cannot render last.', conceptIds: ['js-promises', 'js-event-loop'] },
    { category: 'Web', topic: 'HTTP', subtopic: 'Methods, idempotence, status handling', howCovered: 'PATCH replay must be safe to repeat, which is what makes the offline queue legal.', conceptIds: ['web-http'] },
    { category: 'React', topic: 'Effects', subtopic: 'Subscriptions and teardown', howCovered: 'Every listener — online, broadcast, visibility — is torn down, proven by a remount test.', conceptIds: ['react-effects'] },
    { category: 'React', topic: 'Immutability', subtopic: 'Snapshot and rollback', howCovered: 'Rollback restores a snapshot taken before the optimistic write, so structural sharing has to be real.', conceptIds: ['react-immutability', 'react-references-copying'] },
    { category: 'Accessibility', topic: 'Keyboard and ARIA', subtopic: 'Combobox, dialog, live regions', howCovered: 'The palette is built to the combobox pattern and the whole app is driven with the mouse unplugged.', conceptIds: ['a11y-core', 'js-dom-events'] },
    { category: 'CSS', topic: 'Focus', subtopic: ':focus-visible and visible focus order', howCovered: 'Focus is styled deliberately for keyboard use; removing the outline is forbidden.', conceptIds: ['css-states'] },
    { category: 'React', topic: 'Resilience', subtopic: 'Error boundaries and portals', howCovered: 'Per-pane boundaries keep one failed widget from taking the shell down; the dialog renders through a portal.', conceptIds: ['react-errors-portals', 'react-class-lifecycle'] },
    { category: 'React', topic: 'Performance', subtopic: 'Virtualization and memo boundaries', howCovered: 'Ten thousand rows against a written budget, with a committed before-and-after profile.', conceptIds: ['react-perf', 'react-rendering-model', 'react-state'] },
    { category: 'Web', topic: 'Storage', subtopic: 'Choosing IndexedDB over localStorage', howCovered: 'The outbox must be async and durable, which rules out synchronous storage on the main thread.', conceptIds: ['web-storage'] },
    { category: 'Web', topic: 'Security', subtopic: 'Untrusted content and origins', howCovered: 'Issue bodies render untrusted markdown, and the mock API is cross-origin on purpose.', conceptIds: ['web-security', 'web-cors'] },
    { category: 'Testing', topic: 'Acceptance', subtopic: 'Behavioural tests and network mocking', howCovered: 'Each phase ships a test naming a user-visible guarantee, with the network mocked at the boundary.', conceptIds: ['testing-react'] },
    { category: 'Tooling', topic: 'Build and CI', subtopic: 'Bundle budget, splitting, deploy gate', howCovered: 'CI enforces a bundle ceiling and blocks deploy; routes are split so the palette is not in the entry chunk.', conceptIds: ['tooling-bundlers', 'js-modules'] },
    { category: 'React', topic: 'Roadmap: components and hooks', subtopic: 'Boundaries, custom hooks, the hook hierarchy', howCovered: 'Component boundaries are drawn against state ownership in phase 1; custom hooks wrap the cache and the queue.', conceptIds: ['rd-react-components', 'rd-react-hooks'] },
    { category: 'React', topic: 'Roadmap: state and data', subtopic: 'Three stores, caching, staleness', howCovered: 'Server state, URL state and ephemeral UI state each get a stated owner, and fetching is the whole of phase 2.', conceptIds: ['rd-react-state-mgmt', 'rd-react-data-fetching'] },
    { category: 'React', topic: 'Roadmap: routing, forms and testing', subtopic: 'Nested routes, real forms, acceptance tests', howCovered: 'Routing and the issue form are built against the URL in phase 1; the suite becomes the acceptance criteria in phase 7.', conceptIds: ['rd-react-routing-forms', 'rd-react-testing'] },
    { category: 'Performance', topic: 'Roadmap: vitals and rendering', subtopic: 'An INP target, measured', howCovered: 'The interaction budget is written as a Web Vitals target and profiled, not asserted.', conceptIds: ['rd-perf-web-vitals'] },
    { category: 'HTML', topic: 'Semantics and forms', subtopic: 'Structure and native validation', howCovered: 'The issue editor is a real form with native constraints before any JavaScript validation.', conceptIds: ['html-semantics', 'html-forms'] },
  ],
  implicitFoundations: [
    { domain: 'Language Semantics', title: 'Pure reducers over a queue', mechanism: 'Queue transitions are a reducer over an operation log, so replay is deterministic.', realWorldImpact: 'Undo, retry and debugging all reduce to replaying the same log.', conceptIds: ['redux-core', 'js-arrays-objects'] },
    { domain: 'Language Semantics', title: 'Closures around each attempt', mechanism: 'Every retry closes over its own abort handle and base version.', realWorldImpact: 'A stale closure retries with last week\'s payload against this week\'s server.', conceptIds: ['js-scope-closures'] },
    { domain: 'Language Semantics', title: 'Boundary parsing', mechanism: 'JSON arrives untyped; parsing happens once, at the edge, with defaults stated.', realWorldImpact: 'A missing field and an empty field mean different things to a user.', conceptIds: ['js-types-coercion', 'js-defaulting-operators'] },
    { domain: 'Language Semantics', title: 'Identity during a merge', mechanism: 'Deciding whether two versions of an issue are the same needs a stated comparison rule.', realWorldImpact: 'Reference identity means nothing across a reload or a tab boundary.', conceptIds: ['js-equality-matrix'] },
    { domain: 'DOM & Browser Pipeline', title: 'Composition over configuration', mechanism: 'Palette actions and list rows are registered and composed, not switched on a type string.', realWorldImpact: 'Adding an action touches one file instead of a switch statement in four.', conceptIds: ['react-composition', 'react-hooks-rest'] },
    { domain: 'DOM & Browser Pipeline', title: 'The shell is a grid', mechanism: 'Sidebar, list and detail are grid tracks; each pane owns its scroll and containment.', realWorldImpact: 'Without containment the virtual list escapes its track and the page scrolls twice.', conceptIds: ['css-grid-tracks', 'css-grid-placement', 'css-grid-align', 'css-box-display'] },
    { domain: 'DOM & Browser Pipeline', title: 'A row is a flex line', mechanism: 'Each issue row lays out as handle, title, then trailing metadata that holds its basis.', realWorldImpact: 'A long title must not push the status chip off screen.', conceptIds: ['css-flex-axes', 'css-flex-sizing', 'css-flex-align'] },
    { domain: 'DOM & Browser Pipeline', title: 'Anchored overlays', mechanism: 'The palette and menus position against a rect, which is a containing-block problem.', realWorldImpact: 'A transformed ancestor silently becomes the containing block and the menu lands wrong.', conceptIds: ['css-positioning'] },
    { domain: 'Tooling & Build', title: 'One definition per token', mechanism: 'Colour, space and radius are custom properties layered so themes never escalate specificity.', realWorldImpact: 'A recolour is one file, and dark mode is not a rewrite.', conceptIds: ['css-tokens-modern', 'css-cascade', 'css-selectors', 'css-units'] },
    { domain: 'DOM & Browser Pipeline', title: 'Responsive without breakpoint soup', mechanism: 'The detail pane responds to its own width with a container query, not the viewport.', realWorldImpact: 'The same component is correct in a sidebar and full screen.', conceptIds: ['css-media-container'] },
    { domain: 'Tooling & Build', title: 'Shipping the bytes', mechanism: 'Hashed immutable assets behind a CDN, with a bundle ceiling enforced in CI.', realWorldImpact: 'A budget nobody enforces is a number in a document.', conceptIds: ['rd-perf-network-cdn', 'rd-perf-rendering-media'] },
    { domain: 'DOM & Browser Pipeline', title: 'Styling without a framework', mechanism: 'Custom properties, cascade layers and container queries carry the whole visual system.', realWorldImpact: 'The theme is data, so a recolour never becomes a refactor.', conceptIds: ['rd-fe-modern-css'] },
    { domain: 'Internet & Protocols', title: 'The request path, written down', mechanism: 'The README traces URL to first paint for this application specifically.', realWorldImpact: 'A reviewer can check the claim against the waterfall.', conceptIds: ['rd-fe-internet-browser'] },
    { domain: 'Internet & Protocols', title: 'First paint before the network answers', mechanism: 'The shell and cached list render before any request resolves.', realWorldImpact: 'This is the entire perceived-performance claim of a local-first cache.', conceptIds: ['web-how-page-loads'] },
  ],
  frameworkVsManual: {
    frameworkHandled: [
      'Cache lifecycle, deduplication and background refetch (TanStack Query).',
      'Route matching, nested layouts and search-param serialisation (React Router).',
      'Windowing arithmetic and scroll measurement (TanStack Virtual).',
    ],
    manualEngineeringRequired: [
      'The conflict policy, written as a sentence before any code enforces it.',
      'The rollback snapshot — no library knows what "the previous value" means for your model.',
      'The keyboard model and the announcement policy for every optimistic action.',
      'The interaction budget, the profile that proves it, and the CI gate that keeps it.',
    ],
  },
};
