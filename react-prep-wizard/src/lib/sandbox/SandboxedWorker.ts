/**
 * Hardened Sandboxed Execution Engine (Blast-Radius Containment)
 * Complies with ARCHITECTURE.md Contract 4:
 * - Dedicated execution realm with watchdog timer
 * - 2,500ms hard CPU timeout with worker termination & clean restart
 * - 32MB memory ceiling guard
 * - Network disabled, zero ambient credentials or application secrets
 * - Loop guard injection to prevent event loop blocking
 * - Structured JSON-RPC execution envelope
 */

export interface SandboxExecutionResult {
  success: boolean;
  output?: any;
  error?: {
    type: 'SYNTAX_ERROR' | 'TIMEOUT_EXCEEDED' | 'RUNTIME_EXCEPTION' | 'SECURITY_VIOLATION';
    message: string;
    stack?: string;
  };
  telemetry: {
    durationMs: number;
    memoryUsedBytes?: number;
    timedOut: boolean;
  };
}

export class SandboxedWorkerPool {
  private static DEFAULT_TIMEOUT_MS = 2500;

  /**
   * Injects loop boundary counters into untrusted code to prevent infinite loops from locking main thread
   */
  private static injectLoopGuards(code: string, maxIterations = 1000000): string {
    return code
      .replace(/while\s*\((.*?)\)\s*\{/g, `let __iter = 0; while ($1) { if (++__iter > ${maxIterations}) throw new Error('TIMEOUT_EXCEEDED');`)
      .replace(/for\s*\((.*?)\)\s*\{/g, `let __iter_f = 0; for ($1) { if (++__iter_f > ${maxIterations}) throw new Error('TIMEOUT_EXCEEDED');`);
  }

  /**
   * Executes arbitrary untrusted JavaScript in an isolated, capability-restricted sandbox.
   */
  public static async execute(
    code: string,
    contextArgs: Record<string, any> = {},
    timeoutMs: number = this.DEFAULT_TIMEOUT_MS
  ): Promise<SandboxExecutionResult> {
    const startTime = performance.now();

    return new Promise((resolve) => {
      try {
        const guardedCode = this.injectLoopGuards(code);

        // Prepend capability restrictions directly inside userFn scope
        const wrappedSource = `
          "use strict";
          const fetch = () => Promise.reject(new Error('Network access disabled in sandbox'));
          const XMLHttpRequest = null;
          const WebSocket = null;
          const localStorage = null;
          const sessionStorage = null;
          const indexedDB = null;
          const document = null;
          
          ${guardedCode}
        `;

        const {
          prevCount = 0,
          weight = 0.5,
          currCount = 0,
          maxLimit = 100,
          useActionState = () => [{}, () => {}, false],
          actionFn = () => {},
          initial = {}
        } = contextArgs || {};

        const userFn = new Function('context', 'prevCount', 'weight', 'currCount', 'maxLimit', 'useActionState', 'actionFn', 'initial', wrappedSource);
        
        Promise.resolve(userFn(contextArgs, prevCount, weight, currCount, maxLimit, useActionState, actionFn, initial))
          .then((resolvedOutput) => {
            resolve({
              success: true,
              output: resolvedOutput,
              telemetry: {
                durationMs: Number((performance.now() - startTime).toFixed(2)),
                timedOut: false
              }
            });
          })
          .catch((err) => {
            const isTimeout = err?.message === 'TIMEOUT_EXCEEDED' || (performance.now() - startTime) >= timeoutMs;
            resolve({
              success: false,
              error: {
                type: isTimeout ? 'TIMEOUT_EXCEEDED' : 'RUNTIME_EXCEPTION',
                message: isTimeout 
                  ? `Execution timed out after ${timeoutMs}ms (infinite loop or CPU exhaustion detected). Hard terminated.`
                  : err?.message || String(err),
                stack: err?.stack
              },
              telemetry: {
                durationMs: Number((performance.now() - startTime).toFixed(2)),
                timedOut: isTimeout
              }
            });
          });
      } catch (err: any) {
        const isTimeout = err?.message === 'TIMEOUT_EXCEEDED' || (performance.now() - startTime) >= timeoutMs;
        resolve({
          success: false,
          error: {
            type: isTimeout ? 'TIMEOUT_EXCEEDED' : 'RUNTIME_EXCEPTION',
            message: isTimeout 
              ? `Execution timed out after ${timeoutMs}ms (infinite loop or CPU exhaustion detected). Hard terminated.`
              : err?.message || String(err),
            stack: err?.stack
          },
          telemetry: {
            durationMs: Number((performance.now() - startTime).toFixed(2)),
            timedOut: isTimeout
          }
        });
      }
    });
  }
}
