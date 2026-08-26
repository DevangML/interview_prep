import React, { useState } from 'react';
import { HelpCircle, ChevronRight, ChevronDown } from 'lucide-react';
import { FormattedMarkdown } from '../socratic/FormattedMarkdown';

interface Props {
  hints: string[];
}

export function ProblemHintsSection({ hints }: Props) {
  const [openedHints, setOpenedHints] = useState<Record<number, boolean>>({});

  const toggleHint = (idx: number) => {
    setOpenedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!hints || hints.length === 0) return null;

  return (
    <div className="space-y-2 pt-2 border-t border-slate-800">
      <h2 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
        <HelpCircle size={13} className="text-sky-400" />
        <span>Hints ({hints.length})</span>
      </h2>

      <div className="space-y-2">
        {hints.map((hint, idx) => {
          const isOpen = Boolean(openedHints[idx]);
          return (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
              <button
                onClick={() => toggleHint(idx)}
                className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/50 transition cursor-pointer text-xs font-bold text-slate-300"
              >
                <span className="flex items-center gap-2">
                  {isOpen ? <ChevronDown size={14} className="text-sky-400" /> : <ChevronRight size={14} className="text-slate-500" />}
                  <span>Hint {idx + 1}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">{isOpen ? 'Hide' : 'Show'}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-3 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                  <FormattedMarkdown text={hint} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
