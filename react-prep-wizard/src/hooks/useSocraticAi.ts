import { useState, useEffect, useRef, useCallback } from 'react';
import { CreateWebWorkerMLCEngine } from '@mlc-ai/web-llm';
import type { SocraticEvaluationVerdict } from '../types';
import { detectHardwareProfile, type HardwareProfile } from '../lib/hardwareDetection';
import { SocraticJsonSchema } from '../lib/socratic/schema';
import {
  IMPARTIAL_JUDGE_SYSTEM_PROMPT,
  APPELLATE_COURT_SYSTEM_PROMPT,
  MENTOR_CHAT_SYSTEM_PROMPT
} from '../lib/socratic/prompts';

export const DEFAULT_MODEL_ID = 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC';

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
    if (!isReady || !engineRef.current) return null;
    setIsAnalyzing(true);

    try {
      const userContent = `[EXERCISE CONTEXT]\nTitle: ${params.unitTitle}\nPractice Type: ${params.practiceType || 'code'}\nTask: ${params.taskDescription}\nRequirements:\n${params.specs.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}\n\n[DETERMINISTIC TEST HARNESS CLAIM / LOGS]\nHarness Failure Reason: ${params.tier1FailureReason}\nCaptured Execution Output: ${JSON.stringify(params.runtimeLogs || [])}\n\n[STUDENT ATTEMPT CODE]\n\`\`\`\n${params.userCode}\n\`\`\`\n\n[REFERENCE SOLUTION (EXEMPLARY VARIANT)]\n\`\`\`\n${params.solutionCode}\n\`\`\`\n\nPerform an impartial comparative adjudication. Output strict JSON.`;

      const response = await engineRef.current.chat.completions.create({
        messages: [
          { role: 'system', content: IMPARTIAL_JUDGE_SYSTEM_PROMPT },
          { role: 'user', content: userContent }
        ],
        response_format: { type: 'json_object', schema: JSON.stringify(SocraticJsonSchema) },
        temperature: 0.0,
        top_p: 1.0,
        max_tokens: 1200
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('Empty AI response');
      return JSON.parse(content);
    } catch (err) {
      console.error('Socratic AI Evaluation failed:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [isReady]);

  const disputeEvaluation = useCallback(async (params: {
    unitTitle: string;
    taskDescription: string;
    specs: string[];
    userCode: string;
    solutionCode: string;
    tier1FailureReason: string;
    userArgument: string;
    previousVerdict?: SocraticEvaluationVerdict | null;
    practiceType?: string;
  }): Promise<SocraticEvaluationVerdict | null> => {
    if (!isReady || !engineRef.current) return null;
    setIsAnalyzing(true);

    try {
      const userContent = `[APPEAL CASE CONTEXT]\nProblem: ${params.unitTitle}\nTask: ${params.taskDescription}\nRequirements: ${JSON.stringify(params.specs)}\n\n[DETERMINISTIC TEST FAILURE]\n${params.tier1FailureReason}\n\n[STUDENT ATTEMPT CODE]\n\`\`\`\n${params.userCode}\n\`\`\`\n\n[STUDENT'S DISPUTE & COUNTER-ARGUMENT]\n"${params.userArgument}"\n\n[PREVIOUS DIAGNOSTIC SUMMARY]\n${params.previousVerdict?.diagnosticSummary || 'None'}\n\n[REFERENCE SOLUTION]\n\`\`\`\n${params.solutionCode}\n\`\`\`\n\nConduct an appellate review of the argument. Output strict JSON.`;

      const response = await engineRef.current.chat.completions.create({
        messages: [
          { role: 'system', content: APPELLATE_COURT_SYSTEM_PROMPT },
          { role: 'user', content: userContent }
        ],
        response_format: { type: 'json_object', schema: JSON.stringify(SocraticJsonSchema) },
        temperature: 0.0,
        top_p: 1.0,
        max_tokens: 1200
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('Empty AI response');
      return JSON.parse(content);
    } catch (err) {
      console.error('Appellate dispute evaluation failed:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [isReady]);

  const chatWithMentor = useCallback(async (params: {
    unitTitle: string;
    category: string;
    trackName: string;
    taskDescription: string;
    specs: string[];
    userCode: string;
    practiceType?: string;
    messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  }): Promise<string | null> => {
    if (!isReady || !engineRef.current) return null;

    try {
      const response = await engineRef.current.chat.completions.create({
        messages: [
          { role: 'system', content: MENTOR_CHAT_SYSTEM_PROMPT },
          ...params.messages.map((m) => ({ role: m.role, content: m.content }))
        ],
        temperature: 0.3,
        max_tokens: 1024
      });
      return response.choices[0]?.message?.content || null;
    } catch (err) {
      console.error('Socratic Chat completion failed:', err);
      return null;
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
    evaluateFailure,
    disputeEvaluation,
    chatWithMentor
  };
}
