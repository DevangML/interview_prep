import { useEffect, useState } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { FrontDoor } from './FrontDoor';
import { QuestionBar } from './QuestionBar';
import { FieldManualReader } from './FieldManualReader';
import { SpecSheetMatrix } from './SpecSheetMatrix';
import { CommandPalette } from './CommandPalette';

export const AtlasShell = () => {
  const {
    isLoading,
    error,
    init,
    activeConceptId,
    goHome,
    selectConcept,
    selectStage,
    activeStageId,
    viewMode,
    commandPaletteOpen,
    setCommandPaletteOpen,
    languageCatalog,
  } = useMuseumStore();

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    init();
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, [init]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeConceptId, activeStageId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || commandPaletteOpen) return;
      if (activeConceptId) selectConcept(null);
      else if (activeStageId) selectStage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeConceptId, activeStageId, commandPaletteOpen, selectConcept, selectStage]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (typeof document !== 'undefined') {
      if (nextDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
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
    <div className="min-h-screen bg-surface-page text-ink-1 flex flex-col font-chrome transition-colors duration-200">
      {/* Global Navigation Header */}
      <header className="h-14 border-b border-surface-border bg-surface-card sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goHome}
            className="font-bold text-sm tracking-tight text-ink-1 hover:text-axis transition-colors cursor-pointer flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-xs bg-axis inline-block" />
            <span>Concept Atlas</span>
          </button>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-raised border border-surface-border text-ink-3 hidden sm:inline-block">
            v6.1.0-catalog
          </span>
        </div>

        <div className="flex items-center gap-3">
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

      {/* Main Study Surface */}
      <main className="flex-1 flex flex-col">
        {!activeConceptId ? (
          <FrontDoor />
        ) : (
          <>
            <QuestionBar />
            {viewMode === 'read' ? <FieldManualReader /> : <SpecSheetMatrix />}
          </>
        )}
      </main>

      {/* Footer with Contractual Denominator */}
      <footer className="border-t border-surface-border py-6 px-4 sm:px-6 bg-surface-card text-center text-xs text-ink-3 font-mono">
        <p>
          Canonical Evidence Layer · {languageCatalog.length} job languages · 18 authored concepts ·
          unverified cells stay unverified
        </p>
        <p className="text-[10px] text-ink-3/70 mt-1 font-prose">
          The Atlas is an evidence reader for computer science trade-offs, not an authority oracle.
        </p>
      </footer>

      {/* ⌘K Global Command Palette */}
      <CommandPalette />
    </div>
  );
};
