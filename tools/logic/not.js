const config = {
  inports: {
    in: {
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
    displayName: "not",
    mini: true,
  },
};

function notGate(inports, outports, state) {
  function inportsUpdated() {
    if (inports.in.value !== null) {
      outports.out.value = !inports.in.value;
    }
  }

  const render = () => {};

  return { inportsUpdated, render };
}

export default { config, tool: notGate };
