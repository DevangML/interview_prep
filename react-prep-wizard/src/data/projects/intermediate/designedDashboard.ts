import type { ProjectBlueprint } from '../types';

/** Working engineer — the front-end system design round, executed rather than discussed. */
export const designedDashboardProject: ProjectBlueprint = {
  id: 'inter-designed-dashboard',
  title: 'Design It On The Whiteboard, Then Actually Build It',
  tagline: 'A dashboard specified as a design document first — components, data, states, failure.',
  realWorldAnalog: 'The front-end system design round at any 2-5 YOE interview',
  tier: 'intermediate',
  difficulty: 'Senior',
  estimatedBuildTimeHours: 10,
  architecturePattern: 'Server-state / client-state separation with an explicit failure policy',
  prerequisites: ['inter-flux-to-rtk', 'basic-fetch-list'],
  summary:
    'Write the design document first — component boundaries, data flow, every state, and what happens when each dependency fails — then build exactly what the document specifies. The round is graded on whether you volunteered the failure modes, and this is the only way to practise that rather than read about it.',
  tags: ['System design', 'Architecture', 'Caching', 'Resilience', 'Senior'],
  xpBounty: 380,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'A written design doc: component tree, data ownership, state inventory, failure table.',
      'Server state in a query cache; client state kept separate and small.',
      'Offline-tolerant reads from IndexedDB with an explicit staleness indicator.',
      'A degraded mode: one widget fails without taking the page down.',
    ],
    outOfScopeBloat: [
      'Real-time collaboration.',
      'A charting library beyond one chart.',
      'Authentication infrastructure.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Build first, design never',
      focus: 'One global store holding everything, no failure policy',
      codeSnippet: `// Everything in one store: server data, UI flags, form drafts\nconst store = { widgets: [], loading: false, error: null,\n                sidebarOpen: true, draft: {}, user: null };\n\n// One failure takes the page\nconst [a, b, c] = await Promise.all([getKpis(), getFeed(), getAlerts()]);`,
      failureModeOrInvariant:
        'Promise.all means one slow or failing endpoint blanks the whole dashboard. Server data and UI flags share a store, so a refetch invalidates the sidebar state. Nobody can say what the screen shows when the feed is empty but the KPIs loaded.',
      architecturalLesson:
        'Server state and client state have different lifetimes, different invalidation rules and different owners. Merging them makes both harder.',
    },
    {
      stageNumber: 2,
      stageName: 'The document, then the code',
      focus: 'State inventory, per-widget boundaries, an explicit failure table',
      codeSnippet: `// Failure table — written before any component\n// Dependency   | Failure       | Behaviour              | Recovery\n// KPI API      | 5xx           | last cached + stale tag| retry x3, backoff\n// Feed API     | timeout       | skeleton -> empty note | manual retry\n// Alerts WS    | disconnect    | banner, poll fallback  | reconnect w/ jitter\n\n<ErrorBoundary fallback={<WidgetDown name="Feed" />}>\n  <Suspense fallback={<WidgetSkeleton />}><Feed /></Suspense>\n</ErrorBoundary>`,
      failureModeOrInvariant:
        'Each widget owns its own request, boundary and skeleton, so a failing feed shows one degraded card rather than a blank page. Every cell of the failure table corresponds to code that exists.',
      architecturalLesson:
        'The failure table is the deliverable interviewers actually want. Producing it unprompted is the difference between a mid-level and a senior answer.',
    },
    {
      stageNumber: 3,
      stageName: 'Caching with a stated policy',
      focus: 'Stale-while-revalidate, IndexedDB persistence, cache invalidation rules',
      codeSnippet: `// Every cached key has a written policy, not a default\n// kpis:      staleTime 30s,  gcTime 5m,  persist: yes\n// feed:      staleTime 0,    gcTime 1m,  persist: no\n// profile:   staleTime 1h,   gcTime 24h, persist: yes\n\nawait idb.set('kpis', { data, fetchedAt: Date.now() });\nconst isStale = Date.now() - fetchedAt > 30_000;   // shown in the UI, not hidden`,
      failureModeOrInvariant:
        'A user opening the dashboard offline sees yesterday’s numbers clearly labelled as stale, rather than either a spinner forever or stale numbers presented as current.',
      architecturalLesson:
        'Showing cached data is a product decision as much as a technical one. The honest version tells the user how old the number is.',
    },
  ],
  deliverables: [
    { id: 'Transport', title: 'Transport', spec: 'A cache client with per-key policy, retry with jittered backoff, request dedupe, and custom error classes checked with instanceof.' },
    { id: 'Widgets', title: 'Widgets', spec: 'Each widget owns its request, boundary, skeleton and state machine, so one failure degrades one card.' },
    { id: 'Cache', title: 'Cache', spec: 'Cache entries replaced rather than patched, copied at the boundary, with a stated key-equality rule.' },
    { id: 'Boundary', title: 'Boundary', spec: 'A class boundary per widget implementing getDerivedStateFromError.' },
    { id: 'Settings', title: 'Settings', spec: 'A settings form using useActionState and useOptimistic so a preference applies before the server confirms.' },
    { id: 'Shell', title: 'Shell', spec: 'A server-component shell around client widgets, with visibilitychange and online/offline driving revalidation.' },
    { id: 'Client state', title: 'Client state', spec: 'Layout, filters and drafts in one RTK slice, deliberately holding no server data.' },
    { id: 'Failure table', title: 'Failure table', spec: 'A written table of dependency, failure, behaviour and recovery, with one MSW test per row.' },
    { id: 'Structure', title: 'Structure', spec: 'Widgets as feature modules with a declared public interface so each can be lazily imported.' },
    { id: 'Filters', title: 'Filters', spec: 'A date range parsed once at the edge with an explicit invalid-date policy, shared by every widget.' },
    { id: 'Layout', title: 'Layout', spec: 'An auto-fit grid where widgets declare their own column and row spans and headers align across a row.' },
    { id: 'Widget', title: 'Widget', spec: 'A flex column with a growing body, a pinned staleness footnote, its own containment context and a container query.' },
    { id: 'Widget header', title: 'Widget header', spec: 'A title with an auto-margin refresh control that holds position for any title length.' },
    { id: 'Theme', title: 'Theme', spec: 'Status colours as tokens with color-mix derived hovers, layered above a third-party chart stylesheet.' },
  ],
  layers: [
    {
      layer: 'Design',
      components: ['component tree diagram', 'state inventory', 'failure table', 'cache policy table'],
      invariants: ['No component is written before its row exists in the state inventory.'],
    },
    {
      layer: 'Data',
      components: ['query cache', 'IndexedDB persister', 'retry with backoff'],
      invariants: ['Server state never lives in the client store, and vice versa.'],
    },
    {
      layer: 'View',
      components: ['per-widget error boundary', 'skeletons', 'stale badge', 'offline banner'],
      invariants: ['A single widget failure never blanks the page.'],
    },
  ],
  explicitTopics: [
    {
      category: 'Architecture',
      topic: 'System design',
      subtopic: 'Components, data, states, failure',
      howCovered: 'The design document is the first deliverable and the build is graded against it.',
      conceptIds: ['frontend-system-design'],
    },
    {
      category: 'Web Platform',
      topic: 'Storage',
      subtopic: 'Cookies, localStorage, sessionStorage, IndexedDB',
      howCovered: 'Cached responses are persisted to IndexedDB, with an argued reason for not using localStorage.',
      conceptIds: ['web-storage'],
    },
    {
      category: 'Web Platform',
      topic: 'Network',
      subtopic: 'Status codes, idempotency and retry policy',
      howCovered: 'The retry policy distinguishes idempotent from non-idempotent requests and 4xx from 5xx.',
      conceptIds: ['web-http'],
    },
    {
      category: 'State Management',
      topic: 'Choosing',
      subtopic: 'Context, Zustand, TanStack Query — the right tool',
      howCovered: 'Server and client state are deliberately given different tools, with the split written down.',
      conceptIds: ['state-alternatives'],
    },
    {
      category: 'React Advanced',
      topic: 'Escape hatches',
      subtopic: 'Error boundaries and Suspense',
      howCovered: 'Each widget is independently wrapped so failures are contained to one card.',
      conceptIds: ['react-errors-portals'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'Internet & Protocols',
      title: 'Caching semantics',
      mechanism: 'Cache-Control, ETag and conditional requests define freshness at the HTTP layer too.',
      realWorldImpact: 'An application cache that ignores the transport cache does the same work twice.',
      conceptIds: ['web-http'],
    },
    {
      domain: 'Security & Invariants',
      title: 'What may be persisted',
      mechanism: 'Anything in IndexedDB or localStorage is readable by script on that origin.',
      realWorldImpact: 'Rules out persisting tokens, and explains the httpOnly cookie recommendation.',
      conceptIds: ['web-security', 'web-storage'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Query caching and revalidation', 'Suspense and boundary mechanics'],
    manualEngineeringRequired: [
      'The design document, the failure table and the cache policy — all written before code.',
      'The offline persistence layer and staleness surfacing.',
    ],
  },
};
