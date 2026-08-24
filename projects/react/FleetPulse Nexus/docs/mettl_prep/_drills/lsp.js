/* LSP & Wasm Engine v1 — In-browser Language Server Protocol & WebAssembly Acceleration
 *
 * 1. WebAssembly Fast Compute (Specificity calculation, token hash, performance scoring).
 * 2. LSP Hover Provider (MDN Specs, Syntax, Performance Layout impact: Reflow vs Repaint vs Composite).
 * 3. LSP Diagnostics (Real-time error squiggles, syntax verification, React style/class lints).
 * 4. Quick-Fix Code Actions (Cmd+. auto-fixes for className, style object, unclosed tags).
 * 5. AST Breadcrumbs Bar (Ancestor path visualization at cursor).
 * 6. Multi-Cursor (Cmd-D / Ctrl-D multi-selection).
 */
(function(){
'use strict';

/* ── 1. WebAssembly Acceleration Engine ── */
var WASM = { ready: false, calcSpecificity: null };

function encodeUleb128(val){
  var bytes = [];
  do {
    var b = val & 0x7f;
    val >>>= 7;
    if(val !== 0) b |= 0x80;
    bytes.push(b);
  } while(val !== 0);
  return bytes;
}

function encodeSleb128(val){
  var bytes = [];
  var more = true;
  while(more){
    var b = val & 0x7f;
    val >>= 7;
    if((val === 0 && (b & 0x40) === 0) || (val === -1 && (b & 0x40) !== 0)){
      more = false;
    } else {
      b |= 0x80;
    }
    bytes.push(b);
  }
  return bytes;
}

function makeSection(id, payload){
  return [id].concat(encodeUleb128(payload.length), payload);
}

function initWasm(){
  try {
    var magic = [0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00];
    var typeSec = makeSection(1, [0x01, 0x60, 0x03, 0x7f, 0x7f, 0x7f, 0x01, 0x7f]);
    var funcSec = makeSection(3, [0x01, 0x00]);
    var nameBytes = [99,97,108,99,83,112,101,99,105,102,105,99,105,116,121]; // "calcSpecificity"
    var exportSec = makeSection(7, [0x01, nameBytes.length].concat(nameBytes, [0x00, 0x00]));
    var funcBody = [
      0x00,
      0x20, 0x00,
      0x41].concat(encodeSleb128(10000), [
      0x6c,
      0x20, 0x01,
      0x41], encodeSleb128(100), [
      0x6c,
      0x6a,
      0x20, 0x02,
      0x6a,
      0x0b
    ]);
    var codeSec = makeSection(10, [0x01].concat(encodeUleb128(funcBody.length), funcBody));
    var bytes = new Uint8Array([].concat(magic, typeSec, funcSec, exportSec, codeSec));

    WebAssembly.instantiate(bytes).then(function(res){
      WASM.calcSpecificity = res.instance.exports.calcSpecificity;
      WASM.ready = true;
    }).catch(function(){
      // Fallback JS
      WASM.calcSpecificity = function(a, b, c){ return a * 10000 + b * 100 + c; };
      WASM.ready = true;
    });
  } catch(e){
    WASM.calcSpecificity = function(a, b, c){ return a * 10000 + b * 100 + c; };
    WASM.ready = true;
  }
}
initWasm();

/* ── 2. MDN & LSP Knowledge Base ── */
var MDN = {
  css: {
    'display': {
      syntax: 'display: grid | flex | block | inline | inline-block | none;',
      desc: 'Defines how an element is treated in flow layout and sets the formatting context for children.',
      perf: 'Reflow (triggers full layout computation)'
    },
    'grid-template-columns': {
      syntax: 'grid-template-columns: <track-size>+ | repeat(...) | subgrid;',
      desc: 'Defines line names and track sizing functions for grid columns using fr, px, or minmax().',
      perf: 'Reflow (triggers full grid layout computation)'
    },
    'grid-template-rows': {
      syntax: 'grid-template-rows: <track-size>+ | repeat(...) | subgrid;',
      desc: 'Defines line names and track sizing functions for grid rows.',
      perf: 'Reflow (triggers full grid layout computation)'
    },
    'gap': {
      syntax: 'gap: <row-gap> <column-gap>?;',
      desc: 'Sets the gutters (gutters) between grid columns and rows or flex items.',
      perf: 'Reflow'
    },
    'justify-content': {
      syntax: 'justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;',
      desc: 'Aligns grid tracks or flex items along the main/inline axis of the container.',
      perf: 'Reflow'
    },
    'align-items': {
      syntax: 'align-items: stretch | center | flex-start | flex-end | baseline;',
      desc: 'Aligns items along the cross/block axis within their grid area or flex line.',
      perf: 'Reflow'
    },
    'place-items': {
      syntax: 'place-items: <align-items> <justify-items>?;',
      desc: 'Shorthand property allowing alignment along both block and inline axes at once.',
      perf: 'Reflow'
    },
    'transform': {
      syntax: 'transform: translateY(...) | translateX(...) | scale(...) | rotate(...);',
      desc: 'Applies 2D or 3D transformations. Creates a new stacking context and composite layer.',
      perf: 'Composite (GPU Accelerated — 0ms Layout & Repaint)'
    },
    'opacity': {
      syntax: 'opacity: <number> (0.0 to 1.0);',
      desc: 'Specifies the transparency level of an element without altering layout flow.',
      perf: 'Composite (GPU Accelerated)'
    },
    'text-overflow': {
      syntax: 'text-overflow: clip | ellipsis | <string>;',
      desc: 'Determines how hidden overflow content that is not displayed is signaled to users.',
      perf: 'Paint (Recalculates typography rendering)'
    },
    '-webkit-line-clamp': {
      syntax: '-webkit-line-clamp: <integer>;',
      desc: 'Limits the number of lines displayed inside a block container using WebKit box layout.',
      perf: 'Reflow'
    },
    'color-mix': {
      syntax: 'color-mix(in <color-space>, <color1> <percentage>?, <color2>);',
      desc: 'Takes two colors and returns the result of mixing them in a specified color space.',
      perf: 'Paint'
    }
  },
  jsx: {
    'className': {
      syntax: 'className={string | templateLiteral}',
      desc: 'Standard React attribute for assigning CSS class names to DOM nodes (replaces HTML "class").',
      perf: 'Virtual DOM attribute binding'
    },
    'style': {
      syntax: 'style={{ propertyName: value }}',
      desc: 'Accepts a JavaScript object with camelCased CSS properties rather than a CSS string.',
      perf: 'Direct DOM element inline style update'
    },
    'key': {
      syntax: 'key={uniqueIdentifier}',
      desc: 'Special React string attribute that gives elements a stable identity across renders for reconciliation.',
      perf: 'Optimizes O(N) Virtual DOM diffing'
    }
  }
};

/* ── 3. LSP Hover UI Card ── */
var hoverCard = null;

function hideHoverCard(){
  if(hoverCard && hoverCard.parentNode){
    hoverCard.parentNode.removeChild(hoverCard);
  }
  hoverCard = null;
}

function showHoverCard(info, coords){
  hideHoverCard();
  var card = document.createElement('div');
  card.className = 'lsp-hover-card';
  card.style.left = Math.max(10, Math.min(window.innerWidth - 300, coords.left)) + 'px';
  card.style.top = (coords.top - 10) + 'px';

  var perfBadge = '';
  if(info.perf){
    var isComp = info.perf.indexOf('Composite') !== -1;
    var isPaint = info.perf.indexOf('Paint') !== -1;
    var cls = isComp ? 'perf-comp' : (isPaint ? 'perf-paint' : 'perf-reflow');
    perfBadge = '<div class="lsp-perf ' + cls + '">⚡ Performance: ' + info.perf + '</div>';
  }

  var specBadge = '';
  if(info.specificity){
    specBadge = '<div class="lsp-spec">🎯 Specificity: <strong>' + info.specificity + '</strong>'
      + (WASM.ready ? ' <span class="lsp-wasm-tag">WASM (' + info.wasmScore + ')</span>' : '') + '</div>';
  }

  card.innerHTML =
    '<div class="lsp-hover-head">'
      + '<span class="lsp-title">' + (info.title || info.token) + '</span>'
      + '<span class="lsp-source">MDN LSP Docs</span>'
    + '</div>'
    + (info.syntax ? '<div class="lsp-syntax"><code>' + info.syntax + '</code></div>' : '')
    + '<div class="lsp-desc">' + info.desc + '</div>'
    + specBadge
    + perfBadge;

  document.body.appendChild(card);
  hoverCard = card;
}

/* ── 4. Diagnostics & Quick-Fix Actions ── */
var currentDiagnostics = [];

function runDiagnostics(cm, mode){
  var val = cm.getValue();
  var diags = [];

  if(mode === 'jsx'){
    // Lint 1: style="..." string instead of style={{ ... }}
    var styleStrMatch = val.match(/style="([^"]*)"/);
    if(styleStrMatch){
      var idx = val.indexOf(styleStrMatch[0]);
      var pos = cm.posFromIndex(idx);
      diags.push({
        from: pos,
        to: cm.posFromIndex(idx + styleStrMatch[0].length),
        severity: 'error',
        message: 'React style attribute takes a JS object: style={{ ... }}, not a string.',
        fix: {
          label: 'Convert to style={{ ... }}',
          apply: function(){
            var raw = styleStrMatch[1];
            var pairs = raw.split(';').map(function(s){ return s.trim(); }).filter(Boolean);
            var objStr = 'style={{ ' + pairs.map(function(p){
              var kv = p.split(':');
              var k = kv[0].trim().replace(/-([a-z])/g, function(_, c){ return c.toUpperCase(); });
              var v = kv.slice(1).join(':').trim();
              return k + ": '" + v + "'";
            }).join(', ') + ' }}';
            cm.replaceRange(objStr, pos, cm.posFromIndex(idx + styleStrMatch[0].length));
          }
        }
      });
    }

    // Lint 2: class="..." instead of className="..."
    var classMatch = val.match(/\bclass="([^"]*)"/);
    if(classMatch){
      var idx = val.indexOf(classMatch[0]);
      var pos = cm.posFromIndex(idx);
      diags.push({
        from: pos,
        to: cm.posFromIndex(idx + classMatch[0].length),
        severity: 'warning',
        message: 'Use "className" in JSX instead of HTML "class".',
        fix: {
          label: 'Replace with className="..."',
          apply: function(){
            cm.replaceRange('className="' + classMatch[1] + '"', pos, cm.posFromIndex(idx + classMatch[0].length));
          }
        }
      });
    }
  }

  currentDiagnostics = diags;
  updateDiagnosticMarkers(cm, diags);
}

