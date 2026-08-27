import { jsPracticalUnits } from './tracks/jsPractical';
import { jsTrapsUnits } from './tracks/jsTraps';
import { ecosystemUnits } from './tracks/reactEcosystem';
import { behaviouralUnits } from './tracks/behavioural';
import { CHALLENGES } from './challenges';
import { CSS100 } from './css100';
import { LADDER_DATA } from './ladder';

export interface MasteryUnit {
  id: string;
  trackId: 'js_core' | 'css_layouts' | 'react_core' | 'react_practical' | 'async_apis' | 'js_traps' | 'react_ecosystem' | 'js_practical' | 'behavioural';
  trackName: string;
  title: string;
  level: 'Warm-up' | 'Core' | 'Advanced' | 'Crucible';
  category: string;
  xp: number;
  
  diagram?: any;
  hints?: string[];
  verify?: string;
  why?: string;
  takeaway?: string;
  /** Reference markup for the finished component. */
  reference?: string;
  /** Free-form skill labels, rendered as #chips. Present where the source data has them. */
  tags?: string[];
  /** Where this unit came from, so a repair can always be traced back. */
  sourceId?: string;
  theory: {
    hook: string;
    deepDive: string;
    interviewPitch: string;
    mcq?: {
      q: string;
      options: string[];
      correct: number;
      why: string;
    };
  };
  practice: {
    type: 'css' | 'jsx' | 'js_snippet';
    task: string;
    starterCode: string;
    solutionCode: string;
    baseHtml?: string;
    baseCss?: string;
    specs: string[];
  };
}

/** JSX to HTML for the sandbox: expands authored JSX and array .map expressions to valid HTML. */
function jsxToHtml(markup: string): string {
  if (!markup) return '';

  let html = markup
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '') // remove JSX comments
    .replace(/^\s*<>\s*|\s*<\/>\s*$/g, '') // remove fragments
    .trim();

  // Replace JSX .map expressions e.g. {[1,2,3,4,5,6].map(n => <span className="chip" key={n}>chip {n}</span>)}
  const mapRegex = /\{\s*(\[[^\]]+\])\.map\s*\(\s*(\w+)\s*=>\s*([\s\S]*?)\s*\)\s*\}/g;

  html = html.replace(mapRegex, (match, arrayStr, varName, template) => {
    try {
      const arr = JSON.parse(arrayStr.replace(/'/g, '"'));
      return arr.map((item: string | number) => {
        let itemHtml = template.trim();
        itemHtml = itemHtml.replace(/\s*key=\{[^}]+\}/g, '');
        itemHtml = itemHtml.replace(/className=\{\s*"([^"]*)"\s*\+\s*\w+\s*\}/g, (_m: string, prefix: string) => {
          return `class="${prefix}${item}"`;
        });
        itemHtml = itemHtml.replace(/className=/g, 'class=');
        itemHtml = itemHtml.replace(new RegExp(`\\{\\s*${varName}\\s*\\}`, 'g'), String(item));
        return itemHtml;
      }).join('\n      ');
    } catch {
      return match;
    }
  });

  html = html.replace(/className=/g, 'class=');

  return html;
}

/** Difficulty from the drill's own ID, not from its position in an array. */
function difficultyFromId(id: string): MasteryUnit['level'] {
  if (/^(BOX|PLC)-|^FLEX-0[12]/.test(id)) return 'Warm-up';
  if (/^(TRK|CQ|MIX|AREA|XTRA)-/.test(id)) return 'Advanced';
  return 'Core';
}

export const MASTERY_TRACKS = [
  { id: 'behavioural', name: 'Behavioural & HR', icon: '🎙️' },
  { id: 'js_core', name: 'JS Memory & Equality', icon: '⚡' },
  { id: 'js_practical', name: 'Vanilla JS Machine Coding', icon: '🛠️' },
  { id: 'js_traps', name: 'JS Traps & Execution', icon: '🪤' },
  { id: 'css_layouts', name: 'CSS 2D Layouts', icon: '🥋' },
  { id: 'react_core', name: 'React 19 Architecture', icon: '⚛️' },
  { id: 'react_practical', name: 'React Machine Coding', icon: '🏗️' },
  { id: 'react_ecosystem', name: 'Ecosystem (Redux/Router)', icon: '📦' },
  { id: 'async_apis', name: 'Async & REST APIs', icon: '🌐' },
] as const;

