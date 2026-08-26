import React from 'react';
import type { ProjectBlueprint } from '../../data/projects/types';

interface ProjectCardProps {
  project: ProjectBlueprint;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onSelect }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-300 border-emerald-500/30 bg-emerald-950/20';
      case 'Junior': return 'text-teal-300 border-teal-500/30 bg-teal-950/20';
      case 'Intermediate': return 'text-sky-300 border-sky-500/30 bg-sky-950/20';
      case 'Senior': return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20';
      case 'Staff': return 'text-purple-400 border-purple-500/30 bg-purple-950/20';
      case 'Principal': return 'text-rose-300 border-rose-500/30 bg-rose-950/20';
      default: return 'text-blue-400 border-blue-500/30 bg-blue-950/20';
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected
          ? 'bg-[#181920] border-cyan-500/60 shadow-[0_0_24px_rgba(34,211,238,0.15)] ring-1 ring-cyan-500/40'
          : 'bg-[#101115] border-white/5 hover:border-white/20 hover:bg-[#14151a]'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(project.difficulty)}`}>
            {project.difficulty}
          </span>
          <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-800/30">
            ⚡ {project.estimatedBuildTimeHours}h Build • Zero Bloat
          </span>
        </div>
        <div className="text-xs font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/30">
          +{project.xpBounty} XP
        </div>
      </div>

      <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1">
        {project.title}
      </h3>
      <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
        {project.tagline}
      </p>

      <div className="text-[11px] text-gray-500 font-mono mb-3">
        <span className="text-gray-400 font-medium">Analog:</span> {project.realWorldAnalog}
      </div>

      {/* 4 Evolutionary Stages Progress Bar */}
      <div className="mb-3.5 bg-black/40 p-2 rounded-lg border border-white/5">
        <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1.5 flex justify-between">
          <span>Evolutionary Journey</span>
          <span className="text-cyan-400">4 Stages</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {project.stages.map((st) => (
            <div key={st.stageNumber} className="flex flex-col gap-0.5">
              <div className="h-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 opacity-80" />
              <span className="text-[9px] text-gray-500 font-mono truncate">S{st.stageNumber}: {st.stageName.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-gray-300 border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
