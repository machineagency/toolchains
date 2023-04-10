const config = {
  inports: {
    a: {
      type: "number",
      value: null,
    },
    b: {
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
    displayName: "",
    icon: "minus",
  },
};

function subtract(inports, outports) {
  function inportsUpdated() {
    if (inports.a.value !== null && inports.b.value !== null) {
      outports.result.value = inports.a.value - inports.b.value;
    } else {
      outports.result.value = null;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: subtract };
