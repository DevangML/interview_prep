/* EDITOR v2 — CodeMirror behind a textarea contract, with a strict instance budget.
 *
 * WHY v1 hung: it created an editor per textarea (36+ on the ladder) with
 * viewportMargin:Infinity, and never disposed them on stage switch.
 *
 * v2 rules:
 *   1. At most ONE live editor per pane group (file tabs make the rest inactive).
 *   2. Upgrade only what is actually visible; dispose when detached.
 *   3. The textarea stays the public interface: `.value` proxies CM, CM change -> 'input'.
 */
(function(){
/* Silence the scroll-blocking-listener violations: default these to passive when the
   caller did not specify. CodeMirror registers them non-passively by default. */
(function(){
  var P={touchstart:1,touchmove:1,wheel:1,mousewheel:1};
  var add=EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener=function(type,fn,opts){
    if(P[type] && (opts===undefined || opts===false)) opts={passive:true};
    else if(P[type] && opts && typeof opts==='object' && opts.passive===undefined && !opts.__keep)
      opts=Object.assign({},opts,{passive:true});
    return add.call(this,type,fn,opts);
  };
})();
if(typeof CodeMirror==='undefined'){ window.EDITOR={ready:false, upgrade:function(){}, upgradeAll:function(){}, refreshAll:function(){}}; return; }
var MODE={css:'css', jsx:'jsx', js:'javascript', html:'htmlmixed'};
var LIVE=[];
/* Instance budget. A page with many collapsed lessons must never hold many editors:
   that is what froze the tab. One live editor per page unless the layout shows more. */
var MAX = (document.querySelectorAll('textarea').length > 6) ? 2 : 6;

/* Kill switch: ?nocm=1 (or localStorage drills:nocm) falls back to plain textareas. */
var OFF = /[?&]nocm=1/.test(location.search) || localStorage.getItem('drills:nocm')==='1';

function dispose(cm){
  try{ if(cm.hasFocus && cm.hasFocus()) return; }catch(e){}     // never destroy a focused editor
  try{ var ta=cm.getTextArea && cm.getTextArea(); cm.toTextArea();
       if(ta){ delete ta.__cm; delete ta.__editor; delete ta.__watched;
               try{ delete ta.value; }catch(e){} } }catch(e){}
}
function budget(){
  // ONLY dispose editors whose DOM is gone (a stage switch destroyed the lesson).
  // A pane hidden by a file tab is still live — disposing it blanked Component.jsx.
  LIVE=LIVE.filter(function(c){
    var w=c.getWrapperElement&&c.getWrapperElement();
    if(!w || !document.body.contains(w)){ dispose(c); return false; }
    return true;
  });
  while(LIVE.length>MAX){
    var cm=LIVE.shift();
    var w=cm.getWrapperElement&&cm.getWrapperElement();
    if(w && document.body.contains(w)){ LIVE.push(cm); break; }   // all still attached: keep them
    dispose(cm);
  }
}

function upgrade(ta){
  if(OFF) return null;
  if(!ta || ta.__cm || ta.readOnly || ta.dataset.noCm==='1') return null;
  if(!document.body.contains(ta)) return null;
  ta.__cm=true;
  var cm=CodeMirror.fromTextArea(ta,{
    mode: MODE[ta.dataset.mode]||MODE.jsx,
    lineNumbers:true, indentUnit:2, tabSize:2, smartIndent:true,
    lineWrapping:true,                 // wrapped by default — never scroll sideways to read
    scrollbarStyle:'native',
    autoCloseBrackets:true, autoCloseTags:true, matchBrackets:true,
    styleActiveLine:true, viewportMargin:10,
    extraKeys:{
      Tab:function(c){ c.somethingSelected()?c.indentSelection('add'):c.replaceSelection('  '); },
      'Shift-Tab':function(c){ c.indentSelection('subtract'); },
      'Ctrl-/':'toggleComment','Cmd-/':'toggleComment'
    }
  });
  var native=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value');
  Object.defineProperty(ta,'value',{configurable:true,
    get:function(){ return cm.getValue(); },
    set:function(v){ v=(v==null?'':String(v)); if(v===cm.getValue()) return;
      cm.setValue(v); native.set.call(ta,v); }});
  var t=null;
  cm.on('change',function(){ native.set.call(ta,cm.getValue());
    clearTimeout(t); t=setTimeout(function(){ ta.dispatchEvent(new Event('input',{bubbles:true})); },70); });
  ta.__editor=cm; LIVE.push(cm); budget();
  if(window.FMT){                                     // formatted by default
    FMT[(ta.dataset.mode==='css')?'css':'jsx'](cm.getValue()).then(function(out){
      if(typeof out!=='string') return;
      if(!out.trim() || out===cm.getValue()) return;
      if(out.trim().length < Math.min(8, cm.getValue().trim().length)) return;
      // Prettier resolves asynchronously. If you have already clicked in, replacing the
      // document would blur you and throw the cursor to the top — that was the focus loss.
      if(cm.hasFocus()) return;
      cm.operation(function(){
        var c=cm.getCursor(), s=cm.getScrollInfo();
        cm.setValue(out);
        try{ cm.setCursor(c); cm.scrollTo(s.left,s.top); }catch(err){}
      });
    }).catch(function(){});
  }
  setTimeout(function(){cm.refresh()},0);
  return cm;
}
function visible(ta){
  if(ta.offsetParent!==null && ta.getBoundingClientRect().height>0) return true;
  var p=ta.closest('.ed');                     // a tabbed pane is real, just not showing
  return !!(p && p.parentElement && p.parentElement.querySelector('.fx-bar'));
}
function upgradeVisible(root){
  if(OFF) return;
  if(focused()) return;              // you are typing — do not re-scan the page
  var list=[];
  (root||document).querySelectorAll('textarea').forEach(function(ta){
    if(!ta.__cm && visible(ta)) list.push(ta);
  });
  list.slice(0, MAX).forEach(upgrade);     // never instantiate a burst
  budget();
}
var pending=null, busy=false;
function schedule(){ if(busy) return; clearTimeout(pending); pending=setTimeout(function(){
  busy=true; try{ upgradeVisible(); } finally { setTimeout(function(){busy=false;},50); } },200); }

/* Is the caret currently inside an editor? Nothing may re-instantiate editors while
   it is — tearing down a CodeMirror destroys its DOM node, which is a blur. */
function focused(){
  var a=document.activeElement;
  return !!(a && a.closest && a.closest('.CodeMirror'));
}

/* CodeMirror rewrites its own DOM on every render. Observing the whole body without
   filtering meant CM's paint triggered a rescan, which re-instantiated editors, which
   painted again — a churn loop that added hundreds of listeners and froze the tab. */
function fromEditor(m){
  var n=m.target;
  while(n && n!==document.body){
    if(n.classList && (n.classList.contains('CodeMirror') || n.classList.contains('cm-pane'))) return true;
    n=n.parentNode;
  }
  return false;
}

/* Deterministic init. Editors are created at load and on the explicit moments that
   reveal new ones — a lesson opening, a stage switching, a file tab. No observer
   watching the whole document, so nothing can re-scan while you are typing. */
document.addEventListener('DOMContentLoaded',function(){
  upgradeVisible();
  ['click','change'].forEach(function(ev){
    document.addEventListener(ev,function(e){
      var t=e.target;
      if(t && t.closest && t.closest('.CodeMirror')) return;      // clicks inside an editor: ignore
      schedule();
    }, true);
  });
  addEventListener('resize',function(){ clearTimeout(schedule._r);
    schedule._r=setTimeout(function(){ if(!focused()) upgradeVisible(); },250); });
});
window.EDITOR={ready:!OFF, off:OFF, upgrade:upgrade, upgradeAll:upgradeVisible, refresh:schedule,
  refreshAll:function(root){ (root||document).querySelectorAll('.CodeMirror').forEach(function(e){ e.CodeMirror&&e.CodeMirror.refresh(); }); },
  of:function(ta){ return ta&&ta.__editor; }, live:function(){ return LIVE.length; }};
})();
