import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

const config = {
  inports: {
    paths: {
      type: "array",
      value: false,
    },
    bounds: {
      type: "domain2D",
      value: false,
    },
  },
  outports: {},
  ui: {
    displayName: "path3d",
    width: 500,
    height: 300,
    resize: "both",
  },
};

function path3dViewer(inports, outports, state) {
  let viewRef = createRef();

  function postInit() {
    const canvas = viewRef.value;
    const gl = canvas.getContext("webgl2");
  }

  function render() {
    return html`<canvas ${ref(viewRef)}></canvas>`;
  }

  return { render, postInit };
}

export default { config, tool: path3dViewer };
