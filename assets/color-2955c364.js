import{y as c}from"./index-79b795f3.js";const l={inports:{},outports:{color:{type:"string",value:null}},state:{currentColor:null},ui:{displayName:"Color",width:"200px",height:"200px"}};function a(i,r,o){function e(n){o.currentColor=n.target.value,r.color.value=n.target.value}function t(){o.currentColor=o.currentColor??`#${Math.floor(Math.random()*16777215).toString(16)}`,r.color.value=o.currentColor}return{init:t,render:()=>c`<style>
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
      <input type="color" value=${o.currentColor} @input=${e} />`}}const d={config:l,tool:a};export{d as default};
