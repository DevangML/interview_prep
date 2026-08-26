import React from 'react';
import { Bot, MonitorSmartphone, Wand2, X, Gavel, CheckCircle2, Sparkles } from 'lucide-react';
import type { MasteryUnit } from '../../data/masteryStream';
import Panel from '../layout/Panel';
import CodeEditor from '../editor/CodeEditor';
import FileTabs from '../editor/FileTabs';
import type { AnchoredFinding } from '../../lib/anchorFindings';

interface Props {
  cur: MasteryUnit;
  userCode: string;
  activeEditorTab: 'editor' | 'jsx_view';
  isPortalOpen: boolean;
  isChatOpen: boolean;
  isSolved: boolean;
  grading: boolean;
  elapsed: number;
  aiFindings: AnchoredFinding[];
  jsxViewCode: string;
  onCodeChange: (val: string) => void;
  onFormat: () => void;
  onGrade: () => void;
  onMarkComplete: () => void;
  onToggleChat: () => void;
  onTogglePortal: () => void;
  onSelectTab: (tab: 'editor' | 'jsx_view') => void;
}

export function CodeCruciblePane({
  cur,
  userCode,
  activeEditorTab,
  isPortalOpen,
  isChatOpen,
  isSolved,
  grading,
  elapsed,
  aiFindings,
  jsxViewCode,
  onCodeChange,
  onFormat,
  onGrade,
  onMarkComplete,
  onToggleChat,
  onTogglePortal,
  onSelectTab
}: Props) {
  return (
    <Panel
      title={`Code Crucible (${cur.practice.type.toUpperCase()})`}
      actions={
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onToggleChat}
            title="AI Problem Mentor Chat"
            className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              isChatOpen ? 'bg-indigo-600 text-white shadow-xs' : 'bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60'
            }`}
          >
            <Bot size={13} className={isChatOpen ? 'text-white' : 'text-indigo-400'} />
            <span>AI Mentor</span>
          </button>
          <button
            onClick={onTogglePortal}
            title="Open Responsive Preview Portal"
            className="px-2.5 py-1 text-xs rounded-lg font-semibold transition flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 cursor-pointer"
          >
            {isPortalOpen ? <><X size={13} /> Close Portal</> : <><MonitorSmartphone size={13} /> Responsive</>}
          </button>
          <button
            onClick={onFormat}
            title="Format Code (Shift-Alt-F)"
            className="px-2.5 py-1 text-xs rounded-lg font-semibold transition flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 cursor-pointer"
          >
            <Wand2 size={13} /> Format
          </button>
          <span
            className={`font-mono text-[11px] tabular-nums px-2 py-0.5 rounded-lg border ${
              elapsed > 300 ? 'bg-rose-950/80 border-rose-800 text-rose-300' : 'bg-slate-900 border-slate-700/80 text-slate-400'
            }`}
            title="Time on this unit"
          >
            {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}
          </span>
          <button
            onClick={onGrade}
            disabled={grading}
            className="px-3 py-1 text-xs rounded-lg font-bold flex items-center gap-1.5 shadow-sm bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-400 disabled:opacity-50 cursor-pointer transition"
          >
            <Gavel size={13} /> <span>{grading ? 'Grading…' : 'Grade & Verify'}</span>
          </button>
          <button
            onClick={onMarkComplete}
            title="Override: record as passed"
            className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              isSolved ? 'bg-emerald-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-700/80'
            }`}
          >
            {isSolved ? <CheckCircle2 size={13} /> : <Sparkles size={13} />}
            <span>{isSolved ? 'Mastered' : 'Override'}</span>
          </button>
        </div>
      }
      className={`h-full flex flex-col border-slate-800 bg-slate-900 text-slate-200 shadow-sm ${isPortalOpen ? 'md:w-[450px] lg:w-[500px] xl:w-[600px] shrink-0' : ''}`}
    >
      <div className="flex flex-col h-full min-h-0 bg-slate-950">
        <FileTabs
          tabs={[
            {
              key: 'editor',
              label: cur.practice.type === 'css' ? 'styles.css' : cur.practice.type === 'jsx' ? 'App.jsx' : cur.trackId === 'behavioural' ? 'story.md' : 'solution.js',
            },
            {
              key: 'jsx_view',
              label: 'App.jsx (view)',
              readOnly: true,
            },
          ]}
          active={activeEditorTab}
          onSelect={(k) => onSelectTab(k as 'editor' | 'jsx_view')}
        />
        <div className="flex-1 min-h-0 relative">
          {activeEditorTab === 'editor' ? (
            <CodeEditor
              value={userCode}
              onChange={onCodeChange}
              onFormat={onFormat}
              lang={cur.practice.type === 'css' ? 'css' : cur.practice.type === 'js_snippet' ? 'js' : 'jsx'}
              autoFocus
              aiFindings={aiFindings}
            />
          ) : (
            <CodeEditor
              value={jsxViewCode}
              lang="jsx"
              readOnly
            />
          )}
        </div>
      </div>
    </Panel>
  );
}
