import { useState } from 'react';
import type { ForwardChainStep } from '../store/types';

interface Props {
  steps: ForwardChainStep[];
  language: string;
}

const LAYER_COLORS: Record<number, string> = {
  1: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
  2: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
  3: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400',
  4: 'border-pink-500/50 bg-pink-500/10 text-pink-400',
  5: 'border-rose-500/50 bg-rose-500/10 text-rose-400',
  6: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
  7: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
  8: 'border-purple-500/50 bg-purple-500/10 text-purple-400',
};

export const ForwardChainVisualizer = ({ steps, language }: Props) => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  if (!steps || steps.length === 0) return null;

  const current = steps[activeStepIdx] || steps[0];

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-5 space-y-4 font-chrome">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-ink-3 font-bold">
            Forward Chain Upwards · H/W &rarr; HCI
          </h4>
          <p className="text-xs text-ink-2 mt-0.5">
            How {language} ascents from silicon hardware execution to developer mental models.
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-raised border border-surface-border text-ink-3">
          Step {activeStepIdx + 1} of {steps.length}
        </span>
      </div>

      {/* Interactive Ascension Track */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {steps.map((step, idx) => {
          const isSelected = idx === activeStepIdx;
          const colorClass = LAYER_COLORS[step.layerNumber] || 'border-surface-border text-ink-3';
          return (
            <button
              key={step.layerNumber}
              type="button"
              onClick={() => setActiveStepIdx(idx)}
              className={`flex-1 min-w-[100px] p-2 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? `${colorClass} shadow-xs ring-1 ring-current`
                  : 'border-surface-border bg-surface-raised/40 hover:bg-surface-raised text-ink-3'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                <span>L{step.layerNumber}</span>
                <span className="truncate max-w-[60px]">{step.layerName.split(' ')[0]}</span>
              </div>
              <p className="text-[11px] font-medium text-ink-1 truncate">{step.title}</p>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Detail Card */}
      <div className="p-4 rounded-xl border border-surface-border bg-surface-raised/60 space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
              LAYER_COLORS[current.layerNumber] || 'border-surface-border text-ink-3'
            }`}
          >
            Layer {current.layerNumber} · {current.layerName}
          </span>
          <h5 className="text-xs font-bold text-ink-1">{current.title}</h5>
        </div>
        <p className="font-prose text-xs sm:text-sm text-ink-2 leading-relaxed">
          {current.description}
        </p>
        {current.hardwareImpact && (
          <div className="mt-2 pt-2 border-t border-surface-border/60 flex items-center gap-2 text-[11px] text-ink-3 font-mono">
            <span className="text-cyan-400 font-bold">⚡ Hardware Impact:</span>
            <span>{current.hardwareImpact}</span>
          </div>
        )}
      </div>
    </div>
  );
};
