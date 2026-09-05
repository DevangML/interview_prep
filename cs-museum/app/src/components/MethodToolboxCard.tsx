import type { MethodToolboxItem } from '../store/types';

interface Props {
  items: MethodToolboxItem[];
  language: string;
}

export const MethodToolboxCard = ({ items, language }: Props) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-4 font-chrome">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-ink-3 font-bold">
            Method Toolbox · What {language} Provides
          </h4>
          <p className="text-xs text-ink-2 mt-0.5">
            Concrete operations, type signatures, and execution contracts.
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-raised border border-surface-border text-ink-3">
          {items.length} Primitives
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="animate-spring-card p-3.5 rounded-xl border border-surface-border bg-surface-raised/40 hover:bg-surface-raised/80 hover:border-axis/40 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-axis">
                {item.name}
              </span>
              <code className="text-[11px] font-artifact text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 max-w-full overflow-x-auto">
                {item.signature}
              </code>
            </div>
            <p className="font-prose text-xs text-ink-1 leading-relaxed">
              {item.description}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-3 pt-1 border-t border-surface-border/40">
              <span className="text-amber-400 font-semibold">Contract:</span>
              <span>{item.contract}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
