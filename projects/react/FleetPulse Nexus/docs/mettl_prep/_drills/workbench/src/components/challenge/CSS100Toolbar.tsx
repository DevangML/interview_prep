import ProgressBar from '../shared/ProgressBar';
import Timer from '../shared/Timer';
import { CheckCircle } from 'lucide-react';
import type { Challenge } from '../../types';

interface Props {
  solvedCount: number;
  totalCount: number;
  timerActive: boolean;
  timerLeft: number;
  currentChallenge: Challenge | null;
  isSolved: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleTimer: () => void;
  onToggleSolved: () => void;
}

export default function CSS100Toolbar({
  solvedCount, totalCount, timerActive, timerLeft, currentChallenge, isSolved,
  onPrev, onNext, onToggleTimer, onToggleSolved,
}: Props) {
  return (
    <div className="bg-slate-900 text-white px-4 py-2 flex items-center gap-3 text-xs shrink-0 flex-wrap">
      <div className="flex items-center gap-1">
        <button onClick={onPrev} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer">←</button>
        <button onClick={onNext} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer">→</button>
      </div>
      <ProgressBar label="" value={solvedCount} max={totalCount} className="w-40" />
      <span className="text-slate-400 font-mono">{solvedCount} / {totalCount} solved</span>
      <span className="flex-1" />
      <button
        onClick={onToggleTimer}
        className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${timerActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
      >
        ⏱️ 75s Sprint
      </button>
      <Timer seconds={timerLeft} active={timerActive} />
      {currentChallenge && (
        <button
          onClick={onToggleSolved}
          className={`px-3 py-1 rounded font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${isSolved ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          <CheckCircle size={13} />
          {isSolved ? 'Solved ✓' : 'Mark Solved'}
        </button>
      )}
    </div>
  );
}
