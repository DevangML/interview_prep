import { useEffect, useRef, useCallback } from 'react';
import * as Comlink from 'comlink';

interface FormatterWorker {
  format(code: string, parser: string): Promise<string>;
}

/**
 * Prettier formatting via Web Worker.
 * Pure lifecycle initialization compliant with React Compiler.
 */
export function useFormatter() {
  const workerRef = useRef<Worker | null>(null);
  const apiRef = useRef<Comlink.Remote<FormatterWorker> | null>(null);

  useEffect(() => {
    const w = new Worker(
      new URL('../workers/prettier.worker.ts', import.meta.url),
      { type: 'module' },
    );
    workerRef.current = w;
    apiRef.current = Comlink.wrap<FormatterWorker>(w);

    return () => {
      w.terminate();
      workerRef.current = null;
      apiRef.current = null;
    };
  }, []);

  const formatCSS = useCallback(
    async (code: string) => {
      if (!apiRef.current) return code;
      return apiRef.current.format(code, 'css');
    },
    [],
  );

  const formatJSX = useCallback(
    async (code: string) => {
      if (!apiRef.current) return code;
      return apiRef.current.format(code, 'babel');
    },
    [],
  );

  return { formatCSS, formatJSX };
}
