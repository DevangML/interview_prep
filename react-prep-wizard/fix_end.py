with open('src/pages/MasteryPage.tsx', 'r') as f:
    content = f.read()

import re

# We will just replace everything after the CodeEditor of the verdict.
replacement = """                      <CodeEditor 
                        value={cur.practice.solutionCode} 
                        readOnly={true} 
                        lang={cur.practice.type === 'css' ? 'css' : 'jsx'} 
                        className="h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Panel>
            </ResizablePanel>
          </>)}
          </PanelGroup>
          </ResizablePanel>
        </PanelGroup>
        </PaneBoundary>
        </ResizablePanel>
      </PanelGroup>
</main>
    </div>
  );
}"""

content = re.sub(r'                      <CodeEditor \n                        value=\{cur.practice.solutionCode\}.*', replacement, content, flags=re.DOTALL)

with open('src/pages/MasteryPage.tsx', 'w') as f:
    f.write(content)
