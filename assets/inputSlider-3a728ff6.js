import{y as l}from"./index-cae7d1c5.js";const t={inports:{},outports:{num:{type:"number",value:1}},state:{value:1,min:0,max:1e3,step:1},ui:{displayName:"Slider",width:175,height:45}};function o(p,r,e){function i(n){e.value=Number(n),r.num.value=e.value}function a(){return l`<style>
        #container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        * {
          box-sizing: border-box;
        }
        input[type="number"] {
          width: 100%;
        }
        #slider::-moz-range-thumb {
          height: 1rem;
          width: 1rem;
          background: var(--blue);
          border-radius: 50%;
          border: none;
        }
        #slider::-moz-range-track {
          background: var(--pipe);
          height: 5px;
          border-radius: 3px;
        }
        #slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 1rem;
          width: 1rem;
          background: var(--blue);
          border-radius: 50%;
          cursor: pointer;
          margin-top: -5px;
        }
        #slider::-webkit-slider-runnable-track {
          background: var(--port);
          height: 5px;
          border-radius: 3px;
        }
        #slider {
          appearance: none;
          width: 100%;
          padding: 0.5rem 0.25rem;
          line-height: 0;
          display: block;
          margin: 0;
        }
        #slider:focus {
          outline: none;
        }
        .label {
          font-size: 0.75rem;
          font-weight: bolder;
          background-color: var(--black);
          color: var(--tool-background);
          cursor: default;
          padding: 0 0.5rem;
          display: flex;
          align-items: center;
          justify-content: end;
        }
        #info {
          background-color: var(--black);
          color: var(--text-light);
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.2rem 0.5rem;
        }
        #control-panel {
          display: none;
          grid-template-columns: auto auto;
          position: absolute;
          left: 0;
        }
        #config-toggle:checked + #control-panel {
          display: grid;
        }
      </style>
      <div id="container">
        <input
          id="slider"
          type="range"
          .min=${e.min}
          .max=${e.max}
          .value=${e.value}
          .step=${e.step}
          @input=${n=>{i(n.target.value)}} />
        <div id="info">
          <span>
            <input
              type="number"
              .value=${e.value}
              .step=${e.step}
              .min=${e.min}
              .max=${e.max}
              @input=${n=>i(n.target.value)} />
          </span>
          <span>
            <label for="config-toggle">...</label>
            <input id="config-toggle" type="checkbox" hidden />
            <div id="control-panel">
              <span class="label">min</span>
              <input
                type="number"
                .value=${e.min}
                .step=${e.step}
                @input=${n=>e.min=n.target.value} />
              <span class="label">max</span>
              <input
                type="number"
                .value=${e.max}
                .step=${e.step}
                @input=${n=>e.max=n.target.value} />
              <span class="label">step</span>
              <input
                type="number"
                .value=${e.step}
                @input=${n=>e.step=n.target.value} />
            </div>
          </span>
        </div>
      </div>`}return{render:a}}const d={config:t,tool:o};export{d as default};
