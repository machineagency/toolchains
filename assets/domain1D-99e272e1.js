import{y as i}from"./lit-html-b7b68613.js";const l={inports:{min:{type:"number",value:null},max:{type:"number",value:null}},outports:{domain:{type:"domain",value:null}},state:{},ui:{displayName:"Domain 1D",mini:!0}};function m(e,n,u){function a(){typeof e.min.value=="number"&&typeof e.max.value=="number"?n.domain.value={min:e.min.value,max:e.max.value}:n.domain.value=null}function t(){return i`<style>
        #container {
          display: flex;
          align-items: center;
          max-height: 100%;
          height: 100%;
        }
      </style>
      <div id="container">test</div>`}return{inportsUpdated:a,render:t}}const r={config:l,tool:m};export{r as default};
