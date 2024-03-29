const config = {
  inports: {
    in: {
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
    displayName: "not",
  },
};

function notGate(inports, outports) {
  function inportsUpdated() {
    if (inports.in.value !== null) {
      outports.result.value = !inports.in.value;
    } else {
      outports.result.value = null;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: notGate };
