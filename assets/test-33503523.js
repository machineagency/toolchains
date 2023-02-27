import{y as i}from"./index-443c018e.js";function u(n){const e={displayName:"Test",width:"200px",height:"200px"},t={colors:[],currentColor:"#ffff00",num:5e5,floatieBoi:25.8,obj:{currentColor:"#ffff00",num:5e5,floatieBoi:25.8}},a={},s={text:{type:"string",value:null}},l=()=>{o()},c=()=>{},o=r=>{n.log("shufflin!!!"),t.colors=new Array(15).fill(0).map(()=>`#${Math.floor(Math.random()*16777215).toString(16)}`)};return{ui:e,inports:a,outports:s,state:t,init:l,resize:c,render:()=>i`<style>
        .grid-container {
          display: grid;
          grid-gap: 1px;
          grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
        }
        .grid-container > div {
          width: 100%;
          aspect-ratio: 1;
        }
        .grid-container > div:hover {
          background-color: var(--pink);
        }
      </style>
      <button @click=${o}>Shuffle!</button>

      <div class="grid-container">
        ${t.colors.map(r=>i`<div style="background-color: ${r};"></div>`)}
      </div> `}}export{u as default};
