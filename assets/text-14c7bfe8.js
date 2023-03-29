import{y as r}from"./index-56a203ca.js";const l={inports:{},outports:{text:{type:"string",value:null}},state:{text:"hello world"},ui:{displayName:"text",width:200,height:50}};function u(s,n,e){function i(t,o){o.text=t.target.value,n.text=t.target.value}return{init:()=>{console.log("initializing!!")},render:()=>r`<style>
        input {
          width: 100%;
        }
      </style>
      <input
        type="text"
        value=${e.text}
        @input=${t=>i(t,e)} />`}}const c={config:l,tool:u};export{c as default};
