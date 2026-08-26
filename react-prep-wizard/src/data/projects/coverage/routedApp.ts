import { e, type ProjectCoverage } from './types';

/**
 * Junior, the assembly project. It absorbs the earlier builds into one app, so
 * it is the first basic-tier project where architecture, tooling and a store
 * appear. Only the genuinely advanced material is exempted.
 */
export const routedAppCoverage: ProjectCoverage = {
  projectId: 'basic-routed-app',
  edges: [
    e('router-core', 'explicit', 'Stages 1-2', 'A ternary pseudo-router is replaced by a nested route tree with params, search params, a guard and a 404'),
    e('react-composition', 'explicit', 'Stage 2', 'Layout routes, guard routes and a compound Tabs component are three composition shapes in one tree'),
    e('html-semantics', 'explicit', 'Shell', 'The shell provides nav, main and header landmarks, and the document title changes per route'),
    e('a11y-core', 'explicit', 'Shell', 'Route changes move focus to the heading and announce the new page, which client routing otherwise silently breaks'),
    e('state-alternatives', 'explicit', 'Stage 2', 'URL, component state and a small shared store are each given the state that belongs to them, with the split written down'),
    e('tooling-bundlers', 'explicit', 'Stage 2', 'Routes are split with dynamic import, and the server needs a catch-all rewrite or a deep link 404s'),
    e('web-how-page-loads', 'explicit', 'Stage 2', 'pushState changes the URL without a navigation, which is the whole mechanism a client router is built on'),
    e('frontend-system-design', 'explicit', 'Stage 2', 'The route tree is the first architecture decision: what is a page, what is a layout, what is a guard'),
    e('react-errors-portals', 'explicit', 'Stage 2', 'Each route has an error element, so a failure in one screen does not blank the shell'),
    e('react-effects', 'implicit', 'Shell', 'Title and focus updates on navigation are synchronisations with something outside React'),
    e('react-state', 'implicit', 'Guard', 'The auth flag and the pending redirect target are state whose transitions must not race'),
    e('react-hooks-rest', 'implicit', 'Shell', 'Context carries the auth value, and useRef holds the heading node that receives focus'),
    e('react-rendering-model', 'explicit', 'Stage 2', 'A route change remounts a subtree, so state below the changed route is discarded by design'),
    e('react-immutability', 'implicit', 'Store', 'Shared state is replaced rather than mutated, or subscribed screens do not re-render'),
    e('react-references-copying', 'implicit', 'Store', 'A context value object recreated every render re-renders every consumer, which is reference identity again'),
    e('js-promises', 'implicit', 'Lazy routes', 'A lazily imported route is a promise, which is why it needs a Suspense boundary and a failure path'),
    e('js-modules', 'explicit', 'Stage 2', 'Dynamic import is what makes a route splittable, so static and dynamic module semantics differ concretely here'),
    e('js-event-loop', 'implicit', 'Lazy routes', 'The chunk resolving on a later tick is what the route-level fallback is covering'),
    e('js-arrays-objects', 'implicit', 'Search params', 'Filters are serialised to and parsed from the URL, which is object-to-string transformation with edge cases'),
    e('js-types-coercion', 'implicit', 'Params', 'A route param is always a string, so an id used as a number needs explicit conversion and a NaN guard'),
    e('js-defaulting-operators', 'implicit', 'Search params', 'A missing filter defaults with ??, since an empty-string filter is a real value'),
    e('js-equality-matrix', 'implicit', 'Search params', 'Deciding whether the URL actually changed avoids an infinite navigation loop'),
    e('js-scope-closures', 'implicit', 'Guard', 'The guard closes over the attempted location so the post-login redirect returns to the right place'),
    e('web-http', 'implicit', 'Screens', 'Each screen loads its own data, and a 401 must route to login rather than render an error card'),
    e('web-storage', 'implicit', 'Guard', 'The session flag survives reload, with a stated reason for not putting a token there'),
    e('web-security', 'implicit', 'Guard', 'A client-side guard is a UX affordance, not a security control, and the project says so explicitly'),
    e('html-forms', 'implicit', 'Login', 'The login screen is a real form so password managers and Enter-to-submit work'),
    e('ts-essentials', 'implicit', 'Routes', 'Route params are typed, so a screen cannot read a param the route does not declare'),
    e('css-box-display', 'implicit', 'Shell', 'The shell is a full-height layout whose scroll container must be chosen deliberately'),
    e('css-grid-tracks', 'implicit', 'Shell', 'Sidebar and content are two grid tracks, which is the classic application shell'),
    e('css-grid-placement', 'implicit', 'Shell', 'grid-template-areas names the shell regions so the layout reads as a diagram'),
    e('css-positioning', 'implicit', 'Shell', 'The header is sticky and the sidebar is fixed on small screens, each with its own containing block'),
    e('css-states', 'implicit', 'Nav', 'The active link needs a state that is not colour-only, driven by aria-current from the router'),
    e('css-selectors', 'implicit', 'Nav', '[aria-current="page"] styles the active link, so the visual and accessible states cannot drift apart'),
    e('css-media-container', 'implicit', 'Shell', 'The sidebar collapses at a breakpoint, which changes the shell layout rather than merely resizing it'),
    e('css-flex-axes', 'implicit', 'Header', 'The header is a flex row with a growing spacer between brand and actions'),
    e('react-perf', 'explicit', 'Stage 2', 'Route-level splitting is the first optimisation with a measurable bundle number attached'),

    // ── Extended roadmap tracks ──
    e('rd-react-routing-forms', 'explicit', 'Stage 2', 'Nested routes, params and navigation are the routing half of the roadmap topic'),
    e('rd-react-components', 'explicit', 'Stage 1', 'Layout routes are composition: a route is a component that owns an outlet'),
  ],
  exemptions: [
    {
      reason:
        'The extended roadmap tracks were added to the curriculum after this build was designed. These are the ones it does not genuinely exercise, and claiming them because the topic exists is the inflation this manifest is meant to prevent.',
      conceptIds: [
        'rd-react-hooks',
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
      reason: 'Redux, Flux, testing discipline and the React 19 server model are each the headline of an intermediate or advanced project, and would each double this build on their own.',
      conceptIds: [
        'redux-core', 'redux-react-toolkit', 'tooling-flux', 'testing-react',
        'r19-actions', 'r19-use-rsc', 'react-class-lifecycle', 'js-prototypes',
        'js-polyfills', 'js-this', 'js-dom-events', 'web-cors',
      ],
    },
    {
      reason: 'Fine-grained layout craft is not what this project is for; the three CSS projects at the start of the 0-3 YOE path own that material.',
      conceptIds: [
        'css-flex-sizing', 'css-flex-align', 'css-grid-align', 'css-cascade',
        'css-units', 'css-ratio-logical', 'css-tokens-modern',
      ],
    },
  ],
};
