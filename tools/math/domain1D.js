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
    displayName: "Domain 1D",
    mini: true,
  },
};

function domain1D(inports, outports, state) {
  function inportsUpdated() {
    if (
      typeof inports.min.value == "number" &&
      typeof inports.max.value == "number"
    ) {
      outports.domain.value = {
        min: inports.min.value,
        max: inports.max.value,
      };
    } else {
      outports.domain.value = null;
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

export default { config, tool: domain1D };
