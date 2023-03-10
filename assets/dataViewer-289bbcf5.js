import{y as o}from"./index-cae7d1c5.js";const r={inports:{in:{type:"any",value:null}},outports:{},state:{},ui:{displayName:"Data Viewer",width:200,height:40}};function a(t,n,i){function e(){return o`<style>
        pre {
          padding: 0.2rem;
          font-family: monospace;
          background-color: var(--tool-background);
          margin: 0;
          overflow: auto;
        }
      </style>
      <pre>${JSON.stringify(t.in.value,null,4)}</pre>`}return{render:e}}const u={config:r,tool:a};export{u as default};
