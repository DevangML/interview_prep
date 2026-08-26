import type { ProjectBlueprint } from '../types';

/** Foundations — the box model, the cascade, and semantic markup. */
export const profileCardProject: ProjectBlueprint = {
  id: 'basic-profile-card',
  title: 'IdentityCard — High-Density Responsive Profile & Credential Widget',
  tagline: 'One card, built twice — once by guessing at margins, once by understanding the box.',
  realWorldAnalog: 'Any team directory page ever shipped',
  track: 'service',
  tier: 'foundation',
  difficulty: 'Beginner',
  estimatedBuildTimeHours: 2,
  architecturePattern: 'Single semantic component, no framework',
  summary:
    'Build one profile card in plain HTML and CSS. The point is not the card — it is that you can say exactly why an element is the width it is, why two margins became one, and which of four competing rules won. Every interviewer opens with something this small.',
  tags: ['HTML', 'CSS', 'Box model', 'Specificity', 'Beginner'],
  xpBounty: 80,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'A palette in custom properties, so the card recolours from one place.',
      'A real avatar request with lazy loading and a 404 fallback.',
      'The whole card links to a profile, so hover and focus-visible both matter.',
      'Semantic markup: article, heading hierarchy, img with real alt text.',
      'Deliberate box-sizing, padding, border and margin on every element.',
      'A three-rule specificity conflict you resolve without reaching for !important.',
      'Sizing in rem and ch so the card grows with the user font size.',
    ],
    outOfScopeBloat: [
      'A CSS framework or utility library.',
      'Dark mode, animation, or a build step.',
      'Making it a reusable component — it is one card.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The version that looks right',
      focus: 'Fixed pixels and a div for everything',
      codeSnippet: `<div class="card">\n  <div class="name">Priya Raman</div>\n  <div class="role">Front-end Engineer</div>\n</div>\n\n.card { width: 300px; padding: 20px; border: 1px solid #ccc; }\n.name { font-size: 18px; margin-bottom: 8px; }`,
      failureModeOrInvariant:
        'The card renders 342px wide, not 300px — content-box adds padding and border on top. A screen reader announces nothing but "Priya Raman, Front-end Engineer" with no structure. At 200% browser zoom the text overflows the fixed width.',
      architecturalLesson:
        'Width in CSS is not the width of the element unless you have said which box you meant.',
    },
    {
      stageNumber: 2,
      stageName: 'The version that holds',
      focus: 'border-box, semantic elements, relative units, resolved cascade',
      codeSnippet: `*, *::before, *::after { box-sizing: border-box; }\n\n<article class="card">\n  <img src="..." alt="Priya Raman" />\n  <h2>Priya Raman</h2>\n  <p class="role">Front-end Engineer</p>\n</article>\n\n.card { inline-size: min(100%, 22rem); padding: 1.25rem; }\n/* 0,1,0 beats 0,0,1 — no !important needed */\n.card .role { color: #555; }`,
      failureModeOrInvariant:
        'Width now means the border edge. The card caps at 22rem but shrinks on a narrow screen. Adjacent vertical margins collapse — you can predict which one wins before you look.',
      architecturalLesson:
        'Specificity is three numbers compared left to right, not a vague sense of importance. Once you can compute it, !important stops being necessary.',
    },
  ],
  deliverables: [
    { id: 'Style layer', title: 'Style layer', spec: 'A single :root block defining every colour and space token the card uses; no literal hex value appears anywhere else in the stylesheet.' },
  ],
  layers: [
    {
      layer: 'Document',
      components: ['article', 'heading', 'img with alt', 'paragraph'],
      invariants: ['Every image has alt text; decorative images have alt="".'],
    },
    {
      layer: 'Style',
      components: ['box-sizing reset', 'cascade layer for base vs component', 'rem/ch sizing'],
      invariants: ['No !important anywhere in the file.'],
    },
  ],
  explicitTopics: [
    // Declared because the manifest claims them against a stage rather than a
    // deliverable — a stage anchor evidences nothing on its own.
    { category: 'CSS', topic: 'static, relative, absolute, fixed, sticky, containing block, z-index', subtopic: 'Stage 2', howCovered: 'The verified badge is absolutely positioned, which forces the card to become the containing block', conceptIds: ['css-positioning'] },
    { category: 'CSS', topic: '`aspect-ratio`, the padding hack, writing modes and logical properties', subtopic: 'Stage 2', howCovered: 'The avatar reserves its box with aspect-ratio, and sizing uses inline-size rather than width', conceptIds: ['css-ratio-logical'] },
    { category: 'CSS', topic: 'Flex axes, direction, reverse, wrap and `order`', subtopic: 'Stage 2', howCovered: 'The name-and-role header is a flex row, which is the smallest possible use of a main axis', conceptIds: ['css-flex-axes'] },
    { category: 'CSS', topic: 'align-self, auto margins and the alignment family', subtopic: 'Stage 2', howCovered: 'align-items centres the avatar against a two-line name block of unknown height', conceptIds: ['css-flex-align'] },
    { category: 'CSS', topic: 'Focus states, `:focus-visible`, and styling interaction accessibly', subtopic: 'Stage 2', howCovered: 'The card links to a profile, so :hover and :focus-visible must both be styled and outline: none is forbidden', conceptIds: ['css-states'] },
    { category: 'Accessibility', topic: 'ARIA, keyboard navigation and focus management', subtopic: 'Stage 2', howCovered: 'Alt text and heading level decide the accessible name and the outline a screen reader announces', conceptIds: ['a11y-core'] },
    { category: 'Web Platform', topic: 'URL to pixels — the critical rendering path', subtopic: 'Stage 1 → 2', howCovered: 'Selector matching, cascade resolution and box computation are the pipeline stages this card passes through', conceptIds: ['web-how-page-loads'] },
    { category: 'Web Platform', topic: 'HTTP, status codes, methods and idempotency', subtopic: 'Stage 2', howCovered: 'The avatar is a real request: loading="lazy" and a 404 fallback make the network visible in a static page', conceptIds: ['web-http'] },
    { category: 'CSS', topic: 'Media queries, container queries and responsive strategy', subtopic: 'Stage 2', howCovered: 'Deliberately solved with min() instead of a media query, to show intrinsic sizing before breakpoints are taught', conceptIds: ['css-media-container'] },
    { category: 'CSS', topic: '`flex` shorthand, `flex-basis` vs `width`, grow and shrink', subtopic: 'Stage 2', howCovered: 'flex-basis is explicitly not used here; the header row is auto-sized, and the contrast is set up for the pricing grid', conceptIds: ['css-flex-sizing'] },
    { category: 'CSS', topic: 'Modern CSS: Cascade Layers (@layer), @scope, Subgrid & :has()', subtopic: 'Stage 2', howCovered: 'Custom properties, logical sizing and min() carry the whole card with no framework underneath', conceptIds: ['rd-fe-modern-css'] },
    {
      category: 'HTML',
      topic: 'Semantics',
      subtopic: 'Document outline and alt text',
      howCovered: 'Rebuilds a div soup card as article + heading + img, then reads the resulting outline.',
      conceptIds: ['html-semantics'],
    },
    {
      category: 'CSS',
      topic: 'Box model',
      subtopic: 'content-box vs border-box, margin collapse',
      howCovered: 'Measures the same card under both box-sizing values and explains the 42px difference.',
      conceptIds: ['css-box-display'],
    },
    {
      category: 'CSS',
      topic: 'The cascade',
      subtopic: 'Specificity, inheritance, !important',
      howCovered: 'Three rules deliberately target the same element; you compute the winner before testing.',
      conceptIds: ['css-cascade', 'css-selectors'],
    },
    {
      category: 'CSS',
      topic: 'Units',
      subtopic: 'rem, ch, min() and relative sizing',
      howCovered: 'Card width and spacing are expressed relative to font size, then tested at 200% zoom.',
      conceptIds: ['css-units'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'DOM & Browser Pipeline',
      title: 'Style resolution order',
      mechanism: 'The browser matches selectors right-to-left, resolves the cascade, then computes the box.',
      realWorldImpact: 'Explains why a descendant selector is slower and why computed style differs from authored style.',
      conceptIds: ['css-cascade'],
    },
    {
      domain: 'DOM & Browser Pipeline',
      title: 'Accessible name computation',
      mechanism: 'Assistive tech builds a name from alt, aria-label, and content in a defined precedence order.',
      realWorldImpact: 'A missing alt attribute makes the image announce its file name.',
      conceptIds: ['html-semantics'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: [],
    manualEngineeringRequired: [
      'Every line of CSS — no framework is permitted for this build.',
      'Computing specificity by hand before checking devtools.',
    ],
  },
};
