import React, { useState } from 'react';
import { Sparkles, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, AlertCircle, Bot } from 'lucide-react';
import type { SocraticEvaluationVerdict } from '../../types';

interface Props {
  verdict: SocraticEvaluationVerdict;
  onApplyOverride?: () => void;
}

export const SocraticHintPanel: React.FC<Props> = ({ verdict, onApplyOverride }) => {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);

  return (
    <div className="mt-3 p-3 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-white shadow-xs space-y-2.5 text-xs text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-indigo-100">
        <div className="flex items-center gap-1.5 font-bold text-indigo-950">
          <Bot size={15} className="text-indigo-600 animate-pulse" />
          <span>Socratic AI Diagnosis</span>
          {verdict.defectCategory && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-100 text-indigo-700">
              {verdict.defectCategory}
            </span>
          )}
        </div>
        <span className="text-[10px] text-indigo-500 font-mono">
          {Math.round(verdict.confidence * 100)}% confidence
        </span>
      </div>

      {/* Case 1: Semantic Pass detected (Grader False Negative) */}
      {verdict.isSemanticPass ? (
        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            <span>Valid Alternative Implementation Detected!</span>
          </div>
          <p className="text-[11px] text-emerald-900/90 leading-relaxed">
            {verdict.diagnosticSummary}
          </p>
          {onApplyOverride && (
            <button
              onClick={onApplyOverride}
              className="mt-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <Sparkles size={12} />
              Accept AI Semantic Pass
            </button>
          )}
        </div>
      ) : (
        /* Case 2: Legitimate defect -> Progressive Socratic Hints */
        <div className="space-y-2">
          <p className="text-[11px] text-slate-700 leading-relaxed font-medium bg-white/70 p-2 rounded-lg border border-indigo-100/60">
            {verdict.diagnosticSummary}
          </p>

          <div className="space-y-1.5 pt-1">
            {/* Level 1 Hint */}
            <div className="p-2 rounded-lg bg-white border border-indigo-100 shadow-2xs">
              <div className="flex items-center gap-1.5 text-indigo-900 font-semibold text-[11px]">
                <HelpCircle size={13} className="text-indigo-500 shrink-0" />
                <span>Level 1: Conceptual Question</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600 pl-4.5 leading-normal">
                {verdict.socraticHintLevel1}
              </p>
            </div>

            {/* Level 2 Hint */}
            {unlockedLevel >= 2 ? (
              <div className="p-2 rounded-lg bg-white border border-purple-100 shadow-2xs animate-fadeIn">
                <div className="flex items-center gap-1.5 text-purple-900 font-semibold text-[11px]">
                  <AlertCircle size={13} className="text-purple-500 shrink-0" />
                  <span>Level 2: Targeted Inspection</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600 pl-4.5 leading-normal">
                  {verdict.socraticHintLevel2}
                </p>
              </div>
            ) : (
              <button
                onClick={() => setUnlockedLevel(2)}
                className="w-full py-1.5 px-2 rounded-lg border border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50/60 text-[11px] font-medium transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Unlock Level 2 Clue</span>
                <ChevronDown size={12} />
              </button>
            )}

            {/* Level 3 Hint */}
            {unlockedLevel >= 3 ? (
              <div className="p-2 rounded-lg bg-white border border-amber-200 shadow-2xs animate-fadeIn">
                <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-[11px]">
                  <Sparkles size={13} className="text-amber-500 shrink-0" />
                  <span>Level 3: Structural Direction</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600 pl-4.5 leading-normal">
                  {verdict.socraticHintLevel3}
                </p>
              </div>
            ) : unlockedLevel >= 2 ? (
              <button
                onClick={() => setUnlockedLevel(3)}
                className="w-full py-1.5 px-2 rounded-lg border border-dashed border-purple-200 text-purple-600 hover:bg-purple-50/60 text-[11px] font-medium transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Unlock Level 3 Direction</span>
                <ChevronDown size={12} />
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
