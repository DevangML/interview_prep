# The Mettl MCQ Master Guide (Exhaustive Theory Expansion)

> **"Do not memorize the answer. Understand the engine, and the answer becomes obvious." — Victor**

This manual breaks down the precise theoretical mechanics behind every trap in the Mercer Mettl assessment. By understanding the underlying V8/React Fiber engine behavior, you will be able to crack any syntax variation Mettl throws at you.

---

## Domain 1: React Core Hooks (The Deep Mechanics)

### 1. The `useEffect` Closure & Cleanup Trap
*   **The Core Theory:** Every time a React component renders, it creates a new *lexical environment* (a snapshot of the state/props at that exact moment). `useEffect` captures these variables in a closure. If the dependency array is empty `[]`, the effect holds onto the state from the *first* render forever.
*   **The Mettl Trap (Code Variant):**
    ```jsx
    function Timer() {
      const [count, setCount] = useState(0);
      useEffect(() => {
        setInterval(() => {
          setCount(count + 1); // TRAP: count is always 0 inside this closure
        }, 1000);
      }, []); // Empty deps
    }
    ```
    *Mettl asks:* What does this render after 3 seconds?
    *Answer:* It renders `1`, forever. Because `count` is trapped at `0` from the initial render, it repeatedly executes `setCount(0 + 1)`.
*   **The Mettl Cleanup Trap:** They omit `return () => clearInterval(id)`. Unmounting the component leaves the timer running in the background, causing a memory leak warning.
*   **The Unbreakable Heuristic:** **"If a hook uses a state variable, it MUST be in the dependency array. If it sets an interval, it MUST return a clearer."**
*   **React 19 Edge Case:** In React 19 Strict Mode, `useEffect` is invoked twice in development (mount $\rightarrow$ unmount $\rightarrow$ mount) to deliberately surface missing cleanup functions.

### 2. `useMemo` vs `useCallback` (Reference Stability)
*   **The Core Theory:** In JavaScript, `{}` is never equal to `{}` (different memory addresses). When a parent renders, all objects and functions inside it are recreated. Passing a recreated function to a child component breaks `React.memo()`, forcing the child to re-render.
*   **The Mettl Trap (Code Variant):**
    ```jsx
    const Parent = () => {
       const [tick, setTick] = useState(0);
       // TRAP: This function is recreated every time 'tick' changes
       const fetchData = () => api.get('/data'); 
       return <ChildMemoized fetch={fetchData} />
    }
    ```
    *Mettl asks:* Why does `ChildMemoized` re-render when `tick` updates?
    *Answer:* Because `fetchData` is a new reference on every render.
*   **The Unbreakable Heuristic:** **"`useMemo` saves the result of a slow math problem. `useCallback` saves the function itself so children don't panic."**

---

## Domain 2: Class Components (The Legacy Gauntlet)

*Mettl will test Class Components. They are cheap to generate and punish newer devs who only know hooks.*

### 1. `setState` Asynchronous Batching
*   **The Core Theory:** `this.setState` is not synchronous. React batches multiple `setState` calls together for performance. If you call `setState` consecutively using the object syntax, React merges them, and the last one wins.
*   **The Mettl Trap (Code Variant):**
    ```javascript
    increment() {
      this.setState({ count: this.state.count + 1 });
      this.setState({ count: this.state.count + 1 });
    }
    ```
    *Mettl asks:* If `count` is 0, what is it after calling `increment()`?
    *Answer:* It is `1`, not `2`. Both calls read `this.state.count` as `0`. 
*   **The Unbreakable Heuristic:** **"Object `setState` overwrites. Functional `setState((prev) => ...)` chains sequentially."**
*   **React 18/19 Edge Case:** React 18 introduced *Automatic Batching* for promises, timeouts, and native event handlers, meaning hooks like `setCount` act similarly everywhere now.

### 2. Lifecycle Translations
*   **The Mettl Trap:** "Which hook sequence is equivalent to `componentDidMount`?"
*   **The Unbreakable Heuristic:**
    *   `componentDidMount` = `useEffect(..., [])`
    *   `componentDidUpdate` = `useEffect(..., [deps])`
    *   `componentWillUnmount` = `return () => {}` inside `useEffect`

---

## Domain 3: React Router v6.4+ / v7

### 1. The `<Outlet>` Render Trap
*   **The Core Theory:** In nested routing, a parent route determines the layout, but it must explicitly tell React Router *where* to inject the child route's UI.
*   **The Mettl Trap (Code Variant):**
    ```jsx
    function DashboardLayout() {
      return <div><h1>Dashboard</h1></div>; // TRAP: Missing Outlet
    }
    // Route config: path="dashboard", element=<DashboardLayout>, children: [{path: "stats"}]
    ```
    *Mettl asks:* Why doesn't the "stats" page render when navigating to `/dashboard/stats`?
    *Answer:* Because `DashboardLayout` does not contain the `<Outlet />` component.
*   **The Unbreakable Heuristic:** **"A parent route without an `<Outlet>` is a brick wall. Children cannot pass."**

---

## Domain 4: Core JavaScript & Reconciliation

### 1. The Falsy `0` DOM Bleed
*   **The Core Theory:** The logical AND `&&` operator evaluates from left to right. If the left side is falsy, it returns the left side. In JS, `0` is falsy. React does not render `null`, `undefined`, or `false` — but it **does** render numbers, including `0`.
*   **The Mettl Trap (Code Variant):**
    ```jsx
    const items = [];
    return <div>{items.length && <List items={items} />}</div>
    ```
    *Mettl asks:* What is rendered to the DOM?
    *Answer:* `<div>0</div>`. `items.length` is `0`. The evaluation stops, returns `0`, and React prints it.
*   **The Unbreakable Heuristic:** **"Never trust `.length &&`. Always enforce a boolean with `.length > 0 &&`."**

### 2. The `this` Binding Crisis
*   **The Core Theory:** In standard functions, `this` is determined by *how* the function is called, not where it is written. If passed as a callback (like an event listener), `this` defaults to `window` or `undefined`.
*   **The Mettl Trap (Code Variant):**
    ```javascript
    class Button extends React.Component {
      handleClick() { console.log(this.props.id); }
      render() { return <button onClick={this.handleClick}>Click</button> }
    }
    ```
    *Answer:* It throws an error: `Cannot read properties of undefined (reading 'props')`.
*   **The Unbreakable Heuristic:** **"Arrow functions capture `this` from the air. Normal functions drop it when handed off."** Use `onClick={() => this.handleClick()}` or bind in the constructor.
