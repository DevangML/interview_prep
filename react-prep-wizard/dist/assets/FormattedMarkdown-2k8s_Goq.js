import{_ as W,c as $}from"./index-5PvXyz3J.js";import{r as l}from"./vendor-react-KgNWHp-S.js";import{j as n}from"./vendor-query-CVs38Wia.js";import{N as Y,au as J,av as X}from"./vendor-icons-BRqD8wmb.js";async function z(){let r=!1,e="Standard Hardware",s=!1,E=!1,i="Generic GPU";const f=typeof navigator<"u"&&navigator.hardwareConcurrency||4,N=typeof navigator<"u"&&"deviceMemory"in navigator&&navigator.deviceMemory||8;let T=!1;if(typeof document<"u")try{const d=document.createElement("canvas"),a=d.getContext("webgl2")||d.getContext("webgl");if(a){const g=a.getExtension("WEBGL_debug_renderer_info");g&&(i=a.getParameter(g.UNMASKED_RENDERER_WEBGL)||"",/Apple/i.test(i)&&(r=!0,/M4/i.test(i)?(s=!0,e=i.includes("Pro")?"Apple M4 Pro":i.includes("Max")?"Apple M4 Max":"Apple M4"):/M3/i.test(i)?e=i.includes("Max")?"Apple M3 Max":i.includes("Pro")?"Apple M3 Pro":"Apple M3":/M2/i.test(i)?e=i.includes("Max")?"Apple M2 Max":i.includes("Pro")?"Apple M2 Pro":"Apple M2":/M1/i.test(i)?e="Apple M1 Series":e="Apple Silicon (Metal)"))}}catch{}if(typeof navigator<"u"&&"gpu"in navigator&&navigator.gpu)try{const d=await navigator.gpu.requestAdapter();if(d){T=!0;const a=d.info;if(a){const g=(a.architecture||"").toLowerCase(),u=(a.vendor||"").toLowerCase(),m=(a.description||"").toLowerCase();(u.includes("apple")||g.includes("metal")||m.includes("apple"))&&(r=!0,(g.includes("m4")||m.includes("m4")||s)&&(s=!0,e=e==="Standard Hardware"?"Apple M4 Pro":e))}}}catch{}return(r||typeof navigator<"u"&&/Mac/i.test(navigator.userAgent)&&f>=8)&&(r=!0,(f>=12||s)&&(s=!0,e=e==="Standard Hardware"||e==="Apple Silicon (Metal)"?"Apple M4 Pro":e),E=!0),{isAppleSilicon:r,chipModel:e,isM4Series:s,isHighPerformance:E,gpuRenderer:i,logicalCores:f,memoryEstimateGB:N,webGpuSupported:T,recommendedModelId:"Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC",maxContextTokens:E?4096:2048}}const q={type:"object",properties:{isSemanticPass:{type:"boolean",description:"Strict boolean: true if student attempt satisfies requirements/specs and achieves semantic correctness, even if it failed deterministic checks due to formatting, valid alternative architecture, or brittle test assertions."},adjudicationVerdict:{type:"string",description:"One of: [STUDENT_CORRECT, STUDENT_ERRED, AMBIGUOUS_SPEC, ALTERNATIVE_VALID]"},confidence:{type:"number",description:"Calibrated certainty: 1.0 (exact certainty), 0.9 (high certainty), 0.7 (probable)."},defectCategory:{type:"string",description:"One of: [NONE_VALID_CODE, SYNTAX_ERROR, RUNTIME_EXCEPTION, MUTATION_BUG, CLOSURE_LEAK, EVENT_LOOP_ORDER, CSS_BOX_MODEL, ASSERTION_FAILURE, TEST_HARNESS_FALSE_NEGATIVE, ALTERNATIVE_IMPLEMENTATION]"},diagnosticSummary:{type:"string",description:"Objective, impartial adjudication explaining whether the student actually erred against the problem contract, or if the test failed on a brittle check."},impartialComparison:{type:"object",properties:{specRequirements:{type:"string",description:"Concise distillation of what the problem specification strictly requires."},studentBehavior:{type:"string",description:"What the student code actually computes, renders, or mutates in runtime/DOM."},testHarnessStatus:{type:"string",description:"Impartial assessment of the deterministic test failure: real violation or brittle false negative?"},impartialReasoning:{type:"string",description:"Definitive impartial verdict weighing the student implementation against the specification."}},required:["specRequirements","studentBehavior","testHarnessStatus","impartialReasoning"]},socraticHintLevel1:{type:"string",description:"High-level conceptual inquiry highlighting the concept without giving away code."},socraticHintLevel2:{type:"string",description:"Targeted clue naming the exact variable, property, or state causing the deviation."},socraticHintLevel3:{type:"string",description:"Concrete structural direction explaining how to resolve the flaw without copying the solution."},disputePromptSuggestion:{type:"string",description:"Suggested point of debate or counter-argument the student can raise if their implementation is valid."},findings:{type:"array",description:"Line-anchored defects. Empty if student is correct. At most 3 distinct items.",items:{type:"object",properties:{anchorCode:{type:"string",description:"VERBATIM copy of the exact code substring from the STUDENT ATTEMPT that contains the problem."},severity:{type:"string",description:"One of: bug, smell, missing"},concept:{type:"string",description:"The underlying computer-science concept."},hint:{type:"string",description:"Targeted clue naming the identifier, property or state."},fix:{type:"string",description:"Structural direction in prose."}},required:["anchorCode","severity","concept","hint","fix"]}}},required:["isSemanticPass","adjudicationVerdict","confidence","defectCategory","diagnosticSummary","impartialComparison","socraticHintLevel1","socraticHintLevel2","socraticHintLevel3","disputePromptSuggestion","findings"]},Q=`You are a Senior Principal Adjudicator, Compiler Architect, and Impartial Technical Interview Judge.
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
   - If no genuine defect exists, emit an empty findings array [].

6. NEGATION PRESERVATION (MANDATORY INVARIANT):
   - Before asserting that the specification requires anything, QUOTE the exact clause verbatim.
   - Specs routinely FORBID techniques ("without justify-content", "without a spacer element",
     "no extra markup"). Never restate a prohibition as a requirement. If the task says the
     student must solve it WITHOUT X, then the absence of X is COMPLIANCE, never a defect.
   - If you cannot quote a clause that supports your claim, you have no claim. Drop it.

7. FOCUS-RING AND UA-STYLING TELL (HARNESS FALSE-NEGATIVE SIGNATURE):
   - If EVERY reported mismatch is confined to outline-color / outline-style / outline-width /
     outline-offset, or to any other property the user agent controls on :focus, then the
     harness compared focus state, not the student's CSS. That is a TEST_HARNESS_FALSE_NEGATIVE.
     Set isSemanticPass: true and clear findings.
   - The same applies when no reported mismatch touches any property the student actually wrote.

8. THE FOUR PILLARS MUST BE FOUR DIFFERENT ANSWERS:
   - specRequirements, studentBehavior, testHarnessStatus and impartialReasoning are independent
     cross-checks. Never repeat one paragraph across them — identical pillars are a collapsed
     analysis, not a corroborated one.
   - testHarnessStatus is your JUDGEMENT of the failure log, not a copy of it. Never paste the log.

9. YOU ARE NOT REQUIRED TO EXPLAIN THE FAILURE:
   - You are given the failure as evidence, NOT as a fact to justify. If the student's code
     satisfies the quoted spec, the correct output is that the harness is wrong.
   - Never invent a defect to account for a red test. An unexplainable failure is a harness bug.`,K=`You are the Presiding Chief Technical Arbitrator and Court of Appeal for Technical Code Assessments.
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
3. Output strict JSON conforming to the schema.`,Z=`You are an expert Principal Engineer, Staff Frontend Architect, and Impartial Technical Mentor.
You are mentoring and debating with a developer working on a technical interview coding exercise.

CORE MENTORING & DIALECTIC RULES:
1. IMPARTIAL EVALUATION: Ground every analysis in the PROBLEM SPECIFICATIONS and the STUDENT'S ACTUAL CODE. Do not assume the student is wrong just because their approach differs from standard templates.
2. DEBATE & REBUTTAL: If the student questions or challenges a previous diagnosis, evaluate their claim with complete objectivity. If their argument is sound, acknowledge it and explain why. If they erred, provide clear logical/execution proof.
3. CONSTRUCTIVE & ACTIONABLE: Provide high-leverage mental models, memory lifecycle diagrams, and architectural insights with clean markdown formatting.`,ee="Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC";let S=null,j=null,L=null,A=!1,b=!1,M=null,H=0,P=null,_=ee;const F=new Set;function C(){F.forEach(r=>r())}function oe(){const[r,e]=l.useState(L),[s,E]=l.useState(!0),[i,f]=l.useState(A),[N,T]=l.useState(b),[R,y]=l.useState(M),[d,a]=l.useState(H),[g,u]=l.useState(!1),[m,I]=l.useState(P),[k,x]=l.useState(_);l.useEffect(()=>{const t=()=>{e(L),f(A),T(b),y(M),a(H),I(P),x(_)};return F.add(t),t(),L||z().then(o=>{L=o,e(o),!o.webGpuSupported&&typeof navigator<"u"&&!("gpu"in navigator)&&E(!1),C()}),()=>{F.delete(t)}},[]);const D=l.useCallback(async t=>{if(A||b)return;b=!0,P=null,C();const o=typeof t=="string"&&t.trim().length>0?t.trim():_;try{j||(j=new Worker(new URL("/assets/socraticAiWorker-Dc1cCqhL.js",import.meta.url),{type:"module"}));const{CreateWebWorkerMLCEngine:c}=await W(async()=>{const{CreateWebWorkerMLCEngine:p}=await import("./vendor-web-llm-DT0Ab8E6.js");return{CreateWebWorkerMLCEngine:p}},[]);S=await c(j,o,{initProgressCallback:p=>{M=p.text,p.progress!==void 0&&(H=Math.round(p.progress*100)),C()}}),_=o,A=!0,b=!1,M=null,C()}catch(c){console.error("Socratic AI initialization failed:",c),P=(c==null?void 0:c.message)||"Failed to initialize in-browser AI engine.",b=!1,C()}},[]),v=l.useCallback(async t=>{var o,c;if(!A||!S)return null;u(!0);try{const h=`[EXERCISE CONTEXT]
Title: ${t.unitTitle}
Practice Type: ${t.practiceType||"code"}
Task: ${t.taskDescription}
Requirements:
${t.specs.map((w,B)=>`  ${B+1}. ${w}`).join(`
`)}

[DETERMINISTIC TEST HARNESS CLAIM / LOGS]
Harness Failure Reason: ${t.tier1FailureReason}
Captured Execution Output: ${JSON.stringify(t.runtimeLogs||[])}

[STUDENT ATTEMPT CODE]
\`\`\`
${t.userCode}
\`\`\`

[REFERENCE SOLUTION (EXEMPLARY VARIANT)]
\`\`\`
${t.solutionCode}
\`\`\`

Perform an impartial comparative adjudication. Output strict JSON.`,U=(c=(o=(await S.chat.completions.create({messages:[{role:"system",content:Q},{role:"user",content:h}],response_format:{type:"json_object",schema:JSON.stringify(q)},temperature:0,top_p:1,max_tokens:1200})).choices[0])==null?void 0:o.message)==null?void 0:c.content;if(!U)throw new Error("Empty AI response");return JSON.parse(U)}catch(h){return console.error("Socratic AI Evaluation failed:",h),null}finally{u(!1)}},[]),O=l.useCallback(async t=>{var o,c,h;if(!A||!S)return null;u(!0);try{const p=`[APPEAL CASE CONTEXT]
Problem: ${t.unitTitle}
Task: ${t.taskDescription}
Requirements: ${JSON.stringify(t.specs)}

[DETERMINISTIC TEST FAILURE]
${t.tier1FailureReason}

[STUDENT ATTEMPT CODE]
\`\`\`
${t.userCode}
\`\`\`

[STUDENT'S DISPUTE & COUNTER-ARGUMENT]
"${t.userArgument}"

[PREVIOUS DIAGNOSTIC SUMMARY]
${((o=t.previousVerdict)==null?void 0:o.diagnosticSummary)||"None"}

[REFERENCE SOLUTION]
\`\`\`
${t.solutionCode}
\`\`\`

Conduct an appellate review of the argument. Output strict JSON.`,w=(h=(c=(await S.chat.completions.create({messages:[{role:"system",content:K},{role:"user",content:p}],response_format:{type:"json_object",schema:JSON.stringify(q)},temperature:0,top_p:1,max_tokens:1200})).choices[0])==null?void 0:c.message)==null?void 0:h.content;if(!w)throw new Error("Empty AI response");return JSON.parse(w)}catch(p){return console.error("Appellate dispute evaluation failed:",p),null}finally{u(!1)}},[]),G=l.useCallback(async t=>{var o,c;if(!A||!S)return null;try{return((c=(o=(await S.chat.completions.create({messages:[{role:"system",content:Z},...t.messages.map(p=>({role:p.role,content:p.content}))],temperature:.3,max_tokens:1024})).choices[0])==null?void 0:o.message)==null?void 0:c.content)||null}catch(h){return console.error("Socratic Chat completion failed:",h),null}},[]);return{hardwareProfile:r,isSupported:s,isReady:i,isLoading:N,downloadProgress:R,progressPercent:d,isAnalyzing:g,error:m,activeModelId:k,initializeEngine:D,evaluateFailure:v,disputeEvaluation:O,chatWithMentor:G}}function te(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function V(r){let e=te(r);return e=e.replace(/\*\*\*(.*?)\*\*\*/g,'<strong class="text-amber-300 font-extrabold break-words">$1</strong>'),e=e.replace(/\*\*(.*?)\*\*/g,'<strong class="text-white font-bold break-words">$1</strong>'),e=e.replace(/\*(.*?)\*/g,'<em class="text-sky-300 italic break-words">$1</em>'),e=e.replace(/`([^`]+)`/g,'<code class="px-1.5 py-0.5 rounded-md bg-slate-950 border border-slate-700/80 text-sky-300 font-mono text-[11px] select-all break-all">$1</code>'),e}function ce(r){const e=$.c(11),{text:s,className:E}=r,i=E===void 0?"":E,[f,N]=l.useState(null);let T;e[0]===Symbol.for("react.memo_cache_sentinel")?(T=(g,u)=>{navigator.clipboard.writeText(g),N(u),setTimeout(()=>N(null),2e3)},e[0]=T):T=e[0];const R=T;let y,d;if(e[1]!==i||e[2]!==f||e[3]!==s){const g=s.split(/(```[\s\S]*?```)/g);y=`space-y-3 leading-relaxed text-slate-300 text-xs sm:text-[13px] break-words min-w-0 max-w-full overflow-hidden ${i}`;let u;e[6]!==f?(u=(m,I)=>{if(m.startsWith("```")&&m.endsWith("```")){const x=m.indexOf(`
`),D=x!==-1?m.slice(3,x).trim():"",v=x!==-1?m.slice(x+1,-3):m.slice(3,-3),O=f===I;return n.jsxs("div",{className:"my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-md max-w-full",children:[n.jsxs("div",{className:"flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider",children:[n.jsx("span",{className:"text-sky-400 font-mono",children:D||"code"}),n.jsxs("button",{onClick:()=>R(v,I),className:"flex items-center gap-1.5 hover:text-slate-200 cursor-pointer transition text-slate-400",children:[O?n.jsx(Y,{size:12,className:"text-emerald-400"}):n.jsx(J,{size:12}),n.jsx("span",{children:O?"Copied":"Copy"})]})]}),n.jsx("pre",{className:"p-3.5 sm:p-4 overflow-x-auto text-sky-200 leading-relaxed custom-scrollbar font-mono text-xs whitespace-pre-wrap break-all max-w-full",children:v})]},I)}const k=m.split(`
`);return n.jsx("div",{className:"space-y-2 min-w-0 max-w-full",children:k.map(se)},I)},e[6]=f,e[7]=u):u=e[7],d=g.map(u),e[1]=i,e[2]=f,e[3]=s,e[4]=y,e[5]=d}else y=e[4],d=e[5];let a;return e[8]!==y||e[9]!==d?(a=n.jsx("div",{className:y,children:d}),e[8]=y,e[9]=d,e[10]=a):a=e[10],a}function se(r,e){const s=r.trim();return s?s.startsWith("# ")?n.jsx("h2",{className:"text-lg sm:text-xl font-black text-white mt-3.5 mb-1.5 tracking-tight break-words",children:s.slice(2)},e):s.startsWith("## ")?n.jsx("h3",{className:"text-sm sm:text-base font-extrabold text-sky-300 mt-3 mb-1 tracking-tight break-words",children:s.slice(3)},e):s.startsWith("### ")?n.jsx("h4",{className:"text-xs sm:text-sm font-bold text-amber-300 mt-2 mb-0.5 break-words",children:s.slice(4)},e):s.startsWith("> ")?n.jsxs("div",{className:"p-3 my-2 rounded-xl bg-sky-950/30 border-l-4 border-sky-500 text-sky-200 text-xs flex items-start gap-2 min-w-0 break-words",children:[n.jsx(X,{size:14,className:"text-sky-400 mt-0.5 shrink-0"}),n.jsx("div",{className:"min-w-0 flex-1 break-words",dangerouslySetInnerHTML:{__html:V(s.slice(2))}})]},e):s.startsWith("- ")||s.startsWith("* ")?n.jsxs("div",{className:"flex items-start gap-2 pl-2 min-w-0 break-words",children:[n.jsx("span",{className:"text-sky-400 font-bold select-none text-xs mt-0.5 shrink-0",children:"▪"}),n.jsx("span",{className:"flex-1 min-w-0 break-words",dangerouslySetInnerHTML:{__html:V(s.slice(2))}})]},e):n.jsx("p",{className:"leading-relaxed break-words min-w-0",dangerouslySetInnerHTML:{__html:V(r)}},e):null}export{ce as F,V as f,oe as u};
