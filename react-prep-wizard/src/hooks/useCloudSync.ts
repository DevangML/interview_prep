import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CloudSyncService } from '../lib/storage/cloudSyncService';

/**
 * Global Cloud Sync Hook
 * Automatically performs bi-directional sync on login / mount,
 * reconciling local storage with Neon DB backend.
 */
export function useCloudSync() {
  const { user, token } = useAuth();
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    if (!token || !user) {
      hasSyncedRef.current = false;
      return;
    }

    if (!hasSyncedRef.current) {
      hasSyncedRef.current = true;
      // Perform initial full bulk-merge & hydration
      CloudSyncService.syncFullState().catch((err) => {
        console.warn('Initial cloud sync warning:', err);
      });
    }
  }, [token, user]);

  return {
    syncFullState: CloudSyncService.syncFullState.bind(CloudSyncService),
    recordMasterySolve: CloudSyncService.recordMasterySolve.bind(CloudSyncService),
    saveMasteryCode: CloudSyncService.saveMasteryCode.bind(CloudSyncService),
    saveMasteryActive: CloudSyncService.saveMasteryActive.bind(CloudSyncService),
    toggleLearnTopic: CloudSyncService.toggleLearnTopic.bind(CloudSyncService),
    saveLearnDiagram: CloudSyncService.saveLearnDiagram.bind(CloudSyncService),
    savePlayground: CloudSyncService.savePlayground.bind(CloudSyncService),
    recordRapidFireRun: CloudSyncService.recordRapidFireRun.bind(CloudSyncService),
    savePreferences: CloudSyncService.savePreferences.bind(CloudSyncService),
  };
}
