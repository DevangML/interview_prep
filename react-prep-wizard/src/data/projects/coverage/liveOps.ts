import { e, type ProjectCoverage } from './types';

/** The transport topics that every other manifest exempts are carried here, stage-anchored. */
export const liveOpsCoverage: ProjectCoverage = {
  projectId: 'service-live-ops',
  edges: [
    e('rd-comm-polling', 'explicit', 'Stage 1', 'The naive interval ships first so the overlap and out-of-order bug is felt before it is explained'),
    e('rd-comm-websocket-sse', 'explicit', 'Stage 3', 'SSE is built with Last-Event-ID resume; WebSocket is rejected in writing with its operational cost named'),
    e('rd-comm-protocols', 'explicit', 'Stage 3', 'The connection budget for concurrent long polls is computed against HTTP/1.1 limits and HTTP/2 multiplexing'),
    e('rd-comm-rest', 'explicit', 'Stage 4', 'Status changes are idempotent PATCHes with an idempotency key, so a retried transition cannot double-apply'),
    e('rd-comm-graphql', 'explicit', 'Transport decision record', 'Scored against this workload and rejected: subscriptions would add a cache layer the board does not need'),
    e('rd-comm-grpc', 'explicit', 'Transport decision record', 'Rejected with the browser caveat stated — gRPC-Web needs a proxy and cannot stream client-to-server'),
    e('rd-comm-webhooks-webrtc', 'explicit', 'Stage 3', 'The fixture receives a webhook and fans it into the stream, making the server-to-server-to-browser chain visible'),
    e('rd-cache-http', 'explicit', 'Stage 4', 'stale-while-revalidate is configured and the perceived-latency difference is measured, not assumed'),
    e('rd-cache-client', 'explicit', 'Stage 4', 'A hand-written LRU, tag invalidation, and an optimistic write whose rollback is proven by a rejecting server'),
    e('rd-store-comparison', 'explicit', 'Stage 5', 'Three stores chosen by lifetime and size, and the synchronous startup cost of localStorage is measured'),
    e('rd-obs-telemetry', 'explicit', 'Stage 6', 'Vitals are flushed by sendBeacon on visibilitychange after fetch-on-unload is observed being cancelled'),
    e('rd-obs-alerting', 'explicit', 'Stage 6', 'One symptom-based alert with a stated SLO, an error budget and a runbook a responder can follow'),
    e('web-http', 'explicit', 'Stage 3', 'Held connections, proxy idle timeouts and status semantics decide whether long polling is viable here'),
    e('web-storage', 'explicit', 'Stage 5', 'Every access is guarded against private-mode throws and quota errors, and nothing is treated as a source of truth'),
    e('js-event-loop', 'explicit', 'Stage 1', 'Timer scheduling versus network completion is precisely why setInterval around fetch interleaves'),
    e('js-promises', 'explicit', 'Stage 2', 'The loop awaits completion and an AbortController tears the whole chain down on unmount'),
    e('react-effects', 'explicit', 'Stage 2', 'The effect cleanup must abort the in-flight request and stop the loop, proven by unmounting mid-flight'),
    e('react-state', 'explicit', 'Stage 4', 'Server state is held as a cache with staleness rules rather than as component state'),
    e('state-alternatives', 'explicit', 'Stage 4', 'The hand-rolled cache is written first, then the argument for when a query library earns its bytes'),
    e('rd-react-data-fetching', 'explicit', 'Stage 2', 'Loading, stale, error and empty are four distinct rendered states, not one boolean'),
    e('rd-perf-web-vitals', 'explicit', 'Stage 6', 'LCP, INP and CLS are collected from the real session rather than read off a lab score'),
    e('rd-perf-network-cdn', 'explicit', 'Stage 4', 'Cache headers and revalidation decide how much of the board is served without a round trip'),
    e('frontend-system-design', 'implicit', 'Transport decision record', 'The deliverable is a design argument with measurements and named failure modes'),
    e('rd-fe-internet-browser', 'explicit', 'Stage 3', 'Connection lifecycle and proxy behaviour are what make long polling succeed or silently stall'),

    e('js-arrays-objects', 'implicit', 'Cache layer', 'Order records are merged by id without mutating the previous snapshot the rollback depends on'),
    e('react-immutability', 'implicit', 'Cache layer', 'Optimistic rollback only works because the previous value was never mutated in place'),
    e('js-scope-closures', 'implicit', 'Poll loop', 'Each attempt closes over its own abort signal so a stale iteration cannot cancel the live one'),
    e('js-modules', 'implicit', 'Sync adapter', 'The four adapters are interchangeable modules behind one interface'),
    e('ts-essentials', 'implicit', 'Sync adapter', 'The adapter interface is a type, which is what makes the four implementations provably swappable'),
    e('react-hooks-rest', 'implicit', 'Poll loop', 'Refs hold the controller and the latest cursor outside render'),
    e('react-perf', 'implicit', 'Config panel', 'A board updating every second is where wasted renders become visible'),
    e('testing-react', 'implicit', 'Cache layer', 'A test rejects the server call and asserts the board returns to its pre-optimistic state'),
    e('react-composition', 'implicit', 'Config panel', 'Columns and empty states are data, so a new board is configuration rather than JSX'),
    e('js-types-coercion', 'implicit', 'Cache layer', 'Cache keys are normalised so two spellings of one filter do not become two entries'),
    e('web-how-page-loads', 'implicit', 'Telemetry beacon', 'What counts as loaded is what the vitals are measuring against'),
  ],
  exemptions: [
    {
      reason:
        'This project is a sync layer and a board. It renders trusted operational data from a fixture, so it has no untrusted-input surface, no session and no cross-origin boundary to defend — the security flagship owns all of that.',
      conceptIds: [
        'rd-sec-overview', 'rd-sec-xss', 'rd-sec-sanitization', 'rd-sec-csrf', 'rd-sec-cors',
        'rd-sec-headers', 'rd-sec-iframe', 'rd-sec-authentication', 'rd-sec-authorization',
        'rd-sec-https', 'rd-sec-permissions-policy', 'rd-sec-sri-deps', 'rd-sec-ssrf-ssji',
        'rd-sec-client-storage', 'web-security', 'web-cors',
      ],
    },
    {
      reason:
        'Layout is not the subject. The board is a table; spending stages on flex and grid axes here would dilute the one thing this project exists to teach.',
      conceptIds: [
        'css-cascade', 'css-selectors', 'css-box-display', 'css-flex-axes', 'css-flex-sizing',
        'css-flex-align', 'css-grid-tracks', 'css-grid-placement', 'css-grid-align',
        'css-positioning', 'css-units', 'css-ratio-logical', 'css-media-container', 'css-states',
        'css-tokens-modern', 'rd-fe-modern-css', 'html-semantics', 'html-forms', 'a11y-core',
        'rd-fe-html-web-components',
      ],
    },
    {
      reason:
        'Language mechanics and React internals are prerequisites here rather than subjects; they are taught by the foundation projects this one lists as a prerequisite.',
      conceptIds: [
        'js-this', 'js-prototypes', 'js-equality-matrix', 'js-defaulting-operators', 'js-polyfills',
        'js-dom-events', 'react-rendering-model', 'react-class-lifecycle', 'react-references-copying',
        'react-errors-portals', 'r19-actions', 'r19-use-rsc', 'rd-react-rsc-compiler',
        'rd-react-components', 'rd-react-hooks', 'rd-react-state-mgmt',
      ],
    },
    {
      reason:
        'Routing, Redux and build tooling are single-screen-irrelevant here: the console is one route, the store is the cache, and the bundler is not the lesson.',
      conceptIds: [
        'router-core', 'redux-core', 'redux-react-toolkit', 'tooling-flux', 'tooling-bundlers',
        'rd-react-routing-forms', 'rd-react-testing', 'rd-perf-high-priority',
        'rd-perf-rendering-media', 'rd-fe-js-v8-packages',
      ],
    },
  ],
};
