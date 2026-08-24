const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('css100.html', 'utf8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:8777/css100.html"
});

dom.window.document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    try {
      const cm = dom.window.EDITOR.of(dom.window.document.querySelector('#jsx'));
      if(!cm) { console.log('no cm'); return; }
      
      cm.setValue('');
      cm.replaceRange('div.red', {line:0,ch:0});
      
      console.log('before enter:', cm.getValue());
      
      // Simulate Enter key
      dom.window.CodeMirror.commands.newlineAndIndent = function() { console.log('fallback called'); };
      
      // We need to trigger the Enter key handler from extraKeys
      const enterHandler = cm.getOption("extraKeys").Enter;
      enterHandler(cm);
      
      console.log('after enter:', cm.getValue());
    } catch(e) {
      console.error('ERROR:', e);
    }
  }, 1000);
});
