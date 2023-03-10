import { html } from "lit-html";

const config = {
  inports: {},
  outports: {
    bool: {
      type: "boolean",
      value: false,
    },
  },
  state: { bool: false },
  ui: {
    displayName: "bool",
    width: 130,
    height: 50,
  },
};

function bool(inports, outports, state) {
  function render() {
    return html`<style>
        label {
          display: block;
          width: 100%;
          height: 100%;
          background-color: var(--${state.bool ? "green" : "red"});
        }
      </style>
      <label for="check"></label>
      <input
        id="check"
        @input=${(e) => {
          state.bool = e.target.checked;
          outports.bool.value = e.target.checked;
        }}
        ?checked=${state.bool}
        type="checkbox"
        hidden />`;
  }

  return { render };
}

export default { config, tool: bool };
