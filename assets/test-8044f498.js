import{y as r}from"./index-7137d624.js";const e={displayName:"Test",inports:{},outports:{text:{type:"string",value:null}},view:{width:"200px",height:"200px"},state:{colors:[],currentColor:"#ffff00",num:5e5,floatieBoi:25.8,obj:{currentColor:"#ffff00",num:5e5,floatieBoi:25.8}}};function a(o){return r`<style>
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
    <div class="grid-container">
      ${o.colors.map(i=>r`<div style="background-color: ${i};"></div>`)}
    </div> `}function t(o){console.log(o),o.colors=new Array(15).fill(0).map(()=>`#${Math.floor(Math.random()*16777215).toString(16)}`)}const l={init:t};export{e as config,l as lifecycle,a as view};
