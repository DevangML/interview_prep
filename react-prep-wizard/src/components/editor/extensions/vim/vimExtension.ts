import { vim, Vim } from '@replit/codemirror-vim';
import { Compartment } from '@codemirror/state';
import type { Extension } from '@codemirror/state';

export const vimCompartment = new Compartment();

export function setupVimCommands(onSave?: () => void) {
  try {
    // 1. Remap jk to Escape in insert mode
    Vim.map('jk', '<Esc>', 'insert');

    // 2. Custom :w command triggers workbench format and evaluate
    Vim.defineEx('write', 'w', () => {
      if (onSave) onSave();
    });
  } catch {
    // Already defined
  }
}

export function getVimExtension(enabled: boolean): Extension {
  return vimCompartment.of(enabled ? [vim({ status: true })] : []);
}
