// @ts-nocheck
/* Rapid-fire bank for Mettl OA & Technical Rounds.
   Focuses on core JS memory models, object copying, equality algorithms, and React 19 mechanics. */
export const RAPID = [
// ── Object References & Copying ──
{t:'mcq',topic:'Object Copying',q:'`const a = { x: 1, nested: { y: 2 } }; const b = { ...a }; b.nested.y = 99;` — what is `a.nested.y`?',
 a:['2','99','undefined','throws Error'],c:1,
 why:'Spread `{ ...a }` performs a SHALLOW copy. `a.nested` and `b.nested` reference the EXACT SAME object in heap memory.'},
{t:'mcq',topic:'Object Copying',q:'Which method produces a true deep clone of an object with nested Dates and circular structures?',
 a:['`Object.assign({}, obj)`','`JSON.parse(JSON.stringify(obj))`','`structuredClone(obj)`','`{ ...obj }`'],c:2,
 why:'`structuredClone()` handles nested objects, Arrays, Dates, Sets, Maps, and circular references. `JSON` serialization loses Dates, functions, and throws on circular refs.'},
{t:'mcq',topic:'Object Copying',q:'`JSON.parse(JSON.stringify({ a: undefined, b: () => {}, c: NaN, d: new Date() }))` produces:',
 a:['Exact clone of all fields','`{ c: null, d: "ISOString" }` (functions and undefined are omitted)','Throws TypeError','`{ a: null, b: null, c: NaN, d: Date }`'],c:1,
 why:'JSON.stringify skips `undefined` and functions, turns `NaN`/`Infinity` into `null`, and serializes `Date` to string.'},
{t:'mcq',topic:'Object Mutability',q:'`const user = Object.freeze({ name: "Dev", address: { city: "Pune" } }); user.address.city = "Mumbai";` — what happens?',
 a:['Throws error immediately','`user.address.city` becomes "Mumbai"','City remains "Pune"','`user.address` becomes undefined'],c:1,
 why:'`Object.freeze()` is SHALLOW. The top-level properties are frozen, but nested child objects remain fully mutable unless recursively deep-frozen.'},
{t:'mcq',topic:'Object Mutability',q:'What is the difference between `Object.freeze()` and `Object.seal()`?',
 a:['No difference','`seal()` allows modifying existing properties; `freeze()` makes all existing properties read-only','`freeze()` allows adding new properties','`seal()` deletes prototypes'],c:1,
 why:'`Object.seal()` prevents adding or removing properties, but existing writable properties can still be modified. `Object.freeze()` also prevents modifying existing values.'},

// ── Equality Comparisons & Sameness ──
{t:'mcq',topic:'Equality',q:'In JavaScript, `+0 === -0` and `Object.is(+0, -0)` evaluate to:',
 a:['true, true','true, false','false, true','false, false'],c:1,
 why:'`===` treats `+0` and `-0` as equal. `Object.is()` uses the SameValue algorithm and distinguishes between positive and negative zero.'},
{t:'mcq',topic:'Equality',q:'`[NaN].includes(NaN)` vs `[NaN].indexOf(NaN)` evaluates to:',
 a:['true, 0','true, -1','false, -1','false, 0'],c:1,
 why:'`includes()` uses SameValueZero and correctly finds `NaN`. `indexOf()` uses strict equality `===`, where `NaN === NaN` is false, returning -1.'},
{t:'mcq',topic:'Equality',q:'`[] == ![]` in JavaScript evaluates to:',
 a:['false','true','TypeError','undefined'],c:1,
 why:'`![]` coerces to boolean `false`. Then `[] == false` converts `[]` to primitive `""` and `false` to `0`, leading to `"" == 0` -> `0 == 0` -> true.'},
{t:'mcq',topic:'Equality',q:'Why does React state setter bail out when calling `setObj(obj)` with the same mutated object reference?',
 a:['React checks deep equality of all keys','React uses `Object.is(prev, next)` reference equality','React checks DOM attributes','React hashes the object'],c:1,
 why:'React uses `Object.is(prevState, nextState)`. If the reference has not changed, React bails out of rendering entirely.'},

// ── Execution Model & Closures ──
{t:'mcq',topic:'Closures',q:'`for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));` prints:',
 a:['0 1 2','3 3 3','0 0 0','2 2 2'],c:1,
 why:'`var` is function-scoped — one binding shared by all three closures, read after the loop ends at 3.'},
{t:'mcq',topic:'Closures',q:'Same loop with `let i` prints:',
 a:['0 1 2','3 3 3','0 0 0','ReferenceError'],c:0,
 why:'`let` creates a fresh lexical binding per iteration, so each closure captures its own i.'},
{t:'mcq',topic:'this',q:'`const o = { n: 1, get() { return this.n } }; const f = o.get; f();` gives:',
 a:['1','undefined','throws in strict mode','null'],c:2,
 why:'`this` is determined by the call site. Detached from `o`, `this` is undefined in strict mode/modules, so reading `.n` throws.'},

// ── Event Loop & Async ──
{t:'mcq',topic:'Event loop',q:'Order of: `console.log(1); setTimeout(()=>log(2)); Promise.resolve().then(()=>log(3)); log(4);`',
 a:['1 4 3 2','1 4 2 3','1 2 3 4','1 3 4 2'],c:0,
 why:'Sync first (1, 4), then all microtasks (3), then macrotasks (2). Microtasks drain completely before the next macrotask runs.'},
{t:'mcq',topic:'Event loop',q:'How does `AbortController` cancel an ongoing `fetch()` request?',
 a:['Kills the browser thread','Passes `{ signal: controller.signal }` to fetch and calls `controller.abort()`','Deletes the Promise','Closes the TCP socket synchronously'],c:1,
 why:'Passing `signal` connects fetch to the controller. Calling `abort()` immediately rejects the fetch promise with an AbortError.'},

// ── React Core & Hooks ──
{t:'mcq',topic:'React Hooks',q:'Why must React Hooks only be called at the top level of a component?',
 a:['Style rule','React tracks hooks by their execution index in an internal array','They are async','Hooks create global variables'],c:1,
 why:'React stores hook state in an internal linked list / array per Fiber. Conditional execution alters the call order index, corrupting state alignment.'},
{t:'mcq',topic:'useCallback',q:'What is the primary purpose of `useCallback(fn, deps)`?',
 a:['Execute fn asynchronously','Maintain stable function reference identity across re-renders','Cache computed return value','Prevent all re-renders'],c:1,
 why:'`useCallback` caches the function instance reference so memoized child components (`React.memo`) avoid unnecessary re-renders.'},
{t:'mcq',topic:'useRef',q:'Mutating `ref.current = value` triggers:',
 a:['Immediate re-render','Scheduled re-render','NO re-render','Re-render in next microtask'],c:2,
 why:'Refs are mutable containers stored outside the React render cycle, designed for DOM nodes, timers, and previous state tracking.'},

// ── CSS Architecture ──
{t:'mcq',topic:'Box model',q:'`width: 200px; padding: 20px; border: 5px solid;` with `box-sizing: border-box` has total width:',
 a:['250px','200px','240px','190px'],c:1,
 why:'`border-box` includes padding and borders inside the declared width. Total rendered width is exactly 200px.'},
{t:'mcq',topic:'Grid vs Flex',q:'When should you choose CSS Grid over CSS Flexbox?',
 a:['Always','When laying out items in 2 dimensions (rows AND columns simultaneously)','For 1D navigation bars','Only when using floats'],c:1,
 why:'Flexbox is 1-dimensional (row OR column). Grid is 2-dimensional (controlling rows and columns together from the parent).'},

// ── Interactive Code Snippets ──
{t:'snippet',topic:'Deep Equality',q:'Write `isDeepEqual(a, b)` for primitives, nested objects, and arrays.',
 start:'function isDeepEqual(a, b) {\n  // your code\n}\n',
 test:function(fn){
   var o1 = { x: 1, y: { z: [2, 3] } };
   var o2 = { x: 1, y: { z: [2, 3] } };
   var o3 = { x: 1, y: { z: [2, 4] } };
   return fn(o1, o2) === true && fn(o1, o3) === false && fn(NaN, NaN) === true;
 },
 sol:'function isDeepEqual(a, b) {\n  if (Object.is(a, b)) return true;\n  if (typeof a !== "object" || !a || typeof b !== "object" || !b) return false;\n  const keysA = Object.keys(a), keysB = Object.keys(b);\n  if (keysA.length !== keysB.length) return false;\n  for (const k of keysA) {\n    if (!keysB.includes(k) || !isDeepEqual(a[k], b[k])) return false;\n  }\n  return true;\n}',
 why:'Use `Object.is` for primitives (handling NaN), then recursively compare keys and nested property values.'},

{t:'snippet',topic:'Deep Clone',q:'Write `deepClone(obj)` supporting nested objects and arrays.',
 start:'function deepClone(obj) {\n  // your code\n}\n',
 test:function(fn){
   var src = { a: 1, b: { c: [2, 3] } };
   var copy = fn(src);
   copy.b.c.push(4);
   return src.b.c.length === 2 && copy.b.c.length === 3;
 },
 sol:'function deepClone(obj) {\n  if (typeof obj !== "object" || obj === null) return obj;\n  if (Array.isArray(obj)) return obj.map(deepClone);\n  const copy = {};\n  for (const [k, v] of Object.entries(obj)) copy[k] = deepClone(v);\n  return copy;\n}',
 why:'Primitives return directly; arrays and objects recursively instantiate fresh containers.'}
];
