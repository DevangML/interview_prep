import { NavLink, useLocation } from 'react-router';
import { Sparkles, Command, LogOut } from 'lucide-react';
import { NAVIGATION_PILLARS } from '../../config/navigation';
import { useStore } from '../../store';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { setPaletteOpen } = useStore();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-950 border-b border-slate-800 text-white shrink-0 shadow-sm relative z-30">
      <div className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-6 flex-wrap">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-white bg-clip-text text-transparent">
              React Prep Wizard
            </span>
          </NavLink>

          <nav className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/80">
            {NAVIGATION_PILLARS.map(({ id, to, icon: Icon, label, isFlagship }) => {
              const isActive = to === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(to);
                
              return (
                <NavLink
                  key={id}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200
                    ${isFlagship && !isActive ? 'text-amber-300 hover:text-amber-200 hover:bg-amber-500/10' : ''}
                    ${isActive
                      ? isFlagship
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-sky-600 text-white shadow-xs hdr-glow-brand'
                      : !isFlagship ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' : ''}`}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <span className="text-xs text-slate-400 font-medium mr-2">
              {user.email}
            </span>
          )}
          <button
            onClick={() => setPaletteOpen(true)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-xs text-slate-300 flex items-center gap-2 transition-colors cursor-pointer"
            title="Open Command Palette (Cmd+K)"
          >
            <Command size={14} className="text-slate-400" />
            <span className="font-mono hidden sm:inline">⌘K Search</span>
          </button>
          
          <button
            onClick={logout}
            className="px-3 py-1.5 bg-slate-900 hover:bg-rose-900/30 hover:text-rose-400 border border-slate-700/60 hover:border-rose-500/30 rounded-lg text-xs text-slate-300 flex items-center gap-2 transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
