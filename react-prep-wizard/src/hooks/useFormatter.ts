import { useCallback } from 'react';
import { useWorkerRpc } from './useWorkerRpc';

export interface FormatResult {
  code: string;
  error?: string;
}

/** Prettier formatting off the main thread. Keeps the input when it can't parse. */
export function useFormatter() {
  const { call, ready } = useWorkerRpc('/workers/prettier.worker.js');

  const format = useCallback(
    async (code: string, parser: string): Promise<FormatResult> => {
      const res = await call({ code, parser });
      if (res.error || typeof res.code !== 'string') {
        return { code, error: res.error || 'formatter unavailable' };
      }
      return { code: res.code };
    },
    [call],
  );

  const formatCSS = useCallback((code: string) => format(code, 'css'), [format]);
  const formatJSX = useCallback((code: string) => format(code, 'babel'), [format]);
  const formatJS = useCallback((code: string) => format(code, 'babel'), [format]);

  return { formatCSS, formatJSX, formatJS, format, ready };
}
