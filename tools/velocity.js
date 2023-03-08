import { html } from "lit-html";

const config = {
  inports: {},
  outports: {},
  state: { start: 1, end: 5, steps: 20 },
  ui: {
    displayName: "Velocity",
    width: "200px",
    height: "200px",
  },
};

function velocity(inports, outports, state) {
  function update(e) {
    state[e.target.dataset.val] = Number(e.target.value);
  }

  function render() {
    return html`<style>
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
          value=${state.start}
          @change=${update} />
        <span>mm/s</span>
        <span>End</span>
        <input
          type="number"
          data-val="end"
          value=${state.end}
          @change=${update} />
        <span>mm/s</span>
        <span>Steps</span>
        <input
          type="number"
          data-val="steps"
          value=${state.steps}
          @change=${update} />
        <span>int</span>
      </div>`;
  }

  return { render };
}

export default { config, tool: velocity };
