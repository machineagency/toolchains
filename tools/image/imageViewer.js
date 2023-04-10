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
    icon: "image",
  },
};

function imageViewer(inports, outports, state) {
  const render = () => {
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
  };

  return { render };
}

export default { config, tool: imageViewer };
