/* Layout targets. Each one is a real layout skill, not CSS art.
   `sol` renders the target. The learner writes CSS to match it. */
export const BATTLES = [
{id:'center',title:'Dead Centre',level:'Warm-up',
 teach:'One box, centred both ways in the frame.',
 html:'<div class="stage"><div class="a"></div></div>',
 base:'.stage{width:320px;height:200px;background:whitesmoke}.a{width:80px;height:80px;background:steelblue}',
 sol:'.stage{display:grid;place-items:center}',
 start:'.stage{\n  /* centre .a */\n}\n',
 hint:'Two words on the parent. Grid does it in one declaration.'},

{id:'cols3',title:'Three Equal Columns',level:'Warm-up',
 teach:'Three boxes sharing the width equally, with a 12px gutter.',
 html:'<div class="stage"><div class="a"></div><div class="a"></div><div class="a"></div></div>',
 base:'.stage{width:320px;height:120px;background:whitesmoke;padding:12px}.a{background:steelblue}',
 sol:'.stage{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}',
 start:'.stage{\n  /* three equal tracks, 12px apart */\n}\n',
 hint:'grid-template-columns with three 1fr tracks, plus gap.'},

{id:'sidebar',title:'Sidebar + Fluid Main',level:'Core',
 teach:'A fixed 90px sidebar on the left, main content taking the rest. 10px gutter.',
 html:'<div class="stage"><div class="a"></div><div class="b"></div></div>',
 base:'.stage{width:320px;height:160px;background:whitesmoke;padding:10px}.a{background:slateblue}.b{background:steelblue}',
 sol:'.stage{display:grid;grid-template-columns:90px 1fr;gap:10px}',
 start:'.stage{\n  /* 90px fixed, then fluid */\n}\n',
 hint:'A fixed track and a 1fr track. The parent decides — this is Grid, not Flex.'},

{id:'between',title:'Pushed Apart',level:'Core',
 teach:'Two boxes on one line: one hard left, one hard right, vertically centred.',
 html:'<div class="stage"><div class="a"></div><div class="b"></div></div>',
 base:'.stage{width:320px;height:100px;background:whitesmoke;padding:12px}.a{width:60px;height:40px;background:slateblue}.b{width:90px;height:40px;background:steelblue}',
 sol:'.stage{display:flex;justify-content:space-between;align-items:center}',
 start:'.stage{\n  /* push them to the edges */\n}\n',
 hint:'Content-driven row → Flex. justify-content on the main axis, align-items on the cross.'},

{id:'grid22',title:'Two by Two',level:'Core',
 teach:'A 2×2 grid filling the frame, 10px gutters.',
 html:'<div class="stage"><div class="a"></div><div class="b"></div><div class="b"></div><div class="a"></div></div>',
 base:'.stage{width:320px;height:200px;background:whitesmoke;padding:10px}.a{background:steelblue}.b{background:slateblue}',
 sol:'.stage{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:10px}',
 start:'.stage{\n  /* 2 columns, 2 rows */\n}\n',
 hint:'Both grid-template-columns and grid-template-rows, each 1fr 1fr.'},

{id:'holy',title:'Holy Grail',level:'Advanced',
 teach:'Header across the top, sidebar left, main right, footer across the bottom. 8px gutters.',
 html:'<div class="stage"><div class="hd"></div><div class="sb"></div><div class="mn"></div><div class="ft"></div></div>',
 base:'.stage{width:320px;height:220px;background:whitesmoke;padding:8px}'
     +'.hd{background:#0f172a}.sb{background:slateblue}.mn{background:steelblue}.ft{background:dimgray}',
 sol:'.stage{display:grid;gap:8px;grid-template-columns:80px 1fr;grid-template-rows:40px 1fr 30px;'
    +'grid-template-areas:"hd hd" "sb mn" "ft ft"}'
    +'.hd{grid-area:hd}.sb{grid-area:sb}.mn{grid-area:mn}.ft{grid-area:ft}',
 start:'.stage{\n  /* one grid, named areas — no nesting */\n}\n.hd{}\n.sb{}\n.mn{}\n.ft{}\n',
 hint:'grid-template-areas with "hd hd" / "sb mn" / "ft ft", then grid-area on each child.'},

{id:'cards',title:'Responsive Card Row',level:'Advanced',
 teach:'Four cards in one row, equal width, 8px gutters, filling the frame.',
 html:'<div class="stage">'+'<div class="a"></div>'.repeat(4)+'</div>',
 base:'.stage{width:320px;height:120px;background:whitesmoke;padding:8px}.a{background:steelblue}',
 sol:'.stage{display:grid;grid-template-columns:repeat(auto-fit,minmax(40px,1fr));gap:8px}',
 start:'.stage{\n  /* one line, no media query */\n}\n',
 hint:'repeat(auto-fit, minmax(40px, 1fr)) — the responsive grid in one declaration.'}
];
