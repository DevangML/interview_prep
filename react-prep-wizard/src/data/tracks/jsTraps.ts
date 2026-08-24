import { MasteryUnit } from './types';

export const jsTrapsUnits: MasteryUnit[] = [
  {
    id: 'js-traps-hoisting',
    trackId: 'js_traps',
    trackName: 'JS Execution & Traps',
    title: 'The Temporal Dead Zone (Hoisting)',
    level: 'Core',
    category: 'Execution Context',
    xp: 150,
    theory: {
      hook: "Why does `var` give you `undefined` while `let` and `const` throw a ReferenceError? Welcome to the TDZ.",
      deepDive: "All declarations (even `let` and `const`) are hoisted to the top of their block scope in the Creation Phase. However, `var` is initialized with `undefined` immediately. `let` and `const` remain uninitialized in the Temporal Dead Zone (TDZ) until the parser evaluates their assignment line. Accessing them before that throws a ReferenceError.",
      interviewPitch: "In an interview, explain that hoisting applies to all variable declarations, but the *initialization* behavior differs. Use this to explain why `var` is dangerous—it fails silently by returning `undefined`, whereas the TDZ in `let`/`const` forces a strict fail-fast error, preventing subtle runtime bugs.",
      mcq: {
        q: "What is the output of the following?\n\nconsole.log(a);\nconsole.log(b);\nvar a = 1;\nlet b = 2;",
        options: [
          "undefined, ReferenceError",
          "ReferenceError, ReferenceError",
          "undefined, undefined",
          "1, 2"
        ],
        correct: 0,
        why: "`var a` is hoisted and initialized to `undefined`. `let b` is hoisted but stays in the TDZ, so accessing it throws a ReferenceError."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Fix the function so it doesn't throw a ReferenceError or output `undefined`. Ensure the function captures the correct scoped variables.",
      starterCode: `function calculate() {
  console.log(multiplier);
  console.log(calculateTotal());

  var multiplier = 10;
  
  const calculateTotal = () => {
    return 5 * multiplier;
  };
}

calculate();`,
      solutionCode: `function calculate() {
  const multiplier = 10;
  
  const calculateTotal = () => {
    return 5 * multiplier;
  };

  console.log(multiplier);
  console.log(calculateTotal());
}

calculate();`,
      specs: ["Should correctly order variable declarations to avoid TDZ and undefined."]
    }
  },
  {
    id: 'js-traps-this-binding',
    trackId: 'js_traps',
    trackName: 'JS Execution & Traps',
    title: 'Losing `this` in Callbacks',
    level: 'Advanced',
    category: 'Context Binding',
    xp: 200,
    theory: {
      hook: "Passing a class method to a callback (like `setTimeout`) destroys its `this` context. Why?",
      deepDive: "In JavaScript, `this` is determined by *how* a function is called, not where it is defined (unless it's an arrow function). When you pass `obj.method` to a callback, you are passing the memory reference to the function itself. When the event loop later executes it, it calls it as a raw function `method()`, making `this` default to the global `window` object (or `undefined` in strict mode).",
      interviewPitch: "To an interviewer: 'The `this` context is lost because the callback is invoked as a free function. To preserve it, we have three choices: 1) Wrap it in an arrow function, which lexically inherits `this`, 2) Use `.bind(this)` in the constructor, or 3) Define the method itself as an arrow function field on the class.'",
      mcq: {
        q: "How do you correctly pass a class method `handleClick` to an event listener so `this` is preserved?",
        options: [
          "element.addEventListener('click', this.handleClick)",
          "element.addEventListener('click', this.handleClick.bind(this))",
          "element.addEventListener('click', () => this.handleClick)",
          "Both B and C are correct ways"
        ],
        correct: 3,
        why: "`.bind(this)` creates a new bound function. Wrapping it in an arrow function `() => this.handleClick()` achieves the same by relying on lexical scoping."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Fix the class so that calling `user.greetLater()` logs 'Hello, Alice' after 1 second instead of 'Hello, undefined'.",
      starterCode: `class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log("Hello, " + this.name);
  }

  greetLater() {
    setTimeout(this.sayHi, 100);
  }
}

const u = new User("Alice");
u.greetLater();`,
      solutionCode: `class User {
  constructor(name) {
    this.name = name;
  }

  sayHi = () => {
    console.log("Hello, " + this.name);
  }

  greetLater() {
    setTimeout(this.sayHi, 100);
  }
}

const u = new User("Alice");
u.greetLater();`,
      specs: ["Should correctly log 'Hello, Alice' without losing 'this' binding."]
    }
  },
  {
    id: 'js-traps-event-loop',
    trackId: 'js_traps',
    trackName: 'JS Execution & Traps',
    title: 'Macrotasks vs Microtasks',
    level: 'Crucible',
    category: 'Event Loop',
    xp: 300,
    theory: {
      hook: "Promises and setTimeouts both run asynchronously. But one has VIP access. Who runs first?",
      deepDive: "The Event Loop has two separate queues for asynchronous tasks: The Macrotask Queue (`setTimeout`, `setInterval`, DOM events) and the Microtask Queue (`Promise.then`, `MutationObserver`). After the main call stack empties, the Engine exhausts the ENTIRE Microtask Queue before it touches a single item in the Macrotask Queue. A microtask can even queue another microtask and indefinitely starve the macrotask queue.",
      interviewPitch: "Explain the priority: 'Promises are microtasks. `setTimeout` is a macrotask. Microtasks have absolute priority. If you mix `Promise.resolve().then()` and `setTimeout(..., 0)`, the Promise always resolves first because the engine flushes the microtask queue entirely before yielding to the next macrotask.'",
      mcq: {
        q: "What is the correct output order?\n\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
        options: [
          "1, 2, 3, 4",
          "1, 4, 2, 3",
          "1, 4, 3, 2",
          "1, 3, 4, 2"
        ],
        correct: 2,
        why: "1 and 4 are synchronous (Call Stack). 3 is a Promise (Microtask). 2 is setTimeout (Macrotask). Sync -> Microtask -> Macrotask."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Reorder the lines to predict the exact output order: 'Sync 1', 'Sync 2', 'Micro 1', 'Micro 2', 'Macro 1'.",
      starterCode: `// Write code that outputs EXACTLY:
// Sync 1
// Sync 2
// Micro 1
// Micro 2
// Macro 1

// Use console.log, setTimeout, and Promise.resolve().then()`,
      solutionCode: `console.log('Sync 1');

setTimeout(() => {
  console.log('Macro 1');
}, 0);

Promise.resolve().then(() => {
  console.log('Micro 1');
}).then(() => {
  console.log('Micro 2');
});

console.log('Sync 2');`,
      specs: ["Should execute with correct Event Loop priority."]
    }
  },
  {
    id: 'js-traps-loop-closures',
    trackId: 'js_traps',
    trackName: 'JS Execution & Traps',
    title: 'The `var` Loop Closure Trap',
    level: 'Crucible',
    category: 'Closures',
    xp: 300,
    theory: {
      hook: "Why does a `setTimeout` inside a `for (var i = 0; i < 3)` loop output `3, 3, 3` instead of `0, 1, 2`?",
      deepDive: "`var` is function-scoped, not block-scoped. So there is only ONE `i` variable in memory for the entire loop. When the loop finishes, `i` is 3. Later, when the `setTimeout` callbacks execute, they all look up that exact same `i` reference in the closure, which is now 3. `let`, on the other hand, is block-scoped, creating a brand new, distinct `i` variable in memory for every single iteration.",
      interviewPitch: "'The classic `var` loop issue is a scoping problem. The callbacks close over a single shared variable binding. By changing `var` to `let`, we create a new lexical environment for each iteration, meaning each callback closes over a fresh, immutable copy of `i` for that specific loop step.'",
      mcq: {
        q: "Besides changing `var` to `let`, how else can you fix the `var` loop closure bug in legacy code?",
        options: [
          "Use an Immediately Invoked Function Expression (IIFE) to capture the value.",
          "Pass `i` as the third argument to `setTimeout`.",
          "Both A and B work.",
          "It's impossible in ES5."
        ],
        correct: 2,
        why: "An IIFE creates a new function scope, capturing the current value of `i`. `setTimeout(fn, ms, arg1)` passes the arguments directly to the callback."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Fix this code so it logs 0, 1, 2 instead of 3, 3, 3 WITHOUT using `let` (pretend you are in an ES5 environment).",
      starterCode: `for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log("Index:", i);
  }, 100);
}`,
      solutionCode: `for (var i = 0; i < 3; i++) {
  (function(currentIndex) {
    setTimeout(function() {
      console.log("Index:", currentIndex);
    }, 100);
  })(i);
}`,
      specs: ["Should log correct indices via closure capture (IIFE or setTimeout args)."]
    }
  }
];
