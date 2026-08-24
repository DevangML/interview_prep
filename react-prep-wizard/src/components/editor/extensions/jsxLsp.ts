import type { CompletionContext, CompletionResult, Completion } from '@codemirror/autocomplete';
import { snippet } from '@codemirror/autocomplete';

const HTML_TAGS: Completion[] = [
  'div', 'span', 'section', 'article', 'header', 'footer', 'nav', 'main', 'aside',
  'button', 'input', 'form', 'label', 'select', 'option', 'textarea',
  'ul', 'ol', 'li', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'table', 'thead', 'tbody', 'tr', 'td', 'th', 'img', 'a', 'svg', 'canvas',
].map((tag) => ({
  label: tag,
  type: 'type',
  info: `HTML <${tag}> element`,
}));

const JSX_PROPS: Completion[] = [
  { label: 'className', type: 'property', apply: 'className="${1}"', info: 'CSS class names' },
  { label: 'style', type: 'property', apply: 'style={{ ${1} }}', info: 'Inline styles object' },
  { label: 'onClick', type: 'property', apply: 'onClick={${1}}', info: 'Click event handler' },
  { label: 'onChange', type: 'property', apply: 'onChange={(e) => ${1}}', info: 'Change event handler' },
  { label: 'onSubmit', type: 'property', apply: 'onSubmit={(e) => { e.preventDefault(); ${1} }}', info: 'Form submit handler' },
  { label: 'value', type: 'property', apply: 'value={${1}}', info: 'Controlled input value' },
  { label: 'placeholder', type: 'property', apply: 'placeholder="${1}"', info: 'Input placeholder text' },
  { label: 'type', type: 'property', apply: 'type="${1:text}"', info: 'Input type' },
  { label: 'disabled', type: 'property', apply: 'disabled={${1:false}}', info: 'Disabled flag' },
  { label: 'key', type: 'property', apply: 'key={${1}}', info: 'React list key' },
  { label: 'ref', type: 'property', apply: 'ref={${1}}', info: 'DOM or Component ref' },
  { label: 'id', type: 'property', apply: 'id="${1}"', info: 'Element unique ID' },
];

const REACT_SNIPPETS: Completion[] = [
  {
    label: 'rfc',
    type: 'snippet',
    detail: 'React Functional Component',
    apply: snippet('export default function ${1:App}() {\n  return (\n    <div className="${2}">\n      ${3}\n    </div>\n  );\n}'),
  },
  {
    label: 'useState',
    type: 'snippet',
    detail: 'React useState Hook',
    apply: snippet('const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:initialState});'),
  },
  {
    label: 'useEffect',
    type: 'snippet',
    detail: 'React useEffect Hook',
    apply: snippet('useEffect(() => {\n  ${1}\n}, [${2}]);'),
  },
  {
    label: 'useRef',
    type: 'snippet',
    detail: 'React useRef Hook',
    apply: snippet('const ${1:ref} = useRef(${2:null});'),
  },
  {
    label: 'useMemo',
    type: 'snippet',
    detail: 'React useMemo Hook',
    apply: snippet('const ${1:memoized} = useMemo(() => {\n  return ${2};\n}, [${3}]);'),
  },
  {
    label: 'useCallback',
    type: 'snippet',
    detail: 'React useCallback Hook',
    apply: snippet('const ${1:handleClick} = useCallback((${2}) => {\n  ${3}\n}, [${4}]);'),
  },
];

export function jsxLspSource(context: CompletionContext): CompletionResult | null {
  const line = context.state.doc.lineAt(context.pos);
  const textBefore = line.text.slice(0, context.pos - line.from);

  // Check if inside JSX tag: e.g. `<div c` -> suggest props
  const insideTagMatch = textBefore.match(/<[a-zA-Z0-9_-]+\s+([^>]*)$/);
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
  if (!word || (word.from === word.to && !context.explicit)) return null;

  return {
    from: word.from,
    options: [...HTML_TAGS, ...REACT_SNIPPETS, ...JSX_PROPS],
    validFor: /^[a-zA-Z0-9_:-]*$/,
  };
}
