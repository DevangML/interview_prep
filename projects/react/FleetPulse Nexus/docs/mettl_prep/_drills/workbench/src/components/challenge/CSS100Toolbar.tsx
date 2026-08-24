import ProgressBar from '../shared/ProgressBar';
import Timer from '../shared/Timer';
import { ShieldAlert, GraduationCap, Gavel, Command, PenLine, FastForward } from 'lucide-react';
import type { Challenge } from '../../types';
import type { EditorMode } from '../../store';
import type { Status } from '../../lib/schedule';

interface Props {
  queue: { untouched: number; due: number; held: number; leech: number };
  totalCount: number;
  timerActive: boolean;
  timerLeft: number;
  currentChallenge: Challenge | null;
  status: Status;
  dueLabel: string;
  mode: EditorMode;
  grading: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleTimer: () => void;
  onOverride: () => void;
  onSetMode: (m: EditorMode) => void;
  onGrade: () => void;
  onOpenPalette: () => void;
  onNextDue: () => void;
}

export default function CSS100Toolbar({
  queue, totalCount, timerActive, timerLeft, currentChallenge, status, dueLabel,
  mode, grading, onPrev, onNext, onToggleTimer, onOverride, onSetMode, onGrade,
  onOpenPalette, onNextDue,
}: Props) {
  const exam = mode === 'exam';
  const statusChip: Record<Status, string> = {
    untouched: 'bg-slate-700 text-slate-300',
    due: 'bg-amber-500 text-slate-900',
    held: 'bg-emerald-600 text-white',
    leech: 'bg-red-600 text-white',
  };

  return (
    <div className={`px-4 py-2 flex items-center gap-3 text-xs shrink-0 flex-wrap text-white transition-colors ${exam ? 'bg-red-950' : 'bg-slate-900'}`}>
      <div className="flex items-center gap-1">
        <button onClick={onPrev} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer">←</button>
        <button onClick={onNext} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer">→</button>
      </div>

      {/* Mode switch — the one control that changes what this instrument is. */}
      <div className="flex items-center rounded overflow-hidden border border-slate-700">
        <button
          onClick={() => onSetMode('practice')}
          className={`px-2.5 py-1 font-semibold flex items-center gap-1 cursor-pointer ${!exam ? 'bg-sky-700 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <GraduationCap size={12} /> Practice
        </button>
        <button
          onClick={() => onSetMode('exam')}
          className={`px-2.5 py-1 font-semibold flex items-center gap-1 cursor-pointer ${exam ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <ShieldAlert size={12} /> Exam
        </button>
      </div>

      {/* Held = passed the grader and not yet decayed. That is the only honest count. */}
      <ProgressBar label="" value={queue.held} max={totalCount} className="w-28" />
      <span className="text-slate-400 font-mono" title="held · due · leech · untouched">
        <span className="text-emerald-400">{queue.held}</span>
        {' · '}<span className="text-amber-400">{queue.due}</span>
        {queue.leech > 0 && <>{' · '}<span className="text-red-400">{queue.leech}🩸</span></>}
        {' · '}<span className="text-slate-500">{queue.untouched}</span>
      </span>

      <button
        onClick={onNextDue}
        title="Leeches first, then longest overdue, then new material"
        className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer flex items-center gap-1"
      >
        <FastForward size={12} /> Next due
      </button>

      {exam && (
        <span className="font-bold text-red-300 tracking-wide uppercase text-[0.65rem]">
          no emmet · no autocomplete · no hints · no target
        </span>
      )}

      <span className="flex-1" />

      <button
        onClick={onOpenPalette}
        title="Command palette"
        className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer flex items-center gap-1"
      >
        <Command size={12} /> K
      </button>

      <button
        onClick={onToggleTimer}
        className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${timerActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
      >
        ⏱️ 75s
      </button>
      <Timer seconds={timerLeft} active={timerActive} />

      {currentChallenge && (
        <button
          onClick={onGrade}
          disabled={grading}
          className="px-3 py-1 rounded font-semibold flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 disabled:opacity-50 cursor-pointer"
        >
          <Gavel size={13} /> {grading ? 'Grading…' : 'Grade'}
        </button>
      )}

      {currentChallenge && (
        <span className={`px-2 py-1 rounded font-semibold ${statusChip[status]}`} title={dueLabel}>
          {status === 'held' ? dueLabel : status}
        </span>
      )}

      {currentChallenge && !exam && (
        // Kept because a grader can be wrong; every use of it is logged as an override.
        <button
          onClick={onOverride}
          title="Override: record a pass by hand. Logged as an override, not as a grade."
          className="px-2 py-1 rounded font-semibold flex items-center gap-1 bg-slate-800 text-slate-400 hover:bg-slate-700 cursor-pointer"
        >
          <PenLine size={12} /> override
        </button>
      )}
    </div>
  );
}
