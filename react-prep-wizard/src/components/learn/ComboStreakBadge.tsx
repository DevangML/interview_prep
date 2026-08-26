import { Zap, Flame, Sparkles } from 'lucide-react';

interface Props {
  streak: number;
  multiplier: number;
}

export function ComboStreakBadge({ streak, multiplier }: Props) {
  if (streak < 2) return null;

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse">
      <Flame size={14} className="text-amber-400 fill-amber-400" />
      <span className="text-xs font-black tracking-tight text-amber-300 font-mono">
        {streak} STREAK
      </span>
      <div className="flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-black text-[10px]">
        <Sparkles size={9} />
        <span>x{multiplier} MULTIPLIER</span>
      </div>
    </div>
  );
}
