import React, { useState } from 'react';
import {
  FileText,
  Code2,
  Eye,
  CheckSquare,
  Bot,
  Play,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Zap,
  RotateCcw
} from 'lucide-react';
import type { MasteryUnit } from '../../../data/masteryStream';
import { MASTERY_UNITS } from '../../../data/masteryStream';
import { LeetCodeProblemPane } from '../../mastery/LeetCodeProblemPane';
import { CodeCruciblePane } from '../../mastery/CodeCruciblePane';
import { InspectionHub } from '../../mastery/InspectionHub';
import { getJsxViewCode } from '../../../lib/jsxViewHelper';
import type { GradeResult } from '../../../lib/grader';
import type { SocraticEvaluationVerdict } from '../../../types';
import type { AnchoredFinding } from '../../../lib/anchorFindings';

interface Props {
  cur: MasteryUnit;
  activeUnitIndex: number;
  hintStack: string[];
  userCode: string;
  compiledJs: string;
  fullCssHtml: string;
  consoleOutput: string[];
  verdict: GradeResult | null;
  grading: boolean;
  isSolved: boolean;
  totalXP: number;
  aiFindings: AnchoredFinding[];
  socraticVerdict: SocraticEvaluationVerdict | null;
  isAnalyzing: boolean;
  isReady: boolean;
  isLoading: boolean;
  isSupported: boolean;
  isDisputing: boolean;
  progressPercent: number;
  activeModelId?: string;
  onCodeChange: (code: string) => void;
  onFormat: () => Promise<void>;
  onGrade: () => Promise<void>;
  onSelectUnit: (unit: MasteryUnit) => void;
  onApplyAiSemanticPass: () => void;
  onDisputeVerdict: (arg: string) => Promise<void>;
  onInitAi: () => void;
  onOpenJudgeChamber: () => void;
  onToggleChat: () => void;
}

