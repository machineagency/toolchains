import { html } from "lit-html";

const config = {
  displayName: "toggle",

  out: {
    id: "bool",
    type: "boolean",
  },
  state: {
    toggled: true,
  },
};

function onClick(e) {
  console.log(e);
}

function view(state) {
  return html`<style>
      input[type="checkbox"] {
        height: 20px;
        width: 20px;
        margin: 0;
      }
    </style>
    <input type="checkbox" @click=${onClick} />`;
}

export { config, view };
