import React from 'react';
import { Zap, RotateCcw } from 'lucide-react';
import { METTL_PAPER } from '../../data/rapidFireDb';

interface Props {
  isFinished: boolean;
  score: number;
  total: number;
  examMode: boolean;
  onStartRun: (full: boolean) => void;
}

export function RapidFireLobby({ isFinished, score, total, examMode, onStartRun }: Props) {
  if (isFinished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="h-full flex items-center justify-center bg-slate-950 p-6 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl space-y-4">
          <h2 className="text-3xl font-extrabold">{pct >= 70 ? '🎉 OA Cleared!' : 'Keep Practicing'}</h2>
          <div className="text-5xl font-black text-amber-400 font-mono py-2">{score} / {total}</div>
          <p className="text-slate-400 text-xs">
            {examMode ? `Full ${METTL_PAPER.questions}-question Mettl simulation complete.` : 'Sprint run complete.'}
          </p>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onStartRun(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={14} /> Retry Sprint
            </button>
            <button
              onClick={() => onStartRun(true)}
              className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer"
            >
              Sit Full Paper
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-slate-950 p-6 text-white">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl space-y-5">
        <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Zap size={32} />
        </div>
        <h1 className="text-2xl font-extrabold">Rapid Fire OA Crucible</h1>
        <p className="text-slate-400 text-xs leading-relaxed">
          Output-prediction and concept recall in the Mettl format. Sit the real simulation (<strong className="text-slate-200">{METTL_PAPER.questions} questions in {METTL_PAPER.minutes}m</strong>) or take a quick 10-question sprint.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onStartRun(false)}
            className="flex-1 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer"
          >
            10-Question Sprint
          </button>
          <button
            onClick={() => onStartRun(true)}
            className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer shadow-lg"
          >
            Full Mettl Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
