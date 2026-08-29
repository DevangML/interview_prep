import { e, type ProjectCoverage } from './types';

/**
 * Junior, first React app. The audit widened it: the clock now reads a
 * server time, the list is fetched, and one panel is rendered by a class so
 * the render model can be compared across both component kinds.
 */
export const reactCounterCoverage: ProjectCoverage = {
  projectId: 'basic-react-first',
  edges: [
    e('react-rendering-model', 'explicit', 'Render badges', 'A render counter on every component makes the render and commit phases observable during ordinary interaction'),
    e('react-state', 'explicit', 'Stages 1-2', 'Two setCount calls incrementing by one is reproduced, then fixed with the updater form, with both results logged'),
    e('react-effects', 'explicit', 'Stages 1-2', 'The interval is written without cleanup, observed leaking under StrictMode, then corrected'),
    e('react-hooks-rest', 'implicit', 'Clock', 'useRef holds the interval id without causing a render, which is the clearest demonstration of why refs exist'),
    e('react-class-lifecycle', 'implicit', 'Comparison panel', 'One panel is a class so didMount, didUpdate and willUnmount can be mapped onto the same effect side by side'),
    e('react-immutability', 'implicit', 'List', 'Adding an item by push leaves the render frozen; the copy fixes it, which is reference identity made visible'),
    e('js-scope-closures', 'explicit', 'Stage 1', 'The stale interval closure is the loop-variable bug from the vanilla todo, met again inside a component'),
    e('js-event-loop', 'implicit', 'Clock', 'setInterval enqueues a macrotask, and React flushes the resulting update — the two queues are traced together'),
    e('react-references-copying', 'implicit', 'List', 'Spread copies one level, so a nested item edited in place still fails to re-render'),
    e('js-arrays-objects', 'implicit', 'List', 'map, filter and spread are used in place of push and splice, and the mutating set is named explicitly'),
    e('js-promises', 'implicit', 'Server time', 'The clock seeds from a fetched timestamp, so first paint must handle the value not yet existing'),
    e('web-http', 'implicit', 'Server time', 'Response.ok is checked, since a failed time request must not silently render NaN'),
    e('js-modules', 'implicit', 'Structure', 'Each component is its own module; the default-vs-named export choice is made deliberately'),
    e('js-this', 'implicit', 'Comparison panel', 'The class panel needs a bound handler, which is why every legacy React constructor contains bind calls'),
    e('js-defaulting-operators', 'implicit', 'Props', 'Optional props default with ?? so a legitimate 0 count is not replaced by a fallback'),
    e('js-types-coercion', 'implicit', 'Render badges', 'Rendering 0 versus false versus "" in JSX shows which falsy values React prints and which vanish'),
    e('js-equality-matrix', 'implicit', 'Bailout', 'React compares state with Object.is, so the NaN and -0 cases decide whether a re-render happens at all'),
    e('react-composition', 'implicit', 'Structure', 'The render badge wraps arbitrary children, which is the smallest useful composition pattern'),
    e('react-perf', 'implicit', 'Render badges', 'The badges show exactly which components re-render, which is the measurement memo would later be judged against'),
    e('html-semantics', 'implicit', 'Markup', 'Buttons are buttons and the list is a list, so keyboard operation works without any added handlers'),
    e('a11y-core', 'implicit', 'Clock', 'A ticking value announced on every second is hostile, so the live region politeness has to be chosen'),
    e('css-box-display', 'implicit', 'Markup', 'Component boundaries and CSS boxes are not the same thing, which is worth seeing early'),
    e('css-flex-axes', 'implicit', 'Markup', 'The counter row is a flex line holding the value between two buttons'),
    e('css-states', 'implicit', 'Markup', 'The disabled button needs a state that reads as disabled without relying on opacity alone'),
    e('ts-essentials', 'implicit', 'Props', 'Props are typed, and the updater form forces the state type to be stated rather than inferred as any'),
    e('js-dom-events', 'implicit', 'Markup', 'React events are synthetic and delegated at the root, which contrasts directly with the vanilla todo'),

    // ── Extended roadmap tracks ──
    e('rd-react-components', 'explicit', 'Stage 1', 'The first component boundary, props and children — the entry point of the React roadmap'),
    e('rd-react-hooks', 'explicit', 'Stage 2', 'useState and the rules of hooks, met for the first time against a real re-render'),
  ],
  exemptions: [
    {
      reason:
        'The extended roadmap tracks were added to the curriculum after this build was designed. These are the ones it does not genuinely exercise, and claiming them because the topic exists is the inflation this manifest is meant to prevent.',
      conceptIds: [
        'rd-react-state-mgmt',
        'rd-react-data-fetching',
        'rd-react-routing-forms',
        'rd-react-testing',
        'rd-react-rsc-compiler',
        'rd-perf-high-priority',
        'rd-perf-rendering-media',
        'rd-perf-web-vitals',
        'rd-perf-network-cdn',
        'rd-fe-internet-browser',
        'rd-fe-html-web-components',
        'rd-fe-modern-css',
        'rd-fe-js-v8-packages',
      ],
    },
    {
      reason: 'This is the first React project in the 0-3 YOE path; introducing routing, stores or a build pipeline before state and effects are solid is the standard way learners get lost.',
      conceptIds: [
        'router-core', 'redux-core', 'redux-react-toolkit', 'state-alternatives',
        'frontend-system-design', 'testing-react', 'tooling-bundlers', 'tooling-flux',
        'react-errors-portals', 'r19-actions', 'r19-use-rsc', 'js-polyfills', 'js-prototypes',
      ],
    },
    {
      reason: 'Layout depth belongs to the three CSS projects that precede this one; keeping the styling plain here means every observation is about rendering.',
      conceptIds: [
        'css-flex-sizing', 'css-flex-align', 'css-grid-tracks', 'css-grid-placement',
        'css-grid-align', 'css-cascade', 'css-selectors', 'css-positioning', 'css-units',
        'css-ratio-logical', 'css-media-container', 'css-tokens-modern',
      ],
    },
    {
      reason: 'No forms, storage, cross-origin or security surface exists in a counter and a clock, and manufacturing one would be busywork at this level.',
      conceptIds: ['html-forms', 'web-storage', 'web-cors', 'web-security', 'web-how-page-loads'],
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
