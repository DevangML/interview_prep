> ℹ️ **Directionally correct but superseded by `7_EXHAUSTIVE_SYLLABUS_V3.md`**, which adds Mettl's published competency taxonomy, implicit prerequisites and supplementary risk ranking.

# The Calibrated Master Syllabus (Aligned to ATCI-R1-S2060748)

> **"You are right. I over-extrapolated into Full-Stack territory. The actual Requisition dictates a pure, high-level Frontend scope. We cut the fat. We focus on the engine." — Victor**

Based on the explicit requirements of Job ID `ATCI-R1-S2060748` (Custom Software Engineer - React.js, 3+ Years Experience), Accenture is looking for an SME in **Frontend Architecture**, not a Full-Stack generalist. 

We are officially dropping Cloud (AWS/Azure), deep Backend Networking, and OWASP Security from the critical path.

---

## 1. Component-Based Architecture & State Management
*JD Requirement: "Experience with component-based architecture and state management in web applications."*

*   **State Management Matrix:** 
    *   Prop Drilling vs Context API (and rendering bottlenecks).
    *   Redux Toolkit (Slices, Thunks, Immer immutability).
    *   Zustand (Atomic, hook-based state).
*   **Component Architecture:**
    *   Smart (Container) vs Dumb (Presentational) components.
    *   Higher-Order Components (HOCs) and Custom Hooks for logic extraction.
    *   Controlled vs Uncontrolled Form components.

## 2. Frontend Optimization & Troubleshooting
*JD Requirement: "Ability to optimize application performance and troubleshoot complex issues."*

*   **The Optimization Matrix:**
    *   `React.memo` for component memoization.
    *   `useMemo` and `useCallback` for reference stability.
    *   Code Splitting with `React.lazy` and `<Suspense>`.
    *   Virtualization/Windowing for rendering large lists (e.g., `react-window`).
    *   Debouncing and Throttling high-frequency events (scroll, search).
*   **Troubleshooting:**
    *   Identifying Stale Closures in `useEffect`.
    *   Debugging infinite re-render loops (missing dependency arrays).
    *   Memory leaks (missing cleanup functions on unmount).

## 3. Core React.js & Frontend Principles
*JD Requirement: "Strong understanding of front-end development principles and responsive design techniques."*

*   **The React Core Matrix:**
    *   Reconciliation and the Virtual DOM diffing algorithm.
    *   Why Array Indexes are fatal as `key` props.
    *   React Router v6/v7 (`<Outlet>`, nested routing, loaders).
*   **Core JavaScript (The 3-Question Coding Gauntlet):**
    *   Execution Context, Hoisting, and the Temporal Dead Zone.
    *   The Event Loop (Macrotasks vs Microtasks).
    *   Array Methods (map, filter, reduce, flat) and deep object cloning.

## 4. Collaborative Development Workflows
*JD Requirement: "Familiarity with version control systems and collaborative development workflows."*

*   **The Git Matrix:**
    *   GitFlow (Feature branching, PRs).
    *   Merge vs Rebase.
    *   Resolving merge conflicts in package.json or component files.
