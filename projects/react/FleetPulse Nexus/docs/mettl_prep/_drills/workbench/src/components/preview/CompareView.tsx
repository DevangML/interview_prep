import SandboxFrame from './SandboxFrame';

interface Props {
  baseCSS: string;
  /** The original CSS (the "before" / problem baseline) */
  beforeCSS: string;
  /** The CSS with the solution applied */
  afterCSS: string;
  /** The user's current CSS */
  userCSS: string;
  /** Compiled JS from the user's editor — drives the "mine" pane */
  jsCode: string;
  /** Compiled reference markup — drives before/after so they render even
   *  while the user's component.jsx is still an empty TODO fragment. */
  referenceJsCode?: string;
}

/**
 * 3-pane Before vs After vs Mine comparison.
 * Each pane is an independent SandboxFrame — no shared state,
 * no iframe reuse, no display:none lifecycle bugs.
 */
export default function CompareView({
  baseCSS, beforeCSS, afterCSS, userCSS, jsCode, referenceJsCode,
}: Props) {
  const ref = referenceJsCode || jsCode;
  return (
    <div className="grid grid-cols-3 gap-2 flex-1 min-h-0 h-full">
      <div className="flex flex-col min-h-0 border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-2 py-1 bg-red-50 text-red-700 text-xs font-bold border-b border-red-200 shrink-0">
          🔴 Problem Baseline (BEFORE)
        </div>
        <SandboxFrame baseCSS={baseCSS} userCSS={beforeCSS} jsCode={ref} />
      </div>
      <div className="flex flex-col min-h-0 border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold border-b border-green-200 shrink-0">
          🟢 Target Solution (AFTER)
        </div>
        <SandboxFrame baseCSS={baseCSS} userCSS={afterCSS} jsCode={ref} />
      </div>
      <div className="flex flex-col min-h-0 border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold border-b border-blue-200 shrink-0">
          🔵 Your Code (LIVE)
        </div>
        <SandboxFrame baseCSS={baseCSS} userCSS={userCSS} jsCode={jsCode} />
      </div>
    </div>
  );
}
