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
<style id="__base">${HARD}${baseCSS || ''}</style>
<style id="__user">${userCSS || ''}</style>
</head><body><div id="root">${jsCode ? '' : '<div style="color:#94a3b8;font:12px ui-monospace,Menlo,monospace">waiting for component.jsx…</div>'}</div>
<script>
window.onerror=function(m, u, l){
  document.getElementById('root').innerHTML='<pre style="color:#b91c1c;font-size:12px;white-space:pre-wrap;background:#fef2f2;padding:8px;border-radius:6px;border:1px solid #fecaca">'+m+' (line '+l+')</pre>';
};
<\/script>
<script src="/vendor/react.js"><\/script>
<script src="/vendor/react-dom.js"><\/script>
<script>
try{
  ${jsCode || ''}
  var __comp = null;
  if(typeof __DEFAULT__ !== 'undefined') __comp = __DEFAULT__;
  else if(typeof App !== 'undefined') __comp = App;

  if(__comp){
    var root = ReactDOM.createRoot(document.getElementById('root'));
    if(typeof __comp === 'function'){
      root.render(React.createElement(__comp));
    } else if(React.isValidElement(__comp)){
      root.render(__comp);
    }
  }
}catch(e){
  document.getElementById('root').innerHTML='<pre style="color:#b91c1c;font-size:12px;white-space:pre-wrap;background:#fef2f2;padding:8px;border-radius:6px;border:1px solid #fecaca">'+e.message+'</pre>';
}
<\/script></body></html>`;

  return (
    <iframe
      title="preview"
      srcDoc={srcdoc}
      sandbox="allow-scripts allow-same-origin"
      className={`w-full h-full border-0 bg-white ${className}`}
      style={{ minHeight: 0, flex: '1 1 auto' }}
    />
  );
}
