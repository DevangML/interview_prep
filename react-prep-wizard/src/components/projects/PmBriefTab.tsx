import React from 'react';
import {
  Briefcase,
  Target,
  Ban,
  CheckSquare,
  Layers,
  Cpu,
  Clock,
  Trophy,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import type { ProjectBlueprint } from '../../data/projects/types';
import { TRACK_META, TIER_META } from '../../data/projects/types';

interface Props {
  project: ProjectBlueprint;
  onNavigateToBuild?: () => void;
}

export default function PmBriefTab({ project, onNavigateToBuild }: Props) {
  const trackInfo = TRACK_META[project.track];
  const tierInfo = TIER_META[project.tier];

  return (
    <div className="space-y-6 text-slate-200 text-xs sm:text-sm">
      {/* PM Sprint Kickoff Banner */}
      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black shadow-md">
              <Briefcase size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Sprint Kickoff & Epic Specification
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Epic: {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
              {tierInfo.label} Epic
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
              {project.difficulty}
            </span>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-slate-300 italic bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
          &ldquo;{project.summary}&rdquo;
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Target Room</span>
            <span className="font-bold text-slate-200">{trackInfo.label}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Industry Analogue</span>
            <span className="font-bold text-amber-300 truncate block">{project.realWorldAnalog}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Sprint Timebox</span>
            <span className="font-bold text-sky-300 flex items-center gap-1">
              <Clock size={11} /> {project.estimatedBuildTimeHours} Hours
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Sprint Bounty</span>
            <span className="font-bold text-emerald-300 flex items-center gap-1">
              <Trophy size={11} /> {project.xpBounty} XP
            </span>
          </div>
        </div>
      </div>

      {/* Why We Are Building This (PM Problem Statement) */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
          <Compass size={14} /> 1. Objective & Product Value Proposition
        </h4>
        <div className="space-y-2 text-xs leading-relaxed text-slate-300">
          <p>
            In production tier-1 front-end teams, interviewers don&apos;t just ask for generic CRUD code; they look for proof that you can architect scalable, defect-free client subsystems.
          </p>
          <p>
            This sprint simulates the exact real-world engineering challenge of building <strong className="text-white">{project.realWorldAnalog}</strong>. The goal is to produce a bulletproof, review-ready artifact that decisively demonstrates:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong className="text-slate-100">Architecture Discipline:</strong> Clear state/data boundaries using the <code className="text-sky-300">{project.architecturePattern}</code> pattern.</li>
            <li><strong className="text-slate-100">Zero-Regression Reliability:</strong> Passing deterministic automated invariants and handling edge-case crashes gracefully.</li>
            <li><strong className="text-slate-100">Interview Defense:</strong> Defending architectural trade-offs when questioned by Principal/Staff interviewers.</li>
          </ul>
        </div>
      </section>

      {/* Scope Boundaries (The PM Contract) */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
          <Target size={14} /> 2. Sprint Scope Boundaries (PM Contract)
        </h4>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* In Scope */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2.5">
            <h5 className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
              <CheckSquare size={13} /> In Scope (Sprint Commitment)
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              {project.coreScopeBoundaries.inScopeMinimal.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold select-none mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Out of Scope / Anti-Bloat */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2.5">
            <h5 className="flex items-center gap-1.5 text-xs font-bold text-rose-400 font-mono uppercase tracking-wider">
              <Ban size={13} /> Out of Scope (Deliberate Non-Goals)
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              {project.coreScopeBoundaries.outOfScopeBloat.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold select-none mt-0.5">✗</span>
                  <span className="text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Acceptance Criteria & Deliverables */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
          <ShieldCheck size={14} /> 3. Definition of Done (DoD) & Acceptance Criteria
        </h4>
        <div className="space-y-2.5">
          {project.deliverables.map((deliv) => (
            <div key={deliv.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-slate-100">{deliv.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-400 border border-slate-800">
                  {deliv.id}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{deliv.spec}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Framework vs Custom Code Responsibility Matrix */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
          <Cpu size={14} /> 4. Engineering Responsibility Matrix
        </h4>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Framework Handled (Out-of-the-box)
            </span>
            {project.frameworkVsManual.frameworkHandled.length === 0 ? (
              <p className="text-slate-500 italic text-[11px]">No external framework used — built 100% from first principles.</p>
            ) : (
              <ul className="space-y-1.5 text-slate-400">
                {project.frameworkVsManual.frameworkHandled.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-slate-600">▪</span> {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-900/60 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 font-mono">
              You Engineer & Defend (Manual Core)
            </span>
            <ul className="space-y-1.5 text-slate-200 font-medium">
              {project.frameworkVsManual.manualEngineeringRequired.map((f, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-sky-400">▪</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA to jump into Build Steps */}
      {onNavigateToBuild && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onNavigateToBuild}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition cursor-pointer"
          >
            <span>Proceed to Step-by-Step Build Stages</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
