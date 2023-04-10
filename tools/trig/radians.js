const config = {
  inports: {
    degrees: {
      type: "number",
      value: null,
    },
  },
  outports: {
    radians: {
      type: "number",
      value: null,
    },
  },
  ui: {
    displayName: "Radians",
  },
};

function radians(inports, outports) {
  function inportsUpdated() {
    if (inports.degrees.value !== null) {
      outports.radians.value = (Math.PI / 180) * inports.degrees.value;
    } else {
      outports.radians.value = null;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: radians };
