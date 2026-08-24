export interface LadderLesson {
  stage: number;
  title: string;
  teach: string;
  html?: string;
  css: string;
  task?: string;
  key?: any;
  base?: string;
  polish?: any;
  why?: string;
  isjsx?: boolean;
  jsx?: string;
  before?: any;
  after?: any;
  bdiff?: any;
  adiff?: any;
}

export const LADDER_DATA: { lessons: LadderLesson[]; [key: string]: any } = {
  "lessons": [
    {
      "stage": 1,
      "title": "The box model — why your 14rem box is not 14rem",
      "teach": "You wrote <code>width:14rem</code> — that is <b>224px</b>. But <code>width</code> sizes the <b>content only</b>; padding and border are added <b>on top</b>. So the box actually occupies <b>224 + 20 + 20 = 264px</b> — 40px wider than you asked for.<br><br><code>box-sizing:border-box</code> changes what <code>width</code> <i>means</i>: 224px becomes the <b>total</b>, and the padding eats inward instead of pushing outward.<br><br>The dashed red line is exactly 14rem. Watch where the card's right edge sits relative to it.",
      "html": "<div class=\"ruler\"><span>14rem — what you asked for</span></div><div class=\"card\"><h3>Account settings</h3><p>Manage how your workspace behaves.</p></div><p class=\"note\">Card overhanging the dashed line? That gap <em>is</em> your padding, added on top of the width.</p>",
      "css": ".card{\n  width:14rem;      /* content only, for now */\n  padding:1.25rem;  /* adds 20px on each side */\n  background:steelblue;color:white;\n  border-radius:.5rem;\n}\n",
      "task": "Add <code>box-sizing:border-box</code> to <code>.card</code>. Its right edge snaps back and lands exactly on the dashed line.",
      "key": "Without border-box: width = content, and padding/border push the box wider. With it: width = the whole visible box. That is why the reset is line one of every stylesheet.",
      "base": "/* undo the harness reset so you see the REAL browser default */\n*{box-sizing:content-box}\n.ruler{box-sizing:border-box}\nbody{font:1rem/1.5 system-ui;color:black;background:whitesmoke;margin:0;padding-top:1.1rem}\n.ruler{width:14rem;border:2px dashed crimson;border-bottom:0;height:.9rem;position:relative;margin-bottom:-2px}\n.ruler span{position:absolute;top:-1.05rem;left:0;font:600 .68rem system-ui;color:crimson;white-space:nowrap}\n.card h3{margin:0 0 .25rem;font-size:1rem}\n.card p{margin:0;font-size:.875rem;opacity:.85}\n.note{font:.75rem/1.45 system-ui;color:dimgray;max-width:19rem;margin:.85rem 0 0}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "display: block vs inline",
      "teach": "<code>block</code> takes the full line and accepts width/height. <code>inline</code> flows in the text and IGNORES width/height. <code>inline-block</code> flows but accepts them.",
      "html": "<span class=\"tag\">Design</span><span class=\"tag\">Engineering</span><span class=\"tag\">Product</span>",
      "css": ".tag{\n  width:8rem;\n  background:steelblue;color:white;\n  padding:.375rem .75rem;border-radius:999px;\n  font:600 .8125rem system-ui;\n}\n",
      "task": "Width is being ignored — spans are inline. Add <code>display:inline-block</code>.",
      "key": "inline ignores width/height. inline-block accepts them and still flows.",
      "base": "body{font:1rem/1.5 system-ui;background:whitesmoke;padding:.5rem}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "display:flex — the switch that changes the children",
      "teach": "<code>display:flex</code> on a PARENT lays its children in a row. You style the parent; the children rearrange. This is the single most important line in CSS layout.",
      "html": "<div class=\"row\"><div class=\"box a\">Logo</div><div class=\"box b\">Nav</div><div class=\"box c\">Avatar</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.row{\n  background:gainsboro;padding:12px;\n}\n",
      "task": "Add <code>display:flex</code> to .row. The three boxes jump onto one line.",
      "key": "display:flex — children become flex items in a row.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "flex-direction defines the MAIN axis",
      "teach": "This is THE idea people miss. <code>flex-direction</code> decides which way is 'main'. Row → main is horizontal. Column → main is VERTICAL. Every other flex property is described relative to that axis.",
      "html": "<div class=\"row\"><div class=\"box a\">Logo</div><div class=\"box b\">Nav</div><div class=\"box c\">Avatar</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.row{\n  display:flex;\n  flex-direction:row;\n  background:gainsboro;padding:12px;\n}\n",
      "task": "Switch to <code>column</code>. Then back. Say out loud which way 'main' points each time.",
      "key": "row → main = horizontal. column → main = vertical. Everything else follows this.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "justify-content works on the MAIN axis",
      "teach": "Positions items ALONG the main axis. In a row that's left↔right. Values: flex-start, center, flex-end, space-between, space-around, space-evenly.",
      "html": "<div class=\"row\"><div class=\"box a\">Logo</div><div class=\"box b\">Nav</div><div class=\"box c\">Avatar</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.row{\n  display:flex;\n  justify-content:flex-start;\n  background:gainsboro;padding:12px;\n}\n",
      "task": "Try <code>center</code>, then <code>space-between</code>. Then add <code>flex-direction:column</code> and try again — notice it now moves them VERTICALLY.",
      "key": "justify-content = main axis. It follows flex-direction, not the screen.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "align-items works on the CROSS axis",
      "teach": "The cross axis is perpendicular to main. In a row, cross is vertical — so align-items controls vertical alignment. That's why <code>align-items:center</code> vertically centres a row.",
      "html": "<div class=\"row\"><div class=\"box a\">Logo</div><div class=\"box b\" style=\"padding:28px 18px\">tall</div><div class=\"box c\">Avatar</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.row{\n  display:flex;\n  align-items:stretch;\n  background:gainsboro;padding:12px;\n}\n",
      "task": "Try <code>center</code>, then <code>flex-start</code>, then <code>baseline</code>.",
      "key": "justify = main. align = cross. In a row: justify is horizontal, align is vertical.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "gap — spacing without margins",
      "teach": "<code>gap</code> puts space BETWEEN items only, never on the outside edges. It replaced the old margin-right-on-every-child-except-last hack. Works in flex and grid.",
      "html": "<div class=\"row\"><div class=\"box a\">Logo</div><div class=\"box b\">Nav</div><div class=\"box c\">Avatar</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.row{\n  display:flex;\n  gap:0px;\n  background:gainsboro;padding:12px;\n}\n",
      "task": "Set <code>gap:16px</code>. Notice no space appears at the outer edges.",
      "key": "gap = between only. Use it instead of child margins.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "flex: grow shrink basis",
      "teach": "On a CHILD. <code>flex:1</code> means 'take the leftover space'. The full form <code>flex:1 1 200px</code> = grow yes, shrink yes, start at 200px. This is how you make one column fill while others stay fixed.",
      "html": "<div class=\"row\"><div class=\"box a\">Logo</div><div class=\"box b\">Nav</div><div class=\"box c\">Avatar</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.row{display:flex;gap:8px;background:gainsboro;padding:12px}\n.a{\n  flex:0 1 auto;\n}\n",
      "task": "Give .a <code>flex:1</code>. Then try <code>flex:1 1 200px</code>. Then put <code>flex:1</code> on .b too and watch them share.",
      "key": "flex:1 on a child = absorb the leftover space.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "flex-wrap — squashing vs wrapping",
      "teach": "By default flex items SHRINK rather than wrap, and can get unusably narrow. <code>flex-wrap:wrap</code> lets them drop to the next line instead. Essential for responsive bars.",
      "html": "<div class=\"row\"><div class=\"box a\">Logo</div><div class=\"box b\">Nav</div><div class=\"box c\">Avatar</div><div class=\"box d\">Help</div><div class=\"box a\">Logo</div><div class=\"box b\">Nav</div><div class=\"box c\">Avatar</div><div class=\"box d\">Help</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.row{\n  display:flex;\n  gap:8px;\n  flex-wrap:nowrap;\n  background:gainsboro;padding:12px;\n}\n",
      "task": "Set <code>wrap</code>. Then drag this panel narrower and watch the difference.",
      "key": "nowrap squashes. wrap drops to a new line. Bars almost always want wrap.",
      "base": ".box{min-width:120px}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "display:grid + grid-template-columns",
      "teach": "Grid is TWO-dimensional — you declare columns up front. <code>1fr</code> means 'one share of the free space'.",
      "html": "<div class=\"g\"><div class=\"box a\">A</div><div class=\"box b\">B</div><div class=\"box c\">C</div><div class=\"box d\">D</div><div class=\"box a\">A</div><div class=\"box b\">B</div><div class=\"box c\">C</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.g{\n  display:grid;\n  grid-template-columns:1fr;\n  gap:10px;background:gainsboro;padding:12px;\n}\n",
      "task": "Try <code>1fr 1fr 1fr</code>. Then <code>200px 1fr</code> — fixed sidebar, fluid main.",
      "key": "fr = a share of leftover space. 200px 1fr = the classic sidebar+main.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "repeat + minmax + auto-fit = responsive, zero media queries",
      "teach": "<code>repeat(auto-fit, minmax(160px,1fr))</code> means: fit as many columns as you can, each at least 160px, sharing leftover space. The whole responsive card grid is this one line.",
      "html": "<div class=\"g\"><div class=\"box a\">A</div><div class=\"box b\">B</div><div class=\"box c\">C</div><div class=\"box d\">D</div><div class=\"box a\">A</div><div class=\"box b\">B</div><div class=\"box c\">C</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.g{\n  display:grid;\n  grid-template-columns:repeat(3, 1fr);\n  gap:10px;background:gainsboro;padding:12px;\n}\n",
      "task": "Replace with <code>repeat(auto-fit, minmax(160px,1fr))</code>, then drag the panel narrower. Then try <code>auto-fill</code> and spot the difference.",
      "key": "auto-fit COLLAPSES empty tracks so items stretch. auto-fill KEEPS them, leaving a gap. Classic interview question.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "place-items:center — centring, solved",
      "teach": "On a grid container, <code>place-items:center</code> centres children on BOTH axes. Two words. This is the entire centred-box archetype.",
      "html": "<div class=\"g\"><div class=\"box a\">Centred</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.g{\n  display:grid;\n  height:220px;\n  background:gainsboro;\n}\n",
      "task": "Add <code>place-items:center</code>.",
      "key": "display:grid + place-items:center = perfectly centred, both axes.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "grid-template-areas — layout you can read",
      "teach": "Name regions, then draw the layout as ASCII. The app shell becomes one readable declaration instead of nested flex containers.",
      "html": "<div class=\"shell\"><div class=\"box a\" style=\"grid-area:hd\">header</div><div class=\"box b\" style=\"grid-area:sb\">side</div><div class=\"box c\" style=\"grid-area:main\">main</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.shell{\n  display:grid;\n  gap:8px;\n  grid-template-columns:140px 1fr;\n  grid-template-rows:50px 1fr;\n  grid-template-areas:\n    \"hd sb\"\n    \"main main\";\n  height:220px;background:gainsboro;padding:12px;\n}\n",
      "task": "Change the areas to <code>\"hd hd\"</code> then <code>\"sb main\"</code> so the header spans the top.",
      "key": "Repeating a name spans that cell. \"hd hd\" = header across both columns.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "position: relative / absolute / fixed / sticky",
      "teach": "<code>relative</code> nudges without leaving flow, and becomes the anchor for absolute children. <code>absolute</code> leaves flow and positions against the nearest positioned ancestor. <code>fixed</code> pins to the viewport. <code>sticky</code> is normal until it hits a threshold, then pins.",
      "html": "<div class=\"wrapx\"><div class=\"box a\">Card</div><div class=\"box b badge\">New</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.wrapx{\n  position:relative;\n  background:gainsboro;padding:12px;height:140px;\n}\n.badge{\n  position:static;\n}\n",
      "task": "Give .badge <code>position:absolute; top:8px; right:8px;</code>. Then remove <code>position:relative</code> from .wrapx and watch it escape.",
      "key": "absolute anchors to the nearest POSITIONED ancestor. None = it escapes to the page.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "inset:0 — cover the parent exactly",
      "teach": "<code>inset:0</code> is shorthand for top/right/bottom/left all 0. With position:fixed it covers the viewport — and unlike <code>width:100vw</code> it does NOT overflow when a scrollbar exists.",
      "html": "<div class=\"wrapx\"><p style=\"margin:0;font:14px system-ui\">Page content sits underneath</p><div class=\"ov\">Overlay</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.wrapx{position:relative;background:gainsboro;padding:12px;height:160px}\n.ov{\n  position:absolute;\n  background:rgb(0 0 0/.6);color:white;\n  display:grid;place-items:center;\n  font:600 14px system-ui;\n}\n",
      "task": "Add <code>inset:0</code> to .ov.",
      "key": "inset:0 = top/right/bottom/left 0. Use it for overlays, never width:100vw.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "Units: px, rem, %, dvh, clamp()",
      "teach": "<code>px</code> fixed · <code>rem</code> scales with the user's font size (use for text/spacing) · <code>%</code> of the parent · <code>dvh</code> viewport height that is correct on mobile · <code>clamp(min, ideal, max)</code> fluid with bounds.",
      "html": "<div class=\"mark\"><span>1.25rem floor</span></div><div class=\"box a t\">Fluid heading</div><div class=\"mark big\"><span>2rem ceiling</span></div><p class=\"hint2\">Drag the preview edge. The text scales between the two marks and never past them.</p>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.t{\n  font-size:16px;\n  padding:1rem;\n  width:100%;\n  max-width:400px;\n}\n",
      "task": "Try <code>font-size:clamp(14px, 4vw, 32px)</code> then drag the panel width.",
      "key": "clamp(min, fluid, max) — responsive type with no media query.",
      "base": "\n.mark{height:1.25rem;border-left:2px solid crimson;padding-left:.4rem;margin:.35rem 0;position:relative}\n.mark.big{height:2rem}\n.mark span{font:600 .65rem system-ui;color:crimson;position:absolute;top:0;left:.5rem}\n.hint2{font:.7rem/1.4 system-ui;color:dimgray;margin:.6rem 0 0}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": "Media queries — the escape hatch",
      "teach": "For when a layout must change SHAPE, not just scale. Mobile-first: write the small layout, then add <code>@media (min-width: …)</code> for bigger. Pick breakpoints where YOUR content breaks, not from device names.",
      "html": "<div class=\"g\"><div class=\"box a\">A</div><div class=\"box b\">B</div><div class=\"box c\">C</div><div class=\"box d\">D</div></div>",
      "css": ".box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}\n.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}\n.g{\n  display:grid;\n  grid-template-columns:1fr;\n  gap:8px;background:gainsboro;padding:12px;\n}\n\n@media (min-width:500px){\n  /* your rule here */\n}\n",
      "task": "Inside the media query set <code>.g{grid-template-columns:1fr 1fr}</code>. Then drag the panel across 500px.",
      "key": "Mobile-first: base = small. min-width queries add complexity as space appears.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 1,
      "title": ":focus-visible — the accessibility line that is scored",
      "teach": "Keyboard users must SEE where they are. <code>:focus-visible</code> shows a ring for keyboard focus but not mouse clicks. One global rule covers your whole build.",
      "html": "<button class=\"btn\">Save changes</button> <button class=\"btn\">Cancel</button>",
      "css": ".btn{padding:8px 16px;border:1px solid silver;border-radius:6px;background:white;font:inherit;cursor:pointer}\n\n/* add the rule here */\n",
      "task": "Add <code>.btn:focus-visible{outline:2px solid steelblue; outline-offset:2px}</code> then click into the preview and press Tab.",
      "key": ":focus-visible = keyboard only. Never remove outlines without replacing them.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "The problem: bespoke CSS doesn't scale under a clock",
      "teach": "Look right — that's three components, each with its own hand-rolled spacing and colour. ~30 lines for three boxes. In a 25-minute build you'd write this four more times. The next seven lessons replace ALL of it with reusable classes you type once.",
      "html": "<div class=\"a\"><h3>One</h3><p>Body</p></div><div class=\"b\"><h3>Two</h3><p>Body</p></div><div class=\"c\"><h3>Three</h3><p>Body</p></div>",
      "css": ".a{background:white;border:1px solid gainsboro;border-radius:8px;padding:16px;margin-bottom:16px}\n.a h3{margin:0 0 8px}\n.a p{margin:0;color:dimgray}\n.b{background:white;border:1px solid gainsboro;border-radius:8px;padding:16px;margin-bottom:16px}\n.b h3{margin:0 0 8px}\n.b p{margin:0;color:dimgray}\n.c{background:white;border:1px solid gainsboro;border-radius:8px;padding:16px}\n.c h3{margin:0 0 8px}\n.c p{margin:0;color:dimgray}\n",
      "task": "Count the duplication. Nothing to change here — just notice how much of it is the same three declarations repeated.",
      "key": "Three identical boxes, three copies of the CSS. This is the tax the system removes.",
      "base": "",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "Tokens — name the value once",
      "teach": "A custom property is a named value. Change <code>--brand</code> in one place and every use updates. Seven colours and four spaces is the whole palette — memorise those, derive the rest.",
      "html": "<div class=\"box\"><h3 style=\"margin:0 0 var(--s)\">Card</h3><p class=\"muted\" style=\"margin:0\">Muted body text</p><button class=\"btn\" data-v=\"primary\" style=\"margin-top:var(--m)\">Action</button></div>",
      "css": ":root{\n  --ink:black;\n  --muted:dimgray;\n  --line:gainsboro;\n  --surface:white;\n  --bg:whitesmoke;\n  --brand:steelblue;\n  --danger:firebrick;\n  --s:.5rem;\n  --m:1rem;\n  --l:1.5rem;\n  --xl:2rem;\n  --round:8px;\n}\n",
      "task": "Change <code>--brand</code> to <code>seagreen</code>. One edit, the button follows. Then change <code>--round</code> to <code>16px</code>.",
      "key": "Tokens = one name, many uses. Never repeat a hex value.",
      "base": "body{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}\n.muted{color:var(--muted)}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "color-mix() — stop inventing colour tokens",
      "teach": "You need a hover shade, a tint, a border. Do NOT add three more tokens. Derive them from the one you have. <code>color-mix(in oklch, X 85%, black)</code> is the darker hover; mixing with <code>--surface</code> gives a tint.",
      "html": "<button class=\"btn\" data-v=\"primary\">Hover me</button> <span class=\"tint\">tinted surface</span>",
      "css": ".btn[data-v=primary]:hover{\n  background:royalblue;   /* hardcoded — replace me */\n}\n.tint{\n  padding:var(--s) var(--m);border-radius:6px;\n  background:gainsboro;      /* hardcoded — replace me */\n}\n",
      "task": "Replace both hardcoded values: hover → <code>color-mix(in oklch,var(--brand) 85%,black)</code>, tint → <code>color-mix(in oklch,var(--brand) 10%,var(--surface))</code>.",
      "key": "Two colours from one token. Change --brand and every derived shade follows.",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}\nbody{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}\n.muted{color:var(--muted)}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "STACK — the highest-leverage class in CSS",
      "teach": "<code>.stack > * + *</code> is the owl selector: 'every child that has a sibling before it'. Margin is a property of the RELATIONSHIP between two elements, not of an element. So no leftover margin on the last child, ever. One class replaces every margin-bottom you would have written.",
      "html": "<div class=\"stack box\"><h3 style=\"margin:0\">Title</h3><p style=\"margin:0\" class=\"muted\">First paragraph.</p><p style=\"margin:0\" class=\"muted\">Second paragraph.</p><button class=\"btn\" data-v=\"primary\">Action</button></div>",
      "css": ".stack > * + * {\n  /* your rule here */\n}\n",
      "task": "Add <code>margin-block-start:var(--space,var(--m))</code>. Then add <code>style=\"--space:var(--xl)\"</code> to the .stack element and watch it re-space.",
      "key": "One class, all vertical rhythm. --space overrides per instance without a new class.",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}\nbody{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}\n.muted{color:var(--muted)}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "CLUSTER and BETWEEN — everything horizontal",
      "teach": "<code>.cluster</code> = flex + wrap + gap + align-center: any row of things that should wrap gracefully. <code>.between</code> adds space-between: the whole action-bar archetype.",
      "html": "<div class=\"between box\"><strong>Team members</strong><div class=\"cluster\"><button class=\"btn\">Filter</button><button class=\"btn\" data-v=\"primary\">Invite</button></div></div>",
      "css": ".cluster{\n  /* your rule */\n}\n.between{\n  /* your rule */\n}\n",
      "task": "cluster → <code>display:flex;flex-wrap:wrap;gap:var(--m);align-items:center</code>. between → same plus <code>justify-content:space-between</code>. Then drag narrow.",
      "key": "cluster = a wrapping row. between = the same, pushed apart. Two classes, every toolbar you'll ever build.",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}\nbody{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}\n.muted{color:var(--muted)}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "SIDEBAR — responsive with NO media query",
      "teach": "The trick: the sidebar gets a fixed-ish basis; the main gets <code>flex-grow:999</code> so it eats all spare space, plus <code>min-inline-size:50%</code>. When main would drop under 50%, flex-wrap fires and they stack. The layout responds to its OWN width, not the viewport's.",
      "html": "<div class=\"sidebar\"><div class=\"box\"><strong>Nav</strong><p class=\"muted\" style=\"margin:var(--s) 0 0\">Sidebar</p></div><div class=\"box\"><strong>Main</strong><p class=\"muted\" style=\"margin:var(--s) 0 0\">Drag the preview edge — it stacks on its own.</p></div></div>",
      "css": ".sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}\n.sidebar > :first-child{\n  flex-basis:15rem;\n  /* add flex-grow */\n}\n.sidebar > :last-child{\n  /* add the three lines */\n}\n",
      "task": "first-child → add <code>flex-grow:1</code>. last-child → <code>flex-basis:0; flex-grow:999; min-inline-size:50%</code>. Then drag the preview's right edge.",
      "key": "flex-grow:999 + min-inline-size:50% = self-collapsing. Zero media queries. This is the disruptive one.",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}\nbody{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}\n.muted{color:var(--muted)}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "SWITCHER — equal columns that stack themselves",
      "teach": "<code>flex-basis:calc((30rem - 100%) * 999)</code>. If the container is wider than 30rem the calc goes negative, clamps to 0, and items share equally. Narrower, it goes huge, and each item takes a full line. One line of maths replaces a media query.",
      "html": "<div class=\"switcher\"><div class=\"box\"><strong>Plan 1</strong><p class=\"muted\" style=\"margin:var(--s) 0 0\">$10/mo</p></div><div class=\"box\"><strong>Plan 2</strong><p class=\"muted\" style=\"margin:var(--s) 0 0\">$20/mo</p></div><div class=\"box\"><strong>Plan 3</strong><p class=\"muted\" style=\"margin:var(--s) 0 0\">$30/mo</p></div></div>",
      "css": ".switcher{display:flex;flex-wrap:wrap;gap:var(--m)}\n.switcher > *{\n  flex-grow:1;\n  /* add the flex-basis calc */\n}\n",
      "task": "Add <code>flex-basis:calc((30rem - 100%) * 999)</code>. Drag the preview across ~480px.",
      "key": "The Holy Albatross. Container-relative switching, no media query, one line.",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}\nbody{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}\n.muted{color:var(--muted)}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "EXCEPTIONS — data attributes, not modifier classes",
      "teach": "BEM gives you .btn--primary, .btn--ghost, .btn--danger, .btn--primary-large… an explosion. CUBE uses a data attribute: one hook, readable in the DOM, usable by JS too.",
      "html": "<div class=\"cluster\"><button class=\"btn\" data-v=\"primary\">Primary</button><button class=\"btn\">Default</button><button class=\"btn\" data-v=\"ghost\">Ghost</button><button class=\"btn\" data-tone=\"danger\">Danger</button></div>",
      "css": ".btn[data-v=ghost]{\n  /* your rule */\n}\n[data-tone=danger]{\n  /* your rule */\n}\n",
      "task": "ghost → <code>background:none;border-color:transparent</code>. danger → <code>color:var(--danger);border-color:var(--danger)</code>.",
      "key": "One attribute hook per variation. data-tone works on ANY block — that is why it is not .btn--danger.",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}\nbody{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}\n.muted{color:var(--muted)}\n",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "Putting it together — the whole dashboard, no new CSS",
      "teach": "Everything below is composed from classes you already wrote. Read the class attributes: that is where the layout now lives. Component CSS: zero lines.",
      "html": "<div class=\"stack\"><div class=\"between box\"><strong>Dashboard</strong><div class=\"cluster\"><input class=\"input\" style=\"width:auto\" placeholder=\"Search…\"><button class=\"btn\" data-v=\"primary\">Add</button></div></div><div class=\"sidebar\"><div class=\"box stack\"><strong>Filters</strong><p class=\"muted\" style=\"margin:0\">Status</p><p class=\"muted\" style=\"margin:0\">Owner</p></div><div class=\"grid-auto\"><div class=\"box stack\"><strong>Metric 1</strong><p class=\"muted\" style=\"margin:0\">Summary</p></div><div class=\"box stack\"><strong>Metric 2</strong><p class=\"muted\" style=\"margin:0\">Summary</p></div><div class=\"box stack\"><strong>Metric 3</strong><p class=\"muted\" style=\"margin:0\">Summary</p></div><div class=\"box stack\"><strong>Metric 4</strong><p class=\"muted\" style=\"margin:0\">Summary</p></div></div></div></div>",
      "css": ".stack > * + *{margin-block-start:var(--space,var(--m))}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}\n.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}\n.sidebar > :first-child{flex-basis:15rem;flex-grow:1}\n.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:50%}\n.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))}\n",
      "task": "Change nothing. Drag the preview from wide to narrow and watch three layouts respond independently. Then change <code>--m</code> to <code>1.5rem</code> — the whole page re-spaces from one edit.",
      "key": "Five words carry it: stack · cluster · sidebar · switcher · center. That is the entire memory load.",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}\nbody{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}\n.muted{color:var(--muted)}",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "THE DECISION — Grid when the parent decides, Flex when the content decides",
      "teach": "This is the rule the whole system hangs on, and it is the answer to \"why Grid here and Flex there?\" in an interview.<br><br><b>Grid</b> — you know the structure up front. Tracks, 2D, alignment <i>across</i> rows. The <b>parent</b> dictates sizing, top-down.<br><b>Flex</b> — you do not control the count or the widths. One direction, content-driven, should wrap on its own.<br><br><b>The tell:</b> if you are reaching for a third nested container to make things line up, you needed Grid one level higher.<br><br><span style=\"display:block;background:#ecfdf5;border-left:3px solid seagreen;padding:.55rem .7rem;border-radius:0 .3rem .3rem 0;font-size:.86rem;color:#065f46\"><b>Core.</b> This is the most likely CSS architecture question in the technical round, and the reasoning behind half the Mettl layout MCQs. Own it cold.</span>",
      "html": "<div class=\"demo\"><p class=\"lab\">GRID — parent owns the tracks</p><div class=\"g\"><div class=\"box\">Sidebar</div><div class=\"box\">Main</div><div class=\"box\">Aside</div></div><p class=\"lab\">FLEX — content flows and wraps</p><div class=\"cluster\"><button class=\"btn\">All</button><button class=\"btn\" data-v=\"primary\">Active</button><button class=\"btn\">Archived</button><button class=\"btn\">Deleted</button></div></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.muted{color:var(--muted)}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.lab{font:700 .62rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin:.9rem 0 .4rem}\n.demo>.lab:first-child{margin-top:0}\n",
      "css": ".g{\n  display:grid;\n  gap:var(--m);\n  grid-template-columns:10rem 1fr 8rem;\n}\n",
      "task": "Change <code>grid-template-columns</code> to <code>1fr 2fr 1fr</code> — the PARENT resized all three children. Now try to do that to the button row without touching the buttons. You cannot: that row is content-driven, which is why it is flex.",
      "key": "Grid = parent decides tracks, top-down, 2D. Flex = content decides, one direction, wraps. Ask 'who owns the sizing?' and the answer picks itself.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "Flat beats nested — the anti-pattern you are being hired to avoid",
      "teach": "The old way to get a header, sidebar, main and footer was four or five nested flex containers, each one existing only to hold the next. It works, but the structure lies about the layout and every change means re-reading the whole nest.<br><br><b>One grid with named areas replaces the entire nest.</b> The markup goes flat, and the layout becomes readable as ASCII.<br><br><span style=\"display:block;background:#ecfdf5;border-left:3px solid seagreen;padding:.55rem .7rem;border-radius:0 .3rem .3rem 0;font-size:.86rem;color:#065f46\"><b>Core.</b> <code>grid-template-areas</code> is plain Grid — squarely inside Mettl's CSS3 scope, and the cleanest answer to \"how would you build this dashboard?\"</span>",
      "html": "<div class=\"page\"><header class=\"hd\">Header</header><aside class=\"sb\">Sidebar</aside><main class=\"mn\">Main content</main><footer class=\"ft\">Footer</footer></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.muted{color:var(--muted)}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.page>*{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:.75rem;font:600 .85rem system-ui}\n.hd{background:steelblue;color:white}.ft{background:slateblue;color:white}\n",
      "css": ".page{\n  display:grid;\n  gap:var(--s);\n  /* one declaration replaces 4 nested flex wrappers */\n  grid-template-areas:\n    \"hd hd\"\n    \"sb mn\"\n    \"ft ft\";\n  grid-template-columns:8rem 1fr;\n}\n.hd{grid-area:hd}\n.sb{grid-area:sb}\n.mn{grid-area:mn}\n.ft{grid-area:ft}\n",
      "task": "Swap the sidebar to the right: change the areas to <code>\"hd hd\"</code> / <code>\"mn sb\"</code> / <code>\"ft ft\"</code> and the columns to <code>1fr 8rem</code>. Four HTML elements, zero wrappers, one edit.",
      "key": "Named areas = flat markup + a layout you can read. Nesting containers to fake structure is the 2020 habit; this replaces it.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "<span style=\"display:inline-block;background:goldenrod;color:white;font:700 .6rem system-ui;padding:.1rem .45rem;border-radius:999px;letter-spacing:.04em;margin-right:.4rem;vertical-align:middle\">BONUS</span>SUBGRID — align card internals across cards, no fixed heights",
      "teach": "Cards in a row never line up: one has a longer title, so its button sits lower. The old fixes were fixed heights or JS.<br><br><b>Subgrid lets a child inherit the PARENT's row tracks.</b> Each card spans the same three rows, so every title, body and button aligns across the whole row — automatically, at any content length.<br><br><span style=\"display:block;background:#fffbeb;border-left:3px solid goldenrod;padding:.55rem .7rem;border-radius:0 .3rem .3rem 0;font-size:.86rem;color:#78350f\"><b>Exam weighting:</b> Mettl names <i>Flexbox</i> and <i>responsive design</i> in its CSS3 competency list — it does not name this. Understand what it solves so you can say one sentence about it in the technical round. <b>Do not drill it.</b></span>",
      "html": "<p class=\"lab\">watch the three Choose buttons</p><div class=\"cards\"><div class=\"c\"><h4>Starter</h4><p class=\"muted\">Short blurb.</p><button class=\"btn\" data-v=\"primary\">Choose</button></div><div class=\"c\"><h4>Team plan for growing companies</h4><p class=\"muted\">A much longer description that wraps onto several lines and pushes everything down.</p><button class=\"btn\" data-v=\"primary\">Choose</button></div><div class=\"c\"><h4>Scale</h4><p class=\"muted\">Medium length blurb here.</p><button class=\"btn\" data-v=\"primary\">Choose</button></div></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.muted{color:var(--muted)}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.cards{display:grid;gap:.5rem;grid-template-columns:repeat(3,1fr)}   /* 3 across so you can see the alignment */\n.c{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:.6rem;font-size:.8rem}\n.c h4{font-size:.85rem}\n.c .btn{padding:.35em .6em;font-size:.75rem}\n.c h4,.c p{margin:0}\n.lab{font:700 .6rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin:0 0 .4rem}\n",
      "css": ".cards{\n  /* rows the cards will share */\n  grid-template-rows:auto;\n}\n.c{\n  /* each card is its own little grid, for now */\n  display:grid;\n  gap:var(--s);\n}\n",
      "task": "Make the buttons line up: on <code>.cards</code> add <code>grid-template-rows:auto auto auto</code>; on <code>.c</code> add <code>grid-row:span 3</code> and <code>grid-template-rows:subgrid</code>. The cards now share the parent's rows.",
      "key": "subgrid = the child adopts the parent's tracks. Cross-card alignment with no fixed heights, no JS, no nesting.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 2,
      "title": "<span style=\"display:inline-block;background:goldenrod;color:white;font:700 .6rem system-ui;padding:.1rem .45rem;border-radius:999px;letter-spacing:.04em;margin-right:.4rem;vertical-align:middle\">BONUS</span>CONTAINER QUERIES — a component that responds to ITSELF",
      "teach": "A media query asks how wide the <i>viewport</i> is. That is the wrong question for a component that might sit in a wide main column or a narrow sidebar.<br><br><code>container-type:inline-size</code> turns a parent into a query container; <code>@container</code> then asks how wide <b>that box</b> is. This is what finally kills the old flexbox width hacks — a component becomes genuinely portable.<br><br><span style=\"display:block;background:#fffbeb;border-left:3px solid goldenrod;padding:.55rem .7rem;border-radius:0 .3rem .3rem 0;font-size:.86rem;color:#78350f\"><b>Exam weighting:</b> Mettl names <i>Flexbox</i> and <i>responsive design</i> in its CSS3 competency list — it does not name this. Understand what it solves so you can say one sentence about it in the technical round. <b>Do not drill it.</b></span>",
      "html": "<div class=\"wide contains\"><p class=\"lab\">same component, wide container</p><div class=\"card\"><img alt=\"\" class=\"ph\"><div><h4>Portable card</h4><p class=\"muted\">Side by side when it has room.</p></div></div></div><div class=\"narrow contains\"><p class=\"lab\">same component, narrow container</p><div class=\"card\"><img alt=\"\" class=\"ph\"><div><h4>Portable card</h4><p class=\"muted\">Stacks when it does not.</p></div></div></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.muted{color:var(--muted)}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.lab{font:700 .6rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin:0 0 .35rem}\n.wide{max-width:100%}.narrow{max-width:14rem;margin-top:1rem}\n.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m);display:grid;gap:var(--s)}\n.card h4,.card p{margin:0}.ph{width:100%;height:3rem;background:aliceblue;border-radius:.375rem}\n",
      "css": ".contains{\n  /* your rule here */\n}\n\n@container (min-width:22rem){\n  .card{\n    /* and here */\n  }\n}\n",
      "task": "Add <code>container-type:inline-size</code> to <code>.contains</code>, then inside the <code>@container</code> block set <code>.card{grid-template-columns:5rem 1fr;align-items:center}</code>. One component, two layouts, and NOT a media query in sight.",
      "key": "container-type on the parent, @container on the child. The component responds to its own box — which is why it can be dropped anywhere.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 3,
      "title": "Space on one scale — not arbitrary numbers",
      "teach": "The fastest way a UI looks amateur is spacing picked ad hoc: 13px here, 7px there. Pick <b>one scale</b> and only ever use values from it. Four steps is enough: <b>8 / 16 / 24 / 32</b>.",
      "html": "<div class=\"card\"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter, with EMEA leading at 24% year over year.</p><div class=\"row\"><button class=\"btn p\">View report</button><button class=\"btn\">Dismiss</button></div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}\n.card{background:white;border:1px solid gainsboro;max-width:420px}\n.card h3{margin:0}\n.card p{margin:0}\n.row{display:flex}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}\n.btn.p{background:steelblue;border-color:steelblue;color:white}\n",
      "css": ".card{padding:24px}\n.card h3{margin-bottom:8px}\n.card p{margin-bottom:24px}\n.row{gap:8px}",
      "before": ".card{padding:13px}\n.card h3{margin-bottom:7px}\n.card p{margin-bottom:11px}\n.row{gap:5px}",
      "after": ".card{padding:24px}\n.card h3{margin-bottom:8px}\n.card p{margin-bottom:24px}\n.row{gap:8px}",
      "bdiff": [
        {
          "t": ".card{padding:13px}",
          "k": "del"
        },
        {
          "t": ".card h3{margin-bottom:7px}",
          "k": "del"
        },
        {
          "t": ".card p{margin-bottom:11px}",
          "k": "del"
        },
        {
          "t": ".row{gap:5px}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".card{padding:24px}",
          "k": "add"
        },
        {
          "t": ".card h3{margin-bottom:8px}",
          "k": "add"
        },
        {
          "t": ".card p{margin-bottom:24px}",
          "k": "add"
        },
        {
          "t": ".row{gap:8px}",
          "k": "add"
        }
      ],
      "why": "Four values, all snapped to the scale. Nothing else changed — and it already looks deliberate.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 3,
      "title": "Measure and line-height — text that reads",
      "teach": "Two numbers do almost all typographic work. <b>Measure</b>: 60–75 characters per line (<code>max-width:65ch</code>). <b>Line-height</b>: ~1.5 body, ~1.2 headings. Over-long lines are the most common readability failure on the web.",
      "html": "<div class=\"card\"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter, with EMEA leading at 24% year over year.</p><div class=\"row\"><button class=\"btn p\">View report</button><button class=\"btn\">Dismiss</button></div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}\n.card{background:white;border:1px solid gainsboro;max-width:420px}\n.card h3{margin:0}\n.card p{margin:0}\n.row{display:flex}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}\n.btn.p{background:steelblue;border-color:steelblue;color:white}\n.card{padding:24px}\n.card h3{margin-bottom:8px}\n.card p{margin-bottom:24px}\n.row{gap:8px}\n",
      "css": ".card{max-width:65ch}\n.card p{line-height:1.6}",
      "before": ".card{max-width:420px}\n.card p{line-height:1}",
      "after": ".card{max-width:65ch}\n.card p{line-height:1.6}",
      "bdiff": [
        {
          "t": ".card{max-width:420px}",
          "k": "del"
        },
        {
          "t": ".card p{line-height:1}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".card{max-width:65ch}",
          "k": "add"
        },
        {
          "t": ".card p{line-height:1.6}",
          "k": "add"
        }
      ],
      "why": "Two properties. The paragraph stops being a wall and starts being prose.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 3,
      "title": "Hierarchy by weight and colour — not by size",
      "teach": "Beginners scale font-size for every level and end up with six sizes fighting. Professionals hold size nearly constant and vary <b>weight</b> and <b>colour</b>. Two sizes, three weights, two greys is a complete hierarchy.<br><br>The <b>left card is the control</b> — everything at one size and weight. Change only the right card and watch the two diverge.",
      "html": "<div class=\"pair\"><div class=\"card ctl\"><p class=\"lab\">before</p><p class=\"e\">Finance</p><h3>Quarterly report</h3><p class=\"b\">Revenue grew across every region.</p><p class=\"m\">Updated 2 hours ago</p></div><div class=\"card\"><p class=\"lab\">after — your CSS</p><p class=\"eyebrow\">Finance</p><h3>Quarterly report</h3><p class=\"body\">Revenue grew across every region.</p><p class=\"meta\">Updated 2 hours ago</p></div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}\n.card{background:white;border:1px solid gainsboro;max-width:420px}\n.card h3{margin:0}\n.card p{margin:0}\n.row{display:flex}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}\n.btn.p{background:steelblue;border-color:steelblue;color:white}\n\n.card p{margin:0}\n.card h3{margin:0}\n\n.pair{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr))}\n.card{padding:1.25rem;background:white;border:1px solid gainsboro;border-radius:.5rem}\n.card p{margin:0}.card h3{margin:0}\n.lab{font:700 .62rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin-bottom:.5rem!important}\n.pair .card.ctl .e,.pair .card.ctl h3,.pair .card.ctl .b,.pair .card.ctl .m{font-size:20px!important;font-weight:400!important;color:black!important;letter-spacing:normal!important;text-transform:none!important}\n",
      "css": ".eyebrow{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:dimgray}\n.card h3{font-size:20px;font-weight:600;margin:4px 0 8px}\n.body{font-size:15px;color:black}\n.meta{font-size:13px;color:darkgray;margin-top:12px}",
      "before": ".eyebrow{font-size:20px}\n.card h3{font-size:34px}\n.body{font-size:18px}\n.meta{font-size:16px}",
      "after": ".eyebrow{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:dimgray}\n.card h3{font-size:20px;font-weight:600;margin:4px 0 8px}\n.body{font-size:15px;color:black}\n.meta{font-size:13px;color:darkgray;margin-top:12px}",
      "bdiff": [
        {
          "t": ".eyebrow{font-size:20px}",
          "k": "del"
        },
        {
          "t": ".card h3{font-size:34px}",
          "k": "del"
        },
        {
          "t": ".body{font-size:18px}",
          "k": "del"
        },
        {
          "t": ".meta{font-size:16px}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".eyebrow{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:dimgray}",
          "k": "add"
        },
        {
          "t": ".card h3{font-size:20px;font-weight:600;margin:4px 0 8px}",
          "k": "add"
        },
        {
          "t": ".body{font-size:15px;color:black}",
          "k": "add"
        },
        {
          "t": ".meta{font-size:13px;color:darkgray;margin-top:12px}",
          "k": "add"
        }
      ],
      "why": "Same words, same markup. All the hierarchy now comes from weight, colour and letter-spacing.",
      "polish": true,
      "isjsx": false,
      "jsx": "",
      "task": "Give the right card a real hierarchy: eyebrow <code>12px/700/uppercase</code> with <code>letter-spacing:.08em</code> and <code>color:dimgray</code> · h3 <code>20px/600</code> · body <code>15px</code> · meta <code>13px</code> and <code>color:darkgray</code>. Same words, same markup — compare against the left."
    },
    {
      "stage": 3,
      "title": "Two shadows, used as elevation",
      "teach": "Not ten shadows — <b>two</b>. A small one for resting cards, a larger one for things that float (menus, modals). Low opacity, offset downward: light comes from above.",
      "html": "<div class=\"card\"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter, with EMEA leading at 24% year over year.</p><div class=\"row\"><button class=\"btn p\">View report</button><button class=\"btn\">Dismiss</button></div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}\n.card{background:white;border:1px solid gainsboro;max-width:420px}\n.card h3{margin:0}\n.card p{margin:0}\n.row{display:flex}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}\n.btn.p{background:steelblue;border-color:steelblue;color:white}\n.card{padding:24px;max-width:420px}\n.card h3{margin-bottom:8px}\n.card p{margin-bottom:24px}\n.row{gap:8px}\n",
      "css": ".card{box-shadow:0 1px 2px rgb(0 0 0 / .05),\n              0 4px 12px rgb(0 0 0 / .06)}",
      "before": ".card{box-shadow:0 0 20px rgb(0 0 0 / .45)}",
      "after": ".card{box-shadow:0 1px 2px rgb(0 0 0 / .05),\n              0 4px 12px rgb(0 0 0 / .06)}",
      "bdiff": [
        {
          "t": ".card{box-shadow:0 0 20px rgb(0 0 0 / .45)}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".card{box-shadow:0 1px 2px rgb(0 0 0 / .05),",
          "k": "add"
        },
        {
          "t": "              0 4px 12px rgb(0 0 0 / .06)}",
          "k": "add"
        }
      ],
      "why": "Two soft layers beat one heavy blur. A tight shadow for the edge, a wide one for the lift.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 3,
      "title": "Radius consistency — and the nesting rule",
      "teach": "Pick one radius, use it everywhere. When a rounded thing sits inside another rounded thing the inner radius must be <b>smaller</b> or the corners fight. Rule of thumb: <b>inner = outer − padding</b>.",
      "html": "<div class=\"card\"><div class=\"inner\">Nested block</div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}\n.card{background:white;border:1px solid gainsboro;max-width:420px}\n.card h3{margin:0}\n.card p{margin:0}\n.row{display:flex}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}\n.btn.p{background:steelblue;border-color:steelblue;color:white}\n.card{padding:12px;max-width:420px}\n.inner{background:aliceblue;padding:16px}\n",
      "css": ".card{border-radius:12px}\n.inner{border-radius:6px}",
      "before": ".card{border-radius:12px}\n.inner{border-radius:12px}",
      "after": ".card{border-radius:12px}\n.inner{border-radius:6px}",
      "bdiff": [
        {
          "t": ".card{border-radius:12px}",
          "k": "same"
        },
        {
          "t": ".inner{border-radius:12px}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".card{border-radius:12px}",
          "k": "same"
        },
        {
          "t": ".inner{border-radius:6px}",
          "k": "add"
        }
      ],
      "why": "One number changed. The corners stop competing. Same rule for buttons inside cards.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 3,
      "title": "Borders: hairline, and tinted rather than grey",
      "teach": "A 2px mid-grey border is louder than it needs to be. Go 1px and tint it — a translucent black sits on any background. The UI gets calmer without losing structure.",
      "html": "<div class=\"card\"><h3>Quarterly report</h3><p>Revenue grew across every region.</p></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}\n.card{background:white;border:1px solid gainsboro;max-width:420px}\n.card h3{margin:0}\n.card p{margin:0}\n.row{display:flex}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}\n.btn.p{background:steelblue;border-color:steelblue;color:white}\n.card{padding:24px;max-width:420px}\n.card h3{margin-bottom:8px}\n",
      "css": ".card{border:1px solid rgb(0 0 0 / .08)}",
      "before": ".card{border:2px solid gray}",
      "after": ".card{border:1px solid rgb(0 0 0 / .08)}",
      "bdiff": [
        {
          "t": ".card{border:2px solid gray}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".card{border:1px solid rgb(0 0 0 / .08)}",
          "k": "add"
        }
      ],
      "why": "Half the weight, a tenth the noise. Often you can drop the border entirely and let a shadow do the work.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 3,
      "title": "Transitions — 150ms, on interactive things only",
      "teach": "Motion signals 'this responds to you'. Keep it short (120–200ms), and put it ONLY on interactive elements. Never transition <code>all</code> — name the properties you mean.",
      "html": "<div class=\"row\"><button class=\"btn p\">Hover me</button><button class=\"btn\">And me</button></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}\n.card{background:white;border:1px solid gainsboro;max-width:420px}\n.card h3{margin:0}\n.card p{margin:0}\n.row{display:flex}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}\n.btn.p{background:steelblue;border-color:steelblue;color:white}\n.row{gap:8px}\n.btn.p:hover{background:royalblue}\n.btn:hover{background:whitesmoke}\n",
      "css": ".btn{transition:background-color 150ms ease,\n                border-color 150ms ease}",
      "before": ".btn{}",
      "after": ".btn{transition:background-color 150ms ease,\n                border-color 150ms ease}",
      "bdiff": [
        {
          "t": ".btn{}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".btn{transition:background-color 150ms ease,",
          "k": "add"
        },
        {
          "t": "                border-color 150ms ease}",
          "k": "add"
        }
      ],
      "why": "One line. Hover both buttons before and after — the difference is the whole feel of the control.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 3,
      "title": "Affordance — hover, active, focus, accent-color",
      "teach": "Three states make a control feel real: <b>hover</b> (shift the colour), <b>active</b> (nudge 1px down), <b>focus-visible</b> (a ring). And <code>accent-color</code> themes native checkboxes and radios in a single line.",
      "html": "<div class=\"row\"><button class=\"btn p\">Save</button><label class=\"chk\"><input type=\"checkbox\" checked> Notify me</label></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}\n.card{background:white;border:1px solid gainsboro;max-width:420px}\n.card h3{margin:0}\n.card p{margin:0}\n.row{display:flex}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}\n.btn.p{background:steelblue;border-color:steelblue;color:white}\n.row{gap:16px;align-items:center}\n.chk{display:flex;align-items:center;gap:8px;font-size:14px}\n.btn{transition:background-color 150ms ease}\n",
      "css": "body{accent-color:steelblue}\n.btn.p:hover{background:color-mix(in oklch,steelblue 85%,black)}\n.btn.p:active{transform:translateY(1px)}\n.btn:focus-visible{outline:2px solid steelblue;outline-offset:2px}",
      "before": "body{}\n.btn.p:hover{}\n.btn.p:active{}\n.btn:focus-visible{}",
      "after": "body{accent-color:steelblue}\n.btn.p:hover{background:color-mix(in oklch,steelblue 85%,black)}\n.btn.p:active{transform:translateY(1px)}\n.btn:focus-visible{outline:2px solid steelblue;outline-offset:2px}",
      "bdiff": [
        {
          "t": "body{}",
          "k": "del"
        },
        {
          "t": ".btn.p:hover{}",
          "k": "del"
        },
        {
          "t": ".btn.p:active{}",
          "k": "del"
        },
        {
          "t": ".btn:focus-visible{}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": "body{accent-color:steelblue}",
          "k": "add"
        },
        {
          "t": ".btn.p:hover{background:color-mix(in oklch,steelblue 85%,black)}",
          "k": "add"
        },
        {
          "t": ".btn.p:active{transform:translateY(1px)}",
          "k": "add"
        },
        {
          "t": ".btn:focus-visible{outline:2px solid steelblue;outline-offset:2px}",
          "k": "add"
        }
      ],
      "why": "Click into the preview and press Tab. Four rules and the control finally feels like a control.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 3,
      "title": "Respect the user — reduced motion and colour-scheme",
      "teach": "Two rules that cost nothing and mark you as someone who ships real products. <code>prefers-reduced-motion</code> honours people who get sick from animation. <code>color-scheme</code> makes native controls and scrollbars match your theme.",
      "html": "<div class=\"card\"><h3>Settings</h3><p>Native controls follow color-scheme.</p><input class=\"in\" placeholder=\"Type here\"><div class=\"row\"><button class=\"btn p\">Save</button></div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}\n.card{background:white;border:1px solid gainsboro;max-width:420px}\n.card h3{margin:0}\n.card p{margin:0}\n.row{display:flex}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}\n.btn.p{background:steelblue;border-color:steelblue;color:white}\n.card{padding:24px;max-width:420px}\n.card h3{margin-bottom:8px}\n.card p{margin-bottom:16px}\n.in{width:100%;padding:8px 12px;border:1px solid gainsboro;border-radius:6px;font:inherit;margin-bottom:16px}\n",
      "css": ":root{color-scheme:light dark}\n@media (prefers-reduced-motion:reduce){\n  *{animation-duration:.01ms !important;\n    transition-duration:.01ms !important}\n}",
      "before": "/* nothing yet */",
      "after": ":root{color-scheme:light dark}\n@media (prefers-reduced-motion:reduce){\n  *{animation-duration:.01ms !important;\n    transition-duration:.01ms !important}\n}",
      "bdiff": [
        {
          "t": "/* nothing yet */",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ":root{color-scheme:light dark}",
          "k": "add"
        },
        {
          "t": "@media (prefers-reduced-motion:reduce){",
          "k": "add"
        },
        {
          "t": "  *{animation-duration:.01ms !important;",
          "k": "add"
        },
        {
          "t": "    transition-duration:.01ms !important}",
          "k": "add"
        },
        {
          "t": "}",
          "k": "add"
        }
      ],
      "why": "Two rules, zero visual cost in the default case, and a real difference for people who need them.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 35,
      "title": "Why rem exists — it is an accessibility feature, not a style choice",
      "teach": "<code>rem</code> = <b>r</b>oot <b>em</b> = relative to the <code>&lt;html&gt;</code> font-size, which defaults to 16px. When a user raises their browser's default font size — and a lot of people do — <b>everything in rem scales and everything in px ignores them</b>. That is the whole argument. It is not aesthetics.",
      "html": "<div class=\"sim\"><p class=\"lab\">Simulating a user who set their browser font to 20px:</p><div class=\"card\"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter.</p><button class=\"btn\">View report</button></div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}\n.card{background:white;border:1px solid gainsboro;max-width:26rem}\n.card h3{margin:0 0 .5rem}\n.card p{margin:0 0 1rem;color:dimgray}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}\n.sim{font-size:20px}\n.lab{font-size:.75rem;color:dimgray;margin:0 0 .75rem}\n",
      "css": ".card{padding:1.5rem}\n.card h3{font-size:1.25rem}\n.card p{font-size:.9375rem}\n.btn{padding:.5rem 1rem;font-size:.875rem}",
      "before": ".card{padding:24px}\n.card h3{font-size:20px}\n.card p{font-size:15px}\n.btn{padding:8px 16px;font-size:14px}",
      "after": ".card{padding:1.5rem}\n.card h3{font-size:1.25rem}\n.card p{font-size:.9375rem}\n.btn{padding:.5rem 1rem;font-size:.875rem}",
      "bdiff": [
        {
          "t": ".card{padding:24px}",
          "k": "del"
        },
        {
          "t": ".card h3{font-size:20px}",
          "k": "del"
        },
        {
          "t": ".card p{font-size:15px}",
          "k": "del"
        },
        {
          "t": ".btn{padding:8px 16px;font-size:14px}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".card{padding:1.5rem}",
          "k": "add"
        },
        {
          "t": ".card h3{font-size:1.25rem}",
          "k": "add"
        },
        {
          "t": ".card p{font-size:.9375rem}",
          "k": "add"
        },
        {
          "t": ".btn{padding:.5rem 1rem;font-size:.875rem}",
          "k": "add"
        }
      ],
      "why": "The container is simulating a 20px root. Flip the toggle: the px version stays stubbornly small; the rem version respects the user.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 35,
      "title": "The rem scale you memorise once",
      "teach": "At the default 16px root the maths is clean, and it lands exactly on the 8/16/24/32 spacing scale you already know. Learn these seven and you never convert again:<br><br><code>.25rem=4 · .5rem=8 · .75rem=12 · <b>1rem=16</b> · 1.5rem=24 · 2rem=32 · 3rem=48</code>",
      "html": "<div class=\"stack\"><div class=\"row s1\">.5rem</div><div class=\"row s2\">1rem</div><div class=\"row s3\">1.5rem</div><div class=\"row s4\">2rem</div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}\n.card{background:white;border:1px solid gainsboro;max-width:26rem}\n.card h3{margin:0 0 .5rem}\n.card p{margin:0 0 1rem;color:dimgray}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}\n.stack{display:flex;flex-direction:column;gap:.5rem}\n.row{background:steelblue;color:white;border-radius:.375rem;font:600 .875rem system-ui}\n",
      "css": ".s1{padding:.5rem}\n.s2{padding:1rem}\n.s3{padding:1.5rem}\n.s4{padding:2rem}",
      "before": ".s1{padding:8px}\n.s2{padding:16px}\n.s3{padding:24px}\n.s4{padding:32px}",
      "after": ".s1{padding:.5rem}\n.s2{padding:1rem}\n.s3{padding:1.5rem}\n.s4{padding:2rem}",
      "bdiff": [
        {
          "t": ".s1{padding:8px}",
          "k": "del"
        },
        {
          "t": ".s2{padding:16px}",
          "k": "del"
        },
        {
          "t": ".s3{padding:24px}",
          "k": "del"
        },
        {
          "t": ".s4{padding:32px}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".s1{padding:.5rem}",
          "k": "add"
        },
        {
          "t": ".s2{padding:1rem}",
          "k": "add"
        },
        {
          "t": ".s3{padding:1.5rem}",
          "k": "add"
        },
        {
          "t": ".s4{padding:2rem}",
          "k": "add"
        }
      ],
      "why": "Identical rendering at the default root — but only one version survives a user who changes their font size. Same pixels today, different behaviour tomorrow.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 35,
      "title": "em — relative to THIS element, and it compounds",
      "teach": "<code>em</code> is relative to the <i>current element's</i> font-size, so it <b>multiplies when nested</b> — that is the footgun. But it is also exactly what you want for padding inside a control: <code>padding:.5em 1em</code> makes a button's padding scale with its own text, so one rule works for small and large buttons.",
      "html": "<div class=\"cluster\"><button class=\"btn sm\">Small</button><button class=\"btn\">Normal</button><button class=\"btn lg\">Large</button></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}\n.card{background:white;border:1px solid gainsboro;max-width:26rem}\n.card h3{margin:0 0 .5rem}\n.card p{margin:0 0 1rem;color:dimgray}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}\n.cluster{display:flex;gap:.75rem;align-items:center}\n.sm{font-size:.75rem}\n.lg{font-size:1.25rem}\n",
      "css": ".btn{padding:.5em 1em}",
      "before": ".btn{padding:8px 16px}",
      "after": ".btn{padding:.5em 1em}",
      "bdiff": [
        {
          "t": ".btn{padding:8px 16px}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".btn{padding:.5em 1em}",
          "k": "add"
        }
      ],
      "why": "One rule, three sizes. With px all three get identical padding and the large button looks cramped; with em the padding follows the text.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 35,
      "title": "Where px still wins — do not cargo-cult",
      "teach": "\"Never use px\" is folklore. Some things should <b>not</b> scale with text: hairline borders, shadow offsets and blurs, and 1px dividers. A 1px border in rem becomes 2px at large font settings and the UI looks heavier for no reason. <b>Rule: type and space in rem, hairlines and shadows in px.</b>",
      "html": "<div class=\"card\"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter.</p><button class=\"btn\">View report</button></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}\n.card{background:white;border:1px solid gainsboro;max-width:26rem}\n.card h3{margin:0 0 .5rem}\n.card p{margin:0 0 1rem;color:dimgray}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}\n.card{padding:1.5rem}\n.card h3{font-size:1.25rem}\n.btn{padding:.5em 1em}\n",
      "css": ".card{border:1px solid gainsboro;\n      box-shadow:0 1px 2px rgb(0 0 0 / .05)}",
      "before": ".card{border:.0625rem solid gainsboro;\n      box-shadow:0 .0625rem .125rem rgb(0 0 0 / .05)}",
      "after": ".card{border:1px solid gainsboro;\n      box-shadow:0 1px 2px rgb(0 0 0 / .05)}",
      "bdiff": [
        {
          "t": ".card{border:.0625rem solid gainsboro;",
          "k": "del"
        },
        {
          "t": "      box-shadow:0 .0625rem .125rem rgb(0 0 0 / .05)}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".card{border:1px solid gainsboro;",
          "k": "add"
        },
        {
          "t": "      box-shadow:0 1px 2px rgb(0 0 0 / .05)}",
          "k": "add"
        }
      ],
      "why": "Both look identical here. The px version stays a true hairline at any zoom level; the rem version thickens. Keep hairlines in px on purpose, and be able to say why.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 35,
      "title": "Viewport units — and the two traps",
      "teach": "<code>vh</code>/<code>vw</code> are 1% of the viewport. Two traps: <b>(1)</b> <code>100vh</code> is wrong on mobile — it ignores the browser chrome, so content hides behind it. Use <code>100dvh</code> (dynamic). <b>(2)</b> <code>width:100vw</code> includes the scrollbar and causes horizontal overflow. Use <code>100%</code>, or <code>inset:0</code> for overlays.",
      "html": "<div class=\"hero\"><div class=\"card\"><h3>Centred hero</h3><p>Resize the preview height.</p></div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}\n.card{background:white;border:1px solid gainsboro;max-width:26rem}\n.card h3{margin:0 0 .5rem}\n.card p{margin:0 0 1rem;color:dimgray}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}\n.hero{display:grid;place-items:center;background:aliceblue;border-radius:.5rem}\n",
      "css": ".hero{min-height:60dvh;\n      width:100%}",
      "before": ".hero{min-height:60vh;\n      width:100vw}",
      "after": ".hero{min-height:60dvh;\n      width:100%}",
      "bdiff": [
        {
          "t": ".hero{min-height:60vh;",
          "k": "del"
        },
        {
          "t": "      width:100vw}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".hero{min-height:60dvh;",
          "k": "add"
        },
        {
          "t": "      width:100%}",
          "k": "add"
        }
      ],
      "why": "Same result on desktop. On a phone the first version puts content under the URL bar and produces a sideways scroll. Two characters of difference.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 35,
      "title": "clamp() — fluid type, no media query, zoom still works",
      "teach": "<code>clamp(min, preferred, max)</code>. Put a <b>rem floor</b> and a <b>rem ceiling</b> around a <code>vw</code> middle and you get type that scales with the viewport but never gets unreadably small or absurdly large.<br><br><b>Never size text in raw <code>vw</code>.</b> It makes browser zoom do nothing — a genuine accessibility failure.",
      "html": "<div class=\"mark\"><span>1.25rem floor</span></div><div class=\"card\"><h3 class=\"fluid\">Fluid heading</h3><p>Drag the preview edge from narrow to wide.</p></div><div class=\"mark big\"><span>2rem ceiling</span></div><p class=\"hint2\">Drag the preview edge. The text scales between the two marks and never past them.</p>",
      "base": "body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}\n.card{background:white;border:1px solid gainsboro;max-width:26rem}\n.card h3{margin:0 0 .5rem}\n.card p{margin:0 0 1rem;color:dimgray}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}\n.card{padding:1.5rem}\n\n.mark{height:1.25rem;border-left:2px solid crimson;padding-left:.4rem;margin:.35rem 0;position:relative}\n.mark.big{height:2rem}\n.mark span{font:600 .65rem system-ui;color:crimson;position:absolute;top:0;left:.5rem}\n.hint2{font:.7rem/1.4 system-ui;color:dimgray;margin:.6rem 0 0}\n",
      "css": ".fluid{font-size:clamp(1.25rem, 1rem + 2vw, 2rem)}",
      "before": ".fluid{font-size:4vw}",
      "after": ".fluid{font-size:clamp(1.25rem, 1rem + 2vw, 2rem)}",
      "bdiff": [
        {
          "t": ".fluid{font-size:4vw}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".fluid{font-size:clamp(1.25rem, 1rem + 2vw, 2rem)}",
          "k": "add"
        }
      ],
      "why": "Drag the preview. Raw vw keeps shrinking past readable and kills zoom; clamp holds a floor and a ceiling. The `1rem +` part keeps it zoom-responsive.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 35,
      "title": "Breakpoints and measure — em and ch",
      "teach": "Two more relative units earn their place. <b>Media queries in <code>em</code></b> (not px) so breakpoints respect the user's font size — <code>@media (min-width:40em)</code> = 640px at default. And <b><code>ch</code></b> for line length: <code>max-width:65ch</code> is literally \"65 characters wide\", which is the readability target.<br><br>The <b>top card has no measure</b> — full width, however wide the pane is. Yours is below it.",
      "html": "<div class=\"pair\"><div class=\"card wide\"><p class=\"lab\">no measure</p><p>The ideal line length is 60 to 75 characters. Setting a max-width in ch expresses that directly, instead of guessing at a pixel value that only happens to be right for one font size and one screen.</p></div><div class=\"card\"><p class=\"lab\">your CSS</p><p>The ideal line length is 60 to 75 characters. Setting a max-width in ch expresses that directly, instead of guessing at a pixel value that only happens to be right for one font size and one screen.</p></div></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}\n.card{background:white;border:1px solid gainsboro;max-width:26rem}\n.card h3{margin:0 0 .5rem}\n.card p{margin:0 0 1rem;color:dimgray}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}\n.card{padding:1.5rem}\n\n.pair{display:grid;gap:1rem}\n.card{padding:1.25rem;background:white;border:1px solid gainsboro;border-radius:.5rem}\n.card p{margin:0}.pair .card.wide{max-width:none!important}\n.lab{font:700 .62rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin-bottom:.5rem!important}\n",
      "css": ".card{max-width:65ch}\n@media (min-width:40em){\n  .card{padding:2rem}\n}",
      "before": ".card{max-width:640px}\n@media (min-width:640px){\n  .card{padding:32px}\n}",
      "after": ".card{max-width:65ch}\n@media (min-width:40em){\n  .card{padding:2rem}\n}",
      "bdiff": [
        {
          "t": ".card{max-width:640px}",
          "k": "del"
        },
        {
          "t": "@media (min-width:640px){",
          "k": "del"
        },
        {
          "t": "  .card{padding:32px}",
          "k": "del"
        },
        {
          "t": "}",
          "k": "same"
        }
      ],
      "adiff": [
        {
          "t": ".card{max-width:65ch}",
          "k": "add"
        },
        {
          "t": "@media (min-width:40em){",
          "k": "add"
        },
        {
          "t": "  .card{padding:2rem}",
          "k": "add"
        },
        {
          "t": "}",
          "k": "same"
        }
      ],
      "why": "ch says what you mean. em breakpoints move with the user's font size — px breakpoints do not.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 35,
      "title": "The whole rule, on one line",
      "teach": "<b>Type and space in <code>rem</code>. Component-internal padding in <code>em</code>. Line length in <code>ch</code>. Full-height in <code>dvh</code>. Fluid type in <code>clamp()</code> with rem bounds. Hairlines and shadows stay <code>px</code>.</b><br><br>That is the entire unit system. Everything below is that sentence applied.",
      "html": "<div class=\"card\"><h3 class=\"fluid\">Unit system</h3><p>Everything here follows the one-line rule.</p><button class=\"btn\">Action</button></div>",
      "base": "body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}\n.card{background:white;border:1px solid gainsboro;max-width:26rem}\n.card h3{margin:0 0 .5rem}\n.card p{margin:0 0 1rem;color:dimgray}\n.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}\n",
      "css": ".card{max-width:65ch;padding:1.5rem;border:1px solid gainsboro;border-radius:.5rem}\n.fluid{font-size:clamp(1.125rem, 1rem + 1vw, 1.5rem)}\n.card p{max-width:65ch}\n.btn{padding:.5em 1em}",
      "before": ".card{max-width:400px;padding:24px;border:1px solid gainsboro;border-radius:8px}\n.fluid{font-size:22px}\n.card p{max-width:600px}\n.btn{padding:8px 16px}",
      "after": ".card{max-width:65ch;padding:1.5rem;border:1px solid gainsboro;border-radius:.5rem}\n.fluid{font-size:clamp(1.125rem, 1rem + 1vw, 1.5rem)}\n.card p{max-width:65ch}\n.btn{padding:.5em 1em}",
      "bdiff": [
        {
          "t": ".card{max-width:400px;padding:24px;border:1px solid gainsboro;border-radius:8px}",
          "k": "del"
        },
        {
          "t": ".fluid{font-size:22px}",
          "k": "del"
        },
        {
          "t": ".card p{max-width:600px}",
          "k": "del"
        },
        {
          "t": ".btn{padding:8px 16px}",
          "k": "del"
        }
      ],
      "adiff": [
        {
          "t": ".card{max-width:65ch;padding:1.5rem;border:1px solid gainsboro;border-radius:.5rem}",
          "k": "add"
        },
        {
          "t": ".fluid{font-size:clamp(1.125rem, 1rem + 1vw, 1.5rem)}",
          "k": "add"
        },
        {
          "t": ".card p{max-width:65ch}",
          "k": "add"
        },
        {
          "t": ".btn{padding:.5em 1em}",
          "k": "add"
        }
      ],
      "why": "One component, every rule applied. Note the border stayed px on purpose — that is the part most people get wrong in the other direction.",
      "polish": true,
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 4,
      "title": "Centred card — <code>cover</code> + <code>box</code>",
      "teach": "Two classes. <code>cover</code> centres on both axes; <code>box</code> is the card. The old version needed six declarations.",
      "html": "<div class=\"cover\"><div class=\"box stack\" style=\"max-width:22rem\"><h3 style=\"margin:0\">Sign in</h3><p class=\"muted\" style=\"margin:0\">Use your work email.</p><input class=\"input\" placeholder=\"you@company.com\"><button class=\"btn\" data-v=\"primary\">Continue</button></div></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.stack > * + *{margin-block-start:var(--space,var(--m))}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}\n.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}\n.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}\n.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}\n.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}\n.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}\n.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}\n.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}\n.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}\n.muted{color:var(--muted)}\n",
      "css": "/* Nothing. Both classes already exist. */\n",
      "task": "Delete <code>cover</code> from the outer div — it drops to the top-left. Put it back.",
      "key": "cover = centred. box = card. stack = rhythm inside. Zero new CSS.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 4,
      "title": "Action bar — <code>between</code> + <code>cluster</code>",
      "teach": "<code>between</code> pushes the two halves apart and wraps; <code>cluster</code> keeps the buttons together. That is the whole toolbar.",
      "html": "<div class=\"between box\"><strong>Team members</strong><div class=\"cluster\"><input class=\"input\" style=\"width:auto\" placeholder=\"Search…\"><button class=\"btn\">Filter</button><button class=\"btn\" data-v=\"primary\">Invite</button></div></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.stack > * + *{margin-block-start:var(--space,var(--m))}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}\n.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}\n.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}\n.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}\n.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}\n.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}\n.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}\n.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}\n.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}\n.muted{color:var(--muted)}\n",
      "css": "/* Nothing. */\n",
      "task": "Drag the preview narrow — it wraps on its own. Then swap <code>between</code> for <code>cluster</code> and see the difference.",
      "key": "between = pushed apart. cluster = held together. Both wrap by default.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 4,
      "title": "App shell — <code>sidebar</code>, and no media query",
      "teach": "The old version needed grid-template-areas plus a breakpoint. <code>sidebar</code> collapses on its own, based on its <b>own</b> width rather than the viewport's.",
      "html": "<div class=\"sidebar\"><div class=\"box stack\"><strong>Filters</strong><p class=\"muted\" style=\"margin:0\">Status</p><p class=\"muted\" style=\"margin:0\">Owner</p></div><div class=\"box stack\"><strong>Results</strong><p class=\"muted\" style=\"margin:0\">Drag the preview edge — it stacks itself.</p></div></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.stack > * + *{margin-block-start:var(--space,var(--m))}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}\n.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}\n.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}\n.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}\n.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}\n.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}\n.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}\n.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}\n.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}\n.muted{color:var(--muted)}\n",
      "css": "/* Nothing. Try --side:8rem on the wrapper. */\n",
      "task": "Add <code>style=\"--side:8rem\"</code> to the <code>.sidebar</code> div — the fixed side narrows without touching CSS.",
      "key": "sidebar = self-collapsing two-column. --side tunes it per instance.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 4,
      "title": "Card grid — <code>grid-auto</code>",
      "teach": "One class. <code>--col</code> tunes the minimum column width per instance, so you never write a second grid rule.",
      "html": "<div class=\"grid-auto\"><div class=\"box stack\"><p class=\"muted\" style=\"margin:0;font-size:.8125rem\">Metric 1</p><strong style=\"font-size:1.25rem\">1,240</strong></div><div class=\"box stack\"><p class=\"muted\" style=\"margin:0;font-size:.8125rem\">Metric 2</p><strong style=\"font-size:1.25rem\">1,240</strong></div><div class=\"box stack\"><p class=\"muted\" style=\"margin:0;font-size:.8125rem\">Metric 3</p><strong style=\"font-size:1.25rem\">1,240</strong></div><div class=\"box stack\"><p class=\"muted\" style=\"margin:0;font-size:.8125rem\">Metric 4</p><strong style=\"font-size:1.25rem\">1,240</strong></div></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.stack > * + *{margin-block-start:var(--space,var(--m))}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}\n.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}\n.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}\n.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}\n.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}\n.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}\n.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}\n.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}\n.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}\n.muted{color:var(--muted)}\n",
      "css": "/* Nothing. */\n",
      "task": "Add <code>style=\"--col:8rem\"</code> to the grid — more, narrower columns. Then <code>--col:20rem</code>.",
      "key": "grid-auto = responsive cards, one class, tuned by --col.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 4,
      "title": "Equal columns — <code>switcher</code>",
      "teach": "Pricing tables, feature triplets, stat rows. All children stay equal until the container is too narrow, then each takes a full line.",
      "html": "<div class=\"switcher\"><div class=\"box stack\"><strong>Starter</strong><p class=\"muted\" style=\"margin:0\">From $9/mo</p><button class=\"btn\" data-v=\"primary\">Choose</button></div><div class=\"box stack\"><strong>Team</strong><p class=\"muted\" style=\"margin:0\">From $29/mo</p><button class=\"btn\" data-v=\"primary\">Choose</button></div><div class=\"box stack\"><strong>Scale</strong><p class=\"muted\" style=\"margin:0\">From $99/mo</p><button class=\"btn\" data-v=\"primary\">Choose</button></div></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.stack > * + *{margin-block-start:var(--space,var(--m))}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}\n.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}\n.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}\n.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}\n.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}\n.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}\n.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}\n.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}\n.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}\n.muted{color:var(--muted)}\n",
      "css": "/* Nothing. */\n",
      "task": "Add <code>style=\"--threshold:16rem\"</code> to the switcher and drag — it now switches at a different width.",
      "key": "switcher = equal-or-stacked, container-relative, one line of maths, no breakpoint.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 4,
      "title": "The whole screen — every primitive at once",
      "teach": "Read the class attributes top to bottom. That is where the layout lives now; the CSS pane below is empty on purpose.",
      "html": "<div class=\"stack\"><div class=\"between box\"><strong>Dashboard</strong><div class=\"cluster\"><input class=\"input\" style=\"width:auto\" placeholder=\"Search…\"><button class=\"btn\" data-v=\"primary\">New</button></div></div><div class=\"sidebar\"><div class=\"box stack\"><strong>Filters</strong><p class=\"muted\" style=\"margin:0\">Status</p><p class=\"muted\" style=\"margin:0\">Owner</p></div><div class=\"grid-auto\"><div class=\"box stack\"><p class=\"muted\" style=\"margin:0;font-size:.8125rem\">Metric 1</p><strong style=\"font-size:1.25rem\">1,240</strong></div><div class=\"box stack\"><p class=\"muted\" style=\"margin:0;font-size:.8125rem\">Metric 2</p><strong style=\"font-size:1.25rem\">1,240</strong></div><div class=\"box stack\"><p class=\"muted\" style=\"margin:0;font-size:.8125rem\">Metric 3</p><strong style=\"font-size:1.25rem\">1,240</strong></div><div class=\"box stack\"><p class=\"muted\" style=\"margin:0;font-size:.8125rem\">Metric 4</p><strong style=\"font-size:1.25rem\">1,240</strong></div></div></div></div>",
      "base": ":root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}\nbody{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}\n.stack > * + *{margin-block-start:var(--space,var(--m))}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}\n.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}\n.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}\n.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}\n.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}\n.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}\n.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}\n.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}\n.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}\n.muted{color:var(--muted)}\n",
      "css": "/* Empty. This entire screen needs no component CSS. */\n",
      "task": "Add <code>:root{--m:1.5rem}</code> and watch the whole page re-space from one edit.",
      "key": "Five words carried an entire dashboard: stack · cluster · between · sidebar · grid-auto.",
      "polish": false,
      "why": "",
      "isjsx": false,
      "jsx": ""
    },
    {
      "stage": 25,
      "title": "JSX is not HTML — it is JavaScript that returns elements",
      "teach": "Everything inside <code>return ( … )</code> is compiled to function calls. That is why it obeys JS rules, not HTML rules: <b>one root element</b>, every tag closed, and <code>{ }</code> drops you back into JavaScript.",
      "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <div className=\"box\">\n      <h3>Hello</h3>\n      <p className=\"muted\">JSX compiles to function calls.</p>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Delete the wrapping <code>&lt;div&gt;</code> so there are two roots. Read the error — 'must have one parent element'. Then put it back.",
      "key": "One root. Every tag closed. { } is an escape hatch back into JavaScript.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 25,
      "title": "className, not class — and why",
      "teach": "<code>class</code> is a reserved word in JavaScript, so JSX uses <code>className</code>. Same for <code>for</code> → <code>htmlFor</code>. Everything else (<code>id</code>, <code>data-*</code>, <code>aria-*</code>) keeps its HTML name exactly.",
      "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <div className=\"box stack\">\n      <label htmlFor=\"email\">Email</label>\n      <input id=\"email\" className=\"input\" type=\"email\" aria-describedby=\"hint\" />\n      <p id=\"hint\" className=\"muted\">data-* and aria-* stay unchanged.</p>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Change <code>className</code> to <code>class</code> and watch the styling break. Note the self-closing <code>&lt;input /&gt;</code> — JSX requires the slash.",
      "key": "className and htmlFor are the only two renames. Void elements MUST self-close: <input />, <img />, <br />.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 25,
      "title": "Composing classes — this is where your layout lives",
      "teach": "You already own these. In JSX they go in <code>className</code>, space-separated, and they compose: <code>\"box stack\"</code> means a bordered card whose children are vertically spaced.",
      "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <div className=\"stack\">\n      <div className=\"between box\">\n        <strong>Team</strong>\n        <button className=\"btn\" data-v=\"primary\">Invite</button>\n      </div>\n\n      <div className=\"sidebar\">\n        <div className=\"box\">Filters</div>\n        <div className=\"grid-auto\">\n          <div className=\"box\">One</div>\n          <div className=\"box\">Two</div>\n          <div className=\"box\">Three</div>\n        </div>\n      </div>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Read each className aloud: <code>stack</code> = vertical rhythm · <code>between</code> = pushed apart · <code>box</code> = card · <code>sidebar</code> = self-collapsing two-column · <code>grid-auto</code> = responsive cards. Now drag the preview narrow.",
      "key": "stack · cluster · between · sidebar · switcher · center · grid-auto · box. Layout lives in className, not in new CSS.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 25,
      "title": "style={{ }} — the double brace, explained",
      "teach": "The outer <code>{ }</code> means 'JavaScript here'. The inner <code>{ }</code> is an object literal. So it is not special syntax — it is an object inside an expression slot. Properties are <b>camelCase</b> and numbers are treated as px.",
      "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <div className=\"box\" style={{ maxWidth: '30rem' }}>\n      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Inline styles</h3>\n      <p className=\"muted\" style={{ marginBottom: 0 }}>\n        backgroundColor, not background-color.\n      </p>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Add <code>borderLeft: '.25rem solid steelblue'</code> to the outer div. Then try <code>background-color</code> and see it silently do nothing.",
      "key": "Outer brace = expression. Inner brace = object. camelCase keys. Use it for one-off values only — real styling belongs in CSS.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 25,
      "title": ".map() — rendering a list",
      "teach": "A list is an array transformed into elements. <code>{ }</code> to enter JS, <code>.map()</code> to transform, and each item needs a <b>stable</b> <code>key</code> — the identity React uses to match elements across renders. Never the array index for a list that can reorder or delete.",
      "jsx": "import React from 'react';\n\nexport default function App() {\n  const people = [\n    { id: 'a1', name: 'Asha', role: 'Design' },\n    { id: 'b2', name: 'Ravi', role: 'Engineering' },\n    { id: 'c3', name: 'Meera', role: 'Product' },\n  ];\n\n  return (\n    <ul className=\"stack\" style={{ listStyle: 'none', padding: 0, margin: 0 }}>\n      {people.map(p => (\n        <li className=\"between box\" key={p.id}>\n          <div>\n            <strong>{p.name}</strong>\n            <p className=\"muted\" style={{ margin: 0, fontSize: '.875rem' }}>{p.role}</p>\n          </div>\n          <button className=\"btn\">Message</button>\n        </li>\n      ))}\n    </ul>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Add a fourth person. Then change <code>key={p.id}</code> to <code>key={i}</code> (add <code>, i</code> to the map params) — it still renders, which is exactly why the bug is so easy to ship.",
      "key": "map returns an array of elements. key must be stable and unique — an id, never the index for a mutable list.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 25,
      "title": "Conditional rendering — && and the ternary",
      "teach": "<code>{cond && <X/>}</code> renders X only when cond is truthy. <code>{cond ? <A/> : <B/>}</code> picks one. <b>The trap:</b> if cond is a <b>number</b> and it is 0, React prints the 0. Always coerce to a real boolean.",
      "jsx": "import React from 'react';\n\nexport default function App() {\n  const items = [];\n  const loading = false;\n\n  return (\n    <div className=\"stack\">\n      {loading && <div className=\"box\">Loading…</div>}\n\n      {items.length > 0\n        ? <div className=\"box\">{items.length} results</div>\n        : <div className=\"box muted\">No results yet.</div>}\n\n      <div className=\"box\">items.length && … would print: {items.length && 'never seen'}</div>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Look at the last box — it prints <b>0</b>, not an empty space. That is the falsy-zero bleed. Fix it with <code>items.length > 0 &&</code>.",
      "key": "&& with a NUMBER prints 0. Always `.length > 0 &&`. This is a top-5 MCQ trap and a real production bug.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 25,
      "title": "Fragments — grouping without a wrapper div",
      "teach": "When you need one root but do not want an extra element in the DOM (it would break a grid or flex parent), use a fragment: <code>&lt;&gt; … &lt;/&gt;</code>.",
      "jsx": "import React from 'react';\n\nexport default function App() {\n  const Row = () => (\n    <>\n      <div className=\"box\">A</div>\n      <div className=\"box\">B</div>\n    </>\n  );\n\n  return (\n    <div className=\"cluster\">\n      <Row />\n      <div className=\"box\">C</div>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Replace <code>&lt;&gt;…&lt;/&gt;</code> with a <code>&lt;div&gt;</code> and watch the cluster break — the wrapper becomes one flex item instead of two.",
      "key": "Fragments group without adding a DOM node. Essential inside flex and grid parents.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 25,
      "title": "Putting it together — a real screen, no new CSS",
      "teach": "Everything here is composed from classes you already have. Read it as: shell → bar → sidebar → grid → list. That is the whole job.",
      "jsx": "import React from 'react';\n\nexport default function App() {\n  const metrics = ['Revenue', 'Active users', 'Churn', 'NPS'];\n  const rows = [\n    { id: 1, name: 'Acme Corp', status: 'Active' },\n    { id: 2, name: 'Globex', status: 'Trial' },\n  ];\n\n  return (\n    <div className=\"stack\">\n      <div className=\"between box\">\n        <strong style={{ fontSize: '1.125rem' }}>Dashboard</strong>\n        <div className=\"cluster\">\n          <input className=\"input\" style={{ width: 'auto' }} placeholder=\"Search…\" />\n          <button className=\"btn\" data-v=\"primary\">New</button>\n        </div>\n      </div>\n\n      <div className=\"sidebar\">\n        <div className=\"box stack\">\n          <strong>Filters</strong>\n          {['Status', 'Owner', 'Region'].map(f => (\n            <p className=\"muted\" style={{ margin: 0 }} key={f}>{f}</p>\n          ))}\n        </div>\n\n        <div className=\"stack\">\n          <div className=\"grid-auto\">\n            {metrics.map(m => (\n              <div className=\"box stack\" key={m}>\n                <p className=\"muted\" style={{ margin: 0, fontSize: '.8125rem' }}>{m}</p>\n                <strong style={{ fontSize: '1.25rem' }}>1,240</strong>\n              </div>\n            ))}\n          </div>\n\n          <ul className=\"stack\" style={{ listStyle: 'none', padding: 0, margin: 0 }}>\n            {rows.map(r => (\n              <li className=\"between box\" key={r.id}>\n                <strong>{r.name}</strong>\n                <span className=\"muted\">{r.status}</span>\n              </li>\n            ))}\n          </ul>\n        </div>\n      </div>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Change nothing first — drag the preview from wide to narrow and watch the sidebar and grid respond independently. Then add a fifth metric.",
      "key": "Zero component CSS. Layout in className, data in .map(), structure in the return block. That is a machine-coding round.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 26,
      "title": "useState — the whole model in four lines",
      "teach": "<code>const [value, setValue] = useState(initial)</code>. Calling <code>setValue</code> does two things: it stores the new value <b>and</b> asks React to run your component again. The screen is a function of state — you never touch the DOM.",
      "jsx": "import React, { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className=\"box cluster\">\n      <button className=\"btn\" onClick={() => setCount(count - 1)}>−</button>\n      <strong style={{ minWidth: '3ch', textAlign: 'center' }}>{count}</strong>\n      <button className=\"btn\" data-v=\"primary\" onClick={() => setCount(count + 1)}>+</button>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Add a Reset button that calls <code>setCount(0)</code>. Then try changing <code>count</code> directly with <code>count = 5</code> — nothing happens, because that does not tell React to re-render.",
      "key": "State = memory + a re-render request. Never mutate state directly; always call the setter.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 26,
      "title": "The functional updater — and why two clicks can equal one",
      "teach": "<code>setCount(count + 1)</code> reads <code>count</code> from <b>this</b> render's closure. Call it twice in one handler and both read the same stale value, so you get +1 not +2. <code>setCount(c => c + 1)</code> receives the latest value instead.",
      "jsx": "import React, { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  const brokenTwice = () => { setCount(count + 1); setCount(count + 1); };\n  const worksTwice  = () => { setCount(c => c + 1); setCount(c => c + 1); };\n\n  return (\n    <div className=\"box stack\">\n      <strong style={{ fontSize: '1.5rem' }}>{count}</strong>\n      <div className=\"cluster\">\n        <button className=\"btn\" onClick={brokenTwice}>+2 (broken)</button>\n        <button className=\"btn\" data-v=\"primary\" onClick={worksTwice}>+2 (correct)</button>\n      </div>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Click each button and watch the difference. This exact snippet is a top-5 MCQ trap and a real production bug.",
      "key": "Two setState calls that read the current value both see the SAME value. Use the updater form whenever the next value depends on the previous one.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 26,
      "title": "Controlled inputs — the value comes from state",
      "teach": "A controlled input has <code>value={state}</code> and <code>onChange</code> writing back. React owns the value; the DOM just displays it. That is why you can transform, validate or block input on the way through.",
      "jsx": "import React, { useState } from 'react';\n\nexport default function App() {\n  const [name, setName] = useState('');\n\n  return (\n    <div className=\"box stack\" style={{ maxWidth: '24rem' }}>\n      <label htmlFor=\"n\">Your name</label>\n      <input id=\"n\" className=\"input\" value={name}\n             onChange={e => setName(e.target.value)} />\n      <p className=\"muted\" style={{ margin: 0 }}>\n        {name.length} characters\n      </p>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Make it uppercase on the way in: <code>setName(e.target.value.toUpperCase())</code>. Then remove <code>onChange</code> entirely — the input freezes, because state never changes.",
      "key": "value + onChange = controlled. Remove onChange and the field becomes read-only — a classic 'why can't I type' bug.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 26,
      "title": "Derived state — compute during render, never store it",
      "teach": "If a value can be calculated from existing state, <b>calculate it</b>. Storing it in a second <code>useState</code> means two sources of truth that drift apart. This is the single most common architecture mistake in React.",
      "jsx": "import React, { useState } from 'react';\n\nexport default function App() {\n  const [items] = useState([\n    { id: 1, label: 'Design review', done: true },\n    { id: 2, label: 'Ship the build', done: false },\n    { id: 3, label: 'Write tests', done: false },\n  ]);\n  const [query, setQuery] = useState('');\n\n  // derived — no extra state\n  const shown = items.filter(i => i.label.toLowerCase().includes(query.toLowerCase()));\n  const remaining = items.filter(i => !i.done).length;\n\n  return (\n    <div className=\"stack\" style={{ maxWidth: '26rem' }}>\n      <input className=\"input\" placeholder=\"Filter…\" value={query}\n             onChange={e => setQuery(e.target.value)} />\n      <p className=\"muted\" style={{ margin: 0 }}>{remaining} remaining</p>\n      <ul className=\"stack\" style={{ listStyle: 'none', padding: 0, margin: 0 }}>\n        {shown.map(i => <li className=\"box\" key={i.id}>{i.label}</li>)}\n      </ul>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Note there is no <code>useState</code> for <code>shown</code> or <code>remaining</code>. Try adding one and keeping it in sync — you will feel why it is a trap.",
      "key": "Derive, do not store. Two useStates that must agree will eventually disagree.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 26,
      "title": "Updating arrays immutably — add, remove, toggle",
      "teach": "React compares by reference. Mutating an array with <code>push</code> keeps the same reference, so React sees no change and skips the re-render. Always produce a <b>new</b> array.",
      "jsx": "import React, { useState } from 'react';\n\nexport default function App() {\n  const [todos, setTodos] = useState([{ id: 1, text: 'First task', done: false }]);\n  const [text, setText] = useState('');\n\n  const add = () => {\n    if (!text.trim()) return;\n    setTodos([...todos, { id: Date.now(), text: text.trim(), done: false }]);\n    setText('');\n  };\n  const remove = id => setTodos(todos.filter(t => t.id !== id));\n  const toggle = id => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));\n\n  return (\n    <div className=\"stack\" style={{ maxWidth: '26rem' }}>\n      <div className=\"cluster\">\n        <input className=\"input\" value={text} placeholder=\"New task\"\n               onChange={e => setText(e.target.value)}\n               onKeyDown={e => e.key === 'Enter' && add()} />\n        <button className=\"btn\" data-v=\"primary\" onClick={add}>Add</button>\n      </div>\n      <ul className=\"stack\" style={{ listStyle: 'none', padding: 0, margin: 0 }}>\n        {todos.map(t => (\n          <li className=\"between box\" key={t.id}>\n            <label className=\"cluster\" style={{ gap: '.5rem' }}>\n              <input type=\"checkbox\" checked={t.done} onChange={() => toggle(t.id)} />\n              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>\n            </label>\n            <button className=\"btn\" onClick={() => remove(t.id)}>Delete</button>\n          </li>\n        ))}\n      </ul>\n      {todos.length === 0 && <p className=\"muted\">Nothing left. Add a task.</p>}\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Replace <code>setTodos([...todos, …])</code> with <code>todos.push(…); setTodos(todos)</code> — the item is added to the array but the screen never updates. That is the reference bug, live.",
      "key": "add = [...xs, n] · remove = xs.filter() · toggle = xs.map(). Three lines cover every list CRUD you will be asked for.",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 26,
      "title": "useEffect — for things outside React, with cleanup",
      "teach": "Effects are for the outside world: timers, subscriptions, network. The <b>return</b> is the cleanup and it runs before the next effect and on unmount. A timer without cleanup is a memory leak and a doubled interval.",
      "jsx": "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [secs, setSecs] = useState(0);\n  const [running, setRunning] = useState(false);\n\n  useEffect(() => {\n    if (!running) return;\n    const id = setInterval(() => setSecs(s => s + 1), 1000);\n    return () => clearInterval(id);      // ← the cleanup\n  }, [running]);\n\n  return (\n    <div className=\"box stack\" style={{ maxWidth: '18rem' }}>\n      <strong style={{ fontSize: '2rem' }}>{secs}s</strong>\n      <div className=\"cluster\">\n        <button className=\"btn\" data-v=\"primary\" onClick={() => setRunning(r => !r)}>\n          {running ? 'Stop' : 'Start'}\n        </button>\n        <button className=\"btn\" onClick={() => { setRunning(false); setSecs(0); }}>Reset</button>\n      </div>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Delete the <code>return () => clearInterval(id)</code> line, then start and stop a few times — the counter accelerates because old intervals never died.",
      "key": "Every subscription needs a cleanup. Note setSecs(s => s+1) — without the updater this would freeze at 1 (stale closure).",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 26,
      "title": "Lifting state — two components, one source of truth",
      "teach": "When two parts of the UI need the same value, the state moves <b>up</b> to their closest common parent and comes back down as props. Callbacks go down too, so children can ask the parent to change it.",
      "jsx": "import React, { useState } from 'react';\n\nfunction Chip({ label, active, onPick }) {\n  return (\n    <button className=\"btn\" data-v={active ? 'primary' : undefined}\n            onClick={() => onPick(label)}>{label}</button>\n  );\n}\n\nexport default function App() {\n  const [filter, setFilter] = useState('All');\n  const tabs = ['All', 'Active', 'Done'];\n\n  return (\n    <div className=\"stack\" style={{ maxWidth: '26rem' }}>\n      <div className=\"cluster\">\n        {tabs.map(t => (\n          <Chip key={t} label={t} active={filter === t} onPick={setFilter} />\n        ))}\n      </div>\n      <div className=\"box\">Showing: <strong>{filter}</strong></div>\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "The Chip has no state at all — it receives <code>active</code> and calls <code>onPick</code>. Add a fourth tab and it just works.",
      "key": "State up, props down, callbacks up. Dumb children, one owner. This is the answer to 'how do you share state?'",
      "polish": false,
      "isjsx": true
    },
    {
      "stage": 26,
      "title": "A complete feature — everything at once",
      "teach": "Search + filter + add + toggle + delete + empty state + count. This is a Tier-S machine-coding task, fully functional, in one screen.",
      "jsx": "import React, { useState } from 'react';\n\nexport default function App() {\n  const [todos, setTodos] = useState([\n    { id: 1, text: 'Read the brief', done: true },\n    { id: 2, text: 'Build the layout', done: false },\n  ]);\n  const [text, setText] = useState('');\n  const [query, setQuery] = useState('');\n  const [tab, setTab] = useState('All');\n\n  const shown = todos\n    .filter(t => tab === 'All' || (tab === 'Done') === t.done)\n    .filter(t => t.text.toLowerCase().includes(query.toLowerCase()));\n\n  const add = () => {\n    const v = text.trim();\n    if (!v) return;\n    setTodos(ts => [...ts, { id: Date.now(), text: v, done: false }]);\n    setText('');\n  };\n\n  return (\n    <div className=\"stack\" style={{ maxWidth: '30rem' }}>\n      <div className=\"between box\">\n        <strong>Tasks</strong>\n        <span className=\"muted\">{todos.filter(t => !t.done).length} left</span>\n      </div>\n\n      <div className=\"cluster\">\n        <input className=\"input\" style={{ flex: 1 }} value={text} placeholder=\"New task\"\n               onChange={e => setText(e.target.value)}\n               onKeyDown={e => e.key === 'Enter' && add()} />\n        <button className=\"btn\" data-v=\"primary\" onClick={add}>Add</button>\n      </div>\n\n      <input className=\"input\" value={query} placeholder=\"Search…\"\n             onChange={e => setQuery(e.target.value)} />\n\n      <div className=\"cluster\">\n        {['All', 'Active', 'Done'].map(t => (\n          <button key={t} className=\"btn\" data-v={tab === t ? 'primary' : undefined}\n                  onClick={() => setTab(t)}>{t}</button>\n        ))}\n      </div>\n\n      <ul className=\"stack\" style={{ listStyle: 'none', padding: 0, margin: 0 }}>\n        {shown.map(t => (\n          <li className=\"between box\" key={t.id}>\n            <label className=\"cluster\" style={{ gap: '.5rem' }}>\n              <input type=\"checkbox\" checked={t.done}\n                     onChange={() => setTodos(ts => ts.map(x => x.id === t.id ? { ...x, done: !x.done } : x))} />\n              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>\n            </label>\n            <button className=\"btn\" onClick={() => setTodos(ts => ts.filter(x => x.id !== t.id))}>Delete</button>\n          </li>\n        ))}\n      </ul>\n\n      {shown.length === 0 && <p className=\"muted\">No tasks match.</p>}\n    </div>\n  );\n}\n",
      "css": "",
      "html": "",
      "base": "",
      "task": "Everything works. Now count the state: four <code>useState</code> calls, zero derived values stored. That ratio is what an interviewer is reading.",
      "key": "Minimal state, everything else derived. Four hooks carried a full CRUD feature with search, filters and an empty state.",
      "polish": false,
      "isjsx": true
    }
  ],
  "challenges": [
    [
      "Notification centre",
      "Panel with a heading and a 'Mark all read' button on one line, then a scrollable list. Each row: title + timestamp left, coloured badge + dismiss button right. Panel is fixed height; only the list scrolls.",
      [
        "action bar",
        "data list",
        "overflow"
      ]
    ],
    [
      "Pricing page",
      "Three plan cards side by side on desktop, stacked on mobile, NO media query. Each card: name, big price, feature list, CTA pinned to the bottom regardless of feature count.",
      [
        "responsive grid",
        "flex column + space-between"
      ]
    ],
    [
      "Settings screen",
      "Sidebar of section links left, form right. Under 640px the sidebar becomes a horizontal strip above the form. Stacked fields with labels, one showing an inline error.",
      [
        "app shell",
        "media query",
        "form"
      ]
    ],
    [
      "Empty search results",
      "Search bar at the top. Below it a centred empty state with an icon block, a message naming the query, and a 'Clear search' button.",
      [
        "action bar",
        "centred box",
        "state triad"
      ]
    ],
    [
      "Gallery + lightbox",
      "Responsive thumbnail grid. Clicking one opens a full-screen dim overlay with the image centred and a close button top-right. Layout only.",
      [
        "responsive grid",
        "overlay",
        "absolute"
      ]
    ]
  ],
  "appcss": "/* ═══ app.css — ~36 lines, typed once. Named colours only: nothing to look up. ═══ */\n\n/* 1 · TOKENS — every value is a CSS keyword you can spell from memory */\n:root{\n  --ink:    black;          /* body text            */\n  --muted:  dimgray;        /* secondary text       */\n  --line:   gainsboro;      /* hairline borders     */\n  --surface:white;          /* cards, inputs        */\n  --bg:     whitesmoke;     /* page background      */\n  --brand:  steelblue;      /* primary action       */\n  --ok:     seagreen;       /* success              */\n  --warn:   goldenrod;      /* warning              */\n  --danger: firebrick;      /* destructive / errors */\n\n  --s:.5rem; --m:1rem; --l:1.5rem; --xl:2rem; --round:8px;\n}\n/* Need a hover or a tint? DERIVE it, never add a token:\n   hover → color-mix(in oklch, var(--brand) 85%, black)\n   tint  → color-mix(in oklch, var(--brand) 10%, var(--surface)) */\n\n/* 2 · RESET */\n*,*::before,*::after{box-sizing:border-box}\nbody{margin:0;font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}\nimg,svg{max-width:100%;display:block}\n:where(button,a,input,select,textarea):focus-visible{outline:2px solid var(--brand);outline-offset:2px}\n.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n\n/* 3 · PRIMITIVES — five words: stack cluster sidebar switcher center */\n.stack > * + *{margin-block-start:var(--space,var(--m))}\n.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}\n.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}\n.center{margin-inline:auto;max-width:var(--measure,60rem);padding-inline:var(--m)}\n.cover{display:grid;place-items:center;min-block-size:var(--min,100dvh);padding:var(--m)}\n.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,16rem),1fr))}\n.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}                    /* self-collapsing, */\n.sidebar > :first-child{flex-basis:var(--side,15rem);flex-grow:1}     /* no media query   */\n.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}\n.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}\n.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,30rem) - 100%) * 999)}\n.imposter{position:absolute;inset:0;display:grid;place-items:center}\n\n/* 4 · BLOCKS */\n.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}\n.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer;transition:background-color 150ms ease}\n.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}\n.muted{color:var(--muted)}\n\n/* 5 · EXCEPTIONS — data attributes, not modifier-class explosion */\n.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}\n.btn[data-v=primary]:hover{background:color-mix(in oklch,var(--brand) 85%,black)}\n.btn[data-v=ghost]{background:none;border-color:transparent}\n[data-tone=danger]{color:var(--danger);border-color:var(--danger)}\n[data-tone=ok]{color:var(--ok);border-color:var(--ok)}\n"
};
