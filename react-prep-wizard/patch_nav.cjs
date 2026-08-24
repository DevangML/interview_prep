const fs = require('fs');
let text = fs.readFileSync('src/config/navigation.ts', 'utf-8');

text = text.replace(
  "Play\n} from 'lucide-react';",
  "Play,\n  Zap\n} from 'lucide-react';"
);

const newNav = `{
    id: 'rapid',
    label: 'Rapid Fire OA',
    to: '/rapid',
    icon: Zap,
    desc: 'Mettl MCQ Simulator',
  },
  {
    id: 'lab',`;
    
text = text.replace(
  `{
    id: 'lab',`,
  newNav
);

fs.writeFileSync('src/config/navigation.ts', text, 'utf-8');
