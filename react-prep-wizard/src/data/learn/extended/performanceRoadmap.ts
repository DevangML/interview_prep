import type { LearnTopic } from '../types';

export const performanceRoadmapTopics: LearnTopic[] = [
  {
    id: 'rd-perf-high-priority',
    area: 'Performance',
    group: 'Critical Budgets',
    title: 'High Priority: Page Weight Budgets, TTFB & Brotli Compression',
    status: 'covered',
    minutes: 8,
    summary:
      'Foundational frontend performance targets: Total page weight < 1500KB (ideal < 500KB), TTFB < 1.3s, Brotli compression, and critical above-the-fold CSS inlining.',
    body: [
      '### 🎯 Performance Budgets & Network Invariants',
      '- **Total Page Weight**: Keep initial compressed transfer under 500 KB to guarantee sub-3 second loads on 4G networks.',
      '- **TTFB (Time to First Byte)**: Target under 800ms via Edge CDNs, server caching, and HTTP/2 or HTTP/3 multiplexing.',
      '',
      '### 📦 Compression & Asset Delivery',
      '- **Brotli (`br`) vs Gzip**: Brotli achieves 15-20% higher compression ratios on JavaScript and CSS text assets.',
      '- **Critical CSS**: Inline above-the-fold critical CSS rules in `<head>` to prevent render-blocking stylesheet requests.',
      '- **`async` vs `defer`**: Load non-critical scripts with `defer` to parse asynchronously without blocking HTML tokenization.',
    ],
    keyPoints: [
      'Target page weight under 500 KB and TTFB under 800ms.',
      'Use Brotli compression for static text assets (JS, CSS, HTML).',
      'Use defer for non-critical scripts to maintain unblocked HTML parsing.',
    ],
    interview:
      'How to optimize TTFB: "Deploy assets to Edge CDN locations, enable server-side route caching, and eliminate synchronous database bottlenecks during SSR."',
    resources: [
      { label: 'roadmap.sh/frontend-performance-best-practices', url: 'https://roadmap.sh/frontend-performance-best-practices', kind: 'docs' },
    ],
  },
  {
    id: 'rd-perf-rendering-media',
    area: 'Performance',
    group: 'Media & Layout',
    title: 'Medium Priority: AVIF/WebP Formats, CLS Elimination & Lazy Loading',
    status: 'covered',
    minutes: 8,
    summary:
      'Eliminating Cumulative Layout Shift (CLS) through explicit aspect ratios, native loading="lazy", modern AVIF/WebP formats, and Service Worker offline caching.',
    body: [
      '### 🖼️ Modern Image Formats & Layout Stability',
      '- **AVIF & WebP**: AVIF delivers up to 50% smaller payloads than JPEG with superior color fidelity.',
      '- **CLS Elimination**: Always specify `width`, `height`, or CSS `aspect-ratio` on `<img>` tags so the browser allocates exact layout space before media loads.',
      '- **Native Lazy Loading**: Add `loading="lazy"` to offscreen images, but use `fetchpriority="high"` for the hero LCP element.',
      '',
      '### ⚡ Service Workers & Caching Strategies',
      '- **Cache-First vs Network-First**: Cache static hashed assets indefinitely (`max-age=31536000, immutable`), and use network-first for live user data.',
    ],
    keyPoints: [
      'Always specify aspect-ratio or dimensions to eliminate CLS layout shifts.',
      'Serve AVIF with WebP fallbacks using modern picture tags.',
      'Prioritize above-the-fold images with fetchpriority="high".',
    ],
    interview:
      'What causes CLS and how do you fix it? "CLS occurs when images or dynamic banners render without reserved dimensions. Fix by defining aspect-ratio and reserving layout boxes."',
    resources: [
      { label: 'roadmap.sh/frontend-performance-best-practices', url: 'https://roadmap.sh/frontend-performance-best-practices', kind: 'docs' },
    ],
  },
  {
    id: 'rd-perf-web-vitals',
    area: 'Performance',
    group: 'Core Web Vitals',
    title: 'Core Web Vitals Autopsy: INP, LoAF API & Lighthouse Profiling',
    status: 'covered',
    minutes: 9,
    summary:
      'Diagnostic measurement of Core Web Vitals. Optimizing Interaction to Next Paint (INP) via task slicing, Long Animation Frames (LoAF) API attribution, and DevTools profiling.',
    body: [
      '### 📊 Core Web Vitals Thresholds',
      '- **LCP (Largest Contentful Paint)**: $< 2.5\text{s}$ (Good).',
      '- **INP (Interaction to Next Paint)**: $< 200\text{ms}$ (Good). Replaced FID in 2024.',
      '- **CLS (Cumulative Layout Shift)**: $< 0.1$ (Good).',
      '',
      '### ⏱️ INP & Long Task Slicing',
      'INP measures the full delay between user interaction and rendered visual response: `Input Delay + Processing Time + Presentation Delay`. Break long synchronous JavaScript loops ($> 50\text{ms}$) into chunked microtasks using `scheduler.yield()` or `MessageChannel`.',
    ],
    keyPoints: [
      'INP measures Input Delay + Processing Time + Presentation Delay (Target < 200ms).',
      'Long Animation Frames (LoAF) API provides script-level attribution for sluggish UI tasks.',
      'Yield long tasks using scheduler.yield() or MessageChannel.',
    ],
    interview:
      'How to diagnose high INP: "Break down the interaction in DevTools Performance panel, measure main-thread processing time, and slice long handler blocks with scheduler.yield()."',
    resources: [
      { label: 'roadmap.sh/frontend-performance-best-practices', url: 'https://roadmap.sh/frontend-performance-best-practices', kind: 'docs' },
    ],
  },
];
