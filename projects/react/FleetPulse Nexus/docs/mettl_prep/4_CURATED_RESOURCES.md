# 100% Coverage Syllabus & The Elite Resource List

> **"If you read these specific articles, the Mettl engine cannot trick you. These are the definitive primary sources for the exact mechanics they test." — Victor**

---

## 1. Core Hooks & The Closure Traps (The Heaviest MCQ Weight)
The test preys on developers who don't understand how `useEffect` captures variables. You must understand *stale closures* and *dependency arrays*.

*   **The Best Guide Ever Written on `useEffect`:**
    *   [A Complete Guide to useEffect by Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)
    *   *Focus:* Read the section on "Each Render Has Its Own..." (Props, State, Event Handlers, Effects). This explains the Lexical Snapshot theory.
*   **`useMemo` vs `useCallback` (Reference Equality):**
    *   [Understanding useMemo and useCallback by Josh W. Comeau](https://www.joshwcomeau.com/react/usememo-and-usecallback/)
    *   *Focus:* Why `{}` !== `{}` in JavaScript and how to stop child components from re-rendering.
*   **React 19 & "New Hooks":**
    *   [React 19 Official Release Notes (Actions & `use`)](https://react.dev/blog/2024/04/25/react-19)
    *   *Focus:* Understand how `useActionState` replaced `useFormState` and how the `<form action>` prop automatically handles pending states.

## 2. React Router v6.4+ / v7
Mettl will test if you know how to build layouts and fetch data before a route renders.

*   **The Foundation:**
    *   [React Router Official Tutorial](https://reactrouter.com/en/main/start/tutorial)
    *   *Focus:* The `<Outlet />` component (where child routes inject) and the difference between a `loader` (fetching data) and an `action` (mutating data).
*   **`Link` vs `NavLink`:**
    *   [NavLink API Docs](https://reactrouter.com/en/main/components/nav-link)
    *   *Focus:* Memorize that `NavLink` exposes the `isActive` boolean for styling active states.

## 3. Class Components (The Legacy Gauntlet)
Mettl uses recycled bank questions from 2018. You will see class components.

*   **Lifecycle Methods & Hooks Translation:**
    *   [React Lifecycle Methods Diagram (Interactive)](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
    *   *Focus:* Memorize `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. 
*   **`setState` Asynchronous Batching:**
    *   [State Updates May Be Asynchronous (Legacy React Docs)](https://legacy.reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous)
    *   *Focus:* Why calling `this.setState({ count: this.state.count + 1 })` twice in a row only results in `+1`, and why you must use the callback form `(prevState) => ...`

## 4. Core JavaScript & DOM Mechanics
The hands-on coding simulator is technically a "Javascript skills" test. You must understand how JS evaluates truthiness.

*   **The Falsy `0` Trap & `&&` Evaluation:**
    *   [MDN: Logical AND (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)
    *   *Focus:* Understand why `0 && "Hello"` returns `0` (which React renders to the screen).
*   **`this` Binding & Arrow Functions:**
    *   [MDN: `this` Keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
    *   *Focus:* Why passing `onClick={this.handleClick}` loses context, causing `undefined` errors.
*   **Event Loop & Microtasks (For Phase 2):**
    *   [In The Loop - Jake Archibald (Video Lecture)](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
    *   *Focus:* The exact order in which `setTimeout` (Macro) and `Promise.resolve` (Micro) execute.
