/**
 * Centralized Design & Wide-Gamut Display-P3 Color Tokens
 * Implements 2026 HDR / Display-P3 colors with seamless sRGB fallbacks.
 */

export const p3Colors = {
  brand: 'var(--hdr-brand, #0284c7)',
  accent: 'var(--hdr-accent, #6366f1)',
  success: 'var(--hdr-success, #10b981)',
  warning: 'var(--hdr-warning, #f59e0b)',
  danger: 'var(--hdr-danger, #ef4444)',
  neon: 'var(--hdr-neon, #06b6d4)',
  
  // High Gamut Hex / Display-P3 references for SVG/Canvas
  svg: {
    brand: '#0284c7',
    brandGlow: '#38bdf8',
    success: '#059669',
    successGlow: '#34d399',
    accent: '#4f46e5',
    accentGlow: '#818cf8',
    warning: '#d97706',
    warningGlow: '#fbbf24',
    danger: '#e11d48',
    dangerGlow: '#f43f5e',
    background: '#020617',
    panelBg: '#0f172a',
    border: '#1e293b',
    borderLight: '#334155',
    textMuted: '#64748b',
    textLight: '#94a3b8',
    textBright: '#f8fafc',
  }
} as const;

export const themeBadges = {
  valid: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-xs',
  review: 'bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs',
  error: 'bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-xs',
  info: 'bg-sky-950/80 text-sky-300 border border-sky-500/40 shadow-xs',
  indigo: 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 shadow-xs',
  neutral: 'bg-slate-900 text-slate-300 border border-slate-700/60',
} as const;

export const themeButtons = {
  primary: 'bg-sky-600 hover:bg-sky-500 text-white font-bold transition shadow-xs cursor-pointer',
  secondary: 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold transition cursor-pointer',
  accent: 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-xs cursor-pointer',
  success: 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-xs cursor-pointer',
  danger: 'bg-rose-600 hover:bg-rose-500 text-white font-bold transition shadow-xs cursor-pointer',
  gold: 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black shadow-lg transition cursor-pointer',
} as const;

export const themePanels = {
  glassDark: 'bg-slate-950/90 border border-slate-800/80 backdrop-blur-md text-slate-200',
  glassCard: 'bg-slate-900/90 border border-slate-700/70 backdrop-blur-sm text-slate-100',
  elevated: 'bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl',
} as const;
