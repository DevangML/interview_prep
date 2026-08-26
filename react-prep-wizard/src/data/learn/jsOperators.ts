import type { LearnTopic } from './types';

/** Which comparison or defaulting operator to reach for, and exactly why. */
export const jsOperatorTopics: LearnTopic[] = [
  {
    id: 'js-equality-matrix',
    area: 'JavaScript',
    group: 'Values',
    title: 'Sameness: `==`, `===`, `Object.is`, `NaN`, `+0`/`-0`',
    status: 'partial',
    minutes: 7,
    summary:
      'JavaScript has four different notions of "the same", and React uses the one most people have never read about. Knowing which is which decides both interview answers and re-render behaviour.',
    body: [
      'The four algorithms, from loosest to strictest. **Loose equality (`==`)** coerces before comparing. **Strict equality (`===`)** compares type first and never coerces — but treats `NaN` as unequal to itself and `+0` as equal to `-0`. **SameValueZero** is `===` except that `NaN` equals `NaN`; it is what `Array.prototype.includes`, `Map` keys and `Set` membership use. **SameValue** (`Object.is`) is SameValueZero except that `+0` and `-0` are *different*.',
      'That gives a table worth memorising. `NaN === NaN` → false. `[NaN].includes(NaN)` → **true** (SameValueZero). `[NaN].indexOf(NaN)` → **-1** (indexOf uses `===`). `Object.is(NaN, NaN)` → true. `0 === -0` → true. `Object.is(0, -0)` → **false**. `new Set([NaN, NaN]).size` → **1**.',
      '**React compares with `Object.is`** — for state bail-outs, `memo` props, hook dependencies and context values. This is not academic: it is why setting state to a value that is already there skips the render, and why `-0` and `+0` would be treated as a change. Every "why did my component re-render" question resolves to an `Object.is` comparison of references.',
      'Loose equality has exactly one defensible use: `x == null` is a concise test for "null **or** undefined" and is widely accepted. Everywhere else, `===` avoids the coercion table entirely. The coercion rules worth knowing anyway: `null == undefined` is true and neither equals anything else, a boolean is converted to a number **first**, and an object is converted to a primitive via `Symbol.toPrimitive` → `valueOf` → `toString`.',
      'Detecting `NaN`: use `Number.isNaN(x)`, never the global `isNaN(x)`. The global coerces first, so `isNaN("hello")` is `true` — which is almost never what you meant. Similarly prefer `Number.isInteger` and `Number.isFinite` over their global namesakes.',
    ],
    keyPoints: [
      'Four sameness algorithms: `==`, `===`, SameValueZero (`includes`, `Set`, `Map`), SameValue (`Object.is`).',
      '`includes` finds `NaN`; `indexOf` cannot.',
      'React uses `Object.is` — that is the rule behind every re-render question.',
      '`Number.isNaN` never coerces; the global `isNaN` does.',
    ],
    interview:
      'Asked as a rapid-fire volley: `NaN === NaN`, `Object.is(0,-0)`, `[NaN].includes(NaN)`. Answer each, then say the algorithm name — "SameValueZero, which is why `includes` and `Set` behave differently from `indexOf`".',
    code: `NaN === NaN                 // false
Object.is(NaN, NaN)         // true
[NaN].includes(NaN)         // true   ← SameValueZero
[NaN].indexOf(NaN)          // -1     ← uses ===
0 === -0                    // true
Object.is(0, -0)            // false
new Set([NaN, NaN]).size    // 1
isNaN('hello')              // true   ← coerces first, almost never wanted
Number.isNaN('hello')       // false  ← correct`,
    resources: [
      { label: 'MDN — Equality comparisons and sameness', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness', kind: 'docs', note: 'The comparison table on this page is the entire topic.' },
      { label: 'MDN — Object.is', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is', kind: 'docs' },
      { label: 'MDN — Number.isNaN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN', kind: 'docs' },
    ],
  },
  {
    id: 'js-defaulting-operators',
    area: 'JavaScript',
    group: 'Values',
    title: 'Handling undefined: `??`, `||`, `?.`, `??=`, default parameters',
    status: 'missing',
    minutes: 6,
    summary:
      'Five ways to say "if this is missing, use that" — and they disagree about what counts as missing. Choosing the wrong one is a real bug with `0` and `""`.',
    body: [
      '`||` falls back on **any falsy** value, so `count || 10` turns a legitimate `0` into `10`, and `name || "Anonymous"` turns a deliberate empty string into "Anonymous". `??` (nullish coalescing) falls back only on `null` and `undefined`, leaving `0`, `""` and `false` intact. For numeric and boolean props, `??` is almost always the correct operator.',
      '`?.` (optional chaining) short-circuits to `undefined` instead of throwing when the left side is `null` or `undefined`: `user?.address?.city`. It has a call form, `fn?.()`, which invokes only if `fn` exists, and an index form, `arr?.[0]`. Note it stops at the first nullish link and returns `undefined` — it does not skip the rest of a chain silently in some other way.',
      'Do not over-apply it. `a?.b.c` guards only `a`; if `b` is missing it still throws. And using `?.` everywhere hides genuine data-shape bugs behind a silent `undefined` — the value of a crash is that it tells you the contract was violated.',
      'The logical assignment operators are the compact forms: `x ??= v` assigns only when `x` is nullish, `x ||= v` when falsy, `x &&= v` when truthy. They short-circuit, so the right-hand side is not evaluated unless needed.',
      '**Default parameters** trigger on `undefined` only, never on `null`: `function f(a = 1)` called as `f(null)` gives `a === null`. The same rule governs destructuring defaults, which is why `const { b = 5 } = { b: null }` leaves `b` as `null`. One rule, three places — remember it once.',
    ],
    keyPoints: [
      '`||` catches all falsy; `??` catches only null/undefined.',
      'Default parameters and destructuring defaults fire on `undefined` only — never `null`.',
      '`a?.b.c` guards `a` alone; the rest of the chain can still throw.',
      '`??=`, `||=`, `&&=` short-circuit — the right side is not evaluated unless needed.',
    ],
    interview:
      'A favourite snippet: a prop with a numeric default written with `||`, asked what happens when the value is `0`. Answer, then name `??` as the fix. In React this comes up as "why does my zero disappear".',
    code: `const count = 0;
count || 10        // 10  ← bug: a real zero was replaced
count ?? 10        // 0   ← correct

function f(a = 1) { return a; }
f(undefined)       // 1
f(null)            // null  ← defaults do not fire on null

const { b = 5 } = { b: null };   // b === null, same rule
user?.profile?.name ?? 'Anonymous';`,
    resources: [
      { label: 'MDN — Nullish coalescing operator', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing', kind: 'docs' },
      { label: 'MDN — Optional chaining', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining', kind: 'docs' },
      { label: 'MDN — Default parameters', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters', kind: 'docs' },
    ],
  },
];
