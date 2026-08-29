import type { ProjectBlueprint } from '../types';

/**
 * The transport project.
 *
 * Every other build in the library fetches once and renders. This one has to
 * keep a screen truthful while the data underneath it changes, which is the
 * only situation where the choice between polling, long polling, SSE and a
 * socket has consequences you can feel. It is deliberately built four times.
 */
export const liveOpsBlueprint: ProjectBlueprint = {
  id: 'service-live-ops',
  title: 'Live Ops Console',
  tagline: 'One screen, four transports, and a written reason for the one you keep.',
  realWorldAnalog: 'The order-dispatch board behind a food delivery operation — Swiggy, Zomato, Deliveroo.',
  track: 'service',
  tier: 'flagship',
  difficulty: 'Intermediate',
  estimatedBuildTimeHours: 14,
  architecturePattern: 'Transport-agnostic store with a swappable sync adapter',
  summary:
    'A console showing live orders, their status and a running kitchen load. You build the sync layer four times — naive interval, corrected poll loop, long poll, then SSE — measure each, and write the decision record that says which one ships and what breaks it. Then you add the cache, the persistence and the telemetry that make it survivable.',
  tags: ['SSE', 'polling', 'caching', 'telemetry', 'realtime', 'system-design'],
  xpBounty: 900,
  prerequisites: ['basic-fetch-list'],
  coreScopeBoundaries: {
    inScopeMinimal: [
      'An order list that stays truthful while orders change server-side',
      'Four sync implementations behind one adapter interface',
      'A measured comparison: requests/minute, staleness, bytes',
      'A written transport decision record',
      'Cache with explicit invalidation, and optimistic status changes with rollback',
      'Telemetry that survives the tab closing',
    ],
    outOfScopeBloat: [
      'Authentication — the security flagship owns that',
      'A real backend; a fixture server that mutates on a timer is enough',
      'Charts, theming, or a design system',
      'WebSocket infrastructure — it is evaluated and rejected in writing, not built',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The interval that lies',
      focus: 'Ship the obvious version and watch it break under latency.',
      codeSnippet: `useEffect(() => {
  const id = setInterval(() => fetch('/api/orders').then(r => r.json()).then(setOrders), 1000);
  return () => clearInterval(id);
}, []);`,
      failureModeOrInvariant:
        'Throttle the fixture to 1500ms. Requests now overlap, responses land out of order, and the board flickers between two truths. The bug is that setInterval fires on a schedule, not on completion.',
      architecturalLesson:
        'A periodic network call is not a timer problem. Scheduling the next attempt from the previous completion is the whole fix, and it is why setInterval never belongs around fetch.',
    },
    {
      stageNumber: 2,
      stageName: 'A poll loop you can defend',
      focus: 'Self-chaining loop, jitter, visibility awareness and backoff.',
      codeSnippet: `while (!signal.aborted) {
  if (document.visibilityState === 'visible') await tick();
  await sleep(base + Math.random() * jitter);   // jitter, or every client syncs
}`,
      failureModeOrInvariant:
        'Open eight tabs. Without jitter they align on the same second after a deploy and arrive as a spike; with it the load flattens. Hidden tabs must stop polling entirely, and errors must back off rather than hammer.',
      architecturalLesson:
        'Client-side load is a distribution, not an average. Jitter and visibility gating are the two lines that separate a poll loop from a self-inflicted denial of service.',
    },
    {
      stageNumber: 3,
      stageName: 'Hold the connection open',
      focus: 'Long polling, then SSE with Last-Event-ID resume.',
      codeSnippet: `const es = new EventSource('/api/orders/stream');
es.addEventListener('order', (e) => apply(JSON.parse(e.data)));
// Reconnection and Last-Event-ID replay are the browser's job, not yours.`,
      failureModeOrInvariant:
        'Kill the fixture mid-stream. Long polling needs your own reconnect and a timeout below the proxy idle timeout; SSE reconnects itself and replays the gap. Prove the gap is replayed by mutating orders while disconnected.',
      architecturalLesson:
        'SSE is the cheapest correct answer for server-to-client updates, and the reason is operational: reconnection and replay are already written. A socket buys bidirectionality you must then pay for in heartbeats, backoff and sticky sessions.',
    },
    {
      stageNumber: 4,
      stageName: 'Stop asking for what you already have',
      focus: 'HTTP cache headers, an LRU for detail views, invalidation and optimistic writes.',
      codeSnippet: `// Cache-Control: max-age=30, stale-while-revalidate=300
// Serve stale instantly, refresh behind it. The user waits for nothing.`,
      failureModeOrInvariant:
        'Mark an order ready. The optimistic write paints immediately, the server rejects it, and without a snapshot the board now disagrees with reality permanently. The rollback path is the deliverable, not the optimism.',
      architecturalLesson:
        'Server state is a cache with staleness rules. Optimistic updates are only correct when the rollback exists and the cache reconverges after settle.',
    },
    {
      stageNumber: 5,
      stageName: 'Survive a reload',
      focus: 'Choosing between sessionStorage, localStorage and IndexedDB by lifetime and size.',
      codeSnippet: `// Filters -> sessionStorage (per tab, must not leak between tabs)
// Column layout -> localStorage (per person, survives)
// Order archive -> IndexedDB (async, large, structured)`,
      failureModeOrInvariant:
        'Read a large archive from localStorage on startup and measure the main thread. Synchronous storage is a startup cost. Every read must also survive a private-mode throw and a quota error.',
      architecturalLesson:
        'The storage choice falls out of two questions — how long must it live, and how big does it get. Everything in the browser is evictable, so none of it is a source of truth.',
    },
    {
      stageNumber: 6,
      stageName: 'Know before they tell you',
      focus: 'Web Vitals, sendBeacon on visibilitychange, and one alert with a runbook.',
      codeSnippet: `addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden')
    navigator.sendBeacon('/rum', JSON.stringify(queue.splice(0)));
});`,
      failureModeOrInvariant:
        'Send telemetry with fetch on unload and watch it get cancelled. Flushing on visibilitychange with sendBeacon is the only reliable moment on mobile.',
      architecturalLesson:
        'Instrumentation you cannot deliver is not instrumentation. And an alert without a runbook trains people to ignore the channel, which is worse than no alert.',
    },
  ],
  deliverables: [
    { id: 'Transport decision record', title: 'Transport decision record', spec: 'One page naming the chosen transport, the measured numbers behind it, and the failure mode of each rejected option including WebSocket, GraphQL subscriptions and gRPC-Web.' },
    { id: 'Sync adapter', title: 'Sync adapter interface', spec: 'One interface with four implementations, swappable at runtime, so the console is provably transport-agnostic.' },
    { id: 'Poll loop', title: 'Corrected poll loop', spec: 'Self-chaining, jittered, visibility-gated, with exponential backoff on error and full abort on unmount.' },
    { id: 'Stream client', title: 'SSE stream client', spec: 'EventSource with typed events, resumption proven by mutating data while disconnected and observing replay.' },
    { id: 'Cache layer', title: 'Cache with invalidation', spec: 'LRU for detail views, tag-based invalidation after a mutation, and optimistic status writes with a proven rollback.' },
    { id: 'Storage adapter', title: 'Storage adapter', spec: 'Three stores chosen by lifetime and size, every access guarded against throw and quota failure.' },
    { id: 'Telemetry beacon', title: 'Telemetry beacon', spec: 'LCP, INP and CLS plus transport counters, flushed via sendBeacon on visibilitychange, tagged with release version.' },
    { id: 'Ops runbook', title: 'One alert and its runbook', spec: 'A single symptom-based alert with a stated SLO, an error budget, and the steps a responder takes.' },
    { id: 'Config panel', title: 'Config-driven board', spec: 'Column set, filters and empty states rendered from a JSON config rather than hardcoded JSX, so a new board is data.' },
  ],
  layers: [
    { layer: 'Transport', components: ['pollAdapter', 'longPollAdapter', 'sseAdapter', 'intervalAdapter'], invariants: ['Exactly one adapter is live', 'Every adapter aborts fully on unmount'] },
    { layer: 'Cache', components: ['lru', 'invalidateByTag', 'optimistic'], invariants: ['Every optimistic write snapshots its previous value', 'Cache reconverges with the server after settle'] },
    { layer: 'Persistence', components: ['sessionAdapter', 'localAdapter', 'idbAdapter'], invariants: ['Every read is guarded', 'No store is treated as a source of truth'] },
    { layer: 'Telemetry', components: ['vitals', 'beacon', 'counters'], invariants: ['Delivery survives page teardown', 'Every metric carries a release tag'] },
  ],
  explicitTopics: [
    { category: 'Transport', topic: 'Realtime', subtopic: 'Polling and long polling', howCovered: 'Built twice, measured, and the naive version is shipped first so the overlap bug is felt.', conceptIds: ['rd-comm-polling'] },
    { category: 'Transport', topic: 'Realtime', subtopic: 'SSE and WebSocket', howCovered: 'SSE built with resume; WebSocket evaluated and rejected in the decision record with its operational cost named.', conceptIds: ['rd-comm-websocket-sse'] },
    { category: 'Transport', topic: 'Protocols', subtopic: 'HTTP versions', howCovered: 'The connection budget for concurrent long polls is computed against HTTP/1.1 and HTTP/2.', conceptIds: ['rd-comm-protocols'] },
    { category: 'Transport', topic: 'API styles', subtopic: 'REST semantics', howCovered: 'Status changes are idempotent PATCHes with an idempotency key so a retry cannot double-transition an order.', conceptIds: ['rd-comm-rest'] },
    { category: 'Transport', topic: 'API styles', subtopic: 'GraphQL and gRPC', howCovered: 'Both are scored in the decision record against this workload and rejected with stated reasons.', conceptIds: ['rd-comm-graphql', 'rd-comm-grpc'] },
    { category: 'Transport', topic: 'Callbacks', subtopic: 'Webhooks', howCovered: 'The fixture receives a webhook and fans it out to the stream, so the full chain is visible.', conceptIds: ['rd-comm-webhooks-webrtc'] },
    { category: 'Caching', topic: 'HTTP', subtopic: 'Freshness and revalidation', howCovered: 'stale-while-revalidate is configured and the perceived-latency difference is measured.', conceptIds: ['rd-cache-http'] },
    { category: 'Caching', topic: 'Client', subtopic: 'LRU, invalidation, optimism', howCovered: 'A hand-written LRU, tag invalidation, and an optimistic write whose rollback is tested.', conceptIds: ['rd-cache-client'] },
    { category: 'Storage', topic: 'Client state', subtopic: 'Choosing a store', howCovered: 'Three stores chosen by lifetime and size, with guarded access.', conceptIds: ['rd-store-comparison'] },
    { category: 'Observability', topic: 'Telemetry', subtopic: 'RUM delivery', howCovered: 'Vitals collected and flushed by sendBeacon on visibilitychange.', conceptIds: ['rd-obs-telemetry'] },
    { category: 'Observability', topic: 'Operations', subtopic: 'SLO and alerting', howCovered: 'One symptom-based alert with an error budget and a runbook.', conceptIds: ['rd-obs-alerting'] },
    { category: 'React', topic: 'Effects', subtopic: 'Cleanup that actually cancels', howCovered: 'The loop and the in-flight request are both torn down on unmount, proven by unmounting mid-flight.', conceptIds: ['react-effects', 'js-promises'] },
    { category: 'React', topic: 'State', subtopic: 'Server state is a cache', howCovered: 'Orders are held with staleness rules rather than as component state, and the four render states are distinct.', conceptIds: ['react-state', 'state-alternatives', 'rd-react-data-fetching'] },
    { category: 'Performance', topic: 'Measurement', subtopic: 'Field data and transfer', howCovered: 'Vitals come from the real session, and cache headers decide how much is served without a round trip.', conceptIds: ['rd-perf-web-vitals', 'rd-perf-network-cdn'] },
  ],
  implicitFoundations: [
    { domain: 'Internet & Protocols', title: 'Connection budgets', mechanism: 'Held connections occupy a per-origin slot; HTTP/2 multiplexing changes the arithmetic entirely.', realWorldImpact: 'A long-poll design that works on HTTP/2 can exhaust connections on HTTP/1.1.', conceptIds: ['web-http'] },
    { domain: 'DOM & Browser Pipeline', title: 'Timers versus completion', mechanism: 'Task scheduling is independent of network completion, so interval-driven fetches interleave.', realWorldImpact: 'Out-of-order responses paint stale state over fresh state.', conceptIds: ['js-event-loop'] },
    { domain: 'Internet & Protocols', title: 'Connection lifecycle', mechanism: 'Proxies and load balancers close idle connections on their own schedule, independent of your timeout.', realWorldImpact: 'A long poll whose timeout exceeds the proxy idle timeout stalls silently in production and never in dev.', conceptIds: ['rd-fe-internet-browser'] },
    { domain: 'Security & Invariants', title: 'Storage is not confidential', mechanism: 'Anything in the browser is readable by the origin and by the user.', realWorldImpact: 'Order data cached client-side constrains what the console may hold.', conceptIds: ['web-storage'] },
  ],
  frameworkVsManual: {
    frameworkHandled: ['EventSource reconnection and Last-Event-ID replay', 'HTTP cache revalidation', 'IndexedDB transactions via a thin wrapper'],
    manualEngineeringRequired: [
      'The poll loop, its jitter, its backoff and its visibility gating',
      'The LRU and its eviction policy',
      'Optimistic rollback and cache reconvergence',
      'The decision record — the actual deliverable',
    ],
  },
};
