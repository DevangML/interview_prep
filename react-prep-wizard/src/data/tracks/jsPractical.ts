import { MasteryUnit } from './types';

export const jsPracticalUnits: MasteryUnit[] = [
  {
    id: 'vanilla-debounce',
    trackId: 'js_practical',
    trackName: 'Vanilla JS Machine Coding',
    title: 'The Debounced Search API',
    level: 'Crucible',
    category: 'Async & DOM',
    xp: 250,
    theory: {
      hook: "Mettl throws a curveball: 'Build a search bar that calls an API, but you cannot use React.' Can you survive?",
      deepDive: "A classic technical round trap. They want to see if you rely entirely on React hooks or if you actually understand the underlying browser mechanics. You must use a closure to hold the `timer` ID, `clearTimeout` on every keystroke, and invoke the network request only when the user stops typing.",
      interviewPitch: "'Debouncing limits the rate at which a function fires. It’s crucial for performance on search inputs or window resizes. I implement it using a higher-order function that returns a closure; the closure tracks the timeout ID and resets it every time it's called before the delay expires.'",
      mcq: {
        q: "In a debounce function, why must the timer variable be declared OUTSIDE the returned inner function?",
        options: [
          "Because inner functions cannot declare variables.",
          "So the variable persists in memory (closure) across multiple calls to the inner function.",
          "To make it globally accessible to the window object.",
          "To avoid strict mode errors."
        ],
        correct: 1,
        why: "If the timer was declared inside the returned function, it would be recreated as `undefined` on every keystroke, destroying the ability to clear the previous timeout."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Implement the `debounce` higher-order function. It should delay calling `fn` until `delay` ms have passed since the last invocation.",
      starterCode: `function debounce(fn, delay) {
  // Your code here
}

// Test case (should only log "Fetching: apple" once)
const fetchResults = debounce((query) => console.log("Fetching:", query), 300);

fetchResults("a");
fetchResults("ap");
fetchResults("app");
fetchResults("appl");
fetchResults("apple");`,
      solutionCode: `function debounce(fn, delay) {
  let timerId;
  
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const fetchResults = debounce((query) => console.log("Fetching:", query), 300);

fetchResults("a");
fetchResults("ap");
fetchResults("app");
fetchResults("appl");
fetchResults("apple");`,
      specs: ["Should execute the function only once after rapid successive calls."]
    }
  },
  {
    id: 'polyfill-reduce',
    trackId: 'js_practical',
    trackName: 'Vanilla JS Machine Coding',
    title: 'Polyfill: Array.prototype.reduce',
    level: 'Advanced',
    category: 'Polyfills',
    xp: 300,
    theory: {
      hook: "If you don't know how `reduce` works under the hood, how can you trust it for complex data transformations?",
      deepDive: "Writing polyfills is the ultimate test of JS mastery. To build `reduce`, you must understand `this` (which points to the array calling the method), handle the optional `initialValue`, and iterate correctly, feeding the accumulator forward into the callback.",
      interviewPitch: "'Writing a polyfill for reduce requires handling the execution context (`this`), managing the accumulator state, and treating the initial value correctly. If no initial value is provided, the first element of the array becomes the accumulator, and iteration starts from index 1.'",
      mcq: {
        q: "Inside a polyfill function assigned to `Array.prototype.myMap = function() { ... }`, what does `this` refer to?",
        options: [
          "The global window object.",
          "The `myMap` function itself.",
          "The array that the method was called on.",
          "undefined"
        ],
        correct: 2,
        why: "When a function is called as a method on an object (e.g., `[1,2,3].myMap()`), `this` binds to the object (the array) left of the dot."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Implement `Array.prototype.myReduce`. Do not use the native `.reduce()`.",
      starterCode: `Array.prototype.myReduce = function(callback, initialValue) {
  // Your code here. Remember 'this' is the array.
  
};

const nums = [1, 2, 3, 4];
const sum = nums.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // Should be 10`,
      solutionCode: `Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  // If no initialValue is provided, use the first element
  if (initialValue === undefined) {
    if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

const nums = [1, 2, 3, 4];
const sum = nums.myReduce((acc, curr) => acc + curr, 0);
console.log(sum);`,
      specs: ["Should correctly accumulate values with and without an initial value."]
    }
  }
];
