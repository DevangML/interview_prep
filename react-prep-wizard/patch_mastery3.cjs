const fs = require('fs');
let text = fs.readFileSync('src/data/masteryStream.ts', 'utf-8');

// Replace the whole interface and MASTERY_TRACKS definition with imports
text = text.replace(/export interface MasteryUnit {[\s\S]*?\] as const;/g, "import { MasteryUnit, MASTERY_TRACKS } from './tracks/types';\nexport { MASTERY_TRACKS };");

fs.writeFileSync('src/data/masteryStream.ts', text, 'utf-8');
