function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + step * i);
  }
  return arr;
}

const config = {
  inports: {
    domain: {
      type: "domain",
      value: null,
    },
    numSteps: {
      type: "number",
      value: null,
    },
  },
  outports: {
    range: {
      type: "range",
      value: null,
    },
  },
  ui: {
    displayName: "Range",
  },
};

function range(inports, outports) {
  function inportsUpdated() {
    let domain = inports.domain.value;
    let step = inports.numSteps.value;
    if (domain && step) {
      outports.range.value = makeArr(domain.min, domain.max, step);
    }
  }

  return { inportsUpdated };
}

export default { config, tool: range };
