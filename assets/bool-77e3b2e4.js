import{y as c}from"./index-cae7d1c5.js";const r={inports:{},outports:{bool:{type:"boolean",value:!1}},state:{bool:!1},ui:{displayName:"bool",width:130,height:50}};function n(i,l,o){function t(){return c`<style>
        label {
          display: block;
          width: 100%;
          height: 100%;
          background-color: var(--${o.bool?"green":"red"});
        }
      </style>
      <label for="check"></label>
      <input
        id="check"
        @input=${e=>{o.bool=e.target.checked,l.bool.value=e.target.checked}}
        ?checked=${o.bool}
        type="checkbox"
        hidden />`}return{render:t}}const b={config:r,tool:n};export{b as default};
