import{y as r}from"./index-048f4a64.js";const a={inports:{stream:{type:"string",value:null}},outports:{},state:{log:[]},ui:{displayName:"Logger",width:"200px",height:"200px"}};function i(t,l,o){function e(){o.log.push(JSON.stringify(t.stream.value))}return{inportsUpdated:e,render:()=>r`<style>
        .container {
          display: flex;
          flex-direction: column;
          background-color: var(--black);
          gap: 1px;
          overflow: auto;
          max-height: 100%;
          height: 100%;
        }
        .container > pre {
          padding: 0.2rem;
          font-family: monospace;
          background-color: var(--tool-background);
          margin: 0;
        }
      </style>
      <div class="container">
        ${o.log.map(n=>r`<pre>${n}</pre>`)}
      </div>`}}const s={config:a,tool:i};export{s as default};
