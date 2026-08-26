import type { ProjectBlueprint } from '../types';

/**
 * The build where the platform already had the answer.
 *
 * Most wizards reimplement validation, focus and submission in JavaScript and
 * end up worse than a plain form: no native messages, no autofill, nothing
 * announced. This one starts from the native form and only adds what the
 * platform genuinely lacks — which turns out to be resumption and step routing.
 */
export const formWizardProject: ProjectBlueprint = {
  id: 'service-form-wizard',
  title: 'Form Wizard: Native First, Resumable, Announced',
  tagline: 'Four steps, one submission, and validation the browser mostly already does.',
  realWorldAnalog: 'Checkout, onboarding, KYC — every multi-step flow that loses your data',
  track: 'service',
  tier: 'flagship',
  difficulty: 'Junior',
  estimatedBuildTimeHours: 10,
  architecturePattern: 'Native form · step in the URL · reducer-held draft',
  summary:
    'A four-step form that keeps your answers when you refresh, puts each step in the URL, and validates with the platform before it reaches for JavaScript. The interview question underneath is simple and rarely answered well: what does the browser already do for you, and what did you just rebuild worse?',
  tags: ['React', 'Forms', 'Validation', 'a11y', 'React 19 Actions'],
  xpBounty: 280,
  prerequisites: ['basic-controlled-form'],
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Four steps sharing one submission, with the step encoded in the URL.',
      'Native constraint validation first; JavaScript only for rules HTML cannot express.',
      'A draft that survives refresh and is cleared on successful submit.',
      'Focus moves to the step heading on navigation, and to the first invalid field on error.',
      'An error summary at the top of the step, linking to each bad field.',
      'Submission through a React 19 Action, with pending state from the framework.',
      'Server-side field errors mapped back onto the right inputs.',
      'Back and forward through steps without losing a keystroke.',
    ],
    outOfScopeBloat: [
      'A form library. Deciding when one would earn its bytes is the deliverable.',
      'A schema validation library — write the three rules HTML cannot express by hand.',
      'File upload, payments, or conditional step graphs.',
      'Animated step transitions.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'The form the platform gives you',
      focus: 'Native inputs, constraints and messages before any JavaScript',
      codeSnippet: `<form noValidate={false}>\n  <label htmlFor="email">Email</label>\n  <input id="email" name="email" type="email" required\n         autoComplete="email" aria-describedby="email-hint" />\n  <p id="email-hint">We only use this for the receipt.</p>\n</form>`,
      failureModeOrInvariant:
        'Replacing native validation with JavaScript loses autofill, the on-screen keyboard type, the browser\'s own translated error messages and free screen-reader announcement. Most hand-rolled validation is a downgrade that took a week. Set noValidate and you have opted out of all of it deliberately — so say why.',
      architecturalLesson:
        'Start from what the platform does. Every replacement should be justified by a rule HTML genuinely cannot express.',
    },
    {
      stageNumber: 2,
      stageName: 'The step that survives a refresh',
      focus: 'Step in the URL, draft in a reducer, persistence on change',
      codeSnippet: `// The step is a route, not state — so back, forward and a shared link all work.\n<Route path="/apply/:step" element={<Wizard />} />\n\n// The draft is one reducer, persisted on change and cleared on success.\nconst [draft, dispatch] = useReducer(draftReducer, undefined, loadDraft);\nuseEffect(() => saveDraft(draft), [draft]);`,
      failureModeOrInvariant:
        'Holding the step in useState means the back button leaves the whole flow instead of stepping back one, and a refresh at step four returns the user to step one with an empty form. Persisting on every keystroke without debounce writes to storage forty times a sentence.',
      architecturalLesson:
        'A step is a location. If a user would expect the back button to undo it, it belongs in the URL rather than in component state.',
    },
    {
      stageNumber: 3,
      stageName: 'The submission that tells the truth',
      focus: 'Actions, pending state, and mapping server errors back to fields',
      codeSnippet: `const [state, submit, pending] = useActionState(async (_prev, formData) => {\n  const res = await api.submit(formData);\n  // A field error must land on its field, not in a banner nobody links to.\n  return res.ok ? { ok: true } : { fieldErrors: res.errors };\n}, {});\n\n<form action={submit}>…<button disabled={pending}>Submit</button></form>`,
      failureModeOrInvariant:
        'A generic "something went wrong" banner for a rejected postcode leaves the user hunting. Errors must be attached to inputs with aria-describedby, summarised at the top, and focus moved to the summary — otherwise a screen-reader user is told nothing changed at all.',
      architecturalLesson:
        'An error is a piece of routing: it has to arrive at the field that caused it, and the user has to be sent there.',
    },
  ],
  deliverables: [
    { id: 'Native baseline', title: 'Native-first form', spec: 'Every field uses the correct type, autocomplete token and native constraint, with each JavaScript override justified in a comment.' },
    { id: 'Step router', title: 'URL-driven steps', spec: 'The step is a route parameter so back, forward and a pasted link all resume at the right place with the draft intact.' },
    { id: 'Draft store', title: 'Resumable draft', spec: 'A reducer-held draft persisted on change with debounce, restored on mount and cleared only after a successful submission.' },
    { id: 'Error summary', title: 'Linked error summary', spec: 'A summary at the top of the step lists every invalid field as a link that moves focus to that input.' },
    { id: 'Submit action', title: 'Action-based submission', spec: 'Submission runs through a React 19 Action with pending state from the framework rather than a hand-rolled boolean.' },
    { id: 'Field errors', title: 'Server error mapping', spec: 'Server-returned field errors attach to their inputs via aria-describedby and are announced when they arrive.' },
    { id: 'Token theme', title: 'Token-driven styling', spec: 'Field, label, hint and error styling read custom properties, with invalid state expressed by attribute not class.' },
    { id: 'Test suite', title: 'Behavioural tests', spec: 'Tests prove a refresh mid-flow resumes with data intact and that a rejected field moves focus to that field.' },
  ],
  layers: [
    { layer: 'Markup', components: ['native inputs', 'labels', 'hints', 'fieldset'], invariants: ['Every input has a programmatically associated label.'] },
    { layer: 'Flow', components: ['step route', 'draft reducer', 'persistence'], invariants: ['No keystroke is lost to navigation or refresh.'] },
    { layer: 'Submission', components: ['action', 'pending', 'error mapper', 'summary'], invariants: ['Every error is reachable from the summary and attached to its field.'] },
  ],
  explicitTopics: [
    { category: 'HTML', topic: 'Forms', subtopic: 'Constraints, autocomplete, native messages', howCovered: 'The form works with JavaScript disabled before any client validation is added.', conceptIds: ['html-forms', 'html-semantics'] },
    { category: 'React', topic: 'State', subtopic: 'A draft as a reducer', howCovered: 'One reducer owns the whole draft, so persistence and restoration have a single shape to handle.', conceptIds: ['react-state', 'react-hooks-rest', 'rd-react-hooks'] },
    { category: 'Routing', topic: 'Steps as locations', subtopic: 'Params, back, resumption', howCovered: 'The step is a route parameter, so the back button steps back rather than leaving the flow.', conceptIds: ['router-core', 'rd-react-routing-forms'] },
    { category: 'React 19', topic: 'Actions', subtopic: 'useActionState and pending', howCovered: 'Submission is an Action, so pending and error state come from the framework instead of a hand-rolled boolean.', conceptIds: ['r19-actions'] },
    { category: 'JavaScript', topic: 'Async', subtopic: 'Submission, rejection, retry', howCovered: 'A rejected submission preserves the draft and maps errors rather than clearing the form.', conceptIds: ['js-promises', 'web-http'] },
    { category: 'React', topic: 'Effects', subtopic: 'Persistence and cleanup', howCovered: 'The draft is written on change with a debounce whose timer is cleared on unmount.', conceptIds: ['react-effects'] },
    { category: 'Accessibility', topic: 'Errors and focus', subtopic: 'Summary, describedby, focus movement', howCovered: 'Focus moves to the step heading on navigation and to the first invalid field on rejection.', conceptIds: ['a11y-core'] },
    { category: 'CSS', topic: 'States', subtopic: 'Invalid, focus and disabled', howCovered: 'Validity is styled from attributes so the visual state cannot drift from the accessible one.', conceptIds: ['css-states'] },
    { category: 'TypeScript', topic: 'Modelling', subtopic: 'Draft and error shapes', howCovered: 'Each step\'s fields and its error map are typed, so a renamed field breaks the compile rather than the form.', conceptIds: ['ts-essentials'] },
    { category: 'Web', topic: 'Storage', subtopic: 'What may be persisted', howCovered: 'The draft persists, but fields marked sensitive are excluded and the reason is written down.', conceptIds: ['web-storage'] },
    { category: 'State', topic: 'Reducers', subtopic: 'Pure draft transitions', howCovered: 'Draft edits are a reducer, which is what makes restoring and clearing a single operation.', conceptIds: ['redux-core', 'rd-react-state-mgmt'] },
    { category: 'React', topic: 'Composition', subtopic: 'A step is a component', howCovered: 'Steps share one submission and one draft, so adding a step touches a registry rather than the flow.', conceptIds: ['react-composition', 'rd-react-components'] },
    { category: 'Testing', topic: 'Behavioural tests', subtopic: 'Resumption and error routing', howCovered: 'A test refreshes mid-flow and asserts the data survived; another asserts focus lands on the rejected field.', conceptIds: ['testing-react', 'rd-react-testing'] },
  ],
  implicitFoundations: [
    { domain: 'Language Semantics', title: 'Empty is not missing', mechanism: 'An untouched field, a cleared field and an absent field are distinguished before defaulting.', realWorldImpact: 'Collapsing them submits an empty string where the server expected no key at all.', conceptIds: ['js-defaulting-operators', 'js-types-coercion'] },
    { domain: 'Language Semantics', title: 'The draft is replaced, not edited', mechanism: 'Every edit returns a new draft object.', realWorldImpact: 'Mutating the draft makes the persisted copy and the rendered copy disagree.', conceptIds: ['react-immutability', 'react-references-copying', 'js-arrays-objects'] },
    { domain: 'Language Semantics', title: 'Each save owns its timer', mechanism: 'The debounced write closes over its own timeout handle.', realWorldImpact: 'A shared handle cancels the wrong pending write and loses the last keystroke.', conceptIds: ['js-scope-closures', 'js-equality-matrix'] },
    { domain: 'Security & Invariants', title: 'Not everything may be stored', mechanism: 'Sensitive fields are excluded from persistence by an allowlist, not a denylist.', realWorldImpact: 'A denylist quietly starts persisting the next sensitive field somebody adds.', conceptIds: ['web-security'] },
    { domain: 'DOM & Browser Pipeline', title: 'The step is a grid', mechanism: 'Progress rail, form column and summary occupy named grid areas.', realWorldImpact: 'The layout survives a step with twice as many fields.', conceptIds: ['css-grid-tracks', 'css-grid-placement', 'css-grid-align', 'css-box-display'] },
    { domain: 'DOM & Browser Pipeline', title: 'A field row is a flex line', mechanism: 'Label, control and hint stack with a held basis for the control.', realWorldImpact: 'A long label must not shrink the input below usable width.', conceptIds: ['css-flex-axes', 'css-flex-sizing', 'css-flex-align', 'css-positioning'] },
    { domain: 'Tooling & Build', title: 'Validity is data', mechanism: 'Invalid state is an attribute read by CSS rather than a class toggled in JavaScript.', realWorldImpact: 'The visual and accessible states cannot drift apart because they read the same source.', conceptIds: ['css-tokens-modern', 'css-cascade', 'css-selectors', 'css-units', 'css-media-container', 'rd-fe-modern-css'] },
    { domain: 'Language Semantics', title: 'When a form library earns its bytes', mechanism: 'The threshold is stated after building without one.', realWorldImpact: 'Adopting a library before feeling the pain means never knowing what it solved.', conceptIds: ['state-alternatives'] },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Pending and error plumbing for the submission (React 19 Actions).', 'Constraint validation, autofill and error messages (the browser).'],
    manualEngineeringRequired: [
      'The three rules HTML cannot express, written by hand.',
      'Draft persistence, its allowlist, and the clearing rule.',
      'Error routing: summary, describedby, and where focus goes.',
    ],
  },
};
