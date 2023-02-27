import { html } from "lit-html";

export default function dataViewer(globalCallbacks) {
  const ui = {
    displayName: "data viewer",
    width: "200px",
    height: "100px",
  };

  const state = {};

  const inports = {
    data: {
      type: "object",
      value: null,
    },
  };

  const outports = {};

  function colorInput(e) {
    state.currentColor = e.target.value;
    outports.color.value = e.target.value;
  }

  const render = () => {
    return html`<div class="viewer">${JSON.stringify(inports.data)}</div>`;
  };

  return { ui, inports, outports, state, render };
}
