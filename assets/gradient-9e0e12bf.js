import{y as t}from"./lit-html-b7b68613.js";const r={inports:{c1:{type:"string",value:null},c2:{type:"string",value:null},dir:{type:"number",value:180}},outports:{},state:{},ui:{displayName:"Gradient",width:100,height:100,resize:"both"}};function n(e,a,i){return{render:()=>t`<style>
        .gradient {
          height: 100%;
          background-image: linear-gradient(
            ${e.dir.value}deg,
            ${e.c1.value??"green"},
            ${e.c2.value??"cyan"}
          );
        }
      </style>
      <div class="gradient"></div>`}}const u={config:r,tool:n};export{u as default};
