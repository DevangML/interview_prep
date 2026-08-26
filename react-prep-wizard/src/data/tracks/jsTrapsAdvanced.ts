import type { MasteryUnit } from './types';

export const jsTrapsAdvancedUnits: MasteryUnit[] = [
  {
    id: 'js-traps-event-loop',
    trackId: 'js_traps',
    trackName: 'JS Execution & Traps',
    title: 'Microtasks vs Macrotasks Execution Order',
    level: 'Advanced',
    category: 'Event Loop',
    xp: 250,
    theory: {
      hook: "In what order do `setTimeout(..., 0)`, `Promise.resolve()`, `queueMicrotask`, and synchronous code execute?",
      deepDive: "The JavaScript runtime executes synchronous code on the Call Stack. When the Call Stack clears, the Event Loop processes the ENTIRE Microtask Queue (Promises, `queueMicrotask`, MutationObserver) before executing the NEXT SINGLE Macrotask (`setTimeout`, `setInterval`, I/O). If a microtask enqueues another microtask, it will starve the macrotask queue.",
      interviewPitch: "Explain: 'Microtasks have higher priority than macrotasks. The event loop drains the entire microtask queue at the end of each tick/macrotask, before yielding to the browser rendering phase or the next macrotask.'",
      mcq: {
        q: "What is the logged sequence of:\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
        options: ["1, 4, 3, 2", "1, 2, 3, 4", "1, 4, 2, 3", "3, 1, 4, 2"],
        correct: 0,
        why: "Synchronous logs (1, 4) execute first. Then the Promise microtask (3) drains. Finally, the setTimeout macrotask (2) runs."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Arrange the calls so that the console output matches the exact order: Sync 1, Sync 2, Micro 1, Micro 2, Macro 1.",
      starterCode: `// Produce output:\n// Sync 1\n// Sync 2\n// Micro 1\n// Micro 2\n// Macro 1\n\nconsole.log('Sync 1');`,
      solutionCode: `console.log('Sync 1');\n\nsetTimeout(() => {\n  console.log('Macro 1');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('Micro 1');\n}).then(() => {\n  console.log('Micro 2');\n});\n\nconsole.log('Sync 2');`,
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
      starterCode: `for (var i = 0; i < 3; i++) {\n  setTimeout(function() {\n    console.log("Index:", i);\n  }, 100);\n}`,
      solutionCode: `for (var i = 0; i < 3; i++) {\n  (function(currentIndex) {\n    setTimeout(function() {\n      console.log("Index:", currentIndex);\n    }, 100);\n  })(i);\n}`,
      specs: ["Should log correct indices via closure capture (IIFE or setTimeout args)."]
    }
  }
];
