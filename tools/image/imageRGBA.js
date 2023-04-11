const config = {
  inports: {
    imageData: {
      type: "object",
      value: null,
    },
  },
  outports: {
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
  ui: {
    displayName: "RGBA",
  },
};

function imageRGBA(inports, outports) {
  function inportsUpdated() {
    const imageData = inports.imageData.value;
    if (!imageData) {
      outports.r.value = null;
      outports.g.value = null;
      outports.b.value = null;
      outports.a.value = null;

      return;
    }

    let r = [];
    let g = [];
    let b = [];
    let a = [];

    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      r.push(pixels[i + 0]);
      g.push(pixels[i + 1]);
      b.push(pixels[i + 2]);
      a.push(pixels[i + 3]);
    }

    outports.r.value = r;
    outports.g.value = g;
    outports.b.value = b;
    outports.a.value = a;
  }

  return { inportsUpdated };
}

export default { config, tool: imageRGBA };
