const fs = require('fs');
const path = require('path');
const p = path.resolve('src/pages/MasteryPage.tsx');
let text = fs.readFileSync(p, 'utf-8');

text = text.replace(/log: \(\.\.\.args\) =>/g, "log: (...args: any[]) =>");
text = text.replace(/error: \(\.\.\.args\) =>/g, "error: (...args: any[]) =>");
text = text.replace(/warn: \(\.\.\.args\) =>/g, "warn: (...args: any[]) =>");

fs.writeFileSync(p, text, 'utf-8');
