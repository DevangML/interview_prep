import type { CompletionContext, CompletionResult, Completion } from '@codemirror/autocomplete';
import { JSX_SNIPPETS } from './snippets';

const HTML_TAGS: Completion[] = [
  'div', 'span', 'section', 'article', 'header', 'footer', 'nav', 'main', 'aside',
  'button', 'input', 'form', 'label', 'select', 'option', 'textarea',
  'ul', 'ol', 'li', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'table', 'thead', 'tbody', 'tr', 'td', 'th', 'img', 'a', 'svg', 'canvas'
].map((tag) => ({
  label: tag,
  type: 'type',
  info: `HTML <${tag}> element`,
  boost: 2,
}));

const JSX_PROPS: Completion[] = [
  { label: 'className', type: 'property', apply: 'className="${1}"', info: 'CSS class names', boost: 3 },
  { label: 'style', type: 'property', apply: 'style={{ ${1} }}', info: 'Inline styles object', boost: 3 },
  { label: 'onClick', type: 'property', apply: 'onClick={${1}}', info: 'Click event handler', boost: 3 },
  { label: 'onChange', type: 'property', apply: 'onChange={(e) => ${1}}', info: 'Change event handler', boost: 3 },
  { label: 'onSubmit', type: 'property', apply: 'onSubmit={(e) => { e.preventDefault(); ${1} }}', info: 'Form submit handler', boost: 3 },
  { label: 'value', type: 'property', apply: 'value={${1}}', info: 'Controlled value', boost: 2 },
  { label: 'placeholder', type: 'property', apply: 'placeholder="${1}"', info: 'Placeholder text', boost: 2 },
  { label: 'type', type: 'property', apply: 'type="${1:text}"', info: 'Input type', boost: 2 },
  { label: 'disabled', type: 'property', apply: 'disabled={${1:false}}', info: 'Disabled flag', boost: 2 },
  { label: 'key', type: 'property', apply: 'key={${1}}', info: 'React list key', boost: 2 },
  { label: 'ref', type: 'property', apply: 'ref={${1}}', info: 'DOM or Component ref', boost: 2 },
  { label: 'id', type: 'property', apply: 'id="${1}"', info: 'Unique element ID', boost: 2 },
  { label: 'autoFocus', type: 'property', apply: 'autoFocus', info: 'Auto-focus element', boost: 1 },
];

export function jsxCompletionSource(context: CompletionContext): CompletionResult | null {
  const lineText = context.state.doc.lineAt(context.pos).text;
  const beforeCursor = lineText.slice(0, context.pos - context.state.doc.lineAt(context.pos).from);

  // Check if inside JSX tag: `<div c|`
  const insideTagMatch = beforeCursor.match(/<[a-zA-Z0-9_-]+\s+([^>]*)$/);
  if (insideTagMatch) {
    const word = context.matchBefore(/[a-zA-Z0-9_:-]*/);
    if (!word) return null;
    return {
      from: word.from,
      options: JSX_PROPS,
      validFor: /^[a-zA-Z0-9_:-]*$/,
    };
  }

  // Tag or snippet match
  const word = context.matchBefore(/[a-zA-Z0-9_:-]*/);
  if (!word && !context.explicit) return null;

  return {
    from: word ? word.from : context.pos,
    options: [...HTML_TAGS, ...JSX_SNIPPETS, ...JSX_PROPS],
    validFor: /^[a-zA-Z0-9_:-]*$/,
  };
}
