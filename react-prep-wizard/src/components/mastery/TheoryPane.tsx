import React, { useState } from 'react';
import {
  BookOpen, Mic, ChevronRight, Zap, CheckCircle2, Circle, ArrowLeft, ArrowRight
} from 'lucide-react';
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

export function TheoryPane({
  cur,
  brief,
  hintStack,
  activeUnitIndex,
  totalUnits,
  onPrev,
  onNext
}: Props) {
  const [showHint, setShowHint] = useState<number>(0);
  const [mcqAnswer, setMcqAnswer] = useState<number | null>(null);

  return (
    <Panel title={`Theory: ${cur.trackName}`} className="h-full flex flex-col border-slate-200 shadow-sm">
      <PaneBoundary name="The brief">
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-wider rounded mb-3">
              {cur.category} · {cur.level}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">
              {cur.title}
            </h1>
          </div>

          <Briefing briefing={brief} />

          <details
            className="group border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
            onToggle={(e) => {
              if ((e.currentTarget as HTMLDetailsElement).open) setShowHint((n) => Math.max(n, 1));
            }}
          >
            <summary className="px-4 py-2.5 cursor-pointer list-none flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800">
              <BookOpen size={13} className="text-sky-500" />
              Under the hood — reveals the mechanism
            </summary>
            <div className="px-4 pb-4 text-[14px] text-slate-600 leading-relaxed space-y-2">
              {cur.theory.deepDive}
            </div>
          </details>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wide">
              <Mic size={16} className="text-purple-500" />
              <h3>Spoken Defense Pitch</h3>
            </div>
            <SpokenDefense pitch={cur.theory.interviewPitch} unitId={cur.id} />
          </div>

          {/* Diagram & Context */}
          {(!!cur.diagram || hintStack.length > 0 || cur.why || cur.takeaway) && (
            <div className="mt-6 space-y-3">
              {!!cur.diagram && (
                <details className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm" open>
                  <summary className="px-4 py-2.5 cursor-pointer text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 list-none flex items-center gap-1.5">
                    <ChevronRight size={12} className="transition-transform [details[open]_&]:rotate-90" />
                    Target layout
                  </summary>
                  <div className="px-4 pb-4">
                    <DiagramView diagram={cur.diagram as Diagram} />
                  </div>
                </details>
              )}

              {cur.takeaway && (
                <div className="text-[13px] text-emerald-900 bg-emerald-50 border border-emerald-200 p-3 rounded-xl leading-relaxed">
                  <strong className="font-bold">Takeaway · </strong>{cur.takeaway}
                </div>
              )}

              {hintStack.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={14} className="text-sky-500" />
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Progressive Hints <span className="ml-1.5 text-slate-400 font-mono">{showHint}/{hintStack.length}</span>
                    </h4>
                  </div>
                  <ol className="space-y-1.5 mb-2">
                    {hintStack.slice(0, showHint).map((h, i) => (
                      <li key={i} className="text-[13px] text-slate-600 leading-relaxed pl-4 border-l-2 border-sky-200">{h}</li>
                    ))}
                  </ol>
                  {showHint < hintStack.length && (
                    <button onClick={() => setShowHint((n) => n + 1)} className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">
                      {showHint === 0 ? 'Reveal a hint' : 'Next hint'}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Rapid MCQ Check */}
          {cur.theory.mcq && (
            <div className="mt-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Rapid Concept Check</span>
              </div>
              <p className="text-[14px] font-semibold text-slate-800 leading-snug">{cur.theory.mcq.q}</p>
              <div className="space-y-2">
                {cur.theory.mcq.options.map((opt, i) => {
                  const isSelected = mcqAnswer === i;
                  const isCorrect = i === cur.theory.mcq!.correct;
                  const showResult = mcqAnswer !== null;
                  let style = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                  if (showResult) {
                    if (isCorrect) style = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-medium';
                    else if (isSelected) style = 'border-rose-500 bg-rose-50 text-rose-800 font-medium';
                    else style = 'border-slate-200 opacity-40';
                  }
                  return (
                    <button key={i} onClick={() => setMcqAnswer(i)} disabled={showResult} className={`w-full text-left px-4 py-2.5 rounded-xl border text-[13px] transition ${style}`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Stepper */}
          <div className="pt-6 mt-4 border-t border-slate-200 flex items-center justify-between">
            <button onClick={onPrev} disabled={activeUnitIndex === 0} className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition cursor-pointer">
              <ArrowLeft size={14} /> <span>Previous</span>
            </button>
            <button onClick={onNext} disabled={activeUnitIndex === totalUnits - 1} className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-xs font-semibold text-white flex items-center gap-2 shadow-sm transition cursor-pointer">
              <span>Next</span> <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </PaneBoundary>
    </Panel>
  );
}
