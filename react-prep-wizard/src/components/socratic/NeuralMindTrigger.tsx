import React, { useEffect } from 'react';
import { Sparkles, Brain, Cpu, Terminal, Zap } from 'lucide-react';
import { NeuralBotAvatar } from './NeuralBotAvatar';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  isAiReady?: boolean;
  isTyping?: boolean;
  badgeLabel?: string;
  contextType?: string;
}

export function NeuralMindTrigger({
  isOpen,
  onToggle,
  isAiReady = false,
  isTyping = false,
  badgeLabel,
  contextType = 'general'
}: Props) {
  // Global Keyboard Shortcut: Cmd+J or Ctrl+J to toggle AI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);

  if (isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 group animate-in fade-in duration-200">
      {/* Ambient Pulsating Glow Ring */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" style={{ animation: 'aiAuraGlowPulse 3s ease-in-out infinite' }} />

      {/* Ambient Socratic Pill */}
      <button
        onClick={onToggle}
        aria-label="Toggle Neural Mind Assistant (Cmd+J)"
        className={`relative px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-2xl transition-all duration-300 cursor-pointer border backdrop-blur-xl ${
          isTyping
            ? 'bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 border-sky-400 text-white animate-pulse shadow-[0_0_25px_rgba(56,189,248,0.5)]'
            : 'bg-slate-950/95 hover:bg-slate-900 border-sky-500/40 hover:border-sky-400 text-white hover:scale-105 active:scale-95 ring-1 ring-sky-500/20'
        }`}
      >
        <NeuralBotAvatar
          state={isTyping ? 'thinking' : 'idle'}
          size="sm"
        />

        <div className="text-left hidden sm:block">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-xs tracking-tight text-white">Neural Mind</span>
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-800">
              ⌘J
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono leading-none mt-0.5">
            {isTyping ? 'Synthesizing...' : badgeLabel || 'Socratic Sparring Oracle'}
          </p>
        </div>
      </button>
    </div>
  );
}
