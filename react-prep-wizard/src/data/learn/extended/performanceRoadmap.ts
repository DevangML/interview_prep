import type { LearnTopic } from '../types';

export const performanceRoadmapTopics: LearnTopic[] = [
  {
    id: 'rd-perf-high-priority',
    area: 'Performance',
    group: 'Critical Budgets',
    title: 'Page Weight Budgets, TTFB, Brotli & Speculation Rules',
    status: 'covered',
    minutes: 8,
    summary:
      'Foundational performance targets: Page weight < 500KB, TTFB < 800ms, Brotli compression, inline critical CSS, and Speculation Rules for instant prerendering.',
    body: [
      '### 🎯 Performance Budgets & Network Invariants',
      '- **Total Page Weight**: Keep initial compressed transfer under 500 KB to guarantee sub-3 second loads on 4G networks.',
      '- **TTFB (Time to First Byte)**: Target under 800ms via Edge CDNs, server caching, and HTTP/2 or HTTP/3 multiplexing.',
      '',
      '### ⚡ Speculation Rules & Brotli',
      '- **Brotli (`br`) vs Gzip**: Brotli achieves 15-20% higher compression ratios on JavaScript and CSS text assets.',
      '- **Speculation Rules API**: `<script type="speculationrules">` instructs the browser to safely prerender likely next-page navigations in the background.',
    ],
    keyPoints: [
      'Target page weight under 500 KB and TTFB under 800ms.',
      'Use Brotli compression for static text assets (JS, CSS, HTML).',
      'Speculation Rules enable zero-latency instant page transitions.',
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
    title: 'AVIF Formats, Font Metric Overrides & CLS Elimination',
    status: 'covered',
    minutes: 8,
    summary:
      'Eliminating Cumulative Layout Shift (CLS) through explicit aspect ratios, native loading="lazy", modern AVIF formats, and font size-adjust metric overrides.',
    body: [
      '### 🖼️ Modern Image Formats & Layout Stability',
      '- **AVIF & WebP**: AVIF delivers up to 50% smaller payloads than JPEG with superior color fidelity.',
      '- **CLS Elimination**: Always specify `width`, `height`, or CSS `aspect-ratio` on `<img>` tags so the browser allocates exact layout space before media loads.',
      '',
      '### 🔤 Web Font Metric Overrides',
      'Use `@font-face` with `size-adjust`, `ascent-override`, and `descent-override` to mathematically match fallback font dimensions to custom web fonts, eliminating layout shifts during font swap.',
    ],
    keyPoints: [
      'Always specify aspect-ratio or dimensions to eliminate CLS layout shifts.',
      'Serve AVIF with WebP fallbacks using modern picture tags.',
      'Use size-adjust font metric overrides to eliminate font swap layout shifts.',
    ],
    interview:
      'What causes CLS and how do you fix it? "CLS occurs when images or dynamic fonts render without reserved dimensions. Fix by defining aspect-ratio and font metric overrides."',
    resources: [
      { label: 'roadmap.sh/frontend-performance-best-practices', url: 'https://roadmap.sh/frontend-performance-best-practices', kind: 'docs' },
    ],
  },
  {
    id: 'rd-perf-web-vitals',
    area: 'Performance',
    group: 'Core Web Vitals',
    title: 'Core Web Vitals Autopsy: INP, LoAF API & Main-Thread Scheduling',
    status: 'covered',
    minutes: 9,
    summary:
      'Diagnostic measurement of Core Web Vitals. Optimizing Interaction to Next Paint (INP) via task slicing, Long Animation Frames (LoAF) API attribution, and scheduler.postTask.',
    body: [
      '### 📊 Core Web Vitals Thresholds',
      '- **LCP (Largest Contentful Paint)**: $< 2.5\text{s}$ (Good).',
      '- **INP (Interaction to Next Paint)**: $< 200\text{ms}$ (Good). Replaced FID in 2024.',
      '- **CLS (Cumulative Layout Shift)**: $< 0.1$ (Good).',
      '',
      '### ⏱️ INP & Task Scheduling',
      'Break long synchronous JavaScript loops ($> 50\text{ms}$) into chunked microtasks using `scheduler.yield()`, `scheduler.postTask()`, or `MessageChannel` to keep the main thread responsive.',
    ],
    keyPoints: [
      'INP measures Input Delay + Processing Time + Presentation Delay (Target < 200ms).',
      'Long Animation Frames (LoAF) API provides script-level attribution for sluggish UI tasks.',
      'Yield long tasks using scheduler.yield() or scheduler.postTask().',
    ],
    interview:
      'How to diagnose high INP: "Break down the interaction in DevTools Performance panel, measure main-thread processing time, and slice long handler blocks with scheduler.yield()."',
    resources: [
      { label: 'roadmap.sh/frontend-performance-best-practices', url: 'https://roadmap.sh/frontend-performance-best-practices', kind: 'docs' },
    ],
  },
  {
    id: 'rd-perf-network-cdn',
    area: 'Performance',
    group: 'Network & Caching',
    title: 'HTTP/3 QUIC, Edge CDN Caching & Real User Monitoring (RUM)',
    status: 'covered',
    minutes: 7,
    summary:
      'Advanced network protocols: HTTP/3 over QUIC, Edge CDN Stale-While-Revalidate caching, PerformanceObserver telemetry, and asynchronous navigator.sendBeacon.',
    body: [
      '### ⚡ HTTP/3 & Edge CDN Invariants',
      '- **HTTP/3 over QUIC**: Runs over UDP, eliminating TCP Head-of-Line blocking and enabling 0-RTT connection resumption.',
      '- **Edge CDN Caching**: `Cache-Control: s-maxage=60, stale-while-revalidate=86400` delivers instant sub-50ms responses globally.',
      '- **Real User Monitoring (RUM)**: `PerformanceObserver` captures real-world field telemetry and flushes via `navigator.sendBeacon`.',
    ],
    keyPoints: [
      'HTTP/3 eliminates TCP Head-of-Line blocking over lossy networks.',
      'Edge CDN SWR headers eliminate server compute latency for static and semi-static routes.',
      'Use navigator.sendBeacon for reliable zero-delay telemetry reporting.',
    ],
    interview:
      'Why send telemetry via navigator.sendBeacon: "sendBeacon queues asynchronous POST requests at the browser process level, guaranteeing delivery even if the tab is closed immediately."',
    resources: [
      { label: 'roadmap.sh/frontend-performance-best-practices', url: 'https://roadmap.sh/frontend-performance-best-practices', kind: 'docs' },
    ],
  },
];
