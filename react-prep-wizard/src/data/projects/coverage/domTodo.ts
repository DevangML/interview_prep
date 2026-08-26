import { e, type ProjectCoverage } from './types';

/**
 * Beginner, vanilla DOM. The audit widened it: the list now persists to
 * localStorage, loads its seed data over HTTP and ships as an ES module, so
 * storage, transport, async and modules are real here rather than deferred.
 */
export const domTodoCoverage: ProjectCoverage = {
  projectId: 'basic-dom-todo',
  edges: [
    e('js-dom-events', 'explicit', 'Stage 2', 'N per-row listeners collapse into one delegated listener, and the capture/target/bubble phases are walked in devtools'),
    e('js-scope-closures', 'explicit', 'Stage 1 → 2', 'The var-in-a-loop bug is reproduced, fixed with let, then explained as one binding versus one per iteration'),
    e('js-this', 'explicit', 'Stage 1 → 2', 'The same handler is written as a method, an arrow and a bound function, and each call site is traced to its receiver'),
    e('js-arrays-objects', 'implicit', 'State layer', 'Toggle and delete are written with map and filter so the store never mutates its own array'),
    e('js-modules', 'implicit', 'Structure', 'Store, render and events are three ES modules with named exports, so import order and live bindings become visible'),
    e('web-storage', 'implicit', 'Persistence', 'Items survive reload via localStorage, with an argued comparison against sessionStorage and IndexedDB'),
    e('js-promises', 'implicit', 'Seed load', 'The initial list is fetched, so the empty-then-populated transition has to be handled without a framework'),
    e('web-http', 'implicit', 'Seed load', 'Response.ok is checked by hand, because fetch resolves happily for a 404 and would render an error page as data'),
    e('js-event-loop', 'implicit', 'Seed load', 'The fetch microtask resolving after the synchronous first paint is what makes the loading flash observable'),
    e('js-defaulting-operators', 'implicit', 'State layer', 'A restored item missing a field must default with ?? rather than ||, or a legitimately empty title is overwritten'),
    e('js-types-coercion', 'explicit', 'Stage 2', 'dataset values are always strings, so the id read from the DOM must be compared deliberately rather than with =='),
    e('js-equality-matrix', 'explicit', 'Stage 2', 'Finding an item by id needs a stated sameness rule once the id arrives from the DOM as a string'),
    e('react-references-copying', 'implicit', 'State layer', 'The store returns copies, so a caller mutating the returned array cannot corrupt the source of truth'),
    e('html-semantics', 'implicit', 'Markup', 'The list is a ul of li with real buttons, which is what makes delegation and keyboard operation work at all'),
    e('html-forms', 'implicit', 'Add item', 'The add control is a form, so Enter submits and the browser handles required-field validation without script'),
    e('a11y-core', 'explicit', 'Stage 2', 'Deleting a row moves focus somewhere sensible and the count is announced through a live region'),
    e('css-box-display', 'implicit', 'Markup', 'Row layout requires knowing which elements are block and which are inline before any styling works'),
    e('css-flex-axes', 'implicit', 'Markup', 'Each row is a flex line: checkbox, growing label, trailing delete button'),
    e('css-flex-sizing', 'implicit', 'Markup', 'The label is the flex item that grows, so the delete button stays at the right edge for any title length'),
    e('css-flex-align', 'implicit', 'Markup', 'align-items keeps the checkbox centred against a label that may wrap to two lines'),
    e('css-states', 'implicit', 'Markup', 'Completed rows and focused rows need distinct visible states that do not rely on colour alone'),
    e('css-selectors', 'implicit', 'Markup', 'Completed styling is driven by [data-done="true"], keeping the DOM the single source of truth'),
    e('js-polyfills', 'implicit', 'Add item', 'The search box needs a debounce, which is the smallest real closure-plus-timer utility in the curriculum'),
    e('web-how-page-loads', 'implicit', 'Structure', 'A module script is deferred by default, which is why the DOM exists by the time the code runs'),
  ],
  exemptions: [
    {
      reason: 'This project exists precisely to be the last one before React, so that a learner can compare hand-written rendering against the framework immediately afterwards.',
      conceptIds: [
        'react-rendering-model', 'react-state', 'react-effects', 'react-hooks-rest',
        'react-class-lifecycle', 'react-immutability', 'react-composition', 'react-perf',
        'react-errors-portals', 'r19-actions', 'r19-use-rsc',
      ],
    },
    {
      reason: 'Prototypes, grid and typing are each the headline of a later 0-3 YOE project; introducing them into a single-file todo would blur what this one is for.',
      conceptIds: [
        'js-prototypes', 'css-grid-tracks', 'css-grid-placement', 'css-grid-align',
        'css-positioning', 'css-units', 'css-ratio-logical', 'css-media-container',
        'css-cascade', 'css-tokens-modern', 'ts-essentials',
      ],
    },
    {
      reason: 'Application architecture, routing and cross-origin concerns are not required to run a single-file todo list, and are covered from basic-routed-app onward.',
      conceptIds: [
        'redux-core', 'redux-react-toolkit', 'state-alternatives', 'router-core',
        'frontend-system-design', 'testing-react', 'tooling-bundlers', 'tooling-flux',
        'web-cors', 'web-security',
      ],
    },
  ],
};
