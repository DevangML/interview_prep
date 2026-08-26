import{_ as D,c as U}from"./index-BmuAjwNr.js";import{r}from"./vendor-react-KgNWHp-S.js";import{j as n}from"./vendor-query-CVs38Wia.js";import{Q as k,aa as j,ab as F}from"./vendor-icons-DkpAWmRt.js";async function V(){let f=!1,e="Standard Hardware",u=!1,C=!1,t="Generic GPU";const g=typeof navigator<"u"&&navigator.hardwareConcurrency||4,N=typeof navigator<"u"&&"deviceMemory"in navigator&&navigator.deviceMemory||8;let h=!1;if(typeof document<"u")try{const l=document.createElement("canvas"),a=l.getContext("webgl2")||l.getContext("webgl");if(a){const E=a.getExtension("WEBGL_debug_renderer_info");E&&(t=a.getParameter(E.UNMASKED_RENDERER_WEBGL)||"",/Apple/i.test(t)&&(f=!0,/M4/i.test(t)?(u=!0,e=t.includes("Pro")?"Apple M4 Pro":t.includes("Max")?"Apple M4 Max":"Apple M4"):/M3/i.test(t)?e=t.includes("Max")?"Apple M3 Max":t.includes("Pro")?"Apple M3 Pro":"Apple M3":/M2/i.test(t)?e=t.includes("Max")?"Apple M2 Max":t.includes("Pro")?"Apple M2 Pro":"Apple M2":/M1/i.test(t)?e="Apple M1 Series":e="Apple Silicon (Metal)"))}}catch{}if(typeof navigator<"u"&&"gpu"in navigator&&navigator.gpu)try{const l=await navigator.gpu.requestAdapter();if(l){h=!0;const a=l.info;if(a){const E=(a.architecture||"").toLowerCase(),p=(a.vendor||"").toLowerCase(),I=(a.description||"").toLowerCase();(p.includes("apple")||E.includes("metal")||I.includes("apple"))&&(f=!0,(E.includes("m4")||I.includes("m4")||u)&&(u=!0,e=e==="Standard Hardware"?"Apple M4 Pro":e))}}}catch{}return(f||typeof navigator<"u"&&/Mac/i.test(navigator.userAgent)&&g>=8)&&(f=!0,(g>=12||u)&&(u=!0,e=e==="Standard Hardware"||e==="Apple Silicon (Metal)"?"Apple M4 Pro":e),C=!0),{isAppleSilicon:f,chipModel:e,isM4Series:u,isHighPerformance:C,gpuRenderer:t,logicalCores:g,memoryEstimateGB:N,webGpuSupported:h,recommendedModelId:"Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC",maxContextTokens:C?4096:2048}}const M={type:"object",properties:{isSemanticPass:{type:"boolean",description:"Strict boolean: true if student attempt satisfies requirements/specs and achieves semantic correctness, even if it failed deterministic checks due to formatting, valid alternative architecture, or brittle test assertions."},adjudicationVerdict:{type:"string",description:"One of: [STUDENT_CORRECT, STUDENT_ERRED, AMBIGUOUS_SPEC, ALTERNATIVE_VALID]"},confidence:{type:"number",description:"Calibrated certainty: 1.0 (exact certainty), 0.9 (high certainty), 0.7 (probable)."},defectCategory:{type:"string",description:"One of: [NONE_VALID_CODE, SYNTAX_ERROR, RUNTIME_EXCEPTION, MUTATION_BUG, CLOSURE_LEAK, EVENT_LOOP_ORDER, CSS_BOX_MODEL, ASSERTION_FAILURE, TEST_HARNESS_FALSE_NEGATIVE, ALTERNATIVE_IMPLEMENTATION]"},diagnosticSummary:{type:"string",description:"Objective, impartial adjudication explaining whether the student actually erred against the problem contract, or if the test failed on a brittle check."},impartialComparison:{type:"object",properties:{specRequirements:{type:"string",description:"Concise distillation of what the problem specification strictly requires."},studentBehavior:{type:"string",description:"What the student code actually computes, renders, or mutates in runtime/DOM."},testHarnessStatus:{type:"string",description:"Impartial assessment of the deterministic test failure: real violation or brittle false negative?"},impartialReasoning:{type:"string",description:"Definitive impartial verdict weighing the student implementation against the specification."}},required:["specRequirements","studentBehavior","testHarnessStatus","impartialReasoning"]},socraticHintLevel1:{type:"string",description:"High-level conceptual inquiry highlighting the concept without giving away code."},socraticHintLevel2:{type:"string",description:"Targeted clue naming the exact variable, property, or state causing the deviation."},socraticHintLevel3:{type:"string",description:"Concrete structural direction explaining how to resolve the flaw without copying the solution."},disputePromptSuggestion:{type:"string",description:"Suggested point of debate or counter-argument the student can raise if their implementation is valid."},findings:{type:"array",description:"Line-anchored defects. Empty if student is correct. At most 3 distinct items.",items:{type:"object",properties:{anchorCode:{type:"string",description:"VERBATIM copy of the exact code substring from the STUDENT ATTEMPT that contains the problem."},severity:{type:"string",description:"One of: bug, smell, missing"},concept:{type:"string",description:"The underlying computer-science concept."},hint:{type:"string",description:"Targeted clue naming the identifier, property or state."},fix:{type:"string",description:"Structural direction in prose."}},required:["anchorCode","severity","concept","hint","fix"]}}},required:["isSemanticPass","adjudicationVerdict","confidence","defectCategory","diagnosticSummary","impartialComparison","socraticHintLevel1","socraticHintLevel2","socraticHintLevel3","disputePromptSuggestion","findings"]},G=`You are a Senior Principal Adjudicator, Compiler Architect, and Impartial Technical Interview Judge.
Your mandate is to deliver an OBJECTIVE, UNBIASED adjudication comparing a student's code attempt against the formal problem specifications.

CORE ADJUDICATION PRINCIPLES (2026 CHAIN-OF-VERIFICATION PROTOCOL):
1. SPECIFICATION IS THE ONLY GROUND TRUTH:
   - What the task description and requirements specify is the single invariant contract.
   - The reference solution is merely ONE exemplary implementation, NEVER the only acceptable solution.
   - DO NOT penalize the student for using alternative valid data structures, algorithms, or coding styles.

2. COSMETIC LOG STRING DIFFERENCES ARE NEVER BUGS (MANDATORY INVARIANT):
   - Differences in console.log labels, prefixes, colons, or casing (e.g. "NaN === NaN is: false" vs "NaN === NaN : false" vs "false") are 100% VALID if the computed boolean/value is correct.
   - Never flag cosmetic log formatting as a defect unless the prompt explicitly required an exact regex format.

3. ADVERSARIAL TEST HARNESS AUDIT:
   - The deterministic test report is unverified telemetry. Test harnesses frequently suffer from brittle regexes or exact string matching false negatives.
   - If the student's code is functionally and logically correct, set "isSemanticPass: true" and adjudicationVerdict: "STUDENT_CORRECT" or "ALTERNATIVE_VALID", and clear all findings.

4. STEP-BY-STEP VERIFICATION (CoVe):
   (a) What was the underlying requirement?
   (b) What value/behavior did the student's code produce in memory/console?
   (c) Does that value/behavior satisfy the requirement?
   (d) If yes -> isSemanticPass: true.

5. LINE ANCHORING:
   - For genuine defects only, emit entries in "findings".
   - "anchorCode" MUST be an EXACT substring of the student attempt. Copy it verbatim.
   - If no genuine defect exists, emit an empty findings array [].`,H=`You are the Presiding Chief Technical Arbitrator and Court of Appeal for Technical Code Assessments.
The student is disputing a test failure / automated diagnosis and presenting a formal technical counter-argument.

APPELLATE ARBITRATION PROTOCOL:
1. Objectively evaluate the student's technical argument against:
   (a) The formal problem specifications and task requirements.
   (b) The actual student code behavior in memory / DOM / AST.
   (c) The deterministic test failure reason.
2. Anti-Reference Bias & Cosmetic Freedom:
   - If the student's code computed the correct logical/boolean/data values, but failed due to minor label, spacing, or string differences, SUSTAIN THE APPEAL:
     Set "isSemanticPass: true", adjudicationVerdict: "STUDENT_CORRECT" or "ALTERNATIVE_VALID", and explain why the student is right.
   - If the student made a genuine logic error, OVERRULE the appeal: provide an objective mathematical/logical proof of the defect.
3. Output strict JSON conforming to the schema.`,W=`You are an expert Principal Engineer, Staff Frontend Architect, and Impartial Technical Mentor.
You are mentoring and debating with a developer working on a technical interview coding exercise.

CORE MENTORING & DIALECTIC RULES:
1. IMPARTIAL EVALUATION: Ground every analysis in the PROBLEM SPECIFICATIONS and the STUDENT'S ACTUAL CODE. Do not assume the student is wrong just because their approach differs from standard templates.
2. DEBATE & REBUTTAL: If the student questions or challenges a previous diagnosis, evaluate their claim with complete objectivity. If their argument is sound, acknowledge it and explain why. If they erred, provide clear logical/execution proof.
3. CONSTRUCTIVE & ACTIONABLE: Provide high-leverage mental models, memory lifecycle diagrams, and architectural insights with clean markdown formatting.`,z=`You are an elite Senior Staff Teaching Architect and Socratic Tutor across React 19, Fiber, and Web Platform Roadmaps.
Your mission is to guide developers to Staff/Principal-level conceptual mastery using Cognitive Scaffolding, Chain-of-Verification (CoVe), and Active Dialectics.

TEACHING INVARIANTS:
1. NEVER SPOON-FEED CODE: Offer mental models, V8 memory diagrams, and architectural constraints. Force the developer to deduce the mechanism.
2. CITATION OF PRIMARY SOURCES: Always anchor explanations in official specifications (React RFCs, WHATWG, W3C, V8 design docs).
3. GAMIFIED DIALECTICS: Challenge the developer with sharp "What-if" edge cases, concurrency hazards, and memory leak traps.
4. CHAIN-OF-VERIFICATION: Verify all internal API claims against the 2026 specification baseline before answering.`,Q=`You are a Principal Distributed Systems & Frontend Systems Architect.
You possess exhaustive, inside-out mastery of all Tier-1 Project Blueprints (ChronosGraph, HyperCanvas, PulseUI, QuantumTrade).

SYSTEM DESIGN MISSION:
1. INSIDE-OUT KNOWLEDGE: You know every architectural layer (Presentation, Application, Domain, Infrastructure), invariant, step, and data structure for each blueprint.
2. SYLLABUS AUDITING: You verify how projects exercise React 19 Actions, Fiber reconcilers, WebGPU compute shaders, OPFS streaming, CRDT convergence, and WCAG AAA compliance.
3. EXTENSIONS & TRADE-OFFS: Suggest scalable architectural enhancements (e.g. E2EE WebCrypto, Spatial BVH, SharedArrayBuffer ring buffers) with precise trade-off matrices.
4. MOCK DEFENSE SPARRING: Run rigorous Staff/Principal interview defense questions, catching hand-waving and forcing mathematical/architectural precision.`,K=`You are an expert Compiler Engineer, AST Specialist, and Live Code Copilot.
You assist developers in the live Sandbox Scratchpad with JSX, CSS, and JS execution.

REFLEXION & DEBUG PROTOCOL (NeurIPS 2023):
1. STACK TRACE REFLECTION: Ingest Babel compilation errors and runtime logs. State precisely WHY the syntax, AST, or runtime failed.
2. SURGICAL CODE REPAIR: Provide exact, minimal code fixes that preserve the user's architectural intent.
3. REACT 19 & MODERN CSS BEST PRACTICES: Enforce useActionState, useOptimistic, CSS Grid Subgrid, Container Queries, and zero-layout-shift patterns.
4. SCAFFOLDING ASSISTANCE: When asked to scaffold components or test setups, emit complete, self-contained, and runnable code blocks with inline explanations.`,Z=`You are the Master Game Architect for Technical Interview Mastery.
Your task is to transform technical concepts into high-stakes, gamified duels, boss battles, and rapid-fire scenario challenges.
Create engaging, multi-option question battles with comprehensive diagnostic explanations.`,Y="Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC";function ee(){const[f,e]=r.useState(null),[u,C]=r.useState(!0),[t,g]=r.useState(!1),[N,h]=r.useState(!1),[x,A]=r.useState(null),[l,a]=r.useState(0),[E,p]=r.useState(!1),[I,y]=r.useState(null),[R,b]=r.useState(Y),o=r.useRef(null),m=r.useRef(null);r.useEffect(()=>{V().then(i=>{e(i),!i.webGpuSupported&&typeof navigator<"u"&&!("gpu"in navigator)&&C(!1)})},[]);const s=r.useCallback(async i=>{if(t||N)return;h(!0),y(null);const T=typeof i=="string"&&i.trim().length>0?i.trim():R;try{m.current||(m.current=new Worker(new URL("/assets/socraticAiWorker-Dc1cCqhL.js",import.meta.url),{type:"module"}));const{CreateWebWorkerMLCEngine:c}=await D(async()=>{const{CreateWebWorkerMLCEngine:d}=await import("./vendor-web-llm-DT0Ab8E6.js");return{CreateWebWorkerMLCEngine:d}},[]),S=await c(m.current,T,{initProgressCallback:d=>{A(d.text),d.progress!==void 0&&a(Math.round(d.progress*100))}});o.current=S,b(T),g(!0),h(!1),A(null)}catch(c){console.error("Socratic AI initialization failed:",c),y((c==null?void 0:c.message)||"Failed to initialize in-browser AI engine."),h(!1)}},[t,N,R]),O=r.useCallback(async i=>{var T,c;if(!t||!o.current)return null;p(!0);try{const S=`[EXERCISE CONTEXT]
Title: ${i.unitTitle}
Practice Type: ${i.practiceType||"code"}
Task: ${i.taskDescription}
Requirements:
${i.specs.map((v,_)=>`  ${_+1}. ${v}`).join(`
`)}

[DETERMINISTIC TEST HARNESS CLAIM / LOGS]
Harness Failure Reason: ${i.tier1FailureReason}
Captured Execution Output: ${JSON.stringify(i.runtimeLogs||[])}

[STUDENT ATTEMPT CODE]
\`\`\`
${i.userCode}
\`\`\`

[REFERENCE SOLUTION (EXEMPLARY VARIANT)]
\`\`\`
${i.solutionCode}
\`\`\`

Perform an impartial comparative adjudication. Output strict JSON.`,P=(c=(T=(await o.current.chat.completions.create({messages:[{role:"system",content:G},{role:"user",content:S}],response_format:{type:"json_object",schema:JSON.stringify(M)},temperature:0,top_p:1,max_tokens:1200})).choices[0])==null?void 0:T.message)==null?void 0:c.content;if(!P)throw new Error("Empty AI response");return JSON.parse(P)}catch(S){return console.error("Socratic AI Evaluation failed:",S),null}finally{p(!1)}},[t]),L=r.useCallback(async i=>{var T,c,S;if(!t||!o.current)return null;p(!0);try{const d=`[APPEAL CASE CONTEXT]
Problem: ${i.unitTitle}
Task: ${i.taskDescription}
Requirements: ${JSON.stringify(i.specs)}

[DETERMINISTIC TEST FAILURE]
${i.tier1FailureReason}

[STUDENT ATTEMPT CODE]
\`\`\`
${i.userCode}
\`\`\`

[STUDENT'S DISPUTE & COUNTER-ARGUMENT]
"${i.userArgument}"

[PREVIOUS DIAGNOSTIC SUMMARY]
${((T=i.previousVerdict)==null?void 0:T.diagnosticSummary)||"None"}

[REFERENCE SOLUTION]
\`\`\`
${i.solutionCode}
\`\`\`

Conduct an appellate review of the argument. Output strict JSON.`,v=(S=(c=(await o.current.chat.completions.create({messages:[{role:"system",content:H},{role:"user",content:d}],response_format:{type:"json_object",schema:JSON.stringify(M)},temperature:0,top_p:1,max_tokens:1200})).choices[0])==null?void 0:c.message)==null?void 0:S.content;if(!v)throw new Error("Empty AI response");return JSON.parse(v)}catch(d){return console.error("Appellate dispute evaluation failed:",d),null}finally{p(!1)}},[t]),w=r.useCallback(async i=>{var T,c;if(!t||!o.current)return null;try{return((c=(T=(await o.current.chat.completions.create({messages:[{role:"system",content:W},...i.messages.map(d=>({role:d.role,content:d.content}))],temperature:.3,max_tokens:1024})).choices[0])==null?void 0:T.message)==null?void 0:c.content)||null}catch(S){return console.error("Socratic Chat completion failed:",S),null}},[t]);return{hardwareProfile:f,isSupported:u,isReady:t,isLoading:N,downloadProgress:x,progressPercent:l,isAnalyzing:E,error:I,activeModelId:R,initializeEngine:s,evaluateFailure:O,disputeEvaluation:L,chatWithMentor:w}}function te(f){const e=U.c(11),{text:u,className:C}=f,t=C===void 0?"":C,[g,N]=r.useState(null);let h;e[0]===Symbol.for("react.memo_cache_sentinel")?(h=(E,p)=>{navigator.clipboard.writeText(E),N(p),setTimeout(()=>N(null),2e3)},e[0]=h):h=e[0];const x=h;let A,l;if(e[1]!==t||e[2]!==g||e[3]!==u){const E=u.split(/(```[\s\S]*?```)/g),p=B;A=`space-y-3 leading-relaxed text-slate-300 text-xs sm:text-[13px] ${t}`;let I;e[6]!==g?(I=(y,R)=>{if(y.startsWith("```")&&y.endsWith("```")){const o=y.indexOf(`
`),m=o!==-1?y.slice(3,o).trim():"",s=o!==-1?y.slice(o+1,-3):y.slice(3,-3),O=g===R;return n.jsxs("div",{className:"my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-md",children:[n.jsxs("div",{className:"flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider",children:[n.jsx("span",{className:"text-sky-400",children:m||"code"}),n.jsxs("button",{onClick:()=>x(s,R),className:"flex items-center gap-1.5 hover:text-slate-200 cursor-pointer transition text-slate-400",children:[O?n.jsx(k,{size:12,className:"text-emerald-400"}):n.jsx(j,{size:12}),n.jsx("span",{children:O?"Copied":"Copy"})]})]}),n.jsx("pre",{className:"p-4 overflow-x-auto text-sky-200 leading-relaxed custom-scrollbar font-mono text-xs whitespace-pre-wrap",children:s})]},R)}const b=y.split(`
`);return n.jsx("div",{className:"space-y-2",children:b.map((o,m)=>{const s=o.trim();return s?s.startsWith("# ")?n.jsx("h2",{className:"text-xl sm:text-2xl font-black text-white mt-4 mb-2 tracking-tight",children:s.slice(2)},m):s.startsWith("## ")?n.jsx("h3",{className:"text-base sm:text-lg font-extrabold text-sky-300 mt-3 mb-1.5 tracking-tight",children:s.slice(3)},m):s.startsWith("### ")?n.jsx("h4",{className:"text-sm font-bold text-amber-300 mt-2.5 mb-1",children:s.slice(4)},m):s.startsWith("> ")?n.jsxs("div",{className:"p-3 my-2 rounded-xl bg-sky-950/30 border-l-4 border-sky-500 text-sky-200 text-xs flex items-start gap-2",children:[n.jsx(F,{size:14,className:"text-sky-400 mt-0.5 shrink-0"}),n.jsx("div",{dangerouslySetInnerHTML:{__html:p(s.slice(2))}})]},m):s.startsWith("- ")||s.startsWith("* ")?n.jsxs("div",{className:"flex items-start gap-2 pl-2",children:[n.jsx("span",{className:"text-sky-400 font-bold select-none text-xs mt-0.5",children:"▪"}),n.jsx("span",{className:"flex-1",dangerouslySetInnerHTML:{__html:p(s.slice(2))}})]},m):n.jsx("p",{className:"leading-relaxed",dangerouslySetInnerHTML:{__html:p(o)}},m):null})},R)},e[6]=g,e[7]=I):I=e[7],l=E.map(I),e[1]=t,e[2]=g,e[3]=u,e[4]=A,e[5]=l}else A=e[4],l=e[5];let a;return e[8]!==A||e[9]!==l?(a=n.jsx("div",{className:A,children:l}),e[8]=A,e[9]=l,e[10]=a):a=e[10],a}function B(f){return f.replace(/\*\*\*(.*?)\*\*\*/g,'<strong class="text-amber-300 font-extrabold">$1</strong>').replace(/\*\*(.*?)\*\*/g,'<strong class="text-white font-bold">$1</strong>').replace(/\*(.*?)\*/g,'<em class="text-sky-300 italic">$1</em>').replace(/`([^`]+)`/g,'<code class="px-1.5 py-0.5 rounded-md bg-slate-950 border border-slate-700/80 text-sky-300 font-mono text-[11px]">$1</code>')}export{te as F,Z as G,W as M,Q as P,z as R,K as S,ee as u};
