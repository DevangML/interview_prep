#!/usr/bin/env python3
"""
Build content.json — the comprehensive knowledge extraction from the interview_prep repo.
Encodes every concept, best practice, trick, question, resource, and drill from:
  - SAVE_GAME_STATE.json (quest graph: 14 quests + 4 arena)
  - 7_EXHAUSTIVE_SYLLABUS_V3.md (5 layers)
  - 2_MCQ_MASTER_GUIDE.md (traps)
  - 8_RESOURCE_CURRICULUM.md (12 units)
  - 9_CODING_ROUND_PLAYBOOK.md (8 primitives, task corpus)
  - 10_DUAL_TRACK_BATTLE_PLAN.md (defense cards)
  - Workbench data: ladder.ts, challenges.ts, rapid.ts, battles.ts, css100.ts, targets.ts
  - Web research on Accenture/Mettl OA patterns
"""
import json, os, re

ROOT = "/Users/devang/Desktop/interview_prep"

def load_json(path):
    with open(os.path.join(ROOT, path), "r") as f:
        return json.load(f)

save = load_json("_bmad-output/react_crucible/SAVE_GAME_STATE.json")
campaign = save["active_campaign"]

# ── Build the content structure ──
content = {
    "$schema": "content.json v1 — interview_prep knowledge graph",
    "$generated": "2026-08-26",
    "$purpose": "Comprehensive encoding of every concept, practice, trick, question, resource, and drill for React/JS/CSS/Frontend mastery — Accenture Mettl OA + Technical Rounds",
    "$target_role": {
        "company": "Accenture",
        "title": "Custom Software Engineer (React.js)",
        "requisition": campaign["requisition"],
        "platform": campaign["assessment_platform"],
        "experience": "3+ years lateral",
        "location": "Pune"
    },

    # ═══════════════════════════════════════════════
    # SECTION 1: ASSESSMENT FORMAT MODEL
    # ═══════════════════════════════════════════════
    "assessment_format": {
        "description": "What the test object actually is — reconstructed from Mettl product pages",
        "possible_skus": [
            {"id": "A", "name": "React Redux Developer Test", "structure": "36 MCQ, no coding", "duration_min": 50, "exp_band": "2-5 yrs", "probability": 0.4},
            {"id": "B", "name": "ReactJS Online Test", "structure": "19-20 MCQ + 1 front-end simulator coding", "duration_min": 60, "exp_band": "1-3 yrs", "probability": 0.3},
            {"id": "C", "name": "Front-end Developer (Experienced)", "structure": "19 MCQ + 1 coding", "duration_min": 60, "exp_band": "5-10 yrs", "probability": 0.15},
            {"id": "D", "name": "Accenture custom blend", "structure": "25-40 MCQ ± 1 coding", "duration_min": "45-60", "probability": 0.15}
        ],
        "envelope": {
            "mcq_count_range": [19, 40],
            "duration_range_min": [45, 60],
            "coding_question": "CONFIRMED PRESENT",
            "pace_seconds_per_mcq": "75-95",
            "grading": "Auto-graded. Hidden test cases with grade weights. Score = sum of passed cases. Partial credit is real.",
            "study_split": "60% theory / 40% coding"
        },
        "technical_rounds": "OA → TWO technical rounds → HR. Scenario-driven, not theoretical. JS internals + output puzzles, perf, async, routing, project deep-dive. Separate managerial round on Agile/JIRA/SDLC.",
        "coding_simulator": "Mettl Front-end Simulator: HTML/CSS/JS tabs with live-rendering and browser console. React is named but sandbox may be vanilla.",
        "format_facts": [
            "Coding question runs on Mettl's Front-end Simulator — assume vanilla DOM JS, not React, in the IDE",
            "React 19 is real but thin — 2-4 questions, not a pillar",
            "Proctoring may include secure browser, tab-switch counting, webcam, code-similarity checks"
        ]
    },

    # ═══════════════════════════════════════════════
    # SECTION 2: ALTITUDE MODEL (DUAL-TRACK)
    # ═══════════════════════════════════════════════
    "altitude_model": {
        "description": "OA and technical rounds test the SAME topics at different cognitive altitudes. A3 subsumes A1.",
        "altitudes": {
            "A1_RECOGNISE": {"serves": "mettl_oa", "demand": "80 seconds per MCQ", "bloom": "Remember / Apply"},
            "A2_BUILD": {"serves": ["mettl_oa", "technical_round"], "demand": "blank file, on the clock, every edge case handled", "bloom": "Apply"},
            "A3_DEFEND": {"serves": "technical_round", "demand": "spoken aloud, <=90 seconds, no notes", "bloom": "Analyse / Evaluate"}
        },
        "close_condition": "A topic is CLOSED only when A1 AND A2 AND A3 all pass. NEVER close at A2.",
        "learn_order": ["A1", "A2", "A3"],
        "value_order": ["A3", "A1"],
        "key_insight": "Every defense rehearsed hardens the recognition beneath it. The interview layer is not extra work — it is the strongest OA rehearsal.",
        "exception": "A3 buys accuracy, NOT speed. Timed recognition stays its own drill.",
        "defense_card_fields": [
            {"field": "MECHANISM", "desc": "One sentence, first principles, no jargon shield"},
            {"field": "TRADE-OFF", "desc": "When would you NOT use this, and what does it cost"},
            {"field": "FAILURE", "desc": "What breaks without it — THIS FIELD IS ALSO THE OA TRAP (bidirectional)"},
            {"field": "SHIPPED", "desc": "Where you actually used it — MUST name a real file"},
            {"field": "NUMBER", "desc": "One metric: renders saved, ms, KB, rows"}
        ],
        "laws": [
            "One trap, two directions — never write an interview answer that isn't already an OA trap",
            "One build, two rounds — the Tier S task built for the OA IS the machine-coding rehearsal",
            "One project, every SHIPPED field — five stories from one system reads as ownership",
            "One page, one taper"
        ]
    },

    # ═══════════════════════════════════════════════
    # SECTION 3: LEARNING ARCHITECTURE
    # ═══════════════════════════════════════════════
    "learning_architecture": {
        "four_move_unit": [
            {"move": "MODEL", "purpose": "Build the causal picture — why the thing exists", "format": "One canonical read or video", "time_share": "15%"},
            {"move": "MECHANISM", "purpose": "Trace the machine step-by-step on a concrete snippet", "format": "Hand-trace on paper / console", "time_share": "15%"},
            {"move": "DRILL", "purpose": "Retrieval under time — MCQs, output prediction", "format": "Question banks, closed-book", "time_share": "55%"},
            {"move": "PROOF", "purpose": "Explain aloud in 60s without notes; log every miss", "format": "Feynman + error log", "time_share": "15%"}
        ],
        "resource_tiers": {
            "CANONICAL": "one authoritative source per topic — react.dev, MDN, redux.js.org",
            "EXPLAINER": "one mental-model boost — Josh Comeau, Dan Abramov",
            "DRILL": "high-volume retrieval material — lydiahallie quiz, sudheerj bank",
            "PROOF": "a place to be wrong safely — browser console, StackBlitz"
        },
        "error_log_format": "[topic] | what I answered | what is true | THE ONE SENTENCE THAT WOULD HAVE SAVED ME",
        "review_intervals": ["+1d", "+3d", "+7d"],
        "leech_rule": "A miss repeated 3× is a leech — rewrite as a heuristic and drill only that"
    },

    # ═══════════════════════════════════════════════
    # SECTION 4: CODING PRIMITIVES
    # ═══════════════════════════════════════════════
    "coding_primitives": [
        {"id": "P1", "name": "Controlled input", "pattern": "value={x} + onChange={e=>setX(e.target.value)}", "feeds": "every form, search, filter"},
        {"id": "P2", "name": "Immutable list ops", "pattern": "add [...xs, n] · delete xs.filter(x=>x.id!==id) · update xs.map(x=>x.id===id?{...x,done:!x.done}:x)", "feeds": "todo, cart, CRUD"},
        {"id": "P3", "name": "Derived state", "pattern": "compute during render; NEVER store what you can derive", "feeds": "filtered list, totals, page slice, counts"},
        {"id": "P4", "name": "Index / selection state", "pattern": "one number (or id, or Set) in state decides which of N is open/active", "feeds": "accordion, tabs, carousel, star rating, stepper"},
        {"id": "P5", "name": "Effect + cleanup", "pattern": "useEffect(() => { const id = …; return () => clear(id) }, [deps])", "feeds": "timer, debounce, outside-click, subscriptions"},
        {"id": "P6", "name": "Async triad", "pattern": "loading / error / data — all three rendered, plus AbortController", "feeds": "any fetch task"},
        {"id": "P7", "name": "Boundary math", "pattern": "Math.ceil(total/size) · slice((p-1)*size, p*size) · clamp with Math.min/max", "feeds": "pagination, carousel, stepper"},
        {"id": "P8", "name": "Recursion on trees", "pattern": "component renders itself over node.children", "feeds": "nested comments, file directory"}
    ],

    # ═══════════════════════════════════════════════
    # SECTION 5: THE SYLLABUS (5 LAYERS)
    # ═══════════════════════════════════════════════
    "syllabus": {
        "layer_0_format_model": "See assessment_format section",

        "layer_1_explicit": {
            "description": "Verbatim from Mettl's published sub-skill lists — the non-negotiable core",
            "sections": {
                "1.1_reactjs_basics": ["ReactJS components", "Events", "ReactJS functions", "Props", "Pure Component", "Render method", "State", "State application", "Props application", "Lifecycle application", "Virtual DOM vs Actual DOM", "Higher Order Components", "React – JSX", "React – Rendering", "React – Lifecycle"],
                "1.2_react_tools_ecosystem": ["React 19 – JavaScript", "React Router", "Redux", "Flux", "Webpack"],
                "1.3_react_19_concepts": ["Server Components", "Rendering: createRoot, hydrateRoot", "Actions", "New hooks"],
                "1.4_redux": ["Pure functions", "Actions", "Reducers", "Store", "Data flow", "React-Redux integration"],
                "1.5_es6": ["Template and extended literals", "Arrow functions", "Destructuring assignments", "Modules", "Classes"],
                "1.6_javascript_basics": ["Scopes and namespaces", "Parsing", "Events and event handlers", "Functions", "Arrays", "Object usage and properties", "Forms", "HTML", "Links", "JavaScript – DOM", "JavaScript – Asynchronous", "JavaScript – State management"],
                "1.7_html5": ["HTML5 Semantics", "HTML5 API", "HTML5 Elements", "HTML5 Attributes", "HTML5 Multimedia"],
                "1.8_css3": ["CSS3 Responsive design", "CSS3 Flexbox", "CSS3 Layout", "CSS3 Backgrounds", "CSS3 Text & font styling", "margins", "borders", "shadows", "transformations"],
                "1.9_hands_on": ["Front-end Simulator – JavaScript"]
            }
        },

        "layer_2_implicit": {
            "description": "First principles you must own to DECODE Layer 1 — distractors are built from these",
            "domains": {
                "2A_js_memory_identity": {
                    "unlocks": ["Props", "PureComponent", "React.memo", "Redux purity"],
                    "concepts": [
                        "Primitives vs objects; heap and reference/handle",
                        "Pass-by-sharing (not by reference): reassigning a param ≠ mutating it",
                        "=== vs Object.is vs deep equality; why {} !== {} and [] !== []",
                        "Shallow comparison — the exact loop React.PureComponent/React.memo runs",
                        "Immutability: structural sharing, shallow spread, nested spread required",
                        "Consequence chain: mutate state → same reference → bail-out → no re-render"
                    ]
                },
                "2B_execution_model": {
                    "unlocks": ["Scopes", "Functions", "Async", "Hooks", "Event loop"],
                    "concepts": [
                        "Execution context, call stack, lexical environment records",
                        "Hoisting: var vs let/const, Temporal Dead Zone, function vs class declaration",
                        "Closures: a function + the environment it captured; every render creates a new closure",
                        "this: four binding rules (default / implicit / explicit / new), lost this on callback, call/apply/bind, arrow lexical this",
                        "Event loop: call stack → microtask queue (Promises, queueMicrotask) → macrotask queue (setTimeout, I/O)",
                        "Promise states, then chaining, async/await as syntax over same machine, Promise.all/race/allSettled"
                    ]
                },
                "2C_dom_browser": {
                    "unlocks": ["Events", "DOM", "Forms", "Links", "coding simulator"],
                    "concepts": [
                        "DOM as tree; nodes vs elements; parsing → DOM+CSSOM → render tree → layout → paint → composite",
                        "Event propagation: capture → target → bubble; stopPropagation vs preventDefault vs stopImmediatePropagation",
                        "event.target vs event.currentTarget",
                        "Event delegation — React attaches one listener at root container (React 17+), SyntheticEvent",
                        "Forms: controlled vs uncontrolled, default form submission and page reload, FormData",
                        "Reflow vs repaint; DOM writes are expensive — the reason the VDOM exists"
                    ]
                },
                "2D_rendering_theory": {
                    "unlocks": ["Virtual DOM", "render method", "reconciliation", "keys", "lifecycle"],
                    "concepts": [
                        "Diff is cheaper than re-layout; O(n³)→O(n) heuristic and its two assumptions",
                        "Keys: identity across renders; index keys corrupt state on insert/reorder/delete",
                        "Render phase (pure, interruptible) vs commit phase (side-effectful)",
                        "Mount / update / unmount — the only three real lifecycle events",
                        "Batching: React 18+ automatic batching everywhere; two setStates with stale reads yield +1 not +2",
                        "Strict Mode double-invoke in development — probe for missing cleanup"
                    ]
                },
                "2E_data_flow_theory": {
                    "unlocks": ["Flux", "Redux", "Context", "HOCs", "lifting state"],
                    "concepts": [
                        "Unidirectional data flow as founding constraint",
                        "Flux: action → dispatcher → multiple stores → view. Redux: action → single store → reducer, NO dispatcher",
                        "Pure function: same input → same output, no side effects",
                        "Reducer as fold: (state, action) => newState; must be pure for time-travel/replay/SSR/tests",
                        "Middleware as function composition: store => next => action => …",
                        "Composition patterns: HOC vs render props vs custom hooks",
                        "Prop drilling and escapes (Context, store) with re-render costs"
                    ]
                },
                "2F_module_build_theory": {
                    "unlocks": ["Webpack", "Babel", "modules", "code splitting"],
                    "concepts": [
                        "CommonJS vs ESM; named vs default exports; static analysability → tree shaking",
                        "JSX is syntax, transpiled by Babel to React.createElement / jsx()",
                        "Dependency graph → entry → loaders (transform) vs plugins (lifecycle) → chunks → output",
                        "Code splitting: dynamic import() → separate chunk → React.lazy + Suspense",
                        "Dev server / HMR / source maps; Vite (esbuild + native ESM) vs Webpack"
                    ]
                },
                "2G_routing_theory": {
                    "unlocks": ["React Router"],
                    "concepts": [
                        "MPA vs SPA; history.pushState and popstate; deep route 404 without server rewrite",
                        "Route matching, dynamic segments (:id), nested routes and <Outlet /> as injection point",
                        "<Link> vs <a> (preventing full reload); useNavigate, useParams, NavLink active state",
                        "Route-level code splitting and protected/guarded routes"
                    ]
                },
                "2H_layout_theory": {
                    "unlocks": ["CSS3 flexbox", "layout", "responsive"],
                    "concepts": [
                        "Box model + box-sizing; block vs inline vs inline-block",
                        "Cascade, specificity, inheritance",
                        "Flexbox: flex-direction defines main axis; justify-content = main, align-items = cross; flex shorthand",
                        "Positioning and stacking contexts; margin collapse",
                        "Responsive: viewport meta tag, media queries, mobile-first, relative units (rem/em/%/vw), fluid images"
                    ]
                }
            }
        },

        "layer_3_supplementary": {
            "description": "Not published, but live in the same libraries — ranked by real risk",
            "high_risk": [
                "useState, useEffect, useContext, useRef, useMemo, useCallback, useReducer",
                "Rules of Hooks (top level only, React functions only) + why (call-order indexing)",
                "Stale closure in useEffect; missing dep array; missing cleanup → memory leak",
                "Controlled vs uncontrolled inputs",
                "Conditional-render traps: falsy 0 bleed, && vs ternary, rendering null/undefined/false/NaN"
            ],
            "medium_risk": [
                "Context API vs Redux; Redux Toolkit (createSlice, Immer, createAsyncThunk)",
                "React.memo, lazy/Suspense, virtualization, debounce/throttle",
                "Error boundaries; Portals; forwardRef; fragments; key warnings",
                "HTTP/fetch: verbs, status codes, fetch vs axios, AbortController, CORS preflight",
                "TypeScript surface (interface vs type, generics in props, React.FC)",
                "Git: merge vs rebase, branching, conflict resolution"
            ],
            "low_risk": [
                "Testing: Jest, React Testing Library queries, act",
                "Next.js / SSR / SSG / hydration mismatch",
                "Web security: XSS via dangerouslySetInnerHTML, CSRF, token storage",
                "Accessibility: semantic landmarks, ARIA basics, label association"
            ]
        },

        "layer_4_question_archetypes": {
            "description": "HOW Mettl asks — pattern-match under time pressure",
            "archetypes": [
                {"type": "output_prediction", "example": "What is printed/rendered?", "tests": "event loop ordering, closures, setState batching, falsy 0"},
                {"type": "defect_localisation", "example": "Why does this component re-render / not re-render / loop infinitely?"},
                {"type": "definitional_discrimination", "example": "Which statement about useMemo and useCallback is TRUE?"},
                {"type": "code_completion", "example": "A snippet with a blank; pick the line"},
                {"type": "ordering_matching", "example": "lifecycle ↔ hook equivalence; Flux ↔ Redux mapping"},
                {"type": "negative_framing", "example": "Which is NOT a valid… (read the stem twice)"},
                {"type": "simulator_task", "example": "Build/repair a small DOM feature against hidden assertions on exact IDs/classes"}
            ],
            "standing_heuristics": [
                "useEffect + [] + state variable → STALE CLOSURE, unless functional updater used",
                ".length && → renders 0",
                "Two consecutive setState({x: this.state.x+1}) → +1 not +2",
                "<Route> child that doesn't render → missing <Outlet />",
                "Memoized child re-rendering → new function/object reference passed",
                "Handler losing this → unbound method passed as callback",
                "Simulator: copy the IDs from the prompt verbatim — auto-graders assert on selectors"
            ]
        },

        "layer_5_study_budget": {
            "description": "Weighted study allocation for 36-MCQ / 50-min worst case",
            "blocks": [
                {"block": "React core (components/props/state/JSX/render/lifecycle/keys/VDOM)", "expected_qs": "10-13", "study_share": "30%"},
                {"block": "Hooks + the three traps", "expected_qs": "6-9", "study_share": "20%"},
                {"block": "Redux / Flux / data flow", "expected_qs": "5-7", "study_share": "15%"},
                {"block": "Core JS + ES6 + event loop + closures + this", "expected_qs": "6-8", "study_share": "20%"},
                {"block": "React Router", "expected_qs": "2-3", "study_share": "5%"},
                {"block": "Webpack/Babel/build", "expected_qs": "1-2", "study_share": "4%"},
                {"block": "React 19 (Server Components, Actions, createRoot/hydrateRoot)", "expected_qs": "2-4", "study_share": "3%"},
                {"block": "HTML5 + CSS3", "expected_qs": "0-6", "study_share": "3%"}
            ]
        }
    },

    # ═══════════════════════════════════════════════
    # SECTION 6: MCQ TRAPS & BEST PRACTICES
    # ═══════════════════════════════════════════════
    "mcq_traps": {
        "description": "Precise mechanical traps from the MCQ Master Guide — the exact engine behavior",
        "domains": [
            {
                "domain": "React Core Hooks",
                "traps": [
                    {
                        "name": "useEffect Closure & Cleanup Trap",
                        "mechanism": "Every render creates a new lexical environment. useEffect captures variables in a closure. Empty [] pins the first render's values.",
                        "code": "useEffect(() => { setInterval(() => { setCount(count + 1) }, 1000) }, [])",
                        "trap_question": "What does this render after 3 seconds?",
                        "answer": "1, forever. count is trapped at 0 from the initial render.",
                        "cleanup_trap": "Omitting return () => clearInterval(id) leaks the timer on unmount.",
                        "heuristic": "If a hook uses a state variable, it MUST be in the dependency array. If it sets an interval, it MUST return a clearer.",
                        "react_19_edge": "StrictMode invokes useEffect twice (mount→unmount→mount) to surface missing cleanup."
                    },
                    {
                        "name": "useMemo vs useCallback Reference Stability",
                        "mechanism": "{} is never === {}. Parent render recreates all objects/functions. Passing a recreated function to a memo'd child breaks React.memo.",
                        "code": "const fetchData = () => api.get('/data'); return <ChildMemoized fetch={fetchData} />",
                        "trap_question": "Why does ChildMemoized re-render when tick updates?",
                        "answer": "fetchData is a new reference on every render.",
                        "heuristic": "useMemo saves the result of a slow computation. useCallback saves the function itself so children don't panic."
                    }
                ]
            },
            {
                "domain": "Class Components",
                "traps": [
                    {
                        "name": "setState Asynchronous Batching",
                        "mechanism": "this.setState is not synchronous. React batches and merges consecutive object-form calls. Last one wins.",
                        "code": "this.setState({count: this.state.count+1}); this.setState({count: this.state.count+1});",
                        "answer": "count is 1, not 2. Both read this.state.count as 0.",
                        "heuristic": "Object setState overwrites. Functional setState((prev) => ...) chains sequentially.",
                        "react_18_edge": "React 18 automatic batching applies to promises, timeouts, and native event handlers too."
                    },
                    {
                        "name": "Lifecycle Translations",
                        "translations": {
                            "componentDidMount": "useEffect(..., [])",
                            "componentDidUpdate": "useEffect(..., [deps])",
                            "componentWillUnmount": "return () => {} inside useEffect"
                        }
                    }
                ]
            },
            {
                "domain": "React Router v6.4+",
                "traps": [
                    {
                        "name": "<Outlet> Render Trap",
                        "mechanism": "Parent route must contain <Outlet /> to inject child route UI.",
                        "heuristic": "A parent route without an <Outlet> is a brick wall. Children cannot pass."
                    }
                ]
            },
            {
                "domain": "Core JavaScript & Reconciliation",
                "traps": [
                    {
                        "name": "Falsy 0 DOM Bleed",
                        "mechanism": "&& returns the falsy left side. 0 is falsy. React renders numbers including 0.",
                        "code": "{items.length && <List items={items} />}",
                        "answer": "Renders <div>0</div>",
                        "heuristic": "Never trust .length &&. Always enforce a boolean with .length > 0 &&."
                    },
                    {
                        "name": "this Binding Crisis",
                        "mechanism": "In standard functions, this is determined by HOW the function is called. Passed as callback → this defaults to window or undefined.",
                        "code": "handleClick() { console.log(this.props.id); } render() { return <button onClick={this.handleClick}>Click</button> }",
                        "answer": "Throws: Cannot read properties of undefined (reading 'props').",
                        "heuristic": "Arrow functions capture this from the air. Normal functions drop it when handed off."
                    }
                ]
            }
        ]
    },

    # ═══════════════════════════════════════════════
    # SECTION 7: REACT 19 NEW FEATURES
    # ═══════════════════════════════════════════════
    "react_19": {
        "description": "React 19 delta — new APIs and concepts",
        "features": [
            {"name": "React Compiler", "purpose": "Automatic memoization at build time; eliminates manual useMemo/useCallback/React.memo", "key_point": "Static analysis ensures components only re-render when data actually changes"},
            {"name": "Actions", "purpose": "First-class form data mutations via <form action={fn}>", "key_point": "React manages pending states, error handling, revalidation. Server Actions with 'use server' directive."},
            {"name": "useActionState", "purpose": "Manage state based on form action results (formerly useFormState)", "returns": "[state, dispatch, isPending]"},
            {"name": "useOptimistic", "purpose": "Show temporary UI state while async action is in flight", "key_point": "Auto-rollback on failure; improves perceived performance"},
            {"name": "use hook", "purpose": "Read Promise or Context during render", "key_point": "Can be called conditionally (inside if/loops), unlike other hooks. Integrates with Suspense."},
            {"name": "useFormStatus", "gotcha": "MUST be called in a CHILD component of the form, NOT in the form component itself"},
            {"name": "Server Components", "key_point": "Cannot use hooks or state; 'use client' directive marks client bundle boundary; props crossing boundary must be serializable"},
            {"name": "createRoot vs hydrateRoot", "key_point": "createRoot for CSR, hydrateRoot for SSR. Hydration mismatch = React discards server HTML and re-renders."},
            {"name": "ref as a prop", "key_point": "forwardRef no longer needed in React 19 — ref can be passed as a regular prop"}
        ]
    },

    # ═══════════════════════════════════════════════
    # SECTION 8: QUEST GRAPH (ALL TOPICS)
    # ═══════════════════════════════════════════════
    "quest_graph": {
        "description": "Complete mastery flow with 14 topic quests + 4 arena quests",
        "canonical_sequence": "U1→U2→U3→U5→U6→U7→U8→U9→U4→U10→U11→U12",
        "quests": []
    },

    # ═══════════════════════════════════════════════
    # SECTION 9: RAPID-FIRE MCQ BANK
    # ═══════════════════════════════════════════════
    "rapid_fire_bank": {
        "description": "Subtle, under-the-hood MCQs and coding snippets — the places that decide an MCQ",
        "items": []
    },

    # ═══════════════════════════════════════════════
    # SECTION 10: CODING CHALLENGES (WORKBENCH)
    # ═══════════════════════════════════════════════
    "coding_challenges": {
        "description": "Hands-on React build challenges with starter code, solutions, hints, and edge cases",
        "items": []
    },

    # ═══════════════════════════════════════════════
    # SECTION 11: CSS LAYOUT BATTLES
    # ═══════════════════════════════════════════════
    "css_layout_battles": {
        "description": "CSS-only layout challenges — real layout skills, not CSS art",
        "items": []
    },

    # ═══════════════════════════════════════════════
    # SECTION 12: CSS LADDER (66 LESSONS, 9 STAGES)
    # ═══════════════════════════════════════════════
    "css_ladder": {
        "description": "Progressive CSS mastery in 66 lessons across 9 stages — from box model to full-screen composition",
        "stages": {}
    },

    # ═══════════════════════════════════════════════
    # SECTION 13: CSS 100 GAUNTLET (108 CHALLENGES, 18 CATEGORIES)
    # ═══════════════════════════════════════════════
    "css_100_gauntlet": {
        "description": "108 graded CSS challenges across 18 categories — pure layout and styling, the shape Mettl asks them in",
        "categories": [],
        "total_challenges": 108
    },

    # ═══════════════════════════════════════════════
    # SECTION 14: CODING TASK CORPUS (TIERED)
    # ═══════════════════════════════════════════════
    "coding_task_corpus": {
        "tier_s": {
            "description": "Build until muscle memory — ≈85% of probability mass",
            "tasks": [
                {"id": "S1", "name": "Todo list", "primitives": ["P1", "P2"], "hidden_cases": ["empty input rejected", "whitespace-only rejected", "delete last→empty state", "toggle doesn't reorder", "unique keys"]},
                {"id": "S2", "name": "Live search filter", "primitives": ["P1", "P3"], "hidden_cases": ["zero matches→explicit message", "case-insensitive", "empty query→full list", "trailing spaces"]},
                {"id": "S3", "name": "Form with validation", "primitives": ["P1", "P3"], "hidden_cases": ["error shows on invalid", "error clears on fix", "submit blocked while invalid", "empty submit", "per-field messages"]},
                {"id": "S4", "name": "Pagination", "primitives": ["P3", "P7"], "hidden_cases": ["page 1 no Prev", "last page no Next", "exact-multiple total", "total<pageSize", "correct slice every page"]},
                {"id": "S5", "name": "Counter ±reset with clamp", "primitives": ["P4"], "hidden_cases": ["clamp at bounds", "reset from any value", "rapid clicks (functional updater)"]},
                {"id": "S6", "name": "Fetch list from API", "primitives": ["P5", "P6"], "hidden_cases": ["loading rendered", "error rendered", "empty array→empty state", "no post-unmount setState"]},
                {"id": "S7", "name": "Timer / stopwatch", "primitives": ["P4", "P5"], "hidden_cases": ["double-start doesn't double interval", "reset while running", "cleanup on unmount"]},
                {"id": "S8", "name": "Accordion / Tabs", "primitives": ["P4"], "hidden_cases": ["only one open at a time", "clicking open one closes it", "default active index"]},
                {"id": "S9", "name": "Star rating", "primitives": ["P4", "P7"], "hidden_cases": ["rating 0", "rating n", "click same star", "hover then leave restores"]},
                {"id": "S10", "name": "Debounced search", "primitives": ["P1", "P5"], "hidden_cases": ["only one call after rapid typing", "timer cleared on unmount", "empty query short-circuits"]}
            ]
        },
        "tier_a": ["Shopping cart with totals", "Theme toggle with localStorage", "Modal with outside-click", "Custom dropdown/multi-select", "Character counter textarea", "Nested comments", "Undo/redo"],
        "tier_b": ["Drag-and-drop Kanban", "Animated carousel", "Virtualized list", "Tic-Tac-Toe", "File explorer", "Infinite scroll"],
        "redux_router_variants": ["RTK counter slice", "RTK todo slice", "Two-page Router app", "/product/:id with useParams", "Protected route to /login"],
        "vanilla_insurance": "S1, S2, S10 in vanilla cover the entire vanilla surface. Budget 40 minutes."
    },

    # ═══════════════════════════════════════════════
    # SECTION 15: ALL RESOURCES (CANONICAL LINKS)
    # ═══════════════════════════════════════════════
    "resources": {
        "description": "Every canonical resource referenced in the curriculum",
        "by_unit": {}
    },

    # ═══════════════════════════════════════════════
    # SECTION 16: FLEETPULSE NEXUS (PROJECT EVIDENCE)
    # ═══════════════════════════════════════════════
    "fleetpulse_nexus": {
        "description": "Enterprise Mission & IoT Telemetry Orchestrator — the project evidence layer for SHIPPED fields",
        "level_reached": 4,
        "levels": [
            "L1: Live Telemetry Ingestion & Stream Engine — Fiber, stale closures, effect cleanup, React.memo",
            "L2: Headless Custom Hooks & Network Resilience — useFetch + AbortController, useSyncExternalStore",
            "L3: Dual-Engine State (Zustand + Redux Toolkit) — createSlice, store adapter facade, React 19 Actions",
            "L4: Router, Compound Components & SSR/Hydration — createPortal, forwardRef, createRoot vs hydrateRoot",
            "L5: 10k-Asset Virtual Grid & Profiler — windowing, useTransition, useDeferredValue, lazy/Suspense",
            "L6: Resilience & Security — JWT refresh mutex queue, Error Boundaries, XSS",
            "L7: Automated Test Suite — Vitest, RTL, MSW",
            "L8: Advanced UX & Command Control — backlog"
        ]
    }
}

