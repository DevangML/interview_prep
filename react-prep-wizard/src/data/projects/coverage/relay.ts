import { e, type ProjectCoverage } from './types';

/**
 * Written from the blueprint, not backfilled onto it.
 *
 * Every edge below names a phase or a deliverable that the spec actually
 * demands, which is the difference between this manifest and the eleven that
 * the old "advanced projects must span the whole space" rule produced. Where
 * Relay does not teach something, it says so.
 */
export const relayCoverage: ProjectCoverage = {
  projectId: 'product-relay',
  edges: [
    // ── Phase 1 · the shell that is a URL ──────────────────────────────────
    e('router-core', 'explicit', 'Stage 1', 'Filters, sort and selection are search params behind nested layout routes, so refresh and back both work'),
    e('ts-essentials', 'explicit', 'Stage 1', 'Issue state and queue operations are discriminated unions; a new variant is a compile error everywhere it matters'),
    e('frontend-system-design', 'explicit', 'Stage 1', 'The conflict policy is chosen before any code and constrains every phase after it'),
    e('html-semantics', 'explicit', 'Stage 1', 'The shell is a real landmark structure, so the document outline survives the app being a single page'),

    // ── Phase 2 · the list that stays correct ──────────────────────────────
    e('state-alternatives', 'explicit', 'Stage 2', 'Server state is a cache keyed by the filter, which is why no manual invalidation is needed'),
    e('js-promises', 'explicit', 'Stage 2', 'Request signals thread to fetch so a superseded filter change cannot resolve last'),
    e('web-http', 'explicit', 'Stage 2', 'Status handling and idempotence are decided here, which is what later makes PATCH replay legal'),
    e('react-effects', 'explicit', 'Stage 2', 'Online, visibility and broadcast subscriptions each get a teardown, proven by a remount test'),

    // ── Phase 3 · the edit that survives a bad network ─────────────────────
    e('react-immutability', 'explicit', 'Stage 3', 'Rollback restores a snapshot taken before the optimistic write, so structural sharing has to be genuine'),
    e('react-references-copying', 'explicit', 'Stage 3', 'A snapshot that shares a mutated nested object restores the broken state you were escaping'),
    e('js-event-loop', 'explicit', 'Stage 3', 'Cancelling in-flight queries before mutating is ordering work across microtask boundaries, not a formality'),
    e('web-cors', 'explicit', 'Stage 3', 'The mock API is deliberately cross-origin, so credentials and preflight are configured rather than discovered later'),

    // ── Phase 4 · the keyboard contract ────────────────────────────────────
    e('a11y-core', 'explicit', 'Stage 4', 'The palette is built to the ARIA combobox pattern and the app is driven with the mouse unplugged'),
    e('js-dom-events', 'explicit', 'Stage 4', 'Key handling, focus restoration and delegation are what make the palette behave like a native control'),
    e('css-states', 'explicit', 'Stage 4', 'Focus is styled for keyboard use with :focus-visible; removing the outline is forbidden'),
    e('react-errors-portals', 'explicit', 'Stage 4', 'The dialog renders through a portal and each pane has its own boundary, so one failure is not fatal'),
    e('react-class-lifecycle', 'explicit', 'Stage 4', 'The error boundary is a class, which is still the only way to catch a render error'),

    // ── Phase 5 · the list at ten thousand ─────────────────────────────────
    e('react-perf', 'explicit', 'Stage 5', 'Ten thousand rows against a written interaction budget, with a committed before-and-after profile'),
    e('react-rendering-model', 'explicit', 'Stage 5', 'Row keys and windowing decide what Fiber reconciles, which is why the caret survives a background refetch'),
    e('react-state', 'explicit', 'Stage 5', 'Selection and filter state are separate machines; merging them re-renders the window on every keystroke'),
    e('css-box-display', 'explicit', 'Stage 5', 'Each pane owns its scroll and containment, or the virtual list escapes its track and the page scrolls twice'),

    // ── Phase 6 · offline, and a second tab ────────────────────────────────
    e('web-storage', 'explicit', 'Stage 6', 'The outbox must be durable and async, which rules synchronous localStorage off the main thread'),
    e('web-security', 'explicit', 'Stage 6', 'Issue bodies render untrusted markdown, so sanitisation and a URL-scheme allowlist are mandatory'),
    e('js-modules', 'explicit', 'Stage 6', 'The sync engine is a module boundary with its own worker, not a folder of helpers'),

    // ── Phase 7 · the repository someone reads ─────────────────────────────
    e('testing-react', 'explicit', 'Test suite', 'Each phase ships a behavioural test naming a user-visible guarantee, mocked at the network boundary'),
    e('tooling-bundlers', 'explicit', 'Stage 7', 'CI enforces a bundle ceiling and route splitting keeps the palette out of the entry chunk'),
    e('html-forms', 'explicit', 'Stage 7', 'The issue editor is a real form with native constraints before any JavaScript validation runs'),

    // ── Extended roadmap tracks ────────────────────────────────────────────
    e('rd-react-components', 'explicit', 'Stage 1', 'Component boundaries are drawn against ownership of state, which is the first thing phase 1 decides'),
    e('rd-react-hooks', 'implicit', 'Query layer', 'Custom hooks wrap the cache and the queue so call sites never touch either directly'),
    e('rd-react-state-mgmt', 'explicit', 'Stage 2', 'Server state, URL state and ephemeral UI state are three stores with a stated rule for which owns what'),
    e('rd-react-data-fetching', 'explicit', 'Stage 2', 'Fetching, caching, staleness and background refetch are the whole subject of this phase'),
    e('rd-react-routing-forms', 'explicit', 'Stage 1', 'Nested routing and the issue form are both built here, against the URL rather than component state'),
    e('rd-react-testing', 'explicit', 'Stage 7', 'The suite is the acceptance criteria, which is exactly what the roadmap means by testing'),
    e('rd-perf-web-vitals', 'explicit', 'Stage 5', 'The interaction budget is written as an INP target and measured, not asserted'),
    e('rd-perf-rendering-media', 'implicit', 'Virtual list', 'Windowing, containment and avoided layout thrash are the rendering half of the performance track'),
    e('rd-perf-network-cdn', 'implicit', 'CI pipeline', 'The deploy serves hashed immutable assets behind a CDN, which is what the bundle ceiling protects'),
    e('rd-fe-internet-browser', 'implicit', 'Architecture README', 'The README explains the request path from URL to first paint for this app specifically'),
    e('rd-fe-modern-css', 'implicit', 'Design tokens', 'Custom properties, cascade layers and container queries are the styling model, not a framework'),

    // ── Deliverable-anchored foundations ───────────────────────────────────
    e('redux-core', 'implicit', 'Mutation queue', 'Queue transitions are a pure reducer over an operation log, which is what makes replay deterministic'),
    e('js-arrays-objects', 'implicit', 'Mutation queue', 'The outbox is transformed and compacted with operations that must never mutate history'),
    e('js-scope-closures', 'implicit', 'Sync engine', 'Each retry closes over its own abort handle and base version, or it replays a stale payload'),
    e('js-types-coercion', 'implicit', 'Domain model', 'JSON arrives untyped, so parsing happens once at the edge with a stated defaulting policy'),
    e('js-defaulting-operators', 'implicit', 'Domain model', 'A missing assignee and an unassigned issue are different facts, so ?? and || are not interchangeable'),
    e('js-equality-matrix', 'implicit', 'Sync engine', 'Deciding whether two versions of an issue are the same needs a stated comparison rule'),
    e('react-composition', 'implicit', 'Command palette', 'Actions are registered and composed rather than switched on a type string'),
    e('react-hooks-rest', 'implicit', 'Query layer', 'useRef holds the abort handle and useReducer owns the queue without either causing a render'),
    e('css-grid-tracks', 'implicit', 'Route map', 'Sidebar, list and detail are three resizable grid tracks driven by custom properties'),
    e('css-grid-placement', 'implicit', 'Route map', 'The detail pane spans or collapses by area name as the layout changes, without reordering the DOM'),
    e('css-grid-align', 'implicit', 'Route map', 'Pane headers align on both axes so the three columns read as one horizontal band'),
    e('css-flex-axes', 'implicit', 'Virtual list', 'Each row is a flex line: handle, title, then trailing metadata'),
    e('css-flex-sizing', 'implicit', 'Virtual list', 'Title grows and the status chip holds its basis, so a long title cannot push it off screen'),
    e('css-flex-align', 'implicit', 'Virtual list', 'The drag handle aligns to the first line of a wrapped title, not the centre of the row'),
    e('css-positioning', 'implicit', 'Command palette', 'The palette anchors to a rect, so a transformed ancestor silently becoming the containing block is a real bug'),
    e('css-tokens-modern', 'implicit', 'Design tokens', 'Colour, space and radius have one definition each, so a recolour is one file'),
    e('css-cascade', 'implicit', 'Design tokens', 'Theme overrides sit in a cascade layer so neither side escalates specificity to win'),
    e('css-selectors', 'implicit', 'Design tokens', ':has() styles a row that contains an open editor without threading an extra class through'),
    e('css-units', 'implicit', 'Design tokens', 'Row height and spacing are relative, so the list stays usable at 200% browser zoom'),
    e('css-media-container', 'implicit', 'Design tokens', 'The detail pane responds to its own width with a container query, not the viewport'),
    e('web-how-page-loads', 'implicit', 'CI pipeline', 'The shell and cached list paint before any request resolves, which is the perceived-performance claim'),
  ],
  exemptions: [
    {
      reason: 'Relay is a client against a mock API, so there is no server runtime to render from. React Server Components and server Actions need a framework this build deliberately does not adopt.',
      conceptIds: ['r19-use-rsc', 'r19-actions', 'rd-react-rsc-compiler'],
    },
    {
      reason: 'State here is a server cache plus one reducer. Adding Redux Toolkit would be cargo cult at this size, and Flux is covered as history in the service track where the OA still asks about it.',
      conceptIds: ['redux-react-toolkit', 'tooling-flux'],
    },
    {
      reason: 'Nothing in this build constructs an inheritance chain or binds a dynamic receiver — the codebase is functions, unions and hooks, and pretending otherwise would be the padding this manifest exists to avoid.',
      conceptIds: ['js-this', 'js-prototypes'],
    },
    {
      reason: 'Debounce and throttle arrive from the query library rather than being hand-written, and re-implementing them here would duplicate the service-track utility-belt build without adding a lesson.',
      conceptIds: ['js-polyfills'],
    },
    {
      reason: 'The layout has no intrinsic-ratio media and no vertical writing mode; forcing an aspect-ratio box into an issue list to claim the topic is exactly the inflation this file avoids.',
      conceptIds: ['css-ratio-logical'],
    },
    {
      reason: 'Web Components, high-priority resource hints and V8-level package analysis belong to the roadmap tracks that own them; this build touches none of the three in a way worth claiming.',
      conceptIds: ['rd-fe-html-web-components', 'rd-fe-js-v8-packages', 'rd-perf-high-priority'],
    },
    {
      reason:
        'These projects were designed before the frontend system-design track existed, and none of them chooses a transport under a stated workload — the thing the topic actually teaches. Claiming them here would be coverage by adjacency: the build fetches over HTTP, therefore it \'covers\' gRPC. A dedicated system-design project carries these edges instead.',
      conceptIds: [
        'rd-comm-protocols',
        'rd-comm-rest',
        'rd-comm-graphql',
        'rd-comm-grpc',
        'rd-comm-polling',
        'rd-comm-websocket-sse',
        'rd-comm-webhooks-webrtc',
      ],
    },
    {
      reason:
        'Security is taught by attacking and then defending a specific sink, and none of these builds has an untrusted-input surface, a session, or a cross-origin boundary to defend. A project that renders trusted local data cannot honestly claim to teach XSS.',
      conceptIds: [
        'rd-sec-overview',
        'rd-sec-xss',
        'rd-sec-sanitization',
        'rd-sec-csrf',
        'rd-sec-cors',
        'rd-sec-headers',
        'rd-sec-iframe',
        'rd-sec-authentication',
        'rd-sec-authorization',
        'rd-sec-https',
        'rd-sec-permissions-policy',
        'rd-sec-sri-deps',
        'rd-sec-ssrf-ssji',
        'rd-sec-client-storage',
      ],
    },
    {
      reason:
        'Client storage, HTTP caching and telemetry are properties of a deployed system under real traffic. These builds run locally against fixtures, so the invalidation and eviction behaviour that makes the topic hard never occurs.',
      conceptIds: [
        'rd-store-comparison',
        'rd-cache-http',
        'rd-cache-client',
        'rd-obs-telemetry',
        'rd-obs-alerting',
      ],
    },
  ],
};
