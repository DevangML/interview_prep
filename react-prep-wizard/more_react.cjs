const fs = require('fs');
const path = require('path');
const p = path.resolve('src/data/masteryStream.ts');
let text = fs.readFileSync(p, 'utf-8');

const moreReactUnits = `
  {
    id: 'react-memo-referential-equality',
    trackId: 'react_core',
    trackName: 'React 19 Architecture',
    category: 'Performance Optimization',
    title: 'React.memo & The Inline Prop Trap',
    level: 'Advanced',
    xp: 100,
    theory: {
      hook: 'React.memo prevents re-renders, but passing an inline array \`[]\` or function \`() => {}\` instantly breaks it.',
      deepDive: 'When a parent renders, it creates new memory pointers for any inline arrays, objects, or functions. If you pass \`data={[1,2,3]}\` to a child wrapped in \`React.memo\`, the memoization fails because \`[1,2,3] !== [1,2,3]\` in memory. You must wrap the prop in \`useMemo\` or move it outside the component if it\\'s static.',
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
      starterCode: \`import React, { useState, memo, useMemo } from 'react';

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
}\`,
      solutionCode: \`import React, { useState, memo, useMemo } from 'react';

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
}\`,
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
      hook: 'An event listener attached inside \`useEffect\` with \`[]\` captures the state variables of the FIRST render forever.',
      deepDive: 'If you do \`window.addEventListener("scroll", handleScroll)\` inside a mount-only useEffect, the \`handleScroll\` function is a closure from the first render. If it tries to read \`count\`, it will always see \`0\`. To fix this, you must either include the state in the dependency array (which forces re-attachment of the listener), or use a mutable \`useRef\` to store the latest state.',
      interviewPitch: '"When attaching global event listeners or websockets, stale closures are the #1 source of bugs. If the listener reads state, I either use the functional update pattern \`setCount(c => c + 1)\`, or I synchronize the latest state into a \`useRef\` so the stale closure can read \`ref.current\` and get fresh data without needing to re-attach the listener constantly."',
      mcq: {
        q: 'How does \`useRef\` solve the stale closure problem in an event listener?',
        options: ['It forces the listener to re-attach.', 'It triggers a re-render.', 'Its .current property is mutable and shares the same memory address across all renders.', 'It binds "this" to the function.'],
        correct: 2,
        why: 'Because the ref object is mutated rather than recreated, the closure holding the ref pointer can read the updated .current value at any time.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Fix the stale closure. The interval is reading the stale \`count\` value (0) and logging it forever. Update the effect so it accurately reads the latest count.',
      starterCode: \`import React, { useState, useEffect, useRef } from 'react';

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
}\`,
      solutionCode: \`import React, { useState, useEffect, useRef } from 'react';

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
}\`,
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
      hook: 'When multiple state variables must change together in response to one action, \`useState\` creates race conditions. \`useReducer\` guarantees atomicity.',
      deepDive: 'If clicking "Fetch" requires \`setLoading(true)\`, \`setError(null)\`, and \`setData([])\` simultaneously, doing them as 3 \`useState\` calls is brittle. \`useReducer\` allows you to dispatch a single \`{ type: 'FETCH_START' }\` action, letting the reducer predictably transition the state machine as a single atomic unit.',
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
      task: 'Migrate the brittle multiple \`useState\` calls to the robust \`useReducer\` pattern. Implement the reducer function to handle START, SUCCESS, and ERROR actions.',
      starterCode: \`import React, { useReducer } from 'react';

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
    dispatch({ type: 'FETCH_START' });
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
}\`,
      solutionCode: \`import React, { useReducer } from 'react';

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
    dispatch({ type: 'FETCH_START' });
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
}\`,
      specs: [
        'Implements FETCH_START (loading true, clear others).',
        'Implements FETCH_SUCCESS (loading false, set data).',
        'Implements FETCH_ERROR (loading false, set error).',
      ],
    },
  },
`;

const insertMarker = "export const MASTERY_UNITS: MasteryUnit[] = [";
text = text.replace(insertMarker, moreReactUnits + "\n" + insertMarker);

fs.writeFileSync(p, text, 'utf-8');
