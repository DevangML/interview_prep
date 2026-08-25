import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CampaignState, ActivityEvent } from '../types';

const BASE = '';

async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  return fetch(url, { ...options, headers });
}

export async function fetchCampaign(): Promise<CampaignState> {
  const r = await apiFetch(`${BASE}/api/state`);
  if (!r.ok) throw new Error('Server not running or unauthorized');
  return r.json();
}

export async function fetchActivity(n = 10): Promise<ActivityEvent[]> {
  const r = await apiFetch(`${BASE}/api/activity?n=${n}`);
  if (!r.ok) return [];
  return r.json();
}

export async function logActivity(ev: Record<string, unknown>) {
  try {
    await apiFetch(`${BASE}/api/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ev),
    });
  } catch {
    // offline is fine
  }
}

export async function submitChallenge(data: {
  id: string;
  done: boolean;
  code?: string;
  checks?: number;
  hints_used?: number;
}) {
  const r = await apiFetch(`${BASE}/api/challenge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return r.json();
}

export async function submitLesson(data: {
  key: string;
  done: boolean;
  stage?: string;
  title?: string;
}) {
  const r = await apiFetch(`${BASE}/api/lesson`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return r.json();
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
