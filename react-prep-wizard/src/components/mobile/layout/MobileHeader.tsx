import React from 'react';
import { NavLink } from 'react-router';
import { Sparkles, Command, LogOut, Bot } from 'lucide-react';
import { useStore } from '../../../store';
import { useAuth } from '../../../contexts/AuthContext';

export default function MobileHeader() {
  const { setPaletteOpen } = useStore();
  const { user, logout } = useAuth();

  const handleTriggerAi = () => {
    window.dispatchEvent(new CustomEvent('toggle-universal-ai'));
  };

  return (
    <header className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shrink-0 sticky top-0 z-40 px-3.5 py-2.5 flex items-center justify-between gap-2">
      <NavLink to="/" className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-xs">
          <Sparkles size={12} className="text-white" />
        </div>
        <span className="text-xs font-black tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-white bg-clip-text text-transparent">
          React Prep Wizard
        </span>
      </NavLink>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handleTriggerAi}
          className="p-1.5 bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
          title="Ask AI Oracle"
        >
          <Bot size={13} />
          <span className="text-[10px] font-black">AI</span>
        </button>

        <button
          onClick={() => setPaletteOpen(true)}
          className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 text-xs flex items-center transition cursor-pointer"
          title="Command Palette"
        >
          <Command size={13} />
        </button>

        <button
          onClick={logout}
          className="p-1.5 bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 rounded-lg text-xs transition cursor-pointer"
          title="Log out"
        >
          <LogOut size={13} />
        </button>
      </div>
    </header>
  );
}
