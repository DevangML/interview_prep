const fs = require('fs');

let c = fs.readFileSync('src/pages/PlaygroundPage.tsx', 'utf8');

c = c.replace(/const \[jsxCode, setJsxCode\] = useState\(DEFAULT_JSX\);/, `const [jsxCode, setJsxCode] = useState(() => localStorage.getItem('playground:jsx') || DEFAULT_JSX);`);
c = c.replace(/const \[cssCode, setCssCode\] = useState\(DEFAULT_CSS\);/, `const [cssCode, setCssCode] = useState(() => localStorage.getItem('playground:css') || DEFAULT_CSS);`);
c = c.replace(/const \[activeTab, setActiveTab\] = useState<'jsx' \| 'css'>\('jsx'\);/, `const [activeTab, setActiveTab] = useState<'jsx' | 'css'>(() => (localStorage.getItem('playground:tab') as 'jsx' | 'css') || 'jsx');`);

const effectInsertion = `const { formatCSS, formatJSX } = useFormatter();

  useEffect(() => { localStorage.setItem('playground:jsx', jsxCode); }, [jsxCode]);
  useEffect(() => { localStorage.setItem('playground:css', cssCode); }, [cssCode]);
  useEffect(() => { localStorage.setItem('playground:tab', activeTab); }, [activeTab]);`;

c = c.replace(/const \{ formatCSS, formatJSX \} = useFormatter\(\);/, effectInsertion);

// In the reset button: setJsxCode(DEFAULT_JSX); setCssCode(DEFAULT_CSS);
// We might want to remove them from localStorage if they click reset? No, setting state triggers the useEffect which overwrites it in localStorage. Which is correct.

fs.writeFileSync('src/pages/PlaygroundPage.tsx', c);
