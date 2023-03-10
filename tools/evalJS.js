import { html } from "lit-html";

const config = {
  inports: {
    js: {
      type: "string",
      value: null,
    },
  },
  outports: {},
  state: {},
  ui: {
    displayName: "Eval",
    width: 200,
    height: 100,
  },
};

function evalJS(inports, outports, state) {
  let output;
  function inportsUpdated() {
    console.log("updated");
    try {
      output = JSON.stringify(eval(inports.js.value), null, "\t");
    } catch {
      output = "error";
    }
  }

  function render() {
    return html`<style>
        #output {
          padding: 0.2rem;
          font-size: 1rem;
          font-family: monospace;
        }
      </style>
      <div id="output">${output}</div>`;
  }

  return { inportsUpdated, render };
}

export default { config, tool: evalJS };
