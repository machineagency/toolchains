import{y as p}from"./index-c839d3ed.js";const s={inports:{},outports:{},state:{start:1,end:5,steps:20},ui:{displayName:"Velocity",width:"200px",height:"200px"}};function r(i,o,t){function a(n){t[n.target.dataset.val]=Number(n.target.value)}function e(){return p`<style>
        .container {
          display: grid;
          grid-template-columns: auto auto auto;
          width: fit-content;
          grid-gap: 0.2rem;
          margin: 0.2rem auto;
        }
        input[type="number"] {
          width: 30px;
        }
      </style>
      <div class="container">
        <span>Start</span>
        <input
          type="number"
          data-val="start"
          value=${t.start}
          @change=${a} />
        <span>mm/s</span>
        <span>End</span>
        <input
          type="number"
          data-val="end"
          value=${t.end}
          @change=${a} />
        <span>mm/s</span>
        <span>Steps</span>
        <input
          type="number"
          data-val="steps"
          value=${t.steps}
          @change=${a} />
        <span>int</span>
      </div>`}return{render:e}}const d={config:s,tool:r};export{d as default};
