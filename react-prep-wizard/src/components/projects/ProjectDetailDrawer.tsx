import { useState } from 'react';
import type { ProjectBlueprint } from '../../data/projects/types';
import { X, Layers, Code, Globe, Cpu, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../../lib/sound/soundEngine';

interface Props {
  project: ProjectBlueprint;
  onClose: () => void;
}

type Tab = 'architecture' | 'explicit' | 'implicit' | 'framework';

export function ProjectDetailDrawer({ project, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('architecture');

  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-slate-800 bg-slate-950/90 shrink-0 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
              {project.realWorldAnalog}
            </span>
            <span className="text-xs text-amber-400 font-mono font-bold">+{project.xpBounty} XP</span>
          </div>
          <h2 className="text-base font-bold text-slate-100">{project.title}</h2>
        </div>

        <button
          onClick={() => { playClickSound(); onClose(); }}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-2 border-b border-slate-800 bg-slate-950 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {[
          { id: 'architecture', label: 'Architecture & Steps', icon: Layers },
          { id: 'explicit', label: 'Explicit Topics', icon: Code },
          { id: 'implicit', label: 'Implicit Foundations', icon: Globe },
          { id: 'framework', label: 'Framework vs Manual', icon: Cpu },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => { playClickSound(); setTab(t.id as Tab); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap border ${
                isActive
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon size={12} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-slate-200 text-xs">
        {tab === 'architecture' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold text-sky-300 text-sm flex items-center gap-1.5">
                <Layers size={14} /> Clean Hexagonal Architecture Layers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.layers.map((l) => (
                  <div key={l.layer} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="font-bold text-indigo-300 font-mono text-[11px]">{l.layer} Layer</span>
                    <ul className="list-disc list-inside text-slate-400 space-y-0.5 text-[11px]">
                      {l.components.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Step-by-Step Implementation Guide
              </h3>
              {project.implementationSteps.map((s) => (
                <div key={s.step} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold flex items-center justify-center font-mono">
                      {s.step}
                    </span>
                    <span className="font-bold text-slate-100 text-xs">{s.title}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed pl-7">{s.description}</p>
                  {s.codePattern && (
                    <div className="ml-7 p-2 rounded-lg bg-slate-900 font-mono text-[10px] text-sky-300 border border-slate-800">
                      <code>{s.codePattern}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'explicit' && (
          <div className="space-y-2.5">
            <h3 className="font-bold text-sky-300 text-sm">Explicit Topics & Subtopics Matrix</h3>
            <div className="space-y-2">
              {project.explicitTopics.map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sky-300">{t.topic} — {t.subtopic}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-900 text-slate-400 border border-slate-800">{t.category}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{t.howCovered}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'implicit' && (
          <div className="space-y-2.5">
            <h3 className="font-bold text-indigo-300 text-sm">Implicit Web Platform & V8 Foundations</h3>
            <div className="space-y-2">
              {project.implicitFoundations.map((f, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-100">{f.title}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">{f.domain}</span>
                  </div>
                  <p className="text-slate-300"><span className="text-slate-500 font-mono">Mechanism:</span> {f.mechanism}</p>
                  <p className="text-slate-400"><span className="text-slate-500 font-mono">Impact:</span> {f.realWorldImpact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'framework' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-400 text-xs">Framework Abstractions (Automated)</h4>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                {project.frameworkVsManual.frameworkHandled.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-400 text-xs">Manual Engineering (You Build)</h4>
              <ul className="list-disc list-inside text-slate-300 space-y-1 font-medium">
                {project.frameworkVsManual.manualEngineeringRequired.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
