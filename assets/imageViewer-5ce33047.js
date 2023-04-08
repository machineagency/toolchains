import{y as t}from"./lit-html-b7b68613.js";const r={inports:{dataurl:{type:"dataurl",value:null}},outports:{},state:{},ui:{displayName:"Image Viewer",width:200,height:200,resize:"both"}};function a(e,i,o){return{render:()=>t`<style>
        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          display: block;
          image-rendering: pixelated;
        }
      </style>
      <img draggable="false" src=${e.dataurl.value} />`}}const s={config:r,tool:a};export{s as default};
