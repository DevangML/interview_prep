/* Buffers saved before component code became real files are body-only and will not
   compile. Clear them once, then remember we did.
   Two rules learned the hard way:
   - The version guard is MONOTONIC. An equality test let a tab running a cached older
     copy write its version back, so two tabs ping-ponged and wiped buffers every load.
   - The HTML-ism test is TAG-SCOPED. `class=` inside a string (dangerouslySetInnerHTML,
     a code sample) is not markup, and deleting that is deleting the learner's work. */
(function(){
  var V=4;
  function tagScoped(s){
    return /<[a-zA-Z][^<>]*?\sclass\s*=/.test(s) || /<[a-zA-Z][^<>]*?[\s"']style\s*=\s*["']/.test(s);
  }
  try{
    var seen=parseInt(localStorage.getItem('drills:codeVersion'),10);
    if(!(seen<V)) { if(isNaN(seen)) localStorage.setItem('drills:codeVersion',String(V)); return; }
    Object.keys(localStorage).forEach(function(k){
      if(!/^(arena|practice|match|uiladder|playground|css100):/.test(k)) return;
      var val=localStorage.getItem(k)||'';
      if(k.indexOf('css100:')===0) return;                  // CSS-only buffers, never body-only
      var looksLikeComponent = val.indexOf('<')>-1 || /use(State|Effect)\s*\(/.test(val);
      if(looksLikeComponent && (val.indexOf('export default')<0 || tagScoped(val)))
        localStorage.removeItem(k);
    });
    localStorage.setItem('drills:codeVersion',String(V));
  }catch(e){}
})();
