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
  state: {},
  ui: {
    displayName: "Gradient",
    width: 200,
    height: 200,
  },
};

function gradient(inports, outports, state) {
  const resize = () => {};

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

  return { resize, render };
}

export default { config, tool: gradient };
