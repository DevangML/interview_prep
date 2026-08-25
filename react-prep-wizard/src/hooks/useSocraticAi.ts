import { useState, useEffect, useRef, useCallback } from 'react';
import { CreateWebWorkerMLCEngine } from '@mlc-ai/web-llm';
import type { SocraticEvaluationVerdict } from '../types';

export const SOCRATIC_MODEL_ID = 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC';

// Strict JSON Schema for XGrammar constrained decoding
const SocraticJsonSchema = {
  type: 'object',
  properties: {
    isSemanticPass: {
      type: 'boolean',
      description: 'True if student solution is semantically/logically valid despite minor formatting or grader string mismatch.'
    },
    confidence: {
      type: 'number',
      description: 'Confidence between 0.0 and 1.0'
    },
    defectCategory: {
      type: 'string',
      description: 'Defect category name e.g. PASS_BY_REFERENCE, CLOSURE_CAPTURE, TDZ, CSS_BOX_SIZING, ALTERNATIVE_SYNTAX'
    },
    diagnosticSummary: {
      type: 'string',
      description: 'Plain English diagnosis of what the student code actually does in memory/DOM vs the goal.'
    },
    socraticHintLevel1: {
      type: 'string',
      description: 'Conceptual question guiding the user to think about the core principle without giving code.'
    },
    socraticHintLevel2: {
      type: 'string',
      description: 'Targeted clue pointing to the exact line or variable with the misunderstanding.'
    },
    socraticHintLevel3: {
      type: 'string',
      description: 'Concrete structural hint explaining how to fix the flaw.'
    }
  },
  required: ['isSemanticPass', 'confidence', 'diagnosticSummary', 'socraticHintLevel1', 'socraticHintLevel2', 'socraticHintLevel3']
};

export function useSocraticAi() {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const engineRef = useRef<any>(null);
  const workerRef = useRef<Worker | null>(null);

  // Check WebGPU support on mount
  useEffect(() => {
    if (typeof navigator !== 'undefined' && !('gpu' in navigator)) {
      setIsSupported(false);
    }
  }, []);

  const initializeEngine = useCallback(async () => {
    if (isReady || isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      // 1. First probe for Chrome Built-in AI (Prompt API with Gemini Nano)
      if (typeof window !== 'undefined' && 'ai' in window && 'languageModel' in (window as any).ai) {
        const capabilities = await (window as any).ai.languageModel.capabilities?.();
        if (capabilities && capabilities.available === 'readily') {
          setIsReady(true);
          setIsLoading(false);
          return;
        }
      }

      // 2. Spawn Web Worker with WebLLM engine
      if (!workerRef.current) {
        workerRef.current = new Worker(
          new URL('../workers/socraticAiWorker.ts', import.meta.url),
          { type: 'module' }
        );
      }

      const engine = await CreateWebWorkerMLCEngine(workerRef.current, SOCRATIC_MODEL_ID, {
        initProgressCallback: (report) => {
          setDownloadProgress(report.text);
          if (report.progress !== undefined) {
            setProgressPercent(Math.round(report.progress * 100));
          }
        }
      });

      engineRef.current = engine;
      setIsReady(true);
      setIsLoading(false);
      setDownloadProgress(null);
    } catch (err: any) {
      console.error('Socratic AI initialization failed:', err);
      setError(err?.message || 'Failed to initialize in-browser AI engine.');
      setIsLoading(false);
    }
  }, [isReady, isLoading]);

  const evaluateFailure = useCallback(async (params: {
    unitTitle: string;
    taskDescription: string;
    specs: string[];
    userCode: string;
    solutionCode: string;
    tier1FailureReason: string;
    runtimeLogs?: string[];
    practiceType?: string;
  }): Promise<SocraticEvaluationVerdict | null> => {
    if (!isReady && !engineRef.current) {
      return null;
    }

    setIsAnalyzing(true);

    try {
      const prompt = `You are a Principal Software Engineer & Socratic Interview Mentor evaluating a learner's code submission.

PROBLEM: ${params.unitTitle}
PRACTICE TYPE: ${params.practiceType || 'code'}
TASK: ${params.taskDescription}
EXPECTED SPECS: ${JSON.stringify(params.specs)}

DETERMINISTIC GRADER VERDICT:
Failure: ${params.tier1FailureReason}
Runtime/Logs: ${JSON.stringify(params.runtimeLogs || [])}

STUDENT ATTEMPT:
\`\`\`
${params.userCode}
\`\`\`

REFERENCE SOLUTION:
\`\`\`
${params.solutionCode}
\`\`\`

Perform a deep semantic and AST evaluation:
1. Determine if the student's solution is actually a VALID ALTERNATIVE that accomplishes the task despite failing a rigid grader check.
2. If it is genuinely wrong, identify the exact conceptual root cause (e.g. mutating reference instead of cloning, hoisting TDZ, event loop queue priority, flex-shrink / box-sizing bug).
3. Formulate 3 progressive Socratic clues that coach the student without giving away the exact solution code.`;

      // Check for Chrome Built-in AI fallback
      if (typeof window !== 'undefined' && 'ai' in window && 'languageModel' in (window as any).ai && !engineRef.current) {
        const session = await (window as any).ai.languageModel.create({
          systemPrompt: 'You are an expert Socratic coding tutor. You output ONLY strict JSON.'
        });
        const rawOutput = await session.prompt(prompt + '\n\nOutput ONLY valid JSON matching this schema: ' + JSON.stringify(SocraticJsonSchema));
        session.destroy?.();
        const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]) as SocraticEvaluationVerdict;
        }
      }

      // WebLLM with XGrammar constrained JSON schema
      const response = await engineRef.current.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are an expert Socratic coding tutor. You analyze student code and return strict JSON diagnostics.' },
          { role: 'user', content: prompt }
        ],
        response_format: {
          type: 'json_object',
          schema: JSON.stringify(SocraticJsonSchema)
        },
        temperature: 0.1
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('Empty AI response');

      const parsed: SocraticEvaluationVerdict = JSON.parse(content);
      return parsed;
    } catch (err: any) {
      console.error('Socratic AI Evaluation failed:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [isReady]);

  return {
    isSupported,
    isReady,
    isLoading,
    downloadProgress,
    progressPercent,
    isAnalyzing,
    error,
    initializeEngine,
    evaluateFailure
  };
}
