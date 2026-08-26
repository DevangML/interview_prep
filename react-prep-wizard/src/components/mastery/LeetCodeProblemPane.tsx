import React, { useState } from 'react';
import { 
  FileText, Lightbulb, Award, Building2, ShieldAlert, Cpu
} from 'lucide-react';
import type { MasteryUnit } from '../../data/masteryStream';
import { FormattedMarkdown } from '../socratic/FormattedMarkdown';
import { ProblemHintsSection } from './ProblemHintsSection';
import DiagramView from '../challenge/DiagramView';
import type { Diagram } from '../../types';
import Panel from '../layout/Panel';
import PaneBoundary from '../layout/PaneBoundary';
import { levelBadge } from '../../styles/themeTokens';

interface Props {
  cur: MasteryUnit;
  hintStack: string[];
  activeUnitIndex: number;
  totalUnits: number;
  onPrev: () => void;
  onNext: () => void;
}

type TabType = 'description' | 'editorial';

export function LeetCodeProblemPane({
  cur, hintStack, activeUnitIndex, totalUnits
}: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  // Keyed off the real union rather than LeetCode's vocabulary, so Crucible is
  // no longer painted the same colour as Core.
  const difficultyColor = levelBadge[cur.level] ?? levelBadge.Core;

  const companies = ['Meta', 'Google', 'Amazon', 'Uber', 'Apple', 'Netflix'];
  const assignedCompany = companies[activeUnitIndex % companies.length];

  return (
    <Panel title={`Problem #${activeUnitIndex + 1}`} className="h-full flex flex-col border-slate-800 bg-slate-900 text-slate-200">
      <PaneBoundary name="Problem Description">
        <div className="flex flex-col h-full bg-slate-950">
          {/* Top LeetCode Navigation Tabs */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs shrink-0 flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer text-xs ${
                  activeTab === 'description'
                    ? 'bg-slate-800 text-sky-300 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText size={13} />
                <span>Description</span>
              </button>

              <button
                onClick={() => setActiveTab('editorial')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer text-xs ${
                  activeTab === 'editorial'
                    ? 'bg-slate-800 text-sky-300 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lightbulb size={13} />
                <span>Editorial</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span>{activeUnitIndex + 1} / {totalUnits}</span>
            </div>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar text-xs leading-relaxed">
            {activeTab === 'description' && (
              <div className="space-y-5">
                {/* Header Title & Metadata */}
                <div className="space-y-3">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {activeUnitIndex + 1}. {cur.title}
                  </h1>

                  <div className="flex items-center gap-2 flex-wrap text-[11px]">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border text-[10px] ${difficultyColor}`}>
                      {cur.level.toUpperCase()}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 font-medium">
                      {cur.trackName}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 flex items-center gap-1 text-[10px]">
                      <Building2 size={10} /> {assignedCompany}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 flex items-center gap-1 text-[10px]">
                      <Award size={10} /> +{cur.xp || 100} XP
                    </span>
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="text-slate-300 text-[13px] leading-relaxed">
                  <FormattedMarkdown text={cur.practice.task} />
                </div>

                {/* Concrete Examples Section */}
                <div className="space-y-3">
                  <h2 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>Examples</span>
                  </h2>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 font-mono text-[11px]">
                    <div>
                      <span className="text-slate-400 font-bold">Input Contract: </span>
                      <span className="text-sky-300">{cur.practice.type === 'jsx' ? `<${cur.title.replace(/[^a-zA-Z0-9]/g, '')} />` : 'Invoked execution runtime'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Expected Output: </span>
                      <span className="text-emerald-300">{cur.practice.specs[0] || 'Passes all test assertions'}</span>
                    </div>
                    {cur.takeaway && (
                      <div className="pt-2 border-t border-slate-800/80 text-slate-300 font-sans text-xs">
                        <strong className="text-amber-300 font-mono">Explanation: </strong>
                        {cur.takeaway}
                      </div>
                    )}
                  </div>
                </div>

                {/* Constraints & Invariants */}
                <div className="space-y-2.5">
                  <h2 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert size={13} className="text-amber-400" />
                    <span>Constraints & Test Specifications</span>
                  </h2>
                  <ul className="space-y-1.5 pl-2 text-xs text-slate-300">
                    {cur.practice.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold select-none">•</span>
                        <span className="font-mono text-[11px] text-slate-300">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progressive Collapsible LeetCode Hints */}
                <ProblemHintsSection hints={hintStack} />
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <h2 className="font-bold text-white flex items-center gap-2 text-sm">
                    <Cpu size={15} className="text-sky-400" />
                    <span>Deep Architectural Editorial</span>
                  </h2>
                  <FormattedMarkdown text={cur.theory.deepDive} />
                </div>

                {cur.diagram && (
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                      Component Topology
                    </span>
                    <DiagramView diagram={cur.diagram as Diagram} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </PaneBoundary>
    </Panel>
  );
}
