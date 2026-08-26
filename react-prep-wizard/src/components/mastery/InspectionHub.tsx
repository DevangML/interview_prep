import React, { useState } from 'react';
import { Scale, CheckCircle2, ListChecks, Wand2, Sparkles } from 'lucide-react';
import type { GradeResult } from '../../lib/grader';
import type { SocraticEvaluationVerdict } from '../../types';
import Panel from '../layout/Panel';
import CodeEditor from '../editor/CodeEditor';
import { SocraticHintPanel } from '../socratic/SocraticHintPanel';
import { SpecChecklistView } from './SpecChecklistView';
import { VerdictReportView } from './VerdictReportView';

interface Props {
  verdict: GradeResult | null;
  grading: boolean;
  socraticVerdict: SocraticEvaluationVerdict | null;
  isAiAnalyzing: boolean;
  isAiReady: boolean;
  isAiLoading: boolean;
  isAiSupported: boolean;
  specs: string[];
  solutionCode: string;
  practiceType: string;
  isDisputing: boolean;
  onApplyOverride: () => void;
  onDispute: (userArgument: string) => Promise<void>;
  onInitAi: () => void;
}

export function InspectionHub({
  verdict,
  grading,
  socraticVerdict,
  isAiAnalyzing,
  isAiReady,
  isAiLoading,
  isAiSupported,
  specs,
  solutionCode,
  practiceType,
  isDisputing,
  onApplyOverride,
  onDispute,
  onInitAi
}: Props) {
  const [activeTab, setActiveTab] = useState<'ai' | 'verdict' | 'specs' | 'solution'>('ai');

  interface TabItem {
    id: 'ai' | 'verdict' | 'specs' | 'solution';
    label: string;
    icon: typeof Scale;
    badge?: string;
  }

  const tabs: TabItem[] = [
    { id: 'ai', label: '⚖️ AI Judge & Socratic', icon: Scale, badge: socraticVerdict ? (socraticVerdict.isSemanticPass ? 'Valid' : 'Review') : undefined },
    { id: 'verdict', label: '🧪 Test Verdict', icon: CheckCircle2, badge: verdict ? (verdict.pass ? 'PASS' : 'FAIL') : undefined },
    { id: 'specs', label: '📋 Specs', icon: ListChecks },
    { id: 'solution', label: '💡 Solution', icon: Wand2 },
  ];

  return (
    <Panel
      title="Inspection & Adjudication Hub"
      className="h-full flex flex-col border-slate-200 shadow-sm"
    >
      <div className="flex flex-col h-full min-h-0 bg-slate-50/50">
        {/* Glanceable 4-Tab Navigation Bar */}
        <div className="flex items-center gap-1 p-1.5 bg-slate-200/80 border-b border-slate-300/80 shrink-0 overflow-x-auto no-scrollbar text-xs">
          {tabs.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-indigo-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                <span>{label}</span>
                {badge && (
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${badge === 'PASS' || badge === 'Valid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content View */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3">
          {activeTab === 'ai' && (
            <div className="space-y-3">
              {isAiAnalyzing && (
                <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center gap-2 text-indigo-900 text-xs animate-pulse">
                  <Sparkles size={14} className="text-indigo-600 animate-spin" />
                  <span>Socratic AI Judge is conducting impartial semantic analysis...</span>
                </div>
              )}

              {socraticVerdict ? (
                <SocraticHintPanel
                  verdict={socraticVerdict}
                  onApplyOverride={onApplyOverride}
                  onDispute={onDispute}
                  isDisputing={isDisputing}
                />
              ) : !isAiReady && !isAiLoading && isAiSupported ? (
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-white border border-indigo-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-indigo-950">
                    <Sparkles size={15} className="text-indigo-600" />
                    <span>Activate In-Browser Socratic AI Judge</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Zero-cost, private AI running locally via WebGPU Metal to arbitrate test failures and debate your solutions.
                  </p>
                  <button
                    onClick={() => onInitAi()}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition cursor-pointer"
                  >
                    Enable Metal AI Engine (~980MB one-time cache)
                  </button>
                </div>
              ) : (
                <div className="p-4 text-center text-slate-500 text-xs">
                  Run <strong>Grade & Verify</strong> to trigger automated checks & AI adjudication.
                </div>
              )}
            </div>
          )}

          {activeTab === 'verdict' && (
            <VerdictReportView verdict={verdict} grading={grading} />
          )}

          {activeTab === 'specs' && (
            <SpecChecklistView specs={specs} />
          )}

          {activeTab === 'solution' && (
            <div className="h-full flex flex-col space-y-2">
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Exemplary Reference Solution
              </div>
              <div className="flex-1 min-h-[220px] rounded-lg bg-white overflow-hidden border border-slate-200 shadow-2xs">
                <CodeEditor
                  value={solutionCode}
                  readOnly={true}
                  lang={practiceType === 'css' ? 'css' : practiceType === 'js_snippet' ? 'js' : 'jsx'}
                  className="h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}
