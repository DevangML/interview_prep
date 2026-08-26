import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CampaignState, ActivityEvent } from '../types';
import { request, ApiError } from '../lib/apiError';

const BASE = '';

export async function fetchCampaign(): Promise<CampaignState> {
  // Throws ApiError with the real cause — "unauthorized" and "the API is down"
  // used to arrive as the same invented sentence.
  return request<CampaignState>(`${BASE}/api/state`);
}

export async function fetchActivity(n = 10): Promise<ActivityEvent[]> {
  // The activity feed is decoration: a failure degrades to an empty list rather
  // than taking the page down. Anything unexpected still propagates.
  try {
    return await request<ActivityEvent[]>(`${BASE}/api/activity?n=${n}`);
  } catch (err) {
    if (err instanceof ApiError && (err.isRetryable || err.status === 401)) return [];
    throw err;
  }
}

export async function logActivity(ev: Record<string, unknown>) {
  // Fire-and-forget telemetry, but not silent: a persistent failure to record
  // progress is something the console should show.
  try {
    await request(`${BASE}/api/activity`, { method: 'POST', body: JSON.stringify(ev) });
  } catch (err) {
    if (!(err instanceof ApiError) || !err.isRetryable) throw err;
  }
}

export async function submitChallenge(data: {
  id: string;
  done: boolean;
  code?: string;
  checks?: number;
  hints_used?: number;
}) {
  // Previously returned r.json() without checking r.ok, so a failed save looked
  // identical to a successful one and progress was silently lost.
  return request(`${BASE}/api/challenge`, { method: 'POST', body: JSON.stringify(data) });
}

export async function submitLesson(data: {
  key: string;
  done: boolean;
  stage?: string;
  title?: string;
}) {
  return request(`${BASE}/api/lesson`, { method: 'POST', body: JSON.stringify(data) });
}

/* ── TanStack Query Hooks ── */

export function useCampaignQuery() {
  return useQuery({
    queryKey: ['campaign'],
    queryFn: fetchCampaign,
    staleTime: 10_000,
    refetchInterval: 20_000,
  });
}

export function useActivityQuery(n = 10) {
  return useQuery({
    queryKey: ['activity', n],
    queryFn: () => fetchActivity(n),
    refetchInterval: 15_000,
  });
}

export function useSubmitChallengeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaign'] });
      queryClient.invalidateQueries({ queryKey: ['activity'] });
    },
  });
}

export function useSubmitLessonMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaign'] });
    },
  });
}
