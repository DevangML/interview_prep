const HARD = '*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:10px;font:14px system-ui}';
const FRAME_H = 600;

export function srcdoc(baseCSS: string, userCSS: string, jsCode: string): string {
  return `<!doctype html><html><head><meta charset="utf-8">
<style>${HARD}${baseCSS}</style>
<style>${userCSS}</style>
</head><body><div id="root"></div>
<script src="/vendor/react.js"></script>
<script src="/vendor/react-dom.js"></script>
<script>
try{
  ${jsCode || ''}
  var __comp = typeof __DEFAULT__ !== 'undefined' ? __DEFAULT__ : null;
  if(__comp && typeof __comp === 'function'){
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(__comp));
  }
  window.__ok = true;
}catch(e){ window.__err = e.message; }
</script></body></html>`;
}

export function mountFrame(html: string, width: number): Promise<HTMLIFrameElement> {
  return new Promise((resolve, reject) => {
    const f = document.createElement('iframe');
    f.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    f.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;height:${FRAME_H}px;border:0;visibility:hidden`;
    f.srcdoc = html;
    const timer = setTimeout(() => { f.remove(); reject(new Error('preview timed out')); }, 5000);
    f.onload = () => { clearTimeout(timer); resolve(f); };
    document.body.appendChild(f);
  });
}

export function settle(frame: HTMLIFrameElement): Promise<Document> {
  return new Promise((resolve, reject) => {
    const doc = frame.contentDocument;
    if (!doc) { reject(new Error('frame unreadable')); return; }
    const started = performance.now();
    const tick = () => {
      const root = doc.getElementById('root');
      if (root && root.children.length > 0) { resolve(doc); return; }
      if (performance.now() - started > 1200) { resolve(doc); return; }
      setTimeout(tick, 8);
    };
    tick();
  });
}
