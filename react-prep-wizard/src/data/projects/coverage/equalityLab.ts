import { e, type ProjectCoverage } from './types';

/**
 * Beginner, language semantics. The audit widened it from a static table into
 * a small React app with a persisted prediction history, so the matrix has a
 * renderer, a store and a typed value catalogue behind it.
 */
export const equalityLabCoverage: ProjectCoverage = {
  projectId: 'basic-equality-lab',
  edges: [
    e('js-types-coercion', 'explicit', 'Stages 1-2', 'Every cell of the matrix is a coercion result predicted before it is executed, including null >= 0 versus null == 0'),
    e('js-equality-matrix', 'explicit', 'Stages 1-2', 'All four sameness algorithms run side by side on values chosen specifically to make them disagree'),
    e('js-defaulting-operators', 'explicit', 'Panel 2', 'The same values pass through ??, ||, ?., ??= and default parameters to expose where || silently rewrites 0 and ""'),
    e('js-arrays-objects', 'implicit', 'Value catalogue', 'includes and indexOf are compared on NaN, which is where SameValueZero and strict equality visibly diverge'),
    e('react-references-copying', 'implicit', 'deepEqual', 'The hand-written deepEqual must handle cycles, Dates, Maps and Sets, none of which reference comparison catches'),
    e('js-scope-closures', 'implicit', 'Value catalogue', 'Values are stored as thunks so -0 and NaN survive; each thunk is a closure over one literal'),
    e('js-this', 'implicit', 'Operator table', 'Operators are held as methods on a table object, so invoking them detached demonstrates receiver loss'),
    e('js-prototypes', 'implicit', 'deepEqual', 'Distinguishing a plain object from a Date or a class instance requires reading the prototype, not typeof'),
    e('js-modules', 'implicit', 'Structure', 'The value catalogue, the operators and the renderer are separate modules with named exports'),
    e('ts-essentials', 'implicit', 'Value catalogue', 'The catalogue is a discriminated union so an operator cannot be applied to a value shape it does not accept'),
    e('react-rendering-model', 'implicit', 'Matrix view', 'A hundred-cell grid re-rendering on each prediction makes render frequency observable at a small scale'),
    e('react-state', 'implicit', 'Predictions', 'Predictions accumulate through the updater form, since several cells can be answered before a re-render lands'),
    e('react-immutability', 'implicit', 'Predictions', 'The prediction record is updated by copying, which is the same identity rule the matrix itself is teaching'),
    e('react-effects', 'implicit', 'Persistence', 'Saving the score to storage is a synchronisation with an external system, which is what an effect is for'),
    e('web-storage', 'implicit', 'Persistence', 'The prediction history persists to localStorage, including the JSON round-trip that destroys undefined and NaN'),
    e('js-event-loop', 'implicit', 'Reveal', 'The reveal is deferred by a microtask so the prediction commits before the answer paints'),
    e('css-grid-tracks', 'implicit', 'Matrix view', 'The matrix is a real grid whose column count follows the operator count rather than being hardcoded'),
    e('css-grid-placement', 'implicit', 'Matrix view', 'Row and column headers are placed on explicit lines so the axes stay readable while the body scrolls'),
    e('css-grid-align', 'implicit', 'Matrix view', 'Cell contents are centred on both axes so true and false read as a scannable pattern'),
    e('css-states', 'implicit', 'Matrix view', 'A cell you predicted wrong needs a state that is not carried by colour alone'),
    e('html-semantics', 'implicit', 'Matrix view', 'The matrix is a table with scoped headers, because that is what makes it navigable by screen reader'),
    e('a11y-core', 'implicit', 'Matrix view', 'Result changes are announced through a live region rather than only appearing visually'),
    e('html-forms', 'implicit', 'Predictions', 'Each prediction is a radio group inside a fieldset with a legend naming the comparison'),

    // ── Extended roadmap tracks ──
    e('rd-fe-js-v8-packages', 'explicit', 'Stage 1', 'Sameness, coercion and reference identity are exactly the V8-level language semantics the roadmap lists'),
  ],
  exemptions: [
    {
      reason:
        'The extended roadmap tracks were added to the curriculum after this build was designed. These are the ones it does not genuinely exercise, and claiming them because the topic exists is the inflation this manifest is meant to prevent.',
      conceptIds: [
        'rd-react-components',
        'rd-react-hooks',
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
      ],
    },
    {
      reason: 'Layout is intentionally minimal so that nothing competes with the semantics being studied; the CSS-heavy 0-3 YOE material lives in the three layout projects.',
      conceptIds: [
        'css-flex-axes', 'css-flex-sizing', 'css-flex-align', 'css-box-display',
        'css-cascade', 'css-selectors', 'css-positioning', 'css-units',
        'css-ratio-logical', 'css-media-container', 'css-tokens-modern',
      ],
    },
    {
      reason: 'No network, no routing and no application architecture are required to compare ten values, and adding them would bury the only thing this project measures.',
      conceptIds: [
        'web-http', 'web-cors', 'web-security', 'web-how-page-loads', 'js-promises',
        'router-core', 'frontend-system-design', 'redux-core', 'redux-react-toolkit',
        'state-alternatives', 'tooling-bundlers', 'tooling-flux', 'testing-react',
        'react-composition', 'react-perf', 'react-errors-portals', 'react-hooks-rest',
        'react-class-lifecycle', 'r19-actions', 'r19-use-rsc', 'js-dom-events', 'js-polyfills',
      ],
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
