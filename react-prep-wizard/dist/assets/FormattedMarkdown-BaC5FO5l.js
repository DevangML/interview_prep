import{j as t}from"./vendor-query-CVs38Wia.js";import{c as S}from"./index-dHIDRUiu.js";import{r as b}from"./vendor-react-KgNWHp-S.js";import{N as y,aw as R,ax as O}from"./vendor-icons-BCWI6wLZ.js";const D=`You are a Senior Principal Adjudicator, Compiler Architect, and Impartial Technical Interview Judge.
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
   - Never invent a defect to account for a red test. An unexplainable failure is a harness bug.`,j=`You are the Presiding Chief Technical Arbitrator and Court of Appeal for Technical Code Assessments.
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
3. Output strict JSON conforming to the schema.`,M=`You are an expert Principal Engineer, Staff Frontend Architect, and Impartial Technical Mentor.
You are mentoring and debating with a developer working on a technical interview coding exercise.

CORE MENTORING & DIALECTIC RULES:
1. IMPARTIAL EVALUATION: Ground every analysis in the PROBLEM SPECIFICATIONS and the STUDENT'S ACTUAL CODE. Do not assume the student is wrong just because their approach differs from standard templates.
2. DEBATE & REBUTTAL: If the student questions or challenges a previous diagnosis, evaluate their claim with complete objectivity. If their argument is sound, acknowledge it and explain why. If they erred, provide clear logical/execution proof.
3. CONSTRUCTIVE & ACTIONABLE: Provide high-leverage mental models, memory lifecycle diagrams, and architectural insights with clean markdown formatting.`,U=`You are Senku — Principal Systems Architect, Master Technical Interview Coach, and Socratic Mentor for the Live Ops Console project.
Your mission is to guide Devang through building the entire Live Ops Console from scratch at ~/Desktop/live_feed_console with uncompromising rigor, deep pedagogy, and zero spoon-feeding.

CORE SOCRATIC & PEDAGOGICAL INVARIANTS:
1. DEVANG WRITES ALL CODE (MANDATORY RULE):
   - You NEVER write full implementation code or complete function bodies for him.
   - If asked for code, provide the contract, signatures, data shape, or a step skeleton, then demand: "The implementation is yours. Show me your attempt."

2. PEDAGOGY AT THE LINE OF NEED:
   - Teach theory right where it breaks or where it is required, never as a generic lecture.
   - Explain the "WHY": What catastrophic failure happens in production without this structure? (e.g. why subclasses of Error with super(message, feedId) are needed to discriminate network retry from quarantine).
   - Explain the "HOW" and mechanistic internals (prototype chain, super() binding, AbortController lifecycle, Promise combinators, V8 memory, RingBuffer pointers, CSS min-width: 0).

3. DIALECTIC EDGE-CASE INTERROGATION:
   - When reviewing or discussing a step, interrogate edge cases ONE-BY-ONE.
   - Ask sharp, probing questions: "What happens if super() is omitted?", "What error comes out of Promise.any when all reject?", "Does fetch() reject on a 500 error?"

4. 3-ALTITUDE MASTERY:
   - Altitude 1 (SPOT IT): Deriving the mechanism from the problem.
   - Altitude 2 (BUILD IT): Writing clean, bug-free, invariant-compliant code.
   - Altitude 3 (SAY IT): Articulating the architectural defense in a crisp 60-90 second spoken answer for Staff/Principal interview rounds.

5. CONCISE, IMPACTFUL VOICE:
   - Speak with architectural authority, precision, and clarity. Format responses with clean Markdown, bullet points, and code contract blocks.`;function w(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function f(a){let e=w(a);return e=e.replace(/\*\*\*(.*?)\*\*\*/g,'<strong class="text-amber-300 font-extrabold break-words">$1</strong>'),e=e.replace(/\*\*(.*?)\*\*/g,'<strong class="text-white font-bold break-words">$1</strong>'),e=e.replace(/\*(.*?)\*/g,'<em class="text-sky-300 italic break-words">$1</em>'),e=e.replace(/`([^`]+)`/g,'<code class="px-1.5 py-0.5 rounded-md bg-slate-950 border border-slate-700/80 text-sky-300 font-mono text-[11px] select-all break-all">$1</code>'),e}function V(a){const e=S.c(11),{text:s,className:g}=a,h=g===void 0?"":g,[c,E]=b.useState(null);let l;e[0]===Symbol.for("react.memo_cache_sentinel")?(l=(p,o)=>{navigator.clipboard.writeText(p),E(o),setTimeout(()=>E(null),2e3)},e[0]=l):l=e[0];const N=l;let i,n;if(e[1]!==h||e[2]!==c||e[3]!==s){const p=s.split(/(```[\s\S]*?```)/g);i=`space-y-3 leading-relaxed text-slate-300 text-xs sm:text-[13px] break-words min-w-0 max-w-full overflow-hidden ${h}`;let o;e[6]!==c?(o=(r,m)=>{if(r.startsWith("```")&&r.endsWith("```")){const u=r.indexOf(`
`),x=u!==-1?r.slice(3,u).trim():"",T=u!==-1?r.slice(u+1,-3):r.slice(3,-3),A=c===m;return t.jsxs("div",{className:"my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-md max-w-full",children:[t.jsxs("div",{className:"flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider",children:[t.jsx("span",{className:"text-sky-400 font-mono",children:x||"code"}),t.jsxs("button",{onClick:()=>N(T,m),className:"flex items-center gap-1.5 hover:text-slate-200 cursor-pointer transition text-slate-400",children:[A?t.jsx(y,{size:12,className:"text-emerald-400"}):t.jsx(R,{size:12}),t.jsx("span",{children:A?"Copied":"Copy"})]})]}),t.jsx("pre",{className:"p-3.5 sm:p-4 overflow-x-auto text-sky-200 leading-relaxed custom-scrollbar font-mono text-xs whitespace-pre-wrap break-all max-w-full",children:T})]},m)}const I=r.split(`
`);return t.jsx("div",{className:"space-y-2 min-w-0 max-w-full",children:I.map(C)},m)},e[6]=c,e[7]=o):o=e[7],n=p.map(o),e[1]=h,e[2]=c,e[3]=s,e[4]=i,e[5]=n}else i=e[4],n=e[5];let d;return e[8]!==i||e[9]!==n?(d=t.jsx("div",{className:i,children:n}),e[8]=i,e[9]=n,e[10]=d):d=e[10],d}function C(a,e){const s=a.trim();return s?s.startsWith("# ")?t.jsx("h2",{className:"text-lg sm:text-xl font-black text-white mt-3.5 mb-1.5 tracking-tight break-words",children:s.slice(2)},e):s.startsWith("## ")?t.jsx("h3",{className:"text-sm sm:text-base font-extrabold text-sky-300 mt-3 mb-1 tracking-tight break-words",children:s.slice(3)},e):s.startsWith("### ")?t.jsx("h4",{className:"text-xs sm:text-sm font-bold text-amber-300 mt-2 mb-0.5 break-words",children:s.slice(4)},e):s.startsWith("> ")?t.jsxs("div",{className:"p-3 my-2 rounded-xl bg-sky-950/30 border-l-4 border-sky-500 text-sky-200 text-xs flex items-start gap-2 min-w-0 break-words",children:[t.jsx(O,{size:14,className:"text-sky-400 mt-0.5 shrink-0"}),t.jsx("div",{className:"min-w-0 flex-1 break-words",dangerouslySetInnerHTML:{__html:f(s.slice(2))}})]},e):s.startsWith("- ")||s.startsWith("* ")?t.jsxs("div",{className:"flex items-start gap-2 pl-2 min-w-0 break-words",children:[t.jsx("span",{className:"text-sky-400 font-bold select-none text-xs mt-0.5 shrink-0",children:"▪"}),t.jsx("span",{className:"flex-1 min-w-0 break-words",dangerouslySetInnerHTML:{__html:f(s.slice(2))}})]},e):t.jsx("p",{className:"leading-relaxed break-words min-w-0",dangerouslySetInnerHTML:{__html:f(a)}},e):null}export{j as A,V as F,D as I,U as L,M,f};
