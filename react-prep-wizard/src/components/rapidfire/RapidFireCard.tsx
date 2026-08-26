import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import type { RapidQuestion } from '../../data/rapidFireDb';

interface Props {
  question: RapidQuestion;
  selectedAnswer: number | null;
  showResult: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
}

export function RapidFireCard({ question, selectedAnswer, showResult, onSelect, onNext }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <h2 className="text-xl font-bold text-slate-100">{question.question}</h2>

      {question.code && (
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs">
          <CodeMirror
            value={question.code}
            extensions={[javascript({ jsx: true })]}
            theme="dark"
            editable={false}
            basicSetup={{ lineNumbers: true, foldGutter: false }}
          />
        </div>
      )}

      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          let btnStyle = 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-800';
          if (showResult) {
            if (idx === question.correct) btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold';
            else if (idx === selectedAnswer) btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-300 font-bold';
            else btnStyle = 'border-slate-800 bg-slate-950/40 text-slate-500 opacity-50';
          }
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
            >
              <span>{opt}</span>
              {showResult && idx === question.correct && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
              {showResult && idx === selectedAnswer && idx !== question.correct && <XCircle size={16} className="text-rose-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 animate-fadeIn">
          <div className="font-bold text-amber-400">Explanation:</div>
          <p className="leading-relaxed">{question.explanation}</p>
          <div className="pt-2 flex justify-end">
            <button
              onClick={onNext}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Next Question</span> <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
