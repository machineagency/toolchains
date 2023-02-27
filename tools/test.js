import { html } from "lit-html";

export default function test(globalCallbacks) {
  const ui = {
    displayName: "Test",
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
    text: {
      type: "string",
      value: null,
    },
  };

  let localVar = Math.floor(Math.random() * 40);

  const init = () => {
    shuffle();
  };

  const resize = () => {};

  const shuffle = (e) => {
    globalCallbacks.log("shufflin!!!");
    state.colors = new Array(15).fill(0).map(() => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });
  };

  const render = () => {
    return html`<style>
        .grid-container {
          display: grid;
          grid-gap: 1px;
          grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
        }
        .grid-container > div {
          width: 100%;
          aspect-ratio: 1;
        }
        .grid-container > div:hover {
          background-color: var(--pink);
        }
      </style>
      <button @click=${shuffle}>Shuffle!</button>

      <div class="grid-container">
        ${state.colors.map(
          (color) => html`<div style="background-color: ${color};"></div>`
        )}
      </div> `;
  };

  return { ui, inports, outports, state, init, resize, render };
}
