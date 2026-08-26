import type { CanonicalConcept } from './types';

export const platformConcepts: CanonicalConcept[] = [
  {
    id: 'cc-net-protocols',
    pillar: 'Web Platform & Internet',
    title: 'DNS, TCP/TLS, HTTP/2 Multiplexing & HTTP/3 QUIC',
    subtopics: ['DNS Recursive Lookup', 'TCP 3-Way Handshake', 'TLS 1.3 0-RTT', 'HTTP/2 Multiplexing', 'HTTP/3 over UDP', 'Head-of-Line Blocking'],
    mechanismSummary: 'DNS resolves IP; TCP establishes streams; TLS negotiates keys. HTTP/2 multiplexes streams over single TCP; HTTP/3 over QUIC eliminates HoL blocking.',
    interviewSignificance: 'Explains how network handshakes and protocol transport directly impact TTFB and asset loading waterfall.'
  },
  {
    id: 'cc-net-security',
    pillar: 'Web Platform & Internet',
    title: 'CORS Preflight, CSP, Subresource Integrity & Security Headers',
    subtopics: ['OPTIONS Preflight', 'Access-Control-Allow-Origin', 'Content-Security-Policy (CSP)', 'Subresource Integrity (SRI)', 'SameSite', 'HttpOnly'],
    mechanismSummary: 'CORS protects cross-origin requests; CSP restricts execution sources; SRI hashes verify CDN scripts; SameSite prevents CSRF.',
    interviewSignificance: 'Mandatory for securing SPAs, micro-frontends, and credentialed API endpoints.'
  },
  {
    id: 'cc-browser-crp',
    pillar: 'Web Platform & Internet',
    title: 'Critical Rendering Path: DOM, CSSOM, Layout, Paint & Compositing',
    subtopics: ['HTML Tokenization', 'CSSOM Render-Blocking', 'Render Tree Calculation', 'Layout Reflow', 'GPU Compositing', 'will-change', 'Layout Thrashing'],
    mechanismSummary: 'Streaming HTML generates DOM; CSSOM combines to build Render Tree. Layout calculates coordinates; Paint draws textures; GPU Compositor layers.',
    interviewSignificance: 'Fundamental for diagnosing render jank, layout thrashing, and 120 FPS animations.'
  },
  {
    id: 'cc-platform-hardware-apis',
    pillar: 'Web Platform & Internet',
    title: 'BroadcastChannel, Web Locks, Web Workers & Web Audio API',
    subtopics: ['BroadcastChannel Multi-Tab Sync', 'Web Locks API (navigator.locks)', 'Dedicated & Shared Workers', 'Comlink RPC', 'Web Audio API'],
    mechanismSummary: 'Enables cross-tab synchronization, distributed mutex locking, background multi-threading, and programmatic audio synthesis in the browser.',
    interviewSignificance: 'Essential for architecting multi-tab local-first systems and offloading heavy compute from the main thread.'
  },
  {
    id: 'cc-html-semantics-a11y',
    pillar: 'HTML & Accessibility',
    title: 'Semantic HTML5, WCAG 2.2 Standards, ARIA & Focus Traps',
    subtopics: ['<main>, <nav>, <header>, <article>', 'Native Button vs Div Click', 'aria-live="polite"', 'Focus Traps (Modals)', ':focus-visible', 'Contrast 4.5:1'],
    mechanismSummary: 'Semantic elements construct the Accessibility Tree (AOM); ARIA live regions announce dynamic updates; focus traps prevent keyboard escape.',
    interviewSignificance: 'Demonstrates enterprise WCAG compliance, accessible design systems, and keyboard ergonomics.'
  },
  {
    id: 'cc-pwa-web-components',
    pillar: 'HTML & Accessibility',
    title: 'Web Components, Shadow DOM, PWA & Service Worker Lifecycle',
    subtopics: ['Custom Elements (customElements.define)', 'Shadow DOM Encapsulation', '<template> & <slot>', 'Service Worker (skipWaiting, clients.claim)', 'Web App Manifest'],
    mechanismSummary: 'Web Components provide framework-agnostic encapsulated custom elements; Service Workers enable offline caching and background sync.',
    interviewSignificance: 'Core for enterprise design systems, progressive web applications, and offline-first architectures.'
  },
  {
    id: 'cc-css-box-stacking-primitives',
    pillar: 'Modern CSS & Layout',
    title: 'Box Model, Stacking Contexts & Reusable Layout Primitives',
    subtopics: ['box-sizing: border-box', 'Margin Collapse', 'Stacking Context Triggers', 'Layout Primitives (stack, cluster, between, sidebar, switcher, cover)'],
    mechanismSummary: 'Stacking contexts determine paint order; BFC contains floats; composable layout primitives construct responsive shells without media query sprawl.',
    interviewSignificance: 'The core reason why z-index and margin bugs happen in complex UI layouts.'
  },
  {
    id: 'cc-css-flex-grid-subgrid',
    pillar: 'Modern CSS & Layout',
    title: 'Flexbox, CSS Grid, auto-fit/fill & Subgrid Row Alignment',
    subtopics: ['Flex-grow / shrink / basis Math', 'Auto Margins in Flexbox', 'Grid Tracks (minmax, auto-fit vs auto-fill)', 'grid-template-rows: subgrid', 'grid-template-areas'],
    mechanismSummary: 'Flexbox distributes 1D space; Grid manages 2D matrices; Subgrid shares parent track definitions with nested children across sibling cards.',
    interviewSignificance: 'Modern frontend layout mastery without fragile fixed-height hacks.'
  },
  {
    id: 'cc-css-modern-tokens-layers',
    pillar: 'Modern CSS & Layout',
    title: 'Cascade Layers (@layer), @scope, :has(), Container Queries & P3 Colors',
    subtopics: ['Cascade Layers (@layer)', 'CSS Scoping (@scope)', ':has() Relational Selector', 'Container Queries (@container)', 'clamp() Fluid Tokens', 'oklch() & Display-P3'],
    mechanismSummary: 'Cascade layers eliminate specificity wars; container queries enable component-scoped responsiveness; fluid clamp() eliminates media-query jumps.',
    interviewSignificance: '2026 state-of-the-art modern CSS and enterprise design system architecture.'
  }
];
