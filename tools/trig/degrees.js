const config = {
  inports: {
    radians: {
      type: "number",
      value: null,
    },
  },
  outports: {
    degrees: {
      type: "number",
      value: null,
    },
  },
  ui: {
    displayName: "Degrees",
  },
};

function degrees(inports, outports) {
  function inportsUpdated() {
    if (inports.radians.value !== null) {
      outports.degrees.value = (180 / Math.PI) * inports.radians.value;
    } else {
      outports.degrees.value = null;
    }
  }

  return { inportsUpdated };
}

export default { config, tool: degrees };
