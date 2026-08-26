import type { LearnTopic } from '../types';

export const frontendRoadmapTopics: LearnTopic[] = [
  {
    id: 'rd-fe-internet-browser',
    area: 'Web Platform',
    group: 'Foundations',
    title: 'Internet Basics, DNS, TCP/TLS & Critical Rendering Path',
    status: 'covered',
    minutes: 8,
    summary:
      'The foundational path of how browsers fetch, parse, and render web pages. DNS resolution, TCP handshake, TLS encryption, and the DOM/CSSOM render tree construction.',
    body: [
      '### 🌐 The Network Handshake',
      '1. **DNS Lookup**: Translates domain names into IP addresses via hierarchical recursive resolvers and browser caches.',
      '2. **TCP & TLS**: 3-way TCP handshake (SYN, SYN-ACK, ACK) followed by TLS 1.3 cryptographic key exchange.',
      '',
      '### 🎨 The Critical Rendering Path',
      '- **HTML Parsing $\to$ DOM Tree**: Incremental streaming tokenization of HTML into DOM nodes.',
      '- **CSS Parsing $\to$ CSSOM**: Render-blocking CSS is parsed into the CSS Object Model.',
      '- **Render Tree $\to$ Layout $\to$ Paint $\to$ Composite**: Only visible DOM nodes combine with CSSOM rules; browser calculates exact pixel coordinates (Layout), draws visual textures (Paint), and layers them on the GPU (Composite).',
    ],
    keyPoints: [
      'CSS is render-blocking; non-defer JavaScript is parser-blocking.',
      'Layout calculates geometric coordinates; Paint fills colors and borders.',
      'GPU compositing handles transform and opacity changes at 120 FPS.',
    ],
    interview:
      'Walk through what happens when you type a URL: "DNS resolution -> TCP/TLS handshake -> HTTP request/response -> DOM+CSSOM construction -> Layout -> Paint -> GPU Composite."',
    resources: [
      { label: 'roadmap.sh/frontend', url: 'https://roadmap.sh/frontend', kind: 'docs' },
    ],
  },
  {
    id: 'rd-fe-html-web-components',
    area: 'Accessibility',
    group: 'Markup & A11y',
    title: 'Semantic HTML5, WCAG 2.2 Standards & Web Components',
    status: 'covered',
    minutes: 8,
    summary:
      'Accessible web engineering. Semantic landmark elements, ARIA live regions, focus traps, and encapsulated Custom Elements with Shadow DOM.',
    body: [
      '### ♿ Semantic Landmarks & Hierarchy',
      'Use native elements (`<main>`, `<nav>`, `<header>`, `<article>`, `<button>`) instead of generic `<div>` click handlers.',
      '',
      '### 🧩 Web Components & Shadow DOM',
      '- **Custom Elements**: `customElements.define("x-card", XCard)` registering framework-agnostic elements with lifecycle callbacks (`connectedCallback`, `disconnectedCallback`).',
      '- **Shadow DOM**: `attachShadow({ mode: "open" })` providing DOM and CSS style isolation.',
    ],
    keyPoints: [
      'Semantic HTML elements carry built-in accessibility contracts for free.',
      'Custom Elements and Shadow DOM provide native encapsulation without build tools.',
      'Always restore focus when dismissing modals and drawers.',
    ],
    interview:
      'Why use Shadow DOM: "Shadow DOM creates an isolated DOM subtree where component styles cannot leak out and external styles cannot bleed in."',
    resources: [
      { label: 'roadmap.sh/frontend', url: 'https://roadmap.sh/frontend', kind: 'docs' },
    ],
  },
  {
    id: 'rd-fe-modern-css',
    area: 'CSS',
    group: 'Layout Engines',
    title: 'Modern CSS: Cascade Layers (@layer), @scope, Subgrid & :has()',
    status: 'covered',
    minutes: 8,
    summary:
      '2026 Modern CSS architecture. Cascade Layers (@layer) to eliminate specificity wars, CSS Scoping (@scope), Subgrid row sharing, and :has() relational queries.',
    body: [
      '### 📐 Cascade Layers & Scoping',
      '- **`@layer reset, base, components, utilities;`**: Defines explicit priority ordering, eliminating `!important` hacks and specificity wars.',
      '- **`@scope (.card) to (.content)`**: Restricts styles to a specific component subtree without CSS modules.',
      '- **`:has()` Relational Selector**: Styles parent or sibling elements based on child state (`form:has(:invalid) button { opacity: 0.5 }`).',
    ],
    keyPoints: [
      'Cascade Layers (@layer) provide deterministic CSS priority ordering.',
      ':has() enables pure CSS parent styling based on child states.',
      'Subgrid enables nested children to share parent grid tracks.',
    ],
    interview:
      'How Cascade Layers fix CSS specificity wars: "Layers define an explicit cascade precedence order where rules in higher layers always override lower layers regardless of selector specificity."',
    resources: [
      { label: 'roadmap.sh/frontend', url: 'https://roadmap.sh/frontend', kind: 'docs' },
    ],
  },
  {
    id: 'rd-fe-js-v8-packages',
    area: 'JavaScript',
    group: 'V8 & Tooling',
    title: 'JS Metaprogramming (Proxy/Reflect), PWA & Package Managers (pnpm)',
    status: 'covered',
    minutes: 9,
    summary:
      'Advanced runtime capabilities: JavaScript Proxy & Reflect API, Service Worker PWA lifecycles, and modern content-addressable package management with pnpm.',
    body: [
      '### 🛡️ JavaScript Proxy & Reflect API',
      'Intercept fundamental language operations (property access, assignment, function invocation) using `new Proxy(target, handlers)`. Foundation of modern reactive state systems (Vue 3, MobX).',
      '',
      '### 📦 Modern Package Managers (pnpm vs npm)',
      'pnpm uses a single global content-addressable store on disk and creates symlinks/hardlinks, eliminating phantom dependencies and saving gigabytes of disk space.',
    ],
    keyPoints: [
      'Proxy and Reflect enable transparent object interception and reactivity.',
      'Service Workers enable offline caching with background sync.',
      'pnpm prevents phantom dependencies using hardlink symlink trees.',
    ],
    interview:
      'Why pnpm is superior to npm/yarn for monorepos: "pnpm stores packages in a centralized hard-linked store, preventing phantom dependencies and drastically reducing install times."',
    resources: [
      { label: 'roadmap.sh/frontend', url: 'https://roadmap.sh/frontend', kind: 'docs' },
    ],
  },
];
