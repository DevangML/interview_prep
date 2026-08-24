import type { EditorView } from '@codemirror/view';

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

interface ParsedEmmet {
  tag: string;
  id?: string;
  classes: string[];
  multiplier?: number;
  child?: ParsedEmmet;
}

function parseSingle(str: string): ParsedEmmet | null {
  const match = str.match(/^([a-zA-Z0-9_-]+)?((?:[.#][a-zA-Z0-9_-]+)*)(?:\*(\d+))?$/);
  if (!match) return null;

  const rawTag = match[1];
  const rest = match[2];
  const mult = match[3] ? parseInt(match[3], 10) : undefined;

  let tag = rawTag || 'div';
  let id: string | undefined;
  const classes: string[] = [];

  if (rest) {
    const tokens = rest.match(/[.#][a-zA-Z0-9_-]+/g) || [];
    for (const tok of tokens) {
      if (tok.startsWith('#')) id = tok.slice(1);
      else if (tok.startsWith('.')) classes.push(tok.slice(1));
    }
  }

  if (!rawTag && classes.length === 0 && !id) return null;
  return { tag, id, classes, multiplier: mult };
}

function parseAbbr(abbr: string): ParsedEmmet | null {
  if (abbr.includes('>')) {
    const parts = abbr.split('>');
    let root: ParsedEmmet | null = null;
    let current: ParsedEmmet | null = null;
    for (const part of parts) {
      const parsed = parseSingle(part.trim());
      if (!parsed) return null;
      if (!root) { root = parsed; current = parsed; }
      else if (current) { current.child = parsed; current = parsed; }
    }
    return root;
  }
  return parseSingle(abbr);
}

function generateJSX(emmet: ParsedEmmet, indent: string, level = 0): { text: string; cursorOffset: number } {
  const currentIndent = indent.repeat(level);
  const nextIndent = indent.repeat(level + 1);

  const isVoid = VOID_TAGS.has(emmet.tag.toLowerCase());
  const attrs: string[] = [];
  if (emmet.id) attrs.push(`id="${emmet.id}"`);
  if (emmet.classes.length > 0) attrs.push(`className="${emmet.classes.join(' ')}"`);

  const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  const count = emmet.multiplier || 1;
  const blocks: string[] = [];
  let primaryCursor = -1;

  for (let i = 0; i < count; i++) {
    if (isVoid) {
      blocks.push(`${currentIndent}<${emmet.tag}${attrStr} />`);
    } else if (emmet.child) {
      const childRes = generateJSX(emmet.child, indent, level + 1);
      blocks.push(`${currentIndent}<${emmet.tag}${attrStr}>\n${childRes.text}\n${currentIndent}</${emmet.tag}>`);
      if (primaryCursor === -1) primaryCursor = childRes.cursorOffset;
    } else {
      const open = `${currentIndent}<${emmet.tag}${attrStr}>`;
      const inside = `\n${nextIndent}`;
      const close = `\n${currentIndent}</${emmet.tag}>`;
      if (primaryCursor === -1) primaryCursor = open.length + inside.length;
      blocks.push(`${open}${inside}${close}`);
    }
  }

  const text = blocks.join('\n');
  return { text, cursorOffset: primaryCursor !== -1 ? primaryCursor : text.length };
}

export function expandJsxEmmet(view: EditorView): boolean {
  const { state } = view;
  const { from, to } = state.selection.main;
  if (from !== to || state.readOnly) return false;

  const line = state.doc.lineAt(from);
  const textBefore = line.text.slice(0, from - line.from);
  const textAfter = line.text.slice(from - line.from);

  // 1. Between matching tags: <tag>|</tag> + Enter -> formatted multi-line expansion
  const tagMatchBefore = textBefore.match(/<([a-zA-Z0-9_-]+)[^>]*>$/);
  const tagMatchAfter = textAfter.match(/^<\/([a-zA-Z0-9_-]+)>/);
  if (tagMatchBefore && tagMatchAfter && tagMatchBefore[1] === tagMatchAfter[1]) {
    const baseIndentMatch = line.text.match(/^(\s*)/);
    const baseIndent = baseIndentMatch ? baseIndentMatch[1] : '';
    const nextIndent = baseIndent + '  ';
    const insert = `\n${nextIndent}\n${baseIndent}`;
    view.dispatch({
      changes: { from, to, insert },
      selection: { anchor: from + 1 + nextIndent.length },
      userEvent: 'emmet.jsx',
    });
    return true;
  }

  // 2. Emmet abbreviation (e.g. div.red, div.class_name, button.btn)
  const abbrMatch = textBefore.match(/(?:^|\s|<|>)([a-zA-Z0-9_-]*(?:[.#][a-zA-Z0-9_-]+)+(?:\*[0-9]+)?|[a-zA-Z0-9_-]+>[a-zA-Z0-9_#.*-]+)$/);
  if (abbrMatch) {
    const rawAbbr = abbrMatch[1];
    const parsed = parseAbbr(rawAbbr);
    if (parsed) {
      const startPos = from - rawAbbr.length;
      const baseIndentMatch = line.text.match(/^(\s*)/);
      const baseIndent = baseIndentMatch ? baseIndentMatch[1] : '';
      const { text, cursorOffset } = generateJSX(parsed, '  ', 0);

      const lines = text.split('\n');
      const formatted = lines.map((l, i) => (i === 0 ? l : baseIndent + l)).join('\n');

      view.dispatch({
        changes: { from: startPos, to: from, insert: formatted },
        selection: { anchor: startPos + cursorOffset },
        userEvent: 'emmet.jsx',
      });
      return true;
    }
  }

  return false;
}
