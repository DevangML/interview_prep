import { useEffect, useMemo } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router';
import Header from './components/layout/Header';
import { useAuth } from './contexts/AuthContext';
import { useStore } from './store';
import CommandPalette, { type PaletteAction } from './components/shared/CommandPalette';
import { MASTERY_UNITS } from './data/masteryStream';

export default function App() {
  const { user, isLoading } = useAuth();
  const { paletteOpen, setPaletteOpen, vimMode, toggleVimMode, suggestionsOn, toggleSuggestions } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
    };
    const handleRejection = (e: PromiseRejectionEvent) => {
      if (
        e.reason &&
        typeof e.reason.message === 'string' &&
        e.reason.message.includes('message channel closed before a response was received')
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('unhandledrejection', handleRejection);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [paletteOpen, setPaletteOpen]);

  const paletteActions = useMemo<PaletteAction[]>(() => {
    const actions: PaletteAction[] = [
      {
        id: 'nav-mastery',
        label: 'Go to Interview Mastery Cockpit',
        group: 'Navigation',
        hint: 'Home',
        run: () => navigate('/'),
      },
      {
        id: 'nav-rapid-fire',
        label: 'Go to Rapid Fire Assessment',
        group: 'Navigation',
        hint: 'Sprint',
        run: () => navigate('/rapid-fire'),
      },
      {
        id: 'nav-playground',
        label: 'Go to Code Playground',
        group: 'Navigation',
        hint: 'Sandbox',
        run: () => navigate('/playground'),
      },
      {
        id: 'toggle-vim',
        label: `Toggle Vim Mode (${vimMode ? 'Active' : 'Disabled'})`,
        group: 'Settings',
        hint: ':w',
        run: () => toggleVimMode(),
      },
      {
        id: 'toggle-suggestions',
        label: `Toggle LSP Suggestions (${suggestionsOn ? 'Active' : 'Disabled'})`,
        group: 'Settings',
        hint: 'LSP',
        run: () => toggleSuggestions(),
      },
      ...MASTERY_UNITS.map((u) => ({
        id: `unit-${u.id}`,
        label: `${u.title} [${u.level}]`,
        group: u.trackName,
        hint: u.category,
        run: () => {
          localStorage.setItem('mastery:activeUnit', u.id);
          window.dispatchEvent(new CustomEvent('mastery:selectUnit', { detail: u.id }));
          navigate(`/?unit=${encodeURIComponent(u.id)}`);
        },
      })),
    ];
    return actions;
  }, [navigate, vimMode, toggleVimMode, suggestionsOn, toggleSuggestions]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100">
      <Header />
      <Outlet />
      {paletteOpen && (
        <CommandPalette onClose={() => setPaletteOpen(false)} actions={paletteActions} />
      )}
    </div>
  );
}
