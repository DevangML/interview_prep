import { e, type ProjectCoverage } from './types';

/**
 * Beginner, static, two hours. Scope was widened during the coverage audit:
 * the card now carries a link, a custom-property palette and a lazily loaded
 * avatar, so focus states, tokens and the network are genuinely present rather
 * than exempted.
 */
export const profileCardCoverage: ProjectCoverage = {
  projectId: 'basic-profile-card',
  edges: [
    e('html-semantics', 'explicit', 'Stage 2', 'The div soup is rewritten as article + h2 + p + img, then the document outline is read back'),
    e('css-box-display', 'explicit', 'Stage 1 → 2', 'The same card measures 342px under content-box and 300px under border-box; the 42px is the lesson'),
    e('css-cascade', 'explicit', 'Stage 2', 'Three rules deliberately target .role; you compute 0,1,0 vs 0,0,1 before opening devtools'),
    e('css-selectors', 'explicit', 'Stage 2', 'The competing rules use a class, a descendant and an element selector so specificity differs by construction'),
    e('css-units', 'explicit', 'Stage 2', 'Width becomes min(100%, 22rem) and spacing moves to rem, then the card is retested at 200% zoom'),
    e('css-tokens-modern', 'implicit', 'Style layer', 'Colours move to custom properties on :root so the palette has one definition and can be recoloured in one place'),
    e('css-positioning', 'explicit', 'Stage 2', 'The verified badge is absolutely positioned, which forces the card to become the containing block'),
    e('css-ratio-logical', 'explicit', 'Stage 2', 'The avatar reserves its box with aspect-ratio, and sizing uses inline-size rather than width'),
    e('css-flex-axes', 'explicit', 'Stage 2', 'The name-and-role header is a flex row, which is the smallest possible use of a main axis'),
    e('css-flex-align', 'explicit', 'Stage 2', 'align-items centres the avatar against a two-line name block of unknown height'),
    e('css-states', 'explicit', 'Stage 2', 'The card links to a profile, so :hover and :focus-visible must both be styled and outline: none is forbidden'),
    e('a11y-core', 'explicit', 'Stage 2', 'Alt text and heading level decide the accessible name and the outline a screen reader announces'),
    e('web-how-page-loads', 'explicit', 'Stage 1 → 2', 'Selector matching, cascade resolution and box computation are the pipeline stages this card passes through'),
    e('web-http', 'explicit', 'Stage 2', 'The avatar is a real request: loading="lazy" and a 404 fallback make the network visible in a static page'),
    e('css-media-container', 'counterexample', 'Stage 2', 'Deliberately solved with min() instead of a media query, to show intrinsic sizing before breakpoints are taught'),
    e('css-flex-sizing', 'counterexample', 'Stage 2', 'flex-basis is explicitly not used here; the header row is auto-sized, and the contrast is set up for the pricing grid'),

    // ── Extended roadmap tracks ──
    e('rd-fe-modern-css', 'explicit', 'Stage 2', 'Custom properties, logical sizing and min() carry the whole card with no framework underneath'),
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
      reason: 'A two-hour static card has no JavaScript at all, by design — introducing behaviour here would remove the one thing that makes the box model observable in isolation.',
      conceptIds: [
        'js-event-loop', 'js-promises', 'js-arrays-objects', 'js-modules', 'js-dom-events',
        'js-polyfills', 'js-types-coercion', 'js-scope-closures', 'js-this', 'js-prototypes',
        'js-equality-matrix', 'js-defaulting-operators', 'react-references-copying',
      ],
    },
    {
      reason: 'This is the first project in the 0-3 YOE path and deliberately precedes React; every React concept is taught from basic-react-first onward.',
      conceptIds: [
        'react-rendering-model', 'react-state', 'react-effects', 'react-hooks-rest',
        'react-class-lifecycle', 'react-immutability', 'react-composition', 'react-perf',
        'react-errors-portals', 'r19-actions', 'r19-use-rsc',
      ],
    },
    {
      reason: 'Grid is introduced one project later on the pricing page, where three cards give it something to place; a single card has no second axis to demonstrate.',
      conceptIds: ['css-grid-tracks', 'css-grid-placement', 'css-grid-align'],
    },
    {
      reason: 'Application-scale concerns are not required for a 0-3 YOE learner rendering one static card, and introducing them here would obscure the box model.',
      conceptIds: [
        'redux-core', 'redux-react-toolkit', 'state-alternatives', 'router-core',
        'frontend-system-design', 'testing-react', 'ts-essentials',
        'tooling-bundlers', 'tooling-flux', 'html-forms',
        'web-cors', 'web-storage', 'web-security',
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
