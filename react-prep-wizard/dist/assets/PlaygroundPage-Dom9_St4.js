import{j as s}from"./vendor-query-CVs38Wia.js";import{c as ae,h as B,u as de,C as xe,P as te}from"./index-BjKgjo3V.js";import{r as c}from"./vendor-react-KgNWHp-S.js";import{F as oe,C as G,R as ne,S as re,K as pe,u as me,a as ue,b as fe,c as se,P as le,d as be}from"./KeyboardAccessoryBar-DTo_-pvw.js";import{N as ge,U as he}from"./NeuralMindTrigger-lz9WCevs.js";import{u as je}from"./FormattedMarkdown-V-fjr68T.js";import{U as ye,V as ve,p as W,S as ie,R as ce}from"./vendor-icons-8bRW1Gx4.js";import"./vendor-editor-B0XDVFHE.js";function Se(t){const e=ae.c(62),{jsxCode:i,cssCode:o,compiledJs:g,appCss:M,error:X,activeFileTab:a,onSelectFileTab:$,onJsxChange:h,onCssChange:J,onFormat:n,onReset:H,onOpenAi:d}=t,[r,_]=c.useState("editor");let j;e[0]!==a||e[1]!==o||e[2]!==i||e[3]!==J||e[4]!==h?(j=K=>{a==="jsx"?h(i+K):J(o+K)},e[0]=a,e[1]=o,e[2]=i,e[3]=J,e[4]=h,e[5]=j):j=e[5];const D=j;let E;e[6]===Symbol.for("react.memo_cache_sentinel")?(E=()=>{B.selection(),_("editor")},e[6]=E):E=e[6];const V=`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${r==="editor"?"bg-emerald-600 text-white shadow-xs":"text-slate-400 hover:text-slate-200"}`;let O,A;e[7]===Symbol.for("react.memo_cache_sentinel")?(O=s.jsx(ye,{size:13}),A=s.jsx("span",{children:"Editor"}),e[7]=O,e[8]=A):(O=e[7],A=e[8]);let y;e[9]!==V?(y=s.jsxs("button",{onClick:E,className:V,children:[O,A]}),e[9]=V,e[10]=y):y=e[10];let T;e[11]===Symbol.for("react.memo_cache_sentinel")?(T=()=>{B.selection(),_("preview")},e[11]=T):T=e[11];const U=`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${r==="preview"?"bg-emerald-600 text-white shadow-xs":"text-slate-400 hover:text-slate-200"}`;let z,F;e[12]===Symbol.for("react.memo_cache_sentinel")?(F=s.jsx(ve,{size:13}),z=s.jsx("span",{children:"Live Preview"}),e[12]=z,e[13]=F):(z=e[12],F=e[13]);let v;e[14]!==U?(v=s.jsxs("button",{onClick:T,className:U,children:[F,z]}),e[14]=U,e[15]=v):v=e[15];let x;e[16]!==v||e[17]!==y?(x=s.jsxs("div",{className:"flex bg-slate-950 p-0.5 rounded-xl border border-slate-800 flex-1",children:[y,v]}),e[16]=v,e[17]=y,e[18]=x):x=e[18];let S;e[19]!==d?(S=()=>{B.impactLight(),d()},e[19]=d,e[20]=S):S=e[20];let R;e[21]===Symbol.for("react.memo_cache_sentinel")?(R=s.jsx(W,{size:13}),e[21]=R):R=e[21];let C;e[22]!==S?(C=s.jsx("button",{onClick:S,className:"p-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs active:scale-95 transition",title:"AI Copilot",children:R}),e[22]=S,e[23]=C):C=e[23];let w;e[24]!==n?(w=async()=>{B.selection(),await n()},e[24]=n,e[25]=w):w=e[25];let P;e[26]===Symbol.for("react.memo_cache_sentinel")?(P=s.jsx(ie,{size:13,className:"text-sky-400"}),e[26]=P):P=e[26];let p;e[27]!==w?(p=s.jsx("button",{onClick:w,className:"p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer",title:"Format Code",children:P}),e[27]=w,e[28]=p):p=e[28];let m;e[29]!==H?(m=()=>{B.impactMedium(),H()},e[29]=H,e[30]=m):m=e[30];let I;e[31]===Symbol.for("react.memo_cache_sentinel")?(I=s.jsx(ce,{size:13}),e[31]=I):I=e[31];let N;e[32]!==m?(N=s.jsx("button",{onClick:m,className:"p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer",title:"Reset Sandbox",children:I}),e[32]=m,e[33]=N):N=e[33];let u;e[34]!==C||e[35]!==p||e[36]!==N?(u=s.jsxs("div",{className:"flex items-center gap-1",children:[C,p,N]}),e[34]=C,e[35]=p,e[36]=N,e[37]=u):u=e[37];let f;e[38]!==x||e[39]!==u?(f=s.jsx("div",{className:"bg-slate-900 border-b border-slate-800 p-2.5 shrink-0 space-y-2 select-none",children:s.jsxs("div",{className:"flex items-center justify-between gap-2",children:[x,u]})}),e[38]=x,e[39]=u,e[40]=f):f=e[40];let k;e[41]!==a||e[42]!==M||e[43]!==g||e[44]!==o||e[45]!==X||e[46]!==i||e[47]!==r||e[48]!==J||e[49]!==n||e[50]!==h||e[51]!==d||e[52]!==$?(k=s.jsx("div",{className:"flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2",children:r==="editor"?s.jsxs("div",{className:"h-full flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden",children:[s.jsx(oe,{tabs:[{key:"jsx",label:"component.jsx"},{key:"css",label:"styles.css"}],active:a,onSelect:K=>{B.selection(),$(K)}}),s.jsxs("div",{className:"flex-1 min-h-0",children:[a==="jsx"&&s.jsx(G,{value:i,onChange:h,onFormat:n,lang:"jsx",autoFocus:!0}),a==="css"&&s.jsx(G,{value:o,onChange:J,onFormat:n,lang:"css"})]})]}):s.jsxs("div",{className:"h-full flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden",children:[s.jsx("div",{className:"flex-1 min-h-0",children:s.jsx(ne,{children:s.jsx(re,{baseCSS:M,userCSS:o,jsCode:g})})}),X&&s.jsxs("div",{className:"p-3 bg-rose-950/90 border-t border-rose-800/80 text-rose-300 text-xs font-mono shrink-0 flex items-center justify-between gap-2",children:[s.jsx("span",{className:"truncate flex-1",children:X}),s.jsx("button",{onClick:()=>{B.impactMedium(),d()},className:"px-2 py-1 rounded bg-rose-600 text-white font-bold text-[11px] shrink-0",children:"Diagnose"})]})]})}),e[41]=a,e[42]=M,e[43]=g,e[44]=o,e[45]=X,e[46]=i,e[47]=r,e[48]=J,e[49]=n,e[50]=h,e[51]=d,e[52]=$,e[53]=k):k=e[53];let l;e[54]!==a||e[55]!==D||e[56]!==r?(l=r==="editor"&&s.jsx(pe,{onInsertText:D,customSnippets:a==="jsx"?[{label:"useState",snippet:"const [state, setState] = useState();"},{label:"useEffect",snippet:`useEffect(() => {
  
}, []);`},{label:"<div>",snippet:"<div></div>"},{label:"return",snippet:`return (
  
);`},{label:"const",snippet:"const "},{label:"=>",snippet:" => "}]:[{label:"display: flex",snippet:`display: flex;
`},{label:"padding",snippet:`padding: 16px;
`},{label:"margin",snippet:`margin: 0 auto;
`},{label:"border-radius",snippet:`border-radius: 12px;
`},{label:"background",snippet:`background: #0f172a;
`}]}),e[54]=a,e[55]=D,e[56]=r,e[57]=l):l=e[57];let L;return e[58]!==f||e[59]!==k||e[60]!==l?(L=s.jsxs("div",{className:"flex flex-col flex-1 min-h-0 bg-slate-950 text-slate-100 overflow-hidden font-sans",children:[f,k,l]}),e[58]=f,e[59]=k,e[60]=l,e[61]=L):L=e[61],L}const q=`import React, { useState } from 'react';

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
}`,Q=`.pricing-card {
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
.price-display .period { font-size: 0.85rem; color: #64748b; }`;function Je(){const t=ae.c(49),[e,i]=c.useState(Ae),[o,g]=c.useState(Ee),[M,X]=c.useState(""),[a,$]=c.useState(_e),[h,J]=c.useState(""),[n,H]=c.useState(null),d=de(),[r,_]=c.useState(!1),{isReady:j,chatWithMentor:D}=je(),{compile:E}=me(),{formatCSS:V,formatJSX:O}=ue();let A,y;t[0]!==a||t[1]!==o||t[2]!==e?(A=()=>{localStorage.setItem("playground:jsx",e),localStorage.setItem("playground:css",o),localStorage.setItem("playground:tab",a);const l=setTimeout(()=>{xe.savePlayground(e,o,a)},1e3);return()=>clearTimeout(l)},y=[e,o,a],t[0]=a,t[1]=o,t[2]=e,t[3]=A,t[4]=y):(A=t[3],y=t[4]),c.useEffect(A,y);let T,U;t[5]===Symbol.for("react.memo_cache_sentinel")?(T=()=>{const l=L=>{var Y,Z,ee;const b=L.detail;(Y=b==null?void 0:b.playground)!=null&&Y.jsx&&i(b.playground.jsx),(Z=b==null?void 0:b.playground)!=null&&Z.css&&g(b.playground.css),(ee=b==null?void 0:b.playground)!=null&&ee.tab&&$(b.playground.tab)};return window.addEventListener("cloud-state-hydrated",l),()=>window.removeEventListener("cloud-state-hydrated",l)},U=[],t[5]=T,t[6]=U):(T=t[5],U=t[6]),c.useEffect(T,U);let z,F;t[7]===Symbol.for("react.memo_cache_sentinel")?(z=()=>{const l=()=>_(ke);return window.addEventListener("toggle-universal-ai",l),()=>window.removeEventListener("toggle-universal-ai",l)},F=[],t[7]=z,t[8]=F):(z=t[7],F=t[8]),c.useEffect(z,F);let v;t[9]!==a||t[10]!==o||t[11]!==V||t[12]!==O||t[13]!==e?(v=async()=>{if(a==="jsx"){const{code:l}=await O(e);l&&i(l)}else{const{code:l}=await V(o);l&&g(l)}},t[9]=a,t[10]=o,t[11]=V,t[12]=O,t[13]=e,t[14]=v):v=t[14];const x=v;let S,R;t[15]===Symbol.for("react.memo_cache_sentinel")?(S=()=>{fetch("/app.css").then(Ne).then(X).catch(we)},R=[],t[15]=S,t[16]=R):(S=t[15],R=t[16]),c.useEffect(S,R);const C=c.useDeferredValue(e);let w,P;t[17]!==E||t[18]!==C?(P=()=>{E(C).then(l=>{l.error?H(l.error):(H(null),J(l.code||""))})},w=[C,E],t[17]=E,t[18]=C,t[19]=w,t[20]=P):(w=t[19],P=t[20]),c.useEffect(P,w);let p;t[21]!==a||t[22]!==M||t[23]!==h||t[24]!==o||t[25]!==n||t[26]!==x||t[27]!==d||t[28]!==e?(p=d?s.jsx(Se,{jsxCode:e,cssCode:o,compiledJs:h,appCss:M,error:n,activeFileTab:a,onSelectFileTab:$,onJsxChange:i,onCssChange:g,onFormat:x,onReset:()=>{i(q),g(Q)},onOpenAi:()=>_(!0)}):s.jsx("main",{className:"flex-1 min-h-0",children:s.jsxs(fe,{direction:"horizontal",className:"h-full w-full gap-2",children:[s.jsx(se,{defaultSize:50,minSize:20,children:s.jsx(te,{name:"Playground Editor",children:s.jsxs(le,{title:"Playground Scratchpad",actions:s.jsxs("div",{className:"flex items-center gap-1.5",children:[s.jsxs("button",{onClick:()=>_(!0),className:"px-2 py-0.5 text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition shadow-xs",title:"Open AI Code Copilot",children:[s.jsx(W,{size:11})," ",s.jsx("span",{children:"AI Copilot"})]}),s.jsxs("button",{onClick:x,className:"px-2 py-0.5 text-xs bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition",children:[s.jsx(ie,{size:11,className:"text-sky-400"})," ",s.jsx("span",{children:"Format"})]}),s.jsxs("button",{onClick:()=>{i(q),g(Q)},className:"px-2 py-0.5 text-xs bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition",children:[s.jsx(ce,{size:11})," ",s.jsx("span",{children:"Reset"})]})]}),className:"h-full flex flex-col border-slate-800 bg-slate-900 text-slate-200",children:[s.jsx(oe,{tabs:[{key:"jsx",label:"component.jsx"},{key:"css",label:"styles.css"}],active:a,onSelect:l=>$(l)}),a==="jsx"&&s.jsx(G,{value:e,onChange:i,onFormat:x,lang:"jsx",autoFocus:!0}),a==="css"&&s.jsx(G,{value:o,onChange:g,onFormat:x,lang:"css"})]})})}),s.jsx(be,{className:"w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10"}),s.jsx(se,{defaultSize:50,minSize:20,children:s.jsx(te,{name:"Playground Execution",children:s.jsxs(le,{title:"Live React 19 Execution",className:"h-full flex flex-col relative border-slate-800 bg-slate-900 text-slate-200",children:[s.jsx(ne,{children:s.jsx(re,{baseCSS:M,userCSS:o,jsCode:h})}),n&&s.jsxs("div",{className:"px-3 py-2 bg-rose-950/90 border-t border-rose-800/80 text-rose-300 text-xs font-mono shrink-0 flex items-center justify-between gap-2 flex-wrap",children:[s.jsxs("div",{className:"min-w-0 flex-1 truncate",children:["Compilation Error: ",n]}),s.jsxs("button",{onClick:()=>_(!0),className:"px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition shadow-xs shrink-0",children:[s.jsx(W,{size:12}),s.jsx("span",{children:"Diagnose with AI"})]})]})]})})})]})}),t[21]=a,t[22]=M,t[23]=h,t[24]=o,t[25]=n,t[26]=x,t[27]=d,t[28]=e,t[29]=p):p=t[29];let m;t[30]!==r||t[31]!==d||t[32]!==j?(m=!d&&s.jsx(ge,{isOpen:r,onToggle:()=>_(Ce),isAiReady:j,badgeLabel:"React AST & Compiler Copilot",contextType:"sandbox"}),t[30]=r,t[31]=d,t[32]=j,t[33]=m):m=t[33];let I;t[34]===Symbol.for("react.memo_cache_sentinel")?(I=()=>_(!1),t[34]=I):I=t[34];let N;t[35]===Symbol.for("react.memo_cache_sentinel")?(N=(l,L)=>{l&&i(l),L&&g(L)},t[35]=N):N=t[35];let u;t[36]!==o||t[37]!==n||t[38]!==e?(u={jsxCode:e,cssCode:o,error:n,onApplyCode:N},t[36]=o,t[37]=n,t[38]=e,t[39]=u):u=t[39];let f;t[40]!==D||t[41]!==r||t[42]!==j||t[43]!==u?(f=s.jsx(he,{isOpen:r,onClose:I,contextType:"sandbox",sandboxContext:u,chatWithMentor:D,isAiReady:j}),t[40]=D,t[41]=r,t[42]=j,t[43]=u,t[44]=f):f=t[44];let k;return t[45]!==p||t[46]!==m||t[47]!==f?(k=s.jsxs("div",{className:"flex flex-col flex-1 min-h-0 bg-slate-950 p-2 relative",children:[p,m,f]}),t[45]=p,t[46]=m,t[47]=f,t[48]=k):k=t[48],k}function Ce(t){return!t}function we(){}function Ne(t){return t.text()}function ke(t){return!t}function _e(){return localStorage.getItem("playground:tab")||"jsx"}function Ee(){return localStorage.getItem("playground:css")||Q}function Ae(){return localStorage.getItem("playground:jsx")||q}export{Je as default};
