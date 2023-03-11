function makeArr(start, stop, numSteps) {
  var arr = [];
  var step = (stop - start) / (numSteps - 1);
  for (var i = 0; i < numSteps; i++) {
    arr.push(start + step * i);
  }
  return arr;
}

function make2d(numX, numY) {
  let arr = [];
  for (var i = 0; i < numY; i++) {
    arr.push(makeArr(0, 1, numX));
  }
  return arr;
}

const config = {
  inports: {
    image: {
      type: "image",
      value: null,
    },
  },
  outports: {
    out: {
      type: "array",
      value: make2d(10, 10),
    },
  },
  state: {},
  ui: {
    displayName: "not",
    mini: true,
  },
};

function pixelGrid(inports, outports, state) {
  const render = () => {};

  return { render };
}

export default { config, tool: pixelGrid };
