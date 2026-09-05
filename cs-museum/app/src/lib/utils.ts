import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function triggerCelebrationConfetti() {
  if (typeof window === 'undefined') return;

  confetti({
    particleCount: 45,
    spread: 60,
    origin: { y: 0.85, x: 0.5 },
    colors: ['#f59e0b', '#06b6d4', '#10b981', '#a855f7'],
    disableForReducedMotion: true,
  });
}
