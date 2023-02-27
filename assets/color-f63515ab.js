import{y as p}from"./index-71822258.js";function d(t){const n={displayName:"Color",width:"200px",height:"200px"},o={colors:[],currentColor:"#ffff00",num:5e5,floatieBoi:25.8,obj:{currentColor:"#ffff00",num:5e5,floatieBoi:25.8}},e={},c={color:{type:"string",value:o.currentColor}};function a(r){o.currentColor=r.target.value}const i=()=>{u()},l=()=>{},u=r=>{t.log("shufflin"),o.colors=new Array(15).fill(0).map(()=>`#${Math.floor(Math.random()*16777215).toString(16)}`)};return{ui:n,inports:e,outports:c,state:o,init:i,resize:l,render:()=>p`<style>
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
      <input type="color" value=${o.currentColor} @input=${a} />`}}export{d as default};
