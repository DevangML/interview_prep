import{j as t}from"./vendor-editor-rpPuSDiZ.js";import{a as Y,S as Z,R as ee,b as V}from"./index-oJ96fTnd.js";import{r as l}from"./vendor-react-Pl3lkNtW.js";import{u as te,a as se,c as ae,F as oe,C as q,P as G,S as re}from"./index.module-Djc_T0k9.js";const H=`import React, { useState } from 'react';

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
}`,I=`.pricing-card {
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
.price-display .period { font-size: 0.85rem; color: #64748b; }`;function pe(){const e=Y.c(56),[n,R]=l.useState(H),[r,D]=l.useState(I),[L,K]=l.useState(""),[a,Q]=l.useState("jsx"),[U,W]=l.useState(""),[h,O]=l.useState(null),{compile:S}=te(),{formatCSS:B,formatJSX:X}=se();let y;e[0]!==a||e[1]!==r||e[2]!==B||e[3]!==X||e[4]!==n?(y=async()=>{if(a==="jsx"){const{code:s}=await X(n);s&&R(s)}else{const{code:s}=await B(r);s&&D(s)}},e[0]=a,e[1]=r,e[2]=B,e[3]=X,e[4]=n,e[5]=y):y=e[5];const o=y;let C;e[6]!==o?(C=()=>{o()},e[6]=o,e[7]=C):C=e[7];const i=ae(C,800);let j;e[8]!==i?(j=s=>{R(s),i()},e[8]=i,e[9]=j):j=e[9];const $=j;let v;e[10]!==i?(v=s=>{D(s),i()},e[10]=i,e[11]=v):v=e[11];const M=v;let w,_;e[12]===Symbol.for("react.memo_cache_sentinel")?(w=()=>{fetch("/app.css").then(ne).then(K).catch(le)},_=[],e[12]=w,e[13]=_):(w=e[12],_=e[13]),l.useEffect(w,_);const N=l.useDeferredValue(n);let k,E;e[14]!==S||e[15]!==N?(k=()=>{S(N).then(s=>{s.error?O(s.error):(O(null),W(s.code||""))})},E=[N,S],e[14]=S,e[15]=N,e[16]=k,e[17]=E):(k=e[16],E=e[17]),l.useEffect(k,E);let F;e[18]===Symbol.for("react.memo_cache_sentinel")?(F=t.jsx(Z,{size:11}),e[18]=F):F=e[18];let c;e[19]!==o?(c=t.jsxs("button",{onClick:o,className:"px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1",children:[F," format"]}),e[19]=o,e[20]=c):c=e[20];let P;e[21]===Symbol.for("react.memo_cache_sentinel")?(P=()=>{R(H),D(I)},e[21]=P):P=e[21];let T;e[22]===Symbol.for("react.memo_cache_sentinel")?(T=t.jsxs("button",{onClick:P,className:"px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1",children:[t.jsx(ee,{size:11})," reset"]}),e[22]=T):T=e[22];let d;e[23]!==c?(d=t.jsxs("div",{className:"flex items-center gap-1.5",children:[c,T]}),e[23]=c,e[24]=d):d=e[24];let z;e[25]===Symbol.for("react.memo_cache_sentinel")?(z=[{key:"jsx",label:"component.jsx"},{key:"css",label:"styles.css"}],e[25]=z):z=e[25];let A;e[26]===Symbol.for("react.memo_cache_sentinel")?(A=s=>Q(s),e[26]=A):A=e[26];let m;e[27]!==a?(m=t.jsx(oe,{tabs:z,active:a,onSelect:A}),e[27]=a,e[28]=m):m=e[28];let p;e[29]!==a||e[30]!==o||e[31]!==$||e[32]!==n?(p=a==="jsx"&&t.jsx(q,{value:n,onChange:$,onFormat:o,lang:"jsx",autoFocus:!0}),e[29]=a,e[30]=o,e[31]=$,e[32]=n,e[33]=p):p=e[33];let f;e[34]!==a||e[35]!==r||e[36]!==M||e[37]!==o?(f=a==="css"&&t.jsx(q,{value:r,onChange:M,onFormat:o,lang:"css"}),e[34]=a,e[35]=r,e[36]=M,e[37]=o,e[38]=f):f=e[38];let u;e[39]!==d||e[40]!==m||e[41]!==p||e[42]!==f?(u=t.jsx(V,{name:"Playground Editor",children:t.jsxs(G,{title:"Playground Scratchpad",actions:d,className:"h-full flex flex-col",children:[m,p,f]})}),e[39]=d,e[40]=m,e[41]=p,e[42]=f,e[43]=u):u=e[43];let x;e[44]!==L||e[45]!==U||e[46]!==r?(x=t.jsx(re,{baseCSS:L,userCSS:r,jsCode:U}),e[44]=L,e[45]=U,e[46]=r,e[47]=x):x=e[47];let g;e[48]!==h?(g=h&&t.jsxs("div",{className:"px-3 py-1.5 bg-red-100 border-t border-red-200 text-red-800 text-xs font-mono shrink-0",children:["Compilation Error: ",h]}),e[48]=h,e[49]=g):g=e[49];let b;e[50]!==x||e[51]!==g?(b=t.jsx(V,{name:"Playground Execution",children:t.jsxs(G,{title:"Live React 19 Execution",className:"h-full flex flex-col relative",children:[x,g]})}),e[50]=x,e[51]=g,e[52]=b):b=e[52];let J;return e[53]!==u||e[54]!==b?(J=t.jsx("div",{className:"flex flex-col flex-1 min-h-0 bg-slate-100 p-2",children:t.jsxs("main",{className:"grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0",children:[u,b]})}),e[53]=u,e[54]=b,e[55]=J):J=e[55],J}function le(){}function ne(e){return e.text()}export{pe as default};
