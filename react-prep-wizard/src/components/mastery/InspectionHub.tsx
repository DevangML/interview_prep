import { useState } from 'react';
import { Terminal, Scale, CheckCircle2, ListChecks, Wand2, Maximize2 } from 'lucide-react';
import type { MasteryUnit } from '../../data/masteryStream';
import type { GradeResult } from '../../lib/grader';
import type { SocraticEvaluationVerdict } from '../../types';
import Panel from '../layout/Panel';
import CodeEditor from '../editor/CodeEditor';
import { SocraticHintPanel } from '../socratic/SocraticHintPanel';
import { SpecChecklistView } from './SpecChecklistView';
import { VerdictReportView } from './VerdictReportView';
import ResponsiveViewer from '../preview/ResponsiveViewer';
import SandboxFrame from '../preview/SandboxFrame';

interface Props {
  cur: MasteryUnit;
  compiledJs: string;
  fullCssHtml: string;
  consoleOutput: string[];
  isPortalOpen: boolean;
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
  onOpenJudgeChamber?: () => void;
}

export function InspectionHub({
  cur, compiledJs, fullCssHtml, consoleOutput, isPortalOpen,
  verdict, grading, socraticVerdict, isAiAnalyzing, isAiReady, isAiLoading, isAiSupported,
  specs, solutionCode, practiceType, isDisputing, onApplyOverride, onDispute, onInitAi, onOpenJudgeChamber
}: Props) {
  const [activeTab, setActiveTab] = useState<'console' | 'verdict' | 'solution' | 'ai' | 'specs'>('console');

  const tabs = [
    { id: 'console' as const, label: cur.practice.type === 'js_snippet' ? '💻 Console' : '👁️ Preview', icon: Terminal },
    { id: 'verdict' as const, label: '🧪 Tests', icon: CheckCircle2, badge: verdict ? (verdict.pass ? 'PASS' : 'FAIL') : undefined },
    { id: 'solution' as const, label: '💡 Solution', icon: Wand2 },
    { id: 'ai' as const, label: '⚖️ Socratic Judge', icon: Scale, badge: socraticVerdict ? (socraticVerdict.isSemanticPass ? 'Valid' : 'Review') : undefined },
    { id: 'specs' as const, label: '📋 Specs', icon: ListChecks },
  ];

  return (
    <Panel title="Execution & Adjudication Suite" className="h-full flex flex-col border-slate-800 bg-slate-900 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-3 py-1.5 shrink-0 gap-1 flex-wrap">
        <div className="flex items-center gap-1 flex-wrap">
          {tabs.map(({ id, label, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === id ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{label}</span>
              {badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  badge === 'PASS' || badge === 'Valid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {onOpenJudgeChamber && (
          <button
            onClick={onOpenJudgeChamber}
            className="px-2.5 py-1 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 rounded-lg text-[10px] font-bold text-indigo-300 flex items-center gap-1 transition cursor-pointer shrink-0 ml-auto"
            title="Expand into Centered Supreme Judicial Chamber (⌘J)"
          >
            <Maximize2 size={11} />
            <span>Chamber (⌘J)</span>
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3 custom-scrollbar bg-slate-950">
        {activeTab === 'console' && (
          cur.practice.type === 'js_snippet' ? (
            <div className="w-full h-full font-mono text-xs p-3 overflow-y-auto whitespace-pre-wrap leading-relaxed text-slate-300">
              {consoleOutput.length === 0 ? <span className="text-slate-600 italic">Waiting for console output...</span> : null}
              {consoleOutput.map((log, i) => (
                <div key={i} className="mb-1 flex gap-2">
                  <span className="text-slate-600 select-none">{'>'}</span>
                  <span className={log.startsWith('[ERROR]') ? 'text-rose-400 font-bold' : log.startsWith('[WARN]') ? 'text-amber-400' : 'text-emerald-400'}>{log}</span>
                </div>
              ))}
            </div>
          ) : cur.practice.type === 'css' ? (
            <div className="w-full h-full bg-white rounded-lg overflow-hidden">
              <iframe title="css-preview" srcDoc={fullCssHtml} sandbox="allow-scripts allow-same-origin" className="w-full h-full border-0" />
            </div>
          ) : (
            <div className="w-full h-full bg-white rounded-lg overflow-hidden">
              <SandboxFrame baseCSS="" userCSS="" jsCode={compiledJs} className="h-full w-full" />
            </div>
          )
        )}
        {activeTab === 'verdict' && <VerdictReportView verdict={verdict} grading={grading} />}
        {activeTab === 'specs' && <SpecChecklistView specs={specs} />}
        {activeTab === 'solution' && (
          <div className="h-full flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-amber-400">Exemplary Reference Solution</span>
              <span className="font-mono text-[10px] text-slate-500">Read-Only Ground Truth</span>
            </div>
            <div className="flex-1 min-h-[220px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <CodeEditor value={solutionCode} lang={practiceType === 'css' ? 'css' : practiceType === 'js_snippet' ? 'js' : 'jsx'} readOnly />
            </div>
          </div>
        )}
        {activeTab === 'ai' && (
          <SocraticHintPanel
            verdict={socraticVerdict}
            isAnalyzing={isAiAnalyzing}
            isReady={isAiReady}
            isLoading={isAiLoading}
            isSupported={isAiSupported}
            isDisputing={isDisputing}
            onApplyOverride={onApplyOverride}
            onDispute={onDispute}
            onInitAi={onInitAi}
          />
        )}
      </div>
    </Panel>
  );
}