# ── Populate quest graph from SAVE_GAME_STATE ──
for q in campaign["quests"]:
    quest_entry = {
        "id": q["id"],
        "title": q["title"],
        "unit": q.get("unit", q["id"]),
        "xp": q["xp"],
        "est_min": q["est_min"],
        "status": q["status"],
        "unlock_condition": q["unlock_condition"],
        "why": q.get("why", ""),
        "resources": [],
        "challenges": [],
        "gate": q.get("gate", ""),
        "defenses": []
    }
    for r in q.get("resources", []):
        quest_entry["resources"].append({
            "kind": r["kind"],
            "name": r["name"],
            "url": r.get("url", ""),
            "done": r.get("done", False)
        })
    for c in q.get("challenges", []):
        ch = {
            "id": c["id"],
            "name": c["name"],
            "type": c.get("type", "build"),
            "est_min": c.get("est_min", 0),
            "done": c.get("done", False),
            "edge_cases": c.get("edge_cases", []),
            "tags": c.get("tags", []),
            "primitives": c.get("primitives", [])
        }
        if c.get("hints"):
            ch["hints"] = c["hints"]
        quest_entry["challenges"].append(ch)
    if "A3_defend" in q:
        a3 = q["A3_defend"]
        for d in a3.get("defenses", []):
            quest_entry["defenses"].append({
                "id": d["id"],
                "question": d["question"],
                "must_mention": d["must_mention"],
                "done": d.get("done", False)
            })
        if a3.get("unlocks_polyfills"):
            quest_entry["unlocks_polyfills"] = a3["unlocks_polyfills"]
    content["quest_graph"]["quests"].append(quest_entry)

