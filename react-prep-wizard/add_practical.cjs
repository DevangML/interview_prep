const fs = require('fs');
const path = require('path');
const p = path.resolve('src/data/masteryStream.ts');
let text = fs.readFileSync(p, 'utf-8');

// 1. Update trackId union
text = text.replace(
  "trackId: 'js_core' | 'css_layouts' | 'react_core' | 'async_apis';",
  "trackId: 'js_core' | 'css_layouts' | 'react_core' | 'react_practical' | 'async_apis';"
);

// 2. Add to MASTERY_TRACKS
text = text.replace(
  "{ id: 'react_core', name: 'React 19 Architecture', icon: '⚛️' },",
  "{ id: 'react_core', name: 'React 19 Architecture', icon: '⚛️' },\n  { id: 'react_practical', name: 'React Machine Coding', icon: '🏗️' },"
);

// 3. Define the new practical units
const practicalUnits = `
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
      deepDive: 'Never store "filteredData" in its own useState if it can be calculated from "allData" and "searchQuery". Syncing two states manually leads to bugs (e.g., when raw data updates but you forget to update the filtered array). Instead, derive it during render: \\\`const visible = data.filter(d => d.name.includes(search))\\\`.',
      interviewPitch: '"In machine coding rounds, a searchable list is the most common task. Interviewers look for two things: 1) Are you duplicating state (storing filtered results in useState), and 2) Are you using semantic HTML like tables or clean CSS grid? I always use derived state to ensure a single source of truth, and wrap the filtering logic in useMemo if the dataset is massive."',
      mcq: {
        q: 'Why shouldn\\'t you store \\\`filteredUsers\\\` in its own \\\`useState\\\`?',
        options: ['It causes memory leaks.', 'It creates redundant state that easily goes out of sync with the raw data.', 'It breaks React.memo.', 'useState can only hold strings and numbers.'],
        correct: 1,
        why: 'Derived state (calculating the filtered list during render) guarantees that the UI always perfectly matches the raw data and search query.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Build a searchable employee directory. A list of users is provided. Create an input field to filter them by name (case-insensitive). Do not create a separate state for the filtered array—derive it!',
      starterCode: \`import React, { useState } from 'react';

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
}\`,
      solutionCode: \`import React, { useState } from 'react';

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
}\`,
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
      deepDive: 'When hovering over star #4, stars 1-4 should light up, temporarily overriding the committed rating (say, 2). When the mouse leaves the widget entirely, it must snap back to the committed rating (2). This requires two states: \\\`rating\\\` and \\\`hoverValue\\\`.',
      interviewPitch: '"The star rating is a classic test of separating temporary visual state from committed data state. I structure it using an array mapped to indexes, passing the index to mouse handlers. I ensure the UI derives its active class by checking if the star\\'s index is less than or equal to (hoverValue || rating)."',
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
      starterCode: \`import React, { useState } from 'react';

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
}\`,
      solutionCode: \`import React, { useState } from 'react';

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
                className={\`transition-colors duration-200 \${isActive ? 'text-amber-400' : 'text-slate-700'}\`}
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
}\`,
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
      deepDive: 'Recursive components are the only way to render arbitrary tree data. A \\\`Folder\\\` component takes a \\\`node\\\` prop. If the node has \\\`children\\\`, it renders its own title, and then maps over its children, returning \\\`<Folder key={child.id} node={child} />\\\` for each one. State for "isExpanded" lives inside the Folder component itself, so each level manages its own toggle.',
      interviewPitch: '"Recursive rendering is a frequent technical screen for Senior roles. It proves you understand component encapsulation. The trick is ensuring the recursion has a base case (e.g. no children means it\\'s a file) and giving each instance its own local state for expanding/collapsing, rather than trying to track the open state of every node in a massive global Redux store."',
      mcq: {
        q: 'Where should the \\\`isOpen\\\` state live in a recursive tree?',
        options: ['In a global Redux store.', 'In the top-level parent App component.', 'Inside the recursive Component itself, locally.', 'It shouldn\\'t be state, it should be in the DOM.'],
        correct: 2,
        why: 'Keeping isOpen local to the recursive component means you don\\'t have to manage a complex dictionary of IDs and booleans in the parent.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Build a recursive Folder tree. If a node is a folder, clicking it should toggle its children. Indent nested levels to make the hierarchy visible.',
      starterCode: \`import React, { useState } from 'react';

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
}\`,
      solutionCode: \`import React, { useState } from 'react';

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
}\`,
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
      hook: 'To build a stopwatch, you need a way to store the interval ID so you can clear it later. \\\`useState\\\` would cause a re-render just for saving the ID. \\\`useRef\\\` is the correct tool.',
      deepDive: 'A ref is essentially a mutable object \\\`{ current: initialValue }\\\` that React guarantees will persist across re-renders. When you start an interval, you store the ID in \\\`intervalRef.current = setInterval(...)\\\`. This doesn\\'t trigger a render. When you pause, you call \\\`clearInterval(intervalRef.current)\\\`.',
      interviewPitch: '"A common pitfall in stopwatch challenges is storing the timer ID in useState. This triggers an unnecessary render when starting the timer, and worse, if you try to clear it inside an unmount cleanup function, a stale closure might prevent you from accessing the correct ID. Storing the ID in a useRef ensures synchronous, stable access without polluting the render cycle."',
      mcq: {
        q: 'Why is \\\`useRef\\\` preferred over \\\`let timerId\\\` declared outside the component?',
        options: ['It is faster.', 'A global let variable would be shared across ALL instances of the component, breaking if you render two stopwatches.', 'useRef automatically clears intervals.', 'let variables cannot hold numbers.'],
        correct: 1,
        why: 'Variables outside a component are global to the module. If you render <Stopwatch /> twice, they will overwrite each other\\'s timer IDs. useRef is scoped to the specific component instance.',
      },
    },
    practice: {
      type: 'jsx',
      task: 'Build a Stopwatch with Start, Stop, and Reset buttons. Track the time in hundredths of a second (10ms intervals). Format the output cleanly (e.g. 0.00). Use useRef to store the interval ID.',
      starterCode: \`import React, { useState, useRef } from 'react';

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
}\`,
      solutionCode: \`import React, { useState, useRef, useEffect } from 'react';

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
}\`,
      specs: [
        'Uses useRef to store the timer ID without triggering re-renders.',
        'Prevents multiple simultaneous intervals on rapid clicking.',
        'Clears the interval on unmount to prevent memory leaks.',
      ],
    },
  }
];
`;

text = text.replace(
  "export const MASTERY_UNITS: MasteryUnit[] = [",
  practicalUnits + "\nexport const MASTERY_UNITS: MasteryUnit[] = ["
);

text = text.replace(
  "...reactUnits",
  "...reactUnits,\n  ...practicalReactUnits"
);

fs.writeFileSync(p, text, 'utf-8');
