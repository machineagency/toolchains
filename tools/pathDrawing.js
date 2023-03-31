import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

// import pdiRoot from "./pdi/index.html";

const examplePath = [
  [0, 0],
  ["cubic", [-8, -5], [-5, -8], [-2, -11]],
  [0, -6],
  ["cubic", [2, -11], [5, -8], [8, -5]],
  [0, 0],
];

const config = {
  inports: {},
  outports: {
    paths: {
      type: "array",
      value: false,
    },
  },
  state: {
    paths: {
      uniqueName: examplePath,
    },
  },
  ui: {
    displayName: "Path",
    width: 500,
    height: 400,
    resize: "both",
  },
};

function pathDrawing(inports, outports, state) {
  let pdiRef = createRef();

  function setPaths(paths) {
    state.paths = paths;
    outports.paths.value = paths;
  }

  function postInit() {
    let iframe = document.createElement("iframe");
    iframe.src = "./tools/pdi/index.html";
    // iframe.src = pdiRoot;

    iframe.onload = () => {
      iframe.contentWindow.state.paths = state.paths;
      iframe.contentWindow.setPaths = setPaths;
    };

    pdiRef.value.appendChild(iframe);
  }

  function render() {
    return html`<style>
        #pdi {
          display: block;
          border: none;
          height: 100%;
          width: 100%;
        }

        iframe {
          display: block;
          border: none;
          height: 100%;
          width: 100%;
        }
      </style>
      <div id="pdi" ${ref(pdiRef)}></div>`;
  }

  return { render, postInit };
}

export default { config, tool: pathDrawing };
