const fs = require('fs');
let code = fs.readFileSync('editor.js', 'utf8');

const smartFn = `
function smartNewlineAndIndent(cm){
  try {
    var cur = cm.getCursor();
    var line = cm.getLine(cur.line);
    var before = line.slice(0, cur.ch);
    var after = line.slice(cur.ch);
    var baseIndent = (line.match(/^(\\s*)/) || ['',''])[1];
    
    // Case 1: Between brackets { }, [ ], or JSX tags <div> </div>, <> </>
    var isBetweenBrackets = /(<[a-zA-Z0-9_.-]+[^>]*>|<>\\s*|\\{|\\[|\\()\\s*$/.test(before) && 
                            /^\\s*(<\\/[a-zA-Z0-9_.-]+>|<\\/>|\\}|\\]|\\))/.test(after);
    
    if (isBetweenBrackets) {
      var insert = '\\n' + baseIndent + '  \\n' + baseIndent;
      cm.replaceRange(insert, cur);
      cm.setCursor({ line: cur.line + 1, ch: baseIndent.length + 2 });
      return;
    }

    // Case 2: Line ending with an opening tag (<>, <tag>), brace, bracket, or keyword
    var endsWithOpen = /(?:<[a-zA-Z0-9_.-]+[^>]*>|<>\\s*|\\b(?:return|function|class|if|else|for)\\b|\\{|\\[|\\()\\s*$/.test(before);
    if (endsWithOpen) {
      cm.replaceRange('\\n' + baseIndent + '  ', cur);
      return;
    }
    
    // Default fallback
    cm.execCommand('newlineAndIndent');
  } catch(e) {
    cm.execCommand('newlineAndIndent');
  }
}
`;

const targetEnter = `  extra.Enter = function(c) {
    if(suggestHUD && suggestNavigated) {
      applySuggestion(suggestActiveIndex);
      return;
    }
    hideSuggestions();
    c.execCommand('newlineAndIndent');
  };`;

const newEnter = `  extra.Enter = function(c) {
    if(suggestHUD && suggestNavigated) {
      applySuggestion(suggestActiveIndex);
      return;
    }
    hideSuggestions();
    smartNewlineAndIndent(c);
  };`;

code = code.replace(targetEnter, smartFn + '\n' + newEnter);
fs.writeFileSync('editor.js', code);
console.log("Injected smartNewlineAndIndent!");
