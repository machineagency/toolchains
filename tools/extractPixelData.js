import { html } from "lit-html";

const config = {
  inports: {
    dataurl: {
      type: "dataurl",
      value: null,
    },
  },
  outports: {
    pixelData: {
      type: "array",
      value: null,
    },
  },
  state: {},
  ui: {
    displayName: "Pixel Data",
    width: 200,
    height: 200,
    resize: "both",
  },
};

function extractPixelData(inports, outports, state) {
  function makePixelArray(ctx, width, height) {
    let pixels = Array(height)
      .fill()
      .map(() => Array(width).fill(0));

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const imageData = ctx.getImageData(col, row, 1, 1);
        let [r, g, b, a] = imageData.data;
        pixels[row][col] = 0.299 * r + 0.587 * g + 0.114 * b; // Grayscale
      }
    }
    outports.pixelData.value = pixels;
  }

  function inportsUpdated() {
    const myCanvas = document.createElement("canvas");
    const ctx = myCanvas.getContext("2d", { willReadFrequently: true });
    const img = new Image();
    img.onload = function () {
      // gotta size the canvas to the image or else making the pixel array won't work
      myCanvas.width = img.width;
      myCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      makePixelArray(ctx, img.width, img.height);
    };
    img.src = inports.dataurl.value;
  }

  function render() {
    return html`<style>
        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          display: block;
          image-rendering: pixelated;
        }
      </style>
      <img draggable="false" src=${inports.dataurl.value} />`;
  }

  return { render, inportsUpdated };
}

export default { config, tool: extractPixelData };
