import { useEffect, useRef, useState, useCallback } from 'react';
import * as Comlink from 'comlink';
import type { CompileResult } from '../types';

interface CompilerWorker {
  compile(code: string): Promise<CompileResult>;
}

/**
 * Manages a Babel Web Worker via Comlink.
 * Pure lifecycle initialization compliant with React Compiler.
 */
export function useCompiler() {
  const workerRef = useRef<Worker | null>(null);
  const apiRef = useRef<Comlink.Remote<CompilerWorker> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = new Worker(
      new URL('../workers/babel.worker.ts', import.meta.url),
      { type: 'module' },
    );
    workerRef.current = w;
    apiRef.current = Comlink.wrap<CompilerWorker>(w);
    setReady(true);

    return () => {
      w.terminate();
      workerRef.current = null;
      apiRef.current = null;
    };
  }, []);

  const compile = useCallback(
    async (code: string): Promise<CompileResult> => {
      if (!apiRef.current) return { error: 'Compiler initializing...' };
      try {
        return await apiRef.current.compile(code);
      } catch (e) {
        return { error: String(e) };
      }
    },
    [],
  );

  return { compile, ready };
}
