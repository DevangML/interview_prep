import { linter } from '@codemirror/lint';
import type { Diagnostic } from '@codemirror/lint';
import type { EditorView } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';

const VALID_PROPERTIES = new Set([
  'display', 'position', 'top', 'bottom', 'left', 'right', 'z-index',
  'justify-content', 'align-items', 'align-content', 'justify-items',
  'flex', 'flex-grow', 'flex-shrink', 'flex-basis', 'flex-direction', 'flex-wrap', 'gap',
  'row-gap', 'column-gap', 'grid-template-columns', 'grid-template-rows',
  'grid-template-areas', 'grid-auto-flow', 'grid-column', 'grid-row',
  'place-items', 'place-content', 'align-self', 'justify-self',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'width', 'height', 'max-width', 'min-width', 'max-height', 'min-height',
  'background', 'background-color', 'background-image', 'background-size',
  'border', 'border-radius', 'border-color', 'border-width', 'border-style',
  'color', 'font-size', 'font-weight', 'line-height', 'font-family',
  'box-shadow', 'backdrop-filter', 'opacity', 'overflow', 'overflow-x', 'overflow-y',
  'transform', 'transition', 'animation', 'cursor', 'pointer-events',
  'user-select', 'aspect-ratio', 'object-fit', 'object-position'
]);

export const cssLinter = linter((view: EditorView): Diagnostic[] => {
  const diagnostics: Diagnostic[] = [];
  const { state } = view;
  const tree = syntaxTree(state);

  tree.iterate({
    enter: (node) => {
      if (node.name === 'PropertyName') {
        const prop = state.doc.sliceString(node.from, node.to).trim().toLowerCase();
        if (!VALID_PROPERTIES.has(prop) && !prop.startsWith('--')) {
          diagnostics.push({
            from: node.from,
            to: node.to,
            severity: 'error',
            message: `Unknown CSS property "${prop}". Check for typos.`,
          });
        }
      }
      if (node.type.isError) {
        diagnostics.push({
          from: node.from,
          to: Math.max(node.to, node.from + 1),
          severity: 'error',
          message: 'CSS Syntax Error: check for missing colons, semicolons, or braces.',
        });
      }
    },
  });

  return diagnostics;
}, { delay: 250 });
