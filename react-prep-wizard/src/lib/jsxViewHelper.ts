export function getJsxViewCode(unit: any): string {
  if (unit.reference) {
    const trimmed = unit.reference.trim();
    if (trimmed.startsWith('import ') || trimmed.startsWith('export default function')) return trimmed;
    return `import React from 'react';\nimport './styles.css';\n\nexport default function App() {\n  return (\n${trimmed.split('\n').map((l: string) => '    ' + l).join('\n')}\n  );\n}\n`;
  }
  if (unit.practice.type === 'css') {
    const base = unit.practice.baseHtml || '<div className="container">\n  {/* Layout */}\n</div>';
    return `import React from 'react';\nimport './styles.css';\n\nexport default function App() {\n  return (\n${base.replace(/class=/g, 'className=').split('\n').map((l: string) => '    ' + l).join('\n')}\n  );\n}\n`;
  }
  if (unit.practice.type === 'jsx') return unit.practice.starterCode || `import React from 'react';\n\nexport default function App() {\n  return <div>${unit.title}</div>;\n}`;
  return `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="p-4 font-mono text-sm bg-slate-900 text-slate-100 min-h-screen">\n      <h1 className="text-lg font-bold text-sky-400 mb-2">${unit.title}</h1>\n    </div>\n  );\n}\n`;
}