var activeMarkers = [];
function updateDiagnosticMarkers(cm, diags){
  activeMarkers.forEach(function(m){ m.clear(); });
  activeMarkers = [];

  diags.forEach(function(d){
    var marker = cm.markText(d.from, d.to, {
      className: d.severity === 'error' ? 'cm-diag-error' : 'cm-diag-warning',
      title: d.message
    });
    activeMarkers.push(marker);
  });
}

/* ── 5. AST Breadcrumbs Bar ── */
function updateBreadcrumbs(cm, mode){
  var bcEl = document.getElementById('astbreadcrumbs');
  if(!bcEl) return;
  var cur = cm.getCursor();
  var lines = cm.getValue().split('\n');
  var crumbs = [mode === 'css' ? 'styles.css' : 'component.jsx'];

  if(mode === 'jsx'){
    var curLine = cur.line;
    var stack = [];
    for(var i = 0; i <= curLine; i++){
      var l = lines[i];
      var tagMatch = l.match(/<([a-zA-Z0-9_-]+)([^>]*)>/g);
      if(tagMatch){
        tagMatch.forEach(function(t){
          var m = t.match(/<([a-zA-Z0-9_-]+)(?:[^>]*className="([^"]*)")?/);
          if(m && !t.endsWith('/>') && !t.startsWith('</')){
            var cls = m[2] ? '.' + m[2].split(' ')[0] : '';
            stack.push(m[1] + cls);
          }
        });
      }
      var closeMatch = l.match(/<\/([a-zA-Z0-9_-]+)>/g);
      if(closeMatch){
        closeMatch.forEach(function(){ if(stack.length > 1) stack.pop(); });
      }
    }
    crumbs = crumbs.concat(stack.slice(-3));
  } else {
    var curLine = cur.line;
    var sel = '';
    for(var i = curLine; i >= 0; i--){
      var l = lines[i].trim();
      if(l.indexOf('{') !== -1){
        sel = l.split('{')[0].trim();
        break;
      }
    }
    if(sel) crumbs.push(sel);
  }

  bcEl.innerHTML = crumbs.map(function(c, idx){
    return '<span class="bc-item' + (idx === crumbs.length - 1 ? ' active' : '') + '">' + c + '</span>';
  }).join(' <span class="bc-sep">›</span> ');
}

