import re

with open('src/pages/MasteryPage.tsx', 'r') as f:
    content = f.read()

# 1. Imports
if 'react-resizable-panels' not in content:
    content = content.replace(
        "import { useState, useDeferredValue, useEffect, useMemo } from 'react';",
        "import { useState, useDeferredValue, useEffect, useMemo } from 'react';\nimport { PanelGroup, Panel as ResizablePanel, PanelResizeHandle } from 'react-resizable-panels';"
    )

# 2. Outer Layout
content = content.replace(
    '<main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr_1.1fr] xl:grid-cols-[20rem_1fr_1.1fr] gap-2 p-2 flex-1 min-h-0">',
    '<main className="p-2 flex-1 min-h-0 flex flex-col lg:flex-row gap-2">\n<PanelGroup direction="horizontal" className="h-full w-full gap-2">'
)
content = content.replace(
    '</main>',
    '</PanelGroup>\n</main>'
)

# 3. Outer Left Panel
content = content.replace(
    '{/* Left: the stream navigator — search, facets, two-level grouping */}\n        {!isPortalOpen && (\n        <PaneBoundary name="The stream navigator">',
    '{/* Left: the stream navigator — search, facets, two-level grouping */}\n        {!isPortalOpen && (<>\n        <ResizablePanel defaultSize={20} minSize={15} order={1}>\n        <PaneBoundary name="The stream navigator" className="h-full">'
)
content = content.replace(
    '        </PaneBoundary>\n        )}',
    '        </PaneBoundary>\n        </ResizablePanel>\n        <PanelResizeHandle className="w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10 hidden lg:block" />\n        </>)}'
)

# 4. Outer Center Panel
content = content.replace(
    '{/* Center: Theory, Spoken Defense, MCQ */}\n        {!isPortalOpen && (\n        <Panel title={`Theory: ${cur.trackName}`} className="h-full flex flex-col border-slate-200 shadow-sm">',
    '{/* Center: Theory, Spoken Defense, MCQ */}\n        {!isPortalOpen && (<>\n        <ResizablePanel defaultSize={35} minSize={20} order={2}>\n        <Panel title={`Theory: ${cur.trackName}`} className="h-full flex flex-col border-slate-200 shadow-sm">'
)
content = content.replace(
    '          </PaneBoundary>\n        </Panel>\n        )}',
    '          </PaneBoundary>\n        </Panel>\n        </ResizablePanel>\n        <PanelResizeHandle className="w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10 hidden lg:block" />\n        </>)}'
)

# 5. Outer Right Panel (Crucible)
content = content.replace(
    '{/* Right: Code Crucible, Live Preview & Specs */}\n        <PaneBoundary name="The crucible">',
    '{/* Right: Code Crucible, Live Preview & Specs */}\n        <ResizablePanel defaultSize={45} minSize={25} order={3} className={isPortalOpen ? "!flex-none w-0 h-0 overflow-visible" : ""}>\n        <PaneBoundary name="The crucible" className="h-full">'
)
content = content.replace(
    '        </PaneBoundary>\n      </main>',
    '        </PaneBoundary>\n        </ResizablePanel>\n      </main>'
)

# 6. Inner Layout (Crucible div to PanelGroup)
content = content.replace(
    '''        <div className={
            isPortalOpen
              ? "fixed inset-0 z-50 bg-slate-900 p-2 gap-2 flex flex-col lg:flex-row-reverse"
              : "grid grid-rows-[1.2fr_1fr] gap-2 h-full min-h-0"
          }>''',
    '''        <PanelGroup direction={isPortalOpen ? "horizontal" : "vertical"} className={
            isPortalOpen
              ? "fixed inset-0 z-50 bg-slate-900 p-2 gap-2"
              : "h-full min-h-0 gap-2 w-full"
          }>'''
)
# Match closing div of inner layout
# The closing div is before </PaneBoundary> which we already wrapped
content = content.replace(
    '        </div>\n        </PaneBoundary>\n        </ResizablePanel>',
    '        </PanelGroup>\n        </PaneBoundary>\n        </ResizablePanel>'
)

# 7. Inner Editor Panel
content = content.replace(
    '          {/* Editor Panel */}\n          <Panel',
    '          {/* Editor Panel */}\n          <ResizablePanel defaultSize={55} minSize={20} order={isPortalOpen ? 2 : 1}>\n          <Panel'
)
# End of Editor Panel is before {/* Live Preview & Spec Checklist */}
content = content.replace(
    '          </Panel>\n\n          {/* Live Preview & Spec Checklist */}',
    '          </Panel>\n          </ResizablePanel>\n          <PanelResizeHandle className={`flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full z-10 ${isPortalOpen ? "w-1.5 cursor-col-resize" : "h-1.5 cursor-row-resize"}`} />\n\n          {/* Live Preview & Spec Checklist */}'
)

# 8. Inner Live Preview & Spec Checklist
content = content.replace(
    '          <div className={`gap-2 h-full min-h-0 flex-1 ${isPortalOpen ? \'flex flex-col bg-slate-950 rounded-xl border border-slate-800\' : \'grid grid-cols-1 md:grid-cols-[1fr_12rem]\'}`}>',
    '          <ResizablePanel defaultSize={45} minSize={20} order={isPortalOpen ? 1 : 2}>\n          <PanelGroup direction={isPortalOpen ? "vertical" : "horizontal"} className={`gap-2 h-full min-h-0 w-full ${isPortalOpen ? \'bg-slate-950 rounded-xl border border-slate-800 p-1\' : \'\'}`}>'
)
# We need to wrap Live Preview in ResizablePanel
content = content.replace(
    '            <Panel\n              title={cur.trackId === \'behavioural\'',
    '            <ResizablePanel defaultSize={65} minSize={30} order={1}>\n            <Panel\n              title={cur.trackId === \'behavioural\''
)
# We need to close Live Preview and open Verdict
content = content.replace(
    '              )}\n            </Panel>\n\n            {!isPortalOpen && (',
    '              )}\n            </Panel>\n            </ResizablePanel>\n            {!isPortalOpen && <PanelResizeHandle className="w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10 hidden md:block" />}\n\n            {!isPortalOpen && ('
)
# Wrap Verdict
content = content.replace(
    '            {!isPortalOpen && (\n            <Panel\n              title={verdict ? (verdict.pass ? \'Verdict · PASS\' : \'Verdict · FAIL\') : \'Spec Checklist\'}',
    '            {!isPortalOpen && (<>\n            <ResizablePanel defaultSize={35} minSize={20} order={2}>\n            <Panel\n              title={verdict ? (verdict.pass ? \'Verdict · PASS\' : \'Verdict · FAIL\') : \'Spec Checklist\'}'
)
# Close Verdict and outer PanelGroup
content = content.replace(
    '                )}\n              </div>\n            </Panel>\n          )}\n          </div>',
    '                )}\n              </div>\n            </Panel>\n            </ResizablePanel>\n          </>)}\n          </PanelGroup>\n          </ResizablePanel>'
)

with open('src/pages/MasteryPage.tsx', 'w') as f:
    f.write(content)
