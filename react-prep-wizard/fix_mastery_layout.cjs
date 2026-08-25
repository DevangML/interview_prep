const fs = require('fs');

let code = fs.readFileSync('src/pages/MasteryPage.tsx', 'utf8');

// 1. Add imports
code = code.replace(
  "import {",
  "import { PanelGroup, Panel as ResizablePanel, PanelResizeHandle } from 'react-resizable-panels';\nimport {"
);

// 2. Replace `<main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr_1.1fr] xl:grid-cols-[20rem_1fr_1.1fr] gap-2 p-2 flex-1 min-h-0">`
code = code.replace(
  /<main className="grid grid-cols-1[^"]*">/,
  `<main className="p-2 flex-1 min-h-0 flex flex-col lg:flex-row gap-2">\n        <PanelGroup direction="horizontal" className="h-full w-full">`
);

// 3. Close the new PanelGroup at the end of the main
code = code.replace(
  /        <\/PaneBoundary>\n      <\/main>/,
  `        </PaneBoundary>\n          </ResizablePanel>\n        </PanelGroup>\n      </main>`
);

// 4. Wrap the first column
code = code.replace(
  /{!\isPortalOpen && \(\n        <PaneBoundary name="The stream navigator">/,
  `{!isPortalOpen && (\n        <><ResizablePanel defaultSize={20} minSize={15} order={1}>\n        <PaneBoundary name="The stream navigator">`
);

code = code.replace(
  /        <\/PaneBoundary>\n        \)}/,
  `        </PaneBoundary>\n        </ResizablePanel><PanelResizeHandle className="w-1.5 mx-1 hidden lg:block bg-transparent hover:bg-slate-300 transition-colors rounded-full cursor-col-resize z-10" />\n        `
);

// 5. Wrap the second column (Theory panel)
code = code.replace(
  /        {!isPortalOpen && \(\n        <Panel title={`Theory: \${cur.trackName}`} className="h-full flex flex-col border-slate-200 shadow-sm">/,
  `        <ResizablePanel defaultSize={35} minSize={20} order={2}>\n        <Panel title={\`Theory: \${cur.trackName}\`} className="h-full flex flex-col border-slate-200 shadow-sm">`
);

code = code.replace(
  /        <\/Panel>\n        \)}/,
  `        </Panel>\n        </ResizablePanel><PanelResizeHandle className="w-1.5 mx-1 hidden lg:block bg-transparent hover:bg-slate-300 transition-colors rounded-full cursor-col-resize z-10" /></>\n        )}`
);

// 6. Wrap the third column (Crucible panel wrapper)
code = code.replace(
  /        <PaneBoundary name="The crucible">/,
  `        <ResizablePanel defaultSize={45} minSize={25} order={3} className={isPortalOpen ? '!flex-none w-0 h-0 overflow-visible' : ''}>\n        <PaneBoundary name="The crucible">`
);

// Inside the crucible, replace the grid rows with vertical panels
code = code.replace(
  /: "grid grid-rows-\[1.2fr_1fr\] gap-2 h-full min-h-0"/,
  `: "h-full w-full min-h-0"`
);

// We need to conditionally render PanelGroup for vertical if not portal open. 
// BUT wait, it's easier to just do it via DOM tree since React doesn't like moving trees.
// Let's just modify the string for the Editor Panel and the Live Preview + Verdict Panel.
