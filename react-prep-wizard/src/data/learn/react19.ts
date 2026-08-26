import type { LearnTopic } from './types';

/** React 19 — named explicitly on the Mettl competency list. */
export const react19Topics: LearnTopic[] = [
  {
    id: 'r19-actions',
    area: 'React 19',
    group: 'Actions',
    title: 'Actions, `useActionState`, `useFormStatus`, `useOptimistic`',
    status: 'covered',
    minutes: 8,
    summary:
      'React 19 replaces manual loading/error/success triads with first-class Actions. State transitions, optimistic rollbacks, and automatic pending tracking collapse into streamlined hooks.',
    body: [
      '### 🚀 The Action Mental Model',
      'An **Action** is an async function passed to `<form action={fn}>` or to a form-aware hook. React tracks pending states, optimistic previews, and errors automatically.',
      '- **`useActionState(fn, initial)`**: Returns `[state, formAction, isPending]`. Manages submission lifecycle without three separate state flags.',
      '- **`useFormStatus()`**: Called from a child component inside the `<form>`. Reads `{ pending, data }` to auto-disable submit buttons without prop-drilling or context.',
      '- **`useOptimistic(state, updateFn)`**: Immediately projects optimistic state onto the UI and reverts automatically if the server action rejects.',
      '- **`startTransition(async () => ...)`**: React 19 supports async actions in transitions, keeping input fields responsive during heavy async mutations.',
    ],
    keyPoints: [
      '`useActionState` returns `[state, formAction, isPending]` — three things, one hook.',
      '`useFormStatus` comes from `react-dom` and only works inside the `<form>`.',
      '`useOptimistic` shows the expected value and reverts on failure automatically.',
      '`useFormState` (canary) was renamed `useActionState` and moved to `react`.',
    ],
    interview:
      'Expect "what is new in React 19" and name all four plus `use()`, the React Compiler, and ref-as-prop. Explain what problem each removes (loading flags, prop drilling, rollback state).',
    code: `function Newsletter() {
  const [state, formAction, isPending] = useActionState(
    async (_prev, formData) => subscribe(formData.get('email')),
    { ok: false },
  );
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <SubmitButton />           {/* reads pending itself */}
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();   // no props needed
  return <button disabled={pending}>{pending ? 'Sending…' : 'Subscribe'}</button>;
}`,
    resources: [
      { label: 'React — useActionState', url: 'https://react.dev/reference/react/useActionState', kind: 'docs' },
      { label: 'React — useFormStatus', url: 'https://react.dev/reference/react-dom/hooks/useFormStatus', kind: 'docs' },
      { label: 'React — useOptimistic', url: 'https://react.dev/reference/react/useOptimistic', kind: 'docs' },
      { label: 'React 19 release post', url: 'https://react.dev/blog/2024/12/05/react-19', kind: 'article' },
    ],
  },
  {
    id: 'r19-use-rsc',
    area: 'React 19',
    group: 'Server & rendering',
    title: '`use()`, Server Components, `createRoot` vs `hydrateRoot`',
    status: 'covered',
    minutes: 9,
    summary:
      'The rendering half of React 19: asynchronous resource reading with `use()`, zero-bundle-size React Server Components (RSC), and selective hydration protocols.',
    body: [
      '### ⚡ `use()` & Conditional Hook Invariant Exception',
      '**`use()`** reads a promise or context during render. It is the **only hook in React that may be called conditionally** (e.g. inside `if` blocks), because it is not backed by the internal fiber hook slot array.',
      '',
      '### 🌐 Server Components vs SSR Protocols',
      '**Server Components** execute exclusively on the server, shipping **zero JavaScript** to the browser. They stream a compact binary/JSON flight description that the client merges into its existing fiber tree.',
      '- `"use client"` marks the client boundary where state and interactivity live.',
      '- `"use server"` marks server action endpoints callable from client components.',
      '',
      '### 💧 `createRoot` vs `hydrateRoot`',
      '- **`createRoot(node).render(<App/>)`**: Generates DOM trees from scratch in client-only applications.',
      '- **`hydrateRoot(node, <App/>)`**: Adopts existing server-rendered HTML and attaches event listeners. Hydration mismatches occur from non-deterministic values (`Date.now()`, `Math.random()`, or `window` access during SSR).',
    ],
    keyPoints: [
      '`use()` is the one hook you may call conditionally; promises need a Suspense boundary.',
      'Server Components stream a Flight description, not raw HTML; zero client JS bundle cost.',
      '`hydrateRoot` attaches listeners to existing HTML; `createRoot` renders into empty DOM.',
      'React 19: `ref` as an ordinary prop, hoisted document metadata (<title>, <meta>), and callback ref cleanups.',
    ],
    interview:
      'Differentiate RSC from traditional SSR: "SSR renders HTML strings on initial page load for fast FCP. RSC is a continuous component architecture where server components execute on the server and stream flight payloads with zero client JS bundle cost."',
    code: `// Server Component — no JS shipped, can await directly
async function Profile({ id }) {
  const user = await db.user.find(id);      // runs on the server
  return <ClientAvatar user={user} />;       // interactivity crosses the boundary
}

// Client Component
'use client';
function ClientAvatar({ user }) {
  const [open, setOpen] = useState(false);   // state only exists here
  return <img src={user.avatar} onClick={() => setOpen(o => !o)} />;
}`,
    resources: [
      { label: 'React — use', url: 'https://react.dev/reference/react/use', kind: 'docs' },
      { label: 'React — Server Components', url: 'https://react.dev/reference/rsc/server-components', kind: 'docs' },
      { label: 'React — hydrateRoot', url: 'https://react.dev/reference/react-dom/client/hydrateRoot', kind: 'docs' },
    ],
  },
];
