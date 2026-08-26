import { useState, useEffect, useDeferredValue } from 'react';
import { PanelGroup, Panel as ResizablePanel, PanelResizeHandle } from 'react-resizable-panels';
import { useCompiler } from '../hooks/useCompiler';
import { useFormatter } from '../hooks/useFormatter';
import Panel from '../components/layout/Panel';
import FileTabs from '../components/editor/FileTabs';
import CodeEditor from '../components/editor/CodeEditor';
import SandboxFrame from '../components/preview/SandboxFrame';
import ResponsiveViewer from '../components/preview/ResponsiveViewer';
import PaneBoundary from '../components/layout/PaneBoundary';
import { Sparkles, RotateCcw, Bot, Cpu } from 'lucide-react';
import UniversalAiAssistant from '../components/socratic/UniversalAiAssistant';
import { useSocraticAi } from '../hooks/useSocraticAi';
import { useIsMobile } from '../hooks/useMediaQuery';
import MobilePlaygroundView from '../components/mobile/playground/MobilePlaygroundView';
import { NeuralMindTrigger } from '../components/socratic/NeuralMindTrigger';

const DEFAULT_JSX = `import React, { useState } from 'react';

export default function PricingCalculator() {
  const [tier, setTier] = useState('pro');
  const [seats, setSeats] = useState(5);
  const [annual, setAnnual] = useState(true);

  const rate = tier === 'starter' ? 12 : tier === 'pro' ? 29 : 79;
  const discount = annual ? 0.8 : 1.0;
  const total = Math.round(seats * rate * discount);

  return (
    <div className="pricing-card">
      <h2>Team Subscription</h2>
      <div className="tier-select">
        {['starter', 'pro', 'enterprise'].map((t) => (
          <button
            key={t}
            className={tier === t ? 'active' : ''}
            onClick={() => setTier(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="slider-row">
        <label>Seats: <strong>{seats}</strong></label>
        <input
          type="range" min="1" max="50"
          value={seats} onChange={(e) => setSeats(+e.target.value)}
        />
      </div>
      <div className="toggle-row">
        <label>
          <input
            type="checkbox" checked={annual}
            onChange={(e) => setAnnual(e.target.checked)}
          />
          Annual Billing (20% Off)
        </label>
      </div>
      <div className="price-display">
        <span className="amount">\${total}</span>
        <span className="period">/ month</span>
      </div>
    </div>
  );
}`;

const DEFAULT_CSS = `.pricing-card {
  max-width: 360px;
  margin: 20px auto;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  font-family: system-ui, sans-serif;
}
.pricing-card h2 { margin: 0 0 16px; font-size: 1.25rem; }
.tier-select { display: flex; gap: 6px; margin-bottom: 16px; }
.tier-select button {
  flex: 1; padding: 6px 0; border: 1px solid #cbd5e1;
  background: #f8fafc; border-radius: 6px; font-weight: 600; font-size: 0.75rem; cursor: pointer;
}
.tier-select button.active { background: #0284c7; color: white; border-color: #0284c7; }
.slider-row { margin-bottom: 16px; }
.slider-row input { width: 100%; margin-top: 6px; accent-color: #0284c7; }
.toggle-row { margin-bottom: 20px; font-size: 0.85rem; }
.price-display { display: flex; align-items: baseline; gap: 6px; }
.price-display .amount { font-size: 2rem; font-weight: 800; color: #0f172a; }
.price-display .period { font-size: 0.85rem; color: #64748b; }`;

import { CloudSyncService } from '../lib/storage/cloudSyncService';

