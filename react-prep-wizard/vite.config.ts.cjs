const fs = require('fs');

let c = fs.readFileSync('vite.config.ts', 'utf8');

if (!c.includes('preview: {')) {
  c = c.replace(/server: {/, `preview: {
    port: 4173,
    proxy: {
      '/api': 'http://localhost:8777',
    },
  },
  server: {`);
  fs.writeFileSync('vite.config.ts', c);
}
