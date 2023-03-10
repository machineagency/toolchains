import { html } from "lit-html";

const config = {
  inports: {
    text: {
      type: "string",
      value: "asdf",
    },
    num: {
      type: "number",
      value: 57,
    },
    bool: {
      type: "boolean",
      value: false,
    },
  },
  outports: {
    text: {
      type: "string",
      value: "asdf",
    },
    num: {
      type: "number",
      value: 57,
    },
    bool: {
      type: "boolean",
      value: false,
    },
  },
  state: {
    colors: [],
    currentColor: "#ffff00",
    num: 500000,
    floatieBoi: 25.8,
    obj: { currentColor: "#ffff00", num: 500000, floatieBoi: 25.8 },
  },
  ui: {
    displayName: "Test",
    width: 200,
    height: 200,
  },
};

function test(inports, outports, state) {
  let localVar = Math.floor(Math.random() * 40);

  const init = () => {
    shuffle();
  };

  const resize = () => {};

  const shuffle = (e) => {
    state.colors = new Array(30).fill(0).map(() => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });
  };

  const render = () => {
    return html`<style>
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
          grid-auto-rows: auto;
          flex: 1;
        }
        .grid-container > div {
          width: 100%;
        }
        .grid-container > div:hover {
          background-color: var(--pink);
        }
        button {
          width: 100%;
        }
      </style>
      <div class="container">
        <div class="grid-container">
          ${state.colors.map(
            (color) => html`<div style="background-color: ${color};"></div>`
          )}
        </div>
        <button @click=${shuffle}>Shuffle!</button>
      </div>`;
  };

  return { init, resize, render };
}

export default { config, tool: test };
