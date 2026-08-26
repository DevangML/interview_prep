/**
 * Radial cluster layout for the project↔concept graph.
 *
 * Deterministic on purpose. A force simulation would place the same graph
 * differently on every visit, which makes it impossible to learn the shape of
 * your own curriculum. Here an area always occupies the same arc, so "the CSS
 * wedge is dark for this project" becomes a fact you can recognise at a glance.
 */
import type { GraphCluster } from '../data/projects/graph';

export interface Placed {
  id: string;
  x: number;
  y: number;
  angle: number;
  area: string;
  group: string;
}

export interface PlacedArc {
  area: string;
  start: number;
  end: number;
  mid: number;
  count: number;
  labelX: number;
  labelY: number;
  anchor: 'start' | 'end';
}

export interface Layout {
  nodes: Placed[];
  arcs: PlacedArc[];
  byId: Map<string, Placed>;
  radius: number;
  size: number;
}

const TAU = Math.PI * 2;
const GAP = 0.055; // radians of breathing room between area wedges

/**
 * Areas are allocated arc proportional to their concept count, so a 15-concept
 * area is visibly bigger than a 1-concept one — the wedge itself is data.
 */
export function layoutRadial(clusters: GraphCluster[], size: number, ringCount = 2): Layout {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 78;
  const total = clusters.reduce((n, c) => n + c.conceptIds.length, 0) || 1;
  const usable = TAU - GAP * clusters.length;

  const nodes: Placed[] = [];
  const arcs: PlacedArc[] = [];
  let cursor = -Math.PI / 2; // start at 12 o'clock

  for (const cluster of clusters) {
    const span = (cluster.conceptIds.length / total) * usable;
    const start = cursor;
    const end = cursor + span;
    const mid = (start + end) / 2;

    // Concepts stagger across rings so a dense area does not collide with itself.
    const ordered = cluster.groups.flatMap((g) => g.conceptIds.map((id) => ({ id, group: g.group })));
    ordered.forEach((entry, i) => {
      const t = ordered.length === 1 ? 0.5 : (i + 0.5) / ordered.length;
      const angle = start + span * t;
      const ring = ringCount > 1 ? i % ringCount : 0;
      const r = radius - ring * 34;
      nodes.push({
        id: entry.id,
        group: entry.group,
        area: cluster.area,
        angle,
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
      });
    });

    const labelR = radius + 26;
    arcs.push({
      area: cluster.area,
      start, end, mid,
      count: cluster.conceptIds.length,
      labelX: cx + Math.cos(mid) * labelR,
      labelY: cy + Math.sin(mid) * labelR,
      anchor: Math.cos(mid) < 0 ? 'end' : 'start',
    });
    cursor = end + GAP;
  }

  return { nodes, arcs, byId: new Map(nodes.map((n) => [n.id, n])), radius, size };
}

/** Wedge path for an area band, drawn just outside the node ring. */
export function arcPath(a: PlacedArc, size: number, radius: number, thickness = 9): string {
  const cx = size / 2;
  const cy = size / 2;
  const r0 = radius + 10;
  const r1 = r0 + thickness;
  const large = a.end - a.start > Math.PI ? 1 : 0;
  const p = (r: number, ang: number) => `${cx + Math.cos(ang) * r} ${cy + Math.sin(ang) * r}`;
  return `M ${p(r0, a.start)} A ${r0} ${r0} 0 ${large} 1 ${p(r0, a.end)} L ${p(r1, a.end)} A ${r1} ${r1} 0 ${large} 0 ${p(r1, a.start)} Z`;
}

/**
 * A quadratic curve bowed away from the centre. Straight lines from a hub
 * overlap into an unreadable star; a consistent bow keeps them separable.
 */
export function edgePath(node: Placed, size: number, bow = 0.18): string {
  const cx = size / 2;
  const cy = size / 2;
  const mx = (cx + node.x) / 2;
  const my = (cy + node.y) / 2;
  const nx = -(node.y - cy);
  const ny = node.x - cx;
  return `M ${cx} ${cy} Q ${mx + nx * bow} ${my + ny * bow} ${node.x} ${node.y}`;
}
