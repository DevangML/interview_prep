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
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
      return () => mediaQueryList.removeEventListener('change', listener);
    } else {
      // Fallback for older browsers
      (mediaQueryList as any).addListener(listener);
      return () => (mediaQueryList as any).removeListener(listener);
    }
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
