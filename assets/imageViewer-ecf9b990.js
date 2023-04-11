import{y as t}from"./lit-html-b7b68613.js";const i={inports:{dataurl:{type:"dataurl",value:null}},ui:{displayName:"Image Viewer",width:200,height:200,resize:"both",icon:"image"}};function r(e,a){return{render:()=>t`<style>
        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          display: block;
          image-rendering: pixelated;
          user-select: none;
        }
      </style>
      <img draggable="false" src=${e.dataurl.value} />`}}const l={config:i,tool:r};export{l as default};
