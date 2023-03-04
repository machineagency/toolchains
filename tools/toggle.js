import { html } from "lit-html";

const config = {
  inports: {},
  outports: {
    toggle: {
      type: "boolean",
      value: false,
    },
  },
  state: { toggle: false },
  ui: {
    displayName: "toggle",
    width: "100px",
    height: "50px",
  },
};

function toggle(inports, outports, state) {
  function onInput(e) {
    state.toggle = e.target.checked;
    outports.toggle = e.target.checked;
  }

  const init = () => {
    console.log("initializing!!");
  };

  const render = () => {
    return html`<style>
        input {
          width: 100%;
        }
      </style>
      <input type="checkbox" ?checked=${state.toggle} @input=${onInput} />`;
  };

  return { init, render };
}

export default { config, tool: toggle };
