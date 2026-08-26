import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  Code2,
  CheckCircle2,
  Terminal,
  ArrowRight,
  GitMerge,
  BookOpen
} from 'lucide-react';
import type { ProjectBlueprint } from '../../data/projects/types';
import StageStepper from './StageStepper';
import DeliverableList from './DeliverableList';

interface Props {
  project: ProjectBlueprint;
}

export default function TechLeadTab({ project }: Props) {
  const [stageIdx, setStageIdx] = useState(0);

  return (
    <div className="space-y-6 text-slate-200 text-xs sm:text-sm font-sans">
      {/* Tech Lead Architecture Header */}
      <div className="rounded-2xl border border-sky-500/40 bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500 text-slate-950 font-black shadow-md">
              <Cpu size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                Tech Lead Architectural Blueprint
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Engineering Directive: {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-sky-950 text-sky-300 border border-sky-800 font-bold">
              {project.stages.length} Milestones
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
              {project.deliverables.length} Artefacts
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-bold">
            <GitMerge size={14} />
            <span>Architecture Pattern:</span>
            <code className="text-amber-300 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {project.architecturePattern}
            </code>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            I have laid down the architectural boundaries, layer separation, and failure policies for this project. Below are your concrete technical milestones and implementation invariants.
          </p>
        </div>
      </div>

      {/* Layer Architecture & Runtime Invariants */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
          <Layers size={14} /> 1. System Layers & Subsystem Boundaries
        </h4>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
          {project.layers.map((l) => (
            <div key={l.layer} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                <span className="font-bold text-xs text-sky-300 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  {l.layer}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">{l.components.length} parts</span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono">
                {l.components.join(' · ')}
              </p>
              <div className="space-y-1 pt-1">
                {l.invariants.map((inv, i) => (
                  <p key={i} className="text-[11px] leading-relaxed text-amber-300/90 flex items-start gap-1.5">
                    <span className="text-amber-400 select-none font-bold">▪</span>
                    <span>{inv}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Framework Handled vs Manual Engineering */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
          <ShieldCheck size={14} /> 2. Framework Support vs Manual Engineering
        </h4>
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Framework Handled (Standard Abstractions)
            </span>
            {project.frameworkVsManual.frameworkHandled.length === 0 ? (
              <p className="text-slate-500 italic text-[11px]">Zero framework magic permitted — built from first principles.</p>
            ) : (
              <ul className="space-y-1.5 text-slate-400">
                {project.frameworkVsManual.frameworkHandled.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-600 font-bold">▪</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-sky-900/60 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 font-mono">
              You Engineer & Defend (Your Code)
            </span>
            <ul className="space-y-1.5 text-slate-200">
              {project.frameworkVsManual.manualEngineeringRequired.map((f, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-sky-400 font-bold">▪</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Step-by-Step Technical Execution Directives */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
            <Code2 size={14} /> 3. Step-by-Step Technical Implementation Directives
          </h4>
          <span className="text-[10px] font-mono text-slate-400">Stage {stageIdx + 1} of {project.stages.length}</span>
        </div>

        <StageStepper stages={project.stages} index={stageIdx} onSelect={setStageIdx} />
      </section>

      {/* Build Deliverables & Artefacts */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            <CheckCircle2 size={14} /> 4. Checkable Engineering Artefacts
          </h4>
          <span className="text-[10px] font-mono text-slate-500">{project.deliverables.length} Deliverables</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Every concept on the coverage graph anchors to one of these deliverables. Implement them exactly per the specifications below.
        </p>
        <DeliverableList projectId={project.id} deliverables={project.deliverables} />
      </section>
    </div>
  );
}
