import React from 'react';
import { NavLink, useLocation } from 'react-router';
import { NAVIGATION_PILLARS } from '../../../config/navigation';

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 text-white px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom">
      {NAVIGATION_PILLARS.map(({ id, to, icon: Icon, label, isFlagship }) => {
        const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
        const shortLabel = id === 'mastery' ? 'Mastery' : id === 'learn' ? 'Library' : id === 'projects' ? 'Projects' : id === 'rapid' ? 'Rapid OA' : 'Lab';

        return (
          <NavLink
            key={id}
            to={to}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 relative ${
              isActive
                ? isFlagship
                  ? 'text-amber-400 font-bold'
                  : 'text-sky-400 font-bold'
                : 'text-slate-500 hover:text-slate-300 font-medium'
            }`}
          >
            {isActive && (
              <span
                className={`absolute -top-1.5 w-6 h-0.5 rounded-full ${
                  isFlagship ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                }`}
              />
            )}
            <Icon size={17} className={isActive ? 'scale-110 transition-transform' : ''} />
            <span className="text-[10px] mt-0.5 tracking-tight">{shortLabel}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
