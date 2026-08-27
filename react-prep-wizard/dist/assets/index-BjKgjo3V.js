const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MasteryPage-DOlCbYbr.js","assets/vendor-query-CVs38Wia.js","assets/vendor-react-KgNWHp-S.js","assets/KeyboardAccessoryBar-DTo_-pvw.js","assets/vendor-editor-B0XDVFHE.js","assets/vendor-icons-8bRW1Gx4.js","assets/useLibrary-pLlbh1SH.js","assets/FormattedMarkdown-V-fjr68T.js","assets/BottomSheetModal-CKhTNQJN.js","assets/PlaygroundPage-Dom9_St4.js","assets/NeuralMindTrigger-lz9WCevs.js","assets/RapidFirePage-gPayx2mX.js","assets/LearnPage-Bm6hw65q.js","assets/SwipeableCard-FLy8yjHS.js","assets/confetti.module-C94ZD2ww.js","assets/ProjectsPage-Co3Z_O_K.js"])))=>i.map(i=>d[i]);
var wf=Object.defineProperty;var kf=(r,c,h)=>c in r?wf(r,c,{enumerable:!0,configurable:!0,writable:!0,value:h}):r[c]=h;var Xa=(r,c,h)=>kf(r,typeof c!="symbol"?c+"":c,h);import{Q as Sf,j as y,a as Tf}from"./vendor-query-CVs38Wia.js";import{a as Gh,b as Nf,R as Vs,r as de,N as Zs,u as Yh,c as Of,d as Wt,O as Af,B as Cf,e as Df,f as $e}from"./vendor-react-KgNWHp-S.js";import{S as Js,G as Rf,L as Ef,Z as jf,P as zf,B as Mf,C as Xh,a as Qh,T as Vh,R as qf,M as _f,b as Uf}from"./vendor-icons-8bRW1Gx4.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const A of document.querySelectorAll('link[rel="modulepreload"]'))d(A);new MutationObserver(A=>{for(const O of A)if(O.type==="childList")for(const T of O.addedNodes)T.tagName==="LINK"&&T.rel==="modulepreload"&&d(T)}).observe(document,{childList:!0,subtree:!0});function h(A){const O={};return A.integrity&&(O.integrity=A.integrity),A.referrerPolicy&&(O.referrerPolicy=A.referrerPolicy),A.crossOrigin==="use-credentials"?O.credentials="include":A.crossOrigin==="anonymous"?O.credentials="omit":O.credentials="same-origin",O}function d(A){if(A.ep)return;A.ep=!0;const O=h(A);fetch(A.href,O)}})();const Bf="modulepreload",Hf=function(r){return"/"+r},Sh={},Si=function(c,h,d){let A=Promise.resolve();if(h&&h.length>0){let T=function(R){return Promise.all(R.map(q=>Promise.resolve(q).then(N=>({status:"fulfilled",value:N}),N=>({status:"rejected",reason:N}))))};document.getElementsByTagName("link");const C=document.querySelector("meta[property=csp-nonce]"),D=(C==null?void 0:C.nonce)||(C==null?void 0:C.getAttribute("nonce"));A=T(h.map(R=>{if(R=Hf(R),R in Sh)return;Sh[R]=!0;const q=R.endsWith(".css"),N=q?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${R}"]${N}`))return;const z=document.createElement("link");if(z.rel=q?"stylesheet":Bf,q||(z.as="script"),z.crossOrigin="",z.href=R,D&&z.setAttribute("nonce",D),document.head.appendChild(z),q)return new Promise((Y,Z)=>{z.addEventListener("load",Y),z.addEventListener("error",()=>Z(new Error(`Unable to preload CSS for ${R}`)))})}))}function O(T){const C=new Event("vite:preloadError",{cancelable:!0});if(C.payload=T,window.dispatchEvent(C),!C.defaultPrevented)throw T}return A.then(T=>{for(const C of T||[])C.status==="rejected"&&O(C.reason);return c().catch(O)})};var pl={exports:{}},fl={};/**
 * @license React
 * react-compiler-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Th;function Lf(){if(Th)return fl;Th=1;var r=Gh().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;return fl.c=function(c){return r.H.useMemoCache(c)},fl}var Nh;function Gf(){return Nh||(Nh=1,pl.exports=Lf()),pl.exports}var Ft=Gf(),gl={exports:{}},ki={},bl={exports:{}},vl={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oh;function Yf(){return Oh||(Oh=1,(function(r){function c(w,E){var U=w.length;w.push(E);e:for(;0<U;){var ue=U-1>>>1,L=w[ue];if(0<A(L,E))w[ue]=E,w[U]=L,U=ue;else break e}}function h(w){return w.length===0?null:w[0]}function d(w){if(w.length===0)return null;var E=w[0],U=w.pop();if(U!==E){w[0]=U;e:for(var ue=0,L=w.length,ie=L>>>1;ue<ie;){var se=2*(ue+1)-1,ae=w[se],we=se+1,Ot=w[we];if(0>A(ae,U))we<L&&0>A(Ot,ae)?(w[ue]=Ot,w[we]=U,ue=we):(w[ue]=ae,w[se]=U,ue=se);else if(we<L&&0>A(Ot,U))w[ue]=Ot,w[we]=U,ue=we;else break e}}return E}function A(w,E){var U=w.sortIndex-E.sortIndex;return U!==0?U:w.id-E.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var O=performance;r.unstable_now=function(){return O.now()}}else{var T=Date,C=T.now();r.unstable_now=function(){return T.now()-C}}var D=[],R=[],q=1,N=null,z=3,Y=!1,Z=!1,J=!1,Q=!1,X=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,B=typeof setImmediate<"u"?setImmediate:null;function W(w){for(var E=h(R);E!==null;){if(E.callback===null)d(R);else if(E.startTime<=w)d(R),E.sortIndex=E.expirationTime,c(D,E);else break;E=h(R)}}function P(w){if(J=!1,W(w),!Z)if(h(D)!==null)Z=!0,ke||(ke=!0,Ge());else{var E=h(R);E!==null&&Qe(P,E.startTime-w)}}var ke=!1,G=-1,le=5,Le=-1;function Pe(){return Q?!0:!(r.unstable_now()-Le<le)}function Xe(){if(Q=!1,ke){var w=r.unstable_now();Le=w;var E=!0;try{e:{Z=!1,J&&(J=!1,I(G),G=-1),Y=!0;var U=z;try{t:{for(W(w),N=h(D);N!==null&&!(N.expirationTime>w&&Pe());){var ue=N.callback;if(typeof ue=="function"){N.callback=null,z=N.priorityLevel;var L=ue(N.expirationTime<=w);if(w=r.unstable_now(),typeof L=="function"){N.callback=L,W(w),E=!0;break t}N===h(D)&&d(D),W(w)}else d(D);N=h(D)}if(N!==null)E=!0;else{var ie=h(R);ie!==null&&Qe(P,ie.startTime-w),E=!1}}break e}finally{N=null,z=U,Y=!1}E=void 0}}finally{E?Ge():ke=!1}}}var Ge;if(typeof B=="function")Ge=function(){B(Xe)};else if(typeof MessageChannel<"u"){var et=new MessageChannel,kt=et.port2;et.port1.onmessage=Xe,Ge=function(){kt.postMessage(null)}}else Ge=function(){X(Xe,0)};function Qe(w,E){G=X(function(){w(r.unstable_now())},E)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(w){w.callback=null},r.unstable_forceFrameRate=function(w){0>w||125<w?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):le=0<w?Math.floor(1e3/w):5},r.unstable_getCurrentPriorityLevel=function(){return z},r.unstable_next=function(w){switch(z){case 1:case 2:case 3:var E=3;break;default:E=z}var U=z;z=E;try{return w()}finally{z=U}},r.unstable_requestPaint=function(){Q=!0},r.unstable_runWithPriority=function(w,E){switch(w){case 1:case 2:case 3:case 4:case 5:break;default:w=3}var U=z;z=w;try{return E()}finally{z=U}},r.unstable_scheduleCallback=function(w,E,U){var ue=r.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?ue+U:ue):U=ue,w){case 1:var L=-1;break;case 2:L=250;break;case 5:L=1073741823;break;case 4:L=1e4;break;default:L=5e3}return L=U+L,w={id:q++,callback:E,priorityLevel:w,startTime:U,expirationTime:L,sortIndex:-1},U>ue?(w.sortIndex=U,c(R,w),h(D)===null&&w===h(R)&&(J?(I(G),G=-1):J=!0,Qe(P,U-ue))):(w.sortIndex=L,c(D,w),Z||Y||(Z=!0,ke||(ke=!0,Ge()))),w},r.unstable_shouldYield=Pe,r.unstable_wrapCallback=function(w){var E=z;return function(){var U=z;z=E;try{return w.apply(this,arguments)}finally{z=U}}}})(vl)),vl}var Ah;function Xf(){return Ah||(Ah=1,bl.exports=Yf()),bl.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ch;function Qf(){if(Ch)return ki;Ch=1;var r=Xf(),c=Gh(),h=Nf();function d(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function A(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function O(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function T(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function C(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function D(e){if(O(e)!==e)throw Error(d(188))}function R(e){var t=e.alternate;if(!t){if(t=O(e),t===null)throw Error(d(188));return t!==e?null:e}for(var a=e,n=t;;){var i=a.return;if(i===null)break;var s=i.alternate;if(s===null){if(n=i.return,n!==null){a=n;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===a)return D(i),e;if(s===n)return D(i),t;s=s.sibling}throw Error(d(188))}if(a.return!==n.return)a=i,n=s;else{for(var o=!1,l=i.child;l;){if(l===a){o=!0,a=i,n=s;break}if(l===n){o=!0,n=i,a=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===a){o=!0,a=s,n=i;break}if(l===n){o=!0,n=s,a=i;break}l=l.sibling}if(!o)throw Error(d(189))}}if(a.alternate!==n)throw Error(d(190))}if(a.tag!==3)throw Error(d(188));return a.stateNode.current===a?e:t}function q(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=q(e),t!==null)return t;e=e.sibling}return null}var N=Object.assign,z=Symbol.for("react.element"),Y=Symbol.for("react.transitional.element"),Z=Symbol.for("react.portal"),J=Symbol.for("react.fragment"),Q=Symbol.for("react.strict_mode"),X=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),B=Symbol.for("react.context"),W=Symbol.for("react.forward_ref"),P=Symbol.for("react.suspense"),ke=Symbol.for("react.suspense_list"),G=Symbol.for("react.memo"),le=Symbol.for("react.lazy"),Le=Symbol.for("react.activity"),Pe=Symbol.for("react.memo_cache_sentinel"),Xe=Symbol.iterator;function Ge(e){return e===null||typeof e!="object"?null:(e=Xe&&e[Xe]||e["@@iterator"],typeof e=="function"?e:null)}var et=Symbol.for("react.client.reference");function kt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===et?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case J:return"Fragment";case X:return"Profiler";case Q:return"StrictMode";case P:return"Suspense";case ke:return"SuspenseList";case Le:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Z:return"Portal";case B:return e.displayName||"Context";case I:return(e._context.displayName||"Context")+".Consumer";case W:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case G:return t=e.displayName||null,t!==null?t:kt(e.type)||"Memo";case le:t=e._payload,e=e._init;try{return kt(e(t))}catch{}}return null}var Qe=Array.isArray,w=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,E=h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,U={pending:!1,data:null,method:null,action:null},ue=[],L=-1;function ie(e){return{current:e}}function se(e){0>L||(e.current=ue[L],ue[L]=null,L--)}function ae(e,t){L++,ue[L]=e.current,e.current=t}var we=ie(null),Ot=ie(null),$t=ie(null),Ni=ie(null);function Oi(e,t){switch(ae($t,t),ae(Ot,e),ae(we,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Zu(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Zu(t),e=Ju(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}se(we),ae(we,e)}function Qa(){se(we),se(Ot),se($t)}function Ks(e){e.memoizedState!==null&&ae(Ni,e);var t=we.current,a=Ju(t,e.type);t!==a&&(ae(Ot,e),ae(we,a))}function Ai(e){Ot.current===e&&(se(we),se(Ot)),Ni.current===e&&(se(Ni),vi._currentValue=U)}var Is,kl;function Ta(e){if(Is===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Is=t&&t[1]||"",kl=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Is+e+kl}var Ws=!1;function Fs(e,t){if(!e||Ws)return"";Ws=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var S=function(){throw Error()};if(Object.defineProperty(S.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(S,[])}catch(v){var b=v}Reflect.construct(e,[],S)}else{try{S.call()}catch(v){b=v}e.call(S.prototype)}}else{try{throw Error()}catch(v){b=v}(S=e())&&typeof S.catch=="function"&&S.catch(function(){})}}catch(v){if(v&&b&&typeof v.stack=="string")return[v.stack,b.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=n.DetermineComponentFrameRoot(),o=s[0],l=s[1];if(o&&l){var u=o.split(`
