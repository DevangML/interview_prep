import type { Challenge, Category } from "../types";

export interface CSS100Data {
  cats: Category[];
  items: (Challenge | any)[];
}

/* CSS 100 — a graded gauntlet.
 *
 * Every item gives you the component and the linked stylesheet. You never write
 * JSX and you never write React state: these are pure layout and styling problems,
 * exactly the shape Mettl asks them in. What you write is the CSS named in `use`.
 *
 *   use   — the property you must reach for, and what it is doing here.
 *           Nothing is left to taste; if two properties would work, the one named
 *           is the one being tested.
 *   dia   — the target, drawn. Compare your preview against it.
 *   css   — the file you edit. The TODO marks the only thing missing.
 

   Two files, both yours. component.jsx starts as an empty fragment with the required
   structure spelled out — you write the markup. styles.css marks what is missing — you
   write the CSS. Only the React shell (the import and the default export) is given,
   because that is the part Mettl also gives you.
 */
export const CSS100: CSS100Data = {
 "cats": [
  {
   "k": "box",
   "n": "Box model",
   "blurb": "What a box measures, and what pushes what."
  },
  {
   "k": "flex",
   "n": "Flexbox",
   "blurb": "One axis, content-driven. basis vs width, the shorthand, auto margins."
  },
  {
   "k": "grid",
   "n": "Grid",
   "blurb": "Two axes, parent-driven. Lines, spans, implicit tracks, alignment."
  },
  {
   "k": "track",
   "n": "Track sizing",
   "blurb": "repeat · minmax · auto-fit vs auto-fill — responsive with no media query."
  },
  {
   "k": "cq",
   "n": "Container queries",
   "blurb": "A component that answers to its container, not the viewport."
  },
  {
   "k": "place",
   "n": "place-*",
   "blurb": "align + justify in one property, on the container and on the item."
  },
  {
   "k": "areas",
   "n": "grid-template-areas",
   "blurb": "Layout you can read out loud."
  },
  {
   "k": "pos",
   "n": "Positioning",
   "blurb": "static · relative · absolute · fixed · sticky, and the containing block."
  },
  {
   "k": "inset",
   "n": "inset",
   "blurb": "All four offsets at once, and what happens when opposite pairs both set."
  },
  {
   "k": "units",
   "n": "Units",
   "blurb": "rem · em · ch · %, dvh · fr · clamp — and where px is still correct."
  },
  {
   "k": "mq",
   "n": "Media queries",
   "blurb": "Ranges, orientation, and the ones about the human, not the screen."
  },
  {
   "k": "focus",
   "n": ":focus-visible",
   "blurb": "Keyboard users get a ring; mouse users do not; nobody loses one."
  },
  {
   "k": "tokens",
   "n": "Design tokens",
   "blurb": "Custom properties: naming, fallbacks, scoping, and the cascade."
  },
  {
   "k": "mix",
   "n": "color-mix()",
   "blurb": "Derive a palette from one hue instead of hand-picking nine."
  },
  {
   "k": "prim",
   "n": "Layout primitives",
   "blurb": "stack · cluster · between · sidebar · switcher · cover · grid-auto."
  },
  {
   "k": "exc",
   "n": "Exceptions",
   "blurb": "The cases where the usual rule is the wrong answer."
  },
  {
   "k": "anti",
   "n": "Anti-patterns",
   "blurb": "Recognise it, name why it breaks, replace it."
  },
  {
   "k": "extra",
   "n": "Extras (Extended Syllabus)",
   "blurb": "Selectors & Specificity · Typography & Line Clamp · Gradients · Transitions · React Tokens"
  }
 ],
 "items": [
  {
   "id": "BOX-01",
   "useApp": false,
   "cat": "box",
   "title": "border-box — why 200px stops meaning 200px",
   "goal": "Both cards must measure exactly 200px wide on screen, padding and border included.",
   "use": [
    [
     "box-sizing",
     "decide whether width means the content alone or the whole visible box"
    ]
   ],
   "task": ".card is explicitly content-box, so its 200px width excludes the 1rem padding and 2px border and it renders at 236px. Change the one value that makes 200px mean the whole visible box. Measure it in the preview before and after.",
   "dia": {
    "w": 320,
    "h": 120,
    "note": [
     [
      8,
      12,
      "both: width 200px, padding 16, border 2"
     ]
    ],
    "box": [
     [
      8,
      34,
      200,
      32,
      "200px  ← border-box"
     ],
     [
      8,
      80,
      236,
      32,
      "236px  ← content-box",
      "ghost"
     ]
    ],
    "gap": [
     [
      8,
      28,
      200,
      "200",
      1
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card   text: \"A\"\n       div.card   text: \"B\"\n      */}\n    </>\n  );\n}\n",
   "css": "/* stacked, not a flex row — a flex item would shrink and hide the difference */\n.card {\n  width: 200px;\n  padding: 1rem;\n  border: 2px solid steelblue;\n  margin-bottom: 1rem;\n  background: aliceblue;\n  box-sizing: content-box;   /* TODO — change this one value */\n}\n",
   "hints": [
    "content-box adds padding and border ON TOP of width: 200 + 32 + 4 = 236.",
    "box-sizing: border-box makes width include padding and border. It is written explicitly here only so you can see the failure — in a real stylesheet the universal reset *, *::before, *::after { box-sizing: border-box } does it once for everything."
   ],
   "sol": "box-sizing: border-box;",
   "why": "The single most common “why is my layout 4px too wide” bug. border-box is the sane default and the reason the universal reset exists.",
   "markup": "    <>\n      <div className=\"card\">A</div>\n      <div className=\"card\">B</div>\n    </>"
  },
  {
   "id": "BOX-02",
   "visual": false,
   "verify": "Nothing to type. Predict the gap out loud first, then measure it in the preview.",
   "cat": "box",
   "title": "Margins collapse — the larger one wins",
   "goal": "The gap between the two paragraphs must be 32px, not 56px.",
   "use": [
    [
     "margin-bottom",
     "set on the first block"
    ],
    [
     "margin-top",
     "set on the second block"
    ]
   ],
   "task": "A has margin-bottom 32px, B has margin-top 24px. Predict the gap, then set the two margins so the gap is exactly 32px while B keeps a 24px top margin of its own.",
   "dia": {
    "w": 320,
    "h": 120,
    "box": [
     [
      8,
      10,
      300,
      28,
      "A"
     ],
     [
      8,
      70,
      300,
      28,
      "B"
     ]
    ],
    "gap": [
     [
      160,
      38,
      32,
      "32px — not 56",
      0
     ]
    ],
    "note": [
     [
      8,
      112,
      "adjacent vertical margins collapse to the larger"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.wrap\n         p.a   text: \"A\"\n         p.b   text: \"B\"\n      */}\n    </>\n  );\n}\n",
   "css": ".wrap { background: whitesmoke; }\n.a { margin-bottom: 2rem; }\n.b { margin-top: 1.5rem; }\n\n/* TODO — nothing to add. Read it, predict the gap, then confirm in the preview. */\n",
   "hints": [
    "Adjacent vertical margins between siblings do not add. The larger one is used and the smaller disappears.",
    "32 and 24 collapse to 32. Horizontal margins never collapse — this is a block-direction-only rule."
   ],
   "sol": "gap is 32px (the larger margin wins)",
   "why": "Collapsing is why “I set both margins and the space is wrong”. The modern fix is to stop using sibling margins at all — see the stack primitive.",
   "markup": "    <div className=\"wrap\">\n      <p className=\"a\">A</p>\n      <p className=\"b\">B</p>\n    </div>"
  },
  {
   "id": "BOX-03",
   "cat": "box",
   "title": "Parent–child collapse, and three ways to stop it",
   "goal": "The grey parent must visibly contain the child’s top margin instead of being pushed down by it.",
   "use": [
    [
     "display: flow-root",
     "establish a block formatting context so the child margin stays inside"
    ]
   ],
   "task": "The child’s margin-top escapes and moves the parent instead. Add one declaration to .parent so the margin stays inside.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     10,
     300,
     60,
     ".parent — margin stays inside"
    ],
    "box": [
     [
      16,
      40,
      284,
      24,
      "child"
     ]
    ],
    "gap": [
     [
      160,
      18,
      22,
      "24px inside",
      0
     ]
    ],
    "note": [
     [
      8,
      96,
      "broken: the parent starts 24px lower and the gap is outside it"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.parent\n         div.child   text: \"child\"\n      */}\n    </>\n  );\n}\n",
   "css": ".parent { background: gainsboro; }\n.child { margin-top: 1.5rem; background: steelblue; color: white; }\n\n.parent {\n  /* TODO — keep the child margin inside */\n}\n",
   "hints": [
    "A parent with no padding, no border and no new formatting context collapses its child’s top margin with its own.",
    "display: flow-root is the purpose-built fix. padding-top: 1px and overflow: hidden also work but each has a side effect — flow-root has none."
   ],
   "sol": "display: flow-root;",
   "why": "flow-root exists for exactly this. Knowing it separates people who memorised overflow:hidden from people who know why it worked.",
   "markup": "    <div className=\"parent\">\n      <div className=\"child\">child</div>\n    </div>"
  },
  {
   "id": "BOX-04",
   "cat": "box",
   "title": "Percentage padding resolves against WIDTH — even vertically",
   "goal": "A box that always stays 16:9 using padding alone, with no aspect-ratio.",
   "use": [
    [
     "padding-top",
     "a percentage here resolves against the parent’s inline size, not its height"
    ]
   ],
   "task": "Give .ratio a padding-top that keeps it 16:9 at any width. Do not use aspect-ratio — this is the pre-2021 technique and it is still asked.",
   "dia": {
    "w": 320,
    "h": 130,
    "box": [
     [
      8,
      10,
      300,
      110,
      "width : height = 16 : 9"
     ]
    ],
    "gap": [
     [
      8,
      6,
      300,
      "100% width",
      1
     ]
    ],
    "note": [
     [
      100,
      66,
      "padding-top: 56.25%"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.ratio\n      */}\n    </>\n  );\n}\n",
   "css": ".ratio {\n  width: 100%;\n  background: steelblue;\n  height: 0;\n  /* TODO — 16:9 from padding alone */\n}\n",
   "hints": [
    "9 ÷ 16 = 0.5625.",
    "padding-top: 56.25%. Percentage padding — top and bottom included — is always a percentage of the containing block’s WIDTH. That asymmetry is the whole trick."
   ],
   "sol": "padding-top: 56.25%;",
   "why": "The percentage-padding rule is a classic MCQ. It is also the one place a magic number is defensible, because the alternative did not exist.",
   "markup": "    <div className=\"ratio\" />"
  },
  {
   "id": "BOX-05",
   "cat": "box",
   "title": "aspect-ratio — the modern answer to the same problem",
   "goal": "The same 16:9 box, one line, content still allowed inside.",
   "use": [
    [
     "aspect-ratio",
     "fix the ratio and let height be derived from width"
    ]
   ],
   "task": "Rewrite BOX-04 with aspect-ratio, and keep the caption text visible inside the box.",
   "dia": {
    "w": 320,
    "h": 130,
    "box": [
     [
      8,
      10,
      300,
      110,
      "16 / 9"
     ]
    ],
    "note": [
     [
      10,
      124,
      "height derived — content still flows"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.ratio\n         p   text: \"caption\"\n      */}\n    </>\n  );\n}\n",
   "css": ".ratio {\n  width: 100%;\n  background: steelblue;\n  color: white;\n  /* TODO — one line */\n}\n",
   "hints": [
    "aspect-ratio: 16 / 9.",
    "Unlike the padding hack the box still has real height, so children lay out normally and you do not need an absolutely positioned inner element."
   ],
   "sol": "aspect-ratio: 16 / 9;",
   "why": "Say both in an interview: the padding-top trick, why it worked, and that aspect-ratio replaced it. That is the shape of a senior answer.",
   "markup": "    <div className=\"ratio\">\n      <p>caption</p>\n    </div>"
  },
  {
   "id": "BOX-06",
   "cat": "box",
   "title": "outline does not take up space — border does",
   "goal": "Hovering a card must not shift any other card.",
   "use": [
    [
     "outline",
     "draw a ring that is painted outside the box and ignored by layout"
    ],
    [
     "outline-offset",
     "push the ring away from the edge"
    ]
   ],
   "task": "Give .card a 3px ring on hover with a 2px offset, without moving a single pixel of layout.",
   "dia": {
    "w": 320,
    "h": 110,
    "box": [
     [
      10,
      20,
      90,
      60,
      "a"
     ],
     [
      115,
      20,
      90,
      60,
      "b",
      "hi"
     ],
     [
      220,
      20,
      90,
      60,
      "c"
     ]
    ],
    "note": [
     [
      10,
      98,
      "ring is painted outside the box — nothing reflows"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.card   text: \"a\"\n         div.card   text: \"b\"\n         div.card   text: \"c\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: 1rem; }\n.card { padding: 1rem 2rem; background: aliceblue; }\n\n.card:hover {\n  /* TODO — a ring that costs no space */\n}\n",
   "hints": [
    "A border on hover adds 3px to every side and pushes the neighbours.",
    "outline: 3px solid steelblue; outline-offset: 2px; — outline is painted outside the border box and is not part of the box model at all."
   ],
   "sol": "outline: 3px solid steelblue;\n  outline-offset: 2px;",
   "why": "This is also the reason outline is the right property for focus rings, which you will use in the :focus-visible set.",
   "markup": "    <div className=\"row\">\n      <div className=\"card\">a</div>\n      <div className=\"card\">b</div>\n      <div className=\"card\">c</div>\n    </div>"
  },
  {
   "id": "BOX-07",
   "cat": "box",
   "title": "max-width, never width",
   "goal": "A card that is 40rem on a wide screen and exactly as wide as the phone on a narrow one — with no media query.",
   "use": [
    [
     "max-width",
     "cap the size"
    ],
    [
     "width",
     "let it be fluid below the cap"
    ]
   ],
   "task": "Make .card cap at 40rem but never overflow a 320px viewport. One declaration, no media query.",
   "dia": {
    "w": 320,
    "h": 130,
    "box": [
     [
      40,
      14,
      240,
      40,
      "40rem cap"
     ],
     [
      8,
      74,
      304,
      40,
      "fills a narrow screen"
     ]
    ],
    "note": [
     [
      8,
      126,
      "same rule, both screens"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card   text: \"content\"\n      */}\n    </>\n  );\n}\n",
   "css": ".card {\n  margin-inline: auto;\n  padding: 1rem;\n  background: aliceblue;\n  /* TODO — cap without overflowing */\n}\n",
   "hints": [
    "width: 40rem overflows a 320px screen. That is the bug.",
    "max-width: 40rem. A block element is already width:auto, so it fills what it is given and the max-width only caps the top end. “width sets, max-width caps” — prefer the cap."
   ],
   "sol": "max-width: 40rem;",
   "why": "One of the highest-value habits in the whole course: fixed widths are the number one cause of horizontal scrollbars on mobile.",
   "markup": "    <div className=\"card\">content</div>"
  },
  {
   "id": "FLEX-01",
   "cat": "flex",
   "title": "The two axes — main and cross",
   "goal": "Three items in a column, and you can name which axis each property acts on.",
   "use": [
    [
     "display: flex",
     "create the flex container"
    ],
    [
     "flex-direction",
     "choose which axis is the main axis"
    ]
   ],
   "task": "Turn .row into a vertical flex container. Then say out loud: with direction column, justify-content moves items ___ and align-items moves them ___.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     304,
     134,
     ".row"
    ],
    "box": [
     [
      16,
      18,
      288,
      32,
      "1"
     ],
     [
      16,
      58,
      288,
      32,
      "2"
     ],
     [
      16,
      98,
      288,
      32,
      "3"
     ]
    ],
    "arrow": [
     [
      300,
      18,
      300,
      130,
      ""
     ]
    ],
    "note": [
     [
      160,
      14,
      "main axis ↓  ·  cross axis →"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.item   text: \"1\"\n         div.item   text: \"2\"\n         div.item   text: \"3\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row {\n  gap: .5rem;\n  /* TODO — a vertical flex container */\n}\n.item { background: aliceblue; padding: .5rem; }\n",
   "hints": [
    "display: flex plus one more declaration.",
    "flex-direction: column. Now justify-content works vertically and align-items horizontally — the properties do not change meaning, the AXIS does."
   ],
   "sol": "display: flex;\n  flex-direction: column;",
   "why": "Every flexbox mistake traces back to forgetting which axis is main. Say the axis before you pick the property.",
   "markup": "    <div className=\"row\">\n      <div className=\"item\">1</div>\n      <div className=\"item\">2</div>\n      <div className=\"item\">3</div>\n    </div>"
  },
  {
   "id": "FLEX-02",
   "cat": "flex",
   "title": "justify-content — distribute along the MAIN axis",
   "goal": "Three items pushed to the far end of the row.",
   "use": [
    [
     "justify-content",
     "position items along the main axis"
    ]
   ],
   "task": "Push all three items to the right-hand end of the row, keeping their .5rem gap.",
   "dia": {
    "w": 320,
    "h": 90,
    "frame": [
     8,
     10,
     304,
     60,
     ".row"
    ],
    "box": [
     [
      150,
      20,
      50,
      40,
      "1"
     ],
     [
      206,
      20,
      50,
      40,
      "2"
     ],
     [
      262,
      20,
      50,
      40,
      "3"
     ]
    ],
    "note": [
     [
      14,
      44,
      "free space"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.item   text: \"1\"\n         div.item   text: \"2\"\n         div.item   text: \"3\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row {\n  display: flex;\n  gap: .5rem;\n  /* TODO — items to the end */\n}\n.item { background: aliceblue; padding: .5rem 1rem; }\n",
   "hints": [
    "flex-start · flex-end · center · space-between · space-around · space-evenly.",
    "justify-content: flex-end. In logical terms `end` also works and respects RTL."
   ],
   "sol": "justify-content: flex-end;",
   "why": "justify-content only ever has an effect when there IS free space on the main axis. If items fill the row it does nothing — a common confusion.",
   "markup": "    <div className=\"row\">\n      <div className=\"item\">1</div>\n      <div className=\"item\">2</div>\n      <div className=\"item\">3</div>\n    </div>"
  },
  {
   "id": "FLEX-03",
   "cat": "flex",
   "title": "align-items — the CROSS axis, and why stretch is the default",
   "goal": "Three cards of different text length, all vertically centred rather than equal-height.",
   "use": [
    [
     "align-items",
     "position items on the cross axis"
    ]
   ],
   "task": "The cards currently stretch to equal height. Centre them on the cross axis instead so each is only as tall as its content.",
   "dia": {
    "w": 320,
    "h": 110,
    "frame": [
     8,
     10,
     304,
     90,
     ".row"
    ],
    "box": [
     [
      16,
      38,
      88,
      34,
      "short"
     ],
     [
      112,
      26,
      88,
      58,
      "taller text"
     ],
     [
      208,
      42,
      88,
      26,
      "x"
     ]
    ],
    "note": [
     [
      16,
      104,
      "default is stretch — equal heights"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.item   text: \"short\"\n         div.item   text: \"a much taller block of text\"\n         div.item   text: \"x\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row {\n  display: flex;\n  gap: .5rem;\n  /* TODO — centre on the cross axis */\n}\n.item { background: aliceblue; padding: .5rem; }\n",
   "hints": [
    "The default align-items value is stretch, which is why your cards are already equal height for free.",
    "align-items: center. Remember you are GIVING UP equal heights by doing this — that default is often the thing you wanted."
   ],
   "sol": "align-items: center;",
   "why": "“Equal-height cards” needs no code in flexbox. Knowing that stretch is the default saves you from writing height: 100% everywhere.",
   "markup": "    <div className=\"row\">\n      <div className=\"item\">short</div>\n      <div className=\"item\">a much taller block of text</div>\n      <div className=\"item\">x</div>\n    </div>"
  },
  {
   "id": "FLEX-04",
   "cat": "flex",
   "title": "flex-wrap — one line becomes many",
   "goal": "Six chips that wrap onto a second row instead of shrinking to nothing.",
   "use": [
    [
     "flex-wrap",
     "allow a second line"
    ],
    [
     "gap",
     "space rows and columns at once"
    ]
   ],
   "task": "Let the chips wrap, with 0.5rem between them in both directions.",
   "dia": {
    "w": 320,
    "h": 110,
    "frame": [
     8,
     10,
     304,
     90,
     ".row  flex-wrap: wrap"
    ],
    "box": [
     [
      16,
      20,
      88,
      26,
      "1"
     ],
     [
      112,
      20,
      88,
      26,
      "2"
     ],
     [
      208,
      20,
      88,
      26,
      "3"
     ],
     [
      16,
      56,
      88,
      26,
      "4"
     ],
     [
      112,
      56,
      88,
      26,
      "5"
     ],
     [
      208,
      56,
      88,
      26,
      "6"
     ]
    ],
    "gap": [
     [
      104,
      33,
      8,
      "",
      1
     ],
     [
      60,
      46,
      10,
      "",
      0
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         span.chip   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".row {\n  display: flex;\n  /* TODO — wrap, and space both directions */\n}\n.chip { background: aliceblue; padding: .35rem .75rem; border-radius: 999px; }\n",
   "hints": [
    "Without wrap, flex items shrink past their content rather than move to a new line.",
    "flex-wrap: wrap; gap: .5rem; — gap on a wrapping flex container sets both row-gap and column-gap."
   ],
   "sol": "flex-wrap: wrap;\n  gap: .5rem;",
   "why": "This is the cluster primitive in miniature, and the one place flex is genuinely better than grid: a wrapping row whose item count you do not control.",
   "markup": "    <div className=\"row\">\n      {[1,2,3,4,5,6].map(n => <span className=\"chip\" key={n}>chip {n}</span>)}\n    </div>"
  },
  {
   "id": "FLEX-05",
   "cat": "flex",
   "title": "align-content — only exists when there are multiple lines",
   "goal": "Two wrapped rows pushed apart to the top and bottom of a tall container.",
   "use": [
    [
     "align-content",
     "distribute the LINES on the cross axis"
    ],
    [
     "flex-wrap",
     "required — without it there is only one line"
    ]
   ],
   "task": "The container is 12rem tall and the chips wrap onto two lines. Push the two lines to the far ends of the cross axis.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     304,
     134,
     ".row  height 12rem"
    ],
    "box": [
     [
      16,
      16,
      88,
      26,
      "1"
     ],
     [
      112,
      16,
      88,
      26,
      "2"
     ],
     [
      208,
      16,
      88,
      26,
      "3"
     ],
     [
      16,
      106,
      88,
      26,
      "4"
     ],
     [
      112,
      106,
      88,
      26,
      "5"
     ]
    ],
    "gap": [
     [
      290,
      44,
      60,
      "free space",
      0
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         span.chip   x5   from .map over [1,2,3,4,5]\n      */}\n    </>\n  );\n}\n",
   "css": ".row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: .5rem;\n  height: 12rem;\n  /* TODO — spread the two LINES apart */\n}\n.chip { background: aliceblue; padding: .35rem .75rem; }\n",
   "hints": [
    "align-items positions items within their line. align-content positions the lines themselves.",
    "align-content: space-between. With flex-wrap: nowrap there is exactly one line and align-content does nothing at all."
   ],
   "sol": "align-content: space-between;",
   "why": "The align-items / align-content distinction is a favourite MCQ. One sentence: items within a line, content between lines.",
   "markup": "    <div className=\"row\">\n      {[1,2,3,4,5].map(n => <span className=\"chip\" key={n}>chip {n}</span>)}\n    </div>"
  },
  {
   "id": "FLEX-06",
   "cat": "flex",
   "title": "flex-grow — who eats the free space",
   "goal": "A row where the middle item absorbs all leftover width and the outer two stay at content size.",
   "use": [
    [
     "flex-grow",
     "give one item a share of the FREE space"
    ]
   ],
   "task": "Make item 2 take every spare pixel while 1 and 3 stay their natural width.",
   "dia": {
    "w": 320,
    "h": 90,
    "frame": [
     8,
     10,
     304,
     60,
     ".row"
    ],
    "box": [
     [
      16,
      20,
      54,
      40,
      "1"
     ],
     [
      76,
      20,
      180,
      40,
      "2  grows",
      "hi"
     ],
     [
      262,
      20,
      42,
      40,
      "3"
     ]
    ],
    "note": [
     [
      100,
      80,
      "grow shares FREE space, not total width"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.item   text: \"1\"\n         div.item   text: \"2\"\n         div.item   text: \"3\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: .5rem; }\n.item { background: aliceblue; padding: .5rem 1rem; }\n\n.item:nth-child(2) {\n  /* TODO */\n}\n",
   "hints": [
    "flex-grow takes a unitless number — a share, not a size.",
    "flex-grow: 1. Two items with grow 1 and 3 split the free space 1:3 — that ratio applies to the LEFTOVER, so their final widths are not 1:3."
   ],
   "sol": "flex-grow: 1;",
   "why": "“grow: 1 and grow: 3 means widths 1:3” is false and is the trap in most flex MCQs. It divides the free space only.",
   "markup": "    <div className=\"row\">\n      <div className=\"item\">1</div>\n      <div className=\"item\">2</div>\n      <div className=\"item\">3</div>\n    </div>"
  },
  {
   "id": "FLEX-07",
   "cat": "flex",
   "title": "flex-shrink — why your item is narrower than its width",
   "goal": "A fixed 200px logo that refuses to shrink when the row runs out of space.",
   "use": [
    [
     "flex-shrink",
     "opt an item out of shrinking"
    ]
   ],
   "task": ".logo has width 200px but renders smaller. Stop it shrinking without touching its width.",
   "dia": {
    "w": 320,
    "h": 100,
    "frame": [
     8,
     10,
     304,
     60,
     ".row  — narrower than its content"
    ],
    "box": [
     [
      16,
      20,
      120,
      40,
      "logo 200px",
      "hi"
     ],
     [
      142,
      20,
      162,
      40,
      "long text shrinks"
     ]
    ],
    "note": [
     [
      16,
      90,
      "default flex-shrink is 1 — everything shrinks"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.logo   text: \"LOGO\"\n         p.text   text: \"a long stretch of text that \"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: 1rem; width: 22rem; }\n.text { background: aliceblue; }\n\n.logo {\n  width: 200px;\n  background: steelblue;\n  color: white;\n  /* TODO — refuse to shrink */\n}\n",
   "hints": [
    "The initial value of flex-shrink is 1, so every item is shrinkable by default. width is a starting point, not a promise.",
    "flex-shrink: 0. Equivalently flex: none, which is 0 0 auto."
   ],
   "sol": "flex-shrink: 0;",
   "why": "“I set the width and it ignored me” is nearly always flex-shrink. This is the single most useful flex debugging fact.",
   "markup": "    <div className=\"row\">\n      <div className=\"logo\">LOGO</div>\n      <p className=\"text\">a long stretch of text that eats the remaining space</p>\n    </div>"
  },
  {
   "id": "FLEX-08",
   "cat": "flex",
   "title": "flex-basis vs width — which one wins",
   "goal": "An item that starts at 10rem on the main axis even though its width says 30rem.",
   "use": [
    [
     "flex-basis",
     "set the main-size starting point"
    ],
    [
     "width",
     "present, and deliberately ignored"
    ]
   ],
   "task": "Leave width: 30rem in place. Add a flex-basis so the item starts at 10rem, and be able to say why width lost.",
   "dia": {
    "w": 320,
    "h": 100,
    "frame": [
     8,
     10,
     304,
     50,
     ".row"
    ],
    "box": [
     [
      16,
      18,
      140,
      34,
      "basis 10rem wins",
      "hi"
     ],
     [
      162,
      18,
      142,
      34,
      "sibling"
     ]
    ],
    "note": [
     [
      16,
      80,
      "on the MAIN axis, flex-basis overrides width"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.a   text: \"A\"\n         div.b   text: \"B\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: .5rem; }\n.b { background: aliceblue; flex: 1; }\n\n.a {\n  width: 30rem;\n  background: steelblue;\n  color: white;\n  /* TODO — start at 10rem instead */\n}\n",
   "hints": [
    "flex-basis sets the size along the main axis before growing or shrinking happens.",
    "flex-basis: 10rem. On the main axis flex-basis beats width; on the cross axis flex-basis is irrelevant and width applies normally."
   ],
   "sol": "flex-basis: 10rem;",
   "why": "Precedence question, asked constantly. The full order on the main axis: flex-basis → width → content size, then clamped by min/max.",
   "markup": "    <div className=\"row\">\n      <div className=\"a\">A</div>\n      <div className=\"b\">B</div>\n    </div>"
  },
  {
   "id": "FLEX-09",
   "cat": "flex",
   "title": "flex: 1 vs flex: auto — the shorthand expands differently",
   "goal": "Three unequal-content items rendered at exactly equal widths.",
   "use": [
    [
     "flex",
     "the shorthand — know what 1 expands to"
    ]
   ],
   "task": "Make the three items exactly equal width regardless of their content. Then change it to flex: auto and explain in one line why they stop being equal.",
   "dia": {
    "w": 320,
    "h": 110,
    "frame": [
     8,
     10,
     304,
     44,
     "flex: 1  →  equal"
    ],
    "box": [
     [
      16,
      18,
      92,
      28,
      "x"
     ],
     [
      114,
      18,
      92,
      28,
      "longer"
     ],
     [
      212,
      18,
      92,
      28,
      "l"
     ]
    ],
    "note": [
     [
      8,
      72,
      "flex: 1    = 1 1 0%    → ignores content width"
     ],
     [
      8,
      90,
      "flex: auto = 1 1 auto  → content width matters"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.item   text: \"x\"\n         div.item   text: \"much longer label\"\n         div.item   text: \"l\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: .5rem; }\n.item { background: aliceblue; padding: .5rem; }\n\n.item {\n  /* TODO — exactly equal widths */\n}\n",
   "hints": [
    "The one-value shorthand sets flex-basis to 0%, not auto.",
    "flex: 1 expands to flex: 1 1 0% — basis zero, so content is ignored and the free space (= the whole row) is split evenly. flex: auto is 1 1 auto, which starts from content size, so longer text stays wider."
   ],
   "sol": "flex: 1;",
   "why": "The single highest-yield flex fact for interviews. If you can recite 1 1 0% vs 1 1 auto vs 0 1 auto you are ahead of most candidates.",
   "markup": "    <div className=\"row\">\n      <div className=\"item\">x</div>\n      <div className=\"item\">much longer label</div>\n      <div className=\"item\">l</div>\n    </div>"
  },
  {
   "id": "FLEX-10",
   "cat": "flex",
   "title": "flex: none — the fixed rail",
   "goal": "A 14rem sidebar that never grows and never shrinks, beside a fluid main column.",
   "use": [
    [
     "flex: none",
     "lock the sidebar at its own size"
    ],
    [
     "flex: 1",
     "let main take the rest"
    ]
   ],
   "task": "Lock .side at 14rem in both directions and let .main absorb everything else. Use the shorthands, not the longhands.",
   "dia": {
    "w": 320,
    "h": 110,
    "frame": [
     8,
     10,
     304,
     80,
     ""
    ],
    "box": [
     [
      16,
      20,
      110,
      60,
      "side  flex: none",
      "hi"
     ],
     [
      132,
      20,
      172,
      60,
      "main  flex: 1"
     ]
    ],
    "note": [
     [
      16,
      102,
      "none = 0 0 auto  ·  1 = 1 1 0%"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         aside.side   text: \"side\"\n         main.main   text: \"main\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: 1rem; }\n.main { background: aliceblue; padding: 1rem; }\n\n.side {\n  width: 14rem;\n  background: steelblue;\n  color: white;\n  padding: 1rem;\n  /* TODO */\n}\n",
   "hints": [
    "flex: none is the shorthand for 0 0 auto — no grow, no shrink, size from width.",
    ".side { flex: none } and .main { flex: 1 }. Without flex: none the sidebar shrinks the moment main has long content."
   ],
   "sol": "flex: none;",
   "why": "This is the flex version of the sidebar primitive. The grid version needs no such guard, which is one honest argument for grid.",
   "markup": "    <div className=\"row\">\n      <aside className=\"side\">side</aside>\n      <main className=\"main\">main</main>\n    </div>"
  },
  {
   "id": "FLEX-11",
   "cat": "flex",
   "title": "Auto margins push — no justify-content needed",
   "goal": "A nav where the last link sits alone on the right and the rest stay grouped left.",
   "use": [
    [
     "margin-left: auto",
     "absorb all free space before this one item"
    ]
   ],
   "task": "Push only .last to the right. Do not use justify-content and do not add a spacer element.",
   "dia": {
    "w": 320,
    "h": 90,
    "frame": [
     8,
     10,
     304,
     50,
     ".nav"
    ],
    "box": [
     [
      16,
      18,
      54,
      34,
      "a"
     ],
     [
      76,
      18,
      54,
      34,
      "b"
     ],
     [
      136,
      18,
      54,
      34,
      "c"
     ],
     [
      246,
      18,
      58,
      34,
      "last",
      "hi"
     ]
    ],
    "gap": [
     [
      192,
      35,
      52,
      "auto",
      1
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       nav.nav\n         a   href=\"#\"   text: \"a\"\n         a   href=\"#\"   text: \"b\"\n         a   href=\"#\"   text: \"c\"\n         a.last   href=\"#\"   text: \"last\"\n      */}\n    </>\n  );\n}\n",
   "css": ".nav { display: flex; gap: .5rem; }\n.nav a { background: aliceblue; padding: .5rem 1rem; }\n\n.last {\n  /* TODO — push me right */\n}\n",
   "hints": [
    "An auto margin on a flex item eats all the free space on that side.",
    "margin-left: auto. margin-inline-start: auto is the logical version and flips correctly in RTL."
   ],
   "sol": "margin-left: auto;",
   "why": "Auto margins are the cleanest answer to “one item apart from the rest”, and they compose — unlike justify-content, which is all-or-nothing for the whole line.",
   "markup": "    <nav className=\"nav\">\n      <a href=\"#\">a</a>\n      <a href=\"#\">b</a>\n      <a href=\"#\">c</a>\n      <a className=\"last\" href=\"#\">last</a>\n    </nav>"
  },
  {
   "id": "FLEX-12",
   "cat": "flex",
   "title": "gap replaces the last-child margin hack",
   "goal": "Even spacing between items with no :last-child rule anywhere.",
   "use": [
    [
     "gap",
     "space between items only, never on the outside"
    ]
   ],
   "task": "Delete the margin approach and get identical spacing with one declaration on the container.",
   "dia": {
    "w": 320,
    "h": 100,
    "frame": [
     8,
     10,
     304,
     50,
     ".row"
    ],
    "box": [
     [
      16,
      18,
      84,
      34,
      "1"
     ],
     [
      110,
      18,
      84,
      34,
      "2"
     ],
     [
      204,
      18,
      84,
      34,
      "3"
     ]
    ],
    "gap": [
     [
      100,
      35,
      10,
      "gap",
      1
     ],
     [
      194,
      35,
      10,
      "gap",
      1
     ]
    ],
    "note": [
     [
      16,
      80,
      "no trailing space after item 3"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.item   text: \"1\"\n         div.item   text: \"2\"\n         div.item   text: \"3\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row {\n  display: flex;\n  /* TODO — spacing without margins */\n}\n.item { background: aliceblue; padding: .5rem 1rem; }\n\n/* the old way, now unnecessary:\n.item + .item { margin-left: .5rem; } */\n",
   "hints": [
    "gap applies between items and never outside them, so there is no trailing space to clean up.",
    "gap: .5rem. It works in flex, grid and multi-column, and it is not affected by margin collapsing."
   ],
   "sol": "gap: .5rem;",
   "why": "gap removed an entire genre of CSS bug. If you still see .item:not(:last-child) { margin-right } in a codebase, that is a dated stylesheet.",
   "markup": "    <div className=\"row\">\n      <div className=\"item\">1</div>\n      <div className=\"item\">2</div>\n      <div className=\"item\">3</div>\n    </div>"
  },
  {
   "id": "FLEX-13",
   "cat": "flex",
   "title": "order moves the paint, not the tab stop",
   "goal": "Item 3 shown first visually — and a clear statement of the accessibility cost.",
   "use": [
    [
     "order",
     "change visual order only"
    ]
   ],
   "task": "Show item 3 first without changing the JSX. Then write in the comment what a keyboard user experiences.",
   "dia": {
    "w": 320,
    "h": 110,
    "frame": [
     8,
     10,
     304,
     50,
     "visual order"
    ],
    "box": [
     [
      16,
      18,
      90,
      34,
      "3",
      "hi"
     ],
     [
      112,
      18,
      90,
      34,
      "1"
     ],
     [
      208,
      18,
      90,
      34,
      "2"
     ]
    ],
    "note": [
     [
      8,
      78,
      "DOM order stays 1, 2, 3 — so Tab still goes 1 → 2 → 3"
     ],
     [
      8,
      96,
      "visual and focus order disagree: an a11y failure"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.item   text: \"1\"\n         div.item   text: \"2\"\n         div.item   text: \"3\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: .5rem; }\n.item { background: aliceblue; padding: .5rem 1rem; }\n\n.item:nth-child(3) {\n  /* TODO — paint me first */\n}\n/* TODO — one line: what does a keyboard user hit first? */\n",
   "hints": [
    "order takes an integer and defaults to 0, so a negative value moves an item before every default item.",
    "order: -1. Tab order follows the DOM, not order, so the visual first item is the third tab stop. WCAG 2.4.3 calls that a failure."
   ],
   "sol": "order: -1;",
   "why": "Interviewers ask this to see whether you think past the pixels. The correct answer is “use it for presentation only, and fix the DOM if the order actually matters”.",
   "markup": "    <div className=\"row\">\n      <div className=\"item\">1</div>\n      <div className=\"item\">2</div>\n      <div className=\"item\">3</div>\n    </div>"
  },
  {
   "id": "FLEX-14",
   "cat": "flex",
   "title": "align-self — one item breaks ranks",
   "goal": "Three stretched cards where only the middle one is bottom-aligned.",
   "use": [
    [
     "align-self",
     "override align-items for a single item"
    ]
   ],
   "task": "Keep align-items: stretch on the container and bottom-align only the second card.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     10,
     304,
     80,
     "align-items: stretch"
    ],
    "box": [
     [
      16,
      18,
      90,
      64,
      "1"
     ],
     [
      112,
      52,
      90,
      30,
      "2",
      "hi"
     ],
     [
      208,
      18,
      90,
      64,
      "3"
     ]
    ],
    "note": [
     [
      16,
      110,
      "only item 2 opts out"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         div.item   text: \"1\"\n         div.item   text: \"2\"\n         div.item   text: \"3\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: .5rem; align-items: stretch; height: 6rem; }\n.item { background: aliceblue; padding: .5rem 1rem; }\n\n.item:nth-child(2) {\n  /* TODO */\n}\n",
   "hints": [
    "Every align-items value has an align-self counterpart that applies to one item.",
    "align-self: flex-end. There is no justify-self in flexbox — the main axis is controlled by the container plus auto margins. That asymmetry is deliberate."
   ],
   "sol": "align-self: flex-end;",
   "why": "“Why is there no justify-self in flexbox?” is a real interview question. Because items on the main axis share one distribution; auto margins cover the individual case.",
   "markup": "    <div className=\"row\">\n      <div className=\"item\">1</div>\n      <div className=\"item\">2</div>\n      <div className=\"item\">3</div>\n    </div>"
  },
  {
   "id": "FLEX-15",
   "cat": "flex",
   "title": "min-width: 0 — the ellipsis that refuses to appear",
   "goal": "A long single-line title that truncates with … instead of blowing the row wide.",
   "use": [
    [
     "min-width: 0",
     "remove the automatic minimum size floor"
    ],
    [
     "text-overflow: ellipsis",
     "draw the …"
    ],
    [
     "overflow: hidden",
     "required for ellipsis to apply"
    ]
   ],
   "task": "The title overflows its row. Make it truncate. You will need three declarations and one of them is not obvious.",
   "dia": {
    "w": 320,
    "h": 100,
    "frame": [
     8,
     10,
     304,
     50,
     ".row"
    ],
    "box": [
     [
      16,
      18,
      206,
      34,
      "a very long title…",
      "hi"
     ],
     [
      228,
      18,
      76,
      34,
      "action"
     ]
    ],
    "note": [
     [
      8,
      80,
      "auto min-size stops a flex item shrinking below its content"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         h2.title   text: \"A headline far too long to f\"\n         button.act   text: \"action\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: 1rem; align-items: center; width: 22rem; }\n.act { flex: none; }\n\n.title {\n  white-space: nowrap;\n  /* TODO — three declarations */\n}\n",
   "hints": [
    "A flex item’s automatic minimum size is min-content, so it will not shrink below its longest word — the shrink you asked for is being refused.",
    "min-width: 0; overflow: hidden; text-overflow: ellipsis; — min-width: 0 lifts the floor, overflow: hidden clips, ellipsis draws the dots. In a column flex container the equivalent is min-height: 0."
   ],
   "sol": "min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;",
   "why": "The most-searched flexbox bug of all time. It also explains the grid version: minmax(0, 1fr) instead of 1fr.",
   "markup": "    <div className=\"row\">\n      <h2 className=\"title\">A headline far too long to fit in this row</h2>\n      <button className=\"act\">action</button>\n    </div>"
  },
  {
   "id": "GRID-01",
   "useApp": false,
   "cat": "grid",
   "title": "grid-template-columns — the parent decides",
   "goal": "Six cells in three equal columns.",
   "use": [
    [
     "display: grid",
     "create the grid container"
    ],
    [
     "grid-template-columns",
     "declare the column tracks"
    ],
    [
     "fr",
     "one share of the free space"
    ]
   ],
   "task": "Lay the six cells out in three equal columns with a 1rem gap.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ".grid"
    ],
    "track": [
     [
      16,
      0,
      92,
      "1fr"
     ],
     [
      116,
      0,
      92,
      "1fr"
     ],
     [
      216,
      0,
      88,
      "1fr"
     ]
    ],
    "box": [
     [
      16,
      16,
      92,
      44,
      "1"
     ],
     [
      116,
      16,
      92,
      44,
      "2"
     ],
     [
      216,
      16,
      88,
      44,
      "3"
     ],
     [
      16,
      68,
      92,
      44,
      "4"
     ],
     [
      116,
      68,
      92,
      44,
      "5"
     ],
     [
      216,
      68,
      88,
      44,
      "6"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  gap: 1rem;\n  /* TODO — three equal columns */\n}\n.cell { background: aliceblue; padding: 1rem; }\n",
   "hints": [
    "fr is a grid-only unit meaning “one share of what is left after gaps and fixed tracks”.",
    "display: grid; grid-template-columns: 1fr 1fr 1fr; — rows appear implicitly as needed."
   ],
   "sol": "display: grid;\n  grid-template-columns: 1fr 1fr 1fr;",
   "why": "The decision rule: the PARENT is deciding there are three columns, so this is grid. If the children decided, it would be flex.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4,5,6].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-02",
   "useApp": false,
   "cat": "grid",
   "title": "Implicit rows — and how to size them",
   "goal": "Rows you never declared, all exactly 6rem tall.",
   "use": [
    [
     "grid-auto-rows",
     "size the rows grid creates for you"
    ]
   ],
   "task": "You declared two columns and no rows. Make every automatically created row 6rem tall.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     304,
     124,
     ".grid — 2 explicit columns, 0 explicit rows"
    ],
    "box": [
     [
      16,
      16,
      140,
      50,
      "1"
     ],
     [
      164,
      16,
      140,
      50,
      "2"
     ],
     [
      16,
      74,
      140,
      50,
      "3"
     ],
     [
      164,
      74,
      140,
      50,
      "4"
     ]
    ],
    "gap": [
     [
      300,
      16,
      50,
      "6rem",
      0
     ]
    ],
    "note": [
     [
      16,
      136,
      "implicit rows: created by content"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n  /* TODO — size the implicit rows */\n}\n.cell { background: aliceblue; padding: 1rem; }\n",
   "hints": [
    "grid-template-rows sizes rows you declared. These rows were never declared.",
    "grid-auto-rows: 6rem. The pair is grid-auto-columns, which matters when grid-auto-flow is column."
   ],
   "sol": "grid-auto-rows: 6rem;",
   "why": "Explicit vs implicit is the grid concept people skip. Anything beyond your template is implicit and is sized by grid-auto-*.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4,5,6].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-03",
   "useApp": false,
   "cat": "grid",
   "title": "row-gap and column-gap are not the same number",
   "goal": "2rem between rows, 0.5rem between columns.",
   "use": [
    [
     "row-gap",
     "vertical spacing"
    ],
    [
     "column-gap",
     "horizontal spacing"
    ],
    [
     "gap",
     "the two-value shorthand"
    ]
   ],
   "task": "Set the two gaps to different values using the single shorthand, and know which value comes first.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     304,
     124,
     ".grid"
    ],
    "box": [
     [
      16,
      16,
      140,
      40,
      "1"
     ],
     [
      164,
      16,
      140,
      40,
      "2"
     ],
     [
      16,
      84,
      140,
      40,
      "3"
     ],
     [
      164,
      84,
      140,
      40,
      "4"
     ]
    ],
    "gap": [
     [
      156,
      36,
      8,
      ".5",
      1
     ],
     [
      80,
      56,
      28,
      "2rem",
      0
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  /* TODO — 2rem rows, .5rem columns, one declaration */\n}\n.cell { background: aliceblue; padding: 1rem; }\n",
   "hints": [
    "The shorthand is gap: <row> <column> — the same block-then-inline order as margin and padding.",
    "gap: 2rem .5rem;"
   ],
   "sol": "gap: 2rem .5rem;",
   "why": "Order trips people up because it is the opposite of the x-then-y they expect from graphics APIs. It follows CSS block/inline order instead.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4,5,6].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-04",
   "cat": "grid",
   "title": "Line-based placement — grid lines, not grid cells",
   "goal": "The first cell spanning columns 1 to 3, everything else falling in behind it.",
   "use": [
    [
     "grid-column",
     "place an item between two column LINES"
    ]
   ],
   "task": "Make cell 1 occupy the first two columns of a three-column grid using line numbers.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     20,
     304,
     102,
     ".grid"
    ],
    "track": [
     [
      16,
      0,
      192,
      "lines 1 → 3"
     ],
     [
      216,
      0,
      88,
      ""
     ]
    ],
    "box": [
     [
      16,
      28,
      192,
      40,
      "1  spans 2",
      "hi"
     ],
     [
      216,
      28,
      88,
      40,
      "2"
     ],
     [
      16,
      76,
      92,
      40,
      "3"
     ],
     [
      116,
      76,
      92,
      40,
      "4"
     ],
     [
      216,
      76,
      88,
      40,
      "5"
     ]
    ],
    "note": [
     [
      8,
      16,
      "a 3-column grid has 4 lines: 1 2 3 4"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: .5rem;\n}\n.cell { background: aliceblue; padding: 1rem; }\n\n.cell:first-child {\n  /* TODO — from line 1 to line 3 */\n}\n",
   "hints": [
    "n columns means n+1 lines. To cover columns 1 and 2 you go from line 1 to line 3.",
    "grid-column: 1 / 3; — this is the shorthand for grid-column-start and grid-column-end."
   ],
   "sol": "grid-column: 1 / 3;",
   "why": "Counting lines rather than cells is the mental switch grid demands. Off-by-one here is the most common grid mistake.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4,5,6].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-05",
   "cat": "grid",
   "title": "span — placement without counting",
   "goal": "The same two-column item, written so it survives being moved.",
   "use": [
    [
     "span",
     "say how many tracks to cover instead of where to stop"
    ]
   ],
   "task": "Rewrite GRID-04 so the item covers two columns wherever it happens to start.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     10,
     304,
     102,
     ""
    ],
    "box": [
     [
      16,
      18,
      92,
      40,
      "1"
     ],
     [
      116,
      18,
      188,
      40,
      "2  span 2",
      "hi"
     ],
     [
      16,
      66,
      92,
      40,
      "3"
     ],
     [
      116,
      66,
      92,
      40,
      "4"
     ],
     [
      216,
      66,
      88,
      40,
      "5"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: .5rem;\n}\n.cell { background: aliceblue; padding: 1rem; }\n\n.cell:nth-child(2) {\n  /* TODO — cover two columns, wherever I start */\n}\n",
   "hints": [
    "grid-column accepts a span keyword in place of an end line.",
    "grid-column: span 2. Now the item does not care which column it lands in — the auto-placement algorithm can move it and the span still holds."
   ],
   "sol": "grid-column: span 2;",
   "why": "Absolute line numbers break when the grid changes. span is the resilient form and the one to reach for by default.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4,5,6].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-06",
   "cat": "grid",
   "title": "Line -1 — full width without knowing the column count",
   "goal": "A banner spanning every column of a grid whose column count you do not control.",
   "use": [
    [
     "grid-column: 1 / -1",
     "from the first line to the last, whatever the count"
    ]
   ],
   "task": "Make .banner span the full width of a grid that may have 2, 3 or 12 columns.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ""
    ],
    "box": [
     [
      16,
      16,
      288,
      32,
      "banner   1 / -1",
      "hi"
     ],
     [
      16,
      56,
      92,
      56,
      "1"
     ],
     [
      116,
      56,
      92,
      56,
      "2"
     ],
     [
      216,
      56,
      88,
      56,
      "3"
     ]
    ],
    "note": [
     [
      8,
      126,
      "-1 = the last line of the EXPLICIT grid"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.banner   text: \"banner\"\n         div.cell   x3   from .map over [1,2,3]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: .5rem;\n}\n.cell { background: aliceblue; padding: 1rem; }\n\n.banner {\n  background: steelblue;\n  color: white;\n  padding: 1rem;\n  /* TODO — full width, any column count */\n}\n",
   "hints": [
    "Negative line numbers count backwards from the end of the explicit grid.",
    "grid-column: 1 / -1. Caveat worth saying out loud: -1 refers to the explicit grid, so it does not reach tracks created implicitly by auto-fill."
   ],
   "sol": "grid-column: 1 / -1;",
   "why": "The caveat is what makes this an interview answer rather than a snippet. With repeat(auto-fill, …) the explicit grid is still what -1 measures.",
   "markup": "    <div className=\"grid\">\n      <div className=\"banner\">banner</div>\n      {[1,2,3].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-07",
   "useApp": false,
   "cat": "grid",
   "title": "grid-auto-flow: dense — backfill the holes",
   "goal": "A gallery with no gaps, where the hole left by a wrapped wide item is backfilled by a later item.",
   "use": [
    [
     "grid-auto-flow: dense",
     "let later items move up into earlier holes"
    ]
   ],
   "task": "Item 3 spans two columns, cannot fit in the single track left beside 1 and 2, and wraps \u2014 stranding a hole at the end of row 1. Backfill it, then state the accessibility cost.",
   "dia": {
  "w": 320,
  "h": 140,
  "frame": [
    8,
    8,
    304,
    124,
    "grid-auto-flow: row"
  ],
  "box": [
    [
      16,
      16,
      92,
      44,
      "1"
    ],
    [
      116,
      16,
      92,
      44,
      "2"
    ],
    [
      216,
      16,
      88,
      44,
      "hole",
      "ghost"
    ],
    [
      16,
      68,
      192,
      44,
      "3  span 2",
      "hi"
    ],
    [
      216,
      68,
      88,
      44,
      "4"
    ],
    [
      16,
      120,
      92,
      44,
      "5"
    ],
    [
      116,
      120,
      92,
      44,
      "6"
    ]
  ],
  "note": [
    [
      8,
      136,
      "only 1 track is left in row 1, so 3 wraps \u2014 and the hole is never revisited"
    ]
  ],
  "alt": {
    "w": 320,
    "h": 140,
    "frame": [
      8,
      8,
      304,
      124,
      "grid-auto-flow: row dense"
    ],
    "box": [
      [
        16,
        16,
        92,
        44,
        "1"
      ],
      [
        116,
        16,
        92,
        44,
        "2"
      ],
      [
        216,
        16,
        88,
        44,
        "4",
        "hi"
      ],
      [
        16,
        68,
        192,
        44,
        "3  span 2"
      ],
      [
        216,
        68,
        88,
        44,
        "5"
      ],
      [
        16,
        120,
        92,
        44,
        "6"
      ]
    ],
    "note": [
      [
        8,
        136,
        "4 jumps BACK into the hole \u2014 DOM order, and so Tab order, is unchanged"
      ]
    ]
  },
  "labels": [
    "Default (row) \u2014 the hole",
    "row dense \u2014 4 backfills it"
  ]
},
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: .5rem;\n  /* TODO — backfill holes */\n}\n.cell { background: aliceblue; padding: 1rem; }\n.cell:nth-child(3) { grid-column: span 2; }\n",
   "hints": [
    "The default is grid-auto-flow: row, which never goes backwards.",
    "grid-auto-flow: row dense. Like flex `order`, it changes visual order only — Tab order still follows the DOM, so avoid it for interactive content."
   ],
   "sol": "grid-auto-flow: row dense;",
   "why": "Same trade-off as order, different property. Recognising the pattern — visual reordering never moves focus — is the transferable idea.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4,5,6].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-08",
   "useApp": false,
   "cat": "grid",
   "title": "justify-items and align-items on the container",
   "goal": "Every cell’s content sitting in the middle of its cell rather than filling it.",
   "use": [
    [
     "justify-items",
     "inline-axis position of every item in its cell"
    ],
    [
     "align-items",
     "block-axis position of every item in its cell"
    ]
   ],
   "task": "Centre every item within its own cell, both directions, using two declarations (not place-items yet).",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ""
    ],
    "box": [
     [
      16,
      16,
      92,
      44,
      "",
      "ghost"
     ],
     [
      116,
      16,
      92,
      44,
      "",
      "ghost"
     ],
     [
      216,
      16,
      88,
      44,
      "",
      "ghost"
     ],
     [
      46,
      30,
      32,
      16,
      "1"
     ],
     [
      146,
      30,
      32,
      16,
      "2"
     ],
     [
      244,
      30,
      32,
      16,
      "3"
     ],
     [
      16,
      68,
      92,
      44,
      "",
      "ghost"
     ],
     [
      116,
      68,
      92,
      44,
      "",
      "ghost"
     ],
     [
      216,
      68,
      88,
      44,
      "",
      "ghost"
     ],
     [
      46,
      82,
      32,
      16,
      "4"
     ],
     [
      146,
      82,
      32,
      16,
      "5"
     ],
     [
      244,
      82,
      32,
      16,
      "6"
     ]
    ],
    "note": [
     [
      8,
      126,
      "dashed = the cell · solid = the item"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: .5rem;\n  grid-auto-rows: 4rem;\n  /* TODO — two declarations */\n}\n.cell { background: aliceblue; }\n",
   "hints": [
    "justify-* is the inline (horizontal) axis, align-* is the block (vertical) axis. In grid this is fixed and does not swap the way flex axes do.",
    "justify-items: center; align-items: center; — the default for both is stretch, which is why cells normally fill."
   ],
   "sol": "justify-items: center;\n  align-items: center;",
   "why": "Grid axes never swap. That alone makes grid alignment easier to reason about than flex alignment.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4,5,6].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-09",
   "cat": "grid",
   "title": "justify-self and align-self — one cell disagrees",
   "goal": "A grid of stretched cells where one item is pinned bottom-right of its cell.",
   "use": [
    [
     "justify-self",
     "override the inline alignment for one item"
    ],
    [
     "align-self",
     "override the block alignment for one item"
    ]
   ],
   "task": "Leave the container defaults alone and pin only cell 5 to the bottom-right of its own cell.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ""
    ],
    "box": [
     [
      16,
      16,
      92,
      44,
      "1"
     ],
     [
      116,
      16,
      92,
      44,
      "2"
     ],
     [
      216,
      16,
      88,
      44,
      "3"
     ],
     [
      16,
      68,
      92,
      44,
      "4"
     ],
     [
      116,
      68,
      92,
      44,
      "",
      "ghost"
     ],
     [
      170,
      94,
      38,
      16,
      "5",
      "hi"
     ],
     [
      216,
      68,
      88,
      44,
      "6"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: .5rem;\n  grid-auto-rows: 4rem;\n}\n.cell { background: aliceblue; }\n\n.cell:nth-child(5) {\n  /* TODO */\n}\n",
   "hints": [
    "Every justify-items / align-items value has a *-self counterpart set on the item.",
    "justify-self: end; align-self: end; — and unlike flexbox, grid DOES have justify-self, because each item owns its own cell."
   ],
   "sol": "justify-self: end;\n  align-self: end;",
   "why": "“Why does grid have justify-self but flex does not?” — because a grid item has a private cell, while flex items share one line.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4,5,6].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-10",
   "useApp": false,
   "cat": "grid",
   "title": "grid-auto-flow: column — a row that keeps going",
   "goal": "Items flowing left to right into new columns instead of wrapping to new rows.",
   "use": [
    [
     "grid-auto-flow: column",
     "create implicit COLUMNS instead of rows"
    ],
    [
     "grid-auto-columns",
     "size those implicit columns"
    ]
   ],
   "task": "Make the six items flow into one row of six implicit columns, each 8rem wide.",
   "dia": {
    "w": 320,
    "h": 100,
    "frame": [
     8,
     20,
     304,
     60,
     ""
    ],
    "box": [
     [
      16,
      28,
      60,
      44,
      "1"
     ],
     [
      82,
      28,
      60,
      44,
      "2"
     ],
     [
      148,
      28,
      60,
      44,
      "3"
     ],
     [
      214,
      28,
      60,
      44,
      "4"
     ],
     [
      280,
      28,
      26,
      44,
      "5",
      "ghost"
     ]
    ],
    "note": [
     [
      8,
      16,
      "one row, columns created on demand"
     ],
     [
      8,
      94,
      "overflows on purpose — pair with overflow-x: auto"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from .map over [1,2,3,4,5,6]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  gap: .5rem;\n  /* TODO — two declarations */\n}\n.cell { background: aliceblue; padding: 1rem; }\n",
   "hints": [
    "With flow: column, grid creates implicit columns and grid-auto-columns sizes them.",
    "grid-auto-flow: column; grid-auto-columns: 8rem; — add overflow-x: auto to turn it into a horizontal scroller."
   ],
   "sol": "grid-auto-flow: column;\n  grid-auto-columns: 8rem;",
   "why": "This is how horizontal card rails are built. Note it is the auto-COLUMNS property that matters now — the mirror of GRID-02.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4,5,6].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "GRID-11",
   "cat": "grid",
   "title": "Two items, one cell — grid as a stacking context",
   "goal": "A caption sitting on top of an image with no absolute positioning anywhere.",
   "use": [
    [
     "grid-area: 1 / 1",
     "put both children in the same cell"
    ],
    [
     "align-self",
     "push the caption to the bottom of that cell"
    ],
    [
     "DOM order",
     "decide what paints on top — later siblings win, so no z-index is needed"
    ]
   ],
   "task": "Overlay .cap on .img without position: absolute.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     8,
     304,
     104,
     "one cell"
    ],
    "box": [
     [
      16,
      16,
      288,
      88,
      "img"
     ],
     [
      16,
      76,
      288,
      28,
      "cap",
      "hi"
     ]
    ],
    "note": [
     [
      8,
      116,
      "both children: grid-area 1 / 1"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.frame\n         div.img\n         p.cap   text: \"caption\"\n      */}\n    </>\n  );\n}\n",
   "css": ".frame { display: grid; }\n.img { background: steelblue; min-height: 8rem; }\n.cap { background: rgb(0 0 0 / .55); color: white; margin: 0; padding: .5rem; }\n\n.frame > * {\n  /* TODO — same cell */\n}\n.cap {\n  /* TODO — bottom of that cell */\n}\n",
   "hints": [
    "Any two items given the same grid-area occupy the same cell and overlap in DOM order.",
    ".frame > * { grid-area: 1 / 1 } and .cap { align-self: end }. No positioning, no z-index needed — later DOM order already paints on top."
   ],
   "sol": "grid-area: 1 / 1;\n\n/* .cap */ align-self: end;",
   "why": "This replaces the position: relative + absolute + inset: 0 pattern with two lines, and the parent still sizes itself to the image.",
   "markup": "    <div className=\"frame\">\n      <div className=\"img\" />\n      <p className=\"cap\">caption</p>\n    </div>"
  },
  {
   "id": "GRID-12",
   "cat": "grid",
   "title": "subgrid — a child that inherits the parent’s tracks",
   "goal": "Three cards whose titles and buttons line up across cards even though the text lengths differ.",
   "use": [
    [
     "grid-template-rows: subgrid",
     "adopt the parent’s row lines instead of making new ones"
    ],
    [
     "grid-row: span 3",
     "claim the rows to inherit"
    ]
   ],
   "task": "Make each card use the outer grid’s three rows so every title, body and button aligns across all cards.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     304,
     124,
     ""
    ],
    "box": [
     [
      16,
      16,
      92,
      24,
      "title"
     ],
     [
      116,
      16,
      92,
      24,
      "title"
     ],
     [
      216,
      16,
      88,
      24,
      "title"
     ],
     [
      16,
      44,
      92,
      52,
      "body"
     ],
     [
      116,
      44,
      92,
      52,
      "body"
     ],
     [
      216,
      44,
      88,
      52,
      "body"
     ],
     [
      16,
      100,
      92,
      24,
      "btn",
      "hi"
     ],
     [
      116,
      100,
      92,
      24,
      "btn",
      "hi"
     ],
     [
      216,
      100,
      88,
      24,
      "btn",
      "hi"
     ]
    ],
    "note": [
     [
      8,
      138,
      "buttons share a row line across cards"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.cards\n         article.card\n           h3   text: \"One\"\n           p   text: \"short\"\n           button   text: \"go\"\n         article.card\n           h3   text: \"Two with a longer title\"\n           p   text: \"more body text here\"\n           button   text: \"go\"\n         article.card\n           h3   text: \"Three\"\n           p   text: \"mid\"\n           button   text: \"go\"\n      */}\n    </>\n  );\n}\n",
   "css": ".cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto 1fr auto;\n  gap: 1rem;\n}\n.card { display: grid; gap: .5rem; background: aliceblue; padding: 1rem; }\n\n.card {\n  /* TODO — two declarations */\n}\n",
   "hints": [
    "A nested grid normally invents its own rows, which is why the buttons drift.",
    "grid-row: span 3; grid-template-rows: subgrid; — the card claims three of the parent’s rows and then adopts those exact row lines."
   ],
   "sol": "grid-row: span 3;\n  grid-template-rows: subgrid;",
   "why": "Before subgrid this needed identical fixed heights or JavaScript. Baseline across all engines since 2023 — worth one confident sentence in an interview.",
   "markup": "    <div className=\"cards\">\n      <article className=\"card\"><h3>One</h3><p>short</p><button>go</button></article>\n      <article className=\"card\"><h3>Two with a longer title</h3><p>more body text here</p><button>go</button></article>\n      <article className=\"card\"><h3>Three</h3><p>mid</p><button>go</button></article>\n    </div>"
  },
  {
   "id": "GRID-13",
   "cat": "grid",
   "title": "The decision rule, applied",
   "goal": "A page header where the layout is decided by the parent, and a tag row where it is decided by the content.",
   "use": [
    [
     "display: grid",
     "for the header — the parent declares logo / nav / action"
    ],
    [
     "display: flex",
     "for the tags — the count is unknown and they must wrap"
    ]
   ],
   "task": "Two containers, two different answers. Give .bar a three-track grid and .tags a wrapping flex row, then be able to justify each in one sentence.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     304,
     52,
     ".bar — parent decides 3 tracks"
    ],
    "track": [
     [
      16,
      0,
      60,
      "auto"
     ],
     [
      84,
      0,
      150,
      "1fr"
     ],
     [
      242,
      0,
      62,
      "auto"
     ]
    ],
    "box": [
     [
      16,
      20,
      60,
      32,
      "logo"
     ],
     [
      84,
      20,
      150,
      32,
      "nav"
     ],
     [
      242,
      20,
      62,
      32,
      "act"
     ],
     [
      16,
      80,
      70,
      24,
      "tag"
     ],
     [
      92,
      80,
      90,
      24,
      "tag"
     ],
     [
      188,
      80,
      60,
      24,
      "tag"
     ],
     [
      16,
      110,
      110,
      24,
      "tag"
     ]
    ],
    "note": [
     [
      8,
      74,
      ".tags — content decides, so it wraps"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.bar\n         div.logo   text: \"logo\"\n         nav.nav   text: \"nav\"\n         button.act   text: \"act\"\n       div.tags\n         span.tag   x4   from .map over [\"live\",\"beta\",\"new\",\"experimental\"]\n      */}\n    </>\n  );\n}\n",
   "css": ".bar {\n  gap: 1rem;\n  /* TODO — three tracks: auto, 1fr, auto */\n}\n.bar > * { background: aliceblue; padding: .5rem; }\n\n.tags {\n  margin-top: 1rem;\n  /* TODO — the CONTENT decides here, so this is the other answer */\n}\n.tag { background: gainsboro; padding: .25rem .6rem; border-radius: 999px; }\n",
   "hints": [
    "Ask: who knows how many slots there are? If the stylesheet knows, it is grid.",
    "display: grid; grid-template-columns: auto 1fr auto. The header has exactly three known slots. A tag list has an unknown count that must wrap — that is flex."
   ],
   "sol": "/* .bar  */ display: grid;\n  grid-template-columns: auto 1fr auto;\n\n/* .tags */ display: flex;\n  flex-wrap: wrap;\n  gap: .5rem;",
   "why": "Grid when the PARENT decides the tracks, flex when the CONTENT decides. If you find yourself nesting a third container to fake alignment, you needed grid one level up.",
   "markup": "    <>\n      <div className=\"bar\">\n        <div className=\"logo\">logo</div>\n        <nav className=\"nav\">nav</nav>\n        <button className=\"act\">act</button>\n      </div>\n\n      <div className=\"tags\">\n        {[\"live\",\"beta\",\"new\",\"experimental\"].map(t => <span className=\"tag\" key={t}>{t}</span>)}\n      </div>\n    </>"
  },
  {
   "id": "TRK-01",
   "useApp": false,
   "cat": "track",
   "title": "repeat() — say it once",
   "goal": "Twelve equal columns without typing 1fr twelve times.",
   "use": [
    [
     "repeat()",
     "multiply a track definition"
    ]
   ],
   "task": "Write a twelve-column grid in one short declaration.",
   "dia": {
    "w": 320,
    "h": 90,
    "frame": [
     8,
     20,
     304,
     50,
     ""
    ],
    "track": [
     [
      16,
      0,
      288,
      "repeat(12, 1fr)"
     ]
    ],
    "box": [
     [
      16,
      28,
      20,
      34,
      ""
     ],
     [
      40,
      28,
      20,
      34,
      ""
     ],
     [
      64,
      28,
      20,
      34,
      ""
     ],
     [
      88,
      28,
      20,
      34,
      ""
     ],
     [
      112,
      28,
      20,
      34,
      ""
     ],
     [
      136,
      28,
      20,
      34,
      ""
     ],
     [
      160,
      28,
      20,
      34,
      ""
     ],
     [
      184,
      28,
      20,
      34,
      ""
     ],
     [
      208,
      28,
      20,
      34,
      ""
     ],
     [
      232,
      28,
      20,
      34,
      ""
     ],
     [
      256,
      28,
      20,
      34,
      ""
     ],
     [
      280,
      28,
      24,
      34,
      ""
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x12   from Array.from({ length: 12 })\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  gap: .25rem;\n  /* TODO */\n}\n.cell { background: aliceblue; padding: .5rem; text-align: center; }\n",
   "hints": [
    "repeat(count, track).",
    "grid-template-columns: repeat(12, 1fr);"
   ],
   "sol": "grid-template-columns: repeat(12, 1fr);",
   "why": "The twelve-column grid every framework ships is one line of real CSS. That is worth knowing before you reach for one.",
   "markup": "    <div className=\"grid\">\n      {Array.from({ length: 12 }, (_, i) => <div className=\"cell\" key={i}>{i + 1}</div>)}\n    </div>"
  },
  {
   "id": "TRK-02",
   "useApp": false,
   "cat": "track",
   "title": "fr is not % — gaps come out first",
   "goal": "Three columns that stay inside the container once a 1rem gap is added.",
   "use": [
    [
     "fr",
     "divides the space LEFT OVER after gaps"
    ]
   ],
   "task": "The percentage version overflows once gaps are added. Fix it by changing the unit only.",
   "dia": {
    "w": 300,
    "h": 86,
    "frame": [
     4,
     4,
     292,
     60,
     "container"
    ],
    "box": [
     [
      10,
      20,
      86,
      36,
      ""
     ],
     [
      112,
      20,
      86,
      36,
      ""
     ],
     [
      214,
      20,
      86,
      36,
      ""
     ]
    ],
    "note": [
     [
      10,
      76,
      "fr divides what is LEFT after gaps"
     ]
    ],
    "alt": {
     "w": 300,
     "h": 86,
     "frame": [
      4,
      4,
      262,
      60,
      "container"
     ],
     "box": [
      [
       10,
       20,
       86,
       36,
       ""
      ],
      [
       112,
       20,
       86,
       36,
       ""
      ],
      [
       214,
       20,
       86,
       36,
       "",
       "hi"
      ]
     ],
     "note": [
      [
       10,
       76,
       "3 x 33.33% + 2 gaps overflows the right edge"
      ]
     ]
    },
    "labels": [
     "1fr 1fr 1fr — fits",
     "33.33% x3 — overflows"
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x3   from Array.from({ length: 3 })\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: 33.33% 33.33% 33.33%;\n  /* TODO — replace the line above so it fits */\n}\n.cell { background: aliceblue; padding: 1rem; }\n",
   "hints": [
    "Percentages resolve against the container width and know nothing about gaps.",
    "grid-template-columns: repeat(3, 1fr). fr distributes what remains AFTER gaps and fixed tracks, so it can never overflow from gaps alone."
   ],
   "sol": "grid-template-columns: repeat(3, 1fr);",
   "why": "This is why fr exists at all. It is also the honest answer to “why not just use percentages” in an interview.",
   "markup": "    <div className=\"grid\">\n      {Array.from({ length: 3 }, (_, i) => <div className=\"cell\" key={i}>{i + 1}</div>)}\n    </div>"
  },
  {
   "id": "TRK-03",
   "useApp": false,
   "cat": "track",
   "title": "minmax(0, 1fr) — the grid version of min-width: 0",
   "goal": "A two-column grid where a long unbroken string does not widen its column.",
   "use": [
    [
     "minmax()",
     "set a floor and a ceiling for a track"
    ],
    [
     "minmax(0, 1fr)",
     "lift the automatic min-content floor"
    ]
   ],
   "task": "Column one blows out because of a long token. Fix the TRACK, not the item.",
   "dia": {
    "w": 320,
    "h": 110,
    "frame": [
     8,
     10,
     304,
     60,
     ""
    ],
    "box": [
     [
      16,
      18,
      140,
      44,
      "longtext…",
      "hi"
     ],
     [
      164,
      18,
      140,
      44,
      "2"
     ]
    ],
    "note": [
     [
      8,
      88,
      "1fr means minmax(auto, 1fr) — auto floors at min-content"
     ],
     [
      8,
      104,
      "minmax(0, 1fr) removes that floor"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   text: \"Supercalifragilisticexpialid\"\n         div.cell   text: \"2\"\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: 1fr 1fr;\n  /* TODO — replace the line above */\n}\n.cell { background: aliceblue; padding: 1rem; overflow: hidden; text-overflow: ellipsis; }\n",
   "hints": [
    "1fr is shorthand for minmax(auto, 1fr), and auto will not go below min-content.",
    "grid-template-columns: repeat(2, minmax(0, 1fr));"
   ],
   "sol": "grid-template-columns: repeat(2, minmax(0, 1fr));",
   "why": "Exactly the same bug as FLEX-15, one layer up. Recognising the pair — min-width: 0 in flex, minmax(0, 1fr) in grid — is a strong signal.",
   "markup": "    <div className=\"grid\">\n      <div className=\"cell\">Supercalifragilisticexpialidocious_and_then_some</div>\n      <div className=\"cell\">2</div>\n    </div>"
  },
  {
   "id": "TRK-04",
   "useApp": false,
   "cat": "track",
   "title": "auto-fill + minmax — responsive with zero media queries",
   "goal": "Cards that are at least 12rem wide, fill the row, and reflow at every width on their own.",
   "use": [
    [
     "repeat(auto-fill, …)",
     "let the browser compute the column count"
    ],
    [
     "minmax(12rem, 1fr)",
     "a floor of 12rem, then share what is left"
    ]
   ],
   "task": "One declaration. No media query anywhere.",
   "dia": {
    "w": 300,
    "h": 82,
    "frame": [
     4,
     4,
     292,
     74,
     ""
    ],
    "box": [
     [
      10,
      12,
      90,
      28,
      ""
     ],
     [
      104,
      12,
      90,
      28,
      ""
     ],
     [
      198,
      12,
      90,
      28,
      ""
     ],
     [
      10,
      44,
      90,
      28,
      ""
     ],
     [
      104,
      44,
      90,
      28,
      ""
     ]
    ],
    "alt": {
     "w": 300,
     "h": 82,
     "frame": [
      4,
      4,
      150,
      74,
      ""
     ],
     "box": [
      [
       10,
       12,
       64,
       28,
       ""
      ],
      [
       78,
       12,
       64,
       28,
       ""
      ],
      [
       10,
       44,
       64,
       28,
       ""
      ],
      [
       78,
       44,
       64,
       28,
       ""
      ]
     ],
     "note": [
      [
       160,
       20,
       "same rule"
      ],
      [
       160,
       34,
       "no media"
      ],
      [
       160,
       48,
       "query"
      ]
     ]
    },
    "labels": [
     "wide — 3 per row",
     "narrow — 2 per row"
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x6   from Array.from({ length: 6 })\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  gap: 1rem;\n  /* TODO — one line, no media query */\n}\n.cell { background: aliceblue; padding: 1rem; }\n",
   "hints": [
    "repeat() accepts auto-fill or auto-fit in place of a number.",
    "grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));"
   ],
   "sol": "grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));",
   "why": "The highest-leverage line in modern CSS. It responds to the CONTAINER, which is why it keeps working inside a sidebar where a media query would not.",
   "markup": "    <div className=\"grid\">\n      {Array.from({ length: 6 }, (_, i) => <div className=\"cell\" key={i}>{i + 1}</div>)}\n    </div>"
  },
  {
   "id": "TRK-05",
   "useApp": false,
   "cat": "track",
   "title": "auto-fit vs auto-fill — the difference is empty tracks",
   "goal": "Two grids, three cards each, side by side: one stretches the cards, one leaves gaps at the end.",
   "use": [
    [
     "auto-fit",
     "collapse empty tracks so items stretch"
    ],
    [
     "auto-fill",
     "keep empty tracks so items stay at their floor"
    ]
   ],
   "task": "Both grids hold TWO cards in a row with space for about four tracks. Make .fit stretch its two cards across the whole row, and .fill leave the unused tracks empty. Use a 6rem floor — the two rules differ by one keyword.",
   "dia": {
    "w": 300,
    "h": 80,
    "frame": [
     4,
     4,
     292,
     72,
     "2 cards, room for 4"
    ],
    "box": [
     [
      10,
      26,
      138,
      40,
      "1"
     ],
     [
      154,
      26,
      138,
      40,
      "2"
     ]
    ],
    "note": [
     [
      10,
      16,
      "empty tracks collapse — cards stretch"
     ]
    ],
    "alt": {
     "w": 300,
     "h": 80,
     "frame": [
      4,
      4,
      292,
      72,
      "2 cards, room for 4"
     ],
     "box": [
      [
       10,
       26,
       64,
       40,
       "1"
      ],
      [
       80,
       26,
       64,
       40,
       "2"
      ],
      [
       150,
       26,
       64,
       40,
       "",
       "ghost"
      ],
      [
       220,
       26,
       64,
       40,
       "",
       "ghost"
      ]
     ],
     "note": [
      [
       10,
       16,
       "empty tracks kept — cards stay at 6rem"
      ]
     ]
    },
    "labels": [
     "auto-fit",
     "auto-fill"
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       p.lab   text: \"auto-fit\"\n       div.grid.fit\n         div.cell   x2   from .map over [1,2]\n       p.lab   text: \"auto-fill\"\n       div.grid.fill\n         div.cell   x2   from .map over [1,2]\n      */}\n    </>\n  );\n}\n",
   "css": "/* Two cards, room for four tracks — that is the only situation where the two\n   keywords differ. Fill the row with items and they behave identically. */\n.grid { display: grid; gap: 1rem; margin-bottom: 1rem; }\n.cell { background: aliceblue; padding: 1rem; }\n.lab { margin: 0 0 .25rem; font: 700 .7rem ui-monospace, monospace; color: dimgray; }\n\n.fit {\n  /* TODO — 6rem floor, and the two cards STRETCH to fill the row */\n}\n.fill {\n  /* TODO — 6rem floor, and the empty tracks are KEPT */\n}\n",
   "hints": [
    "Both create as many tracks as fit. They differ only in what happens to the tracks that ended up empty.",
    ".fit uses repeat(auto-fit, minmax(6rem, 1fr)) — empty tracks collapse to 0 so the 1fr of the remaining tracks absorbs the space, and the two cards stretch wide. .fill uses auto-fill — the empty tracks stay at 6rem each, so the two cards stop at 6rem and the rest of the row is blank."
   ],
   "sol": "/* fit  */ grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));\n/* fill */ grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));",
   "why": "With enough items to fill the row they are identical — the difference only shows when items run out. That is the exact question an interviewer asks.",
   "markup": "    <>\n      <p className=\"lab\">auto-fit</p>\n      <div className=\"grid fit\">\n        {[1,2].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n      </div>\n      <p className=\"lab\">auto-fill</p>\n      <div className=\"grid fill\">\n        {[1,2].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n      </div>\n    </>"
  },
  {
   "id": "TRK-06",
   "useApp": false,
   "cat": "track",
   "title": "min() inside minmax — surviving a 320px phone",
   "goal": "The auto-fit gallery that does not overflow when the viewport is narrower than the 20rem floor.",
   "use": [
    [
     "min()",
     "pick the smaller of two values at compute time"
    ],
    [
     "minmax(min(100%, 20rem), 1fr)",
     "floor that can never exceed the container"
    ]
   ],
   "task": "A 20rem floor overflows a 320px screen. Fix the floor without a media query.",
   "dia": {
    "w": 300,
    "h": 80,
    "frame": [
     4,
     4,
     180,
     52,
     "320px screen"
    ],
    "box": [
     [
      10,
      14,
      168,
      32,
      "fits"
     ]
    ],
    "note": [
     [
      10,
      66,
      "min(100%, 20rem) clamps the floor"
     ]
    ],
    "alt": {
     "w": 300,
     "h": 80,
     "frame": [
      4,
      4,
      180,
      52,
      "320px screen"
     ],
     "box": [
      [
       10,
       14,
       240,
       32,
       "20rem floor — overflows",
       "hi"
      ]
     ],
     "note": [
      [
       10,
       66,
       "a hard 20rem floor cannot shrink"
      ]
     ]
    },
    "labels": [
     "with min()",
     "without"
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x4   from Array.from({ length: 4 })\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));\n  /* TODO — replace the line above so it never overflows */\n}\n.cell { background: aliceblue; padding: 1rem; }\n",
   "hints": [
    "The minimum in minmax() is a hard floor — the track will not go below it even if the container is smaller.",
    "grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));"
   ],
   "sol": "grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));",
   "why": "The famous auto-fit one-liner has this exact bug, and most tutorials never mention it. Knowing the fix is a differentiator.",
   "markup": "    <div className=\"grid\">\n      {Array.from({ length: 4 }, (_, i) => <div className=\"cell\" key={i}>{i + 1}</div>)}\n    </div>"
  },
  {
   "id": "TRK-07",
   "cat": "track",
   "title": "auto tracks — content-sized rails around a fluid middle",
   "goal": "A toolbar whose left and right groups are exactly as wide as their content and whose middle absorbs the rest.",
   "use": [
    [
     "auto",
     "size the track to its content"
    ],
    [
     "1fr",
     "give the remaining space to the middle track"
    ]
   ],
   "task": "Three tracks: content, fluid, content. No fixed widths anywhere.",
   "dia": {
    "w": 320,
    "h": 100,
    "frame": [
     8,
     20,
     304,
     50,
     ""
    ],
    "track": [
     [
      16,
      0,
      58,
      "auto"
     ],
     [
      80,
      0,
      166,
      "1fr"
     ],
     [
      252,
      0,
      52,
      "auto"
     ]
    ],
    "box": [
     [
      16,
      28,
      58,
      34,
      "back"
     ],
     [
      80,
      28,
      166,
      34,
      "title"
     ],
     [
      252,
      28,
      52,
      34,
      "save"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.bar\n         button   text: \"back\"\n         h2.title   text: \"Title\"\n         button   text: \"save\"\n      */}\n    </>\n  );\n}\n",
   "css": ".bar {\n  display: grid;\n  gap: 1rem;\n  align-items: center;\n  /* TODO — content, fluid, content */\n}\n.title { margin: 0; background: aliceblue; }\n",
   "hints": [
    "An auto track is sized by its content; a 1fr track takes what is left.",
    "grid-template-columns: auto 1fr auto;"
   ],
   "sol": "grid-template-columns: auto 1fr auto;",
   "why": "auto / 1fr / auto is the single most reusable three-track pattern: app bars, list rows, form rows, table-like layouts.",
   "markup": "    <div className=\"bar\">\n      <button>back</button>\n      <h2 className=\"title\">Title</h2>\n      <button>save</button>\n    </div>"
  },
  {
   "id": "PLC-01",
   "useApp": false,
   "cat": "place",
   "title": "place-items: center — the two-line centring",
   "goal": "One box dead centre of a 12rem-tall container.",
   "use": [
    [
     "place-items",
     "align-items and justify-items in one declaration"
    ]
   ],
   "task": "Centre the child both ways in two lines of CSS total.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ".box  height 12rem"
    ],
    "box": [
     [
      116,
      48,
      88,
      34,
      "centred",
      "hi"
     ]
    ],
    "note": [
     [
      8,
      128,
      "place-items: <align> <justify>"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.box\n         div.thing   text: \"centred\"\n      */}\n    </>\n  );\n}\n",
   "css": ".box {\n  height: 12rem;\n  background: whitesmoke;\n  /* TODO — two lines total */\n}\n.thing { background: steelblue; color: white; padding: 1rem; }\n",
   "hints": [
    "display: grid plus one more declaration.",
    "display: grid; place-items: center; — one value applies to both axes."
   ],
   "sol": "display: grid;\n  place-items: center;",
   "why": "The shortest true centring in CSS. Worth having in your fingers — it comes up in almost every coding round.",
   "markup": "    <div className=\"box\">\n      <div className=\"thing\">centred</div>\n    </div>"
  },
  {
   "id": "PLC-02",
   "useApp": false,
   "cat": "place",
   "title": "place-content vs place-items",
   "goal": "A 2×2 grid of small fixed-size cells sitting as a block in the centre of a large container.",
   "use": [
    [
     "place-content",
     "position the whole TRACK GRID inside the container"
    ],
    [
     "place-items",
     "position each item inside its own cell"
    ]
   ],
   "task": "The tracks are 4rem each and the container is much bigger. Centre the grid itself, not the items in their cells.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     304,
     134,
     "container"
    ],
    "box": [
     [
      104,
      42,
      52,
      30,
      "1"
     ],
     [
      164,
      42,
      52,
      30,
      "2"
     ],
     [
      104,
      78,
      52,
      30,
      "3"
     ],
     [
      164,
      78,
      52,
      30,
      "4"
     ]
    ],
    "note": [
     [
      8,
      146,
      "the whole track block is centred, cells stay 4rem"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x4   from .map over [1,2,3,4]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: 4rem 4rem;\n  grid-template-rows: 4rem 4rem;\n  gap: .5rem;\n  height: 14rem;\n  background: whitesmoke;\n  /* TODO */\n}\n.cell { background: aliceblue; }\n",
   "hints": [
    "If the tracks do not fill the container there is leftover space around the whole grid. That is what place-content distributes.",
    "place-content: center. place-items would centre each cell’s contents and leave the grid itself in the top-left."
   ],
   "sol": "place-content: center;",
   "why": "content = the tracks, items = the things in the tracks, self = this one item. That three-way split holds for justify-, align- and place-.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "PLC-03",
   "cat": "place",
   "title": "place-self — one item opts out",
   "goal": "A centred grid where a single item is pinned to the top-left of its cell.",
   "use": [
    [
     "place-self",
     "align-self and justify-self in one declaration"
    ]
   ],
   "task": "Keep place-items: center on the container and pin only item 3 to the start of both axes.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     "place-items: center"
    ],
    "box": [
     [
      16,
      16,
      92,
      44,
      "",
      "ghost"
     ],
     [
      46,
      30,
      32,
      16,
      "1"
     ],
     [
      116,
      16,
      92,
      44,
      "",
      "ghost"
     ],
     [
      146,
      30,
      32,
      16,
      "2"
     ],
     [
      216,
      16,
      88,
      44,
      "",
      "ghost"
     ],
     [
      220,
      20,
      32,
      16,
      "3",
      "hi"
     ],
     [
      16,
      68,
      92,
      44,
      "",
      "ghost"
     ],
     [
      46,
      82,
      32,
      16,
      "4"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.cell   x4   from .map over [1,2,3,4]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: 4rem;\n  gap: .5rem;\n  place-items: center;\n}\n.cell { background: aliceblue; padding: .25rem .5rem; }\n\n.cell:nth-child(3) {\n  /* TODO */\n}\n",
   "hints": [
    "place-self takes the same two values in the same order: align then justify.",
    "place-self: start; — one value sets both axes."
   ],
   "sol": "place-self: start;",
   "why": "Knowing the -self layer exists for all three families means you never have to restructure markup to make one element behave differently.",
   "markup": "    <div className=\"grid\">\n      {[1,2,3,4].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "ARE-01",
   "cat": "areas",
   "title": "grid-template-areas — layout you can read out loud",
   "goal": "Header across the top, sidebar left, main right, footer across the bottom.",
   "use": [
    [
     "grid-template-areas",
     "name the regions in a picture"
    ],
    [
     "grid-area",
     "assign each child to a name"
    ]
   ],
   "task": "Write the area map and give each of the four children its name. The map itself should look like the layout.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     304,
     134,
     ""
    ],
    "box": [
     [
      16,
      16,
      288,
      28,
      "header"
     ],
     [
      16,
      52,
      84,
      54,
      "sidebar"
     ],
     [
      108,
      52,
      196,
      54,
      "main"
     ],
     [
      16,
      114,
      288,
      20,
      "footer"
     ]
    ],
    "note": [
     [
      8,
      148,
      "the string literally draws the page"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.shell\n         header.hd   text: \"header\"\n         aside.sb   text: \"sidebar\"\n         main.mn   text: \"main\"\n         footer.ft   text: \"footer\"\n      */}\n    </>\n  );\n}\n",
   "css": ".shell {\n  display: grid;\n  grid-template-columns: 12rem 1fr;\n  gap: .5rem;\n  /* TODO — the area map */\n}\n.shell > * { background: aliceblue; padding: .5rem; }\n\n.hd { /* TODO */ }\n.sb { /* TODO */ }\n.mn { /* TODO */ }\n.ft { /* TODO */ }\n",
   "hints": [
    "Each quoted string is one row; each word in it is one column.",
    "grid-template-areas: \"hd hd\" \"sb mn\" \"ft ft\"; then ONE name per child — .hd { grid-area: hd }, .sb { grid-area: sb }, and so on. (Written with slashes, grid-area means row-start / column-start / row-end / column-end — a different property entirely. With a single value it is an area name.) Repeating a name across cells makes it span them."
   ],
   "sol": "grid-template-areas:\n    \"hd hd\"\n    \"sb mn\"\n    \"ft ft\";\n\n.hd { grid-area: hd; }\n.sb { grid-area: sb; }\n.mn { grid-area: mn; }\n.ft { grid-area: ft; }",
   "why": "The most reviewable layout syntax in CSS: a reader sees the page shape in the stylesheet without running it.",
   "markup": "    <div className=\"shell\">\n      <header className=\"hd\">header</header>\n      <aside className=\"sb\">sidebar</aside>\n      <main className=\"mn\">main</main>\n      <footer className=\"ft\">footer</footer>\n    </div>"
  },
  {
   "id": "ARE-02",
   "useApp": false,
   "cat": "areas",
   "title": "The dot — a deliberately empty cell",
   "goal": "A 2×2 layout where the bottom-left cell is intentionally empty.",
   "use": [
    [
     "a dot in the area map",
     "names a cell that stays deliberately empty"
    ]
   ],
   "task": "Leave the bottom-left cell empty using the area map alone. Do not add an empty div.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     304,
     124,
     ""
    ],
    "box": [
     [
      16,
      16,
      140,
      50,
      "a"
     ],
     [
      164,
      16,
      140,
      50,
      "b"
     ],
     [
      164,
      74,
      140,
      50,
      "c"
     ]
    ],
    "note": [
     [
      40,
      104,
      ".  (empty)"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.a   text: \"a\"\n         div.b   text: \"b\"\n         div.c   text: \"c\"\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: .5rem;\n  /* TODO — leave the bottom-left empty */\n}\n.grid > * { background: aliceblue; padding: 1rem; }\n.a { grid-area: a; }\n.b { grid-area: b; }\n.c { grid-area: c; }\n",
   "hints": [
    "A single . (or a run like ...) marks a cell with no name.",
    "grid-template-areas: \"a b\" \". c\";"
   ],
   "sol": "grid-template-areas:\n    \"a b\"\n    \". c\";",
   "why": "Spacer divs are a markup smell. The dot keeps the emptiness in the stylesheet where it belongs.",
   "markup": "    <div className=\"grid\">\n      <div className=\"a\">a</div>\n      <div className=\"b\">b</div>\n      <div className=\"c\">c</div>\n    </div>"
  },
  {
   "id": "ARE-03",
   "useApp": false,
   "cat": "areas",
   "title": "Spanning by repetition",
   "goal": "A hero filling the left column across the first two rows, with a and b stacked beside it.",
   "use": [
    [
     "grid-template-areas",
     "repeat a name to span cells"
    ]
   ],
   "task": "Make .hero span two ROWS of the left column by repeating its name down the map, and make c span both columns. Every row string must have the same number of columns.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     304,
     124,
     ""
    ],
    "box": [
     [
      16,
      16,
      196,
      72,
      "hero",
      "hi"
     ],
     [
      220,
      16,
      84,
      34,
      "a"
     ],
     [
      220,
      54,
      84,
      34,
      "b"
     ],
     [
      16,
      96,
      288,
      28,
      "c"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.hero   text: \"hero\"\n         div.a   text: \"a\"\n         div.b   text: \"b\"\n         div.c   text: \"c\"\n      */}\n    </>\n  );\n}\n",
   "css": ".grid {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: .5rem;\n  /* TODO */\n}\n.grid > * { background: aliceblue; padding: 1rem; }\n.hero { grid-area: hero; }\n.a { grid-area: a; }\n.b { grid-area: b; }\n.c { grid-area: c; }\n",
   "hints": [
    "The same name in adjacent cells becomes one rectangular area. It must stay a rectangle — an L shape is invalid and the whole map is ignored.",
    "grid-template-areas: \"hero a\" \"hero b\" \"c c\";"
   ],
   "sol": "grid-template-areas:\n    \"hero a\"\n    \"hero b\"\n    \"c c\";",
   "why": "The rectangle rule is the gotcha: one malformed map silently drops the entire declaration and you get auto-placement instead.",
   "markup": "    <div className=\"grid\">\n      <div className=\"hero\">hero</div>\n      <div className=\"a\">a</div>\n      <div className=\"b\">b</div>\n      <div className=\"c\">c</div>\n    </div>"
  },
  {
   "id": "ARE-04",
   "cat": "areas",
   "title": "Rearranging at a breakpoint — map only",
   "goal": "The same four elements: sidebar beside main on desktop, stacked below the header on mobile.",
   "use": [
    [
     "grid-template-areas",
     "redraw the layout inside a media query"
    ],
    [
     "grid-template-columns",
     "collapse to one column"
    ]
   ],
   "task": "Inside the media query, change only the map and the columns. Do not touch a single grid-area on the children.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     150,
     134,
     "wide"
    ],
    "box": [
     [
      14,
      14,
      138,
      22,
      "hd"
     ],
     [
      14,
      42,
      44,
      74,
      "sb"
     ],
     [
      64,
      42,
      88,
      74,
      "mn"
     ],
     [
      14,
      122,
      138,
      16,
      "ft"
     ],
     [
      172,
      14,
      140,
      22,
      "hd"
     ],
     [
      172,
      42,
      140,
      26,
      "sb",
      "hi"
     ],
     [
      172,
      74,
      140,
      42,
      "mn"
     ],
     [
      172,
      122,
      140,
      16,
      "ft"
     ]
    ],
    "note": [
     [
      172,
      8,
      "narrow — same children"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.shell\n         header.hd   text: \"header\"\n         aside.sb   text: \"sidebar\"\n         main.mn   text: \"main\"\n         footer.ft   text: \"footer\"\n      */}\n    </>\n  );\n}\n",
   "css": ".shell {\n  display: grid;\n  gap: .5rem;\n  grid-template-columns: 12rem 1fr;\n  grid-template-areas: \"hd hd\" \"sb mn\" \"ft ft\";\n}\n.shell > * { background: aliceblue; padding: .5rem; }\n.hd { grid-area: hd; } .sb { grid-area: sb; }\n.mn { grid-area: mn; } .ft { grid-area: ft; }\n\n@media (width < 40rem) {\n  .shell {\n    /* TODO — one column, stacked */\n  }\n}\n",
   "hints": [
    "One column means every row string has exactly one name.",
    "grid-template-columns: 1fr; grid-template-areas: \"hd\" \"sb\" \"mn\" \"ft\";"
   ],
   "sol": "grid-template-columns: 1fr;\n    grid-template-areas:\n      \"hd\"\n      \"sb\"\n      \"mn\"\n      \"ft\";",
   "why": "The children never learn about the breakpoint. All responsive knowledge stays in one place — that is what makes this maintainable.",
   "markup": "    <div className=\"shell\">\n      <header className=\"hd\">header</header>\n      <aside className=\"sb\">sidebar</aside>\n      <main className=\"mn\">main</main>\n      <footer className=\"ft\">footer</footer>\n    </div>"
  },
  {
   "id": "CQ-01",
   "cat": "cq",
   "title": "container-type — opting a parent in",
   "goal": "A card that goes from stacked to side-by-side based on the width of its own parent.",
   "use": [
    [
     "container-type: inline-size",
     "let children query this element’s inline size"
    ],
    [
     "@container",
     "the query itself"
    ]
   ],
   "task": "Make .card lay its thumbnail beside its body once the CARD’s container is at least 24rem wide.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     150,
     80,
     "container ≥ 24rem"
    ],
    "box": [
     [
      14,
      14,
      44,
      68,
      "img"
     ],
     [
      64,
      14,
      88,
      68,
      "body"
     ],
     [
      172,
      14,
      140,
      30,
      "img"
     ],
     [
      172,
      50,
      140,
      54,
      "body"
     ]
    ],
    "note": [
     [
      172,
      8,
      "container < 24rem"
     ],
     [
      8,
      140,
      "the VIEWPORT is not consulted at all"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.col\n         article.card\n           img.thumb   alt=\"\"\n           div.body\n             h3   text: \"Title\"\n             p   text: \"Body copy.\"\n      */}\n    </>\n  );\n}\n",
   "css": ".col {\n  /* TODO — opt this element in as a query container */\n}\n.card { display: grid; gap: .5rem; background: aliceblue; padding: .5rem; }\n.thumb { background: steelblue; min-height: 4rem; }\n\n/* TODO — at container width 24rem and up, two columns */\n",
   "hints": [
    "A container query needs an ancestor that has declared itself a container. Nothing queries by default.",
    ".col { container-type: inline-size } then @container (width >= 24rem) { .card { grid-template-columns: 8rem 1fr } }"
   ],
   "sol": ".col { container-type: inline-size; }\n\n@container (width >= 24rem) {\n  .card { grid-template-columns: 8rem 1fr; }\n}",
   "why": "inline-size means “size me from my inline axis only” — it avoids the circular layout problem that made this impossible before.",
   "markup": "    <div className=\"col\">\n      <article className=\"card\">\n          <img className=\"thumb\" alt=\"\" />\n          <div className=\"body\"><h3>Title</h3><p>Body copy.</p></div>\n        </article>\n    </div>"
  },
  {
   "id": "CQ-02",
   "cat": "cq",
   "title": "container-name — querying a specific ancestor",
   "goal": "A card that answers to the page shell, not to the nearest wrapper.",
   "use": [
    [
     "container-name",
     "label a container"
    ],
    [
     "container",
     "the shorthand: name / type"
    ],
    [
     "@container <name> (…)",
     "query that named one"
    ]
   ],
   "task": "Two nested containers wrap the card. Query the OUTER one by name.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     304,
     124,
     "shell  ← queried"
    ],
    "box": [
     [
      20,
      26,
      280,
      96,
      "",
      "ghost"
     ],
     [
      28,
      44,
      264,
      70,
      "card",
      "hi"
     ]
    ],
    "note": [
     [
      24,
      40,
      "inner wrapper — not queried"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.shell\n         div.inner\n           article.card\n             img.thumb   alt=\"\"\n             div.body\n               h3   text: \"Title\"\n               p   text: \"Body copy.\"\n      */}\n    </>\n  );\n}\n",
   "css": ".shell {\n  /* TODO — name it \"page\" and make it a container */\n}\n.inner { container-type: inline-size; }\n.card { display: grid; gap: .5rem; background: aliceblue; padding: .5rem; }\n.thumb { background: steelblue; min-height: 3rem; }\n\n/* TODO — query the container named page */\n",
   "hints": [
    "container: <name> / <type> is the shorthand.",
    ".shell { container: page / inline-size } then @container page (width >= 30rem) { … }. Without the name the query binds to the NEAREST container, which is .inner."
   ],
   "sol": ".shell { container: page / inline-size; }\n\n@container page (width >= 30rem) {\n  .card { grid-template-columns: 8rem 1fr; }\n}",
   "why": "Nested containers are the normal case in a real app. Names are how you avoid accidentally querying a wrapper you did not mean.",
   "markup": "    <div className=\"shell\">\n      <div className=\"inner\">\n        <article className=\"card\">\n          <img className=\"thumb\" alt=\"\" />\n          <div className=\"body\"><h3>Title</h3><p>Body copy.</p></div>\n        </article>\n      </div>\n    </div>"
  },
  {
   "id": "CQ-03",
   "cat": "cq",
   "title": "One component, two contexts",
   "goal": "The identical card markup rendering wide in main and stacked in a narrow sidebar — at the same viewport width.",
   "use": [
    [
     "container-type",
     "on both the sidebar and the main column"
    ],
    [
     "@container",
     "a single rule that serves both"
    ]
   ],
   "task": "Write ONE @container rule. The same card must be two-column in main and one-column in the sidebar without any extra class.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     110,
     124,
     "sidebar"
    ],
    "box": [
     [
      14,
      26,
      98,
      30,
      "img"
     ],
     [
      14,
      62,
      98,
      64,
      "body"
     ],
     [
      130,
      26,
      80,
      100,
      "img"
     ],
     [
      216,
      26,
      96,
      100,
      "body"
     ]
    ],
    "note": [
     [
      130,
      18,
      "main — same CSS, same viewport"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.layout\n         aside.side\n           article.card\n             img.thumb   alt=\"\"\n             div.body\n               h3   text: \"Title\"\n               p   text: \"Body copy.\"\n         main.main\n           article.card\n             img.thumb   alt=\"\"\n             div.body\n               h3   text: \"Title\"\n               p   text: \"Body copy.\"\n      */}\n    </>\n  );\n}\n",
   "css": ".layout { display: grid; grid-template-columns: 12rem 1fr; gap: 1rem; }\n.card { display: grid; gap: .5rem; background: aliceblue; padding: .5rem; }\n.thumb { background: steelblue; min-height: 3rem; }\n\n.side, .main {\n  /* TODO — one declaration */\n}\n\n/* TODO — one rule that serves both */\n",
   "hints": [
    "If both columns are containers, the same query resolves differently in each.",
    ".side, .main { container-type: inline-size } plus @container (width >= 20rem) { .card { grid-template-columns: 6rem 1fr } }. The sidebar is 12rem so it never matches; main does."
   ],
   "sol": ".side, .main { container-type: inline-size; }\n\n@container (width >= 20rem) {\n  .card { grid-template-columns: 6rem 1fr; }\n}",
   "why": "This is the argument for container queries in one screen. A media query cannot express it, because the viewport is identical in both cases.",
   "markup": "    <div className=\"layout\">\n      <aside className=\"side\">\n        <article className=\"card\">\n          <img className=\"thumb\" alt=\"\" />\n          <div className=\"body\"><h3>Title</h3><p>Body copy.</p></div>\n        </article>\n      </aside>\n      <main className=\"main\">\n        <article className=\"card\">\n          <img className=\"thumb\" alt=\"\" />\n          <div className=\"body\"><h3>Title</h3><p>Body copy.</p></div>\n        </article>\n      </main>\n    </div>"
  },
  {
   "id": "CQ-04",
   "cat": "cq",
   "title": "cqi — sizing from the container, not the viewport",
   "goal": "A heading that scales with the width of its card rather than the window.",
   "use": [
    [
     "cqi",
     "1% of the container’s inline size"
    ],
    [
     "clamp()",
     "keep the fluid value inside sane bounds"
    ]
   ],
   "task": "Give .card h3 a font-size that is fluid against its container, floored at 1rem and capped at 1.75rem.",
   "dia": {
    "w": 180,
    "h": 74,
    "frame": [
     4,
     4,
     172,
     66,
     "narrow card"
    ],
    "box": [
     [
      10,
      24,
      160,
      18,
      "Title"
     ]
    ],
    "note": [
     [
      10,
      58,
      "5cqi of a small container"
     ]
    ],
    "alt": {
     "w": 300,
     "h": 74,
     "frame": [
      4,
      4,
      292,
      66,
      "wide card"
     ],
     "box": [
      [
       10,
       20,
       280,
       26,
       "Title",
       "hi"
      ]
     ],
     "note": [
      [
       10,
       58,
       "same rule, larger container → larger type"
      ]
     ]
    },
    "labels": [
     "narrow",
     "wide"
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.col\n         article.card\n           img.thumb   alt=\"\"\n           div.body\n             h3   text: \"Title\"\n             p   text: \"Body copy.\"\n      */}\n    </>\n  );\n}\n",
   "css": ".col { container-type: inline-size; }\n.card { background: aliceblue; padding: 1rem; }\n\n.card h3 {\n  /* TODO — fluid against the CONTAINER */\n}\n",
   "hints": [
    "cqi is to the container what vi is to the viewport. cqw, cqh and cqb exist too.",
    "font-size: clamp(1rem, 5cqi, 1.75rem);"
   ],
   "sol": "font-size: clamp(1rem, 5cqi, 1.75rem);",
   "why": "Container units make a component truly self-contained: drop it anywhere and its internal scale follows the space it was given.",
   "markup": "    <div className=\"col\">\n      <article className=\"card\">\n          <img className=\"thumb\" alt=\"\" />\n          <div className=\"body\"><h3>Title</h3><p>Body copy.</p></div>\n        </article>\n    </div>"
  },
  {
   "id": "CQ-05",
   "cat": "cq",
   "title": "Container query or media query — choosing correctly",
   "goal": "Page gutters that follow the viewport, and a card that follows its container.",
   "use": [
    [
     "@media",
     "for page-level decisions — gutters, column count of the shell"
    ],
    [
     "@container",
     "for component-level decisions — how a card arranges itself"
    ]
   ],
   "task": "Set the page gutter with a media query and the card’s internal layout with a container query. Getting the split right is the whole exercise.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     304,
     124,
     "viewport decides the gutter"
    ],
    "box": [
     [
      30,
      26,
      260,
      96,
      "",
      "ghost"
     ],
     [
      38,
      42,
      244,
      72,
      "card decides its own layout",
      "hi"
     ]
    ],
    "gap": [
     [
      8,
      20,
      22,
      "gutter",
      1
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.page\n         div.col\n           article.card\n             img.thumb   alt=\"\"\n             div.body\n               h3   text: \"Title\"\n               p   text: \"Body copy.\"\n      */}\n    </>\n  );\n}\n",
   "css": ".page { padding-inline: 1rem; }\n.col { container-type: inline-size; }\n.card { display: grid; gap: .5rem; background: aliceblue; padding: .5rem; }\n.thumb { background: steelblue; min-height: 3rem; }\n\n/* TODO — media query: gutter 3rem from 60rem up */\n\n/* TODO — container query: two columns from 24rem up */\n",
   "hints": [
    "Ask what the decision actually depends on. Gutters depend on the window. A card’s arrangement depends on the space the card was handed.",
    "@media (width >= 60rem) { .page { padding-inline: 3rem } } and @container (width >= 24rem) { .card { grid-template-columns: 8rem 1fr } }"
   ],
   "sol": "@media (width >= 60rem) { .page { padding-inline: 3rem; } }\n\n@container (width >= 24rem) { .card { grid-template-columns: 8rem 1fr; } }",
   "why": "“When would you NOT use a container query?” is the follow-up. Page chrome is a viewport concern; components are a container concern.",
   "markup": "    <div className=\"page\">\n      <div className=\"col\">\n        <article className=\"card\">\n          <img className=\"thumb\" alt=\"\" />\n          <div className=\"body\"><h3>Title</h3><p>Body copy.</p></div>\n        </article>\n      </div>\n    </div>"
  },
  {
   "id": "POS-01",
   "cat": "pos",
   "title": "relative — moves the paint, keeps the space",
   "goal": "A badge nudged 8px up and left, with the layout completely unchanged.",
   "use": [
    [
     "position: relative",
     "offset from the element’s normal position"
    ],
    [
     "top",
     "the offset"
    ]
   ],
   "task": "Nudge .badge up by 8px. The siblings must not move at all.",
   "dia": {
    "w": 320,
    "h": 110,
    "frame": [
     8,
     10,
     304,
     60,
     ""
    ],
    "box": [
     [
      16,
      26,
      80,
      34,
      "a"
     ],
     [
      102,
      26,
      80,
      34,
      "",
      "ghost"
     ],
     [
      102,
      18,
      80,
      34,
      "b",
      "hi"
     ],
     [
      188,
      26,
      80,
      34,
      "c"
     ]
    ],
    "note": [
     [
      8,
      88,
      "the ghost is the space b still occupies"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         span   text: \"a\"\n         span.badge   text: \"b\"\n         span   text: \"c\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: .5rem; }\n.row > span { background: aliceblue; padding: .5rem 1rem; }\n\n.badge {\n  /* TODO — up 8px, nobody moves */\n}\n",
   "hints": [
    "relative offsets are visual only; the element keeps its original box in the flow.",
    "position: relative; top: -8px;"
   ],
   "sol": "position: relative;\n  top: -8px;",
   "why": "The reason relative is safe for nudges and dangerous for layout: the space is still reserved, so overlaps are silent.",
   "markup": "    <div className=\"row\">\n      <span>a</span>\n      <span className=\"badge\">b</span>\n      <span>c</span>\n    </div>"
  },
  {
   "id": "POS-02",
   "cat": "pos",
   "title": "absolute — measured from the nearest POSITIONED ancestor",
   "goal": "A “NEW” ribbon pinned to the top-right corner of its own card, not the page.",
   "use": [
    [
     "position: relative",
     "on the parent, to become the containing block"
    ],
    [
     "position: absolute",
     "on the ribbon"
    ],
    [
     "top / right",
     "the offsets"
    ]
   ],
   "task": "Pin the ribbon to its card’s corner. You must add a declaration to the PARENT for this to work.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     10,
     304,
     90,
     ".card  position: relative"
    ],
    "box": [
     [
      236,
      16,
      70,
      20,
      "NEW",
      "hi"
     ],
     [
      16,
      40,
      180,
      50,
      "content"
     ]
    ],
    "note": [
     [
      8,
      112,
      "without relative on the card it pins to the page instead"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card\n         span.ribbon   text: \"NEW\"\n         p   text: \"content\"\n      */}\n    </>\n  );\n}\n",
   "css": ".card {\n  background: aliceblue;\n  padding: 1rem;\n  /* TODO — become the containing block */\n}\n\n.ribbon {\n  background: darkorange;\n  color: white;\n  padding: .2rem .5rem;\n  /* TODO — pin to the top-right */\n}\n",
   "hints": [
    "An absolutely positioned element looks up the tree for the nearest ancestor whose position is not static.",
    ".card { position: relative } and .ribbon { position: absolute; top: 0; right: 0 }."
   ],
   "sol": ".card { position: relative; }\n.ribbon { position: absolute; top: 0; right: 0; }",
   "why": "“Relative parent, absolute child” is the single most-used positioning idiom, and the containing-block rule is what makes it work.",
   "markup": "    <div className=\"card\">\n      <span className=\"ribbon\">NEW</span>\n      <p>content</p>\n    </div>"
  },
  {
   "id": "POS-03",
   "cat": "pos",
   "title": "No positioned ancestor — falling through to the page",
   "goal": "Understanding where an absolute element lands when nothing above it is positioned.",
   "use": [
    [
     "position: absolute",
     "with every ancestor left static"
    ]
   ],
   "task": "Do not add position: relative anywhere. Pin .thing to top: 0; left: 0 and state which box it is measured against.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     "initial containing block ≈ the viewport"
    ],
    "box": [
     [
      10,
      10,
      60,
      20,
      "thing",
      "hi"
     ],
     [
      40,
      50,
      240,
      60,
      ".card (static)",
      "ghost"
     ]
    ],
    "note": [
     [
      8,
      126,
      "it escapes the card entirely"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card\n         span.thing   text: \"thing\"\n         p   text: \"content\"\n      */}\n    </>\n  );\n}\n",
   "css": ".card { background: aliceblue; padding: 1rem; margin-top: 3rem; }\n\n.thing {\n  background: darkorange;\n  color: white;\n  /* TODO — pin top-left, add nothing to .card */\n}\n",
   "hints": [
    "If no ancestor is positioned, the search reaches the initial containing block — a viewport-sized box at the document origin.",
    "position: absolute; top: 0; left: 0; — it lands at the top-left of the PAGE, not the card. This is the “my tooltip flew to the corner” bug."
   ],
   "sol": "position: absolute;\n  top: 0;\n  left: 0;",
   "why": "Most positioning bugs are this: the containing block is not what you assumed. Always name the containing block before you debug offsets.",
   "markup": "    <div className=\"card\">\n      <span className=\"thing\">thing</span>\n      <p>content</p>\n    </div>"
  },
  {
   "id": "POS-04",
   "cat": "pos",
   "title": "fixed — and the transform that silently breaks it",
   "goal": "A toolbar fixed to the bottom of the viewport, and a demonstration of what breaks it.",
   "use": [
    [
     "position: fixed",
     "pin to the viewport"
    ],
    [
     "inset-inline",
     "stretch left and right"
    ],
    [
     "transform",
     "on an ancestor — the thing that breaks fixed"
    ]
   ],
   "task": "Fix the bar to the bottom of the viewport. Then uncomment the transform on the wrapper and explain in the comment why the bar stops being fixed.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     "viewport"
    ],
    "box": [
     [
      8,
      96,
      304,
      26,
      "fixed bar",
      "hi"
     ],
     [
      24,
      20,
      272,
      60,
      "page content",
      "ghost"
     ]
    ],
    "note": [
     [
      8,
      128,
      "a transformed ancestor becomes the containing block"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.wrap\n         p   text: \"content\"\n         div.bar   text: \"toolbar\"\n      */}\n    </>\n  );\n}\n",
   "css": ".wrap { min-height: 12rem; }\n/* .wrap { transform: translateZ(0); } */\n\n.bar {\n  background: steelblue;\n  color: white;\n  padding: .5rem;\n  /* TODO — pin to the bottom of the viewport */\n}\n/* TODO — one line: why does the transform break it? */\n",
   "hints": [
    "fixed uses the viewport as its containing block — unless an ancestor has transform, filter, perspective, will-change or contain, which creates a new containing block for fixed descendants.",
    "position: fixed; bottom: 0; inset-inline: 0;"
   ],
   "sol": "position: fixed;\n  bottom: 0;\n  inset-inline: 0;",
   "why": "This bug appears in every animation library integration. Knowing the trigger list — transform, filter, will-change, contain — is a genuinely senior detail.",
   "markup": "    <div className=\"wrap\">\n      <p>content</p>\n      <div className=\"bar\">toolbar</div>\n    </div>"
  },
  {
   "id": "POS-05",
   "cat": "pos",
   "title": "sticky — needs a threshold and a scrolling ancestor",
   "goal": "A section heading that sticks to the top while its own section scrolls past.",
   "use": [
    [
     "position: sticky",
     "relative until a threshold, then fixed within the ancestor"
    ],
    [
     "top",
     "the threshold — mandatory, sticky does nothing without it"
    ]
   ],
   "task": "Make .head stick to the top of the scroll area. Then say why sticky stops at the end of its parent.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     304,
     124,
     "scroll area"
    ],
    "box": [
     [
      16,
      16,
      288,
      22,
      "heading — stuck at top: 0",
      "hi"
     ],
     [
      16,
      46,
      288,
      70,
      "section content"
     ]
    ],
    "note": [
     [
      8,
      136,
      "sticks only while its PARENT is on screen"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.scroller\n         section\n           h2.head   text: \"Section\"\n           p   text: \"lots of content…\"\n      */}\n    </>\n  );\n}\n",
   "css": ".scroller { height: 10rem; overflow-y: auto; }\nsection { padding-bottom: 20rem; }\n\n.head {\n  background: steelblue;\n  color: white;\n  margin: 0;\n  padding: .5rem;\n  /* TODO — two declarations */\n}\n",
   "hints": [
    "sticky without an offset never activates — top, bottom, left or right is what defines “stuck”.",
    "position: sticky; top: 0. A sticky element is confined to its parent, so it unsticks when the parent scrolls out. And overflow: hidden on any ancestor kills it entirely."
   ],
   "sol": "position: sticky;\n  top: 0;",
   "why": "Two failures cover 95% of “sticky is not working”: no offset, or an ancestor with overflow hidden/auto that is not the intended scroller.",
   "markup": "    <div className=\"scroller\">\n      <section>\n        <h2 className=\"head\">Section</h2>\n        <p>lots of content…</p>\n      </section>\n    </div>"
  },
  {
   "id": "POS-06",
   "cat": "pos",
   "title": "z-index needs a positioned element — or a flex/grid item",
   "goal": "A blue box painted above a red one that comes later in the DOM.",
   "use": [
    [
     "z-index",
     "order along the z axis"
    ],
    [
     "position: relative",
     "make z-index apply at all"
    ]
   ],
   "task": ".a must paint above .b. Note that .a comes FIRST in the DOM, so it loses by default.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     10,
     304,
     90,
     ""
    ],
    "box": [
     [
      40,
      26,
      140,
      60,
      "b",
      "ghost"
     ],
     [
      16,
      40,
      140,
      50,
      "a — on top",
      "hi"
     ]
    ],
    "note": [
     [
      8,
      112,
      "later DOM order paints on top, unless z-index says otherwise"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.stack\n         div.a   text: \"a\"\n         div.b   text: \"b\"\n      */}\n    </>\n  );\n}\n",
   "css": ".stack { display: grid; }\n.stack > * { grid-area: 1 / 1; padding: 2rem; }\n.a { background: steelblue; color: white; }\n.b { background: indianred; color: white; margin: 1rem 0 0 1.5rem; }\n\n.a {\n  /* TODO — paint above b */\n}\n",
   "hints": [
    "On a static element z-index is ignored completely. Flex and grid ITEMS are the exception — z-index works on them without position.",
    "z-index: 1. These are grid items, so it applies directly; on a plain block you would also need position: relative."
   ],
   "sol": "z-index: 1;",
   "why": "The flex/grid-item exception is a real interview question, and it is why the overlay pattern in GRID-11 needs no positioning at all.",
   "markup": "    <div className=\"stack\">\n      <div className=\"a\">a</div>\n      <div className=\"b\">b</div>\n    </div>"
  },
  {
   "id": "POS-07",
   "cat": "pos",
   "title": "The stacking context trap — z-index: 9999 that loses",
   "goal": "Diagnosing why a huge z-index still paints underneath.",
   "use": [
    [
     "opacity",
     "below 1 it creates a stacking context"
    ],
    [
     "z-index",
     "trapped inside that context"
    ]
   ],
   "task": ".modal has z-index 9999 and still hides behind .panel. Do not raise the number — remove the cause.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     150,
     80,
     ".header  opacity: .99"
    ],
    "box": [
     [
      14,
      26,
      138,
      54,
      "modal z 9999",
      "ghost"
     ],
     [
      172,
      20,
      140,
      70,
      "panel z 1",
      "hi"
     ]
    ],
    "note": [
     [
      8,
      100,
      "the modal can never leave its parent’s stacking context"
     ],
     [
      8,
      118,
      "9999 only ranks it among its SIBLINGS"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       header.header\n         div.modal   text: \"modal\"\n       div.panel   text: \"panel\"\n      */}\n    </>\n  );\n}\n",
   "css": ".header {\n  position: relative;\n  opacity: .99;   /* TODO — this line is the bug */\n}\n.modal { position: absolute; z-index: 9999; background: steelblue; color: white; padding: 1rem; }\n.panel { position: relative; z-index: 1; background: indianred; color: white; padding: 2rem; margin-top: -1rem; }\n",
   "hints": [
    "opacity below 1, transform, filter, will-change, isolation and a positioned element with a z-index all create a stacking context.",
    "Delete opacity: .99 (or set isolation: isolate deliberately). A child can never escape its parent’s stacking context, so 9999 only competes inside the header."
   ],
   "sol": "/* remove */ opacity: .99;",
   "why": "The correct answer to “z-index is not working” is never a bigger number. It is: find the stacking context and either remove it or move the element out of it.",
   "markup": "    <>\n      <header className=\"header\">\n        <div className=\"modal\">modal</div>\n      </header>\n      <div className=\"panel\">panel</div>\n    </>"
  },
  {
   "id": "INS-01",
   "cat": "inset",
   "title": "inset: 0 — cover the parent exactly",
   "goal": "A tint layer covering its parent completely, written in one declaration.",
   "use": [
    [
     "inset",
     "shorthand for top, right, bottom and left"
    ]
   ],
   "task": "Cover the parent with .overlay using one declaration instead of four.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     4,
     6,
     312,
     98,
     ".card  position: relative"
    ],
    "box": [
     [
      8,
      10,
      304,
      90,
      "overlay — inset: 0",
      "hi"
     ]
    ],
    "note": [
     [
      4,
      120,
      "the overlay fills the containing block exactly"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card\n         p   text: \"content\"\n         div.overlay\n      */}\n    </>\n  );\n}\n",
   "css": ".card { position: relative; background: aliceblue; padding: 2rem; }\n\n.overlay {\n  position: absolute;\n  background: rgb(0 0 0 / .25);\n  /* TODO — one declaration, all four sides */\n}\n",
   "hints": [
    "inset takes 1, 2, 3 or 4 values in the same order as margin.",
    "inset: 0;"
   ],
   "sol": "inset: 0;",
   "why": "Replaces four lines with one, and reads as intent: “fill the containing block”.",
   "markup": "    <div className=\"card\">\n      <p>content</p>\n      <div className=\"overlay\" />\n    </div>"
  },
  {
   "id": "INS-02",
   "cat": "inset",
   "title": "Logical insets — inset-block and inset-inline",
   "goal": "An overlay inset 1rem from the sides and flush to top and bottom, written logically.",
   "use": [
    [
     "inset-block",
     "top and bottom together"
    ],
    [
     "inset-inline",
     "left and right together — flips in RTL"
    ]
   ],
   "task": "Two declarations. Do not use top/right/bottom/left.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     10,
     304,
     90,
     ""
    ],
    "box": [
     [
      26,
      10,
      268,
      90,
      "inset-block: 0 · inset-inline: 1rem",
      "hi"
     ]
    ],
    "gap": [
     [
      8,
      55,
      18,
      "1rem",
      1
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card\n         p   text: \"content\"\n         div.overlay\n      */}\n    </>\n  );\n}\n",
   "css": ".card { position: relative; background: aliceblue; padding: 2rem; }\n\n.overlay {\n  position: absolute;\n  background: rgb(70 130 180 / .35);\n  /* TODO — two logical declarations */\n}\n",
   "hints": [
    "block is the direction text flows in blocks (vertical in English); inline is the direction words run.",
    "inset-block: 0; inset-inline: 1rem;"
   ],
   "sol": "inset-block: 0;\n  inset-inline: 1rem;",
   "why": "Logical properties are the default in new codebases because they make RTL support free. Say “inline start” instead of “left” and you sound current.",
   "markup": "    <div className=\"card\">\n      <p>content</p>\n      <div className=\"overlay\" />\n    </div>"
  },
  {
   "id": "INS-03",
   "cat": "inset",
   "title": "Opposite insets plus auto margins — true centring",
   "goal": "A fixed-size dialog centred in its parent using inset and margin only.",
   "use": [
    [
     "inset: 0",
     "set all four offsets, which over-constrains the box"
    ],
    [
     "margin: auto",
     "let the leftover space split evenly"
    ],
    [
     "width / height",
     "the box must have a definite size for this to work"
    ]
   ],
   "task": "Centre a 10rem × 5rem dialog without transform and without flex or grid.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ""
    ],
    "box": [
     [
      104,
      42,
      112,
      46,
      "dialog",
      "hi"
     ]
    ],
    "gap": [
     [
      8,
      65,
      96,
      "auto",
      1
     ],
     [
      216,
      65,
      96,
      "auto",
      1
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card\n         div.dialog   text: \"dialog\"\n      */}\n    </>\n  );\n}\n",
   "css": ".card { position: relative; height: 12rem; background: aliceblue; }\n\n.dialog {\n  position: absolute;\n  width: 10rem;\n  height: 5rem;\n  background: steelblue;\n  color: white;\n  /* TODO — two declarations */\n}\n",
   "hints": [
    "Setting both left and right on a sized absolute box leaves the equation over-constrained; auto margins absorb the difference equally.",
    "inset: 0; margin: auto; — this is the classic pre-flexbox centring and it still works."
   ],
   "sol": "inset: 0;\n  margin: auto;",
   "why": "Worth knowing as history and as a fallback: it centres without transform, so it never blurs text on a subpixel boundary.",
   "markup": "    <div className=\"card\">\n      <div className=\"dialog\">dialog</div>\n    </div>"
  },
  {
   "id": "UNI-01",
   "visual": false,
   "verify": "At the default root size, 2rem IS 32px, so nothing moves. Verify by adding html { font-size: 20px } temporarily — the rem version scales, the px version would not.",
   "cat": "units",
   "title": "rem for type — respecting the user’s font size",
   "goal": "Body text that grows when the reader raises their browser font size.",
   "use": [
    [
     "rem",
     "relative to the ROOT font size, which the user controls"
    ]
   ],
   "task": "Convert the px type scale to rem. 16px is the default root size.",
   "dia": {
    "w": 320,
    "h": 110,
    "box": [
     [
      8,
      10,
      304,
      26,
      "h1  2rem   = 32px at default"
     ],
     [
      8,
      42,
      304,
      22,
      "p   1rem   = 16px"
     ],
     [
      8,
      70,
      304,
      20,
      "small .875rem = 14px"
     ]
    ],
    "note": [
     [
      8,
      104,
      "user sets 20px root → everything scales together"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       article\n         h1   text: \"Heading\"\n         p   text: \"Body copy.\"\n         small   text: \"Fine print.\"\n      */}\n    </>\n  );\n}\n",
   "css": "h1 { font-size: 32px; }\np  { font-size: 16px; }\nsmall { font-size: 14px; }\n\n/* TODO — convert all three to rem */\n",
   "hints": [
    "Divide by 16.",
    "2rem, 1rem, .875rem. px font sizes ignore the user’s browser setting entirely, which is an accessibility failure (WCAG 1.4.4)."
   ],
   "sol": "h1 { font-size: 2rem; }\np  { font-size: 1rem; }\nsmall { font-size: .875rem; }",
   "why": "The rule: type and spacing in rem. This is the single most cited reason not to use px for text.",
   "markup": "    <article>\n      <h1>Heading</h1>\n      <p>Body copy.</p>\n      <small>Fine print.</small>\n    </article>"
  },
  {
   "id": "UNI-02",
   "useApp": false,
   "cat": "units",
   "title": "em for component padding — scaling with its own text",
   "goal": "One button rule that gives correct padding at three different font sizes.",
   "use": [
    [
     "em",
     "relative to the element’s OWN font-size"
    ]
   ],
   "task": "Write a single .btn padding that stays proportional when .btn-sm and .btn-lg change only the font size.",
   "dia": {
    "w": 320,
    "h": 110,
    "box": [
     [
      8,
      12,
      60,
      22,
      "sm"
     ],
     [
      76,
      8,
      84,
      30,
      "base"
     ],
     [
      168,
      2,
      120,
      42,
      "lg"
     ]
    ],
    "note": [
     [
      8,
      66,
      "one padding rule: .5em 1em"
     ],
     [
      8,
      84,
      "each size gets padding proportional to its own text"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         button.btn.btn-sm   text: \"sm\"\n         button.btn   text: \"base\"\n         button.btn.btn-lg   text: \"lg\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: .5rem; align-items: center; }\n.btn-sm { font-size: .8rem; }\n.btn-lg { font-size: 1.4rem; }\n\n.btn {\n  background: steelblue;\n  color: white;\n  border: 0;\n  /* TODO — padding that scales with the button’s own text */\n}\n",
   "hints": [
    "em resolves against the font-size of the element it is written on.",
    "padding: .5em 1em. In rem the small and large buttons would get identical padding and look wrong."
   ],
   "sol": "padding: .5em 1em;",
   "why": "The division of labour: rem for the global scale, em for anything that must track its own text. Buttons, badges and inputs are the classic em cases.",
   "markup": "    <div className=\"row\">\n      <button className=\"btn btn-sm\">sm</button>\n      <button className=\"btn\">base</button>\n      <button className=\"btn btn-lg\">lg</button>\n    </div>"
  },
  {
   "id": "UNI-03",
   "cat": "units",
   "title": "ch for measure — line length you can defend",
   "goal": "A paragraph capped at roughly 65 characters per line.",
   "use": [
    [
     "ch",
     "the width of the \"0\" glyph in the current font"
    ],
    [
     "max-width",
     "apply it as a cap"
    ]
   ],
   "task": "Cap the article at a comfortable measure using ch.",
   "dia": {
    "w": 320,
    "h": 110,
    "box": [
     [
      8,
      10,
      230,
      74,
      "text column ≈ 65ch"
     ]
    ],
    "gap": [
     [
      8,
      6,
      230,
      "65ch",
      1
     ]
    ],
    "note": [
     [
      8,
      102,
      "45–75 characters is the readable range"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       article.prose\n         p   text: \"A long paragraph of body cop\"\n      */}\n    </>\n  );\n}\n",
   "css": ".prose {\n  /* TODO — cap the measure */\n}\n",
   "hints": [
    "1ch is the advance width of the character 0 in the element’s font, so a ch cap tracks the actual typeface.",
    "max-width: 65ch;"
   ],
   "sol": "max-width: 65ch;",
   "why": "“Why 65ch and not 800px?” — because it follows the font. Naming the 45–75 character range shows you know the typographic reason, not just the number.",
   "markup": "    <article className=\"prose\">\n      <p>A long paragraph of body copy that should not run the full width of a wide screen.</p>\n    </article>"
  },
  {
   "id": "UNI-04",
   "cat": "units",
   "title": "% resolves against the parent — fr against the free space",
   "goal": "Knowing which of two sibling containers overflows and why.",
   "use": [
    [
     "%",
     "a fraction of the containing block"
    ],
    [
     "fr",
     "a fraction of what remains after gaps and fixed tracks"
    ]
   ],
   "task": "Both grids have a 2rem gap. Give .a percentage columns and .b fr columns, then state which one overflows.",
   "dia": {
    "w": 300,
    "h": 76,
    "frame": [
     4,
     4,
     292,
     50,
     "container"
    ],
    "box": [
     [
      10,
      14,
      132,
      30,
      ""
     ],
     [
      158,
      14,
      132,
      30,
      ""
     ]
    ],
    "note": [
     [
      10,
      64,
      "fr: gaps come out first"
     ]
    ],
    "alt": {
     "w": 300,
     "h": 76,
     "frame": [
      4,
      4,
      254,
      50,
      "container"
     ],
     "box": [
      [
       10,
       14,
       132,
       30,
       ""
      ],
      [
       158,
       14,
       132,
       30,
       "",
       "hi"
      ]
     ],
     "note": [
      [
       10,
       64,
       "%: gap is added ON TOP → overflow"
      ]
     ]
    },
    "labels": [
     ".b  1fr 1fr",
     ".a  50% 50%"
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid.a\n         div\n         div\n       div.grid.b\n         div\n         div\n      */}\n    </>\n  );\n}\n",
   "css": ".grid { display: grid; gap: 2rem; margin-bottom: 1rem; }\n.grid > div { background: aliceblue; height: 3rem; }\n\n.a { /* TODO — percentage columns */ }\n.b { /* TODO — fr columns */ }\n",
   "hints": [
    "A percentage knows nothing about gap. fr is computed from the space left after gaps.",
    ".a { grid-template-columns: 50% 50% } overflows by 2rem. .b { grid-template-columns: 1fr 1fr } fits."
   ],
   "sol": ".a { grid-template-columns: 50% 50%; }\n.b { grid-template-columns: 1fr 1fr; }",
   "why": "The same lesson as TRK-02, now as a direct comparison. If you can state it in one sentence you will never write a percentage grid again.",
   "markup": "    <>\n      <div className=\"grid a\"><div /><div /></div>\n      <div className=\"grid b\"><div /><div /></div>\n    </>"
  },
  {
   "id": "UNI-05",
   "cat": "units",
   "title": "dvh vs vh — the mobile address bar",
   "goal": "A hero that is exactly one screen tall on a phone, with no cut-off bottom.",
   "use": [
    [
     "dvh",
     "dynamic viewport height — tracks the shrinking chrome"
    ],
    [
     "min-height",
     "so content can still push it taller"
    ]
   ],
   "task": "Make .hero one full screen tall on mobile without the last line hiding behind the URL bar.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     100,
     "100dvh — the visible area"
    ],
    "box": [
     [
      8,
      8,
      304,
      100,
      "hero",
      "hi"
     ]
    ],
    "note": [
     [
      8,
      122,
      "100vh includes the chrome → the bottom is cut off"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       section.hero\n         h1   text: \"Hero\"\n      */}\n    </>\n  );\n}\n",
   "css": ".hero {\n  display: grid;\n  place-items: center;\n  background: steelblue;\n  color: white;\n  /* TODO — exactly one screen, safely */\n}\n",
   "hints": [
    "vh is the LARGE viewport height and does not change when the browser chrome retracts.",
    "min-height: 100dvh. Use min-height rather than height so long content is never clipped. svh and lvh are the small and large variants if you need them explicitly."
   ],
   "sol": "min-height: 100dvh;",
   "why": "A genuinely modern detail. Saying “100vh is broken on iOS, dvh fixed it” places you after 2022 in a way interviewers notice.",
   "markup": "    <section className=\"hero\">\n      <h1>Hero</h1>\n    </section>"
  },
  {
   "id": "UNI-06",
   "cat": "units",
   "title": "clamp() — fluid type with real bounds",
   "goal": "A heading that scales with the viewport but never goes below 1.5rem or above 3rem.",
   "use": [
    [
     "clamp()",
     "minimum, preferred, maximum in one function"
    ],
    [
     "vw",
     "the fluid middle value"
    ],
    [
     "rem",
     "both bounds — never px"
    ]
   ],
   "task": "Write one font-size that is fluid between 1.5rem and 3rem.",
   "dia": {
    "w": 320,
    "h": 110,
    "box": [
     [
      8,
      14,
      90,
      26,
      "1.5rem"
     ],
     [
      110,
      8,
      100,
      38,
      "fluid"
     ],
     [
      222,
      2,
      90,
      50,
      "3rem"
     ]
    ],
    "note": [
     [
      8,
      74,
      "clamp(1.5rem, 4vw + 1rem, 3rem)"
     ],
     [
      8,
      94,
      "bounds in rem so zoom still works"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       h1.title   text: \"Fluid heading\"\n      */}\n    </>\n  );\n}\n",
   "css": ".title {\n  /* TODO — clamp it */\n}\n",
   "hints": [
    "clamp(min, preferred, max). Adding a rem term to the vw makes it still respond to user zoom.",
    "font-size: clamp(1.5rem, 4vw + 1rem, 3rem);"
   ],
   "sol": "font-size: clamp(1.5rem, 4vw + 1rem, 3rem);",
   "why": "A pure vw preferred value fails WCAG zoom because the text stops responding to the user’s font setting. The + 1rem term is the accessible form.",
   "markup": "    <h1 className=\"title\">Fluid heading</h1>"
  },
  {
   "id": "UNI-07",
   "cat": "units",
   "title": "Where px is still the right answer",
   "goal": "A card with a 1px hairline border and a small shadow that must NOT scale with type.",
   "use": [
    [
     "px",
     "for hairlines, shadow offsets and blur radii — physical details, not type"
    ]
   ],
   "task": "Give .card a 1px border and a subtle shadow. Deliberately use px and be ready to justify it.",
   "dia": {
    "w": 320,
    "h": 110,
    "frame": [
     8,
     10,
     304,
     80,
     ""
    ],
    "box": [
     [
      16,
      18,
      288,
      64,
      "1px hairline · shadow in px"
     ]
    ],
    "note": [
     [
      8,
      104,
      "a 0.0625rem border rounds unpredictably across zoom levels"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card   text: \"card\"\n      */}\n    </>\n  );\n}\n",
   "css": ".card {\n  background: white;\n  padding: 1rem;\n  border-radius: .5rem;\n  /* TODO — hairline and shadow, in px on purpose */\n}\n",
   "hints": [
    "A hairline should stay a hairline. Scaling it with the user’s font size makes it fat at large sizes and invisible at small ones.",
    "border: 1px solid gainsboro; box-shadow: 0 1px 3px rgb(0 0 0 / .1);"
   ],
   "sol": "border: 1px solid gainsboro;\n  box-shadow: 0 1px 3px rgb(0 0 0 / .1);",
   "why": "“Never use px” is wrong and interviewers probe it. The correct rule: type and space in rem, control padding in em, measure in ch, and px for physical details that must not scale.",
   "markup": "    <div className=\"card\">card</div>"
  },
  {
   "id": "MQ-01",
   "visual": false,
   "verify": "Nothing moves — range syntax and min-width compile to the same behaviour. Verify by reading: the two queries must select the same widths. Drag the preview divider past 48rem and confirm the switch still happens.",
   "cat": "mq",
   "title": "Range syntax — the modern form",
   "goal": "A two-column layout from 48rem up, written without min-width.",
   "use": [
    [
     "@media (width >= 48rem)",
     "the range comparison form"
    ]
   ],
   "task": "Rewrite the min-width query using range syntax, and write the equivalent \"between two sizes\" query in the comment.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     8,
     150,
     50,
     "< 48rem"
    ],
    "box": [
     [
      14,
      16,
      138,
      34,
      "1 col"
     ],
     [
      172,
      16,
      66,
      34,
      "a"
     ],
     [
      244,
      16,
      68,
      34,
      "b"
     ]
    ],
    "note": [
     [
      172,
      8,
      "≥ 48rem"
     ],
     [
      8,
      80,
      "(width >= 48rem)  ·  (30rem <= width < 48rem)"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div   text: \"a\"\n         div   text: \"b\"\n      */}\n    </>\n  );\n}\n",
   "css": ".grid { display: grid; gap: 1rem; }\n.grid > div { background: aliceblue; padding: 1rem; }\n\n@media (min-width: 48rem) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}\n/* TODO — rewrite the query above in range syntax */\n",
   "hints": [
    "CSS Media Queries Level 4 allows <, <=, > and >= directly.",
    "@media (width >= 48rem). A band is written @media (30rem <= width < 48rem) — one query instead of an and-chain."
   ],
   "sol": "@media (width >= 48rem) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}",
   "why": "Range syntax also removes the classic 0.02px overlap bug you get from pairing max-width and min-width at the same number.",
   "markup": "    <div className=\"grid\">\n      <div>a</div>\n      <div>b</div>\n    </div>"
  },
  {
   "id": "MQ-02",
   "visual": false,
   "verify": "The rendered result is identical at every width — that is the point. Verify by reading the stylesheet: after your rewrite, no rule may UNDO an earlier one. Then narrow the preview and watch it step 1 → 2 → 3 columns.",
   "cat": "mq",
   "title": "Mobile-first — why min-width queries come last",
   "goal": "A stylesheet where the narrow layout is the base and every query only adds.",
   "use": [
    [
     "base rules",
     "the narrow layout, unqueried"
    ],
    [
     "@media (width >= …)",
     "progressive enhancement upward"
    ]
   ],
   "task": "Reorder the stylesheet so the single-column layout is the default and the query only adds columns.",
   "dia": {
    "w": 320,
    "h": 120,
    "box": [
     [
      8,
      10,
      304,
      22,
      "base        → 1 column"
     ],
     [
      8,
      38,
      304,
      22,
      "≥ 40rem     → 2 columns"
     ],
     [
      8,
      66,
      304,
      22,
      "≥ 64rem     → 3 columns"
     ]
    ],
    "note": [
     [
      8,
      106,
      "each query only ADDS — nothing is undone"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div   text: \"a\"\n         div   text: \"b\"\n         div   text: \"c\"\n      */}\n    </>\n  );\n}\n",
   "css": ".grid { display: grid; gap: 1rem; grid-template-columns: repeat(3, 1fr); }\n@media (width < 40rem) { .grid { grid-template-columns: 1fr; } }\n\n/* TODO — rewrite mobile-first: base = 1 column, queries add */\n.grid > div { background: aliceblue; padding: 1rem; }\n",
   "hints": [
    "Desktop-first means every query must UNDO something. Mobile-first means every query only adds.",
    ".grid { grid-template-columns: 1fr } then @media (width >= 40rem) { repeat(2, 1fr) } then @media (width >= 64rem) { repeat(3, 1fr) }."
   ],
   "sol": ".grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }\n@media (width >= 40rem) { .grid { grid-template-columns: repeat(2, 1fr); } }\n@media (width >= 64rem) { .grid { grid-template-columns: repeat(3, 1fr); } }",
   "why": "The real argument is not phones — it is that undoing rules is where specificity wars start. Additive stylesheets stay debuggable.",
   "markup": "    <div className=\"grid\">\n      <div>a</div>\n      <div>b</div>\n      <div>c</div>\n    </div>"
  },
  {
   "id": "MQ-03",
   "cat": "mq",
   "title": "prefers-reduced-motion — the query about the person",
   "goal": "An animation that simply does not run for users who asked for less motion.",
   "use": [
    [
     "@media (prefers-reduced-motion: reduce)",
     "honour the OS setting"
    ],
    [
     "transition",
     "the thing being disabled"
    ]
   ],
   "task": "Keep the hover transition, but disable it for users who requested reduced motion.",
   "dia": {
    "w": 320,
    "h": 110,
    "box": [
     [
      8,
      12,
      304,
      26,
      "default        → transition 200ms"
     ],
     [
      8,
      46,
      304,
      26,
      "reduce         → transition none"
     ]
    ],
    "note": [
     [
      8,
      90,
      "a vestibular-disorder accommodation, not a preference"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       button.btn   text: \"hover me\"\n      */}\n    </>\n  );\n}\n",
   "css": ".btn {\n  background: steelblue;\n  color: white;\n  border: 0;\n  padding: .5em 1em;\n  transition: transform 200ms ease;\n}\n.btn:hover { transform: translateY(-2px); }\n\n/* TODO — respect reduced motion */\n",
   "hints": [
    "Query the reduce value and turn the transition off.",
    "@media (prefers-reduced-motion: reduce) { .btn { transition: none } .btn:hover { transform: none } }"
   ],
   "sol": "@media (prefers-reduced-motion: reduce) {\n  .btn { transition: none; }\n  .btn:hover { transform: none; }\n}",
   "why": "Motion can cause nausea and migraine for real users. Mentioning this unprompted is one of the strongest accessibility signals in a front-end interview.",
   "markup": "    <button className=\"btn\">hover me</button>"
  },
  {
   "id": "MQ-04",
   "cat": "mq",
   "title": "prefers-color-scheme — one palette, two definitions",
   "goal": "A card that reads correctly in both light and dark, with colours defined once as tokens.",
   "use": [
    [
     "custom properties",
     "define the palette in one place"
    ],
    [
     "@media (prefers-color-scheme: dark)",
     "redefine only the tokens"
    ],
    [
     "color-scheme",
     "tell the browser so form controls follow"
    ]
   ],
   "task": "Define the light palette on :root, redefine only the tokens for dark, and never repeat a rule.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     8,
     150,
     60,
     "light"
    ],
    "box": [
     [
      14,
      16,
      138,
      44,
      "card"
     ],
     [
      172,
      16,
      140,
      44,
      "card (dark)",
      "hi"
     ]
    ],
    "note": [
     [
      172,
      8,
      "dark"
     ],
     [
      8,
      86,
      "only the TOKENS change — no rule is duplicated"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card   text: \"card\"\n      */}\n    </>\n  );\n}\n",
   "css": ":root {\n  --bg: white;\n  --fg: black;\n  color-scheme: light;\n}\n.card { background: var(--bg); color: var(--fg); padding: 1rem; border: 1px solid gainsboro; }\n\n/* TODO — dark: redefine the tokens only */\n",
   "hints": [
    "Redefine the custom properties inside the query. Do not restate .card.",
    "@media (prefers-color-scheme: dark) { :root { --bg: #111; --fg: #eee; color-scheme: dark } }"
   ],
   "sol": "@media (prefers-color-scheme: dark) {\n  :root { --bg: #111; --fg: #eee; color-scheme: dark; }\n}",
   "why": "color-scheme is the part people forget: without it, scrollbars, form controls and the default canvas stay light and the page looks broken.",
   "markup": "    <div className=\"card\">card</div>"
  },
  {
   "id": "MQ-05",
   "cat": "mq",
   "title": "pointer and hover — querying the input device",
   "goal": "A larger tap target on touch devices, and hover styles only where hover exists.",
   "use": [
    [
     "@media (pointer: coarse)",
     "a finger, not a mouse"
    ],
    [
     "@media (hover: hover)",
     "the device can actually hover"
    ]
   ],
   "task": "Give the button a 44px minimum tap target on coarse pointers, and apply the hover style only where hovering is possible.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     8,
     150,
     50,
     "fine pointer"
    ],
    "box": [
     [
      14,
      20,
      110,
      26,
      "32px"
     ],
     [
      172,
      14,
      120,
      44,
      "44px",
      "hi"
     ]
    ],
    "note": [
     [
      172,
      8,
      "coarse pointer"
     ],
     [
      8,
      80,
      "hover styles are skipped entirely on touch"
     ],
     [
      8,
      98,
      "44px is the WCAG 2.5.5 target size"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       button.btn   text: \"tap\"\n      */}\n    </>\n  );\n}\n",
   "css": ".btn { background: steelblue; color: white; border: 0; padding: .5em 1em; }\n\n/* TODO — coarse pointer: min 44px tall */\n\n/* TODO — hover-capable devices only: lift on hover */\n",
   "hints": [
    "A width media query cannot tell you about the input device. pointer and hover can.",
    "@media (pointer: coarse) { .btn { min-height: 44px } } and @media (hover: hover) { .btn:hover { transform: translateY(-2px) } }"
   ],
   "sol": "@media (pointer: coarse) { .btn { min-height: 44px; } }\n\n@media (hover: hover) {\n  .btn:hover { transform: translateY(-2px); }\n}",
   "why": "“Small screen” and “touch device” are different questions. A touchscreen laptop breaks the width-based assumption, which is exactly why these queries exist.",
   "markup": "    <button className=\"btn\">tap</button>"
  },
  {
   "id": "FOC-01",
   "useApp": false,
   "cat": "focus",
   "title": ":focus-visible — a ring for keyboards, not for clicks",
   "goal": "Tab to the button and see a ring. Click it and see none. Never lose the ring entirely.",
   "use": [
    [
     ":focus-visible",
     "the browser’s own heuristic for \"this user needs a ring\""
    ],
    [
     "outline",
     "the ring — it costs no layout"
    ],
    [
     "outline-offset",
     "breathing room"
    ]
   ],
   "task": "Give .btn a visible focus ring for keyboard users only. Do not write outline: none anywhere.",
   "dia": {
    "w": 320,
    "h": 120,
    "box": [
     [
      16,
      20,
      120,
      36,
      "clicked — no ring"
     ],
     [
      176,
      16,
      128,
      44,
      "",
      "ghost"
     ],
     [
      182,
      22,
      116,
      32,
      "tabbed — ring",
      "hi"
     ]
    ],
    "note": [
     [
      8,
      84,
      ":focus fires for BOTH mouse and keyboard"
     ],
     [
      8,
      102,
      ":focus-visible fires only when the browser thinks a ring helps"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         button.btn   text: \"one\"\n         button.btn   text: \"two\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: .5rem; }\n.btn { background: steelblue; color: white; border: 0; padding: .5em 1em; }\n\n.btn:focus-visible {\n  /* TODO — the ring */\n}\n",
   "hints": [
    "outline plus outline-offset. Because outline is outside the box model, nothing reflows.",
    "outline: 3px solid darkorange; outline-offset: 2px;"
   ],
   "sol": "outline: 3px solid darkorange;\n  outline-offset: 2px;",
   "why": "The old pattern was outline: none plus a custom :focus style, which broke keyboard users constantly. :focus-visible solved the real problem — say that history in an interview.",
   "markup": "    <div className=\"row\">\n      <button className=\"btn\">one</button>\n      <button className=\"btn\">two</button>\n    </div>"
  },
  {
   "id": "FOC-02",
   "cat": "focus",
   "title": ":focus-within — the parent reacts",
   "goal": "A form group whose label and border highlight while any input inside it is focused.",
   "use": [
    [
     ":focus-within",
     "matches an element containing the focused element"
    ]
   ],
   "task": "Highlight the whole .field when its input is focused. No JavaScript.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     10,
     304,
     70,
     ".field:focus-within",
     "hi"
    ],
    "box": [
     [
      16,
      18,
      288,
      18,
      "Label"
     ],
     [
      16,
      42,
      288,
      32,
      "input"
     ]
    ],
    "note": [
     [
      8,
      100,
      "the parent matches while a descendant holds focus"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       label.field\n         span.lab   text: \"Email\"\n         input   type=\"email\"\n      */}\n    </>\n  );\n}\n",
   "css": ".field { display: grid; gap: .25rem; padding: .5rem; border: 1px solid gainsboro; border-radius: .375rem; }\n.lab { font-size: .8rem; color: dimgray; }\n\n.field:focus-within {\n  /* TODO — highlight the whole group */\n}\n",
   "hints": [
    "Apply the style to .field itself, not to the input.",
    ".field:focus-within { border-color: steelblue; background: aliceblue }"
   ],
   "sol": "border-color: steelblue;\n  background: aliceblue;",
   "why": "This is CSS reacting to descendant state — the pattern people reach for JavaScript to do. Pairs naturally with :has() as the sibling case.",
   "markup": "    <label className=\"field\">\n      <span className=\"lab\">Email</span>\n      <input type=\"email\" />\n    </label>"
  },
  {
   "id": "FOC-03",
   "useApp": false,
   "cat": "focus",
   "title": "A focus ring visible on ANY background",
   "goal": "One ring that stays visible on white, on steel blue and on black.",
   "use": [
    [
     "outline",
     "the inner ring, in a light colour"
    ],
    [
     "box-shadow",
     "a second, darker ring outside it"
    ],
    [
     "outline-offset",
     "separate the two"
    ]
   ],
   "task": "Build a two-tone ring so it never disappears against the button colour.",
   "dia": {
    "w": 320,
    "h": 120,
    "box": [
     [
      16,
      24,
      84,
      40,
      "on white",
      "hi"
     ],
     [
      116,
      24,
      84,
      40,
      "on blue",
      "hi"
     ],
     [
      216,
      24,
      88,
      40,
      "on black",
      "hi"
     ]
    ],
    "note": [
     [
      8,
      88,
      "white outline + dark shadow = contrast against anything"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         button.btn.light   text: \"a\"\n         button.btn.blue   text: \"b\"\n         button.btn.dark   text: \"c\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: .5rem; }\n.btn { border: 0; padding: .5em 1em; }\n.light { background: white; color: black; }\n.blue { background: steelblue; color: white; }\n.dark { background: black; color: white; }\n\n.btn:focus-visible {\n  /* TODO — a ring that survives any backdrop */\n}\n",
   "hints": [
    "One ring cannot contrast with every possible background. Two rings of opposite lightness can.",
    "outline: 2px solid white; outline-offset: 2px; box-shadow: 0 0 0 4px black; — WCAG 1.4.11 wants 3:1 against the adjacent colour, and this guarantees it either way."
   ],
   "sol": "outline: 2px solid white;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 4px black;",
   "why": "A design-system-grade answer. Most candidates give a single-colour ring and never consider the dark button.",
   "markup": "    <div className=\"row\">\n      <button className=\"btn light\">a</button>\n      <button className=\"btn blue\">b</button>\n      <button className=\"btn dark\">c</button>\n    </div>"
  },
  {
   "id": "TOK-01",
   "visual": false,
   "verify": "The three components look the same before and after — a refactor should. Verify it worked by changing --accent on :root ONCE and watching all three follow.",
   "cat": "tokens",
   "title": "Custom properties — name the value once",
   "goal": "Three components sharing one accent colour and one spacing step.",
   "use": [
    [
     "--custom-property",
     "declare on :root"
    ],
    [
     "var()",
     "read it"
    ]
   ],
   "task": "Replace every repeated literal with a token declared once on :root.",
   "dia": {
    "w": 320,
    "h": 120,
    "box": [
     [
      8,
      10,
      304,
      24,
      ":root  --accent · --space"
     ],
     [
      8,
      42,
      96,
      32,
      "button"
     ],
     [
      112,
      42,
      96,
      32,
      "badge"
     ],
     [
      216,
      42,
      96,
      32,
      "link"
     ]
    ],
    "arrow": [
     [
      60,
      38,
      60,
      42,
      ""
     ],
     [
      160,
      38,
      160,
      42,
      ""
     ],
     [
      262,
      38,
      262,
      42,
      ""
     ]
    ],
    "note": [
     [
      8,
      100,
      "one change updates all three"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         button.btn   text: \"button\"\n         span.badge   text: \"badge\"\n         a.link   href=\"#\"   text: \"link\"\n      */}\n    </>\n  );\n}\n",
   "css": "/* TODO — declare --accent and --space on :root */\n\n.row { display: flex; gap: 1rem; align-items: center; }\n.btn { background: steelblue; color: white; border: 0; padding: .5rem 1rem; }\n.badge { background: steelblue; color: white; padding: .5rem 1rem; }\n.link { color: steelblue; padding: .5rem 1rem; }\n/* TODO — replace the literals with var() */\n",
   "hints": [
    "Custom properties inherit, so :root makes them available everywhere.",
    ":root { --accent: steelblue; --space: .5rem 1rem } then background: var(--accent) and padding: var(--space)."
   ],
   "sol": ":root { --accent: steelblue; --space: .5rem 1rem; }\n.btn { background: var(--accent); padding: var(--space); }\n.badge { background: var(--accent); padding: var(--space); }\n.link { color: var(--accent); padding: var(--space); }",
   "why": "Unlike Sass variables these are live at runtime, which is what makes theming and container-aware components possible.",
   "markup": "    <div className=\"row\">\n      <button className=\"btn\">button</button>\n      <span className=\"badge\">badge</span>\n      <a className=\"link\" href=\"#\">link</a>\n    </div>"
  },
  {
   "id": "TOK-02",
   "cat": "tokens",
   "title": "var() fallbacks — a component that survives a missing token",
   "goal": "A card that still looks right when dropped into a page that never defined its tokens.",
   "use": [
    [
     "var(--x, fallback)",
     "the second argument is used when --x is not set"
    ]
   ],
   "task": "Give every var() a sensible fallback so the component works standalone.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     10,
     150,
     60,
     "tokens defined"
    ],
    "box": [
     [
      14,
      20,
      138,
      44,
      "card"
     ],
     [
      172,
      20,
      140,
      44,
      "card — fallback",
      "hi"
     ]
    ],
    "note": [
     [
      172,
      12,
      "tokens missing"
     ],
     [
      8,
      88,
      "var(--card-bg, whitesmoke)"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card   text: \"card\"\n      */}\n    </>\n  );\n}\n",
   "css": ".card {\n  background: var(--card-bg);\n  color: var(--card-fg);\n  padding: var(--card-pad);\n  /* TODO — add a fallback to each */\n}\n",
   "hints": [
    "The fallback can itself be a var(): var(--a, var(--b, red)).",
    "background: var(--card-bg, whitesmoke); color: var(--card-fg, black); padding: var(--card-pad, 1rem);"
   ],
   "sol": "background: var(--card-bg, whitesmoke);\n  color: var(--card-fg, black);\n  padding: var(--card-pad, 1rem);",
   "why": "An unresolved var() makes the declaration invalid at computed-value time — the property falls back to inherited or initial, which is usually worse than any fallback you would pick.",
   "markup": "    <div className=\"card\">card</div>"
  },
  {
   "id": "TOK-03",
   "cat": "tokens",
   "title": "Scoped tokens — theming without new rules",
   "goal": "The same card component rendered in a default theme and a \"danger\" theme, with no second set of rules.",
   "use": [
    [
     "custom properties on a class",
     "override tokens for a subtree"
    ],
    [
     "inheritance",
     "the override cascades to descendants"
    ]
   ],
   "task": "Add a .danger class that redefines the tokens. Do not write a single .danger .card rule.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     10,
     150,
     60,
     "default"
    ],
    "box": [
     [
      14,
      20,
      138,
      44,
      "card"
     ],
     [
      172,
      20,
      140,
      44,
      "card",
      "hi"
     ]
    ],
    "note": [
     [
      172,
      12,
      ".danger — tokens overridden"
     ],
     [
      8,
      88,
      "zero component rules were duplicated"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card   text: \"default\"\n       div.danger\n         div.card   text: \"danger\"\n      */}\n    </>\n  );\n}\n",
   "css": ":root { --accent: steelblue; --accent-fg: white; }\n.card { background: var(--accent); color: var(--accent-fg); padding: 1rem; margin-bottom: .5rem; }\n\n.danger {\n  /* TODO — override the tokens only */\n}\n",
   "hints": [
    "Custom properties inherit down the tree, so redefining them on an ancestor re-themes everything inside.",
    ".danger { --accent: indianred; --accent-fg: white; }"
   ],
   "sol": ".danger { --accent: indianred; --accent-fg: white; }",
   "why": "This is how real design systems theme: components consume tokens, contexts redefine them. No specificity battles, no duplicated rules.",
   "markup": "    <>\n      <div className=\"card\">default</div>\n      <div className=\"danger\">\n        <div className=\"card\">danger</div>\n      </div>\n    </>"
  },
  {
   "id": "TOK-04",
   "useApp": false,
   "cat": "tokens",
   "title": "Two token layers — primitive and semantic",
   "goal": "A palette where --blue-600 is defined once and --color-action refers to it.",
   "use": [
    [
     "primitive tokens",
     "raw values: --blue-600"
    ],
    [
     "semantic tokens",
     "roles: --color-action, --color-danger"
    ],
    [
     "components",
     "consume only the semantic layer"
    ]
   ],
   "task": "Define both layers and make .btn use only the semantic name. Then switch the brand by changing one line.",
   "dia": {
    "w": 320,
    "h": 130,
    "box": [
     [
      8,
      10,
      304,
      22,
      "primitives   --blue-600: #1d4ed8"
     ],
     [
      8,
      40,
      304,
      22,
      "semantic     --color-action: var(--blue-600)"
     ],
     [
      8,
      70,
      304,
      22,
      "component    background: var(--color-action)"
     ]
    ],
    "arrow": [
     [
      160,
      32,
      160,
      40,
      ""
     ],
     [
      160,
      62,
      160,
      70,
      ""
     ]
    ],
    "note": [
     [
      8,
      112,
      "rebrand = change ONE line in the semantic layer"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       button.btn   text: \"action\"\n      */}\n    </>\n  );\n}\n",
   "css": ":root {\n  /* TODO — primitives: --blue-600 and --red-600 */\n\n  /* TODO — semantic: --color-action and --color-danger */\n}\n\n.btn {\n  color: white;\n  border: 0;\n  padding: .5em 1em;\n  /* TODO — consume the SEMANTIC token only */\n}\n",
   "hints": [
    "A component should never mention a colour name. It should mention a role.",
    ":root { --blue-600: #1d4ed8; --red-600: #b91c1c; --color-action: var(--blue-600); --color-danger: var(--red-600) } and .btn { background: var(--color-action) }."
   ],
   "sol": ":root {\n  --blue-600: #1d4ed8;\n  --red-600: #b91c1c;\n  --color-action: var(--blue-600);\n  --color-danger: var(--red-600);\n}\n.btn { background: var(--color-action); }",
   "why": "“How would you structure design tokens?” is a standard senior question. Two layers — primitive and semantic — is the expected answer.",
   "markup": "    <button className=\"btn\">action</button>"
  },
  {
   "id": "MIX-01",
   "useApp": false,
   "cat": "mix",
   "title": "color-mix() — a hover shade you never hand-picked",
   "goal": "A button whose hover state is 15% darker, derived from the base colour.",
   "use": [
    [
     "color-mix()",
     "blend two colours in a named colour space"
    ],
    [
     "in oklab",
     "a perceptually even space — mixes do not go muddy"
    ]
   ],
   "task": "Derive the hover background from --accent instead of writing a second hex value.",
   "dia": {
    "w": 320,
    "h": 110,
    "box": [
     [
      16,
      22,
      130,
      40,
      "--accent"
     ],
     [
      174,
      22,
      130,
      40,
      "+15% black",
      "hi"
     ]
    ],
    "note": [
     [
      8,
      80,
      "color-mix(in oklab, var(--accent) 85%, black)"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       button.btn   text: \"hover me\"\n      */}\n    </>\n  );\n}\n",
   "css": ":root { --accent: steelblue; }\n.btn { background: var(--accent); color: white; border: 0; padding: .5em 1em; }\n\n.btn:hover {\n  /* TODO — derive, do not hand-pick */\n}\n",
   "hints": [
    "color-mix(in <space>, <colour> <percent>, <colour>).",
    "background: color-mix(in oklab, var(--accent) 85%, black); — oklab keeps lightness perceptually even, so the shade does not turn grey the way an sRGB mix does."
   ],
   "sol": "background: color-mix(in oklab, var(--accent) 85%, black);",
   "why": "One brand colour now generates its own hover, active and disabled states. Change --accent and every derived state follows.",
   "markup": "    <button className=\"btn\">hover me</button>"
  },
  {
   "id": "MIX-02",
   "cat": "mix",
   "title": "A whole scale from one hue",
   "goal": "Five tints and shades of one accent, generated entirely in CSS.",
   "use": [
    [
     "color-mix() with white",
     "tints"
    ],
    [
     "color-mix() with black",
     "shades"
    ],
    [
     "custom properties",
     "store each step"
    ]
   ],
   "task": "Build --accent-100 through --accent-900 from a single --accent, using mixes only.",
   "dia": {
    "w": 320,
    "h": 110,
    "box": [
     [
      8,
      20,
      58,
      44,
      "100"
     ],
     [
      70,
      20,
      58,
      44,
      "300"
     ],
     [
      132,
      20,
      58,
      44,
      "500"
     ],
     [
      194,
      20,
      58,
      44,
      "700"
     ],
     [
      256,
      20,
      56,
      44,
      "900"
     ]
    ],
    "note": [
     [
      8,
      82,
      "one input hue → a consistent ramp"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.ramp\n         div   x5   from .map over [100,300,500,700,900]\n      */}\n    </>\n  );\n}\n",
   "css": ":root {\n  --accent: steelblue;\n  /* TODO — build the ramp with color-mix */\n}\n.ramp { display: grid; grid-template-columns: repeat(5, 1fr); gap: .25rem; }\n.sw { padding: 1rem .25rem; text-align: center; font-size: .75rem; }\n.s100 { background: var(--accent-100); }\n.s300 { background: var(--accent-300); }\n.s500 { background: var(--accent-500); }\n.s700 { background: var(--accent-700); }\n.s900 { background: var(--accent-900); }\n",
   "hints": [
    "Mix toward white for the light end and toward black for the dark end, with --accent as the 500.",
    "--accent-100: color-mix(in oklab, var(--accent) 20%, white); … --accent-500: var(--accent); … --accent-900: color-mix(in oklab, var(--accent) 40%, black);"
   ],
   "sol": "--accent-100: color-mix(in oklab, var(--accent) 20%, white);\n  --accent-300: color-mix(in oklab, var(--accent) 55%, white);\n  --accent-500: var(--accent);\n  --accent-700: color-mix(in oklab, var(--accent) 75%, black);\n  --accent-900: color-mix(in oklab, var(--accent) 40%, black);",
   "why": "Replaces a hand-tuned nine-colour palette with one input. This is the answer to “how would you support arbitrary brand colours?”",
   "markup": "    <div className=\"ramp\">\n      {[100,300,500,700,900].map(n => <div className={\"sw s\" + n} key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "MIX-03",
   "cat": "mix",
   "title": "Mixing with transparent and currentColor",
   "goal": "A tinted panel that matches whatever text colour it inherits, with no new variable.",
   "use": [
    [
     "currentColor",
     "the element’s computed color"
    ],
    [
     "color-mix(… transparent)",
     "produce an alpha version of any colour"
    ]
   ],
   "task": "Give .note a background that is 12% of its own text colour, so it re-tints automatically when the colour changes.",
   "dia": {
    "w": 320,
    "h": 120,
    "frame": [
     8,
     10,
     150,
     60,
     "color: steelblue"
    ],
    "box": [
     [
      14,
      20,
      138,
      44,
      "12% tint"
     ],
     [
      172,
      20,
      140,
      44,
      "12% tint",
      "hi"
     ]
    ],
    "note": [
     [
      172,
      12,
      "color: indianred"
     ],
     [
      8,
      88,
      "one rule, tint follows currentColor"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       p.note.info   text: \"info\"\n       p.note.warn   text: \"warn\"\n      */}\n    </>\n  );\n}\n",
   "css": ".info { color: steelblue; }\n.warn { color: indianred; }\n\n.note {\n  padding: 1rem;\n  border-left: 3px solid currentColor;\n  /* TODO — 12% tint of the current text colour */\n}\n",
   "hints": [
    "Mixing a colour with transparent gives you that colour at a chosen alpha.",
    "background: color-mix(in srgb, currentColor 12%, transparent);"
   ],
   "sol": "background: color-mix(in srgb, currentColor 12%, transparent);",
   "why": "currentColor plus color-mix is how one alert component serves info, warn, error and success without a single extra rule.",
   "markup": "    <>\n      <p className=\"note info\">info</p>\n      <p className=\"note warn\">warn</p>\n    </>"
  },
  {
   "id": "PRM-01",
   "useApp": false,
   "cat": "prim",
   "title": "stack — vertical rhythm, one class, no margins",
   "goal": "Any number of children with equal space between them and none at the ends.",
   "use": [
    [
     "display: grid",
     "one column"
    ],
    [
     "gap",
     "the rhythm"
    ],
    [
     "--space",
     "make the step overridable per instance"
    ]
   ],
   "task": "Write .stack so it spaces its children by var(--space, 1rem) and never adds outer space.",
   "dia": {
    "w": 320,
    "h": 140,
    "frame": [
     8,
     8,
     304,
     124,
     ".stack"
    ],
    "box": [
     [
      16,
      16,
      288,
      26,
      "a"
     ],
     [
      16,
      54,
      288,
      26,
      "b"
     ],
     [
      16,
      92,
      288,
      32,
      "c"
     ]
    ],
    "gap": [
     [
      160,
      42,
      12,
      "--space",
      0
     ],
     [
      160,
      80,
      12,
      "--space",
      0
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.stack\n         h2   text: \"Title\"\n         p   text: \"Body\"\n         button   text: \"Action\"\n      */}\n    </>\n  );\n}\n",
   "css": ".stack {\n  /* TODO — three declarations */\n}\n.stack > * { margin: 0; }\n",
   "hints": [
    "A one-column grid plus gap does everything the old margin-based \"owl\" selector did, without margin collapsing.",
    "display: grid; gap: var(--space, 1rem); — add nothing else. Set --space on an instance to change the rhythm there only."
   ],
   "sol": "display: grid;\n  gap: var(--space, 1rem);",
   "why": "The highest-leverage class in a stylesheet. Most vertical-spacing bugs disappear the moment sibling margins do.",
   "markup": "    <div className=\"stack\">\n      <h2>Title</h2>\n      <p>Body</p>\n      <button>Action</button>\n    </div>"
  },
  {
   "id": "PRM-02",
   "useApp": false,
   "cat": "prim",
   "title": "cluster — a wrapping row of unknown things",
   "goal": "Tags that wrap onto new lines with even spacing in both directions.",
   "use": [
    [
     "display: flex",
     "because the CONTENT decides the count"
    ],
    [
     "flex-wrap: wrap",
     "allow new lines"
    ],
    [
     "gap",
     "space both axes"
    ],
    [
     "align-items: center",
     "line up mixed heights"
    ]
   ],
   "task": "Write .cluster. Justify in one sentence why this one is flex and not grid.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ".cluster"
    ],
    "box": [
     [
      16,
      18,
      78,
      26,
      "tag"
     ],
     [
      100,
      18,
      110,
      26,
      "longer tag"
     ],
     [
      216,
      18,
      60,
      26,
      "tag"
     ],
     [
      16,
      54,
      90,
      26,
      "tag"
     ],
     [
      112,
      54,
      70,
      26,
      "tag"
     ]
    ],
    "note": [
     [
      8,
      126,
      "count unknown, widths vary → flex"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.cluster\n         span.tag   x5   from .map over [\"react\",\"css\",\"grid\",\"flexbox\",\"a1]\n      */}\n    </>\n  );\n}\n",
   "css": ".cluster {\n  /* TODO — four declarations */\n}\n.tag { background: aliceblue; padding: .35rem .75rem; border-radius: 999px; }\n",
   "hints": [
    "This is the one place flex genuinely beats grid.",
    "display: flex; flex-wrap: wrap; gap: var(--space, .5rem); align-items: center; — the item count is unknown and the widths vary, so the CONTENT decides the layout."
   ],
   "sol": "display: flex;\n  flex-wrap: wrap;\n  gap: var(--space, .5rem);\n  align-items: center;",
   "why": "Being able to name where flex wins is more convincing than preferring grid everywhere. This is that case.",
   "markup": "    <div className=\"cluster\">\n      {[\"react\",\"css\",\"grid\",\"flexbox\",\"a11y\"].map(t => <span className=\"tag\" key={t}>{t}</span>)}\n    </div>"
  },
  {
   "id": "PRM-03",
   "useApp": false,
   "cat": "prim",
   "title": "between — pinned to both ends",
   "goal": "A bar with content hard left and hard right, robust to a missing middle.",
   "use": [
    [
     "display: flex",
     "one axis"
    ],
    [
     "justify-content: space-between",
     "push to both ends"
    ],
    [
     "gap",
     "a floor so they never touch"
    ]
   ],
   "task": "Write .between, then say what happens when it has three children instead of two.",
   "dia": {
    "w": 320,
    "h": 100,
    "frame": [
     8,
     10,
     304,
     50,
     ".between"
    ],
    "box": [
     [
      16,
      18,
      90,
      34,
      "left"
     ],
     [
      214,
      18,
      90,
      34,
      "right"
     ]
    ],
    "gap": [
     [
      110,
      35,
      100,
      "free space",
      1
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.between\n         span   text: \"left\"\n         span   text: \"right\"\n      */}\n    </>\n  );\n}\n",
   "css": ".between {\n  /* TODO — three declarations */\n}\n.between > * { background: aliceblue; padding: .5rem 1rem; }\n",
   "hints": [
    "space-between puts all free space between items — with three children the third one lands in the middle.",
    "display: flex; justify-content: space-between; gap: var(--space, 1rem); align-items: center. For \"one item apart from the rest\" regardless of count, margin-inline-start: auto on that item is more robust."
   ],
   "sol": "display: flex;\n  justify-content: space-between;\n  gap: var(--space, 1rem);",
   "why": "The three-child failure is the point. Knowing when to switch to an auto margin instead is the actual skill.",
   "markup": "    <div className=\"between\">\n      <span>left</span>\n      <span>right</span>\n    </div>"
  },
  {
   "id": "PRM-04",
   "cat": "prim",
   "title": "sidebar — responsive with NO media query",
   "goal": "A sidebar beside main on wide screens that wraps below it on narrow ones, with no breakpoint anywhere.",
   "use": [
    [
     "flex-wrap: wrap",
     "allow the wrap to happen at all"
    ],
    [
     "flex-basis",
     "the sidebar’s ideal width"
    ],
    [
     "flex-grow: 999",
     "let main win all the free space"
    ],
    [
     "min-inline-size",
     "the threshold at which main refuses to shrink further"
    ]
   ],
   "task": "Build the wrapping sidebar. The wrap must be triggered by available space, not by a viewport width.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     150,
     66,
     "wide"
    ],
    "box": [
     [
      14,
      16,
      44,
      54,
      "side"
     ],
     [
      64,
      16,
      88,
      54,
      "main"
     ],
     [
      172,
      16,
      140,
      26,
      "side"
     ],
     [
      172,
      48,
      140,
      38,
      "main"
     ]
    ],
    "note": [
     [
      172,
      8,
      "narrow — it wrapped itself"
     ],
     [
      8,
      106,
      "basis 16rem · grow 999 on main · min 50% on main"
     ],
     [
      8,
      124,
      "the wrap happens when main would drop below 50%"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.with-sidebar\n         aside.side   text: \"side\"\n         div.main   text: \"main\"\n      */}\n    </>\n  );\n}\n",
   "css": ".with-sidebar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.side, .main { background: aliceblue; padding: 1rem; }\n\n.side {\n  /* TODO — ideal width, do not grow */\n}\n.main {\n  /* TODO — take everything, and set the wrap threshold */\n}\n",
   "hints": [
    "The trick is an absurdly large flex-grow on main so it always wins the free space, plus a min-inline-size that forces the wrap when it can no longer be satisfied.",
    ".side { flex-basis: 16rem; flex-grow: 1 } and .main { flex-basis: 0; flex-grow: 999; min-inline-size: 50% }."
   ],
   "sol": ".side { flex-basis: 16rem; flex-grow: 1; }\n.main { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }",
   "why": "The best answer to “how would you make this responsive without media queries?” It reacts to its own container, so it works in any slot.",
   "markup": "    <div className=\"with-sidebar\">\n      <aside className=\"side\">side</aside>\n      <div className=\"main\">main</div>\n    </div>"
  },
  {
   "id": "PRM-05",
   "useApp": false,
   "cat": "prim",
   "title": "switcher — N equal columns that stack themselves",
   "goal": "Three panels side by side when there is room, stacked when there is not — again with no breakpoint.",
   "use": [
    [
     "flex-basis with a calc",
     "the switch threshold"
    ],
    [
     "flex-grow: 1",
     "equal shares once side by side"
    ],
    [
     "flex-wrap: wrap",
     "the stack"
    ]
   ],
   "task": "Make .switcher flip between one row and one column at a 30rem container threshold.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     150,
     60,
     "≥ threshold"
    ],
    "box": [
     [
      14,
      16,
      42,
      44,
      "a"
     ],
     [
      60,
      16,
      42,
      44,
      "b"
     ],
     [
      106,
      16,
      46,
      44,
      "c"
     ],
     [
      172,
      16,
      140,
      22,
      "a"
     ],
     [
      172,
      42,
      140,
      22,
      "b"
     ],
     [
      172,
      68,
      140,
      22,
      "c"
     ]
    ],
    "note": [
     [
      172,
      8,
      "below threshold"
     ],
     [
      8,
      104,
      "basis: calc((30rem - 100%) * 999)"
     ],
     [
      8,
      122,
      "negative → huge → each child claims a whole row"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.switcher\n         div   text: \"a\"\n         div   text: \"b\"\n         div   text: \"c\"\n      */}\n    </>\n  );\n}\n",
   "css": ".switcher {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.switcher > * { background: aliceblue; padding: 1rem; }\n\n.switcher > * {\n  /* TODO — two declarations */\n}\n",
   "hints": [
    "When 100% exceeds 30rem the calc goes negative, which clamps to 0 and lets the items sit side by side. When it is below, the value becomes enormous and each item demands a full row.",
    "flex-grow: 1; flex-basis: calc((30rem - 100%) * 999);"
   ],
   "sol": "flex-grow: 1;\n  flex-basis: calc((30rem - 100%) * 999);",
   "why": "A genuine party trick, but the reasoning is real: a container-relative threshold expressed purely in the sizing algebra.",
   "markup": "    <div className=\"switcher\">\n      <div>a</div>\n      <div>b</div>\n      <div>c</div>\n    </div>"
  },
  {
   "id": "PRM-06",
   "useApp": false,
   "cat": "prim",
   "title": "cover — centred content, pinned header and footer",
   "goal": "A full-height section with a header at the top, a footer at the bottom and the main content centred between them.",
   "use": [
    [
     "display: grid",
     "one column"
    ],
    [
     "grid-template-rows: auto 1fr auto",
     "the middle track absorbs the height"
    ],
    [
     "place-items: center",
     "centre the middle child"
    ],
    [
     "min-height: 100dvh",
     "full screen, safely"
    ]
   ],
   "task": "Build the cover layout. The header and footer must never move.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     304,
     134,
     ""
    ],
    "track": [
     [
      300,
      0,
      0,
      ""
     ]
    ],
    "box": [
     [
      16,
      16,
      288,
      20,
      "header  auto"
     ],
     [
      16,
      56,
      288,
      44,
      "centred  1fr",
      "hi"
     ],
     [
      16,
      116,
      288,
      20,
      "footer  auto"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       section.cover\n         header   text: \"header\"\n         div.centre   text: \"centre\"\n         footer   text: \"footer\"\n      */}\n    </>\n  );\n}\n",
   "css": ".cover {\n  /* TODO — four declarations */\n}\n.cover > * { background: aliceblue; padding: .5rem; }\n.centre { display: grid; place-items: center; }\n",
   "hints": [
    "auto 1fr auto is the whole idea: the middle row takes all remaining height.",
    "display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; gap: 1rem;"
   ],
   "sol": "display: grid;\n  grid-template-rows: auto 1fr auto;\n  min-height: 100dvh;\n  gap: 1rem;",
   "why": "The same auto / 1fr / auto shape as TRK-07, rotated. Recognising one pattern serving both axes is what makes grid feel small instead of large.",
   "markup": "    <section className=\"cover\">\n      <header>header</header>\n      <div className=\"centre\">centre</div>\n      <footer>footer</footer>\n    </section>"
  },
  {
   "id": "PRM-07",
   "cat": "prim",
   "title": "grid-auto — the self-responsive gallery",
   "goal": "A card gallery that needs no breakpoints and works inside any container width.",
   "use": [
    [
     "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
     "the whole layout in one line"
    ],
    [
     "gap",
     "spacing"
    ]
   ],
   "task": "Write .grid-auto, including the narrow-screen guard from TRK-06.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ".grid-auto"
    ],
    "box": [
     [
      16,
      16,
      92,
      44,
      ""
     ],
     [
      116,
      16,
      92,
      44,
      ""
     ],
     [
      216,
      16,
      88,
      44,
      ""
     ],
     [
      16,
      68,
      92,
      44,
      ""
     ],
     [
      116,
      68,
      92,
      44,
      ""
     ]
    ],
    "note": [
     [
      8,
      126,
      "no media query — reacts to the CONTAINER"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid-auto\n         div.cell   x5   from .map over [1,2,3,4,5]\n      */}\n    </>\n  );\n}\n",
   "css": ".grid-auto {\n  /* TODO — two declarations */\n}\n.cell { background: aliceblue; padding: 1rem; }\n",
   "hints": [
    "auto-fit so the cards stretch when there are few, and min(100%, …) so the floor never exceeds the container.",
    "display: grid; gap: var(--space, 1rem); grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));"
   ],
   "sol": "display: grid;\n  gap: var(--space, 1rem);\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));",
   "why": "If you remember one line from this entire set, make it this one. It replaces three media queries and works in a sidebar.",
   "markup": "    <div className=\"grid-auto\">\n      {[1,2,3,4,5].map(n => <div className=\"cell\" key={n}>{n}</div>)}\n    </div>"
  },
  {
   "id": "PRM-08",
   "useApp": false,
   "cat": "prim",
   "title": "Compose the whole screen from primitives",
   "goal": "A full dashboard built only from stack, cluster, between, sidebar and grid-auto — with no new layout CSS.",
   "use": [
    [
     "display: grid",
     "for .cover, .stack and .grid-auto — the parent decides the tracks"
    ],
    [
     "grid-template-rows: auto 1fr auto",
     "give .cover a fixed header and footer with a fluid middle"
    ],
    [
     "display: flex + flex-wrap",
     "for .cluster and .with-sidebar — the content decides"
    ],
    [
     "flex-basis / flex-grow",
     "the sidebar rail and the 999 trick on main"
    ],
    [
     "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))",
     "the gallery, with no media query"
    ],
    [
     "justify-content: space-between",
     "the top bar"
    ]
   ],
   "task": "Write all seven primitives from scratch. You have built each one already in PRM-01 to PRM-07 — this is the capstone, so nothing is given to you. No media queries anywhere.",
   "dia": {
    "w": 320,
    "h": 150,
    "frame": [
     8,
     8,
     304,
     134,
     ".cover"
    ],
    "box": [
     [
      16,
      14,
      288,
      20,
      ".between  — top bar"
     ],
     [
      16,
      40,
      74,
      64,
      ".stack"
     ],
     [
      98,
      40,
      206,
      40,
      ".grid-auto"
     ],
     [
      98,
      84,
      206,
      20,
      ".cluster"
     ],
     [
      16,
      110,
      288,
      18,
      "footer"
     ]
    ],
    "note": [
     [
      8,
      146,
      "every box is an existing class — no new CSS"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       section.cover\n         header.between\n           strong   text: \"Logo\"\n           nav.cluster\n             a   href=\"#\"   text: \"one\"\n             a   href=\"#\"   text: \"two\"\n         div.with-sidebar\n           aside.side.stack\n             a   href=\"#\"   text: \"Overview\"\n             a   href=\"#\"   text: \"Reports\"\n             a   href=\"#\"   text: \"Settings\"\n           div.main.stack\n             div.grid-auto\n               article.card   x4   from .map over [1,2,3,4]\n             div.cluster\n               span.tag   x3   from .map over [\"live\",\"beta\",\"new\"]\n         footer   text: \"footer\"\n      */}\n    </>\n  );\n}\n",
   "css": "/* The capstone. Seven primitives, from memory. Cosmetics are done for you. */\n\n.card { background: aliceblue; padding: 1rem; border-radius: .5rem; }\n.tag { background: gainsboro; padding: .25rem .6rem; border-radius: 999px; }\na { color: steelblue; }\n\n.cover        { /* TODO — header / fluid middle / footer, full screen */ }\n.between      { /* TODO — ends pinned */ }\n.with-sidebar { /* TODO — the wrapping container */ }\n.side         { /* TODO — the rail */ }\n.main         { /* TODO — takes the rest, sets the wrap threshold */ }\n.stack        { /* TODO — vertical rhythm */ }\n.cluster      { /* TODO — wrapping row */ }\n.grid-auto    { /* TODO — self-responsive gallery */ }\n",
   "hints": [
    "Work outside in: .cover frames the page, .between is the bar, .with-sidebar splits the body, then .stack / .cluster / .grid-auto fill it. Six of the eight are two or three declarations.",
    ".cover { display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; gap: 1rem } · .between { display: flex; justify-content: space-between; gap: 1rem; align-items: center } · .with-sidebar { display: flex; flex-wrap: wrap; gap: 1rem } · .side { flex-basis: 12rem; flex-grow: 1 } · .main { flex-basis: 0; flex-grow: 999; min-inline-size: 50% } · .stack { display: grid; gap: var(--space, 1rem) } · .cluster { display: flex; flex-wrap: wrap; gap: var(--space, .5rem); align-items: center } · .grid-auto { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) }"
   ],
   "sol": ".cover { display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; gap: 1rem; }\n.between { display: flex; justify-content: space-between; gap: 1rem; align-items: center; }\n.with-sidebar { display: flex; flex-wrap: wrap; gap: 1rem; }\n.side { flex-basis: 12rem; flex-grow: 1; }\n.main { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }\n.stack { display: grid; gap: var(--space, 1rem); }\n.cluster { display: flex; flex-wrap: wrap; gap: var(--space, .5rem); align-items: center; }\n.grid-auto { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); }",
   "why": "The payoff of the whole set: a real screen with essentially zero bespoke layout CSS. That is the argument for primitives, demonstrated rather than asserted.",
   "markup": "    <section className=\"cover\">\n      <header className=\"between\">\n        <strong>Logo</strong>\n        <nav className=\"cluster\"><a href=\"#\">one</a><a href=\"#\">two</a></nav>\n      </header>\n\n      <div className=\"with-sidebar\">\n        <aside className=\"side stack\">\n          <a href=\"#\">Overview</a>\n          <a href=\"#\">Reports</a>\n          <a href=\"#\">Settings</a>\n        </aside>\n\n        <div className=\"main stack\">\n          <div className=\"grid-auto\">\n            {[1,2,3,4].map(n => <article className=\"card\" key={n}>Card {n}</article>)}\n          </div>\n          <div className=\"cluster\">\n            {[\"live\",\"beta\",\"new\"].map(t => <span className=\"tag\" key={t}>{t}</span>)}\n          </div>\n        </div>\n      </div>\n\n      <footer>footer</footer>\n    </section>"
  },
  {
   "id": "EXC-01",
   "cat": "exc",
   "title": "When flex beats grid",
   "goal": "Deciding correctly between the two for a row whose item count you do not control.",
   "use": [
    [
     "display: flex",
     "the correct answer here"
    ],
    [
     "flex-wrap",
     "because items must reflow by content width"
    ]
   ],
   "task": "Lay out a filter row whose chips vary in width and whose count comes from data. Then write one line explaining why grid is the wrong tool.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ""
    ],
    "box": [
     [
      16,
      18,
      54,
      26,
      "all"
     ],
     [
      76,
      18,
      90,
      26,
      "in progress"
     ],
     [
      172,
      18,
      70,
      26,
      "done"
     ],
     [
      16,
      54,
      120,
      26,
      "needs review"
     ],
     [
      142,
      54,
      60,
      26,
      "blocked"
     ]
    ],
    "note": [
     [
      8,
      126,
      "grid would force equal tracks and leave ragged gaps"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.filters\n         button.chip   x5   from .map over [\"all\",\"in progress\",\"done\",\"needs ]\n      */}\n    </>\n  );\n}\n",
   "css": ".filters {\n  /* TODO — the right display, and why */\n}\n.chip { background: aliceblue; border: 0; padding: .35rem .75rem; border-radius: 999px; }\n",
   "hints": [
    "Ask who decides the layout. Here the chips do — their own text width decides how many fit.",
    "display: flex; flex-wrap: wrap; gap: .5rem. A grid would impose uniform tracks, so short chips get stretched and long ones truncate."
   ],
   "sol": "display: flex;\n  flex-wrap: wrap;\n  gap: .5rem;",
   "why": "Preferring grid by default is right; being unable to name the exception is not. This is the exception.",
   "markup": "    <div className=\"filters\">\n      {[\"all\",\"in progress\",\"done\",\"needs review\",\"blocked\"].map(f => <button className=\"chip\" key={f}>{f}</button>)}\n    </div>"
  },
  {
   "id": "EXC-02",
   "cat": "exc",
   "title": "When a real table beats grid",
   "goal": "Recognising that tabular data needs table semantics, not a grid of divs.",
   "use": [
    [
     "<table>",
     "the correct element — supplied for you"
    ],
    [
     "border-collapse",
     "the styling that only tables have"
    ],
    [
     "position: sticky",
     "a header row that stays put"
    ]
   ],
   "task": "Style the table without converting it to a grid. Add a sticky header and collapsed borders.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     8,
     304,
     114,
     ""
    ],
    "box": [
     [
      16,
      16,
      288,
      22,
      "thead — sticky",
      "hi"
     ],
     [
      16,
      44,
      288,
      22,
      "row"
     ],
     [
      16,
      72,
      288,
      22,
      "row"
     ],
     [
      16,
      100,
      288,
      22,
      "row"
     ]
    ],
    "note": [
     [
      8,
      126,
      "display: grid on a table destroys its accessibility tree"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       table.tbl\n         thead\n           tr\n             th   text: \"Name\"\n             th   text: \"Role\"\n         tbody\n           tr\n             td   text: \"Ada\"\n             td   text: \"Engineer\"\n           tr\n             td   text: \"Grace\"\n             td   text: \"Admiral\"\n      */}\n    </>\n  );\n}\n",
   "css": ".tbl {\n  width: 100%;\n  /* TODO — collapse the borders */\n}\n.tbl th, .tbl td { border-bottom: 1px solid gainsboro; padding: .5rem; text-align: left; }\n\n.tbl thead th {\n  background: whitesmoke;\n  /* TODO — sticky header */\n}\n",
   "hints": [
    "border-collapse: collapse on the table; position: sticky with top: 0 on the header cells.",
    "Applying display: grid to a table element removes its implicit row and cell roles, so screen readers stop announcing \"row 2, column 1\". That alone rules it out."
   ],
   "sol": "border-collapse: collapse;\n\n/* thead th */ position: sticky; top: 0;",
   "why": "“Never use tables” is about layout tables from 1999. Data tables are still correct, and knowing the difference is the mark of someone who has read the a11y spec.",
   "markup": "    <table className=\"tbl\">\n      <thead><tr><th>Name</th><th>Role</th></tr></thead>\n      <tbody>\n        <tr><td>Ada</td><td>Engineer</td></tr>\n        <tr><td>Grace</td><td>Admiral</td></tr>\n      </tbody>\n    </table>"
  },
  {
   "id": "EXC-03",
   "cat": "exc",
   "title": "When absolute positioning is still the right answer",
   "goal": "A tooltip that must not affect the size of its parent.",
   "use": [
    [
     "position: absolute",
     "remove from flow so the parent does not grow"
    ],
    [
     "position: relative",
     "on the anchor"
    ]
   ],
   "task": "Show a tooltip above the button. The button’s row must not change height when it appears.",
   "dia": {
    "w": 320,
    "h": 130,
    "frame": [
     8,
     60,
     304,
     50,
     "row height NEVER changes"
    ],
    "box": [
     [
      90,
      16,
      140,
      26,
      "tooltip",
      "hi"
     ],
     [
      16,
      70,
      120,
      32,
      "anchor"
     ]
    ],
    "note": [
     [
      8,
      124,
      "a grid overlay would still be part of the layout"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.row\n         span.anchor   text: \"hover\"\n           span.tip   text: \"tooltip\"\n         span   text: \"sibling\"\n      */}\n    </>\n  );\n}\n",
   "css": ".row { display: flex; gap: 1rem; align-items: center; }\n.row > span { background: aliceblue; padding: .5rem; }\n\n.anchor {\n  /* TODO */\n}\n.tip {\n  background: black;\n  color: white;\n  padding: .25rem .5rem;\n  bottom: 100%;\n  left: 0;\n  /* TODO */\n}\n",
   "hints": [
    "Only out-of-flow positioning takes an element out of its parent’s size calculation.",
    ".anchor { position: relative } and .tip { position: absolute }. The grid-overlay trick from GRID-11 keeps the element in flow, so the parent would still size around it."
   ],
   "sol": ".anchor { position: relative; }\n.tip { position: absolute; }",
   "why": "Grid overlays replaced most absolute positioning, but not this. “Must not affect layout” is exactly what out-of-flow means.",
   "markup": "    <div className=\"row\">\n      <span className=\"anchor\">\n        hover\n        <span className=\"tip\">tooltip</span>\n      </span>\n      <span>sibling</span>\n    </div>"
  },
  {
   "id": "ANT-01",
   "useApp": false,
   "cat": "anti",
   "title": "Magic-number margins — replace with a rhythm",
   "goal": "The same visual spacing, with no per-element numbers and no sibling margins.",
   "use": [
    [
     ".stack",
     "one container decision replaces every child margin"
    ],
    [
     "gap",
     "the single source of spacing"
    ]
   ],
   "task": "Delete every margin below and reproduce the spacing with one container rule.",
   "dia": {
    "w": 320,
    "h": 140,
    "box": [
     [
      8,
      10,
      304,
      20,
      "BEFORE  h2 { margin-bottom: 13px }"
     ],
     [
      8,
      32,
      304,
      20,
      "        p  { margin-bottom: 27px }"
     ],
     [
      8,
      54,
      304,
      20,
      "        ul { margin-top: -4px }"
     ]
    ],
    "note": [
     [
      8,
      92,
      "AFTER   .stack { display: grid; gap: 1rem }"
     ],
     [
      8,
      116,
      "spacing becomes a container decision, not 3 child decisions"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.stack\n         h2   text: \"Title\"\n         p   text: \"Body copy.\"\n         ul\n           li   text: \"one\"\n           li   text: \"two\"\n      */}\n    </>\n  );\n}\n",
   "css": "/* the anti-pattern — delete all of it */\nh2 { margin-bottom: 13px; }\np  { margin-bottom: 27px; }\nul { margin-top: -4px; }\n\n.stack {\n  /* TODO — replace all three rules */\n}\n",
   "hints": [
    "Each magic number was tuned to fight margin collapsing. Remove the margins and the fight ends.",
    ".stack > * { margin: 0 } plus .stack { display: grid; gap: 1rem }."
   ],
   "sol": ".stack > * { margin: 0; }\n.stack { display: grid; gap: 1rem; }",
   "why": "Negative margins tuned by eye are the fingerprint of margin collapsing. Naming the cause — not just the fix — is what the interviewer is listening for.",
   "markup": "    <div className=\"stack\">\n      <h2>Title</h2>\n      <p>Body copy.</p>\n      <ul><li>one</li><li>two</li></ul>\n    </div>"
  },
  {
   "id": "ANT-02",
   "visual": false,
   "verify": "The button is red both ways. Verify by reading precedence: the layered version wins WITHOUT !important, so the next override still has somewhere to go.",
   "cat": "anti",
   "title": "!important and the specificity war",
   "goal": "The override working without !important and without deepening the selector.",
   "use": [
    [
     "@layer",
     "order the cascade explicitly"
    ],
    [
     "low-specificity selectors",
     "so overrides need no escalation"
    ]
   ],
   "task": "Make .btn-danger win over the base .btn without !important and without a longer selector.",
   "dia": {
    "w": 320,
    "h": 140,
    "box": [
     [
      8,
      10,
      304,
      20,
      "BEFORE  .page .card .btn { background: blue }"
     ],
     [
      8,
      32,
      304,
      20,
      "        .btn-danger { background: red !important }"
     ]
    ],
    "note": [
     [
      8,
      70,
      "AFTER   @layer base, components;"
     ],
     [
      8,
      88,
      "        later layer wins regardless of specificity"
     ],
     [
      8,
      120,
      "!important removes your last escape hatch — keep it free"
     ]
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       button.btn.btn-danger   text: \"delete\"\n      */}\n    </>\n  );\n}\n",
   "css": "/* the anti-pattern */\n.page .card .btn { background: steelblue; color: white; }\n.btn-danger { background: indianred !important; }\n\n/* TODO — rewrite with @layer, no !important, no deep selectors */\n",
   "hints": [
    "A declaration in a later @layer beats one in an earlier layer no matter how specific the earlier selector is.",
    "@layer base, components; @layer base { .btn { background: steelblue; color: white } } @layer components { .btn-danger { background: indianred } }"
   ],
   "sol": "@layer base, components;\n@layer base { .btn { background: steelblue; color: white; } }\n@layer components { .btn-danger { background: indianred; } }",
   "why": "The real cost of !important is that the next override has nowhere left to go. Layers make precedence a design decision instead of an arms race.",
   "markup": "    <button className=\"btn btn-danger\">delete</button>"
  },
  {
   "id": "ANT-03",
   "cat": "anti",
   "title": "Fixed heights on text — the clipped card",
   "goal": "Cards that stay aligned but grow when their content needs more room.",
   "use": [
    [
     "min-height",
     "a floor, not a ceiling"
    ],
    [
     "align-items: stretch",
     "equal heights for free — the grid default"
    ]
   ],
   "task": "The cards clip their text at a fixed height. Fix it so they align AND grow.",
   "dia": {
    "w": 300,
    "h": 96,
    "frame": [
     4,
     4,
     292,
     66,
     ""
    ],
    "box": [
     [
      10,
      12,
      136,
      50,
      "short"
     ],
     [
      154,
      12,
      136,
      50,
      "long copy, clipped",
      "hi"
     ]
    ],
    "note": [
     [
      10,
      80,
      "height: 120px — the third line is cut off"
     ]
    ],
    "alt": {
     "w": 300,
     "h": 96,
     "frame": [
      4,
      4,
      292,
      80,
      ""
     ],
     "box": [
      [
       10,
       12,
       136,
       64,
       "short"
      ],
      [
       154,
       12,
       136,
       64,
       "long copy, all of it"
      ]
     ],
     "note": [
      [
       10,
       88,
       "min-height: both grow, still equal"
      ]
     ]
    },
    "labels": [
     "BEFORE — fixed height",
     "AFTER — min-height"
    ]
   },
   "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         div.card   text: \"short\"\n         div.card   text: \"a much longer piece of copy \"\n      */}\n    </>\n  );\n}\n",
   "css": ".grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }\n\n/* the anti-pattern */\n.card {\n  height: 120px;\n  overflow: hidden;\n  background: aliceblue;\n  padding: 1rem;\n}\n/* TODO — align without clipping */\n",
   "hints": [
    "Grid and flex items already stretch to equal heights. The fixed height was never needed for alignment.",
    ".card { min-height: 7.5rem } and delete height and overflow. Equal heights come free from the default stretch."
   ],
   "sol": ".card { min-height: 7.5rem; background: aliceblue; padding: 1rem; }",
   "why": "Clipped text is a content bug that only shows up with real data or another language. min-height gives you the visual floor without the failure mode.",
   "markup": "    <div className=\"grid\">\n      <div className=\"card\">short</div>\n      <div className=\"card\">a much longer piece of copy that needs three lines to breathe properly</div>\n    </div>"
  },
{
  "id": "XTRA-01",
  "cat": "extra",
  "title": "Adjacent Sibling (+) — spacing without trailing margin",
  "goal": "Space items in a list only between siblings, never adding margin after the last child.",
  "use": [
    [
      "+ (adjacent sibling)",
      "select any item immediately preceded by a sibling"
    ]
  ],
  "task": "Apply a 1rem top margin to every .item that immediately follows another .item.",
  "dia": {
    "w": 320,
    "h": 140,
    "frame": [
      8,
      8,
      304,
      124,
      ".list"
    ],
    "box": [
      [
        16,
        16,
        288,
        30,
        "1"
      ],
      [
        16,
        56,
        288,
        30,
        "2"
      ],
      [
        16,
        96,
        288,
        30,
        "3"
      ]
    ],
    "gap": [
      [
        16,
        46,
        10,
        "1rem",
        0
      ],
      [
        16,
        86,
        10,
        "1rem",
        0
      ]
    ]
  },
  "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.list\n         div.item   x3   [1,2,3]\n      */}\n    </>\n  );\n}\n",
  "markup": "    <div className=\"list\">\n      <div className=\"item\">1</div>\n      <div className=\"item\">2</div>\n      <div className=\"item\">3</div>\n    </div>",
  "css": ".list { border: 1px dashed silver; padding: .5rem; }\n.item { background: aliceblue; padding: .5rem; }\n/* TODO — space adjacent siblings */\n",
  "hints": [
    "The adjacent sibling combinator + matches an element immediately preceded by the former.",
    ".item + .item { margin-top: 1rem; }"
  ],
  "sol": ".item + .item {\n  margin-top: 1rem;\n}",
  "why": "Adjacent sibling combinators space items strictly in between, avoiding outer margin leakage at container edges."
},
{
  "id": "XTRA-02",
  "cat": "extra",
  "title": ":where() — design system reset with zero specificity",
  "goal": "Make base element styles easily overridable by any downstream utility without specificity wars.",
  "use": [
    [
      ":where()",
      "wrap selectors with (0,0,0) specificity"
    ]
  ],
  "task": "Style headings using :where(h1, h2, h3) so a simple .title class can override the color.",
  "dia": {
    "w": 320,
    "h": 100,
    "frame": [
      8,
      8,
      304,
      84,
      ".doc"
    ],
    "box": [
      [
        16,
        20,
        288,
        60,
        "h2.title (green)"
      ]
    ]
  },
  "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.doc\n         h2.title   text: \"Article Heading\"\n      */}\n    </>\n  );\n}\n",
  "markup": "    <div className=\"doc\">\n      <h2 className=\"title\">Article Heading</h2>\n    </div>",
  "css": "/* TODO — zero-specificity heading defaults */\nh2 { color: gray; }\n.title { color: seagreen; }\n",
  "hints": [
    ":where() drops the specificity of its entire argument list to 0,0,0.",
    ":where(h1, h2, h3) { color: gray; }"
  ],
  "sol": ":where(h1, h2, h3) {\n  color: gray;\n}",
  "why": ":where() guarantees zero specificity, making design system defaults effortlessly overridable without !important."
},
{
  "id": "XTRA-03",
  "cat": "extra",
  "title": ":has() — parent styling conditional on child state",
  "goal": "Style a form card with a highlighted border only when it contains a checked checkbox.",
  "use": [
    [
      ":has()",
      "select a parent element that contains matching children"
    ]
  ],
  "task": "Add a border highlight to .card when it contains an input:checked.",
  "dia": {
    "w": 320,
    "h": 100,
    "frame": [
      8,
      8,
      304,
      84,
      ".card:has(:checked)"
    ],
    "box": [
      [
        16,
        20,
        288,
        60,
        "[x] Selected card",
        "hi"
      ]
    ]
  },
  "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card\n         label\n           input[type=checkbox]\n      */}\n    </>\n  );\n}\n",
  "markup": "    <div className=\"card\">\n      <label>\n        <input type=\"checkbox\" defaultChecked /> Enable Turbo Mode\n      </label>\n    </div>",
  "css": ".card { padding: 1rem; border: 2px solid gainsboro; border-radius: 8px; }\n/* TODO — highlight card when checked */\n",
  "hints": [
    ":has() acts as a parent selector based on descendant state.",
    ".card:has(:checked) { border-color: darkorange; background: #fff7ed; }"
  ],
  "sol": ".card:has(:checked) {\n  border-color: darkorange;\n  background: #fff7ed;\n}",
  "why": ":has() removes the need to lift state into React just to style a parent container based on child interaction."
},
{
  "id": "XTRA-04",
  "cat": "extra",
  "title": "-webkit-line-clamp — clamp long text to exactly N lines",
  "goal": "Truncate multi-line paragraph descriptions to exactly 2 lines with a trailing ellipsis.",
  "use": [
    [
      "-webkit-line-clamp",
      "limit text box to N visible lines"
    ],
    [
      "display: -webkit-box",
      "enable box line clamping"
    ],
    [
      "overflow: hidden",
      "hide clamped text"
    ]
  ],
  "task": "Clamp .desc text to 2 lines with an ellipsis.",
  "dia": {
    "w": 320,
    "h": 100,
    "frame": [
      8,
      8,
      304,
      84,
      ".card"
    ],
    "box": [
      [
        16,
        16,
        288,
        68,
        "Title\\nTwo lines of text..."
      ]
    ]
  },
  "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.card\n         p.desc   long description\n      */}\n    </>\n  );\n}\n",
  "markup": "    <div className=\"card\">\n      <p className=\"desc\">\n        A very long description that spans multiple sentences and should gracefully truncate after exactly two lines with an ellipsis.\n      </p>\n    </div>",
  "css": ".card { width: 260px; padding: .5rem; border: 1px solid gainsboro; }\n.desc {\n  /* TODO — clamp to 2 lines */\n}\n",
  "hints": [
    "Line clamping requires display: -webkit-box, -webkit-box-orient: vertical, and overflow: hidden.",
    ".desc { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }"
  ],
  "sol": ".desc {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}",
  "why": "Multi-line clamping prevents variable length content from breaking card grids and table layouts."
},
{
  "id": "XTRA-05",
  "cat": "extra",
  "title": "text-overflow: ellipsis — single-line text truncate",
  "goal": "Truncate an overflowing single-line breadcrumb or email address with an ellipsis.",
  "use": [
    [
      "text-overflow: ellipsis",
      "render ellipsis on overflow"
    ],
    [
      "white-space: nowrap",
      "prevent text wrapping"
    ],
    [
      "overflow: hidden",
      "contain overflow"
    ]
  ],
  "task": "Truncate .truncate to a single line with an ellipsis.",
  "dia": {
    "w": 320,
    "h": 80,
    "frame": [
      8,
      8,
      304,
      64,
      ".bar"
    ],
    "box": [
      [
        16,
        16,
        288,
        48,
        "user.longname@corporate..."
      ]
    ]
  },
  "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.bar\n         span.truncate   long email string\n      */}\n    </>\n  );\n}\n",
  "markup": "    <div className=\"bar\">\n      <span className=\"truncate\">devang.manjramkar.verylongemail@enterprise-fleetpulse.io</span>\n    </div>",
  "css": ".bar { width: 220px; padding: .5rem; border: 1px solid gainsboro; }\n.truncate {\n  display: block;\n  /* TODO — single-line truncate */\n}\n",
  "hints": [
    "Single-line truncation needs white-space: nowrap, overflow: hidden, and text-overflow: ellipsis.",
    ".truncate { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }"
  ],
  "sol": ".truncate {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
  "why": "Truncating single lines prevents horizontal overflow blowouts in responsive tables and header breadcrumbs."
},
{
  "id": "XTRA-06",
  "cat": "extra",
  "title": "linear-gradient — scrim overlay for text contrast",
  "goal": "Create a bottom-to-top dark scrim gradient behind text over an image.",
  "use": [
    [
      "linear-gradient",
      "render smooth alpha transition from dark to transparent"
    ]
  ],
  "task": "Apply a linear-gradient from rgba(0,0,0,0.8) at the bottom to transparent at the top.",
  "dia": {
    "w": 320,
    "h": 130,
    "frame": [
      8,
      8,
      304,
      114,
      ".hero"
    ],
    "box": [
      [
        16,
        70,
        288,
        40,
        "White text over dark scrim"
      ]
    ]
  },
  "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.hero\n         div.scrim\n           h3.title\n      */}\n    </>\n  );\n}\n",
  "markup": "    <div className=\"hero\">\n      <div className=\"scrim\">\n        <h3 className=\"title\">Fleet Analytics</h3>\n      </div>\n    </div>",
  "css": ".hero { height: 110px; background: #94a3b8; border-radius: 8px; overflow: hidden; }\n.scrim {\n  height: 100%;\n  display: flex;\n  align-items: flex-end;\n  padding: 1rem;\n  color: white;\n  /* TODO — bottom-to-top dark scrim */\n}\n",
  "hints": [
    "linear-gradient(to top, rgba(0,0,0,0.8), transparent) paints from bottom to top.",
    ".scrim { background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); }"
  ],
  "sol": ".scrim {\n  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);\n}",
  "why": "CSS gradients provide WCAG-compliant contrast ratios over dynamic images without extra DOM layers."
},
{
  "id": "XTRA-07",
  "cat": "extra",
  "title": "transform + transition — GPU micro-interaction",
  "goal": "Lift a card smoothly by 4px on hover without triggering CPU layout reflows.",
  "use": [
    [
      "transform: translateY",
      "translate on composite layer"
    ],
    [
      "transition: transform",
      "animate property smoothly"
    ]
  ],
  "task": "Smoothly elevate .card on hover using transform: translateY(-4px).",
  "dia": {
    "w": 320,
    "h": 100,
    "frame": [
      8,
      8,
      304,
      84,
      ".grid"
    ],
    "box": [
      [
        16,
        14,
        140,
        56,
        "Normal"
      ],
      [
        168,
        10,
        140,
        56,
        "Hovered (-4px)",
        "hi"
      ]
    ]
  },
  "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.grid\n         button.card   text: \"Card 1\"\n         button.card   text: \"Card 2\"\n      */}\n    </>\n  );\n}\n",
  "markup": "    <div className=\"grid\">\n      <button className=\"card\">Card 1</button>\n      <button className=\"card\">Card 2</button>\n    </div>",
  "css": ".grid { display: flex; gap: 1rem; padding: 1rem; }\n.card {\n  padding: 1rem;\n  border: 1px solid gainsboro;\n  background: white;\n  border-radius: 8px;\n  cursor: pointer;\n  /* TODO — smooth transform transition */\n}\n.card:hover {\n  /* TODO — lift card */\n}\n",
  "hints": [
    "transition: transform 150ms ease animates transform without triggering layout reflows.",
    ".card { transition: transform 150ms ease; } .card:hover { transform: translateY(-4px); }"
  ],
  "sol": ".card {\n  transition: transform 150ms ease;\n}\n.card:hover {\n  transform: translateY(-4px);\n}",
  "why": "Animating transform is GPU-accelerated and avoids costly recalculate style and layout passes."
},
{
  "id": "XTRA-08",
  "cat": "extra",
  "title": "var(--token) — dynamic CSS variable from React",
  "goal": "Consume a dynamic CSS custom property --progress passed via React inline style.",
  "use": [
    [
      "var(--progress)",
      "consume CSS custom property passed by React"
    ],
    [
      "width: var()",
      "bind width dynamically"
    ]
  ],
  "task": "Set the .bar-fill width to var(--progress, 0%).",
  "dia": {
    "w": 320,
    "h": 90,
    "frame": [
      8,
      8,
      304,
      74,
      ".bar-track"
    ],
    "box": [
      [
        16,
        28,
        200,
        34,
        "70% fill",
        "hi"
      ]
    ]
  },
  "jsx": "import React from 'react';\n\nexport default function App() {\n  return (\n    <>\n      {/* TODO — build this structure. Class names are exact; the CSS depends on them.\n       div.bar-track\n         div.bar-fill   style: { '--progress': '70%' }\n      */}\n    </>\n  );\n}\n",
  "markup": "    <div className=\"bar-track\">\n      <div className=\"bar-fill\" style={{ '--progress': '70%' }}></div>\n    </div>",
  "css": ".bar-track { width: 280px; height: 32px; background: whitesmoke; border-radius: 999px; overflow: hidden; border: 1px solid gainsboro; }\n.bar-fill {\n  height: 100%;\n  background: steelblue;\n  /* TODO — bind width to --progress */\n}\n",
  "hints": [
    "CSS custom properties set in React style can be read via var(--progress, 0%).",
    ".bar-fill { width: var(--progress, 0%); }"
  ],
  "sol": ".bar-fill {\n  width: var(--progress, 0%);\n}",
  "why": "Binding CSS variables from React style props decouples dynamic numeric logic from stylesheet structure."
}
 ]
};
