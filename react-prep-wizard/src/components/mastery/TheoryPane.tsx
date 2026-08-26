import React, { useState } from 'react';
import { Target, BookOpen, Mic, Zap, ArrowLeft, ArrowRight, Award } from 'lucide-react';
import type { MasteryUnit } from '../../data/masteryStream';
import type { Diagram } from '../../types';
import Panel from '../layout/Panel';
import PaneBoundary from '../layout/PaneBoundary';
import Briefing from '../challenge/Briefing';
import SpokenDefense from '../challenge/SpokenDefense';
import DiagramView from '../challenge/DiagramView';
import type { Briefing as BriefingType } from '../../lib/briefing';

interface Props {
  cur: MasteryUnit;
  brief: BriefingType;
  hintStack: string[];
  activeUnitIndex: number;
  totalUnits: number;
  onPrev: () => void;
  onNext: () => void;
}

type TabType = 'specs' | 'theory' | 'defense' | 'check';

export function TheoryPane({
  cur, brief, hintStack, activeUnitIndex, totalUnits, onPrev, onNext
}: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('specs');
  const [showHint, setShowHint] = useState<number>(0);
  const [mcqAnswer, setMcqAnswer] = useState<number | null>(null);

  const tabs = [
    { id: 'specs' as TabType, label: '🎯 Mission & Specs', icon: Target },
    { id: 'theory' as TabType, label: '💡 Deep Mechanism', icon: BookOpen },
    { id: 'defense' as TabType, label: '🎙️ Spoken Pitch', icon: Mic },
    ...(cur.theory.mcq ? [{ id: 'check' as TabType, label: '⚡ Concept Check', icon: Zap }] : []),
  ];

  return (
    <Panel title={`Mission: ${cur.title}`} className="h-full flex flex-col border-slate-800 bg-slate-900 text-slate-200">
      <PaneBoundary name="The mission briefing">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-1.5 p-2 bg-slate-950 border-b border-slate-800 text-xs shrink-0 overflow-x-auto no-scrollbar">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer text-xs ${
                  activeTab === id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon size={13} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {activeTab === 'specs' && (
              <div className="space-y-3.5 animate-fadeIn">
                {/* Wrapped Metadata & Tags Strip */}
                <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/80">{cur.trackName}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{cur.level}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/80 flex items-center gap-1">
                    <Award size={10} /> +{cur.xp || 100} XP Bounty
                  </span>
                  {cur.tags?.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 lowercase">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <Briefing briefing={brief} />
                </div>

                {cur.takeaway && (
                  <div className="text-xs text-emerald-300 bg-emerald-950/50 border border-emerald-500/40 p-3 rounded-xl leading-relaxed">
                    <strong className="font-bold text-emerald-200">Architectural Invariant · </strong>{cur.takeaway}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'theory' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed text-slate-300 space-y-2.5">
                  <h3 className="font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider text-[11px]">
                    <BookOpen size={14} className="text-sky-400" />
                    <span>Under The Hood Mechanism</span>
                  </h3>
                  <p className="leading-relaxed">{cur.theory.deepDive}</p>
                </div>

                {cur.diagram && (
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Target Layout Geometry</span>
                    <DiagramView diagram={cur.diagram as Diagram} />
                  </div>
                )}

                {hintStack.length > 0 && (
                  <div className="border border-slate-800 rounded-xl p-3.5 bg-slate-950 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Progressive Hints ({showHint}/{hintStack.length})</span>
                      {showHint < hintStack.length && (
                        <button onClick={() => setShowHint((n) => n + 1)} className="px-2 py-0.5 text-[10px] font-bold rounded bg-sky-950 text-sky-300 border border-sky-800 hover:bg-sky-900 cursor-pointer">
                          Reveal Next Hint
                        </button>
                      )}
                    </div>
                    {hintStack.slice(0, showHint).map((h, i) => (
                      <p key={i} className="text-xs text-slate-400 pl-3 border-l-2 border-sky-500 leading-relaxed">{h}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'defense' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center gap-2 text-slate-200 font-bold text-xs">
                  <Mic size={15} className="text-purple-400" />
                  <span>FAANG Spoken Defense Pitch Rehearsal</span>
                </div>
                <SpokenDefense pitch={cur.theory.interviewPitch} unitId={cur.id} />
              </div>
            )}

            {activeTab === 'check' && cur.theory.mcq && (
              <div className="space-y-3.5 animate-fadeIn">
                <p className="text-xs font-semibold text-slate-200 leading-snug">{cur.theory.mcq.q}</p>
                <div className="space-y-2">
                  {cur.theory.mcq.options.map((opt, i) => {
                    const isSelected = mcqAnswer === i;
                    const isCorrect = i === cur.theory.mcq!.correct;
                    const showResult = mcqAnswer !== null;
                    let style = 'border-slate-800 hover:bg-slate-800/60 text-slate-300 bg-slate-950';
                    if (showResult) {
                      if (isCorrect) style = 'border-emerald-500 bg-emerald-950/80 text-emerald-200 font-bold';
                      else if (isSelected) style = 'border-rose-500 bg-rose-950/80 text-rose-200';
                      else style = 'border-slate-800 opacity-40 bg-slate-950';
                    }
                    return (
                      <button key={i} onClick={() => setMcqAnswer(i)} disabled={showResult} className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs transition cursor-pointer ${style}`}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
            <button onClick={onPrev} disabled={activeUnitIndex === 0} className="px-3 py-1 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition cursor-pointer">
              <ArrowLeft size={13} /> <span>Previous</span>
            </button>
            <span className="text-[10px] font-mono text-slate-400">{activeUnitIndex + 1} / {totalUnits}</span>
            <button onClick={onNext} disabled={activeUnitIndex === totalUnits - 1} className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5 transition cursor-pointer shadow-xs">
              <span>Next</span> <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </PaneBoundary>
    </Panel>
  );
}
