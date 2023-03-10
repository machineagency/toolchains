import{y as t}from"./index-f35f512e.js";const r={inports:{c1:{type:"string",value:null},c2:{type:"string",value:null},dir:{type:"number",value:180}},outports:{},state:{},ui:{displayName:"Gradient",width:200,height:200}};function n(e,a,i){return{resize:()=>{},render:()=>t`<style>
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
