import { Scale, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

interface TradeOffVector {
  dimension: string;
  gain: string;
  sacrifice: string;
}

interface Props {
  tradeOffs?: TradeOffVector[];
  systemImpact?: string;
}

export function TradeOffMatrixCard({ tradeOffs, systemImpact }: Props) {
  if (!tradeOffs && !systemImpact) return null;

  return (
    <section className="rounded-xl border border-indigo-500/30 bg-slate-900/80 p-5 space-y-3.5 text-slate-200 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
          <Scale size={14} />
          <span>Staff+ Architectural Trade-Off Matrix</span>
        </h2>
        <span className="text-[10px] font-mono text-slate-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
          FAANG L6 Defense
        </span>
      </div>

      {systemImpact && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs leading-relaxed text-slate-300">
          <Cpu size={14} className="text-sky-400 shrink-0 mt-0.5" />
          <p><strong className="text-sky-300">System Constraint:</strong> {systemImpact}</p>
        </div>
      )}

      {tradeOffs && tradeOffs.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
            <span>Vector</span>
            <span className="text-emerald-400">What We Optimized</span>
            <span className="text-rose-400">What We Sacrificed</span>
          </div>
          {tradeOffs.map((t, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] items-center">
              <span className="font-mono font-bold text-indigo-300">{t.dimension}</span>
              <span className="text-emerald-300 flex items-center gap-1">
                <ArrowRight size={10} className="shrink-0" /> {t.gain}
              </span>
              <span className="text-rose-300 flex items-center gap-1">
                <ShieldAlert size={10} className="shrink-0" /> {t.sacrifice}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
