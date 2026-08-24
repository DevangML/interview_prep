const fs = require('fs');
const path = require('path');
const p = path.resolve('src/data/masteryStream.ts');
let text = fs.readFileSync(p, 'utf-8');

const additionalUnits = `
  // --- JS CORE 5: CLOSURES & STALE STATE ---
  {
    id: 'js-closures-stale-state',
    trackId: 'js_core',
    trackName: 'JS Memory & Equality',
    title: 'Closures & Stale State (The React Hooks Trap)',
    level: 'Crucible',
    xp: 75,
    theory: {
      hook: 'A closure "remembers" the variables in its lexical scope at the exact moment it was created.',
      deepDive: 'When you create a function inside another function (like an event handler or useEffect inside a React component), it captures the state variables from that specific render pass. If the function is delayed (e.g., setTimeout) and state changes in the meantime, the function will still see the OLD (stale) state.',
      interviewPitch: '"A common React interview question is why a setTimeout inside a useEffect sees an old state value. I explain that React hooks rely on closures. Each render creates a new closure over the state variables of that render. A delayed function holds a reference to the environment of the render where it was created, not the latest one. To fix it, you either use a ref (which is mutable and survives renders) or functional state updates like \`setCount(c => c + 1)\`."',
      mcq: {
        q: 'If \`count = 0\` and you run: \`setTimeout(() => console.log(count), 1000)\`, then immediately \`count = 99\`, what logs?',
        options: ['0', '99', 'undefined', 'ReferenceError'],
        correct: 0,
        why: 'The setTimeout callback forms a closure over the value of \`count\` (0) at the time it was declared.',
      },
    },
    practice: {
      type: 'js_snippet',
      task: 'Fix the stale closure bug. The timeout currently logs the stale value (0) instead of the updated value. Use an object reference (like a React ref) so the closure reads the latest value.',
      starterCode: \`// The Stale Closure Bug
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
createRefCounter();\`,
      solutionCode: \`// The Stale Closure Bug
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
createRefCounter();\`,
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
    xp: 50,
    theory: {
      hook: 'Regular functions determine \`this\` dynamically based on WHO called them. Arrow functions determine \`this\` lexically based on WHERE they were written.',
      deepDive: 'Before arrow functions, passing a method as a callback (like \`element.addEventListener(\\'click\\', obj.method)\`) would strip the object binding, and \`this\` would become the window or undefined. Arrow functions don\\'t have their own \`this\`. They look up the scope chain just like any normal variable.',
      interviewPitch: '"When asked why we used to \`bind(this)\` in React class components, I explain dynamic execution context. A method passed as an event handler loses its instance context when invoked by the DOM. Arrow functions solved this because their \`this\` is lexically scoped to the enclosing class, permanently binding it to the instance."',
      mcq: {
        q: 'What does \`this\` refer to inside a global arrow function?',
        options: ['The Window object', 'undefined', 'null', 'The function itself'],
        correct: 0,
        why: 'An arrow function in the global scope inherits \`this\` from the global scope, which is the Window object in a browser.',
      },
    },
    practice: {
      type: 'js_snippet',
      task: 'The \`greet\` method inside the timeout loses its \`this\` context because it is passed as a callback. Fix it by using an arrow function so it inherits \`this\` from \`user.delayGreeting()\`.',
      starterCode: \`const user = {
  name: "Alex",
  delayGreeting() {
    // BUG: setTimeout executes the callback in a different context.
    // \`this\` will be undefined/window, so \`this.name\` fails.
    setTimeout(function() {
      console.log("Hello, my name is", this.name);
    }, 50);
  }
};

user.delayGreeting();\`,
      solutionCode: \`const user = {
  name: "Alex",
  delayGreeting() {
    // FIX: Arrow functions inherit \`this\` lexically from delayGreeting
    setTimeout(() => {
      console.log("Hello, my name is", this.name);
    }, 50);
  }
};

user.delayGreeting();\`,
      specs: [
        'Identifies the broken dynamic binding.',
        'Fixes it using a lexical arrow function.',
      ],
    },
  },
`;

const insertMarker = "];\n\n// Dynamically port the CSS100 items";
text = text.replace(insertMarker, additionalUnits + insertMarker);

fs.writeFileSync(p, text, 'utf-8');
