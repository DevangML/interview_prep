import{j as s}from"./vendor-query-CVs38Wia.js";import{c as te,h as V,u as ne,P as Y}from"./index-Dvp_9p2G.js";import{r as i}from"./vendor-react-KgNWHp-S.js";import{F as se,C as G,R as le,S as ae,K as ie,u as ce,a as de,b as xe,c as Z,P as ee,d as pe}from"./KeyboardAccessoryBar-CqSybkoD.js";import{N as me,U as fe}from"./NeuralMindTrigger-Cs6vbMYv.js";import{u as ue}from"./FormattedMarkdown-BZdGxTlw.js";import{U as be,V as he,p as H,S as oe,R as re}from"./vendor-icons-8bRW1Gx4.js";import"./vendor-editor-B0XDVFHE.js";function ge(t){const e=te.c(62),{jsxCode:c,cssCode:a,compiledJs:A,appCss:J,error:B,activeFileTab:l,onSelectFileTab:X,onJsxChange:f,onCssChange:L,onFormat:r,onReset:K,onOpenAi:d}=t,[n,E]=i.useState("editor");let u;e[0]!==l||e[1]!==a||e[2]!==c||e[3]!==L||e[4]!==f?(u=o=>{l==="jsx"?f(c+o):L(a+o)},e[0]=l,e[1]=a,e[2]=c,e[3]=L,e[4]=f,e[5]=u):u=e[5];const $=u;let z;e[6]===Symbol.for("react.memo_cache_sentinel")?(z=()=>{V.selection(),E("editor")},e[6]=z):z=e[6];const D=`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${n==="editor"?"bg-emerald-600 text-white shadow-xs":"text-slate-400 hover:text-slate-200"}`;let O,T;e[7]===Symbol.for("react.memo_cache_sentinel")?(O=s.jsx(be,{size:13}),T=s.jsx("span",{children:"Editor"}),e[7]=O,e[8]=T):(O=e[7],T=e[8]);let b;e[9]!==D?(b=s.jsxs("button",{onClick:z,className:D,children:[O,T]}),e[9]=D,e[10]=b):b=e[10];let F;e[11]===Symbol.for("react.memo_cache_sentinel")?(F=()=>{V.selection(),E("preview")},e[11]=F):F=e[11];const U=`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${n==="preview"?"bg-emerald-600 text-white shadow-xs":"text-slate-400 hover:text-slate-200"}`;let R,P;e[12]===Symbol.for("react.memo_cache_sentinel")?(P=s.jsx(he,{size:13}),R=s.jsx("span",{children:"Live Preview"}),e[12]=R,e[13]=P):(R=e[12],P=e[13]);let h;e[14]!==U?(h=s.jsxs("button",{onClick:F,className:U,children:[P,R]}),e[14]=U,e[15]=h):h=e[15];let g;e[16]!==h||e[17]!==b?(g=s.jsxs("div",{className:"flex bg-slate-950 p-0.5 rounded-xl border border-slate-800 flex-1",children:[b,h]}),e[16]=h,e[17]=b,e[18]=g):g=e[18];let j;e[19]!==d?(j=()=>{V.impactLight(),d()},e[19]=d,e[20]=j):j=e[20];let v;e[21]===Symbol.for("react.memo_cache_sentinel")?(v=s.jsx(H,{size:13}),e[21]=v):v=e[21];let y;e[22]!==j?(y=s.jsx("button",{onClick:j,className:"p-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs active:scale-95 transition",title:"AI Copilot",children:v}),e[22]=j,e[23]=y):y=e[23];let S;e[24]!==r?(S=async()=>{V.selection(),await r()},e[24]=r,e[25]=S):S=e[25];let I;e[26]===Symbol.for("react.memo_cache_sentinel")?(I=s.jsx(oe,{size:13,className:"text-sky-400"}),e[26]=I):I=e[26];let C;e[27]!==S?(C=s.jsx("button",{onClick:S,className:"p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer",title:"Format Code",children:I}),e[27]=S,e[28]=C):C=e[28];let w;e[29]!==K?(w=()=>{V.impactMedium(),K()},e[29]=K,e[30]=w):w=e[30];let N;e[31]===Symbol.for("react.memo_cache_sentinel")?(N=s.jsx(re,{size:13}),e[31]=N):N=e[31];let x;e[32]!==w?(x=s.jsx("button",{onClick:w,className:"p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer",title:"Reset Sandbox",children:N}),e[32]=w,e[33]=x):x=e[33];let k;e[34]!==y||e[35]!==C||e[36]!==x?(k=s.jsxs("div",{className:"flex items-center gap-1",children:[y,C,x]}),e[34]=y,e[35]=C,e[36]=x,e[37]=k):k=e[37];let _;e[38]!==g||e[39]!==k?(_=s.jsx("div",{className:"bg-slate-900 border-b border-slate-800 p-2.5 shrink-0 space-y-2 select-none",children:s.jsxs("div",{className:"flex items-center justify-between gap-2",children:[g,k]})}),e[38]=g,e[39]=k,e[40]=_):_=e[40];let p;e[41]!==l||e[42]!==J||e[43]!==A||e[44]!==a||e[45]!==B||e[46]!==c||e[47]!==n||e[48]!==L||e[49]!==r||e[50]!==f||e[51]!==d||e[52]!==X?(p=s.jsx("div",{className:"flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2",children:n==="editor"?s.jsxs("div",{className:"h-full flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden",children:[s.jsx(se,{tabs:[{key:"jsx",label:"component.jsx"},{key:"css",label:"styles.css"}],active:l,onSelect:o=>{V.selection(),X(o)}}),s.jsxs("div",{className:"flex-1 min-h-0",children:[l==="jsx"&&s.jsx(G,{value:c,onChange:f,onFormat:r,lang:"jsx",autoFocus:!0}),l==="css"&&s.jsx(G,{value:a,onChange:L,onFormat:r,lang:"css"})]})]}):s.jsxs("div",{className:"h-full flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden",children:[s.jsx("div",{className:"flex-1 min-h-0",children:s.jsx(le,{children:s.jsx(ae,{baseCSS:J,userCSS:a,jsCode:A})})}),B&&s.jsxs("div",{className:"p-3 bg-rose-950/90 border-t border-rose-800/80 text-rose-300 text-xs font-mono shrink-0 flex items-center justify-between gap-2",children:[s.jsx("span",{className:"truncate flex-1",children:B}),s.jsx("button",{onClick:()=>{V.impactMedium(),d()},className:"px-2 py-1 rounded bg-rose-600 text-white font-bold text-[11px] shrink-0",children:"Diagnose"})]})]})}),e[41]=l,e[42]=J,e[43]=A,e[44]=a,e[45]=B,e[46]=c,e[47]=n,e[48]=L,e[49]=r,e[50]=f,e[51]=d,e[52]=X,e[53]=p):p=e[53];let m;e[54]!==l||e[55]!==$||e[56]!==n?(m=n==="editor"&&s.jsx(ie,{onInsertText:$,customSnippets:l==="jsx"?[{label:"useState",snippet:"const [state, setState] = useState();"},{label:"useEffect",snippet:`useEffect(() => {
  
}, []);`},{label:"<div>",snippet:"<div></div>"},{label:"return",snippet:`return (
  
);`},{label:"const",snippet:"const "},{label:"=>",snippet:" => "}]:[{label:"display: flex",snippet:`display: flex;
`},{label:"padding",snippet:`padding: 16px;
`},{label:"margin",snippet:`margin: 0 auto;
`},{label:"border-radius",snippet:`border-radius: 12px;
`},{label:"background",snippet:`background: #0f172a;
`}]}),e[54]=l,e[55]=$,e[56]=n,e[57]=m):m=e[57];let M;return e[58]!==_||e[59]!==p||e[60]!==m?(M=s.jsxs("div",{className:"flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 overflow-hidden font-sans",children:[_,p,m]}),e[58]=_,e[59]=p,e[60]=m,e[61]=M):M=e[61],M}const W=`import React, { useState } from 'react';

export default function PricingCalculator() {
  const [tier, setTier] = useState('pro');
  const [seats, setSeats] = useState(5);
  const [annual, setAnnual] = useState(true);

  const rate = tier === 'starter' ? 12 : tier === 'pro' ? 29 : 79;
  const discount = annual ? 0.8 : 1.0;
  const total = Math.round(seats * rate * discount);

  return (
    <div className="pricing-card">
      <h2>Team Subscription</h2>
      <div className="tier-select">
        {['starter', 'pro', 'enterprise'].map((t) => (
          <button
            key={t}
            className={tier === t ? 'active' : ''}
            onClick={() => setTier(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="slider-row">
        <label>Seats: <strong>{seats}</strong></label>
        <input
          type="range" min="1" max="50"
          value={seats} onChange={(e) => setSeats(+e.target.value)}
        />
      </div>
      <div className="toggle-row">
        <label>
          <input
            type="checkbox" checked={annual}
            onChange={(e) => setAnnual(e.target.checked)}
          />
          Annual Billing (20% Off)
        </label>
      </div>
      <div className="price-display">
        <span className="amount">\${total}</span>
        <span className="period">/ month</span>
      </div>
    </div>
  );
}`,q=`.pricing-card {
  max-width: 360px;
  margin: 20px auto;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  font-family: system-ui, sans-serif;
}
.pricing-card h2 { margin: 0 0 16px; font-size: 1.25rem; }
.tier-select { display: flex; gap: 6px; margin-bottom: 16px; }
.tier-select button {
  flex: 1; padding: 6px 0; border: 1px solid #cbd5e1;
  background: #f8fafc; border-radius: 6px; font-weight: 600; font-size: 0.75rem; cursor: pointer;
}
.tier-select button.active { background: #0284c7; color: white; border-color: #0284c7; }
.slider-row { margin-bottom: 16px; }
.slider-row input { width: 100%; margin-top: 6px; accent-color: #0284c7; }
.toggle-row { margin-bottom: 20px; font-size: 0.85rem; }
.price-display { display: flex; align-items: baseline; gap: 6px; }
.price-display .amount { font-size: 2rem; font-weight: 800; color: #0f172a; }
.price-display .period { font-size: 0.85rem; color: #64748b; }`;function Pe(){const t=te.c(51),[e,c]=i.useState(Ne),[a,A]=i.useState(we),[J,B]=i.useState(""),[l,X]=i.useState(Ce),[f,L]=i.useState(""),[r,K]=i.useState(null),d=ne(),[n,E]=i.useState(!1),{isReady:u,chatWithMentor:$}=ue(),{compile:z}=ce(),{formatCSS:D,formatJSX:O}=de();let T,b;t[0]!==e?(T=()=>{localStorage.setItem("playground:jsx",e)},b=[e],t[0]=e,t[1]=T,t[2]=b):(T=t[1],b=t[2]),i.useEffect(T,b);let F,U;t[3]!==a?(F=()=>{localStorage.setItem("playground:css",a)},U=[a],t[3]=a,t[4]=F,t[5]=U):(F=t[4],U=t[5]),i.useEffect(F,U);let R,P;t[6]!==l?(R=()=>{localStorage.setItem("playground:tab",l)},P=[l],t[6]=l,t[7]=R,t[8]=P):(R=t[7],P=t[8]),i.useEffect(R,P);let h,g;t[9]===Symbol.for("react.memo_cache_sentinel")?(h=()=>{const o=()=>E(Se);return window.addEventListener("toggle-universal-ai",o),()=>window.removeEventListener("toggle-universal-ai",o)},g=[],t[9]=h,t[10]=g):(h=t[9],g=t[10]),i.useEffect(h,g);let j;t[11]!==l||t[12]!==a||t[13]!==D||t[14]!==O||t[15]!==e?(j=async()=>{if(l==="jsx"){const{code:o}=await O(e);o&&c(o)}else{const{code:o}=await D(a);o&&A(o)}},t[11]=l,t[12]=a,t[13]=D,t[14]=O,t[15]=e,t[16]=j):j=t[16];const v=j;let y,S;t[17]===Symbol.for("react.memo_cache_sentinel")?(S=()=>{fetch("/app.css").then(ye).then(B).catch(ve)},y=[],t[17]=y,t[18]=S):(y=t[17],S=t[18]),i.useEffect(S,y);const I=i.useDeferredValue(e);let C,w;t[19]!==z||t[20]!==I?(C=()=>{z(I).then(o=>{o.error?K(o.error):(K(null),L(o.code||""))})},w=[I,z],t[19]=z,t[20]=I,t[21]=C,t[22]=w):(C=t[21],w=t[22]),i.useEffect(C,w);let N;t[23]!==l||t[24]!==J||t[25]!==f||t[26]!==a||t[27]!==r||t[28]!==v||t[29]!==d||t[30]!==e?(N=d?s.jsx(ge,{jsxCode:e,cssCode:a,compiledJs:f,appCss:J,error:r,activeFileTab:l,onSelectFileTab:X,onJsxChange:c,onCssChange:A,onFormat:v,onReset:()=>{c(W),A(q)},onOpenAi:()=>E(!0)}):s.jsx("main",{className:"flex-1 min-h-0",children:s.jsxs(xe,{direction:"horizontal",className:"h-full w-full gap-2",children:[s.jsx(Z,{defaultSize:50,minSize:20,children:s.jsx(Y,{name:"Playground Editor",children:s.jsxs(ee,{title:"Playground Scratchpad",actions:s.jsxs("div",{className:"flex items-center gap-1.5",children:[s.jsxs("button",{onClick:()=>E(!0),className:"px-2 py-0.5 text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition shadow-xs",title:"Open AI Code Copilot",children:[s.jsx(H,{size:11})," ",s.jsx("span",{children:"AI Copilot"})]}),s.jsxs("button",{onClick:v,className:"px-2 py-0.5 text-xs bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition",children:[s.jsx(oe,{size:11,className:"text-sky-400"})," ",s.jsx("span",{children:"Format"})]}),s.jsxs("button",{onClick:()=>{c(W),A(q)},className:"px-2 py-0.5 text-xs bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition",children:[s.jsx(re,{size:11})," ",s.jsx("span",{children:"Reset"})]})]}),className:"h-full flex flex-col border-slate-800 bg-slate-900 text-slate-200",children:[s.jsx(se,{tabs:[{key:"jsx",label:"component.jsx"},{key:"css",label:"styles.css"}],active:l,onSelect:o=>X(o)}),l==="jsx"&&s.jsx(G,{value:e,onChange:c,onFormat:v,lang:"jsx",autoFocus:!0}),l==="css"&&s.jsx(G,{value:a,onChange:A,onFormat:v,lang:"css"})]})})}),s.jsx(pe,{className:"w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10"}),s.jsx(Z,{defaultSize:50,minSize:20,children:s.jsx(Y,{name:"Playground Execution",children:s.jsxs(ee,{title:"Live React 19 Execution",className:"h-full flex flex-col relative border-slate-800 bg-slate-900 text-slate-200",children:[s.jsx(le,{children:s.jsx(ae,{baseCSS:J,userCSS:a,jsCode:f})}),r&&s.jsxs("div",{className:"px-3 py-2 bg-rose-950/90 border-t border-rose-800/80 text-rose-300 text-xs font-mono shrink-0 flex items-center justify-between gap-2 flex-wrap",children:[s.jsxs("div",{className:"min-w-0 flex-1 truncate",children:["Compilation Error: ",r]}),s.jsxs("button",{onClick:()=>E(!0),className:"px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition shadow-xs shrink-0",children:[s.jsx(H,{size:12}),s.jsx("span",{children:"Diagnose with AI"})]})]})]})})})]})}),t[23]=l,t[24]=J,t[25]=f,t[26]=a,t[27]=r,t[28]=v,t[29]=d,t[30]=e,t[31]=N):N=t[31];let x;t[32]!==n||t[33]!==d||t[34]!==u?(x=!d&&s.jsx(me,{isOpen:n,onToggle:()=>E(je),isAiReady:u,badgeLabel:"React AST & Compiler Copilot",contextType:"sandbox"}),t[32]=n,t[33]=d,t[34]=u,t[35]=x):x=t[35];let k;t[36]===Symbol.for("react.memo_cache_sentinel")?(k=()=>E(!1),t[36]=k):k=t[36];let _;t[37]===Symbol.for("react.memo_cache_sentinel")?(_=(o,Q)=>{o&&c(o),Q&&A(Q)},t[37]=_):_=t[37];let p;t[38]!==a||t[39]!==r||t[40]!==e?(p={jsxCode:e,cssCode:a,error:r,onApplyCode:_},t[38]=a,t[39]=r,t[40]=e,t[41]=p):p=t[41];let m;t[42]!==$||t[43]!==n||t[44]!==u||t[45]!==p?(m=s.jsx(fe,{isOpen:n,onClose:k,contextType:"sandbox",sandboxContext:p,chatWithMentor:$,isAiReady:u}),t[42]=$,t[43]=n,t[44]=u,t[45]=p,t[46]=m):m=t[46];let M;return t[47]!==N||t[48]!==x||t[49]!==m?(M=s.jsxs("div",{className:"flex flex-col flex-1 min-h-0 bg-slate-950 p-2 relative",children:[N,x,m]}),t[47]=N,t[48]=x,t[49]=m,t[50]=M):M=t[50],M}function je(t){return!t}function ve(){}function ye(t){return t.text()}function Se(t){return!t}function Ce(){return localStorage.getItem("playground:tab")||"jsx"}function we(){return localStorage.getItem("playground:css")||q}function Ne(){return localStorage.getItem("playground:jsx")||W}export{Pe as default};
