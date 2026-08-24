import { NavLink } from 'react-router';
import { Home, LayoutGrid, Swords, Code2, GraduationCap, Play, Target, Puzzle, Zap } from 'lucide-react';

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
  return (
    <header className="bg-slate-900 text-white px-4 py-2 flex items-center gap-1 flex-wrap shrink-0">
      <h1 className="text-sm font-bold mr-3">React Workbench</h1>
      <nav className="flex gap-0.5 flex-wrap">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors
               ${isActive
                 ? 'bg-sky-700 text-white'
                 : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`
            }
          >
            <Icon size={13} />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
