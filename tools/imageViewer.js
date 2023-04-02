import { html } from "lit-html";

const config = {
  inports: {
    dataurl: {
      type: "dataurl",
      value: null,
    },
  },
  outports: {},
  state: {},
  ui: {
    displayName: "Image Viewer",
    width: 200,
    height: 200,
    resize: "both",
  },
};

function imageViewer(inports, outports, state) {
  function extractPixelData(ctx) {
    let pixelData = ctx.getImageData(50, 50, 1, 1).data;
    console.log(pixelData);
  }
  function inportsUpdated() {
    const myCanvas = document.createElement("canvas");
    const ctx = myCanvas.getContext("2d");
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      console.log(img.width, img.height);
      extractPixelData(ctx);
    };
    img.src = inports.dataurl.value;
  }
  const render = () => {
    return html`<style>
        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          display: block;
        }
      </style>
      <img src=${inports.dataurl.value} />`;
  };

  return { render, inportsUpdated };
}

export default { config, tool: imageViewer };
