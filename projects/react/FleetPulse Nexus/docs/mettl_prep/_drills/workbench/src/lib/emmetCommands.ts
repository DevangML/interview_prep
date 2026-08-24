import type { EditorView } from '@codemirror/view';
import {
  expandAbbreviation, enterAbbreviationMode, balanceInward, balanceOutward,
  selectNextItem, selectPreviousItem, goToNextEditPoint, goToPreviousEditPoint,
  goToTagPair, removeTag, splitJoinTag, evaluateMath, toggleComment,
  incrementNumber1, decrementNumber1, incrementNumber10, decrementNumber10,
} from '@emmetio/codemirror6-plugin';

export interface EmmetCommand {
  id: string;
  label: string;
  hint: string;
  run: (view: EditorView) => boolean;
}

/**
 * The whole Emmet surface, addressable by name. Bound to keys in the editor as
 * well, but nobody remembers ⌘⇧, — and an editor feature you cannot find is an
 * editor feature you do not have.
 */
export const EMMET_COMMANDS: EmmetCommand[] = [
  { id: 'expand', label: 'Expand abbreviation at cursor', hint: 'Tab', run: expandAbbreviation },
  { id: 'enter', label: 'Abbreviation mode (live preview while you type)', hint: '⌘E', run: enterAbbreviationMode },
  { id: 'wrap', label: 'Wrap selection with abbreviation', hint: '⌘⇧A', run: () => false },
  { id: 'balance-out', label: 'Balance outward (select parent tag)', hint: '⌘D', run: balanceOutward },
  { id: 'balance-in', label: 'Balance inward (select child tag)', hint: '⌘⇧D', run: balanceInward },
  { id: 'next-item', label: 'Select next item (tag, attribute, value)', hint: '⌘⇧.', run: selectNextItem },
  { id: 'prev-item', label: 'Select previous item', hint: '⌘⇧,', run: selectPreviousItem },
  { id: 'next-point', label: 'Go to next edit point', hint: '⌘⌥→', run: goToNextEditPoint },
  { id: 'prev-point', label: 'Go to previous edit point', hint: '⌘⌥←', run: goToPreviousEditPoint },
  { id: 'tag-pair', label: 'Jump to matching tag', hint: '⌘⌥T', run: goToTagPair },
  { id: 'remove-tag', label: 'Remove tag, keep its children', hint: '⌘⇧K', run: removeTag },
  { id: 'split-tag', label: 'Split / join tag', hint: "⌘'", run: splitJoinTag },
  { id: 'math', label: 'Evaluate maths expression under cursor', hint: '⌘⇧Y', run: evaluateMath },
  { id: 'comment', label: 'Toggle comment', hint: '⌘/', run: toggleComment },
  { id: 'inc-1', label: 'Increment number by 1', hint: '⌃↑', run: incrementNumber1 },
  { id: 'dec-1', label: 'Decrement number by 1', hint: '⌃↓', run: decrementNumber1 },
  { id: 'inc-10', label: 'Increment number by 10', hint: '⌃⌥↑', run: incrementNumber10 },
  { id: 'dec-10', label: 'Decrement number by 10', hint: '⌃⌥↓', run: decrementNumber10 },
];
