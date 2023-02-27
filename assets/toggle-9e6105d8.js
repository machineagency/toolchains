import{y as c}from"./index-71822258.js";function u(e){const o={displayName:"toggle",width:"100px",height:"50px"},t={toggle:!1},n={},i={toggle:{type:"boolean",value:t.toggle}};function g(l){t.toggle=l.target.checked}return{ui:o,inports:n,outports:i,state:t,init:()=>{e.log("initializing!!")},render:()=>c`<style>
        input {
          width: 100%;
        }
      </style>
      <input type="checkbox" ?checked=${t.toggle} @input=${g} />`}}export{u as default};
