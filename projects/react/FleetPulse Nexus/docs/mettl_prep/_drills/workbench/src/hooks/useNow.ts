import { useEffect, useState } from 'react';

/**
 * A clock the render can read. Due dates change with wall time, and calling
 * Date.now() during render is impure — so the time ticks in state instead.
 */
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}
