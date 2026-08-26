import type { ProjectBlueprint } from '../types';

/** Working engineer — a typed, tested, accessible component library. */
export const testedLibraryProject: ProjectBlueprint = {
  id: 'inter-tested-library',
  title: 'A Component Library You Can Defend in Review',
  tagline: 'Six components, generic props, tests that survive a refactor, and a keyboard that works.',
  realWorldAnalog: 'The internal design-system package at any mid-size company',
  track: 'product',
  tier: 'foundation',
  difficulty: 'Intermediate',
  estimatedBuildTimeHours: 9,
  architecturePattern: 'Headless behaviour hooks + presentational components',
  prerequisites: ['basic-routed-app'],
  summary:
    'Build Button, Dialog, Combobox, Tabs, Toast and DataList as a properly typed package with tests. The discriminating skill is not writing them — it is writing tests that fail when the behaviour breaks and pass when the markup is refactored, and typing a polymorphic component without reaching for any.',
  tags: ['TypeScript', 'Testing', 'Accessibility', 'Composition', 'Intermediate'],
  xpBounty: 340,
  coreScopeBoundaries: {
    inScopeMinimal: [
      'Six components split into a behaviour hook and a presentational shell.',
      'Generic and polymorphic props typed without any, including an `as` prop.',
      'Tests written against role and accessible name, never against class names.',
      'Full keyboard support per the WAI-ARIA authoring practices for each pattern.',
    ],
    outOfScopeBloat: [
      'Theming systems and token pipelines.',
      'Storybook, visual regression, or a docs site.',
      'Publishing and semantic-release automation.',
    ],
  },
  stages: [
    {
      stageNumber: 1,
      stageName: 'Components that pass their own tests',
      focus: 'any-typed props and tests bound to implementation details',
      codeSnippet: `type Props = { as?: any; onSelect?: (v: any) => void; [k: string]: any };\n\ntest('opens', () => {\n  const { container } = render(<Dialog />);\n  fireEvent.click(container.querySelector('.btn-primary'));   // class name\n  expect(container.querySelector('.dialog-open')).toBeTruthy();\n});`,
      failureModeOrInvariant:
        'Renaming .btn-primary breaks a test that has nothing to do with the change, so the suite gets ignored. Meanwhile the dialog is a div with no role, no focus trap and no Escape handler — and every test passes.',
      architecturalLesson:
        'A test coupled to markup measures the markup. A test coupled to role and accessible name measures what a user — and a screen reader — can actually do.',
    },
    {
      stageNumber: 2,
      stageName: 'Behaviour extracted, contracts typed',
      focus: 'Headless hooks, discriminated props, role-based queries',
      codeSnippet: `type ButtonProps<T extends ElementType = 'button'> = {\n  as?: T; variant: 'primary' | 'ghost';\n} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant'>;\n\n// behaviour lives in a hook; markup is replaceable\nconst { triggerProps, panelProps } = useDisclosure();\n\ntest('dialog traps focus and closes on Escape', async () => {\n  render(<Dialog />);\n  await user.click(screen.getByRole('button', { name: /settings/i }));\n  expect(screen.getByRole('dialog')).toHaveFocus();\n  await user.keyboard('{Escape}');\n  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();\n});`,
      failureModeOrInvariant:
        'The test now fails if focus is not moved into the dialog or Escape stops working, and survives a full CSS rewrite. Polymorphic props are inferred, so <Button as="a" href=...> type-checks and <Button as="a" type="submit"> does not.',
      architecturalLesson:
        'Separating behaviour from presentation is what makes both testable in isolation — and it is the same reason headless libraries exist.',
    },
    {
      stageNumber: 3,
      stageName: 'The boundaries',
      focus: 'Mocking the network, not the module under test',
      codeSnippet: `// Mock the transport, not your own code\nconst server = setupServer(\n  http.get('/api/items', () => HttpResponse.json([{ id: 1 }])),\n);\n\ntest('shows empty state', async () => {\n  server.use(http.get('/api/items', () => HttpResponse.json([])));\n  render(<DataList />);\n  expect(await screen.findByText(/nothing here/i)).toBeInTheDocument();\n});`,
      failureModeOrInvariant:
        'Mocking the component’s own fetch wrapper makes the test pass even when the real request shape is wrong. Intercepting at the network boundary tests the code that will actually run in production.',
      architecturalLesson:
        'Mock at a boundary you do not own. Everything inside the boundary should be exercised for real, or the test is checking your mock.',
    },
  ],
  deliverables: [
    { id: 'Behaviour layer', title: 'Behaviour layer', spec: 'Headless hooks — useDisclosure, useRovingFocus, useCombobox, useToastQueue — that return prop getters and render no DOM.' },
    { id: 'Dialog', title: 'Dialog', spec: 'A dialog rendering through a portal that moves focus in, traps it, restores it on close and responds to Escape, asserted by test.' },
    { id: 'Combobox', title: 'Combobox', spec: 'A combobox with async options, cancellation of superseded searches, type-ahead and a popover anchored to its trigger that escapes an overflow-hidden ancestor.' },
    { id: 'DataList', title: 'DataList', spec: 'A virtualised data list with grid column tracks, end-aligned numeric columns and a declared list size so screen readers still announce position.' },
    { id: 'Prop getters', title: 'Prop getters', spec: 'Prop getters that merge a consumer handler without dropping it, preserving the consumer receiver and call order.' },
    { id: 'Boundary', title: 'Boundary', spec: 'A class error boundary keeping a consumer render failure from escaping the library.' },
    { id: 'Form components', title: 'Form components', spec: 'Field components that participate in native form submission and validation, with the submit button reading pending via useFormStatus.' },
    { id: 'Docs', title: 'Docs', spec: 'A routed documentation site whose Link delegates to the host router rather than hardcoding one.' },
    { id: 'Polymorphism', title: 'Polymorphism', spec: 'An `as` prop typed with generics and ComponentPropsWithoutRef, where <Button as="a" href> compiles and <Button as="a" type="submit"> does not.' },
    { id: 'Props', title: 'Props', spec: 'Variant props as discriminated unions; no exported type contains any.' },
    { id: 'Package', title: 'Package', spec: 'Per-component entry points, so importing Button does not pull in Dialog — proven by the analyser.' },
    { id: 'Every component', title: 'Every component', spec: 'Native elements used wherever one exists, with hover, focus-visible, active, disabled and invalid specified for each.' },
    { id: 'Toast queue', title: 'Toast queue', spec: 'A toast queue as a reducer with dedupe and expiry, fanning out from one dispatcher to many subscribers.' },
    { id: 'Demo app', title: 'Demo app', spec: 'A demo application wiring the library into an RTK store, proving the components stay presentational.' },
    { id: 'Token layer', title: 'Token layer', spec: 'Every colour, space and radius as a custom property, in cascade layers so a consumer stylesheet always wins.' },
    { id: 'Button', title: 'Button', spec: 'Icon-and-label alignment solved once as a flex row and reused by every component.' },
    { id: 'Toolbar', title: 'Toolbar', spec: 'Leading and trailing action groups separated by auto margins, with no spacer element.' },
    { id: 'Field', title: 'Field', spec: 'Label, control, hint and error placed on named grid areas so every field lays out identically.' },
    { id: 'Avatar', title: 'Avatar', spec: 'An avatar sized with aspect-ratio and logical properties so it mirrors correctly under direction: rtl.' },
  ],
  layers: [
    {
      layer: 'Behaviour',
      components: ['useDisclosure', 'useRovingFocus', 'useCombobox', 'useToastQueue'],
      invariants: ['No hook renders DOM; each returns prop getters.'],
    },
    {
      layer: 'Presentation',
      components: ['Button', 'Dialog', 'Combobox', 'Tabs', 'Toast', 'DataList'],
      invariants: ['Every interactive element is reachable and operable by keyboard alone.'],
    },
    {
      layer: 'Contracts',
      components: ['polymorphic prop types', 'discriminated variant unions'],
      invariants: ['No `any` in any exported type.'],
    },
  ],
  explicitTopics: [
    {
      category: 'Testing',
      topic: 'Practice',
      subtopic: 'Testing Library, what to test, mocking and end-to-end',
      howCovered: 'Class-name tests are rewritten as role-and-name tests, and the network is mocked at the boundary with MSW.',
      conceptIds: ['testing-react'],
    },
    {
      category: 'TypeScript',
      topic: 'Types',
      subtopic: 'Narrowing, generics and typing React props',
      howCovered: 'A polymorphic `as` prop is typed with generics and ComponentPropsWithoutRef, with no escape to any.',
      conceptIds: ['ts-essentials'],
    },
    {
      category: 'Accessibility',
      topic: 'Foundations',
      subtopic: 'ARIA, keyboard navigation and focus management',
      howCovered: 'Each component implements its WAI-ARIA authoring-practices keyboard contract, asserted in tests.',
      conceptIds: ['a11y-core'],
    },
    {
      category: 'React Advanced',
      topic: 'Patterns',
      subtopic: 'Compound components, render props and prop getters',
      howCovered: 'Tabs and Combobox are compound components sharing implicit state through context.',
      conceptIds: ['react-composition', 'react-hooks-rest'],
    },
  ],
  implicitFoundations: [
    {
      domain: 'DOM & Browser Pipeline',
      title: 'The accessibility tree',
      mechanism: 'Roles and accessible names are computed from markup and ARIA into a parallel tree.',
      realWorldImpact: 'Querying by role in tests is querying the same structure assistive technology uses.',
      conceptIds: ['a11y-core', 'html-semantics'],
    },
    {
      domain: 'Tooling & Build',
      title: 'Type erasure',
      mechanism: 'TypeScript types vanish at runtime; only the emitted JavaScript executes.',
      realWorldImpact: 'Explains why external input still needs runtime validation despite a typed signature.',
      conceptIds: ['ts-essentials'],
    },
  ],
  frameworkVsManual: {
    frameworkHandled: ['Testing Library queries', 'MSW request interception'],
    manualEngineeringRequired: [
      'Every keyboard interaction contract.',
      'Polymorphic prop typing without any.',
    ],
  },
};
