/* BRIDGE v2 — headless. Gestures in the live result become CSS edits.
 *
 * STABILITY RULES (v1 broke all four):
 *   1. Declarations are found by (selector, property) on every write. No carried offsets.
 *   2. A gesture is a TRANSACTION: begin -> many live updates -> commit.
 *      A missing property is created ONCE at begin, never per mousemove.
 *   3. Re-parsing is suspended for the duration of a gesture.
 *   4. Writes we make are tagged, so our own 'input' events can never trigger a re-sync.
 */
(function(){
var NAMED={white:'#ffffff',black:'#000000',whitesmoke:'#f5f5f5',gainsboro:'#dcdcdc',silver:'#c0c0c0',
 gray:'#808080',dimgray:'#696969',darkgray:'#a9a9a9',steelblue:'#4682b4',royalblue:'#4169e1',
 slateblue:'#6a5acd',aliceblue:'#f0f8ff',seagreen:'#2e8b57',goldenrod:'#daa520',crimson:'#dc143c',
 firebrick:'#b22222',tomato:'#ff6347',snow:'#fffafa'};
function isColor(p,v){ v=(v||'').trim().toLowerCase();
  if(!/(^|-)(color|background|fill|stroke)$/.test(p)) return false;
  return /^#[0-9a-f]{3,8}$/.test(v)||/^rgb|^hsl|^color\(/.test(v)||!!NAMED[v]; }
function toHex(v){ v=(v||'').trim().toLowerCase();
  if(NAMED[v]) return NAMED[v];
  if(/^#/.test(v)) return v.length===4?'#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3]:v.slice(0,7);
  try{ var c=document.createElement('canvas').getContext('2d'); c.fillStyle='#000'; c.fillStyle=v; return c.fillStyle; }
  catch(e){ return '#000000'; } }

function mount(o){
  var fr=o.iframe;
  if(!fr||fr.__bridge) return; fr.__bridge=true;
  var matched=[], target=null, sheet=null;     // selector + the SHEET that owns it
  var gesture=false, mine=0, resync=null, lastLine=-1, lastSel=null, lastTa=null;

  function sheets(){ return (window.SHEETS?SHEETS.all():[]).filter(function(s){return s.ta}); }
  function model(ta){ return CSSMODEL.parse(ta.value); }

  /* our own edits must never look like user edits — on ANY sheet */
  if(window.SHEETS) SHEETS.onChange(function(){
    if(mine>0){ mine--; return; }
    if(gesture) return;
    clearTimeout(resync); resync=setTimeout(sendProps,250);
  });

  var switched=null;
  /* Switching tabs is a LAYOUT change. Doing it per mousemove hid the JSX pane,
     tripped the editor budget and killed the page. Switch once per gesture. */
  function focusSheet(ta){
    if(switched===ta) return;
    switched=ta;
    if(window.FILES && FILES.showFor) FILES.showFor(ta);
  }
  function reveal(ta,line){
    if(line==null) return;
    var cm=ta.__editor;
    if(cm) cm.scrollIntoView({line:line,ch:0}, 80);   // scroll every frame is cheap; tab switch is not
  }
  function put(prop,val,opts){
    if(!target||!sheet) return;
    mine++;
    var r=CSSMODEL.write(sheet.ta, target, prop, val, opts);
    if(!r.changed) mine--;
    else reveal(sheet.ta, r.line);
    return r;
  }

  function sendProps(){
    var out=[];
    sheets().forEach(function(s){
      model(s.ta).forEach(function(r){ if(matched.indexOf(r.sel)>-1) r.decls.forEach(function(d){
        out.push({prop:d.prop, val:d.val, sheet:s.name,
                  isColor:isColor(d.prop,d.val), hex:isColor(d.prop,d.val)?toHex(d.val):null});
      }); });
    });
    try{ fr.contentWindow.postMessage({t:'d:props', props:out},'*'); }catch(e){}
  }

  /* code -> preview: cursor inside a rule outlines its elements — from any sheet */
  function link(){
    var active=null;
    sheets().forEach(function(s){ if(s.ta.__editor && s.ta.__editor.hasFocus()) active=s; });
    if(!active) return;
    var cm=active.ta.__editor;
    if(lastTa && lastTa!==active.ta && lastLine>-1){
      try{ lastTa.__editor.removeLineClass(lastLine,'background','cm-linked'); }catch(e){}
      lastLine=-1;
    }
    lastTa=active.ta;
    var r=CSSMODEL.ruleAt(model(active.ta), cm.indexFromPos(cm.getCursor()));
    var s=r?r.sel:null; if(s===lastSel) return; lastSel=s;
    if(lastLine>-1){ try{ cm.removeLineClass(lastLine,'background','cm-linked'); }catch(e){} lastLine=-1; }
    if(r){ lastLine=cm.posFromIndex(r.start).line; try{ cm.addLineClass(lastLine,'background','cm-linked'); }catch(e){} }
    try{ fr.contentWindow.postMessage({t:'d:link', sel:s},'*'); }catch(e){}
  }
  function wireCursors(){
    sheets().forEach(function(s){
      var c=s.ta.__editor;
      if(c && !c.__linkWired){ c.__linkWired=true;
        c.on('cursorActivity',function(){ if(gesture) return;
          clearTimeout(link._t); link._t=setTimeout(link,90); }); }
    });
  }
  wireCursors(); document.addEventListener('sheets:change',wireCursors);

  addEventListener('message',function(e){
    var m=e.data||{}; if(!m.t) return;

    if(m.t==='d:select'){
      var all=window.SHEETS?SHEETS.selectors():[];
      try{ matched=fr.contentWindow.__direct.matches(all); }catch(err){ matched=[]; }
      target=matched.length?matched[matched.length-1]:null;
      sheet=target && window.SHEETS ? SHEETS.ownerOf(target) : null;   // could be app.css
      sendProps();
    }

    if(m.t==='d:begin'){
      gesture=true; switched=null;
      if(sheet) focusSheet(sheet.ta);          // ONE tab switch, before the drag starts
      // create any property this gesture needs ONCE, before the drag starts
      (m.props||[]).forEach(function(p){
        if(sheet && !CSSMODEL.declFor(model(sheet.ta), target, p.prop)) put(p.prop, p.val);
      });
    }

    if(m.t==='d:live'){
      Object.keys(m.set||{}).forEach(function(p){
        put(p, m.set[p], {noCreate:!gesture});   // outside a gesture, never invent a property
      });
    }

    if(m.t==='d:set'){ if(sheet) focusSheet(sheet.ta); put(m.prop, m.val); }

    if(m.t==='d:commit'){
      gesture=false; switched=null; sendProps();
      try{ fr.contentWindow.postMessage({t:'d:reframe'},'*'); }catch(e){}
    }
  });
}
window.INSPECTOR={mount:mount};
})();
