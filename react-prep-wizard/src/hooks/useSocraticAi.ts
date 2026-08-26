import { useState, useEffect, useRef, useCallback } from 'react';
import { CreateWebWorkerMLCEngine } from '@mlc-ai/web-llm';
import type { SocraticEvaluationVerdict } from '../types';
import { detectHardwareProfile, type HardwareProfile } from '../lib/hardwareDetection';

export const DEFAULT_MODEL_ID = 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC';

// Strict JSON Schema for XGrammar constrained decoding
const SocraticJsonSchema = {
  type: 'object',
  properties: {
    isSemanticPass: {
      type: 'boolean',
      description: 'Strict boolean: true ONLY if the student attempt is 100% semantically equivalent to the reference solution despite failing deterministic string/layout/AST checks. If there is a real runtime bug, logical mistake, or incomplete implementation, this MUST be false.'
    },
    confidence: {
      type: 'number',
      description: 'Calibrated certainty: 1.0 (exact certainty), 0.9 (high certainty), 0.7 (probable).'
    },
    defectCategory: {
      type: 'string',
      description: 'One of: [SYNTAX_ERROR, RUNTIME_EXCEPTION, MUTATION_BUG, CLOSURE_LEAK, EVENT_LOOP_ORDER, CSS_BOX_MODEL, ASSERTION_FAILURE, ALTERNATIVE_IMPLEMENTATION]'
    },
    diagnosticSummary: {
      type: 'string',
      description: 'Direct, clear diagnosis comparing what the student code did in memory/DOM vs what the reference solution did and what the test failed on.'
    },
    socraticHintLevel1: {
      type: 'string',
      description: 'High-level conceptual inquiry highlighting the specific concept without giving away any code.'
    },
    socraticHintLevel2: {
      type: 'string',
      description: 'Targeted clue naming the exact variable, property, or line number causing the mismatch.'
    },
    socraticHintLevel3: {
      type: 'string',
      description: 'Concrete structural direction explaining step-by-step how to fix the flaw without copying the solution.'
    },
    findings: {
      type: 'array',
      description: 'Line-anchored defects. One entry per distinct problem, at most 3, ordered by severity.',
      items: {
        type: 'object',
        properties: {
          anchorCode: {
            type: 'string',
            description: 'VERBATIM copy of the exact code substring from the STUDENT ATTEMPT that contains the problem. Copy it character-for-character, including spacing, from the student code — do NOT paraphrase, do NOT reformat, do NOT quote the reference solution. One statement or expression, not the whole file. This string is used to locate the defect in the editor.'
          },
          severity: {
            type: 'string',
            description: 'One of: bug (it produces the wrong result), smell (it works but is wrong practice), missing (required code is absent here).'
          },
          concept: {
            type: 'string',
            description: 'The underlying computer-science concept, named without any code and without revealing the fix.'
          },
          hint: {
            type: 'string',
            description: 'Targeted clue naming the identifier, property or state that deviates. Still no solution code.'
          },
          fix: {
            type: 'string',
            description: 'Structural direction toward the correction, described in prose. Never verbatim solution code.'
          }
        },
        required: ['anchorCode', 'severity', 'concept', 'hint', 'fix']
      }
    }
  },
  required: ['isSemanticPass', 'confidence', 'defectCategory', 'diagnosticSummary', 'socraticHintLevel1', 'socraticHintLevel2', 'socraticHintLevel3', 'findings']
};

