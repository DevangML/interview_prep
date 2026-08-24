import ProgressBar from '../shared/ProgressBar';
import Timer from '../shared/Timer';
import { ShieldAlert, GraduationCap, Gavel, Command, PenLine, FastForward, Terminal, Sparkles } from 'lucide-react';
import type { Challenge } from '../../types';
import type { EditorMode } from '../../store';
import type { Status } from '../../lib/schedule';
import { useStore } from '../../store';

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
  const { vimMode, toggleVimMode, suggestionsOn, toggleSuggestions } = useStore();

  const statusChip: Record<Status, string> = {
    untouched: 'bg-slate-700 text-slate-300',
    due: 'bg-amber-500 text-slate-900',
    held: 'bg-emerald-600 text-white',
    leech: 'bg-red-600 text-white',
  };

  return (
    <div className={`px-4 py-2 flex items-center gap-2.5 text-xs shrink-0 flex-wrap text-white transition-colors border-b border-slate-800 ${exam ? 'bg-red-950' : 'bg-slate-900'}`}>
      <div className="flex items-center gap-1">
        <button onClick={onPrev} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer transition-colors">←</button>
        <button onClick={onNext} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer transition-colors">→</button>
      </div>

      <div className="flex items-center rounded-lg overflow-hidden border border-slate-700">
        <button
          onClick={() => onSetMode('practice')}
          className={`px-2.5 py-1 font-semibold flex items-center gap-1 cursor-pointer transition-all ${!exam ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <GraduationCap size={12} /> Practice
        </button>
        <button
          onClick={() => onSetMode('exam')}
          className={`px-2.5 py-1 font-semibold flex items-center gap-1 cursor-pointer transition-all ${exam ? 'bg-red-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <ShieldAlert size={12} /> Exam
        </button>
      </div>

      <ProgressBar label="" value={queue.held} max={totalCount} className="w-24" />
      <span className="text-slate-400 font-mono text-[0.7rem]" title="held · due · leech · untouched">
        <span className="text-emerald-400 font-bold">{queue.held}</span>
        {' · '}<span className="text-amber-400 font-bold">{queue.due}</span>
        {queue.leech > 0 && <>{' · '}<span className="text-red-400 font-bold">{queue.leech}🩸</span></>}
        {' · '}<span className="text-slate-500">{queue.untouched}</span>
      </span>

      <button
        onClick={onNextDue}
        title="Leeches first, then longest overdue, then new material"
        className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer flex items-center gap-1 transition-colors"
      >
        <FastForward size={12} /> Next
      </button>

      {!exam && (
        <div className="flex items-center gap-1">
          <button
            onClick={toggleVimMode}
            title="Toggle Neovim / Vim Modal Editing"
            className={`px-2 py-1 rounded-md font-mono text-[0.7rem] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
              vimMode ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Terminal size={11} /> VIM
          </button>
          <button
            onClick={toggleSuggestions}
            title="Toggle LSP Autocomplete & Suggestions"
            className={`px-2 py-1 rounded-md text-[0.7rem] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              suggestionsOn ? 'bg-sky-700 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Sparkles size={11} /> LSP
          </button>
        </div>
      )}

      {exam && (
        <span className="font-bold text-red-300 tracking-wide uppercase text-[0.65rem] animate-pulse">
          sealed · no assists · speed test
        </span>
      )}

      <span className="flex-1" />

      <button
        onClick={onOpenPalette}
        title="Command palette (Cmd+K)"
        className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer flex items-center gap-1 transition-colors"
      >
        <Command size={12} /> ⌘K
      </button>

      <button
        onClick={onToggleTimer}
        className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
          timerActive ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
      >
        ⏱️ 75s
      </button>
      <Timer seconds={timerLeft} active={timerActive} />

      {currentChallenge && (
        <button
          onClick={onGrade}
          disabled={grading}
          className="px-3 py-1 rounded-md font-bold flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 cursor-pointer shadow-xs transition-transform active:scale-95"
        >
          <Gavel size={13} /> {grading ? 'Grading…' : 'Grade (⌘⏎)'}
        </button>
      )}

      {currentChallenge && (
        <span className={`px-2 py-1 rounded-md font-semibold ${statusChip[status]}`} title={dueLabel}>
          {status === 'held' ? dueLabel : status}
        </span>
      )}

      {currentChallenge && !exam && (
        <button
          onClick={onOverride}
          title="Override: record a pass by hand. Logged as an override."
          className="px-2 py-1 rounded-md font-semibold flex items-center gap-1 bg-slate-800 text-slate-400 hover:bg-slate-700 cursor-pointer transition-colors"
        >
          <PenLine size={11} /> override
        </button>
      )}
    </div>
  );
}
