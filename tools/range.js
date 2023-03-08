import { html } from "lit-html";

function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + step * i);
  }
  return arr;
}

const config = {
  inports: {
    domain: {
      type: "domain",
      value: null,
    },
    step: {
      type: "number",
      value: null,
    },
  },
  outports: {
    range: {
      type: "range",
      value: null,
    },
  },
  state: {},
  ui: {
    displayName: "Range",
    width: "150px",
    height: "40px",
  },
};

function range(inports, outports, state) {
  function inportsUpdated() {
    let domain = inports.domain.value;
    let step = inports.step.value;
    if (domain && step) {
      outports.range.value = makeArr(domain.min, domain.max, step);
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

export default { config, tool: range };
