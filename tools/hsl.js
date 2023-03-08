import { html } from "lit-html";

const config = {
  inports: {
    h: {
      type: "number",
      value: null,
    },
    s: {
      type: "number",
      value: null,
    },
    l: {
      type: "number",
      value: null,
    },
  },
  outports: {},
  state: {},
  ui: {
    displayName: "HSL",
    width: "150px",
    height: "150px",
  },
};

function hsl(inports, outports, state) {
  function render() {
    return html`<style>
        #color {
          background-color: hsl(
            ${inports.h.value},
            ${inports.s.value}%,
            ${inports.l.value}%
          );
          height: 100%;
        }
      </style>
      <div id="color"></div>`;
  }

  return { render };
}

export default { config, tool: hsl };
