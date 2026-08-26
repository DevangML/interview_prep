import { useMemo } from 'react';
import type { Layout, Placed } from '../../lib/conceptGraphLayout';
import { arcPath, edgePath } from '../../lib/conceptGraphLayout';
import type { ConceptEdge } from '../../data/projects/coverage';
import { EDGE_STYLE, EXEMPT_STYLE, areaColor } from './graphTheme';

interface Props {
  layout: Layout;
  edges: Map<string, ConceptEdge>;
  exemptions: Map<string, { reason: string }>;
  titles: Map<string, string>;
  visible: Set<string>;
  matched: Set<string> | null;
  selected: string | null;
  projectLabel: string;
  onSelect: (id: string | null) => void;
}

const state = (id: string, edges: Map<string, ConceptEdge>, exemptions: Map<string, unknown>) =>
  edges.get(id)?.kind ?? (exemptions.has(id) ? 'exempt' : 'none');

/** The graph. One project at the hub, its whole concept space around it. */
export default function ConceptGraphCanvas(props: Props) {
  const { layout, edges, exemptions, titles, visible, matched, selected, projectLabel, onSelect } = props;
  const { size, radius, nodes, arcs } = layout;

  const drawn = useMemo(
    () => nodes.map((n) => {
      const kind = state(n.id, edges, exemptions);
      const dimmed = !visible.has(kind) || (matched ? !matched.has(n.id) : false);
      return { n, kind, dimmed, active: selected === n.id };
    }),
    [nodes, edges, exemptions, visible, matched, selected],
  );

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      // Width-driven, height from the viewBox. `h-full` plus `aspect-square`
      // is circular inside an auto-height grid row — the row sizes to the SVG
      // while the SVG sizes to the row — and collapsed the graph to 10px.
      className="w-full h-auto max-h-full select-none"
      role="img"
      aria-label={`Concept coverage graph for ${projectLabel}`}
      onClick={() => onSelect(null)}
    >
      <defs>
        <radialGradient id="hub">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={size / 2} cy={size / 2} r={radius + 22} fill="url(#hub)" />

      {arcs.map((a) => (
        <g key={a.area}>
          <path d={arcPath(a, size, radius)} fill={areaColor(a.area)} opacity={0.55} />
          <text
            x={a.labelX} y={a.labelY}
            textAnchor={a.anchor} dominantBaseline="middle"
            className="text-[9px] font-bold uppercase"
            fill={areaColor(a.area)}
            style={{ letterSpacing: '0.06em' }}
          >
            {a.area} <tspan opacity={0.6}>{a.count}</tspan>
          </text>
        </g>
      ))}

      {drawn.map(({ n, kind, dimmed, active }) => {
        if (kind === 'exempt' || kind === 'none') return null;
        const s = EDGE_STYLE[kind as keyof typeof EDGE_STYLE];
        return (
          <path
            key={`e-${n.id}`}
            d={edgePath(n, size)}
            fill="none"
            stroke={s.stroke}
            strokeWidth={active ? s.width + 1.4 : s.width}
            strokeDasharray={s.dash}
            opacity={dimmed ? 0.06 : active ? 1 : 0.42}
            strokeLinecap="round"
          />
        );
      })}

      {drawn.map(({ n, kind, dimmed, active }) => (
        <Node key={n.id} n={n} kind={kind} dimmed={dimmed} active={active} title={titles.get(n.id) ?? n.id} onSelect={onSelect} />
      ))}

      <g>
        <circle cx={size / 2} cy={size / 2} r={38} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
        <text x={size / 2} y={size / 2 - 3} textAnchor="middle" className="text-[10px] font-black" fill="#e2e8f0">
          PROJECT
        </text>
        <text x={size / 2} y={size / 2 + 10} textAnchor="middle" className="text-[9px] font-mono" fill="#38bdf8">
          {edges.size}/{edges.size + exemptions.size}
        </text>
      </g>
    </svg>
  );
}

function Node({ n, kind, dimmed, active, title, onSelect }: {
  n: Placed; kind: string; dimmed: boolean; active: boolean; title: string;
  onSelect: (id: string) => void;
}) {
  const exempt = kind === 'exempt';
  const fill = exempt ? EXEMPT_STYLE.fill : areaColor(n.area);
  const r = active ? 7 : exempt ? 3.5 : 5;
  return (
    <g
      onClick={(ev) => { ev.stopPropagation(); onSelect(n.id); }}
      className="cursor-pointer"
      opacity={dimmed ? 0.12 : 1}
    >
      <title>{title}</title>
      <circle cx={n.x} cy={n.y} r={14} fill="transparent" />
      {active && <circle cx={n.x} cy={n.y} r={12} fill="none" stroke={fill} strokeWidth={1} opacity={0.5} />}
      <circle
        cx={n.x} cy={n.y} r={r}
        fill={fill}
        stroke={exempt ? EXEMPT_STYLE.stroke : '#0f172a'}
        strokeWidth={exempt ? 1.2 : 1.5}
        strokeDasharray={exempt ? '2 2' : undefined}
      />
    </g>
  );
}
