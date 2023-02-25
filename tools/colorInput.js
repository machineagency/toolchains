import { html } from "lit-html";

const config = {
  displayName: "color",
  out: {
    id: "text",
    type: "string",
  },
  state: {
    currentColor: "#ffff00",
  },
};

function onChange(e) {
  console.log(e);
}

function view(state) {
  return html`<style>
      input[type="color"] {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: none;
        border: 0;
        padding: 0;
        cursor: pointer;
        min-height: 60px;
        min-width: 60px;
        width: 100%;
      }
      ::-webkit-color-swatch-wrapper {
        padding: 0;
      }

      ::-webkit-color-swatch {
        border: 0;
      }

      ::-moz-color-swatch,
      ::-moz-focus-inner {
        border: 0;
      }

      ::-moz-focus-inner {
        padding: 0;
      }
    </style>
    <input type="color" value=${state.currentColor} @change=${onChange} />`;
}

export { config, view };
