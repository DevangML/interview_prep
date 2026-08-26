import { NavLink, useLocation } from 'react-router';
import { Sparkles, Command, LogOut, Award } from 'lucide-react';
import { NAVIGATION_PILLARS } from '../../config/navigation';
import { useStore } from '../../store';
import { useAuth } from '../../contexts/AuthContext';
import { useIsMobile } from '../../hooks/useMediaQuery';
import MobileHeader from '../mobile/layout/MobileHeader';

export default function Header() {
  const isMobile = useIsMobile();
  const { setPaletteOpen } = useStore();
  const location = useLocation();
  const { user, logout } = useAuth();

  if (isMobile) {
    return <MobileHeader />;
  }

  return (
    <header className="bg-slate-950 border-b border-slate-800 text-white shrink-0 shadow-md relative z-30">
      <div className="px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-5 flex-wrap">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-sm font-black tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-white bg-clip-text text-transparent">
              React Prep Wizard
            </span>
          </NavLink>

          <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {NAVIGATION_PILLARS.map(({ id, to, icon: Icon, label, isFlagship }) => {
              const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
              return (
                <NavLink
                  key={id}
                  to={to}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? isFlagship
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-xs'
                        : 'bg-sky-600 text-white shadow-xs'
                      : isFlagship
                      ? 'text-amber-300 hover:text-amber-200 hover:bg-amber-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon size={13} />
                  <span>{label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          {user && (
            <span className="text-[11px] text-slate-400 font-medium hidden md:inline">
              {user.email}
            </span>
          )}

          <button
            onClick={() => setPaletteOpen(true)}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-xs text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
            title="Command Palette (Cmd+K)"
          >
            <Command size={13} className="text-slate-400" />
            <span className="font-mono text-[11px]">⌘K</span>
          </button>

          <button
            onClick={logout}
            className="px-2.5 py-1 bg-slate-900 hover:bg-rose-950/40 hover:text-rose-300 border border-slate-700/60 hover:border-rose-500/40 rounded-lg text-xs text-slate-400 transition cursor-pointer flex items-center gap-1.5"
            title="Log out"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline text-[11px]">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
