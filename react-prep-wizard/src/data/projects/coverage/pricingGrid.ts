import { e, type ProjectCoverage } from './types';

/**
 * Beginner, layout-only. Widened during the audit: the grid now carries a
 * feature-comparison table and a token-driven theme, so grid placement,
 * alignment and container queries all appear rather than being deferred.
 */
export const pricingGridCoverage: ProjectCoverage = {
  projectId: 'basic-pricing-grid',
  edges: [
    e('css-flex-axes', 'explicit', 'Stage 2 — card', 'The card is a flex column; direction and wrap are flipped to observe which axis each property acts on'),
    e('css-flex-sizing', 'explicit', 'Stage 2 — card', 'flex: 1 1 auto on the feature list makes it, not the button, absorb unequal content lengths'),
    e('css-flex-align', 'explicit', 'Stage 2 — card', 'margin-block-start: auto pins the CTA to the bottom — the auto-margin trick asked for by name'),
    e('css-grid-tracks', 'explicit', 'Stage 2 — page', 'repeat(auto-fit, minmax(16rem, 1fr)) is built, then swapped to auto-fill to see the empty-track difference'),
    e('css-grid-placement', 'implicit', 'Comparison table', 'The feature matrix uses grid-template-areas and explicit spans so a "Most popular" card can straddle two columns'),
    e('css-grid-align', 'implicit', 'Comparison table', 'justify-items, align-content and place-self are each varied to align the tick marks on both axes'),
    e('css-media-container', 'explicit', 'Stage 2', 'The card body switches layout with a container query, so the same card adapts inside a wide page or a narrow sidebar'),
    e('css-box-display', 'explicit', 'Stage 1 → 2', 'Margins are replaced by gap, which removes the collapse and overflow that percentage widths caused'),
    e('css-units', 'explicit', 'Stage 2', 'minmax uses rem so the breakpoint tracks the user font size rather than a device width'),
    e('css-cascade', 'implicit', 'Theming', 'The featured-plan modifier must beat the base card rules, which is a specificity decision made deliberately'),
    e('css-selectors', 'implicit', 'Theming', ':has(.badge) selects the featured card from its content rather than needing an extra class from the markup'),
    e('css-tokens-modern', 'implicit', 'Theming', 'Spacing and colour are custom properties, so the featured card overrides tokens rather than rewriting rules'),
    e('css-positioning', 'explicit', 'Stage 2', 'The "Most popular" ribbon is absolutely positioned against the card, which must therefore be a containing block'),
    e('css-ratio-logical', 'explicit', 'Stage 2', 'Logical properties throughout, so the whole grid mirrors correctly under direction: rtl without new rules'),
    e('css-states', 'explicit', 'Stage 2', 'Each CTA is a real link with hover, focus-visible and active states that survive keyboard-only use'),
    e('html-semantics', 'implicit', 'Markup', 'The plans are a list of articles and the comparison is a real table with headers, not a wall of divs'),
    e('a11y-core', 'implicit', 'Comparison table', 'A tick glyph needs a text alternative, and reordering with `order` must not desynchronise the tab order'),
    e('web-how-page-loads', 'explicit', 'Stage 1 → 2', 'Intrinsic sizing is resolved during layout, which is why minmax stops the squash that a percentage width could not'),

    // ── Extended roadmap tracks ──
    e('rd-fe-modern-css', 'explicit', 'Stage 2', 'Grid tracks and intrinsic sizing are the modern-CSS layer the roadmap means, used instead of a grid framework'),
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
        'rd-fe-js-v8-packages',
      ],
    },
    {
      reason: 'Deliberately zero JavaScript: the entire point is that this layout responds to content and viewport without a single script, which a 0-3 YOE learner rarely sees demonstrated.',
      conceptIds: [
        'js-event-loop', 'js-promises', 'js-arrays-objects', 'js-modules', 'js-dom-events',
        'js-polyfills', 'js-types-coercion', 'js-scope-closures', 'js-this', 'js-prototypes',
        'js-equality-matrix', 'js-defaulting-operators', 'react-references-copying',
      ],
    },
    {
      reason: 'Second project in the 0-3 YOE path and still pre-React; React concepts begin at basic-react-first once the DOM itself is understood.',
      conceptIds: [
        'react-rendering-model', 'react-state', 'react-effects', 'react-hooks-rest',
        'react-class-lifecycle', 'react-immutability', 'react-composition', 'react-perf',
        'react-errors-portals', 'r19-actions', 'r19-use-rsc',
      ],
    },
    {
      reason: 'Application architecture, transport and tooling are not required to lay out three cards, and would triple the scope of a three-hour beginner build.',
      conceptIds: [
        'redux-core', 'redux-react-toolkit', 'state-alternatives', 'router-core',
        'frontend-system-design', 'testing-react', 'ts-essentials', 'tooling-bundlers',
        'tooling-flux', 'html-forms', 'web-http', 'web-cors', 'web-storage', 'web-security',
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
