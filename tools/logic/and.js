const config = {
  inports: {
    a: {
      type: "boolean",
      value: null,
    },
    b: {
      type: "boolean",
      value: null,
    },
  },
  outports: {
    result: {
      type: "boolean",
      value: null,
    },
  },
  ui: {
    displayName: "and",
  },
};

function andGate(inports, outports) {
  function inportsUpdated() {
    if (inports.a.value !== null && inports.b.value !== null) {
      outports.result.value = inports.a.value && inports.b.value;
    } else {
      outports.result.value = null;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: andGate };
