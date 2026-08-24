const fs = require('fs');
let code = fs.readFileSync('editor.js', 'utf8');

const oldEnter = `  extra.Enter = function(c) {
    if(suggestHUD && suggestNavigated) {
      applySuggestion(suggestActiveIndex);
      return;
    }
    if(modeName !== 'css' && expandEmmetIfAny(c, modeName === 'jsx')) {
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
    c.execCommand('newlineAndIndent');
  };`;

code = code.replace(oldEnter, newEnter);
fs.writeFileSync('editor.js', code);
console.log("Patched editor.js to remove Emmet from Enter");
