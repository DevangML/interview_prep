/* DIA — the target, drawn.
 *
 * Every challenge says what it should LOOK like, not just what it should do.
 * A challenge declares boxes, gaps and annotations; this draws a wireframe of
 * the finished result so you can compare your preview against the intent.
 *
 *   dia:{ w:320, h:170,
 *     frame:[0,0,320,170,'.wrap'],           // dashed container
 *     box:[[10,10,90,50,'A'], ...],          // solid child boxes
 *     gap:[[100,10,20,'gap',1]],             // dimension line: x,y,len,label,horizontal
 *     note:[[10,150,'stacks below 30rem']],  // free text
 *     arrow:[[10,80,300,80,'main axis']],    // labelled arrow
 *     track:[[10,4,90,'1fr'],...] }          // track header above the grid
 */
(function(){
var NS='http://www.w3.org/2000/svg';
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function t(x,y,s,cls,anchor){
  return '<text x="'+x+'" y="'+y+'" class="'+(cls||'dl')+'"'+(anchor?' text-anchor="'+anchor+'"':'')+'>'+esc(s)+'</text>';
}
function render(d){
  if(!d) return '';
  var w=d.w||320,h=d.h||170,o=[];
  o.push('<svg viewBox="0 0 '+w+' '+h+'" width="100%" role="img" aria-label="Expected result" class="dia">');
  o.push('<defs><marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">'
        +'<path d="M0 0 L8 4 L0 8 z" class="dh"/></marker></defs>');
  (d.track||[]).forEach(function(a){                       // grid track header
    o.push('<line x1="'+a[0]+'" y1="'+(a[1]+7)+'" x2="'+(a[0]+a[2])+'" y2="'+(a[1]+7)+'" class="dt"/>');
    o.push(t(a[0]+a[2]/2, a[1]+5, a[3], 'dtl','middle'));
  });
  if(d.frame){ var f=d.frame;
    o.push('<rect x="'+f[0]+'" y="'+f[1]+'" width="'+f[2]+'" height="'+f[3]+'" rx="4" class="df"/>');
    if(f[4]) o.push(t(f[0]+4, f[1]+12, f[4], 'dfl'));
  }
  (d.box||[]).forEach(function(b){
    var cls='db'+(b[5]==='ghost'?' ghost':b[5]==='hi'?' hi':'');
    o.push('<rect x="'+b[0]+'" y="'+b[1]+'" width="'+b[2]+'" height="'+b[3]+'" rx="3" class="'+cls+'"/>');
    if(b[4]) o.push(t(b[0]+b[2]/2, b[1]+b[3]/2+4, b[4], 'dbl','middle'));
  });
  (d.gap||[]).forEach(function(g){                          // dimension line with ticks
    var x=g[0],y=g[1],L=g[2],lab=g[3],horiz=g[4]!==0;
    if(horiz){
      o.push('<line x1="'+x+'" y1="'+y+'" x2="'+(x+L)+'" y2="'+y+'" class="dg"/>');
      o.push('<line x1="'+x+'" y1="'+(y-4)+'" x2="'+x+'" y2="'+(y+4)+'" class="dg"/>');
      o.push('<line x1="'+(x+L)+'" y1="'+(y-4)+'" x2="'+(x+L)+'" y2="'+(y+4)+'" class="dg"/>');
      o.push(t(x+L/2, y-6, lab, 'dgl','middle'));
    }else{
      o.push('<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y+L)+'" class="dg"/>');
      o.push('<line x1="'+(x-4)+'" y1="'+y+'" x2="'+(x+4)+'" y2="'+y+'" class="dg"/>');
      o.push('<line x1="'+(x-4)+'" y1="'+(y+L)+'" x2="'+(x+4)+'" y2="'+(y+L)+'" class="dg"/>');
      o.push(t(x+6, y+L/2+3, lab, 'dgl'));
    }
  });
  (d.arrow||[]).forEach(function(a){
    o.push('<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+a[2]+'" y2="'+a[3]+'" class="da" marker-end="url(#ah)"/>');
    if(a[4]) o.push(t((a[0]+a[2])/2, a[1]-5, a[4], 'dal','middle'));
  });
  (d.note||[]).forEach(function(n){ o.push(t(n[0], n[1], n[2], 'dn')); });
  o.push('</svg>');
  return o.join('');
}
/* two states side by side — for "before/at breakpoint" and container-query targets */
function pair(a,b,la,lb){
  return '<div class="diapair"><figure>'+render(a)+'<figcaption>'+esc(la||'wide')+'</figcaption></figure>'
        +'<figure>'+render(b)+'<figcaption>'+esc(lb||'narrow')+'</figcaption></figure></div>';
}
window.DIA={render:render, pair:pair};
})();
