import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Terminal, Sparkles, Activity } from 'lucide-react';

interface Props {
  contextName?: string;
  commandName?: string;
}

const THOUGHT_STEPS = [
  'Deconstructing problem boundaries & AST nodes...',
  'Evaluating state invariant graph & V8 lifecycle...',
  'Cross-referencing TC39 specifications & React 19 RFCs...',
  'Formulating Socratic systems response & test assertions...'
];

export function CognitiveThinkingSequence({ contextName, commandName }: Props) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIdx(prev => (prev + 1) % THOUGHT_STEPS.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-500/30 text-xs space-y-3 animate-in fade-in-50 duration-300 shadow-xl max-w-[94%]">
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-sky-400 font-mono text-[11px] font-bold">
          <Activity size={13} className="animate-pulse text-sky-400" />
          <span>Neural Reasoning Stream</span>
        </div>
        {commandName && (
          <span className="px-2 py-0.5 rounded-full bg-slate-950 text-sky-300 border border-slate-800 text-[10px] font-mono">
            {commandName}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-xl bg-sky-950 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0 shadow-sm">
          <Cpu size={14} className="animate-spin duration-3000" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-slate-200 font-mono text-xs truncate transition-all duration-300">
            {THOUGHT_STEPS[stepIdx]}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span className="text-[10px] text-slate-400 font-mono">
              {contextName ? `Grounding in ${contextName}` : 'Deep Dialectic Synthesis'}
            </span>
          </div>
        </div>
      </div>

      {/* Kinetic Wave Bars */}
      <div className="flex items-center gap-1 pt-1">
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full bg-sky-500/30 overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 150}ms`,
                animationDuration: '1000ms'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
