const config = {
  outports: {
    pi: {
      type: "number",
      value: Math.PI,
    },
  },
  ui: {
    displayName: "pi",
  },
};

function pi() {
  return {};
}

export default { config, tool: pi };
