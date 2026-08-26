import type { ProjectBlueprint } from '../types';

/** Foundations — the box model, the cascade, and semantic markup. */
export const profileCardProject: ProjectBlueprint = {
  id: 'basic-profile-card',
  title: 'Profile Card: The Box Model, Honestly',
  tagline: 'One card, built twice — once by guessing at margins, once by understanding the box.',
  realWorldAnalog: 'Any team directory page ever shipped',
  tier: 'basic',
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
