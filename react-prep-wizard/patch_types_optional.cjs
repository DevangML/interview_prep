const fs = require('fs');
let types = fs.readFileSync('src/data/tracks/types.ts', 'utf-8');

const additional = `
  diagram?: any;
  hints?: string[];
  verify?: string;
  why?: string;
  takeaway?: string;
  theory: {`;

types = types.replace("theory: {", additional);
fs.writeFileSync('src/data/tracks/types.ts', types, 'utf-8');
