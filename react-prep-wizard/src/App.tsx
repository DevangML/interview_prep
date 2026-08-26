import { useEffect, useMemo } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router';
import Header from './components/layout/Header';
import { useAuth } from './contexts/AuthContext';
import { useStore } from './store';
import CommandPalette, { type PaletteAction } from './components/shared/CommandPalette';
import { MASTERY_UNITS } from './data/masteryStream';

export default function App() {
  const { user, isLoading, authError } = useAuth();
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
        id: 'nav-learn',
        label: 'Go to Library & Skill Tree',
        group: 'Navigation',
        hint: 'Learn',
        run: () => navigate('/learn'),
      },
      {
        id: 'nav-projects',
        label: 'Go to Tier-1 Project Ideas & Architecture',
        group: 'Navigation',
        hint: 'Projects',
        run: () => navigate('/projects'),
      },
      {
        id: 'nav-rapid-fire',
        label: 'Go to Rapid Fire OA',
        group: 'Navigation',
        hint: 'Sprint',
        run: () => navigate('/rapid'),
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
      {
        id: 'open-ai-oracle',
        label: 'Open Universal AI Oracle & Socratic Mentor',
        group: 'AI Tools',
        hint: 'AI',
        run: () => {
          window.dispatchEvent(new CustomEvent('toggle-universal-ai'));
        },
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

  // A session that could not be *verified* is not a session that was rejected.
  // Bouncing to the login form here would ask the user to re-authenticate
  // against the very server that just failed to answer.
  if (!user && authError) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 p-6">
        <div role="alert" className="max-w-sm space-y-3 text-center">
          <h1 className="text-sm font-bold text-rose-300">Cannot reach the server</h1>
          <p className="text-xs leading-relaxed text-slate-400">{authError}</p>
          <p className="text-[11px] text-slate-500">
            Your session has been kept. Start the API, then reload.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition"
          >
            Retry
          </button>
        </div>
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
