import{y as o}from"./index-56a203ca.js";function l(n,a,r){for(var t=[],i=(a-n)/(r-1),e=0;e<r;e++)t.push(n+i*e);return t}const s={inports:{domain:{type:"domain",value:null},numSteps:{type:"number",value:null}},outports:{range:{type:"range",value:null}},state:{},ui:{displayName:"Range",mini:!0}};function m(n,a,r){function t(){let e=n.domain.value,u=n.numSteps.value;e&&u&&(a.range.value=l(e.min,e.max,u))}function i(){return o`<style>
        #container {
          display: flex;
          align-items: center;
          max-height: 100%;
          height: 100%;
        }
      </style>
      <div id="container">test</div>`}return{inportsUpdated:t,render:i}}const d={config:s,tool:m};export{d as default};