`),g=l.split(`
`);for(i=n=0;n<u.length&&!u[n].includes("DetermineComponentFrameRoot");)n++;for(;i<g.length&&!g[i].includes("DetermineComponentFrameRoot");)i++;if(n===u.length||i===g.length)for(n=u.length-1,i=g.length-1;1<=n&&0<=i&&u[n]!==g[i];)i--;for(;1<=n&&0<=i;n--,i--)if(u[n]!==g[i]){if(n!==1||i!==1)do if(n--,i--,0>i||u[n]!==g[i]){var x=`
`+u[n].replace(" at new "," at ");return e.displayName&&x.includes("<anonymous>")&&(x=x.replace("<anonymous>",e.displayName)),x}while(1<=n&&0<=i);break}}}finally{Ws=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Ta(a):""}function Fh(e,t){switch(e.tag){case 26:case 27:case 5:return Ta(e.type);case 16:return Ta("Lazy");case 13:return e.child!==t&&t!==null?Ta("Suspense Fallback"):Ta("Suspense");case 19:return Ta("SuspenseList");case 0:case 15:return Fs(e.type,!1);case 11:return Fs(e.type.render,!1);case 1:return Fs(e.type,!0);case 31:return Ta("Activity");default:return""}}function Sl(e){try{var t="",a=null;do t+=Fh(e,a),a=e,e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}var $s=Object.prototype.hasOwnProperty,Ps=r.unstable_scheduleCallback,er=r.unstable_cancelCallback,$h=r.unstable_shouldYield,Ph=r.unstable_requestPaint,tt=r.unstable_now,em=r.unstable_getCurrentPriorityLevel,Tl=r.unstable_ImmediatePriority,Nl=r.unstable_UserBlockingPriority,Ci=r.unstable_NormalPriority,tm=r.unstable_LowPriority,Ol=r.unstable_IdlePriority,am=r.log,nm=r.unstable_setDisableYieldValue,Rn=null,at=null;function Pt(e){if(typeof am=="function"&&nm(e),at&&typeof at.setStrictMode=="function")try{at.setStrictMode(Rn,e)}catch{}}var nt=Math.clz32?Math.clz32:rm,im=Math.log,sm=Math.LN2;function rm(e){return e>>>=0,e===0?32:31-(im(e)/sm|0)|0}var Di=256,Ri=262144,Ei=4194304;function Na(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ji(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var i=0,s=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var l=n&134217727;return l!==0?(n=l&~s,n!==0?i=Na(n):(o&=l,o!==0?i=Na(o):a||(a=l&~e,a!==0&&(i=Na(a))))):(l=n&~s,l!==0?i=Na(l):o!==0?i=Na(o):a||(a=n&~e,a!==0&&(i=Na(a)))),i===0?0:t!==0&&t!==i&&(t&s)===0&&(s=i&-i,a=t&-t,s>=a||s===32&&(a&4194048)!==0)?t:i}function En(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function om(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Al(){var e=Ei;return Ei<<=1,(Ei&62914560)===0&&(Ei=4194304),e}function tr(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function jn(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function lm(e,t,a,n,i,s){var o=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var l=e.entanglements,u=e.expirationTimes,g=e.hiddenUpdates;for(a=o&~a;0<a;){var x=31-nt(a),S=1<<x;l[x]=0,u[x]=-1;var b=g[x];if(b!==null)for(g[x]=null,x=0;x<b.length;x++){var v=b[x];v!==null&&(v.lane&=-536870913)}a&=~S}n!==0&&Cl(e,n,0),s!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=s&~(o&~t))}function Cl(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-nt(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&261930}function Dl(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-nt(a),i=1<<n;i&t|e[n]&t&&(e[n]|=t),a&=~i}}function Rl(e,t){var a=t&-t;return a=(a&42)!==0?1:ar(a),(a&(e.suspendedLanes|t))!==0?0:a}function ar(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function nr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function El(){var e=E.p;return e!==0?e:(e=window.event,e===void 0?32:gh(e.type))}function jl(e,t){var a=E.p;try{return E.p=e,t()}finally{E.p=a}}var ea=Math.random().toString(36).slice(2),qe="__reactFiber$"+ea,Ve="__reactProps$"+ea,Va="__reactContainer$"+ea,ir="__reactEvents$"+ea,cm="__reactListeners$"+ea,dm="__reactHandles$"+ea,zl="__reactResources$"+ea,zn="__reactMarker$"+ea;function sr(e){delete e[qe],delete e[Ve],delete e[ir],delete e[cm],delete e[dm]}function Za(e){var t=e[qe];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Va]||a[qe]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=eh(e);e!==null;){if(a=e[qe])return a;e=eh(e)}return t}e=a,a=e.parentNode}return null}function Ja(e){if(e=e[qe]||e[Va]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Mn(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(d(33))}function Ka(e){var t=e[zl];return t||(t=e[zl]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function ze(e){e[zn]=!0}var Ml=new Set,ql={};function Oa(e,t){Ia(e,t),Ia(e+"Capture",t)}function Ia(e,t){for(ql[e]=t,e=0;e<t.length;e++)Ml.add(t[e])}var um=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),_l={},Ul={};function hm(e){return $s.call(Ul,e)?!0:$s.call(_l,e)?!1:um.test(e)?Ul[e]=!0:(_l[e]=!0,!1)}function zi(e,t,a){if(hm(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Mi(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function jt(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+n)}}function ut(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Bl(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function mm(e,t,a){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){a=""+o,s.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(o){a=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function rr(e){if(!e._valueTracker){var t=Bl(e)?"checked":"value";e._valueTracker=mm(e,t,""+e[t])}}function Hl(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=Bl(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}function qi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var pm=/[\n"\\]/g;function ht(e){return e.replace(pm,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function or(e,t,a,n,i,s,o,l){e.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.type=o:e.removeAttribute("type"),t!=null?o==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+ut(t)):e.value!==""+ut(t)&&(e.value=""+ut(t)):o!=="submit"&&o!=="reset"||e.removeAttribute("value"),t!=null?lr(e,o,ut(t)):a!=null?lr(e,o,ut(a)):n!=null&&e.removeAttribute("value"),i==null&&s!=null&&(e.defaultChecked=!!s),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?e.name=""+ut(l):e.removeAttribute("name")}function Ll(e,t,a,n,i,s,o,l){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||a!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){rr(e);return}a=a!=null?""+ut(a):"",t=t!=null?""+ut(t):a,l||t===e.value||(e.value=t),e.defaultValue=t}n=n??i,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=l?e.checked:!!n,e.defaultChecked=!!n,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.name=o),rr(e)}function lr(e,t,a){t==="number"&&qi(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Wa(e,t,a,n){if(e=e.options,t){t={};for(var i=0;i<a.length;i++)t["$"+a[i]]=!0;for(a=0;a<e.length;a++)i=t.hasOwnProperty("$"+e[a].value),e[a].selected!==i&&(e[a].selected=i),i&&n&&(e[a].defaultSelected=!0)}else{for(a=""+ut(a),t=null,i=0;i<e.length;i++){if(e[i].value===a){e[i].selected=!0,n&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Gl(e,t,a){if(t!=null&&(t=""+ut(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+ut(a):""}function Yl(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(d(92));if(Qe(n)){if(1<n.length)throw Error(d(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=ut(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n),rr(e)}function Fa(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var fm=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Xl(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||fm.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Ql(e,t,a){if(t!=null&&typeof t!="object")throw Error(d(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var i in t)n=t[i],t.hasOwnProperty(i)&&a[i]!==n&&Xl(e,i,n)}else for(var s in t)t.hasOwnProperty(s)&&Xl(e,s,t[s])}function cr(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),bm=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function _i(e){return bm.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function zt(){}var dr=null;function ur(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var $a=null,Pa=null;function Vl(e){var t=Ja(e);if(t&&(e=t.stateNode)){var a=e[Ve]||null;e:switch(e=t.stateNode,t.type){case"input":if(or(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ht(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var i=n[Ve]||null;if(!i)throw Error(d(90));or(n,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&Hl(n)}break e;case"textarea":Gl(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&Wa(e,!!a.multiple,t,!1)}}}var hr=!1;function Zl(e,t,a){if(hr)return e(t,a);hr=!0;try{var n=e(t);return n}finally{if(hr=!1,($a!==null||Pa!==null)&&(Ss(),$a&&(t=$a,e=Pa,Pa=$a=null,Vl(t),e)))for(t=0;t<e.length;t++)Vl(e[t])}}function qn(e,t){var a=e.stateNode;if(a===null)return null;var n=a[Ve]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(d(231,t,typeof a));return a}var Mt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),mr=!1;if(Mt)try{var _n={};Object.defineProperty(_n,"passive",{get:function(){mr=!0}}),window.addEventListener("test",_n,_n),window.removeEventListener("test",_n,_n)}catch{mr=!1}var ta=null,pr=null,Ui=null;function Jl(){if(Ui)return Ui;var e,t=pr,a=t.length,n,i="value"in ta?ta.value:ta.textContent,s=i.length;for(e=0;e<a&&t[e]===i[e];e++);var o=a-e;for(n=1;n<=o&&t[a-n]===i[s-n];n++);return Ui=i.slice(e,1<n?1-n:void 0)}function Bi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Hi(){return!0}function Kl(){return!1}function Ze(e){function t(a,n,i,s,o){this._reactName=a,this._targetInst=i,this.type=n,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(a=e[l],this[l]=a?a(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Hi:Kl,this.isPropagationStopped=Kl,this}return N(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Hi)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Hi)},persist:function(){},isPersistent:Hi}),t}var Aa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Li=Ze(Aa),Un=N({},Aa,{view:0,detail:0}),vm=Ze(Un),fr,gr,Bn,Gi=N({},Un,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Bn&&(Bn&&e.type==="mousemove"?(fr=e.screenX-Bn.screenX,gr=e.screenY-Bn.screenY):gr=fr=0,Bn=e),fr)},movementY:function(e){return"movementY"in e?e.movementY:gr}}),Il=Ze(Gi),ym=N({},Gi,{dataTransfer:0}),xm=Ze(ym),wm=N({},Un,{relatedTarget:0}),br=Ze(wm),km=N({},Aa,{animationName:0,elapsedTime:0,pseudoElement:0}),Sm=Ze(km),Tm=N({},Aa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Nm=Ze(Tm),Om=N({},Aa,{data:0}),Wl=Ze(Om),Am={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Cm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Dm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Rm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Dm[e])?!!t[e]:!1}function vr(){return Rm}var Em=N({},Un,{key:function(e){if(e.key){var t=Am[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Bi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Cm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vr,charCode:function(e){return e.type==="keypress"?Bi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Bi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jm=Ze(Em),zm=N({},Gi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Fl=Ze(zm),Mm=N({},Un,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vr}),qm=Ze(Mm),_m=N({},Aa,{propertyName:0,elapsedTime:0,pseudoElement:0}),Um=Ze(_m),Bm=N({},Gi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Hm=Ze(Bm),Lm=N({},Aa,{newState:0,oldState:0}),Gm=Ze(Lm),Ym=[9,13,27,32],yr=Mt&&"CompositionEvent"in window,Hn=null;Mt&&"documentMode"in document&&(Hn=document.documentMode);var Xm=Mt&&"TextEvent"in window&&!Hn,$l=Mt&&(!yr||Hn&&8<Hn&&11>=Hn),Pl=" ",ec=!1;function tc(e,t){switch(e){case"keyup":return Ym.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ac(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var en=!1;function Qm(e,t){switch(e){case"compositionend":return ac(t);case"keypress":return t.which!==32?null:(ec=!0,Pl);case"textInput":return e=t.data,e===Pl&&ec?null:e;default:return null}}function Vm(e,t){if(en)return e==="compositionend"||!yr&&tc(e,t)?(e=Jl(),Ui=pr=ta=null,en=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $l&&t.locale!=="ko"?null:t.data;default:return null}}var Zm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function nc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Zm[e.type]:t==="textarea"}function ic(e,t,a,n){$a?Pa?Pa.push(n):Pa=[n]:$a=n,t=Rs(t,"onChange"),0<t.length&&(a=new Li("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var Ln=null,Gn=null;function Jm(e){Lu(e,0)}function Yi(e){var t=Mn(e);if(Hl(t))return e}function sc(e,t){if(e==="change")return t}var rc=!1;if(Mt){var xr;if(Mt){var wr="oninput"in document;if(!wr){var oc=document.createElement("div");oc.setAttribute("oninput","return;"),wr=typeof oc.oninput=="function"}xr=wr}else xr=!1;rc=xr&&(!document.documentMode||9<document.documentMode)}function lc(){Ln&&(Ln.detachEvent("onpropertychange",cc),Gn=Ln=null)}function cc(e){if(e.propertyName==="value"&&Yi(Gn)){var t=[];ic(t,Gn,e,ur(e)),Zl(Jm,t)}}function Km(e,t,a){e==="focusin"?(lc(),Ln=t,Gn=a,Ln.attachEvent("onpropertychange",cc)):e==="focusout"&&lc()}function Im(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Yi(Gn)}function Wm(e,t){if(e==="click")return Yi(t)}function Fm(e,t){if(e==="input"||e==="change")return Yi(t)}function $m(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var it=typeof Object.is=="function"?Object.is:$m;function Yn(e,t){if(it(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var i=a[n];if(!$s.call(t,i)||!it(e[i],t[i]))return!1}return!0}function dc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function uc(e,t){var a=dc(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=dc(a)}}function hc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?hc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function mc(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=qi(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=qi(e.document)}return t}function kr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Pm=Mt&&"documentMode"in document&&11>=document.documentMode,tn=null,Sr=null,Xn=null,Tr=!1;function pc(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Tr||tn==null||tn!==qi(n)||(n=tn,"selectionStart"in n&&kr(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Xn&&Yn(Xn,n)||(Xn=n,n=Rs(Sr,"onSelect"),0<n.length&&(t=new Li("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=tn)))}function Ca(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var an={animationend:Ca("Animation","AnimationEnd"),animationiteration:Ca("Animation","AnimationIteration"),animationstart:Ca("Animation","AnimationStart"),transitionrun:Ca("Transition","TransitionRun"),transitionstart:Ca("Transition","TransitionStart"),transitioncancel:Ca("Transition","TransitionCancel"),transitionend:Ca("Transition","TransitionEnd")},Nr={},fc={};Mt&&(fc=document.createElement("div").style,"AnimationEvent"in window||(delete an.animationend.animation,delete an.animationiteration.animation,delete an.animationstart.animation),"TransitionEvent"in window||delete an.transitionend.transition);function Da(e){if(Nr[e])return Nr[e];if(!an[e])return e;var t=an[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in fc)return Nr[e]=t[a];return e}var gc=Da("animationend"),bc=Da("animationiteration"),vc=Da("animationstart"),ep=Da("transitionrun"),tp=Da("transitionstart"),ap=Da("transitioncancel"),yc=Da("transitionend"),xc=new Map,Or="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Or.push("scrollEnd");function St(e,t){xc.set(e,t),Oa(t,[e])}var Xi=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},mt=[],nn=0,Ar=0;function Qi(){for(var e=nn,t=Ar=nn=0;t<e;){var a=mt[t];mt[t++]=null;var n=mt[t];mt[t++]=null;var i=mt[t];mt[t++]=null;var s=mt[t];if(mt[t++]=null,n!==null&&i!==null){var o=n.pending;o===null?i.next=i:(i.next=o.next,o.next=i),n.pending=i}s!==0&&wc(a,i,s)}}function Vi(e,t,a,n){mt[nn++]=e,mt[nn++]=t,mt[nn++]=a,mt[nn++]=n,Ar|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function Cr(e,t,a,n){return Vi(e,t,a,n),Zi(e)}function Ra(e,t){return Vi(e,null,null,t),Zi(e)}function wc(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var i=!1,s=e.return;s!==null;)s.childLanes|=a,n=s.alternate,n!==null&&(n.childLanes|=a),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(i=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,i&&t!==null&&(i=31-nt(a),e=s.hiddenUpdates,n=e[i],n===null?e[i]=[t]:n.push(t),t.lane=a|536870912),s):null}function Zi(e){if(50<ui)throw ui=0,Bo=null,Error(d(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var sn={};function np(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function st(e,t,a,n){return new np(e,t,a,n)}function Dr(e){return e=e.prototype,!(!e||!e.isReactComponent)}function qt(e,t){var a=e.alternate;return a===null?(a=st(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function kc(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ji(e,t,a,n,i,s){var o=0;if(n=e,typeof e=="function")Dr(e)&&(o=1);else if(typeof e=="string")o=cf(e,a,we.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Le:return e=st(31,a,t,i),e.elementType=Le,e.lanes=s,e;case J:return Ea(a.children,i,s,t);case Q:o=8,i|=24;break;case X:return e=st(12,a,t,i|2),e.elementType=X,e.lanes=s,e;case P:return e=st(13,a,t,i),e.elementType=P,e.lanes=s,e;case ke:return e=st(19,a,t,i),e.elementType=ke,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case B:o=10;break e;case I:o=9;break e;case W:o=11;break e;case G:o=14;break e;case le:o=16,n=null;break e}o=29,a=Error(d(130,e===null?"null":typeof e,"")),n=null}return t=st(o,a,t,i),t.elementType=e,t.type=n,t.lanes=s,t}function Ea(e,t,a,n){return e=st(7,e,n,t),e.lanes=a,e}function Rr(e,t,a){return e=st(6,e,null,t),e.lanes=a,e}function Sc(e){var t=st(18,null,null,0);return t.stateNode=e,t}function Er(e,t,a){return t=st(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Tc=new WeakMap;function pt(e,t){if(typeof e=="object"&&e!==null){var a=Tc.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Sl(t)},Tc.set(e,t),t)}return{value:e,source:t,stack:Sl(t)}}var rn=[],on=0,Ki=null,Qn=0,ft=[],gt=0,aa=null,At=1,Ct="";function _t(e,t){rn[on++]=Qn,rn[on++]=Ki,Ki=e,Qn=t}function Nc(e,t,a){ft[gt++]=At,ft[gt++]=Ct,ft[gt++]=aa,aa=e;var n=At;e=Ct;var i=32-nt(n)-1;n&=~(1<<i),a+=1;var s=32-nt(t)+i;if(30<s){var o=i-i%5;s=(n&(1<<o)-1).toString(32),n>>=o,i-=o,At=1<<32-nt(t)+i|a<<i|n,Ct=s+e}else At=1<<s|a<<i|n,Ct=e}function jr(e){e.return!==null&&(_t(e,1),Nc(e,1,0))}function zr(e){for(;e===Ki;)Ki=rn[--on],rn[on]=null,Qn=rn[--on],rn[on]=null;for(;e===aa;)aa=ft[--gt],ft[gt]=null,Ct=ft[--gt],ft[gt]=null,At=ft[--gt],ft[gt]=null}function Oc(e,t){ft[gt++]=At,ft[gt++]=Ct,ft[gt++]=aa,At=t.id,Ct=t.overflow,aa=e}var _e=null,ve=null,ne=!1,na=null,bt=!1,Mr=Error(d(519));function ia(e){var t=Error(d(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Vn(pt(t,e)),Mr}function Ac(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[qe]=e,t[Ve]=n,a){case"dialog":$("cancel",t),$("close",t);break;case"iframe":case"object":case"embed":$("load",t);break;case"video":case"audio":for(a=0;a<mi.length;a++)$(mi[a],t);break;case"source":$("error",t);break;case"img":case"image":case"link":$("error",t),$("load",t);break;case"details":$("toggle",t);break;case"input":$("invalid",t),Ll(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":$("invalid",t);break;case"textarea":$("invalid",t),Yl(t,n.value,n.defaultValue,n.children)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||Qu(t.textContent,a)?(n.popover!=null&&($("beforetoggle",t),$("toggle",t)),n.onScroll!=null&&$("scroll",t),n.onScrollEnd!=null&&$("scrollend",t),n.onClick!=null&&(t.onclick=zt),t=!0):t=!1,t||ia(e,!0)}function Cc(e){for(_e=e.return;_e;)switch(_e.tag){case 5:case 31:case 13:bt=!1;return;case 27:case 3:bt=!0;return;default:_e=_e.return}}function ln(e){if(e!==_e)return!1;if(!ne)return Cc(e),ne=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Po(e.type,e.memoizedProps)),a=!a),a&&ve&&ia(e),Cc(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));ve=Pu(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));ve=Pu(e)}else t===27?(t=ve,va(e.type)?(e=il,il=null,ve=e):ve=t):ve=_e?yt(e.stateNode.nextSibling):null;return!0}function ja(){ve=_e=null,ne=!1}function qr(){var e=na;return e!==null&&(We===null?We=e:We.push.apply(We,e),na=null),e}function Vn(e){na===null?na=[e]:na.push(e)}var _r=ie(null),za=null,Ut=null;function sa(e,t,a){ae(_r,t._currentValue),t._currentValue=a}function Bt(e){e._currentValue=_r.current,se(_r)}function Ur(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function Br(e,t,a,n){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var s=i.dependencies;if(s!==null){var o=i.child;s=s.firstContext;e:for(;s!==null;){var l=s;s=i;for(var u=0;u<t.length;u++)if(l.context===t[u]){s.lanes|=a,l=s.alternate,l!==null&&(l.lanes|=a),Ur(s.return,a,e),n||(o=null);break e}s=l.next}}else if(i.tag===18){if(o=i.return,o===null)throw Error(d(341));o.lanes|=a,s=o.alternate,s!==null&&(s.lanes|=a),Ur(o,a,e),o=null}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}}function cn(e,t,a,n){e=null;for(var i=t,s=!1;i!==null;){if(!s){if((i.flags&524288)!==0)s=!0;else if((i.flags&262144)!==0)break}if(i.tag===10){var o=i.alternate;if(o===null)throw Error(d(387));if(o=o.memoizedProps,o!==null){var l=i.type;it(i.pendingProps.value,o.value)||(e!==null?e.push(l):e=[l])}}else if(i===Ni.current){if(o=i.alternate,o===null)throw Error(d(387));o.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(vi):e=[vi])}i=i.return}e!==null&&Br(t,e,a,n),t.flags|=262144}function Ii(e){for(e=e.firstContext;e!==null;){if(!it(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ma(e){za=e,Ut=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ue(e){return Dc(za,e)}function Wi(e,t){return za===null&&Ma(e),Dc(e,t)}function Dc(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Ut===null){if(e===null)throw Error(d(308));Ut=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ut=Ut.next=t;return a}var ip=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},sp=r.unstable_scheduleCallback,rp=r.unstable_NormalPriority,Ae={$$typeof:B,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Hr(){return{controller:new ip,data:new Map,refCount:0}}function Zn(e){e.refCount--,e.refCount===0&&sp(rp,function(){e.controller.abort()})}var Jn=null,Lr=0,dn=0,un=null;function op(e,t){if(Jn===null){var a=Jn=[];Lr=0,dn=Qo(),un={status:"pending",value:void 0,then:function(n){a.push(n)}}}return Lr++,t.then(Rc,Rc),t}function Rc(){if(--Lr===0&&Jn!==null){un!==null&&(un.status="fulfilled");var e=Jn;Jn=null,dn=0,un=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function lp(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(i){a.push(i)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var i=0;i<a.length;i++)(0,a[i])(t)},function(i){for(n.status="rejected",n.reason=i,i=0;i<a.length;i++)(0,a[i])(void 0)}),n}var Ec=w.S;w.S=function(e,t){pu=tt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&op(e,t),Ec!==null&&Ec(e,t)};var qa=ie(null);function Gr(){var e=qa.current;return e!==null?e:be.pooledCache}function Fi(e,t){t===null?ae(qa,qa.current):ae(qa,t.pool)}function jc(){var e=Gr();return e===null?null:{parent:Ae._currentValue,pool:e}}var hn=Error(d(460)),Yr=Error(d(474)),$i=Error(d(542)),Pi={then:function(){}};function zc(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Mc(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(zt,zt),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_c(e),e;default:if(typeof t.status=="string")t.then(zt,zt);else{if(e=be,e!==null&&100<e.shellSuspendCounter)throw Error(d(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=n}},function(n){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_c(e),e}throw Ua=t,hn}}function _a(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ua=a,hn):a}}var Ua=null;function qc(){if(Ua===null)throw Error(d(459));var e=Ua;return Ua=null,e}function _c(e){if(e===hn||e===$i)throw Error(d(483))}var mn=null,Kn=0;function es(e){var t=Kn;return Kn+=1,mn===null&&(mn=[]),Mc(mn,e,t)}function In(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ts(e,t){throw t.$$typeof===z?Error(d(525)):(e=Object.prototype.toString.call(t),Error(d(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Uc(e){function t(p,m){if(e){var f=p.deletions;f===null?(p.deletions=[m],p.flags|=16):f.push(m)}}function a(p,m){if(!e)return null;for(;m!==null;)t(p,m),m=m.sibling;return null}function n(p){for(var m=new Map;p!==null;)p.key!==null?m.set(p.key,p):m.set(p.index,p),p=p.sibling;return m}function i(p,m){return p=qt(p,m),p.index=0,p.sibling=null,p}function s(p,m,f){return p.index=f,e?(f=p.alternate,f!==null?(f=f.index,f<m?(p.flags|=67108866,m):f):(p.flags|=67108866,m)):(p.flags|=1048576,m)}function o(p){return e&&p.alternate===null&&(p.flags|=67108866),p}function l(p,m,f,k){return m===null||m.tag!==6?(m=Rr(f,p.mode,k),m.return=p,m):(m=i(m,f),m.return=p,m)}function u(p,m,f,k){var _=f.type;return _===J?x(p,m,f.props.children,k,f.key):m!==null&&(m.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===le&&_a(_)===m.type)?(m=i(m,f.props),In(m,f),m.return=p,m):(m=Ji(f.type,f.key,f.props,null,p.mode,k),In(m,f),m.return=p,m)}function g(p,m,f,k){return m===null||m.tag!==4||m.stateNode.containerInfo!==f.containerInfo||m.stateNode.implementation!==f.implementation?(m=Er(f,p.mode,k),m.return=p,m):(m=i(m,f.children||[]),m.return=p,m)}function x(p,m,f,k,_){return m===null||m.tag!==7?(m=Ea(f,p.mode,k,_),m.return=p,m):(m=i(m,f),m.return=p,m)}function S(p,m,f){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return m=Rr(""+m,p.mode,f),m.return=p,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Y:return f=Ji(m.type,m.key,m.props,null,p.mode,f),In(f,m),f.return=p,f;case Z:return m=Er(m,p.mode,f),m.return=p,m;case le:return m=_a(m),S(p,m,f)}if(Qe(m)||Ge(m))return m=Ea(m,p.mode,f,null),m.return=p,m;if(typeof m.then=="function")return S(p,es(m),f);if(m.$$typeof===B)return S(p,Wi(p,m),f);ts(p,m)}return null}function b(p,m,f,k){var _=m!==null?m.key:null;if(typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint")return _!==null?null:l(p,m,""+f,k);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Y:return f.key===_?u(p,m,f,k):null;case Z:return f.key===_?g(p,m,f,k):null;case le:return f=_a(f),b(p,m,f,k)}if(Qe(f)||Ge(f))return _!==null?null:x(p,m,f,k,null);if(typeof f.then=="function")return b(p,m,es(f),k);if(f.$$typeof===B)return b(p,m,Wi(p,f),k);ts(p,f)}return null}function v(p,m,f,k,_){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return p=p.get(f)||null,l(m,p,""+k,_);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Y:return p=p.get(k.key===null?f:k.key)||null,u(m,p,k,_);case Z:return p=p.get(k.key===null?f:k.key)||null,g(m,p,k,_);case le:return k=_a(k),v(p,m,f,k,_)}if(Qe(k)||Ge(k))return p=p.get(f)||null,x(m,p,k,_,null);if(typeof k.then=="function")return v(p,m,f,es(k),_);if(k.$$typeof===B)return v(p,m,f,Wi(m,k),_);ts(m,k)}return null}function j(p,m,f,k){for(var _=null,re=null,M=m,K=m=0,te=null;M!==null&&K<f.length;K++){M.index>K?(te=M,M=null):te=M.sibling;var oe=b(p,M,f[K],k);if(oe===null){M===null&&(M=te);break}e&&M&&oe.alternate===null&&t(p,M),m=s(oe,m,K),re===null?_=oe:re.sibling=oe,re=oe,M=te}if(K===f.length)return a(p,M),ne&&_t(p,K),_;if(M===null){for(;K<f.length;K++)M=S(p,f[K],k),M!==null&&(m=s(M,m,K),re===null?_=M:re.sibling=M,re=M);return ne&&_t(p,K),_}for(M=n(M);K<f.length;K++)te=v(M,p,K,f[K],k),te!==null&&(e&&te.alternate!==null&&M.delete(te.key===null?K:te.key),m=s(te,m,K),re===null?_=te:re.sibling=te,re=te);return e&&M.forEach(function(Sa){return t(p,Sa)}),ne&&_t(p,K),_}function H(p,m,f,k){if(f==null)throw Error(d(151));for(var _=null,re=null,M=m,K=m=0,te=null,oe=f.next();M!==null&&!oe.done;K++,oe=f.next()){M.index>K?(te=M,M=null):te=M.sibling;var Sa=b(p,M,oe.value,k);if(Sa===null){M===null&&(M=te);break}e&&M&&Sa.alternate===null&&t(p,M),m=s(Sa,m,K),re===null?_=Sa:re.sibling=Sa,re=Sa,M=te}if(oe.done)return a(p,M),ne&&_t(p,K),_;if(M===null){for(;!oe.done;K++,oe=f.next())oe=S(p,oe.value,k),oe!==null&&(m=s(oe,m,K),re===null?_=oe:re.sibling=oe,re=oe);return ne&&_t(p,K),_}for(M=n(M);!oe.done;K++,oe=f.next())oe=v(M,p,K,oe.value,k),oe!==null&&(e&&oe.alternate!==null&&M.delete(oe.key===null?K:oe.key),m=s(oe,m,K),re===null?_=oe:re.sibling=oe,re=oe);return e&&M.forEach(function(xf){return t(p,xf)}),ne&&_t(p,K),_}function ge(p,m,f,k){if(typeof f=="object"&&f!==null&&f.type===J&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Y:e:{for(var _=f.key;m!==null;){if(m.key===_){if(_=f.type,_===J){if(m.tag===7){a(p,m.sibling),k=i(m,f.props.children),k.return=p,p=k;break e}}else if(m.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===le&&_a(_)===m.type){a(p,m.sibling),k=i(m,f.props),In(k,f),k.return=p,p=k;break e}a(p,m);break}else t(p,m);m=m.sibling}f.type===J?(k=Ea(f.props.children,p.mode,k,f.key),k.return=p,p=k):(k=Ji(f.type,f.key,f.props,null,p.mode,k),In(k,f),k.return=p,p=k)}return o(p);case Z:e:{for(_=f.key;m!==null;){if(m.key===_)if(m.tag===4&&m.stateNode.containerInfo===f.containerInfo&&m.stateNode.implementation===f.implementation){a(p,m.sibling),k=i(m,f.children||[]),k.return=p,p=k;break e}else{a(p,m);break}else t(p,m);m=m.sibling}k=Er(f,p.mode,k),k.return=p,p=k}return o(p);case le:return f=_a(f),ge(p,m,f,k)}if(Qe(f))return j(p,m,f,k);if(Ge(f)){if(_=Ge(f),typeof _!="function")throw Error(d(150));return f=_.call(f),H(p,m,f,k)}if(typeof f.then=="function")return ge(p,m,es(f),k);if(f.$$typeof===B)return ge(p,m,Wi(p,f),k);ts(p,f)}return typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint"?(f=""+f,m!==null&&m.tag===6?(a(p,m.sibling),k=i(m,f),k.return=p,p=k):(a(p,m),k=Rr(f,p.mode,k),k.return=p,p=k),o(p)):a(p,m)}return function(p,m,f,k){try{Kn=0;var _=ge(p,m,f,k);return mn=null,_}catch(M){if(M===hn||M===$i)throw M;var re=st(29,M,null,p.mode);return re.lanes=k,re.return=p,re}finally{}}}var Ba=Uc(!0),Bc=Uc(!1),ra=!1;function Xr(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Qr(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function oa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function la(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(ce&2)!==0){var i=n.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),n.pending=t,t=Zi(e),wc(e,null,a),t}return Vi(e,n,t,a),Zi(e)}function Wn(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Dl(e,a)}}function Vr(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var i=null,s=null;if(a=a.firstBaseUpdate,a!==null){do{var o={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};s===null?i=s=o:s=s.next=o,a=a.next}while(a!==null);s===null?i=s=t:s=s.next=t}else i=s=t;a={baseState:n.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Zr=!1;function Fn(){if(Zr){var e=un;if(e!==null)throw e}}function $n(e,t,a,n){Zr=!1;var i=e.updateQueue;ra=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,g=u.next;u.next=null,o===null?s=g:o.next=g,o=u;var x=e.alternate;x!==null&&(x=x.updateQueue,l=x.lastBaseUpdate,l!==o&&(l===null?x.firstBaseUpdate=g:l.next=g,x.lastBaseUpdate=u))}if(s!==null){var S=i.baseState;o=0,x=g=u=null,l=s;do{var b=l.lane&-536870913,v=b!==l.lane;if(v?(ee&b)===b:(n&b)===b){b!==0&&b===dn&&(Zr=!0),x!==null&&(x=x.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});e:{var j=e,H=l;b=t;var ge=a;switch(H.tag){case 1:if(j=H.payload,typeof j=="function"){S=j.call(ge,S,b);break e}S=j;break e;case 3:j.flags=j.flags&-65537|128;case 0:if(j=H.payload,b=typeof j=="function"?j.call(ge,S,b):j,b==null)break e;S=N({},S,b);break e;case 2:ra=!0}}b=l.callback,b!==null&&(e.flags|=64,v&&(e.flags|=8192),v=i.callbacks,v===null?i.callbacks=[b]:v.push(b))}else v={lane:b,tag:l.tag,payload:l.payload,callback:l.callback,next:null},x===null?(g=x=v,u=S):x=x.next=v,o|=b;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;v=l,l=v.next,v.next=null,i.lastBaseUpdate=v,i.shared.pending=null}}while(!0);x===null&&(u=S),i.baseState=u,i.firstBaseUpdate=g,i.lastBaseUpdate=x,s===null&&(i.shared.lanes=0),ma|=o,e.lanes=o,e.memoizedState=S}}function Hc(e,t){if(typeof e!="function")throw Error(d(191,e));e.call(t)}function Lc(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Hc(a[e],t)}var pn=ie(null),as=ie(0);function Gc(e,t){e=Jt,ae(as,e),ae(pn,t),Jt=e|t.baseLanes}function Jr(){ae(as,Jt),ae(pn,pn.current)}function Kr(){Jt=as.current,se(pn),se(as)}var rt=ie(null),vt=null;function ca(e){var t=e.alternate;ae(Ne,Ne.current&1),ae(rt,e),vt===null&&(t===null||pn.current!==null||t.memoizedState!==null)&&(vt=e)}function Ir(e){ae(Ne,Ne.current),ae(rt,e),vt===null&&(vt=e)}function Yc(e){e.tag===22?(ae(Ne,Ne.current),ae(rt,e),vt===null&&(vt=e)):da()}function da(){ae(Ne,Ne.current),ae(rt,rt.current)}function ot(e){se(rt),vt===e&&(vt=null),se(Ne)}var Ne=ie(0);function ns(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||al(a)||nl(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ht=0,V=null,pe=null,Ce=null,is=!1,fn=!1,Ha=!1,ss=0,Pn=0,gn=null,cp=0;function Se(){throw Error(d(321))}function Wr(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!it(e[a],t[a]))return!1;return!0}function Fr(e,t,a,n,i,s){return Ht=s,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,w.H=e===null||e.memoizedState===null?Nd:mo,Ha=!1,s=a(n,i),Ha=!1,fn&&(s=Qc(t,a,n,i)),Xc(e),s}function Xc(e){w.H=ai;var t=pe!==null&&pe.next!==null;if(Ht=0,Ce=pe=V=null,is=!1,Pn=0,gn=null,t)throw Error(d(300));e===null||De||(e=e.dependencies,e!==null&&Ii(e)&&(De=!0))}function Qc(e,t,a,n){V=e;var i=0;do{if(fn&&(gn=null),Pn=0,fn=!1,25<=i)throw Error(d(301));if(i+=1,Ce=pe=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}w.H=Od,s=t(a,n)}while(fn);return s}function dp(){var e=w.H,t=e.useState()[0];return t=typeof t.then=="function"?ei(t):t,e=e.useState()[0],(pe!==null?pe.memoizedState:null)!==e&&(V.flags|=1024),t}function $r(){var e=ss!==0;return ss=0,e}function Pr(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function eo(e){if(is){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}is=!1}Ht=0,Ce=pe=V=null,fn=!1,Pn=ss=0,gn=null}function Ye(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ce===null?V.memoizedState=Ce=e:Ce=Ce.next=e,Ce}function Oe(){if(pe===null){var e=V.alternate;e=e!==null?e.memoizedState:null}else e=pe.next;var t=Ce===null?V.memoizedState:Ce.next;if(t!==null)Ce=t,pe=e;else{if(e===null)throw V.alternate===null?Error(d(467)):Error(d(310));pe=e,e={memoizedState:pe.memoizedState,baseState:pe.baseState,baseQueue:pe.baseQueue,queue:pe.queue,next:null},Ce===null?V.memoizedState=Ce=e:Ce=Ce.next=e}return Ce}function rs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ei(e){var t=Pn;return Pn+=1,gn===null&&(gn=[]),e=Mc(gn,e,t),t=V,(Ce===null?t.memoizedState:Ce.next)===null&&(t=t.alternate,w.H=t===null||t.memoizedState===null?Nd:mo),e}function os(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ei(e);if(e.$$typeof===B)return Ue(e)}throw Error(d(438,String(e)))}function to(e){var t=null,a=V.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=V.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=rs(),V.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=Pe;return t.index++,a}function Lt(e,t){return typeof t=="function"?t(e):t}function ls(e){var t=Oe();return ao(t,pe,e)}function ao(e,t,a){var n=e.queue;if(n===null)throw Error(d(311));n.lastRenderedReducer=a;var i=e.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}t.baseQueue=i=s,n.pending=null}if(s=e.baseState,i===null)e.memoizedState=s;else{t=i.next;var l=o=null,u=null,g=t,x=!1;do{var S=g.lane&-536870913;if(S!==g.lane?(ee&S)===S:(Ht&S)===S){var b=g.revertLane;if(b===0)u!==null&&(u=u.next={lane:0,revertLane:0,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),S===dn&&(x=!0);else if((Ht&b)===b){g=g.next,b===dn&&(x=!0);continue}else S={lane:0,revertLane:g.revertLane,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},u===null?(l=u=S,o=s):u=u.next=S,V.lanes|=b,ma|=b;S=g.action,Ha&&a(s,S),s=g.hasEagerState?g.eagerState:a(s,S)}else b={lane:S,revertLane:g.revertLane,gesture:g.gesture,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},u===null?(l=u=b,o=s):u=u.next=b,V.lanes|=S,ma|=S;g=g.next}while(g!==null&&g!==t);if(u===null?o=s:u.next=l,!it(s,e.memoizedState)&&(De=!0,x&&(a=un,a!==null)))throw a;e.memoizedState=s,e.baseState=o,e.baseQueue=u,n.lastRenderedState=s}return i===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function no(e){var t=Oe(),a=t.queue;if(a===null)throw Error(d(311));a.lastRenderedReducer=e;var n=a.dispatch,i=a.pending,s=t.memoizedState;if(i!==null){a.pending=null;var o=i=i.next;do s=e(s,o.action),o=o.next;while(o!==i);it(s,t.memoizedState)||(De=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),a.lastRenderedState=s}return[s,n]}function Vc(e,t,a){var n=V,i=Oe(),s=ne;if(s){if(a===void 0)throw Error(d(407));a=a()}else a=t();var o=!it((pe||i).memoizedState,a);if(o&&(i.memoizedState=a,De=!0),i=i.queue,ro(Kc.bind(null,n,i,e),[e]),i.getSnapshot!==t||o||Ce!==null&&Ce.memoizedState.tag&1){if(n.flags|=2048,bn(9,{destroy:void 0},Jc.bind(null,n,i,a,t),null),be===null)throw Error(d(349));s||(Ht&127)!==0||Zc(n,t,a)}return a}function Zc(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=V.updateQueue,t===null?(t=rs(),V.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Jc(e,t,a,n){t.value=a,t.getSnapshot=n,Ic(t)&&Wc(e)}function Kc(e,t,a){return a(function(){Ic(t)&&Wc(e)})}function Ic(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!it(e,a)}catch{return!0}}function Wc(e){var t=Ra(e,2);t!==null&&Fe(t,e,2)}function io(e){var t=Ye();if(typeof e=="function"){var a=e;if(e=a(),Ha){Pt(!0);try{a()}finally{Pt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lt,lastRenderedState:e},t}function Fc(e,t,a,n){return e.baseState=a,ao(e,pe,typeof n=="function"?n:Lt)}function up(e,t,a,n,i){if(us(e))throw Error(d(485));if(e=t.action,e!==null){var s={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){s.listeners.push(o)}};w.T!==null?a(!0):s.isTransition=!1,n(s),a=t.pending,a===null?(s.next=t.pending=s,$c(t,s)):(s.next=a.next,t.pending=a.next=s)}}function $c(e,t){var a=t.action,n=t.payload,i=e.state;if(t.isTransition){var s=w.T,o={};w.T=o;try{var l=a(i,n),u=w.S;u!==null&&u(o,l),Pc(e,t,l)}catch(g){so(e,t,g)}finally{s!==null&&o.types!==null&&(s.types=o.types),w.T=s}}else try{s=a(i,n),Pc(e,t,s)}catch(g){so(e,t,g)}}function Pc(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){ed(e,t,n)},function(n){return so(e,t,n)}):ed(e,t,a)}function ed(e,t,a){t.status="fulfilled",t.value=a,td(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,$c(e,a)))}function so(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,td(t),t=t.next;while(t!==n)}e.action=null}function td(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ad(e,t){return t}function nd(e,t){if(ne){var a=be.formState;if(a!==null){e:{var n=V;if(ne){if(ve){t:{for(var i=ve,s=bt;i.nodeType!==8;){if(!s){i=null;break t}if(i=yt(i.nextSibling),i===null){i=null;break t}}s=i.data,i=s==="F!"||s==="F"?i:null}if(i){ve=yt(i.nextSibling),n=i.data==="F!";break e}}ia(n)}n=!1}n&&(t=a[0])}}return a=Ye(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ad,lastRenderedState:t},a.queue=n,a=kd.bind(null,V,n),n.dispatch=a,n=io(!1),s=ho.bind(null,V,!1,n.queue),n=Ye(),i={state:t,dispatch:null,action:e,pending:null},n.queue=i,a=up.bind(null,V,i,s,a),i.dispatch=a,n.memoizedState=e,[t,a,!1]}function id(e){var t=Oe();return sd(t,pe,e)}function sd(e,t,a){if(t=ao(e,t,ad)[0],e=ls(Lt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=ei(t)}catch(o){throw o===hn?$i:o}else n=t;t=Oe();var i=t.queue,s=i.dispatch;return a!==t.memoizedState&&(V.flags|=2048,bn(9,{destroy:void 0},hp.bind(null,i,a),null)),[n,s,e]}function hp(e,t){e.action=t}function rd(e){var t=Oe(),a=pe;if(a!==null)return sd(t,a,e);Oe(),t=t.memoizedState,a=Oe();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function bn(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=V.updateQueue,t===null&&(t=rs(),V.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function od(){return Oe().memoizedState}function cs(e,t,a,n){var i=Ye();V.flags|=e,i.memoizedState=bn(1|t,{destroy:void 0},a,n===void 0?null:n)}function ds(e,t,a,n){var i=Oe();n=n===void 0?null:n;var s=i.memoizedState.inst;pe!==null&&n!==null&&Wr(n,pe.memoizedState.deps)?i.memoizedState=bn(t,s,a,n):(V.flags|=e,i.memoizedState=bn(1|t,s,a,n))}function ld(e,t){cs(8390656,8,e,t)}function ro(e,t){ds(2048,8,e,t)}function mp(e){V.flags|=4;var t=V.updateQueue;if(t===null)t=rs(),V.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function cd(e){var t=Oe().memoizedState;return mp({ref:t,nextImpl:e}),function(){if((ce&2)!==0)throw Error(d(440));return t.impl.apply(void 0,arguments)}}function dd(e,t){return ds(4,2,e,t)}function ud(e,t){return ds(4,4,e,t)}function hd(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function md(e,t,a){a=a!=null?a.concat([e]):null,ds(4,4,hd.bind(null,t,e),a)}function oo(){}function pd(e,t){var a=Oe();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&Wr(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function fd(e,t){var a=Oe();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&Wr(t,n[1]))return n[0];if(n=e(),Ha){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[n,t],n}function lo(e,t,a){return a===void 0||(Ht&1073741824)!==0&&(ee&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=gu(),V.lanes|=e,ma|=e,a)}function gd(e,t,a,n){return it(a,t)?a:pn.current!==null?(e=lo(e,a,n),it(e,t)||(De=!0),e):(Ht&42)===0||(Ht&1073741824)!==0&&(ee&261930)===0?(De=!0,e.memoizedState=a):(e=gu(),V.lanes|=e,ma|=e,t)}function bd(e,t,a,n,i){var s=E.p;E.p=s!==0&&8>s?s:8;var o=w.T,l={};w.T=l,ho(e,!1,t,a);try{var u=i(),g=w.S;if(g!==null&&g(l,u),u!==null&&typeof u=="object"&&typeof u.then=="function"){var x=lp(u,n);ti(e,t,x,dt(e))}else ti(e,t,n,dt(e))}catch(S){ti(e,t,{then:function(){},status:"rejected",reason:S},dt())}finally{E.p=s,o!==null&&l.types!==null&&(o.types=l.types),w.T=o}}function pp(){}function co(e,t,a,n){if(e.tag!==5)throw Error(d(476));var i=vd(e).queue;bd(e,i,t,U,a===null?pp:function(){return yd(e),a(n)})}function vd(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:U,baseState:U,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lt,lastRenderedState:U},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function yd(e){var t=vd(e);t.next===null&&(t=e.alternate.memoizedState),ti(e,t.next.queue,{},dt())}function uo(){return Ue(vi)}function xd(){return Oe().memoizedState}function wd(){return Oe().memoizedState}function fp(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=dt();e=oa(a);var n=la(t,e,a);n!==null&&(Fe(n,t,a),Wn(n,t,a)),t={cache:Hr()},e.payload=t;return}t=t.return}}function gp(e,t,a){var n=dt();a={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},us(e)?Sd(t,a):(a=Cr(e,t,a,n),a!==null&&(Fe(a,e,n),Td(a,t,n)))}function kd(e,t,a){var n=dt();ti(e,t,a,n)}function ti(e,t,a,n){var i={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(us(e))Sd(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var o=t.lastRenderedState,l=s(o,a);if(i.hasEagerState=!0,i.eagerState=l,it(l,o))return Vi(e,t,i,0),be===null&&Qi(),!1}catch{}finally{}if(a=Cr(e,t,i,n),a!==null)return Fe(a,e,n),Td(a,t,n),!0}return!1}function ho(e,t,a,n){if(n={lane:2,revertLane:Qo(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},us(e)){if(t)throw Error(d(479))}else t=Cr(e,a,n,2),t!==null&&Fe(t,e,2)}function us(e){var t=e.alternate;return e===V||t!==null&&t===V}function Sd(e,t){fn=is=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Td(e,t,a){if((a&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Dl(e,a)}}var ai={readContext:Ue,use:os,useCallback:Se,useContext:Se,useEffect:Se,useImperativeHandle:Se,useLayoutEffect:Se,useInsertionEffect:Se,useMemo:Se,useReducer:Se,useRef:Se,useState:Se,useDebugValue:Se,useDeferredValue:Se,useTransition:Se,useSyncExternalStore:Se,useId:Se,useHostTransitionStatus:Se,useFormState:Se,useActionState:Se,useOptimistic:Se,useMemoCache:Se,useCacheRefresh:Se};ai.useEffectEvent=Se;var Nd={readContext:Ue,use:os,useCallback:function(e,t){return Ye().memoizedState=[e,t===void 0?null:t],e},useContext:Ue,useEffect:ld,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,cs(4194308,4,hd.bind(null,t,e),a)},useLayoutEffect:function(e,t){return cs(4194308,4,e,t)},useInsertionEffect:function(e,t){cs(4,2,e,t)},useMemo:function(e,t){var a=Ye();t=t===void 0?null:t;var n=e();if(Ha){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=Ye();if(a!==void 0){var i=a(t);if(Ha){Pt(!0);try{a(t)}finally{Pt(!1)}}}else i=t;return n.memoizedState=n.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},n.queue=e,e=e.dispatch=gp.bind(null,V,e),[n.memoizedState,e]},useRef:function(e){var t=Ye();return e={current:e},t.memoizedState=e},useState:function(e){e=io(e);var t=e.queue,a=kd.bind(null,V,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:oo,useDeferredValue:function(e,t){var a=Ye();return lo(a,e,t)},useTransition:function(){var e=io(!1);return e=bd.bind(null,V,e.queue,!0,!1),Ye().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=V,i=Ye();if(ne){if(a===void 0)throw Error(d(407));a=a()}else{if(a=t(),be===null)throw Error(d(349));(ee&127)!==0||Zc(n,t,a)}i.memoizedState=a;var s={value:a,getSnapshot:t};return i.queue=s,ld(Kc.bind(null,n,s,e),[e]),n.flags|=2048,bn(9,{destroy:void 0},Jc.bind(null,n,s,a,t),null),a},useId:function(){var e=Ye(),t=be.identifierPrefix;if(ne){var a=Ct,n=At;a=(n&~(1<<32-nt(n)-1)).toString(32)+a,t="_"+t+"R_"+a,a=ss++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=cp++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:uo,useFormState:nd,useActionState:nd,useOptimistic:function(e){var t=Ye();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=ho.bind(null,V,!0,a),a.dispatch=t,[e,t]},useMemoCache:to,useCacheRefresh:function(){return Ye().memoizedState=fp.bind(null,V)},useEffectEvent:function(e){var t=Ye(),a={impl:e};return t.memoizedState=a,function(){if((ce&2)!==0)throw Error(d(440));return a.impl.apply(void 0,arguments)}}},mo={readContext:Ue,use:os,useCallback:pd,useContext:Ue,useEffect:ro,useImperativeHandle:md,useInsertionEffect:dd,useLayoutEffect:ud,useMemo:fd,useReducer:ls,useRef:od,useState:function(){return ls(Lt)},useDebugValue:oo,useDeferredValue:function(e,t){var a=Oe();return gd(a,pe.memoizedState,e,t)},useTransition:function(){var e=ls(Lt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:ei(e),t]},useSyncExternalStore:Vc,useId:xd,useHostTransitionStatus:uo,useFormState:id,useActionState:id,useOptimistic:function(e,t){var a=Oe();return Fc(a,pe,e,t)},useMemoCache:to,useCacheRefresh:wd};mo.useEffectEvent=cd;var Od={readContext:Ue,use:os,useCallback:pd,useContext:Ue,useEffect:ro,useImperativeHandle:md,useInsertionEffect:dd,useLayoutEffect:ud,useMemo:fd,useReducer:no,useRef:od,useState:function(){return no(Lt)},useDebugValue:oo,useDeferredValue:function(e,t){var a=Oe();return pe===null?lo(a,e,t):gd(a,pe.memoizedState,e,t)},useTransition:function(){var e=no(Lt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:ei(e),t]},useSyncExternalStore:Vc,useId:xd,useHostTransitionStatus:uo,useFormState:rd,useActionState:rd,useOptimistic:function(e,t){var a=Oe();return pe!==null?Fc(a,pe,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:to,useCacheRefresh:wd};Od.useEffectEvent=cd;function po(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:N({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var fo={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=dt(),i=oa(n);i.payload=t,a!=null&&(i.callback=a),t=la(e,i,n),t!==null&&(Fe(t,e,n),Wn(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=dt(),i=oa(n);i.tag=1,i.payload=t,a!=null&&(i.callback=a),t=la(e,i,n),t!==null&&(Fe(t,e,n),Wn(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=dt(),n=oa(a);n.tag=2,t!=null&&(n.callback=t),t=la(e,n,a),t!==null&&(Fe(t,e,a),Wn(t,e,a))}};function Ad(e,t,a,n,i,s,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,s,o):t.prototype&&t.prototype.isPureReactComponent?!Yn(a,n)||!Yn(i,s):!0}function Cd(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&fo.enqueueReplaceState(t,t.state,null)}function La(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=N({},a));for(var i in e)a[i]===void 0&&(a[i]=e[i])}return a}function Dd(e){Xi(e)}function Rd(e){console.error(e)}function Ed(e){Xi(e)}function hs(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function jd(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function go(e,t,a){return a=oa(a),a.tag=3,a.payload={element:null},a.callback=function(){hs(e,t)},a}function zd(e){return e=oa(e),e.tag=3,e}function Md(e,t,a,n){var i=a.type.getDerivedStateFromError;if(typeof i=="function"){var s=n.value;e.payload=function(){return i(s)},e.callback=function(){jd(t,a,n)}}var o=a.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(e.callback=function(){jd(t,a,n),typeof i!="function"&&(pa===null?pa=new Set([this]):pa.add(this));var l=n.stack;this.componentDidCatch(n.value,{componentStack:l!==null?l:""})})}function bp(e,t,a,n,i){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&cn(t,a,i,!0),a=rt.current,a!==null){switch(a.tag){case 31:case 13:return vt===null?Ts():a.alternate===null&&Te===0&&(Te=3),a.flags&=-257,a.flags|=65536,a.lanes=i,n===Pi?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),Go(e,n,i)),!1;case 22:return a.flags|=65536,n===Pi?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),Go(e,n,i)),!1}throw Error(d(435,a.tag))}return Go(e,n,i),Ts(),!1}if(ne)return t=rt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=i,n!==Mr&&(e=Error(d(422),{cause:n}),Vn(pt(e,a)))):(n!==Mr&&(t=Error(d(423),{cause:n}),Vn(pt(t,a))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,n=pt(n,a),i=go(e.stateNode,n,i),Vr(e,i),Te!==4&&(Te=2)),!1;var s=Error(d(520),{cause:n});if(s=pt(s,a),di===null?di=[s]:di.push(s),Te!==4&&(Te=2),t===null)return!0;n=pt(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=i&-i,a.lanes|=e,e=go(a.stateNode,n,e),Vr(a,e),!1;case 1:if(t=a.type,s=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(pa===null||!pa.has(s))))return a.flags|=65536,i&=-i,a.lanes|=i,i=zd(i),Md(i,e,a,n),Vr(a,i),!1}a=a.return}while(a!==null);return!1}var bo=Error(d(461)),De=!1;function Be(e,t,a,n){t.child=e===null?Bc(t,null,a,n):Ba(t,e.child,a,n)}function qd(e,t,a,n,i){a=a.render;var s=t.ref;if("ref"in n){var o={};for(var l in n)l!=="ref"&&(o[l]=n[l])}else o=n;return Ma(t),n=Fr(e,t,a,o,s,i),l=$r(),e!==null&&!De?(Pr(e,t,i),Gt(e,t,i)):(ne&&l&&jr(t),t.flags|=1,Be(e,t,n,i),t.child)}function _d(e,t,a,n,i){if(e===null){var s=a.type;return typeof s=="function"&&!Dr(s)&&s.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=s,Ud(e,t,s,n,i)):(e=Ji(a.type,null,n,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!No(e,i)){var o=s.memoizedProps;if(a=a.compare,a=a!==null?a:Yn,a(o,n)&&e.ref===t.ref)return Gt(e,t,i)}return t.flags|=1,e=qt(s,n),e.ref=t.ref,e.return=t,t.child=e}function Ud(e,t,a,n,i){if(e!==null){var s=e.memoizedProps;if(Yn(s,n)&&e.ref===t.ref)if(De=!1,t.pendingProps=n=s,No(e,i))(e.flags&131072)!==0&&(De=!0);else return t.lanes=e.lanes,Gt(e,t,i)}return vo(e,t,a,n,i)}function Bd(e,t,a,n){var i=n.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((t.flags&128)!==0){if(s=s!==null?s.baseLanes|a:a,e!==null){for(n=t.child=e.child,i=0;n!==null;)i=i|n.lanes|n.childLanes,n=n.sibling;n=i&~s}else n=0,t.child=null;return Hd(e,t,s,a,n)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Fi(t,s!==null?s.cachePool:null),s!==null?Gc(t,s):Jr(),Yc(t);else return n=t.lanes=536870912,Hd(e,t,s!==null?s.baseLanes|a:a,a,n)}else s!==null?(Fi(t,s.cachePool),Gc(t,s),da(),t.memoizedState=null):(e!==null&&Fi(t,null),Jr(),da());return Be(e,t,i,a),t.child}function ni(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Hd(e,t,a,n,i){var s=Gr();return s=s===null?null:{parent:Ae._currentValue,pool:s},t.memoizedState={baseLanes:a,cachePool:s},e!==null&&Fi(t,null),Jr(),Yc(t),e!==null&&cn(e,t,n,!0),t.childLanes=i,null}function ms(e,t){return t=fs({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Ld(e,t,a){return Ba(t,e.child,null,a),e=ms(t,t.pendingProps),e.flags|=2,ot(t),t.memoizedState=null,e}function vp(e,t,a){var n=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ne){if(n.mode==="hidden")return e=ms(t,n),t.lanes=536870912,ni(null,e);if(Ir(t),(e=ve)?(e=$u(e,bt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:aa!==null?{id:At,overflow:Ct}:null,retryLane:536870912,hydrationErrors:null},a=Sc(e),a.return=t,t.child=a,_e=t,ve=null)):e=null,e===null)throw ia(t);return t.lanes=536870912,null}return ms(t,n)}var s=e.memoizedState;if(s!==null){var o=s.dehydrated;if(Ir(t),i)if(t.flags&256)t.flags&=-257,t=Ld(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(d(558));else if(De||cn(e,t,a,!1),i=(a&e.childLanes)!==0,De||i){if(n=be,n!==null&&(o=Rl(n,a),o!==0&&o!==s.retryLane))throw s.retryLane=o,Ra(e,o),Fe(n,e,o),bo;Ts(),t=Ld(e,t,a)}else e=s.treeContext,ve=yt(o.nextSibling),_e=t,ne=!0,na=null,bt=!1,e!==null&&Oc(t,e),t=ms(t,n),t.flags|=4096;return t}return e=qt(e.child,{mode:n.mode,children:n.children}),e.ref=t.ref,t.child=e,e.return=t,e}function ps(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(d(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function vo(e,t,a,n,i){return Ma(t),a=Fr(e,t,a,n,void 0,i),n=$r(),e!==null&&!De?(Pr(e,t,i),Gt(e,t,i)):(ne&&n&&jr(t),t.flags|=1,Be(e,t,a,i),t.child)}function Gd(e,t,a,n,i,s){return Ma(t),t.updateQueue=null,a=Qc(t,n,a,i),Xc(e),n=$r(),e!==null&&!De?(Pr(e,t,s),Gt(e,t,s)):(ne&&n&&jr(t),t.flags|=1,Be(e,t,a,s),t.child)}function Yd(e,t,a,n,i){if(Ma(t),t.stateNode===null){var s=sn,o=a.contextType;typeof o=="object"&&o!==null&&(s=Ue(o)),s=new a(n,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=fo,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=n,s.state=t.memoizedState,s.refs={},Xr(t),o=a.contextType,s.context=typeof o=="object"&&o!==null?Ue(o):sn,s.state=t.memoizedState,o=a.getDerivedStateFromProps,typeof o=="function"&&(po(t,a,o,n),s.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(o=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),o!==s.state&&fo.enqueueReplaceState(s,s.state,null),$n(t,n,s,i),Fn(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){s=t.stateNode;var l=t.memoizedProps,u=La(a,l);s.props=u;var g=s.context,x=a.contextType;o=sn,typeof x=="object"&&x!==null&&(o=Ue(x));var S=a.getDerivedStateFromProps;x=typeof S=="function"||typeof s.getSnapshotBeforeUpdate=="function",l=t.pendingProps!==l,x||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l||g!==o)&&Cd(t,s,n,o),ra=!1;var b=t.memoizedState;s.state=b,$n(t,n,s,i),Fn(),g=t.memoizedState,l||b!==g||ra?(typeof S=="function"&&(po(t,a,S,n),g=t.memoizedState),(u=ra||Ad(t,a,u,n,b,g,o))?(x||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=g),s.props=n,s.state=g,s.context=o,n=u):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{s=t.stateNode,Qr(e,t),o=t.memoizedProps,x=La(a,o),s.props=x,S=t.pendingProps,b=s.context,g=a.contextType,u=sn,typeof g=="object"&&g!==null&&(u=Ue(g)),l=a.getDerivedStateFromProps,(g=typeof l=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o!==S||b!==u)&&Cd(t,s,n,u),ra=!1,b=t.memoizedState,s.state=b,$n(t,n,s,i),Fn();var v=t.memoizedState;o!==S||b!==v||ra||e!==null&&e.dependencies!==null&&Ii(e.dependencies)?(typeof l=="function"&&(po(t,a,l,n),v=t.memoizedState),(x=ra||Ad(t,a,x,n,b,v,u)||e!==null&&e.dependencies!==null&&Ii(e.dependencies))?(g||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(n,v,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(n,v,u)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||o===e.memoizedProps&&b===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&b===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=v),s.props=n,s.state=v,s.context=u,n=x):(typeof s.componentDidUpdate!="function"||o===e.memoizedProps&&b===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&b===e.memoizedState||(t.flags|=1024),n=!1)}return s=n,ps(e,t),n=(t.flags&128)!==0,s||n?(s=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&n?(t.child=Ba(t,e.child,null,i),t.child=Ba(t,null,a,i)):Be(e,t,a,i),t.memoizedState=s.state,e=t.child):e=Gt(e,t,i),e}function Xd(e,t,a,n){return ja(),t.flags|=256,Be(e,t,a,n),t.child}var yo={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function xo(e){return{baseLanes:e,cachePool:jc()}}function wo(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=ct),e}function Qd(e,t,a){var n=t.pendingProps,i=!1,s=(t.flags&128)!==0,o;if((o=s)||(o=e!==null&&e.memoizedState===null?!1:(Ne.current&2)!==0),o&&(i=!0,t.flags&=-129),o=(t.flags&32)!==0,t.flags&=-33,e===null){if(ne){if(i?ca(t):da(),(e=ve)?(e=$u(e,bt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:aa!==null?{id:At,overflow:Ct}:null,retryLane:536870912,hydrationErrors:null},a=Sc(e),a.return=t,t.child=a,_e=t,ve=null)):e=null,e===null)throw ia(t);return nl(e)?t.lanes=32:t.lanes=536870912,null}var l=n.children;return n=n.fallback,i?(da(),i=t.mode,l=fs({mode:"hidden",children:l},i),n=Ea(n,i,a,null),l.return=t,n.return=t,l.sibling=n,t.child=l,n=t.child,n.memoizedState=xo(a),n.childLanes=wo(e,o,a),t.memoizedState=yo,ni(null,n)):(ca(t),ko(t,l))}var u=e.memoizedState;if(u!==null&&(l=u.dehydrated,l!==null)){if(s)t.flags&256?(ca(t),t.flags&=-257,t=So(e,t,a)):t.memoizedState!==null?(da(),t.child=e.child,t.flags|=128,t=null):(da(),l=n.fallback,i=t.mode,n=fs({mode:"visible",children:n.children},i),l=Ea(l,i,a,null),l.flags|=2,n.return=t,l.return=t,n.sibling=l,t.child=n,Ba(t,e.child,null,a),n=t.child,n.memoizedState=xo(a),n.childLanes=wo(e,o,a),t.memoizedState=yo,t=ni(null,n));else if(ca(t),nl(l)){if(o=l.nextSibling&&l.nextSibling.dataset,o)var g=o.dgst;o=g,n=Error(d(419)),n.stack="",n.digest=o,Vn({value:n,source:null,stack:null}),t=So(e,t,a)}else if(De||cn(e,t,a,!1),o=(a&e.childLanes)!==0,De||o){if(o=be,o!==null&&(n=Rl(o,a),n!==0&&n!==u.retryLane))throw u.retryLane=n,Ra(e,n),Fe(o,e,n),bo;al(l)||Ts(),t=So(e,t,a)}else al(l)?(t.flags|=192,t.child=e.child,t=null):(e=u.treeContext,ve=yt(l.nextSibling),_e=t,ne=!0,na=null,bt=!1,e!==null&&Oc(t,e),t=ko(t,n.children),t.flags|=4096);return t}return i?(da(),l=n.fallback,i=t.mode,u=e.child,g=u.sibling,n=qt(u,{mode:"hidden",children:n.children}),n.subtreeFlags=u.subtreeFlags&65011712,g!==null?l=qt(g,l):(l=Ea(l,i,a,null),l.flags|=2),l.return=t,n.return=t,n.sibling=l,t.child=n,ni(null,n),n=t.child,l=e.child.memoizedState,l===null?l=xo(a):(i=l.cachePool,i!==null?(u=Ae._currentValue,i=i.parent!==u?{parent:u,pool:u}:i):i=jc(),l={baseLanes:l.baseLanes|a,cachePool:i}),n.memoizedState=l,n.childLanes=wo(e,o,a),t.memoizedState=yo,ni(e.child,n)):(ca(t),a=e.child,e=a.sibling,a=qt(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=a,t.memoizedState=null,a)}function ko(e,t){return t=fs({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function fs(e,t){return e=st(22,e,null,t),e.lanes=0,e}function So(e,t,a){return Ba(t,e.child,null,a),e=ko(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Vd(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Ur(e.return,t,a)}function To(e,t,a,n,i,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:i,treeForkCount:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=n,o.tail=a,o.tailMode=i,o.treeForkCount=s)}function Zd(e,t,a){var n=t.pendingProps,i=n.revealOrder,s=n.tail;n=n.children;var o=Ne.current,l=(o&2)!==0;if(l?(o=o&1|2,t.flags|=128):o&=1,ae(Ne,o),Be(e,t,n,a),n=ne?Qn:0,!l&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Vd(e,a,t);else if(e.tag===19)Vd(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(a=t.child,i=null;a!==null;)e=a.alternate,e!==null&&ns(e)===null&&(i=a),a=a.sibling;a=i,a===null?(i=t.child,t.child=null):(i=a.sibling,a.sibling=null),To(t,!1,i,a,s,n);break;case"backwards":case"unstable_legacy-backwards":for(a=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ns(e)===null){t.child=i;break}e=i.sibling,i.sibling=a,a=i,i=e}To(t,!0,a,null,s,n);break;case"together":To(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function Gt(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),ma|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(cn(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(d(153));if(t.child!==null){for(e=t.child,a=qt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=qt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function No(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ii(e)))}function yp(e,t,a){switch(t.tag){case 3:Oi(t,t.stateNode.containerInfo),sa(t,Ae,e.memoizedState.cache),ja();break;case 27:case 5:Ks(t);break;case 4:Oi(t,t.stateNode.containerInfo);break;case 10:sa(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ir(t),null;break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(ca(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Qd(e,t,a):(ca(t),e=Gt(e,t,a),e!==null?e.sibling:null);ca(t);break;case 19:var i=(e.flags&128)!==0;if(n=(a&t.childLanes)!==0,n||(cn(e,t,a,!1),n=(a&t.childLanes)!==0),i){if(n)return Zd(e,t,a);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ae(Ne,Ne.current),n)break;return null;case 22:return t.lanes=0,Bd(e,t,a,t.pendingProps);case 24:sa(t,Ae,e.memoizedState.cache)}return Gt(e,t,a)}function Jd(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)De=!0;else{if(!No(e,a)&&(t.flags&128)===0)return De=!1,yp(e,t,a);De=(e.flags&131072)!==0}else De=!1,ne&&(t.flags&1048576)!==0&&Nc(t,Qn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=_a(t.elementType),t.type=e,typeof e=="function")Dr(e)?(n=La(e,n),t.tag=1,t=Yd(null,t,e,n,a)):(t.tag=0,t=vo(null,t,e,n,a));else{if(e!=null){var i=e.$$typeof;if(i===W){t.tag=11,t=qd(null,t,e,n,a);break e}else if(i===G){t.tag=14,t=_d(null,t,e,n,a);break e}}throw t=kt(e)||e,Error(d(306,t,""))}}return t;case 0:return vo(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,i=La(n,t.pendingProps),Yd(e,t,n,i,a);case 3:e:{if(Oi(t,t.stateNode.containerInfo),e===null)throw Error(d(387));n=t.pendingProps;var s=t.memoizedState;i=s.element,Qr(e,t),$n(t,n,null,a);var o=t.memoizedState;if(n=o.cache,sa(t,Ae,n),n!==s.cache&&Br(t,[Ae],a,!0),Fn(),n=o.element,s.isDehydrated)if(s={element:n,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=Xd(e,t,n,a);break e}else if(n!==i){i=pt(Error(d(424)),t),Vn(i),t=Xd(e,t,n,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(ve=yt(e.firstChild),_e=t,ne=!0,na=null,bt=!0,a=Bc(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(ja(),n===i){t=Gt(e,t,a);break e}Be(e,t,n,a)}t=t.child}return t;case 26:return ps(e,t),e===null?(a=ih(t.type,null,t.pendingProps,null))?t.memoizedState=a:ne||(a=t.type,e=t.pendingProps,n=Es($t.current).createElement(a),n[qe]=t,n[Ve]=e,He(n,a,e),ze(n),t.stateNode=n):t.memoizedState=ih(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ks(t),e===null&&ne&&(n=t.stateNode=th(t.type,t.pendingProps,$t.current),_e=t,bt=!0,i=ve,va(t.type)?(il=i,ve=yt(n.firstChild)):ve=i),Be(e,t,t.pendingProps.children,a),ps(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ne&&((i=n=ve)&&(n=Ip(n,t.type,t.pendingProps,bt),n!==null?(t.stateNode=n,_e=t,ve=yt(n.firstChild),bt=!1,i=!0):i=!1),i||ia(t)),Ks(t),i=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,n=s.children,Po(i,s)?n=null:o!==null&&Po(i,o)&&(t.flags|=32),t.memoizedState!==null&&(i=Fr(e,t,dp,null,null,a),vi._currentValue=i),ps(e,t),Be(e,t,n,a),t.child;case 6:return e===null&&ne&&((e=a=ve)&&(a=Wp(a,t.pendingProps,bt),a!==null?(t.stateNode=a,_e=t,ve=null,e=!0):e=!1),e||ia(t)),null;case 13:return Qd(e,t,a);case 4:return Oi(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Ba(t,null,n,a):Be(e,t,n,a),t.child;case 11:return qd(e,t,t.type,t.pendingProps,a);case 7:return Be(e,t,t.pendingProps,a),t.child;case 8:return Be(e,t,t.pendingProps.children,a),t.child;case 12:return Be(e,t,t.pendingProps.children,a),t.child;case 10:return n=t.pendingProps,sa(t,t.type,n.value),Be(e,t,n.children,a),t.child;case 9:return i=t.type._context,n=t.pendingProps.children,Ma(t),i=Ue(i),n=n(i),t.flags|=1,Be(e,t,n,a),t.child;case 14:return _d(e,t,t.type,t.pendingProps,a);case 15:return Ud(e,t,t.type,t.pendingProps,a);case 19:return Zd(e,t,a);case 31:return vp(e,t,a);case 22:return Bd(e,t,a,t.pendingProps);case 24:return Ma(t),n=Ue(Ae),e===null?(i=Gr(),i===null&&(i=be,s=Hr(),i.pooledCache=s,s.refCount++,s!==null&&(i.pooledCacheLanes|=a),i=s),t.memoizedState={parent:n,cache:i},Xr(t),sa(t,Ae,i)):((e.lanes&a)!==0&&(Qr(e,t),$n(t,null,null,a),Fn()),i=e.memoizedState,s=t.memoizedState,i.parent!==n?(i={parent:n,cache:n},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),sa(t,Ae,n)):(n=s.cache,sa(t,Ae,n),n!==i.cache&&Br(t,[Ae],a,!0))),Be(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(d(156,t.tag))}function Yt(e){e.flags|=4}function Oo(e,t,a,n,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(xu())e.flags|=8192;else throw Ua=Pi,Yr}else e.flags&=-16777217}function Kd(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!ch(t))if(xu())e.flags|=8192;else throw Ua=Pi,Yr}function gs(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Al():536870912,e.lanes|=t,wn|=t)}function ii(e,t){if(!ne)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function ye(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags&65011712,n|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags,n|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function xp(e,t,a){var n=t.pendingProps;switch(zr(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ye(t),null;case 1:return ye(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Bt(Ae),Qa(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ln(t)?Yt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,qr())),ye(t),null;case 26:var i=t.type,s=t.memoizedState;return e===null?(Yt(t),s!==null?(ye(t),Kd(t,s)):(ye(t),Oo(t,i,null,n,a))):s?s!==e.memoizedState?(Yt(t),ye(t),Kd(t,s)):(ye(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&Yt(t),ye(t),Oo(t,i,e,n,a)),null;case 27:if(Ai(t),a=$t.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Yt(t);else{if(!n){if(t.stateNode===null)throw Error(d(166));return ye(t),null}e=we.current,ln(t)?Ac(t):(e=th(i,n,a),t.stateNode=e,Yt(t))}return ye(t),null;case 5:if(Ai(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Yt(t);else{if(!n){if(t.stateNode===null)throw Error(d(166));return ye(t),null}if(s=we.current,ln(t))Ac(t);else{var o=Es($t.current);switch(s){case 1:s=o.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:s=o.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":s=o.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":s=o.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":s=o.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof n.is=="string"?o.createElement("select",{is:n.is}):o.createElement("select"),n.multiple?s.multiple=!0:n.size&&(s.size=n.size);break;default:s=typeof n.is=="string"?o.createElement(i,{is:n.is}):o.createElement(i)}}s[qe]=t,s[Ve]=n;e:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)s.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;o.sibling===null;){if(o.return===null||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=s;e:switch(He(s,i,n),i){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&Yt(t)}}return ye(t),Oo(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&Yt(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(d(166));if(e=$t.current,ln(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,i=_e,i!==null)switch(i.tag){case 27:case 5:n=i.memoizedProps}e[qe]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||Qu(e.nodeValue,a)),e||ia(t,!0)}else e=Es(e).createTextNode(n),e[qe]=t,t.stateNode=e}return ye(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(n=ln(t),a!==null){if(e===null){if(!n)throw Error(d(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(557));e[qe]=t}else ja(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ye(t),e=!1}else a=qr(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(ot(t),t):(ot(t),null);if((t.flags&128)!==0)throw Error(d(558))}return ye(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=ln(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(d(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(d(317));i[qe]=t}else ja(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ye(t),i=!1}else i=qr(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(ot(t),t):(ot(t),null)}return ot(t),(t.flags&128)!==0?(t.lanes=a,t):(a=n!==null,e=e!==null&&e.memoizedState!==null,a&&(n=t.child,i=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(i=n.alternate.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==i&&(n.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),gs(t,t.updateQueue),ye(t),null);case 4:return Qa(),e===null&&Ko(t.stateNode.containerInfo),ye(t),null;case 10:return Bt(t.type),ye(t),null;case 19:if(se(Ne),n=t.memoizedState,n===null)return ye(t),null;if(i=(t.flags&128)!==0,s=n.rendering,s===null)if(i)ii(n,!1);else{if(Te!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=ns(e),s!==null){for(t.flags|=128,ii(n,!1),e=s.updateQueue,t.updateQueue=e,gs(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)kc(a,e),a=a.sibling;return ae(Ne,Ne.current&1|2),ne&&_t(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&tt()>ws&&(t.flags|=128,i=!0,ii(n,!1),t.lanes=4194304)}else{if(!i)if(e=ns(s),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,gs(t,e),ii(n,!0),n.tail===null&&n.tailMode==="hidden"&&!s.alternate&&!ne)return ye(t),null}else 2*tt()-n.renderingStartTime>ws&&a!==536870912&&(t.flags|=128,i=!0,ii(n,!1),t.lanes=4194304);n.isBackwards?(s.sibling=t.child,t.child=s):(e=n.last,e!==null?e.sibling=s:t.child=s,n.last=s)}return n.tail!==null?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=tt(),e.sibling=null,a=Ne.current,ae(Ne,i?a&1|2:a&1),ne&&_t(t,n.treeForkCount),e):(ye(t),null);case 22:case 23:return ot(t),Kr(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(a&536870912)!==0&&(t.flags&128)===0&&(ye(t),t.subtreeFlags&6&&(t.flags|=8192)):ye(t),a=t.updateQueue,a!==null&&gs(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&se(qa),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Bt(Ae),ye(t),null;case 25:return null;case 30:return null}throw Error(d(156,t.tag))}function wp(e,t){switch(zr(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Bt(Ae),Qa(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ai(t),null;case 31:if(t.memoizedState!==null){if(ot(t),t.alternate===null)throw Error(d(340));ja()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ot(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(d(340));ja()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return se(Ne),null;case 4:return Qa(),null;case 10:return Bt(t.type),null;case 22:case 23:return ot(t),Kr(),e!==null&&se(qa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Bt(Ae),null;case 25:return null;default:return null}}function Id(e,t){switch(zr(t),t.tag){case 3:Bt(Ae),Qa();break;case 26:case 27:case 5:Ai(t);break;case 4:Qa();break;case 31:t.memoizedState!==null&&ot(t);break;case 13:ot(t);break;case 19:se(Ne);break;case 10:Bt(t.type);break;case 22:case 23:ot(t),Kr(),e!==null&&se(qa);break;case 24:Bt(Ae)}}function si(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var i=n.next;a=i;do{if((a.tag&e)===e){n=void 0;var s=a.create,o=a.inst;n=s(),o.destroy=n}a=a.next}while(a!==i)}}catch(l){me(t,t.return,l)}}function ua(e,t,a){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){var o=n.inst,l=o.destroy;if(l!==void 0){o.destroy=void 0,i=t;var u=a,g=l;try{g()}catch(x){me(i,u,x)}}}n=n.next}while(n!==s)}}catch(x){me(t,t.return,x)}}function Wd(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Lc(t,a)}catch(n){me(e,e.return,n)}}}function Fd(e,t,a){a.props=La(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){me(e,t,n)}}function ri(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(i){me(e,t,i)}}function Dt(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(i){me(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(i){me(e,t,i)}else a.current=null}function $d(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(i){me(e,e.return,i)}}function Ao(e,t,a){try{var n=e.stateNode;Xp(n,e.type,a,t),n[Ve]=t}catch(i){me(e,e.return,i)}}function Pd(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&va(e.type)||e.tag===4}function Co(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Pd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&va(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Do(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=zt));else if(n!==4&&(n===27&&va(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Do(e,t,a),e=e.sibling;e!==null;)Do(e,t,a),e=e.sibling}function bs(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(n!==4&&(n===27&&va(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(bs(e,t,a),e=e.sibling;e!==null;)bs(e,t,a),e=e.sibling}function eu(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);He(t,n,a),t[qe]=e,t[Ve]=a}catch(s){me(e,e.return,s)}}var Xt=!1,Re=!1,Ro=!1,tu=typeof WeakSet=="function"?WeakSet:Set,Me=null;function kp(e,t){if(e=e.containerInfo,Fo=Bs,e=mc(e),kr(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var n=a.getSelection&&a.getSelection();if(n&&n.rangeCount!==0){a=n.anchorNode;var i=n.anchorOffset,s=n.focusNode;n=n.focusOffset;try{a.nodeType,s.nodeType}catch{a=null;break e}var o=0,l=-1,u=-1,g=0,x=0,S=e,b=null;t:for(;;){for(var v;S!==a||i!==0&&S.nodeType!==3||(l=o+i),S!==s||n!==0&&S.nodeType!==3||(u=o+n),S.nodeType===3&&(o+=S.nodeValue.length),(v=S.firstChild)!==null;)b=S,S=v;for(;;){if(S===e)break t;if(b===a&&++g===i&&(l=o),b===s&&++x===n&&(u=o),(v=S.nextSibling)!==null)break;S=b,b=S.parentNode}S=v}a=l===-1||u===-1?null:{start:l,end:u}}else a=null}a=a||{start:0,end:0}}else a=null;for($o={focusedElem:e,selectionRange:a},Bs=!1,Me=t;Me!==null;)if(t=Me,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Me=e;else for(;Me!==null;){switch(t=Me,s=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)i=e[a],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&s!==null){e=void 0,a=t,i=s.memoizedProps,s=s.memoizedState,n=a.stateNode;try{var j=La(a.type,i);e=n.getSnapshotBeforeUpdate(j,s),n.__reactInternalSnapshotBeforeUpdate=e}catch(H){me(a,a.return,H)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)tl(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":tl(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(d(163))}if(e=t.sibling,e!==null){e.return=t.return,Me=e;break}Me=t.return}}function au(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:Vt(e,a),n&4&&si(5,a);break;case 1:if(Vt(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(o){me(a,a.return,o)}else{var i=La(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){me(a,a.return,o)}}n&64&&Wd(a),n&512&&ri(a,a.return);break;case 3:if(Vt(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Lc(e,t)}catch(o){me(a,a.return,o)}}break;case 27:t===null&&n&4&&eu(a);case 26:case 5:Vt(e,a),t===null&&n&4&&$d(a),n&512&&ri(a,a.return);break;case 12:Vt(e,a);break;case 31:Vt(e,a),n&4&&su(e,a);break;case 13:Vt(e,a),n&4&&ru(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Ep.bind(null,a),Fp(e,a))));break;case 22:if(n=a.memoizedState!==null||Xt,!n){t=t!==null&&t.memoizedState!==null||Re,i=Xt;var s=Re;Xt=n,(Re=t)&&!s?Zt(e,a,(a.subtreeFlags&8772)!==0):Vt(e,a),Xt=i,Re=s}break;case 30:break;default:Vt(e,a)}}function nu(e){var t=e.alternate;t!==null&&(e.alternate=null,nu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&sr(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var xe=null,Je=!1;function Qt(e,t,a){for(a=a.child;a!==null;)iu(e,t,a),a=a.sibling}function iu(e,t,a){if(at&&typeof at.onCommitFiberUnmount=="function")try{at.onCommitFiberUnmount(Rn,a)}catch{}switch(a.tag){case 26:Re||Dt(a,t),Qt(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Re||Dt(a,t);var n=xe,i=Je;va(a.type)&&(xe=a.stateNode,Je=!1),Qt(e,t,a),fi(a.stateNode),xe=n,Je=i;break;case 5:Re||Dt(a,t);case 6:if(n=xe,i=Je,xe=null,Qt(e,t,a),xe=n,Je=i,xe!==null)if(Je)try{(xe.nodeType===9?xe.body:xe.nodeName==="HTML"?xe.ownerDocument.body:xe).removeChild(a.stateNode)}catch(s){me(a,t,s)}else try{xe.removeChild(a.stateNode)}catch(s){me(a,t,s)}break;case 18:xe!==null&&(Je?(e=xe,Wu(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Dn(e)):Wu(xe,a.stateNode));break;case 4:n=xe,i=Je,xe=a.stateNode.containerInfo,Je=!0,Qt(e,t,a),xe=n,Je=i;break;case 0:case 11:case 14:case 15:ua(2,a,t),Re||ua(4,a,t),Qt(e,t,a);break;case 1:Re||(Dt(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&Fd(a,t,n)),Qt(e,t,a);break;case 21:Qt(e,t,a);break;case 22:Re=(n=Re)||a.memoizedState!==null,Qt(e,t,a),Re=n;break;default:Qt(e,t,a)}}function su(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Dn(e)}catch(a){me(t,t.return,a)}}}function ru(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Dn(e)}catch(a){me(t,t.return,a)}}function Sp(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new tu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new tu),t;default:throw Error(d(435,e.tag))}}function vs(e,t){var a=Sp(e);t.forEach(function(n){if(!a.has(n)){a.add(n);var i=jp.bind(null,e,n);n.then(i,i)}})}function Ke(e,t){var a=t.deletions;if(a!==null)for(var n=0;n<a.length;n++){var i=a[n],s=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 27:if(va(l.type)){xe=l.stateNode,Je=!1;break e}break;case 5:xe=l.stateNode,Je=!1;break e;case 3:case 4:xe=l.stateNode.containerInfo,Je=!0;break e}l=l.return}if(xe===null)throw Error(d(160));iu(s,o,i),xe=null,Je=!1,s=i.alternate,s!==null&&(s.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ou(t,e),t=t.sibling}var Tt=null;function ou(e,t){var a=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ke(t,e),Ie(e),n&4&&(ua(3,e,e.return),si(3,e),ua(5,e,e.return));break;case 1:Ke(t,e),Ie(e),n&512&&(Re||a===null||Dt(a,a.return)),n&64&&Xt&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:var i=Tt;if(Ke(t,e),Ie(e),n&512&&(Re||a===null||Dt(a,a.return)),n&4){var s=a!==null?a.memoizedState:null;if(n=e.memoizedState,a===null)if(n===null)if(e.stateNode===null){e:{n=e.type,a=e.memoizedProps,i=i.ownerDocument||i;t:switch(n){case"title":s=i.getElementsByTagName("title")[0],(!s||s[zn]||s[qe]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=i.createElement(n),i.head.insertBefore(s,i.querySelector("head > title"))),He(s,n,a),s[qe]=e,ze(s),n=s;break e;case"link":var o=oh("link","href",i).get(n+(a.href||""));if(o){for(var l=0;l<o.length;l++)if(s=o[l],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){o.splice(l,1);break t}}s=i.createElement(n),He(s,n,a),i.head.appendChild(s);break;case"meta":if(o=oh("meta","content",i).get(n+(a.content||""))){for(l=0;l<o.length;l++)if(s=o[l],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){o.splice(l,1);break t}}s=i.createElement(n),He(s,n,a),i.head.appendChild(s);break;default:throw Error(d(468,n))}s[qe]=e,ze(s),n=s}e.stateNode=n}else lh(i,e.type,e.stateNode);else e.stateNode=rh(i,n,e.memoizedProps);else s!==n?(s===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):s.count--,n===null?lh(i,e.type,e.stateNode):rh(i,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Ao(e,e.memoizedProps,a.memoizedProps)}break;case 27:Ke(t,e),Ie(e),n&512&&(Re||a===null||Dt(a,a.return)),a!==null&&n&4&&Ao(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Ke(t,e),Ie(e),n&512&&(Re||a===null||Dt(a,a.return)),e.flags&32){i=e.stateNode;try{Fa(i,"")}catch(j){me(e,e.return,j)}}n&4&&e.stateNode!=null&&(i=e.memoizedProps,Ao(e,i,a!==null?a.memoizedProps:i)),n&1024&&(Ro=!0);break;case 6:if(Ke(t,e),Ie(e),n&4){if(e.stateNode===null)throw Error(d(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n}catch(j){me(e,e.return,j)}}break;case 3:if(Ms=null,i=Tt,Tt=js(t.containerInfo),Ke(t,e),Tt=i,Ie(e),n&4&&a!==null&&a.memoizedState.isDehydrated)try{Dn(t.containerInfo)}catch(j){me(e,e.return,j)}Ro&&(Ro=!1,lu(e));break;case 4:n=Tt,Tt=js(e.stateNode.containerInfo),Ke(t,e),Ie(e),Tt=n;break;case 12:Ke(t,e),Ie(e);break;case 31:Ke(t,e),Ie(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,vs(e,n)));break;case 13:Ke(t,e),Ie(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(xs=tt()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,vs(e,n)));break;case 22:i=e.memoizedState!==null;var u=a!==null&&a.memoizedState!==null,g=Xt,x=Re;if(Xt=g||i,Re=x||u,Ke(t,e),Re=x,Xt=g,Ie(e),n&8192)e:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(a===null||u||Xt||Re||Ga(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){u=a=t;try{if(s=u.stateNode,i)o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{l=u.stateNode;var S=u.memoizedProps.style,b=S!=null&&S.hasOwnProperty("display")?S.display:null;l.style.display=b==null||typeof b=="boolean"?"":(""+b).trim()}}catch(j){me(u,u.return,j)}}}else if(t.tag===6){if(a===null){u=t;try{u.stateNode.nodeValue=i?"":u.memoizedProps}catch(j){me(u,u.return,j)}}}else if(t.tag===18){if(a===null){u=t;try{var v=u.stateNode;i?Fu(v,!0):Fu(u.stateNode,!1)}catch(j){me(u,u.return,j)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,vs(e,a))));break;case 19:Ke(t,e),Ie(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,vs(e,n)));break;case 30:break;case 21:break;default:Ke(t,e),Ie(e)}}function Ie(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if(Pd(n)){a=n;break}n=n.return}if(a==null)throw Error(d(160));switch(a.tag){case 27:var i=a.stateNode,s=Co(e);bs(e,s,i);break;case 5:var o=a.stateNode;a.flags&32&&(Fa(o,""),a.flags&=-33);var l=Co(e);bs(e,l,o);break;case 3:case 4:var u=a.stateNode.containerInfo,g=Co(e);Do(e,g,u);break;default:throw Error(d(161))}}catch(x){me(e,e.return,x)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function lu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;lu(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Vt(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)au(e,t.alternate,t),t=t.sibling}function Ga(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:ua(4,t,t.return),Ga(t);break;case 1:Dt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&Fd(t,t.return,a),Ga(t);break;case 27:fi(t.stateNode);case 26:case 5:Dt(t,t.return),Ga(t);break;case 22:t.memoizedState===null&&Ga(t);break;case 30:Ga(t);break;default:Ga(t)}e=e.sibling}}function Zt(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,i=e,s=t,o=s.flags;switch(s.tag){case 0:case 11:case 15:Zt(i,s,a),si(4,s);break;case 1:if(Zt(i,s,a),n=s,i=n.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(g){me(n,n.return,g)}if(n=s,i=n.updateQueue,i!==null){var l=n.stateNode;try{var u=i.shared.hiddenCallbacks;if(u!==null)for(i.shared.hiddenCallbacks=null,i=0;i<u.length;i++)Hc(u[i],l)}catch(g){me(n,n.return,g)}}a&&o&64&&Wd(s),ri(s,s.return);break;case 27:eu(s);case 26:case 5:Zt(i,s,a),a&&n===null&&o&4&&$d(s),ri(s,s.return);break;case 12:Zt(i,s,a);break;case 31:Zt(i,s,a),a&&o&4&&su(i,s);break;case 13:Zt(i,s,a),a&&o&4&&ru(i,s);break;case 22:s.memoizedState===null&&Zt(i,s,a),ri(s,s.return);break;case 30:break;default:Zt(i,s,a)}t=t.sibling}}function Eo(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Zn(a))}function jo(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Zn(e))}function Nt(e,t,a,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)cu(e,t,a,n),t=t.sibling}function cu(e,t,a,n){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Nt(e,t,a,n),i&2048&&si(9,t);break;case 1:Nt(e,t,a,n);break;case 3:Nt(e,t,a,n),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Zn(e)));break;case 12:if(i&2048){Nt(e,t,a,n),e=t.stateNode;try{var s=t.memoizedProps,o=s.id,l=s.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(u){me(t,t.return,u)}}else Nt(e,t,a,n);break;case 31:Nt(e,t,a,n);break;case 13:Nt(e,t,a,n);break;case 23:break;case 22:s=t.stateNode,o=t.alternate,t.memoizedState!==null?s._visibility&2?Nt(e,t,a,n):oi(e,t):s._visibility&2?Nt(e,t,a,n):(s._visibility|=2,vn(e,t,a,n,(t.subtreeFlags&10256)!==0||!1)),i&2048&&Eo(o,t);break;case 24:Nt(e,t,a,n),i&2048&&jo(t.alternate,t);break;default:Nt(e,t,a,n)}}function vn(e,t,a,n,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,o=t,l=a,u=n,g=o.flags;switch(o.tag){case 0:case 11:case 15:vn(s,o,l,u,i),si(8,o);break;case 23:break;case 22:var x=o.stateNode;o.memoizedState!==null?x._visibility&2?vn(s,o,l,u,i):oi(s,o):(x._visibility|=2,vn(s,o,l,u,i)),i&&g&2048&&Eo(o.alternate,o);break;case 24:vn(s,o,l,u,i),i&&g&2048&&jo(o.alternate,o);break;default:vn(s,o,l,u,i)}t=t.sibling}}function oi(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,i=n.flags;switch(n.tag){case 22:oi(a,n),i&2048&&Eo(n.alternate,n);break;case 24:oi(a,n),i&2048&&jo(n.alternate,n);break;default:oi(a,n)}t=t.sibling}}var li=8192;function yn(e,t,a){if(e.subtreeFlags&li)for(e=e.child;e!==null;)du(e,t,a),e=e.sibling}function du(e,t,a){switch(e.tag){case 26:yn(e,t,a),e.flags&li&&e.memoizedState!==null&&df(a,Tt,e.memoizedState,e.memoizedProps);break;case 5:yn(e,t,a);break;case 3:case 4:var n=Tt;Tt=js(e.stateNode.containerInfo),yn(e,t,a),Tt=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=li,li=16777216,yn(e,t,a),li=n):yn(e,t,a));break;default:yn(e,t,a)}}function uu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function ci(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Me=n,mu(n,e)}uu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)hu(e),e=e.sibling}function hu(e){switch(e.tag){case 0:case 11:case 15:ci(e),e.flags&2048&&ua(9,e,e.return);break;case 3:ci(e);break;case 12:ci(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ys(e)):ci(e);break;default:ci(e)}}function ys(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Me=n,mu(n,e)}uu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ua(8,t,t.return),ys(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,ys(t));break;default:ys(t)}e=e.sibling}}function mu(e,t){for(;Me!==null;){var a=Me;switch(a.tag){case 0:case 11:case 15:ua(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:Zn(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,Me=n;else e:for(a=e;Me!==null;){n=Me;var i=n.sibling,s=n.return;if(nu(n),n===a){Me=null;break e}if(i!==null){i.return=s,Me=i;break e}Me=s}}}var Tp={getCacheForType:function(e){var t=Ue(Ae),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return Ue(Ae).controller.signal}},Np=typeof WeakMap=="function"?WeakMap:Map,ce=0,be=null,F=null,ee=0,he=0,lt=null,ha=!1,xn=!1,zo=!1,Jt=0,Te=0,ma=0,Ya=0,Mo=0,ct=0,wn=0,di=null,We=null,qo=!1,xs=0,pu=0,ws=1/0,ks=null,pa=null,je=0,fa=null,kn=null,Kt=0,_o=0,Uo=null,fu=null,ui=0,Bo=null;function dt(){return(ce&2)!==0&&ee!==0?ee&-ee:w.T!==null?Qo():El()}function gu(){if(ct===0)if((ee&536870912)===0||ne){var e=Ri;Ri<<=1,(Ri&3932160)===0&&(Ri=262144),ct=e}else ct=536870912;return e=rt.current,e!==null&&(e.flags|=32),ct}function Fe(e,t,a){(e===be&&(he===2||he===9)||e.cancelPendingCommit!==null)&&(Sn(e,0),ga(e,ee,ct,!1)),jn(e,a),((ce&2)===0||e!==be)&&(e===be&&((ce&2)===0&&(Ya|=a),Te===4&&ga(e,ee,ct,!1)),Rt(e))}function bu(e,t,a){if((ce&6)!==0)throw Error(d(327));var n=!a&&(t&127)===0&&(t&e.expiredLanes)===0||En(e,t),i=n?Cp(e,t):Lo(e,t,!0),s=n;do{if(i===0){xn&&!n&&ga(e,t,0,!1);break}else{if(a=e.current.alternate,s&&!Op(a)){i=Lo(e,t,!1),s=!1;continue}if(i===2){if(s=t,e.errorRecoveryDisabledLanes&s)var o=0;else o=e.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){t=o;e:{var l=e;i=di;var u=l.current.memoizedState.isDehydrated;if(u&&(Sn(l,o).flags|=256),o=Lo(l,o,!1),o!==2){if(zo&&!u){l.errorRecoveryDisabledLanes|=s,Ya|=s,i=4;break e}s=We,We=i,s!==null&&(We===null?We=s:We.push.apply(We,s))}i=o}if(s=!1,i!==2)continue}}if(i===1){Sn(e,0),ga(e,t,0,!0);break}e:{switch(n=e,s=i,s){case 0:case 1:throw Error(d(345));case 4:if((t&4194048)!==t)break;case 6:ga(n,t,ct,!ha);break e;case 2:We=null;break;case 3:case 5:break;default:throw Error(d(329))}if((t&62914560)===t&&(i=xs+300-tt(),10<i)){if(ga(n,t,ct,!ha),ji(n,0,!0)!==0)break e;Kt=t,n.timeoutHandle=Ku(vu.bind(null,n,a,We,ks,qo,t,ct,Ya,wn,ha,s,"Throttled",-0,0),i);break e}vu(n,a,We,ks,qo,t,ct,Ya,wn,ha,s,null,-0,0)}}break}while(!0);Rt(e)}function vu(e,t,a,n,i,s,o,l,u,g,x,S,b,v){if(e.timeoutHandle=-1,S=t.subtreeFlags,S&8192||(S&16785408)===16785408){S={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:zt},du(t,s,S);var j=(s&62914560)===s?xs-tt():(s&4194048)===s?pu-tt():0;if(j=uf(S,j),j!==null){Kt=s,e.cancelPendingCommit=j(Ou.bind(null,e,t,s,a,n,i,o,l,u,x,S,null,b,v)),ga(e,s,o,!g);return}}Ou(e,t,s,a,n,i,o,l,u)}function Op(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var i=a[n],s=i.getSnapshot;i=i.value;try{if(!it(s(),i))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ga(e,t,a,n){t&=~Mo,t&=~Ya,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var i=t;0<i;){var s=31-nt(i),o=1<<s;n[s]=-1,i&=~o}a!==0&&Cl(e,a,t)}function Ss(){return(ce&6)===0?(hi(0),!1):!0}function Ho(){if(F!==null){if(he===0)var e=F.return;else e=F,Ut=za=null,eo(e),mn=null,Kn=0,e=F;for(;e!==null;)Id(e.alternate,e),e=e.return;F=null}}function Sn(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Zp(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Kt=0,Ho(),be=e,F=a=qt(e.current,null),ee=t,he=0,lt=null,ha=!1,xn=En(e,t),zo=!1,wn=ct=Mo=Ya=ma=Te=0,We=di=null,qo=!1,(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-nt(n),s=1<<i;t|=e[i],n&=~s}return Jt=t,Qi(),a}function yu(e,t){V=null,w.H=ai,t===hn||t===$i?(t=qc(),he=3):t===Yr?(t=qc(),he=4):he=t===bo?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,lt=t,F===null&&(Te=1,hs(e,pt(t,e.current)))}function xu(){var e=rt.current;return e===null?!0:(ee&4194048)===ee?vt===null:(ee&62914560)===ee||(ee&536870912)!==0?e===vt:!1}function wu(){var e=w.H;return w.H=ai,e===null?ai:e}function ku(){var e=w.A;return w.A=Tp,e}function Ts(){Te=4,ha||(ee&4194048)!==ee&&rt.current!==null||(xn=!0),(ma&134217727)===0&&(Ya&134217727)===0||be===null||ga(be,ee,ct,!1)}function Lo(e,t,a){var n=ce;ce|=2;var i=wu(),s=ku();(be!==e||ee!==t)&&(ks=null,Sn(e,t)),t=!1;var o=Te;e:do try{if(he!==0&&F!==null){var l=F,u=lt;switch(he){case 8:Ho(),o=6;break e;case 3:case 2:case 9:case 6:rt.current===null&&(t=!0);var g=he;if(he=0,lt=null,Tn(e,l,u,g),a&&xn){o=0;break e}break;default:g=he,he=0,lt=null,Tn(e,l,u,g)}}Ap(),o=Te;break}catch(x){yu(e,x)}while(!0);return t&&e.shellSuspendCounter++,Ut=za=null,ce=n,w.H=i,w.A=s,F===null&&(be=null,ee=0,Qi()),o}function Ap(){for(;F!==null;)Su(F)}function Cp(e,t){var a=ce;ce|=2;var n=wu(),i=ku();be!==e||ee!==t?(ks=null,ws=tt()+500,Sn(e,t)):xn=En(e,t);e:do try{if(he!==0&&F!==null){t=F;var s=lt;t:switch(he){case 1:he=0,lt=null,Tn(e,t,s,1);break;case 2:case 9:if(zc(s)){he=0,lt=null,Tu(t);break}t=function(){he!==2&&he!==9||be!==e||(he=7),Rt(e)},s.then(t,t);break e;case 3:he=7;break e;case 4:he=5;break e;case 7:zc(s)?(he=0,lt=null,Tu(t)):(he=0,lt=null,Tn(e,t,s,7));break;case 5:var o=null;switch(F.tag){case 26:o=F.memoizedState;case 5:case 27:var l=F;if(o?ch(o):l.stateNode.complete){he=0,lt=null;var u=l.sibling;if(u!==null)F=u;else{var g=l.return;g!==null?(F=g,Ns(g)):F=null}break t}}he=0,lt=null,Tn(e,t,s,5);break;case 6:he=0,lt=null,Tn(e,t,s,6);break;case 8:Ho(),Te=6;break e;default:throw Error(d(462))}}Dp();break}catch(x){yu(e,x)}while(!0);return Ut=za=null,w.H=n,w.A=i,ce=a,F!==null?0:(be=null,ee=0,Qi(),Te)}function Dp(){for(;F!==null&&!$h();)Su(F)}function Su(e){var t=Jd(e.alternate,e,Jt);e.memoizedProps=e.pendingProps,t===null?Ns(e):F=t}function Tu(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Gd(a,t,t.pendingProps,t.type,void 0,ee);break;case 11:t=Gd(a,t,t.pendingProps,t.type.render,t.ref,ee);break;case 5:eo(t);default:Id(a,t),t=F=kc(t,Jt),t=Jd(a,t,Jt)}e.memoizedProps=e.pendingProps,t===null?Ns(e):F=t}function Tn(e,t,a,n){Ut=za=null,eo(t),mn=null,Kn=0;var i=t.return;try{if(bp(e,i,t,a,ee)){Te=1,hs(e,pt(a,e.current)),F=null;return}}catch(s){if(i!==null)throw F=i,s;Te=1,hs(e,pt(a,e.current)),F=null;return}t.flags&32768?(ne||n===1?e=!0:xn||(ee&536870912)!==0?e=!1:(ha=e=!0,(n===2||n===9||n===3||n===6)&&(n=rt.current,n!==null&&n.tag===13&&(n.flags|=16384))),Nu(t,e)):Ns(t)}function Ns(e){var t=e;do{if((t.flags&32768)!==0){Nu(t,ha);return}e=t.return;var a=xp(t.alternate,t,Jt);if(a!==null){F=a;return}if(t=t.sibling,t!==null){F=t;return}F=t=e}while(t!==null);Te===0&&(Te=5)}function Nu(e,t){do{var a=wp(e.alternate,e);if(a!==null){a.flags&=32767,F=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){F=e;return}F=e=a}while(e!==null);Te=6,F=null}function Ou(e,t,a,n,i,s,o,l,u){e.cancelPendingCommit=null;do Os();while(je!==0);if((ce&6)!==0)throw Error(d(327));if(t!==null){if(t===e.current)throw Error(d(177));if(s=t.lanes|t.childLanes,s|=Ar,lm(e,a,s,o,l,u),e===be&&(F=be=null,ee=0),kn=t,fa=e,Kt=a,_o=s,Uo=i,fu=n,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,zp(Ci,function(){return Eu(),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=w.T,w.T=null,i=E.p,E.p=2,o=ce,ce|=4;try{kp(e,t,a)}finally{ce=o,E.p=i,w.T=n}}je=1,Au(),Cu(),Du()}}function Au(){if(je===1){je=0;var e=fa,t=kn,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=w.T,w.T=null;var n=E.p;E.p=2;var i=ce;ce|=4;try{ou(t,e);var s=$o,o=mc(e.containerInfo),l=s.focusedElem,u=s.selectionRange;if(o!==l&&l&&l.ownerDocument&&hc(l.ownerDocument.documentElement,l)){if(u!==null&&kr(l)){var g=u.start,x=u.end;if(x===void 0&&(x=g),"selectionStart"in l)l.selectionStart=g,l.selectionEnd=Math.min(x,l.value.length);else{var S=l.ownerDocument||document,b=S&&S.defaultView||window;if(b.getSelection){var v=b.getSelection(),j=l.textContent.length,H=Math.min(u.start,j),ge=u.end===void 0?H:Math.min(u.end,j);!v.extend&&H>ge&&(o=ge,ge=H,H=o);var p=uc(l,H),m=uc(l,ge);if(p&&m&&(v.rangeCount!==1||v.anchorNode!==p.node||v.anchorOffset!==p.offset||v.focusNode!==m.node||v.focusOffset!==m.offset)){var f=S.createRange();f.setStart(p.node,p.offset),v.removeAllRanges(),H>ge?(v.addRange(f),v.extend(m.node,m.offset)):(f.setEnd(m.node,m.offset),v.addRange(f))}}}}for(S=[],v=l;v=v.parentNode;)v.nodeType===1&&S.push({element:v,left:v.scrollLeft,top:v.scrollTop});for(typeof l.focus=="function"&&l.focus(),l=0;l<S.length;l++){var k=S[l];k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}Bs=!!Fo,$o=Fo=null}finally{ce=i,E.p=n,w.T=a}}e.current=t,je=2}}function Cu(){if(je===2){je=0;var e=fa,t=kn,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=w.T,w.T=null;var n=E.p;E.p=2;var i=ce;ce|=4;try{au(e,t.alternate,t)}finally{ce=i,E.p=n,w.T=a}}je=3}}function Du(){if(je===4||je===3){je=0,Ph();var e=fa,t=kn,a=Kt,n=fu;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?je=5:(je=0,kn=fa=null,Ru(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(pa=null),nr(a),t=t.stateNode,at&&typeof at.onCommitFiberRoot=="function")try{at.onCommitFiberRoot(Rn,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=w.T,i=E.p,E.p=2,w.T=null;try{for(var s=e.onRecoverableError,o=0;o<n.length;o++){var l=n[o];s(l.value,{componentStack:l.stack})}}finally{w.T=t,E.p=i}}(Kt&3)!==0&&Os(),Rt(e),i=e.pendingLanes,(a&261930)!==0&&(i&42)!==0?e===Bo?ui++:(ui=0,Bo=e):ui=0,hi(0)}}function Ru(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Zn(t)))}function Os(){return Au(),Cu(),Du(),Eu()}function Eu(){if(je!==5)return!1;var e=fa,t=_o;_o=0;var a=nr(Kt),n=w.T,i=E.p;try{E.p=32>a?32:a,w.T=null,a=Uo,Uo=null;var s=fa,o=Kt;if(je=0,kn=fa=null,Kt=0,(ce&6)!==0)throw Error(d(331));var l=ce;if(ce|=4,hu(s.current),cu(s,s.current,o,a),ce=l,hi(0,!1),at&&typeof at.onPostCommitFiberRoot=="function")try{at.onPostCommitFiberRoot(Rn,s)}catch{}return!0}finally{E.p=i,w.T=n,Ru(e,t)}}function ju(e,t,a){t=pt(a,t),t=go(e.stateNode,t,2),e=la(e,t,2),e!==null&&(jn(e,2),Rt(e))}function me(e,t,a){if(e.tag===3)ju(e,e,a);else for(;t!==null;){if(t.tag===3){ju(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(pa===null||!pa.has(n))){e=pt(a,e),a=zd(2),n=la(t,a,2),n!==null&&(Md(a,n,t,e),jn(n,2),Rt(n));break}}t=t.return}}function Go(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new Np;var i=new Set;n.set(t,i)}else i=n.get(t),i===void 0&&(i=new Set,n.set(t,i));i.has(a)||(zo=!0,i.add(a),e=Rp.bind(null,e,t,a),t.then(e,e))}function Rp(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,be===e&&(ee&a)===a&&(Te===4||Te===3&&(ee&62914560)===ee&&300>tt()-xs?(ce&2)===0&&Sn(e,0):Mo|=a,wn===ee&&(wn=0)),Rt(e)}function zu(e,t){t===0&&(t=Al()),e=Ra(e,t),e!==null&&(jn(e,t),Rt(e))}function Ep(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),zu(e,a)}function jp(e,t){var a=0;switch(e.tag){case 31:case 13:var n=e.stateNode,i=e.memoizedState;i!==null&&(a=i.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(d(314))}n!==null&&n.delete(t),zu(e,a)}function zp(e,t){return Ps(e,t)}var As=null,Nn=null,Yo=!1,Cs=!1,Xo=!1,ba=0;function Rt(e){e!==Nn&&e.next===null&&(Nn===null?As=Nn=e:Nn=Nn.next=e),Cs=!0,Yo||(Yo=!0,qp())}function hi(e,t){if(!Xo&&Cs){Xo=!0;do for(var a=!1,n=As;n!==null;){if(e!==0){var i=n.pendingLanes;if(i===0)var s=0;else{var o=n.suspendedLanes,l=n.pingedLanes;s=(1<<31-nt(42|e)+1)-1,s&=i&~(o&~l),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(a=!0,Uu(n,s))}else s=ee,s=ji(n,n===be?s:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(s&3)===0||En(n,s)||(a=!0,Uu(n,s));n=n.next}while(a);Xo=!1}}function Mp(){Mu()}function Mu(){Cs=Yo=!1;var e=0;ba!==0&&Vp()&&(e=ba);for(var t=tt(),a=null,n=As;n!==null;){var i=n.next,s=qu(n,t);s===0?(n.next=null,a===null?As=i:a.next=i,i===null&&(Nn=a)):(a=n,(e!==0||(s&3)!==0)&&(Cs=!0)),n=i}je!==0&&je!==5||hi(e),ba!==0&&(ba=0)}function qu(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var o=31-nt(s),l=1<<o,u=i[o];u===-1?((l&a)===0||(l&n)!==0)&&(i[o]=om(l,t)):u<=t&&(e.expiredLanes|=l),s&=~l}if(t=be,a=ee,a=ji(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(he===2||he===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&er(n),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||En(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&er(n),nr(a)){case 2:case 8:a=Nl;break;case 32:a=Ci;break;case 268435456:a=Ol;break;default:a=Ci}return n=_u.bind(null,e),a=Ps(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&er(n),e.callbackPriority=2,e.callbackNode=null,2}function _u(e,t){if(je!==0&&je!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Os()&&e.callbackNode!==a)return null;var n=ee;return n=ji(e,e===be?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(bu(e,n,t),qu(e,tt()),e.callbackNode!=null&&e.callbackNode===a?_u.bind(null,e):null)}function Uu(e,t){if(Os())return null;bu(e,t,!0)}function qp(){Jp(function(){(ce&6)!==0?Ps(Tl,Mp):Mu()})}function Qo(){if(ba===0){var e=dn;e===0&&(e=Di,Di<<=1,(Di&261888)===0&&(Di=256)),ba=e}return ba}function Bu(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:_i(""+e)}function Hu(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function _p(e,t,a,n,i){if(t==="submit"&&a&&a.stateNode===i){var s=Bu((i[Ve]||null).action),o=n.submitter;o&&(t=(t=o[Ve]||null)?Bu(t.formAction):o.getAttribute("formAction"),t!==null&&(s=t,o=null));var l=new Li("action","action",null,n,i);e.push({event:l,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(ba!==0){var u=o?Hu(i,o):new FormData(i);co(a,{pending:!0,data:u,method:i.method,action:s},null,u)}}else typeof s=="function"&&(l.preventDefault(),u=o?Hu(i,o):new FormData(i),co(a,{pending:!0,data:u,method:i.method,action:s},s,u))},currentTarget:i}]})}}for(var Vo=0;Vo<Or.length;Vo++){var Zo=Or[Vo],Up=Zo.toLowerCase(),Bp=Zo[0].toUpperCase()+Zo.slice(1);St(Up,"on"+Bp)}St(gc,"onAnimationEnd"),St(bc,"onAnimationIteration"),St(vc,"onAnimationStart"),St("dblclick","onDoubleClick"),St("focusin","onFocus"),St("focusout","onBlur"),St(ep,"onTransitionRun"),St(tp,"onTransitionStart"),St(ap,"onTransitionCancel"),St(yc,"onTransitionEnd"),Ia("onMouseEnter",["mouseout","mouseover"]),Ia("onMouseLeave",["mouseout","mouseover"]),Ia("onPointerEnter",["pointerout","pointerover"]),Ia("onPointerLeave",["pointerout","pointerover"]),Oa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Oa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Oa("onBeforeInput",["compositionend","keypress","textInput","paste"]),Oa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Oa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Oa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var mi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hp=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mi));function Lu(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],i=n.event;n=n.listeners;e:{var s=void 0;if(t)for(var o=n.length-1;0<=o;o--){var l=n[o],u=l.instance,g=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;s=l,i.currentTarget=g;try{s(i)}catch(x){Xi(x)}i.currentTarget=null,s=u}else for(o=0;o<n.length;o++){if(l=n[o],u=l.instance,g=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;s=l,i.currentTarget=g;try{s(i)}catch(x){Xi(x)}i.currentTarget=null,s=u}}}}function $(e,t){var a=t[ir];a===void 0&&(a=t[ir]=new Set);var n=e+"__bubble";a.has(n)||(Gu(t,e,2,!1),a.add(n))}function Jo(e,t,a){var n=0;t&&(n|=4),Gu(a,e,n,t)}var Ds="_reactListening"+Math.random().toString(36).slice(2);function Ko(e){if(!e[Ds]){e[Ds]=!0,Ml.forEach(function(a){a!=="selectionchange"&&(Hp.has(a)||Jo(a,!1,e),Jo(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ds]||(t[Ds]=!0,Jo("selectionchange",!1,t))}}function Gu(e,t,a,n){switch(gh(t)){case 2:var i=pf;break;case 8:i=ff;break;default:i=cl}a=i.bind(null,t,a,e),i=void 0,!mr||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),n?i!==void 0?e.addEventListener(t,a,{capture:!0,passive:i}):e.addEventListener(t,a,!0):i!==void 0?e.addEventListener(t,a,{passive:i}):e.addEventListener(t,a,!1)}function Io(e,t,a,n,i){var s=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var o=n.tag;if(o===3||o===4){var l=n.stateNode.containerInfo;if(l===i)break;if(o===4)for(o=n.return;o!==null;){var u=o.tag;if((u===3||u===4)&&o.stateNode.containerInfo===i)return;o=o.return}for(;l!==null;){if(o=Za(l),o===null)return;if(u=o.tag,u===5||u===6||u===26||u===27){n=s=o;continue e}l=l.parentNode}}n=n.return}Zl(function(){var g=s,x=ur(a),S=[];e:{var b=xc.get(e);if(b!==void 0){var v=Li,j=e;switch(e){case"keypress":if(Bi(a)===0)break e;case"keydown":case"keyup":v=jm;break;case"focusin":j="focus",v=br;break;case"focusout":j="blur",v=br;break;case"beforeblur":case"afterblur":v=br;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Il;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=xm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=qm;break;case gc:case bc:case vc:v=Sm;break;case yc:v=Um;break;case"scroll":case"scrollend":v=vm;break;case"wheel":v=Hm;break;case"copy":case"cut":case"paste":v=Nm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Fl;break;case"toggle":case"beforetoggle":v=Gm}var H=(t&4)!==0,ge=!H&&(e==="scroll"||e==="scrollend"),p=H?b!==null?b+"Capture":null:b;H=[];for(var m=g,f;m!==null;){var k=m;if(f=k.stateNode,k=k.tag,k!==5&&k!==26&&k!==27||f===null||p===null||(k=qn(m,p),k!=null&&H.push(pi(m,k,f))),ge)break;m=m.return}0<H.length&&(b=new v(b,j,null,a,x),S.push({event:b,listeners:H}))}}if((t&7)===0){e:{if(b=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",b&&a!==dr&&(j=a.relatedTarget||a.fromElement)&&(Za(j)||j[Va]))break e;if((v||b)&&(b=x.window===x?x:(b=x.ownerDocument)?b.defaultView||b.parentWindow:window,v?(j=a.relatedTarget||a.toElement,v=g,j=j?Za(j):null,j!==null&&(ge=O(j),H=j.tag,j!==ge||H!==5&&H!==27&&H!==6)&&(j=null)):(v=null,j=g),v!==j)){if(H=Il,k="onMouseLeave",p="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(H=Fl,k="onPointerLeave",p="onPointerEnter",m="pointer"),ge=v==null?b:Mn(v),f=j==null?b:Mn(j),b=new H(k,m+"leave",v,a,x),b.target=ge,b.relatedTarget=f,k=null,Za(x)===g&&(H=new H(p,m+"enter",j,a,x),H.target=f,H.relatedTarget=ge,k=H),ge=k,v&&j)t:{for(H=Lp,p=v,m=j,f=0,k=p;k;k=H(k))f++;k=0;for(var _=m;_;_=H(_))k++;for(;0<f-k;)p=H(p),f--;for(;0<k-f;)m=H(m),k--;for(;f--;){if(p===m||m!==null&&p===m.alternate){H=p;break t}p=H(p),m=H(m)}H=null}else H=null;v!==null&&Yu(S,b,v,H,!1),j!==null&&ge!==null&&Yu(S,ge,j,H,!0)}}e:{if(b=g?Mn(g):window,v=b.nodeName&&b.nodeName.toLowerCase(),v==="select"||v==="input"&&b.type==="file")var re=sc;else if(nc(b))if(rc)re=Fm;else{re=Im;var M=Km}else v=b.nodeName,!v||v.toLowerCase()!=="input"||b.type!=="checkbox"&&b.type!=="radio"?g&&cr(g.elementType)&&(re=sc):re=Wm;if(re&&(re=re(e,g))){ic(S,re,a,x);break e}M&&M(e,b,g),e==="focusout"&&g&&b.type==="number"&&g.memoizedProps.value!=null&&lr(b,"number",b.value)}switch(M=g?Mn(g):window,e){case"focusin":(nc(M)||M.contentEditable==="true")&&(tn=M,Sr=g,Xn=null);break;case"focusout":Xn=Sr=tn=null;break;case"mousedown":Tr=!0;break;case"contextmenu":case"mouseup":case"dragend":Tr=!1,pc(S,a,x);break;case"selectionchange":if(Pm)break;case"keydown":case"keyup":pc(S,a,x)}var K;if(yr)e:{switch(e){case"compositionstart":var te="onCompositionStart";break e;case"compositionend":te="onCompositionEnd";break e;case"compositionupdate":te="onCompositionUpdate";break e}te=void 0}else en?tc(e,a)&&(te="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(te="onCompositionStart");te&&($l&&a.locale!=="ko"&&(en||te!=="onCompositionStart"?te==="onCompositionEnd"&&en&&(K=Jl()):(ta=x,pr="value"in ta?ta.value:ta.textContent,en=!0)),M=Rs(g,te),0<M.length&&(te=new Wl(te,e,null,a,x),S.push({event:te,listeners:M}),K?te.data=K:(K=ac(a),K!==null&&(te.data=K)))),(K=Xm?Qm(e,a):Vm(e,a))&&(te=Rs(g,"onBeforeInput"),0<te.length&&(M=new Wl("onBeforeInput","beforeinput",null,a,x),S.push({event:M,listeners:te}),M.data=K)),_p(S,e,g,a,x)}Lu(S,t)})}function pi(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Rs(e,t){for(var a=t+"Capture",n=[];e!==null;){var i=e,s=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||s===null||(i=qn(e,a),i!=null&&n.unshift(pi(e,i,s)),i=qn(e,t),i!=null&&n.push(pi(e,i,s))),e.tag===3)return n;e=e.return}return[]}function Lp(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Yu(e,t,a,n,i){for(var s=t._reactName,o=[];a!==null&&a!==n;){var l=a,u=l.alternate,g=l.stateNode;if(l=l.tag,u!==null&&u===n)break;l!==5&&l!==26&&l!==27||g===null||(u=g,i?(g=qn(a,s),g!=null&&o.unshift(pi(a,g,u))):i||(g=qn(a,s),g!=null&&o.push(pi(a,g,u)))),a=a.return}o.length!==0&&e.push({event:t,listeners:o})}var Gp=/\r\n?/g,Yp=/\u0000|\uFFFD/g;function Xu(e){return(typeof e=="string"?e:""+e).replace(Gp,`
`).replace(Yp,"")}function Qu(e,t){return t=Xu(t),Xu(e)===t}function fe(e,t,a,n,i,s){switch(a){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||Fa(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&Fa(e,""+n);break;case"className":Mi(e,"class",n);break;case"tabIndex":Mi(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":Mi(e,a,n);break;case"style":Ql(e,n,s);break;case"data":if(t!=="object"){Mi(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=_i(""+n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(a==="formAction"?(t!=="input"&&fe(e,t,"name",i.name,i,null),fe(e,t,"formEncType",i.formEncType,i,null),fe(e,t,"formMethod",i.formMethod,i,null),fe(e,t,"formTarget",i.formTarget,i,null)):(fe(e,t,"encType",i.encType,i,null),fe(e,t,"method",i.method,i,null),fe(e,t,"target",i.target,i,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=_i(""+n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=zt);break;case"onScroll":n!=null&&$("scroll",e);break;case"onScrollEnd":n!=null&&$("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(d(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(d(60));e.innerHTML=a}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=_i(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""+n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":$("beforetoggle",e),$("toggle",e),zi(e,"popover",n);break;case"xlinkActuate":jt(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":jt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":jt(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":jt(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":jt(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":jt(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":jt(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":jt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":jt(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":zi(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=gm.get(a)||a,zi(e,a,n))}}function Wo(e,t,a,n,i,s){switch(a){case"style":Ql(e,n,s);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(d(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(d(60));e.innerHTML=a}}break;case"children":typeof n=="string"?Fa(e,n):(typeof n=="number"||typeof n=="bigint")&&Fa(e,""+n);break;case"onScroll":n!=null&&$("scroll",e);break;case"onScrollEnd":n!=null&&$("scrollend",e);break;case"onClick":n!=null&&(e.onclick=zt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ql.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(i=a.endsWith("Capture"),t=a.slice(2,i?a.length-7:void 0),s=e[Ve]||null,s=s!=null?s[a]:null,typeof s=="function"&&e.removeEventListener(t,s,i),typeof n=="function")){typeof s!="function"&&s!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,n,i);break e}a in e?e[a]=n:n===!0?e.setAttribute(a,""):zi(e,a,n)}}}function He(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":$("error",e),$("load",e);var n=!1,i=!1,s;for(s in a)if(a.hasOwnProperty(s)){var o=a[s];if(o!=null)switch(s){case"src":n=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:fe(e,t,s,o,a,null)}}i&&fe(e,t,"srcSet",a.srcSet,a,null),n&&fe(e,t,"src",a.src,a,null);return;case"input":$("invalid",e);var l=s=o=i=null,u=null,g=null;for(n in a)if(a.hasOwnProperty(n)){var x=a[n];if(x!=null)switch(n){case"name":i=x;break;case"type":o=x;break;case"checked":u=x;break;case"defaultChecked":g=x;break;case"value":s=x;break;case"defaultValue":l=x;break;case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(d(137,t));break;default:fe(e,t,n,x,a,null)}}Ll(e,s,l,u,g,o,i,!1);return;case"select":$("invalid",e),n=o=s=null;for(i in a)if(a.hasOwnProperty(i)&&(l=a[i],l!=null))switch(i){case"value":s=l;break;case"defaultValue":o=l;break;case"multiple":n=l;default:fe(e,t,i,l,a,null)}t=s,a=o,e.multiple=!!n,t!=null?Wa(e,!!n,t,!1):a!=null&&Wa(e,!!n,a,!0);return;case"textarea":$("invalid",e),s=i=n=null;for(o in a)if(a.hasOwnProperty(o)&&(l=a[o],l!=null))switch(o){case"value":n=l;break;case"defaultValue":i=l;break;case"children":s=l;break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(d(91));break;default:fe(e,t,o,l,a,null)}Yl(e,n,i,s);return;case"option":for(u in a)if(a.hasOwnProperty(u)&&(n=a[u],n!=null))switch(u){case"selected":e.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:fe(e,t,u,n,a,null)}return;case"dialog":$("beforetoggle",e),$("toggle",e),$("cancel",e),$("close",e);break;case"iframe":case"object":$("load",e);break;case"video":case"audio":for(n=0;n<mi.length;n++)$(mi[n],e);break;case"image":$("error",e),$("load",e);break;case"details":$("toggle",e);break;case"embed":case"source":case"link":$("error",e),$("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(g in a)if(a.hasOwnProperty(g)&&(n=a[g],n!=null))switch(g){case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:fe(e,t,g,n,a,null)}return;default:if(cr(t)){for(x in a)a.hasOwnProperty(x)&&(n=a[x],n!==void 0&&Wo(e,t,x,n,a,void 0));return}}for(l in a)a.hasOwnProperty(l)&&(n=a[l],n!=null&&fe(e,t,l,n,a,null))}function Xp(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,s=null,o=null,l=null,u=null,g=null,x=null;for(v in a){var S=a[v];if(a.hasOwnProperty(v)&&S!=null)switch(v){case"checked":break;case"value":break;case"defaultValue":u=S;default:n.hasOwnProperty(v)||fe(e,t,v,null,n,S)}}for(var b in n){var v=n[b];if(S=a[b],n.hasOwnProperty(b)&&(v!=null||S!=null))switch(b){case"type":s=v;break;case"name":i=v;break;case"checked":g=v;break;case"defaultChecked":x=v;break;case"value":o=v;break;case"defaultValue":l=v;break;case"children":case"dangerouslySetInnerHTML":if(v!=null)throw Error(d(137,t));break;default:v!==S&&fe(e,t,b,v,n,S)}}or(e,o,l,u,g,x,s,i);return;case"select":v=o=l=b=null;for(s in a)if(u=a[s],a.hasOwnProperty(s)&&u!=null)switch(s){case"value":break;case"multiple":v=u;default:n.hasOwnProperty(s)||fe(e,t,s,null,n,u)}for(i in n)if(s=n[i],u=a[i],n.hasOwnProperty(i)&&(s!=null||u!=null))switch(i){case"value":b=s;break;case"defaultValue":l=s;break;case"multiple":o=s;default:s!==u&&fe(e,t,i,s,n,u)}t=l,a=o,n=v,b!=null?Wa(e,!!a,b,!1):!!n!=!!a&&(t!=null?Wa(e,!!a,t,!0):Wa(e,!!a,a?[]:"",!1));return;case"textarea":v=b=null;for(l in a)if(i=a[l],a.hasOwnProperty(l)&&i!=null&&!n.hasOwnProperty(l))switch(l){case"value":break;case"children":break;default:fe(e,t,l,null,n,i)}for(o in n)if(i=n[o],s=a[o],n.hasOwnProperty(o)&&(i!=null||s!=null))switch(o){case"value":b=i;break;case"defaultValue":v=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(d(91));break;default:i!==s&&fe(e,t,o,i,n,s)}Gl(e,b,v);return;case"option":for(var j in a)if(b=a[j],a.hasOwnProperty(j)&&b!=null&&!n.hasOwnProperty(j))switch(j){case"selected":e.selected=!1;break;default:fe(e,t,j,null,n,b)}for(u in n)if(b=n[u],v=a[u],n.hasOwnProperty(u)&&b!==v&&(b!=null||v!=null))switch(u){case"selected":e.selected=b&&typeof b!="function"&&typeof b!="symbol";break;default:fe(e,t,u,b,n,v)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var H in a)b=a[H],a.hasOwnProperty(H)&&b!=null&&!n.hasOwnProperty(H)&&fe(e,t,H,null,n,b);for(g in n)if(b=n[g],v=a[g],n.hasOwnProperty(g)&&b!==v&&(b!=null||v!=null))switch(g){case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(d(137,t));break;default:fe(e,t,g,b,n,v)}return;default:if(cr(t)){for(var ge in a)b=a[ge],a.hasOwnProperty(ge)&&b!==void 0&&!n.hasOwnProperty(ge)&&Wo(e,t,ge,void 0,n,b);for(x in n)b=n[x],v=a[x],!n.hasOwnProperty(x)||b===v||b===void 0&&v===void 0||Wo(e,t,x,b,n,v);return}}for(var p in a)b=a[p],a.hasOwnProperty(p)&&b!=null&&!n.hasOwnProperty(p)&&fe(e,t,p,null,n,b);for(S in n)b=n[S],v=a[S],!n.hasOwnProperty(S)||b===v||b==null&&v==null||fe(e,t,S,b,n,v)}function Vu(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Qp(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),n=0;n<a.length;n++){var i=a[n],s=i.transferSize,o=i.initiatorType,l=i.duration;if(s&&l&&Vu(o)){for(o=0,l=i.responseEnd,n+=1;n<a.length;n++){var u=a[n],g=u.startTime;if(g>l)break;var x=u.transferSize,S=u.initiatorType;x&&Vu(S)&&(u=u.responseEnd,o+=x*(u<l?1:(l-g)/(u-g)))}if(--n,t+=8*(s+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Fo=null,$o=null;function Es(e){return e.nodeType===9?e:e.ownerDocument}function Zu(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ju(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Po(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var el=null;function Vp(){var e=window.event;return e&&e.type==="popstate"?e===el?!1:(el=e,!0):(el=null,!1)}var Ku=typeof setTimeout=="function"?setTimeout:void 0,Zp=typeof clearTimeout=="function"?clearTimeout:void 0,Iu=typeof Promise=="function"?Promise:void 0,Jp=typeof queueMicrotask=="function"?queueMicrotask:typeof Iu<"u"?function(e){return Iu.resolve(null).then(e).catch(Kp)}:Ku;function Kp(e){setTimeout(function(){throw e})}function va(e){return e==="head"}function Wu(e,t){var a=t,n=0;do{var i=a.nextSibling;if(e.removeChild(a),i&&i.nodeType===8)if(a=i.data,a==="/$"||a==="/&"){if(n===0){e.removeChild(i),Dn(t);return}n--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")n++;else if(a==="html")fi(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,fi(a);for(var s=a.firstChild;s;){var o=s.nextSibling,l=s.nodeName;s[zn]||l==="SCRIPT"||l==="STYLE"||l==="LINK"&&s.rel.toLowerCase()==="stylesheet"||a.removeChild(s),s=o}}else a==="body"&&fi(e.ownerDocument.body);a=i}while(a);Dn(t)}function Fu(e,t){var a=e;e=0;do{var n=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=n}while(a)}function tl(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":tl(a),sr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Ip(e,t,a,n){for(;e.nodeType===1;){var i=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[zn])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=yt(e.nextSibling),e===null)break}return null}function Wp(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=yt(e.nextSibling),e===null))return null;return e}function $u(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=yt(e.nextSibling),e===null))return null;return e}function al(e){return e.data==="$?"||e.data==="$~"}function nl(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Fp(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function yt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var il=null;function Pu(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return yt(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function eh(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function th(e,t,a){switch(t=Es(a),e){case"html":if(e=t.documentElement,!e)throw Error(d(452));return e;case"head":if(e=t.head,!e)throw Error(d(453));return e;case"body":if(e=t.body,!e)throw Error(d(454));return e;default:throw Error(d(451))}}function fi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);sr(e)}var xt=new Map,ah=new Set;function js(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var It=E.d;E.d={f:$p,r:Pp,D:ef,C:tf,L:af,m:nf,X:rf,S:sf,M:of};function $p(){var e=It.f(),t=Ss();return e||t}function Pp(e){var t=Ja(e);t!==null&&t.tag===5&&t.type==="form"?yd(t):It.r(e)}var On=typeof document>"u"?null:document;function nh(e,t,a){var n=On;if(n&&typeof t=="string"&&t){var i=ht(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof a=="string"&&(i+='[crossorigin="'+a+'"]'),ah.has(i)||(ah.add(i),e={rel:e,crossOrigin:a,href:t},n.querySelector(i)===null&&(t=n.createElement("link"),He(t,"link",e),ze(t),n.head.appendChild(t)))}}function ef(e){It.D(e),nh("dns-prefetch",e,null)}function tf(e,t){It.C(e,t),nh("preconnect",e,t)}function af(e,t,a){It.L(e,t,a);var n=On;if(n&&e&&t){var i='link[rel="preload"][as="'+ht(t)+'"]';t==="image"&&a&&a.imageSrcSet?(i+='[imagesrcset="'+ht(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(i+='[imagesizes="'+ht(a.imageSizes)+'"]')):i+='[href="'+ht(e)+'"]';var s=i;switch(t){case"style":s=An(e);break;case"script":s=Cn(e)}xt.has(s)||(e=N({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),xt.set(s,e),n.querySelector(i)!==null||t==="style"&&n.querySelector(gi(s))||t==="script"&&n.querySelector(bi(s))||(t=n.createElement("link"),He(t,"link",e),ze(t),n.head.appendChild(t)))}}function nf(e,t){It.m(e,t);var a=On;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+ht(n)+'"][href="'+ht(e)+'"]',s=i;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Cn(e)}if(!xt.has(s)&&(e=N({rel:"modulepreload",href:e},t),xt.set(s,e),a.querySelector(i)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(bi(s)))return}n=a.createElement("link"),He(n,"link",e),ze(n),a.head.appendChild(n)}}}function sf(e,t,a){It.S(e,t,a);var n=On;if(n&&e){var i=Ka(n).hoistableStyles,s=An(e);t=t||"default";var o=i.get(s);if(!o){var l={loading:0,preload:null};if(o=n.querySelector(gi(s)))l.loading=5;else{e=N({rel:"stylesheet",href:e,"data-precedence":t},a),(a=xt.get(s))&&sl(e,a);var u=o=n.createElement("link");ze(u),He(u,"link",e),u._p=new Promise(function(g,x){u.onload=g,u.onerror=x}),u.addEventListener("load",function(){l.loading|=1}),u.addEventListener("error",function(){l.loading|=2}),l.loading|=4,zs(o,t,n)}o={type:"stylesheet",instance:o,count:1,state:l},i.set(s,o)}}}function rf(e,t){It.X(e,t);var a=On;if(a&&e){var n=Ka(a).hoistableScripts,i=Cn(e),s=n.get(i);s||(s=a.querySelector(bi(i)),s||(e=N({src:e,async:!0},t),(t=xt.get(i))&&rl(e,t),s=a.createElement("script"),ze(s),He(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},n.set(i,s))}}function of(e,t){It.M(e,t);var a=On;if(a&&e){var n=Ka(a).hoistableScripts,i=Cn(e),s=n.get(i);s||(s=a.querySelector(bi(i)),s||(e=N({src:e,async:!0,type:"module"},t),(t=xt.get(i))&&rl(e,t),s=a.createElement("script"),ze(s),He(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},n.set(i,s))}}function ih(e,t,a,n){var i=(i=$t.current)?js(i):null;if(!i)throw Error(d(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=An(a.href),a=Ka(i).hoistableStyles,n=a.get(t),n||(n={type:"style",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=An(a.href);var s=Ka(i).hoistableStyles,o=s.get(e);if(o||(i=i.ownerDocument||i,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,o),(s=i.querySelector(gi(e)))&&!s._p&&(o.instance=s,o.state.loading=5),xt.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},xt.set(e,a),s||lf(i,e,a,o.state))),t&&n===null)throw Error(d(528,""));return o}if(t&&n!==null)throw Error(d(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Cn(a),a=Ka(i).hoistableScripts,n=a.get(t),n||(n={type:"script",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(d(444,e))}}function An(e){return'href="'+ht(e)+'"'}function gi(e){return'link[rel="stylesheet"]['+e+"]"}function sh(e){return N({},e,{"data-precedence":e.precedence,precedence:null})}function lf(e,t,a,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),He(t,"link",a),ze(t),e.head.appendChild(t))}function Cn(e){return'[src="'+ht(e)+'"]'}function bi(e){return"script[async]"+e}function rh(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+ht(a.href)+'"]');if(n)return t.instance=n,ze(n),n;var i=N({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),ze(n),He(n,"style",i),zs(n,a.precedence,e),t.instance=n;case"stylesheet":i=An(a.href);var s=e.querySelector(gi(i));if(s)return t.state.loading|=4,t.instance=s,ze(s),s;n=sh(a),(i=xt.get(i))&&sl(n,i),s=(e.ownerDocument||e).createElement("link"),ze(s);var o=s;return o._p=new Promise(function(l,u){o.onload=l,o.onerror=u}),He(s,"link",n),t.state.loading|=4,zs(s,a.precedence,e),t.instance=s;case"script":return s=Cn(a.src),(i=e.querySelector(bi(s)))?(t.instance=i,ze(i),i):(n=a,(i=xt.get(s))&&(n=N({},a),rl(n,i)),e=e.ownerDocument||e,i=e.createElement("script"),ze(i),He(i,"link",n),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(d(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,zs(n,a.precedence,e));return t.instance}function zs(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=n.length?n[n.length-1]:null,s=i,o=0;o<n.length;o++){var l=n[o];if(l.dataset.precedence===t)s=l;else if(s!==i)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function sl(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function rl(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Ms=null;function oh(e,t,a){if(Ms===null){var n=new Map,i=Ms=new Map;i.set(a,n)}else i=Ms,n=i.get(a),n||(n=new Map,i.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),i=0;i<a.length;i++){var s=a[i];if(!(s[zn]||s[qe]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var o=s.getAttribute(t)||"";o=e+o;var l=n.get(o);l?l.push(s):n.set(o,[s])}}return n}function lh(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function cf(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function ch(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function df(e,t,a,n){if(a.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var i=An(n.href),s=t.querySelector(gi(i));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=qs.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=s,ze(s);return}s=t.ownerDocument||t,n=sh(n),(i=xt.get(i))&&sl(n,i),s=s.createElement("link"),ze(s);var o=s;o._p=new Promise(function(l,u){o.onload=l,o.onerror=u}),He(s,"link",n),a.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=qs.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var ol=0;function uf(e,t){return e.stylesheets&&e.count===0&&Us(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var n=setTimeout(function(){if(e.stylesheets&&Us(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&ol===0&&(ol=62500*Qp());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Us(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>ol?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(i)}}:null}function qs(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Us(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var _s=null;function Us(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,_s=new Map,t.forEach(hf,e),_s=null,qs.call(e))}function hf(e,t){if(!(t.state.loading&4)){var a=_s.get(e);if(a)var n=a.get(null);else{a=new Map,_s.set(e,a);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<i.length;s++){var o=i[s];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(a.set(o.dataset.precedence,o),n=o)}n&&a.set(null,n)}i=t.instance,o=i.getAttribute("data-precedence"),s=a.get(o)||n,s===n&&a.set(null,i),a.set(o,i),this.count++,n=qs.bind(this),i.addEventListener("load",n),i.addEventListener("error",n),s?s.parentNode.insertBefore(i,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var vi={$$typeof:B,Provider:null,Consumer:null,_currentValue:U,_currentValue2:U,_threadCount:0};function mf(e,t,a,n,i,s,o,l,u){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=tr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=tr(0),this.hiddenUpdates=tr(null),this.identifierPrefix=n,this.onUncaughtError=i,this.onCaughtError=s,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=u,this.incompleteTransitions=new Map}function dh(e,t,a,n,i,s,o,l,u,g,x,S){return e=new mf(e,t,a,o,u,g,x,S,l),t=1,s===!0&&(t|=24),s=st(3,null,null,t),e.current=s,s.stateNode=e,t=Hr(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:n,isDehydrated:a,cache:t},Xr(s),e}function uh(e){return e?(e=sn,e):sn}function hh(e,t,a,n,i,s){i=uh(i),n.context===null?n.context=i:n.pendingContext=i,n=oa(t),n.payload={element:a},s=s===void 0?null:s,s!==null&&(n.callback=s),a=la(e,n,t),a!==null&&(Fe(a,e,t),Wn(a,e,t))}function mh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function ll(e,t){mh(e,t),(e=e.alternate)&&mh(e,t)}function ph(e){if(e.tag===13||e.tag===31){var t=Ra(e,67108864);t!==null&&Fe(t,e,67108864),ll(e,67108864)}}function fh(e){if(e.tag===13||e.tag===31){var t=dt();t=ar(t);var a=Ra(e,t);a!==null&&Fe(a,e,t),ll(e,t)}}var Bs=!0;function pf(e,t,a,n){var i=w.T;w.T=null;var s=E.p;try{E.p=2,cl(e,t,a,n)}finally{E.p=s,w.T=i}}function ff(e,t,a,n){var i=w.T;w.T=null;var s=E.p;try{E.p=8,cl(e,t,a,n)}finally{E.p=s,w.T=i}}function cl(e,t,a,n){if(Bs){var i=dl(n);if(i===null)Io(e,t,n,Hs,a),bh(e,n);else if(bf(i,e,t,a,n))n.stopPropagation();else if(bh(e,n),t&4&&-1<gf.indexOf(e)){for(;i!==null;){var s=Ja(i);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var o=Na(s.pendingLanes);if(o!==0){var l=s;for(l.pendingLanes|=2,l.entangledLanes|=2;o;){var u=1<<31-nt(o);l.entanglements[1]|=u,o&=~u}Rt(s),(ce&6)===0&&(ws=tt()+500,hi(0))}}break;case 31:case 13:l=Ra(s,2),l!==null&&Fe(l,s,2),Ss(),ll(s,2)}if(s=dl(n),s===null&&Io(e,t,n,Hs,a),s===i)break;i=s}i!==null&&n.stopPropagation()}else Io(e,t,n,null,a)}}function dl(e){return e=ur(e),ul(e)}var Hs=null;function ul(e){if(Hs=null,e=Za(e),e!==null){var t=O(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=T(t),e!==null)return e;e=null}else if(a===31){if(e=C(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Hs=e,null}function gh(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(em()){case Tl:return 2;case Nl:return 8;case Ci:case tm:return 32;case Ol:return 268435456;default:return 32}default:return 32}}var hl=!1,ya=null,xa=null,wa=null,yi=new Map,xi=new Map,ka=[],gf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function bh(e,t){switch(e){case"focusin":case"focusout":ya=null;break;case"dragenter":case"dragleave":xa=null;break;case"mouseover":case"mouseout":wa=null;break;case"pointerover":case"pointerout":yi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":xi.delete(t.pointerId)}}function wi(e,t,a,n,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:s,targetContainers:[i]},t!==null&&(t=Ja(t),t!==null&&ph(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function bf(e,t,a,n,i){switch(t){case"focusin":return ya=wi(ya,e,t,a,n,i),!0;case"dragenter":return xa=wi(xa,e,t,a,n,i),!0;case"mouseover":return wa=wi(wa,e,t,a,n,i),!0;case"pointerover":var s=i.pointerId;return yi.set(s,wi(yi.get(s)||null,e,t,a,n,i)),!0;case"gotpointercapture":return s=i.pointerId,xi.set(s,wi(xi.get(s)||null,e,t,a,n,i)),!0}return!1}function vh(e){var t=Za(e.target);if(t!==null){var a=O(t);if(a!==null){if(t=a.tag,t===13){if(t=T(a),t!==null){e.blockedOn=t,jl(e.priority,function(){fh(a)});return}}else if(t===31){if(t=C(a),t!==null){e.blockedOn=t,jl(e.priority,function(){fh(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ls(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=dl(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);dr=n,a.target.dispatchEvent(n),dr=null}else return t=Ja(a),t!==null&&ph(t),e.blockedOn=a,!1;t.shift()}return!0}function yh(e,t,a){Ls(e)&&a.delete(t)}function vf(){hl=!1,ya!==null&&Ls(ya)&&(ya=null),xa!==null&&Ls(xa)&&(xa=null),wa!==null&&Ls(wa)&&(wa=null),yi.forEach(yh),xi.forEach(yh)}function Gs(e,t){e.blockedOn===t&&(e.blockedOn=null,hl||(hl=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,vf)))}var Ys=null;function xh(e){Ys!==e&&(Ys=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Ys===e&&(Ys=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],i=e[t+2];if(typeof n!="function"){if(ul(n||a)===null)continue;break}var s=Ja(a);s!==null&&(e.splice(t,3),t-=3,co(s,{pending:!0,data:i,method:a.method,action:n},n,i))}}))}function Dn(e){function t(u){return Gs(u,e)}ya!==null&&Gs(ya,e),xa!==null&&Gs(xa,e),wa!==null&&Gs(wa,e),yi.forEach(t),xi.forEach(t);for(var a=0;a<ka.length;a++){var n=ka[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<ka.length&&(a=ka[0],a.blockedOn===null);)vh(a),a.blockedOn===null&&ka.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var i=a[n],s=a[n+1],o=i[Ve]||null;if(typeof s=="function")o||xh(a);else if(o){var l=null;if(s&&s.hasAttribute("formAction")){if(i=s,o=s[Ve]||null)l=o.formAction;else if(ul(i)!==null)continue}else l=o.action;typeof l=="function"?a[n+1]=l:(a.splice(n,3),n-=3),xh(a)}}}function wh(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(o){return i=o})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),n||setTimeout(a,20)}function a(){if(!n&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function ml(e){this._internalRoot=e}Xs.prototype.render=ml.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(d(409));var a=t.current,n=dt();hh(a,n,e,t,null,null)},Xs.prototype.unmount=ml.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;hh(e.current,2,null,e,null,null),Ss(),t[Va]=null}};function Xs(e){this._internalRoot=e}Xs.prototype.unstable_scheduleHydration=function(e){if(e){var t=El();e={blockedOn:null,target:e,priority:t};for(var a=0;a<ka.length&&t!==0&&t<ka[a].priority;a++);ka.splice(a,0,e),a===0&&vh(e)}};var kh=c.version;if(kh!=="19.2.8")throw Error(d(527,kh,"19.2.8"));E.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(d(188)):(e=Object.keys(e).join(","),Error(d(268,e)));return e=R(t),e=e!==null?q(e):null,e=e===null?null:e.stateNode,e};var yf={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:w,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Qs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Qs.isDisabled&&Qs.supportsFiber)try{Rn=Qs.inject(yf),at=Qs}catch{}}return ki.createRoot=function(e,t){if(!A(e))throw Error(d(299));var a=!1,n="",i=Dd,s=Rd,o=Ed;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=dh(e,1,!1,null,null,a,n,null,i,s,o,wh),e[Va]=t.current,Ko(e),new ml(t)},ki.hydrateRoot=function(e,t,a){if(!A(e))throw Error(d(299));var n=!1,i="",s=Dd,o=Rd,l=Ed,u=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(i=a.identifierPrefix),a.onUncaughtError!==void 0&&(s=a.onUncaughtError),a.onCaughtError!==void 0&&(o=a.onCaughtError),a.onRecoverableError!==void 0&&(l=a.onRecoverableError),a.formState!==void 0&&(u=a.formState)),t=dh(e,1,!0,t,a??null,n,i,u,s,o,l,wh),t.context=uh(null),a=t.current,n=dt(),n=ar(n),i=oa(n),i.callback=null,la(a,i,n),a=n,t.current.lanes=a,jn(t,a),Rt(t),e[Va]=t.current,Ko(e),new Xs(t)},ki.version="19.2.8",ki}var Dh;function Vf(){if(Dh)return gl.exports;Dh=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(c){console.error(c)}}return r(),gl.exports=Qf(),gl.exports}var Zf=Vf();class Et extends Error{constructor(h){super(h.message);Xa(this,"code");Xa(this,"status");Xa(this,"requestId");Xa(this,"fields");this.name="ApiError",this.code=h.code,this.status=h.status,this.requestId=h.requestId,this.fields=h.fields}get isRetryable(){return this.status===0||this.status===503||this.status===429||this.status>=500}}const yl={offline:"You appear to be offline. Check your connection and try again.",unreachable:"Cannot reach the server. Is the API running?",aborted:"The request was cancelled."};function Jf(r,c){if(r instanceof DOMException&&r.name==="AbortError")return new Et({code:"aborted",message:yl.aborted,status:0,requestId:c});const h=typeof navigator<"u"&&navigator.onLine===!1;return new Et({code:h?"offline":"unreachable",message:h?yl.offline:yl.unreachable,status:0,requestId:c})}async function Kf(r){const c=r.headers.get("X-Request-ID")??void 0;let h=null;try{const T=await r.text();h=T?JSON.parse(T):null}catch{h=null}const d=h==null?void 0:h.error;if(d!=null&&d.message)return new Et({...d,requestId:d.requestId??c});const A=h==null?void 0:h.detail,O=typeof A=="string"?A:If(r.status);return new Et({code:`http_${r.status}`,message:O,status:r.status,requestId:c})}function If(r){return r===401?"Your session has expired. Please sign in again.":r===403?"You do not have access to this.":r===404?"Not found.":r===429?"Too many requests. Please wait a moment.":r===502||r===504?"Cannot reach the server. Is the API running?":r===503?"The service is not ready yet. Try again shortly.":r>=500?"Something went wrong on our side.":`Request failed (${r}).`}async function wt(r,c={}){const{auth:h=!0,headers:d,...A}=c;let O=null;try{O=h?localStorage.getItem("token"):null}catch{O=null}let T;try{T=await fetch(r,{...A,headers:{...A.body?{"Content-Type":"application/json"}:{},...d,...O?{Authorization:`Bearer ${O}`}:{}}})}catch(C){const D=Jf(C);throw Rh(D,r),D}if(!T.ok){const C=await Kf(T);throw Rh(C,r),C}if(T.status!==204)try{return await T.json()}catch{throw new Et({code:"malformed_response",message:"The server sent a response we could not read.",status:T.status,requestId:T.headers.get("X-Request-ID")??void 0})}}function Rh(r,c){const h=r.requestId?` [request ${r.requestId}]`:"";console.error(`API ${r.status||"network"} ${c} — ${r.code}: ${r.message}${h}`)}const Wf=(r,c)=>c instanceof Et?c.isRetryable?r<(c.status===503?3:2):!1:r<1,Ff=new Sf({defaultOptions:{queries:{staleTime:1e4,refetchOnWindowFocus:!0,retry:Wf,retryDelay:r=>Math.min(1e3*2**r,8e3)},mutations:{retry:(r,c)=>c instanceof Et&&c.status===0&&r<1}}}),Zh=[{id:"mastery",label:"The Mastery Path",to:"/",icon:Js,desc:"Unified Theory, Code Crucible & Spoken Defense",isFlagship:!0},{id:"learn",label:"The Library",to:"/learn",icon:Rf,desc:"Read the mechanism before drilling it"},{id:"projects",label:"💡 Project Ideas",to:"/projects",icon:Ef,desc:"Tier-1 Masterclass Projects & Architecture Blueprints"},{id:"rapid",label:"Rapid Fire OA",to:"/rapid",icon:jf,desc:"Mettl MCQ Simulator"},{id:"lab",label:"Sandbox Lab",to:"/playground",icon:zf,desc:"Freeform Live Code Playground"}],Eh=r=>{let c;const h=new Set,d=(R,q)=>{const N=typeof R=="function"?R(c):R;if(!Object.is(N,c)){const z=c;c=q??(typeof N!="object"||N===null)?N:Object.assign({},c,N),h.forEach(Y=>Y(c,z))}},A=()=>c,C={setState:d,getState:A,getInitialState:()=>D,subscribe:R=>(h.add(R),()=>h.delete(R))},D=c=r(d,A,C);return C},$f=(r=>r?Eh(r):Eh),Pf=r=>r;function eg(r,c=Pf){const h=Vs.useSyncExternalStore(r.subscribe,Vs.useCallback(()=>c(r.getState()),[r,c]),Vs.useCallback(()=>c(r.getInitialState()),[r,c]));return Vs.useDebugValue(h),h}const jh=r=>{const c=$f(r),h=d=>eg(c,d);return Object.assign(h,c),h},tg=(r=>r?jh(r):jh),ag=864e5,zh=[1,3,7,16,35],ng=3,Jh="css100:sched",ig="css100:done";function sg(){try{const r=localStorage.getItem(Jh);if(r)return JSON.parse(r)}catch{}try{const r=JSON.parse(localStorage.getItem(ig)||"{}"),c={};for(const[h,d]of Object.entries(r))d&&(c[h]={reps:0,intervalDays:0,dueAt:Date.now(),lapses:0,lastAt:Date.now(),lastPass:!1,overridden:!0});return c}catch{return{}}}function rg(r){try{localStorage.setItem(Jh,JSON.stringify(r))}catch{}}function og(r,c,h=!1){const d=Date.now();if(!c){const T=((r==null?void 0:r.lapses)??0)+1;return{reps:0,intervalDays:0,dueAt:d,lapses:T,lastAt:d,lastPass:!1,overridden:h}}const A=((r==null?void 0:r.reps)??0)+1,O=zh[Math.min(A-1,zh.length-1)];return{reps:A,intervalDays:O,dueAt:d+O*ag,lapses:(r==null?void 0:r.lapses)??0,lastAt:d,lastPass:!0,overridden:h}}function sb(r,c=Date.now()){return r?r.lapses>=ng&&!r.lastPass?"leech":r.dueAt<=c?"due":"held":"untouched"}function Mh(r,c){return{challengeId:r,mode:c,startedAt:Date.now(),firstKeyAt:null,keystrokes:0,hintsUsed:0,solutionRevealed:!1,graded:0}}function Kh(r){let c=5381;for(let h=0;h<r.length;h++)c=(c*33^r.charCodeAt(h))>>>0;return c.toString(36)}function qh(r){return`css100:${r.id}:${Kh(r.css)}`}function _h(r){return`css100:${r.id}:jsx:${Kh(r.jsx)}`}function Uh(r,c){try{const h=localStorage.getItem(r);return h===null?c:h}catch{return c}}function Bh(r,c){try{localStorage.setItem(r,c)}catch{}}const xl=tg((r,c)=>({currentChallenge:null,filter:"all",schedule:sg(),jsxCode:"",cssCode:"",activeTab:"jsx",viewMode:"live",hudActive:!1,measureMode:!1,suggestionsOn:!0,vimMode:typeof localStorage<"u"&&localStorage.getItem("workbench:vim")==="true",mode:typeof localStorage<"u"&&localStorage.getItem("css100:mode")||"practice",attempt:null,gradeResult:null,grading:!1,paletteOpen:!1,timerActive:!1,timerLeft:75,campaign:null,pickChallenge:h=>r(d=>({currentChallenge:h,jsxCode:Uh(_h(h),h.jsx),cssCode:Uh(qh(h),h.css),activeTab:"jsx",gradeResult:null,attempt:Mh(h.id,d.mode)})),setMode:h=>{try{localStorage.setItem("css100:mode",h)}catch{}r(d=>({mode:h,hudActive:h==="exam"?!1:d.hudActive,viewMode:h==="exam"?"live":d.viewMode,gradeResult:null,timerActive:h==="exam",timerLeft:75,attempt:d.currentChallenge?Mh(d.currentChallenge.id,h):null}))},noteKeystroke:()=>r(h=>h.attempt?{attempt:{...h.attempt,keystrokes:h.attempt.keystrokes+1,firstKeyAt:h.attempt.firstKeyAt??Date.now()}}:{}),noteHint:()=>r(h=>h.attempt?{attempt:{...h.attempt,hintsUsed:h.attempt.hintsUsed+1}}:{}),noteReveal:()=>r(h=>h.attempt?{attempt:{...h.attempt,solutionRevealed:!0}}:{}),setGradeResult:h=>r(d=>({gradeResult:h,attempt:d.attempt&&h?{...d.attempt,graded:d.attempt.graded+1}:d.attempt})),setGrading:h=>r({grading:h}),setPaletteOpen:h=>r({paletteOpen:h}),setFilter:h=>r({filter:h}),recordReview:(h,d,A=!1)=>{const O={...c().schedule,[h]:og(c().schedule[h],d,A)};rg(O),r({schedule:O})},updateJsx:h=>{const d=c().currentChallenge;d&&Bh(_h(d),h),r({jsxCode:h})},updateCss:h=>{const d=c().currentChallenge;d&&Bh(qh(d),h),r({cssCode:h})},setActiveTab:h=>r({activeTab:h}),setViewMode:h=>r({viewMode:h}),toggleHud:()=>r(h=>({hudActive:!h.hudActive})),toggleMeasure:()=>r(h=>({measureMode:!h.measureMode})),toggleSuggestions:()=>r(h=>({suggestionsOn:!h.suggestionsOn})),toggleVimMode:()=>r(h=>{const d=!h.vimMode;try{localStorage.setItem("workbench:vim",String(d))}catch{}return{vimMode:d}}),toggleTimer:()=>r(h=>({timerActive:!h.timerActive,timerLeft:75})),tickTimer:()=>r(h=>({timerLeft:Math.max(0,h.timerLeft-1)})),resetTimer:()=>r({timerLeft:75}),setCampaign:h=>r({campaign:h})})),Ih=de.createContext(null);function lg(r){const c=Ft.c(13),{children:h}=r,[d,A]=de.useState(null),[O,T]=de.useState(cg),[C,D]=de.useState(!0),[R,q]=de.useState(null);let N,z;c[0]!==O?(N=()=>{if(!O){D(!1);return}let W=!1;return q(null),wt("/api/auth/me").then(P=>{W||(A(P),D(!1))}).catch(P=>{if(W)return;if(D(!1),P instanceof Et&&(P.status===401||P.status===403)){T(null),A(null);try{localStorage.removeItem("token")}catch{}return}q(P instanceof Et?P.message:"Could not reach the server.")}),()=>{W=!0}},z=[O],c[0]=O,c[1]=N,c[2]=z):(N=c[1],z=c[2]),de.useEffect(N,z);let Y;c[3]===Symbol.for("react.memo_cache_sentinel")?(Y=(W,P)=>{T(W),A(P);try{localStorage.setItem("token",W)}catch{}},c[3]=Y):Y=c[3];const Z=Y;let J;c[4]===Symbol.for("react.memo_cache_sentinel")?(J=()=>{T(null),A(null);try{localStorage.removeItem("token")}catch{}},c[4]=J):J=c[4];const Q=J;let X;c[5]!==R||c[6]!==C||c[7]!==O||c[8]!==d?(X={user:d,token:O,login:Z,logout:Q,isLoading:C,authError:R},c[5]=R,c[6]=C,c[7]=O,c[8]=d,c[9]=X):X=c[9];const I=X;let B;return c[10]!==I||c[11]!==h?(B=y.jsx(Ih.Provider,{value:I,children:h}),c[10]=I,c[11]=h,c[12]=B):B=c[12],B}function cg(){try{return localStorage.getItem("token")}catch{return null}}function Ti(){const r=de.useContext(Ih);if(!r)throw new Error("useAuth must be used within an AuthProvider");return r}function dg(r){const c=Ft.c(5);let h;c[0]!==r?(h=()=>typeof window>"u"?!1:window.matchMedia(r).matches,c[0]=r,c[1]=h):h=c[1];const[d,A]=de.useState(h);let O,T;return c[2]!==r?(O=()=>{if(typeof window>"u")return;const C=window.matchMedia(r),D=()=>A(C.matches);D(),C.addEventListener("change",D);const R=new ResizeObserver(D);return R.observe(document.documentElement),()=>{C.removeEventListener("change",D),R.disconnect()}},T=[r],c[2]=r,c[3]=O,c[4]=T):(O=c[3],T=c[4]),de.useEffect(O,T),d}function Wh(r){return dg("(max-width: 1023px)")}function ug(){const r=Ft.c(13),{setPaletteOpen:c}=xl(),{logout:h}=Ti(),d=hg;let A;r[0]===Symbol.for("react.memo_cache_sentinel")?(A=y.jsxs(Zs,{to:"/",className:"flex items-center gap-2",children:[y.jsx("div",{className:"w-6 h-6 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-xs",children:y.jsx(Js,{size:12,className:"text-white"})}),y.jsx("span",{className:"text-xs font-black tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-white bg-clip-text text-transparent",children:"React Prep Wizard"})]}),r[0]=A):A=r[0];let O;r[1]===Symbol.for("react.memo_cache_sentinel")?(O=y.jsxs("button",{onClick:d,className:"p-1.5 bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer",title:"Ask AI Oracle",children:[y.jsx(Mf,{size:13}),y.jsx("span",{className:"text-[10px] font-black",children:"AI"})]}),r[1]=O):O=r[1];let T;r[2]!==c?(T=()=>c(!0),r[2]=c,r[3]=T):T=r[3];let C;r[4]===Symbol.for("react.memo_cache_sentinel")?(C=y.jsx(Xh,{size:13}),r[4]=C):C=r[4];let D;r[5]!==T?(D=y.jsx("button",{onClick:T,className:"p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 text-xs flex items-center transition cursor-pointer",title:"Command Palette",children:C}),r[5]=T,r[6]=D):D=r[6];let R;r[7]===Symbol.for("react.memo_cache_sentinel")?(R=y.jsx(Qh,{size:13}),r[7]=R):R=r[7];let q;r[8]!==h?(q=y.jsx("button",{onClick:h,className:"p-1.5 bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 rounded-lg text-xs transition cursor-pointer",title:"Log out",children:R}),r[8]=h,r[9]=q):q=r[9];let N;return r[10]!==D||r[11]!==q?(N=y.jsxs("header",{className:"bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shrink-0 sticky top-0 z-40 px-3.5 py-2.5 flex items-center justify-between gap-2",children:[A,y.jsxs("div",{className:"flex items-center gap-1.5",children:[O,D,q]})]}),r[10]=D,r[11]=q,r[12]=N):N=r[12],N}function hg(){window.dispatchEvent(new CustomEvent("toggle-universal-ai"))}function mg(){const r=Ft.c(25),c=Wh(),{setPaletteOpen:h}=xl(),d=Yh(),{user:A,logout:O}=Ti();if(c){let B;return r[0]===Symbol.for("react.memo_cache_sentinel")?(B=y.jsx(ug,{}),r[0]=B):B=r[0],B}let T;r[1]===Symbol.for("react.memo_cache_sentinel")?(T=y.jsxs(Zs,{to:"/",className:"flex items-center gap-2.5 group",children:[y.jsx("div",{className:"w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform",children:y.jsx(Js,{size:14,className:"text-white"})}),y.jsx("span",{className:"text-sm font-black tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-white bg-clip-text text-transparent",children:"React Prep Wizard"})]}),r[1]=T):T=r[1];let C;r[2]!==d?(C=Zh.map(B=>{const{id:W,to:P,icon:ke,label:G,isFlagship:le}=B,Le=P==="/"?d.pathname==="/":d.pathname.startsWith(P);return y.jsxs(Zs,{to:P,className:`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-150 ${Le?le?"bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-xs":"bg-sky-600 text-white shadow-xs":le?"text-amber-300 hover:text-amber-200 hover:bg-amber-500/10":"text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"}`,children:[y.jsx(ke,{size:13}),y.jsx("span",{children:G})]},W)}),r[2]=d,r[3]=C):C=r[3];let D;r[4]!==C?(D=y.jsxs("div",{className:"flex items-center gap-3 sm:gap-5 flex-wrap min-w-0",children:[T,y.jsx("nav",{className:"flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800",children:C})]}),r[4]=C,r[5]=D):D=r[5];let R;r[6]!==A?(R=A&&y.jsx("span",{className:"text-[11px] text-slate-400 font-medium hidden md:inline",children:A.email}),r[6]=A,r[7]=R):R=r[7];let q;r[8]!==h?(q=()=>h(!0),r[8]=h,r[9]=q):q=r[9];let N,z;r[10]===Symbol.for("react.memo_cache_sentinel")?(N=y.jsx(Xh,{size:13,className:"text-slate-400"}),z=y.jsx("span",{className:"font-mono text-[11px]",children:"⌘K"}),r[10]=N,r[11]=z):(N=r[10],z=r[11]);let Y;r[12]!==q?(Y=y.jsxs("button",{onClick:q,className:"px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-xs text-slate-300 flex items-center gap-1.5 transition cursor-pointer",title:"Command Palette (Cmd+K)",children:[N,z]}),r[12]=q,r[13]=Y):Y=r[13];let Z,J;r[14]===Symbol.for("react.memo_cache_sentinel")?(Z=y.jsx(Qh,{size:13}),J=y.jsx("span",{className:"hidden sm:inline text-[11px]",children:"Log out"}),r[14]=Z,r[15]=J):(Z=r[14],J=r[15]);let Q;r[16]!==O?(Q=y.jsxs("button",{onClick:O,className:"px-2.5 py-1 bg-slate-900 hover:bg-rose-950/40 hover:text-rose-300 border border-slate-700/60 hover:border-rose-500/40 rounded-lg text-xs text-slate-400 transition cursor-pointer flex items-center gap-1.5",title:"Log out",children:[Z,J]}),r[16]=O,r[17]=Q):Q=r[17];let X;r[18]!==Q||r[19]!==R||r[20]!==Y?(X=y.jsxs("div",{className:"flex items-center gap-2.5",children:[R,Y,Q]}),r[18]=Q,r[19]=R,r[20]=Y,r[21]=X):X=r[21];let I;return r[22]!==X||r[23]!==D?(I=y.jsx("header",{className:"bg-slate-950 border-b border-slate-800 text-white shrink-0 shadow-md relative z-30",children:y.jsxs("div",{className:"px-3 sm:px-4 py-2 flex items-center justify-between gap-3 flex-wrap min-w-0",children:[D,X]})}),r[22]=X,r[23]=D,r[24]=I):I=r[24],I}class Ee{static collectLocalState(){if(typeof window>"u"||!window.localStorage)return{};const c={mastery:{solved_units:{},code_snapshots:{},schedule:{}},learn:{completed_topics:{},diagrams:{}},library:{},playground:{},preferences:{},rapid_fire:{history:[],high_score:0},projects:{progress:{}}};try{const h=localStorage.getItem("mastery:solved");h&&(c.mastery.solved_units=JSON.parse(h));const d=localStorage.getItem("mastery:activeUnit");d&&(c.mastery.active_unit_id=d);const A=localStorage.getItem("css100:sched");A&&(c.mastery.schedule=JSON.parse(A));for(let J=0;J<localStorage.length;J++){const Q=localStorage.key(J);if(Q&&Q.startsWith("mastery:code:")){const X=Q.replace("mastery:code:",""),I=localStorage.getItem(Q);I&&(c.mastery.code_snapshots[X]=I)}if(Q&&Q.startsWith("learn:diagram:")){const X=Q.replace("learn:diagram:",""),I=localStorage.getItem(Q);I&&(c.learn.diagrams[X]=I)}}const O=localStorage.getItem("learn:completed");O&&(c.learn.completed_topics=JSON.parse(O));const T=localStorage.getItem("mastery:nav");T&&(c.library.mastery_nav=JSON.parse(T));const C=localStorage.getItem("learn:nav");C&&(c.library.learn_nav=JSON.parse(C));const D=localStorage.getItem("playground:jsx");D&&(c.playground.jsx=D);const R=localStorage.getItem("playground:css");R&&(c.playground.css=R);const q=localStorage.getItem("playground:tab");(q==="jsx"||q==="css")&&(c.playground.tab=q);const N=localStorage.getItem("workbench:vim");N!==null&&(c.preferences.vim_mode=N==="true");const z=localStorage.getItem("css100:mode");z&&(c.preferences.editor_mode=z);const Y=localStorage.getItem("rapidfire:history");Y&&(c.rapid_fire.history=JSON.parse(Y));const Z=localStorage.getItem("rapidfire:high_score");Z&&(c.rapid_fire.high_score=parseInt(Z,10))}catch(h){console.warn("Error reading local state for cloud sync:",h)}return c}static applyCloudState(c){var h,d,A,O,T,C,D,R,q,N,z;if(!(typeof window>"u"||!window.localStorage))try{const Z={...JSON.parse(localStorage.getItem("mastery:solved")||"{}"),...((h=c.mastery)==null?void 0:h.solved_units)||{}};localStorage.setItem("mastery:solved",JSON.stringify(Z)),(d=c.mastery)!=null&&d.active_unit_id&&!localStorage.getItem("mastery:activeUnit")&&localStorage.setItem("mastery:activeUnit",c.mastery.active_unit_id);const Q={...JSON.parse(localStorage.getItem("css100:sched")||"{}"),...((A=c.mastery)==null?void 0:A.schedule)||{}};if(localStorage.setItem("css100:sched",JSON.stringify(Q)),(O=c.mastery)!=null&&O.code_snapshots)for(const[B,W]of Object.entries(c.mastery.code_snapshots))!localStorage.getItem(`mastery:code:${B}`)&&W&&localStorage.setItem(`mastery:code:${B}`,W);const I={...JSON.parse(localStorage.getItem("learn:completed")||"{}"),...((T=c.learn)==null?void 0:T.completed_topics)||{}};if(localStorage.setItem("learn:completed",JSON.stringify(I)),(C=c.learn)!=null&&C.diagrams)for(const[B,W]of Object.entries(c.learn.diagrams))W&&!localStorage.getItem(`learn:diagram:${B}`)&&localStorage.setItem(`learn:diagram:${B}`,W);(D=c.library)!=null&&D.mastery_nav&&!localStorage.getItem("mastery:nav")&&localStorage.setItem("mastery:nav",JSON.stringify(c.library.mastery_nav)),(R=c.library)!=null&&R.learn_nav&&!localStorage.getItem("learn:nav")&&localStorage.setItem("learn:nav",JSON.stringify(c.library.learn_nav)),(q=c.playground)!=null&&q.jsx&&!localStorage.getItem("playground:jsx")&&localStorage.setItem("playground:jsx",c.playground.jsx),(N=c.playground)!=null&&N.css&&!localStorage.getItem("playground:css")&&localStorage.setItem("playground:css",c.playground.css),((z=c.preferences)==null?void 0:z.vim_mode)!==void 0&&localStorage.getItem("workbench:vim")===null&&localStorage.setItem("workbench:vim",String(c.preferences.vim_mode)),window.dispatchEvent(new CustomEvent("cloud-state-hydrated",{detail:c}))}catch(Y){console.warn("Error applying cloud state to localStorage:",Y)}}static async syncFullState(){try{const c=this.collectLocalState(),h=await wt("/api/sync/bulk-merge",{method:"POST",body:JSON.stringify(c)});return h&&h.state?(this.applyCloudState(h.state),h.state):null}catch{return null}}static async fetchAndHydrate(){try{const c=await wt("/api/sync/full-state");return c?(this.applyCloudState(c),c):null}catch{return null}}static async recordMasterySolve(c,h,d,A){try{await wt("/api/mastery/solve",{method:"POST",body:JSON.stringify({unit_id:c,done:h,code:d,schedule_review:A})})}catch{}}static async saveMasteryCode(c,h){try{await wt("/api/mastery/code",{method:"POST",body:JSON.stringify({unit_id:c,code:h})})}catch{}}static async saveMasteryActive(c){try{await wt("/api/mastery/active",{method:"POST",body:JSON.stringify({active_unit_id:c})})}catch{}}static async toggleLearnTopic(c,h){try{await wt("/api/learn/toggle",{method:"POST",body:JSON.stringify({topic_id:c,done:h})})}catch{}}static async saveLearnDiagram(c,h){try{await wt("/api/learn/diagram",{method:"POST",body:JSON.stringify({topic_id:c,diagram_xml:h})})}catch{}}static async savePlayground(c,h,d){try{await wt("/api/playground/save",{method:"POST",body:JSON.stringify({jsx:c,css:h,tab:d})})}catch{}}static async recordRapidFireRun(c,h,d,A){try{await wt("/api/rapidfire/record",{method:"POST",body:JSON.stringify({score:c,total:h,exam_mode:d,details:A})})}catch{}}static async savePreferences(c){try{await wt("/api/preferences/save",{method:"POST",body:JSON.stringify({preferences:c})})}catch{}}}const rb=Object.freeze(Object.defineProperty({__proto__:null,CloudSyncService:Ee},Symbol.toStringTag,{value:"Module"}));function pg(){const r=Ft.c(5),{user:c,token:h}=Ti(),d=de.useRef(!1);let A,O;r[0]!==h||r[1]!==c?(A=()=>{if(!h||!c){d.current=!1;return}d.current||(d.current=!0,Ee.syncFullState().catch(fg))},O=[h,c],r[0]=h,r[1]=c,r[2]=A,r[3]=O):(A=r[2],O=r[3]),de.useEffect(A,O);let T;return r[4]===Symbol.for("react.memo_cache_sentinel")?(T={syncFullState:Ee.syncFullState.bind(Ee),recordMasterySolve:Ee.recordMasterySolve.bind(Ee),saveMasteryCode:Ee.saveMasteryCode.bind(Ee),saveMasteryActive:Ee.saveMasteryActive.bind(Ee),toggleLearnTopic:Ee.toggleLearnTopic.bind(Ee),saveLearnDiagram:Ee.saveLearnDiagram.bind(Ee),savePlayground:Ee.savePlayground.bind(Ee),recordRapidFireRun:Ee.recordRapidFireRun.bind(Ee),savePreferences:Ee.savePreferences.bind(Ee)},r[4]=T):T=r[4],T}function fg(r){console.warn("Initial cloud sync warning:",r)}function gg(r){const c=Ft.c(31),{onClose:h,actions:d}=r,[A,O]=de.useState(""),[T,C]=de.useState(0),D=de.useRef(null);let R,q;c[0]===Symbol.for("react.memo_cache_sentinel")?(R=()=>{var G;(G=D.current)==null||G.focus()},q=[],c[0]=R,c[1]=q):(R=c[0],q=c[1]),de.useLayoutEffect(R,q);let N;if(c[2]!==d||c[3]!==A){const G={id:"noop_na",label:"— NA / Nothing (No Action) —",group:"Cancel",hint:"Enter / Esc",run:yg};e:{const le=d.filter(Boolean),Le=A.trim().toLowerCase();if(!Le){N=[G,...le.slice(0,40)];break e}const Pe=le.filter(Xe=>{const Ge=`${Xe.group} ${Xe.label}`.toLowerCase();let et=0;for(const kt of Le){if(et=Ge.indexOf(kt,et),et===-1)return!1;et++}return!0}).slice(0,40);N=[G,...Pe]}c[2]=d,c[3]=A,c[4]=N}else N=c[4];const z=N;let Y;c[5]!==h?(Y=G=>{G&&(h(),G.run())},c[5]=h,c[6]=Y):Y=c[6];const Z=Y;let J;c[7]===Symbol.for("react.memo_cache_sentinel")?(J=G=>{O(G.target.value),C(0)},c[7]=J):J=c[7];let Q;c[8]!==Z||c[9]!==z||c[10]!==h||c[11]!==T?(Q=G=>{G.key==="Escape"&&(G.preventDefault(),h()),G.key==="ArrowDown"&&(G.preventDefault(),C(le=>Math.min(le+1,z.length-1))),G.key==="ArrowUp"&&(G.preventDefault(),C(bg)),G.key==="Enter"&&(G.preventDefault(),Z(z[T]))},c[8]=Z,c[9]=z,c[10]=h,c[11]=T,c[12]=Q):Q=c[12];let X;c[13]!==A||c[14]!==Q?(X=y.jsx("input",{ref:D,value:A,onChange:J,onKeyDown:Q,placeholder:"Run a command…",className:"w-full px-4 py-3 text-sm bg-slate-950 text-slate-100 placeholder:text-slate-500 border-b border-slate-800 outline-none focus:outline-none"}),c[13]=A,c[14]=Q,c[15]=X):X=c[15];let I;c[16]!==z.length?(I=z.length===0&&y.jsx("li",{className:"px-4 py-3 text-xs text-slate-500",children:"no matching command"}),c[16]=z.length,c[17]=I):I=c[17];let B;c[18]!==Z||c[19]!==z||c[20]!==T?(B=z.map((G,le)=>y.jsx("li",{children:y.jsxs("button",{onMouseEnter:()=>C(le),onClick:()=>Z(G),className:`w-full text-left px-4 py-2 flex items-baseline gap-2 text-sm ${le===T?"bg-indigo-600 text-white":"text-slate-300 hover:bg-slate-800/60"}`,children:[y.jsx("span",{className:`text-[0.6rem] font-bold uppercase tracking-wider ${le===T?"text-indigo-200":"text-slate-500"}`,children:G.group}),y.jsx("span",{className:"flex-1",children:G.label}),G.hint&&y.jsx("kbd",{className:`text-[0.6rem] font-mono px-1.5 py-0.5 rounded ${le===T?"bg-indigo-800 text-indigo-100":"bg-slate-950 text-slate-400 border border-slate-800"}`,children:G.hint})]})},G.id)),c[18]=Z,c[19]=z,c[20]=T,c[21]=B):B=c[21];let W;c[22]!==I||c[23]!==B?(W=y.jsxs("ul",{className:"max-h-80 overflow-auto py-1 custom-scrollbar",children:[I,B]}),c[22]=I,c[23]=B,c[24]=W):W=c[24];let P;c[25]!==W||c[26]!==X?(P=y.jsxs("div",{className:"w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden text-slate-100",onClick:vg,children:[X,W]}),c[25]=W,c[26]=X,c[27]=P):P=c[27];let ke;return c[28]!==h||c[29]!==P?(ke=y.jsx("div",{className:"fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-[12vh] animate-fadeIn",onClick:h,children:P}),c[28]=h,c[29]=P,c[30]=ke):ke=c[30],ke}function bg(r){return Math.max(r-1,0)}function vg(r){return r.stopPropagation()}function yg(){}const xg=[{id:"vanilla-debounce",trackId:"js_practical",trackName:"Vanilla JS Machine Coding",title:"The Debounced Search API",level:"Crucible",category:"Async & DOM",xp:250,theory:{hook:"Mettl throws a curveball: 'Build a search bar that calls an API, but you cannot use React.' Can you survive?",deepDive:"A classic technical round trap. They want to see if you rely entirely on React hooks or if you actually understand the underlying browser mechanics. You must use a closure to hold the `timer` ID, `clearTimeout` on every keystroke, and invoke the network request only when the user stops typing.",interviewPitch:"'Debouncing limits the rate at which a function fires. It’s crucial for performance on search inputs or window resizes. I implement it using a higher-order function that returns a closure; the closure tracks the timeout ID and resets it every time it's called before the delay expires.'",mcq:{q:"In a debounce function, why must the timer variable be declared OUTSIDE the returned inner function?",options:["Because inner functions cannot declare variables.","So the variable persists in memory (closure) across multiple calls to the inner function.","To make it globally accessible to the window object.","To avoid strict mode errors."],correct:1,why:"If the timer was declared inside the returned function, it would be recreated as `undefined` on every keystroke, destroying the ability to clear the previous timeout."}},practice:{type:"js_snippet",task:"Implement the `debounce` higher-order function. It should delay calling `fn` until `delay` ms have passed since the last invocation.",starterCode:`function debounce(fn, delay) {
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
console.log(sum);`,specs:["Should correctly accumulate values with and without an initial value."]}}],wg=[{id:"js-traps-hoisting",trackId:"js_traps",trackName:"JS Execution & Traps",title:"The Temporal Dead Zone (Hoisting)",level:"Core",category:"Execution Context",xp:150,theory:{hook:"Why does `var` give you `undefined` while `let` and `const` throw a ReferenceError? Welcome to the TDZ.",deepDive:"All declarations (even `let` and `const`) are hoisted to the top of their block scope in the Creation Phase. However, `var` is initialized with `undefined` immediately. `let` and `const` remain uninitialized in the Temporal Dead Zone (TDZ) until the parser evaluates their assignment line. Accessing them before that throws a ReferenceError.",interviewPitch:"In an interview, explain that hoisting applies to all variable declarations, but the *initialization* behavior differs. Use this to explain why `var` is dangerous—it fails silently by returning `undefined`, whereas the TDZ in `let`/`const` forces a strict fail-fast error, preventing subtle runtime bugs.",mcq:{q:`What is the output of the following?

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
t.start();`,specs:["Should preserve `this` context inside asynchronous callback."]}}],kg=[{id:"js-traps-event-loop",trackId:"js_traps",trackName:"JS Execution & Traps",title:"Microtasks vs Macrotasks Execution Order",level:"Advanced",category:"Event Loop",xp:250,theory:{hook:"In what order do `setTimeout(..., 0)`, `Promise.resolve()`, `queueMicrotask`, and synchronous code execute?",deepDive:"The JavaScript runtime executes synchronous code on the Call Stack. When the Call Stack clears, the Event Loop processes the ENTIRE Microtask Queue (Promises, `queueMicrotask`, MutationObserver) before executing the NEXT SINGLE Macrotask (`setTimeout`, `setInterval`, I/O). If a microtask enqueues another microtask, it will starve the macrotask queue.",interviewPitch:"Explain: 'Microtasks have higher priority than macrotasks. The event loop drains the entire microtask queue at the end of each tick/macrotask, before yielding to the browser rendering phase or the next macrotask.'",mcq:{q:`What is the logged sequence of:
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
}`,specs:["Should log correct indices via closure capture (IIFE or setTimeout args)."]}}],Sg=[...wg,...kg],Tg=[{id:"react-redux-flow",trackId:"react_ecosystem",trackName:"Ecosystem & Tooling",title:"Redux Data Flow & Purity",level:"Core",category:"State Management",xp:200,theory:{hook:"Why must Redux reducers be absolutely pure? What happens if you mutate state directly?",deepDive:"Redux uses shallow equality (`===`) to determine if the state has changed. If you mutate a nested array (e.g., `state.users.push(newUser)`) and return the same state object, the reference hasn't changed. React-Redux (`useSelector`) will see `oldState === newState`, assume nothing happened, and completely skip the re-render. Reducers must return a brand new object/array reference (`...state`) to break the equality check.",interviewPitch:"'Reducers are pure functions mapping `(state, action) => newState`. If you mutate state, you destroy the immutability contract. Redux relies on strict reference equality checks for performance; mutating state means `useSelector` won't trigger a re-render. This is why tools like Redux Toolkit use Immer under the hood to let you write mutating syntax that compiles into immutable updates.'",mcq:{q:"Which of the following reducer cases is valid and will trigger a UI update?",options:["state.count++; return state;","return Object.assign(state, { count: state.count + 1 });","return { ...state, count: state.count + 1 };","state.count = state.count + 1; return { ...state };"],correct:2,why:"Option C creates a completely new root object reference without mutating the original state object. Object.assign into `state` mutates the original reference."}},practice:{type:"js_snippet",task:"Fix this vanilla Redux reducer so it correctly updates a nested user object immutably.",starterCode:`const initialState = {
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
console.log(sum(2, 2));`,specs:["Should use ES6 static imports/exports for tree-shaking support."]}}],Hh=(r,c,h,d,A)=>`/* ${r}
   Write it out, then record yourself saying it in 60 seconds.
   Aim for 4–6 sentences. Specifics beat adjectives every time. */

SITUATION — ${c}
  →

TASK — ${h}
  →

ACTION — ${d}
  →

RESULT — ${A}
  →
`,Ng=[{id:"hr-pitch",trackId:"behavioural",trackName:"Behavioural & HR",category:"The Opening",title:"Tell me about yourself — the 30-second version",level:"Warm-up",xp:40,theory:{hook:"The first question is not a biography request. It is a positioning question, and the answer sets the frame for every question after it.",deepDive:"A strong answer is three beats and under 45 seconds. (1) Where you are now, in one line — role, stack, scale. (2) The one thing that makes you unusual, stated as a capability rather than a claim. (3) Why this role, connected to something specific about the team or the work. Then stop.",interviewPitch:'"I build front-end systems in React — most recently a spec-first workflow where the tooling grades the work rather than the developer marking their own homework. What I bring beyond the stack is that I design the process around the failure mode, not just the feature."'},why:"It is asked in every round, by every interviewer, and it is the only answer you can prepare word-for-word without it sounding rehearsed.",verify:"Record it. If it runs past 45 seconds, or if you cannot say it without reading, it is not ready.",hints:["Three beats: where you are now · what makes you unusual · why this role. Nothing else.",'Replace every adjective with a fact. Not "passionate about performance" — "cut a 2.4s LCP to 900ms".',"End on the role, not on yourself. The last sentence should point at them."],practice:{type:"js_snippet",task:"Draft your opening pitch in the editor. Then record yourself delivering it in under 45 seconds.",starterCode:`/* Tell me about yourself — 30 to 45 seconds.
   Three beats. No chronology. End on why this team. */

1. CURRENT ROLE & SCALE
   →

2. THE UNUSUAL CAPABILITY (one concrete thing you do that others do not)
   →

3. WHY THIS ROLE (connected to something specific about them)
   →
`,solutionCode:"",specs:["Under 45 seconds spoken","No college-to-present chronology","Contains at least one concrete number (scale, users, time, latency)","Ends on why this company, not on a generic goal"]}},{id:"hr-conflict",trackId:"behavioural",trackName:"Behavioural & HR",category:"STAR Stories",title:"A time you disagreed with a technical decision",level:"Core",xp:50,theory:{hook:"They are not asking whether you were right. They are asking whether you can disagree without creating wreckage, and whether you can execute a decision you lost.",deepDive:"The shape: you had a different view on an architectural or process choice · you grounded your argument in data/constraints rather than taste · you stated your case clearly · a decision was made · you committed fully either way. If you won, the victory was quiet; if you lost, you did not drag your feet.",interviewPitch:'"We were choosing between writing a custom virtualised list and using an off-the-shelf library for a 10k-item view. I advocated the library because our edge cases were standard. The lead wanted custom to avoid bundle weight. I ran a spike, measured the bundle delta at 8kB, and we went with the library. If we had stayed with custom, I would have owned the tests."'},why:"Seniority is mostly how you handle disagreement. A junior engineer treats it as a fight to win; a senior engineer treats it as a search for the cheapest correct answer.",hints:["The disagreement must be technical or process, never interpersonal.","Show the evidence you brought, not just the opinion you held.","The ending must show commitment, whether your view was taken or not."],practice:{type:"js_snippet",task:"Write your STAR answer for a technical disagreement. Then record the 60-second version.",starterCode:Hh("A time you disagreed with a technical decision.","What was the decision, and who was involved?","What was your proposal, and why did you believe it was better?","How did you make the case — what evidence or spike did you bring?","What was decided, and how did you execute after the decision was made?"),solutionCode:"",specs:["Situation is technical, not personal","The disagreement was resolved with evidence, not authority","Result shows full commitment to the outcome","Under 60 seconds spoken"]}},{id:"hr-failure",trackId:"behavioural",trackName:"Behavioural & HR",category:"STAR Stories",title:"A time you caused or handled a production outage",level:"Core",xp:50,theory:{hook:"A candidate who has never broken production has either never shipped anything or does not know when they broke it.",deepDive:'The answer that loses the interview is the fake failure: "I worked too hard" or "a third-party API went down". A real failure has a real blast radius, your own contribution acknowledged without hiding behind the team, and a permanent change made to the system so the same mistake is impossible.',interviewPitch:'"I pushed an un-memoized selector into a shared hook that caused a re-render cascade on every keypress in our main form. We caught it in staging telemetry before deploy. The fix was two lines; the real work was adding an ESLint rule so the pattern fails in CI for anyone else."'},why:"Interviewers look for psychological safety and systemic thinking. Hiding a failure signals risk; explaining what you fixed in the system signals reliability.",hints:["Pick a real mistake, not a humblebrag.","Spend 20% on the mistake, 80% on the response and the systemic fix.",'The fix must be a mechanism (linter, test, alert, runbook), not "I was more careful".'],practice:{type:"js_snippet",task:"Write your outage/failure STAR story. Then record the 60-second version.",starterCode:Hh("A time you made a mistake that affected production or the team.","What was the context, and what actually broke?","What were you accountable for?","What did you do once you knew — including telling people?","What mechanism changed so it cannot happen the same way again?"),solutionCode:"",specs:["A real cost is named","Your own share is owned without blaming others","Most of the answer is the fix, not the failure",'The fix is systemic — a check, a test, a process — not "I was more careful"']}}],Og=[{id:"hr-project",trackId:"behavioural",trackName:"Behavioural & HR",category:"Depth",title:"Walk me through a project you are proud of",level:"Core",xp:40,theory:{hook:"This is a technical question wearing behavioural clothes. They are looking for the decisions, the constraints and the trade-offs — not the feature list.",deepDive:"Structure it as: the problem and who had it · the constraint that made it hard · two decisions you made and what you gave up for each · how you knew it worked. The trade-off sentences are the whole answer.",interviewPitch:'"Problem, constraint, two trade-offs, evidence it worked. Then stop and let them pick which thread to pull."'},why:"The longest answer you will give, and the one where interviewers form their technical opinion of you.",hints:["Lead with the problem and the person who had it, never with the stack.","Two trade-offs, each with what you gave up. That is the scored part.",'Have a number for "how you knew it worked".'],practice:{type:"js_snippet",task:"Draft the project narrative. Then record the 90-second version.",starterCode:`/* Walk me through a project you are proud of.
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
`,solutionCode:"",specs:["Adjacent knowledge stated before the gap","The edge of knowledge is named explicitly","A concrete method for finding out","No bluffing, no apologising"]}}],Ag=[...Ng,...Og],Cg=[{id:"counter",title:"Step Counter",level:"Warm-up",time:"8 min",brief:"A counter with + and −, a Reset, and a step size the user can change. The count must never go below zero.",req:["+ and − change the count by the current step","Step size is a controlled input (default 1)","Reset returns the count to 0","Count clamps at 0 — − at zero does nothing","− is disabled when count is 0"],tags:["useState","controlled input","clamping"],hints:["What is the minimum state here? You need the count and the step. Nothing else — the disabled flag is derived.","The step input gives you a string. `Number(e.target.value) || 1` keeps it usable while typing.","Clamp with Math.max(0, next). Use the functional updater: setCount(c => Math.max(0, c - step)).","`disabled={count === 0}` on the − button. Derived, not stored."],start:`import React, { useState } from 'react';

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
`}],Lh={cats:[{k:"box",n:"Box model",blurb:"What a box measures, and what pushes what."},{k:"flex",n:"Flexbox",blurb:"One axis, content-driven. basis vs width, the shorthand, auto margins."},{k:"grid",n:"Grid",blurb:"Two axes, parent-driven. Lines, spans, implicit tracks, alignment."},{k:"track",n:"Track sizing",blurb:"repeat · minmax · auto-fit vs auto-fill — responsive with no media query."},{k:"cq",n:"Container queries",blurb:"A component that answers to its container, not the viewport."},{k:"place",n:"place-*",blurb:"align + justify in one property, on the container and on the item."},{k:"areas",n:"grid-template-areas",blurb:"Layout you can read out loud."},{k:"pos",n:"Positioning",blurb:"static · relative · absolute · fixed · sticky, and the containing block."},{k:"inset",n:"inset",blurb:"All four offsets at once, and what happens when opposite pairs both set."},{k:"units",n:"Units",blurb:"rem · em · ch · %, dvh · fr · clamp — and where px is still correct."},{k:"mq",n:"Media queries",blurb:"Ranges, orientation, and the ones about the human, not the screen."},{k:"focus",n:":focus-visible",blurb:"Keyboard users get a ring; mouse users do not; nobody loses one."},{k:"tokens",n:"Design tokens",blurb:"Custom properties: naming, fallbacks, scoping, and the cascade."},{k:"mix",n:"color-mix()",blurb:"Derive a palette from one hue instead of hand-picking nine."},{k:"prim",n:"Layout primitives",blurb:"stack · cluster · between · sidebar · switcher · cover · grid-auto."},{k:"exc",n:"Exceptions",blurb:"The cases where the usual rule is the wrong answer."},{k:"anti",n:"Anti-patterns",blurb:"Recognise it, name why it breaks, replace it."},{k:"extra",n:"Extras (Extended Syllabus)",blurb:"Selectors & Specificity · Typography & Line Clamp · Gradients · Transitions · React Tokens"}],items:[{id:"BOX-01",useApp:!1,cat:"box",title:"border-box — why 200px stops meaning 200px",goal:"Both cards must measure exactly 200px wide on screen, padding and border included.",use:[["box-sizing","decide whether width means the content alone or the whole visible box"]],task:".card is explicitly content-box, so its 200px width excludes the 1rem padding and 2px border and it renders at 236px. Change the one value that makes 200px mean the whole visible box. Measure it in the preview before and after.",dia:{w:320,h:120,note:[[8,12,"both: width 200px, padding 16, border 2"]],box:[[8,34,200,32,"200px  ← border-box"],[8,80,236,32,"236px  ← content-box","ghost"]],gap:[[8,28,200,"200",1]]},jsx:`import React from 'react';

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
}`,why:"Binding CSS variables from React style props decouples dynamic numeric logic from stylesheet structure."}]},Dg={lessons:[{stage:1,title:"The box model — why your 14rem box is not 14rem",teach:"You wrote <code>width:14rem</code> — that is <b>224px</b>. But <code>width</code> sizes the <b>content only</b>; padding and border are added <b>on top</b>. So the box actually occupies <b>224 + 20 + 20 = 264px</b> — 40px wider than you asked for.<br><br><code>box-sizing:border-box</code> changes what <code>width</code> <i>means</i>: 224px becomes the <b>total</b>, and the padding eats inward instead of pushing outward.<br><br>The dashed red line is exactly 14rem. Watch where the card's right edge sits relative to it.",html:'<div class="ruler"><span>14rem — what you asked for</span></div><div class="card"><h3>Account settings</h3><p>Manage how your workspace behaves.</p></div><p class="note">Card overhanging the dashed line? That gap <em>is</em> your padding, added on top of the width.</p>',css:`.card{
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
`,css:"",html:"",base:"",task:"Everything works. Now count the state: four <code>useState</code> calls, zero derived values stored. That ratio is what an interviewer is reading.",key:"Minimal state, everything else derived. Four hooks carried a full CRUD feature with search, filters and an empty state.",polish:!1,isjsx:!0}]};function Rg(r){if(!r)return"";let c=r.replace(/\{\/\*[\s\S]*?\*\/\}/g,"").replace(/^\s*<>\s*|\s*<\/>\s*$/g,"").trim();const h=/\{\s*(\[[^\]]+\])\.map\s*\(\s*(\w+)\s*=>\s*([\s\S]*?)\s*\)\s*\}/g;return c=c.replace(h,(d,A,O,T)=>{try{return JSON.parse(A.replace(/'/g,'"')).map(D=>{let R=T.trim();return R=R.replace(/\s*key=\{[^}]+\}/g,""),R=R.replace(/className=\{\s*"([^"]*)"\s*\+\s*\w+\s*\}/g,(q,N)=>`class="${N}${D}"`),R=R.replace(/className=/g,"class="),R=R.replace(new RegExp(`\\{\\s*${O}\\s*\\}`,"g"),String(D)),R}).join(`
      `)}catch{return d}}),c=c.replace(/className=/g,"class="),c}function Eg(r){return/^(BOX|PLC)-|^FLEX-0[12]/.test(r)?"Warm-up":/^(TRK|CQ|MIX|AREA|XTRA)-/.test(r)?"Advanced":"Core"}const ob=[{id:"behavioural",name:"Behavioural & HR",icon:"🎙️"},{id:"js_core",name:"JS Memory & Equality",icon:"⚡"},{id:"js_practical",name:"Vanilla JS Machine Coding",icon:"🛠️"},{id:"js_traps",name:"JS Traps & Execution",icon:"🪤"},{id:"css_layouts",name:"CSS 2D Layouts",icon:"🥋"},{id:"react_core",name:"React 19 Architecture",icon:"⚛️"},{id:"react_practical",name:"React Machine Coding",icon:"🏗️"},{id:"react_ecosystem",name:"Ecosystem (Redux/Router)",icon:"📦"},{id:"async_apis",name:"Async & REST APIs",icon:"🌐"}],jg=[{id:"js-primitives-vs-references",trackId:"js_core",trackName:"JS Memory & Equality",title:"Stack vs Heap: Primitives & References",level:"Warm-up",category:"Object Memory & Equalities",xp:25,theory:{hook:"Primitives are compared by value. Objects are compared by their memory address (pointer).",deepDive:"When you assign `let a = 10; let b = a;`, a literal copy of 10 is made. But when you do `let a = {}; let b = a;`, only the pointer is copied. Mutating `b` will mutate `a` because they point to the identical heap address.",interviewPitch:`"Primitives are immutable values living on the call stack. Objects are mutable structures in the heap. In React, this is why we must never mutate an object in state directly—React compares pointers using Object.is, and if the pointer hasn't changed, it assumes the data hasn't changed, causing stale UI bugs."`,mcq:{q:"What is the output of `{} === {}`?",options:["true","false","TypeError","undefined"],correct:1,why:"Each `{}` creates a new object in memory with a distinct pointer. Distinct pointers are never strictly equal."}},practice:{type:"js_snippet",task:"Write code that proves primitives copy by value but objects copy by reference. Reassign the primitive copy (p2) and mutate the object copy property (obj2.val = 99), then assert or log the original values.",starterCode:`// 1. Primitives: copy by value
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

user.delayGreeting();`,specs:["Identifies the broken dynamic binding.","Fixes it using a lexical arrow function."]}}];function zg(r,c){if(!c.trim())return r;const h=c.split(`
`),d=h.findIndex(C=>C.includes("{")&&!C.trim().startsWith("/*")),A=(d===-1?h:h.slice(0,d)).join(`
`).trim(),O=d===-1?"":h.slice(d).join(`
`).trim();let T=r;return A&&(T=T.replace(/^.*TODO.*$/m,`  ${A}`)),O?`${T}

${O}
`:T}const Mg=Lh.items.map((r,c)=>{var O,T,C,D,R;const h=((T=(O=r.use)==null?void 0:O[0])==null?void 0:T[0])||"property",d=((D=(C=r.use)==null?void 0:C[0])==null?void 0:D[1])||"layout requirement",A=r.title||r.n||`Layout Drill ${c+1}`;return{id:`css-${r.id||r.k||c}`,sourceId:r.id,hints:r.hints||[],why:r.why,verify:r.verify,diagram:r.dia,reference:r.markup,trackId:"css_layouts",trackName:"CSS 2D Layouts",category:((R=Lh.cats.find(q=>q.k===r.cat))==null?void 0:R.n)||"General Layouts",title:A,level:Eg(String(r.id||"")),xp:25,theory:{hook:r.goal||r.blurb||"Mastering this CSS property ensures predictable, robust 2D layouts.",deepDive:(r.hints||[]).join(" ")||`Understand how ${h} controls the rendering box and flow of its children.`,interviewPitch:`"I chose this approach because it's the most semantically correct and resilient way to achieve ${d.toLowerCase()}, avoiding brittle magic numbers or absolute positioning."`,...r.task?{mcq:{q:`What is the primary purpose of ${h} here?`,options:[d,"To override the cascade magically.","To force GPU acceleration.","To trigger a re-render."],correct:0,why:"This property is foundational for this exact specification."}}:{}},practice:{type:"css",task:r.task||"Implement the requested CSS layout properties to match the target.",starterCode:r.css||"",solutionCode:zg(String(r.css||""),String(r.sol||"")),baseHtml:Rg(r.markup||r.jsx||""),specs:(r.use||[]).map(([q,N])=>`${q} — ${N}`)}}}),qg=(Dg.lessons||[]).map((r,c)=>({id:`ladder-${r.stage}-${c}`,sourceId:r.key||r.title,why:r.why,takeaway:typeof r.key=="string"?r.key:void 0,trackId:"css_layouts",trackName:"CSS 2D Layouts",category:`Ladder Stage ${r.stage} (CSS)`,title:r.title,level:"Core",xp:30,theory:{hook:r.teach.replace(/<[^>]*>?/gm,"").substring(0,150)+"...",deepDive:r.teach.replace(/<[^>]*>?/gm,""),interviewPitch:'"This pattern ensures clear separation of concerns, making the component easier to test and highly predictable across renders."'},practice:{type:r.isjsx?"jsx":"css",task:r.task||`Implement the concepts covered in: ${r.title}`,starterCode:r.css||r.jsx||"// Ready for implementation",solutionCode:r.polish||r.after||r.css||r.jsx||"// Implemented",baseHtml:r.html||"",baseCss:r.base||"",specs:r.task?[String(r.task).replace(/<[^>]*>?/gm,"")]:["Follows architecture guidelines."]}})),_g=[{id:"react-infinite-loop",trackId:"react_core",trackName:"React 19 Architecture",category:"Hooks & Lifecycles",title:"The Infinite Loop Trap (useEffect)",level:"Warm-up",xp:50,theory:{hook:"Updating state inside a useEffect without dependencies causes an infinite render loop.",deepDive:"When a component renders, the useEffect runs. If it calls a state setter, the component re-renders. If the dependency array is missing, the effect runs AFTER EVERY render, immediately setting state again and triggering another render. This will crash the browser tab.",interviewPitch:'"If an interviewer shows me a component crashing the tab, the first thing I look for is an unconditional state update inside the render body, or a useEffect missing a dependency array. By adding the empty array [], we instruct React to only run the effect once after the initial mount, acting like componentDidMount."',mcq:{q:"What is the difference between useEffect with [] vs no array at all?",options:["[] runs once. No array runs after every render.","No difference.","[] is a syntax error.","No array runs only on mount."],correct:0,why:'No array means "run after every render". [] means "run when dependencies change", and since it has none, it runs only once.'}},practice:{type:"jsx",task:"Fix the infinite loop. The component is currently crashing because useEffect runs after every render. Add the correct dependency array so it only fetches data once on mount.",starterCode:`import React, { useState, useEffect } from 'react';

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
}`,specs:["Implements FETCH_START (loading true, clear others).","Implements FETCH_SUCCESS (loading false, set data).","Implements FETCH_ERROR (loading false, set error)."]}}],Ug=[{id:"practical-search-grid",trackId:"react_practical",trackName:"React Machine Coding",category:"Lists & Filtering",title:"The Searchable Data Grid",level:"Core",xp:100,theory:{hook:"A data grid filtering locally requires derived state: you store the raw data, store the search query, and calculate the visible rows on the fly.",deepDive:'Never store "filteredData" in its own useState if it can be calculated from "allData" and "searchQuery". Syncing two states manually leads to bugs (e.g., when raw data updates but you forget to update the filtered array). Instead, derive it during render: `const visible = data.filter(d => d.name.includes(search))`.',interviewPitch:'"In machine coding rounds, a searchable list is the most common task. Interviewers look for two things: 1) Are you duplicating state (storing filtered results in useState), and 2) Are you using semantic HTML like tables or clean CSS grid? I always use derived state to ensure a single source of truth, and wrap the filtering logic in useMemo if the dataset is massive."',mcq:{q:"Why shouldn't you store `filteredUsers` in its own `useState`?",options:["It causes memory leaks.","It creates redundant state that easily goes out of sync with the raw data.","It breaks React.memo.","useState can only hold strings and numbers."],correct:1,why:"Derived state (calculating the filtered list during render) guarantees that the UI always perfectly matches the raw data and search query."}},practice:{type:"jsx",task:"Build a searchable employee directory. A list of users is provided. Create an input field to filter them by name (case-insensitive). Do not create a separate state for the filtered array—derive it!",starterCode:`import React, { useState } from 'react';

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
}`,specs:["Uses useRef to store the timer ID without triggering re-renders.","Prevents multiple simultaneous intervals on rapid clicking.","Clears the interval on unmount to prevent memory leaks."]}}],Bg=Cg.map(r=>({id:`build-${r.id}`,sourceId:r.id,trackId:"react_practical",trackName:"React Machine Coding",category:"Machine Coding Builds",title:r.title,level:r.level==="Warm-up"?"Warm-up":r.level==="Core"?"Core":"Advanced",xp:60,hints:r.hints||[],tags:r.tags||[],why:`Timed build, roughly ${r.time}.`,theory:{hook:r.brief,deepDive:`${r.brief}

Requirements:
${(r.req||[]).map(c=>`• ${c}`).join(`
`)}`,interviewPitch:`"I'd start by naming the minimum state — ${(r.tags||[]).join(", ")} — and derive everything else, because derived values cannot fall out of sync."`},practice:{type:"jsx",task:r.brief,starterCode:r.start,solutionCode:r.sol,specs:r.req||[]}})),wl=[...Bg,...Ag,...jg,...xg,...Sg,...Tg,...Mg.filter(r=>r.practice.starterCode),...qg.filter(r=>r.practice.starterCode),..._g,...Ug],lb=new Map(wl.map((r,c)=>[r.id,c]));new Map(wl.map(r=>[r.id,r]));class Hg{constructor(){Xa(this,"audioCtx",null)}getAudioContext(){if(typeof window>"u")return null;if(!this.audioCtx){const c=window.AudioContext||window.webkitAudioContext;c&&(this.audioCtx=new c)}return this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume(),this.audioCtx}selection(){typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(8),this.playTone(880,.03,.05,"triangle")}impactLight(){typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate(12),this.playTone(440,.04,.08,"sine")}impactMedium(){typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate([15,20,15]),this.playTone(320,.06,.12,"triangle")}success(){typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate([10,40,20,40,30]),this.playArpeggio([523.25,659.25,783.99,1046.5],.06)}error(){typeof navigator<"u"&&navigator.vibrate&&navigator.vibrate([40,40,40]),this.playTone(180,.12,.15,"sawtooth")}playTone(c,h,d,A){try{const O=this.getAudioContext();if(!O)return;const T=O.createOscillator(),C=O.createGain();T.type=A,T.frequency.setValueAtTime(c,O.currentTime),C.gain.setValueAtTime(d,O.currentTime),C.gain.exponentialRampToValueAtTime(.001,O.currentTime+h),T.connect(C),C.connect(O.destination),T.start(),T.stop(O.currentTime+h)}catch{}}playArpeggio(c,h){try{const d=this.getAudioContext();if(!d)return;c.forEach((A,O)=>{const T=d.currentTime+O*h,C=d.createOscillator(),D=d.createGain();C.type="sine",C.frequency.setValueAtTime(A,T),D.gain.setValueAtTime(.08,T),D.gain.exponentialRampToValueAtTime(.001,T+h*1.5),C.connect(D),D.connect(d.destination),C.start(T),C.stop(T+h*1.5)})}catch{}}}const Lg=new Hg;function Gg(){const r=Ft.c(4),c=Yh();let h;r[0]!==c?(h=Zh.map(A=>{const{id:O,to:T,icon:C,isFlagship:D}=A,R=T==="/"?c.pathname==="/":c.pathname.startsWith(T),q=O==="mastery"?"Mastery":O==="learn"?"Library":O==="projects"?"Projects":O==="rapid"?"Rapid OA":"Lab";return y.jsxs(Zs,{to:T,onClick:Yg,className:`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 relative min-w-[56px] min-h-[44px] cursor-pointer ${R?D?"text-amber-400 font-bold":"text-sky-400 font-bold":"text-slate-500 hover:text-slate-300 font-medium"}`,children:[R&&y.jsx("span",{className:`absolute -top-1 w-6 h-0.5 rounded-full ${D?"bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]":"bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"}`}),y.jsx(C,{size:17,className:R?"scale-110 transition-transform":""}),y.jsx("span",{className:"text-[10px] mt-0.5 tracking-tight",children:q})]},O)}),r[0]=c,r[1]=h):h=r[1];let d;return r[2]!==h?(d=y.jsx("nav",{className:"fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 text-white px-2 py-1 flex items-center justify-around shadow-2xl pb-[max(0.5rem,env(safe-area-inset-bottom))] select-none",children:h}),r[2]=h,r[3]=d):d=r[3],d}function Yg(){return Lg.selection()}function Xg(){const r=Ft.c(60);pg();const c=Wh(),{user:h,isLoading:d,authError:A}=Ti(),{paletteOpen:O,setPaletteOpen:T,vimMode:C,toggleVimMode:D,suggestionsOn:R,toggleSuggestions:q}=xl(),N=Of();let z,Y;r[0]!==O||r[1]!==T?(z=()=>{const L=se=>{(se.metaKey||se.ctrlKey)&&se.key.toLowerCase()==="k"&&(se.preventDefault(),T(!O))},ie=Zg;return window.addEventListener("keydown",L),window.addEventListener("unhandledrejection",ie),()=>{window.removeEventListener("keydown",L),window.removeEventListener("unhandledrejection",ie)}},Y=[O,T],r[0]=O,r[1]=T,r[2]=z,r[3]=Y):(z=r[2],Y=r[3]),de.useEffect(z,Y);let Z;r[4]!==N?(Z={id:"nav-mastery",label:"Go to Interview Mastery Cockpit",group:"Navigation",hint:"Home",run:()=>N("/")},r[4]=N,r[5]=Z):Z=r[5];let J;r[6]!==N?(J={id:"nav-learn",label:"Go to Library & Skill Tree",group:"Navigation",hint:"Learn",run:()=>N("/learn")},r[6]=N,r[7]=J):J=r[7];let Q;r[8]!==N?(Q={id:"nav-projects",label:"Go to Tier-1 Project Ideas & Architecture",group:"Navigation",hint:"Projects",run:()=>N("/projects")},r[8]=N,r[9]=Q):Q=r[9];let X;r[10]!==N?(X={id:"nav-rapid-fire",label:"Go to Rapid Fire OA",group:"Navigation",hint:"Sprint",run:()=>N("/rapid")},r[10]=N,r[11]=X):X=r[11];let I;r[12]!==N?(I={id:"nav-playground",label:"Go to Code Playground",group:"Navigation",hint:"Sandbox",run:()=>N("/playground")},r[12]=N,r[13]=I):I=r[13];const B=`Toggle Vim Mode (${C?"Active":"Disabled"})`;let W;r[14]!==D?(W=()=>D(),r[14]=D,r[15]=W):W=r[15];let P;r[16]!==B||r[17]!==W?(P={id:"toggle-vim",label:B,group:"Settings",hint:":w",run:W},r[16]=B,r[17]=W,r[18]=P):P=r[18];const ke=`Toggle LSP Suggestions (${R?"Active":"Disabled"})`;let G;r[19]!==q?(G=()=>q(),r[19]=q,r[20]=G):G=r[20];let le;r[21]!==ke||r[22]!==G?(le={id:"toggle-suggestions",label:ke,group:"Settings",hint:"LSP",run:G},r[21]=ke,r[22]=G,r[23]=le):le=r[23];let Le;r[24]===Symbol.for("react.memo_cache_sentinel")?(Le={id:"open-ai-oracle",label:"Open Universal AI Oracle & Socratic Mentor",group:"AI Tools",hint:"AI",run:Vg},r[24]=Le):Le=r[24];let Pe;r[25]!==N?(Pe={id:"open-draw-ai",label:"Open Draw AI Agent & Architecture Canvas",group:"AI Tools",hint:"Draw",run:()=>{N("/learn")}},r[25]=N,r[26]=Pe):Pe=r[26];let Xe;if(r[27]!==N||r[28]!==le||r[29]!==Pe||r[30]!==Z||r[31]!==J||r[32]!==Q||r[33]!==X||r[34]!==I||r[35]!==P){let L;r[37]!==N?(L=ie=>({id:`unit-${ie.id}`,label:`${ie.title} [${ie.level}]`,group:ie.trackName,hint:ie.category,run:()=>{localStorage.setItem("mastery:activeUnit",ie.id),window.dispatchEvent(new CustomEvent("mastery:selectUnit",{detail:ie.id})),N(`/?unit=${encodeURIComponent(ie.id)}`)}}),r[37]=N,r[38]=L):L=r[38],Xe=[Z,J,Q,X,I,P,le,Le,Pe,...wl.map(L)],r[27]=N,r[28]=le,r[29]=Pe,r[30]=Z,r[31]=J,r[32]=Q,r[33]=X,r[34]=I,r[35]=P,r[36]=Xe}else Xe=r[36];const et=Xe;if(d){let L;return r[39]===Symbol.for("react.memo_cache_sentinel")?(L=y.jsx("div",{className:"flex h-screen w-full items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs",children:"Loading..."}),r[39]=L):L=r[39],L}if(!h&&A){let L;r[40]===Symbol.for("react.memo_cache_sentinel")?(L=y.jsx("h1",{className:"text-sm font-bold text-rose-300",children:"Cannot reach the server"}),r[40]=L):L=r[40];let ie;r[41]!==A?(ie=y.jsx("p",{className:"text-xs leading-relaxed text-slate-400",children:A}),r[41]=A,r[42]=ie):ie=r[42];let se,ae;r[43]===Symbol.for("react.memo_cache_sentinel")?(se=y.jsx("p",{className:"text-[11px] text-slate-500",children:"Your session has been kept. Start the API, then reload."}),ae=y.jsx("button",{onClick:Qg,className:"px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition",children:"Retry"}),r[43]=se,r[44]=ae):(se=r[43],ae=r[44]);let we;return r[45]!==ie?(we=y.jsx("div",{className:"flex h-screen w-full items-center justify-center bg-slate-950 p-6",children:y.jsxs("div",{role:"alert",className:"max-w-sm space-y-3 text-center",children:[L,ie,se,ae]})}),r[45]=ie,r[46]=we):we=r[46],we}if(!h){let L;return r[47]===Symbol.for("react.memo_cache_sentinel")?(L=y.jsx(Wt,{to:"/auth",replace:!0}),r[47]=L):L=r[47],L}const kt=`flex flex-col h-screen bg-slate-950 text-slate-100 ${c?"pb-14":""}`;let Qe,w;r[48]===Symbol.for("react.memo_cache_sentinel")?(Qe=y.jsx(mg,{}),w=y.jsx(Af,{}),r[48]=Qe,r[49]=w):(Qe=r[48],w=r[49]);let E;r[50]!==c?(E=c&&y.jsx(Gg,{}),r[50]=c,r[51]=E):E=r[51];let U;r[52]!==et||r[53]!==O||r[54]!==T?(U=O&&y.jsx(gg,{onClose:()=>T(!1),actions:et}),r[52]=et,r[53]=O,r[54]=T,r[55]=U):U=r[55];let ue;return r[56]!==kt||r[57]!==E||r[58]!==U?(ue=y.jsxs("div",{className:kt,children:[Qe,w,E,U]}),r[56]=kt,r[57]=E,r[58]=U,r[59]=ue):ue=r[59],ue}function Qg(){return window.location.reload()}function Vg(){window.dispatchEvent(new CustomEvent("toggle-universal-ai"))}function Zg(r){r.reason&&typeof r.reason.message=="string"&&r.reason.message.includes("message channel closed before a response was received")&&r.preventDefault()}class Jg extends de.Component{constructor(){super(...arguments);Xa(this,"state",{error:null})}static getDerivedStateFromError(h){return{error:h}}componentDidCatch(h,d){console.error(`[${this.props.name}]`,h,d.componentStack)}render(){const{error:h}=this.state;return h?y.jsxs("div",{className:"h-full w-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-red-50/60 border border-red-200 rounded-xl",children:[y.jsx(Vh,{size:22,className:"text-red-500"}),y.jsxs("div",{children:[y.jsxs("p",{className:"text-sm font-bold text-red-900",children:[this.props.name," stopped"]}),y.jsx("p",{className:"text-[11px] text-red-700/80 font-mono mt-1 max-w-sm break-words",children:h.message})]}),y.jsxs("button",{onClick:()=>this.setState({error:null}),className:"px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-red-300 text-red-800 hover:bg-red-50 flex items-center gap-1.5",children:[y.jsx(qf,{size:12})," Retry this pane"]}),y.jsx("p",{className:"text-[10px] text-red-700/60",children:"The rest of the page is still live — your code and progress are intact."})]}):this.props.children}}function Kg(){const[r,c]=de.useState(!0),[h,d]=de.useState(""),[A,O]=de.useState(""),[T,C]=de.useState(""),[D,R]=de.useState({}),[q,N]=de.useState(),[z,Y]=de.useState(!1),{user:Z,login:J}=Ti();if(Z)return y.jsx(Wt,{to:"/",replace:!0});const Q=async X=>{X.preventDefault(),C(""),R({}),N(void 0),Y(!0);const I=r?"/api/auth/login":"/api/auth/register";try{const B=await wt(I,{method:"POST",auth:!1,body:JSON.stringify({email:h,password:A})});J(B.token,B.user)}catch(B){B instanceof Et?(C(B.message),B.fields&&R(B.fields),(B.status>=500||B.status===0)&&N(B.requestId)):C("Something went wrong. Please try again.")}finally{Y(!1)}};return y.jsx("div",{className:"flex h-screen w-full items-center justify-center bg-slate-950 p-4",children:y.jsxs("div",{className:"bg-slate-900/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-slate-800 text-slate-100 space-y-6",children:[y.jsxs("div",{className:"text-center space-y-1",children:[y.jsx("div",{className:"w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center mx-auto mb-2 shadow-xs",children:y.jsx(Js,{size:20})}),y.jsx("h2",{className:"text-2xl font-extrabold tracking-tight text-white",children:r?"Welcome Back":"Create Account"}),y.jsx("p",{className:"text-xs text-slate-400",children:"React 19 Interview Mastery Cockpit"})]}),T&&y.jsxs("div",{role:"alert",className:"p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs rounded-xl space-y-1",children:[y.jsxs("span",{className:"flex items-start gap-1.5",children:[y.jsx(Vh,{size:13,className:"mt-px shrink-0"}),y.jsx("span",{children:T})]}),q&&y.jsxs("span",{className:"block pl-5 font-mono text-[10px] text-rose-400/70",children:["Reference: ",q]})]}),y.jsxs("form",{onSubmit:Q,className:"space-y-4",children:[y.jsxs("div",{className:"space-y-1",children:[y.jsx("label",{htmlFor:"auth-email",className:"block text-xs font-semibold text-slate-300",children:"Email"}),y.jsxs("div",{className:"relative",children:[y.jsx(_f,{size:14,className:"absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10 pointer-events-none"}),y.jsx("input",{id:"auth-email",name:"email",type:"email",autoComplete:"email",required:!0,value:h,onChange:X=>d(X.target.value),"aria-invalid":!!D.email,"aria-describedby":D.email?"email-error":void 0,className:`w-full pl-9 pr-3 py-2 bg-slate-950 border rounded-xl focus:outline-none text-xs text-slate-200 ${D.email?"border-rose-500/70 focus:border-rose-400":"border-slate-700/80 focus:border-sky-500"}`})]}),D.email&&y.jsx("p",{id:"email-error",className:"text-[11px] text-rose-400",children:D.email})]}),y.jsxs("div",{className:"space-y-1",children:[y.jsx("label",{htmlFor:"auth-password",className:"block text-xs font-semibold text-slate-300",children:"Password"}),y.jsxs("div",{className:"relative",children:[y.jsx(Uf,{size:14,className:"absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10 pointer-events-none"}),y.jsx("input",{id:"auth-password",name:"password",autoComplete:r?"current-password":"new-password",type:"password",required:!0,value:A,onChange:X=>O(X.target.value),"aria-invalid":!!D.password,"aria-describedby":D.password?"password-error":void 0,className:`w-full pl-9 pr-3 py-2 bg-slate-950 border rounded-xl focus:outline-none text-xs text-slate-200 ${D.password?"border-rose-500/70 focus:border-rose-400":"border-slate-700/80 focus:border-sky-500"}`})]}),D.password&&y.jsx("p",{id:"password-error",className:"text-[11px] text-rose-400",children:D.password})]}),y.jsx("button",{type:"submit",disabled:z,className:"w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl transition cursor-pointer shadow-lg text-xs",children:z?"Working…":r?"Sign In":"Register"})]}),y.jsxs("div",{className:"text-center text-xs text-slate-400",children:[r?"Don't have an account? ":"Already have an account? ",y.jsx("button",{type:"button",onClick:()=>c(!r),className:"text-sky-400 font-bold hover:underline cursor-pointer",children:r?"Sign up":"Log in"})]})]})})}const Ig=de.lazy(()=>Si(()=>import("./MasteryPage-DOlCbYbr.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))),Wg=de.lazy(()=>Si(()=>import("./PlaygroundPage-Dom9_St4.js"),__vite__mapDeps([9,1,2,3,4,5,10,7]))),Fg=de.lazy(()=>Si(()=>import("./RapidFirePage-gPayx2mX.js"),__vite__mapDeps([11,1,2,5,4]))),$g=de.lazy(()=>Si(()=>import("./LearnPage-Bm6hw65q.js"),__vite__mapDeps([12,1,2,6,13,5,14,7,10]))),Pg=de.lazy(()=>Si(()=>import("./ProjectsPage-Co3Z_O_K.js").then(r=>r.P),__vite__mapDeps([15,1,2,10,7,5,13,8])));function eb(){const r=Ft.c(1);let c;return r[0]===Symbol.for("react.memo_cache_sentinel")?(c=y.jsx("div",{className:"h-full w-full flex items-center justify-center p-10 text-slate-400 text-xs",children:"loading…"}),r[0]=c):c=r[0],c}Zf.createRoot(document.getElementById("root")).render(y.jsx(de.StrictMode,{children:y.jsx(Tf,{client:Ff,children:y.jsx(lg,{children:y.jsx(Cf,{children:y.jsxs(Df,{children:[y.jsx($e,{path:"/auth",element:y.jsx(Kg,{})}),y.jsxs($e,{element:y.jsx(Jg,{name:"The page",children:y.jsx(de.Suspense,{fallback:y.jsx(eb,{}),children:y.jsx(Xg,{})})}),children:[y.jsx($e,{index:!0,element:y.jsx(Ig,{})}),y.jsx($e,{path:"mastery",element:y.jsx(Wt,{to:"/",replace:!0})}),y.jsx($e,{path:"learn",element:y.jsx($g,{})}),y.jsx($e,{path:"projects",element:y.jsx(Pg,{})}),y.jsx($e,{path:"rapid",element:y.jsx(Fg,{})}),y.jsx($e,{path:"playground",element:y.jsx(Wg,{})}),y.jsx($e,{path:"css100",element:y.jsx(Wt,{to:"/",replace:!0})}),y.jsx($e,{path:"arena",element:y.jsx(Wt,{to:"/",replace:!0})}),y.jsx($e,{path:"challenges",element:y.jsx(Wt,{to:"/",replace:!0})}),y.jsx($e,{path:"ladder",element:y.jsx(Wt,{to:"/",replace:!0})}),y.jsx($e,{path:"targets",element:y.jsx(Wt,{to:"/",replace:!0})}),y.jsx($e,{path:"*",element:y.jsx(Wt,{to:"/",replace:!0})})]})]})})})})}));export{Ee as C,ob as M,Jg as P,lb as U,Si as _,wl as a,rg as b,Ft as c,xl as d,rb as e,Lg as h,sg as l,og as r,sb as s,Wh as u};
