const fs = require('fs');

let c = fs.readFileSync('src/pages/PlaygroundPage.tsx', 'utf8');

c = c.replace(/import SandboxFrame from '\.\.\/components\/preview\/SandboxFrame';/, `import SandboxFrame from '../components/preview/SandboxFrame';
import ResponsiveViewer from '../components/preview/ResponsiveViewer';`);

c = c.replace(/<SandboxFrame baseCSS=\{appCss\} userCSS=\{cssCode\} jsCode=\{compiledJs\} \/>/, `<ResponsiveViewer>
              <SandboxFrame baseCSS={appCss} userCSS={cssCode} jsCode={compiledJs} />
            </ResponsiveViewer>`);

fs.writeFileSync('src/pages/PlaygroundPage.tsx', c);
