# Technical Research: Disruptive System Design for React Prep Wizard

## 1. Executive Summary & The Disruption 

**Current Paradigm:** The React Prep Wizard is an offline capable, drill-based coding sandbox. It measures outcomes (does the code work?) using static `grader.ts` and `unitGrader.ts`. Historically, its architectural fault was **treating content as a program rather than a database** — compiling ~500 KB of drill data directly into a 1.5MB unified JS chunk, forcing the JS engine to execute 13 `.map()` passes and resolve over 2,400 predicates synchronously *before first paint*.

**The Disruption (Victor's Reframing):** 
1. **Data over Code:** Curriculum data is a database. It must be dynamically imported or served via a local offline-first datastore (IndexedDB), entirely decoupled from the JS execution thread.
2. **Signal over Outcome:** An interview is not a test of output; it is a **low-latency signal extraction process**. We must optimize for the *process*. The Prep Wizard must evolve into a **Telemetry-Driven Adversarial Crucible**. It shouldn't just know *if* you solved it; it must know *how* you solved it, where you hesitated, and whether your structural logic was sound.

## 2. First Principles & Ground Truth Metrics

The redesign is anchored in hard measurements from the existing build:
- **Shipped JS:** Was 1,579 KB raw in ONE chunk. **New Principle:** strict route splitting and vendor chunking. The editor, the runtime, and the curriculum do not share the same invalidation lifecycle.
- **Module Evaluation Overhead:** Synchronous O(n) array mapping blocks the render thread. **New Principle:** O(1) map lookups established at build time or lazy-loaded at runtime. No `.map()` or `.find()` passes inside render loops.
- **Resilience:** Previously zero error boundaries. **New Principle:** Granular failure containment. A crash in a preview pane must never black out the editor or lose user state.
- **The Code is Exhaust:** The code written is merely a byproduct of the mental model. Hesitation is signal. A 15-second pause before writing a `useEffect` dependency array means the mental model is blurry.

## 3. High-Level Design (HLD)

The system architecture must be radically decoupled into four distinct planes:

### A. The Curriculum Data Plane
- **What:** The ~500 KB of `css100`, `ladder`, and `rapidFireBank` must be ejected from the main module evaluation tree.
- **Mechanism:** Treat the drill data as JSON documents. Fetch them lazily per route, or load them into IndexedDB on first load to act as a true offline database, entirely bypassing JS module evaluation overhead.

### B. The Telemetry & State Plane (Event Sourced)
- **What:** Move beyond simple boolean Zustand states.
- **Mechanism:** An **Event Sourced** model. Every keystroke, mouse movement, tab switch, and execution trigger is recorded with a timestamp. This allows "Interview Replay" and "Hesitation Analysis".

### C. The Isomorphic Evaluation Plane
- **Current:** Relies on evaluating the final DOM or basic regex/string matching.
- **Future:** **AST-Driven Evaluation**. We run `@babel/standalone` or `swc-wasm` inside a Web Worker. We parse the user's AST to enforce architectural rules (e.g., "Reject if `useState` is called inside a loop", "Reject if DOM nodes are queried directly instead of using Refs").

### D. The Execution Plane (Service Worker Interception)
- **What:** Sandboxing via declarative iframes is good, but lacks network control.
- **Mechanism:** Introduce a local **Service Worker** to intercept `fetch`/`XHR` calls from the sandbox. This allows the Crucible to dynamically inject network latency or 500 errors to test defensive programming on the fly.

## 4. Low-Level Design (LLD) Implementation

### 4.1. True O(1) Render Paths & Error Containment
- Ensure `UNIT_INDEX` and `UNIT_BY_ID` remain strict `Map` structures preventing O(n·m) `.find()` within `.reduce()` during XP calculations.
- Enforce strict `<PaneBoundary>` wrappers across the UI so that a malformed AST or infinite loop only crashes the sandbox iframe, leaving the editor and telemetry intact.

### 4.2. Off-Thread AST Grader (Web Worker)
Instead of relying on `unitGrader.ts` in the main thread:
```typescript
// worker.ts
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

self.onmessage = (e) => {
    // 1. AST Parsing
    const ast = parse(e.data.code, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
    let usedDirectDOMAccess = false;
    
    traverse(ast, {
        CallExpression(path) {
            if (path.node.callee.property?.name === 'querySelector') {
                usedDirectDOMAccess = true;
            }
        }
    });

    self.postMessage({ valid: !usedDirectDOMAccess, error: "Direct DOM mutation detected." });
};
```

### 4.3 Service Worker Network Simulator
```typescript
// mock-sw.js
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.includes('/api/challenge')) {
      // 30% chance of artificial 3-second latency to test loading states
      if (Math.random() > 0.7) {
          event.respondWith(
             new Promise(resolve => setTimeout(() => resolve(new Response('{}')), 3000))
          );
      }
  }
});
```

## 5. Next Steps for Execution
1. **Data Ejection:** Refactor `masteryStream.ts` to fetch curriculum data as JSON rather than importing massive TypeScript arrays that block JS evaluation.
2. **IndexedDB Telemetry:** Swap `localStorage` for `IndexedDB` (using `idb` or `dexie`) to support heavy telemetry payload logging.
3. **AST Rule Enforcement:** Spin up the SWC/Babel WebWorker.
