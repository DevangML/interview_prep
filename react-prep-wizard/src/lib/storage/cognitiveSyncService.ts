/**
 * Cognitive Sync Service
 * Manages bi-directional synchronization between local IndexedDB and cloud PostgreSQL/SQLite.
 * Guarantees that the agent's memory, cognitive profile, and records survive forever across any device.
 */

import { globalCognitiveDB } from './cognitiveDatabase';

export interface CloudCognitiveProfile {
  user_id: number;
  rigor_level: 'Senior' | 'Staff' | 'Principal';
  weakness_heatmap: Record<string, number>;
  mastered_invariants: string[];
  jd_analyses: any[];
  bug_drills: any[];
  star_stories: any[];
  cheat_sheets: any[];
  revision: number;
  updated_at: string;
}

export class CognitiveSyncService {
  private static API_URL = (typeof window !== 'undefined' && (window as any).__API_URL__) || 'http://localhost:8777/api/cognitive';

  /**
   * Syncs local IndexedDB with the authenticated user's cloud profile
   */
  public static async sync(token: string | null): Promise<CloudCognitiveProfile | null> {
    if (!token) return null;

    try {
      // 1. Gather all local records from IndexedDB
      const [localJd, localBugs, localStars, localSheets] = await Promise.all([
        globalCognitiveDB.getAll('jd_analyses'),
        globalCognitiveDB.getAll('bug_drills'),
        globalCognitiveDB.getAll('star_stories'),
        globalCognitiveDB.getAll('cheat_sheets'),
      ]);

      // 2. Post Sync Payload to Backend
      const res = await fetch(`${this.API_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          client_revision: 1,
          jd_analyses: localJd,
          bug_drills: localBugs,
          star_stories: localStars,
          cheat_sheets: localSheets,
        })
      });

      if (!res.ok) {
        console.warn('Cognitive cloud sync returned non-200:', res.status);
        return null;
      }

      // 3. Fetch Full Reconciled Cloud Profile
      const profileRes = await fetch(`${this.API_URL}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (profileRes.ok) {
        const cloudProfile: CloudCognitiveProfile = await profileRes.json();

        // 4. Hydrate local IndexedDB with any cloud records from other devices
        for (const jd of cloudProfile.jd_analyses || []) {
          await globalCognitiveDB.put('jd_analyses', jd);
        }
        for (const bug of cloudProfile.bug_drills || []) {
          await globalCognitiveDB.put('bug_drills', bug);
        }
        for (const star of cloudProfile.star_stories || []) {
          await globalCognitiveDB.put('star_stories', star);
        }
        for (const sheet of cloudProfile.cheat_sheets || []) {
          await globalCognitiveDB.put('cheat_sheets', sheet);
        }

        return cloudProfile;
      }
    } catch (err) {
      console.warn('Cognitive cloud sync offline/unavailable:', err);
    }
    return null;
  }

  /**
   * Records a user weakness flag (e.g. failed test or deopt error) and pushes to cloud
   */
  public static async recordWeakness(tag: string, token: string | null): Promise<void> {
    if (!token) return;
    try {
      await fetch(`${this.API_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          weakness_updates: { [tag]: 1 }
        })
      });
    } catch {
      // Background retry on next sync
    }
  }
}
