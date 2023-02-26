import{y as i}from"./index-0a8ee395.js";const p={displayName:"text",inports:{},outports:{text:{type:"string",value:null}},view:{width:"200px",height:"50px"},state:{text:"hello"}};function n(t,e){e.text=t.target.value}function l(t){return i`<style>
      input {
        width: 100%;
      }
    </style>
    <input
      type="text"
      value=${t.text}
      @input=${e=>n(e,t)} />`}const u={};export{p as config,u as lifecycle,l as view};
