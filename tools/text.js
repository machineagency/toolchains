import { html } from "lit-html";

export default function color(globalCallbacks) {
  const ui = {
    displayName: "text",
    width: "200px",
    height: "50px",
  };

  const state = {
    text: "hello world",
  };

  const inports = {};

  const outports = {
    text: {
      type: "string",
      value: state.text,
    },
  };

  function onInput(e, state) {
    state.text = e.target.value;
  }

  const init = () => {
    globalCallbacks.log("initializing!!");
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

  return { ui, inports, outports, state, init, render };
}
