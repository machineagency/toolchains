import { html } from "lit-html";

const config = {
  displayName: "text",
  inports: {},
  outports: {
    text: {
      type: "string",
      value: null,
    },
  },
  view: {
    width: "200px",
    height: "50px",
  },
  state: {
    text: "hello",
  },
};

function onInput(e, state) {
  state.text = e.target.value;
  // state.outports.text.value = e.target.value;
}

function view(state) {
  return html`<style>
      input {
        width: 100%;
      }
    </style>
    <input
      type="text"
      value=${state.text}
      @input=${(e) => onInput(e, state)} />`;
}

const lifecycle = {};

export { config, view, lifecycle };
