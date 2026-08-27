import { useMemo } from 'react';
import { getBounds, layoutNotes, NOTE_FONT, NOTE_LINE } from './diagramBounds';
import type { Diagram } from '../../types';

export type DiagramData = Diagram;

interface Props {
  diagram: Diagram | null | undefined;
  className?: string;
}

function SingleSvg({ d }: { d: DiagramData }) {
  const b = useMemo(() => getBounds(d), [d]);
  const notes = useMemo(() => layoutNotes(d), [d]);

  return (
    <svg
      viewBox={`${b.vx} ${b.vy} ${b.vw} ${b.vh}`}
      className="w-full max-h-48 text-slate-800"
      role="img"
      aria-label="Expected result diagram"
    >
      <defs>
        <marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="#e11d48" />
        </marker>
      </defs>

      {(d.track || []).map((a, i) => (
        <g key={`trk-${i}`}>
          <line x1={a[0]} y1={a[1] + 7} x2={a[0] + a[2]} y2={a[1] + 7} stroke="#94a3b8" strokeWidth={1} strokeDasharray="2,2" />
          <text x={a[0] + a[2] / 2} y={a[1] + 5} textAnchor="middle" fontSize={9} fontWeight="600" fill="#64748b">{a[3]}</text>
        </g>
      ))}

      {d.frame && (
        <g>
          <rect x={d.frame[0]} y={d.frame[1]} width={d.frame[2]} height={d.frame[3]} rx={4} fill="none" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4,3" />
          {/* Above the frame, not inside it: the first row of boxes starts ~8px
              below the frame edge, so an inside caption was struck through by
              content on 51 of the 71 labelled diagrams. */}
          {d.frame[4] && <text x={d.frame[0]} y={d.frame[1] - 4} fontSize={10} fontWeight="700" fill="#475569">{d.frame[4]}</text>}
        </g>
      )}

      {(d.box || []).map((bx, i) => {
        const isGhost = bx[5] === 'ghost';
        const isHi = bx[5] === 'hi';
        return (
          <g key={`box-${i}`}>
            <rect
              x={bx[0]} y={bx[1]} width={bx[2]} height={bx[3]} rx={3}
              fill={isGhost ? '#f1f5f9' : isHi ? '#fed7aa' : '#bae6fd'}
              stroke={isGhost ? '#94a3b8' : isHi ? '#f97316' : '#0284c7'}
              strokeWidth={1.2}
              strokeDasharray={isGhost ? '3,2' : undefined}
            />
            {bx[4] && (
              <text x={bx[0] + bx[2] / 2} y={bx[1] + bx[3] / 2 + 4} textAnchor="middle" fontSize={10} fontWeight="700" fill="#0f172a">
                {bx[4]}
              </text>
            )}
          </g>
        );
      })}

      {(d.gap || []).map((g, i) => {
        const isHoriz = g[4] !== 0;
        const x = g[0], y = g[1], L = g[2], lab = g[3] || '';
        return (
          <g key={`gap-${i}`} stroke="#dc2626" strokeWidth={1}>
            {isHoriz ? (
              <>
                <line x1={x} y1={y} x2={x + L} y2={y} />
                <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
                <line x1={x + L} y1={y - 4} x2={x + L} y2={y + 4} />
                <text x={x + L / 2} y={y - 5} textAnchor="middle" fontSize={9} fontWeight="600" fill="#dc2626" stroke="none">{lab}</text>
              </>
            ) : (
              <>
                <line x1={x} y1={y} x2={x} y2={y + L} />
                <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
                <line x1={x - 4} y1={y + L} x2={x + 4} y2={y + L} />
                <text x={x + 6} y={y + L / 2 + 3} fontSize={9} fontWeight="600" fill="#dc2626" stroke="none">{lab}</text>
              </>
            )}
          </g>
        );
      })}

      {(d.arrow || []).map((a, i) => (
        <g key={`arr-${i}`}>
          <line x1={a[0]} y1={a[1]} x2={a[2]} y2={a[3]} stroke="#e11d48" strokeWidth={1.5} markerEnd="url(#ah)" />
          {a[4] && <text x={(a[0] + a[2]) / 2} y={a[1] - 5} textAnchor="middle" fontSize={9} fontWeight="700" fill="#e11d48">{a[4]}</text>}
        </g>
      ))}

      {notes.map((n, i) => (
        <text key={`note-${i}`} x={n.x} y={n.y} fontSize={NOTE_FONT} fontStyle="italic" fill="#64748b">
          {n.lines.map((line, j) => (
            <tspan key={j} x={n.x} dy={j === 0 ? 0 : NOTE_LINE}>{line}</tspan>
          ))}
        </text>
      ))}
    </svg>
  );
}

export default function DiagramView({ diagram, className = '' }: Props) {
  if (!diagram) return null;
  if (diagram.alt) {
    const labels = diagram.labels || ['Wide Viewport', 'Narrow / Mobile Viewport'];
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 p-2 bg-slate-50 border border-slate-200 rounded-lg ${className}`}>
        <div className="flex flex-col items-center">
          <SingleSvg d={diagram} />
          <span className="text-[0.68rem] font-bold text-slate-500 uppercase tracking-wider mt-1">{labels[0]}</span>
        </div>
        <div className="flex flex-col items-center">
          <SingleSvg d={diagram.alt} />
          <span className="text-[0.68rem] font-bold text-slate-500 uppercase tracking-wider mt-1">{labels[1]}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-2 bg-slate-50 border border-slate-200 rounded-lg flex justify-center ${className}`}>
      <SingleSvg d={diagram} />
    </div>
  );
}
