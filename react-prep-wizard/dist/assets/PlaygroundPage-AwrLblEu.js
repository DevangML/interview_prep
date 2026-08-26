import{j as t}from"./vendor-query-CVs38Wia.js";import{c as ye,P as me}from"./index-B_38yV3g.js";import{r}from"./vendor-react-KgNWHp-S.js";import{u as je,a as _e,F as ve,C as de,c as fe,P as pe,d as Ce,R as we,S as Ne,b as ke}from"./SandboxFrame-CFqa8FCE.js";import{U as Ae}from"./UniversalAiAssistant-qyqEEtyr.js";import{u as ze}from"./FormattedMarkdown-tUk09g1Q.js";import{p as xe,S as Ee,R as Pe,B as Ie}from"./vendor-icons-CaXeOcN9.js";import"./vendor-editor-B0XDVFHE.js";const ue=`import React, { useState } from 'react';

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
}`,he=`.pricing-card {
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
.price-display .period { font-size: 0.85rem; color: #64748b; }`;function We(){const e=ye.c(81),[a,_]=r.useState(Ue),[o,v]=r.useState(Le),[te,ge]=r.useState(""),[l,be]=r.useState(Je),[se,Se]=r.useState(""),[i,ie]=r.useState(null),[oe,j]=r.useState(!1),{isReady:le,chatWithMentor:ae}=ze(),{compile:C}=je(),{formatCSS:re,formatJSX:ne}=_e();let w,N;e[0]!==a?(w=()=>{localStorage.setItem("playground:jsx",a)},N=[a],e[0]=a,e[1]=w,e[2]=N):(w=e[1],N=e[2]),r.useEffect(w,N);let k,A;e[3]!==o?(k=()=>{localStorage.setItem("playground:css",o)},A=[o],e[3]=o,e[4]=k,e[5]=A):(k=e[4],A=e[5]),r.useEffect(k,A);let z,E;e[6]!==l?(z=()=>{localStorage.setItem("playground:tab",l)},E=[l],e[6]=l,e[7]=z,e[8]=E):(z=e[7],E=e[8]),r.useEffect(z,E);let P,I;e[9]===Symbol.for("react.memo_cache_sentinel")?(P=()=>{const s=()=>j(Oe);return window.addEventListener("toggle-universal-ai",s),()=>window.removeEventListener("toggle-universal-ai",s)},I=[],e[9]=P,e[10]=I):(P=e[9],I=e[10]),r.useEffect(P,I);let R;e[11]!==l||e[12]!==o||e[13]!==re||e[14]!==ne||e[15]!==a?(R=async()=>{if(l==="jsx"){const{code:s}=await ne(a);s&&_(s)}else{const{code:s}=await re(o);s&&v(s)}},e[11]=l,e[12]=o,e[13]=re,e[14]=ne,e[15]=a,e[16]=R):R=e[16];const n=R;let F,T;e[17]===Symbol.for("react.memo_cache_sentinel")?(T=()=>{fetch("/app.css").then(Te).then(ge).catch(Fe)},F=[],e[17]=F,e[18]=T):(F=e[17],T=e[18]),r.useEffect(T,F);const O=r.useDeferredValue(a);let J,L;e[19]!==C||e[20]!==O?(J=()=>{C(O).then(s=>{s.error?ie(s.error):(ie(null),Se(s.code||""))})},L=[O,C],e[19]=C,e[20]=O,e[21]=J,e[22]=L):(J=e[21],L=e[22]),r.useEffect(J,L);let U;e[23]===Symbol.for("react.memo_cache_sentinel")?(U=()=>j(!0),e[23]=U):U=e[23];let B;e[24]===Symbol.for("react.memo_cache_sentinel")?(B=t.jsx(xe,{size:11}),e[24]=B):B=e[24];let D;e[25]===Symbol.for("react.memo_cache_sentinel")?(D=t.jsxs("button",{onClick:U,className:"px-2 py-0.5 text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition shadow-xs",title:"Open AI Code Copilot",children:[B," ",t.jsx("span",{children:"AI Copilot"})]}),e[25]=D):D=e[25];let $;e[26]===Symbol.for("react.memo_cache_sentinel")?($=t.jsx(Ee,{size:11,className:"text-sky-400"}),e[26]=$):$=e[26];let M;e[27]===Symbol.for("react.memo_cache_sentinel")?(M=t.jsx("span",{children:"Format"}),e[27]=M):M=e[27];let c;e[28]!==n?(c=t.jsxs("button",{onClick:n,className:"px-2 py-0.5 text-xs bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition",children:[$," ",M]}),e[28]=n,e[29]=c):c=e[29];let V;e[30]===Symbol.for("react.memo_cache_sentinel")?(V=()=>{_(ue),v(he)},e[30]=V):V=e[30];let X;e[31]===Symbol.for("react.memo_cache_sentinel")?(X=t.jsx(Pe,{size:11}),e[31]=X):X=e[31];let G;e[32]===Symbol.for("react.memo_cache_sentinel")?(G=t.jsxs("button",{onClick:V,className:"px-2 py-0.5 text-xs bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition",children:[X," ",t.jsx("span",{children:"Reset"})]}),e[32]=G):G=e[32];let m;e[33]!==c?(m=t.jsxs("div",{className:"flex items-center gap-1.5",children:[D,c,G]}),e[33]=c,e[34]=m):m=e[34];let H;e[35]===Symbol.for("react.memo_cache_sentinel")?(H=[{key:"jsx",label:"component.jsx"},{key:"css",label:"styles.css"}],e[35]=H):H=e[35];let W;e[36]===Symbol.for("react.memo_cache_sentinel")?(W=s=>be(s),e[36]=W):W=e[36];let d;e[37]!==l?(d=t.jsx(ve,{tabs:H,active:l,onSelect:W}),e[37]=l,e[38]=d):d=e[38];let f;e[39]!==l||e[40]!==n||e[41]!==a?(f=l==="jsx"&&t.jsx(de,{value:a,onChange:_,onFormat:n,lang:"jsx",autoFocus:!0}),e[39]=l,e[40]=n,e[41]=a,e[42]=f):f=e[42];let p;e[43]!==l||e[44]!==o||e[45]!==n?(p=l==="css"&&t.jsx(de,{value:o,onChange:v,onFormat:n,lang:"css"}),e[43]=l,e[44]=o,e[45]=n,e[46]=p):p=e[46];let x;e[47]!==m||e[48]!==d||e[49]!==f||e[50]!==p?(x=t.jsx(fe,{defaultSize:50,minSize:20,children:t.jsx(me,{name:"Playground Editor",children:t.jsxs(pe,{title:"Playground Scratchpad",actions:m,className:"h-full flex flex-col border-slate-800 bg-slate-900 text-slate-200",children:[d,f,p]})})}),e[47]=m,e[48]=d,e[49]=f,e[50]=p,e[51]=x):x=e[51];let q;e[52]===Symbol.for("react.memo_cache_sentinel")?(q=t.jsx(Ce,{className:"w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10"}),e[52]=q):q=e[52];let u;e[53]!==te||e[54]!==se||e[55]!==o?(u=t.jsx(we,{children:t.jsx(Ne,{baseCSS:te,userCSS:o,jsCode:se})}),e[53]=te,e[54]=se,e[55]=o,e[56]=u):u=e[56];let h;e[57]!==i?(h=i&&t.jsxs("div",{className:"px-3 py-2 bg-rose-950/90 border-t border-rose-800/80 text-rose-300 text-xs font-mono shrink-0 flex items-center justify-between gap-2 flex-wrap",children:[t.jsxs("div",{className:"min-w-0 flex-1 truncate",children:["Compilation Error: ",i]}),t.jsxs("button",{onClick:()=>j(!0),className:"px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition shadow-xs shrink-0",children:[t.jsx(xe,{size:12}),t.jsx("span",{children:"Diagnose with AI"})]})]}),e[57]=i,e[58]=h):h=e[58];let g;e[59]!==u||e[60]!==h?(g=t.jsx(fe,{defaultSize:50,minSize:20,children:t.jsx(me,{name:"Playground Execution",children:t.jsxs(pe,{title:"Live React 19 Execution",className:"h-full flex flex-col relative border-slate-800 bg-slate-900 text-slate-200",children:[u,h]})})}),e[59]=u,e[60]=h,e[61]=g):g=e[61];let b;e[62]!==x||e[63]!==g?(b=t.jsx("main",{className:"flex-1 min-h-0",children:t.jsxs(ke,{direction:"horizontal",className:"h-full w-full gap-2",children:[x,q,g]})}),e[62]=x,e[63]=g,e[64]=b):b=e[64];let K;e[65]===Symbol.for("react.memo_cache_sentinel")?(K=()=>j(Re),e[65]=K):K=e[65];let Q;e[66]===Symbol.for("react.memo_cache_sentinel")?(Q=t.jsxs("button",{onClick:K,className:"fixed bottom-5 right-5 z-40 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-all cursor-pointer border border-emerald-400/40",title:"Open AI Code Copilot",children:[t.jsx(Ie,{size:16}),t.jsx("span",{children:"Ask AI Copilot"})]}),e[66]=Q):Q=e[66];let Y;e[67]===Symbol.for("react.memo_cache_sentinel")?(Y=()=>j(!1),e[67]=Y):Y=e[67];let Z;e[68]===Symbol.for("react.memo_cache_sentinel")?(Z=(s,ce)=>{s&&_(s),ce&&v(ce)},e[68]=Z):Z=e[68];let S;e[69]!==o||e[70]!==i||e[71]!==a?(S={jsxCode:a,cssCode:o,error:i,onApplyCode:Z},e[69]=o,e[70]=i,e[71]=a,e[72]=S):S=e[72];let y;e[73]!==ae||e[74]!==oe||e[75]!==le||e[76]!==S?(y=t.jsx(Ae,{isOpen:oe,onClose:Y,contextType:"sandbox",sandboxContext:S,chatWithMentor:ae,isAiReady:le}),e[73]=ae,e[74]=oe,e[75]=le,e[76]=S,e[77]=y):y=e[77];let ee;return e[78]!==b||e[79]!==y?(ee=t.jsxs("div",{className:"flex flex-col flex-1 min-h-0 bg-slate-950 p-2 relative",children:[b,Q,y]}),e[78]=b,e[79]=y,e[80]=ee):ee=e[80],ee}function Re(e){return!e}function Fe(){}function Te(e){return e.text()}function Oe(e){return!e}function Je(){return localStorage.getItem("playground:tab")||"jsx"}function Le(){return localStorage.getItem("playground:css")||he}function Ue(){return localStorage.getItem("playground:jsx")||ue}export{We as default};
