import { hoverTooltip } from '@codemirror/view';
import type { Tooltip, EditorView } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import { MDN_CSS_DOCS, MDN_JSX_DOCS } from './mdnDictionary';

export function hoverDocumentation() {
  return hoverTooltip((view: EditorView, pos: number, side: -1 | 1): Tooltip | null => {
    const { state } = view;
    const node = syntaxTree(state).resolveInner(pos, side);
    const word = state.doc.sliceString(node.from, node.to).trim();

    let docData = MDN_CSS_DOCS[word] || MDN_JSX_DOCS[word] || null;

    if (!docData) {
      const line = state.doc.lineAt(pos);
      const text = line.text;
      const match = text.match(/([a-zA-Z-]+)\s*:/);
      if (match && MDN_CSS_DOCS[match[1]]) {
        docData = MDN_CSS_DOCS[match[1]];
      }
    }

    if (!docData) return null;

    return {
      pos: node.from,
      end: node.to,
      above: true,
      create() {
        const dom = document.createElement('div');
        dom.className = 'p-2.5 bg-slate-950 text-slate-100 rounded-lg shadow-xl border border-slate-700 max-w-xs text-xs font-sans select-none z-50';
        dom.innerHTML = `
          <div class="flex items-center justify-between gap-2 pb-1 mb-1 border-b border-slate-800">
            <span class="font-mono font-bold text-sky-400">${docData.title}</span>
            <span class="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded font-mono">MDN</span>
          </div>
          <div class="font-mono text-emerald-300 bg-slate-900 p-1 rounded mb-1.5 overflow-x-auto text-[10.5px]">
            ${docData.syntax}
          </div>
          <p class="text-slate-300 leading-relaxed text-[11px]">${docData.summary}</p>
        `;
        return { dom };
      },
    };
  });
}
