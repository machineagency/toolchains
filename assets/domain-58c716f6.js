import{y as i}from"./index-f35f512e.js";const l={inports:{min:{type:"number",value:null},max:{type:"number",value:null}},outports:{domain:{type:"domain",value:null}},state:{},ui:{displayName:"Domain",mini:!0}};function u(e,n,m){function t(){e.min.value&&e.max.value&&(n.domain.value={min:e.min.value,max:e.max.value})}function a(){return i`<style>
        #container {
          display: flex;
          align-items: center;
          max-height: 100%;
          height: 100%;
        }
      </style>
      <div id="container">test</div>`}return{inportsUpdated:t,render:a}}const r={config:l,tool:u};export{r as default};
