import { Award, Swords, Flame, Volume2, VolumeX, Network, BookOpen } from 'lucide-react';
import { ComboStreakBadge } from './ComboStreakBadge';
import { toggleSound, isSoundEnabled, playClickSound } from '../../lib/sound/soundEngine';

interface Props {
  totalTopics: number;
  readCount: number;
  duelsPassedCount: number;
  totalKnowledgeXp: number;
  missingInSyllabusCount: number;
  comboStreak: number;
  comboMultiplier: number;
  viewMode: 'reader' | 'graph';
  onToggleViewMode: (mode: 'reader' | 'graph') => void;
}

export function SkillTreeHUD({
  totalTopics, readCount, duelsPassedCount, totalKnowledgeXp, missingInSyllabusCount,
  comboStreak, comboMultiplier, viewMode, onToggleViewMode
}: Props) {
  const getRank = (xp: number) => {
    if (xp >= 1500) return { title: 'Staff Architect', icon: '🏛️', color: 'from-amber-400 to-orange-500 text-slate-950' };
    if (xp >= 600) return { title: 'Frontend Specialist', icon: '⚡', color: 'from-indigo-500 to-sky-400 text-white' };
    return { title: 'Novice Explorer', icon: '🌱', color: 'from-slate-700 to-slate-800 text-slate-200' };
  };

  const rank = getRank(totalKnowledgeXp);
  const masteryPercentage = Math.round(((readCount + duelsPassedCount * 2) / (totalTopics * 3)) * 100);

  return (
    <div className="bg-slate-950 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs border-b border-slate-800 shadow-md">
      <div className="flex items-center gap-3">
        <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${rank.color} font-extrabold flex items-center gap-1.5 shadow-sm text-xs`}>
          <span>{rank.icon}</span>
          <span>{rank.title}</span>
        </div>

        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => { playClickSound(); onToggleViewMode('reader'); }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
              viewMode === 'reader' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen size={12} /> <span>Reader</span>
          </button>
          <button
            onClick={() => { playClickSound(); onToggleViewMode('graph'); }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
              viewMode === 'graph' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network size={12} /> <span>Skill DAG</span>
          </button>
        </div>

        <ComboStreakBadge streak={comboStreak} multiplier={comboMultiplier} />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-mono text-[11px]">
          <Award size={13} className="text-amber-400" />
          <span>{totalKnowledgeXp} XP</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 font-mono text-[11px]">
          <Swords size={12} className="text-indigo-400" />
          <span>{duelsPassedCount} Won</span>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
          <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${masteryPercentage}%` }} />
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-bold">{masteryPercentage}%</span>
        </div>

        <button
          onClick={() => toggleSound()}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
          title="Toggle SFX"
        >
          {isSoundEnabled() ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </button>
      </div>
    </div>
  );
}
