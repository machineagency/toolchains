const config = {
  inports: {
    min: {
      type: "number",
      value: null,
    },
    max: {
      type: "number",
      value: null,
    },
  },
  outports: {
    domain: {
      type: "domain",
      value: null,
    },
  },
  ui: {
    displayName: "Domain 1D",
  },
};

function domain1D(inports, outports) {
  function inportsUpdated() {
    if (
      typeof inports.min.value == "number" &&
      typeof inports.max.value == "number"
    ) {
      outports.domain.value = {
        min: inports.min.value,
        max: inports.max.value,
      };
    } else {
      outports.domain.value = null;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: domain1D };
