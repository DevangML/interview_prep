// Just to touch the file so Vite reloads if it hasn't
const fs = require('fs');
const now = new Date();
fs.utimesSync('src/pages/MasteryPage.tsx', now, now);
