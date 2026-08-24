import { NavLink } from 'react-router';
import { Home, LayoutGrid, Swords, Code2, GraduationCap, Play, Target, Puzzle, Zap, Sparkles, Command } from 'lucide-react';
import { useStore } from '../../store';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/css100', icon: LayoutGrid, label: 'CSS 100' },
  { to: '/arena', icon: Swords, label: 'Arena' },
  { to: '/challenges', icon: Code2, label: 'Challenges' },
  { to: '/ladder', icon: GraduationCap, label: 'Ladder' },
  { to: '/playground', icon: Play, label: 'Playground' },
  { to: '/targets', icon: Target, label: 'Targets' },
  { to: '/match', icon: Puzzle, label: 'Match' },
  { to: '/rapid', icon: Zap, label: 'Rapid' },
] as const;

export default function Header() {
  const { setPaletteOpen } = useStore();

  return (
    <header className="bg-slate-950 border-b border-slate-800 text-white px-4 py-2 flex items-center justify-between gap-3 flex-wrap shrink-0 shadow-sm relative z-30">
      <div className="flex items-center gap-3 flex-wrap">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles size={13} className="text-white" />
          </div>
          <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-white bg-clip-text text-transparent">
            React Prep Wizard
          </span>
        </NavLink>

        <nav className="flex gap-1 flex-wrap ml-2">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200
                 ${isActive
                   ? 'bg-sky-600 text-white shadow-xs hdr-glow-brand'
                   : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`
              }
            >
              <Icon size={13} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setPaletteOpen(true)}
          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-[0.7rem] text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Open Command Palette (Cmd+K)"
        >
          <Command size={11} className="text-slate-400" />
          <span className="font-mono">⌘K</span>
        </button>
      </div>
    </header>
  );
}
