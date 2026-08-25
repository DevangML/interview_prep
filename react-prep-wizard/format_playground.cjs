const fs = require('fs');

const path = 'src/pages/PlaygroundPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
content = content.replace(
  "import { useFormatter } from '../hooks/useFormatter';",
  "import { useFormatter } from '../hooks/useFormatter';\nimport { useDebouncedCallback } from 'use-debounce';"
);

// Add debounced formatting function
const hookLocation = `const { formatCSS, formatJSX } = useFormatter();`;
const hookReplacement = `const { formatCSS, formatJSX } = useFormatter();

  const handleFormat = async () => {
    if (activeTab === 'jsx') {
      const { code } = await formatJSX(jsxCode);
      if (code) setJsxCode(code);
    } else {
      const { code } = await formatCSS(cssCode);
      if (code) setCssCode(code);
    }
  };

  const debouncedFormat = useDebouncedCallback(() => {
    handleFormat();
  }, 800);

  const handleJsxChange = (val) => {
    setJsxCode(val);
    debouncedFormat();
  };

  const handleCssChange = (val) => {
    setCssCode(val);
    debouncedFormat();
  };`;

content = content.replace(hookLocation, hookReplacement);

// Update CodeEditor onChange and onFormat
content = content.replace(
  '<CodeEditor value={jsxCode} onChange={setJsxCode} lang="jsx" autoFocus />',
  '<CodeEditor value={jsxCode} onChange={handleJsxChange} onFormat={handleFormat} lang="jsx" autoFocus />'
);

content = content.replace(
  '<CodeEditor value={cssCode} onChange={setCssCode} lang="css" />',
  '<CodeEditor value={cssCode} onChange={handleCssChange} onFormat={handleFormat} lang="css" />'
);

// Update format button onClick
content = content.replace(
  `onClick={() => {
                  if (activeTab === 'jsx') formatJSX(jsxCode).then((r) => setJsxCode(r.code));
                  else formatCSS(cssCode).then((r) => setCssCode(r.code));
                }}`,
  `onClick={handleFormat}`
);

fs.writeFileSync(path, content);
