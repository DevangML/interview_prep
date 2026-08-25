const fs = require('fs');

let c = fs.readFileSync('src/pages/MasteryPage.tsx', 'utf8');

c = c.replace(/<div className="h-64 rounded bg-white overflow-hidden border border-red-200 shadow-sm">/, '<div className="h-64 rounded bg-white overflow-hidden border border-red-200 shadow-sm flex flex-col">');

c = c.replace(/lang={cur.practice.type === 'css' \? 'css' : 'jsx'} \n                      \/>/g, `lang={cur.practice.type === 'css' ? 'css' : 'jsx'} 
                        className="h-full"
                      />`);

fs.writeFileSync('src/pages/MasteryPage.tsx', c);
