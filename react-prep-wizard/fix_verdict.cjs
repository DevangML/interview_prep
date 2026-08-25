const fs = require('fs');

let c = fs.readFileSync('src/pages/MasteryPage.tsx', 'utf8');

const target = `{verdict?.pass && (
                  <p className="text-[11px] text-emerald-800 bg-white p-2 rounded-lg border border-emerald-200">
                    Computed output matches the reference on every check.
                  </p>
                )}`;

const replacement = `{verdict?.pass && (
                  <p className="text-[11px] text-emerald-800 bg-white p-2 rounded-lg border border-emerald-200">
                    Computed output matches the reference on every check.
                  </p>
                )}

                {verdict && !verdict.pass && (
                  <div className="mt-4 pt-3 border-t border-red-200/50">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-1.5">
                      <Wand2 size={13} /> Reference Solution
                    </h4>
                    <div className="h-64 rounded bg-white overflow-hidden border border-red-200 shadow-sm">
                      <CodeEditor 
                        value={cur.practice.solutionCode} 
                        readOnly={true} 
                        lang={cur.practice.type === 'css' ? 'css' : 'jsx'} 
                      />
                    </div>
                  </div>
                )}`;

c = c.replace(target, replacement);

fs.writeFileSync('src/pages/MasteryPage.tsx', c);
