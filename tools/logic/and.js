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
    out: {
      type: "boolean",
      value: null,
    },
  },
  state: {},
  ui: {
    displayName: "and",
    mini: true,
  },
};

function andGate(inports, outports, state) {
  function inportsUpdated() {
    if (inports.a.value !== null && inports.b.value !== null) {
      outports.out.value = inports.a.value && inports.b.value;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: andGate };
