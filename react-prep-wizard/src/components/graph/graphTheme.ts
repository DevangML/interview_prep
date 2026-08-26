import type { EdgeKind } from '../../data/projects/coverage';

/**
 * One definition per visual role, per Article VIII. The graph is read at a
 * glance, so these are the only colours it is allowed to speak in.
 */
export const EDGE_STYLE: Record<EdgeKind, { stroke: string; width: number; dash?: string; label: string; blurb: string }> = {
  explicit: {
    stroke: '#38bdf8', width: 1.9, label: 'Built explicitly',
    blurb: 'Named in a stage, a scope bullet or an acceptance criterion.',
  },
  implicit: {
    stroke: '#34d399', width: 1.2, dash: '5 4', label: 'Exercised while building',
    blurb: 'Genuinely used to do the work, without being the headline.',
  },
  counterexample: {
    stroke: '#fbbf24', width: 1.2, dash: '2 5', label: 'Met as the trap',
    blurb: 'Present as the thing the project deliberately does not do.',
  },
};

export const EXEMPT_STYLE = {
  stroke: '#475569',
  fill: '#1e293b',
  label: 'Deliberately out of scope',
  blurb: 'Classified with a stated reason. Only the basic tier may do this.',
};

/** Stable colour per area so a wedge is recognisable across projects. */
export const AREA_COLOR: Record<string, string> = {
  HTML: '#f97316',
  CSS: '#38bdf8',
  JavaScript: '#facc15',
  'React Core': '#22d3ee',
  'React Advanced': '#2dd4bf',
  'React 19': '#a78bfa',
  'State Management': '#f472b6',
  Routing: '#fb7185',
  Tooling: '#94a3b8',
  TypeScript: '#60a5fa',
  Testing: '#4ade80',
  'Web Platform': '#c084fc',
  Accessibility: '#fcd34d',
  Architecture: '#e879f9',
};

export const areaColor = (area: string) => AREA_COLOR[area] ?? '#64748b';
