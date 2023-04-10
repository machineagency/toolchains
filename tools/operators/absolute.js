const config = {
  inports: {
    a: {
      type: "number",
      value: null,
    },
  },
  outports: {
    result: {
      type: "number",
      value: null,
    },
  },
  ui: {
    displayName: "abs",
  },
};

function absolute(inports, outports) {
  function inportsUpdated() {
    if (inports.a.value !== null) {
      outports.result.value = Math.abs(inports.a.value);
    } else {
      outports.result.value = null;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: absolute };
