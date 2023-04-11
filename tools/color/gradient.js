import { html } from "lit-html";

const config = {
  inports: {
    c1: {
      type: "string",
      value: null,
    },
    c2: {
      type: "string",
      value: null,
    },
    dir: {
      type: "number",
      value: 180,
    },
  },
  outports: {},
  ui: {
    displayName: "Gradient",
    width: 100,
    height: 100,
    resize: "both",
  },
};

function gradient(inports, outports) {
  const render = () => {
    return html`<style>
        .gradient {
          height: 100%;
          background-image: linear-gradient(
            ${inports.dir.value}deg,
            ${inports.c1.value ?? "green"},
            ${inports.c2.value ?? "cyan"}
          );
        }
      </style>
      <div class="gradient"></div>`;
  };

  return { render };
}

export default { config, tool: gradient };
