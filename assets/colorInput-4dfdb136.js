import{y as n}from"./index-0a8ee395.js";const i={displayName:"Color",inports:{},outports:{color:{type:"color"}},view:{width:"200px",height:"200px"},state:{currentColor:null}};function e(o,r){console.log(o),r.currentColor=o.target.value}function a(o){return n`<style>
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
    <input
      type="color"
      value=${o.currentColor}
      @change=${r=>e(r,o)} />`}function t(o){o.currentColor=`#${Math.floor(Math.random()*16777215).toString(16)}`}const l={init:t};export{i as config,l as lifecycle,a as view};
