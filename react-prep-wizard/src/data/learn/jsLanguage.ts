import type { LearnTopic } from './types';

/** The language itself: values, scope, binding, prototypes. */
export const jsLanguageTopics: LearnTopic[] = [
  {
    id: 'js-types-coercion',
    area: 'JavaScript',
    group: 'Values',
    title: 'Types, coercion and equality',
    status: 'covered',
    minutes: 7,
    summary:
      'Seven primitives, one object type, and a coercion algorithm that produces the famous surprises. Interviewers use coercion questions as a proxy for whether you have read the language or merely used it.',
    body: [
      'Primitives: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null`. Everything else — arrays, functions, dates, regexes — is an object. Primitives are compared by value and objects by reference, and that single distinction generates most of the puzzles.',
      '`===` compares type first and never coerces. `==` runs the abstract equality algorithm: `null == undefined` is `true` (and neither equals anything else), numbers and strings compare as numbers, booleans become numbers *before* anything else, and an object is converted to a primitive via `valueOf`/`toString`. That is why `[] == false` is `true`: `[]` → `""` → `0`, and `false` → `0`.',
      '`Object.is` differs from `===` in exactly two places: `Object.is(NaN, NaN)` is `true` and `Object.is(0, -0)` is `false`. React uses `Object.is` for its own comparisons, which is why understanding it is not academic — it is the rule that decides whether your component re-renders.',
      'Falsy values are a closed set worth memorising: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. **Everything else is truthy** — including `[]`, `{}`, `"0"` and `"false"`. This is why `[] == false` (coercion) and `if ([])` (truthiness) give apparently opposite answers; they are different algorithms.',
      '`??` differs from `||` by triggering only on `null`/`undefined`, not on all falsy values. `count || 10` turns a legitimate `0` into `10`; `count ?? 10` does not. In React props with numeric defaults this is a real bug, not a style preference.',
    ],
    keyPoints: [
      'Primitives compare by value; objects compare by reference.',
      '`Object.is` = `===` except `NaN` equals itself and `+0 !== -0`. React uses it.',
      'Eight falsy values. Everything else, including `[]` and `{}`, is truthy.',
      '`??` guards only null/undefined; `||` swallows `0` and `""`.',
    ],
    interview:
      'Output-prediction items dominate: `[] == false`, `NaN === NaN`, `0.1 + 0.2 === 0.3`, `typeof null`. Answer the value, then name the rule — "false, because `typeof null` is a historical bug preserved for compatibility" scores far better than "object".',
    code: `[] == false        // true  — [] → "" → 0, false → 0
[] === false       // false — different types, no coercion
!![]               // true  — every object is truthy
NaN === NaN        // false
Object.is(NaN,NaN) // true
0 || 10            // 10  ← swallows a legitimate zero
0 ?? 10            // 0   ← correct default handling`,
    resources: [
      { label: 'MDN — Equality comparisons and sameness', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness', kind: 'docs', note: 'The table comparing ==, ===, Object.is is the whole topic on one page.' },
      { label: 'You Don\'t Know JS — Types & Grammar', url: 'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/types-grammar', kind: 'book' },
    ],
  },
  {
    id: 'js-scope-closures',
    area: 'JavaScript',
    group: 'Execution',
    title: 'Scope, hoisting, TDZ and closures',
    status: 'covered',
    minutes: 8,
    summary:
      'Closures are the mechanism behind hooks, event handlers, module privacy and the loop puzzle every interviewer owns. If you understand closures, half of React stops being mysterious.',
    body: [
      'A **closure** is a function together with the variable environment it was created in. It captures **bindings, not values** — this is the sentence that resolves the classic loop question. `var` is function-scoped, so a `for` loop creates one binding shared by every iteration; by the time the timers fire, that binding holds the final value. `let` creates a fresh binding per iteration, so each closure captures its own.',
      '**Hoisting** is not "declarations move to the top" so much as "declarations are processed before execution". `var` declarations are initialised to `undefined`; `function` declarations are fully available; `let`/`const`/`class` are declared but **uninitialised**, and reading them before the declaration throws — that window is the **Temporal Dead Zone**.',
      'Closures are how privacy works without classes: variables in an enclosing function are unreachable from outside, and only the returned functions can touch them. This is the module pattern, and it is why `useState` can hold state that no other component can reach.',
      'The React connection is direct: every render creates new closures over that render\'s props and state. An effect or callback captures the values **from the render it was created in**. A stale closure — a `setInterval` set up once with `[]` deps, reading a `count` frozen at 0 — is the single most common React bug, and it is a closure bug, not a React bug.',
    ],
    keyPoints: [
      'Closures capture bindings, not values.',
      '`var` is function-scoped; `let`/`const` are block-scoped with a TDZ.',
      'Every React render makes new closures — stale closures are captured old renders.',
      'The functional updater `setCount(c => c + 1)` exists precisely to escape a stale closure.',
    ],
    interview:
      'The `for (var i…) setTimeout` question appears in almost every JavaScript screen. Give the output, name `var` vs `let` binding, then offer the pre-ES6 fix (an IIFE per iteration) — that last part signals you know why `let` was added.',
    code: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 3 3 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j)); // 0 1 2

// Pre-ES6 fix: a new scope per iteration
for (var k = 0; k < 3; k++) {
  (function (captured) { setTimeout(() => console.log(captured)); })(k);
}`,
    resources: [
      { label: 'MDN — Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', kind: 'docs' },
      { label: 'You Don\'t Know JS — Scope & Closures', url: 'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures', kind: 'book', note: 'The definitive treatment; chapters 5–7 are the interview material.' },
      { label: 'Dan Abramov — A complete guide to useEffect', url: 'https://overreacted.io/a-complete-guide-to-useeffect/', kind: 'article', note: 'Really an essay about closures wearing a React hat. Read it twice.' },
    ],
  },
  {
    id: 'js-this',
    area: 'JavaScript',
    group: 'Execution',
    title: '`this`, call/apply/bind and arrow functions',
    status: 'covered',
    minutes: 6,
    summary:
      '`this` is decided at the call site, not where the function was written — with one exception that swallows the rule. Four binding rules, in strict precedence order.',
    body: [
      'The rules, highest precedence first. **1 — `new`**: `this` is the freshly created object. **2 — explicit binding**: `call`, `apply` or `bind` set it directly. **3 — implicit binding**: called as `obj.method()`, `this` is `obj`. **4 — default**: `undefined` in strict mode and modules, the global object in sloppy mode.',
      'Detaching a method loses the receiver: `const f = obj.get; f()` falls to the default rule, which is why `this.n` becomes an error or `undefined`. This is the original reason React class components needed `this.handleClick = this.handleClick.bind(this)` in the constructor.',
      '**Arrow functions have no `this` of their own.** They close over the enclosing lexical scope, which makes them perfect for callbacks inside methods and wrong for object methods and prototype methods. An arrow as an object method sees the module scope, not the object.',
      '`call(thisArg, a, b)` and `apply(thisArg, [a, b])` invoke immediately and differ only in how arguments are passed; `bind` returns a new permanently-bound function and is not undone by a later `call`. Arrow functions ignore all three for `this`.',
    ],
    keyPoints: [
      '`this` is determined by the call site, except in arrows, where it is determined by the definition site.',
      'Precedence: `new` > explicit (`bind`/`call`/`apply`) > implicit (`obj.fn()`) > default.',
      'Never use an arrow for an object or prototype method that needs `this`.',
      '`bind` is permanent; a later `call` cannot override it.',
    ],
    interview:
      'Usually a snippet: an object with both a shorthand method and an arrow "method", asked what each logs. Answer both, then explain that the arrow captured the enclosing scope. Class fields (`handleClick = () => {}`) are the modern fix and worth mentioning.',
    code: `const o = {
  n: 1,
  regular() { return this.n; },
  arrow: () => this?.n,
};
o.regular();          // 1
o.arrow();            // undefined — arrow has no own \`this\`
const f = o.regular;
f();                  // undefined (strict) — receiver lost
f.call(o);            // 1`,
    resources: [
      { label: 'MDN — this', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this', kind: 'docs' },
      { label: 'MDN — Function.prototype.bind', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind', kind: 'docs' },
    ],
  },
  {
    id: 'js-prototypes',
    area: 'JavaScript',
    group: 'Objects',
    title: 'Prototypes, the prototype chain and classes',
    status: 'missing',
    minutes: 7,
    summary:
      'JavaScript inherits through a chain of objects, not through classes. `class` is syntax over that chain — and interviewers ask precisely to see whether you know it is syntax.',
    body: [
      'Every object has an internal link to another object, its **prototype**, reachable as `Object.getPrototypeOf(obj)` (the legacy accessor is `__proto__`). A property lookup walks that chain until it finds the key or reaches `null`. That walk is the entire inheritance mechanism.',
      'A function\'s `.prototype` property is **not** the function\'s own prototype. It is the object that will become the prototype of instances made with `new`. This naming is genuinely confusing and is exactly what the question "difference between `__proto__` and `prototype`" is testing.',
      '`class` is syntactic sugar: methods land on `Class.prototype` and are therefore shared by all instances, while fields declared in the body or assigned in the constructor are per-instance. `extends` wires the chain; `super()` must be called before `this` is usable in a derived constructor.',
      'Practical consequences worth stating: `hasOwnProperty` distinguishes own properties from inherited ones (and `Object.hasOwn(obj, key)` is the modern, safer form). `for…in` walks inherited enumerable keys — usually not what you want; `Object.keys` sticks to own keys. Adding to a built-in prototype (`Array.prototype.foo = …`) is "monkey patching" and is discouraged because it pollutes every array in the program.',
      'Static methods live on the constructor, not the prototype, so they are inherited by subclasses through the constructor chain — which is why `this.constructor.staticMethod()` resolves to the subclass override.',
    ],
    keyPoints: [
      '`obj.__proto__` is what an object inherits *from*; `Fn.prototype` is what `new Fn()` instances will inherit from.',
      'Class methods are shared on the prototype; class fields are per-instance.',
      '`Object.hasOwn(obj, k)` is the modern replacement for `obj.hasOwnProperty(k)`.',
      '`for…in` includes inherited enumerable keys; `Object.keys` does not.',
    ],
    interview:
      '"Explain prototypal inheritance" and "is `class` real inheritance?" are both standard. Draw the chain: instance → `Fn.prototype` → `Object.prototype` → `null`. Mentioning that method lookup is a runtime walk explains both the flexibility and the cost.',
    code: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return this.name + ' makes a noise'; };

const dog = new Animal('Rex');
Object.getPrototypeOf(dog) === Animal.prototype; // true
dog.hasOwnProperty('speak');                      // false — it is inherited
Object.hasOwn(dog, 'name');                       // true  — own property`,
    resources: [
      { label: 'MDN — Inheritance and the prototype chain', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain', kind: 'docs' },
      { label: 'MDN — Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', kind: 'docs' },
    ],
  },
];
