import { html } from "lit-html";

const config = {
  inports: {
    contents: {
      type: "string",
      value: null,
    },
  },
  outports: {},
  state: { filename: null },
  ui: {
    displayName: "Download File",
    width: 150,
    height: 50,
  },
};

function downloadFile(inports, outports, state) {
  function downloadClicked() {
    const downloadLink = document.createElement("a");
    downloadLink.href =
      "data:text/plain;charset=utf-8," +
      encodeURIComponent(inports.contents.value);
    downloadLink.download = state.filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function updateInput(e) {
    state.filename = e.target.value;
  }

  const render = () => {
    return html`<style>
        .container {
          height: 100%;
          display: flex;
          flex-direction: column;
          font-family: inherit;
        }
        .fileBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          background-color: var(--blue);
          font-weight: 600;
          border-top: 1px solid var(--black);
        }
        .fileBtn:hover {
          cursor: pointer;
          background-color: var(--purple);
        }
        .fname {
          display: flex;
          border: none;
          padding: 0.3rem;
        }
      </style>
      <div class="container">
        <input
          class="fname"
          value=${state.filename}
          placeholder="Enter file name"
          @input=${updateInput}
          type="text" />
        <div class="fileBtn" @click=${downloadClicked}>
          <span>Download</span>
        </div>
      </div>`;
  };

  return { render };
}

export default { config, tool: downloadFile };