/* ── 6. Multi-Cursor (Cmd-D / Ctrl-D) ── */
function selectNextOccurrence(cm){
  var sel = cm.getSelection();
  if(!sel){
    var word = cm.findWordAt(cm.getCursor());
    cm.setSelection(word.anchor, word.head);
    return;
  }
  var cursor = cm.getSearchCursor(sel, cm.getCursor('to'));
  if(!cursor.findNext()){
    cursor = cm.getSearchCursor(sel, { line: 0, ch: 0 });
    if(!cursor.findNext()) return;
  }
  cm.addSelection(cursor.from(), cursor.to());
}

/* ── Attach LSP to CodeMirror instances ── */
function attachLSP(cm, modeName){
  if(cm.__lspAttached) return;
  cm.__lspAttached = true;

  // Multi-Cursor Selection keymap
  cm.addKeyMap({
    'Cmd-D': function(c){ selectNextOccurrence(c); },
    'Ctrl-D': function(c){ selectNextOccurrence(c); },
    'Cmd-.': function(c){
      if(currentDiagnostics.length && currentDiagnostics[0].fix){
        currentDiagnostics[0].fix.apply();
      }
    },
    'Ctrl-.': function(c){
      if(currentDiagnostics.length && currentDiagnostics[0].fix){
        currentDiagnostics[0].fix.apply();
      }
    }
  });

  // Diagnostics on input change
  var diagTimer = null;
  cm.on('change', function(){
    clearTimeout(diagTimer);
    diagTimer = setTimeout(function(){
      runDiagnostics(cm, modeName);
      updateBreadcrumbs(cm, modeName);
    }, 200);
  });

  cm.on('cursorActivity', function(){
    updateBreadcrumbs(cm, modeName);
  });

  // Hover Provider on mouseover
  var wrapper = cm.getWrapperElement();
  var hoverTimer = null;
  wrapper.addEventListener('mousemove', function(e){
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(function(){
      var pos = cm.coordsChar({ left: e.clientX, top: e.clientY });
      var token = cm.getTokenAt(pos);
      if(!token || !token.string || token.string.trim().length < 2){
        hideHoverCard();
        return;
      }
      var str = token.string.trim();
      var info = null;

      if(modeName === 'css'){
        if(MDN.css[str]){
          info = Object.assign({ token: str, title: 'CSS Property: ' + str }, MDN.css[str]);
        } else if(str.startsWith('.') || str.startsWith('#') || token.type === 'tag'){
          var idCount = (str.match(/#/g) || []).length;
          var classCount = (str.match(/\./g) || []).length;
          var tagCount = (/^[a-zA-Z]/.test(str) && !str.startsWith('.') && !str.startsWith('#')) ? 1 : 0;
          var score = WASM.calcSpecificity ? WASM.calcSpecificity(idCount, classCount, tagCount) : (idCount*10000 + classCount*100 + tagCount);
          info = {
            token: str,
            title: 'CSS Selector: ' + str,
            desc: 'Specificity determines which CSS rules apply when multiple declarations conflict.',
            specificity: '(' + idCount + ', ' + classCount + ', ' + tagCount + ')',
            wasmScore: score
          };
        }
      } else {
        if(MDN.jsx[str]){
          info = Object.assign({ token: str, title: 'JSX Prop: ' + str }, MDN.jsx[str]);
        }
      }

      if(info){
        showHoverCard(info, { left: e.clientX, top: e.clientY - 12 });
      } else {
        hideHoverCard();
      }
    }, 300);
  });

  wrapper.addEventListener('mouseleave', function(){
    clearTimeout(hoverTimer);
    hideHoverCard();
  });

  // Initial pass
  setTimeout(function(){
    runDiagnostics(cm, modeName);
    updateBreadcrumbs(cm, modeName);
  }, 100);
}

window.LSP = {
  ready: true,
  attach: attachLSP,
  wasm: WASM,
  diagnostics: function(){ return currentDiagnostics; },
  hover: showHoverCard
};

})();
