import React, { useState } from 'react';
import { Sparkles, CheckCircle2, HelpCircle, ChevronDown, AlertCircle, Bot, Cpu } from 'lucide-react';
import type { SocraticEvaluationVerdict } from '../../types';
import { ImpartialPillarsCard } from './ImpartialPillarsCard';
import { DebateDrawer } from './DebateDrawer';

interface Props {
  verdict?: SocraticEvaluationVerdict | null;
  isAnalyzing?: boolean;
  isReady?: boolean;
  isLoading?: boolean;
  isSupported?: boolean;
  isDisputing?: boolean;
  onApplyOverride?: () => void;
  onDispute?: (userArgument: string) => Promise<void>;
  onInitAi?: () => void;
}

export const SocraticHintPanel: React.FC<Props> = ({
  verdict, isAnalyzing, isReady, isLoading, isSupported, isDisputing = false,
  onApplyOverride, onDispute, onInitAi
}) => {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);

  if (isAnalyzing) {
    return (
      <div className="p-6 rounded-xl border border-indigo-500/30 bg-slate-950 text-center space-y-2">
        <Bot size={24} className="mx-auto text-indigo-400 animate-bounce" />
        <h4 className="text-xs font-bold text-slate-200">Socratic Judge Analyzing...</h4>
        <p className="text-[11px] text-slate-400">Comparing AST invariants & semantic execution traces.</p>
      </div>
    );
  }

  if (!isReady && isSupported) {
    return (
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 text-center space-y-3">
        <Cpu size={24} className="mx-auto text-indigo-400" />
        <h4 className="text-xs font-bold text-slate-200">WebLLM Metal AI is Offline</h4>
        <p className="text-[11px] text-slate-400">Initialize local private WebGPU AI for real-time Socratic adjudication.</p>
        {onInitAi && (
          <button
            onClick={onInitAi}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            {isLoading ? 'Loading Engine...' : 'Enable Metal AI'}
          </button>
        )}
      </div>
    );
  }

  if (!verdict) {
    return (
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 text-center text-slate-400 text-xs space-y-1.5">
        <Bot size={20} className="mx-auto text-slate-600" />
        <p>No active failure diagnosis. Click <strong>Grade & Verify</strong> to evaluate your code.</p>
      </div>
    );
  }

  const getRulingBadge = () => {
    const ruling = verdict.adjudicationVerdict;
    if (ruling === 'STUDENT_CORRECT' || ruling === 'ALTERNATIVE_VALID' || verdict.isSemanticPass) {
      return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">⚖️ Valid</span>;
    }
    return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">⚖️ Review</span>;
  };

  return (
    <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-slate-950 shadow-xs space-y-3 text-xs text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 font-bold text-slate-100">
          <Bot size={16} className="text-indigo-400" />
          <span>Socratic AI Adjudication</span>
        </div>
        {getRulingBadge()}
      </div>

      {verdict.isSemanticPass ? (
        <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>Valid Implementation Confirmed!</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">{verdict.diagnosticSummary}</p>
          {onApplyOverride && (
            <button
              onClick={onApplyOverride}
              className="mt-1 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={13} /> <span>Accept AI Semantic Pass (+XP)</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-2">
            <p className="text-[11px] text-slate-300 leading-relaxed">{verdict.diagnosticSummary}</p>
            {verdict.impartialComparison && <ImpartialPillarsCard pillars={verdict.impartialComparison} />}
          </div>

          <div className="space-y-1.5 pt-0.5">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-[11px]">
                <HelpCircle size={13} className="text-indigo-400 shrink-0" />
                <span>Level 1: Conceptual Reflection</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400 pl-4 leading-normal">{verdict.socraticHintLevel1}</p>
            </div>

            {unlockedLevel >= 2 ? (
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-purple-300 font-bold text-[11px]">
                  <AlertCircle size={13} className="text-purple-400 shrink-0" />
                  <span>Level 2: Targeted Inspection</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400 pl-4 leading-normal">{verdict.socraticHintLevel2}</p>
              </div>
            ) : (
              <button
                onClick={() => setUnlockedLevel(2)}
                className="w-full py-1 px-2 rounded-lg border border-dashed border-indigo-500/40 text-indigo-300 hover:bg-indigo-950/40 text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Unlock Level 2 Clue</span> <ChevronDown size={12} />
              </button>
            )}
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
