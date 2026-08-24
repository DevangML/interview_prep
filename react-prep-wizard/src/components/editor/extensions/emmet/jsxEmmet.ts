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

  const tag = rawTag || 'div';
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

export function expandJsxEmmet(view: EditorView): boolean {
  const { state } = view;
  const { from, to } = state.selection.main;
  if (from !== to || state.readOnly) return false;

  const line = state.doc.lineAt(from);
  const textBefore = line.text.slice(0, from - line.from);
  const textAfter = line.text.slice(from - line.from);
  const baseIndentMatch = line.text.match(/^(\s*)/);
  const baseIndent = baseIndentMatch ? baseIndentMatch[1] : '';

  // 1. Tag splitting: <tag>|</tag> + Enter -> indented block with cursor on middle line
  const tagMatchBefore = textBefore.match(/<([a-zA-Z0-9_-]+)[^>]*>$/);
  const tagMatchAfter = textAfter.match(/^<\/([a-zA-Z0-9_-]+)>/);
  if (tagMatchBefore && tagMatchAfter && tagMatchBefore[1] === tagMatchAfter[1]) {
    const nextIndent = baseIndent + '  ';
    const insert = `\n${nextIndent}\n${baseIndent}`;
    view.dispatch({
      changes: { from, to, insert },
      selection: { anchor: from + 1 + nextIndent.length },
      userEvent: 'emmet.jsx',
    });
    return true;
  }

  // 2. Emmet abbreviations: div.red, div.class_name, button.btn, ul>li*3
  const abbrMatch = textBefore.match(/(?:^|\s|<|>)([a-zA-Z0-9_-]*(?:[.#][a-zA-Z0-9_-]+)+(?:\*[0-9]+)?|[a-zA-Z0-9_-]+>[a-zA-Z0-9_#.*-]+)$/);
  if (abbrMatch) {
    const rawAbbr = abbrMatch[1];
    const parsed = parseAbbr(rawAbbr);
    if (parsed) {
      const startPos = from - rawAbbr.length;
      const isVoid = VOID_TAGS.has(parsed.tag.toLowerCase());
      const attrs: string[] = [];
      if (parsed.id) attrs.push(`id="${parsed.id}"`);
      if (parsed.classes.length > 0) attrs.push(`className="${parsed.classes.join(' ')}"`);
      const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

      if (isVoid) {
        const insert = `<${parsed.tag}${attrStr} />`;
        view.dispatch({
          changes: { from: startPos, to: from, insert },
          selection: { anchor: startPos + insert.length },
          userEvent: 'emmet.jsx',
        });
        return true;
      }

      // Non-void tag: multi-line formatted with cursor on indented child line
      const openTag = `<${parsed.tag}${attrStr}>`;
      const closeTag = `</${parsed.tag}>`;
      const childIndent = baseIndent + '  ';

      if (parsed.child) {
        const childIsVoid = VOID_TAGS.has(parsed.child.tag.toLowerCase());
        const childAttrs: string[] = [];
        if (parsed.child.id) childAttrs.push(`id="${parsed.child.id}"`);
        if (parsed.child.classes.length > 0) childAttrs.push(`className="${parsed.child.classes.join(' ')}"`);
        const childAttrStr = childAttrs.length > 0 ? ' ' + childAttrs.join(' ') : '';
        const childCount = parsed.child.multiplier || 1;

        const childLines: string[] = [];
        for (let i = 0; i < childCount; i++) {
          if (childIsVoid) {
            childLines.push(`${childIndent}<${parsed.child.tag}${childAttrStr} />`);
          } else {
            childLines.push(`${childIndent}<${parsed.child.tag}${childAttrStr}>\n${childIndent}  \n${childIndent}</${parsed.child.tag}>`);
          }
        }

        const insert = `${openTag}\n${childLines.join('\n')}\n${baseIndent}${closeTag}`;
        const firstChildCursor = startPos + openTag.length + 1 + childIndent.length + (childIsVoid ? childLines[0].length : `<${parsed.child.tag}${childAttrStr}>\n${childIndent}  `.length);

        view.dispatch({
          changes: { from: startPos, to: from, insert },
          selection: { anchor: firstChildCursor },
          userEvent: 'emmet.jsx',
        });
        return true;
      }

      // Simple tag (e.g. div.red) -> INLINE expansion
      const insert = `${openTag}${closeTag}`;
      const cursorTarget = startPos + openTag.length;

      view.dispatch({
        changes: { from: startPos, to: from, insert },
        selection: { anchor: cursorTarget },
        userEvent: 'emmet.jsx',
      });
      return true;
    }
  }

  return false;
}
