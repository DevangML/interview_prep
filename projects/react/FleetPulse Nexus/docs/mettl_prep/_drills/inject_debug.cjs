const fs = require('fs');
let html = fs.readFileSync('css100.html', 'utf8');

const debugScript = `
<script>
window.onerror = function(msg, url, line, col, error) {
  var d = document.getElementById('debug-log') || document.createElement('div');
  d.id = 'debug-log';
  d.style.cssText = 'position:fixed; z-index:99999; background:red; color:white; top:0; left:0; padding:10px; font-size:12px; max-width:500px; word-wrap:break-word;';
  d.innerHTML += '<br>ERROR: ' + msg + ' at ' + line + ':' + col + ' ' + (error ? error.stack : '');
  document.body.appendChild(d);
};
window.addEventListener('unhandledrejection', function(event) {
  var d = document.getElementById('debug-log') || document.createElement('div');
  d.id = 'debug-log';
  d.style.cssText = 'position:fixed; z-index:99999; background:red; color:white; top:0; left:0; padding:10px; font-size:12px; max-width:500px; word-wrap:break-word;';
  d.innerHTML += '<br>PROMISE REJECTION: ' + (event.reason ? event.reason.stack || event.reason : 'Unknown');
  document.body.appendChild(d);
});
</script>
`;

if(!html.includes('debug-log')) {
  html = html.replace('</head>', debugScript + '</head>');
  fs.writeFileSync('css100.html', html);
  console.log("Injected debug script!");
}
