import { html } from "lit-html";

const config = {
  inports: {},
  outports: {
    num: {
      type: "number",
      value: 1,
    },
  },
  state: { value: 1, min: 0, max: 1000, step: 1 },
  ui: {
    displayName: "Slider",
    width: "175px",
    height: "45px",
  },
};

function inputSlider(inports, outports, state) {
  function setVal(newVal) {
    state.value = Number(newVal);
    outports.num.value = state.value;
  }

  function render() {
    return html`<style>
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
          .min=${state.min}
          .max=${state.max}
          .value=${state.value}
          .step=${state.step}
          @input=${(e) => {
            setVal(e.target.value);
          }} />
        <div id="info">
          <span>
            <input
              type="number"
              .value=${state.value}
              .step=${state.step}
              .min=${state.min}
              .max=${state.max}
              @input=${(e) => setVal(e.target.value)} />
          </span>
          <span>
            <label for="config-toggle">...</label>
            <input id="config-toggle" type="checkbox" hidden />
            <div id="control-panel">
              <span class="label">min</span>
              <input
                type="number"
                .value=${state.min}
                .step=${state.step}
                @input=${(e) => (state.min = e.target.value)} />
              <span class="label">max</span>
              <input
                type="number"
                .value=${state.max}
                .step=${state.step}
                @input=${(e) => (state.max = e.target.value)} />
              <span class="label">step</span>
              <input
                type="number"
                .value=${state.step}
                @input=${(e) => (state.step = e.target.value)} />
            </div>
          </span>
        </div>
      </div>`;
  }

  return { render };
}

export default { config, tool: inputSlider };
