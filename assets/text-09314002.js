import{y as l}from"./index-71822258.js";function c(n){const i={displayName:"text",width:"200px",height:"50px"},t={text:"hello world"},o={},r={text:{type:"string",value:t.text}};function s(e,u){u.text=e.target.value}return{ui:i,inports:o,outports:r,state:t,init:()=>{n.log("initializing!!")},render:()=>l`<style>
        input {
          width: 100%;
        }
      </style>
      <input
        type="text"
        value=${t.text}
        @input=${e=>s(e,t)} />`}}export{c as default};
