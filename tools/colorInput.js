import { html } from "lit-html";

const config = {
  displayName: "Color",
  inports: {},
  outports: {
    color: {
      type: "color",
    },
  },
  view: {
    width: "200px",
    height: "200px",
  },
  state: {
    currentColor: null,
  },
};

function onChange(e, state) {
  console.log(e);
  state.currentColor = e.target.value;
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
        width: 100%;
        height: 100%;
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
    <input
      type="color"
      value=${state.currentColor}
      @change=${(e) => onChange(e, state)} />`;
}

function init(state) {
  state.currentColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const lifecycle = {
  init,
};

export { config, view, lifecycle };