export default function PlaygroundPage() {
  const [jsxCode, setJsxCode] = useState(() => localStorage.getItem('playground:jsx') || DEFAULT_JSX);
  const [cssCode, setCssCode] = useState(() => localStorage.getItem('playground:css') || DEFAULT_CSS);
  const [appCss, setAppCss] = useState('');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>(() => (localStorage.getItem('playground:tab') as 'jsx' | 'css') || 'jsx');
  const [compiledJs, setCompiledJs] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  const { isReady, chatWithMentor } = useSocraticAi();
  const { compile } = useCompiler();
  const { formatCSS, formatJSX } = useFormatter();

  useEffect(() => {
    localStorage.setItem('playground:jsx', jsxCode);
    localStorage.setItem('playground:css', cssCode);
    localStorage.setItem('playground:tab', activeTab);
    const timeout = setTimeout(() => {
      CloudSyncService.savePlayground(jsxCode, cssCode, activeTab);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [jsxCode, cssCode, activeTab]);

  // Listen to cloud state hydration from Neon DB
  useEffect(() => {
    const handleHydrated = (e: Event) => {
      const customEvent = e as CustomEvent;
      const cloud = customEvent.detail;
      if (cloud?.playground?.jsx) setJsxCode(cloud.playground.jsx);
      if (cloud?.playground?.css) setCssCode(cloud.playground.css);
      if (cloud?.playground?.tab) setActiveTab(cloud.playground.tab);
    };
    window.addEventListener('cloud-state-hydrated', handleHydrated);
    return () => window.removeEventListener('cloud-state-hydrated', handleHydrated);
  }, []);

  useEffect(() => {
    const handleToggle = () => setIsAiAssistantOpen(prev => !prev);
    window.addEventListener('toggle-universal-ai', handleToggle);
    return () => window.removeEventListener('toggle-universal-ai', handleToggle);
  }, []);


  const handleFormat = async () => {
    if (activeTab === 'jsx') {
      const { code } = await formatJSX(jsxCode);
      if (code) setJsxCode(code);
    } else {
      const { code } = await formatCSS(cssCode);
      if (code) setCssCode(code);
    }
  };

  useEffect(() => {
    fetch('/app.css').then((r) => r.text()).then(setAppCss).catch(() => {});
  }, []);

  const deferredJsx = useDeferredValue(jsxCode);
  useEffect(() => {
    compile(deferredJsx).then((res) => {
      if (res.error) setError(res.error);
      else { setError(null); setCompiledJs(res.code || ''); }
    });
  }, [deferredJsx, compile]);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-950 p-2 relative">
      {isMobile ? (
        <MobilePlaygroundView
          jsxCode={jsxCode}
          cssCode={cssCode}
          compiledJs={compiledJs}
          appCss={appCss}
          error={error}
          activeFileTab={activeTab}
          onSelectFileTab={setActiveTab}
          onJsxChange={setJsxCode}
          onCssChange={setCssCode}
          onFormat={handleFormat}
          onReset={() => { setJsxCode(DEFAULT_JSX); setCssCode(DEFAULT_CSS); }}
          onOpenAi={() => setIsAiAssistantOpen(true)}
        />
      ) : (
        <main className="flex-1 min-h-0">
          <PanelGroup direction="horizontal" className="h-full w-full gap-2">
            <ResizablePanel defaultSize={50} minSize={20}>
              <PaneBoundary name="Playground Editor">
                <Panel
                  title="Playground Scratchpad"
                actions={
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsAiAssistantOpen(true)}
                      className="px-2 py-0.5 text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition shadow-xs"
                      title="Open AI Code Copilot"
                    >
                      <Cpu size={11} /> <span>AI Copilot</span>
                    </button>
                    <button onClick={handleFormat} className="px-2 py-0.5 text-xs bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition">
                      <Sparkles size={11} className="text-sky-400" /> <span>Format</span>
                    </button>
                    <button onClick={() => { setJsxCode(DEFAULT_JSX); setCssCode(DEFAULT_CSS); }} className="px-2 py-0.5 text-xs bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition">
                      <RotateCcw size={11} /> <span>Reset</span>
                    </button>
                  </div>
                }
                className="h-full flex flex-col border-slate-800 bg-slate-900 text-slate-200"
              >
                <FileTabs
                  tabs={[
                    { key: 'jsx', label: 'component.jsx' },
                    { key: 'css', label: 'styles.css' },
                  ]}
                  active={activeTab}
                  onSelect={(t) => setActiveTab(t as any)}
                />
                {activeTab === 'jsx' && <CodeEditor value={jsxCode} onChange={setJsxCode} onFormat={handleFormat} lang="jsx" autoFocus />}
                {activeTab === 'css' && <CodeEditor value={cssCode} onChange={setCssCode} onFormat={handleFormat} lang="css" />}
              </Panel>
            </PaneBoundary>
          </ResizablePanel>

          <PanelResizeHandle className="w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10" />

          <ResizablePanel defaultSize={50} minSize={20}>
            <PaneBoundary name="Playground Execution">
              <Panel title="Live React 19 Execution" className="h-full flex flex-col relative border-slate-800 bg-slate-900 text-slate-200">
                <ResponsiveViewer>
                  <SandboxFrame baseCSS={appCss} userCSS={cssCode} jsCode={compiledJs} />
                </ResponsiveViewer>
                {error && (
                  <div className="px-3 py-2 bg-rose-950/90 border-t border-rose-800/80 text-rose-300 text-xs font-mono shrink-0 flex items-center justify-between gap-2 flex-wrap">
                    <div className="min-w-0 flex-1 truncate">
                      Compilation Error: {error}
                    </div>
                    <button
                      onClick={() => setIsAiAssistantOpen(true)}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition shadow-xs shrink-0"
                    >
                      <Cpu size={12} />
                      <span>Diagnose with AI</span>
                    </button>
                  </div>
                )}
              </Panel>
            </PaneBoundary>
          </ResizablePanel>
        </PanelGroup>
      </main>
      )}

      {/* Ambient Neural Mind Trigger (Desktop) */}
      {!isMobile && (
        <NeuralMindTrigger
          isOpen={isAiAssistantOpen}
          onToggle={() => setIsAiAssistantOpen(prev => !prev)}
          isAiReady={isReady}
          badgeLabel="React AST & Compiler Copilot"
          contextType="sandbox"
        />
      )}

      {/* Universal AI Assistant Drawer */}
      <UniversalAiAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        contextType="sandbox"
        sandboxContext={{
          jsxCode,
          cssCode,
          error,
          onApplyCode: (newJsx, newCss) => {
            if (newJsx) setJsxCode(newJsx);
            if (newCss) setCssCode(newCss);
          }
        }}
        chatWithMentor={chatWithMentor}
        isAiReady={isReady}
      />
    </div>
  );
}

