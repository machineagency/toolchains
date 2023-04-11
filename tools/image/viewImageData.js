import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

const config = {
  inports: {
    imageData: {
      type: "object",
      value: null,
    },
  },
  ui: {
    displayName: "View Image Data",
    icon: "image",
    width: 200,
    height: 200,
    resize: "both",
  },
};

function viewImageData(inports, outports) {
  let canvasRef = createRef();

  function inportsUpdated() {
    const imageData = inports.imageData.value;

    if (imageData === null) {
      return;
    }

    const canvas = canvasRef.value;

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    const ctx = canvas.getContext("2d");

    ctx.putImageData(imageData, 0, 0);
  }

  function render() {
    return html`<style>
        canvas {
          width: 100%;
          display: block;
        }
      </style>
      <canvas draggable="false" ${ref(canvasRef)}></canvas>`;
  }

  return { render, inportsUpdated };
}

export default { config, tool: viewImageData };
