const config = {
  inports: {
    width: {
      type: "number",
      value: null,
    },
    height: {
      type: "number",
      value: null,
    },
    r: {
      type: "array",
      value: null,
    },
    g: {
      type: "array",
      value: null,
    },
    b: {
      type: "array",
      value: null,
    },
    a: {
      type: "array",
      value: null,
    },
  },
  outports: {
    imageData: {
      type: "object",
      value: null,
    },
  },
  ui: {
    displayName: "Construct Image",
  },
};

function constructImageData(inports, outports) {
  function inportsUpdated() {
    const width = inports.width.value;
    const height = inports.height.value;
    if (width === null || height === null) {
      return;
    }

    let imageData = new ImageData(width, height);

    let index = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] = inports.r.value ? inports.r.value[index] : 0;
      imageData.data[i + 1] = inports.g.value ? inports.g.value[index] : 0;
      imageData.data[i + 2] = inports.b.value ? inports.b.value[index] : 0;
      imageData.data[i + 3] = inports.a.value ? inports.a.value[index] : 255;
      index += 1;
    }

    outports.imageData.value = imageData;
  }

  return { inportsUpdated };
}

export default { config, tool: constructImageData };