export function useSocraticAi() {
  const [hardwareProfile, setHardwareProfile] = useState<HardwareProfile | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeModelId, setActiveModelId] = useState<string>(DEFAULT_MODEL_ID);

  const engineRef = useRef<any>(null);
  const workerRef = useRef<Worker | null>(null);

  // 1. Detect Hardware on Mount (Fingerprint Apple M4 Pro / Silicon)
  useEffect(() => {
    detectHardwareProfile().then((profile) => {
      setHardwareProfile(profile);
      if (!profile.webGpuSupported && typeof navigator !== 'undefined' && !('gpu' in navigator)) {
        setIsSupported(false);
      }
    });
  }, []);

  const initializeEngine = useCallback(async (customModelId?: string) => {
    if (isReady || isLoading) return;
    setIsLoading(true);
    setError(null);

    const targetModel = customModelId || activeModelId;

    try {
      // Spawn Web Worker with WebLLM engine with WebGPU Metal acceleration
      if (!workerRef.current) {
        workerRef.current = new Worker(
          new URL('../workers/socraticAiWorker.ts', import.meta.url),
          { type: 'module' }
        );
      }

      const engine = await CreateWebWorkerMLCEngine(workerRef.current, targetModel, {
        initProgressCallback: (report) => {
          setDownloadProgress(report.text);
          if (report.progress !== undefined) {
            setProgressPercent(Math.round(report.progress * 100));
          }
        }
      });

      engineRef.current = engine;
      setActiveModelId(targetModel);
      setIsReady(true);
      setIsLoading(false);
      setDownloadProgress(null);
    } catch (err: any) {
      console.error('Socratic AI initialization failed:', err);
      setError(err?.message || 'Failed to initialize in-browser AI engine.');
      setIsLoading(false);
    }
  }, [isReady, isLoading, activeModelId]);

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
      const systemPrompt = `You are a Senior Principal Engineer and Compiler Architect.
You must perform an exact, deterministic semantic diff between a student's code attempt and the known reference solution, grounded strictly in the test harness failure report.

ANALYSIS PROTOCOL:
1. Grounding in Reference Solution:
   - Carefully inspect the REFERENCE SOLUTION below.
   - Contrast the AST, variable states, mutations, and return values between the STUDENT ATTEMPT and the REFERENCE SOLUTION.
2. Failure Verification:
   - Inspect the DETERMINISTIC TEST FAILURE. Understand why the test harness rejected the student attempt.
3. Strict Semantic Pass Criteria (isSemanticPass):
   - Set "isSemanticPass: true" ONLY if the student's solution achieves the identical end-state and side-effects as the reference solution, but was failed merely due to whitespace, arbitrary string ordering, or rigid regex matching.
   - If the student attempt has a real logical mistake, missing mutation, wrong assertion, TDZ, or reference mutation bug, "isSemanticPass" MUST be false.
4. Line Anchoring (CRITICAL):
   - For every distinct defect, emit one entry in "findings".
   - "anchorCode" MUST be an EXACT, character-for-character substring of the STUDENT ATTEMPT.
   - Copy it; do not retype it from memory, do not reformat it, do not normalise its spacing.
   - NEVER quote the reference solution — the anchor must exist in the student's own code.
   - Do NOT report line numbers. You are not asked for them and you will not be believed.
     Quote the code; the editor locates it.
   - If a required statement is entirely absent, anchor on the nearest existing
     student statement and mark severity "missing".
5. Socratic Hinting:
   - Level 1: Name the underlying Computer Science concept (e.g. Pass-by-reference vs Shallow copy).
   - Level 2: Point to the exact identifier or statement where the deviation occurred.
   - Level 3: Explain the structural mechanism needed to align with the reference behavior without giving verbatim code.`;

      const userContent = `[EXERCISE CONTEXT]
Title: ${params.unitTitle}
Practice Type: ${params.practiceType || 'code'}
Task: ${params.taskDescription}
Requirements: ${JSON.stringify(params.specs)}

[TEST HARNESS FAILURE REPORT]
Reason: ${params.tier1FailureReason}
Captured Execution Output / Logs: ${JSON.stringify(params.runtimeLogs || [])}

[REFERENCE SOLUTION (CANONICAL)]
\`\`\`
${params.solutionCode}
\`\`\`

[STUDENT ATTEMPT]
\`\`\`
${params.userCode}
\`\`\`

Analyze the difference between the Student Attempt and Reference Solution regarding the Test Failure.
For each defect, quote the offending substring from the STUDENT ATTEMPT verbatim in "anchorCode".
Output strict JSON conforming to the schema.`;

      // WebLLM with XGrammar constrained JSON schema and temperature: 0.0 for 100% deterministic outputs
      const response = await engineRef.current.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        response_format: {
          type: 'json_object',
          schema: JSON.stringify(SocraticJsonSchema)
        },
        temperature: 0.0,
        top_p: 1.0,
        max_tokens: 1024
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
    hardwareProfile,
    isSupported,
    isReady,
    isLoading,
    downloadProgress,
    progressPercent,
    isAnalyzing,
    error,
    activeModelId,
    initializeEngine,
    evaluateFailure
  };
}
