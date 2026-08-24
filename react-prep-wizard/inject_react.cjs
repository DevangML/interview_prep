const fs = require('fs');
const path = require('path');
const p = path.resolve('src/data/masteryStream.ts');
let text = fs.readFileSync(p, 'utf-8');

// 1. Fix the ladderUnits mapping
text = text.replace(
  /trackId: 'react_core',\n\s*trackName: 'React 19 Architecture',/g,
  "trackId: 'css_layouts',\n  trackName: 'CSS 2D Layouts',"
);
text = text.replace(
  /category: \`Stage \$\{lesson\.stage\} Fundamentals\`,/g,
  "category: `Ladder Stage ${lesson.stage} (CSS)`,"
);

// 2. Define the new React 19 Core Units
const reactUnits = `
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
      starterCode: \`import React, { useState, useEffect } from 'react';

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
}\`,
      solutionCode: \`import React, { useState, useEffect } from 'react';

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
}\`,
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
      hook: 'Passing a new object reference to a Context Provider value causes ALL consumers to re-render, even if the data inside hasn\\'t changed.',
      deepDive: 'When the parent of a Context.Provider re-renders, it evaluates \`value={{ user, theme }}\`. This creates a brand new object in memory (a new pointer). React compares the old value to the new value using \`Object.is()\`. Since the pointers are different, it forces a re-render of every component consuming that context. You must wrap the object in \`useMemo\` to preserve referential equality.',
      interviewPitch: '"In technical rounds, if asked how to optimize Context API, I explain referential equality. I always wrap the Provider\\'s value object in useMemo. Otherwise, any unrelated state change in the parent creates a new object reference, triggering a catastrophic re-render waterfall for every consumer down the tree."',
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
      starterCode: \`import React, { useState, createContext, useContext, useMemo } from 'react';

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
}\`,
      solutionCode: \`import React, { useState, createContext, useContext, useMemo } from 'react';

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
}\`,
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
      deepDive: 'In a search bar, typing "React" triggers 5 state updates. If you fetch data on every keystroke, you DDoS your own backend. \`useDebounce\` is a custom hook that takes a value and a delay. It sets a timeout to update a \`debouncedValue\` state. If the value changes before the timeout finishes, the \`useEffect\` cleanup function clears the previous timeout, preventing the update.',
      interviewPitch: '"Writing a useDebounce hook is my go-to signal for senior-level React knowledge. It perfectly demonstrates understanding of useEffect cleanup functions. By clearing the timeout in the cleanup phase, we guarantee that only the final keystroke (after the user pauses) actually triggers the debounced state update."',
      mcq: {
        q: 'When does the useEffect cleanup function run?',
        options: ['Only when the component unmounts.', 'Before the effect runs again, and on unmount.', 'After the effect finishes executing.', 'When the browser closes.'],
        correct: 1,
        why: 'React runs the cleanup function to clean up the previous render\\'s effect BEFORE running the new effect.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Implement the useDebounce hook. It must use useEffect, setTimeout, and the cleanup function (clearTimeout) to only return the value after 500ms of inactivity.',
      starterCode: \`import React, { useState, useEffect } from 'react';

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
}\`,
      solutionCode: \`import React, { useState, useEffect } from 'react';

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
}\`,
      specs: [
        'Implements setTimeout inside useEffect.',
        'Implements clearTimeout in the cleanup return function.',
      ],
    },
  },
];
`;

text = text.replace(
  "export const MASTERY_UNITS: MasteryUnit[] = [",
  reactUnits + "\nexport const MASTERY_UNITS: MasteryUnit[] = ["
);

text = text.replace(
  "...ladderUnits.filter(u => u.practice.starterCode)",
  "...ladderUnits.filter(u => u.practice.starterCode),\n  ...reactUnits"
);

fs.writeFileSync(p, text, 'utf-8');
