import React from 'react';
import { Sparkles, Brain, Cpu, Zap, Activity } from 'lucide-react';

interface Props {
  state?: 'idle' | 'thinking' | 'speaking' | 'duel';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function NeuralBotAvatar({ state = 'idle', size = 'md', className = '' }: Props) {
  const containerSize = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  const iconSize = {
    sm: 15,
    md: 19,
    lg: 24,
    xl: 32
  }[size];

  return (
    <div className={`relative flex items-center justify-center shrink-0 overflow-visible select-none ${containerSize} ${className}`}>
      {/* HDR P3 Ambient Glow Field */}
      <div
        className={`absolute -inset-1 rounded-2xl transition-all duration-700 pointer-events-none ${
          state === 'thinking'
            ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 animate-spin blur-md opacity-90'
            : state === 'duel'
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 animate-pulse blur-md opacity-80'
            : 'bg-gradient-to-tr from-sky-500/50 via-indigo-500/40 to-purple-500/50 blur-md opacity-60'
        }`}
      />

      {/* Orbiting Gyro Ring (thinking mode) */}
      {state === 'thinking' && (
        <div className="absolute -inset-2 rounded-full border-2 border-sky-400/80 border-t-transparent border-b-transparent animate-spin duration-1000 pointer-events-none" />
      )}

      {/* Core Neural Sphere */}
      <div
        className={`relative z-10 w-full h-full rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 ${
          state === 'thinking'
            ? 'bg-slate-950 border border-sky-400 text-sky-300 scale-105 shadow-[0_0_20px_rgba(56,189,248,0.5)]'
            : state === 'duel'
            ? 'bg-slate-950 border border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
            : 'bg-gradient-to-tr from-sky-600 via-indigo-600 to-purple-600 border border-white/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
        }`}
      >
        {state === 'thinking' ? (
          <Brain size={iconSize} className="animate-pulse text-sky-300" />
        ) : state === 'duel' ? (
          <Zap size={iconSize} className="text-amber-300 animate-bounce" />
        ) : (
          <Sparkles size={iconSize} className="text-white drop-shadow-sm" />
        )}
      </div>

      {/* Active Pulse Indicator Pip */}
      <span
        className={`absolute -top-1 -right-1 z-20 w-3 h-3 rounded-full border-2 border-slate-950 shadow-md ${
          state === 'thinking'
            ? 'bg-sky-400 animate-ping'
            : state === 'duel'
            ? 'bg-amber-400 animate-pulse'
            : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
        }`}
      />
    </div>
  );
}
