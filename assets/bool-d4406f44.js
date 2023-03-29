import{y as r}from"./index-56a203ca.js";const c={inports:{},outports:{bool:{type:"boolean",value:!1}},state:{bool:!1},ui:{displayName:"bool",width:130,height:50,resize:"both"}};function i(n,l,o){function t(){return r`<style>
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
        hidden />`}return{render:t}}const a={config:c,tool:i};export{a as default};
