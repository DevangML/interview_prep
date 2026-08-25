const fs = require('fs');

const path = 'src/pages/MasteryPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// The wrapper for Preview + Checklist
content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-[1fr_12rem] gap-2 h-full min-h-0">',
  `<div className={\`gap-2 h-full min-h-0 flex-1 \${isPortalOpen ? 'flex flex-col bg-slate-950 rounded-xl border border-slate-800' : 'grid grid-cols-1 md:grid-cols-[1fr_12rem]'}\`}>`
);

// We need to add Device buttons to the Live Preview Panel, or replace the Panel header if isPortalOpen.
// Let's modify the Panel title to include actions if isPortalOpen
const previewPanelStart = `            <Panel
              title={cur.trackId === 'behavioural' ? 'Rehearsal' : cur.practice.type === 'js_snippet' ? 'Console Output' : 'Live Preview'}`;

const newPreviewPanelStart = `            <Panel
              title={cur.trackId === 'behavioural' ? 'Rehearsal' : cur.practice.type === 'js_snippet' ? 'Console Output' : 'Live Preview'}
              actions={isPortalOpen && (
                <div className="flex items-center gap-2">
                  <button onClick={() => setDeviceWidth('375px')} className={\`p-1.5 rounded \${deviceWidth === '375px' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'}\`}><Smartphone size={14}/></button>
                  <button onClick={() => setDeviceWidth('768px')} className={\`p-1.5 rounded \${deviceWidth === '768px' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'}\`}><Tablet size={14}/></button>
                  <button onClick={() => setDeviceWidth('100%')} className={\`p-1.5 rounded \${deviceWidth === '100%' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'}\`}><Monitor size={14}/></button>
                </div>
              )}`;

content = content.replace(previewPanelStart, newPreviewPanelStart);

// We need to hide Checklist if portal is open
const checklistStart = `<Panel
              title={verdict ? (verdict.pass ? 'Verdict · PASS' : 'Verdict · FAIL') : 'Spec Checklist'}`;

content = content.replace(
  checklistStart,
  `{!isPortalOpen && (\n            <Panel
              title={verdict ? (verdict.pass ? 'Verdict · PASS' : 'Verdict · FAIL') : 'Spec Checklist'}`
);

const checklistEnd = `                )}
              </div>
            </Panel>`;
content = content.replace(checklistEnd, `${checklistEnd}\n          )}`);

// Now for the actual preview container width constraint:
const iframeString = `<iframe
                  title="css-preview"
                  srcDoc={fullCssHtml}
                  sandbox="allow-scripts allow-same-origin"
                  className="w-full h-full border-0 bg-white"
                />`;
const newIframe = `<div className="w-full h-full flex justify-center items-center overflow-auto bg-slate-900">
                  <iframe
                    title="css-preview"
                    srcDoc={fullCssHtml}
                    sandbox="allow-scripts allow-same-origin"
                    style={{ width: isPortalOpen ? deviceWidth : '100%', transition: 'width 0.2s ease-in-out' }}
                    className={\`h-full border-0 bg-white shadow-2xl \${isPortalOpen && deviceWidth !== '100%' ? 'rounded-lg max-h-[812px]' : ''}\`}
                  />
                </div>`;

content = content.replace(iframeString, newIframe);

const sandboxString = `<SandboxFrame
                  baseCSS=""
                  userCSS=""
                  jsCode={compiledJs}
                  className="h-full w-full bg-white"
                />`;

const newSandbox = `<div className="w-full h-full flex justify-center items-center overflow-auto bg-slate-900">
                  <div style={{ width: isPortalOpen ? deviceWidth : '100%', transition: 'width 0.2s ease-in-out' }} className={\`h-full bg-white shadow-2xl \${isPortalOpen && deviceWidth !== '100%' ? 'rounded-lg max-h-[812px]' : ''}\`}>
                    <SandboxFrame
                      baseCSS=""
                      userCSS=""
                      jsCode={compiledJs}
                      className="h-full w-full bg-white"
                    />
                  </div>
                </div>`;

content = content.replace(sandboxString, newSandbox);

fs.writeFileSync(path, content);
