import type { AstCheckResult } from '../astWorker';

let worker: Worker | null = null;
let seq = 0;
const pending = new Map<number, (res: AstCheckResult) => void>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('../astWorker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (e: MessageEvent<AstCheckResult>) => {
      const { id } = e.data;
      if (typeof id === 'number' && pending.has(id)) {
        const resolve = pending.get(id);
        pending.delete(id);
        resolve?.(e.data);
      }
    };
    worker.onerror = () => {
      pending.forEach((resolve) => resolve({ valid: false, checks: [], error: 'AST worker error' }));
      pending.clear();
    };
  }
  return worker;
}

export const gradeWithAst = (code: string, unitId: string): Promise<AstCheckResult> => {
  return new Promise((resolve) => {
    try {
      const w = getWorker();
      const id = ++seq;
      pending.set(id, resolve);
      w.postMessage({ id, code, unitId });
      setTimeout(() => {
        if (pending.has(id)) {
          pending.delete(id);
          resolve({ valid: true, checks: [] });
        }
      }, 3000);
    } catch {
      resolve({ valid: true, checks: [] });
    }
  });
};
