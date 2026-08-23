/* Responsive viewer — a real device frame, not a width tweak.
   Device presets with WIDTH AND HEIGHT, rotate, free drag-resize, auto zoom-to-fit,
   and a live px readout. The iframe gets the device's real CSS pixel size, so media
   queries and dvh see the device; we only scale visually with a transform. */
(function(){
var DEVICES=[
 {id:'sm',  label:'375',  name:'iPhone SE',   w:375,  h:667},
 {id:'md',  label:'390',  name:'iPhone 14',   w:390,  h:844},
 {id:'tab', label:'768',  name:'iPad',        w:768,  h:1024},
 {id:'lg',  label:'1024', name:'Laptop',      w:1024, h:768},
 {id:'fit', label:'Fit',  name:'Fill the pane', w:0,  h:0}
];
var CSS=`
.vp{display:flex;flex-direction:column;min-height:0;flex:1}
.vp-bar{display:flex;align-items:center;gap:.3rem;flex-wrap:wrap;padding:.3rem .4rem;border-bottom:1px solid gainsboro;background:snow;flex:none}
.vp-bar button{border:1px solid silver;background:white;border-radius:.3rem;font:600 .68rem system-ui;
 padding:.15rem .5rem;cursor:pointer;color:dimgray;transition:background-color 140ms ease}
.vp-bar button:hover{background:whitesmoke}
.vp-bar button[aria-pressed=true]{background:steelblue;border-color:steelblue;color:white}
.vp-bar .sp{flex:1}
.vp-size{font:600 .68rem ui-monospace,monospace;color:dimgray;white-space:nowrap}
.vp-stage{flex:1;min-height:0;overflow:auto;display:grid;place-items:start center;
 padding:.6rem;background:repeating-conic-gradient(#f1f5f9 0% 25%,white 0% 50%) 50%/14px 14px}
.vp-stage[data-fit=true]{padding:0;background:white;place-items:stretch}
.vp-sizer{position:relative;flex:none}
.vp-device{position:relative;background:white;border:1px solid silver;border-radius:.4rem;overflow:hidden;
 box-shadow:0 6px 20px rgb(0 0 0 / .12);transform-origin:top left;display:flex}
.vp-stage[data-fit=true] .vp-sizer{width:100%;height:100%;display:flex}
.vp-stage[data-fit=true] .vp-device{border:0;border-radius:0;box-shadow:none;width:100%!important;height:100%!important;transform:none!important;flex:1}
.vp-device > iframe{border:0;width:100%;height:100%;display:block;background:white}
.vp-grip{position:absolute;right:0;bottom:0;width:14px;height:14px;cursor:nwse-resize;z-index:4}
.vp-grip::after{content:"";position:absolute;right:2px;bottom:2px;width:8px;height:8px;
 border-right:2px solid silver;border-bottom:2px solid silver}
.vp-edge{position:absolute;top:0;right:0;width:8px;height:100%;cursor:ew-resize;z-index:3}
`;
var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

function mount(iframe, opts){
  if(!iframe || iframe.__vp) return null; iframe.__vp=true;
  opts=opts||{};
  var host=iframe.parentElement;
  var wrap=document.createElement('div'); wrap.className='vp';
  var bar=document.createElement('div'); bar.className='vp-bar';
  var stage=document.createElement('div'); stage.className='vp-stage';
  var dev=document.createElement('div'); dev.className='vp-device';
  host.insertBefore(wrap, iframe);
  var sizer=document.createElement('div'); sizer.className='vp-sizer';
  dev.appendChild(iframe); sizer.appendChild(dev); stage.appendChild(sizer); wrap.appendChild(bar); wrap.appendChild(stage);

  var grip=document.createElement('div'); grip.className='vp-grip'; grip.title='Resize — drag to any custom size, double-click to reset';
  var edge=document.createElement('div'); edge.className='vp-edge'; edge.title='Width — drag to change only the width';
  dev.appendChild(edge); dev.appendChild(grip);

  var W=0,H=0,rot=false,zoom=1,cur='fit';
  var size=document.createElement('span'); size.className='vp-size';

  function apply(){
    var fit = (W===0);
    stage.dataset.fit = fit ? 'true':'false';
    if(fit){ size.textContent='fills the pane';
      sizer.style.width=''; sizer.style.height='';
      dev.style.width=''; dev.style.height=''; dev.style.transform=''; return; }
    var w = rot?H:W, h = rot?W:H;
    dev.style.width=w+'px'; dev.style.height=h+'px';
    var avail = Math.max(120, stage.clientWidth-24), availH = Math.max(120, stage.clientHeight-24);
    zoom = Math.min(1, avail/w, availH/h);
    dev.style.transform = zoom<1 ? 'scale('+zoom+')' : '';
    // the sizer takes the SCALED footprint, so the stage lays out correctly and never overflows
    sizer.style.width=Math.round(w*zoom)+'px';
    sizer.style.height=Math.round(h*zoom)+'px';
    size.textContent = w+' × '+h+(zoom<1 ? '  ·  '+Math.round(zoom*100)+'%' : '');
  }
  function setDev(d){
    cur=d.id; W=d.w; H=d.h;
    bar.querySelectorAll('[data-d]').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.d===d.id); });
    apply();
  }
  DEVICES.forEach(function(d){
    var b=document.createElement('button'); b.type='button'; b.dataset.d=d.id;
    b.textContent=d.label; b.title=(d.w? d.name+' — '+d.w+'×'+d.h+' viewport, scaled to fit' : 'Fit — let the result fill the pane');
    b.onclick=function(){ setDev(d); }; bar.appendChild(b);
  });
  var rb=document.createElement('button'); rb.type='button'; rb.textContent='⟳'; rb.title='Rotate — swap width and height';
  rb.onclick=function(){ if(!W) return; rot=!rot; rb.setAttribute('aria-pressed',rot); apply(); };
  bar.appendChild(rb);
  bar.appendChild(Object.assign(document.createElement('span'),{className:'sp'}));
  bar.appendChild(size);

  function dragify(el, both){
    var on=false,x0=0,y0=0,w0=0,h0=0;
    el.addEventListener('pointerdown',function(e){
      if(!W){ // free-drag from Fit: adopt current size first
        W=Math.round(dev.getBoundingClientRect().width); H=Math.round(dev.getBoundingClientRect().height);
        bar.querySelectorAll('[data-d]').forEach(function(b){b.setAttribute('aria-pressed',false)}); apply();
      }
      on=true; x0=e.clientX; y0=e.clientY; w0=rot?H:W; h0=rot?W:H;
      el.setPointerCapture(e.pointerId); e.preventDefault();
    });
    el.addEventListener('pointermove',function(e){ if(!on) return;
      var nw=Math.max(240, Math.round(w0+(e.clientX-x0)/(zoom||1)));
      var nh=both ? Math.max(240, Math.round(h0+(e.clientY-y0)/(zoom||1))) : (rot?W:H);
      if(rot){ H=nw; W=nh; } else { W=nw; H=nh; }
      bar.querySelectorAll('[data-d]').forEach(function(b){b.setAttribute('aria-pressed',false)});
      apply();
    });
    el.addEventListener('pointerup',function(e){ on=false; try{el.releasePointerCapture(e.pointerId)}catch(_){} });
    el.addEventListener('dblclick',function(){ setDev(DEVICES[DEVICES.length-1]); rot=false; rb.setAttribute('aria-pressed',false); });
  }
  dragify(grip,true); dragify(edge,false);
  addEventListener('resize',function(){ clearTimeout(apply._t); apply._t=setTimeout(apply,120); });
  setDev(DEVICES[DEVICES.length-1]);
  return {set:setDev, apply:apply, bar:bar};
}
window.VIEWPORT={mount:mount, devices:DEVICES};
})();