// We start with our hand-crafted, high-fidelity units
const coreUnits: MasteryUnit[] = [
  // --- JS CORE 1: PRIMITIVES VS REFERENCES ---
  {
    id: 'js-primitives-vs-references',
    trackId: 'js_core',
    trackName: 'JS Memory & Equality',
    title: 'Stack vs Heap: Primitives & References',
    level: 'Warm-up',
    category: 'Object Memory & Equalities',
    xp: 25,
    theory: {
      hook: 'Primitives are compared by value. Objects are compared by their memory address (pointer).',
      deepDive: 'When you assign `let a = 10; let b = a;`, a literal copy of 10 is made. But when you do `let a = {}; let b = a;`, only the pointer is copied. Mutating `b` will mutate `a` because they point to the identical heap address.',
      interviewPitch: '"Primitives are immutable values living on the call stack. Objects are mutable structures in the heap. In React, this is why we must never mutate an object in state directly—React compares pointers using Object.is, and if the pointer hasn\'t changed, it assumes the data hasn\'t changed, causing stale UI bugs."',
      mcq: {
        q: 'What is the output of `{} === {}`?',
        options: ['true', 'false', 'TypeError', 'undefined'],
        correct: 1,
        why: 'Each `{}` creates a new object in memory with a distinct pointer. Distinct pointers are never strictly equal.',
      },
    },
    practice: {
      type: 'js_snippet',
      task: 'Write code that proves primitives copy by value but objects copy by reference. Reassign the primitive copy (p2) and mutate the object copy property (obj2.val = 99), then assert or log the original values.',
      starterCode: `// 1. Primitives: copy by value
let p1 = 5;
let p2 = p1;
p2 = 10;
assert.equal(p1, 5, "p1 primitive is isolated");

// 2. Objects: copy by reference
let obj1 = { val: 10 };
let obj2 = obj1;
// TODO: Mutate obj2.val to 99
// obj2.val = 99;
// assert.equal(obj1.val, 99, "obj1.val mutated via obj2 reference");`,
      solutionCode: `let p1 = 5;
let p2 = p1;
p2 = 10;
assert.equal(p1, 5, "p1 primitive is isolated");

let obj1 = { val: 10 };
let obj2 = obj1;
obj2.val = 99;
assert.equal(obj1.val, 99, "obj1.val mutated via obj2 reference");`,
      specs: [
        'Asserts primitive isolation (p1 remains 5).',
        'Asserts object reference mutation (obj1.val becomes 99).',
      ],
    },
  },

  // --- JS CORE 2: SHALLOW VS DEEP COPYING ---
  {
    id: 'js-shallow-vs-deep',
    trackId: 'js_core',
    trackName: 'JS Memory & Equality',
    title: 'Shallow vs Deep Copying (The Nested Trap)',
    level: 'Core',
    category: 'Object Memory & Equalities',
    xp: 50,
    theory: {
      hook: 'Spread syntax `{...obj}` creates a shallow copy. It only clones the outermost shell.',
      deepDive: 'If you have an object with nested children, `const clone = { ...obj }` creates a new pointer for the root, but the nested children still share the exact same pointers as the original. If you mutate `clone.nested.x`, you mutate the original. To fix this, you must either spread nested levels too, or use `structuredClone()`.',
      interviewPitch: '"When building reducers or state updates, a shallow copy using spread is usually enough. But if the data structure is heavily nested, mutating a deep property on a shallow clone mutates the original state, breaking time-travel debugging and causing cross-component side effects. I reach for structuredClone for complex nested updates."',
      mcq: {
        q: 'What does structuredClone NOT copy?',
        options: ['Sets and Maps', 'Dates and RegExp', 'Functions and DOM Nodes', 'Nested Arrays'],
        correct: 2,
        why: 'Functions, DOM Nodes, and Error objects cannot be cloned by structuredClone and will throw a DataCloneError.',
      },
    },
    practice: {
      type: 'js_snippet',
      task: 'Use the spread operator to make a shallow copy of `user`. Then use `structuredClone` to make a deep copy. Mutate the nested `address.city` on both and observe the original.',
      starterCode: `const user = { name: "Alex", address: { city: "Paris" } };

// 1. Create a shallow copy using spread
const shallow = // ...
shallow.address.city = "London";
console.log("Original after shallow mutation:", user.address.city); // Oh no!

// 2. Reset user and create deep copy using structuredClone
const user2 = { name: "Sam", address: { city: "New York" } };
const deep = // ...
deep.address.city = "Tokyo";
console.log("Original after deep mutation:", user2.address.city); // Safe!`,
      solutionCode: `const user = { name: "Alex", address: { city: "Paris" } };

// 1. Create a shallow copy using spread
const shallow = { ...user };
shallow.address.city = "London";
console.log("Original after shallow mutation:", user.address.city); // London

// 2. Reset user and create deep copy using structuredClone
const user2 = { name: "Sam", address: { city: "New York" } };
const deep = structuredClone(user2);
deep.address.city = "Tokyo";
console.log("Original after deep mutation:", user2.address.city); // New York`,
      specs: [
        'Creates a shallow copy via spread.',
        'Creates a deep copy via structuredClone.',
        'Proves the original is mutated by shallow clone but protected by deep clone.',
      ],
    },
  },

  // --- JS CORE 3: THE 4 EQUALITIES ---
  {
    id: 'js-four-equalities',
    trackId: 'js_core',
    trackName: 'JS Memory & Equality',
    title: 'The 4 Equalities: Object.is & NaN',
    level: 'Advanced',
    category: 'Object Memory & Equalities',
    xp: 50,
    theory: {
      hook: 'JavaScript has 4 ways to compare equality. React relies heavily on `Object.is`.',
      deepDive: '1) `==` (Loose) coerces types.\n2) `===` (Strict) blocks coercion, but `NaN !== NaN` and `+0 === -0`.\n3) `Object.is` is like strict, but fixes math bugs: `Object.is(NaN, NaN)` is true, and `Object.is(+0, -0)` is false.\n4) `SameValueZero` is what Maps and Sets use under the hood.',
      interviewPitch: '"React\'s dependency arrays and useState bailouts use Object.is algorithm under the hood, not ===. This is why if you update a state variable from NaN to NaN, React will NOT re-render, whereas a strict equality check would think they are different and trigger a re-render."',
      mcq: {
        q: 'How does React compare dependencies in `useEffect`?',
        options: ['JSON.stringify', '==', '===', 'Object.is'],
        correct: 3,
        why: 'React uses Object.is polyfill (is() in the React source code) to prevent re-renders when setState is called with identical values, strictly handling NaN correctly.',
      },
    },
    practice: {
      type: 'js_snippet',
      task: 'Log the differences between `===` and `Object.is` for NaN and signed zeros.',
      starterCode: `// TODO: Console log the following comparisons:

// 1. NaN === NaN (Should be false)
// 2. Object.is(NaN, NaN) (Should be true)

// 3. +0 === -0 (Should be true)
// 4. Object.is(+0, -0) (Should be false)`,
      solutionCode: `console.log("NaN === NaN :", NaN === NaN);
console.log("Object.is(NaN, NaN) :", Object.is(NaN, NaN));

console.log("+0 === -0 :", +0 === -0);
console.log("Object.is(+0, -0) :", Object.is(+0, -0));`,
      specs: [
        'Logs NaN comparison using === and Object.is',
        'Logs signed zero comparison using === and Object.is',
      ],
    },
  },

  // --- JS CORE 4: THE EVENT LOOP ---
  {
    id: 'js-event-loop',
    trackId: 'js_core',
    trackName: 'JS Memory & Equality',
    title: 'Event Loop: Macrotasks vs Microtasks',
    level: 'Crucible',
    category: 'The Event Loop',
    xp: 100,
    theory: {
      hook: 'Promises resolve before SetTimeout. Microtasks beat Macrotasks.',
      deepDive: 'When synchronous code finishes, the JS engine checks the Microtask queue (Promises, MutationObserver). It drains the ENTIRE microtask queue until it is empty. ONLY THEN does it look at the Macrotask queue (setTimeout, setInterval, I/O, UI rendering).',
      interviewPitch: '"If an interviewer asks me to predict the output of nested setTimeouts and Promises, I isolate the queues. Synchronous code runs immediately. Promise .then() callbacks go to the Microtask queue which is drained exhaustively before the browser is allowed to render or process the Macrotask queue where setTimeout callbacks live."',
      mcq: {
        q: 'Which logs first? Promise.resolve().then(() => console.log(1)); setTimeout(() => console.log(2), 0);',
        options: ['1 then 2', '2 then 1', 'Unpredictable race condition', 'Throws an error'],
        correct: 0,
        why: 'Promise callbacks are microtasks. setTimeout callbacks are macrotasks. The microtask queue is always drained before the macrotask queue.',
      },
    },
    practice: {
      type: 'js_snippet',
      task: 'Write a script that logs "1", "2", "3", "4" in that exact order using console.log, setTimeout, and Promise.resolve. You must write them out of order in the code!',
      starterCode: `// Write code that executes out of order but logs 1, 2, 3, 4 sequentially.
// Hint: Use sync execution for 1 & 2, Microtask for 3, Macrotask for 4.

setTimeout(() => {
  // MACROTASK
}, 0);

Promise.resolve().then(() => {
  // MICROTASK
});

// SYNC`,
      solutionCode: `setTimeout(() => {
  console.log("4 (Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3 (Microtask)");
});

console.log("1 (Sync)");
console.log("2 (Sync)");`,
      specs: [
        'Demonstrates sync execution.',
        'Demonstrates Promise (Microtask) execution priority over setTimeout.',
      ],
    },
  },

  // --- REST APIS ---
  {
    id: 'rest-abort-controller',
    trackId: 'async_apis',
    trackName: 'Async & REST APIs',
    title: 'Canceling REST API Requests with AbortController',
    level: 'Advanced',
    category: 'REST & Fetch API',
    xp: 75,
    theory: {
      hook: 'When a component unmounts or a user types rapidly in a search box, lingering network requests cause race conditions and memory leaks.',
      deepDive: '`fetch()` takes an `abort` signal. The `AbortController` exposes a `.signal` to pass to fetch, and a `.abort()` method to immediately terminate the request. In React, you call `abort()` in the `useEffect` cleanup function to guarantee the request dies if the component unmounts or the effect re-runs.',
      interviewPitch: '"If an interviewer asks how to handle search debouncing or rapid navigation, I emphasize AbortController. Debouncing delays the start, but AbortController cancels the in-flight network request, freeing up the browser\'s connection pool and preventing stale data from overwriting fresh data if responses return out of order."',
      mcq: {
        q: 'What error does fetch throw when aborted?',
        options: ['TimeoutError', 'NetworkError', 'AbortError (DOMException)', 'None, it just returns null'],
        correct: 2,
        why: 'fetch rejects the Promise with a DOMException named "AbortError". You must catch this so your app doesn\'t crash.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Wire up the AbortController in the useEffect. When the component unmounts (or ID changes), the cleanup function must abort the fetch.',
      starterCode: `import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [id, setId] = useState(1);\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    // 1. Create the AbortController\n    \n    fetch(\`https://jsonplaceholder.typicode.com/todos/\${id}\`)\n      .then(res => res.json())\n      .then(setData)\n      .catch(err => {\n        if (err.name === 'AbortError') console.log('Aborted!');\n      });\n\n    // 2. Return the cleanup function\n    return () => {};\n  }, [id]);\n\n  return (\n    <div className="box stack">\n      <button className="btn" onClick={() => setId(s => s + 1)}>Next Todo (Rapid Click!)</button>\n      <pre>{JSON.stringify(data, null, 2)}</pre>\n    </div>\n  );\n}`,
      solutionCode: `import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [id, setId] = useState(1);\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    const controller = new AbortController();\n    \n    fetch(\`https://jsonplaceholder.typicode.com/todos/\${id}\`, {\n      signal: controller.signal\n    })\n      .then(res => res.json())\n      .then(setData)\n      .catch(err => {\n        if (err.name === 'AbortError') console.log('Aborted!');\n      });\n\n    return () => controller.abort();\n  }, [id]);\n\n  return (\n    <div className="box stack">\n      <button className="btn" onClick={() => setId(s => s + 1)}>Next Todo (Rapid Click!)</button>\n      <pre>{JSON.stringify(data, null, 2)}</pre>\n    </div>\n  );\n}`,
      specs: [
        'Creates AbortController instance.',
        'Passes signal to fetch options.',
        'Calls abort() in useEffect cleanup.',
      ],
    },
  },

  // --- JS CORE 5: CLOSURES & STALE STATE ---
  {
    id: 'js-closures-stale-state',
    trackId: 'js_core',
    trackName: 'JS Memory & Equality',
    title: 'Closures & Stale State (The React Hooks Trap)',
    level: 'Crucible',
    category: 'Closures & Scope',
    xp: 75,
    theory: {
      hook: 'A closure "remembers" the variables in its lexical scope at the exact moment it was created.',
      deepDive: 'When you create a function inside another function (like an event handler or useEffect inside a React component), it captures the state variables from that specific render pass. If the function is delayed (e.g., setTimeout) and state changes in the meantime, the function will still see the OLD (stale) state.',
      interviewPitch: '"A common React interview question is why a setTimeout inside a useEffect sees an old state value. I explain that React hooks rely on closures. Each render creates a new closure over the state variables of that render. A delayed function holds a reference to the environment of the render where it was created, not the latest one. To fix it, you either use a ref (which is mutable and survives renders) or functional state updates like `setCount(c => c + 1)`."',
      mcq: {
        q: 'If `count = 0` and you run: `setTimeout(() => console.log(count), 1000)`, then immediately `count = 99`, what logs?',
        options: ['0', '99', 'undefined', 'ReferenceError'],
        correct: 0,
        why: 'The setTimeout callback forms a closure over the value of `count` (0) at the time it was declared.',
      },
    },
    practice: {
      type: 'js_snippet',
      task: 'Fix the stale closure bug. The timeout currently logs the stale value (0) instead of the updated value. Use an object reference (like a React ref) so the closure reads the latest value.',
      starterCode: `// The Stale Closure Bug
function createCounter() {
  let count = 0;
  
  setTimeout(() => {
    console.log("Stale closure reads count:", count); // Will log 0
  }, 100);
  
  count = 99; // Updated after the timeout is scheduled!
}

createCounter();

// TODO: Implement a version that uses an object (like a ref)
// so the timeout reads the LATEST value (99).
function createRefCounter() {
  const countRef = { current: 0 };
  
  setTimeout(() => {
    // console.log("Ref reads count:", countRef.current);
  }, 100);
  
  countRef.current = 99;
}
createRefCounter();`,
      solutionCode: `// The Stale Closure Bug
function createCounter() {
  let count = 0;
  
  setTimeout(() => {
    console.log("Stale closure reads count:", count); // Logs 0
  }, 100);
  
  count = 99; 
}
createCounter();

// The Fix: Mutable References
function createRefCounter() {
  const countRef = { current: 0 };
  
  setTimeout(() => {
    console.log("Ref reads count:", countRef.current); // Logs 99!
  }, 100);
  
  countRef.current = 99;
}
createRefCounter();`,
      specs: [
        'Demonstrates the stale closure problem.',
        'Demonstrates how an object reference bypasses the closure trap.',
      ],
    },
  },

  // --- JS CORE 6: THIS AND ARROW FUNCTIONS ---
  {
    id: 'js-this-binding',
    trackId: 'js_core',
    trackName: 'JS Memory & Equality',
    title: 'Lexical vs Dynamic: Arrow Functions & "this"',
    level: 'Core',
    category: 'Object Memory & Equalities',
    xp: 50,
    theory: {
      hook: 'Regular functions determine this dynamically based on WHO called them. Arrow functions determine this lexically based on WHERE they were written.',
      deepDive: 'Before arrow functions, passing a method as a callback (like `element.addEventListener(\'click\', obj.method)`) would strip the object binding, and this would become the window or undefined. Arrow functions don\'t have their own this. They look up the scope chain just like any normal variable.',
      interviewPitch: '"When asked why we used to `bind(this)` in React class components, I explain dynamic execution context. A method passed as an event handler loses its instance context when invoked by the DOM. Arrow functions solved this because their this is lexically scoped to the enclosing class, permanently binding it to the instance."',
      mcq: {
        q: 'What does this refer to inside a global arrow function?',
        options: ['The Window object', 'undefined', 'null', 'The function itself'],
        correct: 0,
        why: 'An arrow function in the global scope inherits this from the global scope, which is the Window object in a browser.',
      },
    },
    practice: {
      type: 'js_snippet',
      task: 'The `greet` method inside the timeout loses its this context because it is passed as a callback. Fix it by using an arrow function so it inherits this from `user.delayGreeting()`.',
      starterCode: `const user = {
  name: "Alex",
  delayGreeting() {
    // BUG: setTimeout executes the callback in a different context.
    // this will be undefined/window, so this.name fails.
    setTimeout(function() {
      console.log("Hello, my name is", this.name);
    }, 50);
  }
};

user.delayGreeting();`,
      solutionCode: `const user = {
  name: "Alex",
  delayGreeting() {
    // FIX: Arrow functions inherit this lexically from delayGreeting
    setTimeout(() => {
      console.log("Hello, my name is", this.name);
    }, 50);
  }
};

user.delayGreeting();`,
      specs: [
        'Identifies the broken dynamic binding.',
        'Fixes it using a lexical arrow function.',
      ],
    },
  },
];

/**
 * Assemble the reference stylesheet a CSS drill is graded against.
 *
 * `sol` comes in two shapes and the previous one-liner only handled the first:
 *
 *   1. bare declarations — `margin-left: auto;` — which belong *inside* the rule
 *      that carries the TODO comment.
 *   2. whole rule blocks — `.card { position: relative; }` — which do not.
 *
 * Substituting shape 2 into the first TODO line nested a rule inside another
 * rule, so `.card { … .card { position: relative } }` never matched anything and
 * the reference rendered unsolved. Twenty of the 108 drills were in that state,
 * which meant correct answers were graded against a broken target and could not
 * pass. Those drills also tend to have several TODOs, and only the first was
 * ever replaced.
 *
 * So: split `sol` at the first line that opens a block. Anything before it is
 * declarations and goes into the TODO; the rest is appended, where equal
 * specificity means the later rule wins — which is exactly "solved".
 */
function buildReferenceCss(starter: string, sol: string): string {
  if (!sol.trim()) return starter;
  const lines = sol.split('\n');
  const ruleStart = lines.findIndex((l) => l.includes('{') && !l.trim().startsWith('/*'));
  const declarations = (ruleStart === -1 ? lines : lines.slice(0, ruleStart)).join('\n').trim();
  const rules = ruleStart === -1 ? '' : lines.slice(ruleStart).join('\n').trim();

  let out = starter;
  if (declarations) out = out.replace(/^.*TODO.*$/m, `  ${declarations}`);
  return rules ? `${out}\n\n${rules}\n` : out;
}

// Dynamically port the CSS100 items into the Mastery Stream
const css100Units: MasteryUnit[] = CSS100.items.map((item: any, idx: number) => {
  const propertyName = item.use?.[0]?.[0] || 'property';
  const propertyDesc = item.use?.[0]?.[1] || 'layout requirement';
  const title = item.title || item.n || `Layout Drill ${idx + 1}`;
  
  return {
    id: `css-${item.id || item.k || idx}`,
    sourceId: item.id,
    hints: item.hints || [],
    why: item.why,
    verify: item.verify,
    diagram: item.dia,
    reference: item.markup,
    trackId: 'css_layouts',
    trackName: 'CSS 2D Layouts',
    category: CSS100.cats.find(c => c.k === item.cat)?.n || 'General Layouts',
    title: title,
    level: difficultyFromId(String(item.id || '')),
    xp: 25,
    theory: {
      hook: item.goal || item.blurb || 'Mastering this CSS property ensures predictable, robust 2D layouts.',
      deepDive: (item.hints || []).join(' ') || `Understand how ${propertyName} controls the rendering box and flow of its children.`,
      interviewPitch: `"I chose this approach because it's the most semantically correct and resilient way to achieve ${propertyDesc.toLowerCase()}, avoiding brittle magic numbers or absolute positioning."`,
      ...(item.task ? {
        mcq: {
          q: `What is the primary purpose of ${propertyName} here?`,
          options: [
            propertyDesc,
            'To override the cascade magically.',
            'To force GPU acceleration.',
            'To trigger a re-render.'
          ],
          correct: 0,
          why: 'This property is foundational for this exact specification.',
        }
      } : {})
    },
    practice: {
      type: 'css',
      task: item.task || 'Implement the requested CSS layout properties to match the target.',
      starterCode: item.css || '',
      // The answer lives in `item.sol`, in one of two shapes (see buildReferenceCss).
      solutionCode: buildReferenceCss(String(item.css || ''), String(item.sol || '')),
      // The old expression extracted the fragment body of `item.jsx` — which is
      // a TODO comment — so every CSS unit rendered an empty preview.
      baseHtml: jsxToHtml(item.markup || item.jsx || ''),
      specs: (item.use || []).map(([p, d]: [string, string]) => `${p} — ${d}`),
    }
  } as MasteryUnit;
});

// Dynamically port the Ladder items into the Mastery Stream
const ladderUnits: MasteryUnit[] = (LADDER_DATA.lessons || []).map((lesson: any, idx: number) => ({
  id: `ladder-${lesson.stage}-${idx}`,
  sourceId: lesson.key || lesson.title,
  why: lesson.why,
  takeaway: typeof lesson.key === 'string' ? lesson.key : undefined,
  trackId: 'css_layouts',
  trackName: 'CSS 2D Layouts',
  category: `Ladder Stage ${lesson.stage} (CSS)`,
  title: lesson.title,
  level: 'Core',
  xp: 30,
  theory: {
    hook: lesson.teach.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
    deepDive: lesson.teach.replace(/<[^>]*>?/gm, ''),
    interviewPitch: '"This pattern ensures clear separation of concerns, making the component easier to test and highly predictable across renders."',
  },
  practice: {
    type: lesson.isjsx ? 'jsx' : 'css',
    task: lesson.task || `Implement the concepts covered in: ${lesson.title}`,
    starterCode: lesson.css || lesson.jsx || '// Ready for implementation',
    solutionCode: lesson.polish || lesson.after || lesson.css || lesson.jsx || '// Implemented',
    baseHtml: lesson.html || '',
    // Without `base` the lesson renders against the wrong defaults — which is
    // the very thing the lesson is teaching you to see.
    baseCss: lesson.base || '',
    specs: lesson.task ? [String(lesson.task).replace(/<[^>]*>?/gm, '')] : ['Follows architecture guidelines.'],
  }
} as MasteryUnit));


// --- REACT CORE Mettl OA & ACCENTURE INTERVIEW DRILLS ---
const reactUnits: MasteryUnit[] = [
  {
    id: 'react-infinite-loop',
    trackId: 'react_core',
    trackName: 'React 19 Architecture',
    category: 'Hooks & Lifecycles',
    title: 'The Infinite Loop Trap (useEffect)',
    level: 'Warm-up',
    xp: 50,
    theory: {
      hook: 'Updating state inside a useEffect without dependencies causes an infinite render loop.',
      deepDive: 'When a component renders, the useEffect runs. If it calls a state setter, the component re-renders. If the dependency array is missing, the effect runs AFTER EVERY render, immediately setting state again and triggering another render. This will crash the browser tab.',
      interviewPitch: '"If an interviewer shows me a component crashing the tab, the first thing I look for is an unconditional state update inside the render body, or a useEffect missing a dependency array. By adding the empty array [], we instruct React to only run the effect once after the initial mount, acting like componentDidMount."',
      mcq: {
        q: 'What is the difference between useEffect with [] vs no array at all?',
        options: ['[] runs once. No array runs after every render.', 'No difference.', '[] is a syntax error.', 'No array runs only on mount.'],
        correct: 0,
        why: 'No array means "run after every render". [] means "run when dependencies change", and since it has none, it runs only once.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Fix the infinite loop. The component is currently crashing because useEffect runs after every render. Add the correct dependency array so it only fetches data once on mount.',
      starterCode: `import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState("Loading...");
  const [renders, setRenders] = useState(0);

  // BUG: This causes an infinite loop!
  useEffect(() => {
    setData("Fetched Data!");
    setRenders(r => r + 1); // Triggers re-render
  }); // <-- Missing something here

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <h2>Data: {data}</h2>
      <p className="text-rose-400">Renders: {renders}</p>
    </div>
  );
}`,
      solutionCode: `import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState("Loading...");
  const [renders, setRenders] = useState(0);

  // FIX: Added [] so it only runs on mount
  useEffect(() => {
    setData("Fetched Data!");
    setRenders(r => r + 1); 
  }, []);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <h2>Data: {data}</h2>
      <p className="text-emerald-400">Renders: {renders} (Stable!)</p>
    </div>
  );
}`,
      specs: [
        'Identifies the missing dependency array.',
        'Prevents the infinite render loop.',
      ],
    },
  },

  {
    id: 'react-context-rerenders',
    trackId: 'react_core',
    trackName: 'React 19 Architecture',
    category: 'Performance Optimization',
    title: 'Context API Re-render Waterfall',
    level: 'Core',
    xp: 75,
    theory: {
      hook: 'Passing a new object reference to a Context Provider value causes ALL consumers to re-render, even if the data inside hasn\'t changed.',
      deepDive: 'When the parent of a Context.Provider re-renders, it evaluates `value={{ user, theme }}`. This creates a brand new object in memory (a new pointer). React compares the old value to the new value using `Object.is()`. Since the pointers are different, it forces a re-render of every component consuming that context. You must wrap the object in `useMemo` to preserve referential equality.',
      interviewPitch: '"In technical rounds, if asked how to optimize Context API, I explain referential equality. I always wrap the Provider\'s value object in useMemo. Otherwise, any unrelated state change in the parent creates a new object reference, triggering a catastrophic re-render waterfall for every consumer down the tree."',
      mcq: {
        q: 'How do you prevent a Context Provider from creating a new object reference on every render?',
        options: ['useCallback', 'React.memo', 'useMemo', 'useState'],
        correct: 2,
        why: 'useMemo caches the object reference between renders unless its dependencies change.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Fix the re-render waterfall. Wrap the context value object in useMemo so that unrelated parent re-renders do not recreate the context value pointer.',
      starterCode: `import React, { useState, createContext, useContext, useMemo } from 'react';

const ThemeContext = createContext();

function Consumer() {
  const { theme } = useContext(ThemeContext);
  console.log("Consumer rendered!"); // Watch the console!
  return <div>Current Theme: {theme}</div>;
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);

  // BUG: This object is recreated on EVERY render (e.g. when count changes)
  const contextValue = { theme, setTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
        <button className="px-3 py-1 bg-sky-600 rounded mr-2" onClick={() => setCount(c => c + 1)}>
          Unrelated State: {count}
        </button>
        <Consumer />
      </div>
    </ThemeContext.Provider>
  );
}`,
      solutionCode: `import React, { useState, createContext, useContext, useMemo } from 'react';

const ThemeContext = createContext();

function Consumer() {
  const { theme } = useContext(ThemeContext);
  console.log("Consumer rendered!");
  return <div>Current Theme: {theme}</div>;
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);

  // FIX: useMemo preserves the pointer unless 'theme' actually changes
  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
        <button className="px-3 py-1 bg-sky-600 rounded mr-2" onClick={() => setCount(c => c + 1)}>
          Unrelated State: {count}
        </button>
        <Consumer />
      </div>
    </ThemeContext.Provider>
  );
}`,
      specs: [
        'Identifies the inline object recreation.',
        'Uses useMemo to cache the context value.',
      ],
    },
  },

  {
    id: 'react-custom-use-debounce',
    trackId: 'react_core',
    trackName: 'React 19 Architecture',
    category: 'Custom Hooks (Mettl OA)',
    title: 'Building useDebounce (Mettl OA Classic)',
    level: 'Crucible',
    xp: 150,
    theory: {
      hook: 'Debouncing delays a state update until a certain amount of time has passed without any new updates.',
      deepDive: 'In a search bar, typing "React" triggers 5 state updates. If you fetch data on every keystroke, you DDoS your own backend. `useDebounce` is a custom hook that takes a value and a delay. It sets a timeout to update a `debouncedValue` state. If the value changes before the timeout finishes, the `useEffect` cleanup function clears the previous timeout, preventing the update.',
      interviewPitch: '"Writing a useDebounce hook is my go-to signal for senior-level React knowledge. It perfectly demonstrates understanding of useEffect cleanup functions. By clearing the timeout in the cleanup phase, we guarantee that only the final keystroke (after the user pauses) actually triggers the debounced state update."',
      mcq: {
        q: 'When does the useEffect cleanup function run?',
        options: ['Only when the component unmounts.', 'Before the effect runs again, and on unmount.', 'After the effect finishes executing.', 'When the browser closes.'],
        correct: 1,
        why: 'React runs the cleanup function to clean up the previous render\'s effect BEFORE running the new effect.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Implement the useDebounce hook. It must use useEffect, setTimeout, and the cleanup function (clearTimeout) to only return the value after 500ms of inactivity.',
      starterCode: `import React, { useState, useEffect } from 'react';

// TODO: Implement useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 1. Set a timeout to update debouncedValue
    
    // 2. Return a cleanup function to clear the timeout
    
  }, [value, delay]);

  return debouncedValue;
}

export default function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <input 
        type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type fast..."
        className="text-black px-2 py-1 rounded"
      />
      <p className="mt-4 text-sky-400">Immediate: {search}</p>
      <p className="text-emerald-400">Debounced: {debouncedSearch}</p>
    </div>
  );
}`,
      solutionCode: `import React, { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <input 
        type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type fast..."
        className="text-black px-2 py-1 rounded"
      />
      <p className="mt-4 text-sky-400">Immediate: {search}</p>
      <p className="text-emerald-400">Debounced: {debouncedSearch}</p>
    </div>
  );
}`,
      specs: [
        'Implements setTimeout inside useEffect.',
        'Implements clearTimeout in the cleanup return function.',
      ],
    },
  },
  {
    id: 'react-memo-referential-equality',
    trackId: 'react_core',
    trackName: 'React 19 Architecture',
    category: 'Performance Optimization',
    title: 'React.memo & The Inline Prop Trap',
    level: 'Advanced',
    xp: 100,
    theory: {
      hook: 'React.memo prevents re-renders, but passing an inline array `[]` or function `() => {}` instantly breaks it.',
      deepDive: 'When a parent renders, it creates new memory pointers for any inline arrays, objects, or functions. If you pass `data={[1,2,3]}` to a child wrapped in `React.memo`, the memoization fails because `[1,2,3] !== [1,2,3]` in memory. You must wrap the prop in `useMemo` or move it outside the component if it\'s static.',
      interviewPitch: '"A classic optimization mistake is wrapping a component in React.memo but passing it an inline function or array. In interviews, I point out that React.memo does a shallow comparison (===). I always cache the prop with useMemo or useCallback before passing it down, ensuring referential equality and successfully blocking the re-render waterfall."',
      mcq: {
        q: 'Which prop will BREAK React.memo on a child component?',
        options: ['count={5}', 'text="hello"', 'onClick={() => console.log("click")}', 'isTrue={true}'],
        correct: 2,
        why: 'An inline function creates a new pointer on every render, failing the shallow comparison.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Fix the broken memoization. The HeavyChild is re-rendering every time you click the button because the parent passes an inline array. Cache the array using useMemo.',
      starterCode: `import React, { useState, memo, useMemo } from 'react';

const HeavyChild = memo(({ config }) => {
  console.log("HeavyChild rendered! (This is bad if config didn't change)");
  return <div className="mt-4 p-2 bg-slate-800 rounded">Child renders heavily! Config length: {config.length}</div>;
});

export default function App() {
  const [count, setCount] = useState(0);

  // BUG: This inline array breaks React.memo because it gets a new pointer every render!
  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <button className="px-3 py-1 bg-sky-600 rounded" onClick={() => setCount(c => c + 1)}>
        Parent State: {count}
      </button>
      
      {/* TODO: Do not pass this inline array directly */}
      <HeavyChild config={[1, 2, 3]} />
    </div>
  );
}`,
      solutionCode: `import React, { useState, memo, useMemo } from 'react';

const HeavyChild = memo(({ config }) => {
  console.log("HeavyChild rendered! (This is bad if config didn't change)");
  return <div className="mt-4 p-2 bg-slate-800 rounded">Child renders heavily! Config length: {config.length}</div>;
});

export default function App() {
  const [count, setCount] = useState(0);

  // FIX: Cache the array so the pointer remains stable across renders
  const stableConfig = useMemo(() => [1, 2, 3], []);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <button className="px-3 py-1 bg-sky-600 rounded" onClick={() => setCount(c => c + 1)}>
        Parent State: {count}
      </button>
      
      <HeavyChild config={stableConfig} />
    </div>
  );
}`,
      specs: [
        'Identifies the inline array breaking memoization.',
        'Implements useMemo to stabilize the array reference.',
      ],
    },
  },

  {
    id: 'react-stale-closure-event',
    trackId: 'react_core',
    trackName: 'React 19 Architecture',
    category: 'Hooks & Lifecycles',
    title: 'Stale Closures in Event Listeners',
    level: 'Crucible',
    xp: 150,
    theory: {
      hook: 'An event listener attached inside `useEffect` with `[]` captures the state variables of the FIRST render forever.',
      deepDive: 'If you do `window.addEventListener("scroll", handleScroll)` inside a mount-only useEffect, the `handleScroll` function is a closure from the first render. If it tries to read `count`, it will always see `0`. To fix this, you must either include the state in the dependency array (which forces re-attachment of the listener), or use a mutable `useRef` to store the latest state.',
      interviewPitch: '"When attaching global event listeners or websockets, stale closures are the #1 source of bugs. If the listener reads state, I either use the functional update pattern `setCount(c => c + 1)`, or I synchronize the latest state into a `useRef` so the stale closure can read `ref.current` and get fresh data without needing to re-attach the listener constantly."',
      mcq: {
        q: 'How does `useRef` solve the stale closure problem in an event listener?',
        options: ['It forces the listener to re-attach.', 'It triggers a re-render.', 'Its .current property is mutable and shares the same memory address across all renders.', 'It binds "this" to the function.'],
        correct: 2,
        why: 'Because the ref object is mutated rather than recreated, the closure holding the ref pointer can read the updated .current value at any time.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Fix the stale closure. The interval is reading the stale `count` value (0) and logging it forever. Update the effect so it accurately reads the latest count.',
      starterCode: `import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  // BUG: The interval is trapped in the first render's closure!
  useEffect(() => {
    const id = setInterval(() => {
      console.log("Interval sees count as:", count); // Always logs 0!
    }, 1000);
    return () => clearInterval(id);
  }, []); // Empty dependency array causes the trap

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <h2 className="text-xl">Count: {count}</h2>
      <button className="px-3 py-1 mt-2 bg-emerald-600 rounded" onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>
      <p className="mt-4 text-xs text-slate-400">Check the terminal output. It thinks count is 0!</p>
    </div>
  );
}`,
      solutionCode: `import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  
  // FIX: Sync latest state to a ref
  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("Interval sees count as:", countRef.current); // Reads fresh state!
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <h2 className="text-xl">Count: {count}</h2>
      <button className="px-3 py-1 mt-2 bg-emerald-600 rounded" onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>
    </div>
  );
}`,
      specs: [
        'Understands the stale closure trap.',
        'Implements useRef to bypass the closure and read fresh state.',
      ],
    },
  },

  {
    id: 'react-usereducer-complex',
    trackId: 'react_core',
    trackName: 'React 19 Architecture',
    category: 'State Management',
    title: 'useReducer for Complex State Transitions',
    level: 'Core',
    xp: 75,
    theory: {
      hook: 'When multiple state variables must change together in response to one action, `useState` creates race conditions. `useReducer` guarantees atomicity.',
      deepDive: 'If clicking "Fetch" requires `setLoading(true)`, `setError(null)`, and `setData([])` simultaneously, doing them as 3 `useState` calls is brittle. `useReducer` allows you to dispatch a single `{ type: \'FETCH_START\' }` action, letting the reducer predictably transition the state machine as a single atomic unit.',
      interviewPitch: '"For simple toggles, I use useState. But the moment state becomes a state machine—like a data fetching flow with idle, loading, success, and error states—I switch to useReducer. It centralizes the transition logic out of the component body, makes it easily unit-testable without rendering, and ensures impossible states (like having both data AND an error) cannot exist."',
      mcq: {
        q: 'What makes useReducer easier to test than useState?',
        options: ['It is faster.', 'Reducers are pure functions independent of React context.', 'It automatically memoizes.', 'It uses less memory.'],
        correct: 1,
        why: 'A reducer takes (state, action) and returns a new state. It is a pure JavaScript function that can be imported into a Jest file and tested without rendering any components.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Migrate the brittle multiple `useState` calls to the robust `useReducer` pattern. Implement the reducer function to handle START, SUCCESS, and ERROR actions.',
      starterCode: `import React, { useReducer } from 'react';

const initialState = { data: null, loading: false, error: null };

// TODO: Implement the reducer
function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state }; // Fix me
    case 'FETCH_SUCCESS':
      return { ...state }; // Fix me
    case 'FETCH_ERROR':
      return { ...state }; // Fix me
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const simulateFetch = () => {
    dispatch({ type: \'FETCH_START\' });
    setTimeout(() => {
      Math.random() > 0.5 
        ? dispatch({ type: 'FETCH_SUCCESS', payload: ["Apple", "Banana"] })
        : dispatch({ type: 'FETCH_ERROR', payload: "Network Failed" });
    }, 1000);
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <button className="px-3 py-1 bg-sky-600 rounded" onClick={simulateFetch}>
        Fetch Data
      </button>
      <pre className="mt-4 text-xs">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}`,
      solutionCode: `import React, { useReducer } from 'react';

const initialState = { data: null, loading: false, error: null };

function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { data: null, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { data: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { data: null, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const simulateFetch = () => {
    dispatch({ type: \'FETCH_START\' });
    setTimeout(() => {
      Math.random() > 0.5 
        ? dispatch({ type: 'FETCH_SUCCESS', payload: ["Apple", "Banana"] })
        : dispatch({ type: 'FETCH_ERROR', payload: "Network Failed" });
    }, 1000);
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <button className="px-3 py-1 bg-sky-600 rounded" onClick={simulateFetch}>
        Fetch Data
      </button>
      <pre className="mt-4 text-xs">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}`,
      specs: [
        'Implements FETCH_START (loading true, clear others).',
        'Implements FETCH_SUCCESS (loading false, set data).',
        'Implements FETCH_ERROR (loading false, set error).',
      ],
    },
  },
];


// --- REACT MACHINE CODING (METTL OA & OFFLINE) ---
const practicalReactUnits: MasteryUnit[] = [
  {
    id: 'practical-search-grid',
    trackId: 'react_practical',
    trackName: 'React Machine Coding',
    category: 'Lists & Filtering',
    title: 'The Searchable Data Grid',
    level: 'Core',
    xp: 100,
    theory: {
      hook: 'A data grid filtering locally requires derived state: you store the raw data, store the search query, and calculate the visible rows on the fly.',
      deepDive: 'Never store "filteredData" in its own useState if it can be calculated from "allData" and "searchQuery". Syncing two states manually leads to bugs (e.g., when raw data updates but you forget to update the filtered array). Instead, derive it during render: \`const visible = data.filter(d => d.name.includes(search))\`.',
      interviewPitch: '"In machine coding rounds, a searchable list is the most common task. Interviewers look for two things: 1) Are you duplicating state (storing filtered results in useState), and 2) Are you using semantic HTML like tables or clean CSS grid? I always use derived state to ensure a single source of truth, and wrap the filtering logic in useMemo if the dataset is massive."',
      mcq: {
        q: 'Why shouldn\'t you store \`filteredUsers\` in its own \`useState\`?',
        options: ['It causes memory leaks.', 'It creates redundant state that easily goes out of sync with the raw data.', 'It breaks React.memo.', 'useState can only hold strings and numbers.'],
        correct: 1,
        why: 'Derived state (calculating the filtered list during render) guarantees that the UI always perfectly matches the raw data and search query.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Build a searchable employee directory. A list of users is provided. Create an input field to filter them by name (case-insensitive). Do not create a separate state for the filtered array—derive it!',
      starterCode: `import React, { useState } from 'react';

const EMPLOYEES = [
  { id: 1, name: "Alice Johnson", role: "Engineer" },
  { id: 2, name: "Bob Smith", role: "Designer" },
  { id: 3, name: "Charlie Davis", role: "Product Manager" },
  { id: 4, name: "Diana Prince", role: "Engineer" },
];

export default function App() {
  // TODO: Add search state and filter the EMPLOYEES array.
  
  return (
    <div className="p-6 bg-slate-100 min-h-screen font-sans text-slate-800">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold mb-4">Employee Directory</h1>
        
        {/* Add Input here */}

        <div className="flex flex-col gap-2 mt-4">
          {EMPLOYEES.map(emp => (
            <div key={emp.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
              <span className="font-medium">{emp.name}</span>
              <span className="text-sm text-slate-500">{emp.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

const EMPLOYEES = [
  { id: 1, name: "Alice Johnson", role: "Engineer" },
  { id: 2, name: "Bob Smith", role: "Designer" },
  { id: 3, name: "Charlie Davis", role: "Product Manager" },
  { id: 4, name: "Diana Prince", role: "Engineer" },
];

export default function App() {
  const [query, setQuery] = useState("");
  
  // Derived state: calculated on every render
  const filtered = EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-100 min-h-screen font-sans text-slate-800">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold mb-4">Employee Directory</h1>
        
        <input 
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />

        <div className="flex flex-col gap-2 mt-4">
          {filtered.length === 0 && (
            <p className="text-slate-500 text-center py-4">No employees found.</p>
          )}
          {filtered.map(emp => (
            <div key={emp.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center">
              <span className="font-medium">{emp.name}</span>
              <span className="text-xs px-2 py-1 bg-slate-200 rounded-full text-slate-600">{emp.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      specs: [
        'Maintains a single state for the search query.',
        'Derives the filtered list dynamically during render.',
        'Handles case-insensitive matching.',
      ],
    },
  },

  {
    id: 'practical-star-rating',
    trackId: 'react_practical',
    trackName: 'React Machine Coding',
    category: 'Micro-Interactions',
    title: 'Interactive Star Rating',
    level: 'Advanced',
    xp: 125,
    theory: {
      hook: 'A 5-star rating component requires tracking two separate concepts: the permanently committed rating (onClick) and the temporary visual rating (onMouseEnter/Leave).',
      deepDive: 'When hovering over star #4, stars 1-4 should light up, temporarily overriding the committed rating (say, 2). When the mouse leaves the widget entirely, it must snap back to the committed rating (2). This requires two states: \`rating\` and \`hoverValue\`.',
      interviewPitch: '"The star rating is a classic test of separating temporary visual state from committed data state. I structure it using an array mapped to indexes, passing the index to mouse handlers. I ensure the UI derives its active class by checking if the star\'s index is less than or equal to (hoverValue || rating)."',
      mcq: {
        q: 'What is the most robust way to generate 5 stars in React without hardcoding 5 elements?',
        options: ['A for loop pushing to an array.', 'Using Array(5).fill(0).map(...)', 'Copy pasting the SVG 5 times.', 'Using dangerouslySetInnerHTML'],
        correct: 1,
        why: 'Array(5).fill(0).map((_, i) => ...) is the standard, declarative React pattern for generating a fixed number of elements.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Build a 5-star rating widget. Hovering over a star fills it and all preceding stars. Clicking locks the rating. Leaving the widget snaps the visual back to the locked rating. (Use ★ and ☆ characters for simplicity).',
      starterCode: `import React, { useState } from 'react';

export default function App() {
  // TODO: Add state for rating and hover
  
  return (
    <div className="p-8 bg-slate-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-slate-200 text-lg mb-4 font-sans">Rate your experience</h2>
        
        <div className="flex gap-2 text-4xl cursor-pointer select-none">
          {/* Render 5 stars here. Use text-amber-400 for active, text-slate-600 for inactive */}
          <span className="text-slate-600">☆</span>
          <span className="text-slate-600">☆</span>
          <span className="text-slate-600">☆</span>
          <span className="text-slate-600">☆</span>
          <span className="text-slate-600">☆</span>
        </div>
        
        <p className="mt-4 text-sky-400 font-mono">Current Rating: 0</p>
      </div>
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  
  return (
    <div className="p-8 bg-slate-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-slate-200 text-lg mb-4 font-sans">Rate your experience</h2>
        
        <div 
          className="flex gap-2 text-4xl cursor-pointer select-none"
          onMouseLeave={() => setHover(0)}
        >
          {Array(5).fill(0).map((_, i) => {
            const starValue = i + 1;
            const isActive = starValue <= (hover || rating);
            
            return (
              <span 
                key={i}
                className={isActive ? 'transition-colors duration-200 text-amber-400' : 'transition-colors duration-200 text-slate-700'}
                onMouseEnter={() => setHover(starValue)}
                onClick={() => setRating(starValue)}
              >
                {isActive ? '★' : '☆'}
              </span>
            );
          })}
        </div>
        
        <p className="mt-4 text-sky-400 font-mono">Current Rating: {rating}</p>
      </div>
    </div>
  );
}`,
      specs: [
        'Maintains committed rating state.',
        'Maintains temporary hover state.',
        'Derives star appearance from (hover || rating).',
        'Clears hover state onMouseLeave of the container.',
      ],
    },
  },

  {
    id: 'practical-recursive-tree',
    trackId: 'react_practical',
    trackName: 'React Machine Coding',
    category: 'Advanced Rendering',
    title: 'Recursive Folder Tree',
    level: 'Crucible',
    xp: 200,
    theory: {
      hook: 'When data is infinitely nested (like a file system), you cannot hardcode the UI layers. A component must render ITSELF.',
      deepDive: 'Recursive components are the only way to render arbitrary tree data. A \`Folder\` component takes a \`node\` prop. If the node has \`children\`, it renders its own title, and then maps over its children, returning \`<Folder key={child.id} node={child} />\` for each one. State for "isExpanded" lives inside the Folder component itself, so each level manages its own toggle.',
      interviewPitch: '"Recursive rendering is a frequent technical screen for Senior roles. It proves you understand component encapsulation. The trick is ensuring the recursion has a base case (e.g. no children means it\'s a file) and giving each instance its own local state for expanding/collapsing, rather than trying to track the open state of every node in a massive global Redux store."',
      mcq: {
        q: 'Where should the \`isOpen\` state live in a recursive tree?',
        options: ['In a global Redux store.', 'In the top-level parent App component.', 'Inside the recursive Component itself, locally.', 'It shouldn\'t be state, it should be in the DOM.'],
        correct: 2,
        why: 'Keeping isOpen local to the recursive component means you don\'t have to manage a complex dictionary of IDs and booleans in the parent.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Build a recursive Folder tree. If a node is a folder, clicking it should toggle its children. Indent nested levels to make the hierarchy visible.',
      starterCode: `import React, { useState } from 'react';

const FILE_SYSTEM = {
  name: "root",
  isFolder: true,
  children: [
    { name: "package.json", isFolder: false },
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "App.jsx", isFolder: false },
        { name: "index.css", isFolder: false },
        {
          name: "components",
          isFolder: true,
          children: [
            { name: "Button.jsx", isFolder: false }
          ]
        }
      ]
    }
  ]
};

// TODO: Make this component call itself for nested children
function Node({ data }) {
  return (
    <div className="pl-4">
      <div>{data.name}</div>
    </div>
  );
}

export default function App() {
  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-200 font-mono text-sm">
      <Node data={FILE_SYSTEM} />
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

const FILE_SYSTEM = {
  name: "root",
  isFolder: true,
  children: [
    { name: "package.json", isFolder: false },
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "App.jsx", isFolder: false },
        { name: "index.css", isFolder: false },
        {
          name: "components",
          isFolder: true,
          children: [
            { name: "Button.jsx", isFolder: false }
          ]
        }
      ]
    }
  ]
};

function Node({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!data.isFolder) {
    return <div className="py-1 pl-4 text-slate-400">📄 {data.name}</div>;
  }

  return (
    <div className="pl-4">
      <div 
        className="py-1 cursor-pointer select-none hover:text-sky-400 font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '📂' : '📁'} {data.name}
      </div>
      
      {isOpen && data.children && (
        <div className="border-l border-slate-700 ml-2">
          {data.children.map((child, idx) => (
            <Node key={idx} data={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-200 font-mono text-sm">
      <div className="max-w-md p-4 border border-slate-800 bg-slate-950 rounded-xl shadow-lg">
        <Node data={FILE_SYSTEM} />
      </div>
    </div>
  );
}`,
      specs: [
        'Component renders itself recursively for children.',
        'Uses local state for expand/collapse.',
        'Properly distinguishes files vs folders (base case).',
      ],
    },
  },

  {
    id: 'practical-stopwatch-useref',
    trackId: 'react_practical',
    trackName: 'React Machine Coding',
    category: 'State & Mutable Refs',
    title: 'The Unbreakable Stopwatch',
    level: 'Core',
    xp: 100,
    theory: {
      hook: 'To build a stopwatch, you need a way to store the interval ID so you can clear it later. \`useState\` would cause a re-render just for saving the ID. \`useRef\` is the correct tool.',
      deepDive: 'A ref is essentially a mutable object \`{ current: initialValue }\` that React guarantees will persist across re-renders. When you start an interval, you store the ID in \`intervalRef.current = setInterval(...)\`. This doesn\'t trigger a render. When you pause, you call \`clearInterval(intervalRef.current)\`.',
      interviewPitch: '"A common pitfall in stopwatch challenges is storing the timer ID in useState. This triggers an unnecessary render when starting the timer, and worse, if you try to clear it inside an unmount cleanup function, a stale closure might prevent you from accessing the correct ID. Storing the ID in a useRef ensures synchronous, stable access without polluting the render cycle."',
      mcq: {
        q: 'Why is \`useRef\` preferred over \`let timerId\` declared outside the component?',
        options: ['It is faster.', 'A global let variable would be shared across ALL instances of the component, breaking if you render two stopwatches.', 'useRef automatically clears intervals.', 'let variables cannot hold numbers.'],
        correct: 1,
        why: 'Variables outside a component are global to the module. If you render <Stopwatch /> twice, they will overwrite each other\'s timer IDs. useRef is scoped to the specific component instance.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Build a Stopwatch with Start, Stop, and Reset buttons. Track the time in hundredths of a second (10ms intervals). Format the output cleanly (e.g. 0.00). Use useRef to store the interval ID.',
      starterCode: `import React, { useState, useRef } from 'react';

export default function App() {
  const [time, setTime] = useState(0); // Time in milliseconds / 10
  // TODO: Create a ref to hold the interval ID
  
  const handleStart = () => {
    // TODO: start interval
  };
  
  const handleStop = () => {
    // TODO: clear interval
  };
  
  const handleReset = () => {
    // TODO: clear interval and reset time to 0
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="text-6xl font-mono text-white mb-8 tracking-tighter">
        {(time / 100).toFixed(2)}s
      </div>
      
      <div className="flex gap-4">
        <button onClick={handleStart} className="px-6 py-2 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500">Start</button>
        <button onClick={handleStop} className="px-6 py-2 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-500">Stop</button>
        <button onClick={handleReset} className="px-6 py-2 bg-slate-700 text-white rounded-full font-bold hover:bg-slate-600">Reset</button>
      </div>
    </div>
  );
}`,
      solutionCode: `import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [time, setTime] = useState(0); 
  const intervalRef = useRef(null);
  
  const handleStart = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 10);
  };
  
  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  
  const handleReset = () => {
    handleStop();
    setTime(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="p-8 bg-slate-900 min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="text-6xl font-mono text-white mb-8 tracking-tighter">
        {(time / 100).toFixed(2)}s
      </div>
      
      <div className="flex gap-4">
        <button onClick={handleStart} className="px-6 py-2 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500 transition-colors">Start</button>
        <button onClick={handleStop} className="px-6 py-2 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-500 transition-colors">Stop</button>
        <button onClick={handleReset} className="px-6 py-2 bg-slate-700 text-white rounded-full font-bold hover:bg-slate-600 transition-colors">Reset</button>
      </div>
    </div>
  );
}`,
      specs: [
        'Uses useRef to store the timer ID without triggering re-renders.',
        'Prevents multiple simultaneous intervals on rapid clicking.',
        'Clears the interval on unmount to prevent memory leaks.',
      ],
    },
  }
];

/**
 * `challenges.ts` holds six finished React machine-coding builds — brief,
 * requirement list, progressive hints and a full solution — and was imported by
 * nothing. They are the only content in the repo shaped like the coding round,
 * so they are wired in rather than left on disk.
 * (`battles.ts` and `targets.ts` are still orphaned; say the word.)
 */
const challengeUnits: MasteryUnit[] = (CHALLENGES as any[]).map((c) => ({
  id: `build-${c.id}`,
  sourceId: c.id,
  trackId: 'react_practical',
  trackName: 'React Machine Coding',
  category: 'Machine Coding Builds',
  title: c.title,
  level: c.level === 'Warm-up' ? 'Warm-up' : c.level === 'Core' ? 'Core' : 'Advanced',
  xp: 60,
  hints: c.hints || [],
  tags: c.tags || [],
  why: `Timed build, roughly ${c.time}.`,
  theory: {
    hook: c.brief,
    deepDive: `${c.brief}\n\nRequirements:\n${(c.req || []).map((r: string) => `• ${r}`).join('\n')}`,
    interviewPitch: `"I'd start by naming the minimum state — ${(c.tags || []).join(', ')} — and derive everything else, because derived values cannot fall out of sync."`,
  },
  practice: {
    type: 'jsx',
    task: c.brief,
    starterCode: c.start,
    solutionCode: c.sol,
    specs: c.req || [],
  },
} as MasteryUnit));

export const MASTERY_UNITS: MasteryUnit[] = [
  ...challengeUnits,
  ...behaviouralUnits,
  ...coreUnits,
  ...jsPracticalUnits,
  ...jsTrapsUnits,
  ...ecosystemUnits,
  ...css100Units.filter(u => u.practice.starterCode), 
  ...ladderUnits.filter(u => u.practice.starterCode),
  ...reactUnits,
  ...practicalReactUnits
];


/**
 * Identity lookups, done once.
 *
 * Selection was resolved with `MASTERY_UNITS.findIndex` on every render and XP
 * with a `find` inside a reduce — O(n) and O(n·m) on the render path, over 216
 * units, for answers that never change between builds.
 */
export const UNIT_INDEX: ReadonlyMap<string, number> = new Map(
  MASTERY_UNITS.map((u, i) => [u.id, i]),
);

export const UNIT_BY_ID: ReadonlyMap<string, MasteryUnit> = new Map(
  MASTERY_UNITS.map((u) => [u.id, u]),
);
