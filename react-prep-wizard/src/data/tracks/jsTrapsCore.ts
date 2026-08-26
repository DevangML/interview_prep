import type { MasteryUnit } from './types';

export const jsTrapsCoreUnits: MasteryUnit[] = [
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
        options: ["undefined, ReferenceError", "ReferenceError, ReferenceError", "undefined, undefined", "1, 2"],
        correct: 0,
        why: "`var a` is hoisted and initialized to `undefined`. `let b` is hoisted but stays in the TDZ, so accessing it throws a ReferenceError."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Fix the function so it doesn't throw a ReferenceError or output `undefined`. Ensure the function captures the correct scoped variables.",
      starterCode: `function calculate() {\n  console.log(multiplier);\n  console.log(calculateTotal());\n\n  var multiplier = 10;\n  \n  const calculateTotal = () => {\n    return 5 * multiplier;\n  };\n}\n\ncalculate();`,
      solutionCode: `function calculate() {\n  const multiplier = 10;\n  \n  const calculateTotal = () => {\n    return 5 * multiplier;\n  };\n\n  console.log(multiplier);\n  console.log(calculateTotal());\n}\n\ncalculate();`,
      specs: ["Should correctly order variable declarations to avoid TDZ and undefined."]
    }
  },
  {
    id: 'js-traps-this-binding',
    trackId: 'js_traps',
    trackName: 'JS Execution & Traps',
    title: '`this` Binding & Arrow Function Traps',
    level: 'Advanced',
    category: 'Execution Context',
    xp: 200,
    theory: {
      hook: "Why does passing an object method as a callback log `undefined` or the global object instead of your target data?",
      deepDive: "In standard functions, `this` is dynamically bound based on *how* the function is invoked (the call site). When detached as a callback, it defaults to `undefined` (in strict mode) or `window`. Arrow functions do NOT possess their own `this` binding—they lexically capture `this` from the enclosing lexical execution context at definition time.",
      interviewPitch: "State clearly: 'Arrow functions do not bind their own `this`, `arguments`, `super`, or `new.target`. They inherit `this` from the parent scope. Standard functions bind `this` dynamically at invocation time unless explicitly bound using `.bind()`, `.call()`, or `.apply()`.'",
      mcq: {
        q: "What does the following snippet log?\n\nconst obj = {\n  val: 42,\n  getVal: () => this.val\n};\nconsole.log(obj.getVal());",
        options: ["42", "undefined", "TypeError", "NaN"],
        correct: 1,
        why: "Object literals do NOT create a new lexical scope. The arrow function captures `this` from the outer module or window scope, where `val` is undefined."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Fix the timer callback inside the `Timer` class so it correctly accesses `this.seconds` without losing the class instance context.",
      starterCode: `class Timer {\n  constructor() {\n    this.seconds = 0;\n  }\n  start() {\n    setTimeout(function() {\n      this.seconds += 1;\n      console.log("Seconds:", this.seconds);\n    }, 100);\n  }\n}\n\nconst t = new Timer();\nt.start();`,
      solutionCode: `class Timer {\n  constructor() {\n    this.seconds = 0;\n  }\n  start() {\n    setTimeout(() => {\n      this.seconds += 1;\n      console.log("Seconds:", this.seconds);\n    }, 100);\n  }\n}\n\nconst t = new Timer();\nt.start();`,
      specs: ["Should preserve `this` context inside asynchronous callback."]
    }
  }
];
