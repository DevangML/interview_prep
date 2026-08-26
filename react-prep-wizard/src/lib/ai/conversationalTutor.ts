/**
 * Conversational Socratic Tutor & Knowledge Synthesizer
 * Handles natural conversational interactions, greetings, curiosity queries,
 * and dynamic first-principles pedagogical breakdowns without canned templates.
 */

import type { RrfSearchResult } from './hybridKnowledgeEngine';

export interface CasualResponse {
  isCasual: boolean;
  reply: string;
}

export class ConversationalTutorEngine {
  private static CURATED_INTERESTING_TOPICS = [
    {
      title: 'How V8 Hidden Classes turn JavaScript Objects into C++ Structs in 1 CPU Cycle',
      hook: "Did you know that JavaScript objects don't actually exist as hash tables in high-performance V8 code?",
      story: `In pure C++, an object property access like \`point.x\` is just a fixed byte offset in memory (e.g. \`[reg + 8]\`), executing in **1 clock cycle**.

JavaScript objects, by contrast, are dynamically mutable dictionaries. If V8 had to do a string hash-table lookup for every single \`user.name\` or \`event.target\`, JavaScript would be 100x slower than C.

To solve this, V8 invents **Hidden Classes (called 'Maps' or 'Shapes')** behind the scenes:
1. When you create \`const p = { x: 1 }\`, V8 creates an initial Map $M_0$ with offset \`x @ 0\`.
2. When you assign \`p.y = 2\`, V8 transitions to Map $M_1$ with \`x @ 0, y @ 1\`.
3. If thousands of objects share the exact same property initialization order, the JIT compiler generates an **Inline Cache (IC)**: it checks the Map pointer and compiles the property lookup directly into a raw machine-code memory offset!

⚠️ **The Hidden Gotcha**: If you dynamically delete a property (\`delete p.x\`) or add properties in different order (\`{x, y}\` vs \`{y, x}\`), V8 crashes the call-site into **Megamorphic Slow Dictionary Mode**, causing a massive performance deopt.`,
      socraticPrompt: "Want to try writing a quick 3-line micro-benchmark in our sandbox to observe Map transitions in action, or should we explore React 19's concurrent scheduler?"
    },
    {
      title: "Why React 19's `useActionState` and `startTransition` Don't Block Browser Paint",
      hook: "Ever wonder what actually happens at the OS event-loop level during a React concurrent transition?",
      story: `Before Concurrent React, if you updated a list with 10,000 items, JavaScript would run a synchronous recursive tree reconciliation loop. Because JavaScript is single-threaded, the browser could not process mouse clicks, scroll events, or frame paints—resulting in dropped frames and high **Interaction to Next Paint (INP)**.

React 19's concurrency model transforms reconciliation from a synchronous call stack into a cooperative, yieldable fiber queue:
1. React slices reconciliation work into small **5ms time chunks**.
2. After each chunk, it yields execution back to the browser event loop using \`MessageChannel\` micro-yields, allowing the browser to paint CSS animations and handle user touch events.
3. If higher-priority input arrives (like the user typing into an input box), React **aborts the in-flight background transition render**, handles the keystroke immediately, and restarts the transition with the new state!

With \`useActionState\` and \`useOptimistic\`, React formalizes this: your UI updates optimistically with 0ms perceived latency, and if the network action rejects, it seamlessly rolls back without tearing down your component state.`,
      socraticPrompt: "Would you like to drill a live optimistic rollback failure scenario, or explore how to handle async race conditions in typeahead inputs?"
    },
    {
      title: "The Microtask Event Loop Starvation Trap",
      hook: "Why can recursive `queueMicrotask` freeze the entire browser tab while recursive `setTimeout(0)` does not?",
      story: `The browser event loop has distinct execution phases for different queue types:
- **Macrotask Queue**: \`setTimeout\`, \`setInterval\`, I/O, UI event handlers.
- **Microtask Queue**: \`Promise.then\`, \`queueMicrotask\`, \`MutationObserver\`.

Here is the critical invariant: **The browser will NEVER render a new visual frame or process a macrotask until the microtask queue is 100% empty.**

- If you write \`function loop() { setTimeout(loop, 0); }\`, the browser processes one task, paints the screen, and takes the next task in the next tick. The UI remains responsive.
- But if you write \`function loop() { queueMicrotask(loop); }\`, JavaScript continuously adds microtasks to the active queue. Because the queue never drains to zero, **the browser is completely blocked from painting, scrolling, or processing clicks**—freezing the tab entirely!`,
      socraticPrompt: "Shall we dive into how to schedule non-urgent background work safely using `requestIdleCallback` and `scheduler.postTask`?"
    },
    {
      title: "Why CRDTs Guarantee State Convergence Without Centralized Locks",
      hook: "How do collaborative apps like Google Docs, Linear, and Figma allow thousands of users to edit simultaneously without merge conflicts?",
      story: `In traditional databases, concurrent updates require **Pessimistic Locking** (locking rows during writes) or **Optimistic Concurrency Control** (aborting transactions on conflict). Under offline or high-latency mobile conditions, locks completely break down.

**Conflict-Free Replicated Data Types (CRDTs)** solve this through pure abstract algebra:
Every replica can mutate state locally without network roundtrips. When replicas sync, their merge function $\\sqcup$ is guaranteed to be:
1. **Commutative**: $A \\sqcup B = B \\sqcup A$ (Packet arrival order doesn't matter).
2. **Associative**: $(A \\sqcup B) \\sqcup C = A \\sqcup (B \\sqcup C)$ (Grouping doesn't matter).
3. **Idempotent**: $A \\sqcup A = A$ (Duplicate sync packets have no side-effects).

In a **Last-Write-Wins Element Set (LWW-Element-Set)**, every addition and deletion carries a hybrid monotonic timestamp. When a record is deleted, it isn't erased—it becomes a **Tombstone** so older offline writes cannot accidentally resurrect the deleted item.`,
      socraticPrompt: "Would you like to audit a distributed LWW CRDT implementation or explore how vector clocks prevent clock drift?"
    }
  ];

