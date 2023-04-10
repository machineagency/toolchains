const config = {
  inports: {
    x: {
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
    icon: "square-root-variable",
  },
};

function sqrt(inports, outports) {
  function inportsUpdated() {
    if (inports.x.value !== null) {
      outports.result.value = Math.sqrt(inports.x.value);
    } else {
      outports.result.value = null;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: sqrt };
