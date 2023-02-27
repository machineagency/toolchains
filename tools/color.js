import { html } from "lit-html";

export default function color(globalCallbacks) {
  const ui = {
    displayName: "Color",
    width: "200px",
    height: "200px",
  };

  const state = {
    colors: [],
    currentColor: "#ffff00",
    num: 500000,
    floatieBoi: 25.8,
    obj: { currentColor: "#ffff00", num: 500000, floatieBoi: 25.8 },
  };

  const inports = {};

  const outports = {
    color: {
      type: "string",
      value: state.currentColor,
    },
  };

  function colorInput(e) {
    state.currentColor = e.target.value;
  }

  let localVar = Math.floor(Math.random() * 40);

  const init = () => {
    shuffle();
  };

  const resize = () => {};

  const shuffle = (e) => {
    globalCallbacks.log("shufflin");
    state.colors = new Array(15).fill(0).map(() => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });
  };

  const render = () => {
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
      <input type="color" value=${state.currentColor} @input=${colorInput} />`;
  };

  return { ui, inports, outports, state, init, resize, render };
}
