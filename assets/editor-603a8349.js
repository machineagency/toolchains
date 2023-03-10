import{i as f,t as A,e as g,b as h,_ as d,y as m}from"./index-cae7d1c5.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=i=>i.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n=(i,t)=>{var e,s;const o=i._$AN;if(o===void 0)return!1;for(const r of o)(s=(e=r)._$AO)===null||s===void 0||s.call(e,t,!1),n(r,t);return!0},l=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while((e==null?void 0:e.size)===0)},c=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),w(t)}};function C(i){this._$AN!==void 0?(l(this),this._$AM=i,c(this)):this._$AM=i}function Y(i,t=!1,e=0){const s=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(t)if(Array.isArray(s))for(let r=e;r<s.length;r++)n(s[r],!1),l(s[r]);else s!=null&&(n(s,!1),l(s));else n(this,i)}const w=i=>{var t,e,s,o;i.type==A.CHILD&&((t=(s=i)._$AP)!==null&&t!==void 0||(s._$AP=Y),(e=(o=i)._$AQ)!==null&&e!==void 0||(o._$AQ=C))};class N extends f{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),c(this),this.isConnected=t._$AU}_$AO(t,e=!0){var s,o;t!==this.isConnected&&(this.isConnected=t,t?(s=this.reconnected)===null||s===void 0||s.call(this):(o=this.disconnected)===null||o===void 0||o.call(this)),e&&(n(this,t),l(this))}setValue(t){if(y(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=()=>new b;class b{}const a=new WeakMap,I=g(class extends N{render(i){return h}update(i,[t]){var e;const s=t!==this.Y;return s&&this.Y!==void 0&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.Y=t,this.dt=(e=i.options)===null||e===void 0?void 0:e.host,this.rt(this.ct=i.element)),h}rt(i){var t;if(typeof this.Y=="function"){const e=(t=this.dt)!==null&&t!==void 0?t:globalThis;let s=a.get(e);s===void 0&&(s=new WeakMap,a.set(e,s)),s.get(this.Y)!==void 0&&this.Y.call(this.dt,void 0),s.set(this.Y,i),i!==void 0&&this.Y.call(this.dt,i)}else this.Y.value=i}get lt(){var i,t,e;return typeof this.Y=="function"?(t=a.get((i=this.dt)!==null&&i!==void 0?i:globalThis))===null||t===void 0?void 0:t.get(this.Y):(e=this.Y)===null||e===void 0?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),S={inports:{},outports:{js:{type:"string",value:null}},state:{code:`function makeArr(start, stop, numSteps) {
  var arr = [];
  var step = (stop - start) / (numSteps - 1);
  for (var i = 0; i < numSteps; i++) {
    arr.push(start + (step * i));
  }
  return arr;
}

makeArr(0,100,21);`},ui:{displayName:"Editor",width:400,height:400}};function E(i,t,e){let s;function o(){e.code=s.getValue(),t.js.value=e.code}let r=M();async function u(){let{default:_}=await d(()=>import("https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.css?used"),[]),{default:$}=await d(()=>import("https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/dracula.min.css?used"),[]),{default:p}=await d(()=>import("https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/scroll/simplescrollbars.min.css?used"),[]);r.value.parentNode.adoptedStyleSheets=[_,$,p],s=CodeMirror(r.value,{lineNumbers:!0,tabSize:2,value:e.code,mode:"javascript",theme:"dracula",viewportMargin:1/0,scrollbarStyle:"simple",gutters:["error"]}),t.js.value=e.code,s.on("changes",o)}function v(){return m` <style>
        #editor {
          height: 100%;
        }
        .CodeMirror {
          height: 100% !important;
        }
      </style>
      <div id="editor" ${I(r)}></div>`}return{render:v,postInit:u}}const k={config:S,tool:E};export{k as default};
