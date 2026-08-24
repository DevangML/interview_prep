const fs = require('fs');
let content = fs.readFileSync('editor.js', 'utf8');

// Replace smartNewlineAndIndent
content = content.replace(/function smartNewlineAndIndent\(cm\)\{[\s\S]*?\}\n/g, `function smartNewlineAndIndent(cm){
  var cur = cm.getCursor();
  var line = cm.getLine(cur.line);
  var before = line.slice(0, cur.ch);
  var after = line.slice(cur.ch);

  // VSCode style matching: Between { and }, or [ and ], or <tag> and </tag>
  if (/(<[a-zA-Z0-9_.-]+[^>]*>|<>\s*|\{|\[|\()\\s*$/.test(before) && /^\\s*(<\\/[a-zA-Z0-9_.-]+>|<\\/>|\\}|\\]|\\))/.test(after)) {
    CodeMirror.commands.newlineAndIndent(cm);
    var newCur = cm.getCursor();
    cm.replaceSelection("\\n");
    cm.indentLine(newCur.line + 1, "smart");
    cm.setCursor(newCur);
    return;
  }

  // Otherwise, default to CodeMirror's own smart newline and indent
  CodeMirror.commands.newlineAndIndent(cm);
}
`);
console.log(content.includes('function smartNewlineAndIndent(cm){'));
