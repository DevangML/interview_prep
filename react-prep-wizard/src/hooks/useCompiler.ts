import { useCallback } from 'react';
import type { CompileResult } from '../types';
import { useWorkerRpc } from './useWorkerRpc';

/** JSX → JS via the vendored Babel standalone, off the main thread. */
export function useCompiler() {
  const { call, ready } = useWorkerRpc('/workers/babel.worker.js');

  const compile = useCallback(
    async (code: string): Promise<CompileResult> => {
      const res = await call({ code });
      return { code: res.code, error: res.error };
    },
    [call],
  );

  return { compile, ready };
}