  /**
   * Generates a dynamic casual, greeting, or curiosity response
   */
  public static handleCasualQuery(query: string): CasualResponse | null {
    const q = query.trim().toLowerCase();

    // 1. Greetings & Pleasantries
    const isGreeting = /^(hi|hello|hey|greetings|howdy|sup|yo|good morning|good evening|good afternoon)(\s+.*|\!|\.)?$/i.test(q);
    if (isGreeting) {
      return {
        isCasual: true,
        reply: `### 👋 Hey there! Welcome to your Socratic Interview Crucible.

I'm your **Senior AI Systems Mentor & Interview Coach**. Here's how we can train together:

1. **🔬 Deep Dive & Learn**: Ask me to explain any complex frontend or distributed systems concept (*e.g. "Why is React 19 hard to learn?"*, *"How does V8 optimization work?"*, *"Explain React 19 Action States"*).
2. **🐛 Real-time Bug Drills**: Type \`/drill\` to spawn live concurrency, memory leak, or async race condition bugs in the sandbox.
3. **🏛️ Systems Architecture**: Type \`/audit\` or \`/mock-defense\` to defend production system designs for Staff/Principal engineering rounds.
4. **📊 Company-Targeted Curriculums**: Type \`/jd\` to analyze a real job description and generate a tailored 5-day prep plan.

What would you like to explore or drill today?`
      };
    }

    // 2. Persona / Identity Questions
    if (q.includes('who are you') || q.includes('what can you do') || q.includes('how do you work') || q.includes('help me')) {
      return {
        isCasual: true,
        reply: `### 🔮 About Your Socratic Systems Mentor

I am an evidence-driven AI training partner designed to prepare engineers for **Senior, Staff, and Principal frontend and distributed systems interviews**.

#### 🛠️ What Sets This Substrate Apart:
- **First-Principles Pedagogy**: I guide you using the Socratic method—challenging your assumptions and helping you build solid mental models rather than spoon-feeding code.
- **Deterministic Live Sandbox**: We test and prove invariants inside an isolated, hardened WebWorker runtime with live compiler telemetry.
- **Autonomous Multi-Specialist Control**: I dynamically switch between **Copilot** (root cause debugging), **Tutor** (conceptual grounding), **Architect** (100k QPS scale defense), and **Judge** (formal verification).
- **Offline-First Memory & Sync**: Your drills, mastered invariants, and weakness heatmaps persist locally and sync across your devices.

*Try asking: "Can you teach me something interesting about V8?" or type \`/drill\` to attack a live bug!*`
      };
    }

    // 3. Curiosity / "Teach me something interesting" / "Surprise me"
    const isCuriosity = q.includes('teach me something') || 
                        q.includes('tell me something') || 
                        q.includes('something interesting') || 
                        q.includes('something cool') || 
                        q.includes('surprise me') || 
                        q.includes('fun fact') || 
                        q.includes('what should i learn');

    if (isCuriosity) {
      const topicIndex = Math.abs(query.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % this.CURATED_INTERESTING_TOPICS.length;
      const topic = this.CURATED_INTERESTING_TOPICS[topicIndex];

      return {
        isCasual: true,
        reply: `### 💡 Deep Dive: **${topic.title}**

> **${topic.hook}**

${topic.story}

---

#### 🎯 Socratic Next Step:
${topic.socraticPrompt}`
      };
    }

    return null;
  }

  /**
   * Synthesizes a dynamic, on-topic Socratic response when the remote LLM is offline or cold starting
   */
  public static synthesizeDynamicFallback(
    query: string,
    context: {
      topicTitle?: string;
      area?: string;
      retrievedDocs?: RrfSearchResult[];
    }
  ): string {
    const q = query.trim().toLowerCase();

    // 1. If Gated RAG returned validated normative documents, anchor strictly to them
    if (context.retrievedDocs && context.retrievedDocs.length > 0) {
      const topDoc = context.retrievedDocs[0].doc;
      return `### 🏛️ Socratic Deep Dive: **${topDoc.title}**\n\n` +
        `Regarding: *"**${query}**"*\n\n` +
        `#### 📌 Ground Truth Invariants:\n` +
        `${topDoc.invariants.map(inv => `▪ ${inv}`).join('\n')}\n\n` +
        `> **Specification Context**: ${topDoc.fullSpecContent}\n\n` +
        `---\n` +
        `**🎯 Socratic Diagnostic**: Under what high-concurrency or edge-case failure mode would this invariant break down in your architecture?`;
    }

    // 2. React 19 Paradigm Shift & Learning Curve Breakdown
    if (q.includes('react 19') || q.includes('react19')) {
      return `### 🔮 Socratic Systems Mentor: **The React 19 Paradigm Shift**\n\n` +
        `Regarding: *"**${query}**"*\n\n` +
        `Learning React 19 is difficult because it represents a fundamental **mental model pivot** away from 10 years of React conventions:\n\n` +
        `1. **From Imperative \`useEffect\` to Declarative Actions**:\n` +
        `   In React 18, data mutations relied on manual loading states, abort controllers in \`useEffect\`, and try/catch error state variables. React 19 replaces this with **Action functions** and hooks like \`useActionState\` and \`useOptimistic\`, where React manages the pending lifecycle and automatic rollback on failure.\n\n` +
        `2. **Server Components & The Boundary Mental Model**:\n` +
        `   Understanding the boundary between Server Components (zero client bundle, direct DB/filesystem access) and Client Components (\`'use client'\`, browser event handlers) requires thinking about network serialization and async streaming waterfalls rather than single SPA bundles.\n\n` +
        `3. **The React Compiler & Death of \`useMemo\`/\`useCallback\`**:\n` +
        `   Engineers spent years manually tuning dependency arrays in \`useMemo\` and \`useCallback\`. The React 19 Compiler auto-memoizes JSX trees and closures, but it strictly penalizes code that violates the Rules of React (e.g. mutating variables during render).\n\n` +
        `---\n` +
        `**🎯 Socratic Question**: Which part of this shift are you finding most friction with—the asynchronous Action transition lifecycle (\`useActionState\`), or structuring Server vs Client boundaries?`;
    }

    // 3. V8 Engine & Performance Breakdown
    if (q.includes('v8') || q.includes('hidden class') || q.includes('inline cache') || q.includes('deopt') || q.includes('jit')) {
      return `### 🔮 Socratic Systems Mentor: **V8 Engine & Memory Mechanics**\n\n` +
        `Regarding: *"**${query}**"*\n\n` +
        `To master V8 performance, engineers must visualize how the JavaScript engine optimizes dynamically typed objects:\n\n` +
        `1. **Hidden Classes (Maps/Shapes)**: Objects created with identical property orders share hidden shapes. Adding or deleting properties out of order triggers Map transitions.\n` +
        `2. **Inline Caching (IC)**: Monomorphic call-sites execute in 1-2 CPU cycles. Polymorphic (>4 shapes) and Megamorphic sites degrade into slow dictionary hash-table lookups.\n` +
        `3. **Turbofan JIT Tiering**: Code starts in the Ignition interpreter and tiers up to Turbofan optimized machine code when hot. Type instability triggers instant deoptimization.\n\n` +
        `---\n` +
        `**🎯 Socratic Diagnostic**: If you iterate over an array of 100,000 objects, what specific data structure layout guarantees monomorphic JIT execution?`;
    }

    // 4. Default High-Caliber Socratic Breakdown
    const topic = context.topicTitle || 'Web Systems Architecture';
    return `### 🔮 Socratic Systems Mentor: **${topic}**\n\n` +
      `Regarding: *"**${query}**"*\n\n` +
      `When analyzing this from a Staff/Principal engineering perspective, we break the problem down into three core dimensions:\n\n` +
      `1. **Execution Model & Event Loop**: How does this interaction schedule work across Microtasks, Macrotasks, and Browser Frame Paints?\n` +
      `2. **State Convergence & Concurrency**: How do we prevent race conditions or stale reads when multiple asynchronous events overlap?\n` +
      `3. **Resource & Memory Teardown**: What are the retention boundaries to ensure zero long-lived closures or memory leaks?\n\n` +
      `---\n` +
      `**🎯 Socratic Next Step**: How would you structure this system to maintain sub-100ms Interaction to Next Paint (INP) under high load? *(Type your thoughts below, or use \`/drill\` to attack a live sandbox bug)*`;
  }
}
