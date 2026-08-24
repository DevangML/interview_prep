interface Props {
  baseCSS: string;
  userCSS: string;
  jsCode: string;
  className?: string;
}

/**
 * Declarative iframe preview — React controls the entire lifecycle.
 * React Compiler automatically optimizes srcdoc generation and memoization.
 */
export default function SandboxFrame({ baseCSS, userCSS, jsCode, className = '' }: Props) {
  const HARD = '*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:10px;font:14px system-ui}';
  const srcdoc = `<!doctype html><html><head><meta charset="utf-8">
<style id="__base">${HARD}${baseCSS}</style>
<style id="__user">${userCSS}</style>
</head><body><div id="root"></div>
<script>
window.onerror=function(m){
  document.getElementById('root').innerHTML='<pre style="color:#b91c1c;font-size:12px;white-space:pre-wrap">'+m+'</pre>';
};
<\/script>
<script src="/vendor/react.js"><\/script>
<script src="/vendor/react-dom.js"><\/script>
<script>
try{
  ${jsCode || ''}
  var __comp = typeof __DEFAULT__ !== 'undefined' ? __DEFAULT__ : null;
  if(__comp && typeof __comp === 'function'){
    var root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(__comp));
  }
}catch(e){
  document.getElementById('root').innerHTML='<pre style="color:#b91c1c;font-size:12px;white-space:pre-wrap">'+e.message+'</pre>';
}
<\/script></body></html>`;

  return (
    <iframe
      title="preview"
      srcDoc={srcdoc}
      sandbox="allow-scripts allow-same-origin"
      className={`w-full border-0 bg-white ${className}`}
      style={{ minHeight: 0, flex: 1 }}
    />
  );
}
