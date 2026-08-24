import { useEffect, useRef, useCallback } from 'react';

/**
 * Countdown timer hook — ticks every second when active.
 */
export function useTimer(
  active: boolean,
  seconds: number,
  onTick: () => void,
  onExpire: () => void,
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    clear();
    if (!active) return;

    intervalRef.current = setInterval(() => {
      onTick();
    }, 1000);

    return clear;
  }, [active, clear, onTick]);

  useEffect(() => {
    if (active && seconds <= 0) {
      clear();
      onExpire();
    }
  }, [active, seconds, clear, onExpire]);
}
