const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MasteryPage-V7zUi-7Q.js","assets/vendor-editor-C5qz9w4O.js","assets/vendor-react-KgNWHp-S.js","assets/SandboxFrame-DaLtF_YF.js","assets/useLibrary-BmDqoy9Q.js","assets/circle-x-CSHbMQYp.js","assets/PlaygroundPage-BdkBmQhg.js","assets/RapidFirePage-BuK_dIHg.js","assets/LearnPage-BtuumVwu.js"])))=>i.map(i=>d[i]);
var Lg=Object.defineProperty;var ym=r=>{throw TypeError(r)};var Gg=(r,o,d)=>o in r?Lg(r,o,{enumerable:!0,configurable:!0,writable:!0,value:d}):r[o]=d;var xm=(r,o,d)=>Gg(r,typeof o!="symbol"?o+"":o,d),nc=(r,o,d)=>o.has(r)||ym("Cannot "+d);var w=(r,o,d)=>(nc(r,o,"read from private field"),d?d.call(r):o.get(r)),se=(r,o,d)=>o.has(r)?ym("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(r):o.set(r,d),K=(r,o,d,c)=>(nc(r,o,"write to private field"),c?c.call(r,d):o.set(r,d),d),Je=(r,o,d)=>(nc(r,o,"access private method"),d);var Rr=(r,o,d,c)=>({set _(v){K(r,o,v,d)},get _(){return w(r,o,c)}});import{j as A}from"./vendor-editor-C5qz9w4O.js";import{a as af,b as Qg,r as ge,R as Er,u as Yg,N as wm,c as Xg,d as da,O as Vg,B as Kg,e as Zg,f as gt}from"./vendor-react-KgNWHp-S.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const v of document.querySelectorAll('link[rel="modulepreload"]'))c(v);new MutationObserver(v=>{for(const O of v)if(O.type==="childList")for(const R of O.addedNodes)R.tagName==="LINK"&&R.rel==="modulepreload"&&c(R)}).observe(document,{childList:!0,subtree:!0});function d(v){const O={};return v.integrity&&(O.integrity=v.integrity),v.referrerPolicy&&(O.referrerPolicy=v.referrerPolicy),v.crossOrigin==="use-credentials"?O.credentials="include":v.crossOrigin==="anonymous"?O.credentials="omit":O.credentials="same-origin",O}function c(v){if(v.ep)return;v.ep=!0;const O=d(v);fetch(v.href,O)}})();const Jg="modulepreload",Ig=function(r){return"/"+r},km={},qr=function(o,d,c){let v=Promise.resolve();if(d&&d.length>0){let R=function(D){return Promise.all(D.map(U=>Promise.resolve(U).then(C=>({status:"fulfilled",value:C}),C=>({status:"rejected",reason:C}))))};document.getElementsByTagName("link");const N=document.querySelector("meta[property=csp-nonce]"),j=(N==null?void 0:N.nonce)||(N==null?void 0:N.getAttribute("nonce"));v=R(d.map(D=>{if(D=Ig(D),D in km)return;km[D]=!0;const U=D.endsWith(".css"),C=U?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${D}"]${C}`))return;const E=document.createElement("link");if(E.rel=U?"stylesheet":Jg,U||(E.as="script"),E.crossOrigin="",E.href=D,j&&E.setAttribute("nonce",j),document.head.appendChild(E),U)return new Promise((Y,Q)=>{E.addEventListener("load",Y),E.addEventListener("error",()=>Q(new Error(`Unable to preload CSS for ${D}`)))})}))}function O(R){const N=new Event("vite:preloadError",{cancelable:!0});if(N.payload=R,window.dispatchEvent(N),!N.defaultPrevented)throw R}return v.then(R=>{for(const N of R||[])N.status==="rejected"&&O(N.reason);return o().catch(O)})};var ic={exports:{}},sc={};/**
 * @license React
 * react-compiler-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sm;function Fg(){if(Sm)return sc;Sm=1;var r=af().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;return sc.c=function(o){return r.H.useMemoCache(o)},sc}var Tm;function Wg(){return Tm||(Tm=1,ic.exports=Fg()),ic.exports}var cs=Wg(),rc={exports:{}},is={},oc={exports:{}},lc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Om;function $g(){return Om||(Om=1,(function(r){function o(S,z){var I=S.length;S.push(z);e:for(;0<I;){var we=I-1>>>1,ke=S[we];if(0<v(ke,z))S[we]=z,S[I]=ke,I=we;else break e}}function d(S){return S.length===0?null:S[0]}function c(S){if(S.length===0)return null;var z=S[0],I=S.pop();if(I!==z){S[0]=I;e:for(var we=0,ke=S.length,Fe=ke>>>1;we<Fe;){var Ae=2*(we+1)-1,he=S[Ae],Be=Ae+1,qt=S[Be];if(0>v(he,I))Be<ke&&0>v(qt,he)?(S[we]=qt,S[Be]=I,we=Be):(S[we]=he,S[Ae]=I,we=Ae);else if(Be<ke&&0>v(qt,I))S[we]=qt,S[Be]=I,we=Be;else break e}}return z}function v(S,z){var I=S.sortIndex-z.sortIndex;return I!==0?I:S.id-z.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var O=performance;r.unstable_now=function(){return O.now()}}else{var R=Date,N=R.now();r.unstable_now=function(){return R.now()-N}}var j=[],D=[],U=1,C=null,E=3,Y=!1,Q=!1,J=!1,Z=!1,F=typeof setTimeout=="function"?setTimeout:null,V=typeof clearTimeout=="function"?clearTimeout:null,H=typeof setImmediate<"u"?setImmediate:null;function L(S){for(var z=d(D);z!==null;){if(z.callback===null)c(D);else if(z.startTime<=S)c(D),z.sortIndex=z.expirationTime,o(j,z);else break;z=d(D)}}function M(S){if(J=!1,L(S),!Q)if(d(j)!==null)Q=!0,de||(de=!0,oe());else{var z=d(D);z!==null&&Xt(M,z.startTime-S)}}var de=!1,G=-1,P=5,ae=-1;function me(){return Z?!0:!(r.unstable_now()-ae<P)}function Qe(){if(Z=!1,de){var S=r.unstable_now();ae=S;var z=!0;try{e:{Q=!1,J&&(J=!1,V(G),G=-1),Y=!0;var I=E;try{t:{for(L(S),C=d(j);C!==null&&!(C.expirationTime>S&&me());){var we=C.callback;if(typeof we=="function"){C.callback=null,E=C.priorityLevel;var ke=we(C.expirationTime<=S);if(S=r.unstable_now(),typeof ke=="function"){C.callback=ke,L(S),z=!0;break t}C===d(j)&&c(j),L(S)}else c(j);C=d(j)}if(C!==null)z=!0;else{var Fe=d(D);Fe!==null&&Xt(M,Fe.startTime-S),z=!1}}break e}finally{C=null,E=I,Y=!1}z=void 0}}finally{z?oe():de=!1}}}var oe;if(typeof H=="function")oe=function(){H(Qe)};else if(typeof MessageChannel<"u"){var Re=new MessageChannel,vt=Re.port2;Re.port1.onmessage=Qe,oe=function(){vt.postMessage(null)}}else oe=function(){F(Qe,0)};function Xt(S,z){G=F(function(){S(r.unstable_now())},z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(S){S.callback=null},r.unstable_forceFrameRate=function(S){0>S||125<S?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<S?Math.floor(1e3/S):5},r.unstable_getCurrentPriorityLevel=function(){return E},r.unstable_next=function(S){switch(E){case 1:case 2:case 3:var z=3;break;default:z=E}var I=E;E=z;try{return S()}finally{E=I}},r.unstable_requestPaint=function(){Z=!0},r.unstable_runWithPriority=function(S,z){switch(S){case 1:case 2:case 3:case 4:case 5:break;default:S=3}var I=E;E=S;try{return z()}finally{E=I}},r.unstable_scheduleCallback=function(S,z,I){var we=r.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?we+I:we):I=we,S){case 1:var ke=-1;break;case 2:ke=250;break;case 5:ke=1073741823;break;case 4:ke=1e4;break;default:ke=5e3}return ke=I+ke,S={id:U++,callback:z,priorityLevel:S,startTime:I,expirationTime:ke,sortIndex:-1},I>we?(S.sortIndex=I,o(D,S),d(j)===null&&S===d(D)&&(J?(V(G),G=-1):J=!0,Xt(M,I-we))):(S.sortIndex=ke,o(j,S),Q||Y||(Q=!0,de||(de=!0,oe()))),S},r.unstable_shouldYield=me,r.unstable_wrapCallback=function(S){var z=E;return function(){var I=E;E=z;try{return S.apply(this,arguments)}finally{E=I}}}})(lc)),lc}var Am;function Pg(){return Am||(Am=1,oc.exports=$g()),oc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nm;function eb(){if(Nm)return is;Nm=1;var r=Pg(),o=af(),d=Qg();function c(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function v(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function O(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function R(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function N(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function j(e){if(O(e)!==e)throw Error(c(188))}function D(e){var t=e.alternate;if(!t){if(t=O(e),t===null)throw Error(c(188));return t!==e?null:e}for(var a=e,n=t;;){var i=a.return;if(i===null)break;var s=i.alternate;if(s===null){if(n=i.return,n!==null){a=n;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===a)return j(i),e;if(s===n)return j(i),t;s=s.sibling}throw Error(c(188))}if(a.return!==n.return)a=i,n=s;else{for(var l=!1,u=i.child;u;){if(u===a){l=!0,a=i,n=s;break}if(u===n){l=!0,n=i,a=s;break}u=u.sibling}if(!l){for(u=s.child;u;){if(u===a){l=!0,a=s,n=i;break}if(u===n){l=!0,n=s,a=i;break}u=u.sibling}if(!l)throw Error(c(189))}}if(a.alternate!==n)throw Error(c(190))}if(a.tag!==3)throw Error(c(188));return a.stateNode.current===a?e:t}function U(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=U(e),t!==null)return t;e=e.sibling}return null}var C=Object.assign,E=Symbol.for("react.element"),Y=Symbol.for("react.transitional.element"),Q=Symbol.for("react.portal"),J=Symbol.for("react.fragment"),Z=Symbol.for("react.strict_mode"),F=Symbol.for("react.profiler"),V=Symbol.for("react.consumer"),H=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),M=Symbol.for("react.suspense"),de=Symbol.for("react.suspense_list"),G=Symbol.for("react.memo"),P=Symbol.for("react.lazy"),ae=Symbol.for("react.activity"),me=Symbol.for("react.memo_cache_sentinel"),Qe=Symbol.iterator;function oe(e){return e===null||typeof e!="object"?null:(e=Qe&&e[Qe]||e["@@iterator"],typeof e=="function"?e:null)}var Re=Symbol.for("react.client.reference");function vt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Re?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case J:return"Fragment";case F:return"Profiler";case Z:return"StrictMode";case M:return"Suspense";case de:return"SuspenseList";case ae:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Q:return"Portal";case H:return e.displayName||"Context";case V:return(e._context.displayName||"Context")+".Consumer";case L:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case G:return t=e.displayName||null,t!==null?t:vt(e.type)||"Memo";case P:t=e._payload,e=e._init;try{return vt(e(t))}catch{}}return null}var Xt=Array.isArray,S=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,z=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I={pending:!1,data:null,method:null,action:null},we=[],ke=-1;function Fe(e){return{current:e}}function Ae(e){0>ke||(e.current=we[ke],we[ke]=null,ke--)}function he(e,t){ke++,we[ke]=e.current,e.current=t}var Be=Fe(null),qt=Fe(null),ha=Fe(null),ds=Fe(null);function us(e,t){switch(he(ha,t),he(qt,e),he(Be,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Qh(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Qh(t),e=Yh(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}Ae(Be),he(Be,e)}function bn(){Ae(Be),Ae(qt),Ae(ha)}function _r(e){e.memoizedState!==null&&he(ds,e);var t=Be.current,a=Yh(t,e.type);t!==a&&(he(qt,e),he(Be,a))}function hs(e){qt.current===e&&(Ae(Be),Ae(qt)),ds.current===e&&(Ae(ds),es._currentValue=I)}var Hr,vc;function Va(e){if(Hr===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Hr=t&&t[1]||"",vc=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Hr+e+vc}var Br=!1;function Lr(e,t){if(!e||Br)return"";Br=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var T=function(){throw Error()};if(Object.defineProperty(T.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(T,[])}catch(y){var b=y}Reflect.construct(e,[],T)}else{try{T.call()}catch(y){b=y}e.call(T.prototype)}}else{try{throw Error()}catch(y){b=y}(T=e())&&typeof T.catch=="function"&&T.catch(function(){})}}catch(y){if(y&&b&&typeof y.stack=="string")return[y.stack,b.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=n.DetermineComponentFrameRoot(),l=s[0],u=s[1];if(l&&u){var h=l.split(`
`),g=u.split(`
`);for(i=n=0;n<h.length&&!h[n].includes("DetermineComponentFrameRoot");)n++;for(;i<g.length&&!g[i].includes("DetermineComponentFrameRoot");)i++;if(n===h.length||i===g.length)for(n=h.length-1,i=g.length-1;1<=n&&0<=i&&h[n]!==g[i];)i--;for(;1<=n&&0<=i;n--,i--)if(h[n]!==g[i]){if(n!==1||i!==1)do if(n--,i--,0>i||h[n]!==g[i]){var x=`
`+h[n].replace(" at new "," at ");return e.displayName&&x.includes("<anonymous>")&&(x=x.replace("<anonymous>",e.displayName)),x}while(1<=n&&0<=i);break}}}finally{Br=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Va(a):""}function bf(e,t){switch(e.tag){case 26:case 27:case 5:return Va(e.type);case 16:return Va("Lazy");case 13:return e.child!==t&&t!==null?Va("Suspense Fallback"):Va("Suspense");case 19:return Va("SuspenseList");case 0:case 15:return Lr(e.type,!1);case 11:return Lr(e.type.render,!1);case 1:return Lr(e.type,!0);case 31:return Va("Activity");default:return""}}function yc(e){try{var t="",a=null;do t+=bf(e,a),a=e,e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}var Gr=Object.prototype.hasOwnProperty,Qr=r.unstable_scheduleCallback,Yr=r.unstable_cancelCallback,vf=r.unstable_shouldYield,yf=r.unstable_requestPaint,rt=r.unstable_now,xf=r.unstable_getCurrentPriorityLevel,xc=r.unstable_ImmediatePriority,wc=r.unstable_UserBlockingPriority,ms=r.unstable_NormalPriority,wf=r.unstable_LowPriority,kc=r.unstable_IdlePriority,kf=r.log,Sf=r.unstable_setDisableYieldValue,hi=null,ot=null;function ma(e){if(typeof kf=="function"&&Sf(e),ot&&typeof ot.setStrictMode=="function")try{ot.setStrictMode(hi,e)}catch{}}var lt=Math.clz32?Math.clz32:Af,Tf=Math.log,Of=Math.LN2;function Af(e){return e>>>=0,e===0?32:31-(Tf(e)/Of|0)|0}var fs=256,ps=262144,gs=4194304;function Ka(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function bs(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var i=0,s=e.suspendedLanes,l=e.pingedLanes;e=e.warmLanes;var u=n&134217727;return u!==0?(n=u&~s,n!==0?i=Ka(n):(l&=u,l!==0?i=Ka(l):a||(a=u&~e,a!==0&&(i=Ka(a))))):(u=n&~s,u!==0?i=Ka(u):l!==0?i=Ka(l):a||(a=n&~e,a!==0&&(i=Ka(a)))),i===0?0:t!==0&&t!==i&&(t&s)===0&&(s=i&-i,a=t&-t,s>=a||s===32&&(a&4194048)!==0)?t:i}function mi(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Nf(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Sc(){var e=gs;return gs<<=1,(gs&62914560)===0&&(gs=4194304),e}function Xr(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function fi(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Cf(e,t,a,n,i,s){var l=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var u=e.entanglements,h=e.expirationTimes,g=e.hiddenUpdates;for(a=l&~a;0<a;){var x=31-lt(a),T=1<<x;u[x]=0,h[x]=-1;var b=g[x];if(b!==null)for(g[x]=null,x=0;x<b.length;x++){var y=b[x];y!==null&&(y.lane&=-536870913)}a&=~T}n!==0&&Tc(e,n,0),s!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=s&~(l&~t))}function Tc(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-lt(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&261930}function Oc(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-lt(a),i=1<<n;i&t|e[n]&t&&(e[n]|=t),a&=~i}}function Ac(e,t){var a=t&-t;return a=(a&42)!==0?1:Vr(a),(a&(e.suspendedLanes|t))!==0?0:a}function Vr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Kr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Nc(){var e=z.p;return e!==0?e:(e=window.event,e===void 0?32:hm(e.type))}function Cc(e,t){var a=z.p;try{return z.p=e,t()}finally{z.p=a}}var fa=Math.random().toString(36).slice(2),Ye="__reactFiber$"+fa,Pe="__reactProps$"+fa,vn="__reactContainer$"+fa,Zr="__reactEvents$"+fa,Df="__reactListeners$"+fa,Rf="__reactHandles$"+fa,Dc="__reactResources$"+fa,pi="__reactMarker$"+fa;function Jr(e){delete e[Ye],delete e[Pe],delete e[Zr],delete e[Df],delete e[Rf]}function yn(e){var t=e[Ye];if(t)return t;for(var a=e.parentNode;a;){if(t=a[vn]||a[Ye]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Fh(e);e!==null;){if(a=e[Ye])return a;e=Fh(e)}return t}e=a,a=e.parentNode}return null}function xn(e){if(e=e[Ye]||e[vn]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function gi(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(c(33))}function wn(e){var t=e[Dc];return t||(t=e[Dc]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Le(e){e[pi]=!0}var Rc=new Set,Ec={};function Za(e,t){kn(e,t),kn(e+"Capture",t)}function kn(e,t){for(Ec[e]=t,e=0;e<t.length;e++)Rc.add(t[e])}var Ef=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),jc={},zc={};function jf(e){return Gr.call(zc,e)?!0:Gr.call(jc,e)?!1:Ef.test(e)?zc[e]=!0:(jc[e]=!0,!1)}function vs(e,t,a){if(jf(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function ys(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Vt(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+n)}}function yt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Mc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function zf(e,t,a){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(l){a=""+l,s.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(l){a=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ir(e){if(!e._valueTracker){var t=Mc(e)?"checked":"value";e._valueTracker=zf(e,t,""+e[t])}}function qc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=Mc(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}function xs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Mf=/[\n"\\]/g;function xt(e){return e.replace(Mf,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Fr(e,t,a,n,i,s,l,u){e.name="",l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?e.type=l:e.removeAttribute("type"),t!=null?l==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+yt(t)):e.value!==""+yt(t)&&(e.value=""+yt(t)):l!=="submit"&&l!=="reset"||e.removeAttribute("value"),t!=null?Wr(e,l,yt(t)):a!=null?Wr(e,l,yt(a)):n!=null&&e.removeAttribute("value"),i==null&&s!=null&&(e.defaultChecked=!!s),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.name=""+yt(u):e.removeAttribute("name")}function Uc(e,t,a,n,i,s,l,u){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||a!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){Ir(e);return}a=a!=null?""+yt(a):"",t=t!=null?""+yt(t):a,u||t===e.value||(e.value=t),e.defaultValue=t}n=n??i,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=u?e.checked:!!n,e.defaultChecked=!!n,l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(e.name=l),Ir(e)}function Wr(e,t,a){t==="number"&&xs(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Sn(e,t,a,n){if(e=e.options,t){t={};for(var i=0;i<a.length;i++)t["$"+a[i]]=!0;for(a=0;a<e.length;a++)i=t.hasOwnProperty("$"+e[a].value),e[a].selected!==i&&(e[a].selected=i),i&&n&&(e[a].defaultSelected=!0)}else{for(a=""+yt(a),t=null,i=0;i<e.length;i++){if(e[i].value===a){e[i].selected=!0,n&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function _c(e,t,a){if(t!=null&&(t=""+yt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+yt(a):""}function Hc(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(c(92));if(Xt(n)){if(1<n.length)throw Error(c(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=yt(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n),Ir(e)}function Tn(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var qf=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Bc(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||qf.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Lc(e,t,a){if(t!=null&&typeof t!="object")throw Error(c(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var i in t)n=t[i],t.hasOwnProperty(i)&&a[i]!==n&&Bc(e,i,n)}else for(var s in t)t.hasOwnProperty(s)&&Bc(e,s,t[s])}function $r(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Uf=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),_f=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ws(e){return _f.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Kt(){}var Pr=null;function eo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var On=null,An=null;function Gc(e){var t=xn(e);if(t&&(e=t.stateNode)){var a=e[Pe]||null;e:switch(e=t.stateNode,t.type){case"input":if(Fr(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+xt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var i=n[Pe]||null;if(!i)throw Error(c(90));Fr(n,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&qc(n)}break e;case"textarea":_c(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&Sn(e,!!a.multiple,t,!1)}}}var to=!1;function Qc(e,t,a){if(to)return e(t,a);to=!0;try{var n=e(t);return n}finally{if(to=!1,(On!==null||An!==null)&&(lr(),On&&(t=On,e=An,An=On=null,Gc(t),e)))for(t=0;t<e.length;t++)Gc(e[t])}}function bi(e,t){var a=e.stateNode;if(a===null)return null;var n=a[Pe]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(c(231,t,typeof a));return a}var Zt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ao=!1;if(Zt)try{var vi={};Object.defineProperty(vi,"passive",{get:function(){ao=!0}}),window.addEventListener("test",vi,vi),window.removeEventListener("test",vi,vi)}catch{ao=!1}var pa=null,no=null,ks=null;function Yc(){if(ks)return ks;var e,t=no,a=t.length,n,i="value"in pa?pa.value:pa.textContent,s=i.length;for(e=0;e<a&&t[e]===i[e];e++);var l=a-e;for(n=1;n<=l&&t[a-n]===i[s-n];n++);return ks=i.slice(e,1<n?1-n:void 0)}function Ss(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ts(){return!0}function Xc(){return!1}function et(e){function t(a,n,i,s,l){this._reactName=a,this._targetInst=i,this.type=n,this.nativeEvent=s,this.target=l,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(a=e[u],this[u]=a?a(s):s[u]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ts:Xc,this.isPropagationStopped=Xc,this}return C(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ts)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ts)},persist:function(){},isPersistent:Ts}),t}var Ja={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Os=et(Ja),yi=C({},Ja,{view:0,detail:0}),Hf=et(yi),io,so,xi,As=C({},yi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:oo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xi&&(xi&&e.type==="mousemove"?(io=e.screenX-xi.screenX,so=e.screenY-xi.screenY):so=io=0,xi=e),io)},movementY:function(e){return"movementY"in e?e.movementY:so}}),Vc=et(As),Bf=C({},As,{dataTransfer:0}),Lf=et(Bf),Gf=C({},yi,{relatedTarget:0}),ro=et(Gf),Qf=C({},Ja,{animationName:0,elapsedTime:0,pseudoElement:0}),Yf=et(Qf),Xf=C({},Ja,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Vf=et(Xf),Kf=C({},Ja,{data:0}),Kc=et(Kf),Zf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Jf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},If={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ff(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=If[e])?!!t[e]:!1}function oo(){return Ff}var Wf=C({},yi,{key:function(e){if(e.key){var t=Zf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ss(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Jf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:oo,charCode:function(e){return e.type==="keypress"?Ss(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ss(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),$f=et(Wf),Pf=C({},As,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zc=et(Pf),ep=C({},yi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:oo}),tp=et(ep),ap=C({},Ja,{propertyName:0,elapsedTime:0,pseudoElement:0}),np=et(ap),ip=C({},As,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),sp=et(ip),rp=C({},Ja,{newState:0,oldState:0}),op=et(rp),lp=[9,13,27,32],lo=Zt&&"CompositionEvent"in window,wi=null;Zt&&"documentMode"in document&&(wi=document.documentMode);var cp=Zt&&"TextEvent"in window&&!wi,Jc=Zt&&(!lo||wi&&8<wi&&11>=wi),Ic=" ",Fc=!1;function Wc(e,t){switch(e){case"keyup":return lp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $c(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Nn=!1;function dp(e,t){switch(e){case"compositionend":return $c(t);case"keypress":return t.which!==32?null:(Fc=!0,Ic);case"textInput":return e=t.data,e===Ic&&Fc?null:e;default:return null}}function up(e,t){if(Nn)return e==="compositionend"||!lo&&Wc(e,t)?(e=Yc(),ks=no=pa=null,Nn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Jc&&t.locale!=="ko"?null:t.data;default:return null}}var hp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Pc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!hp[e.type]:t==="textarea"}function ed(e,t,a,n){On?An?An.push(n):An=[n]:On=n,t=pr(t,"onChange"),0<t.length&&(a=new Os("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var ki=null,Si=null;function mp(e){Uh(e,0)}function Ns(e){var t=gi(e);if(qc(t))return e}function td(e,t){if(e==="change")return t}var ad=!1;if(Zt){var co;if(Zt){var uo="oninput"in document;if(!uo){var nd=document.createElement("div");nd.setAttribute("oninput","return;"),uo=typeof nd.oninput=="function"}co=uo}else co=!1;ad=co&&(!document.documentMode||9<document.documentMode)}function id(){ki&&(ki.detachEvent("onpropertychange",sd),Si=ki=null)}function sd(e){if(e.propertyName==="value"&&Ns(Si)){var t=[];ed(t,Si,e,eo(e)),Qc(mp,t)}}function fp(e,t,a){e==="focusin"?(id(),ki=t,Si=a,ki.attachEvent("onpropertychange",sd)):e==="focusout"&&id()}function pp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ns(Si)}function gp(e,t){if(e==="click")return Ns(t)}function bp(e,t){if(e==="input"||e==="change")return Ns(t)}function vp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ct=typeof Object.is=="function"?Object.is:vp;function Ti(e,t){if(ct(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var i=a[n];if(!Gr.call(t,i)||!ct(e[i],t[i]))return!1}return!0}function rd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function od(e,t){var a=rd(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=rd(a)}}function ld(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ld(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function cd(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=xs(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=xs(e.document)}return t}function ho(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var yp=Zt&&"documentMode"in document&&11>=document.documentMode,Cn=null,mo=null,Oi=null,fo=!1;function dd(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;fo||Cn==null||Cn!==xs(n)||(n=Cn,"selectionStart"in n&&ho(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Oi&&Ti(Oi,n)||(Oi=n,n=pr(mo,"onSelect"),0<n.length&&(t=new Os("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=Cn)))}function Ia(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var Dn={animationend:Ia("Animation","AnimationEnd"),animationiteration:Ia("Animation","AnimationIteration"),animationstart:Ia("Animation","AnimationStart"),transitionrun:Ia("Transition","TransitionRun"),transitionstart:Ia("Transition","TransitionStart"),transitioncancel:Ia("Transition","TransitionCancel"),transitionend:Ia("Transition","TransitionEnd")},po={},ud={};Zt&&(ud=document.createElement("div").style,"AnimationEvent"in window||(delete Dn.animationend.animation,delete Dn.animationiteration.animation,delete Dn.animationstart.animation),"TransitionEvent"in window||delete Dn.transitionend.transition);function Fa(e){if(po[e])return po[e];if(!Dn[e])return e;var t=Dn[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in ud)return po[e]=t[a];return e}var hd=Fa("animationend"),md=Fa("animationiteration"),fd=Fa("animationstart"),xp=Fa("transitionrun"),wp=Fa("transitionstart"),kp=Fa("transitioncancel"),pd=Fa("transitionend"),gd=new Map,go="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");go.push("scrollEnd");function Et(e,t){gd.set(e,t),Za(t,[e])}var Cs=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},wt=[],Rn=0,bo=0;function Ds(){for(var e=Rn,t=bo=Rn=0;t<e;){var a=wt[t];wt[t++]=null;var n=wt[t];wt[t++]=null;var i=wt[t];wt[t++]=null;var s=wt[t];if(wt[t++]=null,n!==null&&i!==null){var l=n.pending;l===null?i.next=i:(i.next=l.next,l.next=i),n.pending=i}s!==0&&bd(a,i,s)}}function Rs(e,t,a,n){wt[Rn++]=e,wt[Rn++]=t,wt[Rn++]=a,wt[Rn++]=n,bo|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function vo(e,t,a,n){return Rs(e,t,a,n),Es(e)}function Wa(e,t){return Rs(e,null,null,t),Es(e)}function bd(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var i=!1,s=e.return;s!==null;)s.childLanes|=a,n=s.alternate,n!==null&&(n.childLanes|=a),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(i=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,i&&t!==null&&(i=31-lt(a),e=s.hiddenUpdates,n=e[i],n===null?e[i]=[t]:n.push(t),t.lane=a|536870912),s):null}function Es(e){if(50<Zi)throw Zi=0,Nl=null,Error(c(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var En={};function Sp(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function dt(e,t,a,n){return new Sp(e,t,a,n)}function yo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Jt(e,t){var a=e.alternate;return a===null?(a=dt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function vd(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function js(e,t,a,n,i,s){var l=0;if(n=e,typeof e=="function")yo(e)&&(l=1);else if(typeof e=="string")l=Cg(e,a,Be.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case ae:return e=dt(31,a,t,i),e.elementType=ae,e.lanes=s,e;case J:return $a(a.children,i,s,t);case Z:l=8,i|=24;break;case F:return e=dt(12,a,t,i|2),e.elementType=F,e.lanes=s,e;case M:return e=dt(13,a,t,i),e.elementType=M,e.lanes=s,e;case de:return e=dt(19,a,t,i),e.elementType=de,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case H:l=10;break e;case V:l=9;break e;case L:l=11;break e;case G:l=14;break e;case P:l=16,n=null;break e}l=29,a=Error(c(130,e===null?"null":typeof e,"")),n=null}return t=dt(l,a,t,i),t.elementType=e,t.type=n,t.lanes=s,t}function $a(e,t,a,n){return e=dt(7,e,n,t),e.lanes=a,e}function xo(e,t,a){return e=dt(6,e,null,t),e.lanes=a,e}function yd(e){var t=dt(18,null,null,0);return t.stateNode=e,t}function wo(e,t,a){return t=dt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var xd=new WeakMap;function kt(e,t){if(typeof e=="object"&&e!==null){var a=xd.get(e);return a!==void 0?a:(t={value:e,source:t,stack:yc(t)},xd.set(e,t),t)}return{value:e,source:t,stack:yc(t)}}var jn=[],zn=0,zs=null,Ai=0,St=[],Tt=0,ga=null,Ut=1,_t="";function It(e,t){jn[zn++]=Ai,jn[zn++]=zs,zs=e,Ai=t}function wd(e,t,a){St[Tt++]=Ut,St[Tt++]=_t,St[Tt++]=ga,ga=e;var n=Ut;e=_t;var i=32-lt(n)-1;n&=~(1<<i),a+=1;var s=32-lt(t)+i;if(30<s){var l=i-i%5;s=(n&(1<<l)-1).toString(32),n>>=l,i-=l,Ut=1<<32-lt(t)+i|a<<i|n,_t=s+e}else Ut=1<<s|a<<i|n,_t=e}function ko(e){e.return!==null&&(It(e,1),wd(e,1,0))}function So(e){for(;e===zs;)zs=jn[--zn],jn[zn]=null,Ai=jn[--zn],jn[zn]=null;for(;e===ga;)ga=St[--Tt],St[Tt]=null,_t=St[--Tt],St[Tt]=null,Ut=St[--Tt],St[Tt]=null}function kd(e,t){St[Tt++]=Ut,St[Tt++]=_t,St[Tt++]=ga,Ut=t.id,_t=t.overflow,ga=e}var Xe=null,Se=null,re=!1,ba=null,Ot=!1,To=Error(c(519));function va(e){var t=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ni(kt(t,e)),To}function Sd(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[Ye]=e,t[Pe]=n,a){case"dialog":te("cancel",t),te("close",t);break;case"iframe":case"object":case"embed":te("load",t);break;case"video":case"audio":for(a=0;a<Ii.length;a++)te(Ii[a],t);break;case"source":te("error",t);break;case"img":case"image":case"link":te("error",t),te("load",t);break;case"details":te("toggle",t);break;case"input":te("invalid",t),Uc(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":te("invalid",t);break;case"textarea":te("invalid",t),Hc(t,n.value,n.defaultValue,n.children)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||Lh(t.textContent,a)?(n.popover!=null&&(te("beforetoggle",t),te("toggle",t)),n.onScroll!=null&&te("scroll",t),n.onScrollEnd!=null&&te("scrollend",t),n.onClick!=null&&(t.onclick=Kt),t=!0):t=!1,t||va(e,!0)}function Td(e){for(Xe=e.return;Xe;)switch(Xe.tag){case 5:case 31:case 13:Ot=!1;return;case 27:case 3:Ot=!0;return;default:Xe=Xe.return}}function Mn(e){if(e!==Xe)return!1;if(!re)return Td(e),re=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Ql(e.type,e.memoizedProps)),a=!a),a&&Se&&va(e),Td(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));Se=Ih(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));Se=Ih(e)}else t===27?(t=Se,ja(e.type)?(e=Zl,Zl=null,Se=e):Se=t):Se=Xe?Nt(e.stateNode.nextSibling):null;return!0}function Pa(){Se=Xe=null,re=!1}function Oo(){var e=ba;return e!==null&&(it===null?it=e:it.push.apply(it,e),ba=null),e}function Ni(e){ba===null?ba=[e]:ba.push(e)}var Ao=Fe(null),en=null,Ft=null;function ya(e,t,a){he(Ao,t._currentValue),t._currentValue=a}function Wt(e){e._currentValue=Ao.current,Ae(Ao)}function No(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function Co(e,t,a,n){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var s=i.dependencies;if(s!==null){var l=i.child;s=s.firstContext;e:for(;s!==null;){var u=s;s=i;for(var h=0;h<t.length;h++)if(u.context===t[h]){s.lanes|=a,u=s.alternate,u!==null&&(u.lanes|=a),No(s.return,a,e),n||(l=null);break e}s=u.next}}else if(i.tag===18){if(l=i.return,l===null)throw Error(c(341));l.lanes|=a,s=l.alternate,s!==null&&(s.lanes|=a),No(l,a,e),l=null}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===e){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}}function qn(e,t,a,n){e=null;for(var i=t,s=!1;i!==null;){if(!s){if((i.flags&524288)!==0)s=!0;else if((i.flags&262144)!==0)break}if(i.tag===10){var l=i.alternate;if(l===null)throw Error(c(387));if(l=l.memoizedProps,l!==null){var u=i.type;ct(i.pendingProps.value,l.value)||(e!==null?e.push(u):e=[u])}}else if(i===ds.current){if(l=i.alternate,l===null)throw Error(c(387));l.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(es):e=[es])}i=i.return}e!==null&&Co(t,e,a,n),t.flags|=262144}function Ms(e){for(e=e.firstContext;e!==null;){if(!ct(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function tn(e){en=e,Ft=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ve(e){return Od(en,e)}function qs(e,t){return en===null&&tn(e),Od(e,t)}function Od(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Ft===null){if(e===null)throw Error(c(308));Ft=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ft=Ft.next=t;return a}var Tp=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},Op=r.unstable_scheduleCallback,Ap=r.unstable_NormalPriority,ze={$$typeof:H,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Do(){return{controller:new Tp,data:new Map,refCount:0}}function Ci(e){e.refCount--,e.refCount===0&&Op(Ap,function(){e.controller.abort()})}var Di=null,Ro=0,Un=0,_n=null;function Np(e,t){if(Di===null){var a=Di=[];Ro=0,Un=zl(),_n={status:"pending",value:void 0,then:function(n){a.push(n)}}}return Ro++,t.then(Ad,Ad),t}function Ad(){if(--Ro===0&&Di!==null){_n!==null&&(_n.status="fulfilled");var e=Di;Di=null,Un=0,_n=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Cp(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(i){a.push(i)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var i=0;i<a.length;i++)(0,a[i])(t)},function(i){for(n.status="rejected",n.reason=i,i=0;i<a.length;i++)(0,a[i])(void 0)}),n}var Nd=S.S;S.S=function(e,t){dh=rt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Np(e,t),Nd!==null&&Nd(e,t)};var an=Fe(null);function Eo(){var e=an.current;return e!==null?e:xe.pooledCache}function Us(e,t){t===null?he(an,an.current):he(an,t.pool)}function Cd(){var e=Eo();return e===null?null:{parent:ze._currentValue,pool:e}}var Hn=Error(c(460)),jo=Error(c(474)),_s=Error(c(542)),Hs={then:function(){}};function Dd(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Rd(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(Kt,Kt),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,jd(e),e;default:if(typeof t.status=="string")t.then(Kt,Kt);else{if(e=xe,e!==null&&100<e.shellSuspendCounter)throw Error(c(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=n}},function(n){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,jd(e),e}throw sn=t,Hn}}function nn(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(sn=a,Hn):a}}var sn=null;function Ed(){if(sn===null)throw Error(c(459));var e=sn;return sn=null,e}function jd(e){if(e===Hn||e===_s)throw Error(c(483))}var Bn=null,Ri=0;function Bs(e){var t=Ri;return Ri+=1,Bn===null&&(Bn=[]),Rd(Bn,e,t)}function Ei(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Ls(e,t){throw t.$$typeof===E?Error(c(525)):(e=Object.prototype.toString.call(t),Error(c(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function zd(e){function t(f,m){if(e){var p=f.deletions;p===null?(f.deletions=[m],f.flags|=16):p.push(m)}}function a(f,m){if(!e)return null;for(;m!==null;)t(f,m),m=m.sibling;return null}function n(f){for(var m=new Map;f!==null;)f.key!==null?m.set(f.key,f):m.set(f.index,f),f=f.sibling;return m}function i(f,m){return f=Jt(f,m),f.index=0,f.sibling=null,f}function s(f,m,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<m?(f.flags|=67108866,m):p):(f.flags|=67108866,m)):(f.flags|=1048576,m)}function l(f){return e&&f.alternate===null&&(f.flags|=67108866),f}function u(f,m,p,k){return m===null||m.tag!==6?(m=xo(p,f.mode,k),m.return=f,m):(m=i(m,p),m.return=f,m)}function h(f,m,p,k){var B=p.type;return B===J?x(f,m,p.props.children,k,p.key):m!==null&&(m.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===P&&nn(B)===m.type)?(m=i(m,p.props),Ei(m,p),m.return=f,m):(m=js(p.type,p.key,p.props,null,f.mode,k),Ei(m,p),m.return=f,m)}function g(f,m,p,k){return m===null||m.tag!==4||m.stateNode.containerInfo!==p.containerInfo||m.stateNode.implementation!==p.implementation?(m=wo(p,f.mode,k),m.return=f,m):(m=i(m,p.children||[]),m.return=f,m)}function x(f,m,p,k,B){return m===null||m.tag!==7?(m=$a(p,f.mode,k,B),m.return=f,m):(m=i(m,p),m.return=f,m)}function T(f,m,p){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return m=xo(""+m,f.mode,p),m.return=f,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Y:return p=js(m.type,m.key,m.props,null,f.mode,p),Ei(p,m),p.return=f,p;case Q:return m=wo(m,f.mode,p),m.return=f,m;case P:return m=nn(m),T(f,m,p)}if(Xt(m)||oe(m))return m=$a(m,f.mode,p,null),m.return=f,m;if(typeof m.then=="function")return T(f,Bs(m),p);if(m.$$typeof===H)return T(f,qs(f,m),p);Ls(f,m)}return null}function b(f,m,p,k){var B=m!==null?m.key:null;if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return B!==null?null:u(f,m,""+p,k);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Y:return p.key===B?h(f,m,p,k):null;case Q:return p.key===B?g(f,m,p,k):null;case P:return p=nn(p),b(f,m,p,k)}if(Xt(p)||oe(p))return B!==null?null:x(f,m,p,k,null);if(typeof p.then=="function")return b(f,m,Bs(p),k);if(p.$$typeof===H)return b(f,m,qs(f,p),k);Ls(f,p)}return null}function y(f,m,p,k,B){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return f=f.get(p)||null,u(m,f,""+k,B);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Y:return f=f.get(k.key===null?p:k.key)||null,h(m,f,k,B);case Q:return f=f.get(k.key===null?p:k.key)||null,g(m,f,k,B);case P:return k=nn(k),y(f,m,p,k,B)}if(Xt(k)||oe(k))return f=f.get(p)||null,x(m,f,k,B,null);if(typeof k.then=="function")return y(f,m,p,Bs(k),B);if(k.$$typeof===H)return y(f,m,p,qs(m,k),B);Ls(m,k)}return null}function q(f,m,p,k){for(var B=null,le=null,_=m,$=m=0,ie=null;_!==null&&$<p.length;$++){_.index>$?(ie=_,_=null):ie=_.sibling;var ce=b(f,_,p[$],k);if(ce===null){_===null&&(_=ie);break}e&&_&&ce.alternate===null&&t(f,_),m=s(ce,m,$),le===null?B=ce:le.sibling=ce,le=ce,_=ie}if($===p.length)return a(f,_),re&&It(f,$),B;if(_===null){for(;$<p.length;$++)_=T(f,p[$],k),_!==null&&(m=s(_,m,$),le===null?B=_:le.sibling=_,le=_);return re&&It(f,$),B}for(_=n(_);$<p.length;$++)ie=y(_,f,$,p[$],k),ie!==null&&(e&&ie.alternate!==null&&_.delete(ie.key===null?$:ie.key),m=s(ie,m,$),le===null?B=ie:le.sibling=ie,le=ie);return e&&_.forEach(function(_a){return t(f,_a)}),re&&It(f,$),B}function X(f,m,p,k){if(p==null)throw Error(c(151));for(var B=null,le=null,_=m,$=m=0,ie=null,ce=p.next();_!==null&&!ce.done;$++,ce=p.next()){_.index>$?(ie=_,_=null):ie=_.sibling;var _a=b(f,_,ce.value,k);if(_a===null){_===null&&(_=ie);break}e&&_&&_a.alternate===null&&t(f,_),m=s(_a,m,$),le===null?B=_a:le.sibling=_a,le=_a,_=ie}if(ce.done)return a(f,_),re&&It(f,$),B;if(_===null){for(;!ce.done;$++,ce=p.next())ce=T(f,ce.value,k),ce!==null&&(m=s(ce,m,$),le===null?B=ce:le.sibling=ce,le=ce);return re&&It(f,$),B}for(_=n(_);!ce.done;$++,ce=p.next())ce=y(_,f,$,ce.value,k),ce!==null&&(e&&ce.alternate!==null&&_.delete(ce.key===null?$:ce.key),m=s(ce,m,$),le===null?B=ce:le.sibling=ce,le=ce);return e&&_.forEach(function(Bg){return t(f,Bg)}),re&&It(f,$),B}function ye(f,m,p,k){if(typeof p=="object"&&p!==null&&p.type===J&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Y:e:{for(var B=p.key;m!==null;){if(m.key===B){if(B=p.type,B===J){if(m.tag===7){a(f,m.sibling),k=i(m,p.props.children),k.return=f,f=k;break e}}else if(m.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===P&&nn(B)===m.type){a(f,m.sibling),k=i(m,p.props),Ei(k,p),k.return=f,f=k;break e}a(f,m);break}else t(f,m);m=m.sibling}p.type===J?(k=$a(p.props.children,f.mode,k,p.key),k.return=f,f=k):(k=js(p.type,p.key,p.props,null,f.mode,k),Ei(k,p),k.return=f,f=k)}return l(f);case Q:e:{for(B=p.key;m!==null;){if(m.key===B)if(m.tag===4&&m.stateNode.containerInfo===p.containerInfo&&m.stateNode.implementation===p.implementation){a(f,m.sibling),k=i(m,p.children||[]),k.return=f,f=k;break e}else{a(f,m);break}else t(f,m);m=m.sibling}k=wo(p,f.mode,k),k.return=f,f=k}return l(f);case P:return p=nn(p),ye(f,m,p,k)}if(Xt(p))return q(f,m,p,k);if(oe(p)){if(B=oe(p),typeof B!="function")throw Error(c(150));return p=B.call(p),X(f,m,p,k)}if(typeof p.then=="function")return ye(f,m,Bs(p),k);if(p.$$typeof===H)return ye(f,m,qs(f,p),k);Ls(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint"?(p=""+p,m!==null&&m.tag===6?(a(f,m.sibling),k=i(m,p),k.return=f,f=k):(a(f,m),k=xo(p,f.mode,k),k.return=f,f=k),l(f)):a(f,m)}return function(f,m,p,k){try{Ri=0;var B=ye(f,m,p,k);return Bn=null,B}catch(_){if(_===Hn||_===_s)throw _;var le=dt(29,_,null,f.mode);return le.lanes=k,le.return=f,le}finally{}}}var rn=zd(!0),Md=zd(!1),xa=!1;function zo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Mo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function wa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ka(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(ue&2)!==0){var i=n.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),n.pending=t,t=Es(e),bd(e,null,a),t}return Rs(e,n,t,a),Es(e)}function ji(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Oc(e,a)}}function qo(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var i=null,s=null;if(a=a.firstBaseUpdate,a!==null){do{var l={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};s===null?i=s=l:s=s.next=l,a=a.next}while(a!==null);s===null?i=s=t:s=s.next=t}else i=s=t;a={baseState:n.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Uo=!1;function zi(){if(Uo){var e=_n;if(e!==null)throw e}}function Mi(e,t,a,n){Uo=!1;var i=e.updateQueue;xa=!1;var s=i.firstBaseUpdate,l=i.lastBaseUpdate,u=i.shared.pending;if(u!==null){i.shared.pending=null;var h=u,g=h.next;h.next=null,l===null?s=g:l.next=g,l=h;var x=e.alternate;x!==null&&(x=x.updateQueue,u=x.lastBaseUpdate,u!==l&&(u===null?x.firstBaseUpdate=g:u.next=g,x.lastBaseUpdate=h))}if(s!==null){var T=i.baseState;l=0,x=g=h=null,u=s;do{var b=u.lane&-536870913,y=b!==u.lane;if(y?(ne&b)===b:(n&b)===b){b!==0&&b===Un&&(Uo=!0),x!==null&&(x=x.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});e:{var q=e,X=u;b=t;var ye=a;switch(X.tag){case 1:if(q=X.payload,typeof q=="function"){T=q.call(ye,T,b);break e}T=q;break e;case 3:q.flags=q.flags&-65537|128;case 0:if(q=X.payload,b=typeof q=="function"?q.call(ye,T,b):q,b==null)break e;T=C({},T,b);break e;case 2:xa=!0}}b=u.callback,b!==null&&(e.flags|=64,y&&(e.flags|=8192),y=i.callbacks,y===null?i.callbacks=[b]:y.push(b))}else y={lane:b,tag:u.tag,payload:u.payload,callback:u.callback,next:null},x===null?(g=x=y,h=T):x=x.next=y,l|=b;if(u=u.next,u===null){if(u=i.shared.pending,u===null)break;y=u,u=y.next,y.next=null,i.lastBaseUpdate=y,i.shared.pending=null}}while(!0);x===null&&(h=T),i.baseState=h,i.firstBaseUpdate=g,i.lastBaseUpdate=x,s===null&&(i.shared.lanes=0),Na|=l,e.lanes=l,e.memoizedState=T}}function qd(e,t){if(typeof e!="function")throw Error(c(191,e));e.call(t)}function Ud(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)qd(a[e],t)}var Ln=Fe(null),Gs=Fe(0);function _d(e,t){e=ra,he(Gs,e),he(Ln,t),ra=e|t.baseLanes}function _o(){he(Gs,ra),he(Ln,Ln.current)}function Ho(){ra=Gs.current,Ae(Ln),Ae(Gs)}var ut=Fe(null),At=null;function Sa(e){var t=e.alternate;he(Ee,Ee.current&1),he(ut,e),At===null&&(t===null||Ln.current!==null||t.memoizedState!==null)&&(At=e)}function Bo(e){he(Ee,Ee.current),he(ut,e),At===null&&(At=e)}function Hd(e){e.tag===22?(he(Ee,Ee.current),he(ut,e),At===null&&(At=e)):Ta()}function Ta(){he(Ee,Ee.current),he(ut,ut.current)}function ht(e){Ae(ut),At===e&&(At=null),Ae(Ee)}var Ee=Fe(0);function Qs(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Vl(a)||Kl(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var $t=0,W=null,be=null,Me=null,Ys=!1,Gn=!1,on=!1,Xs=0,qi=0,Qn=null,Dp=0;function Ce(){throw Error(c(321))}function Lo(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!ct(e[a],t[a]))return!1;return!0}function Go(e,t,a,n,i,s){return $t=s,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,S.H=e===null||e.memoizedState===null?wu:al,on=!1,s=a(n,i),on=!1,Gn&&(s=Ld(t,a,n,i)),Bd(e),s}function Bd(e){S.H=Hi;var t=be!==null&&be.next!==null;if($t=0,Me=be=W=null,Ys=!1,qi=0,Qn=null,t)throw Error(c(300));e===null||qe||(e=e.dependencies,e!==null&&Ms(e)&&(qe=!0))}function Ld(e,t,a,n){W=e;var i=0;do{if(Gn&&(Qn=null),qi=0,Gn=!1,25<=i)throw Error(c(301));if(i+=1,Me=be=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}S.H=ku,s=t(a,n)}while(Gn);return s}function Rp(){var e=S.H,t=e.useState()[0];return t=typeof t.then=="function"?Ui(t):t,e=e.useState()[0],(be!==null?be.memoizedState:null)!==e&&(W.flags|=1024),t}function Qo(){var e=Xs!==0;return Xs=0,e}function Yo(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function Xo(e){if(Ys){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ys=!1}$t=0,Me=be=W=null,Gn=!1,qi=Xs=0,Qn=null}function We(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Me===null?W.memoizedState=Me=e:Me=Me.next=e,Me}function je(){if(be===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=be.next;var t=Me===null?W.memoizedState:Me.next;if(t!==null)Me=t,be=e;else{if(e===null)throw W.alternate===null?Error(c(467)):Error(c(310));be=e,e={memoizedState:be.memoizedState,baseState:be.baseState,baseQueue:be.baseQueue,queue:be.queue,next:null},Me===null?W.memoizedState=Me=e:Me=Me.next=e}return Me}function Vs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ui(e){var t=qi;return qi+=1,Qn===null&&(Qn=[]),e=Rd(Qn,e,t),t=W,(Me===null?t.memoizedState:Me.next)===null&&(t=t.alternate,S.H=t===null||t.memoizedState===null?wu:al),e}function Ks(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ui(e);if(e.$$typeof===H)return Ve(e)}throw Error(c(438,String(e)))}function Vo(e){var t=null,a=W.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=W.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=Vs(),W.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=me;return t.index++,a}function Pt(e,t){return typeof t=="function"?t(e):t}function Zs(e){var t=je();return Ko(t,be,e)}function Ko(e,t,a){var n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=a;var i=e.baseQueue,s=n.pending;if(s!==null){if(i!==null){var l=i.next;i.next=s.next,s.next=l}t.baseQueue=i=s,n.pending=null}if(s=e.baseState,i===null)e.memoizedState=s;else{t=i.next;var u=l=null,h=null,g=t,x=!1;do{var T=g.lane&-536870913;if(T!==g.lane?(ne&T)===T:($t&T)===T){var b=g.revertLane;if(b===0)h!==null&&(h=h.next={lane:0,revertLane:0,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),T===Un&&(x=!0);else if(($t&b)===b){g=g.next,b===Un&&(x=!0);continue}else T={lane:0,revertLane:g.revertLane,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},h===null?(u=h=T,l=s):h=h.next=T,W.lanes|=b,Na|=b;T=g.action,on&&a(s,T),s=g.hasEagerState?g.eagerState:a(s,T)}else b={lane:T,revertLane:g.revertLane,gesture:g.gesture,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},h===null?(u=h=b,l=s):h=h.next=b,W.lanes|=T,Na|=T;g=g.next}while(g!==null&&g!==t);if(h===null?l=s:h.next=u,!ct(s,e.memoizedState)&&(qe=!0,x&&(a=_n,a!==null)))throw a;e.memoizedState=s,e.baseState=l,e.baseQueue=h,n.lastRenderedState=s}return i===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function Zo(e){var t=je(),a=t.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=e;var n=a.dispatch,i=a.pending,s=t.memoizedState;if(i!==null){a.pending=null;var l=i=i.next;do s=e(s,l.action),l=l.next;while(l!==i);ct(s,t.memoizedState)||(qe=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),a.lastRenderedState=s}return[s,n]}function Gd(e,t,a){var n=W,i=je(),s=re;if(s){if(a===void 0)throw Error(c(407));a=a()}else a=t();var l=!ct((be||i).memoizedState,a);if(l&&(i.memoizedState=a,qe=!0),i=i.queue,Fo(Xd.bind(null,n,i,e),[e]),i.getSnapshot!==t||l||Me!==null&&Me.memoizedState.tag&1){if(n.flags|=2048,Yn(9,{destroy:void 0},Yd.bind(null,n,i,a,t),null),xe===null)throw Error(c(349));s||($t&127)!==0||Qd(n,t,a)}return a}function Qd(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=W.updateQueue,t===null?(t=Vs(),W.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Yd(e,t,a,n){t.value=a,t.getSnapshot=n,Vd(t)&&Kd(e)}function Xd(e,t,a){return a(function(){Vd(t)&&Kd(e)})}function Vd(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!ct(e,a)}catch{return!0}}function Kd(e){var t=Wa(e,2);t!==null&&st(t,e,2)}function Jo(e){var t=We();if(typeof e=="function"){var a=e;if(e=a(),on){ma(!0);try{a()}finally{ma(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pt,lastRenderedState:e},t}function Zd(e,t,a,n){return e.baseState=a,Ko(e,be,typeof n=="function"?n:Pt)}function Ep(e,t,a,n,i){if(Fs(e))throw Error(c(485));if(e=t.action,e!==null){var s={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(l){s.listeners.push(l)}};S.T!==null?a(!0):s.isTransition=!1,n(s),a=t.pending,a===null?(s.next=t.pending=s,Jd(t,s)):(s.next=a.next,t.pending=a.next=s)}}function Jd(e,t){var a=t.action,n=t.payload,i=e.state;if(t.isTransition){var s=S.T,l={};S.T=l;try{var u=a(i,n),h=S.S;h!==null&&h(l,u),Id(e,t,u)}catch(g){Io(e,t,g)}finally{s!==null&&l.types!==null&&(s.types=l.types),S.T=s}}else try{s=a(i,n),Id(e,t,s)}catch(g){Io(e,t,g)}}function Id(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){Fd(e,t,n)},function(n){return Io(e,t,n)}):Fd(e,t,a)}function Fd(e,t,a){t.status="fulfilled",t.value=a,Wd(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Jd(e,a)))}function Io(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,Wd(t),t=t.next;while(t!==n)}e.action=null}function Wd(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function $d(e,t){return t}function Pd(e,t){if(re){var a=xe.formState;if(a!==null){e:{var n=W;if(re){if(Se){t:{for(var i=Se,s=Ot;i.nodeType!==8;){if(!s){i=null;break t}if(i=Nt(i.nextSibling),i===null){i=null;break t}}s=i.data,i=s==="F!"||s==="F"?i:null}if(i){Se=Nt(i.nextSibling),n=i.data==="F!";break e}}va(n)}n=!1}n&&(t=a[0])}}return a=We(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$d,lastRenderedState:t},a.queue=n,a=vu.bind(null,W,n),n.dispatch=a,n=Jo(!1),s=tl.bind(null,W,!1,n.queue),n=We(),i={state:t,dispatch:null,action:e,pending:null},n.queue=i,a=Ep.bind(null,W,i,s,a),i.dispatch=a,n.memoizedState=e,[t,a,!1]}function eu(e){var t=je();return tu(t,be,e)}function tu(e,t,a){if(t=Ko(e,t,$d)[0],e=Zs(Pt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=Ui(t)}catch(l){throw l===Hn?_s:l}else n=t;t=je();var i=t.queue,s=i.dispatch;return a!==t.memoizedState&&(W.flags|=2048,Yn(9,{destroy:void 0},jp.bind(null,i,a),null)),[n,s,e]}function jp(e,t){e.action=t}function au(e){var t=je(),a=be;if(a!==null)return tu(t,a,e);je(),t=t.memoizedState,a=je();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function Yn(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=W.updateQueue,t===null&&(t=Vs(),W.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function nu(){return je().memoizedState}function Js(e,t,a,n){var i=We();W.flags|=e,i.memoizedState=Yn(1|t,{destroy:void 0},a,n===void 0?null:n)}function Is(e,t,a,n){var i=je();n=n===void 0?null:n;var s=i.memoizedState.inst;be!==null&&n!==null&&Lo(n,be.memoizedState.deps)?i.memoizedState=Yn(t,s,a,n):(W.flags|=e,i.memoizedState=Yn(1|t,s,a,n))}function iu(e,t){Js(8390656,8,e,t)}function Fo(e,t){Is(2048,8,e,t)}function zp(e){W.flags|=4;var t=W.updateQueue;if(t===null)t=Vs(),W.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function su(e){var t=je().memoizedState;return zp({ref:t,nextImpl:e}),function(){if((ue&2)!==0)throw Error(c(440));return t.impl.apply(void 0,arguments)}}function ru(e,t){return Is(4,2,e,t)}function ou(e,t){return Is(4,4,e,t)}function lu(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function cu(e,t,a){a=a!=null?a.concat([e]):null,Is(4,4,lu.bind(null,t,e),a)}function Wo(){}function du(e,t){var a=je();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&Lo(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function uu(e,t){var a=je();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&Lo(t,n[1]))return n[0];if(n=e(),on){ma(!0);try{e()}finally{ma(!1)}}return a.memoizedState=[n,t],n}function $o(e,t,a){return a===void 0||($t&1073741824)!==0&&(ne&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=hh(),W.lanes|=e,Na|=e,a)}function hu(e,t,a,n){return ct(a,t)?a:Ln.current!==null?(e=$o(e,a,n),ct(e,t)||(qe=!0),e):($t&42)===0||($t&1073741824)!==0&&(ne&261930)===0?(qe=!0,e.memoizedState=a):(e=hh(),W.lanes|=e,Na|=e,t)}function mu(e,t,a,n,i){var s=z.p;z.p=s!==0&&8>s?s:8;var l=S.T,u={};S.T=u,tl(e,!1,t,a);try{var h=i(),g=S.S;if(g!==null&&g(u,h),h!==null&&typeof h=="object"&&typeof h.then=="function"){var x=Cp(h,n);_i(e,t,x,pt(e))}else _i(e,t,n,pt(e))}catch(T){_i(e,t,{then:function(){},status:"rejected",reason:T},pt())}finally{z.p=s,l!==null&&u.types!==null&&(l.types=u.types),S.T=l}}function Mp(){}function Po(e,t,a,n){if(e.tag!==5)throw Error(c(476));var i=fu(e).queue;mu(e,i,t,I,a===null?Mp:function(){return pu(e),a(n)})}function fu(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:I,baseState:I,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pt,lastRenderedState:I},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function pu(e){var t=fu(e);t.next===null&&(t=e.alternate.memoizedState),_i(e,t.next.queue,{},pt())}function el(){return Ve(es)}function gu(){return je().memoizedState}function bu(){return je().memoizedState}function qp(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=pt();e=wa(a);var n=ka(t,e,a);n!==null&&(st(n,t,a),ji(n,t,a)),t={cache:Do()},e.payload=t;return}t=t.return}}function Up(e,t,a){var n=pt();a={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Fs(e)?yu(t,a):(a=vo(e,t,a,n),a!==null&&(st(a,e,n),xu(a,t,n)))}function vu(e,t,a){var n=pt();_i(e,t,a,n)}function _i(e,t,a,n){var i={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Fs(e))yu(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var l=t.lastRenderedState,u=s(l,a);if(i.hasEagerState=!0,i.eagerState=u,ct(u,l))return Rs(e,t,i,0),xe===null&&Ds(),!1}catch{}finally{}if(a=vo(e,t,i,n),a!==null)return st(a,e,n),xu(a,t,n),!0}return!1}function tl(e,t,a,n){if(n={lane:2,revertLane:zl(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Fs(e)){if(t)throw Error(c(479))}else t=vo(e,a,n,2),t!==null&&st(t,e,2)}function Fs(e){var t=e.alternate;return e===W||t!==null&&t===W}function yu(e,t){Gn=Ys=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function xu(e,t,a){if((a&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Oc(e,a)}}var Hi={readContext:Ve,use:Ks,useCallback:Ce,useContext:Ce,useEffect:Ce,useImperativeHandle:Ce,useLayoutEffect:Ce,useInsertionEffect:Ce,useMemo:Ce,useReducer:Ce,useRef:Ce,useState:Ce,useDebugValue:Ce,useDeferredValue:Ce,useTransition:Ce,useSyncExternalStore:Ce,useId:Ce,useHostTransitionStatus:Ce,useFormState:Ce,useActionState:Ce,useOptimistic:Ce,useMemoCache:Ce,useCacheRefresh:Ce};Hi.useEffectEvent=Ce;var wu={readContext:Ve,use:Ks,useCallback:function(e,t){return We().memoizedState=[e,t===void 0?null:t],e},useContext:Ve,useEffect:iu,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,Js(4194308,4,lu.bind(null,t,e),a)},useLayoutEffect:function(e,t){return Js(4194308,4,e,t)},useInsertionEffect:function(e,t){Js(4,2,e,t)},useMemo:function(e,t){var a=We();t=t===void 0?null:t;var n=e();if(on){ma(!0);try{e()}finally{ma(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=We();if(a!==void 0){var i=a(t);if(on){ma(!0);try{a(t)}finally{ma(!1)}}}else i=t;return n.memoizedState=n.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},n.queue=e,e=e.dispatch=Up.bind(null,W,e),[n.memoizedState,e]},useRef:function(e){var t=We();return e={current:e},t.memoizedState=e},useState:function(e){e=Jo(e);var t=e.queue,a=vu.bind(null,W,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Wo,useDeferredValue:function(e,t){var a=We();return $o(a,e,t)},useTransition:function(){var e=Jo(!1);return e=mu.bind(null,W,e.queue,!0,!1),We().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=W,i=We();if(re){if(a===void 0)throw Error(c(407));a=a()}else{if(a=t(),xe===null)throw Error(c(349));(ne&127)!==0||Qd(n,t,a)}i.memoizedState=a;var s={value:a,getSnapshot:t};return i.queue=s,iu(Xd.bind(null,n,s,e),[e]),n.flags|=2048,Yn(9,{destroy:void 0},Yd.bind(null,n,s,a,t),null),a},useId:function(){var e=We(),t=xe.identifierPrefix;if(re){var a=_t,n=Ut;a=(n&~(1<<32-lt(n)-1)).toString(32)+a,t="_"+t+"R_"+a,a=Xs++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=Dp++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:el,useFormState:Pd,useActionState:Pd,useOptimistic:function(e){var t=We();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=tl.bind(null,W,!0,a),a.dispatch=t,[e,t]},useMemoCache:Vo,useCacheRefresh:function(){return We().memoizedState=qp.bind(null,W)},useEffectEvent:function(e){var t=We(),a={impl:e};return t.memoizedState=a,function(){if((ue&2)!==0)throw Error(c(440));return a.impl.apply(void 0,arguments)}}},al={readContext:Ve,use:Ks,useCallback:du,useContext:Ve,useEffect:Fo,useImperativeHandle:cu,useInsertionEffect:ru,useLayoutEffect:ou,useMemo:uu,useReducer:Zs,useRef:nu,useState:function(){return Zs(Pt)},useDebugValue:Wo,useDeferredValue:function(e,t){var a=je();return hu(a,be.memoizedState,e,t)},useTransition:function(){var e=Zs(Pt)[0],t=je().memoizedState;return[typeof e=="boolean"?e:Ui(e),t]},useSyncExternalStore:Gd,useId:gu,useHostTransitionStatus:el,useFormState:eu,useActionState:eu,useOptimistic:function(e,t){var a=je();return Zd(a,be,e,t)},useMemoCache:Vo,useCacheRefresh:bu};al.useEffectEvent=su;var ku={readContext:Ve,use:Ks,useCallback:du,useContext:Ve,useEffect:Fo,useImperativeHandle:cu,useInsertionEffect:ru,useLayoutEffect:ou,useMemo:uu,useReducer:Zo,useRef:nu,useState:function(){return Zo(Pt)},useDebugValue:Wo,useDeferredValue:function(e,t){var a=je();return be===null?$o(a,e,t):hu(a,be.memoizedState,e,t)},useTransition:function(){var e=Zo(Pt)[0],t=je().memoizedState;return[typeof e=="boolean"?e:Ui(e),t]},useSyncExternalStore:Gd,useId:gu,useHostTransitionStatus:el,useFormState:au,useActionState:au,useOptimistic:function(e,t){var a=je();return be!==null?Zd(a,be,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Vo,useCacheRefresh:bu};ku.useEffectEvent=su;function nl(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:C({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var il={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=pt(),i=wa(n);i.payload=t,a!=null&&(i.callback=a),t=ka(e,i,n),t!==null&&(st(t,e,n),ji(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=pt(),i=wa(n);i.tag=1,i.payload=t,a!=null&&(i.callback=a),t=ka(e,i,n),t!==null&&(st(t,e,n),ji(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=pt(),n=wa(a);n.tag=2,t!=null&&(n.callback=t),t=ka(e,n,a),t!==null&&(st(t,e,a),ji(t,e,a))}};function Su(e,t,a,n,i,s,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,s,l):t.prototype&&t.prototype.isPureReactComponent?!Ti(a,n)||!Ti(i,s):!0}function Tu(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&il.enqueueReplaceState(t,t.state,null)}function ln(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=C({},a));for(var i in e)a[i]===void 0&&(a[i]=e[i])}return a}function Ou(e){Cs(e)}function Au(e){console.error(e)}function Nu(e){Cs(e)}function Ws(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function Cu(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function sl(e,t,a){return a=wa(a),a.tag=3,a.payload={element:null},a.callback=function(){Ws(e,t)},a}function Du(e){return e=wa(e),e.tag=3,e}function Ru(e,t,a,n){var i=a.type.getDerivedStateFromError;if(typeof i=="function"){var s=n.value;e.payload=function(){return i(s)},e.callback=function(){Cu(t,a,n)}}var l=a.stateNode;l!==null&&typeof l.componentDidCatch=="function"&&(e.callback=function(){Cu(t,a,n),typeof i!="function"&&(Ca===null?Ca=new Set([this]):Ca.add(this));var u=n.stack;this.componentDidCatch(n.value,{componentStack:u!==null?u:""})})}function _p(e,t,a,n,i){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&qn(t,a,i,!0),a=ut.current,a!==null){switch(a.tag){case 31:case 13:return At===null?cr():a.alternate===null&&De===0&&(De=3),a.flags&=-257,a.flags|=65536,a.lanes=i,n===Hs?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),Rl(e,n,i)),!1;case 22:return a.flags|=65536,n===Hs?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),Rl(e,n,i)),!1}throw Error(c(435,a.tag))}return Rl(e,n,i),cr(),!1}if(re)return t=ut.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=i,n!==To&&(e=Error(c(422),{cause:n}),Ni(kt(e,a)))):(n!==To&&(t=Error(c(423),{cause:n}),Ni(kt(t,a))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,n=kt(n,a),i=sl(e.stateNode,n,i),qo(e,i),De!==4&&(De=2)),!1;var s=Error(c(520),{cause:n});if(s=kt(s,a),Ki===null?Ki=[s]:Ki.push(s),De!==4&&(De=2),t===null)return!0;n=kt(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=i&-i,a.lanes|=e,e=sl(a.stateNode,n,e),qo(a,e),!1;case 1:if(t=a.type,s=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(Ca===null||!Ca.has(s))))return a.flags|=65536,i&=-i,a.lanes|=i,i=Du(i),Ru(i,e,a,n),qo(a,i),!1}a=a.return}while(a!==null);return!1}var rl=Error(c(461)),qe=!1;function Ke(e,t,a,n){t.child=e===null?Md(t,null,a,n):rn(t,e.child,a,n)}function Eu(e,t,a,n,i){a=a.render;var s=t.ref;if("ref"in n){var l={};for(var u in n)u!=="ref"&&(l[u]=n[u])}else l=n;return tn(t),n=Go(e,t,a,l,s,i),u=Qo(),e!==null&&!qe?(Yo(e,t,i),ea(e,t,i)):(re&&u&&ko(t),t.flags|=1,Ke(e,t,n,i),t.child)}function ju(e,t,a,n,i){if(e===null){var s=a.type;return typeof s=="function"&&!yo(s)&&s.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=s,zu(e,t,s,n,i)):(e=js(a.type,null,n,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!fl(e,i)){var l=s.memoizedProps;if(a=a.compare,a=a!==null?a:Ti,a(l,n)&&e.ref===t.ref)return ea(e,t,i)}return t.flags|=1,e=Jt(s,n),e.ref=t.ref,e.return=t,t.child=e}function zu(e,t,a,n,i){if(e!==null){var s=e.memoizedProps;if(Ti(s,n)&&e.ref===t.ref)if(qe=!1,t.pendingProps=n=s,fl(e,i))(e.flags&131072)!==0&&(qe=!0);else return t.lanes=e.lanes,ea(e,t,i)}return ol(e,t,a,n,i)}function Mu(e,t,a,n){var i=n.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((t.flags&128)!==0){if(s=s!==null?s.baseLanes|a:a,e!==null){for(n=t.child=e.child,i=0;n!==null;)i=i|n.lanes|n.childLanes,n=n.sibling;n=i&~s}else n=0,t.child=null;return qu(e,t,s,a,n)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Us(t,s!==null?s.cachePool:null),s!==null?_d(t,s):_o(),Hd(t);else return n=t.lanes=536870912,qu(e,t,s!==null?s.baseLanes|a:a,a,n)}else s!==null?(Us(t,s.cachePool),_d(t,s),Ta(),t.memoizedState=null):(e!==null&&Us(t,null),_o(),Ta());return Ke(e,t,i,a),t.child}function Bi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function qu(e,t,a,n,i){var s=Eo();return s=s===null?null:{parent:ze._currentValue,pool:s},t.memoizedState={baseLanes:a,cachePool:s},e!==null&&Us(t,null),_o(),Hd(t),e!==null&&qn(e,t,n,!0),t.childLanes=i,null}function $s(e,t){return t=er({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Uu(e,t,a){return rn(t,e.child,null,a),e=$s(t,t.pendingProps),e.flags|=2,ht(t),t.memoizedState=null,e}function Hp(e,t,a){var n=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(re){if(n.mode==="hidden")return e=$s(t,n),t.lanes=536870912,Bi(null,e);if(Bo(t),(e=Se)?(e=Jh(e,Ot),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ga!==null?{id:Ut,overflow:_t}:null,retryLane:536870912,hydrationErrors:null},a=yd(e),a.return=t,t.child=a,Xe=t,Se=null)):e=null,e===null)throw va(t);return t.lanes=536870912,null}return $s(t,n)}var s=e.memoizedState;if(s!==null){var l=s.dehydrated;if(Bo(t),i)if(t.flags&256)t.flags&=-257,t=Uu(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(c(558));else if(qe||qn(e,t,a,!1),i=(a&e.childLanes)!==0,qe||i){if(n=xe,n!==null&&(l=Ac(n,a),l!==0&&l!==s.retryLane))throw s.retryLane=l,Wa(e,l),st(n,e,l),rl;cr(),t=Uu(e,t,a)}else e=s.treeContext,Se=Nt(l.nextSibling),Xe=t,re=!0,ba=null,Ot=!1,e!==null&&kd(t,e),t=$s(t,n),t.flags|=4096;return t}return e=Jt(e.child,{mode:n.mode,children:n.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ps(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(c(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function ol(e,t,a,n,i){return tn(t),a=Go(e,t,a,n,void 0,i),n=Qo(),e!==null&&!qe?(Yo(e,t,i),ea(e,t,i)):(re&&n&&ko(t),t.flags|=1,Ke(e,t,a,i),t.child)}function _u(e,t,a,n,i,s){return tn(t),t.updateQueue=null,a=Ld(t,n,a,i),Bd(e),n=Qo(),e!==null&&!qe?(Yo(e,t,s),ea(e,t,s)):(re&&n&&ko(t),t.flags|=1,Ke(e,t,a,s),t.child)}function Hu(e,t,a,n,i){if(tn(t),t.stateNode===null){var s=En,l=a.contextType;typeof l=="object"&&l!==null&&(s=Ve(l)),s=new a(n,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=il,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=n,s.state=t.memoizedState,s.refs={},zo(t),l=a.contextType,s.context=typeof l=="object"&&l!==null?Ve(l):En,s.state=t.memoizedState,l=a.getDerivedStateFromProps,typeof l=="function"&&(nl(t,a,l,n),s.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(l=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),l!==s.state&&il.enqueueReplaceState(s,s.state,null),Mi(t,n,s,i),zi(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){s=t.stateNode;var u=t.memoizedProps,h=ln(a,u);s.props=h;var g=s.context,x=a.contextType;l=En,typeof x=="object"&&x!==null&&(l=Ve(x));var T=a.getDerivedStateFromProps;x=typeof T=="function"||typeof s.getSnapshotBeforeUpdate=="function",u=t.pendingProps!==u,x||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(u||g!==l)&&Tu(t,s,n,l),xa=!1;var b=t.memoizedState;s.state=b,Mi(t,n,s,i),zi(),g=t.memoizedState,u||b!==g||xa?(typeof T=="function"&&(nl(t,a,T,n),g=t.memoizedState),(h=xa||Su(t,a,h,n,b,g,l))?(x||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=g),s.props=n,s.state=g,s.context=l,n=h):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{s=t.stateNode,Mo(e,t),l=t.memoizedProps,x=ln(a,l),s.props=x,T=t.pendingProps,b=s.context,g=a.contextType,h=En,typeof g=="object"&&g!==null&&(h=Ve(g)),u=a.getDerivedStateFromProps,(g=typeof u=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==T||b!==h)&&Tu(t,s,n,h),xa=!1,b=t.memoizedState,s.state=b,Mi(t,n,s,i),zi();var y=t.memoizedState;l!==T||b!==y||xa||e!==null&&e.dependencies!==null&&Ms(e.dependencies)?(typeof u=="function"&&(nl(t,a,u,n),y=t.memoizedState),(x=xa||Su(t,a,x,n,b,y,h)||e!==null&&e.dependencies!==null&&Ms(e.dependencies))?(g||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(n,y,h),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(n,y,h)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&b===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&b===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=y),s.props=n,s.state=y,s.context=h,n=x):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&b===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&b===e.memoizedState||(t.flags|=1024),n=!1)}return s=n,Ps(e,t),n=(t.flags&128)!==0,s||n?(s=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&n?(t.child=rn(t,e.child,null,i),t.child=rn(t,null,a,i)):Ke(e,t,a,i),t.memoizedState=s.state,e=t.child):e=ea(e,t,i),e}function Bu(e,t,a,n){return Pa(),t.flags|=256,Ke(e,t,a,n),t.child}var ll={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function cl(e){return{baseLanes:e,cachePool:Cd()}}function dl(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=ft),e}function Lu(e,t,a){var n=t.pendingProps,i=!1,s=(t.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(Ee.current&2)!==0),l&&(i=!0,t.flags&=-129),l=(t.flags&32)!==0,t.flags&=-33,e===null){if(re){if(i?Sa(t):Ta(),(e=Se)?(e=Jh(e,Ot),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ga!==null?{id:Ut,overflow:_t}:null,retryLane:536870912,hydrationErrors:null},a=yd(e),a.return=t,t.child=a,Xe=t,Se=null)):e=null,e===null)throw va(t);return Kl(e)?t.lanes=32:t.lanes=536870912,null}var u=n.children;return n=n.fallback,i?(Ta(),i=t.mode,u=er({mode:"hidden",children:u},i),n=$a(n,i,a,null),u.return=t,n.return=t,u.sibling=n,t.child=u,n=t.child,n.memoizedState=cl(a),n.childLanes=dl(e,l,a),t.memoizedState=ll,Bi(null,n)):(Sa(t),ul(t,u))}var h=e.memoizedState;if(h!==null&&(u=h.dehydrated,u!==null)){if(s)t.flags&256?(Sa(t),t.flags&=-257,t=hl(e,t,a)):t.memoizedState!==null?(Ta(),t.child=e.child,t.flags|=128,t=null):(Ta(),u=n.fallback,i=t.mode,n=er({mode:"visible",children:n.children},i),u=$a(u,i,a,null),u.flags|=2,n.return=t,u.return=t,n.sibling=u,t.child=n,rn(t,e.child,null,a),n=t.child,n.memoizedState=cl(a),n.childLanes=dl(e,l,a),t.memoizedState=ll,t=Bi(null,n));else if(Sa(t),Kl(u)){if(l=u.nextSibling&&u.nextSibling.dataset,l)var g=l.dgst;l=g,n=Error(c(419)),n.stack="",n.digest=l,Ni({value:n,source:null,stack:null}),t=hl(e,t,a)}else if(qe||qn(e,t,a,!1),l=(a&e.childLanes)!==0,qe||l){if(l=xe,l!==null&&(n=Ac(l,a),n!==0&&n!==h.retryLane))throw h.retryLane=n,Wa(e,n),st(l,e,n),rl;Vl(u)||cr(),t=hl(e,t,a)}else Vl(u)?(t.flags|=192,t.child=e.child,t=null):(e=h.treeContext,Se=Nt(u.nextSibling),Xe=t,re=!0,ba=null,Ot=!1,e!==null&&kd(t,e),t=ul(t,n.children),t.flags|=4096);return t}return i?(Ta(),u=n.fallback,i=t.mode,h=e.child,g=h.sibling,n=Jt(h,{mode:"hidden",children:n.children}),n.subtreeFlags=h.subtreeFlags&65011712,g!==null?u=Jt(g,u):(u=$a(u,i,a,null),u.flags|=2),u.return=t,n.return=t,n.sibling=u,t.child=n,Bi(null,n),n=t.child,u=e.child.memoizedState,u===null?u=cl(a):(i=u.cachePool,i!==null?(h=ze._currentValue,i=i.parent!==h?{parent:h,pool:h}:i):i=Cd(),u={baseLanes:u.baseLanes|a,cachePool:i}),n.memoizedState=u,n.childLanes=dl(e,l,a),t.memoizedState=ll,Bi(e.child,n)):(Sa(t),a=e.child,e=a.sibling,a=Jt(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(l=t.deletions,l===null?(t.deletions=[e],t.flags|=16):l.push(e)),t.child=a,t.memoizedState=null,a)}function ul(e,t){return t=er({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function er(e,t){return e=dt(22,e,null,t),e.lanes=0,e}function hl(e,t,a){return rn(t,e.child,null,a),e=ul(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Gu(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),No(e.return,t,a)}function ml(e,t,a,n,i,s){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:i,treeForkCount:s}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=n,l.tail=a,l.tailMode=i,l.treeForkCount=s)}function Qu(e,t,a){var n=t.pendingProps,i=n.revealOrder,s=n.tail;n=n.children;var l=Ee.current,u=(l&2)!==0;if(u?(l=l&1|2,t.flags|=128):l&=1,he(Ee,l),Ke(e,t,n,a),n=re?Ai:0,!u&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Gu(e,a,t);else if(e.tag===19)Gu(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(a=t.child,i=null;a!==null;)e=a.alternate,e!==null&&Qs(e)===null&&(i=a),a=a.sibling;a=i,a===null?(i=t.child,t.child=null):(i=a.sibling,a.sibling=null),ml(t,!1,i,a,s,n);break;case"backwards":case"unstable_legacy-backwards":for(a=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Qs(e)===null){t.child=i;break}e=i.sibling,i.sibling=a,a=i,i=e}ml(t,!0,a,null,s,n);break;case"together":ml(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function ea(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Na|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(qn(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(c(153));if(t.child!==null){for(e=t.child,a=Jt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Jt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function fl(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ms(e)))}function Bp(e,t,a){switch(t.tag){case 3:us(t,t.stateNode.containerInfo),ya(t,ze,e.memoizedState.cache),Pa();break;case 27:case 5:_r(t);break;case 4:us(t,t.stateNode.containerInfo);break;case 10:ya(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Bo(t),null;break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(Sa(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Lu(e,t,a):(Sa(t),e=ea(e,t,a),e!==null?e.sibling:null);Sa(t);break;case 19:var i=(e.flags&128)!==0;if(n=(a&t.childLanes)!==0,n||(qn(e,t,a,!1),n=(a&t.childLanes)!==0),i){if(n)return Qu(e,t,a);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),he(Ee,Ee.current),n)break;return null;case 22:return t.lanes=0,Mu(e,t,a,t.pendingProps);case 24:ya(t,ze,e.memoizedState.cache)}return ea(e,t,a)}function Yu(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)qe=!0;else{if(!fl(e,a)&&(t.flags&128)===0)return qe=!1,Bp(e,t,a);qe=(e.flags&131072)!==0}else qe=!1,re&&(t.flags&1048576)!==0&&wd(t,Ai,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=nn(t.elementType),t.type=e,typeof e=="function")yo(e)?(n=ln(e,n),t.tag=1,t=Hu(null,t,e,n,a)):(t.tag=0,t=ol(null,t,e,n,a));else{if(e!=null){var i=e.$$typeof;if(i===L){t.tag=11,t=Eu(null,t,e,n,a);break e}else if(i===G){t.tag=14,t=ju(null,t,e,n,a);break e}}throw t=vt(e)||e,Error(c(306,t,""))}}return t;case 0:return ol(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,i=ln(n,t.pendingProps),Hu(e,t,n,i,a);case 3:e:{if(us(t,t.stateNode.containerInfo),e===null)throw Error(c(387));n=t.pendingProps;var s=t.memoizedState;i=s.element,Mo(e,t),Mi(t,n,null,a);var l=t.memoizedState;if(n=l.cache,ya(t,ze,n),n!==s.cache&&Co(t,[ze],a,!0),zi(),n=l.element,s.isDehydrated)if(s={element:n,isDehydrated:!1,cache:l.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=Bu(e,t,n,a);break e}else if(n!==i){i=kt(Error(c(424)),t),Ni(i),t=Bu(e,t,n,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Se=Nt(e.firstChild),Xe=t,re=!0,ba=null,Ot=!0,a=Md(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Pa(),n===i){t=ea(e,t,a);break e}Ke(e,t,n,a)}t=t.child}return t;case 26:return Ps(e,t),e===null?(a=em(t.type,null,t.pendingProps,null))?t.memoizedState=a:re||(a=t.type,e=t.pendingProps,n=gr(ha.current).createElement(a),n[Ye]=t,n[Pe]=e,Ze(n,a,e),Le(n),t.stateNode=n):t.memoizedState=em(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return _r(t),e===null&&re&&(n=t.stateNode=Wh(t.type,t.pendingProps,ha.current),Xe=t,Ot=!0,i=Se,ja(t.type)?(Zl=i,Se=Nt(n.firstChild)):Se=i),Ke(e,t,t.pendingProps.children,a),Ps(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&re&&((i=n=Se)&&(n=pg(n,t.type,t.pendingProps,Ot),n!==null?(t.stateNode=n,Xe=t,Se=Nt(n.firstChild),Ot=!1,i=!0):i=!1),i||va(t)),_r(t),i=t.type,s=t.pendingProps,l=e!==null?e.memoizedProps:null,n=s.children,Ql(i,s)?n=null:l!==null&&Ql(i,l)&&(t.flags|=32),t.memoizedState!==null&&(i=Go(e,t,Rp,null,null,a),es._currentValue=i),Ps(e,t),Ke(e,t,n,a),t.child;case 6:return e===null&&re&&((e=a=Se)&&(a=gg(a,t.pendingProps,Ot),a!==null?(t.stateNode=a,Xe=t,Se=null,e=!0):e=!1),e||va(t)),null;case 13:return Lu(e,t,a);case 4:return us(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=rn(t,null,n,a):Ke(e,t,n,a),t.child;case 11:return Eu(e,t,t.type,t.pendingProps,a);case 7:return Ke(e,t,t.pendingProps,a),t.child;case 8:return Ke(e,t,t.pendingProps.children,a),t.child;case 12:return Ke(e,t,t.pendingProps.children,a),t.child;case 10:return n=t.pendingProps,ya(t,t.type,n.value),Ke(e,t,n.children,a),t.child;case 9:return i=t.type._context,n=t.pendingProps.children,tn(t),i=Ve(i),n=n(i),t.flags|=1,Ke(e,t,n,a),t.child;case 14:return ju(e,t,t.type,t.pendingProps,a);case 15:return zu(e,t,t.type,t.pendingProps,a);case 19:return Qu(e,t,a);case 31:return Hp(e,t,a);case 22:return Mu(e,t,a,t.pendingProps);case 24:return tn(t),n=Ve(ze),e===null?(i=Eo(),i===null&&(i=xe,s=Do(),i.pooledCache=s,s.refCount++,s!==null&&(i.pooledCacheLanes|=a),i=s),t.memoizedState={parent:n,cache:i},zo(t),ya(t,ze,i)):((e.lanes&a)!==0&&(Mo(e,t),Mi(t,null,null,a),zi()),i=e.memoizedState,s=t.memoizedState,i.parent!==n?(i={parent:n,cache:n},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),ya(t,ze,n)):(n=s.cache,ya(t,ze,n),n!==i.cache&&Co(t,[ze],a,!0))),Ke(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(c(156,t.tag))}function ta(e){e.flags|=4}function pl(e,t,a,n,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(gh())e.flags|=8192;else throw sn=Hs,jo}else e.flags&=-16777217}function Xu(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!sm(t))if(gh())e.flags|=8192;else throw sn=Hs,jo}function tr(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Sc():536870912,e.lanes|=t,Zn|=t)}function Li(e,t){if(!re)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function Te(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags&65011712,n|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags,n|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function Lp(e,t,a){var n=t.pendingProps;switch(So(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Te(t),null;case 1:return Te(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Wt(ze),bn(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Mn(t)?ta(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Oo())),Te(t),null;case 26:var i=t.type,s=t.memoizedState;return e===null?(ta(t),s!==null?(Te(t),Xu(t,s)):(Te(t),pl(t,i,null,n,a))):s?s!==e.memoizedState?(ta(t),Te(t),Xu(t,s)):(Te(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&ta(t),Te(t),pl(t,i,e,n,a)),null;case 27:if(hs(t),a=ha.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&ta(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return Te(t),null}e=Be.current,Mn(t)?Sd(t):(e=Wh(i,n,a),t.stateNode=e,ta(t))}return Te(t),null;case 5:if(hs(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&ta(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return Te(t),null}if(s=Be.current,Mn(t))Sd(t);else{var l=gr(ha.current);switch(s){case 1:s=l.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:s=l.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":s=l.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":s=l.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":s=l.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof n.is=="string"?l.createElement("select",{is:n.is}):l.createElement("select"),n.multiple?s.multiple=!0:n.size&&(s.size=n.size);break;default:s=typeof n.is=="string"?l.createElement(i,{is:n.is}):l.createElement(i)}}s[Ye]=t,s[Pe]=n;e:for(l=t.child;l!==null;){if(l.tag===5||l.tag===6)s.appendChild(l.stateNode);else if(l.tag!==4&&l.tag!==27&&l.child!==null){l.child.return=l,l=l.child;continue}if(l===t)break e;for(;l.sibling===null;){if(l.return===null||l.return===t)break e;l=l.return}l.sibling.return=l.return,l=l.sibling}t.stateNode=s;e:switch(Ze(s,i,n),i){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&ta(t)}}return Te(t),pl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&ta(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(c(166));if(e=ha.current,Mn(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,i=Xe,i!==null)switch(i.tag){case 27:case 5:n=i.memoizedProps}e[Ye]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||Lh(e.nodeValue,a)),e||va(t,!0)}else e=gr(e).createTextNode(n),e[Ye]=t,t.stateNode=e}return Te(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(n=Mn(t),a!==null){if(e===null){if(!n)throw Error(c(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(557));e[Ye]=t}else Pa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Te(t),e=!1}else a=Oo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(ht(t),t):(ht(t),null);if((t.flags&128)!==0)throw Error(c(558))}return Te(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Mn(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(c(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(c(317));i[Ye]=t}else Pa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Te(t),i=!1}else i=Oo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(ht(t),t):(ht(t),null)}return ht(t),(t.flags&128)!==0?(t.lanes=a,t):(a=n!==null,e=e!==null&&e.memoizedState!==null,a&&(n=t.child,i=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(i=n.alternate.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==i&&(n.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),tr(t,t.updateQueue),Te(t),null);case 4:return bn(),e===null&&_l(t.stateNode.containerInfo),Te(t),null;case 10:return Wt(t.type),Te(t),null;case 19:if(Ae(Ee),n=t.memoizedState,n===null)return Te(t),null;if(i=(t.flags&128)!==0,s=n.rendering,s===null)if(i)Li(n,!1);else{if(De!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=Qs(e),s!==null){for(t.flags|=128,Li(n,!1),e=s.updateQueue,t.updateQueue=e,tr(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)vd(a,e),a=a.sibling;return he(Ee,Ee.current&1|2),re&&It(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&rt()>rr&&(t.flags|=128,i=!0,Li(n,!1),t.lanes=4194304)}else{if(!i)if(e=Qs(s),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,tr(t,e),Li(n,!0),n.tail===null&&n.tailMode==="hidden"&&!s.alternate&&!re)return Te(t),null}else 2*rt()-n.renderingStartTime>rr&&a!==536870912&&(t.flags|=128,i=!0,Li(n,!1),t.lanes=4194304);n.isBackwards?(s.sibling=t.child,t.child=s):(e=n.last,e!==null?e.sibling=s:t.child=s,n.last=s)}return n.tail!==null?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=rt(),e.sibling=null,a=Ee.current,he(Ee,i?a&1|2:a&1),re&&It(t,n.treeForkCount),e):(Te(t),null);case 22:case 23:return ht(t),Ho(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(a&536870912)!==0&&(t.flags&128)===0&&(Te(t),t.subtreeFlags&6&&(t.flags|=8192)):Te(t),a=t.updateQueue,a!==null&&tr(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&Ae(an),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Wt(ze),Te(t),null;case 25:return null;case 30:return null}throw Error(c(156,t.tag))}function Gp(e,t){switch(So(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Wt(ze),bn(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return hs(t),null;case 31:if(t.memoizedState!==null){if(ht(t),t.alternate===null)throw Error(c(340));Pa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ht(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(c(340));Pa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ae(Ee),null;case 4:return bn(),null;case 10:return Wt(t.type),null;case 22:case 23:return ht(t),Ho(),e!==null&&Ae(an),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Wt(ze),null;case 25:return null;default:return null}}function Vu(e,t){switch(So(t),t.tag){case 3:Wt(ze),bn();break;case 26:case 27:case 5:hs(t);break;case 4:bn();break;case 31:t.memoizedState!==null&&ht(t);break;case 13:ht(t);break;case 19:Ae(Ee);break;case 10:Wt(t.type);break;case 22:case 23:ht(t),Ho(),e!==null&&Ae(an);break;case 24:Wt(ze)}}function Gi(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var i=n.next;a=i;do{if((a.tag&e)===e){n=void 0;var s=a.create,l=a.inst;n=s(),l.destroy=n}a=a.next}while(a!==i)}}catch(u){pe(t,t.return,u)}}function Oa(e,t,a){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){var l=n.inst,u=l.destroy;if(u!==void 0){l.destroy=void 0,i=t;var h=a,g=u;try{g()}catch(x){pe(i,h,x)}}}n=n.next}while(n!==s)}}catch(x){pe(t,t.return,x)}}function Ku(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Ud(t,a)}catch(n){pe(e,e.return,n)}}}function Zu(e,t,a){a.props=ln(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){pe(e,t,n)}}function Qi(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(i){pe(e,t,i)}}function Ht(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(i){pe(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(i){pe(e,t,i)}else a.current=null}function Ju(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(i){pe(e,e.return,i)}}function gl(e,t,a){try{var n=e.stateNode;cg(n,e.type,a,t),n[Pe]=t}catch(i){pe(e,e.return,i)}}function Iu(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ja(e.type)||e.tag===4}function bl(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Iu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ja(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function vl(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Kt));else if(n!==4&&(n===27&&ja(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(vl(e,t,a),e=e.sibling;e!==null;)vl(e,t,a),e=e.sibling}function ar(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(n!==4&&(n===27&&ja(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(ar(e,t,a),e=e.sibling;e!==null;)ar(e,t,a),e=e.sibling}function Fu(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Ze(t,n,a),t[Ye]=e,t[Pe]=a}catch(s){pe(e,e.return,s)}}var aa=!1,Ue=!1,yl=!1,Wu=typeof WeakSet=="function"?WeakSet:Set,Ge=null;function Qp(e,t){if(e=e.containerInfo,Ll=Sr,e=cd(e),ho(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var n=a.getSelection&&a.getSelection();if(n&&n.rangeCount!==0){a=n.anchorNode;var i=n.anchorOffset,s=n.focusNode;n=n.focusOffset;try{a.nodeType,s.nodeType}catch{a=null;break e}var l=0,u=-1,h=-1,g=0,x=0,T=e,b=null;t:for(;;){for(var y;T!==a||i!==0&&T.nodeType!==3||(u=l+i),T!==s||n!==0&&T.nodeType!==3||(h=l+n),T.nodeType===3&&(l+=T.nodeValue.length),(y=T.firstChild)!==null;)b=T,T=y;for(;;){if(T===e)break t;if(b===a&&++g===i&&(u=l),b===s&&++x===n&&(h=l),(y=T.nextSibling)!==null)break;T=b,b=T.parentNode}T=y}a=u===-1||h===-1?null:{start:u,end:h}}else a=null}a=a||{start:0,end:0}}else a=null;for(Gl={focusedElem:e,selectionRange:a},Sr=!1,Ge=t;Ge!==null;)if(t=Ge,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ge=e;else for(;Ge!==null;){switch(t=Ge,s=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)i=e[a],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&s!==null){e=void 0,a=t,i=s.memoizedProps,s=s.memoizedState,n=a.stateNode;try{var q=ln(a.type,i);e=n.getSnapshotBeforeUpdate(q,s),n.__reactInternalSnapshotBeforeUpdate=e}catch(X){pe(a,a.return,X)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)Xl(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Xl(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(c(163))}if(e=t.sibling,e!==null){e.return=t.return,Ge=e;break}Ge=t.return}}function $u(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:ia(e,a),n&4&&Gi(5,a);break;case 1:if(ia(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(l){pe(a,a.return,l)}else{var i=ln(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(l){pe(a,a.return,l)}}n&64&&Ku(a),n&512&&Qi(a,a.return);break;case 3:if(ia(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Ud(e,t)}catch(l){pe(a,a.return,l)}}break;case 27:t===null&&n&4&&Fu(a);case 26:case 5:ia(e,a),t===null&&n&4&&Ju(a),n&512&&Qi(a,a.return);break;case 12:ia(e,a);break;case 31:ia(e,a),n&4&&th(e,a);break;case 13:ia(e,a),n&4&&ah(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Wp.bind(null,a),bg(e,a))));break;case 22:if(n=a.memoizedState!==null||aa,!n){t=t!==null&&t.memoizedState!==null||Ue,i=aa;var s=Ue;aa=n,(Ue=t)&&!s?sa(e,a,(a.subtreeFlags&8772)!==0):ia(e,a),aa=i,Ue=s}break;case 30:break;default:ia(e,a)}}function Pu(e){var t=e.alternate;t!==null&&(e.alternate=null,Pu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Jr(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Oe=null,tt=!1;function na(e,t,a){for(a=a.child;a!==null;)eh(e,t,a),a=a.sibling}function eh(e,t,a){if(ot&&typeof ot.onCommitFiberUnmount=="function")try{ot.onCommitFiberUnmount(hi,a)}catch{}switch(a.tag){case 26:Ue||Ht(a,t),na(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Ue||Ht(a,t);var n=Oe,i=tt;ja(a.type)&&(Oe=a.stateNode,tt=!1),na(e,t,a),Wi(a.stateNode),Oe=n,tt=i;break;case 5:Ue||Ht(a,t);case 6:if(n=Oe,i=tt,Oe=null,na(e,t,a),Oe=n,tt=i,Oe!==null)if(tt)try{(Oe.nodeType===9?Oe.body:Oe.nodeName==="HTML"?Oe.ownerDocument.body:Oe).removeChild(a.stateNode)}catch(s){pe(a,t,s)}else try{Oe.removeChild(a.stateNode)}catch(s){pe(a,t,s)}break;case 18:Oe!==null&&(tt?(e=Oe,Kh(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),ti(e)):Kh(Oe,a.stateNode));break;case 4:n=Oe,i=tt,Oe=a.stateNode.containerInfo,tt=!0,na(e,t,a),Oe=n,tt=i;break;case 0:case 11:case 14:case 15:Oa(2,a,t),Ue||Oa(4,a,t),na(e,t,a);break;case 1:Ue||(Ht(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&Zu(a,t,n)),na(e,t,a);break;case 21:na(e,t,a);break;case 22:Ue=(n=Ue)||a.memoizedState!==null,na(e,t,a),Ue=n;break;default:na(e,t,a)}}function th(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ti(e)}catch(a){pe(t,t.return,a)}}}function ah(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ti(e)}catch(a){pe(t,t.return,a)}}function Yp(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Wu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Wu),t;default:throw Error(c(435,e.tag))}}function nr(e,t){var a=Yp(e);t.forEach(function(n){if(!a.has(n)){a.add(n);var i=$p.bind(null,e,n);n.then(i,i)}})}function at(e,t){var a=t.deletions;if(a!==null)for(var n=0;n<a.length;n++){var i=a[n],s=e,l=t,u=l;e:for(;u!==null;){switch(u.tag){case 27:if(ja(u.type)){Oe=u.stateNode,tt=!1;break e}break;case 5:Oe=u.stateNode,tt=!1;break e;case 3:case 4:Oe=u.stateNode.containerInfo,tt=!0;break e}u=u.return}if(Oe===null)throw Error(c(160));eh(s,l,i),Oe=null,tt=!1,s=i.alternate,s!==null&&(s.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)nh(t,e),t=t.sibling}var jt=null;function nh(e,t){var a=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:at(t,e),nt(e),n&4&&(Oa(3,e,e.return),Gi(3,e),Oa(5,e,e.return));break;case 1:at(t,e),nt(e),n&512&&(Ue||a===null||Ht(a,a.return)),n&64&&aa&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:var i=jt;if(at(t,e),nt(e),n&512&&(Ue||a===null||Ht(a,a.return)),n&4){var s=a!==null?a.memoizedState:null;if(n=e.memoizedState,a===null)if(n===null)if(e.stateNode===null){e:{n=e.type,a=e.memoizedProps,i=i.ownerDocument||i;t:switch(n){case"title":s=i.getElementsByTagName("title")[0],(!s||s[pi]||s[Ye]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=i.createElement(n),i.head.insertBefore(s,i.querySelector("head > title"))),Ze(s,n,a),s[Ye]=e,Le(s),n=s;break e;case"link":var l=nm("link","href",i).get(n+(a.href||""));if(l){for(var u=0;u<l.length;u++)if(s=l[u],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){l.splice(u,1);break t}}s=i.createElement(n),Ze(s,n,a),i.head.appendChild(s);break;case"meta":if(l=nm("meta","content",i).get(n+(a.content||""))){for(u=0;u<l.length;u++)if(s=l[u],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){l.splice(u,1);break t}}s=i.createElement(n),Ze(s,n,a),i.head.appendChild(s);break;default:throw Error(c(468,n))}s[Ye]=e,Le(s),n=s}e.stateNode=n}else im(i,e.type,e.stateNode);else e.stateNode=am(i,n,e.memoizedProps);else s!==n?(s===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):s.count--,n===null?im(i,e.type,e.stateNode):am(i,n,e.memoizedProps)):n===null&&e.stateNode!==null&&gl(e,e.memoizedProps,a.memoizedProps)}break;case 27:at(t,e),nt(e),n&512&&(Ue||a===null||Ht(a,a.return)),a!==null&&n&4&&gl(e,e.memoizedProps,a.memoizedProps);break;case 5:if(at(t,e),nt(e),n&512&&(Ue||a===null||Ht(a,a.return)),e.flags&32){i=e.stateNode;try{Tn(i,"")}catch(q){pe(e,e.return,q)}}n&4&&e.stateNode!=null&&(i=e.memoizedProps,gl(e,i,a!==null?a.memoizedProps:i)),n&1024&&(yl=!0);break;case 6:if(at(t,e),nt(e),n&4){if(e.stateNode===null)throw Error(c(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n}catch(q){pe(e,e.return,q)}}break;case 3:if(yr=null,i=jt,jt=br(t.containerInfo),at(t,e),jt=i,nt(e),n&4&&a!==null&&a.memoizedState.isDehydrated)try{ti(t.containerInfo)}catch(q){pe(e,e.return,q)}yl&&(yl=!1,ih(e));break;case 4:n=jt,jt=br(e.stateNode.containerInfo),at(t,e),nt(e),jt=n;break;case 12:at(t,e),nt(e);break;case 31:at(t,e),nt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,nr(e,n)));break;case 13:at(t,e),nt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(sr=rt()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,nr(e,n)));break;case 22:i=e.memoizedState!==null;var h=a!==null&&a.memoizedState!==null,g=aa,x=Ue;if(aa=g||i,Ue=x||h,at(t,e),Ue=x,aa=g,nt(e),n&8192)e:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(a===null||h||aa||Ue||cn(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){h=a=t;try{if(s=h.stateNode,i)l=s.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none";else{u=h.stateNode;var T=h.memoizedProps.style,b=T!=null&&T.hasOwnProperty("display")?T.display:null;u.style.display=b==null||typeof b=="boolean"?"":(""+b).trim()}}catch(q){pe(h,h.return,q)}}}else if(t.tag===6){if(a===null){h=t;try{h.stateNode.nodeValue=i?"":h.memoizedProps}catch(q){pe(h,h.return,q)}}}else if(t.tag===18){if(a===null){h=t;try{var y=h.stateNode;i?Zh(y,!0):Zh(h.stateNode,!1)}catch(q){pe(h,h.return,q)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,nr(e,a))));break;case 19:at(t,e),nt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,nr(e,n)));break;case 30:break;case 21:break;default:at(t,e),nt(e)}}function nt(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if(Iu(n)){a=n;break}n=n.return}if(a==null)throw Error(c(160));switch(a.tag){case 27:var i=a.stateNode,s=bl(e);ar(e,s,i);break;case 5:var l=a.stateNode;a.flags&32&&(Tn(l,""),a.flags&=-33);var u=bl(e);ar(e,u,l);break;case 3:case 4:var h=a.stateNode.containerInfo,g=bl(e);vl(e,g,h);break;default:throw Error(c(161))}}catch(x){pe(e,e.return,x)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ih(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ih(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ia(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)$u(e,t.alternate,t),t=t.sibling}function cn(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Oa(4,t,t.return),cn(t);break;case 1:Ht(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&Zu(t,t.return,a),cn(t);break;case 27:Wi(t.stateNode);case 26:case 5:Ht(t,t.return),cn(t);break;case 22:t.memoizedState===null&&cn(t);break;case 30:cn(t);break;default:cn(t)}e=e.sibling}}function sa(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,i=e,s=t,l=s.flags;switch(s.tag){case 0:case 11:case 15:sa(i,s,a),Gi(4,s);break;case 1:if(sa(i,s,a),n=s,i=n.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(g){pe(n,n.return,g)}if(n=s,i=n.updateQueue,i!==null){var u=n.stateNode;try{var h=i.shared.hiddenCallbacks;if(h!==null)for(i.shared.hiddenCallbacks=null,i=0;i<h.length;i++)qd(h[i],u)}catch(g){pe(n,n.return,g)}}a&&l&64&&Ku(s),Qi(s,s.return);break;case 27:Fu(s);case 26:case 5:sa(i,s,a),a&&n===null&&l&4&&Ju(s),Qi(s,s.return);break;case 12:sa(i,s,a);break;case 31:sa(i,s,a),a&&l&4&&th(i,s);break;case 13:sa(i,s,a),a&&l&4&&ah(i,s);break;case 22:s.memoizedState===null&&sa(i,s,a),Qi(s,s.return);break;case 30:break;default:sa(i,s,a)}t=t.sibling}}function xl(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Ci(a))}function wl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ci(e))}function zt(e,t,a,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)sh(e,t,a,n),t=t.sibling}function sh(e,t,a,n){var i=t.flags;switch(t.tag){case 0:case 11:case 15:zt(e,t,a,n),i&2048&&Gi(9,t);break;case 1:zt(e,t,a,n);break;case 3:zt(e,t,a,n),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ci(e)));break;case 12:if(i&2048){zt(e,t,a,n),e=t.stateNode;try{var s=t.memoizedProps,l=s.id,u=s.onPostCommit;typeof u=="function"&&u(l,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(h){pe(t,t.return,h)}}else zt(e,t,a,n);break;case 31:zt(e,t,a,n);break;case 13:zt(e,t,a,n);break;case 23:break;case 22:s=t.stateNode,l=t.alternate,t.memoizedState!==null?s._visibility&2?zt(e,t,a,n):Yi(e,t):s._visibility&2?zt(e,t,a,n):(s._visibility|=2,Xn(e,t,a,n,(t.subtreeFlags&10256)!==0||!1)),i&2048&&xl(l,t);break;case 24:zt(e,t,a,n),i&2048&&wl(t.alternate,t);break;default:zt(e,t,a,n)}}function Xn(e,t,a,n,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,l=t,u=a,h=n,g=l.flags;switch(l.tag){case 0:case 11:case 15:Xn(s,l,u,h,i),Gi(8,l);break;case 23:break;case 22:var x=l.stateNode;l.memoizedState!==null?x._visibility&2?Xn(s,l,u,h,i):Yi(s,l):(x._visibility|=2,Xn(s,l,u,h,i)),i&&g&2048&&xl(l.alternate,l);break;case 24:Xn(s,l,u,h,i),i&&g&2048&&wl(l.alternate,l);break;default:Xn(s,l,u,h,i)}t=t.sibling}}function Yi(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,i=n.flags;switch(n.tag){case 22:Yi(a,n),i&2048&&xl(n.alternate,n);break;case 24:Yi(a,n),i&2048&&wl(n.alternate,n);break;default:Yi(a,n)}t=t.sibling}}var Xi=8192;function Vn(e,t,a){if(e.subtreeFlags&Xi)for(e=e.child;e!==null;)rh(e,t,a),e=e.sibling}function rh(e,t,a){switch(e.tag){case 26:Vn(e,t,a),e.flags&Xi&&e.memoizedState!==null&&Dg(a,jt,e.memoizedState,e.memoizedProps);break;case 5:Vn(e,t,a);break;case 3:case 4:var n=jt;jt=br(e.stateNode.containerInfo),Vn(e,t,a),jt=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=Xi,Xi=16777216,Vn(e,t,a),Xi=n):Vn(e,t,a));break;default:Vn(e,t,a)}}function oh(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Vi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Ge=n,ch(n,e)}oh(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)lh(e),e=e.sibling}function lh(e){switch(e.tag){case 0:case 11:case 15:Vi(e),e.flags&2048&&Oa(9,e,e.return);break;case 3:Vi(e);break;case 12:Vi(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ir(e)):Vi(e);break;default:Vi(e)}}function ir(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Ge=n,ch(n,e)}oh(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Oa(8,t,t.return),ir(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,ir(t));break;default:ir(t)}e=e.sibling}}function ch(e,t){for(;Ge!==null;){var a=Ge;switch(a.tag){case 0:case 11:case 15:Oa(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:Ci(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,Ge=n;else e:for(a=e;Ge!==null;){n=Ge;var i=n.sibling,s=n.return;if(Pu(n),n===a){Ge=null;break e}if(i!==null){i.return=s,Ge=i;break e}Ge=s}}}var Xp={getCacheForType:function(e){var t=Ve(ze),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return Ve(ze).controller.signal}},Vp=typeof WeakMap=="function"?WeakMap:Map,ue=0,xe=null,ee=null,ne=0,fe=0,mt=null,Aa=!1,Kn=!1,kl=!1,ra=0,De=0,Na=0,dn=0,Sl=0,ft=0,Zn=0,Ki=null,it=null,Tl=!1,sr=0,dh=0,rr=1/0,or=null,Ca=null,_e=0,Da=null,Jn=null,oa=0,Ol=0,Al=null,uh=null,Zi=0,Nl=null;function pt(){return(ue&2)!==0&&ne!==0?ne&-ne:S.T!==null?zl():Nc()}function hh(){if(ft===0)if((ne&536870912)===0||re){var e=ps;ps<<=1,(ps&3932160)===0&&(ps=262144),ft=e}else ft=536870912;return e=ut.current,e!==null&&(e.flags|=32),ft}function st(e,t,a){(e===xe&&(fe===2||fe===9)||e.cancelPendingCommit!==null)&&(In(e,0),Ra(e,ne,ft,!1)),fi(e,a),((ue&2)===0||e!==xe)&&(e===xe&&((ue&2)===0&&(dn|=a),De===4&&Ra(e,ne,ft,!1)),Bt(e))}function mh(e,t,a){if((ue&6)!==0)throw Error(c(327));var n=!a&&(t&127)===0&&(t&e.expiredLanes)===0||mi(e,t),i=n?Jp(e,t):Dl(e,t,!0),s=n;do{if(i===0){Kn&&!n&&Ra(e,t,0,!1);break}else{if(a=e.current.alternate,s&&!Kp(a)){i=Dl(e,t,!1),s=!1;continue}if(i===2){if(s=t,e.errorRecoveryDisabledLanes&s)var l=0;else l=e.pendingLanes&-536870913,l=l!==0?l:l&536870912?536870912:0;if(l!==0){t=l;e:{var u=e;i=Ki;var h=u.current.memoizedState.isDehydrated;if(h&&(In(u,l).flags|=256),l=Dl(u,l,!1),l!==2){if(kl&&!h){u.errorRecoveryDisabledLanes|=s,dn|=s,i=4;break e}s=it,it=i,s!==null&&(it===null?it=s:it.push.apply(it,s))}i=l}if(s=!1,i!==2)continue}}if(i===1){In(e,0),Ra(e,t,0,!0);break}e:{switch(n=e,s=i,s){case 0:case 1:throw Error(c(345));case 4:if((t&4194048)!==t)break;case 6:Ra(n,t,ft,!Aa);break e;case 2:it=null;break;case 3:case 5:break;default:throw Error(c(329))}if((t&62914560)===t&&(i=sr+300-rt(),10<i)){if(Ra(n,t,ft,!Aa),bs(n,0,!0)!==0)break e;oa=t,n.timeoutHandle=Xh(fh.bind(null,n,a,it,or,Tl,t,ft,dn,Zn,Aa,s,"Throttled",-0,0),i);break e}fh(n,a,it,or,Tl,t,ft,dn,Zn,Aa,s,null,-0,0)}}break}while(!0);Bt(e)}function fh(e,t,a,n,i,s,l,u,h,g,x,T,b,y){if(e.timeoutHandle=-1,T=t.subtreeFlags,T&8192||(T&16785408)===16785408){T={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Kt},rh(t,s,T);var q=(s&62914560)===s?sr-rt():(s&4194048)===s?dh-rt():0;if(q=Rg(T,q),q!==null){oa=s,e.cancelPendingCommit=q(kh.bind(null,e,t,s,a,n,i,l,u,h,x,T,null,b,y)),Ra(e,s,l,!g);return}}kh(e,t,s,a,n,i,l,u,h)}function Kp(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var i=a[n],s=i.getSnapshot;i=i.value;try{if(!ct(s(),i))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ra(e,t,a,n){t&=~Sl,t&=~dn,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var i=t;0<i;){var s=31-lt(i),l=1<<s;n[s]=-1,i&=~l}a!==0&&Tc(e,a,t)}function lr(){return(ue&6)===0?(Ji(0),!1):!0}function Cl(){if(ee!==null){if(fe===0)var e=ee.return;else e=ee,Ft=en=null,Xo(e),Bn=null,Ri=0,e=ee;for(;e!==null;)Vu(e.alternate,e),e=e.return;ee=null}}function In(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,hg(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),oa=0,Cl(),xe=e,ee=a=Jt(e.current,null),ne=t,fe=0,mt=null,Aa=!1,Kn=mi(e,t),kl=!1,Zn=ft=Sl=dn=Na=De=0,it=Ki=null,Tl=!1,(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-lt(n),s=1<<i;t|=e[i],n&=~s}return ra=t,Ds(),a}function ph(e,t){W=null,S.H=Hi,t===Hn||t===_s?(t=Ed(),fe=3):t===jo?(t=Ed(),fe=4):fe=t===rl?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,mt=t,ee===null&&(De=1,Ws(e,kt(t,e.current)))}function gh(){var e=ut.current;return e===null?!0:(ne&4194048)===ne?At===null:(ne&62914560)===ne||(ne&536870912)!==0?e===At:!1}function bh(){var e=S.H;return S.H=Hi,e===null?Hi:e}function vh(){var e=S.A;return S.A=Xp,e}function cr(){De=4,Aa||(ne&4194048)!==ne&&ut.current!==null||(Kn=!0),(Na&134217727)===0&&(dn&134217727)===0||xe===null||Ra(xe,ne,ft,!1)}function Dl(e,t,a){var n=ue;ue|=2;var i=bh(),s=vh();(xe!==e||ne!==t)&&(or=null,In(e,t)),t=!1;var l=De;e:do try{if(fe!==0&&ee!==null){var u=ee,h=mt;switch(fe){case 8:Cl(),l=6;break e;case 3:case 2:case 9:case 6:ut.current===null&&(t=!0);var g=fe;if(fe=0,mt=null,Fn(e,u,h,g),a&&Kn){l=0;break e}break;default:g=fe,fe=0,mt=null,Fn(e,u,h,g)}}Zp(),l=De;break}catch(x){ph(e,x)}while(!0);return t&&e.shellSuspendCounter++,Ft=en=null,ue=n,S.H=i,S.A=s,ee===null&&(xe=null,ne=0,Ds()),l}function Zp(){for(;ee!==null;)yh(ee)}function Jp(e,t){var a=ue;ue|=2;var n=bh(),i=vh();xe!==e||ne!==t?(or=null,rr=rt()+500,In(e,t)):Kn=mi(e,t);e:do try{if(fe!==0&&ee!==null){t=ee;var s=mt;t:switch(fe){case 1:fe=0,mt=null,Fn(e,t,s,1);break;case 2:case 9:if(Dd(s)){fe=0,mt=null,xh(t);break}t=function(){fe!==2&&fe!==9||xe!==e||(fe=7),Bt(e)},s.then(t,t);break e;case 3:fe=7;break e;case 4:fe=5;break e;case 7:Dd(s)?(fe=0,mt=null,xh(t)):(fe=0,mt=null,Fn(e,t,s,7));break;case 5:var l=null;switch(ee.tag){case 26:l=ee.memoizedState;case 5:case 27:var u=ee;if(l?sm(l):u.stateNode.complete){fe=0,mt=null;var h=u.sibling;if(h!==null)ee=h;else{var g=u.return;g!==null?(ee=g,dr(g)):ee=null}break t}}fe=0,mt=null,Fn(e,t,s,5);break;case 6:fe=0,mt=null,Fn(e,t,s,6);break;case 8:Cl(),De=6;break e;default:throw Error(c(462))}}Ip();break}catch(x){ph(e,x)}while(!0);return Ft=en=null,S.H=n,S.A=i,ue=a,ee!==null?0:(xe=null,ne=0,Ds(),De)}function Ip(){for(;ee!==null&&!vf();)yh(ee)}function yh(e){var t=Yu(e.alternate,e,ra);e.memoizedProps=e.pendingProps,t===null?dr(e):ee=t}function xh(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=_u(a,t,t.pendingProps,t.type,void 0,ne);break;case 11:t=_u(a,t,t.pendingProps,t.type.render,t.ref,ne);break;case 5:Xo(t);default:Vu(a,t),t=ee=vd(t,ra),t=Yu(a,t,ra)}e.memoizedProps=e.pendingProps,t===null?dr(e):ee=t}function Fn(e,t,a,n){Ft=en=null,Xo(t),Bn=null,Ri=0;var i=t.return;try{if(_p(e,i,t,a,ne)){De=1,Ws(e,kt(a,e.current)),ee=null;return}}catch(s){if(i!==null)throw ee=i,s;De=1,Ws(e,kt(a,e.current)),ee=null;return}t.flags&32768?(re||n===1?e=!0:Kn||(ne&536870912)!==0?e=!1:(Aa=e=!0,(n===2||n===9||n===3||n===6)&&(n=ut.current,n!==null&&n.tag===13&&(n.flags|=16384))),wh(t,e)):dr(t)}function dr(e){var t=e;do{if((t.flags&32768)!==0){wh(t,Aa);return}e=t.return;var a=Lp(t.alternate,t,ra);if(a!==null){ee=a;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);De===0&&(De=5)}function wh(e,t){do{var a=Gp(e.alternate,e);if(a!==null){a.flags&=32767,ee=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){ee=e;return}ee=e=a}while(e!==null);De=6,ee=null}function kh(e,t,a,n,i,s,l,u,h){e.cancelPendingCommit=null;do ur();while(_e!==0);if((ue&6)!==0)throw Error(c(327));if(t!==null){if(t===e.current)throw Error(c(177));if(s=t.lanes|t.childLanes,s|=bo,Cf(e,a,s,l,u,h),e===xe&&(ee=xe=null,ne=0),Jn=t,Da=e,oa=a,Ol=s,Al=i,uh=n,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Pp(ms,function(){return Nh(),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=S.T,S.T=null,i=z.p,z.p=2,l=ue,ue|=4;try{Qp(e,t,a)}finally{ue=l,z.p=i,S.T=n}}_e=1,Sh(),Th(),Oh()}}function Sh(){if(_e===1){_e=0;var e=Da,t=Jn,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=S.T,S.T=null;var n=z.p;z.p=2;var i=ue;ue|=4;try{nh(t,e);var s=Gl,l=cd(e.containerInfo),u=s.focusedElem,h=s.selectionRange;if(l!==u&&u&&u.ownerDocument&&ld(u.ownerDocument.documentElement,u)){if(h!==null&&ho(u)){var g=h.start,x=h.end;if(x===void 0&&(x=g),"selectionStart"in u)u.selectionStart=g,u.selectionEnd=Math.min(x,u.value.length);else{var T=u.ownerDocument||document,b=T&&T.defaultView||window;if(b.getSelection){var y=b.getSelection(),q=u.textContent.length,X=Math.min(h.start,q),ye=h.end===void 0?X:Math.min(h.end,q);!y.extend&&X>ye&&(l=ye,ye=X,X=l);var f=od(u,X),m=od(u,ye);if(f&&m&&(y.rangeCount!==1||y.anchorNode!==f.node||y.anchorOffset!==f.offset||y.focusNode!==m.node||y.focusOffset!==m.offset)){var p=T.createRange();p.setStart(f.node,f.offset),y.removeAllRanges(),X>ye?(y.addRange(p),y.extend(m.node,m.offset)):(p.setEnd(m.node,m.offset),y.addRange(p))}}}}for(T=[],y=u;y=y.parentNode;)y.nodeType===1&&T.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<T.length;u++){var k=T[u];k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}Sr=!!Ll,Gl=Ll=null}finally{ue=i,z.p=n,S.T=a}}e.current=t,_e=2}}function Th(){if(_e===2){_e=0;var e=Da,t=Jn,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=S.T,S.T=null;var n=z.p;z.p=2;var i=ue;ue|=4;try{$u(e,t.alternate,t)}finally{ue=i,z.p=n,S.T=a}}_e=3}}function Oh(){if(_e===4||_e===3){_e=0,yf();var e=Da,t=Jn,a=oa,n=uh;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?_e=5:(_e=0,Jn=Da=null,Ah(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(Ca=null),Kr(a),t=t.stateNode,ot&&typeof ot.onCommitFiberRoot=="function")try{ot.onCommitFiberRoot(hi,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=S.T,i=z.p,z.p=2,S.T=null;try{for(var s=e.onRecoverableError,l=0;l<n.length;l++){var u=n[l];s(u.value,{componentStack:u.stack})}}finally{S.T=t,z.p=i}}(oa&3)!==0&&ur(),Bt(e),i=e.pendingLanes,(a&261930)!==0&&(i&42)!==0?e===Nl?Zi++:(Zi=0,Nl=e):Zi=0,Ji(0)}}function Ah(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ci(t)))}function ur(){return Sh(),Th(),Oh(),Nh()}function Nh(){if(_e!==5)return!1;var e=Da,t=Ol;Ol=0;var a=Kr(oa),n=S.T,i=z.p;try{z.p=32>a?32:a,S.T=null,a=Al,Al=null;var s=Da,l=oa;if(_e=0,Jn=Da=null,oa=0,(ue&6)!==0)throw Error(c(331));var u=ue;if(ue|=4,lh(s.current),sh(s,s.current,l,a),ue=u,Ji(0,!1),ot&&typeof ot.onPostCommitFiberRoot=="function")try{ot.onPostCommitFiberRoot(hi,s)}catch{}return!0}finally{z.p=i,S.T=n,Ah(e,t)}}function Ch(e,t,a){t=kt(a,t),t=sl(e.stateNode,t,2),e=ka(e,t,2),e!==null&&(fi(e,2),Bt(e))}function pe(e,t,a){if(e.tag===3)Ch(e,e,a);else for(;t!==null;){if(t.tag===3){Ch(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Ca===null||!Ca.has(n))){e=kt(a,e),a=Du(2),n=ka(t,a,2),n!==null&&(Ru(a,n,t,e),fi(n,2),Bt(n));break}}t=t.return}}function Rl(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new Vp;var i=new Set;n.set(t,i)}else i=n.get(t),i===void 0&&(i=new Set,n.set(t,i));i.has(a)||(kl=!0,i.add(a),e=Fp.bind(null,e,t,a),t.then(e,e))}function Fp(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,xe===e&&(ne&a)===a&&(De===4||De===3&&(ne&62914560)===ne&&300>rt()-sr?(ue&2)===0&&In(e,0):Sl|=a,Zn===ne&&(Zn=0)),Bt(e)}function Dh(e,t){t===0&&(t=Sc()),e=Wa(e,t),e!==null&&(fi(e,t),Bt(e))}function Wp(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Dh(e,a)}function $p(e,t){var a=0;switch(e.tag){case 31:case 13:var n=e.stateNode,i=e.memoizedState;i!==null&&(a=i.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(c(314))}n!==null&&n.delete(t),Dh(e,a)}function Pp(e,t){return Qr(e,t)}var hr=null,Wn=null,El=!1,mr=!1,jl=!1,Ea=0;function Bt(e){e!==Wn&&e.next===null&&(Wn===null?hr=Wn=e:Wn=Wn.next=e),mr=!0,El||(El=!0,tg())}function Ji(e,t){if(!jl&&mr){jl=!0;do for(var a=!1,n=hr;n!==null;){if(e!==0){var i=n.pendingLanes;if(i===0)var s=0;else{var l=n.suspendedLanes,u=n.pingedLanes;s=(1<<31-lt(42|e)+1)-1,s&=i&~(l&~u),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(a=!0,zh(n,s))}else s=ne,s=bs(n,n===xe?s:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(s&3)===0||mi(n,s)||(a=!0,zh(n,s));n=n.next}while(a);jl=!1}}function eg(){Rh()}function Rh(){mr=El=!1;var e=0;Ea!==0&&ug()&&(e=Ea);for(var t=rt(),a=null,n=hr;n!==null;){var i=n.next,s=Eh(n,t);s===0?(n.next=null,a===null?hr=i:a.next=i,i===null&&(Wn=a)):(a=n,(e!==0||(s&3)!==0)&&(mr=!0)),n=i}_e!==0&&_e!==5||Ji(e),Ea!==0&&(Ea=0)}function Eh(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var l=31-lt(s),u=1<<l,h=i[l];h===-1?((u&a)===0||(u&n)!==0)&&(i[l]=Nf(u,t)):h<=t&&(e.expiredLanes|=u),s&=~u}if(t=xe,a=ne,a=bs(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(fe===2||fe===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&Yr(n),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||mi(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&Yr(n),Kr(a)){case 2:case 8:a=wc;break;case 32:a=ms;break;case 268435456:a=kc;break;default:a=ms}return n=jh.bind(null,e),a=Qr(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&Yr(n),e.callbackPriority=2,e.callbackNode=null,2}function jh(e,t){if(_e!==0&&_e!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(ur()&&e.callbackNode!==a)return null;var n=ne;return n=bs(e,e===xe?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(mh(e,n,t),Eh(e,rt()),e.callbackNode!=null&&e.callbackNode===a?jh.bind(null,e):null)}function zh(e,t){if(ur())return null;mh(e,t,!0)}function tg(){mg(function(){(ue&6)!==0?Qr(xc,eg):Rh()})}function zl(){if(Ea===0){var e=Un;e===0&&(e=fs,fs<<=1,(fs&261888)===0&&(fs=256)),Ea=e}return Ea}function Mh(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ws(""+e)}function qh(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function ag(e,t,a,n,i){if(t==="submit"&&a&&a.stateNode===i){var s=Mh((i[Pe]||null).action),l=n.submitter;l&&(t=(t=l[Pe]||null)?Mh(t.formAction):l.getAttribute("formAction"),t!==null&&(s=t,l=null));var u=new Os("action","action",null,n,i);e.push({event:u,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(Ea!==0){var h=l?qh(i,l):new FormData(i);Po(a,{pending:!0,data:h,method:i.method,action:s},null,h)}}else typeof s=="function"&&(u.preventDefault(),h=l?qh(i,l):new FormData(i),Po(a,{pending:!0,data:h,method:i.method,action:s},s,h))},currentTarget:i}]})}}for(var Ml=0;Ml<go.length;Ml++){var ql=go[Ml],ng=ql.toLowerCase(),ig=ql[0].toUpperCase()+ql.slice(1);Et(ng,"on"+ig)}Et(hd,"onAnimationEnd"),Et(md,"onAnimationIteration"),Et(fd,"onAnimationStart"),Et("dblclick","onDoubleClick"),Et("focusin","onFocus"),Et("focusout","onBlur"),Et(xp,"onTransitionRun"),Et(wp,"onTransitionStart"),Et(kp,"onTransitionCancel"),Et(pd,"onTransitionEnd"),kn("onMouseEnter",["mouseout","mouseover"]),kn("onMouseLeave",["mouseout","mouseover"]),kn("onPointerEnter",["pointerout","pointerover"]),kn("onPointerLeave",["pointerout","pointerover"]),Za("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Za("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Za("onBeforeInput",["compositionend","keypress","textInput","paste"]),Za("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Za("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Za("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ii="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sg=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ii));function Uh(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],i=n.event;n=n.listeners;e:{var s=void 0;if(t)for(var l=n.length-1;0<=l;l--){var u=n[l],h=u.instance,g=u.currentTarget;if(u=u.listener,h!==s&&i.isPropagationStopped())break e;s=u,i.currentTarget=g;try{s(i)}catch(x){Cs(x)}i.currentTarget=null,s=h}else for(l=0;l<n.length;l++){if(u=n[l],h=u.instance,g=u.currentTarget,u=u.listener,h!==s&&i.isPropagationStopped())break e;s=u,i.currentTarget=g;try{s(i)}catch(x){Cs(x)}i.currentTarget=null,s=h}}}}function te(e,t){var a=t[Zr];a===void 0&&(a=t[Zr]=new Set);var n=e+"__bubble";a.has(n)||(_h(t,e,2,!1),a.add(n))}function Ul(e,t,a){var n=0;t&&(n|=4),_h(a,e,n,t)}var fr="_reactListening"+Math.random().toString(36).slice(2);function _l(e){if(!e[fr]){e[fr]=!0,Rc.forEach(function(a){a!=="selectionchange"&&(sg.has(a)||Ul(a,!1,e),Ul(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[fr]||(t[fr]=!0,Ul("selectionchange",!1,t))}}function _h(e,t,a,n){switch(hm(t)){case 2:var i=zg;break;case 8:i=Mg;break;default:i=$l}a=i.bind(null,t,a,e),i=void 0,!ao||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),n?i!==void 0?e.addEventListener(t,a,{capture:!0,passive:i}):e.addEventListener(t,a,!0):i!==void 0?e.addEventListener(t,a,{passive:i}):e.addEventListener(t,a,!1)}function Hl(e,t,a,n,i){var s=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var l=n.tag;if(l===3||l===4){var u=n.stateNode.containerInfo;if(u===i)break;if(l===4)for(l=n.return;l!==null;){var h=l.tag;if((h===3||h===4)&&l.stateNode.containerInfo===i)return;l=l.return}for(;u!==null;){if(l=yn(u),l===null)return;if(h=l.tag,h===5||h===6||h===26||h===27){n=s=l;continue e}u=u.parentNode}}n=n.return}Qc(function(){var g=s,x=eo(a),T=[];e:{var b=gd.get(e);if(b!==void 0){var y=Os,q=e;switch(e){case"keypress":if(Ss(a)===0)break e;case"keydown":case"keyup":y=$f;break;case"focusin":q="focus",y=ro;break;case"focusout":q="blur",y=ro;break;case"beforeblur":case"afterblur":y=ro;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Vc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Lf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=tp;break;case hd:case md:case fd:y=Yf;break;case pd:y=np;break;case"scroll":case"scrollend":y=Hf;break;case"wheel":y=sp;break;case"copy":case"cut":case"paste":y=Vf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Zc;break;case"toggle":case"beforetoggle":y=op}var X=(t&4)!==0,ye=!X&&(e==="scroll"||e==="scrollend"),f=X?b!==null?b+"Capture":null:b;X=[];for(var m=g,p;m!==null;){var k=m;if(p=k.stateNode,k=k.tag,k!==5&&k!==26&&k!==27||p===null||f===null||(k=bi(m,f),k!=null&&X.push(Fi(m,k,p))),ye)break;m=m.return}0<X.length&&(b=new y(b,q,null,a,x),T.push({event:b,listeners:X}))}}if((t&7)===0){e:{if(b=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",b&&a!==Pr&&(q=a.relatedTarget||a.fromElement)&&(yn(q)||q[vn]))break e;if((y||b)&&(b=x.window===x?x:(b=x.ownerDocument)?b.defaultView||b.parentWindow:window,y?(q=a.relatedTarget||a.toElement,y=g,q=q?yn(q):null,q!==null&&(ye=O(q),X=q.tag,q!==ye||X!==5&&X!==27&&X!==6)&&(q=null)):(y=null,q=g),y!==q)){if(X=Vc,k="onMouseLeave",f="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(X=Zc,k="onPointerLeave",f="onPointerEnter",m="pointer"),ye=y==null?b:gi(y),p=q==null?b:gi(q),b=new X(k,m+"leave",y,a,x),b.target=ye,b.relatedTarget=p,k=null,yn(x)===g&&(X=new X(f,m+"enter",q,a,x),X.target=p,X.relatedTarget=ye,k=X),ye=k,y&&q)t:{for(X=rg,f=y,m=q,p=0,k=f;k;k=X(k))p++;k=0;for(var B=m;B;B=X(B))k++;for(;0<p-k;)f=X(f),p--;for(;0<k-p;)m=X(m),k--;for(;p--;){if(f===m||m!==null&&f===m.alternate){X=f;break t}f=X(f),m=X(m)}X=null}else X=null;y!==null&&Hh(T,b,y,X,!1),q!==null&&ye!==null&&Hh(T,ye,q,X,!0)}}e:{if(b=g?gi(g):window,y=b.nodeName&&b.nodeName.toLowerCase(),y==="select"||y==="input"&&b.type==="file")var le=td;else if(Pc(b))if(ad)le=bp;else{le=pp;var _=fp}else y=b.nodeName,!y||y.toLowerCase()!=="input"||b.type!=="checkbox"&&b.type!=="radio"?g&&$r(g.elementType)&&(le=td):le=gp;if(le&&(le=le(e,g))){ed(T,le,a,x);break e}_&&_(e,b,g),e==="focusout"&&g&&b.type==="number"&&g.memoizedProps.value!=null&&Wr(b,"number",b.value)}switch(_=g?gi(g):window,e){case"focusin":(Pc(_)||_.contentEditable==="true")&&(Cn=_,mo=g,Oi=null);break;case"focusout":Oi=mo=Cn=null;break;case"mousedown":fo=!0;break;case"contextmenu":case"mouseup":case"dragend":fo=!1,dd(T,a,x);break;case"selectionchange":if(yp)break;case"keydown":case"keyup":dd(T,a,x)}var $;if(lo)e:{switch(e){case"compositionstart":var ie="onCompositionStart";break e;case"compositionend":ie="onCompositionEnd";break e;case"compositionupdate":ie="onCompositionUpdate";break e}ie=void 0}else Nn?Wc(e,a)&&(ie="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ie="onCompositionStart");ie&&(Jc&&a.locale!=="ko"&&(Nn||ie!=="onCompositionStart"?ie==="onCompositionEnd"&&Nn&&($=Yc()):(pa=x,no="value"in pa?pa.value:pa.textContent,Nn=!0)),_=pr(g,ie),0<_.length&&(ie=new Kc(ie,e,null,a,x),T.push({event:ie,listeners:_}),$?ie.data=$:($=$c(a),$!==null&&(ie.data=$)))),($=cp?dp(e,a):up(e,a))&&(ie=pr(g,"onBeforeInput"),0<ie.length&&(_=new Kc("onBeforeInput","beforeinput",null,a,x),T.push({event:_,listeners:ie}),_.data=$)),ag(T,e,g,a,x)}Uh(T,t)})}function Fi(e,t,a){return{instance:e,listener:t,currentTarget:a}}function pr(e,t){for(var a=t+"Capture",n=[];e!==null;){var i=e,s=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||s===null||(i=bi(e,a),i!=null&&n.unshift(Fi(e,i,s)),i=bi(e,t),i!=null&&n.push(Fi(e,i,s))),e.tag===3)return n;e=e.return}return[]}function rg(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Hh(e,t,a,n,i){for(var s=t._reactName,l=[];a!==null&&a!==n;){var u=a,h=u.alternate,g=u.stateNode;if(u=u.tag,h!==null&&h===n)break;u!==5&&u!==26&&u!==27||g===null||(h=g,i?(g=bi(a,s),g!=null&&l.unshift(Fi(a,g,h))):i||(g=bi(a,s),g!=null&&l.push(Fi(a,g,h)))),a=a.return}l.length!==0&&e.push({event:t,listeners:l})}var og=/\r\n?/g,lg=/\u0000|\uFFFD/g;function Bh(e){return(typeof e=="string"?e:""+e).replace(og,`
`).replace(lg,"")}function Lh(e,t){return t=Bh(t),Bh(e)===t}function ve(e,t,a,n,i,s){switch(a){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||Tn(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&Tn(e,""+n);break;case"className":ys(e,"class",n);break;case"tabIndex":ys(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":ys(e,a,n);break;case"style":Lc(e,n,s);break;case"data":if(t!=="object"){ys(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=ws(""+n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(a==="formAction"?(t!=="input"&&ve(e,t,"name",i.name,i,null),ve(e,t,"formEncType",i.formEncType,i,null),ve(e,t,"formMethod",i.formMethod,i,null),ve(e,t,"formTarget",i.formTarget,i,null)):(ve(e,t,"encType",i.encType,i,null),ve(e,t,"method",i.method,i,null),ve(e,t,"target",i.target,i,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=ws(""+n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=Kt);break;case"onScroll":n!=null&&te("scroll",e);break;case"onScrollEnd":n!=null&&te("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=ws(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""+n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":te("beforetoggle",e),te("toggle",e),vs(e,"popover",n);break;case"xlinkActuate":Vt(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":Vt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":Vt(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":Vt(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":Vt(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":Vt(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":vs(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Uf.get(a)||a,vs(e,a,n))}}function Bl(e,t,a,n,i,s){switch(a){case"style":Lc(e,n,s);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"children":typeof n=="string"?Tn(e,n):(typeof n=="number"||typeof n=="bigint")&&Tn(e,""+n);break;case"onScroll":n!=null&&te("scroll",e);break;case"onScrollEnd":n!=null&&te("scrollend",e);break;case"onClick":n!=null&&(e.onclick=Kt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ec.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(i=a.endsWith("Capture"),t=a.slice(2,i?a.length-7:void 0),s=e[Pe]||null,s=s!=null?s[a]:null,typeof s=="function"&&e.removeEventListener(t,s,i),typeof n=="function")){typeof s!="function"&&s!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,n,i);break e}a in e?e[a]=n:n===!0?e.setAttribute(a,""):vs(e,a,n)}}}function Ze(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":te("error",e),te("load",e);var n=!1,i=!1,s;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];if(l!=null)switch(s){case"src":n=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:ve(e,t,s,l,a,null)}}i&&ve(e,t,"srcSet",a.srcSet,a,null),n&&ve(e,t,"src",a.src,a,null);return;case"input":te("invalid",e);var u=s=l=i=null,h=null,g=null;for(n in a)if(a.hasOwnProperty(n)){var x=a[n];if(x!=null)switch(n){case"name":i=x;break;case"type":l=x;break;case"checked":h=x;break;case"defaultChecked":g=x;break;case"value":s=x;break;case"defaultValue":u=x;break;case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(c(137,t));break;default:ve(e,t,n,x,a,null)}}Uc(e,s,u,h,g,l,i,!1);return;case"select":te("invalid",e),n=l=s=null;for(i in a)if(a.hasOwnProperty(i)&&(u=a[i],u!=null))switch(i){case"value":s=u;break;case"defaultValue":l=u;break;case"multiple":n=u;default:ve(e,t,i,u,a,null)}t=s,a=l,e.multiple=!!n,t!=null?Sn(e,!!n,t,!1):a!=null&&Sn(e,!!n,a,!0);return;case"textarea":te("invalid",e),s=i=n=null;for(l in a)if(a.hasOwnProperty(l)&&(u=a[l],u!=null))switch(l){case"value":n=u;break;case"defaultValue":i=u;break;case"children":s=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(c(91));break;default:ve(e,t,l,u,a,null)}Hc(e,n,i,s);return;case"option":for(h in a)if(a.hasOwnProperty(h)&&(n=a[h],n!=null))switch(h){case"selected":e.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:ve(e,t,h,n,a,null)}return;case"dialog":te("beforetoggle",e),te("toggle",e),te("cancel",e),te("close",e);break;case"iframe":case"object":te("load",e);break;case"video":case"audio":for(n=0;n<Ii.length;n++)te(Ii[n],e);break;case"image":te("error",e),te("load",e);break;case"details":te("toggle",e);break;case"embed":case"source":case"link":te("error",e),te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(g in a)if(a.hasOwnProperty(g)&&(n=a[g],n!=null))switch(g){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:ve(e,t,g,n,a,null)}return;default:if($r(t)){for(x in a)a.hasOwnProperty(x)&&(n=a[x],n!==void 0&&Bl(e,t,x,n,a,void 0));return}}for(u in a)a.hasOwnProperty(u)&&(n=a[u],n!=null&&ve(e,t,u,n,a,null))}function cg(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,s=null,l=null,u=null,h=null,g=null,x=null;for(y in a){var T=a[y];if(a.hasOwnProperty(y)&&T!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":h=T;default:n.hasOwnProperty(y)||ve(e,t,y,null,n,T)}}for(var b in n){var y=n[b];if(T=a[b],n.hasOwnProperty(b)&&(y!=null||T!=null))switch(b){case"type":s=y;break;case"name":i=y;break;case"checked":g=y;break;case"defaultChecked":x=y;break;case"value":l=y;break;case"defaultValue":u=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(c(137,t));break;default:y!==T&&ve(e,t,b,y,n,T)}}Fr(e,l,u,h,g,x,s,i);return;case"select":y=l=u=b=null;for(s in a)if(h=a[s],a.hasOwnProperty(s)&&h!=null)switch(s){case"value":break;case"multiple":y=h;default:n.hasOwnProperty(s)||ve(e,t,s,null,n,h)}for(i in n)if(s=n[i],h=a[i],n.hasOwnProperty(i)&&(s!=null||h!=null))switch(i){case"value":b=s;break;case"defaultValue":u=s;break;case"multiple":l=s;default:s!==h&&ve(e,t,i,s,n,h)}t=u,a=l,n=y,b!=null?Sn(e,!!a,b,!1):!!n!=!!a&&(t!=null?Sn(e,!!a,t,!0):Sn(e,!!a,a?[]:"",!1));return;case"textarea":y=b=null;for(u in a)if(i=a[u],a.hasOwnProperty(u)&&i!=null&&!n.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:ve(e,t,u,null,n,i)}for(l in n)if(i=n[l],s=a[l],n.hasOwnProperty(l)&&(i!=null||s!=null))switch(l){case"value":b=i;break;case"defaultValue":y=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(c(91));break;default:i!==s&&ve(e,t,l,i,n,s)}_c(e,b,y);return;case"option":for(var q in a)if(b=a[q],a.hasOwnProperty(q)&&b!=null&&!n.hasOwnProperty(q))switch(q){case"selected":e.selected=!1;break;default:ve(e,t,q,null,n,b)}for(h in n)if(b=n[h],y=a[h],n.hasOwnProperty(h)&&b!==y&&(b!=null||y!=null))switch(h){case"selected":e.selected=b&&typeof b!="function"&&typeof b!="symbol";break;default:ve(e,t,h,b,n,y)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var X in a)b=a[X],a.hasOwnProperty(X)&&b!=null&&!n.hasOwnProperty(X)&&ve(e,t,X,null,n,b);for(g in n)if(b=n[g],y=a[g],n.hasOwnProperty(g)&&b!==y&&(b!=null||y!=null))switch(g){case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(c(137,t));break;default:ve(e,t,g,b,n,y)}return;default:if($r(t)){for(var ye in a)b=a[ye],a.hasOwnProperty(ye)&&b!==void 0&&!n.hasOwnProperty(ye)&&Bl(e,t,ye,void 0,n,b);for(x in n)b=n[x],y=a[x],!n.hasOwnProperty(x)||b===y||b===void 0&&y===void 0||Bl(e,t,x,b,n,y);return}}for(var f in a)b=a[f],a.hasOwnProperty(f)&&b!=null&&!n.hasOwnProperty(f)&&ve(e,t,f,null,n,b);for(T in n)b=n[T],y=a[T],!n.hasOwnProperty(T)||b===y||b==null&&y==null||ve(e,t,T,b,n,y)}function Gh(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function dg(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),n=0;n<a.length;n++){var i=a[n],s=i.transferSize,l=i.initiatorType,u=i.duration;if(s&&u&&Gh(l)){for(l=0,u=i.responseEnd,n+=1;n<a.length;n++){var h=a[n],g=h.startTime;if(g>u)break;var x=h.transferSize,T=h.initiatorType;x&&Gh(T)&&(h=h.responseEnd,l+=x*(h<u?1:(u-g)/(h-g)))}if(--n,t+=8*(s+l)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Ll=null,Gl=null;function gr(e){return e.nodeType===9?e:e.ownerDocument}function Qh(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Yh(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Ql(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Yl=null;function ug(){var e=window.event;return e&&e.type==="popstate"?e===Yl?!1:(Yl=e,!0):(Yl=null,!1)}var Xh=typeof setTimeout=="function"?setTimeout:void 0,hg=typeof clearTimeout=="function"?clearTimeout:void 0,Vh=typeof Promise=="function"?Promise:void 0,mg=typeof queueMicrotask=="function"?queueMicrotask:typeof Vh<"u"?function(e){return Vh.resolve(null).then(e).catch(fg)}:Xh;function fg(e){setTimeout(function(){throw e})}function ja(e){return e==="head"}function Kh(e,t){var a=t,n=0;do{var i=a.nextSibling;if(e.removeChild(a),i&&i.nodeType===8)if(a=i.data,a==="/$"||a==="/&"){if(n===0){e.removeChild(i),ti(t);return}n--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")n++;else if(a==="html")Wi(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Wi(a);for(var s=a.firstChild;s;){var l=s.nextSibling,u=s.nodeName;s[pi]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&s.rel.toLowerCase()==="stylesheet"||a.removeChild(s),s=l}}else a==="body"&&Wi(e.ownerDocument.body);a=i}while(a);ti(t)}function Zh(e,t){var a=e;e=0;do{var n=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=n}while(a)}function Xl(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Xl(a),Jr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function pg(e,t,a,n){for(;e.nodeType===1;){var i=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[pi])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=Nt(e.nextSibling),e===null)break}return null}function gg(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Nt(e.nextSibling),e===null))return null;return e}function Jh(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Nt(e.nextSibling),e===null))return null;return e}function Vl(e){return e.data==="$?"||e.data==="$~"}function Kl(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function bg(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function Nt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Zl=null;function Ih(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Nt(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function Fh(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function Wh(e,t,a){switch(t=gr(a),e){case"html":if(e=t.documentElement,!e)throw Error(c(452));return e;case"head":if(e=t.head,!e)throw Error(c(453));return e;case"body":if(e=t.body,!e)throw Error(c(454));return e;default:throw Error(c(451))}}function Wi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Jr(e)}var Ct=new Map,$h=new Set;function br(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var la=z.d;z.d={f:vg,r:yg,D:xg,C:wg,L:kg,m:Sg,X:Og,S:Tg,M:Ag};function vg(){var e=la.f(),t=lr();return e||t}function yg(e){var t=xn(e);t!==null&&t.tag===5&&t.type==="form"?pu(t):la.r(e)}var $n=typeof document>"u"?null:document;function Ph(e,t,a){var n=$n;if(n&&typeof t=="string"&&t){var i=xt(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof a=="string"&&(i+='[crossorigin="'+a+'"]'),$h.has(i)||($h.add(i),e={rel:e,crossOrigin:a,href:t},n.querySelector(i)===null&&(t=n.createElement("link"),Ze(t,"link",e),Le(t),n.head.appendChild(t)))}}function xg(e){la.D(e),Ph("dns-prefetch",e,null)}function wg(e,t){la.C(e,t),Ph("preconnect",e,t)}function kg(e,t,a){la.L(e,t,a);var n=$n;if(n&&e&&t){var i='link[rel="preload"][as="'+xt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(i+='[imagesrcset="'+xt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(i+='[imagesizes="'+xt(a.imageSizes)+'"]')):i+='[href="'+xt(e)+'"]';var s=i;switch(t){case"style":s=Pn(e);break;case"script":s=ei(e)}Ct.has(s)||(e=C({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Ct.set(s,e),n.querySelector(i)!==null||t==="style"&&n.querySelector($i(s))||t==="script"&&n.querySelector(Pi(s))||(t=n.createElement("link"),Ze(t,"link",e),Le(t),n.head.appendChild(t)))}}function Sg(e,t){la.m(e,t);var a=$n;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+xt(n)+'"][href="'+xt(e)+'"]',s=i;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=ei(e)}if(!Ct.has(s)&&(e=C({rel:"modulepreload",href:e},t),Ct.set(s,e),a.querySelector(i)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Pi(s)))return}n=a.createElement("link"),Ze(n,"link",e),Le(n),a.head.appendChild(n)}}}function Tg(e,t,a){la.S(e,t,a);var n=$n;if(n&&e){var i=wn(n).hoistableStyles,s=Pn(e);t=t||"default";var l=i.get(s);if(!l){var u={loading:0,preload:null};if(l=n.querySelector($i(s)))u.loading=5;else{e=C({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Ct.get(s))&&Jl(e,a);var h=l=n.createElement("link");Le(h),Ze(h,"link",e),h._p=new Promise(function(g,x){h.onload=g,h.onerror=x}),h.addEventListener("load",function(){u.loading|=1}),h.addEventListener("error",function(){u.loading|=2}),u.loading|=4,vr(l,t,n)}l={type:"stylesheet",instance:l,count:1,state:u},i.set(s,l)}}}function Og(e,t){la.X(e,t);var a=$n;if(a&&e){var n=wn(a).hoistableScripts,i=ei(e),s=n.get(i);s||(s=a.querySelector(Pi(i)),s||(e=C({src:e,async:!0},t),(t=Ct.get(i))&&Il(e,t),s=a.createElement("script"),Le(s),Ze(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},n.set(i,s))}}function Ag(e,t){la.M(e,t);var a=$n;if(a&&e){var n=wn(a).hoistableScripts,i=ei(e),s=n.get(i);s||(s=a.querySelector(Pi(i)),s||(e=C({src:e,async:!0,type:"module"},t),(t=Ct.get(i))&&Il(e,t),s=a.createElement("script"),Le(s),Ze(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},n.set(i,s))}}function em(e,t,a,n){var i=(i=ha.current)?br(i):null;if(!i)throw Error(c(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Pn(a.href),a=wn(i).hoistableStyles,n=a.get(t),n||(n={type:"style",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Pn(a.href);var s=wn(i).hoistableStyles,l=s.get(e);if(l||(i=i.ownerDocument||i,l={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,l),(s=i.querySelector($i(e)))&&!s._p&&(l.instance=s,l.state.loading=5),Ct.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ct.set(e,a),s||Ng(i,e,a,l.state))),t&&n===null)throw Error(c(528,""));return l}if(t&&n!==null)throw Error(c(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=ei(a),a=wn(i).hoistableScripts,n=a.get(t),n||(n={type:"script",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,e))}}function Pn(e){return'href="'+xt(e)+'"'}function $i(e){return'link[rel="stylesheet"]['+e+"]"}function tm(e){return C({},e,{"data-precedence":e.precedence,precedence:null})}function Ng(e,t,a,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),Ze(t,"link",a),Le(t),e.head.appendChild(t))}function ei(e){return'[src="'+xt(e)+'"]'}function Pi(e){return"script[async]"+e}function am(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+xt(a.href)+'"]');if(n)return t.instance=n,Le(n),n;var i=C({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),Le(n),Ze(n,"style",i),vr(n,a.precedence,e),t.instance=n;case"stylesheet":i=Pn(a.href);var s=e.querySelector($i(i));if(s)return t.state.loading|=4,t.instance=s,Le(s),s;n=tm(a),(i=Ct.get(i))&&Jl(n,i),s=(e.ownerDocument||e).createElement("link"),Le(s);var l=s;return l._p=new Promise(function(u,h){l.onload=u,l.onerror=h}),Ze(s,"link",n),t.state.loading|=4,vr(s,a.precedence,e),t.instance=s;case"script":return s=ei(a.src),(i=e.querySelector(Pi(s)))?(t.instance=i,Le(i),i):(n=a,(i=Ct.get(s))&&(n=C({},a),Il(n,i)),e=e.ownerDocument||e,i=e.createElement("script"),Le(i),Ze(i,"link",n),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(c(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,vr(n,a.precedence,e));return t.instance}function vr(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=n.length?n[n.length-1]:null,s=i,l=0;l<n.length;l++){var u=n[l];if(u.dataset.precedence===t)s=u;else if(s!==i)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function Jl(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Il(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var yr=null;function nm(e,t,a){if(yr===null){var n=new Map,i=yr=new Map;i.set(a,n)}else i=yr,n=i.get(a),n||(n=new Map,i.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),i=0;i<a.length;i++){var s=a[i];if(!(s[pi]||s[Ye]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var l=s.getAttribute(t)||"";l=e+l;var u=n.get(l);u?u.push(s):n.set(l,[s])}}return n}function im(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function Cg(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function sm(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Dg(e,t,a,n){if(a.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var i=Pn(n.href),s=t.querySelector($i(i));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=xr.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=s,Le(s);return}s=t.ownerDocument||t,n=tm(n),(i=Ct.get(i))&&Jl(n,i),s=s.createElement("link"),Le(s);var l=s;l._p=new Promise(function(u,h){l.onload=u,l.onerror=h}),Ze(s,"link",n),a.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=xr.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var Fl=0;function Rg(e,t){return e.stylesheets&&e.count===0&&kr(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var n=setTimeout(function(){if(e.stylesheets&&kr(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&Fl===0&&(Fl=62500*dg());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&kr(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>Fl?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(i)}}:null}function xr(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)kr(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var wr=null;function kr(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,wr=new Map,t.forEach(Eg,e),wr=null,xr.call(e))}function Eg(e,t){if(!(t.state.loading&4)){var a=wr.get(e);if(a)var n=a.get(null);else{a=new Map,wr.set(e,a);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<i.length;s++){var l=i[s];(l.nodeName==="LINK"||l.getAttribute("media")!=="not all")&&(a.set(l.dataset.precedence,l),n=l)}n&&a.set(null,n)}i=t.instance,l=i.getAttribute("data-precedence"),s=a.get(l)||n,s===n&&a.set(null,i),a.set(l,i),this.count++,n=xr.bind(this),i.addEventListener("load",n),i.addEventListener("error",n),s?s.parentNode.insertBefore(i,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var es={$$typeof:H,Provider:null,Consumer:null,_currentValue:I,_currentValue2:I,_threadCount:0};function jg(e,t,a,n,i,s,l,u,h){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Xr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xr(0),this.hiddenUpdates=Xr(null),this.identifierPrefix=n,this.onUncaughtError=i,this.onCaughtError=s,this.onRecoverableError=l,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=h,this.incompleteTransitions=new Map}function rm(e,t,a,n,i,s,l,u,h,g,x,T){return e=new jg(e,t,a,l,h,g,x,T,u),t=1,s===!0&&(t|=24),s=dt(3,null,null,t),e.current=s,s.stateNode=e,t=Do(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:n,isDehydrated:a,cache:t},zo(s),e}function om(e){return e?(e=En,e):En}function lm(e,t,a,n,i,s){i=om(i),n.context===null?n.context=i:n.pendingContext=i,n=wa(t),n.payload={element:a},s=s===void 0?null:s,s!==null&&(n.callback=s),a=ka(e,n,t),a!==null&&(st(a,e,t),ji(a,e,t))}function cm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Wl(e,t){cm(e,t),(e=e.alternate)&&cm(e,t)}function dm(e){if(e.tag===13||e.tag===31){var t=Wa(e,67108864);t!==null&&st(t,e,67108864),Wl(e,67108864)}}function um(e){if(e.tag===13||e.tag===31){var t=pt();t=Vr(t);var a=Wa(e,t);a!==null&&st(a,e,t),Wl(e,t)}}var Sr=!0;function zg(e,t,a,n){var i=S.T;S.T=null;var s=z.p;try{z.p=2,$l(e,t,a,n)}finally{z.p=s,S.T=i}}function Mg(e,t,a,n){var i=S.T;S.T=null;var s=z.p;try{z.p=8,$l(e,t,a,n)}finally{z.p=s,S.T=i}}function $l(e,t,a,n){if(Sr){var i=Pl(n);if(i===null)Hl(e,t,n,Tr,a),mm(e,n);else if(Ug(i,e,t,a,n))n.stopPropagation();else if(mm(e,n),t&4&&-1<qg.indexOf(e)){for(;i!==null;){var s=xn(i);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var l=Ka(s.pendingLanes);if(l!==0){var u=s;for(u.pendingLanes|=2,u.entangledLanes|=2;l;){var h=1<<31-lt(l);u.entanglements[1]|=h,l&=~h}Bt(s),(ue&6)===0&&(rr=rt()+500,Ji(0))}}break;case 31:case 13:u=Wa(s,2),u!==null&&st(u,s,2),lr(),Wl(s,2)}if(s=Pl(n),s===null&&Hl(e,t,n,Tr,a),s===i)break;i=s}i!==null&&n.stopPropagation()}else Hl(e,t,n,null,a)}}function Pl(e){return e=eo(e),ec(e)}var Tr=null;function ec(e){if(Tr=null,e=yn(e),e!==null){var t=O(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=R(t),e!==null)return e;e=null}else if(a===31){if(e=N(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Tr=e,null}function hm(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(xf()){case xc:return 2;case wc:return 8;case ms:case wf:return 32;case kc:return 268435456;default:return 32}default:return 32}}var tc=!1,za=null,Ma=null,qa=null,ts=new Map,as=new Map,Ua=[],qg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function mm(e,t){switch(e){case"focusin":case"focusout":za=null;break;case"dragenter":case"dragleave":Ma=null;break;case"mouseover":case"mouseout":qa=null;break;case"pointerover":case"pointerout":ts.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":as.delete(t.pointerId)}}function ns(e,t,a,n,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:s,targetContainers:[i]},t!==null&&(t=xn(t),t!==null&&dm(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ug(e,t,a,n,i){switch(t){case"focusin":return za=ns(za,e,t,a,n,i),!0;case"dragenter":return Ma=ns(Ma,e,t,a,n,i),!0;case"mouseover":return qa=ns(qa,e,t,a,n,i),!0;case"pointerover":var s=i.pointerId;return ts.set(s,ns(ts.get(s)||null,e,t,a,n,i)),!0;case"gotpointercapture":return s=i.pointerId,as.set(s,ns(as.get(s)||null,e,t,a,n,i)),!0}return!1}function fm(e){var t=yn(e.target);if(t!==null){var a=O(t);if(a!==null){if(t=a.tag,t===13){if(t=R(a),t!==null){e.blockedOn=t,Cc(e.priority,function(){um(a)});return}}else if(t===31){if(t=N(a),t!==null){e.blockedOn=t,Cc(e.priority,function(){um(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Or(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=Pl(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);Pr=n,a.target.dispatchEvent(n),Pr=null}else return t=xn(a),t!==null&&dm(t),e.blockedOn=a,!1;t.shift()}return!0}function pm(e,t,a){Or(e)&&a.delete(t)}function _g(){tc=!1,za!==null&&Or(za)&&(za=null),Ma!==null&&Or(Ma)&&(Ma=null),qa!==null&&Or(qa)&&(qa=null),ts.forEach(pm),as.forEach(pm)}function Ar(e,t){e.blockedOn===t&&(e.blockedOn=null,tc||(tc=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,_g)))}var Nr=null;function gm(e){Nr!==e&&(Nr=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Nr===e&&(Nr=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],i=e[t+2];if(typeof n!="function"){if(ec(n||a)===null)continue;break}var s=xn(a);s!==null&&(e.splice(t,3),t-=3,Po(s,{pending:!0,data:i,method:a.method,action:n},n,i))}}))}function ti(e){function t(h){return Ar(h,e)}za!==null&&Ar(za,e),Ma!==null&&Ar(Ma,e),qa!==null&&Ar(qa,e),ts.forEach(t),as.forEach(t);for(var a=0;a<Ua.length;a++){var n=Ua[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<Ua.length&&(a=Ua[0],a.blockedOn===null);)fm(a),a.blockedOn===null&&Ua.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var i=a[n],s=a[n+1],l=i[Pe]||null;if(typeof s=="function")l||gm(a);else if(l){var u=null;if(s&&s.hasAttribute("formAction")){if(i=s,l=s[Pe]||null)u=l.formAction;else if(ec(i)!==null)continue}else u=l.action;typeof u=="function"?a[n+1]=u:(a.splice(n,3),n-=3),gm(a)}}}function bm(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(l){return i=l})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),n||setTimeout(a,20)}function a(){if(!n&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function ac(e){this._internalRoot=e}Cr.prototype.render=ac.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(c(409));var a=t.current,n=pt();lm(a,n,e,t,null,null)},Cr.prototype.unmount=ac.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;lm(e.current,2,null,e,null,null),lr(),t[vn]=null}};function Cr(e){this._internalRoot=e}Cr.prototype.unstable_scheduleHydration=function(e){if(e){var t=Nc();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Ua.length&&t!==0&&t<Ua[a].priority;a++);Ua.splice(a,0,e),a===0&&fm(e)}};var vm=o.version;if(vm!=="19.2.8")throw Error(c(527,vm,"19.2.8"));z.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(c(188)):(e=Object.keys(e).join(","),Error(c(268,e)));return e=D(t),e=e!==null?U(e):null,e=e===null?null:e.stateNode,e};var Hg={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:S,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Dr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Dr.isDisabled&&Dr.supportsFiber)try{hi=Dr.inject(Hg),ot=Dr}catch{}}return is.createRoot=function(e,t){if(!v(e))throw Error(c(299));var a=!1,n="",i=Ou,s=Au,l=Nu;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=rm(e,1,!1,null,null,a,n,null,i,s,l,bm),e[vn]=t.current,_l(e),new ac(t)},is.hydrateRoot=function(e,t,a){if(!v(e))throw Error(c(299));var n=!1,i="",s=Ou,l=Au,u=Nu,h=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(i=a.identifierPrefix),a.onUncaughtError!==void 0&&(s=a.onUncaughtError),a.onCaughtError!==void 0&&(l=a.onCaughtError),a.onRecoverableError!==void 0&&(u=a.onRecoverableError),a.formState!==void 0&&(h=a.formState)),t=rm(e,1,!0,t,a??null,n,i,h,s,l,u,bm),t.context=om(null),a=t.current,n=pt(),n=Vr(n),i=wa(n),i.callback=null,ka(a,i,n),a=n,t.current.lanes=a,fi(t,a),Bt(t),e[vn]=t.current,_l(e),new Cr(t)},is.version="19.2.8",is}var Cm;function tb(){if(Cm)return rc.exports;Cm=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(o){console.error(o)}}return r(),rc.exports=eb(),rc.exports}var ab=tb();const nb=ge.createContext(void 0),ib=({client:r,children:o})=>(ge.useEffect(()=>(r.mount(),()=>{r.unmount()}),[r]),A.jsx(nb.Provider,{value:r,children:o})),sb={setTimeout:(r,o)=>setTimeout(r,o),clearTimeout:r=>clearTimeout(r),setInterval:(r,o)=>setInterval(r,o),clearInterval:r=>clearInterval(r)};var Ba,hc,Zm,rb=(Zm=class{constructor(){se(this,Ba,sb);se(this,hc,!1)}setTimeoutProvider(r){K(this,Ba,r)}setTimeout(r,o){return w(this,Ba).setTimeout(r,o)}clearTimeout(r){w(this,Ba).clearTimeout(r)}setInterval(r,o){return w(this,Ba).setInterval(r,o)}clearInterval(r){w(this,Ba).clearInterval(r)}},Ba=new WeakMap,hc=new WeakMap,Zm);const cc=new rb;function ob(r){setTimeout(r,0)}const lb=typeof window>"u"||"Deno"in globalThis;function Rt(){}function cb(r,o){return typeof r=="function"?r(o):r}function db(r){return typeof r=="number"&&r>=0&&r!==1/0}function ub(r,o){return Math.max(r+(o||0)-Date.now(),0)}function zr(r,o){return typeof r=="function"?r(o):r}function hb(r,o){return typeof r=="function"?r(o):r}function Dm(r,o){const{type:d="all",exact:c,fetchStatus:v,predicate:O,queryKey:R,stale:N}=r;if(R){if(c){if(o.queryHash!==mc(R,o.options))return!1}else if(!ui(o.queryKey,R))return!1}if(d!=="all"){const j=o.isActive();if(d==="active"&&!j||d==="inactive"&&j)return!1}return!(typeof N=="boolean"&&o.isStale()!==N||v&&v!==o.state.fetchStatus||O&&!O(o))}function Rm(r,o){const{exact:d,status:c,predicate:v,mutationKey:O}=r;if(O){if(!o.options.mutationKey)return!1;if(d){if(ss(o.options.mutationKey)!==ss(O))return!1}else if(!ui(o.options.mutationKey,O))return!1}return!(c&&o.state.status!==c||v&&!v(o))}function mc(r,o){return((o==null?void 0:o.queryKeyHashFn)||ss)(r)}function ss(r){return JSON.stringify(r,(o,d)=>dc(d)?Object.keys(d).sort().reduce((c,v)=>(c[v]=d[v],c),{}):d)}function ui(r,o){if(r===o)return!0;if(typeof r!=typeof o)return!1;if(r&&o&&typeof r=="object"&&typeof o=="object"){if(Array.isArray(r)&&Array.isArray(o)){for(let c=0;c<o.length;c++)if(!ui(r[c],o[c]))return!1;return!0}const d=Object.keys(o);for(const c of d)if(!ui(r[c],o[c]))return!1;return!0}return!1}const mb=Object.prototype.hasOwnProperty;function nf(r,o,d=0){if(r===o)return r;if(d>500)return o;const c=Em(r)&&Em(o);if(!c&&!(dc(r)&&dc(o)))return o;const v=(c?r:Object.keys(r)).length,O=c?o:Object.keys(o),R=O.length,N=c?new Array(R):{};let j=0;for(let D=0;D<R;D++){const U=c?D:O[D],C=r[U],E=o[U];if(C===E){N[U]=C,(c?D<v:mb.call(r,U))&&j++;continue}if(C===null||E===null||typeof C!="object"||typeof E!="object"){N[U]=E;continue}const Y=nf(C,E,d+1);N[U]=Y,Y===C&&j++}return v===R&&j===v?r:N}function Em(r){return Array.isArray(r)&&r.length===Object.keys(r).length}function dc(r){if(!jm(r))return!1;const o=r.constructor;if(o===void 0)return!0;const d=o.prototype;return!(!jm(d)||!d.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(r)!==Object.prototype)}function jm(r){return Object.prototype.toString.call(r)==="[object Object]"}function fb(r){return new Promise(o=>{cc.setTimeout(o,r)})}function pb(r,o,d){return typeof d.structuralSharing=="function"?d.structuralSharing(r,o):d.structuralSharing!==!1?nf(r,o):o}function gb(r,o,d=0){const c=[...r,o];return d&&c.length>d?c.slice(1):c}function bb(r,o,d=0){const c=[o,...r];return d&&c.length>d?c.slice(0,-1):c}const fc=Symbol();function sf(r,o){return!r.queryFn&&(o!=null&&o.initialPromise)?()=>o.initialPromise:!r.queryFn||r.queryFn===fc?()=>Promise.reject(new Error(`Missing queryFn: '${r.queryHash}'`)):r.queryFn}function vb(r,o,d){let c=!1,v;return Object.defineProperty(r,"signal",{enumerable:!0,get:()=>(v??(v=o()),c||(c=!0,v.aborted?d():v.addEventListener("abort",d,{once:!0})),v)}),r}const rf=(()=>{let r=()=>lb;return{isServer(){return r()},setIsServer(o){r=o}}})();var Ur=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(r){return this.listeners.add(r),this.onSubscribe(),()=>{this.listeners.delete(r),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},un,La,ai,Jm,yb=(Jm=class extends Ur{constructor(){super();se(this,un);se(this,La);se(this,ai);K(this,ai,o=>{if(typeof window<"u"&&window.addEventListener){const d=()=>o();return window.addEventListener("visibilitychange",d,!1),()=>{window.removeEventListener("visibilitychange",d)}}})}onSubscribe(){w(this,La)||this.setEventListener(w(this,ai))}onUnsubscribe(){var o;this.hasListeners()||((o=w(this,La))==null||o.call(this),K(this,La,void 0))}setEventListener(o){var d;K(this,ai,o),(d=w(this,La))==null||d.call(this),K(this,La,o(c=>{typeof c=="boolean"?this.setFocused(c):this.onFocus()}))}setFocused(o){w(this,un)!==o&&(K(this,un,o),this.onFocus())}onFocus(){const o=this.isFocused();this.listeners.forEach(d=>{d(o)})}isFocused(){var o;return typeof w(this,un)=="boolean"?w(this,un):((o=globalThis.document)==null?void 0:o.visibilityState)!=="hidden"}},un=new WeakMap,La=new WeakMap,ai=new WeakMap,Jm);const of=new yb,xb=ob;function wb(){let r=[],o=0,d=N=>{N()},c=N=>{N()},v=xb;const O=N=>{o?r.push(N):v(()=>{d(N)})},R=()=>{const N=r;r=[],N.length&&v(()=>{c(()=>{N.forEach(j=>{d(j)})})})};return{batch:N=>{let j;o++;try{j=N()}finally{o--,o||R()}return j},batchCalls:N=>(...j)=>{O(()=>{N(...j)})},schedule:O,setNotifyFunction:N=>{d=N},setBatchNotifyFunction:N=>{c=N},setScheduler:N=>{v=N}}}const $e=wb();var ni,Ga,ii,Im,kb=(Im=class extends Ur{constructor(){super();se(this,ni,!0);se(this,Ga);se(this,ii);K(this,ii,o=>{if(typeof window<"u"&&window.addEventListener){const d=()=>o(!0),c=()=>o(!1);return window.addEventListener("online",d,!1),window.addEventListener("offline",c,!1),()=>{window.removeEventListener("online",d),window.removeEventListener("offline",c)}}})}onSubscribe(){w(this,Ga)||this.setEventListener(w(this,ii))}onUnsubscribe(){var o;this.hasListeners()||((o=w(this,Ga))==null||o.call(this),K(this,Ga,void 0))}setEventListener(o){var d;K(this,ii,o),(d=w(this,Ga))==null||d.call(this),K(this,Ga,o(this.setOnline.bind(this)))}setOnline(o){w(this,ni)!==o&&(K(this,ni,o),this.listeners.forEach(d=>{d(o)}))}isOnline(){return w(this,ni)}},ni=new WeakMap,Ga=new WeakMap,ii=new WeakMap,Im);const Mr=new kb;function Sb(r){return Math.min(1e3*2**r,3e4)}function lf(r){return(r??"online")==="online"?Mr.isOnline():!0}var uc=class extends Error{constructor(r){super("CancelledError"),this.revert=r==null?void 0:r.revert,this.silent=r==null?void 0:r.silent}};function cf(r){let o=!1,d=0,c,v="pending",O,R;const N=new Promise((V,H)=>{O=V,R=H});N.catch(Rt);const j=()=>v!=="pending",D=V=>{var H;if(!j()){const L=new uc(V);J(L),(H=r.onCancel)==null||H.call(r,L)}},U=()=>{o=!0},C=()=>{o=!1},E=()=>of.isFocused()&&(r.networkMode==="always"||Mr.isOnline())&&r.canRun(),Y=()=>lf(r.networkMode)&&r.canRun(),Q=V=>{j()||(c==null||c(),v="resolved",O(V))},J=V=>{j()||(c==null||c(),v="rejected",R(V))},Z=()=>new Promise(V=>{var H;c=L=>{(j()||E())&&V(L)},(H=r.onPause)==null||H.call(r)}).then(()=>{var V;c=void 0,j()||(V=r.onContinue)==null||V.call(r)}),F=()=>{if(j())return;let V;const H=d===0?r.initialPromise:void 0;try{V=H??r.fn()}catch(L){V=Promise.reject(L)}Promise.resolve(V).then(Q).catch(L=>{var ae;if(j())return;const M=r.retry??(rf.isServer()?0:3),de=r.retryDelay??Sb,G=typeof de=="function"?de(d,L):de,P=M===!0||typeof M=="number"&&d<M||typeof M=="function"&&M(d,L);if(o||!P){J(L);return}d++,(ae=r.onFail)==null||ae.call(r,d,L),fb(G).then(()=>E()?void 0:Z()).then(()=>{o?J(L):F()})})};return{promise:N,status:()=>v,cancel:D,continue:()=>(c==null||c(),N),cancelRetry:U,continueRetry:C,canStart:Y,start:()=>(Y()?F():Z().then(F),N)}}var hn,Fm,df=(Fm=class{constructor(){se(this,hn)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),db(this.gcTime)&&K(this,hn,cc.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(r){this.gcTime=Math.max(this.gcTime||0,r??(rf.isServer()?1/0:3e5))}clearGcTimeout(){w(this,hn)!==void 0&&(cc.clearTimeout(w(this,hn)),K(this,hn,void 0))}},hn=new WeakMap,Fm);function Tb(r){return{onFetch:(o,d)=>{var U,C,E,Y,Q;const c=o.options,v=(E=(C=(U=o.fetchOptions)==null?void 0:U.meta)==null?void 0:C.fetchMore)==null?void 0:E.direction,O=((Y=o.state.data)==null?void 0:Y.pages)||[],R=((Q=o.state.data)==null?void 0:Q.pageParams)||[];let N={pages:[],pageParams:[]},j=0;const D=async()=>{let J=!1;const Z=H=>{vb(H,()=>o.signal,()=>J=!0)},F=sf(o.options,o.fetchOptions),V=async(H,L,M)=>{if(J)return Promise.reject(o.signal.reason);if(L==null&&H.pages.length)return Promise.resolve(H);const G=(()=>{const Qe={client:o.client,queryKey:o.queryKey,pageParam:L,direction:M?"backward":"forward",meta:o.options.meta};return Z(Qe),Qe})(),P=await F(G),{maxPages:ae}=o.options,me=M?bb:gb;return{pages:me(H.pages,P,ae),pageParams:me(H.pageParams,L,ae)}};if(v&&O.length){const H=v==="backward",L=H?Ob:zm,M={pages:O,pageParams:R};N=await V(M,L(c,M),H)}else{const H=r??O.length;do{const L=j===0?R[0]??c.initialPageParam:zm(c,N);if(j>0&&L==null)break;N=await V(N,L),j++}while(j<H)}return N};o.options.persister?o.fetchFn=()=>{var J,Z;return(Z=(J=o.options).persister)==null?void 0:Z.call(J,D,{client:o.client,queryKey:o.queryKey,meta:o.options.meta,signal:o.signal},d)}:o.fetchFn=D}}}function zm(r,{pages:o,pageParams:d}){const c=o.length-1;return o.length>0?r.getNextPageParam(o[c],o,d[c],d):void 0}function Ob(r,{pages:o,pageParams:d}){var c;return o.length>0?(c=r.getPreviousPageParam)==null?void 0:c.call(r,o[0],o,d[0],d):void 0}var si,mn,ri,Dt,fn,He,rs,pn,bt,uf,ca,Wm,Ab=(Wm=class extends df{constructor(o){super();se(this,bt);se(this,si);se(this,mn);se(this,ri);se(this,Dt);se(this,fn);se(this,He);se(this,rs);se(this,pn);K(this,pn,!1),K(this,rs,o.defaultOptions),this.setOptions(o.options),this.observers=[],K(this,fn,o.client),K(this,Dt,w(this,fn).getQueryCache()),this.queryKey=o.queryKey,this.queryHash=o.queryHash,K(this,mn,qm(this.options)),this.state=o.state??w(this,mn),this.scheduleGc()}get meta(){return this.options.meta}get queryType(){return w(this,si)}get promise(){var o;return(o=w(this,He))==null?void 0:o.promise}setOptions(o){if(this.options={...w(this,rs),...o},o!=null&&o._type&&K(this,si,o._type),this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const d=qm(this.options);d.data!==void 0&&(this.setState(Mm(d.data,d.dataUpdatedAt)),K(this,mn,d))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&w(this,Dt).remove(this)}setData(o,d){const c=pb(this.state.data,o,this.options);return Je(this,bt,ca).call(this,{data:c,type:"success",dataUpdatedAt:d==null?void 0:d.updatedAt,manual:d==null?void 0:d.manual}),c}setState(o){Je(this,bt,ca).call(this,{type:"setState",state:o})}cancel(o){var c,v;const d=(c=w(this,He))==null?void 0:c.promise;return(v=w(this,He))==null||v.cancel(o),d?d.then(Rt).catch(Rt):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}get resetState(){return w(this,mn)}reset(){this.destroy(),this.setState(this.resetState)}isActive(){return this.observers.some(o=>hb(o.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===fc||!this.isFetched()}isFetched(){return this.state.dataUpdateCount+this.state.errorUpdateCount>0}isStatic(){return this.getObserversCount()>0?this.observers.some(o=>zr(o.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(o=>o.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(o=0){return this.state.data===void 0?!0:o==="static"?!1:this.state.isInvalidated?!0:!ub(this.state.dataUpdatedAt,o)}onFocus(){var o,d;(o=this.observers.find(c=>c.shouldFetchOnWindowFocus()))==null||o.refetch({cancelRefetch:!1}),(d=w(this,He))==null||d.continue()}onOnline(){var o,d;(o=this.observers.find(c=>c.shouldFetchOnReconnect()))==null||o.refetch({cancelRefetch:!1}),(d=w(this,He))==null||d.continue()}addObserver(o){this.observers.includes(o)||(this.observers.push(o),this.clearGcTimeout(),w(this,Dt).notify({type:"observerAdded",query:this,observer:o}))}removeObserver(o){const d=this.observers.indexOf(o);d!==-1&&(this.observers.splice(d,1),this.observers.length||(w(this,He)&&(w(this,pn)||Je(this,bt,uf).call(this)?w(this,He).cancel({revert:!0}):w(this,He).cancelRetry()),this.scheduleGc()),w(this,Dt).notify({type:"observerRemoved",query:this,observer:o}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||Je(this,bt,ca).call(this,{type:"invalidate"})}async fetch(o,d){var D,U,C,E,Y,Q,J,Z,F,V,H,L;if(this.state.fetchStatus!=="idle"&&((D=w(this,He))==null?void 0:D.status())!=="rejected"){if(this.state.data!==void 0&&(d!=null&&d.cancelRefetch))this.cancel({silent:!0});else if(w(this,He))return w(this,He).continueRetry(),w(this,He).promise}if(o&&this.setOptions(o),!this.options.queryFn){const M=this.observers.find(de=>de.options.queryFn);M&&this.setOptions(M.options)}const c=new AbortController,v=M=>{Object.defineProperty(M,"signal",{enumerable:!0,get:()=>(K(this,pn,!0),c.signal)})},O=()=>{const M=sf(this.options,d),G=(()=>{const P={client:w(this,fn),queryKey:this.queryKey,meta:this.meta};return v(P),P})();return K(this,pn,!1),this.options.persister?this.options.persister(M,G,this):M(G)},N=(()=>{const M={fetchOptions:d,options:this.options,queryKey:this.queryKey,client:w(this,fn),state:this.state,fetchFn:O};return v(M),M})();(U=w(this,si)==="infinite"?Tb(this.options.pages):this.options.behavior)==null||U.onFetch(N,this),K(this,ri,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((C=N.fetchOptions)==null?void 0:C.meta))&&Je(this,bt,ca).call(this,{type:"fetch",meta:(E=N.fetchOptions)==null?void 0:E.meta});const j=K(this,He,cf({initialPromise:d==null?void 0:d.initialPromise,fn:N.fetchFn,onCancel:M=>{M instanceof uc&&M.revert&&this.setState({...w(this,ri),fetchStatus:"idle"}),c.abort()},onFail:(M,de)=>{Je(this,bt,ca).call(this,{type:"failed",failureCount:M,error:de})},onPause:()=>{Je(this,bt,ca).call(this,{type:"pause"})},onContinue:()=>{Je(this,bt,ca).call(this,{type:"continue"})},retry:N.options.retry,retryDelay:N.options.retryDelay,networkMode:N.options.networkMode,canRun:()=>!0}));try{const M=await j.start();if(M===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(M),(Q=(Y=w(this,Dt).config).onSuccess)==null||Q.call(Y,M,this),(Z=(J=w(this,Dt).config).onSettled)==null||Z.call(J,M,this.state.error,this),M}catch(M){if(M instanceof uc){if(M.silent)return w(this,He).promise;if(M.revert){if(this.state.data===void 0)throw M;return this.state.data}}throw Je(this,bt,ca).call(this,{type:"error",error:M}),(V=(F=w(this,Dt).config).onError)==null||V.call(F,M,this),(L=(H=w(this,Dt).config).onSettled)==null||L.call(H,this.state.data,M,this),M}finally{w(this,He)===j&&K(this,He,void 0),this.scheduleGc()}}},si=new WeakMap,mn=new WeakMap,ri=new WeakMap,Dt=new WeakMap,fn=new WeakMap,He=new WeakMap,rs=new WeakMap,pn=new WeakMap,bt=new WeakSet,uf=function(){return this.state.fetchStatus==="paused"&&this.state.status==="pending"},ca=function(o){const d=c=>{switch(o.type){case"failed":return{...c,fetchFailureCount:o.failureCount,fetchFailureReason:o.error};case"pause":return{...c,fetchStatus:"paused"};case"continue":return{...c,fetchStatus:"fetching"};case"fetch":return{...c,...Nb(c.data,this.options),fetchMeta:o.meta??null};case"success":const v={...c,...Mm(o.data,o.dataUpdatedAt),dataUpdateCount:c.dataUpdateCount+1,...!o.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return K(this,ri,o.manual?v:void 0),v;case"error":const O=o.error;return{...c,error:O,errorUpdateCount:c.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:c.fetchFailureCount+1,fetchFailureReason:O,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...c,isInvalidated:!0};case"setState":return{...c,...o.state}}};this.state=d(this.state),$e.batch(()=>{this.observers.slice().forEach(c=>{c.onQueryUpdate()}),w(this,Dt).notify({query:this,type:"updated",action:o})})},Wm);function Nb(r,o){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:lf(o.networkMode)?"fetching":"paused",...r===void 0&&{error:null,status:"pending"}}}function Mm(r,o){return{data:r,dataUpdatedAt:o??Date.now(),error:null,isInvalidated:!1,status:"success"}}function qm(r){const o=typeof r.initialData=="function"?r.initialData():r.initialData,d=o!==void 0,c=d?typeof r.initialDataUpdatedAt=="function"?r.initialDataUpdatedAt():r.initialDataUpdatedAt:0;return{data:o,dataUpdateCount:0,dataUpdatedAt:d?c??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:d?"success":"pending",fetchStatus:"idle"}}var os,Lt,Ie,gn,Gt,Ha,$m,Cb=($m=class extends df{constructor(o){super();se(this,Gt);se(this,os);se(this,Lt);se(this,Ie);se(this,gn);K(this,os,o.client),this.mutationId=o.mutationId,K(this,Ie,o.mutationCache),K(this,Lt,[]),this.state=o.state||Db(),this.setOptions(o.options),this.scheduleGc()}setOptions(o){this.options=o,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(o){w(this,Lt).includes(o)||(w(this,Lt).push(o),this.clearGcTimeout(),w(this,Ie).notify({type:"observerAdded",mutation:this,observer:o}))}removeObserver(o){K(this,Lt,w(this,Lt).filter(d=>d!==o)),this.scheduleGc(),w(this,Ie).notify({type:"observerRemoved",mutation:this,observer:o})}optionalRemove(){w(this,Lt).length||(this.state.status==="pending"?this.scheduleGc():w(this,Ie).remove(this))}continue(){var o;return((o=w(this,gn))==null?void 0:o.continue())??(this.state.status==="pending"?this.execute(this.state.variables):Promise.resolve())}async execute(o){var N,j,D,U,C,E,Y,Q,J,Z,F,V,H,L,M,de,G,P;const d=()=>{Je(this,Gt,Ha).call(this,{type:"continue"})},c={client:w(this,os),meta:this.options.meta,mutationKey:this.options.mutationKey},v=K(this,gn,cf({fn:()=>this.options.mutationFn?this.options.mutationFn(o,c):Promise.reject(new Error("No mutationFn found")),onFail:(ae,me)=>{Je(this,Gt,Ha).call(this,{type:"failed",failureCount:ae,error:me})},onPause:()=>{Je(this,Gt,Ha).call(this,{type:"pause"})},onContinue:d,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>w(this,Ie).canRun(this)})),O=this.state.status==="pending",R=!v.canStart();try{if(O)d();else{Je(this,Gt,Ha).call(this,{type:"pending",variables:o,isPaused:R}),w(this,Ie).config.onMutate&&await w(this,Ie).config.onMutate(o,this,c);const me=await((j=(N=this.options).onMutate)==null?void 0:j.call(N,o,c));me!==this.state.context&&Je(this,Gt,Ha).call(this,{type:"pending",context:me,variables:o,isPaused:R})}const ae=await v.start();return await((U=(D=w(this,Ie).config).onSuccess)==null?void 0:U.call(D,ae,o,this.state.context,this,c)),await((E=(C=this.options).onSuccess)==null?void 0:E.call(C,ae,o,this.state.context,c)),await((Q=(Y=w(this,Ie).config).onSettled)==null?void 0:Q.call(Y,ae,null,this.state.variables,this.state.context,this,c)),await((Z=(J=this.options).onSettled)==null?void 0:Z.call(J,ae,null,o,this.state.context,c)),Je(this,Gt,Ha).call(this,{type:"success",data:ae}),ae}catch(ae){try{await((V=(F=w(this,Ie).config).onError)==null?void 0:V.call(F,ae,o,this.state.context,this,c))}catch(me){Promise.reject(me)}try{await((L=(H=this.options).onError)==null?void 0:L.call(H,ae,o,this.state.context,c))}catch(me){Promise.reject(me)}try{await((de=(M=w(this,Ie).config).onSettled)==null?void 0:de.call(M,void 0,ae,this.state.variables,this.state.context,this,c))}catch(me){Promise.reject(me)}try{await((P=(G=this.options).onSettled)==null?void 0:P.call(G,void 0,ae,o,this.state.context,c))}catch(me){Promise.reject(me)}throw Je(this,Gt,Ha).call(this,{type:"error",error:ae}),ae}finally{w(this,gn)===v&&K(this,gn,void 0),w(this,Ie).runNext(this)}}},os=new WeakMap,Lt=new WeakMap,Ie=new WeakMap,gn=new WeakMap,Gt=new WeakSet,Ha=function(o){const d=c=>{switch(o.type){case"failed":return{...c,failureCount:o.failureCount,failureReason:o.error};case"pause":return{...c,isPaused:!0};case"continue":return{...c,isPaused:!1};case"pending":return{...c,context:o.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:o.isPaused,status:"pending",variables:o.variables,submittedAt:Date.now()};case"success":return{...c,data:o.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...c,data:void 0,error:o.error,failureCount:c.failureCount+1,failureReason:o.error,isPaused:!1,status:"error"}}};this.state=d(this.state),$e.batch(()=>{w(this,Lt).forEach(c=>{c.onMutationUpdate(o)}),w(this,Ie).notify({mutation:this,type:"updated",action:o})})},$m);function Db(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var ua,Mt,ls,Pm,Rb=(Pm=class extends Ur{constructor(o={}){super();se(this,ua);se(this,Mt);se(this,ls);this.config=o,K(this,ua,new Set),K(this,Mt,new Map),K(this,ls,0)}build(o,d,c){const v=new Cb({client:o,mutationCache:this,mutationId:++Rr(this,ls)._,options:o.defaultMutationOptions(d),state:c});return this.add(v),v}add(o){w(this,ua).add(o);const d=jr(o);if(typeof d=="string"){const c=w(this,Mt).get(d);c?c.push(o):w(this,Mt).set(d,[o])}this.notify({type:"added",mutation:o})}remove(o){if(w(this,ua).delete(o)){const d=jr(o);if(typeof d=="string"){const c=w(this,Mt).get(d);if(c)if(c.length>1){const v=c.indexOf(o);v!==-1&&c.splice(v,1)}else c[0]===o&&w(this,Mt).delete(d)}}this.notify({type:"removed",mutation:o})}canRun(o){var c;const d=jr(o);if(typeof d=="string"){const v=(c=w(this,Mt).get(d))==null?void 0:c.find(O=>O.state.status==="pending");return!v||v===o}else return!0}runNext(o){var c,v;const d=jr(o);return typeof d=="string"?((v=(c=w(this,Mt).get(d))==null?void 0:c.find(O=>O!==o&&O.state.isPaused))==null?void 0:v.continue())??Promise.resolve():Promise.resolve()}clear(){$e.batch(()=>{w(this,ua).forEach(o=>{this.notify({type:"removed",mutation:o})}),w(this,ua).clear(),w(this,Mt).clear()})}getAll(){return Array.from(w(this,ua))}find(o){const d={exact:!0,...o};return this.getAll().find(c=>Rm(d,c))}findAll(o={}){return this.getAll().filter(d=>Rm(o,d))}notify(o){$e.batch(()=>{this.listeners.forEach(d=>{d(o)})})}resumePausedMutations(){const o=this.getAll().filter(d=>d.state.isPaused);return $e.batch(()=>Promise.all(o.map(d=>d.continue().catch(Rt))))}},ua=new WeakMap,Mt=new WeakMap,ls=new WeakMap,Pm);function jr(r){var o;return(o=r.options.scope)==null?void 0:o.id}var Qt,ef,Eb=(ef=class extends Ur{constructor(o={}){super();se(this,Qt);this.config=o,K(this,Qt,new Map)}build(o,d,c){const v=d.queryKey,O=d.queryHash??mc(v,d);let R=this.get(O);return R||(R=new Ab({client:o,queryKey:v,queryHash:O,options:o.defaultQueryOptions(d),state:c,defaultOptions:o.getQueryDefaults(v)}),this.add(R)),R}add(o){w(this,Qt).has(o.queryHash)||(w(this,Qt).set(o.queryHash,o),this.notify({type:"added",query:o}))}remove(o){const d=w(this,Qt).get(o.queryHash);d&&(o.destroy(),d===o&&w(this,Qt).delete(o.queryHash),this.notify({type:"removed",query:o}))}clear(){$e.batch(()=>{this.getAll().forEach(o=>{this.remove(o)})})}get(o){return w(this,Qt).get(o)}getAll(){return[...w(this,Qt).values()]}find(o){const d={exact:!0,...o};return this.getAll().find(c=>Dm(d,c))}findAll(o={}){const d=this.getAll();return Object.keys(o).length>0?d.filter(c=>Dm(o,c)):d}notify(o){$e.batch(()=>{this.listeners.forEach(d=>{d(o)})})}onFocus(){$e.batch(()=>{this.getAll().forEach(o=>{o.onFocus()})})}onOnline(){$e.batch(()=>{this.getAll().forEach(o=>{o.onOnline()})})}},Qt=new WeakMap,ef),Ne,Qa,Ya,oi,li,Xa,ci,di,tf,jb=(tf=class{constructor(r={}){se(this,Ne);se(this,Qa);se(this,Ya);se(this,oi);se(this,li);se(this,Xa);se(this,ci);se(this,di);K(this,Ne,r.queryCache||new Eb),K(this,Qa,r.mutationCache||new Rb),K(this,Ya,r.defaultOptions||{}),K(this,oi,new Map),K(this,li,new Map),K(this,Xa,0)}mount(){Rr(this,Xa)._++,w(this,Xa)===1&&(K(this,ci,of.subscribe(async r=>{r&&(await this.resumePausedMutations(),w(this,Ne).onFocus())})),K(this,di,Mr.subscribe(async r=>{r&&(await this.resumePausedMutations(),w(this,Ne).onOnline())})))}unmount(){var r,o;Rr(this,Xa)._--,w(this,Xa)===0&&((r=w(this,ci))==null||r.call(this),K(this,ci,void 0),(o=w(this,di))==null||o.call(this),K(this,di,void 0))}isFetching(r){return w(this,Ne).findAll({...r,fetchStatus:"fetching"}).length}isMutating(r){return w(this,Qa).findAll({...r,status:"pending"}).length}getQueryData(r){var d;const o=this.defaultQueryOptions({queryKey:r});return(d=w(this,Ne).get(o.queryHash))==null?void 0:d.state.data}ensureQueryData(r){const o=this.defaultQueryOptions(r),d=w(this,Ne).build(this,o),c=d.state.data;return c===void 0?this.fetchQuery(r):(r.revalidateIfStale&&d.isStaleByTime(zr(o.staleTime,d))&&this.prefetchQuery(o),Promise.resolve(c))}getQueriesData(r){return w(this,Ne).findAll(r).map(({queryKey:o,state:d})=>[o,d.data])}setQueryData(r,o,d){var R;const c=this.defaultQueryOptions({queryKey:r}),v=(R=w(this,Ne).get(c.queryHash))==null?void 0:R.state.data,O=cb(o,v);if(O!==void 0)return w(this,Ne).build(this,c).setData(O,{...d,manual:!0})}setQueriesData(r,o,d){return $e.batch(()=>w(this,Ne).findAll(r).map(({queryKey:c})=>[c,this.setQueryData(c,o,d)]))}getQueryState(r){var d;const o=this.defaultQueryOptions({queryKey:r});return(d=w(this,Ne).get(o.queryHash))==null?void 0:d.state}removeQueries(r){const o=w(this,Ne);$e.batch(()=>{o.findAll(r).forEach(d=>{o.remove(d)})})}resetQueries(r,o){const d=w(this,Ne);return $e.batch(()=>{const c=d.findAll(r),v=new Set(c);return c.forEach(O=>{O.reset()}),this.refetchQueries({type:"active",predicate:O=>v.has(O)},o)})}cancelQueries(r,o={}){const d={revert:!0,...o},c=$e.batch(()=>w(this,Ne).findAll(r).map(v=>v.cancel(d)));return Promise.all(c).then(Rt).catch(Rt)}invalidateQueries(r,o={}){return $e.batch(()=>(w(this,Ne).findAll(r).forEach(d=>{d.invalidate()}),(r==null?void 0:r.refetchType)==="none"?Promise.resolve():this.refetchQueries({...r,type:(r==null?void 0:r.refetchType)??(r==null?void 0:r.type)??"active"},o)))}refetchQueries(r,o={}){const d={...o,cancelRefetch:o.cancelRefetch??!0},c=$e.batch(()=>w(this,Ne).findAll(r).filter(v=>!v.isDisabled()&&!v.isStatic()).map(v=>{let O=v.fetch(void 0,d);return d.throwOnError||(O=O.catch(Rt)),v.state.fetchStatus==="paused"?Promise.resolve():O}));return Promise.all(c).then(Rt)}async query(r){const o=this.defaultQueryOptions(r);o.retry===void 0&&(o.retry=!1);const d=w(this,Ne).build(this,o),c=d.isStaleByTime(zr(o.staleTime,d))?await d.fetch(o):d.state.data,v=o.select;return v?v(c):c}fetchQuery(r){const o=this.defaultQueryOptions(r);o.retry===void 0&&(o.retry=!1);const d=w(this,Ne).build(this,o);return d.isStaleByTime(zr(o.staleTime,d))?d.fetch(o):Promise.resolve(d.state.data)}prefetchQuery(r){return this.fetchQuery(r).then(Rt).catch(Rt)}infiniteQuery(r){return r._type="infinite",this.query(r)}fetchInfiniteQuery(r){return r._type="infinite",this.fetchQuery(r)}prefetchInfiniteQuery(r){return this.fetchInfiniteQuery(r).then(Rt).catch(Rt)}ensureInfiniteQueryData(r){return r._type="infinite",this.ensureQueryData(r)}resumePausedMutations(){return Mr.isOnline()?w(this,Qa).resumePausedMutations():Promise.resolve()}getQueryCache(){return w(this,Ne)}getMutationCache(){return w(this,Qa)}getDefaultOptions(){return w(this,Ya)}setDefaultOptions(r){K(this,Ya,r)}setQueryDefaults(r,o){w(this,oi).set(ss(r),{queryKey:r,defaultOptions:o})}getQueryDefaults(r){const o=[...w(this,oi).values()],d={};return o.forEach(c=>{ui(r,c.queryKey)&&Object.assign(d,c.defaultOptions)}),d}setMutationDefaults(r,o){w(this,li).set(ss(r),{mutationKey:r,defaultOptions:o})}getMutationDefaults(r){const o=[...w(this,li).values()],d={};return o.forEach(c=>{ui(r,c.mutationKey)&&Object.assign(d,c.defaultOptions)}),d}defaultQueryOptions(r){if(r._defaulted)return r;const o={...w(this,Ya).queries,...this.getQueryDefaults(r.queryKey),...r,_defaulted:!0};return o.queryHash||(o.queryHash=mc(o.queryKey,o)),o.refetchOnReconnect===void 0&&(o.refetchOnReconnect=o.networkMode!=="always"),o.throwOnError===void 0&&(o.throwOnError=!!o.suspense),!o.networkMode&&o.persister&&(o.networkMode="offlineFirst"),o.queryFn===fc&&(o.enabled=!1),o}defaultMutationOptions(r){return r!=null&&r._defaulted?r:{...w(this,Ya).mutations,...(r==null?void 0:r.mutationKey)&&this.getMutationDefaults(r.mutationKey),...r,_defaulted:!0}}clear(){w(this,Ne).clear(),w(this,Qa).clear()}},Ne=new WeakMap,Qa=new WeakMap,Ya=new WeakMap,oi=new WeakMap,li=new WeakMap,Xa=new WeakMap,ci=new WeakMap,di=new WeakMap,tf);const zb=new jb({defaultOptions:{queries:{staleTime:1e4,refetchOnWindowFocus:!0,retry:1}}});/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mb=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),qb=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,d,c)=>c?c.toUpperCase():d.toLowerCase()),Um=r=>{const o=qb(r);return o.charAt(0).toUpperCase()+o.slice(1)},hf=(...r)=>r.filter((o,d,c)=>!!o&&o.trim()!==""&&c.indexOf(o)===d).join(" ").trim(),Ub=r=>{for(const o in r)if(o.startsWith("aria-")||o==="role"||o==="title")return!0};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hb=ge.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:d=2,absoluteStrokeWidth:c,className:v="",children:O,iconNode:R,...N},j)=>ge.createElement("svg",{ref:j,..._b,width:o,height:o,stroke:r,strokeWidth:c?Number(d)*24/Number(o):d,className:hf("lucide",v),...!O&&!Ub(N)&&{"aria-hidden":"true"},...N},[...R.map(([D,U])=>ge.createElement(D,U)),...Array.isArray(O)?O:[O]]));/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=(r,o)=>{const d=ge.forwardRef(({className:c,...v},O)=>ge.createElement(Hb,{ref:O,iconNode:o,className:hf(`lucide-${Mb(Um(r))}`,`lucide-${r}`,c),...v}));return d.displayName=Um(r),d};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bb=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",key:"11bfej"}]],Lb=Yt("command",Bb);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gb=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],Qb=Yt("graduation-cap",Gb);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yb=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Xb=Yt("lock",Yb);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vb=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Kb=Yt("log-out",Vb);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zb=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],Jb=Yt("mail",Zb);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ib=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],Fb=Yt("play",Ib);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wb=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],$b=Yt("rotate-ccw",Wb);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pb=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],pc=Yt("sparkles",Pb);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ev=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],tv=Yt("triangle-alert",ev);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const av=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],nv=Yt("zap",av),iv=[{id:"mastery",label:"The Mastery Path",to:"/",icon:pc,desc:"Unified Theory, Code Crucible & Spoken Defense",isFlagship:!0},{id:"learn",label:"The Library",to:"/learn",icon:Qb,desc:"Read the mechanism before drilling it"},{id:"rapid",label:"Rapid Fire OA",to:"/rapid",icon:nv,desc:"Mettl MCQ Simulator"},{id:"lab",label:"Sandbox Lab",to:"/playground",icon:Fb,desc:"Freeform Live Code Playground"}],_m=r=>{let o;const d=new Set,c=(D,U)=>{const C=typeof D=="function"?D(o):D;if(!Object.is(C,o)){const E=o;o=U??(typeof C!="object"||C===null)?C:Object.assign({},o,C),d.forEach(Y=>Y(o,E))}},v=()=>o,N={setState:c,getState:v,getInitialState:()=>j,subscribe:D=>(d.add(D),()=>d.delete(D))},j=o=r(c,v,N);return N},sv=(r=>r?_m(r):_m),rv=r=>r;function ov(r,o=rv){const d=Er.useSyncExternalStore(r.subscribe,Er.useCallback(()=>o(r.getState()),[r,o]),Er.useCallback(()=>o(r.getInitialState()),[r,o]));return Er.useDebugValue(d),d}const Hm=r=>{const o=sv(r),d=c=>ov(o,c);return Object.assign(d,o),d},lv=(r=>r?Hm(r):Hm),cv=864e5,Bm=[1,3,7,16,35],dv=3,mf="css100:sched",uv="css100:done";function hv(){try{const r=localStorage.getItem(mf);if(r)return JSON.parse(r)}catch{}try{const r=JSON.parse(localStorage.getItem(uv)||"{}"),o={};for(const[d,c]of Object.entries(r))c&&(o[d]={reps:0,intervalDays:0,dueAt:Date.now(),lapses:0,lastAt:Date.now(),lastPass:!1,overridden:!0});return o}catch{return{}}}function mv(r){try{localStorage.setItem(mf,JSON.stringify(r))}catch{}}function fv(r,o,d=!1){const c=Date.now();if(!o){const R=((r==null?void 0:r.lapses)??0)+1;return{reps:0,intervalDays:0,dueAt:c,lapses:R,lastAt:c,lastPass:!1,overridden:d}}const v=((r==null?void 0:r.reps)??0)+1,O=Bm[Math.min(v-1,Bm.length-1)];return{reps:v,intervalDays:O,dueAt:c+O*cv,lapses:(r==null?void 0:r.lapses)??0,lastAt:c,lastPass:!0,overridden:d}}function $v(r,o=Date.now()){return r?r.lapses>=dv&&!r.lastPass?"leech":r.dueAt<=o?"due":"held":"untouched"}function Lm(r,o){return{challengeId:r,mode:o,startedAt:Date.now(),firstKeyAt:null,keystrokes:0,hintsUsed:0,solutionRevealed:!1,graded:0}}function ff(r){let o=5381;for(let d=0;d<r.length;d++)o=(o*33^r.charCodeAt(d))>>>0;return o.toString(36)}function Gm(r){return`css100:${r.id}:${ff(r.css)}`}function Qm(r){return`css100:${r.id}:jsx:${ff(r.jsx)}`}function Ym(r,o){try{const d=localStorage.getItem(r);return d===null?o:d}catch{return o}}function Xm(r,o){try{localStorage.setItem(r,o)}catch{}}const pf=lv((r,o)=>({currentChallenge:null,filter:"all",schedule:hv(),jsxCode:"",cssCode:"",activeTab:"jsx",viewMode:"live",hudActive:!1,measureMode:!1,suggestionsOn:!0,vimMode:typeof localStorage<"u"&&localStorage.getItem("workbench:vim")==="true",mode:typeof localStorage<"u"&&localStorage.getItem("css100:mode")||"practice",attempt:null,gradeResult:null,grading:!1,paletteOpen:!1,timerActive:!1,timerLeft:75,campaign:null,pickChallenge:d=>r(c=>({currentChallenge:d,jsxCode:Ym(Qm(d),d.jsx),cssCode:Ym(Gm(d),d.css),activeTab:"jsx",gradeResult:null,attempt:Lm(d.id,c.mode)})),setMode:d=>{try{localStorage.setItem("css100:mode",d)}catch{}r(c=>({mode:d,hudActive:d==="exam"?!1:c.hudActive,viewMode:d==="exam"?"live":c.viewMode,gradeResult:null,timerActive:d==="exam",timerLeft:75,attempt:c.currentChallenge?Lm(c.currentChallenge.id,d):null}))},noteKeystroke:()=>r(d=>d.attempt?{attempt:{...d.attempt,keystrokes:d.attempt.keystrokes+1,firstKeyAt:d.attempt.firstKeyAt??Date.now()}}:{}),noteHint:()=>r(d=>d.attempt?{attempt:{...d.attempt,hintsUsed:d.attempt.hintsUsed+1}}:{}),noteReveal:()=>r(d=>d.attempt?{attempt:{...d.attempt,solutionRevealed:!0}}:{}),setGradeResult:d=>r(c=>({gradeResult:d,attempt:c.attempt&&d?{...c.attempt,graded:c.attempt.graded+1}:c.attempt})),setGrading:d=>r({grading:d}),setPaletteOpen:d=>r({paletteOpen:d}),setFilter:d=>r({filter:d}),recordReview:(d,c,v=!1)=>{const O={...o().schedule,[d]:fv(o().schedule[d],c,v)};mv(O),r({schedule:O})},updateJsx:d=>{const c=o().currentChallenge;c&&Xm(Qm(c),d),r({jsxCode:d})},updateCss:d=>{const c=o().currentChallenge;c&&Xm(Gm(c),d),r({cssCode:d})},setActiveTab:d=>r({activeTab:d}),setViewMode:d=>r({viewMode:d}),toggleHud:()=>r(d=>({hudActive:!d.hudActive})),toggleMeasure:()=>r(d=>({measureMode:!d.measureMode})),toggleSuggestions:()=>r(d=>({suggestionsOn:!d.suggestionsOn})),toggleVimMode:()=>r(d=>{const c=!d.vimMode;try{localStorage.setItem("workbench:vim",String(c))}catch{}return{vimMode:c}}),toggleTimer:()=>r(d=>({timerActive:!d.timerActive,timerLeft:75})),tickTimer:()=>r(d=>({timerLeft:Math.max(0,d.timerLeft-1)})),resetTimer:()=>r({timerLeft:75}),setCampaign:d=>r({campaign:d})})),gf=ge.createContext(null);function pv(r){const o=cs.c(13),{children:d}=r,[c,v]=ge.useState(null);let O;o[0]===Symbol.for("react.memo_cache_sentinel")?(O=localStorage.getItem("token"),o[0]=O):O=o[0];const[R,N]=ge.useState(O),[j,D]=ge.useState(!0);let U,C;o[1]!==R?(U=()=>{R?fetch("/api/auth/me",{headers:{Authorization:`Bearer ${R}`}}).then(gv).then(V=>{v(V),D(!1)}).catch(()=>{N(null),v(null),localStorage.removeItem("token"),D(!1)}):D(!1)},C=[R],o[1]=R,o[2]=U,o[3]=C):(U=o[2],C=o[3]),ge.useEffect(U,C);let E;o[4]===Symbol.for("react.memo_cache_sentinel")?(E=(V,H)=>{N(V),v(H),localStorage.setItem("token",V)},o[4]=E):E=o[4];const Y=E;let Q;o[5]===Symbol.for("react.memo_cache_sentinel")?(Q=()=>{N(null),v(null),localStorage.removeItem("token")},o[5]=Q):Q=o[5];const J=Q;let Z;o[6]!==j||o[7]!==R||o[8]!==c?(Z={user:c,token:R,login:Y,logout:J,isLoading:j},o[6]=j,o[7]=R,o[8]=c,o[9]=Z):Z=o[9];let F;return o[10]!==d||o[11]!==Z?(F=A.jsx(gf.Provider,{value:Z,children:d}),o[10]=d,o[11]=Z,o[12]=F):F=o[12],F}function gv(r){if(!r.ok)throw new Error("Invalid token");return r.json()}function gc(){const r=ge.useContext(gf);if(!r)throw new Error("useAuth must be used within an AuthProvider");return r}function bv(){const r=cs.c(24),{setPaletteOpen:o}=pf(),d=Yg(),{user:c,logout:v}=gc();let O;r[0]===Symbol.for("react.memo_cache_sentinel")?(O=A.jsxs(wm,{to:"/",className:"flex items-center gap-2.5 group",children:[A.jsx("div",{className:"w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform",children:A.jsx(pc,{size:14,className:"text-white"})}),A.jsx("span",{className:"text-sm font-black tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-white bg-clip-text text-transparent",children:"React Prep Wizard"})]}),r[0]=O):O=r[0];let R;r[1]!==d?(R=iv.map(V=>{const{id:H,to:L,icon:M,label:de,isFlagship:G}=V,P=L==="/"?d.pathname==="/":d.pathname.startsWith(L);return A.jsxs(wm,{to:L,className:`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-150 ${P?G?"bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-xs":"bg-sky-600 text-white shadow-xs":G?"text-amber-300 hover:text-amber-200 hover:bg-amber-500/10":"text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"}`,children:[A.jsx(M,{size:13}),A.jsx("span",{children:de})]},H)}),r[1]=d,r[2]=R):R=r[2];let N;r[3]!==R?(N=A.jsxs("div",{className:"flex items-center gap-5 flex-wrap",children:[O,A.jsx("nav",{className:"flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800",children:R})]}),r[3]=R,r[4]=N):N=r[4];let j;r[5]!==c?(j=c&&A.jsx("span",{className:"text-[11px] text-slate-400 font-medium hidden md:inline",children:c.email}),r[5]=c,r[6]=j):j=r[6];let D;r[7]!==o?(D=()=>o(!0),r[7]=o,r[8]=D):D=r[8];let U,C;r[9]===Symbol.for("react.memo_cache_sentinel")?(U=A.jsx(Lb,{size:13,className:"text-slate-400"}),C=A.jsx("span",{className:"font-mono text-[11px]",children:"⌘K"}),r[9]=U,r[10]=C):(U=r[9],C=r[10]);let E;r[11]!==D?(E=A.jsxs("button",{onClick:D,className:"px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-xs text-slate-300 flex items-center gap-1.5 transition cursor-pointer",title:"Command Palette (Cmd+K)",children:[U,C]}),r[11]=D,r[12]=E):E=r[12];let Y,Q;r[13]===Symbol.for("react.memo_cache_sentinel")?(Y=A.jsx(Kb,{size:13}),Q=A.jsx("span",{className:"hidden sm:inline text-[11px]",children:"Log out"}),r[13]=Y,r[14]=Q):(Y=r[13],Q=r[14]);let J;r[15]!==v?(J=A.jsxs("button",{onClick:v,className:"px-2.5 py-1 bg-slate-900 hover:bg-rose-950/40 hover:text-rose-300 border border-slate-700/60 hover:border-rose-500/40 rounded-lg text-xs text-slate-400 transition cursor-pointer flex items-center gap-1.5",title:"Log out",children:[Y,Q]}),r[15]=v,r[16]=J):J=r[16];let Z;r[17]!==J||r[18]!==j||r[19]!==E?(Z=A.jsxs("div",{className:"flex items-center gap-2.5",children:[j,E,J]}),r[17]=J,r[18]=j,r[19]=E,r[20]=Z):Z=r[20];let F;return r[21]!==Z||r[22]!==N?(F=A.jsx("header",{className:"bg-slate-950 border-b border-slate-800 text-white shrink-0 shadow-md relative z-30",children:A.jsxs("div",{className:"px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap",children:[N,Z]})}),r[21]=Z,r[22]=N,r[23]=F):F=r[23],F}function vv(r){const o=cs.c(31),{onClose:d,actions:c}=r,[v,O]=ge.useState(""),[R,N]=ge.useState(0),j=ge.useRef(null);let D,U;o[0]===Symbol.for("react.memo_cache_sentinel")?(D=()=>{var G;(G=j.current)==null||G.focus()},U=[],o[0]=D,o[1]=U):(D=o[0],U=o[1]),ge.useLayoutEffect(D,U);let C;if(o[2]!==c||o[3]!==v){const G={id:"noop_na",label:"— NA / Nothing (No Action) —",group:"Cancel",hint:"Enter / Esc",run:wv};e:{const P=c.filter(Boolean),ae=v.trim().toLowerCase();if(!ae){C=[G,...P.slice(0,40)];break e}const me=P.filter(Qe=>{const oe=`${Qe.group} ${Qe.label}`.toLowerCase();let Re=0;for(const vt of ae){if(Re=oe.indexOf(vt,Re),Re===-1)return!1;Re++}return!0}).slice(0,40);C=[G,...me]}o[2]=c,o[3]=v,o[4]=C}else C=o[4];const E=C;let Y;o[5]!==d?(Y=G=>{G&&(d(),G.run())},o[5]=d,o[6]=Y):Y=o[6];const Q=Y;let J;o[7]===Symbol.for("react.memo_cache_sentinel")?(J=G=>{O(G.target.value),N(0)},o[7]=J):J=o[7];let Z;o[8]!==Q||o[9]!==E||o[10]!==d||o[11]!==R?(Z=G=>{G.key==="Escape"&&(G.preventDefault(),d()),G.key==="ArrowDown"&&(G.preventDefault(),N(P=>Math.min(P+1,E.length-1))),G.key==="ArrowUp"&&(G.preventDefault(),N(yv)),G.key==="Enter"&&(G.preventDefault(),Q(E[R]))},o[8]=Q,o[9]=E,o[10]=d,o[11]=R,o[12]=Z):Z=o[12];let F;o[13]!==v||o[14]!==Z?(F=A.jsx("input",{ref:j,value:v,onChange:J,onKeyDown:Z,placeholder:"Run a command…",className:"w-full px-4 py-3 text-sm border-b border-slate-200 outline-none"}),o[13]=v,o[14]=Z,o[15]=F):F=o[15];let V;o[16]!==E.length?(V=E.length===0&&A.jsx("li",{className:"px-4 py-3 text-xs text-slate-400",children:"no matching command"}),o[16]=E.length,o[17]=V):V=o[17];let H;o[18]!==Q||o[19]!==E||o[20]!==R?(H=E.map((G,P)=>A.jsx("li",{children:A.jsxs("button",{onMouseEnter:()=>N(P),onClick:()=>Q(G),className:`w-full text-left px-4 py-2 flex items-baseline gap-2 text-sm ${P===R?"bg-sky-700 text-white":"hover:bg-slate-100"}`,children:[A.jsx("span",{className:`text-[0.6rem] font-bold uppercase tracking-wider ${P===R?"text-sky-200":"text-slate-400"}`,children:G.group}),A.jsx("span",{className:"flex-1",children:G.label}),G.hint&&A.jsx("kbd",{className:`text-[0.6rem] font-mono px-1.5 py-0.5 rounded ${P===R?"bg-sky-800 text-sky-100":"bg-slate-100 text-slate-500"}`,children:G.hint})]})},G.id)),o[18]=Q,o[19]=E,o[20]=R,o[21]=H):H=o[21];let L;o[22]!==V||o[23]!==H?(L=A.jsxs("ul",{className:"max-h-80 overflow-auto py-1",children:[V,H]}),o[22]=V,o[23]=H,o[24]=L):L=o[24];let M;o[25]!==L||o[26]!==F?(M=A.jsxs("div",{className:"w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden",onClick:xv,children:[F,L]}),o[25]=L,o[26]=F,o[27]=M):M=o[27];let de;return o[28]!==d||o[29]!==M?(de=A.jsx("div",{className:"fixed inset-0 z-50 bg-slate-900/40 flex items-start justify-center pt-[12vh]",onClick:d,children:M}),o[28]=d,o[29]=M,o[30]=de):de=o[30],de}function yv(r){return Math.max(r-1,0)}function xv(r){return r.stopPropagation()}function wv(){}const kv=[{id:"vanilla-debounce",trackId:"js_practical",trackName:"Vanilla JS Machine Coding",title:"The Debounced Search API",level:"Crucible",category:"Async & DOM",xp:250,theory:{hook:"Mettl throws a curveball: 'Build a search bar that calls an API, but you cannot use React.' Can you survive?",deepDive:"A classic technical round trap. They want to see if you rely entirely on React hooks or if you actually understand the underlying browser mechanics. You must use a closure to hold the `timer` ID, `clearTimeout` on every keystroke, and invoke the network request only when the user stops typing.",interviewPitch:"'Debouncing limits the rate at which a function fires. It’s crucial for performance on search inputs or window resizes. I implement it using a higher-order function that returns a closure; the closure tracks the timeout ID and resets it every time it's called before the delay expires.'",mcq:{q:"In a debounce function, why must the timer variable be declared OUTSIDE the returned inner function?",options:["Because inner functions cannot declare variables.","So the variable persists in memory (closure) across multiple calls to the inner function.","To make it globally accessible to the window object.","To avoid strict mode errors."],correct:1,why:"If the timer was declared inside the returned function, it would be recreated as `undefined` on every keystroke, destroying the ability to clear the previous timeout."}},practice:{type:"js_snippet",task:"Implement the `debounce` higher-order function. It should delay calling `fn` until `delay` ms have passed since the last invocation.",starterCode:`function debounce(fn, delay) {
  // Your code here
}

// Test case (should only log "Fetching: apple" once)
const fetchResults = debounce((query) => console.log("Fetching:", query), 300);

fetchResults("a");
fetchResults("ap");
fetchResults("app");
fetchResults("appl");
fetchResults("apple");`,solutionCode:`function debounce(fn, delay) {
  let timerId;
  
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const fetchResults = debounce((query) => console.log("Fetching:", query), 300);

fetchResults("a");
fetchResults("ap");
fetchResults("app");
fetchResults("appl");
fetchResults("apple");`,specs:["Should execute the function only once after rapid successive calls."]}},{id:"polyfill-reduce",trackId:"js_practical",trackName:"Vanilla JS Machine Coding",title:"Polyfill: Array.prototype.reduce",level:"Advanced",category:"Polyfills",xp:300,theory:{hook:"If you don't know how `reduce` works under the hood, how can you trust it for complex data transformations?",deepDive:"Writing polyfills is the ultimate test of JS mastery. To build `reduce`, you must understand `this` (which points to the array calling the method), handle the optional `initialValue`, and iterate correctly, feeding the accumulator forward into the callback.",interviewPitch:"'Writing a polyfill for reduce requires handling the execution context (`this`), managing the accumulator state, and treating the initial value correctly. If no initial value is provided, the first element of the array becomes the accumulator, and iteration starts from index 1.'",mcq:{q:"Inside a polyfill function assigned to `Array.prototype.myMap = function() { ... }`, what does `this` refer to?",options:["The global window object.","The `myMap` function itself.","The array that the method was called on.","undefined"],correct:2,why:"When a function is called as a method on an object (e.g., `[1,2,3].myMap()`), `this` binds to the object (the array) left of the dot."}},practice:{type:"js_snippet",task:"Implement `Array.prototype.myReduce`. Do not use the native `.reduce()`.",starterCode:`Array.prototype.myReduce = function(callback, initialValue) {
  // Your code here. Remember 'this' is the array.
  
};

const nums = [1, 2, 3, 4];
const sum = nums.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // Should be 10`,solutionCode:`Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  // If no initialValue is provided, use the first element
  if (initialValue === undefined) {
    if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

const nums = [1, 2, 3, 4];
const sum = nums.myReduce((acc, curr) => acc + curr, 0);
console.log(sum);`,specs:["Should correctly accumulate values with and without an initial value."]}}],Sv=[{id:"js-traps-hoisting",trackId:"js_traps",trackName:"JS Execution & Traps",title:"The Temporal Dead Zone (Hoisting)",level:"Core",category:"Execution Context",xp:150,theory:{hook:"Why does `var` give you `undefined` while `let` and `const` throw a ReferenceError? Welcome to the TDZ.",deepDive:"All declarations (even `let` and `const`) are hoisted to the top of their block scope in the Creation Phase. However, `var` is initialized with `undefined` immediately. `let` and `const` remain uninitialized in the Temporal Dead Zone (TDZ) until the parser evaluates their assignment line. Accessing them before that throws a ReferenceError.",interviewPitch:"In an interview, explain that hoisting applies to all variable declarations, but the *initialization* behavior differs. Use this to explain why `var` is dangerous—it fails silently by returning `undefined`, whereas the TDZ in `let`/`const` forces a strict fail-fast error, preventing subtle runtime bugs.",mcq:{q:`What is the output of the following?

console.log(a);
console.log(b);
var a = 1;
let b = 2;`,options:["undefined, ReferenceError","ReferenceError, ReferenceError","undefined, undefined","1, 2"],correct:0,why:"`var a` is hoisted and initialized to `undefined`. `let b` is hoisted but stays in the TDZ, so accessing it throws a ReferenceError."}},practice:{type:"js_snippet",task:"Fix the function so it doesn't throw a ReferenceError or output `undefined`. Ensure the function captures the correct scoped variables.",starterCode:`function calculate() {
  console.log(multiplier);
  console.log(calculateTotal());

  var multiplier = 10;
  
  const calculateTotal = () => {
    return 5 * multiplier;
  };
}

calculate();`,solutionCode:`function calculate() {
  const multiplier = 10;
  
  const calculateTotal = () => {
    return 5 * multiplier;
  };

  console.log(multiplier);
  console.log(calculateTotal());
}

calculate();`,specs:["Should correctly order variable declarations to avoid TDZ and undefined."]}},{id:"js-traps-this-binding",trackId:"js_traps",trackName:"JS Execution & Traps",title:"`this` Binding & Arrow Function Traps",level:"Advanced",category:"Execution Context",xp:200,theory:{hook:"Why does passing an object method as a callback log `undefined` or the global object instead of your target data?",deepDive:"In standard functions, `this` is dynamically bound based on *how* the function is invoked (the call site). When detached as a callback, it defaults to `undefined` (in strict mode) or `window`. Arrow functions do NOT possess their own `this` binding—they lexically capture `this` from the enclosing lexical execution context at definition time.",interviewPitch:"State clearly: 'Arrow functions do not bind their own `this`, `arguments`, `super`, or `new.target`. They inherit `this` from the parent scope. Standard functions bind `this` dynamically at invocation time unless explicitly bound using `.bind()`, `.call()`, or `.apply()`.'",mcq:{q:`What does the following snippet log?

const obj = {
  val: 42,
  getVal: () => this.val
};
console.log(obj.getVal());`,options:["42","undefined","TypeError","NaN"],correct:1,why:"Object literals do NOT create a new lexical scope. The arrow function captures `this` from the outer module or window scope, where `val` is undefined."}},practice:{type:"js_snippet",task:"Fix the timer callback inside the `Timer` class so it correctly accesses `this.seconds` without losing the class instance context.",starterCode:`class Timer {
  constructor() {
    this.seconds = 0;
  }
  start() {
    setTimeout(function() {
      this.seconds += 1;
      console.log("Seconds:", this.seconds);
    }, 100);
  }
}

const t = new Timer();
t.start();`,solutionCode:`class Timer {
  constructor() {
    this.seconds = 0;
  }
  start() {
    setTimeout(() => {
      this.seconds += 1;
      console.log("Seconds:", this.seconds);
    }, 100);
  }
}

const t = new Timer();
t.start();`,specs:["Should preserve `this` context inside asynchronous callback."]}}],Tv=[{id:"js-traps-event-loop",trackId:"js_traps",trackName:"JS Execution & Traps",title:"Microtasks vs Macrotasks Execution Order",level:"Advanced",category:"Event Loop",xp:250,theory:{hook:"In what order do `setTimeout(..., 0)`, `Promise.resolve()`, `queueMicrotask`, and synchronous code execute?",deepDive:"The JavaScript runtime executes synchronous code on the Call Stack. When the Call Stack clears, the Event Loop processes the ENTIRE Microtask Queue (Promises, `queueMicrotask`, MutationObserver) before executing the NEXT SINGLE Macrotask (`setTimeout`, `setInterval`, I/O). If a microtask enqueues another microtask, it will starve the macrotask queue.",interviewPitch:"Explain: 'Microtasks have higher priority than macrotasks. The event loop drains the entire microtask queue at the end of each tick/macrotask, before yielding to the browser rendering phase or the next macrotask.'",mcq:{q:`What is the logged sequence of:
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,options:["1, 4, 3, 2","1, 2, 3, 4","1, 4, 2, 3","3, 1, 4, 2"],correct:0,why:"Synchronous logs (1, 4) execute first. Then the Promise microtask (3) drains. Finally, the setTimeout macrotask (2) runs."}},practice:{type:"js_snippet",task:"Arrange the calls so that the console output matches the exact order: Sync 1, Sync 2, Micro 1, Micro 2, Macro 1.",starterCode:`// Produce output:
// Sync 1
// Sync 2
// Micro 1
// Micro 2
// Macro 1

console.log('Sync 1');`,solutionCode:`console.log('Sync 1');

setTimeout(() => {
  console.log('Macro 1');
}, 0);

Promise.resolve().then(() => {
  console.log('Micro 1');
}).then(() => {
  console.log('Micro 2');
});

console.log('Sync 2');`,specs:["Should execute with correct Event Loop priority."]}},{id:"js-traps-loop-closures",trackId:"js_traps",trackName:"JS Execution & Traps",title:"The `var` Loop Closure Trap",level:"Crucible",category:"Closures",xp:300,theory:{hook:"Why does a `setTimeout` inside a `for (var i = 0; i < 3)` loop output `3, 3, 3` instead of `0, 1, 2`?",deepDive:"`var` is function-scoped, not block-scoped. So there is only ONE `i` variable in memory for the entire loop. When the loop finishes, `i` is 3. Later, when the `setTimeout` callbacks execute, they all look up that exact same `i` reference in the closure, which is now 3. `let`, on the other hand, is block-scoped, creating a brand new, distinct `i` variable in memory for every single iteration.",interviewPitch:"'The classic `var` loop issue is a scoping problem. The callbacks close over a single shared variable binding. By changing `var` to `let`, we create a new lexical environment for each iteration, meaning each callback closes over a fresh, immutable copy of `i` for that specific loop step.'",mcq:{q:"Besides changing `var` to `let`, how else can you fix the `var` loop closure bug in legacy code?",options:["Use an Immediately Invoked Function Expression (IIFE) to capture the value.","Pass `i` as the third argument to `setTimeout`.","Both A and B work.","It's impossible in ES5."],correct:2,why:"An IIFE creates a new function scope, capturing the current value of `i`. `setTimeout(fn, ms, arg1)` passes the arguments directly to the callback."}},practice:{type:"js_snippet",task:"Fix this code so it logs 0, 1, 2 instead of 3, 3, 3 WITHOUT using `let` (pretend you are in an ES5 environment).",starterCode:`for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log("Index:", i);
  }, 100);
}`,solutionCode:`for (var i = 0; i < 3; i++) {
  (function(currentIndex) {
    setTimeout(function() {
      console.log("Index:", currentIndex);
    }, 100);
  })(i);
}`,specs:["Should log correct indices via closure capture (IIFE or setTimeout args)."]}}],Ov=[...Sv,...Tv],Av=[{id:"react-redux-flow",trackId:"react_ecosystem",trackName:"Ecosystem & Tooling",title:"Redux Data Flow & Purity",level:"Core",category:"State Management",xp:200,theory:{hook:"Why must Redux reducers be absolutely pure? What happens if you mutate state directly?",deepDive:"Redux uses shallow equality (`===`) to determine if the state has changed. If you mutate a nested array (e.g., `state.users.push(newUser)`) and return the same state object, the reference hasn't changed. React-Redux (`useSelector`) will see `oldState === newState`, assume nothing happened, and completely skip the re-render. Reducers must return a brand new object/array reference (`...state`) to break the equality check.",interviewPitch:"'Reducers are pure functions mapping `(state, action) => newState`. If you mutate state, you destroy the immutability contract. Redux relies on strict reference equality checks for performance; mutating state means `useSelector` won't trigger a re-render. This is why tools like Redux Toolkit use Immer under the hood to let you write mutating syntax that compiles into immutable updates.'",mcq:{q:"Which of the following reducer cases is valid and will trigger a UI update?",options:["state.count++; return state;","return Object.assign(state, { count: state.count + 1 });","return { ...state, count: state.count + 1 };","state.count = state.count + 1; return { ...state };"],correct:2,why:"Option C creates a completely new root object reference without mutating the original state object. Object.assign into `state` mutates the original reference."}},practice:{type:"js_snippet",task:"Fix this vanilla Redux reducer so it correctly updates a nested user object immutably.",starterCode:`const initialState = {
  settings: { theme: 'dark' },
  user: { name: 'Alice', age: 25 }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'BIRTHDAY':
      // FIX THIS: Do not mutate state!
      state.user.age += 1;
      return state;
    default:
      return state;
  }
}`,solutionCode:`const initialState = {
  settings: { theme: 'dark' },
  user: { name: 'Alice', age: 25 }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'BIRTHDAY':
      return {
        ...state,
        user: {
          ...state.user,
          age: state.user.age + 1
        }
      };
    default:
      return state;
  }
}`,specs:["Should return a completely new state tree branch immutably."]}},{id:"react-router-v6",trackId:"react_ecosystem",trackName:"Ecosystem & Tooling",title:"React Router v6 Paradigms",level:"Core",category:"Routing",xp:150,theory:{hook:"How does React Router change the URL without causing a full page reload?",deepDive:"React Router uses the HTML5 History API (`pushState` and `replaceState`). When you click a `<Link>`, it intercepts the default `<a>` tag behavior (`e.preventDefault()`), pushes the new URL to the browser history, and updates a global context state. The `<Routes>` component listens to this context, unmounts the old component, and mounts the new one matching the path.",interviewPitch:"'React Router bridges the browser's History API with React's component tree. In v6, nested routing is handled seamlessly with the `<Outlet>` component, acting as a placeholder for child routes. This allows for persistent UI elements like sidebars while only re-rendering the inner page content.'",mcq:{q:"In React Router v6, what is the purpose of the `<Outlet />` component?",options:["It forces a hard reload of the page.","It acts as a placeholder to render nested child route components.","It defines the root router provider.","It replaces the `useNavigate` hook."],correct:1,why:"`<Outlet />` is placed in a parent route layout to tell React Router where to render the matching child routes."}},practice:{type:"jsx",task:"Build a nested route layout. The parent `Dashboard` should render a title and an `<Outlet />` so the child `Profile` can render inside it.",starterCode:`import { Routes, Route, Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* ADD OUTLET HERE */}
    </div>
  );
}

function Profile() { return <h2>My Profile</h2>; }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        {/* NEST PROFILE ROUTE HERE */}
      </Route>
    </Routes>
  );
}`,solutionCode:`import { Routes, Route, Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}

function Profile() { return <h2>My Profile</h2>; }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}`,specs:["Should correctly use Outlet and nested Routes."]}},{id:"build-tooling-tree-shaking",trackId:"react_ecosystem",trackName:"Ecosystem & Tooling",title:"Webpack & Tree Shaking",level:"Advanced",category:"Tooling",xp:200,theory:{hook:"How does Webpack know which code is 'dead' and can be safely deleted from your final production bundle?",deepDive:"This process is called 'Tree Shaking'. It relies entirely on the static nature of ES6 modules (`import`/`export`). Because ES6 modules are static, bundlers can analyze the dependency tree at compile-time (unlike `require()`, which is dynamic). If an exported function is never imported anywhere, Webpack marks it as dead code. The minifier (like Terser) then completely removes it from the final bundle.",interviewPitch:"'Tree shaking is dead-code elimination. It only works with ES6 modules because their static structure allows the bundler to map dependencies without executing the code. To ensure it works, we must ensure Babel isn't transpiling our imports down to CommonJS (`require`), and we must be careful with 'side effects' (code that executes just by importing a file).'",mcq:{q:"Why does Tree Shaking fail if you use CommonJS `require()`?",options:["CommonJS is asynchronous.","CommonJS modules are evaluated dynamically at runtime, so the bundler cannot prove what is used.","CommonJS requires strict mode.","Webpack doesn't support CommonJS."],correct:1,why:"With `require()`, you can conditionally import modules inside `if` statements. The bundler cannot predict runtime paths, so it must bundle everything."}},practice:{type:"js_snippet",task:"Refactor this CommonJS code into ES6 Modules so that Webpack can tree-shake `formatDate` if it's never used.",starterCode:`// utils.js
function sum(a, b) { return a + b; }
function formatDate(date) { return date.toISOString(); }

module.exports = { sum, formatDate };

// app.js
const utils = require('./utils');
console.log(utils.sum(2, 2));`,solutionCode:`// utils.js
export function sum(a, b) { return a + b; }
export function formatDate(date) { return date.toISOString(); }

// app.js
import { sum } from './utils';
console.log(sum(2, 2));`,specs:["Should use ES6 static imports/exports for tree-shaking support."]}}],Vm=(r,o,d,c,v)=>`/* ${r}
   Write it out, then record yourself saying it in 60 seconds.
   Aim for 4–6 sentences. Specifics beat adjectives every time. */

SITUATION — ${o}
  →

TASK — ${d}
  →

ACTION — ${c}
  →

RESULT — ${v}
  →
`,Nv=[{id:"hr-pitch",trackId:"behavioural",trackName:"Behavioural & HR",category:"The Opening",title:"Tell me about yourself — the 30-second version",level:"Warm-up",xp:40,theory:{hook:"The first question is not a biography request. It is a positioning question, and the answer sets the frame for every question after it.",deepDive:"A strong answer is three beats and under 45 seconds. (1) Where you are now, in one line — role, stack, scale. (2) The one thing that makes you unusual, stated as a capability rather than a claim. (3) Why this role, connected to something specific about the team or the work. Then stop.",interviewPitch:'"I build front-end systems in React — most recently a spec-first workflow where the tooling grades the work rather than the developer marking their own homework. What I bring beyond the stack is that I design the process around the failure mode, not just the feature."'},why:"It is asked in every round, by every interviewer, and it is the only answer you can prepare word-for-word without it sounding rehearsed.",verify:"Record it. If it runs past 45 seconds, or if you cannot say it without reading, it is not ready.",hints:["Three beats: where you are now · what makes you unusual · why this role. Nothing else.",'Replace every adjective with a fact. Not "passionate about performance" — "cut a 2.4s LCP to 900ms".',"End on the role, not on yourself. The last sentence should point at them."],practice:{type:"js_snippet",task:"Draft your opening pitch in the editor. Then record yourself delivering it in under 45 seconds.",starterCode:`/* Tell me about yourself — 30 to 45 seconds.
   Three beats. No chronology. End on why this team. */

1. CURRENT ROLE & SCALE
   →

2. THE UNUSUAL CAPABILITY (one concrete thing you do that others do not)
   →

3. WHY THIS ROLE (connected to something specific about them)
   →
`,solutionCode:"",specs:["Under 45 seconds spoken","No college-to-present chronology","Contains at least one concrete number (scale, users, time, latency)","Ends on why this company, not on a generic goal"]}},{id:"hr-conflict",trackId:"behavioural",trackName:"Behavioural & HR",category:"STAR Stories",title:"A time you disagreed with a technical decision",level:"Core",xp:50,theory:{hook:"They are not asking whether you were right. They are asking whether you can disagree without creating wreckage, and whether you can execute a decision you lost.",deepDive:"The shape: you had a different view on an architectural or process choice · you grounded your argument in data/constraints rather than taste · you stated your case clearly · a decision was made · you committed fully either way. If you won, the victory was quiet; if you lost, you did not drag your feet.",interviewPitch:'"We were choosing between writing a custom virtualised list and using an off-the-shelf library for a 10k-item view. I advocated the library because our edge cases were standard. The lead wanted custom to avoid bundle weight. I ran a spike, measured the bundle delta at 8kB, and we went with the library. If we had stayed with custom, I would have owned the tests."'},why:"Seniority is mostly how you handle disagreement. A junior engineer treats it as a fight to win; a senior engineer treats it as a search for the cheapest correct answer.",hints:["The disagreement must be technical or process, never interpersonal.","Show the evidence you brought, not just the opinion you held.","The ending must show commitment, whether your view was taken or not."],practice:{type:"js_snippet",task:"Write your STAR answer for a technical disagreement. Then record the 60-second version.",starterCode:Vm("A time you disagreed with a technical decision.","What was the decision, and who was involved?","What was your proposal, and why did you believe it was better?","How did you make the case — what evidence or spike did you bring?","What was decided, and how did you execute after the decision was made?"),solutionCode:"",specs:["Situation is technical, not personal","The disagreement was resolved with evidence, not authority","Result shows full commitment to the outcome","Under 60 seconds spoken"]}},{id:"hr-failure",trackId:"behavioural",trackName:"Behavioural & HR",category:"STAR Stories",title:"A time you caused or handled a production outage",level:"Core",xp:50,theory:{hook:"A candidate who has never broken production has either never shipped anything or does not know when they broke it.",deepDive:'The answer that loses the interview is the fake failure: "I worked too hard" or "a third-party API went down". A real failure has a real blast radius, your own contribution acknowledged without hiding behind the team, and a permanent change made to the system so the same mistake is impossible.',interviewPitch:'"I pushed an un-memoized selector into a shared hook that caused a re-render cascade on every keypress in our main form. We caught it in staging telemetry before deploy. The fix was two lines; the real work was adding an ESLint rule so the pattern fails in CI for anyone else."'},why:"Interviewers look for psychological safety and systemic thinking. Hiding a failure signals risk; explaining what you fixed in the system signals reliability.",hints:["Pick a real mistake, not a humblebrag.","Spend 20% on the mistake, 80% on the response and the systemic fix.",'The fix must be a mechanism (linter, test, alert, runbook), not "I was more careful".'],practice:{type:"js_snippet",task:"Write your outage/failure STAR story. Then record the 60-second version.",starterCode:Vm("A time you made a mistake that affected production or the team.","What was the context, and what actually broke?","What were you accountable for?","What did you do once you knew — including telling people?","What mechanism changed so it cannot happen the same way again?"),solutionCode:"",specs:["A real cost is named","Your own share is owned without blaming others","Most of the answer is the fix, not the failure",'The fix is systemic — a check, a test, a process — not "I was more careful"']}}],Cv=[{id:"hr-project",trackId:"behavioural",trackName:"Behavioural & HR",category:"Depth",title:"Walk me through a project you are proud of",level:"Core",xp:40,theory:{hook:"This is a technical question wearing behavioural clothes. They are looking for the decisions, the constraints and the trade-offs — not the feature list.",deepDive:"Structure it as: the problem and who had it · the constraint that made it hard · two decisions you made and what you gave up for each · how you knew it worked. The trade-off sentences are the whole answer.",interviewPitch:'"Problem, constraint, two trade-offs, evidence it worked. Then stop and let them pick which thread to pull."'},why:"The longest answer you will give, and the one where interviewers form their technical opinion of you.",hints:["Lead with the problem and the person who had it, never with the stack.","Two trade-offs, each with what you gave up. That is the scored part.",'Have a number for "how you knew it worked".'],practice:{type:"js_snippet",task:"Draft the project narrative. Then record the 90-second version.",starterCode:`/* Walk me through a project you are proud of.
   Problem → constraint → two trade-offs → evidence. Record the 90s version. */

PROBLEM — who had it, and what it cost them
  →

CONSTRAINT — what made this hard (time, scale, legacy, team)
  →

TRADE-OFF 1 — chose ___ over ___ because ___ ; gave up ___
  →

TRADE-OFF 2 — chose ___ over ___ because ___ ; gave up ___
  →

EVIDENCE — the number that shows it worked
  →
`,solutionCode:"",specs:["Opens with the problem, not the stack","Names a real constraint","Contains two explicit trade-offs with what was given up","Ends with a measurement"]}},{id:"hr-questions",trackId:"behavioural",trackName:"Behavioural & HR",category:"The Close",title:"Do you have any questions for us?",level:"Warm-up",xp:30,theory:{hook:'"No, I think you covered everything" is the single most expensive sentence in the interview. It is the last thing they hear, and it reads as indifference.',deepDive:"Prepare three, and ask two. Good questions reveal what you pay attention to: how work is decided, what failure looks like on this team, what the person answering wishes were different.",interviewPitch:'"What does a piece of work look like when it goes badly here — and what usually caused it?" It is disarming, specific, and the answer tells you whether to accept the offer.'},why:"It is the last impression, it is entirely within your control, and it is the one nobody rehearses.",hints:["Three prepared, two asked. Never zero.","One question must reference something they said in this conversation.","Nothing answerable from the careers page; no compensation in a technical round."],practice:{type:"js_snippet",task:"Write your three questions. Record yourself asking two of them.",starterCode:`/* Do you have any questions for us?
   Three prepared. Two asked. One must reference something they said. */

Q1 — about how work is decided
  →

Q2 — about what failure looks like here
  →

Q3 — for the person in front of me, about their own experience
  →
`,solutionCode:"",specs:["Three questions written","None answerable from the careers page","At least one is about failure or difficulty, not perks","One slot reserved to reference something said in the room"]}},{id:"hr-gap",trackId:"behavioural",trackName:"Behavioural & HR",category:"Ownership",title:"Handling a question you cannot answer",level:"Advanced",xp:40,theory:{hook:`You will be asked something you do not know. The answer is not a guess, and it is not "I don't know" full stop. It is a bounded, honest reach.`,deepDive:"The three-part move: say what you do know that is adjacent · say plainly where your knowledge stops · say how you would find out. That reads as calibrated, and calibration is what senior means.",interviewPitch:'"I have not used Server Components in production. What I know is the boundary — they run on the server, ship no JS, and cannot hold state. Where I would need to check is caching. I would start with the React docs and build a small route."'},why:"Every technical round contains at least one. How you handle it is worth more than the answer would have been.",hints:["Adjacent knowledge first — it shows the shape of what you do have.",'Name the edge explicitly. "Where I would need to check is…" is a senior sentence.',"Finish with the method, not an apology."],practice:{type:"js_snippet",task:"Pick three topics you genuinely do not know well. Draft the bounded answer for each, then record one.",starterCode:`/* Handling "I don't know" without bluffing and without collapsing.
   Adjacent knowledge → the edge → the method. */

TOPIC 1 — the thing I do not know well
  ADJACENT →
  EDGE →
  METHOD →

TOPIC 2
  ADJACENT →
  EDGE →
  METHOD →

TOPIC 3
  ADJACENT →
  EDGE →
  METHOD →
`,solutionCode:"",specs:["Adjacent knowledge stated before the gap","The edge of knowledge is named explicitly","A concrete method for finding out","No bluffing, no apologising"]}}],Dv=[...Nv,...Cv],Rv=[{id:"counter",title:"Step Counter",level:"Warm-up",time:"8 min",brief:"A counter with + and −, a Reset, and a step size the user can change. The count must never go below zero.",req:["+ and − change the count by the current step","Step size is a controlled input (default 1)","Reset returns the count to 0","Count clamps at 0 — − at zero does nothing","− is disabled when count is 0"],tags:["useState","controlled input","clamping"],hints:["What is the minimum state here? You need the count and the step. Nothing else — the disabled flag is derived.","The step input gives you a string. `Number(e.target.value) || 1` keeps it usable while typing.","Clamp with Math.max(0, next). Use the functional updater: setCount(c => Math.max(0, c - step)).","`disabled={count === 0}` on the − button. Derived, not stored."],start:`import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  // TODO: step state

  return (
    <div className="box stack" style={{ maxWidth: '20rem' }}>
      <strong style={{ fontSize: '2rem' }}>{count}</strong>
      {/* TODO: step input, − + Reset */}
    </div>
  );
}
`,sol:`import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="box stack" style={{ maxWidth: '20rem' }}>
      <strong style={{ fontSize: '2rem' }}>{count}</strong>

      <label htmlFor="step">Step</label>
      <input id="step" className="input" type="number" min="1" value={step}
             onChange={e => setStep(Number(e.target.value) || 1)} />

      <div className="cluster">
        <button className="btn" disabled={count === 0}
                onClick={() => setCount(c => Math.max(0, c - step))}>−</button>
        <button className="btn" data-v="primary"
                onClick={() => setCount(c => c + step)}>+</button>
        <button className="btn" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}
`},{id:"search",title:"Live Search Filter",level:"Core",time:"12 min",brief:"Filter a list of people as the user types. Case-insensitive. Show a real empty state naming the query, and a result count.",req:["Filters as you type, case-insensitive","Empty query shows everything","Zero matches shows an explicit message naming the query","Result count is visible","Filtered list is DERIVED, not stored in state"],tags:["derived state","controlled input","empty state"],hints:["One piece of state only: the query. The filtered list is computed during render.","Lowercase both sides: p.name.toLowerCase().includes(query.toLowerCase()).","Empty state: {shown.length === 0 && <p>No results for “{query}”</p>}. Careful — use .length === 0, not !shown.length && which can print 0.","Count is just shown.length — never a second useState."],start:`import React from 'react';

export default function App() {
  const people = [
    { id: 1, name: 'Asha Menon', role: 'Design' },
    { id: 2, name: 'Ravi Kumar', role: 'Engineering' },
    { id: 3, name: 'Meera Nair', role: 'Product' },
    { id: 4, name: 'Dev Sharma', role: 'Engineering' },
  ];
  // TODO: query state + derived list

  return (
    <div className="stack" style={{ maxWidth: '28rem' }}>
      {/* TODO */}
    </div>
  );
}
`,sol:`import React, { useState } from 'react';

export default function App() {
  const people = [
    { id: 1, name: 'Asha Menon', role: 'Design' },
    { id: 2, name: 'Ravi Kumar', role: 'Engineering' },
    { id: 3, name: 'Meera Nair', role: 'Product' },
    { id: 4, name: 'Dev Sharma', role: 'Engineering' },
  ];
  const [query, setQuery] = useState('');
  const shown = people.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="stack" style={{ maxWidth: '28rem' }}>
      <label className="sr-only" htmlFor="q">Search people</label>
      <input id="q" className="input" placeholder="Search people…"
             value={query} onChange={e => setQuery(e.target.value)} />

      <p className="muted" style={{ margin: 0 }}>{shown.length} of {people.length}</p>

      <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {shown.map(p => (
          <li className="between box" key={p.id}>
            <strong>{p.name}</strong>
            <span className="muted">{p.role}</span>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="muted">No results for “{query}”.</p>
      )}
    </div>
  );
}
`},{id:"todo",title:"Todo — add, toggle, delete, filter",level:"Core",time:"20 min",brief:"The classic. Add tasks, tick them off, delete them, filter by All/Active/Done, and show how many remain.",req:["Add trims whitespace and rejects empty input","Enter key adds","Toggle strikes the text through","Delete removes only that row","Filter tabs: All / Active / Done","Remaining count is derived","Keys are stable ids, never the array index"],tags:["immutable arrays","derived state","lifting state"],hints:["Three states: todos, the input text, the active tab. Everything else derives.","add = setTodos(ts => [...ts, item]) · delete = ts.filter(t => t.id !== id) · toggle = ts.map(t => t.id === id ? {...t, done: !t.done} : t).","Enter: onKeyDown={e => e.key === 'Enter' && add()}.","Filter without extra state: todos.filter(t => tab === 'All' || (tab === 'Done') === t.done).","id: Date.now() is fine here. Never use the map index as key — deleting a middle row would move state onto the wrong item."],start:`import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Read the brief', done: true },
    { id: 2, text: 'Build the layout', done: false },
  ]);
  // TODO: text + tab state, add/toggle/remove, filters

  return (
    <div className="stack" style={{ maxWidth: '30rem' }}>
      {/* TODO */}
    </div>
  );
}
`,sol:`import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Read the brief', done: true },
    { id: 2, text: 'Build the layout', done: false },
  ]);
  const [text, setText] = useState('');
  const [tab, setTab] = useState('All');

  const shown = todos.filter(t => tab === 'All' || (tab === 'Done') === t.done);
  const remaining = todos.filter(t => !t.done).length;

  const add = () => {
    const v = text.trim();
    if (!v) return;
    setTodos(ts => [...ts, { id: Date.now(), text: v, done: false }]);
    setText('');
  };

  return (
    <div className="stack" style={{ maxWidth: '30rem' }}>
      <div className="between box">
        <strong>Tasks</strong>
        <span className="muted">{remaining} left</span>
      </div>

      <div className="cluster">
        <input className="input" style={{ flex: 1 }} value={text} placeholder="New task"
               onChange={e => setText(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && add()} />
        <button className="btn" data-v="primary" onClick={add}>Add</button>
      </div>

      <div className="cluster">
        {['All', 'Active', 'Done'].map(t => (
          <button key={t} className="btn" data-v={tab === t ? 'primary' : undefined}
                  onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {shown.map(t => (
          <li className="between box" key={t.id}>
            <label className="cluster" style={{ gap: '.5rem' }}>
              <input type="checkbox" checked={t.done}
                     onChange={() => setTodos(ts => ts.map(x =>
                       x.id === t.id ? { ...x, done: !x.done } : x))} />
              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
            </label>
            <button className="btn" onClick={() =>
              setTodos(ts => ts.filter(x => x.id !== t.id))}>Delete</button>
          </li>
        ))}
      </ul>

      {shown.length === 0 && <p className="muted">Nothing here.</p>}
    </div>
  );
}
`},{id:"pagination",title:"Pagination",level:"Edge cases",time:"20 min",brief:"Page through 23 records, 5 per page. Prev/Next disable at the ends. Show 'Page X of Y'. This is the most test-case-dense task in the corpus.",req:["Exactly 5 rows per page","Prev disabled on page 1","Next disabled on the last page","Page X of Y is correct","Last page shows the remainder (3 rows), not 5","Changing page size resets to page 1"],tags:["boundary math","derived state","clamping"],hints:["State: currentPage and pageSize. The visible slice is derived.","totalPages = Math.ceil(total / pageSize). Never hardcode it.","slice((page - 1) * size, page * size) — get this off-by-one right and the whole task falls out.","Disable, do not hide: disabled={page === 1} and disabled={page === totalPages}.","When pageSize changes, setPage(1) in the same handler — otherwise you can be on page 5 of 3."],start:`import React from 'react';

export default function App() {
  const rows = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, name: \`Record \${i + 1}\` }));
  // TODO: page + pageSize state, totalPages, slice

  return (
    <div className="stack" style={{ maxWidth: '28rem' }}>
      {/* TODO */}
    </div>
  );
}
`,sol:`import React, { useState } from 'react';

export default function App() {
  const rows = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, name: \`Record \${i + 1}\` }));
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const totalPages = Math.max(1, Math.ceil(rows.length / size));
  const shown = rows.slice((page - 1) * size, page * size);

  return (
    <div className="stack" style={{ maxWidth: '28rem' }}>
      <div className="between">
        <span className="muted">Page {page} of {totalPages}</span>
        <label className="cluster" style={{ gap: '.5rem' }}>
          <span className="muted">Per page</span>
          <select className="input" style={{ width: 'auto' }} value={size}
                  onChange={e => { setSize(Number(e.target.value)); setPage(1); }}>
            {[5, 10, 25].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>

      <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {shown.map(r => <li className="box" key={r.id}>{r.name}</li>)}
      </ul>

      <div className="cluster">
        <button className="btn" disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
        <button className="btn" disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
      </div>
    </div>
  );
}
`},{id:"cloning",title:"Object Copying & Deep Mutation Control",level:"Core JS",time:"15 min",brief:"Manage nested profile settings (name, theme, nested notification flags). Modify child settings immutably, compare with Object.is, and prevent reference leaks.",req:["Updating nested field (e.g. notifications.email) must NOT mutate original state","Clone creates new reference at each modified level","Object.is(prev, next) returns false after mutation","Reset restores initial state without reference sharing"],tags:["object references","immutability","nested spread"],hints:["To update nested: setUser(prev => ({ ...prev, settings: { ...prev.settings, email: !prev.settings.email } }))","Never do: user.settings.email = false; setUser(user) — Object.is sees same reference and bails out."],start:`import React, { useState } from 'react';

export default function App() {
  const initial = { name: 'Alex', settings: { email: true, push: false } };
  const [user, setUser] = useState(initial);

  return (
    <div className="box stack" style={{ maxWidth: '24rem' }}>
      <h3>User: {user.name}</h3>
      <p>Email alerts: {user.settings.email ? 'ON' : 'OFF'}</p>
      {/* TODO: Immutable toggle button and reset button */}
    </div>
  );
}
`,sol:`import React, { useState } from 'react';

export default function App() {
  const initial = { name: 'Alex', settings: { email: true, push: false } };
  const [user, setUser] = useState(initial);

  const toggleEmail = () => {
    setUser(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        email: !prev.settings.email
      }
    }));
  };

  return (
    <div className="box stack" style={{ maxWidth: '24rem' }}>
      <h3>User: {user.name}</h3>
      <p>Email alerts: {user.settings.email ? 'ON' : 'OFF'}</p>
      <div className="cluster">
        <button className="btn" data-v="primary" onClick={toggleEmail}>Toggle Email Alert</button>
        <button className="btn" onClick={() => setUser(structuredClone(initial))}>Reset</button>
      </div>
    </div>
  );
}
`},{id:"rest_abort",title:"REST API Fetcher with AbortController",level:"Accenture Specialist",time:"20 min",brief:"Fetch live user data from an API with search filtering, handling loading indicators, error banners, and AbortController request cancellation.",req:["fetch connects to AbortController signal","Cleanup function aborts in-flight request when query changes or unmounts","Loading state visible while fetching","Error state caught and displayed gracefully","Empty query does not trigger fetch"],tags:["REST API","AbortController","async useEffect"],hints:["Inside useEffect: const controller = new AbortController(); fetch(url, { signal: controller.signal }) ... return () => controller.abort();","Catch AbortError: if (err.name !== 'AbortError') setError(err.message);"],start:`import React, { useState, useEffect } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Fetch with AbortController

  return (
    <div className="stack" style={{ maxWidth: '28rem' }}>
      <input className="input" placeholder="Search users..." value={query} onChange={e => setQuery(e.target.value)} />
    </div>
  );
}
`,sol:`import React, { useState, useEffect } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) { setData([]); setLoading(false); return; }
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(\`https://jsonplaceholder.typicode.com/users?q=\${encodeURIComponent(query)}\`, { signal: controller.signal })
      .then(res => res.json())
      .then(json => { setData(json); setLoading(false); })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [query]);

  return (
    <div className="stack" style={{ maxWidth: '28rem' }}>
      <input className="input" placeholder="Search users..." value={query} onChange={e => setQuery(e.target.value)} />
      {loading && <p className="muted">Fetching users...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
        {data.map(u => <li className="box" key={u.id}><strong>{u.name}</strong> ({u.email})</li>)}
      </ul>
    </div>
  );
}
`}],Km={cats:[{k:"box",n:"Box model",blurb:"What a box measures, and what pushes what."},{k:"flex",n:"Flexbox",blurb:"One axis, content-driven. basis vs width, the shorthand, auto margins."},{k:"grid",n:"Grid",blurb:"Two axes, parent-driven. Lines, spans, implicit tracks, alignment."},{k:"track",n:"Track sizing",blurb:"repeat · minmax · auto-fit vs auto-fill — responsive with no media query."},{k:"cq",n:"Container queries",blurb:"A component that answers to its container, not the viewport."},{k:"place",n:"place-*",blurb:"align + justify in one property, on the container and on the item."},{k:"areas",n:"grid-template-areas",blurb:"Layout you can read out loud."},{k:"pos",n:"Positioning",blurb:"static · relative · absolute · fixed · sticky, and the containing block."},{k:"inset",n:"inset",blurb:"All four offsets at once, and what happens when opposite pairs both set."},{k:"units",n:"Units",blurb:"rem · em · ch · %, dvh · fr · clamp — and where px is still correct."},{k:"mq",n:"Media queries",blurb:"Ranges, orientation, and the ones about the human, not the screen."},{k:"focus",n:":focus-visible",blurb:"Keyboard users get a ring; mouse users do not; nobody loses one."},{k:"tokens",n:"Design tokens",blurb:"Custom properties: naming, fallbacks, scoping, and the cascade."},{k:"mix",n:"color-mix()",blurb:"Derive a palette from one hue instead of hand-picking nine."},{k:"prim",n:"Layout primitives",blurb:"stack · cluster · between · sidebar · switcher · cover · grid-auto."},{k:"exc",n:"Exceptions",blurb:"The cases where the usual rule is the wrong answer."},{k:"anti",n:"Anti-patterns",blurb:"Recognise it, name why it breaks, replace it."},{k:"extra",n:"Extras (Extended Syllabus)",blurb:"Selectors & Specificity · Typography & Line Clamp · Gradients · Transitions · React Tokens"}],items:[{id:"BOX-01",useApp:!1,cat:"box",title:"border-box — why 200px stops meaning 200px",goal:"Both cards must measure exactly 200px wide on screen, padding and border included.",use:[["box-sizing","decide whether width means the content alone or the whole visible box"]],task:".card is explicitly content-box, so its 200px width excludes the 1rem padding and 2px border and it renders at 236px. Change the one value that makes 200px mean the whole visible box. Measure it in the preview before and after.",dia:{w:320,h:120,note:[[8,12,"both: width 200px, padding 16, border 2"]],box:[[8,34,200,32,"200px  ← border-box"],[8,80,236,32,"236px  ← content-box","ghost"]],gap:[[8,28,200,"200",1]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card   text: "A"
       div.card   text: "B"
      */}
    </>
  );
}
`,css:`/* stacked, not a flex row — a flex item would shrink and hide the difference */
.card {
  width: 200px;
  padding: 1rem;
  border: 2px solid steelblue;
  margin-bottom: 1rem;
  background: aliceblue;
  box-sizing: content-box;   /* TODO — change this one value */
}
`,hints:["content-box adds padding and border ON TOP of width: 200 + 32 + 4 = 236.","box-sizing: border-box makes width include padding and border. It is written explicitly here only so you can see the failure — in a real stylesheet the universal reset *, *::before, *::after { box-sizing: border-box } does it once for everything."],sol:"box-sizing: border-box;",why:"The single most common “why is my layout 4px too wide” bug. border-box is the sane default and the reason the universal reset exists.",markup:`    <>
      <div className="card">A</div>
      <div className="card">B</div>
    </>`},{id:"BOX-02",visual:!1,verify:"Nothing to type. Predict the gap out loud first, then measure it in the preview.",cat:"box",title:"Margins collapse — the larger one wins",goal:"The gap between the two paragraphs must be 32px, not 56px.",use:[["margin-bottom","set on the first block"],["margin-top","set on the second block"]],task:"A has margin-bottom 32px, B has margin-top 24px. Predict the gap, then set the two margins so the gap is exactly 32px while B keeps a 24px top margin of its own.",dia:{w:320,h:120,box:[[8,10,300,28,"A"],[8,70,300,28,"B"]],gap:[[160,38,32,"32px — not 56",0]],note:[[8,112,"adjacent vertical margins collapse to the larger"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.wrap
         p.a   text: "A"
         p.b   text: "B"
      */}
    </>
  );
}
`,css:`.wrap { background: whitesmoke; }
.a { margin-bottom: 2rem; }
.b { margin-top: 1.5rem; }

/* TODO — nothing to add. Read it, predict the gap, then confirm in the preview. */
`,hints:["Adjacent vertical margins between siblings do not add. The larger one is used and the smaller disappears.","32 and 24 collapse to 32. Horizontal margins never collapse — this is a block-direction-only rule."],sol:"gap is 32px (the larger margin wins)",why:"Collapsing is why “I set both margins and the space is wrong”. The modern fix is to stop using sibling margins at all — see the stack primitive.",markup:`    <div className="wrap">
      <p className="a">A</p>
      <p className="b">B</p>
    </div>`},{id:"BOX-03",cat:"box",title:"Parent–child collapse, and three ways to stop it",goal:"The grey parent must visibly contain the child’s top margin instead of being pushed down by it.",use:[["display: flow-root","establish a block formatting context so the child margin stays inside"]],task:"The child’s margin-top escapes and moves the parent instead. Add one declaration to .parent so the margin stays inside.",dia:{w:320,h:130,frame:[8,10,300,60,".parent — margin stays inside"],box:[[16,40,284,24,"child"]],gap:[[160,18,22,"24px inside",0]],note:[[8,96,"broken: the parent starts 24px lower and the gap is outside it"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.parent
         div.child   text: "child"
      */}
    </>
  );
}
`,css:`.parent { background: gainsboro; }
.child { margin-top: 1.5rem; background: steelblue; color: white; }

.parent {
  /* TODO — keep the child margin inside */
}
`,hints:["A parent with no padding, no border and no new formatting context collapses its child’s top margin with its own.","display: flow-root is the purpose-built fix. padding-top: 1px and overflow: hidden also work but each has a side effect — flow-root has none."],sol:"display: flow-root;",why:"flow-root exists for exactly this. Knowing it separates people who memorised overflow:hidden from people who know why it worked.",markup:`    <div className="parent">
      <div className="child">child</div>
    </div>`},{id:"BOX-04",cat:"box",title:"Percentage padding resolves against WIDTH — even vertically",goal:"A box that always stays 16:9 using padding alone, with no aspect-ratio.",use:[["padding-top","a percentage here resolves against the parent’s inline size, not its height"]],task:"Give .ratio a padding-top that keeps it 16:9 at any width. Do not use aspect-ratio — this is the pre-2021 technique and it is still asked.",dia:{w:320,h:130,box:[[8,10,300,110,"width : height = 16 : 9"]],gap:[[8,6,300,"100% width",1]],note:[[100,66,"padding-top: 56.25%"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.ratio
      */}
    </>
  );
}
`,css:`.ratio {
  width: 100%;
  background: steelblue;
  height: 0;
  /* TODO — 16:9 from padding alone */
}
`,hints:["9 ÷ 16 = 0.5625.","padding-top: 56.25%. Percentage padding — top and bottom included — is always a percentage of the containing block’s WIDTH. That asymmetry is the whole trick."],sol:"padding-top: 56.25%;",why:"The percentage-padding rule is a classic MCQ. It is also the one place a magic number is defensible, because the alternative did not exist.",markup:'    <div className="ratio" />'},{id:"BOX-05",cat:"box",title:"aspect-ratio — the modern answer to the same problem",goal:"The same 16:9 box, one line, content still allowed inside.",use:[["aspect-ratio","fix the ratio and let height be derived from width"]],task:"Rewrite BOX-04 with aspect-ratio, and keep the caption text visible inside the box.",dia:{w:320,h:130,box:[[8,10,300,110,"16 / 9"]],note:[[10,124,"height derived — content still flows"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.ratio
         p   text: "caption"
      */}
    </>
  );
}
`,css:`.ratio {
  width: 100%;
  background: steelblue;
  color: white;
  /* TODO — one line */
}
`,hints:["aspect-ratio: 16 / 9.","Unlike the padding hack the box still has real height, so children lay out normally and you do not need an absolutely positioned inner element."],sol:"aspect-ratio: 16 / 9;",why:"Say both in an interview: the padding-top trick, why it worked, and that aspect-ratio replaced it. That is the shape of a senior answer.",markup:`    <div className="ratio">
      <p>caption</p>
    </div>`},{id:"BOX-06",cat:"box",title:"outline does not take up space — border does",goal:"Hovering a card must not shift any other card.",use:[["outline","draw a ring that is painted outside the box and ignored by layout"],["outline-offset","push the ring away from the edge"]],task:"Give .card a 3px ring on hover with a 2px offset, without moving a single pixel of layout.",dia:{w:320,h:110,box:[[10,20,90,60,"a"],[115,20,90,60,"b","hi"],[220,20,90,60,"c"]],note:[[10,98,"ring is painted outside the box — nothing reflows"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.card   text: "a"
         div.card   text: "b"
         div.card   text: "c"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: 1rem; }
.card { padding: 1rem 2rem; background: aliceblue; }

.card:hover {
  /* TODO — a ring that costs no space */
}
`,hints:["A border on hover adds 3px to every side and pushes the neighbours.","outline: 3px solid steelblue; outline-offset: 2px; — outline is painted outside the border box and is not part of the box model at all."],sol:`outline: 3px solid steelblue;
  outline-offset: 2px;`,why:"This is also the reason outline is the right property for focus rings, which you will use in the :focus-visible set.",markup:`    <div className="row">
      <div className="card">a</div>
      <div className="card">b</div>
      <div className="card">c</div>
    </div>`},{id:"BOX-07",cat:"box",title:"max-width, never width",goal:"A card that is 40rem on a wide screen and exactly as wide as the phone on a narrow one — with no media query.",use:[["max-width","cap the size"],["width","let it be fluid below the cap"]],task:"Make .card cap at 40rem but never overflow a 320px viewport. One declaration, no media query.",dia:{w:320,h:130,box:[[40,14,240,40,"40rem cap"],[8,74,304,40,"fills a narrow screen"]],note:[[8,126,"same rule, both screens"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card   text: "content"
      */}
    </>
  );
}
`,css:`.card {
  margin-inline: auto;
  padding: 1rem;
  background: aliceblue;
  /* TODO — cap without overflowing */
}
`,hints:["width: 40rem overflows a 320px screen. That is the bug.","max-width: 40rem. A block element is already width:auto, so it fills what it is given and the max-width only caps the top end. “width sets, max-width caps” — prefer the cap."],sol:"max-width: 40rem;",why:"One of the highest-value habits in the whole course: fixed widths are the number one cause of horizontal scrollbars on mobile.",markup:'    <div className="card">content</div>'},{id:"FLEX-01",cat:"flex",title:"The two axes — main and cross",goal:"Three items in a column, and you can name which axis each property acts on.",use:[["display: flex","create the flex container"],["flex-direction","choose which axis is the main axis"]],task:"Turn .row into a vertical flex container. Then say out loud: with direction column, justify-content moves items ___ and align-items moves them ___.",dia:{w:320,h:150,frame:[8,8,304,134,".row"],box:[[16,18,288,32,"1"],[16,58,288,32,"2"],[16,98,288,32,"3"]],arrow:[[300,18,300,130,""]],note:[[160,14,"main axis ↓  ·  cross axis →"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.item   text: "1"
         div.item   text: "2"
         div.item   text: "3"
      */}
    </>
  );
}
`,css:`.row {
  gap: .5rem;
  /* TODO — a vertical flex container */
}
.item { background: aliceblue; padding: .5rem; }
`,hints:["display: flex plus one more declaration.","flex-direction: column. Now justify-content works vertically and align-items horizontally — the properties do not change meaning, the AXIS does."],sol:`display: flex;
  flex-direction: column;`,why:"Every flexbox mistake traces back to forgetting which axis is main. Say the axis before you pick the property.",markup:`    <div className="row">
      <div className="item">1</div>
      <div className="item">2</div>
      <div className="item">3</div>
    </div>`},{id:"FLEX-02",cat:"flex",title:"justify-content — distribute along the MAIN axis",goal:"Three items pushed to the far end of the row.",use:[["justify-content","position items along the main axis"]],task:"Push all three items to the right-hand end of the row, keeping their .5rem gap.",dia:{w:320,h:90,frame:[8,10,304,60,".row"],box:[[150,20,50,40,"1"],[206,20,50,40,"2"],[262,20,50,40,"3"]],note:[[14,44,"free space"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.item   text: "1"
         div.item   text: "2"
         div.item   text: "3"
      */}
    </>
  );
}
`,css:`.row {
  display: flex;
  gap: .5rem;
  /* TODO — items to the end */
}
.item { background: aliceblue; padding: .5rem 1rem; }
`,hints:["flex-start · flex-end · center · space-between · space-around · space-evenly.","justify-content: flex-end. In logical terms `end` also works and respects RTL."],sol:"justify-content: flex-end;",why:"justify-content only ever has an effect when there IS free space on the main axis. If items fill the row it does nothing — a common confusion.",markup:`    <div className="row">
      <div className="item">1</div>
      <div className="item">2</div>
      <div className="item">3</div>
    </div>`},{id:"FLEX-03",cat:"flex",title:"align-items — the CROSS axis, and why stretch is the default",goal:"Three cards of different text length, all vertically centred rather than equal-height.",use:[["align-items","position items on the cross axis"]],task:"The cards currently stretch to equal height. Centre them on the cross axis instead so each is only as tall as its content.",dia:{w:320,h:110,frame:[8,10,304,90,".row"],box:[[16,38,88,34,"short"],[112,26,88,58,"taller text"],[208,42,88,26,"x"]],note:[[16,104,"default is stretch — equal heights"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.item   text: "short"
         div.item   text: "a much taller block of text"
         div.item   text: "x"
      */}
    </>
  );
}
`,css:`.row {
  display: flex;
  gap: .5rem;
  /* TODO — centre on the cross axis */
}
.item { background: aliceblue; padding: .5rem; }
`,hints:["The default align-items value is stretch, which is why your cards are already equal height for free.","align-items: center. Remember you are GIVING UP equal heights by doing this — that default is often the thing you wanted."],sol:"align-items: center;",why:"“Equal-height cards” needs no code in flexbox. Knowing that stretch is the default saves you from writing height: 100% everywhere.",markup:`    <div className="row">
      <div className="item">short</div>
      <div className="item">a much taller block of text</div>
      <div className="item">x</div>
    </div>`},{id:"FLEX-04",cat:"flex",title:"flex-wrap — one line becomes many",goal:"Six chips that wrap onto a second row instead of shrinking to nothing.",use:[["flex-wrap","allow a second line"],["gap","space rows and columns at once"]],task:"Let the chips wrap, with 0.5rem between them in both directions.",dia:{w:320,h:110,frame:[8,10,304,90,".row  flex-wrap: wrap"],box:[[16,20,88,26,"1"],[112,20,88,26,"2"],[208,20,88,26,"3"],[16,56,88,26,"4"],[112,56,88,26,"5"],[208,56,88,26,"6"]],gap:[[104,33,8,"",1],[60,46,10,"",0]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         span.chip   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.row {
  display: flex;
  /* TODO — wrap, and space both directions */
}
.chip { background: aliceblue; padding: .35rem .75rem; border-radius: 999px; }
`,hints:["Without wrap, flex items shrink past their content rather than move to a new line.","flex-wrap: wrap; gap: .5rem; — gap on a wrapping flex container sets both row-gap and column-gap."],sol:`flex-wrap: wrap;
  gap: .5rem;`,why:"This is the cluster primitive in miniature, and the one place flex is genuinely better than grid: a wrapping row whose item count you do not control.",markup:`    <div className="row">
      {[1,2,3,4,5,6].map(n => <span className="chip" key={n}>chip {n}</span>)}
    </div>`},{id:"FLEX-05",cat:"flex",title:"align-content — only exists when there are multiple lines",goal:"Two wrapped rows pushed apart to the top and bottom of a tall container.",use:[["align-content","distribute the LINES on the cross axis"],["flex-wrap","required — without it there is only one line"]],task:"The container is 12rem tall and the chips wrap onto two lines. Push the two lines to the far ends of the cross axis.",dia:{w:320,h:150,frame:[8,8,304,134,".row  height 12rem"],box:[[16,16,88,26,"1"],[112,16,88,26,"2"],[208,16,88,26,"3"],[16,106,88,26,"4"],[112,106,88,26,"5"]],gap:[[290,44,60,"free space",0]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         span.chip   x5   from .map over [1,2,3,4,5]
      */}
    </>
  );
}
`,css:`.row {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  height: 12rem;
  /* TODO — spread the two LINES apart */
}
.chip { background: aliceblue; padding: .35rem .75rem; }
`,hints:["align-items positions items within their line. align-content positions the lines themselves.","align-content: space-between. With flex-wrap: nowrap there is exactly one line and align-content does nothing at all."],sol:"align-content: space-between;",why:"The align-items / align-content distinction is a favourite MCQ. One sentence: items within a line, content between lines.",markup:`    <div className="row">
      {[1,2,3,4,5].map(n => <span className="chip" key={n}>chip {n}</span>)}
    </div>`},{id:"FLEX-06",cat:"flex",title:"flex-grow — who eats the free space",goal:"A row where the middle item absorbs all leftover width and the outer two stay at content size.",use:[["flex-grow","give one item a share of the FREE space"]],task:"Make item 2 take every spare pixel while 1 and 3 stay their natural width.",dia:{w:320,h:90,frame:[8,10,304,60,".row"],box:[[16,20,54,40,"1"],[76,20,180,40,"2  grows","hi"],[262,20,42,40,"3"]],note:[[100,80,"grow shares FREE space, not total width"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.item   text: "1"
         div.item   text: "2"
         div.item   text: "3"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: .5rem; }
.item { background: aliceblue; padding: .5rem 1rem; }

.item:nth-child(2) {
  /* TODO */
}
`,hints:["flex-grow takes a unitless number — a share, not a size.","flex-grow: 1. Two items with grow 1 and 3 split the free space 1:3 — that ratio applies to the LEFTOVER, so their final widths are not 1:3."],sol:"flex-grow: 1;",why:"“grow: 1 and grow: 3 means widths 1:3” is false and is the trap in most flex MCQs. It divides the free space only.",markup:`    <div className="row">
      <div className="item">1</div>
      <div className="item">2</div>
      <div className="item">3</div>
    </div>`},{id:"FLEX-07",cat:"flex",title:"flex-shrink — why your item is narrower than its width",goal:"A fixed 200px logo that refuses to shrink when the row runs out of space.",use:[["flex-shrink","opt an item out of shrinking"]],task:".logo has width 200px but renders smaller. Stop it shrinking without touching its width.",dia:{w:320,h:100,frame:[8,10,304,60,".row  — narrower than its content"],box:[[16,20,120,40,"logo 200px","hi"],[142,20,162,40,"long text shrinks"]],note:[[16,90,"default flex-shrink is 1 — everything shrinks"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.logo   text: "LOGO"
         p.text   text: "a long stretch of text that "
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: 1rem; width: 22rem; }
.text { background: aliceblue; }

.logo {
  width: 200px;
  background: steelblue;
  color: white;
  /* TODO — refuse to shrink */
}
`,hints:["The initial value of flex-shrink is 1, so every item is shrinkable by default. width is a starting point, not a promise.","flex-shrink: 0. Equivalently flex: none, which is 0 0 auto."],sol:"flex-shrink: 0;",why:"“I set the width and it ignored me” is nearly always flex-shrink. This is the single most useful flex debugging fact.",markup:`    <div className="row">
      <div className="logo">LOGO</div>
      <p className="text">a long stretch of text that eats the remaining space</p>
    </div>`},{id:"FLEX-08",cat:"flex",title:"flex-basis vs width — which one wins",goal:"An item that starts at 10rem on the main axis even though its width says 30rem.",use:[["flex-basis","set the main-size starting point"],["width","present, and deliberately ignored"]],task:"Leave width: 30rem in place. Add a flex-basis so the item starts at 10rem, and be able to say why width lost.",dia:{w:320,h:100,frame:[8,10,304,50,".row"],box:[[16,18,140,34,"basis 10rem wins","hi"],[162,18,142,34,"sibling"]],note:[[16,80,"on the MAIN axis, flex-basis overrides width"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.a   text: "A"
         div.b   text: "B"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: .5rem; }
.b { background: aliceblue; flex: 1; }

.a {
  width: 30rem;
  background: steelblue;
  color: white;
  /* TODO — start at 10rem instead */
}
`,hints:["flex-basis sets the size along the main axis before growing or shrinking happens.","flex-basis: 10rem. On the main axis flex-basis beats width; on the cross axis flex-basis is irrelevant and width applies normally."],sol:"flex-basis: 10rem;",why:"Precedence question, asked constantly. The full order on the main axis: flex-basis → width → content size, then clamped by min/max.",markup:`    <div className="row">
      <div className="a">A</div>
      <div className="b">B</div>
    </div>`},{id:"FLEX-09",cat:"flex",title:"flex: 1 vs flex: auto — the shorthand expands differently",goal:"Three unequal-content items rendered at exactly equal widths.",use:[["flex","the shorthand — know what 1 expands to"]],task:"Make the three items exactly equal width regardless of their content. Then change it to flex: auto and explain in one line why they stop being equal.",dia:{w:320,h:110,frame:[8,10,304,44,"flex: 1  →  equal"],box:[[16,18,92,28,"x"],[114,18,92,28,"longer"],[212,18,92,28,"l"]],note:[[8,72,"flex: 1    = 1 1 0%    → ignores content width"],[8,90,"flex: auto = 1 1 auto  → content width matters"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.item   text: "x"
         div.item   text: "much longer label"
         div.item   text: "l"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: .5rem; }
.item { background: aliceblue; padding: .5rem; }

.item {
  /* TODO — exactly equal widths */
}
`,hints:["The one-value shorthand sets flex-basis to 0%, not auto.","flex: 1 expands to flex: 1 1 0% — basis zero, so content is ignored and the free space (= the whole row) is split evenly. flex: auto is 1 1 auto, which starts from content size, so longer text stays wider."],sol:"flex: 1;",why:"The single highest-yield flex fact for interviews. If you can recite 1 1 0% vs 1 1 auto vs 0 1 auto you are ahead of most candidates.",markup:`    <div className="row">
      <div className="item">x</div>
      <div className="item">much longer label</div>
      <div className="item">l</div>
    </div>`},{id:"FLEX-10",cat:"flex",title:"flex: none — the fixed rail",goal:"A 14rem sidebar that never grows and never shrinks, beside a fluid main column.",use:[["flex: none","lock the sidebar at its own size"],["flex: 1","let main take the rest"]],task:"Lock .side at 14rem in both directions and let .main absorb everything else. Use the shorthands, not the longhands.",dia:{w:320,h:110,frame:[8,10,304,80,""],box:[[16,20,110,60,"side  flex: none","hi"],[132,20,172,60,"main  flex: 1"]],note:[[16,102,"none = 0 0 auto  ·  1 = 1 1 0%"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         aside.side   text: "side"
         main.main   text: "main"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: 1rem; }
.main { background: aliceblue; padding: 1rem; }

.side {
  width: 14rem;
  background: steelblue;
  color: white;
  padding: 1rem;
  /* TODO */
}
`,hints:["flex: none is the shorthand for 0 0 auto — no grow, no shrink, size from width.",".side { flex: none } and .main { flex: 1 }. Without flex: none the sidebar shrinks the moment main has long content."],sol:"flex: none;",why:"This is the flex version of the sidebar primitive. The grid version needs no such guard, which is one honest argument for grid.",markup:`    <div className="row">
      <aside className="side">side</aside>
      <main className="main">main</main>
    </div>`},{id:"FLEX-11",cat:"flex",title:"Auto margins push — no justify-content needed",goal:"A nav where the last link sits alone on the right and the rest stay grouped left.",use:[["margin-left: auto","absorb all free space before this one item"]],task:"Push only .last to the right. Do not use justify-content and do not add a spacer element.",dia:{w:320,h:90,frame:[8,10,304,50,".nav"],box:[[16,18,54,34,"a"],[76,18,54,34,"b"],[136,18,54,34,"c"],[246,18,58,34,"last","hi"]],gap:[[192,35,52,"auto",1]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       nav.nav
         a   href="#"   text: "a"
         a   href="#"   text: "b"
         a   href="#"   text: "c"
         a.last   href="#"   text: "last"
      */}
    </>
  );
}
`,css:`.nav { display: flex; gap: .5rem; }
.nav a { background: aliceblue; padding: .5rem 1rem; }

.last {
  /* TODO — push me right */
}
`,hints:["An auto margin on a flex item eats all the free space on that side.","margin-left: auto. margin-inline-start: auto is the logical version and flips correctly in RTL."],sol:"margin-left: auto;",why:"Auto margins are the cleanest answer to “one item apart from the rest”, and they compose — unlike justify-content, which is all-or-nothing for the whole line.",markup:`    <nav className="nav">
      <a href="#">a</a>
      <a href="#">b</a>
      <a href="#">c</a>
      <a className="last" href="#">last</a>
    </nav>`},{id:"FLEX-12",cat:"flex",title:"gap replaces the last-child margin hack",goal:"Even spacing between items with no :last-child rule anywhere.",use:[["gap","space between items only, never on the outside"]],task:"Delete the margin approach and get identical spacing with one declaration on the container.",dia:{w:320,h:100,frame:[8,10,304,50,".row"],box:[[16,18,84,34,"1"],[110,18,84,34,"2"],[204,18,84,34,"3"]],gap:[[100,35,10,"gap",1],[194,35,10,"gap",1]],note:[[16,80,"no trailing space after item 3"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.item   text: "1"
         div.item   text: "2"
         div.item   text: "3"
      */}
    </>
  );
}
`,css:`.row {
  display: flex;
  /* TODO — spacing without margins */
}
.item { background: aliceblue; padding: .5rem 1rem; }

/* the old way, now unnecessary:
.item + .item { margin-left: .5rem; } */
`,hints:["gap applies between items and never outside them, so there is no trailing space to clean up.","gap: .5rem. It works in flex, grid and multi-column, and it is not affected by margin collapsing."],sol:"gap: .5rem;",why:"gap removed an entire genre of CSS bug. If you still see .item:not(:last-child) { margin-right } in a codebase, that is a dated stylesheet.",markup:`    <div className="row">
      <div className="item">1</div>
      <div className="item">2</div>
      <div className="item">3</div>
    </div>`},{id:"FLEX-13",cat:"flex",title:"order moves the paint, not the tab stop",goal:"Item 3 shown first visually — and a clear statement of the accessibility cost.",use:[["order","change visual order only"]],task:"Show item 3 first without changing the JSX. Then write in the comment what a keyboard user experiences.",dia:{w:320,h:110,frame:[8,10,304,50,"visual order"],box:[[16,18,90,34,"3","hi"],[112,18,90,34,"1"],[208,18,90,34,"2"]],note:[[8,78,"DOM order stays 1, 2, 3 — so Tab still goes 1 → 2 → 3"],[8,96,"visual and focus order disagree: an a11y failure"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.item   text: "1"
         div.item   text: "2"
         div.item   text: "3"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: .5rem; }
.item { background: aliceblue; padding: .5rem 1rem; }

.item:nth-child(3) {
  /* TODO — paint me first */
}
/* TODO — one line: what does a keyboard user hit first? */
`,hints:["order takes an integer and defaults to 0, so a negative value moves an item before every default item.","order: -1. Tab order follows the DOM, not order, so the visual first item is the third tab stop. WCAG 2.4.3 calls that a failure."],sol:"order: -1;",why:"Interviewers ask this to see whether you think past the pixels. The correct answer is “use it for presentation only, and fix the DOM if the order actually matters”.",markup:`    <div className="row">
      <div className="item">1</div>
      <div className="item">2</div>
      <div className="item">3</div>
    </div>`},{id:"FLEX-14",cat:"flex",title:"align-self — one item breaks ranks",goal:"Three stretched cards where only the middle one is bottom-aligned.",use:[["align-self","override align-items for a single item"]],task:"Keep align-items: stretch on the container and bottom-align only the second card.",dia:{w:320,h:120,frame:[8,10,304,80,"align-items: stretch"],box:[[16,18,90,64,"1"],[112,52,90,30,"2","hi"],[208,18,90,64,"3"]],note:[[16,110,"only item 2 opts out"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         div.item   text: "1"
         div.item   text: "2"
         div.item   text: "3"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: .5rem; align-items: stretch; height: 6rem; }
.item { background: aliceblue; padding: .5rem 1rem; }

.item:nth-child(2) {
  /* TODO */
}
`,hints:["Every align-items value has an align-self counterpart that applies to one item.","align-self: flex-end. There is no justify-self in flexbox — the main axis is controlled by the container plus auto margins. That asymmetry is deliberate."],sol:"align-self: flex-end;",why:"“Why is there no justify-self in flexbox?” is a real interview question. Because items on the main axis share one distribution; auto margins cover the individual case.",markup:`    <div className="row">
      <div className="item">1</div>
      <div className="item">2</div>
      <div className="item">3</div>
    </div>`},{id:"FLEX-15",cat:"flex",title:"min-width: 0 — the ellipsis that refuses to appear",goal:"A long single-line title that truncates with … instead of blowing the row wide.",use:[["min-width: 0","remove the automatic minimum size floor"],["text-overflow: ellipsis","draw the …"],["overflow: hidden","required for ellipsis to apply"]],task:"The title overflows its row. Make it truncate. You will need three declarations and one of them is not obvious.",dia:{w:320,h:100,frame:[8,10,304,50,".row"],box:[[16,18,206,34,"a very long title…","hi"],[228,18,76,34,"action"]],note:[[8,80,"auto min-size stops a flex item shrinking below its content"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         h2.title   text: "A headline far too long to f"
         button.act   text: "action"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: 1rem; align-items: center; width: 22rem; }
.act { flex: none; }

.title {
  white-space: nowrap;
  /* TODO — three declarations */
}
`,hints:["A flex item’s automatic minimum size is min-content, so it will not shrink below its longest word — the shrink you asked for is being refused.","min-width: 0; overflow: hidden; text-overflow: ellipsis; — min-width: 0 lifts the floor, overflow: hidden clips, ellipsis draws the dots. In a column flex container the equivalent is min-height: 0."],sol:`min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;`,why:"The most-searched flexbox bug of all time. It also explains the grid version: minmax(0, 1fr) instead of 1fr.",markup:`    <div className="row">
      <h2 className="title">A headline far too long to fit in this row</h2>
      <button className="act">action</button>
    </div>`},{id:"GRID-01",useApp:!1,cat:"grid",title:"grid-template-columns — the parent decides",goal:"Six cells in three equal columns.",use:[["display: grid","create the grid container"],["grid-template-columns","declare the column tracks"],["fr","one share of the free space"]],task:"Lay the six cells out in three equal columns with a 1rem gap.",dia:{w:320,h:130,frame:[8,8,304,114,".grid"],track:[[16,0,92,"1fr"],[116,0,92,"1fr"],[216,0,88,"1fr"]],box:[[16,16,92,44,"1"],[116,16,92,44,"2"],[216,16,88,44,"3"],[16,68,92,44,"4"],[116,68,92,44,"5"],[216,68,88,44,"6"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.grid {
  gap: 1rem;
  /* TODO — three equal columns */
}
.cell { background: aliceblue; padding: 1rem; }
`,hints:["fr is a grid-only unit meaning “one share of what is left after gaps and fixed tracks”.","display: grid; grid-template-columns: 1fr 1fr 1fr; — rows appear implicitly as needed."],sol:`display: grid;
  grid-template-columns: 1fr 1fr 1fr;`,why:"The decision rule: the PARENT is deciding there are three columns, so this is grid. If the children decided, it would be flex.",markup:`    <div className="grid">
      {[1,2,3,4,5,6].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-02",useApp:!1,cat:"grid",title:"Implicit rows — and how to size them",goal:"Rows you never declared, all exactly 6rem tall.",use:[["grid-auto-rows","size the rows grid creates for you"]],task:"You declared two columns and no rows. Make every automatically created row 6rem tall.",dia:{w:320,h:140,frame:[8,8,304,124,".grid — 2 explicit columns, 0 explicit rows"],box:[[16,16,140,50,"1"],[164,16,140,50,"2"],[16,74,140,50,"3"],[164,74,140,50,"4"]],gap:[[300,16,50,"6rem",0]],note:[[16,136,"implicit rows: created by content"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  /* TODO — size the implicit rows */
}
.cell { background: aliceblue; padding: 1rem; }
`,hints:["grid-template-rows sizes rows you declared. These rows were never declared.","grid-auto-rows: 6rem. The pair is grid-auto-columns, which matters when grid-auto-flow is column."],sol:"grid-auto-rows: 6rem;",why:"Explicit vs implicit is the grid concept people skip. Anything beyond your template is implicit and is sized by grid-auto-*.",markup:`    <div className="grid">
      {[1,2,3,4,5,6].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-03",useApp:!1,cat:"grid",title:"row-gap and column-gap are not the same number",goal:"2rem between rows, 0.5rem between columns.",use:[["row-gap","vertical spacing"],["column-gap","horizontal spacing"],["gap","the two-value shorthand"]],task:"Set the two gaps to different values using the single shorthand, and know which value comes first.",dia:{w:320,h:140,frame:[8,8,304,124,".grid"],box:[[16,16,140,40,"1"],[164,16,140,40,"2"],[16,84,140,40,"3"],[164,84,140,40,"4"]],gap:[[156,36,8,".5",1],[80,56,28,"2rem",0]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* TODO — 2rem rows, .5rem columns, one declaration */
}
.cell { background: aliceblue; padding: 1rem; }
`,hints:["The shorthand is gap: <row> <column> — the same block-then-inline order as margin and padding.","gap: 2rem .5rem;"],sol:"gap: 2rem .5rem;",why:"Order trips people up because it is the opposite of the x-then-y they expect from graphics APIs. It follows CSS block/inline order instead.",markup:`    <div className="grid">
      {[1,2,3,4,5,6].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-04",cat:"grid",title:"Line-based placement — grid lines, not grid cells",goal:"The first cell spanning columns 1 to 3, everything else falling in behind it.",use:[["grid-column","place an item between two column LINES"]],task:"Make cell 1 occupy the first two columns of a three-column grid using line numbers.",dia:{w:320,h:130,frame:[8,20,304,102,".grid"],track:[[16,0,192,"lines 1 → 3"],[216,0,88,""]],box:[[16,28,192,40,"1  spans 2","hi"],[216,28,88,40,"2"],[16,76,92,40,"3"],[116,76,92,40,"4"],[216,76,88,40,"5"]],note:[[8,16,"a 3-column grid has 4 lines: 1 2 3 4"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
}
.cell { background: aliceblue; padding: 1rem; }

.cell:first-child {
  /* TODO — from line 1 to line 3 */
}
`,hints:["n columns means n+1 lines. To cover columns 1 and 2 you go from line 1 to line 3.","grid-column: 1 / 3; — this is the shorthand for grid-column-start and grid-column-end."],sol:"grid-column: 1 / 3;",why:"Counting lines rather than cells is the mental switch grid demands. Off-by-one here is the most common grid mistake.",markup:`    <div className="grid">
      {[1,2,3,4,5,6].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-05",cat:"grid",title:"span — placement without counting",goal:"The same two-column item, written so it survives being moved.",use:[["span","say how many tracks to cover instead of where to stop"]],task:"Rewrite GRID-04 so the item covers two columns wherever it happens to start.",dia:{w:320,h:120,frame:[8,10,304,102,""],box:[[16,18,92,40,"1"],[116,18,188,40,"2  span 2","hi"],[16,66,92,40,"3"],[116,66,92,40,"4"],[216,66,88,40,"5"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
}
.cell { background: aliceblue; padding: 1rem; }

.cell:nth-child(2) {
  /* TODO — cover two columns, wherever I start */
}
`,hints:["grid-column accepts a span keyword in place of an end line.","grid-column: span 2. Now the item does not care which column it lands in — the auto-placement algorithm can move it and the span still holds."],sol:"grid-column: span 2;",why:"Absolute line numbers break when the grid changes. span is the resilient form and the one to reach for by default.",markup:`    <div className="grid">
      {[1,2,3,4,5,6].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-06",cat:"grid",title:"Line -1 — full width without knowing the column count",goal:"A banner spanning every column of a grid whose column count you do not control.",use:[["grid-column: 1 / -1","from the first line to the last, whatever the count"]],task:"Make .banner span the full width of a grid that may have 2, 3 or 12 columns.",dia:{w:320,h:130,frame:[8,8,304,114,""],box:[[16,16,288,32,"banner   1 / -1","hi"],[16,56,92,56,"1"],[116,56,92,56,"2"],[216,56,88,56,"3"]],note:[[8,126,"-1 = the last line of the EXPLICIT grid"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.banner   text: "banner"
         div.cell   x3   from .map over [1,2,3]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
}
.cell { background: aliceblue; padding: 1rem; }

.banner {
  background: steelblue;
  color: white;
  padding: 1rem;
  /* TODO — full width, any column count */
}
`,hints:["Negative line numbers count backwards from the end of the explicit grid.","grid-column: 1 / -1. Caveat worth saying out loud: -1 refers to the explicit grid, so it does not reach tracks created implicitly by auto-fill."],sol:"grid-column: 1 / -1;",why:"The caveat is what makes this an interview answer rather than a snippet. With repeat(auto-fill, …) the explicit grid is still what -1 measures.",markup:`    <div className="grid">
      <div className="banner">banner</div>
      {[1,2,3].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-07",useApp:!1,cat:"grid",title:"grid-auto-flow: dense — backfill the holes",goal:"A gallery with no gaps, where a wide item no longer leaves a hole behind it.",use:[["grid-auto-flow: dense","let later items move up into earlier holes"]],task:"Item 2 spans two columns and leaves a hole. Fill it, then state the accessibility cost.",dia:{w:320,h:130,frame:[8,8,304,114,"dense"],box:[[16,16,92,44,"1"],[116,16,188,44,"2  span 2","hi"],[16,68,92,44,"4"],[116,68,92,44,"3"],[216,68,88,44,"5"]],note:[[8,126,"3 moved BEFORE 4 visually — DOM order unchanged"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
  /* TODO — backfill holes */
}
.cell { background: aliceblue; padding: 1rem; }
.cell:nth-child(2) { grid-column: span 2; }
`,hints:["The default is grid-auto-flow: row, which never goes backwards.","grid-auto-flow: row dense. Like flex `order`, it changes visual order only — Tab order still follows the DOM, so avoid it for interactive content."],sol:"grid-auto-flow: row dense;",why:"Same trade-off as order, different property. Recognising the pattern — visual reordering never moves focus — is the transferable idea.",markup:`    <div className="grid">
      {[1,2,3,4,5,6].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-08",useApp:!1,cat:"grid",title:"justify-items and align-items on the container",goal:"Every cell’s content sitting in the middle of its cell rather than filling it.",use:[["justify-items","inline-axis position of every item in its cell"],["align-items","block-axis position of every item in its cell"]],task:"Centre every item within its own cell, both directions, using two declarations (not place-items yet).",dia:{w:320,h:130,frame:[8,8,304,114,""],box:[[16,16,92,44,"","ghost"],[116,16,92,44,"","ghost"],[216,16,88,44,"","ghost"],[46,30,32,16,"1"],[146,30,32,16,"2"],[244,30,32,16,"3"],[16,68,92,44,"","ghost"],[116,68,92,44,"","ghost"],[216,68,88,44,"","ghost"],[46,82,32,16,"4"],[146,82,32,16,"5"],[244,82,32,16,"6"]],note:[[8,126,"dashed = the cell · solid = the item"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
  grid-auto-rows: 4rem;
  /* TODO — two declarations */
}
.cell { background: aliceblue; }
`,hints:["justify-* is the inline (horizontal) axis, align-* is the block (vertical) axis. In grid this is fixed and does not swap the way flex axes do.","justify-items: center; align-items: center; — the default for both is stretch, which is why cells normally fill."],sol:`justify-items: center;
  align-items: center;`,why:"Grid axes never swap. That alone makes grid alignment easier to reason about than flex alignment.",markup:`    <div className="grid">
      {[1,2,3,4,5,6].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-09",cat:"grid",title:"justify-self and align-self — one cell disagrees",goal:"A grid of stretched cells where one item is pinned bottom-right of its cell.",use:[["justify-self","override the inline alignment for one item"],["align-self","override the block alignment for one item"]],task:"Leave the container defaults alone and pin only cell 5 to the bottom-right of its own cell.",dia:{w:320,h:130,frame:[8,8,304,114,""],box:[[16,16,92,44,"1"],[116,16,92,44,"2"],[216,16,88,44,"3"],[16,68,92,44,"4"],[116,68,92,44,"","ghost"],[170,94,38,16,"5","hi"],[216,68,88,44,"6"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
  grid-auto-rows: 4rem;
}
.cell { background: aliceblue; }

.cell:nth-child(5) {
  /* TODO */
}
`,hints:["Every justify-items / align-items value has a *-self counterpart set on the item.","justify-self: end; align-self: end; — and unlike flexbox, grid DOES have justify-self, because each item owns its own cell."],sol:`justify-self: end;
  align-self: end;`,why:"“Why does grid have justify-self but flex does not?” — because a grid item has a private cell, while flex items share one line.",markup:`    <div className="grid">
      {[1,2,3,4,5,6].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-10",useApp:!1,cat:"grid",title:"grid-auto-flow: column — a row that keeps going",goal:"Items flowing left to right into new columns instead of wrapping to new rows.",use:[["grid-auto-flow: column","create implicit COLUMNS instead of rows"],["grid-auto-columns","size those implicit columns"]],task:"Make the six items flow into one row of six implicit columns, each 8rem wide.",dia:{w:320,h:100,frame:[8,20,304,60,""],box:[[16,28,60,44,"1"],[82,28,60,44,"2"],[148,28,60,44,"3"],[214,28,60,44,"4"],[280,28,26,44,"5","ghost"]],note:[[8,16,"one row, columns created on demand"],[8,94,"overflows on purpose — pair with overflow-x: auto"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from .map over [1,2,3,4,5,6]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  gap: .5rem;
  /* TODO — two declarations */
}
.cell { background: aliceblue; padding: 1rem; }
`,hints:["With flow: column, grid creates implicit columns and grid-auto-columns sizes them.","grid-auto-flow: column; grid-auto-columns: 8rem; — add overflow-x: auto to turn it into a horizontal scroller."],sol:`grid-auto-flow: column;
  grid-auto-columns: 8rem;`,why:"This is how horizontal card rails are built. Note it is the auto-COLUMNS property that matters now — the mirror of GRID-02.",markup:`    <div className="grid">
      {[1,2,3,4,5,6].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"GRID-11",cat:"grid",title:"Two items, one cell — grid as a stacking context",goal:"A caption sitting on top of an image with no absolute positioning anywhere.",use:[["grid-area: 1 / 1","put both children in the same cell"],["align-self","push the caption to the bottom of that cell"],["DOM order","decide what paints on top — later siblings win, so no z-index is needed"]],task:"Overlay .cap on .img without position: absolute.",dia:{w:320,h:120,frame:[8,8,304,104,"one cell"],box:[[16,16,288,88,"img"],[16,76,288,28,"cap","hi"]],note:[[8,116,"both children: grid-area 1 / 1"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.frame
         div.img
         p.cap   text: "caption"
      */}
    </>
  );
}
`,css:`.frame { display: grid; }
.img { background: steelblue; min-height: 8rem; }
.cap { background: rgb(0 0 0 / .55); color: white; margin: 0; padding: .5rem; }

.frame > * {
  /* TODO — same cell */
}
.cap {
  /* TODO — bottom of that cell */
}
`,hints:["Any two items given the same grid-area occupy the same cell and overlap in DOM order.",".frame > * { grid-area: 1 / 1 } and .cap { align-self: end }. No positioning, no z-index needed — later DOM order already paints on top."],sol:`grid-area: 1 / 1;

/* .cap */ align-self: end;`,why:"This replaces the position: relative + absolute + inset: 0 pattern with two lines, and the parent still sizes itself to the image.",markup:`    <div className="frame">
      <div className="img" />
      <p className="cap">caption</p>
    </div>`},{id:"GRID-12",cat:"grid",title:"subgrid — a child that inherits the parent’s tracks",goal:"Three cards whose titles and buttons line up across cards even though the text lengths differ.",use:[["grid-template-rows: subgrid","adopt the parent’s row lines instead of making new ones"],["grid-row: span 3","claim the rows to inherit"]],task:"Make each card use the outer grid’s three rows so every title, body and button aligns across all cards.",dia:{w:320,h:140,frame:[8,8,304,124,""],box:[[16,16,92,24,"title"],[116,16,92,24,"title"],[216,16,88,24,"title"],[16,44,92,52,"body"],[116,44,92,52,"body"],[216,44,88,52,"body"],[16,100,92,24,"btn","hi"],[116,100,92,24,"btn","hi"],[216,100,88,24,"btn","hi"]],note:[[8,138,"buttons share a row line across cards"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.cards
         article.card
           h3   text: "One"
           p   text: "short"
           button   text: "go"
         article.card
           h3   text: "Two with a longer title"
           p   text: "more body text here"
           button   text: "go"
         article.card
           h3   text: "Three"
           p   text: "mid"
           button   text: "go"
      */}
    </>
  );
}
`,css:`.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
.card { display: grid; gap: .5rem; background: aliceblue; padding: 1rem; }

.card {
  /* TODO — two declarations */
}
`,hints:["A nested grid normally invents its own rows, which is why the buttons drift.","grid-row: span 3; grid-template-rows: subgrid; — the card claims three of the parent’s rows and then adopts those exact row lines."],sol:`grid-row: span 3;
  grid-template-rows: subgrid;`,why:"Before subgrid this needed identical fixed heights or JavaScript. Baseline across all engines since 2023 — worth one confident sentence in an interview.",markup:`    <div className="cards">
      <article className="card"><h3>One</h3><p>short</p><button>go</button></article>
      <article className="card"><h3>Two with a longer title</h3><p>more body text here</p><button>go</button></article>
      <article className="card"><h3>Three</h3><p>mid</p><button>go</button></article>
    </div>`},{id:"GRID-13",cat:"grid",title:"The decision rule, applied",goal:"A page header where the layout is decided by the parent, and a tag row where it is decided by the content.",use:[["display: grid","for the header — the parent declares logo / nav / action"],["display: flex","for the tags — the count is unknown and they must wrap"]],task:"Two containers, two different answers. Give .bar a three-track grid and .tags a wrapping flex row, then be able to justify each in one sentence.",dia:{w:320,h:150,frame:[8,8,304,52,".bar — parent decides 3 tracks"],track:[[16,0,60,"auto"],[84,0,150,"1fr"],[242,0,62,"auto"]],box:[[16,20,60,32,"logo"],[84,20,150,32,"nav"],[242,20,62,32,"act"],[16,80,70,24,"tag"],[92,80,90,24,"tag"],[188,80,60,24,"tag"],[16,110,110,24,"tag"]],note:[[8,74,".tags — content decides, so it wraps"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.bar
         div.logo   text: "logo"
         nav.nav   text: "nav"
         button.act   text: "act"
       div.tags
         span.tag   x4   from .map over ["live","beta","new","experimental"]
      */}
    </>
  );
}
`,css:`.bar {
  gap: 1rem;
  /* TODO — three tracks: auto, 1fr, auto */
}
.bar > * { background: aliceblue; padding: .5rem; }

.tags {
  margin-top: 1rem;
  /* TODO — the CONTENT decides here, so this is the other answer */
}
.tag { background: gainsboro; padding: .25rem .6rem; border-radius: 999px; }
`,hints:["Ask: who knows how many slots there are? If the stylesheet knows, it is grid.","display: grid; grid-template-columns: auto 1fr auto. The header has exactly three known slots. A tag list has an unknown count that must wrap — that is flex."],sol:`/* .bar  */ display: grid;
  grid-template-columns: auto 1fr auto;

/* .tags */ display: flex;
  flex-wrap: wrap;
  gap: .5rem;`,why:"Grid when the PARENT decides the tracks, flex when the CONTENT decides. If you find yourself nesting a third container to fake alignment, you needed grid one level up.",markup:`    <>
      <div className="bar">
        <div className="logo">logo</div>
        <nav className="nav">nav</nav>
        <button className="act">act</button>
      </div>

      <div className="tags">
        {["live","beta","new","experimental"].map(t => <span className="tag" key={t}>{t}</span>)}
      </div>
    </>`},{id:"TRK-01",useApp:!1,cat:"track",title:"repeat() — say it once",goal:"Twelve equal columns without typing 1fr twelve times.",use:[["repeat()","multiply a track definition"]],task:"Write a twelve-column grid in one short declaration.",dia:{w:320,h:90,frame:[8,20,304,50,""],track:[[16,0,288,"repeat(12, 1fr)"]],box:[[16,28,20,34,""],[40,28,20,34,""],[64,28,20,34,""],[88,28,20,34,""],[112,28,20,34,""],[136,28,20,34,""],[160,28,20,34,""],[184,28,20,34,""],[208,28,20,34,""],[232,28,20,34,""],[256,28,20,34,""],[280,28,24,34,""]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x12   from Array.from({ length: 12 })
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  gap: .25rem;
  /* TODO */
}
.cell { background: aliceblue; padding: .5rem; text-align: center; }
`,hints:["repeat(count, track).","grid-template-columns: repeat(12, 1fr);"],sol:"grid-template-columns: repeat(12, 1fr);",why:"The twelve-column grid every framework ships is one line of real CSS. That is worth knowing before you reach for one.",markup:`    <div className="grid">
      {Array.from({ length: 12 }, (_, i) => <div className="cell" key={i}>{i + 1}</div>)}
    </div>`},{id:"TRK-02",useApp:!1,cat:"track",title:"fr is not % — gaps come out first",goal:"Three columns that stay inside the container once a 1rem gap is added.",use:[["fr","divides the space LEFT OVER after gaps"]],task:"The percentage version overflows once gaps are added. Fix it by changing the unit only.",dia:{w:300,h:86,frame:[4,4,292,60,"container"],box:[[10,20,86,36,""],[112,20,86,36,""],[214,20,86,36,""]],note:[[10,76,"fr divides what is LEFT after gaps"]],alt:{w:300,h:86,frame:[4,4,262,60,"container"],box:[[10,20,86,36,""],[112,20,86,36,""],[214,20,86,36,"","hi"]],note:[[10,76,"3 x 33.33% + 2 gaps overflows the right edge"]]},labels:["1fr 1fr 1fr — fits","33.33% x3 — overflows"]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x3   from Array.from({ length: 3 })
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 33.33% 33.33% 33.33%;
  /* TODO — replace the line above so it fits */
}
.cell { background: aliceblue; padding: 1rem; }
`,hints:["Percentages resolve against the container width and know nothing about gaps.","grid-template-columns: repeat(3, 1fr). fr distributes what remains AFTER gaps and fixed tracks, so it can never overflow from gaps alone."],sol:"grid-template-columns: repeat(3, 1fr);",why:"This is why fr exists at all. It is also the honest answer to “why not just use percentages” in an interview.",markup:`    <div className="grid">
      {Array.from({ length: 3 }, (_, i) => <div className="cell" key={i}>{i + 1}</div>)}
    </div>`},{id:"TRK-03",useApp:!1,cat:"track",title:"minmax(0, 1fr) — the grid version of min-width: 0",goal:"A two-column grid where a long unbroken string does not widen its column.",use:[["minmax()","set a floor and a ceiling for a track"],["minmax(0, 1fr)","lift the automatic min-content floor"]],task:"Column one blows out because of a long token. Fix the TRACK, not the item.",dia:{w:320,h:110,frame:[8,10,304,60,""],box:[[16,18,140,44,"longtext…","hi"],[164,18,140,44,"2"]],note:[[8,88,"1fr means minmax(auto, 1fr) — auto floors at min-content"],[8,104,"minmax(0, 1fr) removes that floor"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   text: "Supercalifragilisticexpialid"
         div.cell   text: "2"
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  /* TODO — replace the line above */
}
.cell { background: aliceblue; padding: 1rem; overflow: hidden; text-overflow: ellipsis; }
`,hints:["1fr is shorthand for minmax(auto, 1fr), and auto will not go below min-content.","grid-template-columns: repeat(2, minmax(0, 1fr));"],sol:"grid-template-columns: repeat(2, minmax(0, 1fr));",why:"Exactly the same bug as FLEX-15, one layer up. Recognising the pair — min-width: 0 in flex, minmax(0, 1fr) in grid — is a strong signal.",markup:`    <div className="grid">
      <div className="cell">Supercalifragilisticexpialidocious_and_then_some</div>
      <div className="cell">2</div>
    </div>`},{id:"TRK-04",useApp:!1,cat:"track",title:"auto-fill + minmax — responsive with zero media queries",goal:"Cards that are at least 12rem wide, fill the row, and reflow at every width on their own.",use:[["repeat(auto-fill, …)","let the browser compute the column count"],["minmax(12rem, 1fr)","a floor of 12rem, then share what is left"]],task:"One declaration. No media query anywhere.",dia:{w:300,h:82,frame:[4,4,292,74,""],box:[[10,12,90,28,""],[104,12,90,28,""],[198,12,90,28,""],[10,44,90,28,""],[104,44,90,28,""]],alt:{w:300,h:82,frame:[4,4,150,74,""],box:[[10,12,64,28,""],[78,12,64,28,""],[10,44,64,28,""],[78,44,64,28,""]],note:[[160,20,"same rule"],[160,34,"no media"],[160,48,"query"]]},labels:["wide — 3 per row","narrow — 2 per row"]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x6   from Array.from({ length: 6 })
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  gap: 1rem;
  /* TODO — one line, no media query */
}
.cell { background: aliceblue; padding: 1rem; }
`,hints:["repeat() accepts auto-fill or auto-fit in place of a number.","grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));"],sol:"grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));",why:"The highest-leverage line in modern CSS. It responds to the CONTAINER, which is why it keeps working inside a sidebar where a media query would not.",markup:`    <div className="grid">
      {Array.from({ length: 6 }, (_, i) => <div className="cell" key={i}>{i + 1}</div>)}
    </div>`},{id:"TRK-05",useApp:!1,cat:"track",title:"auto-fit vs auto-fill — the difference is empty tracks",goal:"Two grids, three cards each, side by side: one stretches the cards, one leaves gaps at the end.",use:[["auto-fit","collapse empty tracks so items stretch"],["auto-fill","keep empty tracks so items stay at their floor"]],task:"Both grids hold TWO cards in a row with space for about four tracks. Make .fit stretch its two cards across the whole row, and .fill leave the unused tracks empty. Use a 6rem floor — the two rules differ by one keyword.",dia:{w:300,h:80,frame:[4,4,292,72,"2 cards, room for 4"],box:[[10,26,138,40,"1"],[154,26,138,40,"2"]],note:[[10,16,"empty tracks collapse — cards stretch"]],alt:{w:300,h:80,frame:[4,4,292,72,"2 cards, room for 4"],box:[[10,26,64,40,"1"],[80,26,64,40,"2"],[150,26,64,40,"","ghost"],[220,26,64,40,"","ghost"]],note:[[10,16,"empty tracks kept — cards stay at 6rem"]]},labels:["auto-fit","auto-fill"]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       p.lab   text: "auto-fit"
       div.grid.fit
         div.cell   x2   from .map over [1,2]
       p.lab   text: "auto-fill"
       div.grid.fill
         div.cell   x2   from .map over [1,2]
      */}
    </>
  );
}
`,css:`/* Two cards, room for four tracks — that is the only situation where the two
   keywords differ. Fill the row with items and they behave identically. */
.grid { display: grid; gap: 1rem; margin-bottom: 1rem; }
.cell { background: aliceblue; padding: 1rem; }
.lab { margin: 0 0 .25rem; font: 700 .7rem ui-monospace, monospace; color: dimgray; }

.fit {
  /* TODO — 6rem floor, and the two cards STRETCH to fill the row */
}
.fill {
  /* TODO — 6rem floor, and the empty tracks are KEPT */
}
`,hints:["Both create as many tracks as fit. They differ only in what happens to the tracks that ended up empty.",".fit uses repeat(auto-fit, minmax(6rem, 1fr)) — empty tracks collapse to 0 so the 1fr of the remaining tracks absorbs the space, and the two cards stretch wide. .fill uses auto-fill — the empty tracks stay at 6rem each, so the two cards stop at 6rem and the rest of the row is blank."],sol:`/* fit  */ grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
/* fill */ grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));`,why:"With enough items to fill the row they are identical — the difference only shows when items run out. That is the exact question an interviewer asks.",markup:`    <>
      <p className="lab">auto-fit</p>
      <div className="grid fit">
        {[1,2].map(n => <div className="cell" key={n}>{n}</div>)}
      </div>
      <p className="lab">auto-fill</p>
      <div className="grid fill">
        {[1,2].map(n => <div className="cell" key={n}>{n}</div>)}
      </div>
    </>`},{id:"TRK-06",useApp:!1,cat:"track",title:"min() inside minmax — surviving a 320px phone",goal:"The auto-fit gallery that does not overflow when the viewport is narrower than the 20rem floor.",use:[["min()","pick the smaller of two values at compute time"],["minmax(min(100%, 20rem), 1fr)","floor that can never exceed the container"]],task:"A 20rem floor overflows a 320px screen. Fix the floor without a media query.",dia:{w:300,h:80,frame:[4,4,180,52,"320px screen"],box:[[10,14,168,32,"fits"]],note:[[10,66,"min(100%, 20rem) clamps the floor"]],alt:{w:300,h:80,frame:[4,4,180,52,"320px screen"],box:[[10,14,240,32,"20rem floor — overflows","hi"]],note:[[10,66,"a hard 20rem floor cannot shrink"]]},labels:["with min()","without"]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x4   from Array.from({ length: 4 })
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  /* TODO — replace the line above so it never overflows */
}
.cell { background: aliceblue; padding: 1rem; }
`,hints:["The minimum in minmax() is a hard floor — the track will not go below it even if the container is smaller.","grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));"],sol:"grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));",why:"The famous auto-fit one-liner has this exact bug, and most tutorials never mention it. Knowing the fix is a differentiator.",markup:`    <div className="grid">
      {Array.from({ length: 4 }, (_, i) => <div className="cell" key={i}>{i + 1}</div>)}
    </div>`},{id:"TRK-07",cat:"track",title:"auto tracks — content-sized rails around a fluid middle",goal:"A toolbar whose left and right groups are exactly as wide as their content and whose middle absorbs the rest.",use:[["auto","size the track to its content"],["1fr","give the remaining space to the middle track"]],task:"Three tracks: content, fluid, content. No fixed widths anywhere.",dia:{w:320,h:100,frame:[8,20,304,50,""],track:[[16,0,58,"auto"],[80,0,166,"1fr"],[252,0,52,"auto"]],box:[[16,28,58,34,"back"],[80,28,166,34,"title"],[252,28,52,34,"save"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.bar
         button   text: "back"
         h2.title   text: "Title"
         button   text: "save"
      */}
    </>
  );
}
`,css:`.bar {
  display: grid;
  gap: 1rem;
  align-items: center;
  /* TODO — content, fluid, content */
}
.title { margin: 0; background: aliceblue; }
`,hints:["An auto track is sized by its content; a 1fr track takes what is left.","grid-template-columns: auto 1fr auto;"],sol:"grid-template-columns: auto 1fr auto;",why:"auto / 1fr / auto is the single most reusable three-track pattern: app bars, list rows, form rows, table-like layouts.",markup:`    <div className="bar">
      <button>back</button>
      <h2 className="title">Title</h2>
      <button>save</button>
    </div>`},{id:"PLC-01",useApp:!1,cat:"place",title:"place-items: center — the two-line centring",goal:"One box dead centre of a 12rem-tall container.",use:[["place-items","align-items and justify-items in one declaration"]],task:"Centre the child both ways in two lines of CSS total.",dia:{w:320,h:130,frame:[8,8,304,114,".box  height 12rem"],box:[[116,48,88,34,"centred","hi"]],note:[[8,128,"place-items: <align> <justify>"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.box
         div.thing   text: "centred"
      */}
    </>
  );
}
`,css:`.box {
  height: 12rem;
  background: whitesmoke;
  /* TODO — two lines total */
}
.thing { background: steelblue; color: white; padding: 1rem; }
`,hints:["display: grid plus one more declaration.","display: grid; place-items: center; — one value applies to both axes."],sol:`display: grid;
  place-items: center;`,why:"The shortest true centring in CSS. Worth having in your fingers — it comes up in almost every coding round.",markup:`    <div className="box">
      <div className="thing">centred</div>
    </div>`},{id:"PLC-02",useApp:!1,cat:"place",title:"place-content vs place-items",goal:"A 2×2 grid of small fixed-size cells sitting as a block in the centre of a large container.",use:[["place-content","position the whole TRACK GRID inside the container"],["place-items","position each item inside its own cell"]],task:"The tracks are 4rem each and the container is much bigger. Centre the grid itself, not the items in their cells.",dia:{w:320,h:150,frame:[8,8,304,134,"container"],box:[[104,42,52,30,"1"],[164,42,52,30,"2"],[104,78,52,30,"3"],[164,78,52,30,"4"]],note:[[8,146,"the whole track block is centred, cells stay 4rem"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x4   from .map over [1,2,3,4]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: 4rem 4rem;
  grid-template-rows: 4rem 4rem;
  gap: .5rem;
  height: 14rem;
  background: whitesmoke;
  /* TODO */
}
.cell { background: aliceblue; }
`,hints:["If the tracks do not fill the container there is leftover space around the whole grid. That is what place-content distributes.","place-content: center. place-items would centre each cell’s contents and leave the grid itself in the top-left."],sol:"place-content: center;",why:"content = the tracks, items = the things in the tracks, self = this one item. That three-way split holds for justify-, align- and place-.",markup:`    <div className="grid">
      {[1,2,3,4].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"PLC-03",cat:"place",title:"place-self — one item opts out",goal:"A centred grid where a single item is pinned to the top-left of its cell.",use:[["place-self","align-self and justify-self in one declaration"]],task:"Keep place-items: center on the container and pin only item 3 to the start of both axes.",dia:{w:320,h:130,frame:[8,8,304,114,"place-items: center"],box:[[16,16,92,44,"","ghost"],[46,30,32,16,"1"],[116,16,92,44,"","ghost"],[146,30,32,16,"2"],[216,16,88,44,"","ghost"],[220,20,32,16,"3","hi"],[16,68,92,44,"","ghost"],[46,82,32,16,"4"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.cell   x4   from .map over [1,2,3,4]
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 4rem;
  gap: .5rem;
  place-items: center;
}
.cell { background: aliceblue; padding: .25rem .5rem; }

.cell:nth-child(3) {
  /* TODO */
}
`,hints:["place-self takes the same two values in the same order: align then justify.","place-self: start; — one value sets both axes."],sol:"place-self: start;",why:"Knowing the -self layer exists for all three families means you never have to restructure markup to make one element behave differently.",markup:`    <div className="grid">
      {[1,2,3,4].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"ARE-01",cat:"areas",title:"grid-template-areas — layout you can read out loud",goal:"Header across the top, sidebar left, main right, footer across the bottom.",use:[["grid-template-areas","name the regions in a picture"],["grid-area","assign each child to a name"]],task:"Write the area map and give each of the four children its name. The map itself should look like the layout.",dia:{w:320,h:150,frame:[8,8,304,134,""],box:[[16,16,288,28,"header"],[16,52,84,54,"sidebar"],[108,52,196,54,"main"],[16,114,288,20,"footer"]],note:[[8,148,"the string literally draws the page"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.shell
         header.hd   text: "header"
         aside.sb   text: "sidebar"
         main.mn   text: "main"
         footer.ft   text: "footer"
      */}
    </>
  );
}
`,css:`.shell {
  display: grid;
  grid-template-columns: 12rem 1fr;
  gap: .5rem;
  /* TODO — the area map */
}
.shell > * { background: aliceblue; padding: .5rem; }

.hd { /* TODO */ }
.sb { /* TODO */ }
.mn { /* TODO */ }
.ft { /* TODO */ }
`,hints:["Each quoted string is one row; each word in it is one column.",'grid-template-areas: "hd hd" "sb mn" "ft ft"; then ONE name per child — .hd { grid-area: hd }, .sb { grid-area: sb }, and so on. (Written with slashes, grid-area means row-start / column-start / row-end / column-end — a different property entirely. With a single value it is an area name.) Repeating a name across cells makes it span them.'],sol:`grid-template-areas:
    "hd hd"
    "sb mn"
    "ft ft";

.hd { grid-area: hd; }
.sb { grid-area: sb; }
.mn { grid-area: mn; }
.ft { grid-area: ft; }`,why:"The most reviewable layout syntax in CSS: a reader sees the page shape in the stylesheet without running it.",markup:`    <div className="shell">
      <header className="hd">header</header>
      <aside className="sb">sidebar</aside>
      <main className="mn">main</main>
      <footer className="ft">footer</footer>
    </div>`},{id:"ARE-02",useApp:!1,cat:"areas",title:"The dot — a deliberately empty cell",goal:"A 2×2 layout where the bottom-left cell is intentionally empty.",use:[["a dot in the area map","names a cell that stays deliberately empty"]],task:"Leave the bottom-left cell empty using the area map alone. Do not add an empty div.",dia:{w:320,h:140,frame:[8,8,304,124,""],box:[[16,16,140,50,"a"],[164,16,140,50,"b"],[164,74,140,50,"c"]],note:[[40,104,".  (empty)"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.a   text: "a"
         div.b   text: "b"
         div.c   text: "c"
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .5rem;
  /* TODO — leave the bottom-left empty */
}
.grid > * { background: aliceblue; padding: 1rem; }
.a { grid-area: a; }
.b { grid-area: b; }
.c { grid-area: c; }
`,hints:["A single . (or a run like ...) marks a cell with no name.",'grid-template-areas: "a b" ". c";'],sol:`grid-template-areas:
    "a b"
    ". c";`,why:"Spacer divs are a markup smell. The dot keeps the emptiness in the stylesheet where it belongs.",markup:`    <div className="grid">
      <div className="a">a</div>
      <div className="b">b</div>
      <div className="c">c</div>
    </div>`},{id:"ARE-03",useApp:!1,cat:"areas",title:"Spanning by repetition",goal:"A hero filling the left column across the first two rows, with a and b stacked beside it.",use:[["grid-template-areas","repeat a name to span cells"]],task:"Make .hero span two ROWS of the left column by repeating its name down the map, and make c span both columns. Every row string must have the same number of columns.",dia:{w:320,h:140,frame:[8,8,304,124,""],box:[[16,16,196,72,"hero","hi"],[220,16,84,34,"a"],[220,54,84,34,"b"],[16,96,288,28,"c"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.hero   text: "hero"
         div.a   text: "a"
         div.b   text: "b"
         div.c   text: "c"
      */}
    </>
  );
}
`,css:`.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: .5rem;
  /* TODO */
}
.grid > * { background: aliceblue; padding: 1rem; }
.hero { grid-area: hero; }
.a { grid-area: a; }
.b { grid-area: b; }
.c { grid-area: c; }
`,hints:["The same name in adjacent cells becomes one rectangular area. It must stay a rectangle — an L shape is invalid and the whole map is ignored.",'grid-template-areas: "hero a" "hero b" "c c";'],sol:`grid-template-areas:
    "hero a"
    "hero b"
    "c c";`,why:"The rectangle rule is the gotcha: one malformed map silently drops the entire declaration and you get auto-placement instead.",markup:`    <div className="grid">
      <div className="hero">hero</div>
      <div className="a">a</div>
      <div className="b">b</div>
      <div className="c">c</div>
    </div>`},{id:"ARE-04",cat:"areas",title:"Rearranging at a breakpoint — map only",goal:"The same four elements: sidebar beside main on desktop, stacked below the header on mobile.",use:[["grid-template-areas","redraw the layout inside a media query"],["grid-template-columns","collapse to one column"]],task:"Inside the media query, change only the map and the columns. Do not touch a single grid-area on the children.",dia:{w:320,h:150,frame:[8,8,150,134,"wide"],box:[[14,14,138,22,"hd"],[14,42,44,74,"sb"],[64,42,88,74,"mn"],[14,122,138,16,"ft"],[172,14,140,22,"hd"],[172,42,140,26,"sb","hi"],[172,74,140,42,"mn"],[172,122,140,16,"ft"]],note:[[172,8,"narrow — same children"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.shell
         header.hd   text: "header"
         aside.sb   text: "sidebar"
         main.mn   text: "main"
         footer.ft   text: "footer"
      */}
    </>
  );
}
`,css:`.shell {
  display: grid;
  gap: .5rem;
  grid-template-columns: 12rem 1fr;
  grid-template-areas: "hd hd" "sb mn" "ft ft";
}
.shell > * { background: aliceblue; padding: .5rem; }
.hd { grid-area: hd; } .sb { grid-area: sb; }
.mn { grid-area: mn; } .ft { grid-area: ft; }

@media (width < 40rem) {
  .shell {
    /* TODO — one column, stacked */
  }
}
`,hints:["One column means every row string has exactly one name.",'grid-template-columns: 1fr; grid-template-areas: "hd" "sb" "mn" "ft";'],sol:`grid-template-columns: 1fr;
    grid-template-areas:
      "hd"
      "sb"
      "mn"
      "ft";`,why:"The children never learn about the breakpoint. All responsive knowledge stays in one place — that is what makes this maintainable.",markup:`    <div className="shell">
      <header className="hd">header</header>
      <aside className="sb">sidebar</aside>
      <main className="mn">main</main>
      <footer className="ft">footer</footer>
    </div>`},{id:"CQ-01",cat:"cq",title:"container-type — opting a parent in",goal:"A card that goes from stacked to side-by-side based on the width of its own parent.",use:[["container-type: inline-size","let children query this element’s inline size"],["@container","the query itself"]],task:"Make .card lay its thumbnail beside its body once the CARD’s container is at least 24rem wide.",dia:{w:320,h:150,frame:[8,8,150,80,"container ≥ 24rem"],box:[[14,14,44,68,"img"],[64,14,88,68,"body"],[172,14,140,30,"img"],[172,50,140,54,"body"]],note:[[172,8,"container < 24rem"],[8,140,"the VIEWPORT is not consulted at all"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.col
         article.card
           img.thumb   alt=""
           div.body
             h3   text: "Title"
             p   text: "Body copy."
      */}
    </>
  );
}
`,css:`.col {
  /* TODO — opt this element in as a query container */
}
.card { display: grid; gap: .5rem; background: aliceblue; padding: .5rem; }
.thumb { background: steelblue; min-height: 4rem; }

/* TODO — at container width 24rem and up, two columns */
`,hints:["A container query needs an ancestor that has declared itself a container. Nothing queries by default.",".col { container-type: inline-size } then @container (width >= 24rem) { .card { grid-template-columns: 8rem 1fr } }"],sol:`.col { container-type: inline-size; }

@container (width >= 24rem) {
  .card { grid-template-columns: 8rem 1fr; }
}`,why:"inline-size means “size me from my inline axis only” — it avoids the circular layout problem that made this impossible before.",markup:`    <div className="col">
      <article className="card">
          <img className="thumb" alt="" />
          <div className="body"><h3>Title</h3><p>Body copy.</p></div>
        </article>
    </div>`},{id:"CQ-02",cat:"cq",title:"container-name — querying a specific ancestor",goal:"A card that answers to the page shell, not to the nearest wrapper.",use:[["container-name","label a container"],["container","the shorthand: name / type"],["@container <name> (…)","query that named one"]],task:"Two nested containers wrap the card. Query the OUTER one by name.",dia:{w:320,h:140,frame:[8,8,304,124,"shell  ← queried"],box:[[20,26,280,96,"","ghost"],[28,44,264,70,"card","hi"]],note:[[24,40,"inner wrapper — not queried"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.shell
         div.inner
           article.card
             img.thumb   alt=""
             div.body
               h3   text: "Title"
               p   text: "Body copy."
      */}
    </>
  );
}
`,css:`.shell {
  /* TODO — name it "page" and make it a container */
}
.inner { container-type: inline-size; }
.card { display: grid; gap: .5rem; background: aliceblue; padding: .5rem; }
.thumb { background: steelblue; min-height: 3rem; }

/* TODO — query the container named page */
`,hints:["container: <name> / <type> is the shorthand.",".shell { container: page / inline-size } then @container page (width >= 30rem) { … }. Without the name the query binds to the NEAREST container, which is .inner."],sol:`.shell { container: page / inline-size; }

@container page (width >= 30rem) {
  .card { grid-template-columns: 8rem 1fr; }
}`,why:"Nested containers are the normal case in a real app. Names are how you avoid accidentally querying a wrapper you did not mean.",markup:`    <div className="shell">
      <div className="inner">
        <article className="card">
          <img className="thumb" alt="" />
          <div className="body"><h3>Title</h3><p>Body copy.</p></div>
        </article>
      </div>
    </div>`},{id:"CQ-03",cat:"cq",title:"One component, two contexts",goal:"The identical card markup rendering wide in main and stacked in a narrow sidebar — at the same viewport width.",use:[["container-type","on both the sidebar and the main column"],["@container","a single rule that serves both"]],task:"Write ONE @container rule. The same card must be two-column in main and one-column in the sidebar without any extra class.",dia:{w:320,h:140,frame:[8,8,110,124,"sidebar"],box:[[14,26,98,30,"img"],[14,62,98,64,"body"],[130,26,80,100,"img"],[216,26,96,100,"body"]],note:[[130,18,"main — same CSS, same viewport"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.layout
         aside.side
           article.card
             img.thumb   alt=""
             div.body
               h3   text: "Title"
               p   text: "Body copy."
         main.main
           article.card
             img.thumb   alt=""
             div.body
               h3   text: "Title"
               p   text: "Body copy."
      */}
    </>
  );
}
`,css:`.layout { display: grid; grid-template-columns: 12rem 1fr; gap: 1rem; }
.card { display: grid; gap: .5rem; background: aliceblue; padding: .5rem; }
.thumb { background: steelblue; min-height: 3rem; }

.side, .main {
  /* TODO — one declaration */
}

/* TODO — one rule that serves both */
`,hints:["If both columns are containers, the same query resolves differently in each.",".side, .main { container-type: inline-size } plus @container (width >= 20rem) { .card { grid-template-columns: 6rem 1fr } }. The sidebar is 12rem so it never matches; main does."],sol:`.side, .main { container-type: inline-size; }

@container (width >= 20rem) {
  .card { grid-template-columns: 6rem 1fr; }
}`,why:"This is the argument for container queries in one screen. A media query cannot express it, because the viewport is identical in both cases.",markup:`    <div className="layout">
      <aside className="side">
        <article className="card">
          <img className="thumb" alt="" />
          <div className="body"><h3>Title</h3><p>Body copy.</p></div>
        </article>
      </aside>
      <main className="main">
        <article className="card">
          <img className="thumb" alt="" />
          <div className="body"><h3>Title</h3><p>Body copy.</p></div>
        </article>
      </main>
    </div>`},{id:"CQ-04",cat:"cq",title:"cqi — sizing from the container, not the viewport",goal:"A heading that scales with the width of its card rather than the window.",use:[["cqi","1% of the container’s inline size"],["clamp()","keep the fluid value inside sane bounds"]],task:"Give .card h3 a font-size that is fluid against its container, floored at 1rem and capped at 1.75rem.",dia:{w:180,h:74,frame:[4,4,172,66,"narrow card"],box:[[10,24,160,18,"Title"]],note:[[10,58,"5cqi of a small container"]],alt:{w:300,h:74,frame:[4,4,292,66,"wide card"],box:[[10,20,280,26,"Title","hi"]],note:[[10,58,"same rule, larger container → larger type"]]},labels:["narrow","wide"]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.col
         article.card
           img.thumb   alt=""
           div.body
             h3   text: "Title"
             p   text: "Body copy."
      */}
    </>
  );
}
`,css:`.col { container-type: inline-size; }
.card { background: aliceblue; padding: 1rem; }

.card h3 {
  /* TODO — fluid against the CONTAINER */
}
`,hints:["cqi is to the container what vi is to the viewport. cqw, cqh and cqb exist too.","font-size: clamp(1rem, 5cqi, 1.75rem);"],sol:"font-size: clamp(1rem, 5cqi, 1.75rem);",why:"Container units make a component truly self-contained: drop it anywhere and its internal scale follows the space it was given.",markup:`    <div className="col">
      <article className="card">
          <img className="thumb" alt="" />
          <div className="body"><h3>Title</h3><p>Body copy.</p></div>
        </article>
    </div>`},{id:"CQ-05",cat:"cq",title:"Container query or media query — choosing correctly",goal:"Page gutters that follow the viewport, and a card that follows its container.",use:[["@media","for page-level decisions — gutters, column count of the shell"],["@container","for component-level decisions — how a card arranges itself"]],task:"Set the page gutter with a media query and the card’s internal layout with a container query. Getting the split right is the whole exercise.",dia:{w:320,h:140,frame:[8,8,304,124,"viewport decides the gutter"],box:[[30,26,260,96,"","ghost"],[38,42,244,72,"card decides its own layout","hi"]],gap:[[8,20,22,"gutter",1]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.page
         div.col
           article.card
             img.thumb   alt=""
             div.body
               h3   text: "Title"
               p   text: "Body copy."
      */}
    </>
  );
}
`,css:`.page { padding-inline: 1rem; }
.col { container-type: inline-size; }
.card { display: grid; gap: .5rem; background: aliceblue; padding: .5rem; }
.thumb { background: steelblue; min-height: 3rem; }

/* TODO — media query: gutter 3rem from 60rem up */

/* TODO — container query: two columns from 24rem up */
`,hints:["Ask what the decision actually depends on. Gutters depend on the window. A card’s arrangement depends on the space the card was handed.","@media (width >= 60rem) { .page { padding-inline: 3rem } } and @container (width >= 24rem) { .card { grid-template-columns: 8rem 1fr } }"],sol:`@media (width >= 60rem) { .page { padding-inline: 3rem; } }

@container (width >= 24rem) { .card { grid-template-columns: 8rem 1fr; } }`,why:"“When would you NOT use a container query?” is the follow-up. Page chrome is a viewport concern; components are a container concern.",markup:`    <div className="page">
      <div className="col">
        <article className="card">
          <img className="thumb" alt="" />
          <div className="body"><h3>Title</h3><p>Body copy.</p></div>
        </article>
      </div>
    </div>`},{id:"POS-01",cat:"pos",title:"relative — moves the paint, keeps the space",goal:"A badge nudged 8px up and left, with the layout completely unchanged.",use:[["position: relative","offset from the element’s normal position"],["top","the offset"]],task:"Nudge .badge up by 8px. The siblings must not move at all.",dia:{w:320,h:110,frame:[8,10,304,60,""],box:[[16,26,80,34,"a"],[102,26,80,34,"","ghost"],[102,18,80,34,"b","hi"],[188,26,80,34,"c"]],note:[[8,88,"the ghost is the space b still occupies"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         span   text: "a"
         span.badge   text: "b"
         span   text: "c"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: .5rem; }
.row > span { background: aliceblue; padding: .5rem 1rem; }

.badge {
  /* TODO — up 8px, nobody moves */
}
`,hints:["relative offsets are visual only; the element keeps its original box in the flow.","position: relative; top: -8px;"],sol:`position: relative;
  top: -8px;`,why:"The reason relative is safe for nudges and dangerous for layout: the space is still reserved, so overlaps are silent.",markup:`    <div className="row">
      <span>a</span>
      <span className="badge">b</span>
      <span>c</span>
    </div>`},{id:"POS-02",cat:"pos",title:"absolute — measured from the nearest POSITIONED ancestor",goal:"A “NEW” ribbon pinned to the top-right corner of its own card, not the page.",use:[["position: relative","on the parent, to become the containing block"],["position: absolute","on the ribbon"],["top / right","the offsets"]],task:"Pin the ribbon to its card’s corner. You must add a declaration to the PARENT for this to work.",dia:{w:320,h:120,frame:[8,10,304,90,".card  position: relative"],box:[[236,16,70,20,"NEW","hi"],[16,40,180,50,"content"]],note:[[8,112,"without relative on the card it pins to the page instead"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card
         span.ribbon   text: "NEW"
         p   text: "content"
      */}
    </>
  );
}
`,css:`.card {
  background: aliceblue;
  padding: 1rem;
  /* TODO — become the containing block */
}

.ribbon {
  background: darkorange;
  color: white;
  padding: .2rem .5rem;
  /* TODO — pin to the top-right */
}
`,hints:["An absolutely positioned element looks up the tree for the nearest ancestor whose position is not static.",".card { position: relative } and .ribbon { position: absolute; top: 0; right: 0 }."],sol:`.card { position: relative; }
.ribbon { position: absolute; top: 0; right: 0; }`,why:"“Relative parent, absolute child” is the single most-used positioning idiom, and the containing-block rule is what makes it work.",markup:`    <div className="card">
      <span className="ribbon">NEW</span>
      <p>content</p>
    </div>`},{id:"POS-03",cat:"pos",title:"No positioned ancestor — falling through to the page",goal:"Understanding where an absolute element lands when nothing above it is positioned.",use:[["position: absolute","with every ancestor left static"]],task:"Do not add position: relative anywhere. Pin .thing to top: 0; left: 0 and state which box it is measured against.",dia:{w:320,h:130,frame:[8,8,304,114,"initial containing block ≈ the viewport"],box:[[10,10,60,20,"thing","hi"],[40,50,240,60,".card (static)","ghost"]],note:[[8,126,"it escapes the card entirely"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card
         span.thing   text: "thing"
         p   text: "content"
      */}
    </>
  );
}
`,css:`.card { background: aliceblue; padding: 1rem; margin-top: 3rem; }

.thing {
  background: darkorange;
  color: white;
  /* TODO — pin top-left, add nothing to .card */
}
`,hints:["If no ancestor is positioned, the search reaches the initial containing block — a viewport-sized box at the document origin.","position: absolute; top: 0; left: 0; — it lands at the top-left of the PAGE, not the card. This is the “my tooltip flew to the corner” bug."],sol:`position: absolute;
  top: 0;
  left: 0;`,why:"Most positioning bugs are this: the containing block is not what you assumed. Always name the containing block before you debug offsets.",markup:`    <div className="card">
      <span className="thing">thing</span>
      <p>content</p>
    </div>`},{id:"POS-04",cat:"pos",title:"fixed — and the transform that silently breaks it",goal:"A toolbar fixed to the bottom of the viewport, and a demonstration of what breaks it.",use:[["position: fixed","pin to the viewport"],["inset-inline","stretch left and right"],["transform","on an ancestor — the thing that breaks fixed"]],task:"Fix the bar to the bottom of the viewport. Then uncomment the transform on the wrapper and explain in the comment why the bar stops being fixed.",dia:{w:320,h:130,frame:[8,8,304,114,"viewport"],box:[[8,96,304,26,"fixed bar","hi"],[24,20,272,60,"page content","ghost"]],note:[[8,128,"a transformed ancestor becomes the containing block"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.wrap
         p   text: "content"
         div.bar   text: "toolbar"
      */}
    </>
  );
}
`,css:`.wrap { min-height: 12rem; }
/* .wrap { transform: translateZ(0); } */

.bar {
  background: steelblue;
  color: white;
  padding: .5rem;
  /* TODO — pin to the bottom of the viewport */
}
/* TODO — one line: why does the transform break it? */
`,hints:["fixed uses the viewport as its containing block — unless an ancestor has transform, filter, perspective, will-change or contain, which creates a new containing block for fixed descendants.","position: fixed; bottom: 0; inset-inline: 0;"],sol:`position: fixed;
  bottom: 0;
  inset-inline: 0;`,why:"This bug appears in every animation library integration. Knowing the trigger list — transform, filter, will-change, contain — is a genuinely senior detail.",markup:`    <div className="wrap">
      <p>content</p>
      <div className="bar">toolbar</div>
    </div>`},{id:"POS-05",cat:"pos",title:"sticky — needs a threshold and a scrolling ancestor",goal:"A section heading that sticks to the top while its own section scrolls past.",use:[["position: sticky","relative until a threshold, then fixed within the ancestor"],["top","the threshold — mandatory, sticky does nothing without it"]],task:"Make .head stick to the top of the scroll area. Then say why sticky stops at the end of its parent.",dia:{w:320,h:140,frame:[8,8,304,124,"scroll area"],box:[[16,16,288,22,"heading — stuck at top: 0","hi"],[16,46,288,70,"section content"]],note:[[8,136,"sticks only while its PARENT is on screen"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.scroller
         section
           h2.head   text: "Section"
           p   text: "lots of content…"
      */}
    </>
  );
}
`,css:`.scroller { height: 10rem; overflow-y: auto; }
section { padding-bottom: 20rem; }

.head {
  background: steelblue;
  color: white;
  margin: 0;
  padding: .5rem;
  /* TODO — two declarations */
}
`,hints:["sticky without an offset never activates — top, bottom, left or right is what defines “stuck”.","position: sticky; top: 0. A sticky element is confined to its parent, so it unsticks when the parent scrolls out. And overflow: hidden on any ancestor kills it entirely."],sol:`position: sticky;
  top: 0;`,why:"Two failures cover 95% of “sticky is not working”: no offset, or an ancestor with overflow hidden/auto that is not the intended scroller.",markup:`    <div className="scroller">
      <section>
        <h2 className="head">Section</h2>
        <p>lots of content…</p>
      </section>
    </div>`},{id:"POS-06",cat:"pos",title:"z-index needs a positioned element — or a flex/grid item",goal:"A blue box painted above a red one that comes later in the DOM.",use:[["z-index","order along the z axis"],["position: relative","make z-index apply at all"]],task:".a must paint above .b. Note that .a comes FIRST in the DOM, so it loses by default.",dia:{w:320,h:120,frame:[8,10,304,90,""],box:[[40,26,140,60,"b","ghost"],[16,40,140,50,"a — on top","hi"]],note:[[8,112,"later DOM order paints on top, unless z-index says otherwise"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.stack
         div.a   text: "a"
         div.b   text: "b"
      */}
    </>
  );
}
`,css:`.stack { display: grid; }
.stack > * { grid-area: 1 / 1; padding: 2rem; }
.a { background: steelblue; color: white; }
.b { background: indianred; color: white; margin: 1rem 0 0 1.5rem; }

.a {
  /* TODO — paint above b */
}
`,hints:["On a static element z-index is ignored completely. Flex and grid ITEMS are the exception — z-index works on them without position.","z-index: 1. These are grid items, so it applies directly; on a plain block you would also need position: relative."],sol:"z-index: 1;",why:"The flex/grid-item exception is a real interview question, and it is why the overlay pattern in GRID-11 needs no positioning at all.",markup:`    <div className="stack">
      <div className="a">a</div>
      <div className="b">b</div>
    </div>`},{id:"POS-07",cat:"pos",title:"The stacking context trap — z-index: 9999 that loses",goal:"Diagnosing why a huge z-index still paints underneath.",use:[["opacity","below 1 it creates a stacking context"],["z-index","trapped inside that context"]],task:".modal has z-index 9999 and still hides behind .panel. Do not raise the number — remove the cause.",dia:{w:320,h:130,frame:[8,8,150,80,".header  opacity: .99"],box:[[14,26,138,54,"modal z 9999","ghost"],[172,20,140,70,"panel z 1","hi"]],note:[[8,100,"the modal can never leave its parent’s stacking context"],[8,118,"9999 only ranks it among its SIBLINGS"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       header.header
         div.modal   text: "modal"
       div.panel   text: "panel"
      */}
    </>
  );
}
`,css:`.header {
  position: relative;
  opacity: .99;   /* TODO — this line is the bug */
}
.modal { position: absolute; z-index: 9999; background: steelblue; color: white; padding: 1rem; }
.panel { position: relative; z-index: 1; background: indianred; color: white; padding: 2rem; margin-top: -1rem; }
`,hints:["opacity below 1, transform, filter, will-change, isolation and a positioned element with a z-index all create a stacking context.","Delete opacity: .99 (or set isolation: isolate deliberately). A child can never escape its parent’s stacking context, so 9999 only competes inside the header."],sol:"/* remove */ opacity: .99;",why:"The correct answer to “z-index is not working” is never a bigger number. It is: find the stacking context and either remove it or move the element out of it.",markup:`    <>
      <header className="header">
        <div className="modal">modal</div>
      </header>
      <div className="panel">panel</div>
    </>`},{id:"INS-01",cat:"inset",title:"inset: 0 — cover the parent exactly",goal:"A tint layer covering its parent completely, written in one declaration.",use:[["inset","shorthand for top, right, bottom and left"]],task:"Cover the parent with .overlay using one declaration instead of four.",dia:{w:320,h:130,frame:[4,6,312,98,".card  position: relative"],box:[[8,10,304,90,"overlay — inset: 0","hi"]],note:[[4,120,"the overlay fills the containing block exactly"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card
         p   text: "content"
         div.overlay
      */}
    </>
  );
}
`,css:`.card { position: relative; background: aliceblue; padding: 2rem; }

.overlay {
  position: absolute;
  background: rgb(0 0 0 / .25);
  /* TODO — one declaration, all four sides */
}
`,hints:["inset takes 1, 2, 3 or 4 values in the same order as margin.","inset: 0;"],sol:"inset: 0;",why:"Replaces four lines with one, and reads as intent: “fill the containing block”.",markup:`    <div className="card">
      <p>content</p>
      <div className="overlay" />
    </div>`},{id:"INS-02",cat:"inset",title:"Logical insets — inset-block and inset-inline",goal:"An overlay inset 1rem from the sides and flush to top and bottom, written logically.",use:[["inset-block","top and bottom together"],["inset-inline","left and right together — flips in RTL"]],task:"Two declarations. Do not use top/right/bottom/left.",dia:{w:320,h:120,frame:[8,10,304,90,""],box:[[26,10,268,90,"inset-block: 0 · inset-inline: 1rem","hi"]],gap:[[8,55,18,"1rem",1]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card
         p   text: "content"
         div.overlay
      */}
    </>
  );
}
`,css:`.card { position: relative; background: aliceblue; padding: 2rem; }

.overlay {
  position: absolute;
  background: rgb(70 130 180 / .35);
  /* TODO — two logical declarations */
}
`,hints:["block is the direction text flows in blocks (vertical in English); inline is the direction words run.","inset-block: 0; inset-inline: 1rem;"],sol:`inset-block: 0;
  inset-inline: 1rem;`,why:"Logical properties are the default in new codebases because they make RTL support free. Say “inline start” instead of “left” and you sound current.",markup:`    <div className="card">
      <p>content</p>
      <div className="overlay" />
    </div>`},{id:"INS-03",cat:"inset",title:"Opposite insets plus auto margins — true centring",goal:"A fixed-size dialog centred in its parent using inset and margin only.",use:[["inset: 0","set all four offsets, which over-constrains the box"],["margin: auto","let the leftover space split evenly"],["width / height","the box must have a definite size for this to work"]],task:"Centre a 10rem × 5rem dialog without transform and without flex or grid.",dia:{w:320,h:130,frame:[8,8,304,114,""],box:[[104,42,112,46,"dialog","hi"]],gap:[[8,65,96,"auto",1],[216,65,96,"auto",1]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card
         div.dialog   text: "dialog"
      */}
    </>
  );
}
`,css:`.card { position: relative; height: 12rem; background: aliceblue; }

.dialog {
  position: absolute;
  width: 10rem;
  height: 5rem;
  background: steelblue;
  color: white;
  /* TODO — two declarations */
}
`,hints:["Setting both left and right on a sized absolute box leaves the equation over-constrained; auto margins absorb the difference equally.","inset: 0; margin: auto; — this is the classic pre-flexbox centring and it still works."],sol:`inset: 0;
  margin: auto;`,why:"Worth knowing as history and as a fallback: it centres without transform, so it never blurs text on a subpixel boundary.",markup:`    <div className="card">
      <div className="dialog">dialog</div>
    </div>`},{id:"UNI-01",visual:!1,verify:"At the default root size, 2rem IS 32px, so nothing moves. Verify by adding html { font-size: 20px } temporarily — the rem version scales, the px version would not.",cat:"units",title:"rem for type — respecting the user’s font size",goal:"Body text that grows when the reader raises their browser font size.",use:[["rem","relative to the ROOT font size, which the user controls"]],task:"Convert the px type scale to rem. 16px is the default root size.",dia:{w:320,h:110,box:[[8,10,304,26,"h1  2rem   = 32px at default"],[8,42,304,22,"p   1rem   = 16px"],[8,70,304,20,"small .875rem = 14px"]],note:[[8,104,"user sets 20px root → everything scales together"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       article
         h1   text: "Heading"
         p   text: "Body copy."
         small   text: "Fine print."
      */}
    </>
  );
}
`,css:`h1 { font-size: 32px; }
p  { font-size: 16px; }
small { font-size: 14px; }

/* TODO — convert all three to rem */
`,hints:["Divide by 16.","2rem, 1rem, .875rem. px font sizes ignore the user’s browser setting entirely, which is an accessibility failure (WCAG 1.4.4)."],sol:`h1 { font-size: 2rem; }
p  { font-size: 1rem; }
small { font-size: .875rem; }`,why:"The rule: type and spacing in rem. This is the single most cited reason not to use px for text.",markup:`    <article>
      <h1>Heading</h1>
      <p>Body copy.</p>
      <small>Fine print.</small>
    </article>`},{id:"UNI-02",useApp:!1,cat:"units",title:"em for component padding — scaling with its own text",goal:"One button rule that gives correct padding at three different font sizes.",use:[["em","relative to the element’s OWN font-size"]],task:"Write a single .btn padding that stays proportional when .btn-sm and .btn-lg change only the font size.",dia:{w:320,h:110,box:[[8,12,60,22,"sm"],[76,8,84,30,"base"],[168,2,120,42,"lg"]],note:[[8,66,"one padding rule: .5em 1em"],[8,84,"each size gets padding proportional to its own text"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         button.btn.btn-sm   text: "sm"
         button.btn   text: "base"
         button.btn.btn-lg   text: "lg"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: .5rem; align-items: center; }
.btn-sm { font-size: .8rem; }
.btn-lg { font-size: 1.4rem; }

.btn {
  background: steelblue;
  color: white;
  border: 0;
  /* TODO — padding that scales with the button’s own text */
}
`,hints:["em resolves against the font-size of the element it is written on.","padding: .5em 1em. In rem the small and large buttons would get identical padding and look wrong."],sol:"padding: .5em 1em;",why:"The division of labour: rem for the global scale, em for anything that must track its own text. Buttons, badges and inputs are the classic em cases.",markup:`    <div className="row">
      <button className="btn btn-sm">sm</button>
      <button className="btn">base</button>
      <button className="btn btn-lg">lg</button>
    </div>`},{id:"UNI-03",cat:"units",title:"ch for measure — line length you can defend",goal:"A paragraph capped at roughly 65 characters per line.",use:[["ch",'the width of the "0" glyph in the current font'],["max-width","apply it as a cap"]],task:"Cap the article at a comfortable measure using ch.",dia:{w:320,h:110,box:[[8,10,230,74,"text column ≈ 65ch"]],gap:[[8,6,230,"65ch",1]],note:[[8,102,"45–75 characters is the readable range"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       article.prose
         p   text: "A long paragraph of body cop"
      */}
    </>
  );
}
`,css:`.prose {
  /* TODO — cap the measure */
}
`,hints:["1ch is the advance width of the character 0 in the element’s font, so a ch cap tracks the actual typeface.","max-width: 65ch;"],sol:"max-width: 65ch;",why:"“Why 65ch and not 800px?” — because it follows the font. Naming the 45–75 character range shows you know the typographic reason, not just the number.",markup:`    <article className="prose">
      <p>A long paragraph of body copy that should not run the full width of a wide screen.</p>
    </article>`},{id:"UNI-04",cat:"units",title:"% resolves against the parent — fr against the free space",goal:"Knowing which of two sibling containers overflows and why.",use:[["%","a fraction of the containing block"],["fr","a fraction of what remains after gaps and fixed tracks"]],task:"Both grids have a 2rem gap. Give .a percentage columns and .b fr columns, then state which one overflows.",dia:{w:300,h:76,frame:[4,4,292,50,"container"],box:[[10,14,132,30,""],[158,14,132,30,""]],note:[[10,64,"fr: gaps come out first"]],alt:{w:300,h:76,frame:[4,4,254,50,"container"],box:[[10,14,132,30,""],[158,14,132,30,"","hi"]],note:[[10,64,"%: gap is added ON TOP → overflow"]]},labels:[".b  1fr 1fr",".a  50% 50%"]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid.a
         div
         div
       div.grid.b
         div
         div
      */}
    </>
  );
}
`,css:`.grid { display: grid; gap: 2rem; margin-bottom: 1rem; }
.grid > div { background: aliceblue; height: 3rem; }

.a { /* TODO — percentage columns */ }
.b { /* TODO — fr columns */ }
`,hints:["A percentage knows nothing about gap. fr is computed from the space left after gaps.",".a { grid-template-columns: 50% 50% } overflows by 2rem. .b { grid-template-columns: 1fr 1fr } fits."],sol:`.a { grid-template-columns: 50% 50%; }
.b { grid-template-columns: 1fr 1fr; }`,why:"The same lesson as TRK-02, now as a direct comparison. If you can state it in one sentence you will never write a percentage grid again.",markup:`    <>
      <div className="grid a"><div /><div /></div>
      <div className="grid b"><div /><div /></div>
    </>`},{id:"UNI-05",cat:"units",title:"dvh vs vh — the mobile address bar",goal:"A hero that is exactly one screen tall on a phone, with no cut-off bottom.",use:[["dvh","dynamic viewport height — tracks the shrinking chrome"],["min-height","so content can still push it taller"]],task:"Make .hero one full screen tall on mobile without the last line hiding behind the URL bar.",dia:{w:320,h:130,frame:[8,8,304,100,"100dvh — the visible area"],box:[[8,8,304,100,"hero","hi"]],note:[[8,122,"100vh includes the chrome → the bottom is cut off"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       section.hero
         h1   text: "Hero"
      */}
    </>
  );
}
`,css:`.hero {
  display: grid;
  place-items: center;
  background: steelblue;
  color: white;
  /* TODO — exactly one screen, safely */
}
`,hints:["vh is the LARGE viewport height and does not change when the browser chrome retracts.","min-height: 100dvh. Use min-height rather than height so long content is never clipped. svh and lvh are the small and large variants if you need them explicitly."],sol:"min-height: 100dvh;",why:"A genuinely modern detail. Saying “100vh is broken on iOS, dvh fixed it” places you after 2022 in a way interviewers notice.",markup:`    <section className="hero">
      <h1>Hero</h1>
    </section>`},{id:"UNI-06",cat:"units",title:"clamp() — fluid type with real bounds",goal:"A heading that scales with the viewport but never goes below 1.5rem or above 3rem.",use:[["clamp()","minimum, preferred, maximum in one function"],["vw","the fluid middle value"],["rem","both bounds — never px"]],task:"Write one font-size that is fluid between 1.5rem and 3rem.",dia:{w:320,h:110,box:[[8,14,90,26,"1.5rem"],[110,8,100,38,"fluid"],[222,2,90,50,"3rem"]],note:[[8,74,"clamp(1.5rem, 4vw + 1rem, 3rem)"],[8,94,"bounds in rem so zoom still works"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       h1.title   text: "Fluid heading"
      */}
    </>
  );
}
`,css:`.title {
  /* TODO — clamp it */
}
`,hints:["clamp(min, preferred, max). Adding a rem term to the vw makes it still respond to user zoom.","font-size: clamp(1.5rem, 4vw + 1rem, 3rem);"],sol:"font-size: clamp(1.5rem, 4vw + 1rem, 3rem);",why:"A pure vw preferred value fails WCAG zoom because the text stops responding to the user’s font setting. The + 1rem term is the accessible form.",markup:'    <h1 className="title">Fluid heading</h1>'},{id:"UNI-07",cat:"units",title:"Where px is still the right answer",goal:"A card with a 1px hairline border and a small shadow that must NOT scale with type.",use:[["px","for hairlines, shadow offsets and blur radii — physical details, not type"]],task:"Give .card a 1px border and a subtle shadow. Deliberately use px and be ready to justify it.",dia:{w:320,h:110,frame:[8,10,304,80,""],box:[[16,18,288,64,"1px hairline · shadow in px"]],note:[[8,104,"a 0.0625rem border rounds unpredictably across zoom levels"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card   text: "card"
      */}
    </>
  );
}
`,css:`.card {
  background: white;
  padding: 1rem;
  border-radius: .5rem;
  /* TODO — hairline and shadow, in px on purpose */
}
`,hints:["A hairline should stay a hairline. Scaling it with the user’s font size makes it fat at large sizes and invisible at small ones.","border: 1px solid gainsboro; box-shadow: 0 1px 3px rgb(0 0 0 / .1);"],sol:`border: 1px solid gainsboro;
  box-shadow: 0 1px 3px rgb(0 0 0 / .1);`,why:"“Never use px” is wrong and interviewers probe it. The correct rule: type and space in rem, control padding in em, measure in ch, and px for physical details that must not scale.",markup:'    <div className="card">card</div>'},{id:"MQ-01",visual:!1,verify:"Nothing moves — range syntax and min-width compile to the same behaviour. Verify by reading: the two queries must select the same widths. Drag the preview divider past 48rem and confirm the switch still happens.",cat:"mq",title:"Range syntax — the modern form",goal:"A two-column layout from 48rem up, written without min-width.",use:[["@media (width >= 48rem)","the range comparison form"]],task:'Rewrite the min-width query using range syntax, and write the equivalent "between two sizes" query in the comment.',dia:{w:320,h:120,frame:[8,8,150,50,"< 48rem"],box:[[14,16,138,34,"1 col"],[172,16,66,34,"a"],[244,16,68,34,"b"]],note:[[172,8,"≥ 48rem"],[8,80,"(width >= 48rem)  ·  (30rem <= width < 48rem)"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div   text: "a"
         div   text: "b"
      */}
    </>
  );
}
`,css:`.grid { display: grid; gap: 1rem; }
.grid > div { background: aliceblue; padding: 1rem; }

@media (min-width: 48rem) {
  .grid { grid-template-columns: 1fr 1fr; }
}
/* TODO — rewrite the query above in range syntax */
`,hints:["CSS Media Queries Level 4 allows <, <=, > and >= directly.","@media (width >= 48rem). A band is written @media (30rem <= width < 48rem) — one query instead of an and-chain."],sol:`@media (width >= 48rem) {
  .grid { grid-template-columns: 1fr 1fr; }
}`,why:"Range syntax also removes the classic 0.02px overlap bug you get from pairing max-width and min-width at the same number.",markup:`    <div className="grid">
      <div>a</div>
      <div>b</div>
    </div>`},{id:"MQ-02",visual:!1,verify:"The rendered result is identical at every width — that is the point. Verify by reading the stylesheet: after your rewrite, no rule may UNDO an earlier one. Then narrow the preview and watch it step 1 → 2 → 3 columns.",cat:"mq",title:"Mobile-first — why min-width queries come last",goal:"A stylesheet where the narrow layout is the base and every query only adds.",use:[["base rules","the narrow layout, unqueried"],["@media (width >= …)","progressive enhancement upward"]],task:"Reorder the stylesheet so the single-column layout is the default and the query only adds columns.",dia:{w:320,h:120,box:[[8,10,304,22,"base        → 1 column"],[8,38,304,22,"≥ 40rem     → 2 columns"],[8,66,304,22,"≥ 64rem     → 3 columns"]],note:[[8,106,"each query only ADDS — nothing is undone"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div   text: "a"
         div   text: "b"
         div   text: "c"
      */}
    </>
  );
}
`,css:`.grid { display: grid; gap: 1rem; grid-template-columns: repeat(3, 1fr); }
@media (width < 40rem) { .grid { grid-template-columns: 1fr; } }

/* TODO — rewrite mobile-first: base = 1 column, queries add */
.grid > div { background: aliceblue; padding: 1rem; }
`,hints:["Desktop-first means every query must UNDO something. Mobile-first means every query only adds.",".grid { grid-template-columns: 1fr } then @media (width >= 40rem) { repeat(2, 1fr) } then @media (width >= 64rem) { repeat(3, 1fr) }."],sol:`.grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (width >= 40rem) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (width >= 64rem) { .grid { grid-template-columns: repeat(3, 1fr); } }`,why:"The real argument is not phones — it is that undoing rules is where specificity wars start. Additive stylesheets stay debuggable.",markup:`    <div className="grid">
      <div>a</div>
      <div>b</div>
      <div>c</div>
    </div>`},{id:"MQ-03",cat:"mq",title:"prefers-reduced-motion — the query about the person",goal:"An animation that simply does not run for users who asked for less motion.",use:[["@media (prefers-reduced-motion: reduce)","honour the OS setting"],["transition","the thing being disabled"]],task:"Keep the hover transition, but disable it for users who requested reduced motion.",dia:{w:320,h:110,box:[[8,12,304,26,"default        → transition 200ms"],[8,46,304,26,"reduce         → transition none"]],note:[[8,90,"a vestibular-disorder accommodation, not a preference"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       button.btn   text: "hover me"
      */}
    </>
  );
}
`,css:`.btn {
  background: steelblue;
  color: white;
  border: 0;
  padding: .5em 1em;
  transition: transform 200ms ease;
}
.btn:hover { transform: translateY(-2px); }

/* TODO — respect reduced motion */
`,hints:["Query the reduce value and turn the transition off.","@media (prefers-reduced-motion: reduce) { .btn { transition: none } .btn:hover { transform: none } }"],sol:`@media (prefers-reduced-motion: reduce) {
  .btn { transition: none; }
  .btn:hover { transform: none; }
}`,why:"Motion can cause nausea and migraine for real users. Mentioning this unprompted is one of the strongest accessibility signals in a front-end interview.",markup:'    <button className="btn">hover me</button>'},{id:"MQ-04",cat:"mq",title:"prefers-color-scheme — one palette, two definitions",goal:"A card that reads correctly in both light and dark, with colours defined once as tokens.",use:[["custom properties","define the palette in one place"],["@media (prefers-color-scheme: dark)","redefine only the tokens"],["color-scheme","tell the browser so form controls follow"]],task:"Define the light palette on :root, redefine only the tokens for dark, and never repeat a rule.",dia:{w:320,h:120,frame:[8,8,150,60,"light"],box:[[14,16,138,44,"card"],[172,16,140,44,"card (dark)","hi"]],note:[[172,8,"dark"],[8,86,"only the TOKENS change — no rule is duplicated"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card   text: "card"
      */}
    </>
  );
}
`,css:`:root {
  --bg: white;
  --fg: black;
  color-scheme: light;
}
.card { background: var(--bg); color: var(--fg); padding: 1rem; border: 1px solid gainsboro; }

/* TODO — dark: redefine the tokens only */
`,hints:["Redefine the custom properties inside the query. Do not restate .card.","@media (prefers-color-scheme: dark) { :root { --bg: #111; --fg: #eee; color-scheme: dark } }"],sol:`@media (prefers-color-scheme: dark) {
  :root { --bg: #111; --fg: #eee; color-scheme: dark; }
}`,why:"color-scheme is the part people forget: without it, scrollbars, form controls and the default canvas stay light and the page looks broken.",markup:'    <div className="card">card</div>'},{id:"MQ-05",cat:"mq",title:"pointer and hover — querying the input device",goal:"A larger tap target on touch devices, and hover styles only where hover exists.",use:[["@media (pointer: coarse)","a finger, not a mouse"],["@media (hover: hover)","the device can actually hover"]],task:"Give the button a 44px minimum tap target on coarse pointers, and apply the hover style only where hovering is possible.",dia:{w:320,h:120,frame:[8,8,150,50,"fine pointer"],box:[[14,20,110,26,"32px"],[172,14,120,44,"44px","hi"]],note:[[172,8,"coarse pointer"],[8,80,"hover styles are skipped entirely on touch"],[8,98,"44px is the WCAG 2.5.5 target size"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       button.btn   text: "tap"
      */}
    </>
  );
}
`,css:`.btn { background: steelblue; color: white; border: 0; padding: .5em 1em; }

/* TODO — coarse pointer: min 44px tall */

/* TODO — hover-capable devices only: lift on hover */
`,hints:["A width media query cannot tell you about the input device. pointer and hover can.","@media (pointer: coarse) { .btn { min-height: 44px } } and @media (hover: hover) { .btn:hover { transform: translateY(-2px) } }"],sol:`@media (pointer: coarse) { .btn { min-height: 44px; } }

@media (hover: hover) {
  .btn:hover { transform: translateY(-2px); }
}`,why:"“Small screen” and “touch device” are different questions. A touchscreen laptop breaks the width-based assumption, which is exactly why these queries exist.",markup:'    <button className="btn">tap</button>'},{id:"FOC-01",useApp:!1,cat:"focus",title:":focus-visible — a ring for keyboards, not for clicks",goal:"Tab to the button and see a ring. Click it and see none. Never lose the ring entirely.",use:[[":focus-visible",'the browser’s own heuristic for "this user needs a ring"'],["outline","the ring — it costs no layout"],["outline-offset","breathing room"]],task:"Give .btn a visible focus ring for keyboard users only. Do not write outline: none anywhere.",dia:{w:320,h:120,box:[[16,20,120,36,"clicked — no ring"],[176,16,128,44,"","ghost"],[182,22,116,32,"tabbed — ring","hi"]],note:[[8,84,":focus fires for BOTH mouse and keyboard"],[8,102,":focus-visible fires only when the browser thinks a ring helps"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         button.btn   text: "one"
         button.btn   text: "two"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: .5rem; }
.btn { background: steelblue; color: white; border: 0; padding: .5em 1em; }

.btn:focus-visible {
  /* TODO — the ring */
}
`,hints:["outline plus outline-offset. Because outline is outside the box model, nothing reflows.","outline: 3px solid darkorange; outline-offset: 2px;"],sol:`outline: 3px solid darkorange;
  outline-offset: 2px;`,why:"The old pattern was outline: none plus a custom :focus style, which broke keyboard users constantly. :focus-visible solved the real problem — say that history in an interview.",markup:`    <div className="row">
      <button className="btn">one</button>
      <button className="btn">two</button>
    </div>`},{id:"FOC-02",cat:"focus",title:":focus-within — the parent reacts",goal:"A form group whose label and border highlight while any input inside it is focused.",use:[[":focus-within","matches an element containing the focused element"]],task:"Highlight the whole .field when its input is focused. No JavaScript.",dia:{w:320,h:120,frame:[8,10,304,70,".field:focus-within","hi"],box:[[16,18,288,18,"Label"],[16,42,288,32,"input"]],note:[[8,100,"the parent matches while a descendant holds focus"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       label.field
         span.lab   text: "Email"
         input   type="email"
      */}
    </>
  );
}
`,css:`.field { display: grid; gap: .25rem; padding: .5rem; border: 1px solid gainsboro; border-radius: .375rem; }
.lab { font-size: .8rem; color: dimgray; }

.field:focus-within {
  /* TODO — highlight the whole group */
}
`,hints:["Apply the style to .field itself, not to the input.",".field:focus-within { border-color: steelblue; background: aliceblue }"],sol:`border-color: steelblue;
  background: aliceblue;`,why:"This is CSS reacting to descendant state — the pattern people reach for JavaScript to do. Pairs naturally with :has() as the sibling case.",markup:`    <label className="field">
      <span className="lab">Email</span>
      <input type="email" />
    </label>`},{id:"FOC-03",useApp:!1,cat:"focus",title:"A focus ring visible on ANY background",goal:"One ring that stays visible on white, on steel blue and on black.",use:[["outline","the inner ring, in a light colour"],["box-shadow","a second, darker ring outside it"],["outline-offset","separate the two"]],task:"Build a two-tone ring so it never disappears against the button colour.",dia:{w:320,h:120,box:[[16,24,84,40,"on white","hi"],[116,24,84,40,"on blue","hi"],[216,24,88,40,"on black","hi"]],note:[[8,88,"white outline + dark shadow = contrast against anything"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         button.btn.light   text: "a"
         button.btn.blue   text: "b"
         button.btn.dark   text: "c"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: .5rem; }
.btn { border: 0; padding: .5em 1em; }
.light { background: white; color: black; }
.blue { background: steelblue; color: white; }
.dark { background: black; color: white; }

.btn:focus-visible {
  /* TODO — a ring that survives any backdrop */
}
`,hints:["One ring cannot contrast with every possible background. Two rings of opposite lightness can.","outline: 2px solid white; outline-offset: 2px; box-shadow: 0 0 0 4px black; — WCAG 1.4.11 wants 3:1 against the adjacent colour, and this guarantees it either way."],sol:`outline: 2px solid white;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px black;`,why:"A design-system-grade answer. Most candidates give a single-colour ring and never consider the dark button.",markup:`    <div className="row">
      <button className="btn light">a</button>
      <button className="btn blue">b</button>
      <button className="btn dark">c</button>
    </div>`},{id:"TOK-01",visual:!1,verify:"The three components look the same before and after — a refactor should. Verify it worked by changing --accent on :root ONCE and watching all three follow.",cat:"tokens",title:"Custom properties — name the value once",goal:"Three components sharing one accent colour and one spacing step.",use:[["--custom-property","declare on :root"],["var()","read it"]],task:"Replace every repeated literal with a token declared once on :root.",dia:{w:320,h:120,box:[[8,10,304,24,":root  --accent · --space"],[8,42,96,32,"button"],[112,42,96,32,"badge"],[216,42,96,32,"link"]],arrow:[[60,38,60,42,""],[160,38,160,42,""],[262,38,262,42,""]],note:[[8,100,"one change updates all three"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         button.btn   text: "button"
         span.badge   text: "badge"
         a.link   href="#"   text: "link"
      */}
    </>
  );
}
`,css:`/* TODO — declare --accent and --space on :root */

.row { display: flex; gap: 1rem; align-items: center; }
.btn { background: steelblue; color: white; border: 0; padding: .5rem 1rem; }
.badge { background: steelblue; color: white; padding: .5rem 1rem; }
.link { color: steelblue; padding: .5rem 1rem; }
/* TODO — replace the literals with var() */
`,hints:["Custom properties inherit, so :root makes them available everywhere.",":root { --accent: steelblue; --space: .5rem 1rem } then background: var(--accent) and padding: var(--space)."],sol:`:root { --accent: steelblue; --space: .5rem 1rem; }
.btn { background: var(--accent); padding: var(--space); }
.badge { background: var(--accent); padding: var(--space); }
.link { color: var(--accent); padding: var(--space); }`,why:"Unlike Sass variables these are live at runtime, which is what makes theming and container-aware components possible.",markup:`    <div className="row">
      <button className="btn">button</button>
      <span className="badge">badge</span>
      <a className="link" href="#">link</a>
    </div>`},{id:"TOK-02",cat:"tokens",title:"var() fallbacks — a component that survives a missing token",goal:"A card that still looks right when dropped into a page that never defined its tokens.",use:[["var(--x, fallback)","the second argument is used when --x is not set"]],task:"Give every var() a sensible fallback so the component works standalone.",dia:{w:320,h:120,frame:[8,10,150,60,"tokens defined"],box:[[14,20,138,44,"card"],[172,20,140,44,"card — fallback","hi"]],note:[[172,12,"tokens missing"],[8,88,"var(--card-bg, whitesmoke)"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card   text: "card"
      */}
    </>
  );
}
`,css:`.card {
  background: var(--card-bg);
  color: var(--card-fg);
  padding: var(--card-pad);
  /* TODO — add a fallback to each */
}
`,hints:["The fallback can itself be a var(): var(--a, var(--b, red)).","background: var(--card-bg, whitesmoke); color: var(--card-fg, black); padding: var(--card-pad, 1rem);"],sol:`background: var(--card-bg, whitesmoke);
  color: var(--card-fg, black);
  padding: var(--card-pad, 1rem);`,why:"An unresolved var() makes the declaration invalid at computed-value time — the property falls back to inherited or initial, which is usually worse than any fallback you would pick.",markup:'    <div className="card">card</div>'},{id:"TOK-03",cat:"tokens",title:"Scoped tokens — theming without new rules",goal:'The same card component rendered in a default theme and a "danger" theme, with no second set of rules.',use:[["custom properties on a class","override tokens for a subtree"],["inheritance","the override cascades to descendants"]],task:"Add a .danger class that redefines the tokens. Do not write a single .danger .card rule.",dia:{w:320,h:120,frame:[8,10,150,60,"default"],box:[[14,20,138,44,"card"],[172,20,140,44,"card","hi"]],note:[[172,12,".danger — tokens overridden"],[8,88,"zero component rules were duplicated"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card   text: "default"
       div.danger
         div.card   text: "danger"
      */}
    </>
  );
}
`,css:`:root { --accent: steelblue; --accent-fg: white; }
.card { background: var(--accent); color: var(--accent-fg); padding: 1rem; margin-bottom: .5rem; }

.danger {
  /* TODO — override the tokens only */
}
`,hints:["Custom properties inherit down the tree, so redefining them on an ancestor re-themes everything inside.",".danger { --accent: indianred; --accent-fg: white; }"],sol:".danger { --accent: indianred; --accent-fg: white; }",why:"This is how real design systems theme: components consume tokens, contexts redefine them. No specificity battles, no duplicated rules.",markup:`    <>
      <div className="card">default</div>
      <div className="danger">
        <div className="card">danger</div>
      </div>
    </>`},{id:"TOK-04",useApp:!1,cat:"tokens",title:"Two token layers — primitive and semantic",goal:"A palette where --blue-600 is defined once and --color-action refers to it.",use:[["primitive tokens","raw values: --blue-600"],["semantic tokens","roles: --color-action, --color-danger"],["components","consume only the semantic layer"]],task:"Define both layers and make .btn use only the semantic name. Then switch the brand by changing one line.",dia:{w:320,h:130,box:[[8,10,304,22,"primitives   --blue-600: #1d4ed8"],[8,40,304,22,"semantic     --color-action: var(--blue-600)"],[8,70,304,22,"component    background: var(--color-action)"]],arrow:[[160,32,160,40,""],[160,62,160,70,""]],note:[[8,112,"rebrand = change ONE line in the semantic layer"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       button.btn   text: "action"
      */}
    </>
  );
}
`,css:`:root {
  /* TODO — primitives: --blue-600 and --red-600 */

  /* TODO — semantic: --color-action and --color-danger */
}

.btn {
  color: white;
  border: 0;
  padding: .5em 1em;
  /* TODO — consume the SEMANTIC token only */
}
`,hints:["A component should never mention a colour name. It should mention a role.",":root { --blue-600: #1d4ed8; --red-600: #b91c1c; --color-action: var(--blue-600); --color-danger: var(--red-600) } and .btn { background: var(--color-action) }."],sol:`:root {
  --blue-600: #1d4ed8;
  --red-600: #b91c1c;
  --color-action: var(--blue-600);
  --color-danger: var(--red-600);
}
.btn { background: var(--color-action); }`,why:"“How would you structure design tokens?” is a standard senior question. Two layers — primitive and semantic — is the expected answer.",markup:'    <button className="btn">action</button>'},{id:"MIX-01",useApp:!1,cat:"mix",title:"color-mix() — a hover shade you never hand-picked",goal:"A button whose hover state is 15% darker, derived from the base colour.",use:[["color-mix()","blend two colours in a named colour space"],["in oklab","a perceptually even space — mixes do not go muddy"]],task:"Derive the hover background from --accent instead of writing a second hex value.",dia:{w:320,h:110,box:[[16,22,130,40,"--accent"],[174,22,130,40,"+15% black","hi"]],note:[[8,80,"color-mix(in oklab, var(--accent) 85%, black)"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       button.btn   text: "hover me"
      */}
    </>
  );
}
`,css:`:root { --accent: steelblue; }
.btn { background: var(--accent); color: white; border: 0; padding: .5em 1em; }

.btn:hover {
  /* TODO — derive, do not hand-pick */
}
`,hints:["color-mix(in <space>, <colour> <percent>, <colour>).","background: color-mix(in oklab, var(--accent) 85%, black); — oklab keeps lightness perceptually even, so the shade does not turn grey the way an sRGB mix does."],sol:"background: color-mix(in oklab, var(--accent) 85%, black);",why:"One brand colour now generates its own hover, active and disabled states. Change --accent and every derived state follows.",markup:'    <button className="btn">hover me</button>'},{id:"MIX-02",cat:"mix",title:"A whole scale from one hue",goal:"Five tints and shades of one accent, generated entirely in CSS.",use:[["color-mix() with white","tints"],["color-mix() with black","shades"],["custom properties","store each step"]],task:"Build --accent-100 through --accent-900 from a single --accent, using mixes only.",dia:{w:320,h:110,box:[[8,20,58,44,"100"],[70,20,58,44,"300"],[132,20,58,44,"500"],[194,20,58,44,"700"],[256,20,56,44,"900"]],note:[[8,82,"one input hue → a consistent ramp"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.ramp
         div   x5   from .map over [100,300,500,700,900]
      */}
    </>
  );
}
`,css:`:root {
  --accent: steelblue;
  /* TODO — build the ramp with color-mix */
}
.ramp { display: grid; grid-template-columns: repeat(5, 1fr); gap: .25rem; }
.sw { padding: 1rem .25rem; text-align: center; font-size: .75rem; }
.s100 { background: var(--accent-100); }
.s300 { background: var(--accent-300); }
.s500 { background: var(--accent-500); }
.s700 { background: var(--accent-700); }
.s900 { background: var(--accent-900); }
`,hints:["Mix toward white for the light end and toward black for the dark end, with --accent as the 500.","--accent-100: color-mix(in oklab, var(--accent) 20%, white); … --accent-500: var(--accent); … --accent-900: color-mix(in oklab, var(--accent) 40%, black);"],sol:`--accent-100: color-mix(in oklab, var(--accent) 20%, white);
  --accent-300: color-mix(in oklab, var(--accent) 55%, white);
  --accent-500: var(--accent);
  --accent-700: color-mix(in oklab, var(--accent) 75%, black);
  --accent-900: color-mix(in oklab, var(--accent) 40%, black);`,why:"Replaces a hand-tuned nine-colour palette with one input. This is the answer to “how would you support arbitrary brand colours?”",markup:`    <div className="ramp">
      {[100,300,500,700,900].map(n => <div className={"sw s" + n} key={n}>{n}</div>)}
    </div>`},{id:"MIX-03",cat:"mix",title:"Mixing with transparent and currentColor",goal:"A tinted panel that matches whatever text colour it inherits, with no new variable.",use:[["currentColor","the element’s computed color"],["color-mix(… transparent)","produce an alpha version of any colour"]],task:"Give .note a background that is 12% of its own text colour, so it re-tints automatically when the colour changes.",dia:{w:320,h:120,frame:[8,10,150,60,"color: steelblue"],box:[[14,20,138,44,"12% tint"],[172,20,140,44,"12% tint","hi"]],note:[[172,12,"color: indianred"],[8,88,"one rule, tint follows currentColor"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       p.note.info   text: "info"
       p.note.warn   text: "warn"
      */}
    </>
  );
}
`,css:`.info { color: steelblue; }
.warn { color: indianred; }

.note {
  padding: 1rem;
  border-left: 3px solid currentColor;
  /* TODO — 12% tint of the current text colour */
}
`,hints:["Mixing a colour with transparent gives you that colour at a chosen alpha.","background: color-mix(in srgb, currentColor 12%, transparent);"],sol:"background: color-mix(in srgb, currentColor 12%, transparent);",why:"currentColor plus color-mix is how one alert component serves info, warn, error and success without a single extra rule.",markup:`    <>
      <p className="note info">info</p>
      <p className="note warn">warn</p>
    </>`},{id:"PRM-01",useApp:!1,cat:"prim",title:"stack — vertical rhythm, one class, no margins",goal:"Any number of children with equal space between them and none at the ends.",use:[["display: grid","one column"],["gap","the rhythm"],["--space","make the step overridable per instance"]],task:"Write .stack so it spaces its children by var(--space, 1rem) and never adds outer space.",dia:{w:320,h:140,frame:[8,8,304,124,".stack"],box:[[16,16,288,26,"a"],[16,54,288,26,"b"],[16,92,288,32,"c"]],gap:[[160,42,12,"--space",0],[160,80,12,"--space",0]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.stack
         h2   text: "Title"
         p   text: "Body"
         button   text: "Action"
      */}
    </>
  );
}
`,css:`.stack {
  /* TODO — three declarations */
}
.stack > * { margin: 0; }
`,hints:['A one-column grid plus gap does everything the old margin-based "owl" selector did, without margin collapsing.',"display: grid; gap: var(--space, 1rem); — add nothing else. Set --space on an instance to change the rhythm there only."],sol:`display: grid;
  gap: var(--space, 1rem);`,why:"The highest-leverage class in a stylesheet. Most vertical-spacing bugs disappear the moment sibling margins do.",markup:`    <div className="stack">
      <h2>Title</h2>
      <p>Body</p>
      <button>Action</button>
    </div>`},{id:"PRM-02",useApp:!1,cat:"prim",title:"cluster — a wrapping row of unknown things",goal:"Tags that wrap onto new lines with even spacing in both directions.",use:[["display: flex","because the CONTENT decides the count"],["flex-wrap: wrap","allow new lines"],["gap","space both axes"],["align-items: center","line up mixed heights"]],task:"Write .cluster. Justify in one sentence why this one is flex and not grid.",dia:{w:320,h:130,frame:[8,8,304,114,".cluster"],box:[[16,18,78,26,"tag"],[100,18,110,26,"longer tag"],[216,18,60,26,"tag"],[16,54,90,26,"tag"],[112,54,70,26,"tag"]],note:[[8,126,"count unknown, widths vary → flex"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.cluster
         span.tag   x5   from .map over ["react","css","grid","flexbox","a1]
      */}
    </>
  );
}
`,css:`.cluster {
  /* TODO — four declarations */
}
.tag { background: aliceblue; padding: .35rem .75rem; border-radius: 999px; }
`,hints:["This is the one place flex genuinely beats grid.","display: flex; flex-wrap: wrap; gap: var(--space, .5rem); align-items: center; — the item count is unknown and the widths vary, so the CONTENT decides the layout."],sol:`display: flex;
  flex-wrap: wrap;
  gap: var(--space, .5rem);
  align-items: center;`,why:"Being able to name where flex wins is more convincing than preferring grid everywhere. This is that case.",markup:`    <div className="cluster">
      {["react","css","grid","flexbox","a11y"].map(t => <span className="tag" key={t}>{t}</span>)}
    </div>`},{id:"PRM-03",useApp:!1,cat:"prim",title:"between — pinned to both ends",goal:"A bar with content hard left and hard right, robust to a missing middle.",use:[["display: flex","one axis"],["justify-content: space-between","push to both ends"],["gap","a floor so they never touch"]],task:"Write .between, then say what happens when it has three children instead of two.",dia:{w:320,h:100,frame:[8,10,304,50,".between"],box:[[16,18,90,34,"left"],[214,18,90,34,"right"]],gap:[[110,35,100,"free space",1]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.between
         span   text: "left"
         span   text: "right"
      */}
    </>
  );
}
`,css:`.between {
  /* TODO — three declarations */
}
.between > * { background: aliceblue; padding: .5rem 1rem; }
`,hints:["space-between puts all free space between items — with three children the third one lands in the middle.",'display: flex; justify-content: space-between; gap: var(--space, 1rem); align-items: center. For "one item apart from the rest" regardless of count, margin-inline-start: auto on that item is more robust.'],sol:`display: flex;
  justify-content: space-between;
  gap: var(--space, 1rem);`,why:"The three-child failure is the point. Knowing when to switch to an auto margin instead is the actual skill.",markup:`    <div className="between">
      <span>left</span>
      <span>right</span>
    </div>`},{id:"PRM-04",cat:"prim",title:"sidebar — responsive with NO media query",goal:"A sidebar beside main on wide screens that wraps below it on narrow ones, with no breakpoint anywhere.",use:[["flex-wrap: wrap","allow the wrap to happen at all"],["flex-basis","the sidebar’s ideal width"],["flex-grow: 999","let main win all the free space"],["min-inline-size","the threshold at which main refuses to shrink further"]],task:"Build the wrapping sidebar. The wrap must be triggered by available space, not by a viewport width.",dia:{w:320,h:150,frame:[8,8,150,66,"wide"],box:[[14,16,44,54,"side"],[64,16,88,54,"main"],[172,16,140,26,"side"],[172,48,140,38,"main"]],note:[[172,8,"narrow — it wrapped itself"],[8,106,"basis 16rem · grow 999 on main · min 50% on main"],[8,124,"the wrap happens when main would drop below 50%"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.with-sidebar
         aside.side   text: "side"
         div.main   text: "main"
      */}
    </>
  );
}
`,css:`.with-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.side, .main { background: aliceblue; padding: 1rem; }

.side {
  /* TODO — ideal width, do not grow */
}
.main {
  /* TODO — take everything, and set the wrap threshold */
}
`,hints:["The trick is an absurdly large flex-grow on main so it always wins the free space, plus a min-inline-size that forces the wrap when it can no longer be satisfied.",".side { flex-basis: 16rem; flex-grow: 1 } and .main { flex-basis: 0; flex-grow: 999; min-inline-size: 50% }."],sol:`.side { flex-basis: 16rem; flex-grow: 1; }
.main { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }`,why:"The best answer to “how would you make this responsive without media queries?” It reacts to its own container, so it works in any slot.",markup:`    <div className="with-sidebar">
      <aside className="side">side</aside>
      <div className="main">main</div>
    </div>`},{id:"PRM-05",useApp:!1,cat:"prim",title:"switcher — N equal columns that stack themselves",goal:"Three panels side by side when there is room, stacked when there is not — again with no breakpoint.",use:[["flex-basis with a calc","the switch threshold"],["flex-grow: 1","equal shares once side by side"],["flex-wrap: wrap","the stack"]],task:"Make .switcher flip between one row and one column at a 30rem container threshold.",dia:{w:320,h:150,frame:[8,8,150,60,"≥ threshold"],box:[[14,16,42,44,"a"],[60,16,42,44,"b"],[106,16,46,44,"c"],[172,16,140,22,"a"],[172,42,140,22,"b"],[172,68,140,22,"c"]],note:[[172,8,"below threshold"],[8,104,"basis: calc((30rem - 100%) * 999)"],[8,122,"negative → huge → each child claims a whole row"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.switcher
         div   text: "a"
         div   text: "b"
         div   text: "c"
      */}
    </>
  );
}
`,css:`.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.switcher > * { background: aliceblue; padding: 1rem; }

.switcher > * {
  /* TODO — two declarations */
}
`,hints:["When 100% exceeds 30rem the calc goes negative, which clamps to 0 and lets the items sit side by side. When it is below, the value becomes enormous and each item demands a full row.","flex-grow: 1; flex-basis: calc((30rem - 100%) * 999);"],sol:`flex-grow: 1;
  flex-basis: calc((30rem - 100%) * 999);`,why:"A genuine party trick, but the reasoning is real: a container-relative threshold expressed purely in the sizing algebra.",markup:`    <div className="switcher">
      <div>a</div>
      <div>b</div>
      <div>c</div>
    </div>`},{id:"PRM-06",useApp:!1,cat:"prim",title:"cover — centred content, pinned header and footer",goal:"A full-height section with a header at the top, a footer at the bottom and the main content centred between them.",use:[["display: grid","one column"],["grid-template-rows: auto 1fr auto","the middle track absorbs the height"],["place-items: center","centre the middle child"],["min-height: 100dvh","full screen, safely"]],task:"Build the cover layout. The header and footer must never move.",dia:{w:320,h:150,frame:[8,8,304,134,""],track:[[300,0,0,""]],box:[[16,16,288,20,"header  auto"],[16,56,288,44,"centred  1fr","hi"],[16,116,288,20,"footer  auto"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       section.cover
         header   text: "header"
         div.centre   text: "centre"
         footer   text: "footer"
      */}
    </>
  );
}
`,css:`.cover {
  /* TODO — four declarations */
}
.cover > * { background: aliceblue; padding: .5rem; }
.centre { display: grid; place-items: center; }
`,hints:["auto 1fr auto is the whole idea: the middle row takes all remaining height.","display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; gap: 1rem;"],sol:`display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  gap: 1rem;`,why:"The same auto / 1fr / auto shape as TRK-07, rotated. Recognising one pattern serving both axes is what makes grid feel small instead of large.",markup:`    <section className="cover">
      <header>header</header>
      <div className="centre">centre</div>
      <footer>footer</footer>
    </section>`},{id:"PRM-07",cat:"prim",title:"grid-auto — the self-responsive gallery",goal:"A card gallery that needs no breakpoints and works inside any container width.",use:[["repeat(auto-fit, minmax(min(100%, 14rem), 1fr))","the whole layout in one line"],["gap","spacing"]],task:"Write .grid-auto, including the narrow-screen guard from TRK-06.",dia:{w:320,h:130,frame:[8,8,304,114,".grid-auto"],box:[[16,16,92,44,""],[116,16,92,44,""],[216,16,88,44,""],[16,68,92,44,""],[116,68,92,44,""]],note:[[8,126,"no media query — reacts to the CONTAINER"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid-auto
         div.cell   x5   from .map over [1,2,3,4,5]
      */}
    </>
  );
}
`,css:`.grid-auto {
  /* TODO — two declarations */
}
.cell { background: aliceblue; padding: 1rem; }
`,hints:["auto-fit so the cards stretch when there are few, and min(100%, …) so the floor never exceeds the container.","display: grid; gap: var(--space, 1rem); grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));"],sol:`display: grid;
  gap: var(--space, 1rem);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));`,why:"If you remember one line from this entire set, make it this one. It replaces three media queries and works in a sidebar.",markup:`    <div className="grid-auto">
      {[1,2,3,4,5].map(n => <div className="cell" key={n}>{n}</div>)}
    </div>`},{id:"PRM-08",useApp:!1,cat:"prim",title:"Compose the whole screen from primitives",goal:"A full dashboard built only from stack, cluster, between, sidebar and grid-auto — with no new layout CSS.",use:[["display: grid","for .cover, .stack and .grid-auto — the parent decides the tracks"],["grid-template-rows: auto 1fr auto","give .cover a fixed header and footer with a fluid middle"],["display: flex + flex-wrap","for .cluster and .with-sidebar — the content decides"],["flex-basis / flex-grow","the sidebar rail and the 999 trick on main"],["repeat(auto-fit, minmax(min(100%, 12rem), 1fr))","the gallery, with no media query"],["justify-content: space-between","the top bar"]],task:"Write all seven primitives from scratch. You have built each one already in PRM-01 to PRM-07 — this is the capstone, so nothing is given to you. No media queries anywhere.",dia:{w:320,h:150,frame:[8,8,304,134,".cover"],box:[[16,14,288,20,".between  — top bar"],[16,40,74,64,".stack"],[98,40,206,40,".grid-auto"],[98,84,206,20,".cluster"],[16,110,288,18,"footer"]],note:[[8,146,"every box is an existing class — no new CSS"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       section.cover
         header.between
           strong   text: "Logo"
           nav.cluster
             a   href="#"   text: "one"
             a   href="#"   text: "two"
         div.with-sidebar
           aside.side.stack
             a   href="#"   text: "Overview"
             a   href="#"   text: "Reports"
             a   href="#"   text: "Settings"
           div.main.stack
             div.grid-auto
               article.card   x4   from .map over [1,2,3,4]
             div.cluster
               span.tag   x3   from .map over ["live","beta","new"]
         footer   text: "footer"
      */}
    </>
  );
}
`,css:`/* The capstone. Seven primitives, from memory. Cosmetics are done for you. */

.card { background: aliceblue; padding: 1rem; border-radius: .5rem; }
.tag { background: gainsboro; padding: .25rem .6rem; border-radius: 999px; }
a { color: steelblue; }

.cover        { /* TODO — header / fluid middle / footer, full screen */ }
.between      { /* TODO — ends pinned */ }
.with-sidebar { /* TODO — the wrapping container */ }
.side         { /* TODO — the rail */ }
.main         { /* TODO — takes the rest, sets the wrap threshold */ }
.stack        { /* TODO — vertical rhythm */ }
.cluster      { /* TODO — wrapping row */ }
.grid-auto    { /* TODO — self-responsive gallery */ }
`,hints:["Work outside in: .cover frames the page, .between is the bar, .with-sidebar splits the body, then .stack / .cluster / .grid-auto fill it. Six of the eight are two or three declarations.",".cover { display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; gap: 1rem } · .between { display: flex; justify-content: space-between; gap: 1rem; align-items: center } · .with-sidebar { display: flex; flex-wrap: wrap; gap: 1rem } · .side { flex-basis: 12rem; flex-grow: 1 } · .main { flex-basis: 0; flex-grow: 999; min-inline-size: 50% } · .stack { display: grid; gap: var(--space, 1rem) } · .cluster { display: flex; flex-wrap: wrap; gap: var(--space, .5rem); align-items: center } · .grid-auto { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) }"],sol:`.cover { display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; gap: 1rem; }
.between { display: flex; justify-content: space-between; gap: 1rem; align-items: center; }
.with-sidebar { display: flex; flex-wrap: wrap; gap: 1rem; }
.side { flex-basis: 12rem; flex-grow: 1; }
.main { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }
.stack { display: grid; gap: var(--space, 1rem); }
.cluster { display: flex; flex-wrap: wrap; gap: var(--space, .5rem); align-items: center; }
.grid-auto { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); }`,why:"The payoff of the whole set: a real screen with essentially zero bespoke layout CSS. That is the argument for primitives, demonstrated rather than asserted.",markup:`    <section className="cover">
      <header className="between">
        <strong>Logo</strong>
        <nav className="cluster"><a href="#">one</a><a href="#">two</a></nav>
      </header>

      <div className="with-sidebar">
        <aside className="side stack">
          <a href="#">Overview</a>
          <a href="#">Reports</a>
          <a href="#">Settings</a>
        </aside>

        <div className="main stack">
          <div className="grid-auto">
            {[1,2,3,4].map(n => <article className="card" key={n}>Card {n}</article>)}
          </div>
          <div className="cluster">
            {["live","beta","new"].map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>
      </div>

      <footer>footer</footer>
    </section>`},{id:"EXC-01",cat:"exc",title:"When flex beats grid",goal:"Deciding correctly between the two for a row whose item count you do not control.",use:[["display: flex","the correct answer here"],["flex-wrap","because items must reflow by content width"]],task:"Lay out a filter row whose chips vary in width and whose count comes from data. Then write one line explaining why grid is the wrong tool.",dia:{w:320,h:130,frame:[8,8,304,114,""],box:[[16,18,54,26,"all"],[76,18,90,26,"in progress"],[172,18,70,26,"done"],[16,54,120,26,"needs review"],[142,54,60,26,"blocked"]],note:[[8,126,"grid would force equal tracks and leave ragged gaps"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.filters
         button.chip   x5   from .map over ["all","in progress","done","needs ]
      */}
    </>
  );
}
`,css:`.filters {
  /* TODO — the right display, and why */
}
.chip { background: aliceblue; border: 0; padding: .35rem .75rem; border-radius: 999px; }
`,hints:["Ask who decides the layout. Here the chips do — their own text width decides how many fit.","display: flex; flex-wrap: wrap; gap: .5rem. A grid would impose uniform tracks, so short chips get stretched and long ones truncate."],sol:`display: flex;
  flex-wrap: wrap;
  gap: .5rem;`,why:"Preferring grid by default is right; being unable to name the exception is not. This is the exception.",markup:`    <div className="filters">
      {["all","in progress","done","needs review","blocked"].map(f => <button className="chip" key={f}>{f}</button>)}
    </div>`},{id:"EXC-02",cat:"exc",title:"When a real table beats grid",goal:"Recognising that tabular data needs table semantics, not a grid of divs.",use:[["<table>","the correct element — supplied for you"],["border-collapse","the styling that only tables have"],["position: sticky","a header row that stays put"]],task:"Style the table without converting it to a grid. Add a sticky header and collapsed borders.",dia:{w:320,h:130,frame:[8,8,304,114,""],box:[[16,16,288,22,"thead — sticky","hi"],[16,44,288,22,"row"],[16,72,288,22,"row"],[16,100,288,22,"row"]],note:[[8,126,"display: grid on a table destroys its accessibility tree"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       table.tbl
         thead
           tr
             th   text: "Name"
             th   text: "Role"
         tbody
           tr
             td   text: "Ada"
             td   text: "Engineer"
           tr
             td   text: "Grace"
             td   text: "Admiral"
      */}
    </>
  );
}
`,css:`.tbl {
  width: 100%;
  /* TODO — collapse the borders */
}
.tbl th, .tbl td { border-bottom: 1px solid gainsboro; padding: .5rem; text-align: left; }

.tbl thead th {
  background: whitesmoke;
  /* TODO — sticky header */
}
`,hints:["border-collapse: collapse on the table; position: sticky with top: 0 on the header cells.",'Applying display: grid to a table element removes its implicit row and cell roles, so screen readers stop announcing "row 2, column 1". That alone rules it out.'],sol:`border-collapse: collapse;

/* thead th */ position: sticky; top: 0;`,why:"“Never use tables” is about layout tables from 1999. Data tables are still correct, and knowing the difference is the mark of someone who has read the a11y spec.",markup:`    <table className="tbl">
      <thead><tr><th>Name</th><th>Role</th></tr></thead>
      <tbody>
        <tr><td>Ada</td><td>Engineer</td></tr>
        <tr><td>Grace</td><td>Admiral</td></tr>
      </tbody>
    </table>`},{id:"EXC-03",cat:"exc",title:"When absolute positioning is still the right answer",goal:"A tooltip that must not affect the size of its parent.",use:[["position: absolute","remove from flow so the parent does not grow"],["position: relative","on the anchor"]],task:"Show a tooltip above the button. The button’s row must not change height when it appears.",dia:{w:320,h:130,frame:[8,60,304,50,"row height NEVER changes"],box:[[90,16,140,26,"tooltip","hi"],[16,70,120,32,"anchor"]],note:[[8,124,"a grid overlay would still be part of the layout"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.row
         span.anchor   text: "hover"
           span.tip   text: "tooltip"
         span   text: "sibling"
      */}
    </>
  );
}
`,css:`.row { display: flex; gap: 1rem; align-items: center; }
.row > span { background: aliceblue; padding: .5rem; }

.anchor {
  /* TODO */
}
.tip {
  background: black;
  color: white;
  padding: .25rem .5rem;
  bottom: 100%;
  left: 0;
  /* TODO */
}
`,hints:["Only out-of-flow positioning takes an element out of its parent’s size calculation.",".anchor { position: relative } and .tip { position: absolute }. The grid-overlay trick from GRID-11 keeps the element in flow, so the parent would still size around it."],sol:`.anchor { position: relative; }
.tip { position: absolute; }`,why:"Grid overlays replaced most absolute positioning, but not this. “Must not affect layout” is exactly what out-of-flow means.",markup:`    <div className="row">
      <span className="anchor">
        hover
        <span className="tip">tooltip</span>
      </span>
      <span>sibling</span>
    </div>`},{id:"ANT-01",useApp:!1,cat:"anti",title:"Magic-number margins — replace with a rhythm",goal:"The same visual spacing, with no per-element numbers and no sibling margins.",use:[[".stack","one container decision replaces every child margin"],["gap","the single source of spacing"]],task:"Delete every margin below and reproduce the spacing with one container rule.",dia:{w:320,h:140,box:[[8,10,304,20,"BEFORE  h2 { margin-bottom: 13px }"],[8,32,304,20,"        p  { margin-bottom: 27px }"],[8,54,304,20,"        ul { margin-top: -4px }"]],note:[[8,92,"AFTER   .stack { display: grid; gap: 1rem }"],[8,116,"spacing becomes a container decision, not 3 child decisions"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.stack
         h2   text: "Title"
         p   text: "Body copy."
         ul
           li   text: "one"
           li   text: "two"
      */}
    </>
  );
}
`,css:`/* the anti-pattern — delete all of it */
h2 { margin-bottom: 13px; }
p  { margin-bottom: 27px; }
ul { margin-top: -4px; }

.stack {
  /* TODO — replace all three rules */
}
`,hints:["Each magic number was tuned to fight margin collapsing. Remove the margins and the fight ends.",".stack > * { margin: 0 } plus .stack { display: grid; gap: 1rem }."],sol:`.stack > * { margin: 0; }
.stack { display: grid; gap: 1rem; }`,why:"Negative margins tuned by eye are the fingerprint of margin collapsing. Naming the cause — not just the fix — is what the interviewer is listening for.",markup:`    <div className="stack">
      <h2>Title</h2>
      <p>Body copy.</p>
      <ul><li>one</li><li>two</li></ul>
    </div>`},{id:"ANT-02",visual:!1,verify:"The button is red both ways. Verify by reading precedence: the layered version wins WITHOUT !important, so the next override still has somewhere to go.",cat:"anti",title:"!important and the specificity war",goal:"The override working without !important and without deepening the selector.",use:[["@layer","order the cascade explicitly"],["low-specificity selectors","so overrides need no escalation"]],task:"Make .btn-danger win over the base .btn without !important and without a longer selector.",dia:{w:320,h:140,box:[[8,10,304,20,"BEFORE  .page .card .btn { background: blue }"],[8,32,304,20,"        .btn-danger { background: red !important }"]],note:[[8,70,"AFTER   @layer base, components;"],[8,88,"        later layer wins regardless of specificity"],[8,120,"!important removes your last escape hatch — keep it free"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       button.btn.btn-danger   text: "delete"
      */}
    </>
  );
}
`,css:`/* the anti-pattern */
.page .card .btn { background: steelblue; color: white; }
.btn-danger { background: indianred !important; }

/* TODO — rewrite with @layer, no !important, no deep selectors */
`,hints:["A declaration in a later @layer beats one in an earlier layer no matter how specific the earlier selector is.","@layer base, components; @layer base { .btn { background: steelblue; color: white } } @layer components { .btn-danger { background: indianred } }"],sol:`@layer base, components;
@layer base { .btn { background: steelblue; color: white; } }
@layer components { .btn-danger { background: indianred; } }`,why:"The real cost of !important is that the next override has nowhere left to go. Layers make precedence a design decision instead of an arms race.",markup:'    <button className="btn btn-danger">delete</button>'},{id:"ANT-03",cat:"anti",title:"Fixed heights on text — the clipped card",goal:"Cards that stay aligned but grow when their content needs more room.",use:[["min-height","a floor, not a ceiling"],["align-items: stretch","equal heights for free — the grid default"]],task:"The cards clip their text at a fixed height. Fix it so they align AND grow.",dia:{w:300,h:96,frame:[4,4,292,66,""],box:[[10,12,136,50,"short"],[154,12,136,50,"long copy, clipped","hi"]],note:[[10,80,"height: 120px — the third line is cut off"]],alt:{w:300,h:96,frame:[4,4,292,80,""],box:[[10,12,136,64,"short"],[154,12,136,64,"long copy, all of it"]],note:[[10,88,"min-height: both grow, still equal"]]},labels:["BEFORE — fixed height","AFTER — min-height"]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         div.card   text: "short"
         div.card   text: "a much longer piece of copy "
      */}
    </>
  );
}
`,css:`.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

/* the anti-pattern */
.card {
  height: 120px;
  overflow: hidden;
  background: aliceblue;
  padding: 1rem;
}
/* TODO — align without clipping */
`,hints:["Grid and flex items already stretch to equal heights. The fixed height was never needed for alignment.",".card { min-height: 7.5rem } and delete height and overflow. Equal heights come free from the default stretch."],sol:".card { min-height: 7.5rem; background: aliceblue; padding: 1rem; }",why:"Clipped text is a content bug that only shows up with real data or another language. min-height gives you the visual floor without the failure mode.",markup:`    <div className="grid">
      <div className="card">short</div>
      <div className="card">a much longer piece of copy that needs three lines to breathe properly</div>
    </div>`},{id:"XTRA-01",cat:"extra",title:"Adjacent Sibling (+) — spacing without trailing margin",goal:"Space items in a list only between siblings, never adding margin after the last child.",use:[["+ (adjacent sibling)","select any item immediately preceded by a sibling"]],task:"Apply a 1rem top margin to every .item that immediately follows another .item.",dia:{w:320,h:140,frame:[8,8,304,124,".list"],box:[[16,16,288,30,"1"],[16,56,288,30,"2"],[16,96,288,30,"3"]],gap:[[16,46,10,"1rem",0],[16,86,10,"1rem",0]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.list
         div.item   x3   [1,2,3]
      */}
    </>
  );
}
`,markup:`    <div className="list">
      <div className="item">1</div>
      <div className="item">2</div>
      <div className="item">3</div>
    </div>`,css:`.list { border: 1px dashed silver; padding: .5rem; }
.item { background: aliceblue; padding: .5rem; }
/* TODO — space adjacent siblings */
`,hints:["The adjacent sibling combinator + matches an element immediately preceded by the former.",".item + .item { margin-top: 1rem; }"],sol:`.item + .item {
  margin-top: 1rem;
}`,why:"Adjacent sibling combinators space items strictly in between, avoiding outer margin leakage at container edges."},{id:"XTRA-02",cat:"extra",title:":where() — design system reset with zero specificity",goal:"Make base element styles easily overridable by any downstream utility without specificity wars.",use:[[":where()","wrap selectors with (0,0,0) specificity"]],task:"Style headings using :where(h1, h2, h3) so a simple .title class can override the color.",dia:{w:320,h:100,frame:[8,8,304,84,".doc"],box:[[16,20,288,60,"h2.title (green)"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.doc
         h2.title   text: "Article Heading"
      */}
    </>
  );
}
`,markup:`    <div className="doc">
      <h2 className="title">Article Heading</h2>
    </div>`,css:`/* TODO — zero-specificity heading defaults */
h2 { color: gray; }
.title { color: seagreen; }
`,hints:[":where() drops the specificity of its entire argument list to 0,0,0.",":where(h1, h2, h3) { color: gray; }"],sol:`:where(h1, h2, h3) {
  color: gray;
}`,why:":where() guarantees zero specificity, making design system defaults effortlessly overridable without !important."},{id:"XTRA-03",cat:"extra",title:":has() — parent styling conditional on child state",goal:"Style a form card with a highlighted border only when it contains a checked checkbox.",use:[[":has()","select a parent element that contains matching children"]],task:"Add a border highlight to .card when it contains an input:checked.",dia:{w:320,h:100,frame:[8,8,304,84,".card:has(:checked)"],box:[[16,20,288,60,"[x] Selected card","hi"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card
         label
           input[type=checkbox]
      */}
    </>
  );
}
`,markup:`    <div className="card">
      <label>
        <input type="checkbox" defaultChecked /> Enable Turbo Mode
      </label>
    </div>`,css:`.card { padding: 1rem; border: 2px solid gainsboro; border-radius: 8px; }
/* TODO — highlight card when checked */
`,hints:[":has() acts as a parent selector based on descendant state.",".card:has(:checked) { border-color: darkorange; background: #fff7ed; }"],sol:`.card:has(:checked) {
  border-color: darkorange;
  background: #fff7ed;
}`,why:":has() removes the need to lift state into React just to style a parent container based on child interaction."},{id:"XTRA-04",cat:"extra",title:"-webkit-line-clamp — clamp long text to exactly N lines",goal:"Truncate multi-line paragraph descriptions to exactly 2 lines with a trailing ellipsis.",use:[["-webkit-line-clamp","limit text box to N visible lines"],["display: -webkit-box","enable box line clamping"],["overflow: hidden","hide clamped text"]],task:"Clamp .desc text to 2 lines with an ellipsis.",dia:{w:320,h:100,frame:[8,8,304,84,".card"],box:[[16,16,288,68,"Title\\nTwo lines of text..."]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.card
         p.desc   long description
      */}
    </>
  );
}
`,markup:`    <div className="card">
      <p className="desc">
        A very long description that spans multiple sentences and should gracefully truncate after exactly two lines with an ellipsis.
      </p>
    </div>`,css:`.card { width: 260px; padding: .5rem; border: 1px solid gainsboro; }
.desc {
  /* TODO — clamp to 2 lines */
}
`,hints:["Line clamping requires display: -webkit-box, -webkit-box-orient: vertical, and overflow: hidden.",".desc { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }"],sol:`.desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`,why:"Multi-line clamping prevents variable length content from breaking card grids and table layouts."},{id:"XTRA-05",cat:"extra",title:"text-overflow: ellipsis — single-line text truncate",goal:"Truncate an overflowing single-line breadcrumb or email address with an ellipsis.",use:[["text-overflow: ellipsis","render ellipsis on overflow"],["white-space: nowrap","prevent text wrapping"],["overflow: hidden","contain overflow"]],task:"Truncate .truncate to a single line with an ellipsis.",dia:{w:320,h:80,frame:[8,8,304,64,".bar"],box:[[16,16,288,48,"user.longname@corporate..."]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.bar
         span.truncate   long email string
      */}
    </>
  );
}
`,markup:`    <div className="bar">
      <span className="truncate">devang.manjramkar.verylongemail@enterprise-fleetpulse.io</span>
    </div>`,css:`.bar { width: 220px; padding: .5rem; border: 1px solid gainsboro; }
.truncate {
  display: block;
  /* TODO — single-line truncate */
}
`,hints:["Single-line truncation needs white-space: nowrap, overflow: hidden, and text-overflow: ellipsis.",".truncate { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }"],sol:`.truncate {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,why:"Truncating single lines prevents horizontal overflow blowouts in responsive tables and header breadcrumbs."},{id:"XTRA-06",cat:"extra",title:"linear-gradient — scrim overlay for text contrast",goal:"Create a bottom-to-top dark scrim gradient behind text over an image.",use:[["linear-gradient","render smooth alpha transition from dark to transparent"]],task:"Apply a linear-gradient from rgba(0,0,0,0.8) at the bottom to transparent at the top.",dia:{w:320,h:130,frame:[8,8,304,114,".hero"],box:[[16,70,288,40,"White text over dark scrim"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.hero
         div.scrim
           h3.title
      */}
    </>
  );
}
`,markup:`    <div className="hero">
      <div className="scrim">
        <h3 className="title">Fleet Analytics</h3>
      </div>
    </div>`,css:`.hero { height: 110px; background: #94a3b8; border-radius: 8px; overflow: hidden; }
.scrim {
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  color: white;
  /* TODO — bottom-to-top dark scrim */
}
`,hints:["linear-gradient(to top, rgba(0,0,0,0.8), transparent) paints from bottom to top.",".scrim { background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); }"],sol:`.scrim {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}`,why:"CSS gradients provide WCAG-compliant contrast ratios over dynamic images without extra DOM layers."},{id:"XTRA-07",cat:"extra",title:"transform + transition — GPU micro-interaction",goal:"Lift a card smoothly by 4px on hover without triggering CPU layout reflows.",use:[["transform: translateY","translate on composite layer"],["transition: transform","animate property smoothly"]],task:"Smoothly elevate .card on hover using transform: translateY(-4px).",dia:{w:320,h:100,frame:[8,8,304,84,".grid"],box:[[16,14,140,56,"Normal"],[168,10,140,56,"Hovered (-4px)","hi"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.grid
         button.card   text: "Card 1"
         button.card   text: "Card 2"
      */}
    </>
  );
}
`,markup:`    <div className="grid">
      <button className="card">Card 1</button>
      <button className="card">Card 2</button>
    </div>`,css:`.grid { display: flex; gap: 1rem; padding: 1rem; }
.card {
  padding: 1rem;
  border: 1px solid gainsboro;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  /* TODO — smooth transform transition */
}
.card:hover {
  /* TODO — lift card */
}
`,hints:["transition: transform 150ms ease animates transform without triggering layout reflows.",".card { transition: transform 150ms ease; } .card:hover { transform: translateY(-4px); }"],sol:`.card {
  transition: transform 150ms ease;
}
.card:hover {
  transform: translateY(-4px);
}`,why:"Animating transform is GPU-accelerated and avoids costly recalculate style and layout passes."},{id:"XTRA-08",cat:"extra",title:"var(--token) — dynamic CSS variable from React",goal:"Consume a dynamic CSS custom property --progress passed via React inline style.",use:[["var(--progress)","consume CSS custom property passed by React"],["width: var()","bind width dynamically"]],task:"Set the .bar-fill width to var(--progress, 0%).",dia:{w:320,h:90,frame:[8,8,304,74,".bar-track"],box:[[16,28,200,34,"70% fill","hi"]]},jsx:`import React from 'react';

export default function App() {
  return (
    <>
      {/* TODO — build this structure. Class names are exact; the CSS depends on them.
       div.bar-track
         div.bar-fill   style: { '--progress': '70%' }
      */}
    </>
  );
}
`,markup:`    <div className="bar-track">
      <div className="bar-fill" style={{ '--progress': '70%' }}></div>
    </div>`,css:`.bar-track { width: 280px; height: 32px; background: whitesmoke; border-radius: 999px; overflow: hidden; border: 1px solid gainsboro; }
.bar-fill {
  height: 100%;
  background: steelblue;
  /* TODO — bind width to --progress */
}
`,hints:["CSS custom properties set in React style can be read via var(--progress, 0%).",".bar-fill { width: var(--progress, 0%); }"],sol:`.bar-fill {
  width: var(--progress, 0%);
}`,why:"Binding CSS variables from React style props decouples dynamic numeric logic from stylesheet structure."}]},Ev={lessons:[{stage:1,title:"The box model — why your 14rem box is not 14rem",teach:"You wrote <code>width:14rem</code> — that is <b>224px</b>. But <code>width</code> sizes the <b>content only</b>; padding and border are added <b>on top</b>. So the box actually occupies <b>224 + 20 + 20 = 264px</b> — 40px wider than you asked for.<br><br><code>box-sizing:border-box</code> changes what <code>width</code> <i>means</i>: 224px becomes the <b>total</b>, and the padding eats inward instead of pushing outward.<br><br>The dashed red line is exactly 14rem. Watch where the card's right edge sits relative to it.",html:'<div class="ruler"><span>14rem — what you asked for</span></div><div class="card"><h3>Account settings</h3><p>Manage how your workspace behaves.</p></div><p class="note">Card overhanging the dashed line? That gap <em>is</em> your padding, added on top of the width.</p>',css:`.card{
  width:14rem;      /* content only, for now */
  padding:1.25rem;  /* adds 20px on each side */
  background:steelblue;color:white;
  border-radius:.5rem;
}
`,task:"Add <code>box-sizing:border-box</code> to <code>.card</code>. Its right edge snaps back and lands exactly on the dashed line.",key:"Without border-box: width = content, and padding/border push the box wider. With it: width = the whole visible box. That is why the reset is line one of every stylesheet.",base:`/* undo the harness reset so you see the REAL browser default */
*{box-sizing:content-box}
.ruler{box-sizing:border-box}
body{font:1rem/1.5 system-ui;color:black;background:whitesmoke;margin:0;padding-top:1.1rem}
.ruler{width:14rem;border:2px dashed crimson;border-bottom:0;height:.9rem;position:relative;margin-bottom:-2px}
.ruler span{position:absolute;top:-1.05rem;left:0;font:600 .68rem system-ui;color:crimson;white-space:nowrap}
.card h3{margin:0 0 .25rem;font-size:1rem}
.card p{margin:0;font-size:.875rem;opacity:.85}
.note{font:.75rem/1.45 system-ui;color:dimgray;max-width:19rem;margin:.85rem 0 0}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"display: block vs inline",teach:"<code>block</code> takes the full line and accepts width/height. <code>inline</code> flows in the text and IGNORES width/height. <code>inline-block</code> flows but accepts them.",html:'<span class="tag">Design</span><span class="tag">Engineering</span><span class="tag">Product</span>',css:`.tag{
  width:8rem;
  background:steelblue;color:white;
  padding:.375rem .75rem;border-radius:999px;
  font:600 .8125rem system-ui;
}
`,task:"Width is being ignored — spans are inline. Add <code>display:inline-block</code>.",key:"inline ignores width/height. inline-block accepts them and still flows.",base:`body{font:1rem/1.5 system-ui;background:whitesmoke;padding:.5rem}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"display:flex — the switch that changes the children",teach:"<code>display:flex</code> on a PARENT lays its children in a row. You style the parent; the children rearrange. This is the single most important line in CSS layout.",html:'<div class="row"><div class="box a">Logo</div><div class="box b">Nav</div><div class="box c">Avatar</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.row{
  background:gainsboro;padding:12px;
}
`,task:"Add <code>display:flex</code> to .row. The three boxes jump onto one line.",key:"display:flex — children become flex items in a row.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"flex-direction defines the MAIN axis",teach:"This is THE idea people miss. <code>flex-direction</code> decides which way is 'main'. Row → main is horizontal. Column → main is VERTICAL. Every other flex property is described relative to that axis.",html:'<div class="row"><div class="box a">Logo</div><div class="box b">Nav</div><div class="box c">Avatar</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.row{
  display:flex;
  flex-direction:row;
  background:gainsboro;padding:12px;
}
`,task:"Switch to <code>column</code>. Then back. Say out loud which way 'main' points each time.",key:"row → main = horizontal. column → main = vertical. Everything else follows this.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"justify-content works on the MAIN axis",teach:"Positions items ALONG the main axis. In a row that's left↔right. Values: flex-start, center, flex-end, space-between, space-around, space-evenly.",html:'<div class="row"><div class="box a">Logo</div><div class="box b">Nav</div><div class="box c">Avatar</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.row{
  display:flex;
  justify-content:flex-start;
  background:gainsboro;padding:12px;
}
`,task:"Try <code>center</code>, then <code>space-between</code>. Then add <code>flex-direction:column</code> and try again — notice it now moves them VERTICALLY.",key:"justify-content = main axis. It follows flex-direction, not the screen.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"align-items works on the CROSS axis",teach:"The cross axis is perpendicular to main. In a row, cross is vertical — so align-items controls vertical alignment. That's why <code>align-items:center</code> vertically centres a row.",html:'<div class="row"><div class="box a">Logo</div><div class="box b" style="padding:28px 18px">tall</div><div class="box c">Avatar</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.row{
  display:flex;
  align-items:stretch;
  background:gainsboro;padding:12px;
}
`,task:"Try <code>center</code>, then <code>flex-start</code>, then <code>baseline</code>.",key:"justify = main. align = cross. In a row: justify is horizontal, align is vertical.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"gap — spacing without margins",teach:"<code>gap</code> puts space BETWEEN items only, never on the outside edges. It replaced the old margin-right-on-every-child-except-last hack. Works in flex and grid.",html:'<div class="row"><div class="box a">Logo</div><div class="box b">Nav</div><div class="box c">Avatar</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.row{
  display:flex;
  gap:0px;
  background:gainsboro;padding:12px;
}
`,task:"Set <code>gap:16px</code>. Notice no space appears at the outer edges.",key:"gap = between only. Use it instead of child margins.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"flex: grow shrink basis",teach:"On a CHILD. <code>flex:1</code> means 'take the leftover space'. The full form <code>flex:1 1 200px</code> = grow yes, shrink yes, start at 200px. This is how you make one column fill while others stay fixed.",html:'<div class="row"><div class="box a">Logo</div><div class="box b">Nav</div><div class="box c">Avatar</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.row{display:flex;gap:8px;background:gainsboro;padding:12px}
.a{
  flex:0 1 auto;
}
`,task:"Give .a <code>flex:1</code>. Then try <code>flex:1 1 200px</code>. Then put <code>flex:1</code> on .b too and watch them share.",key:"flex:1 on a child = absorb the leftover space.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"flex-wrap — squashing vs wrapping",teach:"By default flex items SHRINK rather than wrap, and can get unusably narrow. <code>flex-wrap:wrap</code> lets them drop to the next line instead. Essential for responsive bars.",html:'<div class="row"><div class="box a">Logo</div><div class="box b">Nav</div><div class="box c">Avatar</div><div class="box d">Help</div><div class="box a">Logo</div><div class="box b">Nav</div><div class="box c">Avatar</div><div class="box d">Help</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.row{
  display:flex;
  gap:8px;
  flex-wrap:nowrap;
  background:gainsboro;padding:12px;
}
`,task:"Set <code>wrap</code>. Then drag this panel narrower and watch the difference.",key:"nowrap squashes. wrap drops to a new line. Bars almost always want wrap.",base:`.box{min-width:120px}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"display:grid + grid-template-columns",teach:"Grid is TWO-dimensional — you declare columns up front. <code>1fr</code> means 'one share of the free space'.",html:'<div class="g"><div class="box a">A</div><div class="box b">B</div><div class="box c">C</div><div class="box d">D</div><div class="box a">A</div><div class="box b">B</div><div class="box c">C</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.g{
  display:grid;
  grid-template-columns:1fr;
  gap:10px;background:gainsboro;padding:12px;
}
`,task:"Try <code>1fr 1fr 1fr</code>. Then <code>200px 1fr</code> — fixed sidebar, fluid main.",key:"fr = a share of leftover space. 200px 1fr = the classic sidebar+main.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"repeat + minmax + auto-fit = responsive, zero media queries",teach:"<code>repeat(auto-fit, minmax(160px,1fr))</code> means: fit as many columns as you can, each at least 160px, sharing leftover space. The whole responsive card grid is this one line.",html:'<div class="g"><div class="box a">A</div><div class="box b">B</div><div class="box c">C</div><div class="box d">D</div><div class="box a">A</div><div class="box b">B</div><div class="box c">C</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.g{
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:10px;background:gainsboro;padding:12px;
}
`,task:"Replace with <code>repeat(auto-fit, minmax(160px,1fr))</code>, then drag the panel narrower. Then try <code>auto-fill</code> and spot the difference.",key:"auto-fit COLLAPSES empty tracks so items stretch. auto-fill KEEPS them, leaving a gap. Classic interview question.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"place-items:center — centring, solved",teach:"On a grid container, <code>place-items:center</code> centres children on BOTH axes. Two words. This is the entire centred-box archetype.",html:'<div class="g"><div class="box a">Centred</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.g{
  display:grid;
  height:220px;
  background:gainsboro;
}
`,task:"Add <code>place-items:center</code>.",key:"display:grid + place-items:center = perfectly centred, both axes.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"grid-template-areas — layout you can read",teach:"Name regions, then draw the layout as ASCII. The app shell becomes one readable declaration instead of nested flex containers.",html:'<div class="shell"><div class="box a" style="grid-area:hd">header</div><div class="box b" style="grid-area:sb">side</div><div class="box c" style="grid-area:main">main</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.shell{
  display:grid;
  gap:8px;
  grid-template-columns:140px 1fr;
  grid-template-rows:50px 1fr;
  grid-template-areas:
    "hd sb"
    "main main";
  height:220px;background:gainsboro;padding:12px;
}
`,task:'Change the areas to <code>"hd hd"</code> then <code>"sb main"</code> so the header spans the top.',key:'Repeating a name spans that cell. "hd hd" = header across both columns.',base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"position: relative / absolute / fixed / sticky",teach:"<code>relative</code> nudges without leaving flow, and becomes the anchor for absolute children. <code>absolute</code> leaves flow and positions against the nearest positioned ancestor. <code>fixed</code> pins to the viewport. <code>sticky</code> is normal until it hits a threshold, then pins.",html:'<div class="wrapx"><div class="box a">Card</div><div class="box b badge">New</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.wrapx{
  position:relative;
  background:gainsboro;padding:12px;height:140px;
}
.badge{
  position:static;
}
`,task:"Give .badge <code>position:absolute; top:8px; right:8px;</code>. Then remove <code>position:relative</code> from .wrapx and watch it escape.",key:"absolute anchors to the nearest POSITIONED ancestor. None = it escapes to the page.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"inset:0 — cover the parent exactly",teach:"<code>inset:0</code> is shorthand for top/right/bottom/left all 0. With position:fixed it covers the viewport — and unlike <code>width:100vw</code> it does NOT overflow when a scrollbar exists.",html:'<div class="wrapx"><p style="margin:0;font:14px system-ui">Page content sits underneath</p><div class="ov">Overlay</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.wrapx{position:relative;background:gainsboro;padding:12px;height:160px}
.ov{
  position:absolute;
  background:rgb(0 0 0/.6);color:white;
  display:grid;place-items:center;
  font:600 14px system-ui;
}
`,task:"Add <code>inset:0</code> to .ov.",key:"inset:0 = top/right/bottom/left 0. Use it for overlays, never width:100vw.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"Units: px, rem, %, dvh, clamp()",teach:"<code>px</code> fixed · <code>rem</code> scales with the user's font size (use for text/spacing) · <code>%</code> of the parent · <code>dvh</code> viewport height that is correct on mobile · <code>clamp(min, ideal, max)</code> fluid with bounds.",html:'<div class="mark"><span>1.25rem floor</span></div><div class="box a t">Fluid heading</div><div class="mark big"><span>2rem ceiling</span></div><p class="hint2">Drag the preview edge. The text scales between the two marks and never past them.</p>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.t{
  font-size:16px;
  padding:1rem;
  width:100%;
  max-width:400px;
}
`,task:"Try <code>font-size:clamp(14px, 4vw, 32px)</code> then drag the panel width.",key:"clamp(min, fluid, max) — responsive type with no media query.",base:`
.mark{height:1.25rem;border-left:2px solid crimson;padding-left:.4rem;margin:.35rem 0;position:relative}
.mark.big{height:2rem}
.mark span{font:600 .65rem system-ui;color:crimson;position:absolute;top:0;left:.5rem}
.hint2{font:.7rem/1.4 system-ui;color:dimgray;margin:.6rem 0 0}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:"Media queries — the escape hatch",teach:"For when a layout must change SHAPE, not just scale. Mobile-first: write the small layout, then add <code>@media (min-width: …)</code> for bigger. Pick breakpoints where YOUR content breaks, not from device names.",html:'<div class="g"><div class="box a">A</div><div class="box b">B</div><div class="box c">C</div><div class="box d">D</div></div>',css:`.box{background:steelblue;color:white;padding:12px 18px;border-radius:6px;font:600 14px system-ui}
.b{background:slateblue}.c{background:seagreen}.d{background:goldenrod}
.g{
  display:grid;
  grid-template-columns:1fr;
  gap:8px;background:gainsboro;padding:12px;
}

@media (min-width:500px){
  /* your rule here */
}
`,task:"Inside the media query set <code>.g{grid-template-columns:1fr 1fr}</code>. Then drag the panel across 500px.",key:"Mobile-first: base = small. min-width queries add complexity as space appears.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:1,title:":focus-visible — the accessibility line that is scored",teach:"Keyboard users must SEE where they are. <code>:focus-visible</code> shows a ring for keyboard focus but not mouse clicks. One global rule covers your whole build.",html:'<button class="btn">Save changes</button> <button class="btn">Cancel</button>',css:`.btn{padding:8px 16px;border:1px solid silver;border-radius:6px;background:white;font:inherit;cursor:pointer}

/* add the rule here */
`,task:"Add <code>.btn:focus-visible{outline:2px solid steelblue; outline-offset:2px}</code> then click into the preview and press Tab.",key:":focus-visible = keyboard only. Never remove outlines without replacing them.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"The problem: bespoke CSS doesn't scale under a clock",teach:"Look right — that's three components, each with its own hand-rolled spacing and colour. ~30 lines for three boxes. In a 25-minute build you'd write this four more times. The next seven lessons replace ALL of it with reusable classes you type once.",html:'<div class="a"><h3>One</h3><p>Body</p></div><div class="b"><h3>Two</h3><p>Body</p></div><div class="c"><h3>Three</h3><p>Body</p></div>',css:`.a{background:white;border:1px solid gainsboro;border-radius:8px;padding:16px;margin-bottom:16px}
.a h3{margin:0 0 8px}
.a p{margin:0;color:dimgray}
.b{background:white;border:1px solid gainsboro;border-radius:8px;padding:16px;margin-bottom:16px}
.b h3{margin:0 0 8px}
.b p{margin:0;color:dimgray}
.c{background:white;border:1px solid gainsboro;border-radius:8px;padding:16px}
.c h3{margin:0 0 8px}
.c p{margin:0;color:dimgray}
`,task:"Count the duplication. Nothing to change here — just notice how much of it is the same three declarations repeated.",key:"Three identical boxes, three copies of the CSS. This is the tax the system removes.",base:"",polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"Tokens — name the value once",teach:"A custom property is a named value. Change <code>--brand</code> in one place and every use updates. Seven colours and four spaces is the whole palette — memorise those, derive the rest.",html:'<div class="box"><h3 style="margin:0 0 var(--s)">Card</h3><p class="muted" style="margin:0">Muted body text</p><button class="btn" data-v="primary" style="margin-top:var(--m)">Action</button></div>',css:`:root{
  --ink:black;
  --muted:dimgray;
  --line:gainsboro;
  --surface:white;
  --bg:whitesmoke;
  --brand:steelblue;
  --danger:firebrick;
  --s:.5rem;
  --m:1rem;
  --l:1.5rem;
  --xl:2rem;
  --round:8px;
}
`,task:"Change <code>--brand</code> to <code>seagreen</code>. One edit, the button follows. Then change <code>--round</code> to <code>16px</code>.",key:"Tokens = one name, many uses. Never repeat a hex value.",base:`body{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}
.muted{color:var(--muted)}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"color-mix() — stop inventing colour tokens",teach:"You need a hover shade, a tint, a border. Do NOT add three more tokens. Derive them from the one you have. <code>color-mix(in oklch, X 85%, black)</code> is the darker hover; mixing with <code>--surface</code> gives a tint.",html:'<button class="btn" data-v="primary">Hover me</button> <span class="tint">tinted surface</span>',css:`.btn[data-v=primary]:hover{
  background:royalblue;   /* hardcoded — replace me */
}
.tint{
  padding:var(--s) var(--m);border-radius:6px;
  background:gainsboro;      /* hardcoded — replace me */
}
`,task:"Replace both hardcoded values: hover → <code>color-mix(in oklch,var(--brand) 85%,black)</code>, tint → <code>color-mix(in oklch,var(--brand) 10%,var(--surface))</code>.",key:"Two colours from one token. Change --brand and every derived shade follows.",base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}
body{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}
.muted{color:var(--muted)}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"STACK — the highest-leverage class in CSS",teach:"<code>.stack > * + *</code> is the owl selector: 'every child that has a sibling before it'. Margin is a property of the RELATIONSHIP between two elements, not of an element. So no leftover margin on the last child, ever. One class replaces every margin-bottom you would have written.",html:'<div class="stack box"><h3 style="margin:0">Title</h3><p style="margin:0" class="muted">First paragraph.</p><p style="margin:0" class="muted">Second paragraph.</p><button class="btn" data-v="primary">Action</button></div>',css:`.stack > * + * {
  /* your rule here */
}
`,task:'Add <code>margin-block-start:var(--space,var(--m))</code>. Then add <code>style="--space:var(--xl)"</code> to the .stack element and watch it re-space.',key:"One class, all vertical rhythm. --space overrides per instance without a new class.",base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}
body{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}
.muted{color:var(--muted)}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"CLUSTER and BETWEEN — everything horizontal",teach:"<code>.cluster</code> = flex + wrap + gap + align-center: any row of things that should wrap gracefully. <code>.between</code> adds space-between: the whole action-bar archetype.",html:'<div class="between box"><strong>Team members</strong><div class="cluster"><button class="btn">Filter</button><button class="btn" data-v="primary">Invite</button></div></div>',css:`.cluster{
  /* your rule */
}
.between{
  /* your rule */
}
`,task:"cluster → <code>display:flex;flex-wrap:wrap;gap:var(--m);align-items:center</code>. between → same plus <code>justify-content:space-between</code>. Then drag narrow.",key:"cluster = a wrapping row. between = the same, pushed apart. Two classes, every toolbar you'll ever build.",base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}
body{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}
.muted{color:var(--muted)}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"SIDEBAR — responsive with NO media query",teach:"The trick: the sidebar gets a fixed-ish basis; the main gets <code>flex-grow:999</code> so it eats all spare space, plus <code>min-inline-size:50%</code>. When main would drop under 50%, flex-wrap fires and they stack. The layout responds to its OWN width, not the viewport's.",html:'<div class="sidebar"><div class="box"><strong>Nav</strong><p class="muted" style="margin:var(--s) 0 0">Sidebar</p></div><div class="box"><strong>Main</strong><p class="muted" style="margin:var(--s) 0 0">Drag the preview edge — it stacks on its own.</p></div></div>',css:`.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}
.sidebar > :first-child{
  flex-basis:15rem;
  /* add flex-grow */
}
.sidebar > :last-child{
  /* add the three lines */
}
`,task:"first-child → add <code>flex-grow:1</code>. last-child → <code>flex-basis:0; flex-grow:999; min-inline-size:50%</code>. Then drag the preview's right edge.",key:"flex-grow:999 + min-inline-size:50% = self-collapsing. Zero media queries. This is the disruptive one.",base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}
body{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}
.muted{color:var(--muted)}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"SWITCHER — equal columns that stack themselves",teach:"<code>flex-basis:calc((30rem - 100%) * 999)</code>. If the container is wider than 30rem the calc goes negative, clamps to 0, and items share equally. Narrower, it goes huge, and each item takes a full line. One line of maths replaces a media query.",html:'<div class="switcher"><div class="box"><strong>Plan 1</strong><p class="muted" style="margin:var(--s) 0 0">$10/mo</p></div><div class="box"><strong>Plan 2</strong><p class="muted" style="margin:var(--s) 0 0">$20/mo</p></div><div class="box"><strong>Plan 3</strong><p class="muted" style="margin:var(--s) 0 0">$30/mo</p></div></div>',css:`.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}
.switcher > *{
  flex-grow:1;
  /* add the flex-basis calc */
}
`,task:"Add <code>flex-basis:calc((30rem - 100%) * 999)</code>. Drag the preview across ~480px.",key:"The Holy Albatross. Container-relative switching, no media query, one line.",base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}
body{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}
.muted{color:var(--muted)}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"EXCEPTIONS — data attributes, not modifier classes",teach:"BEM gives you .btn--primary, .btn--ghost, .btn--danger, .btn--primary-large… an explosion. CUBE uses a data attribute: one hook, readable in the DOM, usable by JS too.",html:'<div class="cluster"><button class="btn" data-v="primary">Primary</button><button class="btn">Default</button><button class="btn" data-v="ghost">Ghost</button><button class="btn" data-tone="danger">Danger</button></div>',css:`.btn[data-v=ghost]{
  /* your rule */
}
[data-tone=danger]{
  /* your rule */
}
`,task:"ghost → <code>background:none;border-color:transparent</code>. danger → <code>color:var(--danger);border-color:var(--danger)</code>.",key:"One attribute hook per variation. data-tone works on ANY block — that is why it is not .btn--danger.",base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}
body{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}
.muted{color:var(--muted)}
`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"Putting it together — the whole dashboard, no new CSS",teach:"Everything below is composed from classes you already wrote. Read the class attributes: that is where the layout now lives. Component CSS: zero lines.",html:'<div class="stack"><div class="between box"><strong>Dashboard</strong><div class="cluster"><input class="input" style="width:auto" placeholder="Search…"><button class="btn" data-v="primary">Add</button></div></div><div class="sidebar"><div class="box stack"><strong>Filters</strong><p class="muted" style="margin:0">Status</p><p class="muted" style="margin:0">Owner</p></div><div class="grid-auto"><div class="box stack"><strong>Metric 1</strong><p class="muted" style="margin:0">Summary</p></div><div class="box stack"><strong>Metric 2</strong><p class="muted" style="margin:0">Summary</p></div><div class="box stack"><strong>Metric 3</strong><p class="muted" style="margin:0">Summary</p></div><div class="box stack"><strong>Metric 4</strong><p class="muted" style="margin:0">Summary</p></div></div></div></div>',css:`.stack > * + *{margin-block-start:var(--space,var(--m))}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}
.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}
.sidebar > :first-child{flex-basis:15rem;flex-grow:1}
.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:50%}
.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))}
`,task:"Change nothing. Drag the preview from wide to narrow and watch three layouts respond independently. Then change <code>--m</code> to <code>1.5rem</code> — the whole page re-spaces from one edit.",key:"Five words carry it: stack · cluster · sidebar · switcher · center. That is the entire memory load.",base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--danger:firebrick;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:8px}
body{font:16px/1.5 system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:var(--s) var(--m);border:1px solid var(--line);border-radius:6px;font:inherit}
.muted{color:var(--muted)}`,polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"THE DECISION — Grid when the parent decides, Flex when the content decides",teach:'This is the rule the whole system hangs on, and it is the answer to "why Grid here and Flex there?" in an interview.<br><br><b>Grid</b> — you know the structure up front. Tracks, 2D, alignment <i>across</i> rows. The <b>parent</b> dictates sizing, top-down.<br><b>Flex</b> — you do not control the count or the widths. One direction, content-driven, should wrap on its own.<br><br><b>The tell:</b> if you are reaching for a third nested container to make things line up, you needed Grid one level higher.<br><br><span style="display:block;background:#ecfdf5;border-left:3px solid seagreen;padding:.55rem .7rem;border-radius:0 .3rem .3rem 0;font-size:.86rem;color:#065f46"><b>Core.</b> This is the most likely CSS architecture question in the technical round, and the reasoning behind half the Mettl layout MCQs. Own it cold.</span>',html:'<div class="demo"><p class="lab">GRID — parent owns the tracks</p><div class="g"><div class="box">Sidebar</div><div class="box">Main</div><div class="box">Aside</div></div><p class="lab">FLEX — content flows and wraps</p><div class="cluster"><button class="btn">All</button><button class="btn" data-v="primary">Active</button><button class="btn">Archived</button><button class="btn">Deleted</button></div></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.muted{color:var(--muted)}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.lab{font:700 .62rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin:.9rem 0 .4rem}
.demo>.lab:first-child{margin-top:0}
`,css:`.g{
  display:grid;
  gap:var(--m);
  grid-template-columns:10rem 1fr 8rem;
}
`,task:"Change <code>grid-template-columns</code> to <code>1fr 2fr 1fr</code> — the PARENT resized all three children. Now try to do that to the button row without touching the buttons. You cannot: that row is content-driven, which is why it is flex.",key:"Grid = parent decides tracks, top-down, 2D. Flex = content decides, one direction, wraps. Ask 'who owns the sizing?' and the answer picks itself.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:"Flat beats nested — the anti-pattern you are being hired to avoid",teach:`The old way to get a header, sidebar, main and footer was four or five nested flex containers, each one existing only to hold the next. It works, but the structure lies about the layout and every change means re-reading the whole nest.<br><br><b>One grid with named areas replaces the entire nest.</b> The markup goes flat, and the layout becomes readable as ASCII.<br><br><span style="display:block;background:#ecfdf5;border-left:3px solid seagreen;padding:.55rem .7rem;border-radius:0 .3rem .3rem 0;font-size:.86rem;color:#065f46"><b>Core.</b> <code>grid-template-areas</code> is plain Grid — squarely inside Mettl's CSS3 scope, and the cleanest answer to "how would you build this dashboard?"</span>`,html:'<div class="page"><header class="hd">Header</header><aside class="sb">Sidebar</aside><main class="mn">Main content</main><footer class="ft">Footer</footer></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.muted{color:var(--muted)}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.page>*{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:.75rem;font:600 .85rem system-ui}
.hd{background:steelblue;color:white}.ft{background:slateblue;color:white}
`,css:`.page{
  display:grid;
  gap:var(--s);
  /* one declaration replaces 4 nested flex wrappers */
  grid-template-areas:
    "hd hd"
    "sb mn"
    "ft ft";
  grid-template-columns:8rem 1fr;
}
.hd{grid-area:hd}
.sb{grid-area:sb}
.mn{grid-area:mn}
.ft{grid-area:ft}
`,task:'Swap the sidebar to the right: change the areas to <code>"hd hd"</code> / <code>"mn sb"</code> / <code>"ft ft"</code> and the columns to <code>1fr 8rem</code>. Four HTML elements, zero wrappers, one edit.',key:"Named areas = flat markup + a layout you can read. Nesting containers to fake structure is the 2020 habit; this replaces it.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:'<span style="display:inline-block;background:goldenrod;color:white;font:700 .6rem system-ui;padding:.1rem .45rem;border-radius:999px;letter-spacing:.04em;margin-right:.4rem;vertical-align:middle">BONUS</span>SUBGRID — align card internals across cards, no fixed heights',teach:`Cards in a row never line up: one has a longer title, so its button sits lower. The old fixes were fixed heights or JS.<br><br><b>Subgrid lets a child inherit the PARENT's row tracks.</b> Each card spans the same three rows, so every title, body and button aligns across the whole row — automatically, at any content length.<br><br><span style="display:block;background:#fffbeb;border-left:3px solid goldenrod;padding:.55rem .7rem;border-radius:0 .3rem .3rem 0;font-size:.86rem;color:#78350f"><b>Exam weighting:</b> Mettl names <i>Flexbox</i> and <i>responsive design</i> in its CSS3 competency list — it does not name this. Understand what it solves so you can say one sentence about it in the technical round. <b>Do not drill it.</b></span>`,html:'<p class="lab">watch the three Choose buttons</p><div class="cards"><div class="c"><h4>Starter</h4><p class="muted">Short blurb.</p><button class="btn" data-v="primary">Choose</button></div><div class="c"><h4>Team plan for growing companies</h4><p class="muted">A much longer description that wraps onto several lines and pushes everything down.</p><button class="btn" data-v="primary">Choose</button></div><div class="c"><h4>Scale</h4><p class="muted">Medium length blurb here.</p><button class="btn" data-v="primary">Choose</button></div></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.muted{color:var(--muted)}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.cards{display:grid;gap:.5rem;grid-template-columns:repeat(3,1fr)}   /* 3 across so you can see the alignment */
.c{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:.6rem;font-size:.8rem}
.c h4{font-size:.85rem}
.c .btn{padding:.35em .6em;font-size:.75rem}
.c h4,.c p{margin:0}
.lab{font:700 .6rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin:0 0 .4rem}
`,css:`.cards{
  /* rows the cards will share */
  grid-template-rows:auto;
}
.c{
  /* each card is its own little grid, for now */
  display:grid;
  gap:var(--s);
}
`,task:"Make the buttons line up: on <code>.cards</code> add <code>grid-template-rows:auto auto auto</code>; on <code>.c</code> add <code>grid-row:span 3</code> and <code>grid-template-rows:subgrid</code>. The cards now share the parent's rows.",key:"subgrid = the child adopts the parent's tracks. Cross-card alignment with no fixed heights, no JS, no nesting.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:2,title:'<span style="display:inline-block;background:goldenrod;color:white;font:700 .6rem system-ui;padding:.1rem .45rem;border-radius:999px;letter-spacing:.04em;margin-right:.4rem;vertical-align:middle">BONUS</span>CONTAINER QUERIES — a component that responds to ITSELF',teach:'A media query asks how wide the <i>viewport</i> is. That is the wrong question for a component that might sit in a wide main column or a narrow sidebar.<br><br><code>container-type:inline-size</code> turns a parent into a query container; <code>@container</code> then asks how wide <b>that box</b> is. This is what finally kills the old flexbox width hacks — a component becomes genuinely portable.<br><br><span style="display:block;background:#fffbeb;border-left:3px solid goldenrod;padding:.55rem .7rem;border-radius:0 .3rem .3rem 0;font-size:.86rem;color:#78350f"><b>Exam weighting:</b> Mettl names <i>Flexbox</i> and <i>responsive design</i> in its CSS3 competency list — it does not name this. Understand what it solves so you can say one sentence about it in the technical round. <b>Do not drill it.</b></span>',html:'<div class="wide contains"><p class="lab">same component, wide container</p><div class="card"><img alt="" class="ph"><div><h4>Portable card</h4><p class="muted">Side by side when it has room.</p></div></div></div><div class="narrow contains"><p class="lab">same component, narrow container</p><div class="card"><img alt="" class="ph"><div><h4>Portable card</h4><p class="muted">Stacks when it does not.</p></div></div></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.muted{color:var(--muted)}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.lab{font:700 .6rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin:0 0 .35rem}
.wide{max-width:100%}.narrow{max-width:14rem;margin-top:1rem}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m);display:grid;gap:var(--s)}
.card h4,.card p{margin:0}.ph{width:100%;height:3rem;background:aliceblue;border-radius:.375rem}
`,css:`.contains{
  /* your rule here */
}

@container (min-width:22rem){
  .card{
    /* and here */
  }
}
`,task:"Add <code>container-type:inline-size</code> to <code>.contains</code>, then inside the <code>@container</code> block set <code>.card{grid-template-columns:5rem 1fr;align-items:center}</code>. One component, two layouts, and NOT a media query in sight.",key:"container-type on the parent, @container on the child. The component responds to its own box — which is why it can be dropped anywhere.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:3,title:"Space on one scale — not arbitrary numbers",teach:"The fastest way a UI looks amateur is spacing picked ad hoc: 13px here, 7px there. Pick <b>one scale</b> and only ever use values from it. Four steps is enough: <b>8 / 16 / 24 / 32</b>.",html:'<div class="card"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter, with EMEA leading at 24% year over year.</p><div class="row"><button class="btn p">View report</button><button class="btn">Dismiss</button></div></div>',base:`body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}
.card{background:white;border:1px solid gainsboro;max-width:420px}
.card h3{margin:0}
.card p{margin:0}
.row{display:flex}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}
.btn.p{background:steelblue;border-color:steelblue;color:white}
`,css:`.card{padding:24px}
.card h3{margin-bottom:8px}
.card p{margin-bottom:24px}
.row{gap:8px}`,before:`.card{padding:13px}
.card h3{margin-bottom:7px}
.card p{margin-bottom:11px}
.row{gap:5px}`,after:`.card{padding:24px}
.card h3{margin-bottom:8px}
.card p{margin-bottom:24px}
.row{gap:8px}`,bdiff:[{t:".card{padding:13px}",k:"del"},{t:".card h3{margin-bottom:7px}",k:"del"},{t:".card p{margin-bottom:11px}",k:"del"},{t:".row{gap:5px}",k:"del"}],adiff:[{t:".card{padding:24px}",k:"add"},{t:".card h3{margin-bottom:8px}",k:"add"},{t:".card p{margin-bottom:24px}",k:"add"},{t:".row{gap:8px}",k:"add"}],why:"Four values, all snapped to the scale. Nothing else changed — and it already looks deliberate.",polish:!0,isjsx:!1,jsx:""},{stage:3,title:"Measure and line-height — text that reads",teach:"Two numbers do almost all typographic work. <b>Measure</b>: 60–75 characters per line (<code>max-width:65ch</code>). <b>Line-height</b>: ~1.5 body, ~1.2 headings. Over-long lines are the most common readability failure on the web.",html:'<div class="card"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter, with EMEA leading at 24% year over year.</p><div class="row"><button class="btn p">View report</button><button class="btn">Dismiss</button></div></div>',base:`body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}
.card{background:white;border:1px solid gainsboro;max-width:420px}
.card h3{margin:0}
.card p{margin:0}
.row{display:flex}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}
.btn.p{background:steelblue;border-color:steelblue;color:white}
.card{padding:24px}
.card h3{margin-bottom:8px}
.card p{margin-bottom:24px}
.row{gap:8px}
`,css:`.card{max-width:65ch}
.card p{line-height:1.6}`,before:`.card{max-width:420px}
.card p{line-height:1}`,after:`.card{max-width:65ch}
.card p{line-height:1.6}`,bdiff:[{t:".card{max-width:420px}",k:"del"},{t:".card p{line-height:1}",k:"del"}],adiff:[{t:".card{max-width:65ch}",k:"add"},{t:".card p{line-height:1.6}",k:"add"}],why:"Two properties. The paragraph stops being a wall and starts being prose.",polish:!0,isjsx:!1,jsx:""},{stage:3,title:"Hierarchy by weight and colour — not by size",teach:"Beginners scale font-size for every level and end up with six sizes fighting. Professionals hold size nearly constant and vary <b>weight</b> and <b>colour</b>. Two sizes, three weights, two greys is a complete hierarchy.<br><br>The <b>left card is the control</b> — everything at one size and weight. Change only the right card and watch the two diverge.",html:'<div class="pair"><div class="card ctl"><p class="lab">before</p><p class="e">Finance</p><h3>Quarterly report</h3><p class="b">Revenue grew across every region.</p><p class="m">Updated 2 hours ago</p></div><div class="card"><p class="lab">after — your CSS</p><p class="eyebrow">Finance</p><h3>Quarterly report</h3><p class="body">Revenue grew across every region.</p><p class="meta">Updated 2 hours ago</p></div></div>',base:`body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}
.card{background:white;border:1px solid gainsboro;max-width:420px}
.card h3{margin:0}
.card p{margin:0}
.row{display:flex}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}
.btn.p{background:steelblue;border-color:steelblue;color:white}

.card p{margin:0}
.card h3{margin:0}

.pair{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr))}
.card{padding:1.25rem;background:white;border:1px solid gainsboro;border-radius:.5rem}
.card p{margin:0}.card h3{margin:0}
.lab{font:700 .62rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin-bottom:.5rem!important}
.pair .card.ctl .e,.pair .card.ctl h3,.pair .card.ctl .b,.pair .card.ctl .m{font-size:20px!important;font-weight:400!important;color:black!important;letter-spacing:normal!important;text-transform:none!important}
`,css:`.eyebrow{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:dimgray}
.card h3{font-size:20px;font-weight:600;margin:4px 0 8px}
.body{font-size:15px;color:black}
.meta{font-size:13px;color:darkgray;margin-top:12px}`,before:`.eyebrow{font-size:20px}
.card h3{font-size:34px}
.body{font-size:18px}
.meta{font-size:16px}`,after:`.eyebrow{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:dimgray}
.card h3{font-size:20px;font-weight:600;margin:4px 0 8px}
.body{font-size:15px;color:black}
.meta{font-size:13px;color:darkgray;margin-top:12px}`,bdiff:[{t:".eyebrow{font-size:20px}",k:"del"},{t:".card h3{font-size:34px}",k:"del"},{t:".body{font-size:18px}",k:"del"},{t:".meta{font-size:16px}",k:"del"}],adiff:[{t:".eyebrow{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:dimgray}",k:"add"},{t:".card h3{font-size:20px;font-weight:600;margin:4px 0 8px}",k:"add"},{t:".body{font-size:15px;color:black}",k:"add"},{t:".meta{font-size:13px;color:darkgray;margin-top:12px}",k:"add"}],why:"Same words, same markup. All the hierarchy now comes from weight, colour and letter-spacing.",polish:!0,isjsx:!1,jsx:"",task:"Give the right card a real hierarchy: eyebrow <code>12px/700/uppercase</code> with <code>letter-spacing:.08em</code> and <code>color:dimgray</code> · h3 <code>20px/600</code> · body <code>15px</code> · meta <code>13px</code> and <code>color:darkgray</code>. Same words, same markup — compare against the left."},{stage:3,title:"Two shadows, used as elevation",teach:"Not ten shadows — <b>two</b>. A small one for resting cards, a larger one for things that float (menus, modals). Low opacity, offset downward: light comes from above.",html:'<div class="card"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter, with EMEA leading at 24% year over year.</p><div class="row"><button class="btn p">View report</button><button class="btn">Dismiss</button></div></div>',base:`body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}
.card{background:white;border:1px solid gainsboro;max-width:420px}
.card h3{margin:0}
.card p{margin:0}
.row{display:flex}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}
.btn.p{background:steelblue;border-color:steelblue;color:white}
.card{padding:24px;max-width:420px}
.card h3{margin-bottom:8px}
.card p{margin-bottom:24px}
.row{gap:8px}
`,css:`.card{box-shadow:0 1px 2px rgb(0 0 0 / .05),
              0 4px 12px rgb(0 0 0 / .06)}`,before:".card{box-shadow:0 0 20px rgb(0 0 0 / .45)}",after:`.card{box-shadow:0 1px 2px rgb(0 0 0 / .05),
              0 4px 12px rgb(0 0 0 / .06)}`,bdiff:[{t:".card{box-shadow:0 0 20px rgb(0 0 0 / .45)}",k:"del"}],adiff:[{t:".card{box-shadow:0 1px 2px rgb(0 0 0 / .05),",k:"add"},{t:"              0 4px 12px rgb(0 0 0 / .06)}",k:"add"}],why:"Two soft layers beat one heavy blur. A tight shadow for the edge, a wide one for the lift.",polish:!0,isjsx:!1,jsx:""},{stage:3,title:"Radius consistency — and the nesting rule",teach:"Pick one radius, use it everywhere. When a rounded thing sits inside another rounded thing the inner radius must be <b>smaller</b> or the corners fight. Rule of thumb: <b>inner = outer − padding</b>.",html:'<div class="card"><div class="inner">Nested block</div></div>',base:`body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}
.card{background:white;border:1px solid gainsboro;max-width:420px}
.card h3{margin:0}
.card p{margin:0}
.row{display:flex}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}
.btn.p{background:steelblue;border-color:steelblue;color:white}
.card{padding:12px;max-width:420px}
.inner{background:aliceblue;padding:16px}
`,css:`.card{border-radius:12px}
.inner{border-radius:6px}`,before:`.card{border-radius:12px}
.inner{border-radius:12px}`,after:`.card{border-radius:12px}
.inner{border-radius:6px}`,bdiff:[{t:".card{border-radius:12px}",k:"same"},{t:".inner{border-radius:12px}",k:"del"}],adiff:[{t:".card{border-radius:12px}",k:"same"},{t:".inner{border-radius:6px}",k:"add"}],why:"One number changed. The corners stop competing. Same rule for buttons inside cards.",polish:!0,isjsx:!1,jsx:""},{stage:3,title:"Borders: hairline, and tinted rather than grey",teach:"A 2px mid-grey border is louder than it needs to be. Go 1px and tint it — a translucent black sits on any background. The UI gets calmer without losing structure.",html:'<div class="card"><h3>Quarterly report</h3><p>Revenue grew across every region.</p></div>',base:`body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}
.card{background:white;border:1px solid gainsboro;max-width:420px}
.card h3{margin:0}
.card p{margin:0}
.row{display:flex}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}
.btn.p{background:steelblue;border-color:steelblue;color:white}
.card{padding:24px;max-width:420px}
.card h3{margin-bottom:8px}
`,css:".card{border:1px solid rgb(0 0 0 / .08)}",before:".card{border:2px solid gray}",after:".card{border:1px solid rgb(0 0 0 / .08)}",bdiff:[{t:".card{border:2px solid gray}",k:"del"}],adiff:[{t:".card{border:1px solid rgb(0 0 0 / .08)}",k:"add"}],why:"Half the weight, a tenth the noise. Often you can drop the border entirely and let a shadow do the work.",polish:!0,isjsx:!1,jsx:""},{stage:3,title:"Transitions — 150ms, on interactive things only",teach:"Motion signals 'this responds to you'. Keep it short (120–200ms), and put it ONLY on interactive elements. Never transition <code>all</code> — name the properties you mean.",html:'<div class="row"><button class="btn p">Hover me</button><button class="btn">And me</button></div>',base:`body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}
.card{background:white;border:1px solid gainsboro;max-width:420px}
.card h3{margin:0}
.card p{margin:0}
.row{display:flex}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}
.btn.p{background:steelblue;border-color:steelblue;color:white}
.row{gap:8px}
.btn.p:hover{background:royalblue}
.btn:hover{background:whitesmoke}
`,css:`.btn{transition:background-color 150ms ease,
                border-color 150ms ease}`,before:".btn{}",after:`.btn{transition:background-color 150ms ease,
                border-color 150ms ease}`,bdiff:[{t:".btn{}",k:"del"}],adiff:[{t:".btn{transition:background-color 150ms ease,",k:"add"},{t:"                border-color 150ms ease}",k:"add"}],why:"One line. Hover both buttons before and after — the difference is the whole feel of the control.",polish:!0,isjsx:!1,jsx:""},{stage:3,title:"Affordance — hover, active, focus, accent-color",teach:"Three states make a control feel real: <b>hover</b> (shift the colour), <b>active</b> (nudge 1px down), <b>focus-visible</b> (a ring). And <code>accent-color</code> themes native checkboxes and radios in a single line.",html:'<div class="row"><button class="btn p">Save</button><label class="chk"><input type="checkbox" checked> Notify me</label></div>',base:`body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}
.card{background:white;border:1px solid gainsboro;max-width:420px}
.card h3{margin:0}
.card p{margin:0}
.row{display:flex}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}
.btn.p{background:steelblue;border-color:steelblue;color:white}
.row{gap:16px;align-items:center}
.chk{display:flex;align-items:center;gap:8px;font-size:14px}
.btn{transition:background-color 150ms ease}
`,css:`body{accent-color:steelblue}
.btn.p:hover{background:color-mix(in oklch,steelblue 85%,black)}
.btn.p:active{transform:translateY(1px)}
.btn:focus-visible{outline:2px solid steelblue;outline-offset:2px}`,before:`body{}
.btn.p:hover{}
.btn.p:active{}
.btn:focus-visible{}`,after:`body{accent-color:steelblue}
.btn.p:hover{background:color-mix(in oklch,steelblue 85%,black)}
.btn.p:active{transform:translateY(1px)}
.btn:focus-visible{outline:2px solid steelblue;outline-offset:2px}`,bdiff:[{t:"body{}",k:"del"},{t:".btn.p:hover{}",k:"del"},{t:".btn.p:active{}",k:"del"},{t:".btn:focus-visible{}",k:"del"}],adiff:[{t:"body{accent-color:steelblue}",k:"add"},{t:".btn.p:hover{background:color-mix(in oklch,steelblue 85%,black)}",k:"add"},{t:".btn.p:active{transform:translateY(1px)}",k:"add"},{t:".btn:focus-visible{outline:2px solid steelblue;outline-offset:2px}",k:"add"}],why:"Click into the preview and press Tab. Four rules and the control finally feels like a control.",polish:!0,isjsx:!1,jsx:""},{stage:3,title:"Respect the user — reduced motion and colour-scheme",teach:"Two rules that cost nothing and mark you as someone who ships real products. <code>prefers-reduced-motion</code> honours people who get sick from animation. <code>color-scheme</code> makes native controls and scrollbars match your theme.",html:'<div class="card"><h3>Settings</h3><p>Native controls follow color-scheme.</p><input class="in" placeholder="Type here"><div class="row"><button class="btn p">Save</button></div></div>',base:`body{font:16px system-ui;background:whitesmoke;padding:16px;color:black}
.card{background:white;border:1px solid gainsboro;max-width:420px}
.card h3{margin:0}
.card p{margin:0}
.row{display:flex}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;padding:8px 16px;border-radius:6px}
.btn.p{background:steelblue;border-color:steelblue;color:white}
.card{padding:24px;max-width:420px}
.card h3{margin-bottom:8px}
.card p{margin-bottom:16px}
.in{width:100%;padding:8px 12px;border:1px solid gainsboro;border-radius:6px;font:inherit;margin-bottom:16px}
`,css:`:root{color-scheme:light dark}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.01ms !important;
    transition-duration:.01ms !important}
}`,before:"/* nothing yet */",after:`:root{color-scheme:light dark}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.01ms !important;
    transition-duration:.01ms !important}
}`,bdiff:[{t:"/* nothing yet */",k:"del"}],adiff:[{t:":root{color-scheme:light dark}",k:"add"},{t:"@media (prefers-reduced-motion:reduce){",k:"add"},{t:"  *{animation-duration:.01ms !important;",k:"add"},{t:"    transition-duration:.01ms !important}",k:"add"},{t:"}",k:"add"}],why:"Two rules, zero visual cost in the default case, and a real difference for people who need them.",polish:!0,isjsx:!1,jsx:""},{stage:35,title:"Why rem exists — it is an accessibility feature, not a style choice",teach:"<code>rem</code> = <b>r</b>oot <b>em</b> = relative to the <code>&lt;html&gt;</code> font-size, which defaults to 16px. When a user raises their browser's default font size — and a lot of people do — <b>everything in rem scales and everything in px ignores them</b>. That is the whole argument. It is not aesthetics.",html:'<div class="sim"><p class="lab">Simulating a user who set their browser font to 20px:</p><div class="card"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter.</p><button class="btn">View report</button></div></div>',base:`body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}
.card{background:white;border:1px solid gainsboro;max-width:26rem}
.card h3{margin:0 0 .5rem}
.card p{margin:0 0 1rem;color:dimgray}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}
.sim{font-size:20px}
.lab{font-size:.75rem;color:dimgray;margin:0 0 .75rem}
`,css:`.card{padding:1.5rem}
.card h3{font-size:1.25rem}
.card p{font-size:.9375rem}
.btn{padding:.5rem 1rem;font-size:.875rem}`,before:`.card{padding:24px}
.card h3{font-size:20px}
.card p{font-size:15px}
.btn{padding:8px 16px;font-size:14px}`,after:`.card{padding:1.5rem}
.card h3{font-size:1.25rem}
.card p{font-size:.9375rem}
.btn{padding:.5rem 1rem;font-size:.875rem}`,bdiff:[{t:".card{padding:24px}",k:"del"},{t:".card h3{font-size:20px}",k:"del"},{t:".card p{font-size:15px}",k:"del"},{t:".btn{padding:8px 16px;font-size:14px}",k:"del"}],adiff:[{t:".card{padding:1.5rem}",k:"add"},{t:".card h3{font-size:1.25rem}",k:"add"},{t:".card p{font-size:.9375rem}",k:"add"},{t:".btn{padding:.5rem 1rem;font-size:.875rem}",k:"add"}],why:"The container is simulating a 20px root. Flip the toggle: the px version stays stubbornly small; the rem version respects the user.",polish:!0,isjsx:!1,jsx:""},{stage:35,title:"The rem scale you memorise once",teach:"At the default 16px root the maths is clean, and it lands exactly on the 8/16/24/32 spacing scale you already know. Learn these seven and you never convert again:<br><br><code>.25rem=4 · .5rem=8 · .75rem=12 · <b>1rem=16</b> · 1.5rem=24 · 2rem=32 · 3rem=48</code>",html:'<div class="stack"><div class="row s1">.5rem</div><div class="row s2">1rem</div><div class="row s3">1.5rem</div><div class="row s4">2rem</div></div>',base:`body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}
.card{background:white;border:1px solid gainsboro;max-width:26rem}
.card h3{margin:0 0 .5rem}
.card p{margin:0 0 1rem;color:dimgray}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}
.stack{display:flex;flex-direction:column;gap:.5rem}
.row{background:steelblue;color:white;border-radius:.375rem;font:600 .875rem system-ui}
`,css:`.s1{padding:.5rem}
.s2{padding:1rem}
.s3{padding:1.5rem}
.s4{padding:2rem}`,before:`.s1{padding:8px}
.s2{padding:16px}
.s3{padding:24px}
.s4{padding:32px}`,after:`.s1{padding:.5rem}
.s2{padding:1rem}
.s3{padding:1.5rem}
.s4{padding:2rem}`,bdiff:[{t:".s1{padding:8px}",k:"del"},{t:".s2{padding:16px}",k:"del"},{t:".s3{padding:24px}",k:"del"},{t:".s4{padding:32px}",k:"del"}],adiff:[{t:".s1{padding:.5rem}",k:"add"},{t:".s2{padding:1rem}",k:"add"},{t:".s3{padding:1.5rem}",k:"add"},{t:".s4{padding:2rem}",k:"add"}],why:"Identical rendering at the default root — but only one version survives a user who changes their font size. Same pixels today, different behaviour tomorrow.",polish:!0,isjsx:!1,jsx:""},{stage:35,title:"em — relative to THIS element, and it compounds",teach:"<code>em</code> is relative to the <i>current element's</i> font-size, so it <b>multiplies when nested</b> — that is the footgun. But it is also exactly what you want for padding inside a control: <code>padding:.5em 1em</code> makes a button's padding scale with its own text, so one rule works for small and large buttons.",html:'<div class="cluster"><button class="btn sm">Small</button><button class="btn">Normal</button><button class="btn lg">Large</button></div>',base:`body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}
.card{background:white;border:1px solid gainsboro;max-width:26rem}
.card h3{margin:0 0 .5rem}
.card p{margin:0 0 1rem;color:dimgray}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}
.cluster{display:flex;gap:.75rem;align-items:center}
.sm{font-size:.75rem}
.lg{font-size:1.25rem}
`,css:".btn{padding:.5em 1em}",before:".btn{padding:8px 16px}",after:".btn{padding:.5em 1em}",bdiff:[{t:".btn{padding:8px 16px}",k:"del"}],adiff:[{t:".btn{padding:.5em 1em}",k:"add"}],why:"One rule, three sizes. With px all three get identical padding and the large button looks cramped; with em the padding follows the text.",polish:!0,isjsx:!1,jsx:""},{stage:35,title:"Where px still wins — do not cargo-cult",teach:'"Never use px" is folklore. Some things should <b>not</b> scale with text: hairline borders, shadow offsets and blurs, and 1px dividers. A 1px border in rem becomes 2px at large font settings and the UI looks heavier for no reason. <b>Rule: type and space in rem, hairlines and shadows in px.</b>',html:'<div class="card"><h3>Quarterly report</h3><p>Revenue grew across every region this quarter.</p><button class="btn">View report</button></div>',base:`body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}
.card{background:white;border:1px solid gainsboro;max-width:26rem}
.card h3{margin:0 0 .5rem}
.card p{margin:0 0 1rem;color:dimgray}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}
.card{padding:1.5rem}
.card h3{font-size:1.25rem}
.btn{padding:.5em 1em}
`,css:`.card{border:1px solid gainsboro;
      box-shadow:0 1px 2px rgb(0 0 0 / .05)}`,before:`.card{border:.0625rem solid gainsboro;
      box-shadow:0 .0625rem .125rem rgb(0 0 0 / .05)}`,after:`.card{border:1px solid gainsboro;
      box-shadow:0 1px 2px rgb(0 0 0 / .05)}`,bdiff:[{t:".card{border:.0625rem solid gainsboro;",k:"del"},{t:"      box-shadow:0 .0625rem .125rem rgb(0 0 0 / .05)}",k:"del"}],adiff:[{t:".card{border:1px solid gainsboro;",k:"add"},{t:"      box-shadow:0 1px 2px rgb(0 0 0 / .05)}",k:"add"}],why:"Both look identical here. The px version stays a true hairline at any zoom level; the rem version thickens. Keep hairlines in px on purpose, and be able to say why.",polish:!0,isjsx:!1,jsx:""},{stage:35,title:"Viewport units — and the two traps",teach:"<code>vh</code>/<code>vw</code> are 1% of the viewport. Two traps: <b>(1)</b> <code>100vh</code> is wrong on mobile — it ignores the browser chrome, so content hides behind it. Use <code>100dvh</code> (dynamic). <b>(2)</b> <code>width:100vw</code> includes the scrollbar and causes horizontal overflow. Use <code>100%</code>, or <code>inset:0</code> for overlays.",html:'<div class="hero"><div class="card"><h3>Centred hero</h3><p>Resize the preview height.</p></div></div>',base:`body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}
.card{background:white;border:1px solid gainsboro;max-width:26rem}
.card h3{margin:0 0 .5rem}
.card p{margin:0 0 1rem;color:dimgray}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}
.hero{display:grid;place-items:center;background:aliceblue;border-radius:.5rem}
`,css:`.hero{min-height:60dvh;
      width:100%}`,before:`.hero{min-height:60vh;
      width:100vw}`,after:`.hero{min-height:60dvh;
      width:100%}`,bdiff:[{t:".hero{min-height:60vh;",k:"del"},{t:"      width:100vw}",k:"del"}],adiff:[{t:".hero{min-height:60dvh;",k:"add"},{t:"      width:100%}",k:"add"}],why:"Same result on desktop. On a phone the first version puts content under the URL bar and produces a sideways scroll. Two characters of difference.",polish:!0,isjsx:!1,jsx:""},{stage:35,title:"clamp() — fluid type, no media query, zoom still works",teach:"<code>clamp(min, preferred, max)</code>. Put a <b>rem floor</b> and a <b>rem ceiling</b> around a <code>vw</code> middle and you get type that scales with the viewport but never gets unreadably small or absurdly large.<br><br><b>Never size text in raw <code>vw</code>.</b> It makes browser zoom do nothing — a genuine accessibility failure.",html:'<div class="mark"><span>1.25rem floor</span></div><div class="card"><h3 class="fluid">Fluid heading</h3><p>Drag the preview edge from narrow to wide.</p></div><div class="mark big"><span>2rem ceiling</span></div><p class="hint2">Drag the preview edge. The text scales between the two marks and never past them.</p>',base:`body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}
.card{background:white;border:1px solid gainsboro;max-width:26rem}
.card h3{margin:0 0 .5rem}
.card p{margin:0 0 1rem;color:dimgray}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}
.card{padding:1.5rem}

.mark{height:1.25rem;border-left:2px solid crimson;padding-left:.4rem;margin:.35rem 0;position:relative}
.mark.big{height:2rem}
.mark span{font:600 .65rem system-ui;color:crimson;position:absolute;top:0;left:.5rem}
.hint2{font:.7rem/1.4 system-ui;color:dimgray;margin:.6rem 0 0}
`,css:".fluid{font-size:clamp(1.25rem, 1rem + 2vw, 2rem)}",before:".fluid{font-size:4vw}",after:".fluid{font-size:clamp(1.25rem, 1rem + 2vw, 2rem)}",bdiff:[{t:".fluid{font-size:4vw}",k:"del"}],adiff:[{t:".fluid{font-size:clamp(1.25rem, 1rem + 2vw, 2rem)}",k:"add"}],why:"Drag the preview. Raw vw keeps shrinking past readable and kills zoom; clamp holds a floor and a ceiling. The `1rem +` part keeps it zoom-responsive.",polish:!0,isjsx:!1,jsx:""},{stage:35,title:"Breakpoints and measure — em and ch",teach:`Two more relative units earn their place. <b>Media queries in <code>em</code></b> (not px) so breakpoints respect the user's font size — <code>@media (min-width:40em)</code> = 640px at default. And <b><code>ch</code></b> for line length: <code>max-width:65ch</code> is literally "65 characters wide", which is the readability target.<br><br>The <b>top card has no measure</b> — full width, however wide the pane is. Yours is below it.`,html:'<div class="pair"><div class="card wide"><p class="lab">no measure</p><p>The ideal line length is 60 to 75 characters. Setting a max-width in ch expresses that directly, instead of guessing at a pixel value that only happens to be right for one font size and one screen.</p></div><div class="card"><p class="lab">your CSS</p><p>The ideal line length is 60 to 75 characters. Setting a max-width in ch expresses that directly, instead of guessing at a pixel value that only happens to be right for one font size and one screen.</p></div></div>',base:`body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}
.card{background:white;border:1px solid gainsboro;max-width:26rem}
.card h3{margin:0 0 .5rem}
.card p{margin:0 0 1rem;color:dimgray}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}
.card{padding:1.5rem}

.pair{display:grid;gap:1rem}
.card{padding:1.25rem;background:white;border:1px solid gainsboro;border-radius:.5rem}
.card p{margin:0}.pair .card.wide{max-width:none!important}
.lab{font:700 .62rem system-ui;letter-spacing:.08em;text-transform:uppercase;color:crimson;margin-bottom:.5rem!important}
`,css:`.card{max-width:65ch}
@media (min-width:40em){
  .card{padding:2rem}
}`,before:`.card{max-width:640px}
@media (min-width:640px){
  .card{padding:32px}
}`,after:`.card{max-width:65ch}
@media (min-width:40em){
  .card{padding:2rem}
}`,bdiff:[{t:".card{max-width:640px}",k:"del"},{t:"@media (min-width:640px){",k:"del"},{t:"  .card{padding:32px}",k:"del"},{t:"}",k:"same"}],adiff:[{t:".card{max-width:65ch}",k:"add"},{t:"@media (min-width:40em){",k:"add"},{t:"  .card{padding:2rem}",k:"add"},{t:"}",k:"same"}],why:"ch says what you mean. em breakpoints move with the user's font size — px breakpoints do not.",polish:!0,isjsx:!1,jsx:""},{stage:35,title:"The whole rule, on one line",teach:"<b>Type and space in <code>rem</code>. Component-internal padding in <code>em</code>. Line length in <code>ch</code>. Full-height in <code>dvh</code>. Fluid type in <code>clamp()</code> with rem bounds. Hairlines and shadows stay <code>px</code>.</b><br><br>That is the entire unit system. Everything below is that sentence applied.",html:'<div class="card"><h3 class="fluid">Unit system</h3><p>Everything here follows the one-line rule.</p><button class="btn">Action</button></div>',base:`body{font:16px system-ui;background:whitesmoke;color:black;padding:1rem}
.card{background:white;border:1px solid gainsboro;max-width:26rem}
.card h3{margin:0 0 .5rem}
.card p{margin:0 0 1rem;color:dimgray}
.btn{border:1px solid gainsboro;background:white;font:inherit;cursor:pointer;border-radius:.375rem}
`,css:`.card{max-width:65ch;padding:1.5rem;border:1px solid gainsboro;border-radius:.5rem}
.fluid{font-size:clamp(1.125rem, 1rem + 1vw, 1.5rem)}
.card p{max-width:65ch}
.btn{padding:.5em 1em}`,before:`.card{max-width:400px;padding:24px;border:1px solid gainsboro;border-radius:8px}
.fluid{font-size:22px}
.card p{max-width:600px}
.btn{padding:8px 16px}`,after:`.card{max-width:65ch;padding:1.5rem;border:1px solid gainsboro;border-radius:.5rem}
.fluid{font-size:clamp(1.125rem, 1rem + 1vw, 1.5rem)}
.card p{max-width:65ch}
.btn{padding:.5em 1em}`,bdiff:[{t:".card{max-width:400px;padding:24px;border:1px solid gainsboro;border-radius:8px}",k:"del"},{t:".fluid{font-size:22px}",k:"del"},{t:".card p{max-width:600px}",k:"del"},{t:".btn{padding:8px 16px}",k:"del"}],adiff:[{t:".card{max-width:65ch;padding:1.5rem;border:1px solid gainsboro;border-radius:.5rem}",k:"add"},{t:".fluid{font-size:clamp(1.125rem, 1rem + 1vw, 1.5rem)}",k:"add"},{t:".card p{max-width:65ch}",k:"add"},{t:".btn{padding:.5em 1em}",k:"add"}],why:"One component, every rule applied. Note the border stayed px on purpose — that is the part most people get wrong in the other direction.",polish:!0,isjsx:!1,jsx:""},{stage:4,title:"Centred card — <code>cover</code> + <code>box</code>",teach:"Two classes. <code>cover</code> centres on both axes; <code>box</code> is the card. The old version needed six declarations.",html:'<div class="cover"><div class="box stack" style="max-width:22rem"><h3 style="margin:0">Sign in</h3><p class="muted" style="margin:0">Use your work email.</p><input class="input" placeholder="you@company.com"><button class="btn" data-v="primary">Continue</button></div></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.stack > * + *{margin-block-start:var(--space,var(--m))}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}
.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}
.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}
.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}
.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}
.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}
.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}
.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}
.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}
.muted{color:var(--muted)}
`,css:`/* Nothing. Both classes already exist. */
`,task:"Delete <code>cover</code> from the outer div — it drops to the top-left. Put it back.",key:"cover = centred. box = card. stack = rhythm inside. Zero new CSS.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:4,title:"Action bar — <code>between</code> + <code>cluster</code>",teach:"<code>between</code> pushes the two halves apart and wraps; <code>cluster</code> keeps the buttons together. That is the whole toolbar.",html:'<div class="between box"><strong>Team members</strong><div class="cluster"><input class="input" style="width:auto" placeholder="Search…"><button class="btn">Filter</button><button class="btn" data-v="primary">Invite</button></div></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.stack > * + *{margin-block-start:var(--space,var(--m))}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}
.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}
.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}
.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}
.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}
.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}
.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}
.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}
.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}
.muted{color:var(--muted)}
`,css:`/* Nothing. */
`,task:"Drag the preview narrow — it wraps on its own. Then swap <code>between</code> for <code>cluster</code> and see the difference.",key:"between = pushed apart. cluster = held together. Both wrap by default.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:4,title:"App shell — <code>sidebar</code>, and no media query",teach:"The old version needed grid-template-areas plus a breakpoint. <code>sidebar</code> collapses on its own, based on its <b>own</b> width rather than the viewport's.",html:'<div class="sidebar"><div class="box stack"><strong>Filters</strong><p class="muted" style="margin:0">Status</p><p class="muted" style="margin:0">Owner</p></div><div class="box stack"><strong>Results</strong><p class="muted" style="margin:0">Drag the preview edge — it stacks itself.</p></div></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.stack > * + *{margin-block-start:var(--space,var(--m))}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}
.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}
.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}
.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}
.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}
.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}
.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}
.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}
.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}
.muted{color:var(--muted)}
`,css:`/* Nothing. Try --side:8rem on the wrapper. */
`,task:'Add <code>style="--side:8rem"</code> to the <code>.sidebar</code> div — the fixed side narrows without touching CSS.',key:"sidebar = self-collapsing two-column. --side tunes it per instance.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:4,title:"Card grid — <code>grid-auto</code>",teach:"One class. <code>--col</code> tunes the minimum column width per instance, so you never write a second grid rule.",html:'<div class="grid-auto"><div class="box stack"><p class="muted" style="margin:0;font-size:.8125rem">Metric 1</p><strong style="font-size:1.25rem">1,240</strong></div><div class="box stack"><p class="muted" style="margin:0;font-size:.8125rem">Metric 2</p><strong style="font-size:1.25rem">1,240</strong></div><div class="box stack"><p class="muted" style="margin:0;font-size:.8125rem">Metric 3</p><strong style="font-size:1.25rem">1,240</strong></div><div class="box stack"><p class="muted" style="margin:0;font-size:.8125rem">Metric 4</p><strong style="font-size:1.25rem">1,240</strong></div></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.stack > * + *{margin-block-start:var(--space,var(--m))}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}
.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}
.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}
.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}
.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}
.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}
.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}
.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}
.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}
.muted{color:var(--muted)}
`,css:`/* Nothing. */
`,task:'Add <code>style="--col:8rem"</code> to the grid — more, narrower columns. Then <code>--col:20rem</code>.',key:"grid-auto = responsive cards, one class, tuned by --col.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:4,title:"Equal columns — <code>switcher</code>",teach:"Pricing tables, feature triplets, stat rows. All children stay equal until the container is too narrow, then each takes a full line.",html:'<div class="switcher"><div class="box stack"><strong>Starter</strong><p class="muted" style="margin:0">From $9/mo</p><button class="btn" data-v="primary">Choose</button></div><div class="box stack"><strong>Team</strong><p class="muted" style="margin:0">From $29/mo</p><button class="btn" data-v="primary">Choose</button></div><div class="box stack"><strong>Scale</strong><p class="muted" style="margin:0">From $99/mo</p><button class="btn" data-v="primary">Choose</button></div></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.stack > * + *{margin-block-start:var(--space,var(--m))}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}
.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}
.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}
.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}
.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}
.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}
.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}
.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}
.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}
.muted{color:var(--muted)}
`,css:`/* Nothing. */
`,task:'Add <code>style="--threshold:16rem"</code> to the switcher and drag — it now switches at a different width.',key:"switcher = equal-or-stacked, container-relative, one line of maths, no breakpoint.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:4,title:"The whole screen — every primitive at once",teach:"Read the class attributes top to bottom. That is where the layout lives now; the CSS pane below is empty on purpose.",html:'<div class="stack"><div class="between box"><strong>Dashboard</strong><div class="cluster"><input class="input" style="width:auto" placeholder="Search…"><button class="btn" data-v="primary">New</button></div></div><div class="sidebar"><div class="box stack"><strong>Filters</strong><p class="muted" style="margin:0">Status</p><p class="muted" style="margin:0">Owner</p></div><div class="grid-auto"><div class="box stack"><p class="muted" style="margin:0;font-size:.8125rem">Metric 1</p><strong style="font-size:1.25rem">1,240</strong></div><div class="box stack"><p class="muted" style="margin:0;font-size:.8125rem">Metric 2</p><strong style="font-size:1.25rem">1,240</strong></div><div class="box stack"><p class="muted" style="margin:0;font-size:.8125rem">Metric 3</p><strong style="font-size:1.25rem">1,240</strong></div><div class="box stack"><p class="muted" style="margin:0;font-size:.8125rem">Metric 4</p><strong style="font-size:1.25rem">1,240</strong></div></div></div></div>',base:`:root{--ink:black;--muted:dimgray;--line:gainsboro;--surface:white;--bg:whitesmoke;--brand:steelblue;--s:.5rem;--m:1rem;--l:1.5rem;--xl:2rem;--round:.5rem}
body{margin:0;font:1rem/1.5 system-ui;color:var(--ink);background:var(--bg);padding:.5rem}
.stack > * + *{margin-block-start:var(--space,var(--m))}
.cluster{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center}
.between{display:flex;flex-wrap:wrap;gap:var(--m);align-items:center;justify-content:space-between}
.sidebar{display:flex;flex-wrap:wrap;gap:var(--m)}
.sidebar > :first-child{flex-basis:var(--side,12rem);flex-grow:1}
.sidebar > :last-child{flex-basis:0;flex-grow:999;min-inline-size:var(--min,50%)}
.switcher{display:flex;flex-wrap:wrap;gap:var(--m)}
.switcher > *{flex-grow:1;flex-basis:calc((var(--threshold,24rem) - 100%) * 999)}
.grid-auto{display:grid;gap:var(--m);grid-template-columns:repeat(auto-fit,minmax(var(--col,12rem),1fr))}
.center{margin-inline:auto;max-width:var(--measure,65ch);padding-inline:var(--m)}
.cover{display:grid;place-items:center;min-block-size:var(--min,14rem)}
.box{background:var(--surface);border:1px solid var(--line);border-radius:var(--round);padding:var(--m)}
.btn{padding:.5em 1em;border:1px solid var(--line);border-radius:var(--round);background:var(--surface);font:inherit;cursor:pointer}
.btn[data-v=primary]{background:var(--brand);border-color:var(--brand);color:white;font-weight:500}
.input{width:100%;padding:.5em .75em;border:1px solid var(--line);border-radius:var(--round);font:inherit}
.muted{color:var(--muted)}
`,css:`/* Empty. This entire screen needs no component CSS. */
`,task:"Add <code>:root{--m:1.5rem}</code> and watch the whole page re-space from one edit.",key:"Five words carried an entire dashboard: stack · cluster · between · sidebar · grid-auto.",polish:!1,why:"",isjsx:!1,jsx:""},{stage:25,title:"JSX is not HTML — it is JavaScript that returns elements",teach:"Everything inside <code>return ( … )</code> is compiled to function calls. That is why it obeys JS rules, not HTML rules: <b>one root element</b>, every tag closed, and <code>{ }</code> drops you back into JavaScript.",jsx:`import React from 'react';

export default function App() {
  return (
    <div className="box">
      <h3>Hello</h3>
      <p className="muted">JSX compiles to function calls.</p>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Delete the wrapping <code>&lt;div&gt;</code> so there are two roots. Read the error — 'must have one parent element'. Then put it back.",key:"One root. Every tag closed. { } is an escape hatch back into JavaScript.",polish:!1,isjsx:!0},{stage:25,title:"className, not class — and why",teach:"<code>class</code> is a reserved word in JavaScript, so JSX uses <code>className</code>. Same for <code>for</code> → <code>htmlFor</code>. Everything else (<code>id</code>, <code>data-*</code>, <code>aria-*</code>) keeps its HTML name exactly.",jsx:`import React from 'react';

export default function App() {
  return (
    <div className="box stack">
      <label htmlFor="email">Email</label>
      <input id="email" className="input" type="email" aria-describedby="hint" />
      <p id="hint" className="muted">data-* and aria-* stay unchanged.</p>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Change <code>className</code> to <code>class</code> and watch the styling break. Note the self-closing <code>&lt;input /&gt;</code> — JSX requires the slash.",key:"className and htmlFor are the only two renames. Void elements MUST self-close: <input />, <img />, <br />.",polish:!1,isjsx:!0},{stage:25,title:"Composing classes — this is where your layout lives",teach:'You already own these. In JSX they go in <code>className</code>, space-separated, and they compose: <code>"box stack"</code> means a bordered card whose children are vertically spaced.',jsx:`import React from 'react';

export default function App() {
  return (
    <div className="stack">
      <div className="between box">
        <strong>Team</strong>
        <button className="btn" data-v="primary">Invite</button>
      </div>

      <div className="sidebar">
        <div className="box">Filters</div>
        <div className="grid-auto">
          <div className="box">One</div>
          <div className="box">Two</div>
          <div className="box">Three</div>
        </div>
      </div>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Read each className aloud: <code>stack</code> = vertical rhythm · <code>between</code> = pushed apart · <code>box</code> = card · <code>sidebar</code> = self-collapsing two-column · <code>grid-auto</code> = responsive cards. Now drag the preview narrow.",key:"stack · cluster · between · sidebar · switcher · center · grid-auto · box. Layout lives in className, not in new CSS.",polish:!1,isjsx:!0},{stage:25,title:"style={{ }} — the double brace, explained",teach:"The outer <code>{ }</code> means 'JavaScript here'. The inner <code>{ }</code> is an object literal. So it is not special syntax — it is an object inside an expression slot. Properties are <b>camelCase</b> and numbers are treated as px.",jsx:`import React from 'react';

export default function App() {
  return (
    <div className="box" style={{ maxWidth: '30rem' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Inline styles</h3>
      <p className="muted" style={{ marginBottom: 0 }}>
        backgroundColor, not background-color.
      </p>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Add <code>borderLeft: '.25rem solid steelblue'</code> to the outer div. Then try <code>background-color</code> and see it silently do nothing.",key:"Outer brace = expression. Inner brace = object. camelCase keys. Use it for one-off values only — real styling belongs in CSS.",polish:!1,isjsx:!0},{stage:25,title:".map() — rendering a list",teach:"A list is an array transformed into elements. <code>{ }</code> to enter JS, <code>.map()</code> to transform, and each item needs a <b>stable</b> <code>key</code> — the identity React uses to match elements across renders. Never the array index for a list that can reorder or delete.",jsx:`import React from 'react';

export default function App() {
  const people = [
    { id: 'a1', name: 'Asha', role: 'Design' },
    { id: 'b2', name: 'Ravi', role: 'Engineering' },
    { id: 'c3', name: 'Meera', role: 'Product' },
  ];

  return (
    <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {people.map(p => (
        <li className="between box" key={p.id}>
          <div>
            <strong>{p.name}</strong>
            <p className="muted" style={{ margin: 0, fontSize: '.875rem' }}>{p.role}</p>
          </div>
          <button className="btn">Message</button>
        </li>
      ))}
    </ul>
  );
}
`,css:"",html:"",base:"",task:"Add a fourth person. Then change <code>key={p.id}</code> to <code>key={i}</code> (add <code>, i</code> to the map params) — it still renders, which is exactly why the bug is so easy to ship.",key:"map returns an array of elements. key must be stable and unique — an id, never the index for a mutable list.",polish:!1,isjsx:!0},{stage:25,title:"Conditional rendering — && and the ternary",teach:"<code>{cond && <X/>}</code> renders X only when cond is truthy. <code>{cond ? <A/> : <B/>}</code> picks one. <b>The trap:</b> if cond is a <b>number</b> and it is 0, React prints the 0. Always coerce to a real boolean.",jsx:`import React from 'react';

export default function App() {
  const items = [];
  const loading = false;

  return (
    <div className="stack">
      {loading && <div className="box">Loading…</div>}

      {items.length > 0
        ? <div className="box">{items.length} results</div>
        : <div className="box muted">No results yet.</div>}

      <div className="box">items.length && … would print: {items.length && 'never seen'}</div>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Look at the last box — it prints <b>0</b>, not an empty space. That is the falsy-zero bleed. Fix it with <code>items.length > 0 &&</code>.",key:"&& with a NUMBER prints 0. Always `.length > 0 &&`. This is a top-5 MCQ trap and a real production bug.",polish:!1,isjsx:!0},{stage:25,title:"Fragments — grouping without a wrapper div",teach:"When you need one root but do not want an extra element in the DOM (it would break a grid or flex parent), use a fragment: <code>&lt;&gt; … &lt;/&gt;</code>.",jsx:`import React from 'react';

export default function App() {
  const Row = () => (
    <>
      <div className="box">A</div>
      <div className="box">B</div>
    </>
  );

  return (
    <div className="cluster">
      <Row />
      <div className="box">C</div>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Replace <code>&lt;&gt;…&lt;/&gt;</code> with a <code>&lt;div&gt;</code> and watch the cluster break — the wrapper becomes one flex item instead of two.",key:"Fragments group without adding a DOM node. Essential inside flex and grid parents.",polish:!1,isjsx:!0},{stage:25,title:"Putting it together — a real screen, no new CSS",teach:"Everything here is composed from classes you already have. Read it as: shell → bar → sidebar → grid → list. That is the whole job.",jsx:`import React from 'react';

export default function App() {
  const metrics = ['Revenue', 'Active users', 'Churn', 'NPS'];
  const rows = [
    { id: 1, name: 'Acme Corp', status: 'Active' },
    { id: 2, name: 'Globex', status: 'Trial' },
  ];

  return (
    <div className="stack">
      <div className="between box">
        <strong style={{ fontSize: '1.125rem' }}>Dashboard</strong>
        <div className="cluster">
          <input className="input" style={{ width: 'auto' }} placeholder="Search…" />
          <button className="btn" data-v="primary">New</button>
        </div>
      </div>

      <div className="sidebar">
        <div className="box stack">
          <strong>Filters</strong>
          {['Status', 'Owner', 'Region'].map(f => (
            <p className="muted" style={{ margin: 0 }} key={f}>{f}</p>
          ))}
        </div>

        <div className="stack">
          <div className="grid-auto">
            {metrics.map(m => (
              <div className="box stack" key={m}>
                <p className="muted" style={{ margin: 0, fontSize: '.8125rem' }}>{m}</p>
                <strong style={{ fontSize: '1.25rem' }}>1,240</strong>
              </div>
            ))}
          </div>

          <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {rows.map(r => (
              <li className="between box" key={r.id}>
                <strong>{r.name}</strong>
                <span className="muted">{r.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Change nothing first — drag the preview from wide to narrow and watch the sidebar and grid respond independently. Then add a fifth metric.",key:"Zero component CSS. Layout in className, data in .map(), structure in the return block. That is a machine-coding round.",polish:!1,isjsx:!0},{stage:26,title:"useState — the whole model in four lines",teach:"<code>const [value, setValue] = useState(initial)</code>. Calling <code>setValue</code> does two things: it stores the new value <b>and</b> asks React to run your component again. The screen is a function of state — you never touch the DOM.",jsx:`import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="box cluster">
      <button className="btn" onClick={() => setCount(count - 1)}>−</button>
      <strong style={{ minWidth: '3ch', textAlign: 'center' }}>{count}</strong>
      <button className="btn" data-v="primary" onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Add a Reset button that calls <code>setCount(0)</code>. Then try changing <code>count</code> directly with <code>count = 5</code> — nothing happens, because that does not tell React to re-render.",key:"State = memory + a re-render request. Never mutate state directly; always call the setter.",polish:!1,isjsx:!0},{stage:26,title:"The functional updater — and why two clicks can equal one",teach:"<code>setCount(count + 1)</code> reads <code>count</code> from <b>this</b> render's closure. Call it twice in one handler and both read the same stale value, so you get +1 not +2. <code>setCount(c => c + 1)</code> receives the latest value instead.",jsx:`import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const brokenTwice = () => { setCount(count + 1); setCount(count + 1); };
  const worksTwice  = () => { setCount(c => c + 1); setCount(c => c + 1); };

  return (
    <div className="box stack">
      <strong style={{ fontSize: '1.5rem' }}>{count}</strong>
      <div className="cluster">
        <button className="btn" onClick={brokenTwice}>+2 (broken)</button>
        <button className="btn" data-v="primary" onClick={worksTwice}>+2 (correct)</button>
      </div>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Click each button and watch the difference. This exact snippet is a top-5 MCQ trap and a real production bug.",key:"Two setState calls that read the current value both see the SAME value. Use the updater form whenever the next value depends on the previous one.",polish:!1,isjsx:!0},{stage:26,title:"Controlled inputs — the value comes from state",teach:"A controlled input has <code>value={state}</code> and <code>onChange</code> writing back. React owns the value; the DOM just displays it. That is why you can transform, validate or block input on the way through.",jsx:`import React, { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');

  return (
    <div className="box stack" style={{ maxWidth: '24rem' }}>
      <label htmlFor="n">Your name</label>
      <input id="n" className="input" value={name}
             onChange={e => setName(e.target.value)} />
      <p className="muted" style={{ margin: 0 }}>
        {name.length} characters
      </p>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Make it uppercase on the way in: <code>setName(e.target.value.toUpperCase())</code>. Then remove <code>onChange</code> entirely — the input freezes, because state never changes.",key:"value + onChange = controlled. Remove onChange and the field becomes read-only — a classic 'why can't I type' bug.",polish:!1,isjsx:!0},{stage:26,title:"Derived state — compute during render, never store it",teach:"If a value can be calculated from existing state, <b>calculate it</b>. Storing it in a second <code>useState</code> means two sources of truth that drift apart. This is the single most common architecture mistake in React.",jsx:`import React, { useState } from 'react';

export default function App() {
  const [items] = useState([
    { id: 1, label: 'Design review', done: true },
    { id: 2, label: 'Ship the build', done: false },
    { id: 3, label: 'Write tests', done: false },
  ]);
  const [query, setQuery] = useState('');

  // derived — no extra state
  const shown = items.filter(i => i.label.toLowerCase().includes(query.toLowerCase()));
  const remaining = items.filter(i => !i.done).length;

  return (
    <div className="stack" style={{ maxWidth: '26rem' }}>
      <input className="input" placeholder="Filter…" value={query}
             onChange={e => setQuery(e.target.value)} />
      <p className="muted" style={{ margin: 0 }}>{remaining} remaining</p>
      <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {shown.map(i => <li className="box" key={i.id}>{i.label}</li>)}
      </ul>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Note there is no <code>useState</code> for <code>shown</code> or <code>remaining</code>. Try adding one and keeping it in sync — you will feel why it is a trap.",key:"Derive, do not store. Two useStates that must agree will eventually disagree.",polish:!1,isjsx:!0},{stage:26,title:"Updating arrays immutably — add, remove, toggle",teach:"React compares by reference. Mutating an array with <code>push</code> keeps the same reference, so React sees no change and skips the re-render. Always produce a <b>new</b> array.",jsx:`import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([{ id: 1, text: 'First task', done: false }]);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), done: false }]);
    setText('');
  };
  const remove = id => setTodos(todos.filter(t => t.id !== id));
  const toggle = id => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div className="stack" style={{ maxWidth: '26rem' }}>
      <div className="cluster">
        <input className="input" value={text} placeholder="New task"
               onChange={e => setText(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && add()} />
        <button className="btn" data-v="primary" onClick={add}>Add</button>
      </div>
      <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {todos.map(t => (
          <li className="between box" key={t.id}>
            <label className="cluster" style={{ gap: '.5rem' }}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
            </label>
            <button className="btn" onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p className="muted">Nothing left. Add a task.</p>}
    </div>
  );
}
`,css:"",html:"",base:"",task:"Replace <code>setTodos([...todos, …])</code> with <code>todos.push(…); setTodos(todos)</code> — the item is added to the array but the screen never updates. That is the reference bug, live.",key:"add = [...xs, n] · remove = xs.filter() · toggle = xs.map(). Three lines cover every list CRUD you will be asked for.",polish:!1,isjsx:!0},{stage:26,title:"useEffect — for things outside React, with cleanup",teach:"Effects are for the outside world: timers, subscriptions, network. The <b>return</b> is the cleanup and it runs before the next effect and on unmount. A timer without cleanup is a memory leak and a doubled interval.",jsx:`import React, { useState, useEffect } from 'react';

export default function App() {
  const [secs, setSecs] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);      // ← the cleanup
  }, [running]);

  return (
    <div className="box stack" style={{ maxWidth: '18rem' }}>
      <strong style={{ fontSize: '2rem' }}>{secs}s</strong>
      <div className="cluster">
        <button className="btn" data-v="primary" onClick={() => setRunning(r => !r)}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button className="btn" onClick={() => { setRunning(false); setSecs(0); }}>Reset</button>
      </div>
    </div>
  );
}
`,css:"",html:"",base:"",task:"Delete the <code>return () => clearInterval(id)</code> line, then start and stop a few times — the counter accelerates because old intervals never died.",key:"Every subscription needs a cleanup. Note setSecs(s => s+1) — without the updater this would freeze at 1 (stale closure).",polish:!1,isjsx:!0},{stage:26,title:"Lifting state — two components, one source of truth",teach:"When two parts of the UI need the same value, the state moves <b>up</b> to their closest common parent and comes back down as props. Callbacks go down too, so children can ask the parent to change it.",jsx:`import React, { useState } from 'react';

function Chip({ label, active, onPick }) {
  return (
    <button className="btn" data-v={active ? 'primary' : undefined}
            onClick={() => onPick(label)}>{label}</button>
  );
}

export default function App() {
  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'Active', 'Done'];

  return (
    <div className="stack" style={{ maxWidth: '26rem' }}>
      <div className="cluster">
        {tabs.map(t => (
          <Chip key={t} label={t} active={filter === t} onPick={setFilter} />
        ))}
      </div>
      <div className="box">Showing: <strong>{filter}</strong></div>
    </div>
  );
}
`,css:"",html:"",base:"",task:"The Chip has no state at all — it receives <code>active</code> and calls <code>onPick</code>. Add a fourth tab and it just works.",key:"State up, props down, callbacks up. Dumb children, one owner. This is the answer to 'how do you share state?'",polish:!1,isjsx:!0},{stage:26,title:"A complete feature — everything at once",teach:"Search + filter + add + toggle + delete + empty state + count. This is a Tier-S machine-coding task, fully functional, in one screen.",jsx:`import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Read the brief', done: true },
    { id: 2, text: 'Build the layout', done: false },
  ]);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All');

  const shown = todos
    .filter(t => tab === 'All' || (tab === 'Done') === t.done)
    .filter(t => t.text.toLowerCase().includes(query.toLowerCase()));

  const add = () => {
    const v = text.trim();
    if (!v) return;
    setTodos(ts => [...ts, { id: Date.now(), text: v, done: false }]);
    setText('');
  };

  return (
    <div className="stack" style={{ maxWidth: '30rem' }}>
      <div className="between box">
        <strong>Tasks</strong>
        <span className="muted">{todos.filter(t => !t.done).length} left</span>
      </div>

      <div className="cluster">
        <input className="input" style={{ flex: 1 }} value={text} placeholder="New task"
               onChange={e => setText(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && add()} />
        <button className="btn" data-v="primary" onClick={add}>Add</button>
      </div>

      <input className="input" value={query} placeholder="Search…"
             onChange={e => setQuery(e.target.value)} />

      <div className="cluster">
        {['All', 'Active', 'Done'].map(t => (
          <button key={t} className="btn" data-v={tab === t ? 'primary' : undefined}
                  onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {shown.map(t => (
          <li className="between box" key={t.id}>
            <label className="cluster" style={{ gap: '.5rem' }}>
              <input type="checkbox" checked={t.done}
                     onChange={() => setTodos(ts => ts.map(x => x.id === t.id ? { ...x, done: !x.done } : x))} />
              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
            </label>
            <button className="btn" onClick={() => setTodos(ts => ts.filter(x => x.id !== t.id))}>Delete</button>
          </li>
        ))}
      </ul>

      {shown.length === 0 && <p className="muted">No tasks match.</p>}
    </div>
  );
}
`,css:"",html:"",base:"",task:"Everything works. Now count the state: four <code>useState</code> calls, zero derived values stored. That ratio is what an interviewer is reading.",key:"Minimal state, everything else derived. Four hooks carried a full CRUD feature with search, filters and an empty state.",polish:!1,isjsx:!0}]};function jv(r){if(!r)return"";let o=r.replace(/\{\/\*[\s\S]*?\*\/\}/g,"").replace(/^\s*<>\s*|\s*<\/>\s*$/g,"").trim();const d=/\{\s*(\[[^\]]+\])\.map\s*\(\s*(\w+)\s*=>\s*([\s\S]*?)\s*\)\s*\}/g;return o=o.replace(d,(c,v,O,R)=>{try{return JSON.parse(v.replace(/'/g,'"')).map(j=>{let D=R.trim();return D=D.replace(/\s*key=\{[^}]+\}/g,""),D=D.replace(/className=\{\s*"([^"]*)"\s*\+\s*\w+\s*\}/g,(U,C)=>`class="${C}${j}"`),D=D.replace(/className=/g,"class="),D=D.replace(new RegExp(`\\{\\s*${O}\\s*\\}`,"g"),String(j)),D}).join(`
      `)}catch{return c}}),o=o.replace(/className=/g,"class="),o}function zv(r){return/^(BOX|PLC)-|^FLEX-0[12]/.test(r)?"Warm-up":/^(TRK|CQ|MIX|AREA|XTRA)-/.test(r)?"Advanced":"Core"}const Pv=[{id:"behavioural",name:"Behavioural & HR",icon:"🎙️"},{id:"js_core",name:"JS Memory & Equality",icon:"⚡"},{id:"js_practical",name:"Vanilla JS Machine Coding",icon:"🛠️"},{id:"js_traps",name:"JS Traps & Execution",icon:"🪤"},{id:"css_layouts",name:"CSS 2D Layouts",icon:"🥋"},{id:"react_core",name:"React 19 Architecture",icon:"⚛️"},{id:"react_practical",name:"React Machine Coding",icon:"🏗️"},{id:"react_ecosystem",name:"Ecosystem (Redux/Router)",icon:"📦"},{id:"async_apis",name:"Async & REST APIs",icon:"🌐"}],Mv=[{id:"js-primitives-vs-references",trackId:"js_core",trackName:"JS Memory & Equality",title:"Stack vs Heap: Primitives & References",level:"Warm-up",category:"Object Memory & Equalities",xp:25,theory:{hook:"Primitives are compared by value. Objects are compared by their memory address (pointer).",deepDive:"When you assign `let a = 10; let b = a;`, a literal copy of 10 is made. But when you do `let a = {}; let b = a;`, only the pointer is copied. Mutating `b` will mutate `a` because they point to the identical heap address.",interviewPitch:`"Primitives are immutable values living on the call stack. Objects are mutable structures in the heap. In React, this is why we must never mutate an object in state directly—React compares pointers using Object.is, and if the pointer hasn't changed, it assumes the data hasn't changed, causing stale UI bugs."`,mcq:{q:"What is the output of `{} === {}`?",options:["true","false","TypeError","undefined"],correct:1,why:"Each `{}` creates a new object in memory with a distinct pointer. Distinct pointers are never strictly equal."}},practice:{type:"js_snippet",task:"Write code that proves primitives copy by value but objects copy by reference. Reassign the primitive copy (p2) and mutate the object copy property (obj2.val = 99), then assert or log the original values.",starterCode:`// 1. Primitives: copy by value
let p1 = 5;
let p2 = p1;
p2 = 10;
assert.equal(p1, 5, "p1 primitive is isolated");

// 2. Objects: copy by reference
let obj1 = { val: 10 };
let obj2 = obj1;
// TODO: Mutate obj2.val to 99
// obj2.val = 99;
// assert.equal(obj1.val, 99, "obj1.val mutated via obj2 reference");`,solutionCode:`let p1 = 5;
let p2 = p1;
p2 = 10;
assert.equal(p1, 5, "p1 primitive is isolated");

let obj1 = { val: 10 };
let obj2 = obj1;
obj2.val = 99;
assert.equal(obj1.val, 99, "obj1.val mutated via obj2 reference");`,specs:["Asserts primitive isolation (p1 remains 5).","Asserts object reference mutation (obj1.val becomes 99)."]}},{id:"js-shallow-vs-deep",trackId:"js_core",trackName:"JS Memory & Equality",title:"Shallow vs Deep Copying (The Nested Trap)",level:"Core",category:"Object Memory & Equalities",xp:50,theory:{hook:"Spread syntax `{...obj}` creates a shallow copy. It only clones the outermost shell.",deepDive:"If you have an object with nested children, `const clone = { ...obj }` creates a new pointer for the root, but the nested children still share the exact same pointers as the original. If you mutate `clone.nested.x`, you mutate the original. To fix this, you must either spread nested levels too, or use `structuredClone()`.",interviewPitch:'"When building reducers or state updates, a shallow copy using spread is usually enough. But if the data structure is heavily nested, mutating a deep property on a shallow clone mutates the original state, breaking time-travel debugging and causing cross-component side effects. I reach for structuredClone for complex nested updates."',mcq:{q:"What does structuredClone NOT copy?",options:["Sets and Maps","Dates and RegExp","Functions and DOM Nodes","Nested Arrays"],correct:2,why:"Functions, DOM Nodes, and Error objects cannot be cloned by structuredClone and will throw a DataCloneError."}},practice:{type:"js_snippet",task:"Use the spread operator to make a shallow copy of `user`. Then use `structuredClone` to make a deep copy. Mutate the nested `address.city` on both and observe the original.",starterCode:`const user = { name: "Alex", address: { city: "Paris" } };

// 1. Create a shallow copy using spread
const shallow = // ...
shallow.address.city = "London";
console.log("Original after shallow mutation:", user.address.city); // Oh no!

// 2. Reset user and create deep copy using structuredClone
const user2 = { name: "Sam", address: { city: "New York" } };
const deep = // ...
deep.address.city = "Tokyo";
console.log("Original after deep mutation:", user2.address.city); // Safe!`,solutionCode:`const user = { name: "Alex", address: { city: "Paris" } };

// 1. Create a shallow copy using spread
const shallow = { ...user };
shallow.address.city = "London";
console.log("Original after shallow mutation:", user.address.city); // London

// 2. Reset user and create deep copy using structuredClone
const user2 = { name: "Sam", address: { city: "New York" } };
const deep = structuredClone(user2);
deep.address.city = "Tokyo";
console.log("Original after deep mutation:", user2.address.city); // New York`,specs:["Creates a shallow copy via spread.","Creates a deep copy via structuredClone.","Proves the original is mutated by shallow clone but protected by deep clone."]}},{id:"js-four-equalities",trackId:"js_core",trackName:"JS Memory & Equality",title:"The 4 Equalities: Object.is & NaN",level:"Advanced",category:"Object Memory & Equalities",xp:50,theory:{hook:"JavaScript has 4 ways to compare equality. React relies heavily on `Object.is`.",deepDive:"1) `==` (Loose) coerces types.\n2) `===` (Strict) blocks coercion, but `NaN !== NaN` and `+0 === -0`.\n3) `Object.is` is like strict, but fixes math bugs: `Object.is(NaN, NaN)` is true, and `Object.is(+0, -0)` is false.\n4) `SameValueZero` is what Maps and Sets use under the hood.",interviewPitch:`"React's dependency arrays and useState bailouts use Object.is algorithm under the hood, not ===. This is why if you update a state variable from NaN to NaN, React will NOT re-render, whereas a strict equality check would think they are different and trigger a re-render."`,mcq:{q:"How does React compare dependencies in `useEffect`?",options:["JSON.stringify","==","===","Object.is"],correct:3,why:"React uses Object.is polyfill (is() in the React source code) to prevent re-renders when setState is called with identical values, strictly handling NaN correctly."}},practice:{type:"js_snippet",task:"Log the differences between `===` and `Object.is` for NaN and signed zeros.",starterCode:`// TODO: Console log the following comparisons:

// 1. NaN === NaN (Should be false)
// 2. Object.is(NaN, NaN) (Should be true)

// 3. +0 === -0 (Should be true)
// 4. Object.is(+0, -0) (Should be false)`,solutionCode:`console.log("NaN === NaN :", NaN === NaN);
console.log("Object.is(NaN, NaN) :", Object.is(NaN, NaN));

console.log("+0 === -0 :", +0 === -0);
console.log("Object.is(+0, -0) :", Object.is(+0, -0));`,specs:["Logs NaN comparison using === and Object.is","Logs signed zero comparison using === and Object.is"]}},{id:"js-event-loop",trackId:"js_core",trackName:"JS Memory & Equality",title:"Event Loop: Macrotasks vs Microtasks",level:"Crucible",category:"The Event Loop",xp:100,theory:{hook:"Promises resolve before SetTimeout. Microtasks beat Macrotasks.",deepDive:"When synchronous code finishes, the JS engine checks the Microtask queue (Promises, MutationObserver). It drains the ENTIRE microtask queue until it is empty. ONLY THEN does it look at the Macrotask queue (setTimeout, setInterval, I/O, UI rendering).",interviewPitch:'"If an interviewer asks me to predict the output of nested setTimeouts and Promises, I isolate the queues. Synchronous code runs immediately. Promise .then() callbacks go to the Microtask queue which is drained exhaustively before the browser is allowed to render or process the Macrotask queue where setTimeout callbacks live."',mcq:{q:"Which logs first? Promise.resolve().then(() => console.log(1)); setTimeout(() => console.log(2), 0);",options:["1 then 2","2 then 1","Unpredictable race condition","Throws an error"],correct:0,why:"Promise callbacks are microtasks. setTimeout callbacks are macrotasks. The microtask queue is always drained before the macrotask queue."}},practice:{type:"js_snippet",task:'Write a script that logs "1", "2", "3", "4" in that exact order using console.log, setTimeout, and Promise.resolve. You must write them out of order in the code!',starterCode:`// Write code that executes out of order but logs 1, 2, 3, 4 sequentially.
// Hint: Use sync execution for 1 & 2, Microtask for 3, Macrotask for 4.

setTimeout(() => {
  // MACROTASK
}, 0);

Promise.resolve().then(() => {
  // MICROTASK
});

// SYNC`,solutionCode:`setTimeout(() => {
  console.log("4 (Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3 (Microtask)");
});

console.log("1 (Sync)");
console.log("2 (Sync)");`,specs:["Demonstrates sync execution.","Demonstrates Promise (Microtask) execution priority over setTimeout."]}},{id:"rest-abort-controller",trackId:"async_apis",trackName:"Async & REST APIs",title:"Canceling REST API Requests with AbortController",level:"Advanced",category:"REST & Fetch API",xp:75,theory:{hook:"When a component unmounts or a user types rapidly in a search box, lingering network requests cause race conditions and memory leaks.",deepDive:"`fetch()` takes an `abort` signal. The `AbortController` exposes a `.signal` to pass to fetch, and a `.abort()` method to immediately terminate the request. In React, you call `abort()` in the `useEffect` cleanup function to guarantee the request dies if the component unmounts or the effect re-runs.",interviewPitch:`"If an interviewer asks how to handle search debouncing or rapid navigation, I emphasize AbortController. Debouncing delays the start, but AbortController cancels the in-flight network request, freeing up the browser's connection pool and preventing stale data from overwriting fresh data if responses return out of order."`,mcq:{q:"What error does fetch throw when aborted?",options:["TimeoutError","NetworkError","AbortError (DOMException)","None, it just returns null"],correct:2,why:`fetch rejects the Promise with a DOMException named "AbortError". You must catch this so your app doesn't crash.`}},practice:{type:"jsx",task:"Wire up the AbortController in the useEffect. When the component unmounts (or ID changes), the cleanup function must abort the fetch.",starterCode:`import React, { useState, useEffect } from 'react';

export default function App() {
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    // 1. Create the AbortController
    
    fetch(\`https://jsonplaceholder.typicode.com/todos/\${id}\`)
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name === 'AbortError') console.log('Aborted!');
      });

    // 2. Return the cleanup function
    return () => {};
  }, [id]);

  return (
    <div className="box stack">
      <button className="btn" onClick={() => setId(s => s + 1)}>Next Todo (Rapid Click!)</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`,solutionCode:`import React, { useState, useEffect } from 'react';

export default function App() {
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    fetch(\`https://jsonplaceholder.typicode.com/todos/\${id}\`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name === 'AbortError') console.log('Aborted!');
      });

    return () => controller.abort();
  }, [id]);

  return (
    <div className="box stack">
      <button className="btn" onClick={() => setId(s => s + 1)}>Next Todo (Rapid Click!)</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`,specs:["Creates AbortController instance.","Passes signal to fetch options.","Calls abort() in useEffect cleanup."]}},{id:"js-closures-stale-state",trackId:"js_core",trackName:"JS Memory & Equality",title:"Closures & Stale State (The React Hooks Trap)",level:"Crucible",category:"Closures & Scope",xp:75,theory:{hook:'A closure "remembers" the variables in its lexical scope at the exact moment it was created.',deepDive:"When you create a function inside another function (like an event handler or useEffect inside a React component), it captures the state variables from that specific render pass. If the function is delayed (e.g., setTimeout) and state changes in the meantime, the function will still see the OLD (stale) state.",interviewPitch:'"A common React interview question is why a setTimeout inside a useEffect sees an old state value. I explain that React hooks rely on closures. Each render creates a new closure over the state variables of that render. A delayed function holds a reference to the environment of the render where it was created, not the latest one. To fix it, you either use a ref (which is mutable and survives renders) or functional state updates like `setCount(c => c + 1)`."',mcq:{q:"If `count = 0` and you run: `setTimeout(() => console.log(count), 1000)`, then immediately `count = 99`, what logs?",options:["0","99","undefined","ReferenceError"],correct:0,why:"The setTimeout callback forms a closure over the value of `count` (0) at the time it was declared."}},practice:{type:"js_snippet",task:"Fix the stale closure bug. The timeout currently logs the stale value (0) instead of the updated value. Use an object reference (like a React ref) so the closure reads the latest value.",starterCode:`// The Stale Closure Bug
function createCounter() {
  let count = 0;
  
  setTimeout(() => {
    console.log("Stale closure reads count:", count); // Will log 0
  }, 100);
  
  count = 99; // Updated after the timeout is scheduled!
}

createCounter();

// TODO: Implement a version that uses an object (like a ref)
// so the timeout reads the LATEST value (99).
function createRefCounter() {
  const countRef = { current: 0 };
  
  setTimeout(() => {
    // console.log("Ref reads count:", countRef.current);
  }, 100);
  
  countRef.current = 99;
}
createRefCounter();`,solutionCode:`// The Stale Closure Bug
function createCounter() {
  let count = 0;
  
  setTimeout(() => {
    console.log("Stale closure reads count:", count); // Logs 0
  }, 100);
  
  count = 99; 
}
createCounter();

// The Fix: Mutable References
function createRefCounter() {
  const countRef = { current: 0 };
  
  setTimeout(() => {
    console.log("Ref reads count:", countRef.current); // Logs 99!
  }, 100);
  
  countRef.current = 99;
}
createRefCounter();`,specs:["Demonstrates the stale closure problem.","Demonstrates how an object reference bypasses the closure trap."]}},{id:"js-this-binding",trackId:"js_core",trackName:"JS Memory & Equality",title:'Lexical vs Dynamic: Arrow Functions & "this"',level:"Core",category:"Object Memory & Equalities",xp:50,theory:{hook:"Regular functions determine this dynamically based on WHO called them. Arrow functions determine this lexically based on WHERE they were written.",deepDive:"Before arrow functions, passing a method as a callback (like `element.addEventListener('click', obj.method)`) would strip the object binding, and this would become the window or undefined. Arrow functions don't have their own this. They look up the scope chain just like any normal variable.",interviewPitch:'"When asked why we used to `bind(this)` in React class components, I explain dynamic execution context. A method passed as an event handler loses its instance context when invoked by the DOM. Arrow functions solved this because their this is lexically scoped to the enclosing class, permanently binding it to the instance."',mcq:{q:"What does this refer to inside a global arrow function?",options:["The Window object","undefined","null","The function itself"],correct:0,why:"An arrow function in the global scope inherits this from the global scope, which is the Window object in a browser."}},practice:{type:"js_snippet",task:"The `greet` method inside the timeout loses its this context because it is passed as a callback. Fix it by using an arrow function so it inherits this from `user.delayGreeting()`.",starterCode:`const user = {
  name: "Alex",
  delayGreeting() {
    // BUG: setTimeout executes the callback in a different context.
    // this will be undefined/window, so this.name fails.
    setTimeout(function() {
      console.log("Hello, my name is", this.name);
    }, 50);
  }
};

user.delayGreeting();`,solutionCode:`const user = {
  name: "Alex",
  delayGreeting() {
    // FIX: Arrow functions inherit this lexically from delayGreeting
    setTimeout(() => {
      console.log("Hello, my name is", this.name);
    }, 50);
  }
};

user.delayGreeting();`,specs:["Identifies the broken dynamic binding.","Fixes it using a lexical arrow function."]}}],qv=Km.items.map((r,o)=>{var O,R,N,j,D;const d=((R=(O=r.use)==null?void 0:O[0])==null?void 0:R[0])||"property",c=((j=(N=r.use)==null?void 0:N[0])==null?void 0:j[1])||"layout requirement",v=r.title||r.n||`Layout Drill ${o+1}`;return{id:`css-${r.id||r.k||o}`,sourceId:r.id,hints:r.hints||[],why:r.why,verify:r.verify,diagram:r.dia,reference:r.markup,trackId:"css_layouts",trackName:"CSS 2D Layouts",category:((D=Km.cats.find(U=>U.k===r.cat))==null?void 0:D.n)||"General Layouts",title:v,level:zv(String(r.id||"")),xp:25,theory:{hook:r.goal||r.blurb||"Mastering this CSS property ensures predictable, robust 2D layouts.",deepDive:(r.hints||[]).join(" ")||`Understand how ${d} controls the rendering box and flow of its children.`,interviewPitch:`"I chose this approach because it's the most semantically correct and resilient way to achieve ${c.toLowerCase()}, avoiding brittle magic numbers or absolute positioning."`,...r.task?{mcq:{q:`What is the primary purpose of ${d} here?`,options:[c,"To override the cascade magically.","To force GPU acceleration.","To trigger a re-render."],correct:0,why:"This property is foundational for this exact specification."}}:{}},practice:{type:"css",task:r.task||"Implement the requested CSS layout properties to match the target.",starterCode:r.css||"",solutionCode:r.sol?String(r.css||"").replace(/^.*TODO.*$/m,`  ${String(r.sol).trim()}`):String(r.css||""),baseHtml:jv(r.markup||r.jsx||""),specs:(r.use||[]).map(([U,C])=>`${U} — ${C}`)}}}),Uv=(Ev.lessons||[]).map((r,o)=>({id:`ladder-${r.stage}-${o}`,sourceId:r.key||r.title,why:r.why,takeaway:typeof r.key=="string"?r.key:void 0,trackId:"css_layouts",trackName:"CSS 2D Layouts",category:`Ladder Stage ${r.stage} (CSS)`,title:r.title,level:"Core",xp:30,theory:{hook:r.teach.replace(/<[^>]*>?/gm,"").substring(0,150)+"...",deepDive:r.teach.replace(/<[^>]*>?/gm,""),interviewPitch:'"This pattern ensures clear separation of concerns, making the component easier to test and highly predictable across renders."'},practice:{type:r.isjsx?"jsx":"css",task:r.task||`Implement the concepts covered in: ${r.title}`,starterCode:r.css||r.jsx||"// Ready for implementation",solutionCode:r.polish||r.after||r.css||r.jsx||"// Implemented",baseHtml:r.html||"",baseCss:r.base||"",specs:r.task?[String(r.task).replace(/<[^>]*>?/gm,"")]:["Follows architecture guidelines."]}})),_v=[{id:"react-infinite-loop",trackId:"react_core",trackName:"React 19 Architecture",category:"Hooks & Lifecycles",title:"The Infinite Loop Trap (useEffect)",level:"Warm-up",xp:50,theory:{hook:"Updating state inside a useEffect without dependencies causes an infinite render loop.",deepDive:"When a component renders, the useEffect runs. If it calls a state setter, the component re-renders. If the dependency array is missing, the effect runs AFTER EVERY render, immediately setting state again and triggering another render. This will crash the browser tab.",interviewPitch:'"If an interviewer shows me a component crashing the tab, the first thing I look for is an unconditional state update inside the render body, or a useEffect missing a dependency array. By adding the empty array [], we instruct React to only run the effect once after the initial mount, acting like componentDidMount."',mcq:{q:"What is the difference between useEffect with [] vs no array at all?",options:["[] runs once. No array runs after every render.","No difference.","[] is a syntax error.","No array runs only on mount."],correct:0,why:'No array means "run after every render". [] means "run when dependencies change", and since it has none, it runs only once.'}},practice:{type:"jsx",task:"Fix the infinite loop. The component is currently crashing because useEffect runs after every render. Add the correct dependency array so it only fetches data once on mount.",starterCode:`import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState("Loading...");
  const [renders, setRenders] = useState(0);

  // BUG: This causes an infinite loop!
  useEffect(() => {
    setData("Fetched Data!");
    setRenders(r => r + 1); // Triggers re-render
  }); // <-- Missing something here

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <h2>Data: {data}</h2>
      <p className="text-rose-400">Renders: {renders}</p>
    </div>
  );
}`,solutionCode:`import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState("Loading...");
  const [renders, setRenders] = useState(0);

  // FIX: Added [] so it only runs on mount
  useEffect(() => {
    setData("Fetched Data!");
    setRenders(r => r + 1); 
  }, []);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <h2>Data: {data}</h2>
      <p className="text-emerald-400">Renders: {renders} (Stable!)</p>
    </div>
  );
}`,specs:["Identifies the missing dependency array.","Prevents the infinite render loop."]}},{id:"react-context-rerenders",trackId:"react_core",trackName:"React 19 Architecture",category:"Performance Optimization",title:"Context API Re-render Waterfall",level:"Core",xp:75,theory:{hook:"Passing a new object reference to a Context Provider value causes ALL consumers to re-render, even if the data inside hasn't changed.",deepDive:"When the parent of a Context.Provider re-renders, it evaluates `value={{ user, theme }}`. This creates a brand new object in memory (a new pointer). React compares the old value to the new value using `Object.is()`. Since the pointers are different, it forces a re-render of every component consuming that context. You must wrap the object in `useMemo` to preserve referential equality.",interviewPitch:`"In technical rounds, if asked how to optimize Context API, I explain referential equality. I always wrap the Provider's value object in useMemo. Otherwise, any unrelated state change in the parent creates a new object reference, triggering a catastrophic re-render waterfall for every consumer down the tree."`,mcq:{q:"How do you prevent a Context Provider from creating a new object reference on every render?",options:["useCallback","React.memo","useMemo","useState"],correct:2,why:"useMemo caches the object reference between renders unless its dependencies change."}},practice:{type:"jsx",task:"Fix the re-render waterfall. Wrap the context value object in useMemo so that unrelated parent re-renders do not recreate the context value pointer.",starterCode:`import React, { useState, createContext, useContext, useMemo } from 'react';

const ThemeContext = createContext();

function Consumer() {
  const { theme } = useContext(ThemeContext);
  console.log("Consumer rendered!"); // Watch the console!
  return <div>Current Theme: {theme}</div>;
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);

  // BUG: This object is recreated on EVERY render (e.g. when count changes)
  const contextValue = { theme, setTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
        <button className="px-3 py-1 bg-sky-600 rounded mr-2" onClick={() => setCount(c => c + 1)}>
          Unrelated State: {count}
        </button>
        <Consumer />
      </div>
    </ThemeContext.Provider>
  );
}`,solutionCode:`import React, { useState, createContext, useContext, useMemo } from 'react';

const ThemeContext = createContext();

function Consumer() {
  const { theme } = useContext(ThemeContext);
  console.log("Consumer rendered!");
  return <div>Current Theme: {theme}</div>;
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);

  // FIX: useMemo preserves the pointer unless 'theme' actually changes
  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
        <button className="px-3 py-1 bg-sky-600 rounded mr-2" onClick={() => setCount(c => c + 1)}>
          Unrelated State: {count}
        </button>
        <Consumer />
      </div>
    </ThemeContext.Provider>
  );
}`,specs:["Identifies the inline object recreation.","Uses useMemo to cache the context value."]}},{id:"react-custom-use-debounce",trackId:"react_core",trackName:"React 19 Architecture",category:"Custom Hooks (Mettl OA)",title:"Building useDebounce (Mettl OA Classic)",level:"Crucible",xp:150,theory:{hook:"Debouncing delays a state update until a certain amount of time has passed without any new updates.",deepDive:'In a search bar, typing "React" triggers 5 state updates. If you fetch data on every keystroke, you DDoS your own backend. `useDebounce` is a custom hook that takes a value and a delay. It sets a timeout to update a `debouncedValue` state. If the value changes before the timeout finishes, the `useEffect` cleanup function clears the previous timeout, preventing the update.',interviewPitch:'"Writing a useDebounce hook is my go-to signal for senior-level React knowledge. It perfectly demonstrates understanding of useEffect cleanup functions. By clearing the timeout in the cleanup phase, we guarantee that only the final keystroke (after the user pauses) actually triggers the debounced state update."',mcq:{q:"When does the useEffect cleanup function run?",options:["Only when the component unmounts.","Before the effect runs again, and on unmount.","After the effect finishes executing.","When the browser closes."],correct:1,why:"React runs the cleanup function to clean up the previous render's effect BEFORE running the new effect."}},practice:{type:"jsx",task:"Implement the useDebounce hook. It must use useEffect, setTimeout, and the cleanup function (clearTimeout) to only return the value after 500ms of inactivity.",starterCode:`import React, { useState, useEffect } from 'react';

// TODO: Implement useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 1. Set a timeout to update debouncedValue
    
    // 2. Return a cleanup function to clear the timeout
    
  }, [value, delay]);

  return debouncedValue;
}

export default function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <input 
        type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type fast..."
        className="text-black px-2 py-1 rounded"
      />
      <p className="mt-4 text-sky-400">Immediate: {search}</p>
      <p className="text-emerald-400">Debounced: {debouncedSearch}</p>
    </div>
  );
}`,solutionCode:`import React, { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <input 
        type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type fast..."
        className="text-black px-2 py-1 rounded"
      />
      <p className="mt-4 text-sky-400">Immediate: {search}</p>
      <p className="text-emerald-400">Debounced: {debouncedSearch}</p>
    </div>
  );
}`,specs:["Implements setTimeout inside useEffect.","Implements clearTimeout in the cleanup return function."]}},{id:"react-memo-referential-equality",trackId:"react_core",trackName:"React 19 Architecture",category:"Performance Optimization",title:"React.memo & The Inline Prop Trap",level:"Advanced",xp:100,theory:{hook:"React.memo prevents re-renders, but passing an inline array `[]` or function `() => {}` instantly breaks it.",deepDive:"When a parent renders, it creates new memory pointers for any inline arrays, objects, or functions. If you pass `data={[1,2,3]}` to a child wrapped in `React.memo`, the memoization fails because `[1,2,3] !== [1,2,3]` in memory. You must wrap the prop in `useMemo` or move it outside the component if it's static.",interviewPitch:'"A classic optimization mistake is wrapping a component in React.memo but passing it an inline function or array. In interviews, I point out that React.memo does a shallow comparison (===). I always cache the prop with useMemo or useCallback before passing it down, ensuring referential equality and successfully blocking the re-render waterfall."',mcq:{q:"Which prop will BREAK React.memo on a child component?",options:["count={5}",'text="hello"','onClick={() => console.log("click")}',"isTrue={true}"],correct:2,why:"An inline function creates a new pointer on every render, failing the shallow comparison."}},practice:{type:"jsx",task:"Fix the broken memoization. The HeavyChild is re-rendering every time you click the button because the parent passes an inline array. Cache the array using useMemo.",starterCode:`import React, { useState, memo, useMemo } from 'react';

const HeavyChild = memo(({ config }) => {
  console.log("HeavyChild rendered! (This is bad if config didn't change)");
  return <div className="mt-4 p-2 bg-slate-800 rounded">Child renders heavily! Config length: {config.length}</div>;
});

export default function App() {
  const [count, setCount] = useState(0);

  // BUG: This inline array breaks React.memo because it gets a new pointer every render!
  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <button className="px-3 py-1 bg-sky-600 rounded" onClick={() => setCount(c => c + 1)}>
        Parent State: {count}
      </button>
      
      {/* TODO: Do not pass this inline array directly */}
      <HeavyChild config={[1, 2, 3]} />
    </div>
  );
}`,solutionCode:`import React, { useState, memo, useMemo } from 'react';

const HeavyChild = memo(({ config }) => {
  console.log("HeavyChild rendered! (This is bad if config didn't change)");
  return <div className="mt-4 p-2 bg-slate-800 rounded">Child renders heavily! Config length: {config.length}</div>;
});

export default function App() {
  const [count, setCount] = useState(0);

  // FIX: Cache the array so the pointer remains stable across renders
  const stableConfig = useMemo(() => [1, 2, 3], []);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <button className="px-3 py-1 bg-sky-600 rounded" onClick={() => setCount(c => c + 1)}>
        Parent State: {count}
      </button>
      
      <HeavyChild config={stableConfig} />
    </div>
  );
}`,specs:["Identifies the inline array breaking memoization.","Implements useMemo to stabilize the array reference."]}},{id:"react-stale-closure-event",trackId:"react_core",trackName:"React 19 Architecture",category:"Hooks & Lifecycles",title:"Stale Closures in Event Listeners",level:"Crucible",xp:150,theory:{hook:"An event listener attached inside `useEffect` with `[]` captures the state variables of the FIRST render forever.",deepDive:'If you do `window.addEventListener("scroll", handleScroll)` inside a mount-only useEffect, the `handleScroll` function is a closure from the first render. If it tries to read `count`, it will always see `0`. To fix this, you must either include the state in the dependency array (which forces re-attachment of the listener), or use a mutable `useRef` to store the latest state.',interviewPitch:'"When attaching global event listeners or websockets, stale closures are the #1 source of bugs. If the listener reads state, I either use the functional update pattern `setCount(c => c + 1)`, or I synchronize the latest state into a `useRef` so the stale closure can read `ref.current` and get fresh data without needing to re-attach the listener constantly."',mcq:{q:"How does `useRef` solve the stale closure problem in an event listener?",options:["It forces the listener to re-attach.","It triggers a re-render.","Its .current property is mutable and shares the same memory address across all renders.",'It binds "this" to the function.'],correct:2,why:"Because the ref object is mutated rather than recreated, the closure holding the ref pointer can read the updated .current value at any time."}},practice:{type:"jsx",task:"Fix the stale closure. The interval is reading the stale `count` value (0) and logging it forever. Update the effect so it accurately reads the latest count.",starterCode:`import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  // BUG: The interval is trapped in the first render's closure!
  useEffect(() => {
    const id = setInterval(() => {
      console.log("Interval sees count as:", count); // Always logs 0!
    }, 1000);
    return () => clearInterval(id);
  }, []); // Empty dependency array causes the trap

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <h2 className="text-xl">Count: {count}</h2>
      <button className="px-3 py-1 mt-2 bg-emerald-600 rounded" onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>
      <p className="mt-4 text-xs text-slate-400">Check the terminal output. It thinks count is 0!</p>
    </div>
  );
}`,solutionCode:`import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  
  // FIX: Sync latest state to a ref
  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("Interval sees count as:", countRef.current); // Reads fresh state!
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <h2 className="text-xl">Count: {count}</h2>
      <button className="px-3 py-1 mt-2 bg-emerald-600 rounded" onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>
    </div>
  );
}`,specs:["Understands the stale closure trap.","Implements useRef to bypass the closure and read fresh state."]}},{id:"react-usereducer-complex",trackId:"react_core",trackName:"React 19 Architecture",category:"State Management",title:"useReducer for Complex State Transitions",level:"Core",xp:75,theory:{hook:"When multiple state variables must change together in response to one action, `useState` creates race conditions. `useReducer` guarantees atomicity.",deepDive:"If clicking \"Fetch\" requires `setLoading(true)`, `setError(null)`, and `setData([])` simultaneously, doing them as 3 `useState` calls is brittle. `useReducer` allows you to dispatch a single `{ type: 'FETCH_START' }` action, letting the reducer predictably transition the state machine as a single atomic unit.",interviewPitch:'"For simple toggles, I use useState. But the moment state becomes a state machine—like a data fetching flow with idle, loading, success, and error states—I switch to useReducer. It centralizes the transition logic out of the component body, makes it easily unit-testable without rendering, and ensures impossible states (like having both data AND an error) cannot exist."',mcq:{q:"What makes useReducer easier to test than useState?",options:["It is faster.","Reducers are pure functions independent of React context.","It automatically memoizes.","It uses less memory."],correct:1,why:"A reducer takes (state, action) and returns a new state. It is a pure JavaScript function that can be imported into a Jest file and tested without rendering any components."}},practice:{type:"jsx",task:"Migrate the brittle multiple `useState` calls to the robust `useReducer` pattern. Implement the reducer function to handle START, SUCCESS, and ERROR actions.",starterCode:`import React, { useReducer } from 'react';

const initialState = { data: null, loading: false, error: null };

// TODO: Implement the reducer
function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state }; // Fix me
    case 'FETCH_SUCCESS':
      return { ...state }; // Fix me
    case 'FETCH_ERROR':
      return { ...state }; // Fix me
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const simulateFetch = () => {
    dispatch({ type: 'FETCH_START' });
    setTimeout(() => {
      Math.random() > 0.5 
        ? dispatch({ type: 'FETCH_SUCCESS', payload: ["Apple", "Banana"] })
        : dispatch({ type: 'FETCH_ERROR', payload: "Network Failed" });
    }, 1000);
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <button className="px-3 py-1 bg-sky-600 rounded" onClick={simulateFetch}>
        Fetch Data
      </button>
      <pre className="mt-4 text-xs">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}`,solutionCode:`import React, { useReducer } from 'react';

const initialState = { data: null, loading: false, error: null };

function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { data: null, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { data: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { data: null, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const simulateFetch = () => {
    dispatch({ type: 'FETCH_START' });
    setTimeout(() => {
      Math.random() > 0.5 
        ? dispatch({ type: 'FETCH_SUCCESS', payload: ["Apple", "Banana"] })
        : dispatch({ type: 'FETCH_ERROR', payload: "Network Failed" });
    }, 1000);
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl font-mono">
      <button className="px-3 py-1 bg-sky-600 rounded" onClick={simulateFetch}>
        Fetch Data
      </button>
      <pre className="mt-4 text-xs">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}`,specs:["Implements FETCH_START (loading true, clear others).","Implements FETCH_SUCCESS (loading false, set data).","Implements FETCH_ERROR (loading false, set error)."]}}],Hv=[{id:"practical-search-grid",trackId:"react_practical",trackName:"React Machine Coding",category:"Lists & Filtering",title:"The Searchable Data Grid",level:"Core",xp:100,theory:{hook:"A data grid filtering locally requires derived state: you store the raw data, store the search query, and calculate the visible rows on the fly.",deepDive:'Never store "filteredData" in its own useState if it can be calculated from "allData" and "searchQuery". Syncing two states manually leads to bugs (e.g., when raw data updates but you forget to update the filtered array). Instead, derive it during render: `const visible = data.filter(d => d.name.includes(search))`.',interviewPitch:'"In machine coding rounds, a searchable list is the most common task. Interviewers look for two things: 1) Are you duplicating state (storing filtered results in useState), and 2) Are you using semantic HTML like tables or clean CSS grid? I always use derived state to ensure a single source of truth, and wrap the filtering logic in useMemo if the dataset is massive."',mcq:{q:"Why shouldn't you store `filteredUsers` in its own `useState`?",options:["It causes memory leaks.","It creates redundant state that easily goes out of sync with the raw data.","It breaks React.memo.","useState can only hold strings and numbers."],correct:1,why:"Derived state (calculating the filtered list during render) guarantees that the UI always perfectly matches the raw data and search query."}},practice:{type:"jsx",task:"Build a searchable employee directory. A list of users is provided. Create an input field to filter them by name (case-insensitive). Do not create a separate state for the filtered array—derive it!",starterCode:`import React, { useState } from 'react';

const EMPLOYEES = [
  { id: 1, name: "Alice Johnson", role: "Engineer" },
  { id: 2, name: "Bob Smith", role: "Designer" },
  { id: 3, name: "Charlie Davis", role: "Product Manager" },
  { id: 4, name: "Diana Prince", role: "Engineer" },
];

export default function App() {
  // TODO: Add search state and filter the EMPLOYEES array.
  
  return (
    <div className="p-6 bg-slate-100 min-h-screen font-sans text-slate-800">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold mb-4">Employee Directory</h1>
        
        {/* Add Input here */}

        <div className="flex flex-col gap-2 mt-4">
          {EMPLOYEES.map(emp => (
            <div key={emp.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
              <span className="font-medium">{emp.name}</span>
              <span className="text-sm text-slate-500">{emp.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,solutionCode:`import React, { useState } from 'react';

const EMPLOYEES = [
  { id: 1, name: "Alice Johnson", role: "Engineer" },
  { id: 2, name: "Bob Smith", role: "Designer" },
  { id: 3, name: "Charlie Davis", role: "Product Manager" },
  { id: 4, name: "Diana Prince", role: "Engineer" },
];

export default function App() {
  const [query, setQuery] = useState("");
  
  // Derived state: calculated on every render
  const filtered = EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-100 min-h-screen font-sans text-slate-800">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold mb-4">Employee Directory</h1>
        
        <input 
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />

        <div className="flex flex-col gap-2 mt-4">
          {filtered.length === 0 && (
            <p className="text-slate-500 text-center py-4">No employees found.</p>
          )}
          {filtered.map(emp => (
            <div key={emp.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center">
              <span className="font-medium">{emp.name}</span>
              <span className="text-xs px-2 py-1 bg-slate-200 rounded-full text-slate-600">{emp.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,specs:["Maintains a single state for the search query.","Derives the filtered list dynamically during render.","Handles case-insensitive matching."]}},{id:"practical-star-rating",trackId:"react_practical",trackName:"React Machine Coding",category:"Micro-Interactions",title:"Interactive Star Rating",level:"Advanced",xp:125,theory:{hook:"A 5-star rating component requires tracking two separate concepts: the permanently committed rating (onClick) and the temporary visual rating (onMouseEnter/Leave).",deepDive:"When hovering over star #4, stars 1-4 should light up, temporarily overriding the committed rating (say, 2). When the mouse leaves the widget entirely, it must snap back to the committed rating (2). This requires two states: `rating` and `hoverValue`.",interviewPitch:`"The star rating is a classic test of separating temporary visual state from committed data state. I structure it using an array mapped to indexes, passing the index to mouse handlers. I ensure the UI derives its active class by checking if the star's index is less than or equal to (hoverValue || rating)."`,mcq:{q:"What is the most robust way to generate 5 stars in React without hardcoding 5 elements?",options:["A for loop pushing to an array.","Using Array(5).fill(0).map(...)","Copy pasting the SVG 5 times.","Using dangerouslySetInnerHTML"],correct:1,why:"Array(5).fill(0).map((_, i) => ...) is the standard, declarative React pattern for generating a fixed number of elements."}},practice:{type:"jsx",task:"Build a 5-star rating widget. Hovering over a star fills it and all preceding stars. Clicking locks the rating. Leaving the widget snaps the visual back to the locked rating. (Use ★ and ☆ characters for simplicity).",starterCode:`import React, { useState } from 'react';

export default function App() {
  // TODO: Add state for rating and hover
  
  return (
    <div className="p-8 bg-slate-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-slate-200 text-lg mb-4 font-sans">Rate your experience</h2>
        
        <div className="flex gap-2 text-4xl cursor-pointer select-none">
          {/* Render 5 stars here. Use text-amber-400 for active, text-slate-600 for inactive */}
          <span className="text-slate-600">☆</span>
          <span className="text-slate-600">☆</span>
          <span className="text-slate-600">☆</span>
          <span className="text-slate-600">☆</span>
          <span className="text-slate-600">☆</span>
        </div>
        
        <p className="mt-4 text-sky-400 font-mono">Current Rating: 0</p>
      </div>
    </div>
  );
}`,solutionCode:`import React, { useState } from 'react';

export default function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  
  return (
    <div className="p-8 bg-slate-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-slate-200 text-lg mb-4 font-sans">Rate your experience</h2>
        
        <div 
          className="flex gap-2 text-4xl cursor-pointer select-none"
          onMouseLeave={() => setHover(0)}
        >
          {Array(5).fill(0).map((_, i) => {
            const starValue = i + 1;
            const isActive = starValue <= (hover || rating);
            
            return (
              <span 
                key={i}
                className={isActive ? 'transition-colors duration-200 text-amber-400' : 'transition-colors duration-200 text-slate-700'}
                onMouseEnter={() => setHover(starValue)}
                onClick={() => setRating(starValue)}
              >
                {isActive ? '★' : '☆'}
              </span>
            );
          })}
        </div>
        
        <p className="mt-4 text-sky-400 font-mono">Current Rating: {rating}</p>
      </div>
    </div>
  );
}`,specs:["Maintains committed rating state.","Maintains temporary hover state.","Derives star appearance from (hover || rating).","Clears hover state onMouseLeave of the container."]}},{id:"practical-recursive-tree",trackId:"react_practical",trackName:"React Machine Coding",category:"Advanced Rendering",title:"Recursive Folder Tree",level:"Crucible",xp:200,theory:{hook:"When data is infinitely nested (like a file system), you cannot hardcode the UI layers. A component must render ITSELF.",deepDive:'Recursive components are the only way to render arbitrary tree data. A `Folder` component takes a `node` prop. If the node has `children`, it renders its own title, and then maps over its children, returning `<Folder key={child.id} node={child} />` for each one. State for "isExpanded" lives inside the Folder component itself, so each level manages its own toggle.',interviewPitch:`"Recursive rendering is a frequent technical screen for Senior roles. It proves you understand component encapsulation. The trick is ensuring the recursion has a base case (e.g. no children means it's a file) and giving each instance its own local state for expanding/collapsing, rather than trying to track the open state of every node in a massive global Redux store."`,mcq:{q:"Where should the `isOpen` state live in a recursive tree?",options:["In a global Redux store.","In the top-level parent App component.","Inside the recursive Component itself, locally.","It shouldn't be state, it should be in the DOM."],correct:2,why:"Keeping isOpen local to the recursive component means you don't have to manage a complex dictionary of IDs and booleans in the parent."}},practice:{type:"jsx",task:"Build a recursive Folder tree. If a node is a folder, clicking it should toggle its children. Indent nested levels to make the hierarchy visible.",starterCode:`import React, { useState } from 'react';

const FILE_SYSTEM = {
  name: "root",
  isFolder: true,
  children: [
    { name: "package.json", isFolder: false },
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "App.jsx", isFolder: false },
        { name: "index.css", isFolder: false },
        {
          name: "components",
          isFolder: true,
          children: [
            { name: "Button.jsx", isFolder: false }
          ]
        }
      ]
    }
  ]
};

// TODO: Make this component call itself for nested children
function Node({ data }) {
  return (
    <div className="pl-4">
      <div>{data.name}</div>
    </div>
  );
}

export default function App() {
  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-200 font-mono text-sm">
      <Node data={FILE_SYSTEM} />
    </div>
  );
}`,solutionCode:`import React, { useState } from 'react';

const FILE_SYSTEM = {
  name: "root",
  isFolder: true,
  children: [
    { name: "package.json", isFolder: false },
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "App.jsx", isFolder: false },
        { name: "index.css", isFolder: false },
        {
          name: "components",
          isFolder: true,
          children: [
            { name: "Button.jsx", isFolder: false }
          ]
        }
      ]
    }
  ]
};

function Node({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!data.isFolder) {
    return <div className="py-1 pl-4 text-slate-400">📄 {data.name}</div>;
  }

  return (
    <div className="pl-4">
      <div 
        className="py-1 cursor-pointer select-none hover:text-sky-400 font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '📂' : '📁'} {data.name}
      </div>
      
      {isOpen && data.children && (
        <div className="border-l border-slate-700 ml-2">
          {data.children.map((child, idx) => (
            <Node key={idx} data={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-200 font-mono text-sm">
      <div className="max-w-md p-4 border border-slate-800 bg-slate-950 rounded-xl shadow-lg">
        <Node data={FILE_SYSTEM} />
      </div>
    </div>
  );
}`,specs:["Component renders itself recursively for children.","Uses local state for expand/collapse.","Properly distinguishes files vs folders (base case)."]}},{id:"practical-stopwatch-useref",trackId:"react_practical",trackName:"React Machine Coding",category:"State & Mutable Refs",title:"The Unbreakable Stopwatch",level:"Core",xp:100,theory:{hook:"To build a stopwatch, you need a way to store the interval ID so you can clear it later. `useState` would cause a re-render just for saving the ID. `useRef` is the correct tool.",deepDive:"A ref is essentially a mutable object `{ current: initialValue }` that React guarantees will persist across re-renders. When you start an interval, you store the ID in `intervalRef.current = setInterval(...)`. This doesn't trigger a render. When you pause, you call `clearInterval(intervalRef.current)`.",interviewPitch:'"A common pitfall in stopwatch challenges is storing the timer ID in useState. This triggers an unnecessary render when starting the timer, and worse, if you try to clear it inside an unmount cleanup function, a stale closure might prevent you from accessing the correct ID. Storing the ID in a useRef ensures synchronous, stable access without polluting the render cycle."',mcq:{q:"Why is `useRef` preferred over `let timerId` declared outside the component?",options:["It is faster.","A global let variable would be shared across ALL instances of the component, breaking if you render two stopwatches.","useRef automatically clears intervals.","let variables cannot hold numbers."],correct:1,why:"Variables outside a component are global to the module. If you render <Stopwatch /> twice, they will overwrite each other's timer IDs. useRef is scoped to the specific component instance."}},practice:{type:"jsx",task:"Build a Stopwatch with Start, Stop, and Reset buttons. Track the time in hundredths of a second (10ms intervals). Format the output cleanly (e.g. 0.00). Use useRef to store the interval ID.",starterCode:`import React, { useState, useRef } from 'react';

export default function App() {
  const [time, setTime] = useState(0); // Time in milliseconds / 10
  // TODO: Create a ref to hold the interval ID
  
  const handleStart = () => {
    // TODO: start interval
  };
  
  const handleStop = () => {
    // TODO: clear interval
  };
  
  const handleReset = () => {
    // TODO: clear interval and reset time to 0
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="text-6xl font-mono text-white mb-8 tracking-tighter">
        {(time / 100).toFixed(2)}s
      </div>
      
      <div className="flex gap-4">
        <button onClick={handleStart} className="px-6 py-2 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500">Start</button>
        <button onClick={handleStop} className="px-6 py-2 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-500">Stop</button>
        <button onClick={handleReset} className="px-6 py-2 bg-slate-700 text-white rounded-full font-bold hover:bg-slate-600">Reset</button>
      </div>
    </div>
  );
}`,solutionCode:`import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [time, setTime] = useState(0); 
  const intervalRef = useRef(null);
  
  const handleStart = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 10);
  };
  
  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  
  const handleReset = () => {
    handleStop();
    setTime(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="p-8 bg-slate-900 min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="text-6xl font-mono text-white mb-8 tracking-tighter">
        {(time / 100).toFixed(2)}s
      </div>
      
      <div className="flex gap-4">
        <button onClick={handleStart} className="px-6 py-2 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500 transition-colors">Start</button>
        <button onClick={handleStop} className="px-6 py-2 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-500 transition-colors">Stop</button>
        <button onClick={handleReset} className="px-6 py-2 bg-slate-700 text-white rounded-full font-bold hover:bg-slate-600 transition-colors">Reset</button>
      </div>
    </div>
  );
}`,specs:["Uses useRef to store the timer ID without triggering re-renders.","Prevents multiple simultaneous intervals on rapid clicking.","Clears the interval on unmount to prevent memory leaks."]}}],Bv=Rv.map(r=>({id:`build-${r.id}`,sourceId:r.id,trackId:"react_practical",trackName:"React Machine Coding",category:"Machine Coding Builds",title:r.title,level:r.level==="Warm-up"?"Warm-up":r.level==="Core"?"Core":"Advanced",xp:60,hints:r.hints||[],tags:r.tags||[],why:`Timed build, roughly ${r.time}.`,theory:{hook:r.brief,deepDive:`${r.brief}

Requirements:
${(r.req||[]).map(o=>`• ${o}`).join(`
`)}`,interviewPitch:`"I'd start by naming the minimum state — ${(r.tags||[]).join(", ")} — and derive everything else, because derived values cannot fall out of sync."`},practice:{type:"jsx",task:r.brief,starterCode:r.start,solutionCode:r.sol,specs:r.req||[]}})),bc=[...Bv,...Dv,...Mv,...kv,...Ov,...Av,...qv.filter(r=>r.practice.starterCode),...Uv.filter(r=>r.practice.starterCode),..._v,...Hv],ey=new Map(bc.map((r,o)=>[r.id,o]));new Map(bc.map(r=>[r.id,r]));function Lv(){const r=cs.c(39),{user:o,isLoading:d}=gc(),{paletteOpen:c,setPaletteOpen:v,vimMode:O,toggleVimMode:R,suggestionsOn:N,toggleSuggestions:j}=pf(),D=Xg();let U,C;r[0]!==c||r[1]!==v?(U=()=>{const oe=vt=>{(vt.metaKey||vt.ctrlKey)&&vt.key.toLowerCase()==="k"&&(vt.preventDefault(),v(!c))},Re=Gv;return window.addEventListener("keydown",oe),window.addEventListener("unhandledrejection",Re),()=>{window.removeEventListener("keydown",oe),window.removeEventListener("unhandledrejection",Re)}},C=[c,v],r[0]=c,r[1]=v,r[2]=U,r[3]=C):(U=r[2],C=r[3]),ge.useEffect(U,C);let E;r[4]!==D?(E={id:"nav-mastery",label:"Go to Interview Mastery Cockpit",group:"Navigation",hint:"Home",run:()=>D("/")},r[4]=D,r[5]=E):E=r[5];let Y;r[6]!==D?(Y={id:"nav-rapid-fire",label:"Go to Rapid Fire Assessment",group:"Navigation",hint:"Sprint",run:()=>D("/rapid-fire")},r[6]=D,r[7]=Y):Y=r[7];let Q;r[8]!==D?(Q={id:"nav-playground",label:"Go to Code Playground",group:"Navigation",hint:"Sandbox",run:()=>D("/playground")},r[8]=D,r[9]=Q):Q=r[9];const J=`Toggle Vim Mode (${O?"Active":"Disabled"})`;let Z;r[10]!==R?(Z=()=>R(),r[10]=R,r[11]=Z):Z=r[11];let F;r[12]!==J||r[13]!==Z?(F={id:"toggle-vim",label:J,group:"Settings",hint:":w",run:Z},r[12]=J,r[13]=Z,r[14]=F):F=r[14];const V=`Toggle LSP Suggestions (${N?"Active":"Disabled"})`;let H;r[15]!==j?(H=()=>j(),r[15]=j,r[16]=H):H=r[16];let L;r[17]!==V||r[18]!==H?(L={id:"toggle-suggestions",label:V,group:"Settings",hint:"LSP",run:H},r[17]=V,r[18]=H,r[19]=L):L=r[19];let M;if(r[20]!==D||r[21]!==L||r[22]!==E||r[23]!==Y||r[24]!==Q||r[25]!==F){let oe;r[27]!==D?(oe=Re=>({id:`unit-${Re.id}`,label:`${Re.title} [${Re.level}]`,group:Re.trackName,hint:Re.category,run:()=>{localStorage.setItem("mastery:activeUnit",Re.id),window.dispatchEvent(new CustomEvent("mastery:selectUnit",{detail:Re.id})),D(`/?unit=${encodeURIComponent(Re.id)}`)}}),r[27]=D,r[28]=oe):oe=r[28],M=[E,Y,Q,F,L,...bc.map(oe)],r[20]=D,r[21]=L,r[22]=E,r[23]=Y,r[24]=Q,r[25]=F,r[26]=M}else M=r[26];const G=M;if(d){let oe;return r[29]===Symbol.for("react.memo_cache_sentinel")?(oe=A.jsx("div",{className:"flex h-screen w-full items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs",children:"Loading..."}),r[29]=oe):oe=r[29],oe}if(!o){let oe;return r[30]===Symbol.for("react.memo_cache_sentinel")?(oe=A.jsx(da,{to:"/auth",replace:!0}),r[30]=oe):oe=r[30],oe}let P,ae;r[31]===Symbol.for("react.memo_cache_sentinel")?(P=A.jsx(bv,{}),ae=A.jsx(Vg,{}),r[31]=P,r[32]=ae):(P=r[31],ae=r[32]);let me;r[33]!==G||r[34]!==c||r[35]!==v?(me=c&&A.jsx(vv,{onClose:()=>v(!1),actions:G}),r[33]=G,r[34]=c,r[35]=v,r[36]=me):me=r[36];let Qe;return r[37]!==me?(Qe=A.jsxs("div",{className:"flex flex-col h-screen bg-slate-950 text-slate-100",children:[P,ae,me]}),r[37]=me,r[38]=Qe):Qe=r[38],Qe}function Gv(r){r.reason&&typeof r.reason.message=="string"&&r.reason.message.includes("message channel closed before a response was received")&&r.preventDefault()}class Qv extends ge.Component{constructor(){super(...arguments);xm(this,"state",{error:null})}static getDerivedStateFromError(d){return{error:d}}componentDidCatch(d,c){console.error(`[${this.props.name}]`,d,c.componentStack)}render(){const{error:d}=this.state;return d?A.jsxs("div",{className:"h-full w-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-red-50/60 border border-red-200 rounded-xl",children:[A.jsx(tv,{size:22,className:"text-red-500"}),A.jsxs("div",{children:[A.jsxs("p",{className:"text-sm font-bold text-red-900",children:[this.props.name," stopped"]}),A.jsx("p",{className:"text-[11px] text-red-700/80 font-mono mt-1 max-w-sm break-words",children:d.message})]}),A.jsxs("button",{onClick:()=>this.setState({error:null}),className:"px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-red-300 text-red-800 hover:bg-red-50 flex items-center gap-1.5",children:[A.jsx($b,{size:12})," Retry this pane"]}),A.jsx("p",{className:"text-[10px] text-red-700/60",children:"The rest of the page is still live — your code and progress are intact."})]}):this.props.children}}function Yv(){const[r,o]=ge.useState(!0),[d,c]=ge.useState(""),[v,O]=ge.useState(""),[R,N]=ge.useState(""),{user:j,login:D}=gc();if(j)return A.jsx(da,{to:"/",replace:!0});const U=async C=>{C.preventDefault(),N("");const E=r?"/api/auth/login":"/api/auth/register";try{const Y=await fetch(E,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:d,password:v})}),Q=await Y.json();if(!Y.ok)throw new Error(Q.error||"Authentication failed");D(Q.token,Q.user)}catch(Y){N(Y.message)}};return A.jsx("div",{className:"flex h-screen w-full items-center justify-center bg-slate-950 p-4",children:A.jsxs("div",{className:"bg-slate-900/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-slate-800 text-slate-100 space-y-6",children:[A.jsxs("div",{className:"text-center space-y-1",children:[A.jsx("div",{className:"w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center mx-auto mb-2 shadow-xs",children:A.jsx(pc,{size:20})}),A.jsx("h2",{className:"text-2xl font-extrabold tracking-tight text-white",children:r?"Welcome Back":"Create Account"}),A.jsx("p",{className:"text-xs text-slate-400",children:"React 19 Interview Mastery Cockpit"})]}),R&&A.jsx("div",{className:"p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs rounded-xl",children:R}),A.jsxs("form",{onSubmit:U,className:"space-y-4",children:[A.jsxs("div",{className:"space-y-1",children:[A.jsx("label",{className:"block text-xs font-semibold text-slate-300",children:"Email"}),A.jsxs("div",{className:"relative",children:[A.jsx(Jb,{size:14,className:"absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"}),A.jsx("input",{type:"email",required:!0,value:d,onChange:C=>c(C.target.value),className:"w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl focus:outline-none focus:border-sky-500 text-xs text-slate-200"})]})]}),A.jsxs("div",{className:"space-y-1",children:[A.jsx("label",{className:"block text-xs font-semibold text-slate-300",children:"Password"}),A.jsxs("div",{className:"relative",children:[A.jsx(Xb,{size:14,className:"absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"}),A.jsx("input",{type:"password",required:!0,value:v,onChange:C=>O(C.target.value),className:"w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl focus:outline-none focus:border-sky-500 text-xs text-slate-200"})]})]}),A.jsx("button",{type:"submit",className:"w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 rounded-xl transition cursor-pointer shadow-lg text-xs",children:r?"Sign In":"Register"})]}),A.jsxs("div",{className:"text-center text-xs text-slate-400",children:[r?"Don't have an account? ":"Already have an account? ",A.jsx("button",{type:"button",onClick:()=>o(!r),className:"text-sky-400 font-bold hover:underline cursor-pointer",children:r?"Sign up":"Log in"})]})]})})}const Xv=ge.lazy(()=>qr(()=>import("./MasteryPage-V7zUi-7Q.js"),__vite__mapDeps([0,1,2,3,4,5]))),Vv=ge.lazy(()=>qr(()=>import("./PlaygroundPage-BdkBmQhg.js"),__vite__mapDeps([6,1,2,3]))),Kv=ge.lazy(()=>qr(()=>import("./RapidFirePage-BuK_dIHg.js"),__vite__mapDeps([7,1,2,5]))),Zv=ge.lazy(()=>qr(()=>import("./LearnPage-BtuumVwu.js"),__vite__mapDeps([8,1,2,4,5])));function Jv(){const r=cs.c(1);let o;return r[0]===Symbol.for("react.memo_cache_sentinel")?(o=A.jsx("div",{className:"h-full w-full flex items-center justify-center p-10 text-slate-400 text-xs",children:"loading…"}),r[0]=o):o=r[0],o}ab.createRoot(document.getElementById("root")).render(A.jsx(ge.StrictMode,{children:A.jsx(ib,{client:zb,children:A.jsx(pv,{children:A.jsx(Kg,{children:A.jsxs(Zg,{children:[A.jsx(gt,{path:"/auth",element:A.jsx(Yv,{})}),A.jsxs(gt,{element:A.jsx(Qv,{name:"The page",children:A.jsx(ge.Suspense,{fallback:A.jsx(Jv,{}),children:A.jsx(Lv,{})})}),children:[A.jsx(gt,{index:!0,element:A.jsx(Xv,{})}),A.jsx(gt,{path:"mastery",element:A.jsx(da,{to:"/",replace:!0})}),A.jsx(gt,{path:"playground",element:A.jsx(Vv,{})}),A.jsx(gt,{path:"learn",element:A.jsx(Zv,{})}),A.jsx(gt,{path:"css100",element:A.jsx(da,{to:"/",replace:!0})}),A.jsx(gt,{path:"arena",element:A.jsx(da,{to:"/",replace:!0})}),A.jsx(gt,{path:"challenges",element:A.jsx(da,{to:"/",replace:!0})}),A.jsx(gt,{path:"ladder",element:A.jsx(da,{to:"/",replace:!0})}),A.jsx(gt,{path:"targets",element:A.jsx(da,{to:"/",replace:!0})}),A.jsx(gt,{path:"match",element:A.jsx(da,{to:"/",replace:!0})}),A.jsx(gt,{path:"rapid",element:A.jsx(Kv,{})})]})]})})})})}));export{Xb as L,Pv as M,Fb as P,$b as R,pc as S,tv as T,ey as U,nv as Z,cs as a,bc as b,Yt as c,Qv as d,mv as e,hv as l,fv as r,$v as s,pf as u};
