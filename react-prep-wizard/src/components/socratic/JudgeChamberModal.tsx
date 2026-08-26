import { useState } from 'react';
import { Scale, AlertTriangle, ShieldCheck, MessageSquare, X, Sparkles } from 'lucide-react';
import type { SocraticEvaluationVerdict } from '../../types';
import { DebateDrawer } from './DebateDrawer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  verdict: SocraticEvaluationVerdict | null;
  isAnalyzing: boolean;
  isDisputing: boolean;
  onApplyOverride: () => void;
  onDispute: (arg: string) => Promise<void> | void;
}

export function JudgeChamberModal({
  isOpen, onClose, verdict, isAnalyzing, isDisputing, onApplyOverride, onDispute
}: Props) {
  const [showAppealInput, setShowAppealInput] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center shadow-xs">
              <Scale size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Supreme Socratic Adjudication Chamber</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  2026 CoVe Protocol
                </span>
              </h2>
              <p className="text-xs text-slate-400">Impartial Semantic Analysis & Appellate Review</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {isAnalyzing ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center animate-pulse text-indigo-400">
                <Scale size={24} className="animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-200">Executing Chain-of-Verification (CoVe)</h3>
                <p className="text-xs text-slate-400">Auditing specifications ➔ Tracing memory variables ➔ Checking semantic equivalence...</p>
              </div>
            </div>
          ) : verdict ? (
            <div className="space-y-5 animate-fadeIn">
              <div className={`p-4 rounded-xl border flex items-start justify-between gap-4 ${
                verdict.isSemanticPass
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 shadow-lg'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200 shadow-lg'
              }`}>
                <div className="flex items-start gap-3">
                  {verdict.isSemanticPass ? (
                    <ShieldCheck size={22} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={22} className="text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">
                        {verdict.isSemanticPass ? 'Ruling: Semantic Pass Verified' : 'Ruling: Specification Breach Detected'}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                        {verdict.adjudicationVerdict}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-300">{verdict.diagnosticSummary}</p>
                  </div>
                </div>

                {verdict.isSemanticPass && (
                  <button
                    onClick={() => { onApplyOverride(); onClose(); }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Sparkles size={14} />
                    <span>Apply Pass (+XP)</span>
                  </button>
                )}
              </div>

              {verdict.findings && verdict.findings.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Targeted Socratic Evidence</h4>
                  <div className="space-y-2">
                    {verdict.findings.map((f, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-rose-300">{f.concept}</span>
                          <span className="text-[10px] font-mono text-slate-400">{f.severity}</span>
                        </div>
                        {f.anchorCode && (
                          <pre className="p-2 rounded bg-slate-900 font-mono text-[11px] text-amber-300 overflow-x-auto">
                            <code>{f.anchorCode}</code>
                          </pre>
                        )}
                        <p className="text-[11px] text-slate-400 leading-relaxed">{f.hint}</p>
                        {f.fix && <p className="text-[10px] text-emerald-400">💡 Suggested approach: {f.fix}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!verdict.isSemanticPass && (
                <div className="pt-2">
                  {!showAppealInput ? (
                    <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs text-indigo-300 flex items-center gap-1.5">
                          <MessageSquare size={13} />
                          <span>Believe the judge made a false assumption?</span>
                        </span>
                        <p className="text-[11px] text-slate-400">File a formal technical appeal with mathematical/runtime defense.</p>
                      </div>
                      <button
                        onClick={() => setShowAppealInput(true)}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition cursor-pointer shrink-0"
                      >
                        File Formal Appeal
                      </button>
                    </div>
                  ) : (
                    <DebateDrawer
                      isDisputing={isDisputing}
                      initialPrompt={verdict.disputePromptSuggestion}
                      onDispute={async (arg) => { await onDispute(arg); }}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs space-y-2">
              <Scale size={24} className="mx-auto text-slate-600" />
              <p>No active adjudication case. Run <strong>Grade & Verify</strong> to summon the Socratic Judge.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
