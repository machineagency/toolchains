import { html } from "lit-html";

const config = {
  inports: {},
  outports: {
    dataUrl: {
      type: "dataurl",
      value: null,
    },
  },
  state: { file: null },
  ui: {
    displayName: "Upload File",
    width: 150,
    height: 50,
    icon: "upload",
  },
};

function uploadFile(inports, outports, state) {
  function doUpload(e) {
    let file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      state.file = fileReader.result;
      outports.dataUrl.value = fileReader.result;
    };
  }

  function uploadClicked() {
    let fileInputElement = document.createElement("input");

    fileInputElement.setAttribute("type", "file");
    fileInputElement.style.display = "none";

    document.body.appendChild(fileInputElement);
    fileInputElement.click();
    fileInputElement.onchange = doUpload;
    document.body.removeChild(fileInputElement);
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
          font-weight: 600;
        }
        .fileBtn:hover {
          cursor: pointer;
          background-color: var(--purple);
        }
      </style>
      <div class="container">
        <div class="fileBtn" @click=${uploadClicked}>
          <span>Upload File</span>
        </div>
      </div>`;
  };

  return { render };
}

export default { config, tool: uploadFile };
