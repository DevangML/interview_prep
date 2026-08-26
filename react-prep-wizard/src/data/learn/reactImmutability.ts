import type { LearnTopic } from './types';

/** Why React demands immutability, and the exact syntax for every update shape. */
export const reactImmutabilityTopics: LearnTopic[] = [
  {
    id: 'react-immutability',
    area: 'React Core',
    group: 'State',
    title: 'Immutability in React — mutating vs copying methods',
    status: 'partial',
    minutes: 8,
    summary:
      'React decides whether to re-render by comparing references with `Object.is`. Mutating state in place leaves the reference identical, so the update is invisible. This is the single most consequential JavaScript fact in React.',
    body: [
      'When you call a setter, React compares the new value with the old using `Object.is`. `items.push(x)` returns a length and leaves `items` pointing at the same array — same reference, so React bails out and nothing renders. The data changed; the identity did not. `setItems([...items, x])` creates a new array, a new reference, and a render.',
      'The same logic drives `React.memo`, `useMemo`, `useCallback` and hook dependency arrays — all shallow reference comparisons. This is why "I mutated state and the UI did not update" and "I added memo and it still re-renders" are the same problem seen from opposite ends.',
      '**Array methods that mutate** (never use directly on state): `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`. **Methods that return a new array** (safe): `map`, `filter`, `slice`, `concat`, `flat`, `flatMap`, `toSorted`, `toReversed`, `toSpliced`, `with`. Spread is safe. The trap is `sort` and `reverse`, which look harmless and reorder your state array in place — always copy first: `[...items].sort()`.',
      '**Objects**: spread for a shallow update, `Object.assign({}, obj, changes)` for the same thing in older code. Nested updates require copying every level on the path to the change — this is the "spread staircase" that makes deep state unpleasant and is a good reason to keep state flat, or to use Immer (`produce`), which lets you write mutating syntax and produces an immutable result.',
      'Two subtleties. `useState` with an object gives you no automatic merging — unlike the old `this.setState`, you must spread the previous state yourself. And when the new value derives from the old, use the functional updater so you are copying the *pending* value rather than a stale closure: `setItems(prev => [...prev, x])`.',
    ],
    keyPoints: [
      '`sort`, `reverse` and `splice` mutate. `toSorted`, `toReversed`, `toSpliced` and `with` do not.',
      'Same reference ⇒ no re-render. That is `Object.is`, not React being clever.',
      'Nested updates must copy every level on the path to the change.',
      '`useState` never merges objects for you — spread the previous value yourself.',
    ],
    interview:
      '"Why can\'t I push to state?" is the entry-level version; "why did my memoised child re-render anyway" is the senior one. Both answers are reference identity. Being able to write the nested update by hand — and then say "or Immer" — is the complete answer.',
    pitfalls: [
      '`items.sort()` inside a render or handler — mutates state and produces no update.',
      'Mutating a nested object inside an otherwise-spread copy: `{...state}` is shallow, so `copy.user.name = x` edits the original.',
    ],
    code: `// arrays
setItems(prev => [...prev, item]);                       // add
setItems(prev => prev.filter(i => i.id !== id));         // remove
setItems(prev => prev.map(i =>                            // update one
  i.id === id ? { ...i, done: !i.done } : i));
setItems(prev => [...prev].sort(byName));                 // sort — copy first
setItems(prev => prev.toSorted(byName));                  // ES2023 equivalent

// objects, including nested
setUser(prev => ({ ...prev, name }));                     // shallow
setUser(prev => ({                                        // nested: copy the path
  ...prev,
  address: { ...prev.address, city },
}));`,
    resources: [
      { label: 'React — Updating arrays in state', url: 'https://react.dev/learn/updating-arrays-in-state', kind: 'docs', note: 'Includes the mutating/non-mutating table. Bookmark it.' },
      { label: 'React — Updating objects in state', url: 'https://react.dev/learn/updating-objects-in-state', kind: 'docs' },
      { label: 'Immer — produce', url: 'https://immerjs.github.io/immer/', kind: 'docs', note: 'Write mutating syntax, get an immutable result. Built into Redux Toolkit.' },
      { label: 'MDN — Array (mutation noted per method)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', kind: 'docs' },
    ],
  },
  {
    id: 'react-references-copying',
    area: 'JavaScript',
    group: 'Data',
    title: 'Object references, shallow copies and deep cloning',
    status: 'covered',
    minutes: 6,
    summary:
      'Assignment copies the reference, not the object. Every aliasing bug, every failed re-render and every "I changed the copy and the original changed too" traces here.',
    body: [
      'Primitives are copied by value: `let a = 1; let b = a; b = 2` leaves `a` at 1. Objects are copied by **reference**: `const b = a` gives two names for one object in the heap, so `b.x = 9` is visible through `a`. Function arguments follow the same rule — passing an object passes the reference, so a function can mutate the caller\'s object.',
      '`{...obj}` and `Object.assign({}, obj)` are **shallow**: the top-level keys are new, but any nested object is still the same shared reference. This is the most common copying bug in React — you spread state, feel safe, then mutate `copy.address.city` and change the original.',
      '`structuredClone(obj)` is the platform deep clone. It handles nested objects, arrays, `Date`, `Map`, `Set`, `RegExp`, `ArrayBuffer` and **circular references**. It cannot clone functions, DOM nodes, or class identity (you get a plain object back), and it throws on anything non-cloneable.',
      '`JSON.parse(JSON.stringify(obj))` is the old idiom and it is lossy: `undefined` values and functions vanish, `Date` becomes a string, `NaN` and `Infinity` become `null`, `Map`/`Set` become `{}`, and a circular reference throws. Know it, and know why `structuredClone` replaced it.',
      'Equality follows the same rule: `{a:1} === {a:1}` is `false` because they are two objects. Comparing structures requires deep equality — `JSON.stringify` comparison for simple data (order-sensitive, so fragile), or a library such as `fast-deep-equal`. This is exactly why React compares references and asks you to create new ones, rather than deep-comparing on every render.',
    ],
    keyPoints: [
      'Assignment copies the reference; two names, one object.',
      'Spread and `Object.assign` are shallow — nested objects stay shared.',
      '`structuredClone` handles Dates, Maps, Sets and cycles; JSON round-tripping destroys them.',
      '`{a:1} === {a:1}` is false — deep equality needs a deep comparison.',
    ],
    interview:
      'The canonical snippet: spread an object with a nested object, mutate the nested value, ask what the original shows. Answer, name shallow copy, offer `structuredClone`, then connect it to React — "and this is why mutating nested state produces no re-render".',
    code: `const a = { x: 1, nested: { y: 2 } };
const b = { ...a };
b.nested.y = 99;
a.nested.y;                  // 99 — the nested object was never copied

const c = structuredClone(a);
c.nested.y = 7;
a.nested.y;                  // 99 — genuinely independent

JSON.parse(JSON.stringify({ d: new Date(), u: undefined }));
// { d: "2026-08-25T…" }  ← Date became a string, undefined key vanished`,
    resources: [
      { label: 'MDN — structuredClone', url: 'https://developer.mozilla.org/en-US/docs/Web/API/structuredClone', kind: 'docs' },
      { label: 'MDN — Object.assign', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign', kind: 'docs' },
      { label: 'MDN — Shallow copy', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy', kind: 'docs' },
    ],
  },
];
