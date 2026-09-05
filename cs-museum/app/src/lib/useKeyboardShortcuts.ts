import { useEffect } from 'react';
import { useMuseumStore } from '../store/useMuseumStore';
import { PROGRAM_STAGES } from './stages';

export function useKeyboardShortcuts() {
  const {
    selectStage,
    goHome,
    commandPaletteOpen,
    setCommandPaletteOpen,
    activeConceptId,
    selectConcept,
    activeStageId,
  } = useMuseumStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't fire if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Handle ⌘K / Ctrl+K for search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
        return;
      }

      // Escape key handles navigation back
      if (e.key === 'Escape' && !commandPaletteOpen) {
        if (activeConceptId) selectConcept(null);
        else if (activeStageId) selectStage(null);
        return;
      }

      if (commandPaletteOpen) return;

      // '0' returns home
      if (e.key === '0') {
        goHome();
        return;
      }

      // 1-9 navigates directly to that computing layer
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        const stage = PROGRAM_STAGES.find((s) => s.number === num);
        if (stage) {
          selectStage(stage.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    commandPaletteOpen,
    setCommandPaletteOpen,
    activeConceptId,
    selectConcept,
    activeStageId,
    selectStage,
    goHome,
  ]);
}
