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
  ],
  exemptions: [
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
  ],
};
