const config = {
  outports: {
    ln10: {
      type: "number",
      value: Math.LN10,
    },
  },
  ui: {
    displayName: "ln 10",
  },
};

function ln10() {
  return {};
}

export default { config, tool: ln10 };