# ── Populate resources by unit ──
unit_resources = {
    "U1_identity_memory": [
        {"name": "javascript.info — Object references and copying", "url": "https://javascript.info/object-copy", "tier": "CANONICAL"},
        {"name": "MDN — Equality comparisons and sameness", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness", "tier": "EXPLAINER"},
        {"name": "lydiahallie/javascript-questions (object/reference items)", "url": "https://github.com/lydiahallie/javascript-questions", "tier": "DRILL"}
    ],
    "U2_execution_closures_this": [
        {"name": "javascript.info — Variable scope, closure", "url": "https://javascript.info/closure", "tier": "CANONICAL"},
        {"name": "javascript.info — Object methods 'this' + Function binding", "url": "https://javascript.info/object-methods", "tier": "CANONICAL"},
        {"name": "Dan Abramov — How Are Function Components Different from Classes?", "url": "https://overreacted.io/how-are-function-components-different-from-classes/", "tier": "EXPLAINER"},
        {"name": "BigFrontEnd.dev quizzes", "url": "https://bigfrontend.dev/quiz", "tier": "DRILL"}
    ],
    "U3_async_event_loop": [
        {"name": "javascript.info — Event loop", "url": "https://javascript.info/event-loop", "tier": "CANONICAL"},
        {"name": "javascript.info — Microtasks", "url": "https://javascript.info/microtask-queue", "tier": "CANONICAL"},
        {"name": "javascript.info — Promise chaining", "url": "https://javascript.info/promise-chaining", "tier": "CANONICAL"},
        {"name": "Jake Archibald — In The Loop (JSConf Asia)", "url": "https://www.youtube.com/watch?v=cCOL7MC4Pl0", "tier": "EXPLAINER"},
        {"name": "Philip Roberts — What the heck is the event loop anyway?", "url": "https://www.youtube.com/watch?v=8aGhZQkoFbQ", "tier": "EXPLAINER"}
    ],
    "U4_dom_events": [
        {"name": "javascript.info — Bubbling and capturing", "url": "https://javascript.info/bubbling-and-capturing", "tier": "CANONICAL"},
        {"name": "javascript.info — Event delegation", "url": "https://javascript.info/event-delegation", "tier": "CANONICAL"},
        {"name": "javascript.info — Forms, controls", "url": "https://javascript.info/forms-controls", "tier": "CANONICAL"},
        {"name": "MDN — Introduction to events", "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events", "tier": "EXPLAINER"}
    ],
    "U5_react_core": [
        {"name": "react.dev/learn — Describing the UI, Rendering Lists, Keeping Components Pure, Adding Interactivity, State as a Snapshot, Queueing State Updates, Preserving and Resetting State", "url": "https://react.dev/learn", "tier": "CANONICAL"},
        {"name": "Josh Comeau — Why React Re-Renders", "url": "https://www.joshwcomeau.com/react/why-react-re-renders/", "tier": "EXPLAINER"},
        {"name": "Mark Erikson — A (Mostly) Complete Guide to React Rendering Behavior", "url": "https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/", "tier": "DEEP"},
        {"name": "sudheerj/reactjs-interview-questions Q1-Q60", "url": "https://github.com/sudheerj/reactjs-interview-questions", "tier": "DRILL"}
    ],
    "U6_hooks_traps": [
        {"name": "react.dev/learn — Escape Hatches: Synchronizing with Effects", "url": "https://react.dev/learn/synchronizing-with-effects", "tier": "CANONICAL"},
        {"name": "react.dev — You Might Not Need an Effect", "url": "https://react.dev/learn/you-might-not-need-an-effect", "tier": "CANONICAL"},
        {"name": "react.dev/reference/react — every hook's Caveats section", "url": "https://react.dev/reference/react", "tier": "CANONICAL"},
        {"name": "Dan Abramov — A Complete Guide to useEffect", "url": "https://overreacted.io/a-complete-guide-to-useeffect/", "tier": "EXPLAINER"},
        {"name": "Josh Comeau — Understanding useMemo and useCallback", "url": "https://www.joshwcomeau.com/react/usememo-and-usecallback/", "tier": "EXPLAINER"},
        {"name": "GreatFrontEnd React questions", "url": "https://www.greatfrontend.com/questions/react-interview-questions", "tier": "DRILL"}
    ],
    "U7_redux_flux": [
        {"name": "Redux Essentials Parts 1-2", "url": "https://redux.js.org/tutorials/essentials/part-1-overview-concepts", "tier": "CANONICAL"},
        {"name": "Redux Style Guide (Priority A rules)", "url": "https://redux.js.org/style-guide/", "tier": "CANONICAL"},
        {"name": "RTK — createSlice + createAsyncThunk", "url": "https://redux-toolkit.js.org/api/createSlice", "tier": "CANONICAL"},
        {"name": "Kent C. Dodds — Application State Management with React", "url": "https://kentcdodds.com/blog/application-state-management-with-react", "tier": "EXPLAINER"}
    ],
    "U8_es6": [
        {"name": "javascript.info — Destructuring assignment", "url": "https://javascript.info/destructuring-assignment", "tier": "CANONICAL"},
        {"name": "javascript.info — Arrow functions revisited", "url": "https://javascript.info/arrow-functions", "tier": "CANONICAL"},
        {"name": "javascript.info — Modules, introduction + Class basic syntax", "url": "https://javascript.info/modules-intro", "tier": "CANONICAL"}
    ],
    "U9_react_router": [
        {"name": "React Router — routing tutorial + API pages", "url": "https://reactrouter.com/start/framework/routing", "tier": "CANONICAL"}
    ],
    "U10_build_tooling": [
        {"name": "webpack — Concepts page", "url": "https://webpack.js.org/concepts/", "tier": "CANONICAL"},
        {"name": "Babel — what is it", "url": "https://babeljs.io/docs/", "tier": "EXPLAINER"},
        {"name": "Vite — Why Vite", "url": "https://vite.dev/guide/why.html", "tier": "EXPLAINER"}
    ],
    "U11_react_19": [
        {"name": "React 19 release blog post", "url": "https://react.dev/blog/2024/12/05/react-19", "tier": "CANONICAL"}
    ],
    "U12_html_css": [
        {"name": "web.dev Learn CSS — Box Model, Cascade, Specificity, Flexbox", "url": "https://web.dev/learn/css/", "tier": "CANONICAL"},
        {"name": "Josh Comeau — An Interactive Guide to Flexbox", "url": "https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/", "tier": "EXPLAINER"},
        {"name": "Flexbox Froggy", "url": "https://flexboxfroggy.com/", "tier": "DRILL"},
        {"name": "Grid Garden", "url": "https://cssgridgarden.com/", "tier": "DRILL"}
    ]
}
content["resources"]["by_unit"] = unit_resources

# ── Populate rapid-fire items ──
rapid_items = [
    {"topic":"Identity","q":"const a={x:1}; const b={...a}; a.x=2; — what is b.x?","answer":"1","why":"Spread copies one level. b.x was read at copy time."},
    {"topic":"Identity","q":"Which re-renders a React component?","answer":"setArr([...arr,4])","why":"Only a NEW array is a new reference. Push mutates in place."},
    {"topic":"Identity","q":"Object.is(NaN, NaN) and NaN === NaN are:","answer":"true, false","why":"Object.is treats NaN as equal; === does not. React uses Object.is."},
    {"topic":"Closures","q":"for (var i=0;i<3;i++) setTimeout(()=>console.log(i)) prints:","answer":"3 3 3","why":"var is function-scoped — one binding shared by all three closures."},
    {"topic":"Closures","q":"Same loop with let i prints:","answer":"0 1 2","why":"let creates a fresh binding per iteration."},
    {"topic":"this","q":"const o={n:1,get(){return this.n}}; const f=o.get; f() gives:","answer":"throws in strict mode","why":"this is set by call site. Detached, this is undefined in strict mode."},
    {"topic":"Event loop","q":"Order: log(1); setTimeout(()=>log(2)); Promise.resolve().then(()=>log(3)); log(4)","answer":"1 4 3 2","why":"Sync first (1,4), then ALL microtasks (3), then macrotask (2)."},
    {"topic":"Event loop","q":"await resumes on:","answer":"the microtask queue","why":"await is sugar over .then — continuation is a microtask."},
    {"topic":"Keys","q":"A list uses index keys. You DELETE the first row. What breaks?","answer":"Remaining rows keep deleted row's state","why":"Index keys shift. React matches old index 1 to new index 0."},
    {"topic":"Batching","q":"setCount(count+1); setCount(count+1) with count=0 gives:","answer":"1","why":"Both read same snapshot. Use updater form setCount(c=>c+1)."},
    {"topic":"Rendering","q":"{items.length && <List/>} with empty array renders:","answer":"0","why":"&& returns falsy left side. React renders numbers including 0."},
    {"topic":"Rendering","q":"Why must render be pure?","answer":"React may call it twice or discard the result","why":"Concurrent rendering. StrictMode double-invokes to surface impurity."},
    {"topic":"Hooks","q":"Why can hooks not sit inside an if?","answer":"They are matched by call ORDER across renders","why":"React stores hooks in a per-fiber array indexed by call order."},
    {"topic":"useEffect","q":"useEffect(()=>{setInterval(()=>setN(n+1),1000)},[])", "answer":"Sticks at 1 and leaks the interval","why":"Stale closure: n is pinned at 0. No cleanup leaks the interval."},
    {"topic":"useMemo","q":"useCallback exists to:","answer":"Keep a function REFERENCE stable across renders","why":"useMemo caches a value; useCallback caches the function identity."},
    {"topic":"useRef","q":"Changing ref.current:","answer":"Does NOT re-render","why":"Refs are mutable boxes outside the render cycle."},
    {"topic":"Box model","q":"width:200px; padding:20px with default box-sizing occupies:","answer":"240px","why":"content-box: width sizes CONTENT; padding added both sides."},
    {"topic":"Flex","q":"With flex-direction:column, justify-content aligns along:","answer":"the vertical axis","why":"justify-content always works on MAIN axis, which column makes vertical."},
    {"topic":"Grid","q":"auto-fit vs auto-fill — the difference:","answer":"auto-fit COLLAPSES empty tracks so items stretch","why":"auto-fill keeps empty tracks."},
    {"topic":"Grid vs Flex","q":"Nesting a third flex container for column alignment means:","answer":"You needed Grid one level up","why":"Alignment across rows is 2D. Grid owns the tracks."},
    {"topic":"Units","q":"Why is font-size: 4vw an accessibility failure?","answer":"Browser zoom stops affecting it","why":"Viewport units ignore user's font settings. Use clamp() with rem floor."},
    {"topic":"Units","q":"width:100vw on a page with scrollbar causes:","answer":"horizontal overflow","why":"vw includes scrollbar width. Use 100%."},
    {"topic":"Position","q":"position:sticky does nothing. Most likely cause:","answer":"No scrolling ancestor / parent has overflow:hidden","why":"Sticky is relative to nearest scrolling ancestor."},
    {"topic":"JSX","q":"JSX uses className because:","answer":"class is a reserved word in JavaScript","why":"JSX compiles to JS properties. class and for are reserved."},
    {"topic":"JSX","q":"style={{margin:0}} — why two braces?","answer":"Outer = JS expression, inner = object literal","why":"No special syntax: one brace enters JS, the other is an object."}
]
content["rapid_fire_bank"]["items"] = rapid_items

# ── Populate coding challenges ──
coding_challenges = [
    {"id":"counter","title":"Step Counter","level":"Warm-up","time":"8 min","tags":["useState","controlled input","clamping"],"brief":"Counter with +/−, Reset, changeable step. Count never below zero."},
    {"id":"search","title":"Live Search Filter","level":"Core","time":"12 min","tags":["derived state","controlled input","empty state"],"brief":"Filter people as you type. Case-insensitive. Show empty state + count."},
    {"id":"todo","title":"Todo — add, toggle, delete, filter","level":"Core","time":"20 min","tags":["immutable arrays","derived state","lifting state"],"brief":"Add, tick, delete, filter All/Active/Done, show remaining."},
    {"id":"pagination","title":"Pagination","level":"Edge cases","time":"20 min","tags":["boundary math","derived state","clamping"],"brief":"Page 23 records at 5/page. Prev/Next disable at ends. Page X of Y."},
    {"id":"form","title":"Form with inline validation","level":"Edge cases","time":"20 min","tags":["controlled inputs","derived validation","a11y"],"brief":"Email+password. Per-field errors, clear on fix, block submit, success state."},
    {"id":"debounce","title":"Debounced search + loading state","level":"Advanced","time":"25 min","tags":["useEffect","cleanup","async triad"],"brief":"400ms debounce, loading state, empty result, cleanup on unmount."}
]
content["coding_challenges"]["items"] = coding_challenges

# ── Populate CSS battles ──
css_battles = [
    {"id":"center","title":"Dead Centre","level":"Warm-up","teach":"One box, centred both ways","solution":"display:grid;place-items:center"},
    {"id":"cols3","title":"Three Equal Columns","level":"Warm-up","teach":"Three boxes sharing width equally, 12px gutter","solution":"grid-template-columns:1fr 1fr 1fr;gap:12px"},
    {"id":"sidebar","title":"Sidebar + Fluid Main","level":"Core","teach":"Fixed 90px sidebar, fluid main","solution":"grid-template-columns:90px 1fr;gap:10px"},
    {"id":"between","title":"Pushed Apart","level":"Core","teach":"Two boxes: one left, one right, vertically centred","solution":"display:flex;justify-content:space-between;align-items:center"},
    {"id":"grid22","title":"Two by Two","level":"Core","teach":"2×2 grid filling the frame, 10px gutters","solution":"grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:10px"},
    {"id":"holy","title":"Holy Grail","level":"Advanced","teach":"Header/sidebar/main/footer with grid-template-areas","solution":"grid-template-areas:'hd hd' 'sb mn' 'ft ft'"},
    {"id":"cards","title":"Responsive Card Row","level":"Advanced","teach":"Four equal cards, one line, no media query","solution":"grid-template-columns:repeat(auto-fit,minmax(40px,1fr));gap:8px"}
]
content["css_layout_battles"]["items"] = css_battles

# ── Populate CSS ladder stages ──
ladder_lessons = {
    "1_atoms": ["The box model — why your 14rem box is not 14rem","display: block vs inline","display:flex — the switch that changes the children","flex-direction defines the MAIN axis","justify-content works on the MAIN axis","align-items works on the CROSS axis","gap — spacing without margins","flex: grow shrink basis","flex-wrap — squashing vs wrapping","display:grid + grid-template-columns","repeat + minmax + auto-fit = responsive, zero media queries","place-items:center — centring, solved","grid-template-areas — layout you can read","position: relative / absolute / fixed / sticky","inset:0 — cover the parent exactly","Units: px, rem, %, dvh, clamp()","Media queries — the escape hatch",":focus-visible — the accessibility line that is scored"],
    "2_system": ["The problem: bespoke CSS doesn't scale under a clock","Tokens — name the value once","color-mix() — stop inventing colour tokens","STACK — the highest-leverage class in CSS","CLUSTER and BETWEEN — everything horizontal","SIDEBAR — responsive with NO media query","SWITCHER — equal columns that stack themselves","EXCEPTIONS — data attributes, not modifier classes","Putting it together — the whole dashboard, no new CSS"],
    "3_polish": ["THE DECISION — Grid when the parent decides, Flex when the content decides","Flat beats nested — the anti-pattern you are being hired to avoid","SUBGRID — align card internals across cards","CONTAINER QUERIES — a component that responds to ITSELF"],
    "4_units": ["Space on one scale — not arbitrary numbers","Measure and line-height — text that reads","Hierarchy by weight and colour — not by size","Two shadows, used as elevation","Radius consistency — and the nesting rule","Borders: hairline, and tinted rather than grey","Transitions — 150ms, on interactive things only","Affordance — hover, active, focus, accent-color","Respect the user — reduced motion and colour-scheme"],
    "5_units_deep": ["Why rem exists — it is an accessibility feature","The rem scale you memorise once","em — relative to THIS element, and it compounds","Where px still wins — do not cargo-cult","Viewport units — and the two traps","clamp() — fluid type, no media query, zoom still works","Breakpoints and measure — em and ch","The whole rule, on one line"],
    "6_compose": ["Centred card — cover + box","Action bar — between + cluster","App shell — sidebar, no media query","Card grid — grid-auto","Equal columns — switcher","The whole screen — every primitive at once"],
    "7_jsx": ["JSX is not HTML — it is JavaScript that returns elements","className, not class — and why","Composing classes — this is where your layout lives","style={{ }} — the double brace, explained",".map() — rendering a list","Conditional rendering — && and the ternary","Fragments — grouping without a wrapper div","Putting it together — a real screen, no new CSS"],
    "8_reactivity": ["useState — the whole model in four lines","The functional updater — and why two clicks can equal one","Controlled inputs — the value comes from state","Derived state — compute during render, never store it","Updating arrays immutably — add, remove, toggle","useEffect — for things outside React, with cleanup","Lifting state — two components, one source of truth","A complete feature — everything at once"]
}
content["css_ladder"]["stages"] = ladder_lessons

# ── CSS100 categories ──
css100_categories = [
    {"key":"box","name":"Box model","blurb":"What a box measures, and what pushes what."},
    {"key":"flex","name":"Flexbox","blurb":"One axis, content-driven. basis vs width, the shorthand, auto margins."},
    {"key":"grid","name":"Grid","blurb":"Two axes, parent-driven. Lines, spans, implicit tracks, alignment."},
    {"key":"track","name":"Track sizing","blurb":"repeat · minmax · auto-fit vs auto-fill — responsive with no media query."},
    {"key":"cq","name":"Container queries","blurb":"A component that answers to its container, not the viewport."},
    {"key":"place","name":"place-*","blurb":"align + justify in one property, on the container and on the item."},
    {"key":"areas","name":"grid-template-areas","blurb":"Layout you can read out loud."},
    {"key":"pos","name":"Positioning","blurb":"static · relative · absolute · fixed · sticky, and the containing block."},
    {"key":"inset","name":"inset","blurb":"All four offsets at once, and what happens when opposite pairs both set."},
    {"key":"units","name":"Units","blurb":"rem · em · ch · %, dvh · fr · clamp — and where px is still correct."},
    {"key":"mq","name":"Media queries","blurb":"Ranges, orientation, and the ones about the human, not the screen."},
    {"key":"focus","name":":focus-visible","blurb":"Keyboard users get a ring; mouse users do not; nobody loses one."},
    {"key":"tokens","name":"Design tokens","blurb":"Custom properties: naming, fallbacks, scoping, and the cascade."},
    {"key":"mix","name":"color-mix()","blurb":"Derive a palette from one hue instead of hand-picking nine."},
    {"key":"prim","name":"Layout primitives","blurb":"stack · cluster · between · sidebar · switcher · cover · grid-auto."},
    {"key":"exc","name":"Exceptions","blurb":"The cases where the usual rule is the wrong answer."},
    {"key":"anti","name":"Anti-patterns","blurb":"Recognise it, name why it breaks, replace it."},
    {"key":"extra","name":"Extras (Extended Syllabus)","blurb":"Selectors & Specificity · Typography & Line Clamp · Gradients · Transitions · React Tokens"}
]
content["css_100_gauntlet"]["categories"] = css100_categories

# ── Polyfill snippets from rapid bank ──
content["polyfill_snippets"] = [
    {"topic":"Immutability","task":"Toggle item with given id — immutably","solution":"todos.map(t => t.id === id ? { ...t, done: !t.done } : t)","why":"map returns new array; spread returns new object for changed one."},
    {"topic":"Closures","task":"Write once(fn) — calls fn at most once, returns first result forever","solution":"let done=false,val; return function(...a){if(!done){done=true;val=fn.apply(this,a);} return val;}","why":"Flag and cached value live in the closure."},
    {"topic":"Async","task":"Implement Promise.myAll — order preserved, first rejection wins","solution":"Write to results[i], not push — settle order != input order. Count completions.","why":"Index preserves input order."},
    {"topic":"Derived state","task":"Return count of unfinished todos. No extra state.","solution":"todos.filter(t => !t.done).length","why":"Derive, never store. Two useStates that must agree will eventually disagree."},
    {"topic":"Boundaries","task":"Return the slice for a page. 1-indexed.","solution":"rows.slice((page-1)*size, page*size)","why":"(page-1) is the off-by-one everyone loses."},
    {"topic":"Debounce","task":"Implement debounce(fn, ms)","solution":"let id; return function(...a){clearTimeout(id); id=setTimeout(()=>fn.apply(this,a),ms);}","why":"One timer in closure. Every call clears the pending one."}
]

# ── Full polyfill catalogue ──
content["polyfill_catalogue"] = [
    {"name":"Function.prototype.myBind","quest":"Q2","edge_cases":["partial application","works with new","arrow fn cannot be rebound"]},
    {"name":"Infinite currying sum(1)(2)(3)()","quest":"Q2","edge_cases":["terminates on empty call","variadic sum(1,2)(3)"]},
    {"name":"Promise.myAll","quest":"Q3","edge_cases":["empty array resolves","order matches input","non-promise values","one rejection rejects all"]},
    {"name":"Promise.myRace","quest":"Q3","edge_cases":["empty array never settles"]},
    {"name":"Promise.myAllSettled","quest":"Q3","edge_cases":["never rejects","status/value vs status/reason shape"]},
    {"name":"debounce","quest":"Q3","edge_cases":["leading vs trailing edge","cancel() method","this and args forwarded"]},
    {"name":"throttle","quest":"Q3","edge_cases":["fires immediately then rate-limits","cancel() method"]},
    {"name":"usePrevious","quest":"Q5","edge_cases":["undefined on first render","updates AFTER paint"]},
    {"name":"Array.prototype.myMap/myFilter/myReduce","quest":"ARENA-1","edge_cases":["reduce with no initial uses el 0","reduce on empty throws","sparse arrays skipped","index+array passed to callback"]},
    {"name":"flatten (recursive + iterative)","quest":"ARENA-1","edge_cases":["depth=Infinity","depth=0 returns copy","deeply nested"]},
    {"name":"deepClone","quest":"ARENA-1","edge_cases":["circular reference","Date/Map/Set preserved","functions by reference"]},
    {"name":"groupBy + chunk","quest":"ARENA-1","edge_cases":["empty input","key fn returns undefined","chunk size > length"]},
    {"name":"memoize","quest":"Q2","edge_cases":["cache miss vs hit","argument identity"]}
]

# ── Write output ──
out_path = os.path.join(ROOT, "content.json")
with open(out_path, "w") as f:
    json.dump(content, f, indent=2, ensure_ascii=False)
print(f"✅ Written {out_path} ({os.path.getsize(out_path):,} bytes)")
