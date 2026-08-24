const fs = require('fs');
const path = require('path');
const p = path.resolve('src/pages/MasteryPage.tsx');
let text = fs.readFileSync(p, 'utf-8');

const regex = /\} else if \(cur\.practice\.type === 'js_snippet'\) \{[\s\S]*?\} finally \{\s*console\.log = originalLog;\s*setConsoleOutput\(logs\);\s*\}\s*\}/;

const replacement = `} else if (cur.practice.type === 'js_snippet') {
      setConsoleOutput([]); // clear old logs
      const mockConsole = {
        log: (...args) => {
          const msg = args.map(a => 
            typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
          ).join(' ');
          setConsoleOutput(prev => [...prev, msg]);
        },
        error: (...args) => {
          const msg = args.map(a => String(a)).join(' ');
          setConsoleOutput(prev => [...prev, \`[ERROR] \${msg}\`]);
        },
        warn: (...args) => {
          const msg = args.map(a => String(a)).join(' ');
          setConsoleOutput(prev => [...prev, \`[WARN] \${msg}\`]);
        }
      };

      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function('console', deferredCode);
        fn(mockConsole);
      } catch (err: any) {
        setConsoleOutput(prev => [...prev, \`Error: \${err.message}\`]);
      }
    }`;

text = text.replace(regex, replacement);
fs.writeFileSync(p, text, 'utf-8');
