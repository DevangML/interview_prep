import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { FrontDoor } from './FrontDoor';
import { QuestionBar } from './QuestionBar';
import { FieldManualReader } from './FieldManualReader';
import { HeaderMediaPill } from './HeaderMediaPill';
import { AmbientCinemaDock } from './AmbientCinemaDock';
import { ComputingElevator } from './ComputingElevator';
import { VideoSwitchPrompt } from './VideoSwitchPrompt';

const SpecSheetMatrix = lazy(() => import('./SpecSheetMatrix').then((m) => ({ default: m.SpecSheetMatrix })));
const CommandPalette = lazy(() => import('./CommandPalette').then((m) => ({ default: m.CommandPalette })));

import { useKeyboardShortcuts } from '../lib/useKeyboardShortcuts';

export const AtlasShell = () => {
  const {
    isLoading,
    error,
    init,
    activeConceptId,
    goHome,
    viewMode,
    setCommandPaletteOpen,
    languageCatalog,
  } = useMuseumStore();

  const [isDark, setIsDark] = useState(false);
  const contentScrollRef = useRef<HTMLDivElement>(null);

  useKeyboardShortcuts();

  useEffect(() => {
    init();
    if (typeof window !== 'undefined') {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, [init]);

  useEffect(() => {
    if (contentScrollRef.current) contentScrollRef.current.scrollTop = 0;
  }, [activeConceptId]);


  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', nextDark);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-page text-ink-1 flex items-center justify-center p-6 font-chrome">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-surface-border-strong border-t-axis rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono tracking-wider text-ink-3">
            Loading Cross-Language Concept Atlas...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-page text-ink-1 flex items-center justify-center p-6 font-chrome">
        <div className="max-w-md p-6 rounded-2xl border border-coverage-absent/40 bg-coverage-absent/10 text-center space-y-2">
          <h2 className="font-bold text-sm text-coverage-absent">Data Loading Failure</h2>
          <p className="text-xs text-ink-2 font-prose">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-surface-page text-ink-1 flex flex-col font-chrome transition-colors duration-200">
      {/* Global Navigation Header */}
      <header className="h-14 border-b border-surface-border bg-surface-card shrink-0 z-40 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={goHome}
            className="font-bold text-sm tracking-tight text-ink-1 hover:text-axis transition-colors cursor-pointer flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-xs bg-axis inline-block" />
            <span>Concept Atlas</span>
          </button>
          <button
            type="button"
            onClick={goHome}
            title="Go to Home (0)"
            className="animate-spring-press px-2 py-1 rounded-lg bg-surface-raised hover:bg-axis/15 border border-surface-border hover:border-axis/40 text-xs font-mono text-ink-2 hover:text-axis transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>🏠</span>
            <span className="font-semibold text-[11px]">Home</span>
            <kbd className="text-[9px] font-mono bg-surface-card border border-surface-border px-1 rounded text-ink-3 hidden sm:inline">0</kbd>
          </button>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-raised border border-surface-border text-ink-3 hidden md:inline-block">
            v6.2.0-cockpit
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Omnipresent Header Media Telemetry */}
          <HeaderMediaPill />

          <span className="text-[10px] font-mono text-ink-3 hidden lg:inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-surface-raised border border-surface-border">
            <kbd className="bg-surface-card px-1 py-0.5 rounded border border-surface-border font-bold text-ink-2">1-9</kbd> Pillars
            <span className="text-ink-3/40">·</span>
            <kbd className="bg-surface-card px-1 py-0.5 rounded border border-surface-border font-bold text-ink-2">0</kbd> Home
          </span>

          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-border bg-surface-raised text-xs text-ink-3 hover:text-ink-1 hover:border-surface-border-strong transition-all cursor-pointer"
            aria-label="Search atlas"
          >
            <span>Search concepts...</span>
            <kbd className="font-mono text-[10px] bg-surface-card border border-surface-border px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-surface-border text-ink-3 hover:text-ink-1 hover:bg-surface-raised text-xs cursor-pointer"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Main Study Cockpit Surface */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
        {!activeConceptId ? (
          <FrontDoor />
        ) : (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <QuestionBar />
            <div ref={contentScrollRef} className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
              {viewMode === 'read' ? (
                <FieldManualReader />
              ) : (
                <Suspense
                  fallback={
                    <div className="flex-1 flex items-center justify-center p-12 text-xs font-mono text-ink-3">
                      Loading matrix...
                    </div>
                  }
                >
                  <SpecSheetMatrix />
                </Suspense>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Pinned Telemetry Status Strip */}
      <footer className="h-7 shrink-0 border-t border-surface-border bg-surface-card px-4 flex items-center justify-between text-[11px] font-mono text-ink-3 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span>Canonical Evidence Layer</span>
          <span className="text-surface-border-strong">·</span>
          <span>14 Continuum Pillars</span>
          <span className="text-surface-border-strong">·</span>
          <span>{languageCatalog.length} 2026 Job Languages</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>Unverified cells stay unverified</span>
          <span className="text-surface-border-strong">·</span>
          <span className="text-ink-3/70">Trade-Off Evidence Engine</span>
        </div>
      </footer>

      {/* Persistent Ambient Cinema Singleton (Picture-in-Picture Engine) */}
      <AmbientCinemaDock />

      {/* Polite Video Switch Proposal Prompt */}
      <VideoSwitchPrompt />

      {/* Omnipresent 8-Layer Computing Elevator */}
      <ComputingElevator />

      {/* ⌘K Global Command Palette */}
      <Suspense fallback={null}>
        <CommandPalette />
      </Suspense>
    </div>
  );
};
