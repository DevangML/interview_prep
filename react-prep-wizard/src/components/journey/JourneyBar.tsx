import { useMemo, useState } from 'react';
import { ChevronDown, Target, AlertTriangle, RotateCcw, Sparkles, Hammer } from 'lucide-react';
import { loadSchedule } from '../../lib/schedule';
import { summarise } from '../../lib/conceptModel';
import { phaseProgress, nextMove } from '../../lib/journey';
import { MASTERY_UNITS } from '../../data/masteryStream';
import { ALL_TOPICS } from '../../data/learn/extended/trackRegistry';

interface Props {
  onJumpToUnit?: (unitId: string) => void;
  /** Bump after a grade so the schedule is re-read; it lives in localStorage. */
  refreshKey?: unknown;
}

const LEVEL_STYLE = {
  solid: { bg: 'bg-emerald-500', text: 'text-emerald-300', label: 'solid' },
  working: { bg: 'bg-sky-500', text: 'text-sky-300', label: 'working' },
  shaky: { bg: 'bg-amber-500', text: 'text-amber-300', label: 'shaky' },
  untouched: { bg: 'bg-slate-700', text: 'text-slate-400', label: 'untouched' },
} as const;

/**
 * Where you are, and the one thing to do next.
 *
 * Deliberately not a completion percentage. "100 of 216" was the misleading
 * number — 82% of the units are CSS, so it measured mostly one skill and read
 * as progress across all of them. This reports concepts, which is the unit the
 * interview actually tests.
 */
export default function JourneyBar({ onJumpToUnit, refreshKey }: Props) {
  const [open, setOpen] = useState(false);

  const { phases, summary, move, current } = useMemo(() => {
    const schedule = loadSchedule();
    const now = Date.now();
    const summary = summarise(schedule, (ALL_TOPICS as any[]).length, now);
    const phases = phaseProgress(schedule, now);
    const current = phases.find((p) => p.state === 'current');
    return { phases, summary, move: nextMove(schedule, phases, summary.weakest, now), current };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const total = summary.states.length || 1;
  const seg = (n: number) => `${(n / total) * 100}%`;
  const MoveIcon = move.kind === 'leech' ? AlertTriangle
    : move.kind === 'due' ? RotateCcw
    : move.kind === 'done' ? Hammer : Sparkles;

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden">
      {/* Phase ladder */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-1.5" role="list" aria-label="Phase progress">
        {phases.map((p) => (
          <div key={p.phase.id} role="listitem" className="flex-1 min-w-0" title={
            p.measurable ? `${p.passed}/${p.total} units · ${Math.round(p.ratio * 100)}%`
                         : 'Cleared by building, not drilling'}>
            <div className={`h-1.5 rounded-full overflow-hidden ${
              p.state === 'locked' ? 'bg-slate-800' : 'bg-slate-700'}`}>
              <div
                className={`h-full rounded-full transition-all ${
                  p.state === 'cleared' ? 'bg-emerald-500'
                    : p.state === 'current' ? 'bg-amber-400' : 'bg-slate-600'}`}
                style={{ width: p.measurable ? `${Math.round(p.ratio * 100)}%` : '0%' }}
              />
            </div>
            <div className={`mt-1.5 text-[10px] font-mono truncate ${
              p.state === 'current' ? 'text-amber-300' : p.state === 'cleared' ? 'text-emerald-400' : 'text-slate-600'}`}>
              {p.phase.name}
            </div>
          </div>
        ))}
      </div>

      {/* Next move — the whole point */}
      <div className="px-4 py-3 border-t border-slate-800 flex items-start gap-3">
        <MoveIcon size={16} className={`mt-0.5 shrink-0 ${
          move.kind === 'leech' ? 'text-amber-400' : move.kind === 'done' ? 'text-sky-400' : 'text-emerald-400'}`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              {current ? current.phase.name : 'journey'} · next
            </span>
            {move.kind === 'leech' && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300">leech</span>
            )}
          </div>
          <button
            onClick={() => move.unitId && onJumpToUnit?.(move.unitId)}
            disabled={!move.unitId}
            className={`block text-left text-sm font-semibold mt-0.5 ${
              move.unitId ? 'text-slate-100 hover:text-sky-300 transition cursor-pointer' : 'text-slate-300 cursor-default'}`}
          >
            {move.title}
          </button>
          <p className="text-xs text-slate-400 mt-1">{move.reason}</p>
          {move.proves.length > 0 && (
            <p className="text-[11px] text-slate-500 mt-1.5">
              Proves: {move.proves.join(' · ')}
            </p>
          )}
        </div>
      </div>

      {/* Concept mastery */}
      <div className="px-4 py-3 border-t border-slate-800">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-2 group"
          aria-expanded={open}
        >
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Target size={13} className="text-slate-500" />
            <span className="font-mono">
              {summary.byLevel.solid} solid · {summary.byLevel.working} working ·{' '}
              <span className="text-amber-300">{summary.byLevel.shaky} shaky</span> ·{' '}
              {summary.byLevel.untouched} untouched
            </span>
          </div>
          <ChevronDown size={14} className={`text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        <div className="mt-2 h-2 rounded-full overflow-hidden flex bg-slate-800" role="img"
             aria-label={`${summary.byLevel.solid} solid, ${summary.byLevel.working} working, ${summary.byLevel.shaky} shaky, ${summary.byLevel.untouched} untouched`}>
          {(['solid', 'working', 'shaky', 'untouched'] as const).map((lvl) =>
            summary.byLevel[lvl] > 0 && (
              <div key={lvl} className={LEVEL_STYLE[lvl].bg} style={{ width: seg(summary.byLevel[lvl]) }} />
            ))}
        </div>

        {open && (
          <div className="mt-3 space-y-3">
            <p className="text-[11px] text-slate-500">
              {summary.measurable} concepts have drills that can prove them. {summary.theoryOnly} are
              reading only — the app can teach those but cannot check them, so they are not counted here.
            </p>

            {summary.weakest.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                  Weakest, worst first
                </div>
                <ul className="space-y-1">
                  {summary.weakest.map((w) => (
                    <li key={w.conceptId} className="flex items-center gap-2 text-xs">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${LEVEL_STYLE[w.level].bg}`} />
                      <span className="text-slate-300 truncate flex-1">{w.title}</span>
                      <span className="font-mono text-[10px] text-slate-500 shrink-0 tabular-nums">
                        {w.earned}/{w.units.length}
                        {w.leeches > 0 && <span className="text-amber-400"> · {w.leeches} leech</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-[11px] text-slate-600">
              Earned counts only passes the grader issued. Units you marked complete by hand count half,
              because nothing checked them. {MASTERY_UNITS.length} units in total.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
