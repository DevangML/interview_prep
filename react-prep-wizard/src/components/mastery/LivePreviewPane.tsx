import React from 'react';
import type { MasteryUnit } from '../../data/masteryStream';
import Panel from '../layout/Panel';
import ResponsiveViewer from '../preview/ResponsiveViewer';
import SandboxFrame from '../preview/SandboxFrame';

interface Props {
  cur: MasteryUnit;
  compiledJs: string;
  fullCssHtml: string;
  consoleOutput: string[];
  isPortalOpen: boolean;
}

export function LivePreviewPane({
  cur,
  compiledJs,
  fullCssHtml,
  consoleOutput,
  isPortalOpen
}: Props) {
  return (
    <Panel
      title={cur.trackId === 'behavioural' ? 'Rehearsal' : cur.practice.type === 'js_snippet' ? 'Console Output' : 'Live Preview'}
      className="h-full flex flex-col border-slate-200 shadow-sm"
    >
      {cur.trackId === 'behavioural' ? (
        <div className="p-4 text-[12px] text-slate-600 leading-relaxed space-y-2">
          <p className="font-semibold text-slate-800">Write it, then say it.</p>
          <p>Fill the scaffold in the editor, then use <strong>Record your answer</strong> above.</p>
          <p className="text-slate-500">Nothing is executed here, and no audio leaves the browser.</p>
        </div>
      ) : cur.practice.type === 'css' ? (
        isPortalOpen ? (
          <ResponsiveViewer>
            <iframe title="css-preview" srcDoc={fullCssHtml} sandbox="allow-scripts allow-same-origin" className="w-full h-full border-0 bg-white" />
          </ResponsiveViewer>
        ) : (
          <div className="w-full h-full bg-white">
            <iframe title="css-preview" srcDoc={fullCssHtml} sandbox="allow-scripts allow-same-origin" className="w-full h-full border-0" />
          </div>
        )
      ) : cur.practice.type === 'js_snippet' ? (
        <div className="w-full h-full bg-[#0d1117] text-[#56d364] font-mono text-[12px] p-4 overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
          {consoleOutput.length === 0 ? <span className="text-slate-600 italic">Waiting for console output...</span> : null}
          {consoleOutput.map((log, i) => (
            <div key={i} className="mb-1.5 flex gap-2">
              <span className="text-[#8b949e] select-none">{'>'}</span>
              <span className={log.startsWith('[ERROR]') ? 'text-[#f85149]' : log.startsWith('[WARN]') ? 'text-[#d29922]' : 'text-[#e6edf3]'}>{log}</span>
            </div>
          ))}
        </div>
      ) : (
        isPortalOpen ? (
          <ResponsiveViewer>
            <SandboxFrame baseCSS="" userCSS="" jsCode={compiledJs} className="h-full w-full bg-white" />
          </ResponsiveViewer>
        ) : (
          <div className="w-full h-full bg-white">
            <SandboxFrame baseCSS="" userCSS="" jsCode={compiledJs} className="h-full w-full bg-white" />
          </div>
        )
      )}
    </Panel>
  );
}
