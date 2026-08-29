import { e, type ProjectCoverage } from './types';

/** The security cluster, carried by a project that actually has an attacker. */
export const embedGuardCoverage: ProjectCoverage = {
  projectId: 'product-embed-guard',
  edges: [
    e('rd-sec-overview', 'explicit', 'Threat model', 'Risks are ranked by what an attacker gains inside the origin, which is why XSS sits above everything'),
    e('rd-sec-xss', 'explicit', 'Stage 1', 'Four sinks are exploited with committed payloads before any of them is closed'),
    e('rd-sec-sanitization', 'explicit', 'Stage 2', 'A blocklist is written and defeated, then replaced with an allowlist applied per sink'),
    e('rd-sec-headers', 'explicit', 'Stage 3', 'Nonce CSP with strict-dynamic, rolled out Report-Only, each header annotated with the attack it stops'),
    e('rd-sec-iframe', 'explicit', 'Stage 4', 'A working clickjack lands a real click before frame-ancestors and sandbox close it'),
    e('rd-sec-permissions-policy', 'explicit', 'Stage 4', 'The embed is denied camera, microphone, geolocation and payment, and the Feature-Policy rename is stated'),
    e('rd-sec-authentication', 'explicit', 'Stage 5', 'The token is stolen from localStorage using the project\'s own stage-1 payload, then moved to memory plus a rotated cookie'),
    e('rd-sec-authorization', 'explicit', 'Stage 5', 'A BOLA is exploited by editing an id in the URL, then closed by authorizing the object rather than the route'),
    e('rd-sec-csrf', 'explicit', 'Stage 5', 'A cross-site form POST succeeds against the widget before SameSite and a token stop it'),
    e('rd-sec-cors', 'explicit', 'Stage 5', 'Credentialed CORS is configured with an explicit origin, and the wildcard rejection is demonstrated rather than described'),
    e('rd-sec-https', 'explicit', 'Stage 3', 'HSTS is set, mixed content is triggered and observed being blocked, and the padlock fallacy is written down'),
    e('rd-sec-ssrf-ssji', 'explicit', 'Stage 6', 'The preview service reaches the cloud metadata endpoint before the post-resolution guard exists'),
    e('rd-sec-sri-deps', 'explicit', 'Supply chain report', 'SRI is pinned on external assets and audit findings are triaged by reachability rather than count'),
    e('rd-sec-client-storage', 'explicit', 'Compliance note', 'What may be stored is decided by disclosure harm and consent, and the deletion path is stated'),
    e('web-security', 'implicit', 'Threat model', 'The origin is the abstraction every stage in this project is arguing about'),
    e('web-cors', 'explicit', 'Stage 5', 'Preflight, credentials and the wildcard restriction are configured deliberately, not discovered in production'),
    e('web-storage', 'explicit', 'Stage 5', 'The token-placement decision is exactly the storage-confidentiality question with a real consequence'),
    e('web-http', 'explicit', 'Stage 3', 'Response headers are the delivery mechanism for most of the controls in this project'),
    e('html-forms', 'explicit', 'Stage 5', 'The comment form is the CSRF target, so its method and credentials behaviour are the attack surface'),
    e('js-dom-events', 'explicit', 'Stage 4', 'The postMessage protocol is an event contract whose origin check has to come before the payload is read'),
    e('react-composition', 'implicit', 'Embed harness', 'The widget is composed to run identically standalone and inside a sandboxed frame'),
    e('tooling-bundlers', 'explicit', 'Stage 3', 'A per-response nonce has to reach every inline script the bundler emits, which is what usually blocks CSP adoption'),
    e('testing-react', 'implicit', 'Exploit suite', 'Each control has a test that fails before the fix and passes after, so the defence has a witness'),
    e('frontend-system-design', 'implicit', 'Threat model', 'The deliverable is an argued security architecture with stated boundaries'),
    e('rd-fe-internet-browser', 'explicit', 'Stage 3', 'TLS, headers and the request lifecycle are where these controls are actually enforced'),

    e('js-types-coercion', 'implicit', 'Sanitizer', 'URL parsing rejects unparseable input rather than coercing it into something that looks like a link'),
    e('js-modules', 'implicit', 'Embed harness', 'The host script and the framed app are separate modules with one narrow contract between them'),
    e('ts-essentials', 'implicit', 'Embed harness', 'The postMessage payload is a discriminated union, so an unhandled message shape cannot be silently trusted'),
    e('react-state', 'implicit', 'Auth flow', 'The access token lives in memory state precisely because it must not be persisted'),
    e('react-effects', 'implicit', 'Embed harness', 'Listener registration and teardown decide whether a removed widget still answers messages'),
    e('js-promises', 'implicit', 'Preview service', 'The fetch is bounded by a timeout and a response size cap, both of which are rejection paths'),
    e('html-semantics', 'implicit', 'Sanitizer', 'The allowlist is chosen from what the content genuinely needs, which is a semantics question'),
    e('a11y-core', 'implicit', 'Embed harness', 'A sandboxed frame must not trap focus or hide the widget from assistive technology'),
    e('react-errors-portals', 'implicit', 'Embed harness', 'A boundary keeps a malformed comment from taking down the host page'),
    e('js-arrays-objects', 'implicit', 'Sanitizer', 'Allowlists are set membership tests, and the failure mode is treating them as substring checks'),
  ],
  exemptions: [
    {
      reason:
        'Transport selection, caching and telemetry are a separate discipline with their own flagship. This widget fetches on demand; it has no live sync layer to reason about.',
      conceptIds: [
        'rd-comm-protocols', 'rd-comm-rest', 'rd-comm-graphql', 'rd-comm-grpc', 'rd-comm-polling',
        'rd-comm-websocket-sse', 'rd-comm-webhooks-webrtc', 'rd-cache-http', 'rd-cache-client',
        'rd-store-comparison', 'rd-obs-telemetry', 'rd-obs-alerting',
      ],
    },
    {
      reason:
        'Layout is not the subject. The widget is a list and a form; adding grid and flex stages would compete with the exploit-then-defend rhythm the project depends on.',
      conceptIds: [
        'css-cascade', 'css-selectors', 'css-box-display', 'css-flex-axes', 'css-flex-sizing',
        'css-flex-align', 'css-grid-tracks', 'css-grid-placement', 'css-grid-align',
        'css-positioning', 'css-units', 'css-ratio-logical', 'css-media-container', 'css-states',
        'css-tokens-modern', 'rd-fe-modern-css',
      ],
    },
    {
      reason:
        'Core language and React mechanics are prerequisites rather than subjects; the foundation projects teach them and this one assumes them.',
      conceptIds: [
        'js-scope-closures', 'js-this', 'js-prototypes', 'js-equality-matrix',
        'js-defaulting-operators', 'js-event-loop', 'js-polyfills', 'react-rendering-model',
        'react-hooks-rest', 'react-class-lifecycle', 'react-immutability',
        'react-references-copying', 'react-perf', 'r19-actions', 'r19-use-rsc',
      ],
    },
    {
      reason:
        'Routing, state libraries, performance tuning and the React roadmap tracks belong to other projects; a single embeddable widget has one screen and no store.',
      conceptIds: [
        'router-core', 'redux-core', 'redux-react-toolkit', 'state-alternatives', 'tooling-flux',
        'rd-react-components', 'rd-react-hooks', 'rd-react-state-mgmt', 'rd-react-data-fetching',
        'rd-react-routing-forms', 'rd-react-testing', 'rd-react-rsc-compiler',
        'rd-perf-high-priority', 'rd-perf-rendering-media', 'rd-perf-web-vitals',
        'rd-perf-network-cdn', 'web-how-page-loads', 'rd-fe-html-web-components',
        'rd-fe-js-v8-packages',
      ],
    },
  ],
};
