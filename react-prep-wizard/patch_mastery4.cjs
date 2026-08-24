const fs = require('fs');
let text = fs.readFileSync('src/data/masteryStream.ts', 'utf-8');

const additional = `
  diagram?: any;
  hints?: string[];
  verify?: string;
  why?: string;
  takeaway?: string;
  theory: {`;

text = text.replace("theory: {", additional);
text = text.replace("baseHtml?: string;", "baseHtml?: string;\n    baseCss?: string;");

fs.writeFileSync('src/data/masteryStream.ts', text, 'utf-8');
