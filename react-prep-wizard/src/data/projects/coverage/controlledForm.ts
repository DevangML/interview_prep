import { e, type ProjectCoverage } from './types';

/**
 * Junior, forms. Widened by the audit: the form now submits to a real
 * endpoint, restores a draft from storage, and renders its own error boundary,
 * so transport, persistence and failure are part of the build.
 */
export const controlledFormCoverage: ProjectCoverage = {
  projectId: 'basic-controlled-form',
  edges: [
    e('html-forms', 'explicit', 'Stages 1-2', 'Native constraint validation is used first, and custom rules are added only where the browser cannot express them'),
    e('react-immutability', 'explicit', 'Stage 1 → 2', 'The mutation that freezes the form with no error is reproduced, then fixed by copying every level on the path'),
    e('react-references-copying', 'explicit', 'Stage 2', 'Spread is shown to be shallow, then contrasted with structuredClone and a hand-written deep copy'),
    e('react-state', 'explicit', 'Stage 2', 'Nested updates use the updater form, since several fields can change before a single re-render commits'),
    e('js-arrays-objects', 'explicit', 'Stage 2', 'The checkbox group is maintained with filter and spread, and push, splice and sort are named as the mutating set'),
    e('react-effects', 'implicit', 'Draft restore', 'Restoring and saving the draft is synchronisation with an external store, debounced and cleaned up'),
    e('web-storage', 'implicit', 'Draft restore', 'The draft persists to localStorage, and the JSON round-trip losing undefined and Dates is met head on'),
    e('js-promises', 'implicit', 'Submit', 'Submission is async with a pending state, and a double submit must be impossible while the first is in flight'),
    e('web-http', 'implicit', 'Submit', 'POST is not idempotent, so retry policy and a 422 validation response are both handled deliberately'),
    e('web-security', 'implicit', 'Submit', 'User input is rendered back on the confirmation screen, which is where XSS is demonstrated and then prevented'),
    e('a11y-core', 'implicit', 'Errors', 'Errors are associated with aria-describedby and announced, and focus moves to the first invalid control on submit'),
    e('ts-essentials', 'implicit', 'Schema', 'The form shape is one type, and the errors map is derived from it so a renamed field breaks the compile'),
    e('js-defaulting-operators', 'implicit', 'Draft restore', 'A restored field must default with ?? or a legitimately empty string is replaced by a placeholder'),
    e('js-types-coercion', 'implicit', 'Number field', 'Every input value is a string, so the age field needs an explicit conversion with a stated NaN policy'),
    e('js-equality-matrix', 'implicit', 'Dirty check', 'Deciding whether the form is dirty is a sameness question, and === on objects always answers false'),
    e('react-errors-portals', 'implicit', 'Submit', 'A boundary wraps the form so a render failure shows a recoverable message instead of a blank page'),
    e('react-composition', 'implicit', 'Fields', 'Field, Label and Error compose as a compound component sharing the field id implicitly'),
    e('react-hooks-rest', 'implicit', 'Errors', 'useRef holds the node to focus after a failed submit, and useReducer replaces four correlated flags'),
    e('js-scope-closures', 'implicit', 'Draft restore', 'The debounced saver closes over the latest form snapshot, which is where a stale draft comes from'),
    e('js-event-loop', 'implicit', 'Submit', 'The pending flag must be set before the await, or a fast double click starts two requests'),
    e('js-this', 'implicit', 'Validation rules', 'Rules are methods on a validator object, so passing one as a callback loses its receiver unless it is bound'),
    e('js-dom-events', 'implicit', 'Submit', 'Submit bubbles from the form, and preventDefault is what stops the native navigation'),
    e('html-semantics', 'implicit', 'Markup', 'fieldset and legend group the related controls, which is what makes the radio group announce as a group'),
    e('react-rendering-model', 'implicit', 'Fields', 'A controlled input re-renders on every keystroke, which is where render frequency starts to matter'),
    e('css-states', 'implicit', 'Fields', 'Invalid, focused and disabled each need a visible state that is not carried by colour alone'),
    e('css-selectors', 'implicit', 'Fields', ':focus-within highlights the whole field group, and :user-invalid avoids shouting before the user has finished'),
    e('css-flex-axes', 'implicit', 'Markup', 'Each field is a column of label, control and error, which is a one-axis layout'),
    e('css-grid-tracks', 'implicit', 'Markup', 'The address block is a small grid so the postcode and city do not need one-off widths'),
    e('js-modules', 'implicit', 'Structure', 'Validation rules live in their own module so they can be reused by the tests in a later project'),
    e('js-polyfills', 'implicit', 'Draft restore', 'The debounce is written by hand, including the cancel that stops a save after unmount'),

    // ── Extended roadmap tracks ──
    e('rd-react-components', 'explicit', 'Stage 1', 'Controlled inputs are a component-boundary decision about who owns the value'),
    e('rd-react-hooks', 'explicit', 'Stage 2', 'State and effect hooks drive every keystroke and validation pass'),
    e('rd-react-routing-forms', 'explicit', 'Stage 2', 'The forms half of the roadmap topic: native validation, submission and error surfaces'),
  ],
  exemptions: [
    {
      reason:
        'The extended roadmap tracks were added to the curriculum after this build was designed. These are the ones it does not genuinely exercise, and claiming them because the topic exists is the inflation this manifest is meant to prevent.',
      conceptIds: [
        'rd-react-state-mgmt',
        'rd-react-data-fetching',
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
      reason: 'A single form does not need routing, a store, or a bundler story; these arrive at basic-routed-app and inter-flux-to-rtk once there is more than one screen.',
      conceptIds: [
        'router-core', 'redux-core', 'redux-react-toolkit', 'state-alternatives',
        'frontend-system-design', 'testing-react', 'tooling-bundlers', 'tooling-flux',
        'react-perf', 'react-class-lifecycle', 'r19-actions', 'r19-use-rsc',
        'js-prototypes', 'web-cors', 'web-how-page-loads',
      ],
    },
    {
      reason: 'Advanced layout is out of scope for a 0-3 YOE forms project, where every minute spent on grid alignment is a minute not spent on why the form froze.',
      conceptIds: [
        'css-flex-sizing', 'css-flex-align', 'css-grid-placement', 'css-grid-align',
        'css-box-display', 'css-cascade', 'css-positioning', 'css-units',
        'css-ratio-logical', 'css-media-container', 'css-tokens-modern',
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