export default function MobileMasteryView({
  cur,
  activeUnitIndex,
  hintStack,
  userCode,
  compiledJs,
  fullCssHtml,
  consoleOutput,
  verdict,
  grading,
  isSolved,
  totalXP,
  aiFindings,
  socraticVerdict,
  isAnalyzing,
  isReady,
  isLoading,
  isSupported,
  isDisputing,
  progressPercent,
  activeModelId,
  onCodeChange,
  onFormat,
  onGrade,
  onSelectUnit,
  onApplyAiSemanticPass,
  onDisputeVerdict,
  onInitAi,
  onOpenJudgeChamber,
  onToggleChat
}: Props) {
  const [activeTab, setActiveTab] = useState<'problem' | 'code' | 'preview' | 'tests'>('problem');
  const [activeEditorTab, setActiveEditorTab] = useState<'editor' | 'jsx_view'>('editor');

  const prevUnit = activeUnitIndex > 0 ? MASTERY_UNITS[activeUnitIndex - 1] : null;
  const nextUnit = activeUnitIndex < MASTERY_UNITS.length - 1 ? MASTERY_UNITS[activeUnitIndex + 1] : null;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Mobile Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-2.5 shrink-0 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 min-w-0">
            <button
              disabled={!prevUnit}
              onClick={() => prevUnit && onSelectUnit(prevUnit)}
              className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ArrowLeft size={13} />
            </button>

            <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 shrink-0">
              {activeUnitIndex + 1}/{MASTERY_UNITS.length}
            </span>

            <h2 className="text-xs font-bold text-white tracking-tight truncate ml-1">{cur.title}</h2>

            <button
              disabled={!nextUnit}
              onClick={() => nextUnit && onSelectUnit(nextUnit)}
              className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-950 border border-amber-800">
              {totalXP} XP
            </span>
            <button
              onClick={onToggleChat}
              className="p-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs"
              title="Open AI Mentor"
            >
              <Bot size={13} />
            </button>
          </div>
        </div>

        {/* 4 Segmented Tabs */}
        <div className="flex bg-slate-950 p-0.5 rounded-xl border border-slate-800 gap-0.5">
          {([
            { id: 'problem' as const, label: 'Problem', icon: FileText, badge: undefined as string | undefined },
            { id: 'code' as const, label: 'Editor', icon: Code2, badge: undefined as string | undefined },
            { id: 'preview' as const, label: 'Preview', icon: Eye, badge: undefined as string | undefined },
            { id: 'tests' as const, label: verdict ? (verdict.pass ? 'Passed' : 'Failed') : 'Tests', icon: CheckSquare, badge: verdict?.pass ? '✓' : verdict ? '✗' : undefined },
          ]).map((t) => {
            const isActive = activeTab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={12} />
                <span>{t.label}</span>
                {t.badge && (
                  <span className={`text-[9px] px-1 rounded-full ${verdict?.pass ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white'}`}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2">
        {activeTab === 'problem' && (
          <div className="h-full">
            <LeetCodeProblemPane
              cur={cur}
              hintStack={hintStack}
              activeUnitIndex={activeUnitIndex}
              totalUnits={MASTERY_UNITS.length}
              onPrev={() => prevUnit && onSelectUnit(prevUnit)}
              onNext={() => nextUnit && onSelectUnit(nextUnit)}
            />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="h-full flex flex-col">
            <CodeCruciblePane
              cur={cur}
              userCode={userCode}
              activeEditorTab={activeEditorTab}
              isPortalOpen={false}
              isChatOpen={false}
              isSolved={isSolved}
              grading={grading}
              elapsed={0}
              aiFindings={aiFindings}
              jsxViewCode={getJsxViewCode(cur)}
              onCodeChange={onCodeChange}
              onFormat={onFormat}
              onGrade={async () => {
                await onGrade();
                setActiveTab('tests');
              }}
              onMarkComplete={() => {}}
              onToggleChat={onToggleChat}
              onTogglePortal={() => {}}
              onSelectTab={setActiveEditorTab}
            />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="h-full">
            <InspectionHub
              cur={cur}
              compiledJs={compiledJs}
              fullCssHtml={fullCssHtml}
              consoleOutput={consoleOutput}
              isPortalOpen={false}
              verdict={verdict}
              grading={grading}
              socraticVerdict={socraticVerdict}
              isAiAnalyzing={isAnalyzing}
              isAiReady={isReady}
              isAiLoading={isLoading}
              isAiSupported={isSupported}
              specs={cur.practice.specs}
              solutionCode={cur.practice.solutionCode}
              practiceType={cur.practice.type}
              isDisputing={isDisputing}
              onApplyOverride={onApplyAiSemanticPass}
              onDispute={onDisputeVerdict}
              onInitAi={onInitAi}
              onOpenJudgeChamber={onOpenJudgeChamber}
            />
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="h-full">
            <InspectionHub
              cur={cur}
              compiledJs={compiledJs}
              fullCssHtml={fullCssHtml}
              consoleOutput={consoleOutput}
              isPortalOpen={false}
              verdict={verdict}
              grading={grading}
              socraticVerdict={socraticVerdict}
              isAiAnalyzing={isAnalyzing}
              isAiReady={isReady}
              isAiLoading={isLoading}
              isAiSupported={isSupported}
              specs={cur.practice.specs}
              solutionCode={cur.practice.solutionCode}
              practiceType={cur.practice.type}
              isDisputing={isDisputing}
              onApplyOverride={onApplyAiSemanticPass}
              onDispute={onDisputeVerdict}
              onInitAi={onInitAi}
              onOpenJudgeChamber={onOpenJudgeChamber}
            />
          </div>
        )}
      </div>

      {/* Floating Bottom Quick Action Bar for Code / Grade */}
      <div className="bg-slate-900 border-t border-slate-800 p-2.5 flex items-center justify-between gap-2 shrink-0">
        <button
          onClick={onFormat}
          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Format</span>
        </button>

        <button
          onClick={async () => {
            await onGrade();
            setActiveTab('tests');
          }}
          disabled={grading}
          className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg disabled:opacity-50 cursor-pointer"
        >
          <Play size={13} />
          <span>{grading ? 'Evaluating Tests...' : 'Run & Grade Solution'}</span>
        </button>
      </div>
    </div>
  );
}
