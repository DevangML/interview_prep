import type { ProjectBlueprint } from '../types';

/** Foundations — forms, controlled inputs, and copying state without mutating it. */
export const controlledFormProject: ProjectBlueprint = {
  id: 'basic-controlled-form',
  title: 'Signup Form: Controlled Inputs and Immutable Updates',
  tagline: 'One nested state object, updated correctly — the bug that never shows an error message.',
  realWorldAnalog: 'Checkout, onboarding, settings — the majority of real front-end work',
  track: 'service',
  tier: 'foundation',
  difficulty: 'Junior',
  estimatedBuildTimeHours: 4,
  architecturePattern: 'Controlled components over a single nested state object',
  prerequisites: ['basic-react-first'],
  summary:
    'Build a signup form with nested state (profile, address, preferences), native validation plus custom rules, and a submit that cannot fire twice. The trap is nested updates: mutating one level deep produces a form that stops re-rendering with no error anywhere.',
  tags: ['React', 'Forms', 'Immutability', 'HTML', 'Junior'],
  xpBounty: 160,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'A real submit with a pending state, a 422 validation response, and no double submit.',
      'A draft restored from storage, and the confirmation screen that renders user input safely.',
      'Every input controlled, including radio, checkbox group, and select.',
      'Nested state updated immutably at two levels of depth.',
      'Native constraint validation plus one rule the browser cannot express.',
      'Labels correctly associated and errors announced with aria-describedby.',
    ],
    outOfScopeBloat: [
      'A form library — react-hook-form comes after you can do this by hand.',
      'A real backend.',
      'Multi-step wizard navigation.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The form that stops updating',
      focus: 'Mutating nested state and uncontrolled inputs',
      codeSnippet: `const [form, setForm] = useState({ user: { name: '' }, tags: [] });\n\nfunction onName(e) {\n  form.user.name = e.target.value;   // mutation\n  setForm(form);                     // same reference — no re-render\n}\nfunction addTag(t) {\n  form.tags.push(t);                 // push mutates\n  setForm(form);\n}\n<input value={form.user.name} />     {/* no onChange: read-only input */}`,
      failureModeOrInvariant:
        'Typing does nothing. setForm receives the identical object reference, so React bails out of the re-render. No error is thrown — the field simply appears frozen, which is why this bug survives code review.',
      architecturalLesson:
        'React compares state by reference with Object.is. Mutating in place changes the value but not the identity, so nothing downstream notices.',
    },
    {
      stageNumber: 2,
      stageName: 'New object at every changed level',
      focus: 'Copying the path, non-mutating array methods, real validation',
      codeSnippet: `setForm(prev => ({\n  ...prev,\n  user: { ...prev.user, name: value },   // every level on the path is new\n}));\n\n// mutating vs copying — know which is which\nsetTags(prev => [...prev, tag]);          // push mutates; spread does not\nsetSorted(prev => [...prev].sort());      // sort mutates in place\n\n<label htmlFor="email">Email</label>\n<input id="email" type="email" required aria-describedby="email-err" />`,
      failureModeOrInvariant:
        'Only the objects on the changed path are recreated; siblings keep their identity, so memoised children below them do not re-render. Errors are associated with their inputs and read out by assistive tech.',
      architecturalLesson:
        'Immutable update means new identity along the path from root to the change — not a deep clone of everything. sort, splice, push and reverse mutate; map, filter, slice and toSorted do not.',
    },
  ],
  deliverables: [
    { id: 'Draft restore', title: 'Draft restore', spec: 'The in-progress form saves to localStorage on a debounce and restores on mount, with the save cancelled on unmount.' },
    { id: 'Submit', title: 'Submit', spec: 'An async submit with a pending flag set before the await, a 422 branch that maps server errors onto fields, and a guard making a double click impossible.' },
    { id: 'Errors', title: 'Errors', spec: 'Each error is associated with its input via aria-describedby, and focus moves to the first invalid control on a failed submit.' },
    { id: 'Schema', title: 'Schema', spec: 'One type describing the form shape, with the errors map derived from it so renaming a field is a compile error.' },
    { id: 'Number field', title: 'Number field', spec: 'A numeric input converted once at the boundary with an explicit policy for empty string and NaN.' },
    { id: 'Dirty check', title: 'Dirty check', spec: 'A comparison against the initial values that correctly reports clean after an edit-and-undo.' },
    { id: 'Fields', title: 'Fields', spec: 'Field, Label, Error and Hint compose as one component sharing the generated id implicitly.' },
    { id: 'Validation rules', title: 'Validation rules', spec: 'Rules live in their own module as methods on a validator object, with at least one shown to break when detached from its receiver.' },
    { id: 'Markup', title: 'Markup', spec: 'fieldset and legend group the radio and checkbox sets; every control has a real <label>.' },
    { id: 'Structure', title: 'Structure', spec: 'Validation, storage and the form component are separate modules so the rules can be tested without React.' },
  ],
  layers: [
    {
      layer: 'Markup',
      components: ['label/input pairs', 'fieldset + legend for groups', 'error region'],
      invariants: ['Every control has an accessible name from a real label element.'],
    },
    {
      layer: 'State',
      components: ['nested form object', 'errors map', 'submitting flag'],
      invariants: ['No state object is ever mutated; submit is idempotent while pending.'],
    },
  ],
  explicitTopics: [
    {
      category: 'HTML',
      topic: 'Forms',
      subtopic: 'Labels, validation and submission',
      howCovered: 'Native constraint validation is used first, with custom rules layered on only where it cannot reach.',
      conceptIds: ['html-forms'],
    },
    {
      category: 'React Core',
      topic: 'State',
      subtopic: 'Immutability — mutating vs copying methods',
      howCovered: 'The frozen-form bug is reproduced by mutation and fixed by copying each level on the path.',
      conceptIds: ['react-immutability'],
    },
    {
      category: 'JavaScript',
      topic: 'Data',
      subtopic: 'Object references, shallow copies and deep cloning',
      howCovered: 'Spread is shown to be shallow, and structuredClone is contrasted with a hand-written deep copy.',
      conceptIds: ['react-references-copying', 'js-arrays-objects'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'Language Semantics',
      title: 'Reference identity',
      mechanism: 'Objects are compared by reference; a shallow spread copies one level and shares the rest.',
      realWorldImpact: 'The single most common source of "React is not updating" bug reports.',
      conceptIds: ['react-references-copying'],
    },
    {
      domain: 'DOM & Browser Pipeline',
      title: 'Native form submission',
      mechanism: 'A form submits on Enter within a text field and serialises named controls.',
      realWorldImpact: 'Explains why a div with a click handler is not a form.',
      conceptIds: ['html-forms'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Controlled value binding', 'Re-render on state identity change'],
    manualEngineeringRequired: [
      'Immutable nested updates without an immer-style helper.',
      'Error announcement wiring.',
    ],
  },
};
