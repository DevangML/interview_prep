import{j as t}from"./vendor-editor-BIJn0Szn.js";import{a as se,S as ae,R as oe,b as q}from"./index-BgXEFf55.js";import{r}from"./vendor-react-BaEbFVPW.js";import{u as re,a as le,F as ne,C as G,P as H,R as ie,S as ce}from"./useFormatter-DNCtmGcW.js";const K=`import React, { useState } from 'react';

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
.price-display .period { font-size: 0.85rem; color: #64748b; }`;function Se(){const e=se.c(59),[l,U]=r.useState(ue),[o,B]=r.useState(fe),[V,W]=r.useState(""),[s,Y]=r.useState(pe),[X,Z]=r.useState(""),[b,O]=r.useState(null),{compile:h}=re(),{formatCSS:$,formatJSX:M}=le();let S,y;e[0]!==l?(S=()=>{localStorage.setItem("playground:jsx",l)},y=[l],e[0]=l,e[1]=S,e[2]=y):(S=e[1],y=e[2]),r.useEffect(S,y);let C,j;e[3]!==o?(C=()=>{localStorage.setItem("playground:css",o)},j=[o],e[3]=o,e[4]=C,e[5]=j):(C=e[4],j=e[5]),r.useEffect(C,j);let v,_;e[6]!==s?(v=()=>{localStorage.setItem("playground:tab",s)},_=[s],e[6]=s,e[7]=v,e[8]=_):(v=e[7],_=e[8]),r.useEffect(v,_);let w;e[9]!==s||e[10]!==o||e[11]!==$||e[12]!==M||e[13]!==l?(w=async()=>{if(s==="jsx"){const{code:a}=await M(l);a&&U(a)}else{const{code:a}=await $(o);a&&B(a)}},e[9]=s,e[10]=o,e[11]=$,e[12]=M,e[13]=l,e[14]=w):w=e[14];const n=w;let E;e[15]===Symbol.for("react.memo_cache_sentinel")?(E=a=>{U(a)},e[15]=E):E=e[15];const ee=E;let N;e[16]===Symbol.for("react.memo_cache_sentinel")?(N=a=>{B(a)},e[16]=N):N=e[16];const te=N;let k,F;e[17]===Symbol.for("react.memo_cache_sentinel")?(F=()=>{fetch("/app.css").then(me).then(W).catch(de)},k=[],e[17]=k,e[18]=F):(k=e[17],F=e[18]),r.useEffect(F,k);const P=r.useDeferredValue(l);let R,T;e[19]!==h||e[20]!==P?(R=()=>{h(P).then(a=>{a.error?O(a.error):(O(null),Z(a.code||""))})},T=[P,h],e[19]=h,e[20]=P,e[21]=R,e[22]=T):(R=e[21],T=e[22]),r.useEffect(R,T);let z;e[23]===Symbol.for("react.memo_cache_sentinel")?(z=t.jsx(ae,{size:11}),e[23]=z):z=e[23];let i;e[24]!==n?(i=t.jsxs("button",{onClick:n,className:"px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1",children:[z," format"]}),e[24]=n,e[25]=i):i=e[25];let A;e[26]===Symbol.for("react.memo_cache_sentinel")?(A=()=>{U(K),B(Q)},e[26]=A):A=e[26];let J;e[27]===Symbol.for("react.memo_cache_sentinel")?(J=t.jsxs("button",{onClick:A,className:"px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1",children:[t.jsx(oe,{size:11})," reset"]}),e[27]=J):J=e[27];let c;e[28]!==i?(c=t.jsxs("div",{className:"flex items-center gap-1.5",children:[i,J]}),e[28]=i,e[29]=c):c=e[29];let I;e[30]===Symbol.for("react.memo_cache_sentinel")?(I=[{key:"jsx",label:"component.jsx"},{key:"css",label:"styles.css"}],e[30]=I):I=e[30];let D;e[31]===Symbol.for("react.memo_cache_sentinel")?(D=a=>Y(a),e[31]=D):D=e[31];let d;e[32]!==s?(d=t.jsx(ne,{tabs:I,active:s,onSelect:D}),e[32]=s,e[33]=d):d=e[33];let m;e[34]!==s||e[35]!==n||e[36]!==l?(m=s==="jsx"&&t.jsx(G,{value:l,onChange:ee,onFormat:n,lang:"jsx",autoFocus:!0}),e[34]=s,e[35]=n,e[36]=l,e[37]=m):m=e[37];let p;e[38]!==s||e[39]!==o||e[40]!==n?(p=s==="css"&&t.jsx(G,{value:o,onChange:te,onFormat:n,lang:"css"}),e[38]=s,e[39]=o,e[40]=n,e[41]=p):p=e[41];let f;e[42]!==c||e[43]!==d||e[44]!==m||e[45]!==p?(f=t.jsx(q,{name:"Playground Editor",children:t.jsxs(H,{title:"Playground Scratchpad",actions:c,className:"h-full flex flex-col",children:[d,m,p]})}),e[42]=c,e[43]=d,e[44]=m,e[45]=p,e[46]=f):f=e[46];let u;e[47]!==V||e[48]!==X||e[49]!==o?(u=t.jsx(ie,{children:t.jsx(ce,{baseCSS:V,userCSS:o,jsCode:X})}),e[47]=V,e[48]=X,e[49]=o,e[50]=u):u=e[50];let x;e[51]!==b?(x=b&&t.jsxs("div",{className:"px-3 py-1.5 bg-red-100 border-t border-red-200 text-red-800 text-xs font-mono shrink-0",children:["Compilation Error: ",b]}),e[51]=b,e[52]=x):x=e[52];let g;e[53]!==u||e[54]!==x?(g=t.jsx(q,{name:"Playground Execution",children:t.jsxs(H,{title:"Live React 19 Execution",className:"h-full flex flex-col relative",children:[u,x]})}),e[53]=u,e[54]=x,e[55]=g):g=e[55];let L;return e[56]!==f||e[57]!==g?(L=t.jsx("div",{className:"flex flex-col flex-1 min-h-0 bg-slate-100 p-2",children:t.jsxs("main",{className:"grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0",children:[f,g]})}),e[56]=f,e[57]=g,e[58]=L):L=e[58],L}function de(){}function me(e){return e.text()}function pe(){return localStorage.getItem("playground:tab")||"jsx"}function fe(){return localStorage.getItem("playground:css")||Q}function ue(){return localStorage.getItem("playground:jsx")||K}export{Se as default};
