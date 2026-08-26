import type { ProjectBlueprint } from '../../data/projects/types';
import { Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { playClickSound } from '../../lib/sound/soundEngine';

interface Props {
  project: ProjectBlueprint;
  isSelected?: boolean;
  onSelect: (project: ProjectBlueprint) => void;
}

const DIFFICULTY_STYLE = {
  Senior: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  Staff: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  Principal: 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-xs shadow-rose-500/10',
};

export function ProjectCard({ project, isSelected, onSelect }: Props) {
  return (
    <div
      onClick={() => { playClickSound(); onSelect(project); }}
      className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 group ${
        isSelected
          ? 'bg-slate-900 border-sky-500/80 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/50'
          : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center gap-1">
            <span>🏛️</span>
            <span>{project.realWorldAnalog}</span>
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${DIFFICULTY_STYLE[project.difficulty]}`}>
              {project.difficulty}
            </span>
            <span className="text-[11px] font-mono text-amber-400 font-bold">
              +{project.xpBounty} XP
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors leading-snug">
          {project.title}
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {project.summary}
        </p>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
          <Layers size={12} className="text-sky-400" />
          <span className="truncate">{project.architecturePattern}</span>
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          className="w-full py-2 px-3 rounded-xl bg-slate-950 group-hover:bg-sky-600 group-hover:text-white text-slate-300 border border-slate-800 group-hover:border-sky-500 text-xs font-bold transition flex items-center justify-center gap-2"
        >
          <ShieldCheck size={13} />
          <span>Inspect Clean Architecture Blueprint</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
