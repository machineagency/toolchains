(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=n(e);fetch(e.href,i)}})();const it="modulepreload",rt=function(o){return"/toolchains/"+o},B={},P=function(t,n,s){if(!n||n.length===0)return t();const e=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=rt(i),i in B)return;B[i]=!0;const r=i.endsWith(".css"),u=r?'[rel="stylesheet"]':"";if(!!s)for(let f=e.length-1;f>=0;f--){const l=e[f];if(l.href===i&&(!r||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${u}`))return;const a=document.createElement("link");if(a.rel=r?"stylesheet":it,r||(a.as="script",a.crossOrigin=""),a.href=i,document.head.appendChild(a),r)return new Promise((f,l)=>{a.addEventListener("load",f),a.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())},lt=(o,t)=>{const n=o[t];return n?typeof n=="function"?n():Promise.resolve(n):new Promise((s,e)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(e.bind(null,new Error("Unknown variable dynamic import: "+t)))})};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L;const N=window,b=N.trustedTypes,D=b?b.createPolicy("lit-html",{createHTML:o=>o}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,z="?"+y,at=`<${z}>`,x=document,k=(o="")=>x.createComment(o),H=o=>o===null||typeof o!="object"&&typeof o!="function",F=Array.isArray,ct=o=>F(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Z=/-->/g,U=/>/g,_=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,V=/"/g,W=/^(?:script|style|textarea|title)$/i,dt=o=>(t,...n)=>({_$litType$:o,strings:t,values:n}),v=dt(1),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Y=new WeakMap,A=x.createTreeWalker(x,129,null,!1),ut=(o,t)=>{const n=o.length-1,s=[];let e,i=t===2?"<svg>":"",r=T;for(let c=0;c<n;c++){const a=o[c];let f,l,d=-1,h=0;for(;h<a.length&&(r.lastIndex=h,l=r.exec(a),l!==null);)h=r.lastIndex,r===T?l[1]==="!--"?r=Z:l[1]!==void 0?r=U:l[2]!==void 0?(W.test(l[2])&&(e=RegExp("</"+l[2],"g")),r=_):l[3]!==void 0&&(r=_):r===_?l[0]===">"?(r=e??T,d=-1):l[1]===void 0?d=-2:(d=r.lastIndex-l[2].length,f=l[1],r=l[3]===void 0?_:l[3]==='"'?V:q):r===V||r===q?r=_:r===Z||r===U?r=T:(r=_,e=void 0);const g=r===_&&o[c+1].startsWith("/>")?" ":"";i+=r===T?a+at:d>=0?(s.push(f),a.slice(0,d)+"$lit$"+a.slice(d)+y+g):a+y+(d===-2?(s.push(void 0),c):g)}const u=i+(o[n]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return[D!==void 0?D.createHTML(u):u,s]};class I{constructor({strings:t,_$litType$:n},s){let e;this.parts=[];let i=0,r=0;const u=t.length-1,c=this.parts,[a,f]=ut(t,n);if(this.el=I.createElement(a,s),A.currentNode=this.el.content,n===2){const l=this.el.content,d=l.firstChild;d.remove(),l.append(...d.childNodes)}for(;(e=A.nextNode())!==null&&c.length<u;){if(e.nodeType===1){if(e.hasAttributes()){const l=[];for(const d of e.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith(y)){const h=f[r++];if(l.push(d),h!==void 0){const g=e.getAttribute(h.toLowerCase()+"$lit$").split(y),$=/([.?@])?(.*)/.exec(h);c.push({type:1,index:i,name:$[2],strings:g,ctor:$[1]==="."?pt:$[1]==="?"?vt:$[1]==="@"?mt:C})}else c.push({type:6,index:i})}for(const d of l)e.removeAttribute(d)}if(W.test(e.tagName)){const l=e.textContent.split(y),d=l.length-1;if(d>0){e.textContent=b?b.emptyScript:"";for(let h=0;h<d;h++)e.append(l[h],k()),A.nextNode(),c.push({type:2,index:++i});e.append(l[d],k())}}}else if(e.nodeType===8)if(e.data===z)c.push({type:2,index:i});else{let l=-1;for(;(l=e.data.indexOf(y,l+1))!==-1;)c.push({type:7,index:i}),l+=y.length-1}i++}}static createElement(t,n){const s=x.createElement("template");return s.innerHTML=t,s}}function w(o,t,n=o,s){var e,i,r,u;if(t===E)return t;let c=s!==void 0?(e=n._$Co)===null||e===void 0?void 0:e[s]:n._$Cl;const a=H(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==a&&((i=c==null?void 0:c._$AO)===null||i===void 0||i.call(c,!1),a===void 0?c=void 0:(c=new a(o),c._$AT(o,n,s)),s!==void 0?((r=(u=n)._$Co)!==null&&r!==void 0?r:u._$Co=[])[s]=c:n._$Cl=c),c!==void 0&&(t=w(o,c._$AS(o,t.values),c,s)),t}class ht{constructor(t,n){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var n;const{el:{content:s},parts:e}=this._$AD,i=((n=t==null?void 0:t.creationScope)!==null&&n!==void 0?n:x).importNode(s,!0);A.currentNode=i;let r=A.nextNode(),u=0,c=0,a=e[0];for(;a!==void 0;){if(u===a.index){let f;a.type===2?f=new S(r,r.nextSibling,this,t):a.type===1?f=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(f=new gt(r,this,t)),this.u.push(f),a=e[++c]}u!==(a==null?void 0:a.index)&&(r=A.nextNode(),u++)}return i}p(t){let n=0;for(const s of this.u)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,n),n+=s.strings.length-2):s._$AI(t[n])),n++}}class S{constructor(t,n,s,e){var i;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=s,this.options=e,this._$Cm=(i=e==null?void 0:e.isConnected)===null||i===void 0||i}get _$AU(){var t,n;return(n=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&n!==void 0?n:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=w(this,t,n),H(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==E&&this.g(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ct(t)?this.k(t):this.g(t)}O(t,n=this._$AB){return this._$AA.parentNode.insertBefore(t,n)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==p&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var n;const{values:s,_$litType$:e}=t,i=typeof e=="number"?this._$AC(t):(e.el===void 0&&(e.el=I.createElement(e.h,this.options)),e);if(((n=this._$AH)===null||n===void 0?void 0:n._$AD)===i)this._$AH.p(s);else{const r=new ht(i,this),u=r.v(this.options);r.p(s),this.T(u),this._$AH=r}}_$AC(t){let n=Y.get(t.strings);return n===void 0&&Y.set(t.strings,n=new I(t)),n}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let s,e=0;for(const i of t)e===n.length?n.push(s=new S(this.O(k()),this.O(k()),this,this.options)):s=n[e],s._$AI(i),e++;e<n.length&&(this._$AR(s&&s._$AB.nextSibling,e),n.length=e)}_$AR(t=this._$AA.nextSibling,n){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,n);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var n;this._$AM===void 0&&(this._$Cm=t,(n=this._$AP)===null||n===void 0||n.call(this,t))}}class C{constructor(t,n,s,e,i){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=n,this._$AM=e,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,n=this,s,e){const i=this.strings;let r=!1;if(i===void 0)t=w(this,t,n,0),r=!H(t)||t!==this._$AH&&t!==E,r&&(this._$AH=t);else{const u=t;let c,a;for(t=i[0],c=0;c<i.length-1;c++)a=w(this,u[s+c],n,c),a===E&&(a=this._$AH[c]),r||(r=!H(a)||a!==this._$AH[c]),a===p?t=p:t!==p&&(t+=(a??"")+i[c+1]),this._$AH[c]=a}r&&!e&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class pt extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}const ft=b?b.emptyScript:"";class vt extends C{constructor(){super(...arguments),this.type=4}j(t){t&&t!==p?this.element.setAttribute(this.name,ft):this.element.removeAttribute(this.name)}}class mt extends C{constructor(t,n,s,e,i){super(t,n,s,e,i),this.type=5}_$AI(t,n=this){var s;if((t=(s=w(this,t,n,0))!==null&&s!==void 0?s:p)===E)return;const e=this._$AH,i=t===p&&e!==p||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,r=t!==p&&(e===p||i);i&&this.element.removeEventListener(this.name,this,e),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n,s;typeof this._$AH=="function"?this._$AH.call((s=(n=this.options)===null||n===void 0?void 0:n.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class gt{constructor(t,n,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const X=N.litHtmlPolyfillSupport;X==null||X(I,S),((L=N.litHtmlVersions)!==null&&L!==void 0?L:N.litHtmlVersions=[]).push("2.6.1");const J=(o,t,n)=>{var s,e;const i=(s=n==null?void 0:n.renderBefore)!==null&&s!==void 0?s:t;let r=i._$litPart$;if(r===void 0){const u=(e=n==null?void 0:n.renderBefore)!==null&&e!==void 0?e:null;i._$litPart$=r=new S(t.insertBefore(k(),u),u,void 0,n??{})}return r._$AI(o),r},$t={"--pink":"#ff79c6","--red":"#ff5555","--orange":"#ffad55","--yellow":"#f1fa8c","--green":"#50fa7b","--cyan":"#8be9fd","--blue":"#4395d4","--purple":"#9674c8","--gray":"#848484","--black":"#282a36","--text-light":"#f8f8f2","--text-dark":"#282a36","--pipe":"#b7b7b7","--workspace-background":"#44475a","--toolbar":"#282a36","--module-background":"#f8f8f2","--module-background-accent":"#d5d5d5","--background-dots":"#d6cce0","--port":"#b7b7b7"},K=o=>o.composedPath()[0],yt=(o,t)=>K(o).matches(t),G=o=>(t,n,s)=>{o.addEventListener(t,e=>{e.trigger=K(e),(n===""||yt(e,n))&&s(e)})};function _t(o,t){const n=G(o);let s=!1,e=1,i=0,r=0,u={x:0,y:0};function c(l){l.style.transformOrigin=`${0}px ${0}px`,l.style.transform="translate("+i+"px, "+r+"px) scale("+e+")"}function a({x:l,y:d}){let h=(l-i)/e,g=(d-r)/e;return{x:h,y:g}}n("pointerdown","",l=>{l.shiftKey||(s=!0,u={x:l.offsetX-i,y:l.offsetY-r},l.detail)}),n("pointermove","",l=>{if(!s||t.transforming)return;i=l.offsetX-u.x,r=l.offsetY-u.y;const d=document.querySelectorAll(".transform-group");for(const h of d)c(h)}),n("pointerup","",l=>{s=!1}),n("wheel","",l=>{let d=(l.offsetX-i)/e,h=(l.offsetY-r)/e;Math.sign(l.deltaY)<0?e*=1.03:e/=1.03,i=l.offsetX-d*e,r=l.offsetY-h*e;const g=document.querySelectorAll(".transform-group");for(const $ of g)c($);l.preventDefault()});function f(l){const d=o.getBoundingClientRect(),h=l.x[1]-l.x[0],g=l.y[1]-l.y[0],$=d.width/h,nt=d.height/g,M=Math.min($,nt)*.9;e=M;const j={x:(l.x[0]+l.x[1])/2*M-d.width/2,y:(l.y[0]+l.y[1])/2*M-d.height/2};i=-j.x,r=-j.y;const ot=document.querySelectorAll(".transform-group");for(const st of ot)c(st)}return{scale:()=>e,x:()=>i,y:()=>r,setScaleXY:f,svgPoint:a}}function At(o,t){const n=G(o);function s(e){let i=e.target.closest(".mod").dataset.toolid;return[i,t.toolchain.modules[i]]}n("pointerdown",".remove",e=>{let[i,r]=s(e);console.log(`Removing ${i}`),delete t.toolchain.modules[i]}),n("pointerdown",".drag",e=>{let[i,r]=s(e);t.selection.add(i),t.transforming=!0}),n("pointermove","",e=>{if(!t.transforming)return;let i=e.movementX/t.panZoom.scale(),r=e.movementY/t.panZoom.scale();t.selection.forEach(u=>{t.toolchain.modules[u].pos.x+=i,t.toolchain.modules[u].pos.y+=r})}),n("pointerup","",e=>{t.selection.clear(),t.transforming=!1}),n("pointerdown",".pin",e=>{let[i,r]=s(e);r.ui.toolbar=!r.ui.toolbar,console.log("Toggle pin")}),n("pointerdown",".toggle-state",e=>{let[i,r]=s(e);r.ui.statePanel=!r.ui.statePanel,console.log("Toggle state")}),n("pointerdown",".outports .port",e=>{s(e),console.log("outport")}),n("pointerdown",".inports .port",e=>{s(e),console.log("inport")})}function*bt(o,t){let n=!0;for(const s of o)n||(yield t),n=!1,yield s}const xt=v`,`,wt=v`[`,Tt=v`]`;function kt(o){if(Array.isArray(o))return Ht(o);if(!o)return Et();let t=[];for(const[n,s]of Object.entries(o))t.push(v`
        <span class="state-key">${n}:</span>
        <span class="state-value">${R(s)}</span>
      `);return v`<div class="keyval-container">${t}</div>`}function Ht(o){let t=[];for(const s of o)t.push(R(s));return[wt,...bt(t,xt),Tt]}function Et(){return v`<span class="undef">null</span>`}function It(o){return v`<span class="number">${o}</span>`}function St(o){return v`<span class="string">${o}</span>`}function Pt(o){return v`<span class="boolean">${o}</span>`}function Ot(o){return v`<span>undef</span>`}function R(o){let t;switch(typeof o){case"object":t=kt(o);break;case"number":t=It(o);break;case"string":t=St(o);break;case"boolean":t=Pt(o);break;case"undefined":t=Ot();break}return t}function Nt(o){let t=[];for(const[n,s]of Object.entries(o))t.push(v` <span class="state-key">${n}</span>
        <span class="state-value">${R(s)}</span>`);return t}function Ct(o){return v` <div class="state-container">${Nt(o)}</div>`}let m={initialized:!1,toolbox:["test","textInput","toggle","colorInput"],imports:{},toolchain:{modules:{},shape:{}},theme:$t,panZoom:null,transforming:!1,selection:new Set},Mt={moduleClass:null,displayName:null,inports:[],outports:[],state:{},lifecycle:{},view:{height:"100px",width:"100px"},pos:{x:0,y:0},focus:!1,ui:{toolbar:!0,statePanel:!1}},O=0;function Lt(o,t,n){return v`<div
    class="mod ${t.ui.toolbar?"show-toolbar":"hide-toolbar"} ${t.ui.statePanel?"show-state":"hide-state"}"
    data-toolid=${o}
    style="
      --x:${t.pos.x}px;
      --y:${t.pos.y}px;
      --ui-width:${t.view.width};
      --ui-height:${t.view.height};">
    <div class="module-background">
      <div class="b1"></div>
      <div class="b2"></div>
      <div class="b3"></div>
    </div>
      <div class="toolbar">
        <span class="module-displayname">${t.displayName}</span>
        <span class="module-actions">
          <i class="toggle-state fa-solid fa-code fa-xs "></i>
          <i class="remove fa-solid fa-rectangle-xmark"></i>
          <i class="pin fa-solid fa-xs fa-thumbtack"></i>
          <i class="drag fa-solid fa-grip-vertical"></i>
        </span>
      </div>
      <div class="inports port-container">
        <div class="port"></div>
        <div class="port"></div>
      </div>
      <div class="outports port-container">
        <div class="port"></div>
        <div class="port"></div>
        <div class="port"></div>
        <div class="port"></div>
      </div>
      <div class="tool-view">${n(t.state)}</div>
      <div class="module-state">${Ct(t.state)}</div>
    </div>
  </div>`}function Rt(o){return Object.entries(o.toolchain.modules).map(([t,n])=>Lt(t,n,o.imports[n.moduleClass].view))}const Q=o=>{const t=o.panZoom?o.panZoom.x():0,n=o.panZoom?o.panZoom.y():0,s=o.panZoom?o.panZoom.scale():1;return v`<div id="app-container">
    <div id="top-bar"><span>toolchains</span></div>
    <div id="workspace">
      <canvas
        id="background"
        style="--offset-x: ${t}px;--offset-y: ${n}px;--scale: ${s}"></canvas>
      <div id="modules" class="transform-group">${Rt(o)}</div>
      <div id="toolbox">
        <div id="toolbox-title">toolbox</div>
        ${o.toolbox.map(e=>v`<button class="add-tool" @click=${()=>Bt(e)}>
              ${e}
            </button>`)}
      </div>
    </div>
  </div>`};function tt(o,t){let n=JSON.parse(JSON.stringify(m.imports[o].config)),s=`${o}_${O}`,e=JSON.parse(JSON.stringify(Mt));Object.assign(e,n),e.moduleClass=o,e.pos.x+=O*30,e.pos.y+=O*30,"init"in t&&t.init(e.state),m.toolchain.modules[s]=e,O++}function jt(o){lt(Object.assign({"./tools/colorInput.js":()=>P(()=>import("./colorInput-2b84e11c.js"),[]),"./tools/test.js":()=>P(()=>import("./test-8044f498.js"),[]),"./tools/textInput.js":()=>P(()=>import("./textInput-4b3f055c.js"),[]),"./tools/toggle.js":()=>P(()=>import("./toggle-4b3f055c.js"),[])}),`./tools/${o}.js`).then(t=>{m.imports[o]={config:t.config,view:t.view,lifecycle:t.lifecycle??{}},tt(o,t.lifecycle)}).catch(t=>{console.log(t)})}function Bt(o){o in m.imports?tt(o,m.imports[o].lifecycle):jt(o)}function Dt(){Object.entries(m.theme).map(([o,t])=>{document.documentElement.style.setProperty(o,t)})}function et(){J(Q(m),document.body),window.requestAnimationFrame(et)}function Zt(){if(m.initialized)return;let o=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${o}px`),m.initialized=!0,Dt(),J(Q(m),document.body)}window.addEventListener("resize",()=>{let o=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${o}px`)});Zt();const Ut=document.getElementById("background"),qt=document.getElementById("workspace"),Vt=_t(Ut,m);m.panZoom=Vt;At(qt,m);window.requestAnimationFrame(et);export{v as y};
