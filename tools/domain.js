import { html } from "lit-html";

const config = {
  inports: {
    min: {
      type: "number",
      value: null,
    },
    max: {
      type: "number",
      value: null,
    },
  },
  outports: {
    domain: {
      type: "domain",
      value: null,
    },
  },
  state: {},
  ui: {
    displayName: "Domain",
    mini: true,
  },
};

function logger(inports, outports, state) {
  function inportsUpdated() {
    if (inports.min.value && inports.max.value) {
      outports.domain.value = {
        min: inports.min.value,
        max: inports.max.value,
      };
    }
  }

  function render() {
    return html`<style>
        #container {
          display: flex;
          align-items: center;
          max-height: 100%;
          height: 100%;
        }
      </style>
      <div id="container">test</div>`;
  }

  return { inportsUpdated, render };
}

export default { config, tool: logger };
