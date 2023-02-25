import { html } from "lit-html";

const config = {
  displayName: "text",
  out: {
    id: "text",
    type: "string",
  },
  state: {
    text: "#asdf",
  },
};

function onKeydown(e) {
  console.log(e);
}

function view(state) {
  return html`<input type="text" @keydown=${onKeydown} />`;
}

export { config, view };
