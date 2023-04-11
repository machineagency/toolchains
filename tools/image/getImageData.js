const config = {
  inports: {
    dataurl: {
      type: "dataurl",
      value: null,
    },
  },
  outports: {
    imageData: {
      type: "array",
      value: null,
    },
    colorSpace: {
      type: "string",
      value: null,
    },
    width: {
      type: "number",
      value: null,
    },
    height: {
      type: "number",
      value: null,
    },
  },
  ui: {
    displayName: "Image Data",
  },
};

function getImageData(inports, outports) {
  function inportsUpdated() {
    if (!inports.dataurl.value) {
      outports.imageData.value = null;
      outports.colorSpace.value = null;
      outports.width.value = null;
      outports.height.value = null;
      return;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
      // gotta size the canvas to the image or else making the pixel array won't work
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      outports.imageData.value = imageData;
      outports.colorSpace.value = imageData.colorSpace;
      outports.width.value = imageData.width;
      outports.height.value = imageData.height;
    };

    img.src = inports.dataurl.value;
  }

  return { inportsUpdated };
}

export default { config, tool: getImageData };
