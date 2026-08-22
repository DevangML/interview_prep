/* Shared navbar — injected into every page. One file, one source of truth. */
(function () {
  var PAGES = [
    { href: 'index.html',      label: 'Home',      icon: '◆' },
    { href: 'ladder.html',     label: 'Ladder',    icon: '▤' },
    { href: 'arena.html',      label: 'Arena',     icon: '⚔' },
    { href: 'challenges.html', label: 'Practice',  icon: '◈' },
    { href: 'playground.html', label: 'Play',      icon: '▶' },
    { href: 'match.html',      label: 'Match',     icon: '◎' },
    { href: 'targets.html',    label: 'Targets',   icon: '⊞' }
  ];
  var here = (location.pathname.split('/').pop() || 'index.html');

  var css = document.createElement('style');
  css.textContent = [
    ':root{--navh:2.875rem}',
    '#gnav{position:sticky;top:0;z-index:900;height:var(--navh);display:flex;align-items:center;gap:.75rem;',
      'padding:0 .75rem;background:#0b1220;color:#e2e8f0;border-bottom:1px solid #1e293b;',
      'font:500 .8125rem/1 system-ui,-apple-system,sans-serif;flex:none}',
    '#gnav .brand{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:white;flex:none;padding-right:.25rem}',
    '#gnav .mark{width:1.375rem;height:1.375rem;border-radius:.375rem;display:grid;place-items:center;',
      'background:linear-gradient(140deg,steelblue,slateblue);font:800 .7rem system-ui;color:white;',
      'box-shadow:0 1px 2px rgb(0 0 0 / .4)}',
    '#gnav .bname{font-weight:700;letter-spacing:-.01em;white-space:nowrap}',
    '#gnav .sep{width:1px;height:1.125rem;background:#1e293b;flex:none}',
    '#gnav .links{display:flex;gap:.125rem;flex:1;min-width:0;overflow-x:auto;scrollbar-width:none}',
    '#gnav .links::-webkit-scrollbar{display:none}',
    '#gnav a.lnk{display:flex;align-items:center;gap:.4rem;padding:.375rem .625rem;border-radius:.4375rem;',
      'color:#94a3b8;text-decoration:none;white-space:nowrap;transition:background-color 150ms ease,color 150ms ease}',
    '#gnav a.lnk:hover{background:#16233a;color:#e2e8f0}',
    '#gnav a.lnk[aria-current=page]{background:#1d3557;color:white;box-shadow:inset 0 0 0 1px #2f5580}',
    '#gnav a.lnk .ic{opacity:.75;font-size:.8125rem;line-height:1}',
    '#gnav a.lnk[aria-current=page] .ic{opacity:1;color:#7dd3fc}',
    '#gnav .right{display:flex;align-items:center;gap:.625rem;flex:none}',
    '#gnav .rank{font:700 .6875rem system-ui;color:goldenrod;letter-spacing:.02em;white-space:nowrap}',
    '#gnav .xpwrap{display:flex;align-items:center;gap:.4rem}',
    '#gnav .xp{width:5.5rem;height:.3125rem;background:#1e293b;border-radius:999px;overflow:hidden}',
    '#gnav .xp i{display:block;height:100%;width:0;border-radius:999px;',
      'background:linear-gradient(90deg,steelblue,#7dd3fc);transition:width 400ms ease}',
    '#gnav .xptxt{font:600 .6875rem ui-monospace,monospace;color:#64748b;white-space:nowrap}',
    '#gnav .dot{width:.4375rem;height:.4375rem;border-radius:50%;background:#334155;flex:none}',
    '#gnav .dot.on{background:seagreen;box-shadow:0 0 0 .1875rem rgb(46 139 87 / .18)}',
    '#gnav a:focus-visible,#gnav button:focus-visible{outline:2px solid #7dd3fc;outline-offset:2px}',
    '@media(max-width:640px){#gnav .bname,#gnav .xptxt{display:none}#gnav .xp{width:3rem}}',
    '@media(prefers-reduced-motion:reduce){#gnav *{transition-duration:.01ms !important}}',
    'body>.top{top:var(--navh) !important}'
  ].join('');
  document.head.appendChild(css);

  var nav = document.createElement('nav');
  nav.id = 'gnav';
  nav.setAttribute('aria-label', 'Workbench');
  nav.innerHTML =
    '<a class="brand" href="index.html"><span class="mark" aria-hidden="true">R</span>' +
      '<span class="bname">React Workbench</span></a>' +
    '<span class="sep" aria-hidden="true"></span>' +
    '<div class="links">' + PAGES.map(function (p) {
      var on = p.href === here;
      return '<a class="lnk" href="' + p.href + '"' + (on ? ' aria-current="page"' : '') + '>' +
             '<span class="ic" aria-hidden="true">' + p.icon + '</span>' + p.label + '</a>';
    }).join('') + '</div>' +
    '<div class="right"><span class="rank" id="gnav-rank">—</span>' +
      '<span class="xpwrap"><span class="xp"><i id="gnav-xp"></i></span>' +
      '<span class="xptxt" id="gnav-xptxt"></span></span>' +
      '<span class="dot" id="gnav-dot" title="server"></span></div>';
  document.body.insertBefore(nav, document.body.firstChild);

  fetch('/api/state').then(function (r) { return r.json(); }).then(function (st) {
    var p = st.active_campaign.progression;
    document.getElementById('gnav-rank').textContent = p.rank;
    document.getElementById('gnav-xp').style.width = (p.xp / p.xp_total * 100) + '%';
    document.getElementById('gnav-xptxt').textContent = p.xp + '/' + p.xp_total;
    document.getElementById('gnav-dot').className = 'dot on';
  }).catch(function () {
    document.getElementById('gnav-rank').textContent = 'offline';
    document.getElementById('gnav-rank').style.color = '#64748b';
  });

  // g then h/l/a/p — quick jump
  var armed = false;
  addEventListener('keydown', function (e) {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    if (e.key === 'g') { armed = true; setTimeout(function () { armed = false; }, 900); return; }
    if (!armed) return;
    var map = { h: 'index.html', l: 'ladder.html', a: 'arena.html', c: 'challenges.html', p: 'playground.html', m: 'match.html', t: 'targets.html' };
    if (map[e.key]) location.href = map[e.key];
    armed = false;
  });
})();
