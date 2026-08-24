import { snippetCompletion } from '@codemirror/autocomplete';

export const CSS_SNIPPETS = [
  snippetCompletion('display: flex;\njustify-content: center;\nalign-items: center;', {
    label: 'flex-center', detail: 'Flexbox Center', type: 'snippet', boost: 5,
  }),
  snippetCompletion('display: grid;\nplace-items: center;', {
    label: 'grid-center', detail: 'Grid Center', type: 'snippet', boost: 5,
  }),
  snippetCompletion('display: grid;\ngrid-template-columns: repeat(2, 1fr);\ngap: ${1:16px};', {
    label: 'grid-2col', detail: '2-Column Grid', type: 'snippet', boost: 5,
  }),
  snippetCompletion('display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(${1:200px}, 1fr));\ngap: ${2:16px};', {
    label: 'grid-auto-fit', detail: 'Responsive Grid', type: 'snippet', boost: 5,
  }),
  snippetCompletion('position: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);', {
    label: 'abs-center', detail: 'Absolute Center', type: 'snippet', boost: 5,
  }),
  snippetCompletion('position: absolute;\ninset: 0;', {
    label: 'inset-0', detail: 'Absolute Cover', type: 'snippet', boost: 5,
  }),
  snippetCompletion('background: rgba(255, 255, 255, 0.85);\nbackdrop-filter: blur(${1:12px});\nborder: 1px solid rgba(255, 255, 255, 0.2);', {
    label: 'glass', detail: 'Glassmorphism Backdrop', type: 'snippet', boost: 4,
  }),
  snippetCompletion('overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;', {
    label: 'truncate', detail: 'Single-line Ellipsis', type: 'snippet', boost: 4,
  }),
];

export const JSX_SNIPPETS = [
  snippetCompletion('export default function ${1:App}() {\n  return (\n    <div className="${2}">\n      ${3}\n    </div>\n  );\n}', {
    label: 'rfc', detail: 'React Functional Component', type: 'snippet', boost: 5,
  }),
  snippetCompletion('const [${1:state}, set${2:State}] = useState(${3:initialState});', {
    label: 'useState', detail: 'React State Hook', type: 'snippet', boost: 5,
  }),
  snippetCompletion('useEffect(() => {\n  ${1}\n  return () => {\n    ${2}\n  };\n}, [${3}]);', {
    label: 'useEffect', detail: 'React Effect Hook', type: 'snippet', boost: 5,
  }),
  snippetCompletion('const ${1:ref} = useRef(null);', {
    label: 'useRef', detail: 'React Ref Hook', type: 'snippet', boost: 5,
  }),
  snippetCompletion('const ${1:memoized} = useMemo(() => {\n  return ${2};\n}, [${3}]);', {
    label: 'useMemo', detail: 'React Memo Hook', type: 'snippet', boost: 4,
  }),
  snippetCompletion('const ${1:fn} = useCallback((${2}) => {\n  ${3}\n}, [${4}]);', {
    label: 'useCallback', detail: 'React Callback Hook', type: 'snippet', boost: 4,
  }),
];
