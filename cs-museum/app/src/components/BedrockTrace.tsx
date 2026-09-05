import { useState } from 'react';
import type { Dependency } from '../store/useMuseumStore';
import { useMuseumStore } from '../store/useMuseumStore';

interface BedrockTraceProps {
  empoweredBy?: Dependency[];
  traceDown?: string[];
  empowersNote?: string;
}

export const BedrockTrace = ({
  empoweredBy = [],
  traceDown = [],
  empowersNote,
}: BedrockTraceProps) => {
  const { bedrockNodesMap, programmingNodes, selectConcept } = useMuseumStore();
  const [open, setOpen] = useState(false);
  const [expandedHop, setExpandedHop] = useState<number | null>(null);
  const hopCount = empoweredBy.length;

  if (hopCount === 0 && traceDown.length === 0 && !empowersNote) return null;

  return (
    <div className="mt-8 border border-surface-border rounded-xl bg-surface-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer hover:bg-surface-raised"
        aria-expanded={open}
      >
        <span className="text-xs font-chrome font-semibold text-ink-1">
          What this uses ({hopCount} {hopCount === 1 ? 'dependency' : 'dependencies'})
        </span>
        <span className="text-[11px] text-ink-3">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && (
      <div className="px-4 pb-5 border-t border-surface-border pt-4">

      {/* 1. Empowered By Implementation List */}
      <div className="space-y-3">
        {empoweredBy.map((dep, idx) => {
          const isExpanded = expandedHop === idx;
          const targetBedrock = dep.nodeId ? bedrockNodesMap.get(dep.nodeId) : null;
          const targetProg = dep.nodeId
            ? programmingNodes.find((n) => n.id === dep.nodeId)
            : null;
          const resolvedTarget = targetBedrock || targetProg;

          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-surface-border bg-surface-card transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-ink-1">{dep.uses}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-relation-uses/10 text-relation-uses font-bold">
                      {dep.confidence}
                    </span>
                    {resolvedTarget && (
                      <button
                        onClick={() => setExpandedHop(isExpanded ? null : idx)}
                        className="text-[11px] font-chrome text-axis hover:underline cursor-pointer flex items-center gap-1"
                        aria-label="Toggle underlying construct details"
                      >
                        {isExpanded ? '▴ Hide Spec' : '▾ Inspect Spec'}
                      </button>
                    )}
                  </div>
                  <p className="font-prose text-xs text-ink-2 mt-1.5 leading-relaxed">
                    {dep.how}
                  </p>
                  <div className="mt-2 text-[11px] font-mono text-ink-3">
                    <span className="uppercase text-[9px] tracking-wider text-ink-3 mr-1 font-bold">For:</span>
                    {dep.forCase}
                  </div>
                </div>
              </div>

              {/* Inline Progressive Disclosure for the underlying node */}
              {isExpanded && resolvedTarget && (
                <div className="mt-3 pt-3 border-t border-surface-border text-xs bg-surface-raised/60 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-ink-1">
                      Hardware/System Spec: {resolvedTarget.label}
                    </span>
                    {targetProg && (
                      <button
                        onClick={() => selectConcept(targetProg.id)}
                        className="text-[10px] font-chrome text-axis hover:underline cursor-pointer"
                      >
                        Navigate to Node &rarr;
                      </button>
                    )}
                  </div>
                  <p className="font-prose text-ink-2 text-xs leading-relaxed">
                    {resolvedTarget.details?.definition ||
                      resolvedTarget.details?.motivation ||
                      'Fundamental computing abstraction in the execution hierarchy.'}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 2. Trace Down To Metal (Ladder) */}
      {traceDown.length > 0 && (
        <div className="mt-8 p-5 rounded-xl border border-surface-border bg-surface-raised/40">
          <h4 className="text-xs font-mono uppercase tracking-widest text-ink-3 font-bold mb-3">
            Downward Trace to Silicon
          </h4>
          <ol className="space-y-2">
            {traceDown.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span className="font-mono text-ink-3 w-5 shrink-0 font-bold">{i + 1}.</span>
                <span className="font-prose text-ink-1 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* 3. Non-structural Empowers Note */}
      {empowersNote && (
        <div className="mt-6 p-4 rounded-xl border border-dashed border-surface-border bg-surface-raised/20 text-xs text-ink-3">
          <div className="font-mono uppercase tracking-wider text-[10px] font-bold text-ink-3 mb-1">
            Empowers — Prose Only, Not a Dependency
          </div>
          <p className="font-prose italic text-ink-2 leading-relaxed">{empowersNote}</p>
        </div>
      )}
      </div>
      )}
    </div>
  );
};
