const fs = require('fs');

const path = 'src/pages/MasteryPage.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<PaneBoundary name="The crucible">',
  `<PaneBoundary name="The crucible">`
);

content = content.replace(
  '<div className="grid grid-rows-[1.2fr_1fr] gap-2 h-full min-h-0">',
  `<div className={
            isPortalOpen
              ? "fixed inset-0 z-50 bg-slate-900 p-2 gap-2 flex flex-col lg:flex-row-reverse"
              : "grid grid-rows-[1.2fr_1fr] gap-2 h-full min-h-0"
          }>`
);

content = content.replace(
  'className="h-full flex flex-col border-slate-200 shadow-sm"',
  `className={\`h-full flex flex-col border-slate-200 shadow-sm \${isPortalOpen ? 'lg:w-[500px] shrink-0' : ''}\`}`
);

// Add Close Portal button if portal is open
content = content.replace(
  '<MonitorSmartphone size={14} /> Responsive',
  `{isPortalOpen ? <><X size={14} /> Close Portal</> : <><MonitorSmartphone size={14} /> Responsive</>}`
);
content = content.replace(
  'onClick={() => setIsPortalOpen(true)}',
  'onClick={() => setIsPortalOpen(!isPortalOpen)}'
);

fs.writeFileSync(path, content);
