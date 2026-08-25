const fs = require('fs');

const path = 'src/pages/MasteryPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Revert Theory panel
content = content.replace(
  'className={`h-full flex flex-col border-slate-200 shadow-sm ${isPortalOpen ? \'lg:w-[500px] shrink-0\' : \'\'}`}',
  'className="h-full flex flex-col border-slate-200 shadow-sm"'
);

// Apply it to the Code Crucible
const crucibleStart = `            className="h-full flex flex-col border-slate-200 shadow-sm"
          >
            <div className="flex flex-col h-full min-h-0">`;

content = content.replace(
  crucibleStart,
  `            className={\`h-full flex flex-col border-slate-200 shadow-sm \${isPortalOpen ? 'md:w-[450px] lg:w-[500px] xl:w-[600px] shrink-0' : ''}\`}
          >
            <div className="flex flex-col h-full min-h-0">`
);

// Also we need to hide the StreamNav and Theory Panel when isPortalOpen is true
// StreamNav is wrapped in PaneBoundary
const streamNavStart = `<PaneBoundary name="The stream navigator">
          <StreamNav`;
content = content.replace(
  streamNavStart,
  `{!isPortalOpen && (
        <PaneBoundary name="The stream navigator">
          <StreamNav`
);
const streamNavEnd = `          />
        </PaneBoundary>`;
content = content.replace(
  streamNavEnd,
  `          />
        </PaneBoundary>
        )}`
);

// Theory Panel
const theoryStart = `<Panel title={\`Theory: \${cur.trackName}\`} className="h-full flex flex-col border-slate-200 shadow-sm">`;
content = content.replace(
  theoryStart,
  `{!isPortalOpen && (
        <Panel title={\`Theory: \${cur.trackName}\`} className="h-full flex flex-col border-slate-200 shadow-sm">`
);
const theoryEnd = `              </button>
            </div>
          </div>
        </Panel>`;
content = content.replace(
  theoryEnd,
  `              </button>
            </div>
          </div>
        </Panel>
        )}`
);

fs.writeFileSync(path, content);
