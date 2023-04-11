import{y as s}from"./lit-html-b7b68613.js";import{n as c,e as r}from"./ref-056edc85.js";import"./index-929da322.js";const l={inports:{imageData:{type:"object",value:null}},ui:{displayName:"View Image Data",icon:"image",width:200,height:200,resize:"both"}};function g(i,u){let e=r();function n(){const t=i.imageData.value;if(t===null)return;const a=e.value;a.width=t.width,a.height=t.height,a.getContext("2d").putImageData(t,0,0)}function o(){return s`<style>
        canvas {
          width: 100%;
          display: block;
        }
      </style>
      <canvas draggable="false" ${c(e)}></canvas>`}return{render:o,inportsUpdated:n}}const f={config:l,tool:g};export{f as default};
