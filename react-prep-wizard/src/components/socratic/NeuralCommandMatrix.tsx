import React from 'react';
import { Terminal, Sparkles, Zap, Brain, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import type { SlashSkill } from '../../hooks/useAgentChat';

interface Props {
  skills: SlashSkill[];
  selectedIdx: number;
  onSelectSkill: (skill: SlashSkill) => void;
  filterQuery?: string;
  isFloating?: boolean;
}

export function NeuralCommandMatrix({
  skills,
  selectedIdx,
  onSelectSkill,
  filterQuery = '',
  isFloating = false
}: Props) {
  if (skills.length === 0) {
    return (
      <div className="p-3 text-center text-xs text-slate-500 font-mono">
        No matching neural skills found.
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-xl p-2.5 space-y-1.5 shadow-2xl transition-all ${
        isFloating ? 'max-h-60 overflow-y-auto custom-scrollbar' : ''
      }`}
    >
      <div className="flex items-center justify-between px-2 py-1 border-b border-slate-800/80 text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1 font-bold text-sky-400">
          <Terminal size={11} />
          <span>Neural Command Matrix ({skills.length})</span>
        </span>
        <span className="text-slate-500">Press ↵ or Tab to run</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
        {skills.map((skill, idx) => {
          const isSelected = selectedIdx === idx;

          return (
            <button
              key={skill.command}
              onClick={() => onSelectSkill(skill)}
              className={`p-2 rounded-xl text-left transition cursor-pointer border flex items-start gap-2 min-w-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-sky-950/90 to-indigo-950/90 border-sky-500/60 ring-1 ring-sky-500/40 text-white shadow-md'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="text-base shrink-0 mt-0.5">{skill.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="font-mono text-xs font-bold text-sky-300 truncate">
                    {skill.command}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0">
                    {skill.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                  {skill.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
