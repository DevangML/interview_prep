import { RAPID_FIRE_BANK, type MettlCompetency } from './rapidFireBank';

export { METTL_BLUEPRINT, METTL_PAPER, buildMettlPaper, bankCoverage } from './rapidFireBank';
export type { BankQuestion, MettlCompetency, BankDifficulty } from './rapidFireBank';

/**
 * The original two buckets stay so nothing already written is orphaned; the
 * Mettl competency names are added because the exam is graded against those,
 * not against a taxonomy we invented.
 */
export type RapidCategory = 'JS Logic' | 'React Architecture' | MettlCompetency;

export interface RapidQuestion {
  id: string;
  category: RapidCategory;
  question: string;
  codeSnippet?: string;
  options: string[];
  correct: number; // index of correct option
  explanation: string;
  /** Present on syllabus-mapped items: the vendor's own sub-skill name. */
  skill?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export const RAPID_FIRE_DB: RapidQuestion[] = [
  // --- JS LOGIC ---
  {
    id: 'js-1',
    category: 'JS Logic',
    question: 'What is the output of this code?',
    codeSnippet: `const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);`,
    options: ['123', '456', 'undefined', 'ReferenceError'],
    correct: 1,
    explanation: 'Object keys are stringified. Both `b` and `c` are objects, so they stringify to `"[object Object]"`. `a["[object Object]"]` is first set to 123, then overwritten with 456.'
  },
  {
    id: 'js-2',
    category: 'JS Logic',
    question: 'What is the output?',
    codeSnippet: `console.log(typeof typeof 1);`,
    options: ['"number"', '"string"', '"object"', '"undefined"'],
    correct: 1,
    explanation: '`typeof 1` returns the string `"number"`. Then `typeof "number"` returns the string `"string"`.'
  },
  {
    id: 'js-3',
    category: 'JS Logic',
    question: 'What is the evaluation of this map function?',
    codeSnippet: `['1', '7', '11'].map(parseInt);`,
    options: ['[1, 7, 11]', '[1, NaN, 3]', '[1, NaN, NaN]', '[1, 7, 3]'],
    correct: 1,
    explanation: '`parseInt` takes two arguments: string and radix. `map` passes (element, index). So it runs: parseInt("1", 0) -> 1, parseInt("7", 1) -> NaN, parseInt("11", 2) -> 3.'
  },
  {
    id: 'js-4',
    category: 'JS Logic',
    question: 'What gets logged to the console?',
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}`,
    options: ['0 1 2', '3 3 3', 'undefined undefined undefined', '1 2 3'],
    correct: 1,
    explanation: '`var` is function scoped. By the time the `setTimeout` callbacks run, the loop has completed and `i` is 3. All three callbacks reference the same `i`.'
  },
  {
    id: 'js-5',
    category: 'JS Logic',
    question: 'What is the exact output order?',
    codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: ['1, 2, 3, 4', '1, 4, 2, 3', '1, 4, 3, 2', '1, 3, 4, 2'],
    correct: 2,
    explanation: 'Synchronous code runs first (1, 4). Microtasks (Promises) run next (3). Macrotasks (setTimeout) run last (2).'
  },
  {
    id: 'js-6',
    category: 'JS Logic',
    question: 'What does this output?',
    codeSnippet: `const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius
};

console.log(shape.diameter());
console.log(shape.perimeter());`,
    options: ['20 and 62.83...', '20 and NaN', 'NaN and 62.83...', 'NaN and NaN'],
    correct: 1,
    explanation: 'Regular functions bind `this` to the object calling it (shape). Arrow functions lexically bind `this` to the surrounding scope (window/global), where `radius` is undefined, resulting in NaN.'
  },
  // --- REACT ARCHITECTURE ---
  {
    id: 'react-1',
    category: 'React Architecture',
    question: 'What is the value of `count` on the screen after the button is clicked ONCE?',
    codeSnippet: `const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};

return <button onClick={handleClick}>{count}</button>;`,
    options: ['3', '1', '0', 'undefined'],
    correct: 1,
    explanation: 'React batches state updates. All three calls use the same captured closure value of `count` (0). So it runs `setCount(0+1)` three times. The result is 1.'
  },
  {
    id: 'react-2',
    category: 'React Architecture',
    question: 'When will the `useEffect` cleanup function run in this component?',
    codeSnippet: `useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(timer);
}, [userId]);`,
    options: [
      'Only when the component unmounts.',
      'Only when `userId` changes.',
      'Before the component unmounts AND before the effect re-runs when `userId` changes.',
      'After the new effect runs when `userId` changes.'
    ],
    correct: 2,
    explanation: 'Cleanup functions run when the component unmounts, AND they run to clean up the previous effect *before* executing the new effect if the dependencies (`userId`) change.'
  },
  {
    id: 'react-3',
    category: 'React Architecture',
    question: 'What happens if you mutate a state array directly instead of copying it?',
    codeSnippet: `const [items, setItems] = useState([1, 2, 3]);

const add = () => {
  items.push(4);
  setItems(items);
};`,
    options: [
      'The array updates and the component re-renders.',
      'The array updates in memory, but the component DOES NOT re-render.',
      'React throws a mutation error.',
      'The component crashes.'
    ],
    correct: 1,
    explanation: 'React uses `Object.is` (reference equality) to check for state changes. Since the `items` array reference is exactly the same, React bails out and does not trigger a re-render.'
  },
  {
    id: 'react-4',
    category: 'React Architecture',
    question: 'Why does React require a `key` prop when rendering a list of elements?',
    codeSnippet: `items.map(item => <li key={item.id}>{item.name}</li>)`,
    options: [
      'To style the elements individually.',
      'To help the React Reconciler identify which items have changed, are added, or are removed.',
      'To prevent XSS (Cross-Site Scripting) attacks.',
      'To pass data to the child component automatically.'
    ],
    correct: 1,
    explanation: 'Keys give React elements a stable identity across renders, allowing the reconciliation algorithm (diffing) to efficiently update the DOM rather than destroying and recreating nodes.'
  },
  {
    id: 'react-5',
    category: 'React Architecture',
    question: 'What is the primary difference between `useMemo` and `React.memo`?',
    codeSnippet: `// Concept Question`,
    options: [
      '`useMemo` memoizes a component, `React.memo` memoizes a value.',
      '`useMemo` memoizes a calculated value inside a component, `React.memo` is a HOC that memoizes a whole component based on props.',
      'They are aliases for the exact same function.',
      '`useMemo` runs on the server, `React.memo` runs on the client.'
    ],
    correct: 1,
    explanation: '`useMemo` caches the result of an expensive calculation between renders. `React.memo` prevents a child component from re-rendering if its props have not changed.'
  },

  // ── Syllabus-mapped bank, built from Mercer | Mettl's published competency
  // lists. See _bmad-output/research/technical-mettl-react-oa-research-2026-08-25.md
  ...RAPID_FIRE_BANK,
];
