const fs = require('fs');
let text = fs.readFileSync('src/main.tsx', 'utf-8');

// Add import
text = text.replace(
  "import PlaygroundPage from './pages/PlaygroundPage';",
  "import PlaygroundPage from './pages/PlaygroundPage';\nimport RapidFirePage from './pages/RapidFirePage';"
);

// Replace route
text = text.replace(
  "<Route path=\"rapid\" element={<Navigate to=\"/\" replace />} />",
  "<Route path=\"rapid\" element={<RapidFirePage />} />"
);

fs.writeFileSync('src/main.tsx', text, 'utf-8');
