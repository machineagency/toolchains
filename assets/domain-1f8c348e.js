import{y as i}from"./index-c839d3ed.js";const l={inports:{min:{type:"number",value:null},max:{type:"number",value:null}},outports:{domain:{type:"domain",value:null}},state:{},ui:{displayName:"Domain",width:"150px",height:"40px"}};function u(e,t,m){function n(){e.min.value&&e.max.value&&(t.domain.value={min:e.min.value,max:e.max.value})}function a(){return i`<style>
        #container {
          display: flex;
          align-items: center;
          max-height: 100%;
          height: 100%;
        }
      </style>
      <div id="container">test</div>`}return{inportsUpdated:n,render:a}}const r={config:l,tool:u};export{r as default};
