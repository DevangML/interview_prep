import{_ as B,c as W}from"./index-CstRr6rb.js";import{r as c}from"./vendor-react-KgNWHp-S.js";import{j as i}from"./vendor-query-CVs38Wia.js";import{Q as G,ad as J,ae as Y}from"./vendor-icons-CaXeOcN9.js";async function z(){let d=!1,e="Standard Hardware",p=!1,T=!1,s="Generic GPU";const g=typeof navigator<"u"&&navigator.hardwareConcurrency||4,b=typeof navigator<"u"&&"deviceMemory"in navigator&&navigator.deviceMemory||8;let y=!1;if(typeof document<"u")try{const l=document.createElement("canvas"),r=l.getContext("webgl2")||l.getContext("webgl");if(r){const f=r.getExtension("WEBGL_debug_renderer_info");f&&(s=r.getParameter(f.UNMASKED_RENDERER_WEBGL)||"",/Apple/i.test(s)&&(d=!0,/M4/i.test(s)?(p=!0,e=s.includes("Pro")?"Apple M4 Pro":s.includes("Max")?"Apple M4 Max":"Apple M4"):/M3/i.test(s)?e=s.includes("Max")?"Apple M3 Max":s.includes("Pro")?"Apple M3 Pro":"Apple M3":/M2/i.test(s)?e=s.includes("Max")?"Apple M2 Max":s.includes("Pro")?"Apple M2 Pro":"Apple M2":/M1/i.test(s)?e="Apple M1 Series":e="Apple Silicon (Metal)"))}}catch{}if(typeof navigator<"u"&&"gpu"in navigator&&navigator.gpu)try{const l=await navigator.gpu.requestAdapter();if(l){y=!0;const r=l.info;if(r){const f=(r.architecture||"").toLowerCase(),m=(r.vendor||"").toLowerCase(),A=(r.description||"").toLowerCase();(m.includes("apple")||f.includes("metal")||A.includes("apple"))&&(d=!0,(f.includes("m4")||A.includes("m4")||p)&&(p=!0,e=e==="Standard Hardware"?"Apple M4 Pro":e))}}}catch{}return(d||typeof navigator<"u"&&/Mac/i.test(navigator.userAgent)&&g>=8)&&(d=!0,(g>=12||p)&&(p=!0,e=e==="Standard Hardware"||e==="Apple Silicon (Metal)"?"Apple M4 Pro":e),T=!0),{isAppleSilicon:d,chipModel:e,isM4Series:p,isHighPerformance:T,gpuRenderer:s,logicalCores:g,memoryEstimateGB:b,webGpuSupported:y,recommendedModelId:"Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC",maxContextTokens:T?4096:2048}}const F={type:"object",properties:{isSemanticPass:{type:"boolean",description:"Strict boolean: true if student attempt satisfies requirements/specs and achieves semantic correctness, even if it failed deterministic checks due to formatting, valid alternative architecture, or brittle test assertions."},adjudicationVerdict:{type:"string",description:"One of: [STUDENT_CORRECT, STUDENT_ERRED, AMBIGUOUS_SPEC, ALTERNATIVE_VALID]"},confidence:{type:"number",description:"Calibrated certainty: 1.0 (exact certainty), 0.9 (high certainty), 0.7 (probable)."},defectCategory:{type:"string",description:"One of: [NONE_VALID_CODE, SYNTAX_ERROR, RUNTIME_EXCEPTION, MUTATION_BUG, CLOSURE_LEAK, EVENT_LOOP_ORDER, CSS_BOX_MODEL, ASSERTION_FAILURE, TEST_HARNESS_FALSE_NEGATIVE, ALTERNATIVE_IMPLEMENTATION]"},diagnosticSummary:{type:"string",description:"Objective, impartial adjudication explaining whether the student actually erred against the problem contract, or if the test failed on a brittle check."},impartialComparison:{type:"object",properties:{specRequirements:{type:"string",description:"Concise distillation of what the problem specification strictly requires."},studentBehavior:{type:"string",description:"What the student code actually computes, renders, or mutates in runtime/DOM."},testHarnessStatus:{type:"string",description:"Impartial assessment of the deterministic test failure: real violation or brittle false negative?"},impartialReasoning:{type:"string",description:"Definitive impartial verdict weighing the student implementation against the specification."}},required:["specRequirements","studentBehavior","testHarnessStatus","impartialReasoning"]},socraticHintLevel1:{type:"string",description:"High-level conceptual inquiry highlighting the concept without giving away code."},socraticHintLevel2:{type:"string",description:"Targeted clue naming the exact variable, property, or state causing the deviation."},socraticHintLevel3:{type:"string",description:"Concrete structural direction explaining how to resolve the flaw without copying the solution."},disputePromptSuggestion:{type:"string",description:"Suggested point of debate or counter-argument the student can raise if their implementation is valid."},findings:{type:"array",description:"Line-anchored defects. Empty if student is correct. At most 3 distinct items.",items:{type:"object",properties:{anchorCode:{type:"string",description:"VERBATIM copy of the exact code substring from the STUDENT ATTEMPT that contains the problem."},severity:{type:"string",description:"One of: bug, smell, missing"},concept:{type:"string",description:"The underlying computer-science concept."},hint:{type:"string",description:"Targeted clue naming the identifier, property or state."},fix:{type:"string",description:"Structural direction in prose."}},required:["anchorCode","severity","concept","hint","fix"]}}},required:["isSemanticPass","adjudicationVerdict","confidence","defectCategory","diagnosticSummary","impartialComparison","socraticHintLevel1","socraticHintLevel2","socraticHintLevel3","disputePromptSuggestion","findings"]},X=`You are a Senior Principal Adjudicator, Compiler Architect, and Impartial Technical Interview Judge.
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
   - If no genuine defect exists, emit an empty findings array [].`,Q=`You are the Presiding Chief Technical Arbitrator and Court of Appeal for Technical Code Assessments.
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
3. Output strict JSON conforming to the schema.`,K=`You are an expert Principal Engineer, Staff Frontend Architect, and Impartial Technical Mentor.
You are mentoring and debating with a developer working on a technical interview coding exercise.

CORE MENTORING & DIALECTIC RULES:
1. IMPARTIAL EVALUATION: Ground every analysis in the PROBLEM SPECIFICATIONS and the STUDENT'S ACTUAL CODE. Do not assume the student is wrong just because their approach differs from standard templates.
2. DEBATE & REBUTTAL: If the student questions or challenges a previous diagnosis, evaluate their claim with complete objectivity. If their argument is sound, acknowledge it and explain why. If they erred, provide clear logical/execution proof.
3. CONSTRUCTIVE & ACTIONABLE: Provide high-leverage mental models, memory lifecycle diagrams, and architectural insights with clean markdown formatting.`,Z="Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC";let I=null,V=null,w=null,N=!1,R=!1,_=null,H=0,D=null,j=Z;const $=new Set;function O(){$.forEach(d=>d())}function re(){const[d,e]=c.useState(w),[p,T]=c.useState(!0),[s,g]=c.useState(N),[b,y]=c.useState(R),[M,S]=c.useState(_),[l,r]=c.useState(H),[f,m]=c.useState(!1),[A,x]=c.useState(D),[v,k]=c.useState(j);c.useEffect(()=>{const t=()=>{e(w),g(N),y(R),S(_),r(H),x(D),k(j)};return $.add(t),t(),w||z().then(a=>{w=a,e(a),!a.webGpuSupported&&typeof navigator<"u"&&!("gpu"in navigator)&&T(!1),O()}),()=>{$.delete(t)}},[]);const C=c.useCallback(async t=>{if(N||R)return;R=!0,D=null,O();const a=typeof t=="string"&&t.trim().length>0?t.trim():j;try{V||(V=new Worker(new URL("/assets/socraticAiWorker-Dc1cCqhL.js",import.meta.url),{type:"module"}));const{CreateWebWorkerMLCEngine:o}=await B(async()=>{const{CreateWebWorkerMLCEngine:u}=await import("./vendor-web-llm-DT0Ab8E6.js");return{CreateWebWorkerMLCEngine:u}},[]);I=await o(V,a,{initProgressCallback:u=>{_=u.text,u.progress!==void 0&&(H=Math.round(u.progress*100)),O()}}),j=a,N=!0,R=!1,_=null,O()}catch(o){console.error("Socratic AI initialization failed:",o),D=(o==null?void 0:o.message)||"Failed to initialize in-browser AI engine.",R=!1,O()}},[]),h=c.useCallback(async t=>{var a,o;if(!N||!I)return null;m(!0);try{const E=`[EXERCISE CONTEXT]
Title: ${t.unitTitle}
Practice Type: ${t.practiceType||"code"}
Task: ${t.taskDescription}
Requirements:
${t.specs.map((P,q)=>`  ${q+1}. ${P}`).join(`
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

Perform an impartial comparative adjudication. Output strict JSON.`,U=(o=(a=(await I.chat.completions.create({messages:[{role:"system",content:X},{role:"user",content:E}],response_format:{type:"json_object",schema:JSON.stringify(F)},temperature:0,top_p:1,max_tokens:1200})).choices[0])==null?void 0:a.message)==null?void 0:o.content;if(!U)throw new Error("Empty AI response");return JSON.parse(U)}catch(E){return console.error("Socratic AI Evaluation failed:",E),null}finally{m(!1)}},[]),n=c.useCallback(async t=>{var a,o,E;if(!N||!I)return null;m(!0);try{const u=`[APPEAL CASE CONTEXT]
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
${((a=t.previousVerdict)==null?void 0:a.diagnosticSummary)||"None"}

[REFERENCE SOLUTION]
\`\`\`
${t.solutionCode}
\`\`\`

Conduct an appellate review of the argument. Output strict JSON.`,P=(E=(o=(await I.chat.completions.create({messages:[{role:"system",content:Q},{role:"user",content:u}],response_format:{type:"json_object",schema:JSON.stringify(F)},temperature:0,top_p:1,max_tokens:1200})).choices[0])==null?void 0:o.message)==null?void 0:E.content;if(!P)throw new Error("Empty AI response");return JSON.parse(P)}catch(u){return console.error("Appellate dispute evaluation failed:",u),null}finally{m(!1)}},[]),L=c.useCallback(async t=>{var a,o;if(!N||!I)return null;try{return((o=(a=(await I.chat.completions.create({messages:[{role:"system",content:K},...t.messages.map(u=>({role:u.role,content:u.content}))],temperature:.3,max_tokens:1024})).choices[0])==null?void 0:a.message)==null?void 0:o.content)||null}catch(E){return console.error("Socratic Chat completion failed:",E),null}},[]);return{hardwareProfile:d,isSupported:p,isReady:s,isLoading:b,downloadProgress:M,progressPercent:l,isAnalyzing:f,error:A,activeModelId:v,initializeEngine:C,evaluateFailure:h,disputeEvaluation:n,chatWithMentor:L}}function ae(d){const e=W.c(11),{text:p,className:T}=d,s=T===void 0?"":T,[g,b]=c.useState(null);let y;e[0]===Symbol.for("react.memo_cache_sentinel")?(y=(f,m)=>{navigator.clipboard.writeText(f),b(m),setTimeout(()=>b(null),2e3)},e[0]=y):y=e[0];const M=y;let S,l;if(e[1]!==s||e[2]!==g||e[3]!==p){const f=p.split(/(```[\s\S]*?```)/g),m=ee;S=`space-y-3 leading-relaxed text-slate-300 text-xs sm:text-[13px] ${s}`;let A;e[6]!==g?(A=(x,v)=>{if(x.startsWith("```")&&x.endsWith("```")){const C=x.indexOf(`
`),h=C!==-1?x.slice(3,C).trim():"",n=C!==-1?x.slice(C+1,-3):x.slice(3,-3),L=g===v;return i.jsxs("div",{className:"my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-md",children:[i.jsxs("div",{className:"flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider",children:[i.jsx("span",{className:"text-sky-400",children:h||"code"}),i.jsxs("button",{onClick:()=>M(n,v),className:"flex items-center gap-1.5 hover:text-slate-200 cursor-pointer transition text-slate-400",children:[L?i.jsx(G,{size:12,className:"text-emerald-400"}):i.jsx(J,{size:12}),i.jsx("span",{children:L?"Copied":"Copy"})]})]}),i.jsx("pre",{className:"p-4 overflow-x-auto text-sky-200 leading-relaxed custom-scrollbar font-mono text-xs whitespace-pre-wrap",children:n})]},v)}const k=x.split(`
`);return i.jsx("div",{className:"space-y-2",children:k.map((C,h)=>{const n=C.trim();return n?n.startsWith("# ")?i.jsx("h2",{className:"text-xl sm:text-2xl font-black text-white mt-4 mb-2 tracking-tight",children:n.slice(2)},h):n.startsWith("## ")?i.jsx("h3",{className:"text-base sm:text-lg font-extrabold text-sky-300 mt-3 mb-1.5 tracking-tight",children:n.slice(3)},h):n.startsWith("### ")?i.jsx("h4",{className:"text-sm font-bold text-amber-300 mt-2.5 mb-1",children:n.slice(4)},h):n.startsWith("> ")?i.jsxs("div",{className:"p-3 my-2 rounded-xl bg-sky-950/30 border-l-4 border-sky-500 text-sky-200 text-xs flex items-start gap-2",children:[i.jsx(Y,{size:14,className:"text-sky-400 mt-0.5 shrink-0"}),i.jsx("div",{dangerouslySetInnerHTML:{__html:m(n.slice(2))}})]},h):n.startsWith("- ")||n.startsWith("* ")?i.jsxs("div",{className:"flex items-start gap-2 pl-2",children:[i.jsx("span",{className:"text-sky-400 font-bold select-none text-xs mt-0.5",children:"▪"}),i.jsx("span",{className:"flex-1",dangerouslySetInnerHTML:{__html:m(n.slice(2))}})]},h):i.jsx("p",{className:"leading-relaxed",dangerouslySetInnerHTML:{__html:m(C)}},h):null})},v)},e[6]=g,e[7]=A):A=e[7],l=f.map(A),e[1]=s,e[2]=g,e[3]=p,e[4]=S,e[5]=l}else S=e[4],l=e[5];let r;return e[8]!==S||e[9]!==l?(r=i.jsx("div",{className:S,children:l}),e[8]=S,e[9]=l,e[10]=r):r=e[10],r}function ee(d){return d.replace(/\*\*\*(.*?)\*\*\*/g,'<strong class="text-amber-300 font-extrabold">$1</strong>').replace(/\*\*(.*?)\*\*/g,'<strong class="text-white font-bold">$1</strong>').replace(/\*(.*?)\*/g,'<em class="text-sky-300 italic">$1</em>').replace(/`([^`]+)`/g,'<code class="px-1.5 py-0.5 rounded-md bg-slate-950 border border-slate-700/80 text-sky-300 font-mono text-[11px]">$1</code>')}export{ae as F,re as u};
