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
    id: 'rd-fe-html-a11y',
    area: 'Accessibility',
    group: 'Markup & A11y',
    title: 'Semantic HTML5, WCAG 2.2 Standards & ARIA Live Regions',
    status: 'covered',
    minutes: 8,
    summary:
      'Accessible web engineering. Semantic landmark elements, keyboard navigation traps, accessible names, and dynamic ARIA live announcement regions.',
    body: [
      '### ♿ Semantic Landmarks & Hierarchy',
      'Use native elements (`<main>`, `<nav>`, `<header>`, `<article>`, `<button>`) instead of generic `<div>` click handlers. Native buttons provide built-in `Enter`/`Space` keyboard triggers and focus rings.',
      '',
      '### 🔊 ARIA Roles & Live Announcements',
      '- **`aria-live="polite"`**: Announces asynchronous content updates (e.g. notifications) when the screen reader user is idle.',
      '- **Focus Management**: Trap keyboard focus inside open modal dialogs and restore focus to the triggering element upon close.',
    ],
    keyPoints: [
      'Semantic HTML elements carry built-in accessibility contracts for free.',
      'Use aria-live="polite" for dynamic content updates.',
      'Always restore focus when dismissing modals and drawers.',
    ],
    interview:
      'Why avoid `<div onClick>`: "Divs lack keyboard activation (Enter/Space), are excluded from the accessibility tree as buttons, and fail focus tab indexing."',
    resources: [
      { label: 'roadmap.sh/frontend', url: 'https://roadmap.sh/frontend', kind: 'docs' },
    ],
  },
  {
    id: 'rd-fe-modern-css',
    area: 'CSS',
    group: 'Layout Engines',
    title: 'Modern CSS: Grid, Subgrid, Container Queries & Fluid Tokens',
    status: 'covered',
    minutes: 8,
    summary:
      '2026 Modern CSS layout systems. Two-dimensional CSS Grid, nested child alignment with Subgrid, and modular component responsiveness using Container Queries (@container).',
    body: [
      '### 📐 CSS Grid & Subgrid',
      '- **CSS Grid**: 2D layout engine providing explicit track definitions (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`).',
      '- **Subgrid (`grid-template-rows: subgrid`)**: Inherits grid tracks from the parent container, allowing child card headers and footers to align perfectly across columns.',
      '',
      '### 📦 Container Queries (`@container`)',
      'Container queries allow UI components to respond directly to their parent container size rather than the global browser window width.',
    ],
    keyPoints: [
      'Subgrid enables nested children to share parent grid tracks.',
      'Container Queries (@container) make components truly self-contained and modular.',
      'Use fluid clamp() for viewport-scalable typography and spacing.',
    ],
    interview:
      'When to use Container Queries over Media Queries: "Use container queries when a component can be placed in varying layout widths (sidebar vs full page) and needs to adapt based on its own available space."',
    resources: [
      { label: 'roadmap.sh/frontend', url: 'https://roadmap.sh/frontend', kind: 'docs' },
    ],
  },
];
