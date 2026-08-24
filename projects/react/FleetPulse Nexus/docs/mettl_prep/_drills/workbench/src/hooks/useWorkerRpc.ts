import { useCallback, useEffect, useRef, useState } from 'react';

export interface RpcResult {
  id?: number;
  code?: string;
  error?: string;
  ready?: boolean;
}

interface Pending {
  resolve: (v: RpcResult) => void;
}

/**
 * Minimal request/response bridge to a *classic* worker served from /public.
 * Classic (not module) because the vendored Babel/Prettier builds are UMD and
 * are pulled in with importScripts, which module workers forbid.
 */
export function useWorkerRpc(url: string) {
  const workerRef = useRef<Worker | null>(null);
  const pending = useRef(new Map<number, Pending>());
  const seq = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = new Worker(url); // classic worker
    workerRef.current = w;
    const map = pending.current;

    w.onmessage = (ev: MessageEvent) => {
      const data = ev.data || {};
      if (data.ready) { setReady(true); return; }
      const p = map.get(data.id);
      if (p) { map.delete(data.id); p.resolve(data); }
    };
    w.onerror = (ev) => {
      // Surface load failures instead of hanging forever.
      const message = (ev as ErrorEvent).message || 'worker failed to load';
      map.forEach((p) => p.resolve({ error: message }));
      map.clear();
      console.error(`[worker ${url}]`, message);
    };

    return () => {
      w.terminate();
      map.clear();
      workerRef.current = null;
      setReady(false);
    };
  }, [url]);

  const call = useCallback((payload: Record<string, unknown>): Promise<RpcResult> => {
    const w = workerRef.current;
    if (!w) return Promise.resolve({ error: 'worker not started' });
    const id = ++seq.current;
    return new Promise((resolve) => {
      pending.current.set(id, { resolve });
      w.postMessage({ ...payload, id });
      setTimeout(() => {
        if (pending.current.has(id)) {
          pending.current.delete(id);
          resolve({ error: 'worker timeout' });
        }
      }, 15000);
    });
  }, []);

  return { call, ready };
}
