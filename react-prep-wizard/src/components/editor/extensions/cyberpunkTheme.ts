import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import type { Extension } from '@codemirror/state';

export const obsidianDarkEditorTheme = EditorView.theme({
  '&': {
    fontSize: '13px',
    height: '100%',
    backgroundColor: '#020617',
    color: '#f8fafc',
  },
  '&.cm-focused': {
    outline: 'none',
  },
  '.cm-scroller': {
    fontFamily: 'ui-monospace, Menlo, Monaco, "Cascadia Code", "Fira Code", monospace',
    overflow: 'auto',
  },
  '.cm-content': {
    minHeight: '100%',
    padding: '8px 0',
    caretColor: '#38bdf8',
  },
  '.cm-cursor': {
    borderLeftColor: '#38bdf8',
    borderLeftWidth: '2px',
  },
  '.cm-gutters': {
    backgroundColor: '#020617',
    borderRight: '1px solid #1e293b',
    color: '#475569',
  },
  '.cm-gutterElement': {
    padding: '0 8px',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(56, 189, 248, 0.06)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    color: '#38bdf8',
    fontWeight: 'bold',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: 'rgba(56, 189, 248, 0.25) !important',
  },
  '.cm-tooltip-autocomplete': {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '10px',
    boxShadow: '0 20px 30px -10px rgba(0,0,0,0.5)',
    color: '#e2e8f0',
  },
  '.cm-tooltip-autocomplete > ul > li': {
    padding: '5px 10px',
    borderRadius: '6px',
    fontSize: '12px',
  },
  '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
    backgroundColor: '#0284c7',
    color: '#ffffff',
  },
  '.cm-completionDetail': {
    opacity: 0.7,
    fontStyle: 'italic',
    marginLeft: '6px',
    color: '#94a3b8',
  },
  '.cm-panels': {
    backgroundColor: '#0f172a',
    color: '#cbd5e1',
    borderTop: '1px solid #1e293b',
  },
}, { dark: true });

export const obsidianHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#a78bfa', fontWeight: 'bold' },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: '#e2e8f0' },
  { tag: [t.function(t.variableName), t.labelName], color: '#38bdf8' },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#f472b6' },
  { tag: [t.definition(t.name), t.separator], color: '#cbd5e1' },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: '#fb923c' },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: '#f43f5e' },
  { tag: [t.meta, t.comment], color: '#64748b', fontStyle: 'italic' },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: '#38bdf8', textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: '#38bdf8' },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#34d399', fontWeight: 'bold' },
  { tag: [t.processingInstruction, t.string, t.inserted], color: '#34d399' },
  { tag: t.invalid, color: '#ef4444' },
]);

export const cyberpunkObsidianExtension: Extension[] = [
  obsidianDarkEditorTheme,
  syntaxHighlighting(obsidianHighlightStyle),
];
