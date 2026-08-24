import SandboxFrame from './SandboxFrame';

interface Props {
  baseCSS: string;
  /** The original CSS (the "before" / problem baseline) */
  beforeCSS: string;
  /** The CSS with the solution applied */
  afterCSS: string;
  /** The user's current CSS */
  userCSS: string;
  /** Compiled JS for all three frames */
  jsCode: string;
}

/**
 * 3-pane Before vs After vs Mine comparison.
 * Each pane is an independent SandboxFrame — no shared state,
 * no iframe reuse, no display:none lifecycle bugs.
 */
export default function CompareView({ baseCSS, beforeCSS, afterCSS, userCSS, jsCode }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 flex-1 min-h-0">
      <div className="flex flex-col min-h-0 border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-2 py-1 bg-red-50 text-red-700 text-xs font-bold border-b border-red-200">
          🔴 Problem Baseline (BEFORE)
        </div>
        <SandboxFrame baseCSS={baseCSS} userCSS={beforeCSS} jsCode={jsCode} />
      </div>
      <div className="flex flex-col min-h-0 border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold border-b border-green-200">
          🟢 Target Solution (AFTER)
        </div>
        <SandboxFrame baseCSS={baseCSS} userCSS={afterCSS} jsCode={jsCode} />
      </div>
      <div className="flex flex-col min-h-0 border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold border-b border-blue-200">
          🔵 Your Code (LIVE)
        </div>
        <SandboxFrame baseCSS={baseCSS} userCSS={userCSS} jsCode={jsCode} />
      </div>
    </div>
  );
}
