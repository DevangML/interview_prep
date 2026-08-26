import { Sparkles, Bot, Zap, Cpu, Award, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { HardwareProfile } from '../../lib/hardwareDetection';
import type { MasteryUnit } from '../../data/masteryStream';

interface Props {
  cur: MasteryUnit;
  sidebarOpen: boolean;
  isChatOpen: boolean;
  totalXP: number;
  hardwareProfile: HardwareProfile | null;
  isAiReady: boolean;
  isAiLoading: boolean;
  isAiSupported: boolean;
  progressPercent: number;
  activeModelId: string;
  onToggleSidebar: () => void;
  onToggleChat: () => void;
  onInitAi: () => void;
}

export function MasteryControlBar({
  cur, sidebarOpen, isChatOpen, totalXP, hardwareProfile,
  isAiReady, isAiLoading, isAiSupported, progressPercent, activeModelId,
  onToggleSidebar, onToggleChat, onInitAi
}: Props) {
  return (
    <div className="bg-slate-950 text-white px-3 sm:px-4 py-2 flex items-center justify-between gap-2.5 shrink-0 text-xs border-b border-slate-800 shadow-xs flex-wrap min-w-0">
      <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
        <button
          onClick={onToggleSidebar}
          className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60 cursor-pointer"
          title={sidebarOpen ? "Zen Mode (Hide Sidebar)" : "Show Sidebar"}
        >
          {sidebarOpen ? <PanelLeftClose size={14} /> : <PanelLeftOpen size={14} />}
        </button>
        <span className="font-bold text-slate-200 text-xs truncate max-w-[240px] sm:max-w-none">{cur.title}</span>
        <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800 text-[10px] font-mono hidden sm:inline">{cur.trackName}</span>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {hardwareProfile?.isAppleSilicon && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[10px]">
            <Zap size={11} className="text-emerald-400 fill-emerald-400" />
            <span>{hardwareProfile.chipModel}</span>
          </div>
        )}

        {isAiReady ? (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-[10px] font-mono">
            <Cpu size={11} className="text-indigo-400" />
            <span>{activeModelId.includes('3B') ? 'Qwen 3B' : 'Qwen 1.5B'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
        ) : isAiLoading ? (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <span>AI Loading ({progressPercent}%)</span>
          </div>
        ) : isAiSupported ? (
          <button onClick={onInitAi} className="px-2 py-0.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold transition cursor-pointer flex items-center gap-1">
            <Sparkles size={11} /> <span>Enable AI</span>
          </button>
        ) : null}

        <button
          onClick={onToggleChat}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold transition cursor-pointer border ${
            isChatOpen ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-indigo-300 border-indigo-500/40'
          }`}
        >
          <Bot size={11} /> <span>AI Mentor</span>
        </button>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-mono text-[10px]">
          <Award size={12} className="text-amber-400" />
          <span>{totalXP} XP</span>
        </div>
      </div>
    </div>
  );
}
