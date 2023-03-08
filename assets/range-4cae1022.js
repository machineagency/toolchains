import{y as l}from"./index-c839d3ed.js";function u(t,a,r){for(var n=[],i=(a-t)/(r-1),e=0;e<r;e++)n.push(t+i*e);return n}const p={inports:{domain:{type:"domain",value:null},step:{type:"number",value:null}},outports:{range:{type:"range",value:null}},state:{},ui:{displayName:"Range",width:"150px",height:"40px"}};function s(t,a,r){function n(){let e=t.domain.value,o=t.step.value;e&&o&&(a.range.value=u(e.min,e.max,o))}function i(){return l`<style>
        #container {
          display: flex;
          align-items: center;
          max-height: 100%;
          height: 100%;
        }
      </style>
      <div id="container">test</div>`}return{inportsUpdated:n,render:i}}const m={config:p,tool:s};export{m as default};
