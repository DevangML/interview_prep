import { useState } from 'react';
import { Target, Ban, Layers } from 'lucide-react';
import type { ProjectBlueprint } from '../../data/projects/types';
import StageStepper from './StageStepper';
import DeliverableList from './DeliverableList';
import Collapsible from './Collapsible';

/**
 * One scrollable column instead of four tabs.
 *
 * The order is the order a builder needs it: walk the stages, build the list,
 * and only then consult the boundaries and the architecture — which stay
 * folded, because they are reference material, not reading.
 */
export default function BuildTab({ project }: { project: ProjectBlueprint }) {
  const [stageIdx, setStageIdx] = useState(0);

  return (
    <div className="space-y-4">
      <StageStepper stages={project.stages} index={stageIdx} onSelect={setStageIdx} />

      <section className="space-y-2">
        <h3 className="flex items-baseline gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-300">
          Build list
          <span className="font-mono text-[10px] text-slate-500">{project.deliverables.length} artefacts</span>
        </h3>
        <p className="text-[11px] leading-relaxed text-slate-500">
          Every concept on the coverage graph is anchored to a stage or to one of these.
          Finishing the list is what makes the coverage real rather than claimed.
        </p>
        <DeliverableList projectId={project.id} deliverables={project.deliverables} />
      </section>

      <Collapsible title="Scope" count={`${project.coreScopeBoundaries.inScopeMinimal.length} in · ${project.coreScopeBoundaries.outOfScopeBloat.length} out`}>
        <div className="grid sm:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <Target size={11} /> In scope
            </p>
            <ul className="space-y-1">
              {project.coreScopeBoundaries.inScopeMinimal.map((s, i) => (
                <li key={i} className="text-[11px] leading-relaxed text-slate-300 flex gap-1.5">
                  <span className="text-emerald-500 select-none">+</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400">
              <Ban size={11} /> Deliberately not
            </p>
            <ul className="space-y-1">
              {project.coreScopeBoundaries.outOfScopeBloat.map((s, i) => (
                <li key={i} className="text-[11px] leading-relaxed text-slate-400 flex gap-1.5">
                  <span className="text-rose-500 select-none">−</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Collapsible>

      <Collapsible title="Architecture" count={`${project.layers.length} layers`} hint={project.architecturePattern}>
        <div className="space-y-2 pt-1">
          {project.layers.map((l) => (
            <div key={l.layer} className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5 space-y-1.5">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-400">
                <Layers size={11} /> {l.layer}
              </p>
              <p className="text-[11px] text-slate-300">{l.components.join(' · ')}</p>
              {l.invariants.map((inv, i) => (
                <p key={i} className="text-[11px] leading-relaxed text-amber-200/80 flex gap-1.5">
                  <span className="text-amber-500 select-none">▪</span>{inv}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Collapsible>

      <Collapsible title="You write vs the framework" count={`${project.frameworkVsManual.manualEngineeringRequired.length} manual`}>
        <div className="grid sm:grid-cols-2 gap-3 pt-1 text-[11px] leading-relaxed">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Framework handles</p>
            {project.frameworkVsManual.frameworkHandled.length === 0
              ? <p className="text-slate-500 italic">Nothing — no framework is permitted here.</p>
              : project.frameworkVsManual.frameworkHandled.map((f, i) => <p key={i} className="text-slate-400">{f}</p>)}
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-400">You engineer</p>
            {project.frameworkVsManual.manualEngineeringRequired.map((f, i) => <p key={i} className="text-slate-300">{f}</p>)}
          </div>
        </div>
      </Collapsible>
    </div>
  );
}
