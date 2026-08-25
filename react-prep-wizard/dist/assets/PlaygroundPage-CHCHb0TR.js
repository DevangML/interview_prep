import{j as t}from"./vendor-editor-RbNIXI1J.js";import{a as le,S as oe,R as re,b as O}from"./index-CVxqN4CG.js";import{r as o}from"./vendor-react-vS88J7zI.js";import{u as ne,a as ie,F as ce,C as q,b as K,d as Q,c as de,R as me,S as fe,P as pe}from"./useFormatter-BtUQmoTz.js";const W=`import React, { useState } from 'react';

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
}`,Y=`.pricing-card {
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
.price-display .period { font-size: 0.85rem; color: #64748b; }`;function ve(){const e=le.c(60),[r,$]=o.useState(be),[l,B]=o.useState(he),[V,Z]=o.useState(""),[s,ee]=o.useState(ge),[X,te]=o.useState(""),[h,M]=o.useState(null),{compile:b}=ne(),{formatCSS:G,formatJSX:H}=ie();let S,y;e[0]!==r?(S=()=>{localStorage.setItem("playground:jsx",r)},y=[r],e[0]=r,e[1]=S,e[2]=y):(S=e[1],y=e[2]),o.useEffect(S,y);let j,C;e[3]!==l?(j=()=>{localStorage.setItem("playground:css",l)},C=[l],e[3]=l,e[4]=j,e[5]=C):(j=e[4],C=e[5]),o.useEffect(j,C);let v,_;e[6]!==s?(v=()=>{localStorage.setItem("playground:tab",s)},_=[s],e[6]=s,e[7]=v,e[8]=_):(v=e[7],_=e[8]),o.useEffect(v,_);let w;e[9]!==s||e[10]!==l||e[11]!==G||e[12]!==H||e[13]!==r?(w=async()=>{if(s==="jsx"){const{code:a}=await H(r);a&&$(a)}else{const{code:a}=await G(l);a&&B(a)}},e[9]=s,e[10]=l,e[11]=G,e[12]=H,e[13]=r,e[14]=w):w=e[14];const n=w;let N;e[15]===Symbol.for("react.memo_cache_sentinel")?(N=a=>{$(a)},e[15]=N):N=e[15];const se=N;let k;e[16]===Symbol.for("react.memo_cache_sentinel")?(k=a=>{B(a)},e[16]=k):k=e[16];const ae=k;let E,z;e[17]===Symbol.for("react.memo_cache_sentinel")?(z=()=>{fetch("/app.css").then(xe).then(Z).catch(ue)},E=[],e[17]=E,e[18]=z):(E=e[17],z=e[18]),o.useEffect(z,E);const P=o.useDeferredValue(r);let F,R;e[19]!==b||e[20]!==P?(F=()=>{b(P).then(a=>{a.error?M(a.error):(M(null),te(a.code||""))})},R=[P,b],e[19]=b,e[20]=P,e[21]=F,e[22]=R):(F=e[21],R=e[22]),o.useEffect(F,R);let T;e[23]===Symbol.for("react.memo_cache_sentinel")?(T=t.jsx(oe,{size:11}),e[23]=T):T=e[23];let i;e[24]!==n?(i=t.jsxs("button",{onClick:n,className:"px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1",children:[T," format"]}),e[24]=n,e[25]=i):i=e[25];let A;e[26]===Symbol.for("react.memo_cache_sentinel")?(A=()=>{$(W),B(Y)},e[26]=A):A=e[26];let J;e[27]===Symbol.for("react.memo_cache_sentinel")?(J=t.jsxs("button",{onClick:A,className:"px-2 py-0.5 text-xs bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1",children:[t.jsx(re,{size:11})," reset"]}),e[27]=J):J=e[27];let c;e[28]!==i?(c=t.jsxs("div",{className:"flex items-center gap-1.5",children:[i,J]}),e[28]=i,e[29]=c):c=e[29];let I;e[30]===Symbol.for("react.memo_cache_sentinel")?(I=[{key:"jsx",label:"component.jsx"},{key:"css",label:"styles.css"}],e[30]=I):I=e[30];let D;e[31]===Symbol.for("react.memo_cache_sentinel")?(D=a=>ee(a),e[31]=D):D=e[31];let d;e[32]!==s?(d=t.jsx(ce,{tabs:I,active:s,onSelect:D}),e[32]=s,e[33]=d):d=e[33];let m;e[34]!==s||e[35]!==n||e[36]!==r?(m=s==="jsx"&&t.jsx(q,{value:r,onChange:se,onFormat:n,lang:"jsx",autoFocus:!0}),e[34]=s,e[35]=n,e[36]=r,e[37]=m):m=e[37];let f;e[38]!==s||e[39]!==l||e[40]!==n?(f=s==="css"&&t.jsx(q,{value:l,onChange:ae,onFormat:n,lang:"css"}),e[38]=s,e[39]=l,e[40]=n,e[41]=f):f=e[41];let p;e[42]!==c||e[43]!==d||e[44]!==m||e[45]!==f?(p=t.jsx(K,{defaultSize:50,minSize:20,children:t.jsx(O,{name:"Playground Editor",children:t.jsxs(Q,{title:"Playground Scratchpad",actions:c,className:"h-full flex flex-col",children:[d,m,f]})})}),e[42]=c,e[43]=d,e[44]=m,e[45]=f,e[46]=p):p=e[46];let L;e[47]===Symbol.for("react.memo_cache_sentinel")?(L=t.jsx(de,{className:"w-1.5 flex-shrink-0 bg-transparent hover:bg-sky-400 transition-colors rounded-full cursor-col-resize z-10"}),e[47]=L):L=e[47];let u;e[48]!==V||e[49]!==X||e[50]!==l?(u=t.jsx(me,{children:t.jsx(fe,{baseCSS:V,userCSS:l,jsCode:X})}),e[48]=V,e[49]=X,e[50]=l,e[51]=u):u=e[51];let x;e[52]!==h?(x=h&&t.jsxs("div",{className:"px-3 py-1.5 bg-red-100 border-t border-red-200 text-red-800 text-xs font-mono shrink-0",children:["Compilation Error: ",h]}),e[52]=h,e[53]=x):x=e[53];let g;e[54]!==u||e[55]!==x?(g=t.jsx(K,{defaultSize:50,minSize:20,children:t.jsx(O,{name:"Playground Execution",children:t.jsxs(Q,{title:"Live React 19 Execution",className:"h-full flex flex-col relative",children:[u,x]})})}),e[54]=u,e[55]=x,e[56]=g):g=e[56];let U;return e[57]!==p||e[58]!==g?(U=t.jsx("div",{className:"flex flex-col flex-1 min-h-0 bg-slate-100 p-2",children:t.jsx("main",{className:"flex-1 min-h-0",children:t.jsxs(pe,{direction:"horizontal",className:"h-full w-full",children:[p,L,g]})})}),e[57]=p,e[58]=g,e[59]=U):U=e[59],U}function ue(){}function xe(e){return e.text()}function ge(){return localStorage.getItem("playground:tab")||"jsx"}function he(){return localStorage.getItem("playground:css")||Y}function be(){return localStorage.getItem("playground:jsx")||W}export{ve as default};
