import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

// import pdiRoot from "./pdi/index.html";

// const examplePath = [
//   [0, 0],
//   ["cubic", [-8, -5], [-5, -8], [-2, -11]],
//   [0, -6],
//   ["cubic", [2, -11], [5, -8], [8, -5]],
//   [0, 0],
// ];

const examplePath = {
  uniqueName: [
    [20.79754361906341, 31.322407527271597],
    [
      "cubic",
      [0.9120304496474905, 19.653355994896398],
      [8.254315681576973, 12.328390371306426],
      [15.59660091350645, 5.003424747716446],
    ],
    [20.558624076962715, 17.70405649374295],
    [
      "cubic",
      [26.651046206275865, 5.399755956633573],
      [32.86292636035573, 11.49217459337945],
      [39.07480651443559, 17.58459323012533],
    ],
    [20.79754361906341, 31.322407527271597],
  ],
};

const config = {
  inports: {
    bounds: {
      type: "domain2D",
      value: null,
    },
  },
  outports: {
    paths: {
      type: "array",
      value: false,
    },
  },
  state: { paths: examplePath },
  ui: {
    displayName: "Path",
    width: 500,
    height: 400,
    resize: "both",
  },
};

function pathDrawing(inports, outports, state) {
  let pdiRef = createRef();

  let updateBounds;

  function inportsUpdated() {
    updateBounds(inports.bounds.value);
  }

  function setPaths(paths) {
    state.paths = paths;
    outports.paths.value = paths;
  }

  function postInit() {
    let iframe = document.createElement("iframe");
    iframe.src = "./tools/path/pdi/index.html";

    iframe.onload = () => {
      let pWindow = iframe.contentWindow;
      pWindow.state.paths = state.paths;
      pWindow.setPaths = setPaths;
      updateBounds = (bounds) => pWindow.setBounds(bounds);
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

  return { render, postInit, inportsUpdated };
}

export default { config, tool: pathDrawing };
