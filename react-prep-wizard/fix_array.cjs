const fs = require('fs');
const path = require('path');
const p = path.resolve('src/data/masteryStream.ts');
let text = fs.readFileSync(p, 'utf-8');

// Find the end of reactUnits which is:
//     },
//   },
// ];
// and replace it with:
//     },
//   },
//   { // start of moreReactUnits

text = text.replace(
  /    \},\n  \},\n\];\n\n\n  \{\n    id: 'react-memo-referential-equality',/g,
  "    },\n  },\n  {\n    id: 'react-memo-referential-equality',"
);

// Then we need to add the closing ]; after the last element of moreReactUnits
// The last element ends before:
// export const MASTERY_UNITS: MasteryUnit[] = [

text = text.replace(
  /    \},\n  \},\n\nexport const MASTERY_UNITS: MasteryUnit\[\] = \[/g,
  "    },\n  },\n];\n\nexport const MASTERY_UNITS: MasteryUnit[] = ["
);

fs.writeFileSync(p, text, 'utf-8');
