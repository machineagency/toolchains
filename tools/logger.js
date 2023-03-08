import { html } from "lit-html";

const config = {
  inports: {
    stream: {
      type: "string",
      value: null,
    },
  },
  outports: {},
  state: { log: [] },
  ui: {
    displayName: "Logger",
    width: "200px",
    height: "200px",
  },
};

function logger(inports, outports, state) {
  function inportsUpdated() {
    state.log.push(JSON.stringify(inports.stream.value));
  }

  const render = () => {
    return html`<style>
        .container {
          display: flex;
          flex-direction: column;
          background-color: var(--black);
          gap: 1px;
          overflow: auto;
          max-height: 100%;
          height: 100%;
        }
        .container > pre {
          padding: 0.2rem;
          font-family: monospace;
          background-color: var(--tool-background);
          margin: 0;
        }
      </style>
      <div class="container">
        ${state.log.map((msg) => {
          return html`<pre>${msg}</pre>`;
        })}
      </div>`;
  };

  return { inportsUpdated, render };
}

export default { config, tool: logger };
