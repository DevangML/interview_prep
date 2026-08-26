import React from 'react';
import {
  Sparkles,
  Network,
  Link as LinkIcon,
  Play,
  Zap,
  Brain,
  Layers,
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import type { LearnTopic } from '../../../data/learn';

interface Props {
  topic: LearnTopic;
  onLaunchCanvas: () => void;
  onOpenLinkModal: () => void;
  onOpenAiAgent: () => void;
}

export default function RestingDiagramStudio({
  topic,
  onLaunchCanvas,
  onOpenLinkModal,
  onOpenAiAgent
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-xl select-none font-sans min-w-0">
      {/* Background Animated Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#6366f1 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      {/* Floating Animated Geometric Orbs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Centerpiece Hero Header */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 p-0.5 shadow-[0_0_30px_rgba(56,189,248,0.3)] animate-in zoom-in duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-sky-400">
              <Network size={32} className="animate-pulse" />
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
            Ready
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              📐 Architectural Diagram Studio
            </h3>
            <span className="text-base">✨</span>
          </div>
          <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed max-w-lg">
            Construct systems-level architecture maps, state machines, and execution flowcharts for <strong className="text-sky-300">{topic.title}</strong> with free embedded Draw.io and the Draw AI Agent.
          </p>
        </div>
      </div>

      {/* 3 Interactive Quick Feature Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Card 1: Template Starter */}
        <div
          onClick={onLaunchCanvas}
          className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-sky-500/50 transition duration-200 cursor-pointer flex flex-col justify-between gap-3 group shadow-sm"
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-lg">⚡</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800/80">
                Preset
              </span>
            </div>
            <h4 className="font-bold text-xs text-white group-hover:text-sky-300 transition">
              Canonical Topic Blueprint
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pre-loaded with {topic.keyPoints.length} core architectural invariants & component nodes.
            </p>
          </div>
          <span className="text-[11px] font-bold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition font-mono">
            Launch Canvas <ArrowRight size={12} />
          </span>
        </div>

        {/* Card 2: Attach Google Drive Link */}
        <div
          onClick={onOpenLinkModal}
          className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 transition duration-200 cursor-pointer flex flex-col justify-between gap-3 group shadow-sm"
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-lg">🔗</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/80">
                GDrive
              </span>
            </div>
            <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition">
              Attach GDrive / Share Link
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Link your personal Draw.io diagram or Google Drive drawing to sync changes.
            </p>
          </div>
          <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition font-mono">
            Attach Link <ArrowRight size={12} />
          </span>
        </div>

        {/* Card 3: Draw AI Agent */}
        <div
          onClick={onOpenAiAgent}
          className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/50 transition duration-200 cursor-pointer flex flex-col justify-between gap-3 group shadow-sm"
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-lg">🔮</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/80">
                Draw AI
              </span>
            </div>
            <h4 className="font-bold text-xs text-white group-hover:text-purple-300 transition">
              Draw AI Invariant Agent
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Real-time AST node auditing, missing concurrency detection & perfection fixes.
            </p>
          </div>
          <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition font-mono">
            Open AI Agent <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Main Launch Button */}
      <div className="relative z-10 flex items-center justify-center pt-2">
        <button
          onClick={onLaunchCanvas}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2.5 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <Play size={16} className="fill-white" />
          <span>Launch Interactive Draw.io Canvas</span>
        </button>
      </div>
    </div>
  );
}
