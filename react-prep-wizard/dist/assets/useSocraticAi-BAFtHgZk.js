import{_ as V}from"./index-dHIDRUiu.js";import{r as o}from"./vendor-react-KgNWHp-S.js";import{I as B,A as F,M as W}from"./FormattedMarkdown-BaC5FO5l.js";async function J(){let l=!1,t="Standard Hardware",u=!1,E=!1,i="Generic GPU";const S=typeof navigator<"u"&&navigator.hardwareConcurrency||4,I=typeof navigator<"u"&&"deviceMemory"in navigator&&navigator.deviceMemory||8;let h=!1;if(typeof document<"u")try{const p=document.createElement("canvas"),a=p.getContext("webgl2")||p.getContext("webgl");if(a){const d=a.getExtension("WEBGL_debug_renderer_info");d&&(i=a.getParameter(d.UNMASKED_RENDERER_WEBGL)||"",/Apple/i.test(i)&&(l=!0,/M4/i.test(i)?(u=!0,t=i.includes("Pro")?"Apple M4 Pro":i.includes("Max")?"Apple M4 Max":"Apple M4"):/M3/i.test(i)?t=i.includes("Max")?"Apple M3 Max":i.includes("Pro")?"Apple M3 Pro":"Apple M3":/M2/i.test(i)?t=i.includes("Max")?"Apple M2 Max":i.includes("Pro")?"Apple M2 Pro":"Apple M2":/M1/i.test(i)?t="Apple M1 Series":t="Apple Silicon (Metal)"))}}catch{}if(typeof navigator<"u"&&"gpu"in navigator&&navigator.gpu)try{const p=await navigator.gpu.requestAdapter();if(p){h=!0;const a=p.info;if(a){const d=(a.architecture||"").toLowerCase(),m=(a.vendor||"").toLowerCase(),A=(a.description||"").toLowerCase();(m.includes("apple")||d.includes("metal")||A.includes("apple"))&&(l=!0,(d.includes("m4")||A.includes("m4")||u)&&(u=!0,t=t==="Standard Hardware"?"Apple M4 Pro":t))}}}catch{}return(l||typeof navigator<"u"&&/Mac/i.test(navigator.userAgent)&&S>=8)&&(l=!0,(S>=12||u)&&(u=!0,t=t==="Standard Hardware"||t==="Apple Silicon (Metal)"?"Apple M4 Pro":t),E=!0),{isAppleSilicon:l,chipModel:t,isM4Series:u,isHighPerformance:E,gpuRenderer:i,logicalCores:S,memoryEstimateGB:I,webGpuSupported:h,recommendedModelId:"Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC",maxContextTokens:E?4096:2048}}const D={type:"object",properties:{isSemanticPass:{type:"boolean",description:"Strict boolean: true if student attempt satisfies requirements/specs and achieves semantic correctness, even if it failed deterministic checks due to formatting, valid alternative architecture, or brittle test assertions."},adjudicationVerdict:{type:"string",description:"One of: [STUDENT_CORRECT, STUDENT_ERRED, AMBIGUOUS_SPEC, ALTERNATIVE_VALID]"},confidence:{type:"number",description:"Calibrated certainty: 1.0 (exact certainty), 0.9 (high certainty), 0.7 (probable)."},defectCategory:{type:"string",description:"One of: [NONE_VALID_CODE, SYNTAX_ERROR, RUNTIME_EXCEPTION, MUTATION_BUG, CLOSURE_LEAK, EVENT_LOOP_ORDER, CSS_BOX_MODEL, ASSERTION_FAILURE, TEST_HARNESS_FALSE_NEGATIVE, ALTERNATIVE_IMPLEMENTATION]"},diagnosticSummary:{type:"string",description:"Objective, impartial adjudication explaining whether the student actually erred against the problem contract, or if the test failed on a brittle check."},impartialComparison:{type:"object",properties:{specRequirements:{type:"string",description:"Concise distillation of what the problem specification strictly requires."},studentBehavior:{type:"string",description:"What the student code actually computes, renders, or mutates in runtime/DOM."},testHarnessStatus:{type:"string",description:"Impartial assessment of the deterministic test failure: real violation or brittle false negative?"},impartialReasoning:{type:"string",description:"Definitive impartial verdict weighing the student implementation against the specification."}},required:["specRequirements","studentBehavior","testHarnessStatus","impartialReasoning"]},socraticHintLevel1:{type:"string",description:"High-level conceptual inquiry highlighting the concept without giving away code."},socraticHintLevel2:{type:"string",description:"Targeted clue naming the exact variable, property, or state causing the deviation."},socraticHintLevel3:{type:"string",description:"Concrete structural direction explaining how to resolve the flaw without copying the solution."},disputePromptSuggestion:{type:"string",description:"Suggested point of debate or counter-argument the student can raise if their implementation is valid."},findings:{type:"array",description:"Line-anchored defects. Empty if student is correct. At most 3 distinct items.",items:{type:"object",properties:{anchorCode:{type:"string",description:"VERBATIM copy of the exact code substring from the STUDENT ATTEMPT that contains the problem."},severity:{type:"string",description:"One of: bug, smell, missing"},concept:{type:"string",description:"The underlying computer-science concept."},hint:{type:"string",description:"Targeted clue naming the identifier, property or state."},fix:{type:"string",description:"Structural direction in prose."}},required:["anchorCode","severity","concept","hint","fix"]}}},required:["isSemanticPass","adjudicationVerdict","confidence","defectCategory","diagnosticSummary","impartialComparison","socraticHintLevel1","socraticHintLevel2","socraticHintLevel3","disputePromptSuggestion","findings"]},X="Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC";let g=null,O=null,C=null,f=!1,y=!1,v=null,L=0,_=null,R=X;const b=new Set;function T(){b.forEach(l=>l())}function K(){const[l,t]=o.useState(C),[u,E]=o.useState(!0),[i,S]=o.useState(f),[I,h]=o.useState(y),[w,N]=o.useState(v),[p,a]=o.useState(L),[d,m]=o.useState(!1),[A,x]=o.useState(_),[U,k]=o.useState(R);o.useEffect(()=>{const e=()=>{t(C),S(f),h(y),N(v),a(L),x(_),k(R)};return b.add(e),e(),C||J().then(n=>{C=n,t(n),!n.webGpuSupported&&typeof navigator<"u"&&!("gpu"in navigator)&&E(!1),T()}),()=>{b.delete(e)}},[]);const H=o.useCallback(async e=>{if(f||y)return;y=!0,_=null,T();const n=typeof e=="string"&&e.trim().length>0?e.trim():R;try{O||(O=new Worker(new URL("/assets/socraticAiWorker-Dc1cCqhL.js",import.meta.url),{type:"module"}));const{CreateWebWorkerMLCEngine:r}=await V(async()=>{const{CreateWebWorkerMLCEngine:s}=await import("./vendor-web-llm-DT0Ab8E6.js");return{CreateWebWorkerMLCEngine:s}},[]);g=await r(O,n,{initProgressCallback:s=>{v=s.text,s.progress!==void 0&&(L=Math.round(s.progress*100)),T()}}),R=n,f=!0,y=!1,v=null,T()}catch(r){console.error("Socratic AI initialization failed:",r),_=(r==null?void 0:r.message)||"Failed to initialize in-browser AI engine.",y=!1,T()}},[]),$=o.useCallback(async e=>{var n,r;if(!f||!g)return null;m(!0);try{const c=`[EXERCISE CONTEXT]
Title: ${e.unitTitle}
Practice Type: ${e.practiceType||"code"}
Task: ${e.taskDescription}
Requirements:
${e.specs.map((M,G)=>`  ${G+1}. ${M}`).join(`
`)}

[DETERMINISTIC TEST HARNESS CLAIM / LOGS]
Harness Failure Reason: ${e.tier1FailureReason}
Captured Execution Output: ${JSON.stringify(e.runtimeLogs||[])}

[STUDENT ATTEMPT CODE]
\`\`\`
${e.userCode}
\`\`\`

[REFERENCE SOLUTION (EXEMPLARY VARIANT)]
\`\`\`
${e.solutionCode}
\`\`\`

Perform an impartial comparative adjudication. Output strict JSON.`,P=(r=(n=(await g.chat.completions.create({messages:[{role:"system",content:B},{role:"user",content:c}],response_format:{type:"json_object",schema:JSON.stringify(D)},temperature:0,top_p:1,max_tokens:1200})).choices[0])==null?void 0:n.message)==null?void 0:r.content;if(!P)throw new Error("Empty AI response");return JSON.parse(P)}catch(c){return console.error("Socratic AI Evaluation failed:",c),null}finally{m(!1)}},[]),q=o.useCallback(async e=>{var n,r,c;if(!f||!g)return null;m(!0);try{const s=`[APPEAL CASE CONTEXT]
Problem: ${e.unitTitle}
Task: ${e.taskDescription}
Requirements: ${JSON.stringify(e.specs)}

[DETERMINISTIC TEST FAILURE]
${e.tier1FailureReason}

[STUDENT ATTEMPT CODE]
\`\`\`
${e.userCode}
\`\`\`

[STUDENT'S DISPUTE & COUNTER-ARGUMENT]
"${e.userArgument}"

[PREVIOUS DIAGNOSTIC SUMMARY]
${((n=e.previousVerdict)==null?void 0:n.diagnosticSummary)||"None"}

[REFERENCE SOLUTION]
\`\`\`
${e.solutionCode}
\`\`\`

Conduct an appellate review of the argument. Output strict JSON.`,M=(c=(r=(await g.chat.completions.create({messages:[{role:"system",content:F},{role:"user",content:s}],response_format:{type:"json_object",schema:JSON.stringify(D)},temperature:0,top_p:1,max_tokens:1200})).choices[0])==null?void 0:r.message)==null?void 0:c.content;if(!M)throw new Error("Empty AI response");return JSON.parse(M)}catch(s){return console.error("Appellate dispute evaluation failed:",s),null}finally{m(!1)}},[]),j=o.useCallback(async e=>{var n,r;if(!f||!g)return null;try{return((r=(n=(await g.chat.completions.create({messages:[{role:"system",content:W},...e.messages.map(s=>({role:s.role,content:s.content}))],temperature:.3,max_tokens:1024})).choices[0])==null?void 0:n.message)==null?void 0:r.content)||null}catch(c){return console.error("Socratic Chat completion failed:",c),null}},[]);return{hardwareProfile:l,isSupported:u,isReady:i,isLoading:I,downloadProgress:w,progressPercent:p,isAnalyzing:d,error:A,activeModelId:U,initializeEngine:H,evaluateFailure:$,disputeEvaluation:q,chatWithMentor:j}}export{K as u};
