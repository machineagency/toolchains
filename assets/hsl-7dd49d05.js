import{y as t}from"./index-048f4a64.js";const u={inports:{h:{type:"number",value:null},s:{type:"number",value:null},l:{type:"number",value:null}},outports:{},state:{},ui:{displayName:"HSL",width:"150px",height:"150px"}};function o(e,r,n){function l(){return t`<style>
        #color {
          background-color: hsl(
            ${e.h.value},
            ${e.s.value}%,
            ${e.l.value}%
          );
          height: 100%;
        }
      </style>
      <div id="color"></div>`}return{render:l}}const a={config:u,tool:o};export{a as default};
