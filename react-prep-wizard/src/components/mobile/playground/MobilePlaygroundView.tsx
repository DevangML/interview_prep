import React, { useState } from 'react';
import { Code2, Eye, Sparkles, RotateCcw, Cpu } from 'lucide-react';
import FileTabs from '../../editor/FileTabs';
import CodeEditor from '../../editor/CodeEditor';
import SandboxFrame from '../../preview/SandboxFrame';
import ResponsiveViewer from '../../preview/ResponsiveViewer';
import KeyboardAccessoryBar from '../common/KeyboardAccessoryBar';
import { haptic } from '../common/HapticEngine';

interface Props {
  jsxCode: string;
  cssCode: string;
  compiledJs: string;
  appCss: string;
  error: string | null;
  activeFileTab: 'jsx' | 'css';
  onSelectFileTab: (tab: 'jsx' | 'css') => void;
  onJsxChange: (val: string) => void;
  onCssChange: (val: string) => void;
  onFormat: () => Promise<void>;
  onReset: () => void;
  onOpenAi: () => void;
}

export default function MobilePlaygroundView({
  jsxCode,
  cssCode,
  compiledJs,
  appCss,
  error,
  activeFileTab,
  onSelectFileTab,
  onJsxChange,
  onCssChange,
  onFormat,
  onReset,
  onOpenAi,
}: Props) {
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  const handleInsertSnippet = (snippet: string) => {
    if (activeFileTab === 'jsx') {
      onJsxChange(jsxCode + snippet);
    } else {
      onCssChange(cssCode + snippet);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Mobile Ergonomic Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-2.5 shrink-0 space-y-2 select-none">
        <div className="flex items-center justify-between gap-2">
          <div className="flex bg-slate-950 p-0.5 rounded-xl border border-slate-800 flex-1">
            <button
              onClick={() => {
                haptic.selection();
                setMobileTab('editor');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === 'editor'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 size={13} />
              <span>Editor</span>
            </button>
            <button
              onClick={() => {
                haptic.selection();
                setMobileTab('preview');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === 'preview'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye size={13} />
              <span>Live Preview</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                haptic.impactLight();
                onOpenAi();
              }}
              className="p-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs active:scale-95 transition"
              title="AI Copilot"
            >
              <Cpu size={13} />
            </button>
            <button
              onClick={async () => {
                haptic.selection();
                await onFormat();
              }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
              title="Format Code"
            >
              <Sparkles size={13} className="text-sky-400" />
            </button>
            <button
              onClick={() => {
                haptic.impactMedium();
                onReset();
              }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
              title="Reset Sandbox"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sandbox Area */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2">
        {mobileTab === 'editor' ? (
          <div className="h-full flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
            <FileTabs
              tabs={[
                { key: 'jsx', label: 'component.jsx' },
                { key: 'css', label: 'styles.css' },
              ]}
              active={activeFileTab}
              onSelect={(t) => {
                haptic.selection();
                onSelectFileTab(t as any);
              }}
            />
            <div className="flex-1 min-h-0">
              {activeFileTab === 'jsx' && (
                <CodeEditor value={jsxCode} onChange={onJsxChange} onFormat={onFormat} lang="jsx" autoFocus />
              )}
              {activeFileTab === 'css' && (
                <CodeEditor value={cssCode} onChange={onCssChange} onFormat={onFormat} lang="css" />
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
            <div className="flex-1 min-h-0">
              <ResponsiveViewer>
                <SandboxFrame baseCSS={appCss} userCSS={cssCode} jsCode={compiledJs} />
              </ResponsiveViewer>
            </div>
            {error && (
              <div className="p-3 bg-rose-950/90 border-t border-rose-800/80 text-rose-300 text-xs font-mono shrink-0 flex items-center justify-between gap-2">
                <span className="truncate flex-1">{error}</span>
                <button
                  onClick={() => {
                    haptic.impactMedium();
                    onOpenAi();
                  }}
                  className="px-2 py-1 rounded bg-rose-600 text-white font-bold text-[11px] shrink-0"
                >
                  Diagnose
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Keyboard Accessory Bar (Active in Editor Mode) */}
      {mobileTab === 'editor' && (
        <KeyboardAccessoryBar
          onInsertText={handleInsertSnippet}
          customSnippets={
            activeFileTab === 'jsx'
              ? [
                  { label: 'useState', snippet: 'const [state, setState] = useState();' },
                  { label: 'useEffect', snippet: 'useEffect(() => {\n  \n}, []);' },
                  { label: '<div>', snippet: '<div></div>' },
                  { label: 'return', snippet: 'return (\n  \n);' },
                  { label: 'const', snippet: 'const ' },
                  { label: '=>', snippet: ' => ' },
                ]
              : [
                  { label: 'display: flex', snippet: 'display: flex;\n' },
                  { label: 'padding', snippet: 'padding: 16px;\n' },
                  { label: 'margin', snippet: 'margin: 0 auto;\n' },
                  { label: 'border-radius', snippet: 'border-radius: 12px;\n' },
                  { label: 'background', snippet: 'background: #0f172a;\n' },
                ]
          }
        />
      )}
    </div>
  );
}
