import { useState } from 'react';
import { PROGRAM_STAGES } from '../lib/stages';
import { XRAY_SLICES } from '../lib/xrayData';

export const XRayProbe = () => {
  const [activeSliceIdx, setActiveSliceIdx] = useState(0);
  const [activeLayer, setActiveLayer] = useState(8);

  const slice = XRAY_SLICES[activeSliceIdx] || XRAY_SLICES[0];
  const step = slice.layers[activeLayer] || slice.layers[8];
  const stageInfo = PROGRAM_STAGES.find((s) => s.number === activeLayer);

  return (
    <section className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6 space-y-5 font-chrome shadow-lg">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
              Interactive X-Ray Probe
            </span>
            <span className="text-xs text-ink-3 font-mono">Playable Explorable Explanation</span>
          </div>
          <h3 className="font-bold text-base text-ink-1 mt-1">
            Penetrate the Computing Stack · Layer 8 &rarr; Layer 1
          </h3>
          <p className="text-xs font-prose text-ink-3">
            Scrub a single line of code downward to see how high-level ergonomics lower into electrical gate states.
          </p>
        </div>

        {/* Slice Preset Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-raised border border-surface-border text-xs">
          {XRAY_SLICES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSliceIdx(idx)}
              className={`animate-spring-press px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                idx === activeSliceIdx
                  ? 'bg-axis text-white shadow-xs'
                  : 'text-ink-3 hover:text-ink-1'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Layer Penetration Scrubber Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-ink-3">Ascension &darr; Layer {activeLayer} of 8</span>
          <span className="font-bold text-axis">
            {stageInfo ? `L${stageInfo.number}: ${stageInfo.title}` : `Layer ${activeLayer}`}
          </span>
        </div>

        <div className="grid grid-cols-8 gap-1">
          {[8, 7, 6, 5, 4, 3, 2, 1].map((lvl) => {
            const st = PROGRAM_STAGES.find((s) => s.number === lvl);
            const isCurrent = lvl === activeLayer;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setActiveLayer(lvl)}
                className={`animate-spring-press p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'shadow-md ring-2 ring-axis/80 border-axis'
                    : 'border-surface-border bg-surface-raised/40 hover:bg-surface-raised text-ink-3'
                }`}
                style={{
                  backgroundColor: isCurrent ? `${st?.color}20` : undefined,
                }}
              >
                <div className="text-[10px] font-mono font-bold">L{lvl}</div>
                <div className="text-[9px] font-mono truncate hidden sm:block">
                  {st?.layerTag || `L${lvl}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep Layer Inspection Card */}
      <div className="p-4 rounded-xl border border-surface-border bg-surface-raised/60 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: stageInfo?.color || '#3b82f6' }}
            />
            <span className="font-bold text-sm text-ink-1">{step.action}</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-surface-card border border-surface-border text-ink-3">
            {step.artifactType.toUpperCase()} ARTIFACT
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[#0d1117] text-emerald-400 font-mono text-xs overflow-x-auto border border-surface-border/40 shadow-inner">
          <code>{step.artifact}</code>
        </div>

        <p className="text-xs font-prose text-ink-2 leading-relaxed">{step.detail}</p>

        <div className="flex items-center justify-between pt-2 border-t border-surface-border/60 text-xs font-mono">
          <button
            type="button"
            disabled={activeLayer >= 8}
            onClick={() => setActiveLayer((prev) => Math.min(8, prev + 1))}
            className="text-axis hover:underline disabled:opacity-30 disabled:hover:no-underline cursor-pointer flex items-center gap-1"
          >
            <span>▲ Ascend to L{Math.min(8, activeLayer + 1)}</span>
          </button>
          <span className="text-ink-3 text-[11px]">
            Code Sample: <code className="text-amber-400 font-semibold">{slice.syntax}</code>
          </span>
          <button
            type="button"
            disabled={activeLayer <= 1}
            onClick={() => setActiveLayer((prev) => Math.max(1, prev - 1))}
            className="text-axis hover:underline disabled:opacity-30 disabled:hover:no-underline cursor-pointer flex items-center gap-1"
          >
            <span>▼ Lower to L{Math.max(1, activeLayer - 1)}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
