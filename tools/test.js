import { html } from "lit-html";

const config = {
  displayName: "Test",
  inports: {},
  outports: {
    text: {
      type: "string",
      value: null,
    },
  },
  view: {
    width: "200px",
    height: "200px",
  },
  state: {
    colors: [],
    currentColor: "#ffff00",
    num: 500000,
    floatieBoi: 25.8,
    obj: { currentColor: "#ffff00", num: 500000, floatieBoi: 25.8 },
  },
};

function view(state) {
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
    <div class="grid-container">
      ${state.colors.map(
        (color) => html`<div style="background-color: ${color};"></div>`
      )}
    </div> `;
}

function init(state) {
  console.log(state);
  state.colors = new Array(15).fill(0).map(() => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  });
}

const lifecycle = {
  init,
};

export { config, view, lifecycle };
