import React, { useState, useMemo } from 'react';
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
  RotateCcw,
  ListFilter,
  Scale,
  CheckCircle2,
  XCircle,
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
import KeyboardAccessoryBar from '../common/KeyboardAccessoryBar';
import SearchableBottomDrawer from '../common/SearchableBottomDrawer';
import BottomSheetModal from '../common/BottomSheetModal';
import { haptic } from '../common/HapticEngine';

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
  onToggleChat,
}: Props) {
  const [activeTab, setActiveTab] = useState<'problem' | 'code' | 'preview' | 'tests'>('problem');
  const [activeEditorTab, setActiveEditorTab] = useState<'editor' | 'jsx_view'>('editor');
  const [isUnitDrawerOpen, setIsUnitDrawerOpen] = useState(false);
  const [isVerdictModalOpen, setIsVerdictModalOpen] = useState(false);

  const prevUnit = activeUnitIndex > 0 ? MASTERY_UNITS[activeUnitIndex - 1] : null;
  const nextUnit = activeUnitIndex < MASTERY_UNITS.length - 1 ? MASTERY_UNITS[activeUnitIndex + 1] : null;

  const unitOptions = useMemo(
    () =>
      MASTERY_UNITS.map((u, i) => ({
        id: u.id,
        label: `${i + 1}. ${u.title}`,
        description: `${u.trackName} • ${u.category}`,
        badge: u.level,
      })),
    []
  );

  const handleInsertSnippet = (snippet: string) => {
    onCodeChange(userCode + snippet);
  };

  const handleGradeWithHaptics = async () => {
    haptic.impactMedium();
    await onGrade();
    setActiveTab('tests');
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Mobile Ergonomic Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-2.5 shrink-0 space-y-2 select-none">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              disabled={!prevUnit}
              onClick={() => {
                if (prevUnit) {
                  haptic.selection();
                  onSelectUnit(prevUnit);
                }
              }}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 active:text-white disabled:opacity-30 cursor-pointer"
            >
              <ArrowLeft size={13} />
            </button>

            <button
              onClick={() => {
                haptic.impactLight();
                setIsUnitDrawerOpen(true);
              }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 max-w-[170px] truncate cursor-pointer"
            >
              <span className="text-[10px] font-mono text-sky-400 font-bold shrink-0">
                #{activeUnitIndex + 1}
              </span>
              <span className="text-xs font-bold text-white truncate">{cur.title}</span>
              <ListFilter size={11} className="text-slate-500 shrink-0 ml-0.5" />
            </button>

            <button
              disabled={!nextUnit}
              onClick={() => {
                if (nextUnit) {
                  haptic.selection();
                  onSelectUnit(nextUnit);
                }
              }}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 active:text-white disabled:opacity-30 cursor-pointer"
            >
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800/80">
              {totalXP} XP
            </span>

            <button
              onClick={() => {
                haptic.impactLight();
                onToggleChat();
              }}
              className="p-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 active:scale-95 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs transition"
              title="Open AI Mentor"
            >
              <Bot size={13} />
            </button>
          </div>
        </div>

        {/* 4 Segmented Navigation Tabs */}
        <div className="flex bg-slate-950 p-0.5 rounded-xl border border-slate-800 gap-0.5">
          {[
            { id: 'problem' as const, label: 'Task', icon: FileText, badge: undefined as string | undefined },
            { id: 'code' as const, label: 'Crucible', icon: Code2, badge: undefined as string | undefined },
            { id: 'preview' as const, label: 'Preview', icon: Eye, badge: undefined as string | undefined },
            {
              id: 'tests' as const,
              label: verdict ? (verdict.pass ? 'Passed' : 'Failed') : 'Tests',
              icon: CheckSquare,
              badge: verdict?.pass ? '✓' : verdict ? '✗' : undefined,
            },
          ].map((t) => {
            const isActive = activeTab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  haptic.selection();
                  setActiveTab(t.id);
                }}
                className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={12} />
                <span>{t.label}</span>
                {t.badge && (
                  <span
                    className={`text-[9px] px-1 rounded-full font-mono ${
                      verdict?.pass ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Panel Content Area */}
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
              onGrade={handleGradeWithHaptics}
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

      {/* Keyboard Quick Insert Accessory Bar (Active in Code Mode) */}
      {activeTab === 'code' && (
        <KeyboardAccessoryBar onInsertText={handleInsertSnippet} />
      )}

      {/* Floating Bottom Quick Action Bar for Code / Run / Grade */}
      <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2.5 flex items-center justify-between gap-2 shrink-0 select-none">
        <button
          onClick={async () => {
            haptic.selection();
            await onFormat();
          }}
          className="px-3 py-2 rounded-xl bg-slate-800 active:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Format</span>
        </button>

        <button
          onClick={handleGradeWithHaptics}
          disabled={grading}
          className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-98 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg disabled:opacity-50 cursor-pointer transition"
        >
          <Play size={13} />
          <span>{grading ? 'Evaluating Tests...' : 'Run & Grade Solution'}</span>
        </button>
      </div>

      {/* Unit Switcher Bottom Drawer */}
      <SearchableBottomDrawer
        isOpen={isUnitDrawerOpen}
        onClose={() => setIsUnitDrawerOpen(false)}
        title="Jump to Mastery Unit"
        options={unitOptions}
        selectedId={cur.id}
        onSelect={(opt) => {
          const matched = MASTERY_UNITS.find((u) => u.id === opt.id);
          if (matched) onSelectUnit(matched);
        }}
      />
    </div>
  );
}
