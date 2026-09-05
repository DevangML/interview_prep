import type { LangTelemetry } from '../store/types';

interface Props {
  telemetry: LangTelemetry;
  activeLanguage: string | null;
}

export const TelemetryBar = ({ telemetry, activeLanguage }: Props) => {
  return (
    <div className="flex items-center justify-between font-chrome">
      <p className="text-[11px] font-mono uppercase tracking-widest text-ink-3 font-semibold">
        Zoom 3 of 3 · {activeLanguage || 'Concept Deep Spec'}
      </p>
      <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
        <span className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold">
          {telemetry.runtimeOverhead}
        </span>
        <span className="px-2 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
          {telemetry.cacheLocality}
        </span>
        <span className="px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400">
          {telemetry.cognitiveLoad}
        </span>
      </div>
    </div>
  );
};
