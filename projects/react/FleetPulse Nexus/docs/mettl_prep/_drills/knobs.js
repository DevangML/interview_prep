/* KNOBS — make the CSS that is already written visually adjustable.
   Never adds a property. Parses declarations, renders one control each,
   splices the new value back into the textarea and fires 'input'. */
(function(){
var NAMED=['white','black','whitesmoke','gainsboro','silver','gray','dimgray','darkgray','lightgray',
 'steelblue','royalblue','slateblue','aliceblue','seagreen','mediumseagreen','goldenrod','orange',
 'crimson','firebrick','tomato','snow','transparent'];

var ENUM={
 'display':['block','inline','inline-block','flex','grid','inline-flex','none'],
 'flex-direction':['row','column','row-reverse','column-reverse'],
 'justify-content':['flex-start','center','flex-end','space-between','space-around','space-evenly'],
 'align-items':['stretch','flex-start','center','flex-end','baseline'],
 'justify-items':['stretch','start','center','end'],
 'place-items':['stretch','center','start','end'],
 'flex-wrap':['nowrap','wrap','wrap-reverse'],
 'position':['static','relative','absolute','fixed','sticky'],
 'text-align':['left','center','right','justify'],
 'box-sizing':['content-box','border-box'],
 'overflow':['visible','hidden','auto','scroll'],
 'overflow-y':['visible','hidden','auto','scroll'],
 'text-transform':['none','uppercase','lowercase','capitalize'],
 'font-style':['normal','italic'],
 'text-decoration':['none','underline','line-through'],
 'align-self':['auto','stretch','flex-start','center','flex-end'],
 'container-type':['normal','inline-size','size']
};
var RANGE={ 'padding':[0,6],'margin':[0,6],'gap':[0,6],'row-gap':[0,6],'column-gap':[0,6],
 'border-radius':[0,4],'width':[0,40],'height':[0,40],'max-width':[0,60],'min-width':[0,40],
 'min-height':[0,40],'font-size':[.5,5],'top':[-10,10],'left':[-10,10],'right':[-10,10],'bottom':[-10,10],
 'flex-basis':[0,40],'letter-spacing':[-.1,.5],'inset':[0,10] };
var UNITLESS={ 'opacity':[0,1,.01],'flex-grow':[0,10,1],'flex-shrink':[0,10,1],'z-index':[0,50,1],
 'line-height':[.8,3,.05],'font-weight':[100,900,100],'order':[0,10,1] };
var PXRANGE={ 'border-width':[0,12],'outline-width':[0,12],'outline-offset':[0,12] };

function isColor(v){ v=v.trim().toLowerCase();
  return /^#[0-9a-f]{3,8}$/.test(v) || /^rgb/.test(v) || NAMED.indexOf(v)>-1; }
function toHex(v){ v=v.trim();
  if(/^#/.test(v)) return v.length===4 ? '#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3] : v.slice(0,7);
  var c=document.createElement('canvas').getContext('2d'); c.fillStyle='#000'; c.fillStyle=v;
  return c.fillStyle; }
function num(v){ var m=String(v).trim().match(/^(-?\d*\.?\d+)\s*(px|rem|em|%|vh|vw|dvh|ch|s|ms)?$/); 
  return m?{n:parseFloat(m[1]),u:m[2]||''}:null; }

/* find declarations that are inside a rule block, with exact offsets */
function parse(css){
  var out=[],depth=0,i=0,n=css.length;
  while(i<n){
    var c=css[i];
    if(c==='{'){depth++;i++;continue;}
    if(c==='}'){depth=Math.max(0,depth-1);i++;continue;}
    if(css.startsWith('/*',i)){var e=css.indexOf('*/',i);i=(e<0?n:e+2);continue;}
    if(depth>0){
      var m=/^\s*([-a-zA-Z]+)\s*:\s*([^;}\n]+)/.exec(css.slice(i));
      if(m){
        var propStart=i+m[0].indexOf(m[1]);
        var valStart=i+m[0].length-m[2].length;
        out.push({prop:m[1].trim(), val:m[2].trim(), start:valStart, end:valStart+m[2].length});
        i+=m[0].length; continue;
      }
    }
    i++;
  }
  return out;
}

function control(d, onChange){
  var p=d.prop, v=d.val, wrap=document.createElement('div'); wrap.className='kn-row';
  var lab=document.createElement('span'); lab.className='kn-lab'; lab.textContent=p; wrap.appendChild(lab);
  var out=document.createElement('span'); out.className='kn-val'; out.textContent=v;
  var el;

  if(ENUM[p] && ENUM[p].indexOf(v)>-1){
    el=document.createElement('select'); el.className='kn-sel';
    ENUM[p].forEach(function(o){var op=document.createElement('option');op.value=op.textContent=o;el.appendChild(op)});
    el.value=v; el.oninput=function(){ out.textContent=el.value; onChange(d,el.value); };
  } else if(isColor(v)){
    el=document.createElement('input'); el.type='color'; el.className='kn-col';
    try{ el.value=toHex(v); }catch(e){}
    el.oninput=function(){ out.textContent=el.value; onChange(d,el.value); };
  } else if(UNITLESS[p] && num(v) && !num(v).u){
    var r=UNITLESS[p]; el=document.createElement('input'); el.type='range'; el.className='kn-rng';
    el.min=r[0]; el.max=r[1]; el.step=r[2]; el.value=num(v).n;
    el.oninput=function(){ out.textContent=el.value; onChange(d,el.value); };
  } else if(num(v)){
    var q=num(v), lo, hi, step;
    if(PXRANGE[p]||q.u==='px'){ lo=(PXRANGE[p]||[0,80])[0]; hi=Math.max((PXRANGE[p]||[0,80])[1], q.n*2||80); step=1; }
    else if(RANGE[p]){ lo=RANGE[p][0]; hi=RANGE[p][1]; step=.05; }
    else { lo=0; hi=Math.max(10,q.n*3); step=q.u==='%'?1:.05; }
    if(q.u==='%'){lo=0;hi=100;step=1;}
    el=document.createElement('input'); el.type='range'; el.className='kn-rng';
    el.min=lo; el.max=hi; el.step=step; el.value=q.n;
    el.oninput=function(){ var nv=el.value+q.u; out.textContent=nv; onChange(d,nv); };
  } else {
    el=document.createElement('input'); el.type='text'; el.className='kn-txt'; el.value=v;
    el.oninput=function(){ out.textContent=el.value; onChange(d,el.value); };
  }
  wrap.appendChild(el); wrap.appendChild(out);
  return wrap;
}

function mount(ta, host){
  if(!ta||!host) return;
  var lock=false;
  function build(){
    if(lock) return;
    var css=ta.value, decls=parse(css);
    host.innerHTML='';
    if(!decls.length){ host.innerHTML='<p class="kn-empty">No adjustable declarations yet — write some CSS.</p>'; return; }
    decls.forEach(function(d){
      host.appendChild(control(d, function(dd,nv){
        lock=true;
        ta.value = ta.value.slice(0,dd.start) + nv + ta.value.slice(dd.end);
        var delta = nv.length - (dd.end-dd.start);
        dd.end = dd.start + nv.length;
        decls.forEach(function(o){ if(o!==dd && o.start>dd.start){ o.start+=delta; o.end+=delta; } });
        ta.dispatchEvent(new Event('input',{bubbles:true}));
        lock=false;
      }));
    });
  }
  ta.addEventListener('input', function(){ if(!lock) clearTimeout(build._t), build._t=setTimeout(build,250); });
  build();
  return {refresh:build};
}
window.KNOBS={mount:mount, parse:parse};
})();
