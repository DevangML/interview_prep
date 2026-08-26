import type { ProjectBlueprint } from '../types';

/** Foundations — flexbox for one axis, grid for two. */
export const pricingGridProject: ProjectBlueprint = {
  id: 'basic-pricing-grid',
  title: 'TierGrid — High-Converting SaaS Subscription & Pricing Matrix',
  tagline: 'Three plan cards that stay aligned when one plan has a longer name than the others.',
  realWorldAnalog: 'Stripe / Vercel pricing page',
  track: 'service',
  tier: 'foundation',
  difficulty: 'Beginner',
  estimatedBuildTimeHours: 3,
  architecturePattern: 'One-dimensional rows inside a two-dimensional page grid',
  prerequisites: ['basic-profile-card'],
  summary:
    'Lay out three pricing cards so their headers, feature lists and buttons line up across columns even when the content differs in length. This is the single most common CSS interview task, and the answer hinges on knowing that flexbox distributes along one axis while grid places on two.',
  tags: ['CSS', 'Flexbox', 'Grid', 'Responsive', 'Beginner'],
  xpBounty: 110,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'A feature-comparison table placed with grid-template-areas and explicit spans.',
      'A container query so the card adapts to a narrow sidebar as well as a wide page.',
      'A featured plan selected with :has() rather than an extra class from the markup.',
      'Page-level grid with repeat(auto-fit, minmax()) and no media query.',
      'Card-internal flex column with an auto-margin pushing the CTA to the bottom.',
      'flex-grow / flex-shrink / flex-basis chosen deliberately, not copied.',
      'One deliberate flex-wrap and order demonstration.',
    ],
    outOfScopeBloat: [
      'A pricing toggle, currency switcher, or checkout.',
      'JavaScript of any kind.',
      'Subgrid — that is the advanced tier.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Floats and fixed widths',
      focus: 'Three cards at 33% that do not line up',
      codeSnippet: `.cards { display: flex; }\n.card { width: 33%; margin: 10px; }\n.card button { margin-top: 40px; }`,
      failureModeOrInvariant:
        '33% plus margins overflows the row. The plan with two feature bullets has its button 60px higher than the plan with five. Below 700px the cards squash instead of stacking.',
      architecturalLesson:
        'Percentage widths and hand-tuned margins encode one specific content length. Real content is variable length.',
    },
    {
      stageNumber: 2,
      stageName: 'Axes chosen on purpose',
      focus: 'auto-fit grid outside, flex column with auto margin inside',
      codeSnippet: `.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;                 /* gap, not margins */\n}\n.card { display: flex; flex-direction: column; }\n.card .features { flex: 1 1 auto; }   /* absorbs the difference */\n.card .cta { margin-block-start: auto; } /* pinned to the bottom */`,
      failureModeOrInvariant:
        'Cards reflow from three columns to one with no media query. Buttons align across all three cards regardless of feature count, because the feature list — not the button — absorbs the free space.',
      architecturalLesson:
        'Grid for the page (two axes, unknown count), flex for the card (one axis, distribute the leftover). Naming which axis you are working on answers most layout questions.',
    },
  ],
  deliverables: [
    { id: 'Comparison table', title: 'Comparison table', spec: 'A feature matrix below the cards, marked up as a <table> with scoped headers and laid out with grid-template-areas; the "Most popular" plan spans two columns.' },
    { id: 'Theming', title: 'Theming', spec: 'A featured-plan variant that overrides tokens only — no rule is duplicated, and the featured card is selected with :has(.badge) rather than an extra class.' },
    { id: 'Markup', title: 'Markup', spec: 'The three plans are a <ul> of <article> elements, each with a heading, a feature <ul>, and a real <a> call to action.' },
  ],
  layers: [
    {
      layer: 'Page',
      components: ['auto-fit grid track definition', 'gap'],
      invariants: ['Zero media queries; the layout is intrinsically responsive.'],
    },
    {
      layer: 'Card',
      components: ['flex column', 'growing feature list', 'auto-margin CTA'],
      invariants: ['CTA baseline matches across cards for any feature count from 1 to 8.'],
    },
  ],
  explicitTopics: [
    // Declared because the manifest claims them against a stage rather than a
    // deliverable — a stage anchor evidences nothing on its own.
    { category: 'CSS', topic: 'Media queries, container queries and responsive strategy', subtopic: 'Stage 2', howCovered: 'The card body switches layout with a container query, so the same card adapts inside a wide page or a narrow sidebar', conceptIds: ['css-media-container'] },
    { category: 'CSS', topic: 'Box model, display types, formatting contexts and `flow-root`', subtopic: 'Stage 1 → 2', howCovered: 'Margins are replaced by gap, which removes the collapse and overflow that percentage widths caused', conceptIds: ['css-box-display'] },
    { category: 'CSS', topic: 'static, relative, absolute, fixed, sticky, containing block, z-index', subtopic: 'Stage 2', howCovered: 'The "Most popular" ribbon is absolutely positioned against the card, which must therefore be a containing block', conceptIds: ['css-positioning'] },
    { category: 'CSS', topic: '`aspect-ratio`, the padding hack, writing modes and logical properties', subtopic: 'Stage 2', howCovered: 'Logical properties throughout, so the whole grid mirrors correctly under direction: rtl without new rules', conceptIds: ['css-ratio-logical'] },
    { category: 'CSS', topic: 'Focus states, `:focus-visible`, and styling interaction accessibly', subtopic: 'Stage 2', howCovered: 'Each CTA is a real link with hover, focus-visible and active states that survive keyboard-only use', conceptIds: ['css-states'] },
    { category: 'Web Platform', topic: 'URL to pixels — the critical rendering path', subtopic: 'Stage 1 → 2', howCovered: 'Intrinsic sizing is resolved during layout, which is why minmax stops the squash that a percentage width could not', conceptIds: ['web-how-page-loads'] },
    { category: 'CSS', topic: 'Modern CSS: Cascade Layers (@layer), @scope, Subgrid & :has()', subtopic: 'Stage 2', howCovered: 'Grid tracks and intrinsic sizing are the modern-CSS layer the roadmap means, used instead of a grid framework', conceptIds: ['rd-fe-modern-css'] },
    {
      category: 'CSS',
      topic: 'Flexbox',
      subtopic: 'Main vs cross axis, direction, wrap and order',
      howCovered: 'The card is a flex column; you flip direction and wrap to observe which axis each property acts on.',
      conceptIds: ['css-flex-axes'],
    },
    {
      category: 'CSS',
      topic: 'Flexbox',
      subtopic: 'flex shorthand, basis vs width, grow and shrink',
      howCovered: 'The feature list is given flex: 1 1 auto so it, not the button, absorbs unequal content.',
      conceptIds: ['css-flex-sizing'],
    },
    {
      category: 'CSS',
      topic: 'Flexbox',
      subtopic: 'align-self and auto margins',
      howCovered: 'margin-block-start: auto pins the CTA — the auto-margin trick asked for by name in interviews.',
      conceptIds: ['css-flex-align'],
    },
    {
      category: 'CSS',
      topic: 'Grid',
      subtopic: 'fr, repeat, minmax, auto-fit vs auto-fill',
      howCovered: 'The page track list is built with auto-fit and minmax, then swapped to auto-fill to see the difference.',
      conceptIds: ['css-grid-tracks'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'DOM & Browser Pipeline',
      title: 'Intrinsic sizing',
      mechanism: 'min-content and max-content contributions decide how far a track can shrink before overflow.',
      realWorldImpact: 'Explains why minmax(16rem, 1fr) stops the squash that width: 33% could not.',
      conceptIds: ['css-grid-tracks', 'css-units'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: [],
    manualEngineeringRequired: [
      'Choosing the axis before choosing the property.',
      'Testing with deliberately unequal content lengths.',
    ],
  },
};
