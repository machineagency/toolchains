(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Fe="modulepreload",Ue=function(t){return"/toolchains/"+t},oe={},z=function(e,n,s){if(!n||n.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=Ue(i),i in oe)return;oe[i]=!0;const o=i.endsWith(".css"),l=o?'[rel="stylesheet"]':"";if(!!s)for(let d=r.length-1;d>=0;d--){const h=r[d];if(h.href===i&&(!o||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${l}`))return;const c=document.createElement("link");if(c.rel=o?"stylesheet":Fe,o||(c.as="script",c.crossOrigin=""),c.href=i,document.head.appendChild(c),o)return new Promise((d,h)=>{c.addEventListener("load",d),c.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e())},Ve=(t,e)=>{const n=t[e];return n?typeof n=="function"?n():Promise.resolve(n):new Promise((s,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e)))})};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W;const j=window,D=j.trustedTypes,ae=D?D.createPolicy("lit-html",{createHTML:t=>t}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,$e="?"+y,ze=`<${$e}>`,C=document,T=(t="")=>C.createComment(t),O=t=>t===null||typeof t!="object"&&typeof t!="function",Ee=Array.isArray,We=t=>Ee(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,le=/>/g,A=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),he=/'/g,de=/"/g,we=/^(?:script|style|textarea|title)$/i,Ze=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),g=Ze(1),M=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ue=new WeakMap,S=C.createTreeWalker(C,129,null,!1),Ge=(t,e)=>{const n=t.length-1,s=[];let r,i=e===2?"<svg>":"",o=B;for(let a=0;a<n;a++){const c=t[a];let d,h,u=-1,p=0;for(;p<c.length&&(o.lastIndex=p,h=o.exec(c),h!==null);)p=o.lastIndex,o===B?h[1]==="!--"?o=ce:h[1]!==void 0?o=le:h[2]!==void 0?(we.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=A):h[3]!==void 0&&(o=A):o===A?h[0]===">"?(o=r??B,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?A:h[3]==='"'?de:he):o===de||o===he?o=A:o===ce||o===le?o=B:(o=A,r=void 0);const _=o===A&&t[a+1].startsWith("/>")?" ":"";i+=o===B?c+ze:u>=0?(s.push(d),c.slice(0,u)+"$lit$"+c.slice(u)+y+_):c+y+(u===-2?(s.push(void 0),a):_)}const l=i+(t[n]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ae!==void 0?ae.createHTML(l):l,s]};class H{constructor({strings:e,_$litType$:n},s){let r;this.parts=[];let i=0,o=0;const l=e.length-1,a=this.parts,[c,d]=Ge(e,n);if(this.el=H.createElement(c,s),S.currentNode=this.el.content,n===2){const h=this.el.content,u=h.firstChild;u.remove(),h.append(...u.childNodes)}for(;(r=S.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const h=[];for(const u of r.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(y)){const p=d[o++];if(h.push(u),p!==void 0){const _=r.getAttribute(p.toLowerCase()+"$lit$").split(y),I=/([.?@])?(.*)/.exec(p);a.push({type:1,index:i,name:I[2],strings:_,ctor:I[1]==="."?qe:I[1]==="?"?Ke:I[1]==="@"?Je:U})}else a.push({type:6,index:i})}for(const u of h)r.removeAttribute(u)}if(we.test(r.tagName)){const h=r.textContent.split(y),u=h.length-1;if(u>0){r.textContent=D?D.emptyScript:"";for(let p=0;p<u;p++)r.append(h[p],T()),S.nextNode(),a.push({type:2,index:++i});r.append(h[u],T())}}}else if(r.nodeType===8)if(r.data===$e)a.push({type:2,index:i});else{let h=-1;for(;(h=r.data.indexOf(y,h+1))!==-1;)a.push({type:7,index:i}),h+=y.length-1}i++}}static createElement(e,n){const s=C.createElement("template");return s.innerHTML=e,s}}function x(t,e,n=t,s){var r,i,o,l;if(e===M)return e;let a=s!==void 0?(r=n._$Co)===null||r===void 0?void 0:r[s]:n._$Cl;const c=O(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==c&&((i=a==null?void 0:a._$AO)===null||i===void 0||i.call(a,!1),c===void 0?a=void 0:(a=new c(t),a._$AT(t,n,s)),s!==void 0?((o=(l=n)._$Co)!==null&&o!==void 0?o:l._$Co=[])[s]=a:n._$Cl=a),a!==void 0&&(e=x(t,a._$AS(t,e.values),a,s)),e}class Ye{constructor(e,n){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var n;const{el:{content:s},parts:r}=this._$AD,i=((n=e==null?void 0:e.creationScope)!==null&&n!==void 0?n:C).importNode(s,!0);S.currentNode=i;let o=S.nextNode(),l=0,a=0,c=r[0];for(;c!==void 0;){if(l===c.index){let d;c.type===2?d=new R(o,o.nextSibling,this,e):c.type===1?d=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(d=new Qe(o,this,e)),this.u.push(d),c=r[++a]}l!==(c==null?void 0:c.index)&&(o=S.nextNode(),l++)}return i}p(e){let n=0;for(const s of this.u)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,n),n+=s.strings.length-2):s._$AI(e[n])),n++}}class R{constructor(e,n,s,r){var i;this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=s,this.options=r,this._$Cm=(i=r==null?void 0:r.isConnected)===null||i===void 0||i}get _$AU(){var e,n;return(n=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&n!==void 0?n:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&e.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=x(this,e,n),O(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==M&&this.g(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):We(e)?this.k(e):this.g(e)}O(e,n=this._$AB){return this._$AA.parentNode.insertBefore(e,n)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==m&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(C.createTextNode(e)),this._$AH=e}$(e){var n;const{values:s,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=H.createElement(r.h,this.options)),r);if(((n=this._$AH)===null||n===void 0?void 0:n._$AD)===i)this._$AH.p(s);else{const o=new Ye(i,this),l=o.v(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(e){let n=ue.get(e.strings);return n===void 0&&ue.set(e.strings,n=new H(e)),n}k(e){Ee(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let s,r=0;for(const i of e)r===n.length?n.push(s=new R(this.O(T()),this.O(T()),this,this.options)):s=n[r],s._$AI(i),r++;r<n.length&&(this._$AR(s&&s._$AB.nextSibling,r),n.length=r)}_$AR(e=this._$AA.nextSibling,n){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,n);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var n;this._$AM===void 0&&(this._$Cm=e,(n=this._$AP)===null||n===void 0||n.call(this,e))}}class U{constructor(e,n,s,r,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=n,this._$AM=r,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,n=this,s,r){const i=this.strings;let o=!1;if(i===void 0)e=x(this,e,n,0),o=!O(e)||e!==this._$AH&&e!==M,o&&(this._$AH=e);else{const l=e;let a,c;for(e=i[0],a=0;a<i.length-1;a++)c=x(this,l[s+a],n,a),c===M&&(c=this._$AH[a]),o||(o=!O(c)||c!==this._$AH[a]),c===m?e=m:e!==m&&(e+=(c??"")+i[a+1]),this._$AH[a]=c}o&&!r&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class qe extends U{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}const Xe=D?D.emptyScript:"";class Ke extends U{constructor(){super(...arguments),this.type=4}j(e){e&&e!==m?this.element.setAttribute(this.name,Xe):this.element.removeAttribute(this.name)}}class Je extends U{constructor(e,n,s,r,i){super(e,n,s,r,i),this.type=5}_$AI(e,n=this){var s;if((e=(s=x(this,e,n,0))!==null&&s!==void 0?s:m)===M)return;const r=this._$AH,i=e===m&&r!==m||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==m&&(r===m||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var n,s;typeof this._$AH=="function"?this._$AH.call((s=(n=this.options)===null||n===void 0?void 0:n.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class Qe{constructor(e,n,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){x(this,e)}}const fe=j.litHtmlPolyfillSupport;fe==null||fe(H,R),((W=j.litHtmlVersions)!==null&&W!==void 0?W:j.litHtmlVersions=[]).push("2.6.1");const Ie=(t,e,n)=>{var s,r;const i=(s=n==null?void 0:n.renderBefore)!==null&&s!==void 0?s:e;let o=i._$litPart$;if(o===void 0){const l=(r=n==null?void 0:n.renderBefore)!==null&&r!==void 0?r:null;i._$litPart$=o=new R(e.insertBefore(T(),l),l,void 0,n??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},et=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],l=t[n++],a=((r&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(a>>10)),e[s++]=String.fromCharCode(56320+(a&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},De={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,l=o?t[r+1]:0,a=r+2<t.length,c=a?t[r+2]:0,d=i>>2,h=(i&3)<<4|l>>4;let u=(l&15)<<2|c>>6,p=c&63;a||(p=64,o||(u=64)),s.push(n[d],n[h],n[u],n[p])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Se(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):et(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],l=r<t.length?n[t.charAt(r)]:0;++r;const c=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||l==null||c==null||h==null)throw Error();const u=i<<2|l>>4;if(s.push(u),c!==64){const p=l<<4&240|c>>2;if(s.push(p),h!==64){const _=c<<6&192|h;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},tt=function(t){const e=Se(t);return De.encodeByteArray(e,!0)},Ce=function(t){return tt(t).replace(/\./g,"")},nt=function(t){try{return De.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st=()=>rt().__FIREBASE_DEFAULTS__,it=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},ot=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&nt(t[1]);return e&&JSON.parse(e)},at=()=>{try{return st()||it()||ot()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ct=()=>{var t;return(t=at())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}function ht(){try{return typeof indexedDB=="object"}catch{return!1}}function dt(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="FirebaseError";class P extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=ut,Object.setPrototypeOf(this,P.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xe.prototype.create)}}class xe{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?ft(i,s):"Error",l=`${this.serviceName}: ${o} (${r}).`;return new P(r,l,s)}}function ft(t,e){return t.replace(pt,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const pt=/\{\$([^}]+)}/g;function X(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(pe(i)&&pe(o)){if(!X(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function pe(t){return t!==null&&typeof t=="object"}class F{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new lt;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bt(e))try{this.getOrInitializeService({instanceIdentifier:$})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=$){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$){return this.instances.has(e)}getOptions(e=$){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);s===l&&o.resolve(r)}return r}onInit(e,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:gt(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=$){return this.component?this.component.multipleInstances?e:$:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gt(t){return t===$?void 0:t}function bt(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new mt(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var f;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(f||(f={}));const yt={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},vt=f.INFO,At={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},$t=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=At[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Et{constructor(e){this.name=e,this._logLevel=vt,this._logHandler=$t,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in f))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?yt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...e),this._logHandler(this,f.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...e),this._logHandler(this,f.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,f.INFO,...e),this._logHandler(this,f.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,f.WARN,...e),this._logHandler(this,f.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...e),this._logHandler(this,f.ERROR,...e)}}const wt=(t,e)=>e.some(n=>t instanceof n);let me,ge;function It(){return me||(me=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function St(){return ge||(ge=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Be=new WeakMap,K=new WeakMap,Te=new WeakMap,Z=new WeakMap,re=new WeakMap;function Dt(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(v(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Be.set(n,t)}).catch(()=>{}),re.set(e,t),e}function Ct(t){if(K.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});K.set(t,e)}let J={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return K.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Te.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return v(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function xt(t){J=t(J)}function Bt(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(G(this),e,...n);return Te.set(s,e.sort?e.sort():[e]),v(s)}:St().includes(t)?function(...e){return t.apply(G(this),e),v(Be.get(this))}:function(...e){return v(t.apply(G(this),e))}}function Tt(t){return typeof t=="function"?Bt(t):(t instanceof IDBTransaction&&Ct(t),wt(t,It())?new Proxy(t,J):t)}function v(t){if(t instanceof IDBRequest)return Dt(t);if(Z.has(t))return Z.get(t);const e=Tt(t);return e!==t&&(Z.set(t,e),re.set(e,t)),e}const G=t=>re.get(t);function Ot(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),l=v(o);return s&&o.addEventListener("upgradeneeded",a=>{s(v(o.result),a.oldVersion,a.newVersion,v(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),l.then(a=>{i&&a.addEventListener("close",()=>i()),r&&a.addEventListener("versionchange",()=>r())}).catch(()=>{}),l}const Mt=["get","getKey","getAll","getAllKeys","count"],Ht=["put","add","delete","clear"],Y=new Map;function be(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Y.get(e))return Y.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=Ht.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Mt.includes(n)))return;const i=async function(o,...l){const a=this.transaction(o,r?"readwrite":"readonly");let c=a.store;return s&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),r&&a.done]))[0]};return Y.set(e,i),i}xt(t=>({...t,get:(e,n,s)=>be(e,n)||t.get(e,n,s),has:(e,n)=>!!be(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Rt(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Rt(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Q="@firebase/app",_e="0.9.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w=new Et("@firebase/app"),Pt="@firebase/app-compat",Lt="@firebase/analytics-compat",kt="@firebase/analytics",jt="@firebase/app-check-compat",Ft="@firebase/app-check",Ut="@firebase/auth",Vt="@firebase/auth-compat",zt="@firebase/database",Wt="@firebase/database-compat",Zt="@firebase/functions",Gt="@firebase/functions-compat",Yt="@firebase/installations",qt="@firebase/installations-compat",Xt="@firebase/messaging",Kt="@firebase/messaging-compat",Jt="@firebase/performance",Qt="@firebase/performance-compat",en="@firebase/remote-config",tn="@firebase/remote-config-compat",nn="@firebase/storage",rn="@firebase/storage-compat",sn="@firebase/firestore",on="@firebase/firestore-compat",an="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn="[DEFAULT]",ln={[Q]:"fire-core",[Pt]:"fire-core-compat",[kt]:"fire-analytics",[Lt]:"fire-analytics-compat",[Ft]:"fire-app-check",[jt]:"fire-app-check-compat",[Ut]:"fire-auth",[Vt]:"fire-auth-compat",[zt]:"fire-rtdb",[Wt]:"fire-rtdb-compat",[Zt]:"fire-fn",[Gt]:"fire-fn-compat",[Yt]:"fire-iid",[qt]:"fire-iid-compat",[Xt]:"fire-fcm",[Kt]:"fire-fcm-compat",[Jt]:"fire-perf",[Qt]:"fire-perf-compat",[en]:"fire-rc",[tn]:"fire-rc-compat",[nn]:"fire-gcs",[rn]:"fire-gcs-compat",[sn]:"fire-fst",[on]:"fire-fst-compat","fire-js":"fire-js",[an]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee=new Map,te=new Map;function hn(t,e){try{t.container.addComponent(e)}catch(n){w.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ne(t){const e=t.name;if(te.has(e))return w.debug(`There were multiple attempts to register component ${e}.`),!1;te.set(e,t);for(const n of ee.values())hn(n,t);return!0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},E=new xe("app","Firebase",dn);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new F("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw E.create("app-deleted",{appName:this._name})}}function fn(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:cn,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw E.create("bad-app-name",{appName:String(r)});if(n||(n=ct()),!n)throw E.create("no-options");const i=ee.get(r);if(i){if(X(n,i.options)&&X(s,i.config))return i;throw E.create("duplicate-app",{appName:r})}const o=new _t(r);for(const a of te.values())o.addComponent(a);const l=new un(n,s,o);return ee.set(r,l),l}function k(t,e,n){var s;let r=(s=ln[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${r}" with version "${e}":`];i&&l.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),w.warn(l.join(" "));return}ne(new F(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn="firebase-heartbeat-database",mn=1,N="firebase-heartbeat-store";let q=null;function Oe(){return q||(q=Ot(pn,mn,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(N)}}}).catch(t=>{throw E.create("idb-open",{originalErrorMessage:t.message})})),q}async function gn(t){try{return(await Oe()).transaction(N).objectStore(N).get(Me(t))}catch(e){if(e instanceof P)w.warn(e.message);else{const n=E.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});w.warn(n.message)}}}async function ye(t,e){try{const s=(await Oe()).transaction(N,"readwrite");return await s.objectStore(N).put(e,Me(t)),s.done}catch(n){if(n instanceof P)w.warn(n.message);else{const s=E.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});w.warn(s.message)}}}function Me(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn=1024,_n=30*24*60*60*1e3;class yn{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new An(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ve();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const i=new Date(r.date).valueOf();return Date.now()-i<=_n}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ve(),{heartbeatsToSend:n,unsentEntries:s}=vn(this._heartbeatsCache.heartbeats),r=Ce(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function ve(){return new Date().toISOString().substring(0,10)}function vn(t,e=bn){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Ae(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Ae(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class An{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ht()?dt().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await gn(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return ye(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return ye(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Ae(t){return Ce(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(t){ne(new F("platform-logger",e=>new Nt(e),"PRIVATE")),ne(new F("heartbeat",e=>new yn(e),"PRIVATE")),k(Q,_e,t),k(Q,_e,"esm2017"),k("fire-js","")}$n("");var En="firebase",wn="9.17.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */k(En,wn,"app");const In={"--pink":"#ff79c6","--red":"#ff5555","--orange":"#ffad55","--yellow":"#f1fa8c","--green":"#50fa7b","--cyan":"#8be9fd","--blue":"#4395d4","--purple":"#9674c8","--gray":"#848484","--text-light":"#f8f8f2","--text-dark":"#282a36","--pipe":"#b7b7b7","--workspace-background":"#44475a","--toolbar":"#282a36","--module-background":"#f8f8f2","--module-background-accent":"#d5d5d5","--background-dots":"#d6cce0","--port":"#b7b7b7"},He=t=>t.composedPath()[0],Sn=(t,e)=>He(t).matches(e),Dn=t=>(e,n,s)=>{t.addEventListener(e,r=>{r.trigger=He(r),(n===""||Sn(r,n))&&s(r)})};function Cn(t,e){const n=Dn(t);let s=!1,r=1,i=0,o=0,l={x:0,y:0};function a(d){d.style.transformOrigin=`${0}px ${0}px`,d.style.transform="translate("+i+"px, "+o+"px) scale("+r+")"}n("pointerdown","",d=>{d.shiftKey||(s=!0,l={x:d.offsetX-i,y:d.offsetY-o},d.detail)}),n("pointermove","",d=>{if(!s||e.transforming)return;i=d.offsetX-l.x,o=d.offsetY-l.y;const h=document.querySelectorAll(".transform-group");for(const u of h)a(u)}),n("pointerup","",d=>{s=!1}),n("wheel","",d=>{let h=(d.offsetX-i)/r,u=(d.offsetY-o)/r;Math.sign(d.deltaY)<0?r*=1.03:r/=1.03,i=d.offsetX-h*r,o=d.offsetY-u*r;const p=document.querySelectorAll(".transform-group");for(const _ of p)a(_);d.preventDefault()});function c(d){const h=t.getBoundingClientRect(),u=d.x[1]-d.x[0],p=d.y[1]-d.y[0],_=h.width/u,I=h.height/p,V=Math.min(_,I)*.9;r=V;const ie={x:(d.x[0]+d.x[1])/2*V-h.width/2,y:(d.y[0]+d.y[1])/2*V-h.height/2};i=-ie.x,o=-ie.y;const ke=document.querySelectorAll(".transform-group");for(const je of ke)a(je)}return{scale:()=>r,x:()=>i,y:()=>o,setScaleXY:c}}function*xn(t,e){let n=!0;for(const s of t)n||(yield e),n=!1,yield s}const Bn=g`,`,Tn=g`[`,On=g`]`;function Mn(t){if(Array.isArray(t))return Hn(t);if(!t)return Nn();let e=[];for(const[n,s]of Object.entries(t))e.push(g`
        <span class="key">${n}:</span>
        <span class="value">${se(s)}</span>
      `);return g`<div class="keyval-container">${e}</div>`}function Hn(t){let e=[];for(const s of t)e.push(se(s));return[Tn,...xn(e,Bn),On]}function Nn(){return g`<span class="undef">null</span>`}function Rn(t){return g`<span class="number">${t}</span>`}function Pn(t){return g`<span class="string">${t}</span>`}function Ln(t){return g`<span class="boolean">${t}</span>`}function kn(t){return g`<span>undef</span>`}function se(t){let e;switch(typeof t){case"object":e=Mn(t);break;case"number":e=Rn(t);break;case"string":e=Pn(t);break;case"boolean":e=Ln(t);break;case"undefined":e=kn();break}return e}function jn(t){let e=[];for(const[n,s]of Object.entries(t))e.push(g` <span class="key">${n}</span>
        <span class="value">${se(s)}</span>`);return e}function Fn(t){return g` <div class="state-container">${jn(t)}</div>`}const Un={apiKey:"AIzaSyDOVuFoZPjhBG3yW1ahTsrnqTWbXMSTtek",authDomain:"toolchains-5434e.firebaseapp.com",projectId:"toolchains-5434e",storageBucket:"toolchains-5434e.appspot.com",messagingSenderId:"92747901115",appId:"1:92747901115:web:fd3833a481c10d3977219e"};fn(Un);let b={initialized:!1,toolbox:["textInput","toggle","colorInput"],imports:{},toolchain:{modules:{},shape:{}},theme:In,panZoom:null},L=0;function Vn(t){return Object.entries(t.toolchain.modules).map(([e,n])=>g`<div class="mod" style="--x:${n.pos.x}px;--y:${n.pos.y}px;">
      <div class="module-header"><span>${n.displayName}</span></div>
      <div class="inport-container">
        <div class="port"></div>
        <div class="port"></div>
      </div>
      <div class="outport-container">
        <div class="port"></div>
        <div class="port"></div>
      </div>
      <div class="module-ui">
        ${t.imports[n.moduleClass].view(n.state)}
      </div>
      <div class="module-state">${Fn(n.state)}</div>
    </div>`)}const Ne=t=>{const e=t.panZoom?t.panZoom.x():0,n=t.panZoom?t.panZoom.y():0,s=t.panZoom?t.panZoom.scale():1;return g`<div id="app-container">
    <div id="toolbar"><span>toolchains</span></div>
    <div id="workspace">
      <canvas
        id="background"
        style="--offset-x: ${e}px;--offset-y: ${n}px;--scale: ${s}"></canvas>
      <div id="modules" class="transform-group">${Vn(t)}</div>
      <div id="toolbox">
        <div id="toolbox-title">toolbox</div>
        ${t.toolbox.map(r=>g`<button class="add-tool" @click=${()=>Wn(r)}>
              ${r}
            </button>`)}
      </div>
    </div>
  </div>`};function Re(t){let e=b.imports[t].config;b.toolchain.modules[`${t}_${L}`]={moduleClass:t,displayName:e.displayName,state:e.state,pos:{x:L*30,y:L*30},focus:!1},L++}function zn(t){Ve(Object.assign({"./tools/colorInput.js":()=>z(()=>import("./colorInput-f753e63a.js"),[]),"./tools/textInput.js":()=>z(()=>import("./textInput-378b0081.js"),[]),"./tools/toggle.js":()=>z(()=>import("./toggle-186504bc.js"),[])}),`./tools/${t}.js`).then(e=>{b.imports[t]={config:e.config,view:e.view},Re(t)}).catch(e=>{console.log(e)})}function Wn(t){t in b.imports?Re(t):zn(t)}function Zn(){Object.entries(b.theme).map(([t,e])=>{document.documentElement.style.setProperty(t,e)})}function Pe(){Ie(Ne(b),document.body),window.requestAnimationFrame(Pe)}function Gn(){if(b.initialized)return;let t=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${t}px`),b.initialized=!0,Zn(),Ie(Ne(b),document.body)}window.addEventListener("resize",()=>{let t=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${t}px`)});Gn();const Yn=document.getElementById("background"),Le=Cn(Yn,b);b.panZoom=Le;Le.setScaleXY({x:[-window.innerWidth/2,window.innerWidth/2],y:[-window.innerHeight/2,window.innerHeight/2]});window.requestAnimationFrame(Pe);export{g as y};
