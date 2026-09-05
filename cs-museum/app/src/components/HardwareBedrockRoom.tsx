import { useMuseumStore } from '../store/useMuseumStore';
import {
  HARDWARE_PRIMITIVES,
  getAnchoredConcepts,
} from '../lib/bedrockIndex';

interface Props {
  stageId: string;
}

export const HardwareBedrockRoom = ({ stageId }: Props) => {
  const { programmingNodes, selectConcept } = useMuseumStore();
  const primitives = HARDWARE_PRIMITIVES[stageId] || [];
  const anchored = getAnchoredConcepts(programmingNodes, stageId);

  return (
    <div className="space-y-8 animate-fade-in font-chrome">
      {/* 1. Anchored Software Abstractions Section */}
      {anchored.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-surface-border pb-2">
            <div>
              <h3 className="text-sm font-chrome font-bold text-ink-1">
                Higher-Level Concepts Rooted in this Bedrock ({anchored.length})
              </h3>
              <p className="text-xs text-ink-3 font-prose">
                These software constructs from higher layers directly lower into this layer’s physical contracts.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
              Reverse Bedrock Index
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {anchored.map((item) => (
              <button
                key={item.conceptId}
                type="button"
                onClick={() => selectConcept(item.conceptId)}
                className="animate-spring-press text-left p-3.5 rounded-xl border border-surface-border bg-surface-card hover:border-axis/50 hover:bg-surface-raised transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-ink-1 group-hover:text-axis transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-ink-3">
                      {item.stageName}
                    </span>
                  </div>
                  <p className="font-prose text-[11px] text-ink-2 line-clamp-2 leading-relaxed">
                    {item.anchorDetail}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-surface-border/50 flex items-center justify-between text-[10px] font-mono text-axis font-semibold">
                  <span>Inspect Concept</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 2. Hardware Primitives & Invariants */}
      <section className="space-y-3">
        <div className="border-b border-surface-border pb-2">
          <h3 className="text-sm font-chrome font-bold text-ink-1">
            Foundational Hardware Invariants ({primitives.length})
          </h3>
          <p className="text-xs text-ink-3 font-prose">
            Immutable physical realities that bound all software layers above.
          </p>
        </div>

        <div className="space-y-4">
          {primitives.map((prim) => (
            <div
              key={prim.id}
              className="p-4 rounded-2xl border border-surface-border bg-surface-card space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 mr-2">
                    {prim.category}
                  </span>
                  <h4 className="inline font-bold text-sm text-ink-1">{prim.title}</h4>
                </div>
              </div>

              <p className="text-xs text-ink-3 font-mono font-medium">{prim.tagline}</p>

              <div className="p-3 rounded-xl bg-surface-raised text-xs font-prose text-ink-2 leading-relaxed">
                {prim.mechanism}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="p-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-ink-2">
                  <span className="text-amber-400 font-bold block mb-0.5">🔒 Invariant:</span>
                  <span>{prim.hardwareInvariant}</span>
                </div>
                <div className="p-2.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-ink-2">
                  <span className="text-cyan-400 font-bold block mb-0.5">⚡ Downward Impact:</span>
                  <span>{prim.downwardImpact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
