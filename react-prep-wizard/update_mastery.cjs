const fs = require('fs');

let c = fs.readFileSync('src/pages/MasteryPage.tsx', 'utf8');

c = c.replace(/import SandboxFrame from '\.\.\/components\/preview\/SandboxFrame';/, `import SandboxFrame from '../components/preview/SandboxFrame';
import ResponsiveViewer from '../components/preview/ResponsiveViewer';`);

c = c.replace(/const \[deviceWidth, setDeviceWidth\] = useState<'100%' \| '375px' \| '768px'>\('100%'\);\n/, '');

// Remove the inline actions from Live Preview Panel
c = c.replace(/actions=\{isPortalOpen && \(\s*<div className="flex items-center gap-2">[\s\S]*?<\/div>\s*\)\}/, '');

// CSS preview
const cssPreviewOld = `<div className="w-full h-full flex justify-center items-center overflow-auto bg-slate-900">
                  <iframe
                    title="css-preview"
                    srcDoc={fullCssHtml}
                    sandbox="allow-scripts allow-same-origin"
                    style={{ width: isPortalOpen ? deviceWidth : '100%', transition: 'width 0.2s ease-in-out' }}
                    className={\`h-full border-0 bg-white shadow-2xl \${isPortalOpen && deviceWidth !== '100%' ? 'rounded-lg max-h-[812px]' : ''}\`}
                  />
                </div>`;
const cssPreviewNew = `isPortalOpen ? (
                  <ResponsiveViewer>
                    <iframe
                      title="css-preview"
                      srcDoc={fullCssHtml}
                      sandbox="allow-scripts allow-same-origin"
                      className="w-full h-full border-0 bg-white"
                    />
                  </ResponsiveViewer>
                ) : (
                  <div className="w-full h-full bg-white">
                    <iframe
                      title="css-preview"
                      srcDoc={fullCssHtml}
                      sandbox="allow-scripts allow-same-origin"
                      className="w-full h-full border-0"
                    />
                  </div>
                )`;
c = c.replace(cssPreviewOld, cssPreviewNew);

// JSX preview
const jsxPreviewOld = `<div className="w-full h-full flex justify-center items-center overflow-auto bg-slate-900">
                  <div style={{ width: isPortalOpen ? deviceWidth : '100%', transition: 'width 0.2s ease-in-out' }} className={\`h-full bg-white shadow-2xl \${isPortalOpen && deviceWidth !== '100%' ? 'rounded-lg max-h-[812px]' : ''}\`}>
                    <SandboxFrame
                      baseCSS=""
                      userCSS=""
                      jsCode={compiledJs}
                      className="h-full w-full bg-white"
                    />
                  </div>
                </div>`;
const jsxPreviewNew = `isPortalOpen ? (
                  <ResponsiveViewer>
                    <SandboxFrame
                      baseCSS=""
                      userCSS=""
                      jsCode={compiledJs}
                      className="h-full w-full bg-white"
                    />
                  </ResponsiveViewer>
                ) : (
                  <div className="w-full h-full bg-white">
                    <SandboxFrame
                      baseCSS=""
                      userCSS=""
                      jsCode={compiledJs}
                      className="h-full w-full bg-white"
                    />
                  </div>
                )`;
c = c.replace(jsxPreviewOld, jsxPreviewNew);

fs.writeFileSync('src/pages/MasteryPage.tsx', c);
