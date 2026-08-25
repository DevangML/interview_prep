import{j as r}from"./vendor-editor-rpPuSDiZ.js";import{a as V,S as W,R as q}from"./index-BXQF88rf.js";import{r as i}from"./vendor-react-Pl3lkNtW.js";import{a as G,u as H,F as I,C as $,P as B,S as K}from"./useCompiler-CdmIhOCv.js";function Q(){const e=V.c(11),{call:o,ready:m}=G("/workers/prettier.worker.js");let s;e[0]!==o?(s=async(d,f)=>{const p=await o({code:d,parser:f});return p.error||typeof p.code!="string"?{code:d,error:p.error||"formatter unavailable"}:{code:p.code}},e[0]=o,e[1]=s):s=e[1];const a=s;let n;e[2]!==a?(n=d=>a(d,"css"),e[2]=a,e[3]=n):n=e[3];const w=n;let t;e[4]!==a?(t=d=>a(d,"babel"),e[4]=a,e[5]=t):t=e[5];const k=t;let c;return e[6]!==a||e[7]!==w||e[8]!==k||e[9]!==m?(c={formatCSS:w,formatJSX:k,format:a,ready:m},e[6]=a,e[7]=w,e[8]=k,e[9]=m,e[10]=c):c=e[10],c}const M=`import React, { useState } from 'react';

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
}`,O=`.pricing-card {
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
.price-display .period { font-size: 0.85rem; color: #64748b; }`;function ae(){const e=V.c(46),[o,m]=i.useState(M),[s,a]=i.useState(O),[n,w]=i.useState(""),[t,k]=i.useState("jsx"),[c,d]=i.useState(""),[f,p]=i.useState(null),{compile:N}=H(),{formatCSS:U,formatJSX:X}=Q();let _,E;e[0]===Symbol.for("react.memo_cache_sentinel")?(_=()=>{fetch("/app.css").then(Z).then(w).catch(Y)},E=[],e[0]=_,e[1]=E):(_=e[0],E=e[1]),i.useEffect(_,E);const T=i.useDeferredValue(o);let z,A;e[2]!==N||e[3]!==T?(z=()=>{N(T).then(l=>{l.error?p(l.error):(p(null),d(l.code||""))})},A=[T,N],e[2]=N,e[3]=T,e[4]=z,e[5]=A):(z=e[4],A=e[5]),i.useEffect(z,A);let u;e[6]!==t||e[7]!==s||e[8]!==U||e[9]!==X||e[10]!==o?(u=()=>{t==="jsx"?X(o).then(l=>m(l.code)):U(s).then(l=>a(l.code))},e[6]=t,e[7]=s,e[8]=U,e[9]=X,e[10]=o,e[11]=u):u=e[11];let F;e[12]===Symbol.for("react.memo_cache_sentinel")?(F=r.jsx(W,{size:11}),e[12]=F):F=e[12];let x;e[13]!==u?(x=r.jsxs("button",{onClick:u,className:"px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1",children:[F," format"]}),e[13]=u,e[14]=x):x=e[14];let J;e[15]===Symbol.for("react.memo_cache_sentinel")?(J=()=>{m(M),a(O)},e[15]=J):J=e[15];let R;e[16]===Symbol.for("react.memo_cache_sentinel")?(R=r.jsxs("button",{onClick:J,className:"px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1",children:[r.jsx(q,{size:11})," reset"]}),e[16]=R):R=e[16];let g;e[17]!==x?(g=r.jsxs("div",{className:"flex items-center gap-1.5",children:[x,R]}),e[17]=x,e[18]=g):g=e[18];let P;e[19]===Symbol.for("react.memo_cache_sentinel")?(P=[{key:"jsx",label:"component.jsx"},{key:"css",label:"styles.css"}],e[19]=P):P=e[19];let D;e[20]===Symbol.for("react.memo_cache_sentinel")?(D=l=>k(l),e[20]=D):D=e[20];let b;e[21]!==t?(b=r.jsx(I,{tabs:P,active:t,onSelect:D}),e[21]=t,e[22]=b):b=e[22];let h;e[23]!==t||e[24]!==o?(h=t==="jsx"&&r.jsx($,{value:o,onChange:m,lang:"jsx",autoFocus:!0}),e[23]=t,e[24]=o,e[25]=h):h=e[25];let S;e[26]!==t||e[27]!==s?(S=t==="css"&&r.jsx($,{value:s,onChange:a,lang:"css"}),e[26]=t,e[27]=s,e[28]=S):S=e[28];let y;e[29]!==b||e[30]!==h||e[31]!==S||e[32]!==g?(y=r.jsxs(B,{title:"Playground Scratchpad",actions:g,className:"h-full flex flex-col",children:[b,h,S]}),e[29]=b,e[30]=h,e[31]=S,e[32]=g,e[33]=y):y=e[33];let C;e[34]!==n||e[35]!==c||e[36]!==s?(C=r.jsx(K,{baseCSS:n,userCSS:s,jsCode:c}),e[34]=n,e[35]=c,e[36]=s,e[37]=C):C=e[37];let v;e[38]!==f?(v=f&&r.jsxs("div",{className:"px-3 py-1.5 bg-red-100 border-t border-red-200 text-red-800 text-xs font-mono shrink-0",children:["Compilation Error: ",f]}),e[38]=f,e[39]=v):v=e[39];let j;e[40]!==C||e[41]!==v?(j=r.jsxs(B,{title:"Live React 19 Execution",className:"h-full flex flex-col relative",children:[C,v]}),e[40]=C,e[41]=v,e[42]=j):j=e[42];let L;return e[43]!==y||e[44]!==j?(L=r.jsx("div",{className:"flex flex-col flex-1 min-h-0 bg-slate-100 p-2",children:r.jsxs("main",{className:"grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0",children:[y,j]})}),e[43]=y,e[44]=j,e[45]=L):L=e[45],L}function Y(){}function Z(e){return e.text()}export{ae as default};
