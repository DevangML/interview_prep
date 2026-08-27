import { useState, useEffect } from 'react';

/**
 * React hook to listen for media query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    // Always re-read the list rather than trusting the event payload, so every
    // path below converges on the same answer.
    const sync = () => setMatches(mediaQueryList.matches);

    sync();

    mediaQueryList.addEventListener('change', sync);

    /**
     * Belt and braces. `change` is the correct signal and fires in a normal
     * browser, including DevTools device mode; this observer only exists to
     * catch viewport changes that arrive as a layout change without an event,
     * which is possible under programmatic metric overrides. It is a no-op
     * whenever `change` already fired, because `sync` is idempotent.
     */
    const ro = new ResizeObserver(sync);
    ro.observe(document.documentElement);

    return () => {
      mediaQueryList.removeEventListener('change', sync);
      ro.disconnect();
    };
  }, [query]);

  return matches;
}

/**
 * Returns true if viewport width is below standard desktop breakpoint (default 1024px).
 */
export function useIsMobile(breakpoint = 1024): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

/**
 * Returns true if viewport width is below mobile phone breakpoint (768px).
 */
export function useIsSmallPhone(breakpoint = 640): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}
