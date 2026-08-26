import React from 'react';
import { Clock, Trophy, Lock } from 'lucide-react';
import type { ProjectBlueprint } from '../../data/projects/types';
import { COVERAGE_BY_PROJECT } from '../../data/projects/coverage';
import { ALL_TOPICS } from '../../data/learn/extended/trackRegistry';

interface ProjectCardProps {
  project: ProjectBlueprint;
  isSelected: boolean;
  onSelect: () => void;
}

const DIFFICULTY: Record<string, string> = {
  Beginner: 'text-emerald-300 border-emerald-500/30 bg-emerald-950/20',
  Junior: 'text-teal-300 border-teal-500/30 bg-teal-950/20',
  Intermediate: 'text-sky-300 border-sky-500/30 bg-sky-950/20',
  Senior: 'text-cyan-300 border-cyan-500/30 bg-cyan-950/20',
  Staff: 'text-violet-300 border-violet-500/30 bg-violet-950/20',
  Principal: 'text-rose-300 border-rose-500/30 bg-rose-950/20',
};

/**
 * A card answers three questions and stops: what is it, what does it cost,
 * how much of the syllabus does it carry. The detail lives in the drawer.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onSelect }) => {
  const used = COVERAGE_BY_PROJECT.get(project.id)?.edges.length ?? 0;
  const pct = Math.round((used / ALL_TOPICS.length) * 100);

  return (
    <button
      onClick={onSelect}
      aria-current={isSelected}
      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-150 min-w-0 break-words ${
        isSelected
          ? 'bg-[#181920] border-cyan-500/60 ring-1 ring-cyan-500/40'
          : 'bg-[#101118] border-white/10 hover:border-white/25 hover:bg-[#14151d]'
      }`}
    >
      <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono mb-2 min-w-0">
        <span className={`px-2 py-0.5 rounded-full border ${DIFFICULTY[project.difficulty] ?? ''}`}>
          {project.difficulty}
        </span>
        <span className="flex items-center gap-1 text-slate-400"><Clock size={10} />{project.estimatedBuildTimeHours}h</span>
        <span className="flex items-center gap-1 text-slate-400"><Trophy size={10} />{project.xpBounty}</span>
        {project.prerequisites?.length ? (
          <span className="flex items-center gap-1 text-slate-500" title={`After: ${project.prerequisites.join(', ')}`}>
            <Lock size={10} />{project.prerequisites.length}
          </span>
        ) : null}
      </div>

      <h3 className="text-sm font-bold text-white leading-snug mb-1 break-words">{project.title}</h3>
      <p className="text-[11px] leading-relaxed text-slate-400 line-clamp-2 break-words">{project.tagline}</p>

      <div className="mt-3 space-y-1">
        <div className="flex items-baseline justify-between text-[10px] font-mono">
          <span className="text-slate-500">{project.deliverables.length} artefacts · {project.stages.length} steps</span>
          <span className="text-slate-400">{used}/{ALL_TOPICS.length} concepts</span>
        </div>
        <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
          <span
            className={`block h-full ${pct === 100 ? 'bg-emerald-400' : 'bg-sky-400'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </button>
  );
};
