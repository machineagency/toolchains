import { html } from "lit-html";

const config = {
  inports: {
    d1: {
      type: "domain1D",
      value: null,
    },
    d2: {
      type: "domain1D",
      value: null,
    },
  },
  outports: {
    domain2d: {
      type: "domain2D",
      value: null,
    },
  },
  state: {},
  ui: {
    displayName: "Domain 2D",
    mini: true,
  },
};

function domain2D(inports, outports, state) {
  function inportsUpdated() {
    if (inports.d1.value && inports.d2.value) {
      outports.domain2d.value = {
        d1: inports.d1.value,
        d2: inports.d2.value,
      };
    }
  }

  function render() {
    return html``;
  }

  return { inportsUpdated, render };
}

export default { config, tool: domain2D };
