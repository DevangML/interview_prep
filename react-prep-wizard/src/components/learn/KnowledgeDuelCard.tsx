import { useState } from 'react';
import { Swords, CheckCircle2, XCircle, Award, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ConceptDuelQuestion } from '../../data/learn/types';
import { playSuccessSound, playErrorSound, playClickSound } from '../../lib/sound/soundEngine';

interface Props {
  topicId: string;
  questions?: ConceptDuelQuestion[];
  isPassed: boolean;
  comboStreak: number;
  onPassDuel: (topicId: string, earnedXp: number, wasCorrect: boolean) => void;
}

export function KnowledgeDuelCard({ topicId, questions, isPassed, comboStreak, onPassDuel }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!questions || questions.length === 0) return null;
  const currentQ = questions[currentIdx] || questions[0];

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelectedOpt(idx);
    setShowExplanation(true);

    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      playSuccessSound(comboStreak + 1);
      if (currentIdx === questions.length - 1 && !isPassed) {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.85 } });
      }
      onPassDuel(topicId, 50 * Math.min(4, Math.floor((comboStreak + 1) / 2) + 1), true);
    } else {
      playErrorSound();
      onPassDuel(topicId, 0, false);
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-slate-900 to-slate-950 p-5 text-white shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
          <Swords size={16} />
          <span>Interactive Concept Duel</span>
          <span className="font-mono text-[10px] text-slate-400">({currentIdx + 1}/{questions.length})</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px]">
          <Award size={11} />
          <span>{isPassed ? 'Duel Mastered' : '+50 XP Base'}</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-200 leading-snug">{currentQ.q}</p>
        <div className="space-y-2 pt-1">
          {currentQ.options.map((opt, idx) => {
            let style = 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800';
            if (showExplanation) {
              if (idx === currentQ.correct) style = 'border-emerald-500 bg-emerald-950/50 text-emerald-300 font-bold';
              else if (idx === selectedOpt) style = 'border-rose-500 bg-rose-950/50 text-rose-300';
              else style = 'border-slate-800 bg-slate-900/50 text-slate-500 opacity-40';
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showExplanation}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs transition flex items-center justify-between cursor-pointer ${style}`}
              >
                <span>{opt}</span>
                {showExplanation && idx === currentQ.correct && <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />}
                {showExplanation && idx === selectedOpt && idx !== currentQ.correct && <XCircle size={14} className="text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {showExplanation && (
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 animate-fadeIn">
          <div className="font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles size={13} />
            <span>Why this is true:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">{currentQ.explanation}</p>
          {currentIdx < questions.length - 1 && selectedOpt === currentQ.correct && (
            <div className="flex justify-end pt-1">
              <button
                onClick={handleNext}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition shadow-xs"
              >
                <span>Next Question</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
