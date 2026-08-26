import type { AstCheckResult } from '../astWorker';

const worker = new Worker(new URL('../astWorker.ts', import.meta.url), { type: 'module' });

export const gradeWithAst = (code: string, unitId: string): Promise<AstCheckResult> => {
  return new Promise((resolve) => {
    const onMessage = (e: MessageEvent) => {
      worker.removeEventListener('message', onMessage);
      resolve(e.data);
    };
    worker.addEventListener('message', onMessage);
    worker.postMessage({ code, unitId });
  });
};
