import React, { useState } from 'react';
import { Sparkles, CheckCircle2, HelpCircle, ChevronDown, AlertCircle, Bot } from 'lucide-react';
import type { SocraticEvaluationVerdict } from '../../types';
import { ImpartialPillarsCard } from './ImpartialPillarsCard';
import { DebateDrawer } from './DebateDrawer';

interface Props {
  verdict: SocraticEvaluationVerdict;
  onApplyOverride?: () => void;
  onDispute?: (userArgument: string) => Promise<void>;
  isDisputing?: boolean;
}

export const SocraticHintPanel: React.FC<Props> = ({
  verdict,
  onApplyOverride,
  onDispute,
  isDisputing = false
}) => {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);

  const getRulingBadge = () => {
    const ruling = verdict.adjudicationVerdict;
    if (ruling === 'STUDENT_CORRECT' || ruling === 'ALTERNATIVE_VALID' || verdict.isSemanticPass) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          ⚖️ Ruling: Valid Implementation
        </span>
      );
    }
    if (ruling === 'AMBIGUOUS_SPEC') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-100 text-sky-800 border border-sky-300">
          ⚖️ Ruling: Ambiguous Specification
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-100 text-amber-800 border border-amber-300">
        ⚖️ Ruling: Invariant Violation Detected
      </span>
    );
  };

  return (
    <div className="p-3.5 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white shadow-xs space-y-3 text-xs text-slate-800">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-indigo-100/80">
        <div className="flex items-center gap-1.5 font-bold text-indigo-950">
          <Bot size={16} className="text-indigo-600 animate-pulse" />
          <span>Impartial AI Adjudication & Socratic Review</span>
          {verdict.defectCategory && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-100 text-indigo-700">
              {verdict.defectCategory}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {getRulingBadge()}
          <span className="text-[10px] text-indigo-500 font-mono">{Math.round(verdict.confidence * 100)}% confidence</span>
        </div>
      </div>

      {verdict.isSemanticPass ? (
        <div className="p-3 rounded-lg bg-emerald-50/90 border border-emerald-300 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Valid Implementation Confirmed by AI Judge!</span>
          </div>
          <p className="text-[11px] text-emerald-950 leading-relaxed font-medium">{verdict.diagnosticSummary}</p>
          {onApplyOverride && (
            <button
              onClick={onApplyOverride}
              className="mt-1 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Accept AI Semantic Pass</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="bg-white/80 p-2.5 rounded-lg border border-indigo-100/80 shadow-2xs space-y-2">
            <p className="text-[11px] text-slate-800 leading-relaxed font-medium">{verdict.diagnosticSummary}</p>
            {verdict.impartialComparison && <ImpartialPillarsCard pillars={verdict.impartialComparison} />}
          </div>

          {/* Socratic Hint Progression */}
          <div className="space-y-1.5 pt-0.5">
            <div className="p-2 rounded-lg bg-white border border-indigo-100 shadow-2xs">
              <div className="flex items-center gap-1.5 text-indigo-900 font-semibold text-[11px]">
                <HelpCircle size={13} className="text-indigo-500 shrink-0" />
                <span>Level 1: Conceptual Reflection</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600 pl-4.5 leading-normal">{verdict.socraticHintLevel1}</p>
            </div>

            {unlockedLevel >= 2 ? (
              <div className="p-2 rounded-lg bg-white border border-purple-100 shadow-2xs animate-fadeIn">
                <div className="flex items-center gap-1.5 text-purple-900 font-semibold text-[11px]">
                  <AlertCircle size={13} className="text-purple-500 shrink-0" />
                  <span>Level 2: Targeted Inspection</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600 pl-4.5 leading-normal">{verdict.socraticHintLevel2}</p>
              </div>
            ) : (
              <button
                onClick={() => setUnlockedLevel(2)}
                className="w-full py-1 px-2 rounded-lg border border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50/60 text-[11px] font-medium transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Unlock Level 2 Clue</span>
                <ChevronDown size={12} />
              </button>
            )}

            {unlockedLevel >= 3 ? (
              <div className="p-2 rounded-lg bg-white border border-amber-200 shadow-2xs animate-fadeIn">
                <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-[11px]">
                  <Sparkles size={13} className="text-amber-500 shrink-0" />
                  <span>Level 3: Structural Direction</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600 pl-4.5 leading-normal">{verdict.socraticHintLevel3}</p>
              </div>
            ) : unlockedLevel >= 2 ? (
              <button
                onClick={() => setUnlockedLevel(3)}
                className="w-full py-1 px-2 rounded-lg border border-dashed border-purple-200 text-purple-600 hover:bg-purple-50/60 text-[11px] font-medium transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Unlock Level 3 Direction</span>
                <ChevronDown size={12} />
              </button>
            ) : null}
          </div>
        </div>
      )}

      {onDispute && (
        <DebateDrawer
          initialPrompt={verdict.disputePromptSuggestion}
          onDispute={onDispute}
          isDisputing={isDisputing}
        />
      )}
    </div>
  );
};
