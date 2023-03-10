import { html } from "lit-html";

const config = {
  inports: {},
  outports: {
    text: {
      type: "string",
      value: null,
    },
  },
  state: { text: "hello world" },
  ui: {
    displayName: "text",
    width: 200,
    height: 50,
  },
};

function text(inports, outports, state) {
  function onInput(e, state) {
    state.text = e.target.value;
    outports.text = e.target.value;
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
      <input
        type="text"
        value=${state.text}
        @input=${(e) => onInput(e, state)} />`;
  };

  return { init, render };
}

export default { config, tool: text };
