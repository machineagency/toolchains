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
      type: "boolean",
      value: null,
    },
  },
  ui: {
    displayName: "",
    icon: "equals",
  },
};

function equals(inports, outports) {
  function inportsUpdated() {
    if (inports.a.value !== null && inports.b.value !== null) {
      outports.result.value = inports.a.value === inports.b.value;
    } else {
      outports.result.value = null;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: equals };
