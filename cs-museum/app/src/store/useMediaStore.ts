import { create } from 'zustand';
import type { CanonicalVideo } from '../lib/canonicalMedia';

export interface PendingVideoPrompt {
  video: CanonicalVideo;
  label: string;
}

export interface MediaState {
  activeVideo: CanonicalVideo | null;
  pinnedLabel: string;
  isDocked: boolean;
  isMinimized: boolean;
  isPlaying: boolean;
  pendingPrompt: PendingVideoPrompt | null;
  dismissedVideoIds: string[];

  proposeVideo: (video: CanonicalVideo, label: string) => void;
  confirmVideoSwitch: () => void;
  dismissPrompt: () => void;
  pinVideo: (video: CanonicalVideo, label: string) => void;
  setDocked: (docked: boolean) => void;
  setMinimized: (minimized: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  toggleDock: () => void;
  toggleMinimize: () => void;
  closeMedia: () => void;
}

export const useMediaStore = create<MediaState>((set) => ({
  activeVideo: null,
  pinnedLabel: '',
  isDocked: true,
  isMinimized: false,
  isPlaying: false,
  pendingPrompt: null,
  dismissedVideoIds: [],

  proposeVideo: (video, label) => {
    set((state) => {
      if (!state.activeVideo) {
        return {};
      }
      if (state.activeVideo.id === video.id) {
        return { pinnedLabel: label };
      }
      if (state.dismissedVideoIds.includes(video.id)) {
        return {};
      }
      return {
        pendingPrompt: { video, label },
      };
    });
  },

  confirmVideoSwitch: () => {
    set((state) => {
      if (!state.pendingPrompt) return {};
      return {
        activeVideo: state.pendingPrompt.video,
        pinnedLabel: state.pendingPrompt.label,
        pendingPrompt: null,
        isPlaying: true,
        isDocked: true,
        isMinimized: false,
      };
    });
  },

  dismissPrompt: () => {
    set((state) => {
      if (!state.pendingPrompt) return {};
      const newDismissed = state.dismissedVideoIds.includes(state.pendingPrompt.video.id)
        ? state.dismissedVideoIds
        : [...state.dismissedVideoIds, state.pendingPrompt.video.id];
      return {
        pendingPrompt: null,
        dismissedVideoIds: newDismissed,
      };
    });
  },

  pinVideo: (video, label) => {
    set((state) => {
      if (state.activeVideo?.id === video.id) {
        return { pinnedLabel: label };
      }
      return {
        activeVideo: video,
        pinnedLabel: label,
        isPlaying: true,
        isDocked: true,
        isMinimized: false,
        pendingPrompt: null,
      };
    });
  },

  setDocked: (docked) => set({ isDocked: docked }),
  setMinimized: (minimized) => set({ isMinimized: minimized }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  toggleDock: () => set((state) => ({ isDocked: !state.isDocked })),
  toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),
  closeMedia: () =>
    set({
      activeVideo: null,
      pinnedLabel: '',
      isDocked: true,
      isMinimized: false,
      isPlaying: false,
      pendingPrompt: null,
    }),
}));
