const fs = require('fs');

let code = fs.readFileSync('src/pages/MasteryPage.tsx', 'utf8');

code = code.replace(
  "import { useState, useDeferredValue, useEffect, useMemo } from 'react';",
  "import { useState, useDeferredValue, useEffect, useMemo } from 'react';\nimport { PanelGroup, Panel as ResizablePanel, PanelResizeHandle } from 'react-resizable-panels';"
);

// 1. Replace main grid
code = code.replace(
  /<main className="grid grid-cols-[^"]+">/,
  `<main className="p-2 flex-1 min-h-0 flex flex-col lg:flex-row gap-2">\n        <PanelGroup direction="horizontal" className="h-full w-full">`
);

// 2. Close main PanelGroup
code = code.replace(
  /        <\/PaneBoundary>\n      <\/main>/,
  `        </PaneBoundary>\n          </ResizablePanel>\n        </PanelGroup>\n      </main>`
);

// 3. Wrap left column
code = code.replace(
  /        {!isPortalOpen && \(\n        <PaneBoundary name="The stream navigator">/,
  `        {!isPortalOpen && (\n          <>\n          <ResizablePanel defaultSize={20} minSize={15} order={1}>\n            <PaneBoundary name="The stream navigator" className="h-full pr-1">`
);
code = code.replace(
  /        <\/PaneBoundary>\n        \)}/,
  `            </PaneBoundary>\n          </ResizablePanel>\n          <PanelResizeHandle className="w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10" />\n          </>\n        )}`
);

// 4. Wrap center column
code = code.replace(
  /        {!isPortalOpen && \(\n        <Panel title={`Theory: \${cur.trackName}`} className="h-full flex flex-col border-slate-200 shadow-sm">/,
  `        {!isPortalOpen && (\n          <>\n          <ResizablePanel defaultSize={35} minSize={20} order={2}>\n            <PaneBoundary name="Theory Panel" className="h-full pr-1 pl-1">\n              <Panel title={\`Theory: \${cur.trackName}\`} className="h-full flex flex-col border-slate-200 shadow-sm">`
);
code = code.replace(
  /              <\/button>\n            <\/div>\n          <\/div>\n          <\/PaneBoundary>\n        <\/Panel>\n        \)}/,
  `              </button>\n            </div>\n          </div>\n          </PaneBoundary>\n              </Panel>\n            </PaneBoundary>\n          </ResizablePanel>\n          <PanelResizeHandle className="w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10" />\n          </>\n        )}`
);

// 5. Wrap right column wrapper
code = code.replace(
  /        <PaneBoundary name="The crucible">/,
  `        <ResizablePanel defaultSize={45} minSize={30} order={3} className={isPortalOpen ? '!flex-none w-0 h-0 overflow-visible' : ''}>\n          <PaneBoundary name="The crucible" className={isPortalOpen ? '' : 'h-full pl-1'}>`
);

// 6. Inside Crucible: Vertical PanelGroup when not portal
// Find: : "grid grid-rows-[1.2fr_1fr] gap-2 h-full min-h-0"
code = code.replace(
  /: "grid grid-rows-\[1.2fr_1fr\] gap-2 h-full min-h-0"/,
  `: "h-full min-h-0 w-full"`
);

// Replace Editor Panel start
code = code.replace(
  /          {\/\* Editor Panel \*\/}\n          <Panel/,
  `          {/* Vertical PanelGroup wrapper */}\n          {!isPortalOpen ? (\n            <PanelGroup direction="vertical" className="h-full w-full">\n              <ResizablePanel defaultSize={55} minSize={20} order={1} className="pb-1">\n                <Panel`
);

// We need to close the Editor Panel and add the horizontal divider, then open Live Preview Panel.
// The Editor Panel ends before: {/* Live Preview & Spec Checklist */}
code = code.replace(
  /          <\/Panel>\n\n          {\/\* Live Preview & Spec Checklist \*\/}/,
  `                </Panel>\n              </ResizablePanel>\n              <PanelResizeHandle className="h-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-row-resize z-10" />\n              <ResizablePanel defaultSize={45} minSize={20} order={2} className="pt-1">\n\n          {/* Live Preview & Spec Checklist */}`
);

// And close the vertical PanelGroup at the very end of the crucible wrapper
code = code.replace(
  /          <\/div>\n        <\/div>\n          <\/ResizablePanel>/, // Note: the closing tag of the crucible wrapper is </div></div></ResizablePanel> because we added ResizablePanel wrapping PaneBoundary. Wait, let's just match the end
  `          </div>\n              </ResizablePanel>\n            </PanelGroup>\n          ) : (\n            <>\n              {/* When portal is open, we just render Editor and Preview side-by-side using the flex classes already defined in the outer div */}\n              `
);

// Wait! This regex replacement for the closing tag is tricky.
// Let's use AST or precise string matching.
fs.writeFileSync('patch_mastery.js.tmp', code);
