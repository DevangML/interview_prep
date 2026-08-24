const fs = require('fs');
const path = require('path');
const p = path.resolve('src/data/masteryStream.ts');
let text = fs.readFileSync(p, 'utf-8');

text = text.replace(
  "level: 'Warm-up' | 'Core' | 'Advanced' | 'Crucible';",
  "level: 'Warm-up' | 'Core' | 'Advanced' | 'Crucible';\n  category: string;"
);

// We need to inject category into the mappings.
// For coreUnits: category: 'Core JavaScript'
text = text.replace(/level: 'Core',\n\s*xp: 50,/g, "level: 'Core',\n    category: 'Object Memory & Equalities',\n    xp: 50,");
text = text.replace(/level: 'Warm-up',\n\s*xp: 25,/g, "level: 'Warm-up',\n    category: 'Object Memory & Equalities',\n    xp: 25,");
text = text.replace(/level: 'Crucible',\n\s*xp: 100,/g, "level: 'Crucible',\n    category: 'The Event Loop',\n    xp: 100,");
text = text.replace(/level: 'Crucible',\n\s*xp: 75,/g, "level: 'Crucible',\n    category: 'Closures & Scope',\n    xp: 75,");
text = text.replace(/level: 'Advanced',\n\s*xp: 50,/g, "level: 'Advanced',\n    category: 'Object Memory & Equalities',\n    xp: 50,");
text = text.replace(/level: 'Advanced',\n\s*xp: 75,/g, "level: 'Advanced',\n    category: 'REST & Fetch API',\n    xp: 75,");

// For CSS100, we map cat to the name of the cat
text = text.replace(/trackName: 'CSS 2D Layouts',\n\s*title: title,/g, "trackName: 'CSS 2D Layouts',\n    category: CSS100.cats.find(c => c.k === item.cat)?.n || 'General Layouts',\n    title: title,");

// For ladderUnits, we use 'Stage N'
text = text.replace(/trackName: 'React 19 Architecture',\n\s*title: \`\[Stage \$\{lesson.stage\}\] \$\{lesson.title\}\`,/g, "trackName: 'React 19 Architecture',\n  category: `Stage ${lesson.stage} Fundamentals`,\n  title: lesson.title,");

fs.writeFileSync(p, text, 'utf-8');
