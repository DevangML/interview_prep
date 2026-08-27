import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { MasteryUnit } from '../../data/masteryStream';
import { statusOf, dueLabel } from '../../lib/schedule';
import type { Schedule } from '../../lib/schedule';

interface Props {
  unit: MasteryUnit;
  isActive: boolean;
  isSolved: boolean;
  schedule: Schedule;
  now: number;
  onSelect: (u: MasteryUnit) => void;
}

export function StreamUnitItem({ unit, isActive, isSolved, schedule, now, onSelect }: Props) {
  const itemStatus = statusOf(schedule[unit.id], now);
  const isDue = itemStatus === 'due';
  const isLeech = itemStatus === 'leech';

  return (
    <button
      onClick={() => onSelect(unit)}
      /* The nav scrolls to this on mount, so it needs to be findable in the DOM. */
      data-unit-id={unit.id}
      data-active={isActive || undefined}
      aria-current={isActive ? 'true' : undefined}
      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 group transition text-[11px] cursor-pointer ${
        isActive
          ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40 shadow-xs font-semibold'
          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {isSolved ? (
          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
        ) : (
          <Circle size={13} className="text-slate-600 group-hover:text-slate-400 shrink-0" />
        )}
        <span className="truncate">{unit.title}</span>
      </div>

      <div className="flex items-center gap-1 shrink-0 font-mono text-[9px]">
        {isLeech && (
          <span className="px-1.5 py-0.2 rounded bg-rose-950/80 text-rose-300 border border-rose-800/80 font-bold" title="Failed 3+ times">
            leech
          </span>
        )}
        {isDue && (
          <span className="px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 font-bold" title="Spaced-repetition due">
            due
          </span>
        )}
        <span className="text-slate-500 text-[10px]">{unit.practice.type}</span>
      </div>
    </button>
  );
}
