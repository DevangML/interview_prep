import { MasteryUnit } from './types';

export const ecosystemUnits: MasteryUnit[] = [
  {
    id: 'react-redux-flow',
    trackId: 'react_ecosystem',
    trackName: 'Ecosystem & Tooling',
    title: 'Redux Data Flow & Purity',
    level: 'Core',
    category: 'State Management',
    xp: 200,
    theory: {
      hook: "Why must Redux reducers be absolutely pure? What happens if you mutate state directly?",
      deepDive: "Redux uses shallow equality (`===`) to determine if the state has changed. If you mutate a nested array (e.g., `state.users.push(newUser)`) and return the same state object, the reference hasn't changed. React-Redux (`useSelector`) will see `oldState === newState`, assume nothing happened, and completely skip the re-render. Reducers must return a brand new object/array reference (`...state`) to break the equality check.",
      interviewPitch: "'Reducers are pure functions mapping `(state, action) => newState`. If you mutate state, you destroy the immutability contract. Redux relies on strict reference equality checks for performance; mutating state means `useSelector` won't trigger a re-render. This is why tools like Redux Toolkit use Immer under the hood to let you write mutating syntax that compiles into immutable updates.'",
      mcq: {
        q: "Which of the following reducer cases is valid and will trigger a UI update?",
        options: [
          "state.count++; return state;",
          "return Object.assign(state, { count: state.count + 1 });",
          "return { ...state, count: state.count + 1 };",
          "state.count = state.count + 1; return { ...state };"
        ],
        correct: 2,
        why: "Option C creates a completely new root object reference without mutating the original state object. Object.assign into `state` mutates the original reference."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Fix this vanilla Redux reducer so it correctly updates a nested user object immutably.",
      starterCode: `const initialState = {
  settings: { theme: 'dark' },
  user: { name: 'Alice', age: 25 }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'BIRTHDAY':
      // FIX THIS: Do not mutate state!
      state.user.age += 1;
      return state;
    default:
      return state;
  }
}`,
      solutionCode: `const initialState = {
  settings: { theme: 'dark' },
  user: { name: 'Alice', age: 25 }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'BIRTHDAY':
      return {
        ...state,
        user: {
          ...state.user,
          age: state.user.age + 1
        }
      };
    default:
      return state;
  }
}`,
      specs: ["Should return a completely new state tree branch immutably."]
    }
  },
  {
    id: 'react-router-v6',
    trackId: 'react_ecosystem',
    trackName: 'Ecosystem & Tooling',
    title: 'React Router v6 Paradigms',
    level: 'Core',
    category: 'Routing',
    xp: 150,
    theory: {
      hook: "How does React Router change the URL without causing a full page reload?",
      deepDive: "React Router uses the HTML5 History API (`pushState` and `replaceState`). When you click a `<Link>`, it intercepts the default `<a>` tag behavior (`e.preventDefault()`), pushes the new URL to the browser history, and updates a global context state. The `<Routes>` component listens to this context, unmounts the old component, and mounts the new one matching the path.",
      interviewPitch: "'React Router bridges the browser's History API with React's component tree. In v6, nested routing is handled seamlessly with the `<Outlet>` component, acting as a placeholder for child routes. This allows for persistent UI elements like sidebars while only re-rendering the inner page content.'",
      mcq: {
        q: "In React Router v6, what is the purpose of the `<Outlet />` component?",
        options: [
          "It forces a hard reload of the page.",
          "It acts as a placeholder to render nested child route components.",
          "It defines the root router provider.",
          "It replaces the `useNavigate` hook."
        ],
        correct: 1,
        why: "`<Outlet />` is placed in a parent route layout to tell React Router where to render the matching child routes."
      }
    },
    practice: {
      type: 'jsx',
      task: "Build a nested route layout. The parent `Dashboard` should render a title and an `<Outlet />` so the child `Profile` can render inside it.",
      starterCode: `import { Routes, Route, Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* ADD OUTLET HERE */}
    </div>
  );
}

function Profile() { return <h2>My Profile</h2>; }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        {/* NEST PROFILE ROUTE HERE */}
      </Route>
    </Routes>
  );
}`,
      solutionCode: `import { Routes, Route, Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}

function Profile() { return <h2>My Profile</h2>; }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}`,
      specs: ["Should correctly use Outlet and nested Routes."]
    }
  },
  {
    id: 'build-tooling-tree-shaking',
    trackId: 'react_ecosystem',
    trackName: 'Ecosystem & Tooling',
    title: 'Webpack & Tree Shaking',
    level: 'Advanced',
    category: 'Tooling',
    xp: 200,
    theory: {
      hook: "How does Webpack know which code is 'dead' and can be safely deleted from your final production bundle?",
      deepDive: "This process is called 'Tree Shaking'. It relies entirely on the static nature of ES6 modules (`import`/`export`). Because ES6 modules are static, bundlers can analyze the dependency tree at compile-time (unlike `require()`, which is dynamic). If an exported function is never imported anywhere, Webpack marks it as dead code. The minifier (like Terser) then completely removes it from the final bundle.",
      interviewPitch: "'Tree shaking is dead-code elimination. It only works with ES6 modules because their static structure allows the bundler to map dependencies without executing the code. To ensure it works, we must ensure Babel isn't transpiling our imports down to CommonJS (`require`), and we must be careful with 'side effects' (code that executes just by importing a file).'",
      mcq: {
        q: "Why does Tree Shaking fail if you use CommonJS `require()`?",
        options: [
          "CommonJS is asynchronous.",
          "CommonJS modules are evaluated dynamically at runtime, so the bundler cannot prove what is used.",
          "CommonJS requires strict mode.",
          "Webpack doesn't support CommonJS."
        ],
        correct: 1,
        why: "With `require()`, you can conditionally import modules inside `if` statements. The bundler cannot predict runtime paths, so it must bundle everything."
      }
    },
    practice: {
      type: 'js_snippet',
      task: "Refactor this CommonJS code into ES6 Modules so that Webpack can tree-shake `formatDate` if it's never used.",
      starterCode: `// utils.js
function sum(a, b) { return a + b; }
function formatDate(date) { return date.toISOString(); }

module.exports = { sum, formatDate };

// app.js
const utils = require('./utils');
console.log(utils.sum(2, 2));`,
      solutionCode: `// utils.js
export function sum(a, b) { return a + b; }
export function formatDate(date) { return date.toISOString(); }

// app.js
import { sum } from './utils';
console.log(sum(2, 2));`,
      specs: ["Should use ES6 static imports/exports for tree-shaking support."]
    }
  }
];
