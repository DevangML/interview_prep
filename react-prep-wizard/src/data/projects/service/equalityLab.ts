import type { ProjectBlueprint } from '../types';

/** Foundations — coercion, sameness, and the three ways to handle "no value". */
export const equalityLabProject: ProjectBlueprint = {
  id: 'basic-equality-lab',
  title: 'The Equality Lab: A Truth Table You Built Yourself',
  tagline: 'Predict the answer, then run it. Every disagreement is a gap you just found.',
  realWorldAnalog: 'The MCQ round of every front-end assessment',
  track: 'service',
  tier: 'foundation',
  difficulty: 'Beginner',
  estimatedBuildTimeHours: 3,
  architecturePattern: 'Executable specification — a table that tests itself',
  summary:
    'Build a small page that renders a comparison matrix: for every pair of values it shows ==, ===, Object.is and a deep-equal result, together with your prediction. It is a study tool disguised as a project, and it targets the exact material a 50-minute assessment spends a third of its questions on.',
  tags: ['JavaScript', 'Coercion', 'Equality', 'Assessment', 'Beginner'],
  xpBounty: 100,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Rendered as a small React app so the matrix, predictions and score are real state.',
      'A prediction history persisted across reloads, which exposes what JSON does to NaN.',
      'A matrix over null, undefined, 0, -0, NaN, "", "0", [], {}, false.',
      'Four columns: ==, ===, Object.is, and your own deepEqual.',
      'A prediction field you fill in before revealing the computed answer.',
      'A second panel for ??, ||, ?., ??= and default parameters on the same values.',
    ],
    outOfScopeBloat: [
      'A test-runner framework.',
      'Charts, scoring, or persistence.',
      'Covering every primitive — ten well-chosen values beat fifty.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The rules you think you know',
      focus: 'Loose equality and falsy checks',
      codeSnippet: `[] == false      // true\n[] == ![]        // true\nnull == 0        // false\nnull >= 0        // true\nNaN === NaN      // false\n\nfunction greet(name) {\n  name = name || 'guest';   // turns 0 and '' into 'guest'\n  return 'Hi ' + name;\n}`,
      failureModeOrInvariant:
        'null == 0 is false but null >= 0 is true, because relational operators coerce and loose equality has a special case for null and undefined. The || default silently rewrites legitimate falsy inputs such as 0 and the empty string.',
      architecturalLesson:
        '== is not "=== with type conversion" — it is a specific algorithm with named exceptions. Knowing the exceptions is the whole trick.',
    },
    {
      stageNumber: 2,
      stageName: 'The rules as written',
      focus: 'SameValueZero, Object.is, and nullish-only defaults',
      codeSnippet: `Object.is(NaN, NaN)   // true\nObject.is(0, -0)      // false\n[NaN].includes(NaN)   // true  (SameValueZero)\n[NaN].indexOf(NaN)    // -1    (strict equality)\n\nfunction greet(name) {\n  return \`Hi \${name ?? 'guest'}\`;  // 0 and '' survive\n}\nconst city = user?.address?.city ?? 'unknown';`,
      failureModeOrInvariant:
        'includes and indexOf disagree about NaN, because they use different sameness algorithms. ?? falls back only for null and undefined, which is almost always what was meant by ||.',
      architecturalLesson:
        'JavaScript has four sameness algorithms, not one. Naming which one an API uses turns trivia into a rule you can apply.',
    },
  ],
  deliverables: [
    { id: 'Panel 2', title: 'Panel 2', spec: 'A second table running the same ten values through ??, ||, ?., ??= and a default parameter, with the differing cells highlighted.' },
    { id: 'Value catalogue', title: 'Value catalogue', spec: 'The ten values held as thunks in one module so -0 and NaN survive, each tagged with a discriminated-union kind.' },
    { id: 'deepEqual', title: 'deepEqual', spec: 'A hand-written deepEqual handling cycles, Date, RegExp, Map and Set, with a test for each.' },
    { id: 'Operator table', title: 'Operator table', spec: 'The four sameness operators held as methods on one object, invoked both attached and detached to show the receiver difference.' },
    { id: 'Structure', title: 'Structure', spec: 'Values, operators and the renderer are three modules with named exports; the renderer imports no literals of its own.' },
    { id: 'Matrix view', title: 'Matrix view', spec: 'A CSS grid whose column count follows the operator list, with sticky row and column headers and a real <table> underneath.' },
    { id: 'Predictions', title: 'Predictions', spec: 'Each cell has a radio group inside a fieldset with a legend naming the comparison; the computed answer stays hidden until a prediction is recorded.' },
    { id: 'Persistence', title: 'Persistence', spec: 'The prediction history and score persist to localStorage and reload correctly, including the values JSON cannot represent.' },
    { id: 'Reveal', title: 'Reveal', spec: 'The answer is revealed on a microtask after the prediction commits, so the recorded prediction can never be the revealed value.' },
  ],
  layers: [
    {
      layer: 'Data',
      components: ['value set', 'operator set', 'prediction record'],
      invariants: ['Values are held as thunks so -0 and NaN survive serialisation.'],
    },
    {
      layer: 'View',
      components: ['matrix table', 'prediction input', 'diff highlight'],
      invariants: ['The computed answer stays hidden until a prediction is entered.'],
    },
  ],
  explicitTopics: [
    {
      category: 'JavaScript',
      topic: 'Values',
      subtopic: 'Types, coercion and equality',
      howCovered: 'Every cell of the matrix is a coercion result you predicted before running.',
      conceptIds: ['js-types-coercion'],
    },
    {
      category: 'JavaScript',
      topic: 'Values',
      subtopic: 'Sameness: ==, ===, Object.is, NaN, +0/-0',
      howCovered: 'All four sameness algorithms are computed side by side on values chosen to make them disagree.',
      conceptIds: ['js-equality-matrix'],
    },
    {
      category: 'JavaScript',
      topic: 'Values',
      subtopic: 'Handling undefined: ??, ||, ?., ??=, default parameters',
      howCovered: 'A second panel runs the same values through each defaulting operator to expose where || is wrong.',
      conceptIds: ['js-defaulting-operators'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'Language Semantics',
      title: 'Abstract operations',
      mechanism: 'ToPrimitive, ToNumber and the Abstract Equality Comparison algorithm from the specification.',
      realWorldImpact: 'Reading the spec once replaces a dozen memorised trivia answers with one procedure.',
      conceptIds: ['js-types-coercion'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: [],
    manualEngineeringRequired: [
      'A deepEqual implementation that handles NaN, -0, Dates and cycles.',
      'Predicting before executing — the discipline is the deliverable.',
    ],
  },
};
