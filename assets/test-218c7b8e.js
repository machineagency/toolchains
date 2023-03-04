import{y as r}from"./index-5b250036.js";const a={inports:{text:{type:"string",value:"asdf"},num:{type:"number",value:57},bool:{type:"boolean",value:!1}},outports:{text:{type:"string",value:"asdf"},num:{type:"number",value:57},bool:{type:"boolean",value:!1}},state:{colors:[],currentColor:"#ffff00",num:5e5,floatieBoi:25.8,obj:{currentColor:"#ffff00",num:5e5,floatieBoi:25.8}},ui:{displayName:"Test",width:"200px",height:"200px"}};function l(s,u,t){const n=()=>{o()},i=()=>{},o=e=>{t.colors=new Array(30).fill(0).map(()=>`#${Math.floor(Math.random()*16777215).toString(16)}`)};return{init:n,resize:i,render:()=>r`<style>
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
          grid-auto-rows: auto;
          flex: 1;
        }
        .grid-container > div {
          width: 100%;
        }
        .grid-container > div:hover {
          background-color: var(--pink);
        }
        button {
          width: 100%;
        }
      </style>
      <div class="container">
        <div class="grid-container">
          ${t.colors.map(e=>r`<div style="background-color: ${e};"></div>`)}
        </div>
        <button @click=${o}>Shuffle!</button>
      </div>`}}const f={config:a,tool:l};export{f as default};
