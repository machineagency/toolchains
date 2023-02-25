import{y as e}from"./index-59651c4e.js";const t={displayName:"color",out:{id:"text",type:"string"},state:{currentColor:"#ffff00"}};function n(o){console.log(o)}function c(o){return e`<style>
      input[type="color"] {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: none;
        border: 0;
        padding: 0;
        cursor: pointer;
        min-height: 60px;
        min-width: 60px;
        width: 100%;
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
    <input type="color" value=${o.currentColor} @change=${n} />`}export{t as config,c as view};
