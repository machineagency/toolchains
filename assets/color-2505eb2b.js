import{y as c}from"./index-13e005d8.js";function s(l){const n={displayName:"Color",width:"200px",height:"200px"},o={currentColor:"#ffff00"},e={},r={color:{type:"string",value:null}};function a(t){o.currentColor=t.target.value,r.color.value=t.target.value}return{ui:n,inports:e,outports:r,state:o,init:()=>{o.currentColor=`#${Math.floor(Math.random()*16777215).toString(16)}`,r.color.value=o.currentColor},render:()=>c`<style>
        input[type="color"] {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
        ::-webkit-color-swatch-wrapper {
          padding: 0;
        }

        ::-webkit-color-swatch {
          border: 0;
        }

        ::-moz-color-swatch,
        ::-moz-focus-inner {
          border: 0;
        }

        ::-moz-focus-inner {
          padding: 0;
        }
      </style>
      <input type="color" value=${o.currentColor} @input=${a} />`}}export{s as default};
