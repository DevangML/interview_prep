import { Sparkles, Zap, Cpu, Bot, Award } from 'lucide-react';
import type { HardwareProfile } from '../../lib/hardwareDetection';

interface Props {
  hardwareProfile: HardwareProfile | null;
  isAiReady: boolean;
  isAiLoading: boolean;
  isAiSupported: boolean;
  aiPercent: number;
  activeModelId: string;
  isChatOpen: boolean;
  totalXP: number;
  unitCount: number;
  trackCount: number;
  onToggleChat: () => void;
  onInitAi: () => void;
}

export function MasteryHeader({
  hardwareProfile,
  isAiReady,
  isAiLoading,
  isAiSupported,
  aiPercent,
  activeModelId,
  isChatOpen,
  totalXP,
  unitCount,
  trackCount,
  onToggleChat,
  onInitAi
}: Props) {
  return (
    <div className="bg-slate-950 text-white px-4 py-2 flex items-center justify-between gap-4 shrink-0 text-xs border-b border-slate-800">
      <div className="flex items-center gap-3">
        <Sparkles size={16} className="text-sky-400" />
        <span className="font-bold tracking-tight text-slate-100">Unified Interview Mastery Engine</span>
        <span className="text-slate-400 hidden md:inline">· Theory ↔ Code ↔ Defense</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {hardwareProfile?.isAppleSilicon && (
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[10px]"
            title={`Detected: ${hardwareProfile.chipModel}. WebGPU Metal Pipeline Active.`}
          >
            <Zap size={11} className="text-emerald-400 fill-emerald-400" />
            <span className="font-semibold">{hardwareProfile.chipModel}</span>
            <span className="text-emerald-400/70 hidden xl:inline">· Metal Turbo</span>
          </div>
        )}

        {isAiReady ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-[10px] font-mono">
            <Cpu size={11} className="text-indigo-400" />
            <span>{activeModelId.includes('3B') ? 'Qwen 3B' : activeModelId.includes('gemma') ? 'Gemma 2B' : 'Qwen 1.5B Turbo'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
        ) : isAiLoading ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <span>Loading Engine ({aiPercent}%)</span>
          </div>
        ) : isAiSupported ? (
          <button
            onClick={onInitAi}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-[11px] font-semibold transition cursor-pointer shadow-xs border border-indigo-400/30"
          >
            <Sparkles size={12} />
            <span>Enable Metal AI</span>
          </button>
        ) : null}

        <button
          onClick={onToggleChat}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer border ${
            isChatOpen
              ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white border-indigo-400/50 shadow-xs'
              : 'bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border-indigo-500/40'
          }`}
          title="Open AI Problem & Concept Mentor Chat"
        >
          <Bot size={12} className={isChatOpen ? 'text-white' : 'text-indigo-400'} />
          <span>AI Mentor</span>
        </button>

        <span className="text-slate-500 hidden lg:inline">{unitCount} units · {trackCount} tracks</span>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-mono text-[11px]">
          <Award size={13} className="text-amber-400" />
          <span>{totalXP} XP</span>
        </div>
      </div>
    </div>
  );
}
