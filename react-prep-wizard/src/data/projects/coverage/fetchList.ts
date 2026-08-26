import { e, type ProjectCoverage } from './types';

/**
 * Junior, async. Widened by the audit: the list now caches to storage, hits a
 * cross-origin endpoint, and renders untrusted result text, so CORS, caching
 * and escaping are part of the build rather than later reading.
 */
export const fetchListCoverage: ProjectCoverage = {
  projectId: 'basic-fetch-list',
  edges: [
    e('js-promises', 'explicit', 'Stages 1-2', 'The out-of-order race is reproduced, then removed with an AbortController wired into the effect cleanup'),
    e('web-http', 'explicit', 'Stages 1-2', 'Response.ok, 4xx versus 5xx retry policy and idempotency are each decided by hand rather than by a library default'),
    e('react-effects', 'explicit', 'Stage 2', 'Cleanup is the cancellation point, which is the canonical answer to the stale-response interview question'),
    e('web-cors', 'explicit', 'Stage 2', 'The third-party endpoint triggers a preflight, and the opaque failure is diagnosed from the network panel, not guessed'),
    e('js-event-loop', 'explicit', 'Stage 1', 'Two in-flight requests resolving on the microtask queue is what makes the last-writer-wins bug deterministic to demonstrate'),
    e('ts-essentials', 'explicit', 'Stage 2', 'The four states are one discriminated union, so a loading-and-error combination cannot be constructed'),
    e('web-storage', 'implicit', 'Cache', 'The last successful response is cached so an offline reload shows data with an explicit staleness marker'),
    e('web-security', 'implicit', 'Results', 'Result text comes from a third party, so escaping and a URL-scheme allowlist for result links are required'),
    e('js-polyfills', 'implicit', 'Search', 'The debounce is written from scratch, including cancel, because the search fires on every keystroke'),
    e('js-scope-closures', 'explicit', 'Stage 2', 'Each effect run closes over its own controller, which is precisely why the stale one can be aborted'),
    e('js-arrays-objects', 'implicit', 'Results', 'Results are mapped and filtered into view models without mutating the fetched payload'),
    e('react-state', 'explicit', 'Stage 2', 'State transitions go through a reducer, since four states with typed payloads outgrow four useState calls'),
    e('react-hooks-rest', 'explicit', 'Stage 2', 'useReducer models the state machine and useRef holds the controller, neither of which should trigger a render'),
    e('react-rendering-model', 'implicit', 'Results', 'Keys on result rows decide whether state follows the item or the position when results change'),
    e('react-errors-portals', 'explicit', 'Stage 2', 'A boundary catches a render failure on malformed data so the whole page does not go blank'),
    e('react-composition', 'implicit', 'Views', 'Spinner, ErrorPanel, EmptyState and ResultList are swapped behind one interface by the state union'),
    e('js-defaulting-operators', 'implicit', 'Results', 'Optional fields in the payload default with ?? so a legitimate 0 rating is not shown as unrated'),
    e('js-types-coercion', 'implicit', 'Results', 'Query params are strings, so page and limit need explicit conversion before they are used as numbers'),
    e('js-equality-matrix', 'implicit', 'Cache', 'Deciding whether a cached response matches the current query is a stated sameness rule, not a === on objects'),
    e('react-references-copying', 'implicit', 'Cache', 'The cached array is copied before it is handed out, so a consumer cannot corrupt the cache in place'),
    e('js-modules', 'implicit', 'Structure', 'The fetch wrapper is its own module, which is what makes it mockable at a boundary in the testing project'),
    e('react-immutability', 'implicit', 'Results', 'Marking a row as read produces a new array, which is what lets a memoised row skip re-rendering'),
    e('a11y-core', 'explicit', 'Stage 2', 'Loading, error and empty are announced through a live region, since a visual-only spinner tells a screen reader nothing'),
    e('html-semantics', 'implicit', 'Results', 'Results are a list and the search is a form with role="search", which is what makes the region navigable'),
    e('html-forms', 'implicit', 'Search', 'The search input is a real form control with a label, so Enter submits and the field is announced'),
    e('css-states', 'implicit', 'Results', 'The pending state needs to be visible without the layout jumping when results replace the skeleton'),
    e('css-ratio-logical', 'implicit', 'Results', 'Skeleton rows reserve their final height with aspect-ratio so the list does not shift when data lands'),
    e('css-flex-axes', 'implicit', 'Results', 'Each result row is a flex line with a growing title and a trailing meta column'),
    e('css-box-display', 'implicit', 'Results', 'The scroll container needs its own formatting context or the sticky search header escapes it'),
    e('web-how-page-loads', 'explicit', 'Stage 2', 'DNS, TLS and the first byte all precede any data, which is why the spinner exists at all'),
  ],
  exemptions: [
    {
      reason: 'One screen does not justify a router, a global store or a design system; those arrive in the next 0-3 YOE project and in the intermediate tier.',
      conceptIds: [
        'router-core', 'redux-core', 'redux-react-toolkit', 'state-alternatives',
        'frontend-system-design', 'testing-react', 'tooling-bundlers', 'tooling-flux',
        'react-perf', 'react-class-lifecycle', 'r19-actions', 'r19-use-rsc',
        'js-prototypes', 'js-this', 'js-dom-events',
      ],
    },
    {
      reason: 'Layout is deliberately plain so that every observation in this project is about async ordering rather than about CSS.',
      conceptIds: [
        'css-flex-sizing', 'css-flex-align', 'css-grid-tracks', 'css-grid-placement',
        'css-grid-align', 'css-cascade', 'css-selectors', 'css-positioning',
        'css-units', 'css-media-container', 'css-tokens-modern',
      ],
    },
  ],
};
