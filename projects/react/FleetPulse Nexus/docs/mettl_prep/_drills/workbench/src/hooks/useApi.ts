import type { CampaignState, ActivityEvent } from '../types';

const BASE = '';

export async function fetchCampaign(): Promise<CampaignState> {
  const r = await fetch(`${BASE}/api/state`);
  if (!r.ok) throw new Error('Server not running');
  return r.json();
}

export async function fetchActivity(n = 10): Promise<ActivityEvent[]> {
  const r = await fetch(`${BASE}/api/activity?n=${n}`);
  if (!r.ok) return [];
  return r.json();
}

export async function logActivity(ev: Record<string, unknown>) {
  try {
    await fetch(`${BASE}/api/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ev),
    });
  } catch { /* offline is fine */ }
}

export async function submitChallenge(data: {
  id: string;
  done: boolean;
  code?: string;
  checks?: number;
  hints_used?: number;
}) {
  const r = await fetch(`${BASE}/api/challenge`, {
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
  const r = await fetch(`${BASE}/api/lesson`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return r.json();
}
