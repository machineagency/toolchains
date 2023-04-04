import { html } from "lit-html";

const config = {
  inports: {
    file: {
      type: "string",
      value: null,
    },
  },
  outports: {},
  state: { filename: "file.txt" },
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
      "data:text/plain;charset=utf-8," + encodeURIComponent(inports.file.value);
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
        }
        .fileBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          background-color: var(--blue);
        }
        .fileBtn:hover {
          cursor: pointer;
          background-color: var(--purple);
        }
        .fname {
          display: flex;
        }
      </style>
      <div class="container">
        <div class="fileBtn" @click=${downloadClicked}>
          <span>Download File</span>
        </div>
        <div class="fname">
          <span>File Name</span>
          <input value=${state.filename} @input=${updateInput} type="text" />
        </div>
      </div>`;
  };

  return { render };
}

export default { config, tool: downloadFile };
