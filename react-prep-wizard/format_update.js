const fs = require('fs');

const path = 'src/pages/MasteryPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace onChange={setUserCode} with onChange={handleCodeChange}
content = content.replace(/onChange=\{setUserCode\}/g, 'onChange={handleCodeChange}\n                    onFormat={handleFormat}');

fs.writeFileSync(path, content);
