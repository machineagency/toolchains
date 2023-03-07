import{y as i}from"./index-79b795f3.js";const g={inports:{},outports:{toggle:{type:"boolean",value:!1}},state:{toggle:!1},ui:{displayName:"toggle",width:"100px",height:"50px"}};function l(c,o,t){function n(e){t.toggle=e.target.checked,o.toggle=e.target.checked}return{init:()=>{console.log("initializing!!")},render:()=>i`<style>
        input {
          width: 100%;
        }
      </style>
      <input type="checkbox" ?checked=${t.toggle} @input=${n} />`}}const u={config:g,tool:l};export{u as default};
