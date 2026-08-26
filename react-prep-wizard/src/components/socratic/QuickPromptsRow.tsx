import React from 'react';
import { Scale, Search, Lightbulb, ShieldAlert, Target, HelpCircle } from 'lucide-react';

interface Props {
  onSelectPrompt: (type: 'dispute' | 'diagnose' | 'concept' | 'edge_cases' | 'interview_pitch' | 'hint') => void;
  disabled: boolean;
}

export function QuickPromptsRow({ onSelectPrompt, disabled }: Props) {
  const chips = [
    { type: 'dispute', label: '⚖️ Dispute / Impartial Review', icon: Scale, color: 'text-amber-300 border-amber-500/30 bg-amber-500/10' },
    { type: 'diagnose', label: 'Diagnose Code', icon: Search, color: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10' },
    { type: 'concept', label: 'Explain Concept', icon: Lightbulb, color: 'text-sky-300 border-sky-500/30 bg-sky-500/10' },
    { type: 'edge_cases', label: 'Edge Cases', icon: ShieldAlert, color: 'text-rose-300 border-rose-500/30 bg-rose-500/10' },
    { type: 'interview_pitch', label: 'Interview Pitch', icon: Target, color: 'text-purple-300 border-purple-500/30 bg-purple-500/10' },
    { type: 'hint', label: 'Next Clue', icon: HelpCircle, color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10' },
  ] as const;

  return (
    <div className="px-2.5 py-1.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[10px]">
      {chips.map(({ type, label, icon: Icon, color }) => (
        <button
          key={type}
          onClick={() => onSelectPrompt(type)}
          disabled={disabled}
          className={`px-2 py-1 rounded-md border font-medium whitespace-nowrap flex items-center gap-1 transition cursor-pointer disabled:opacity-50 ${color}`}
        >
          <Icon size={10} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
