import { html } from "lit-html";

const config = {
  inports: {
    in: {
      type: "any",
      value: null,
    },
  },
  outports: {},
  state: {},
  ui: {
    displayName: "Data Viewer",
    width: 200,
    height: 40,
  },
};

function dataViewer(inports, outports, state) {
  function render() {
    return html`<style>
        pre {
          padding: 0.2rem;
          font-family: monospace;
          background-color: var(--tool-background);
          margin: 0;
          overflow: auto;
        }
      </style>
      <pre>${JSON.stringify(inports.in.value, null, 4)}</pre>`;
  }

  return { render };
}

export default { config, tool: dataViewer };
