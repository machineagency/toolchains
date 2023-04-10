const config = {
  outports: {
    e: {
      type: "number",
      value: Math.E,
    },
  },
  ui: {
    displayName: "e",
  },
};

function eConstant() {
  return {};
}

export default { config, tool: eConstant };
