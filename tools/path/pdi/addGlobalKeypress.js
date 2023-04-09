export const addGlobalKeypress = (state) => {
  window.addEventListener("keydown", (e) => {
    if (!state.keysPressed.includes(e.key)) state.keysPressed.push(e.key);

    // Reset selected points on escape
    if (e.key === "Escape") state.selectedPts = new Set();

    // Stop drawing on escape
    if (e.key === "Escape" && state.mode === "drawing") {
      state.drawing = false;
      state.preview = null;
    }
  });

  window.addEventListener("keyup", (e) => {
    state.keysPressed.splice(state.keysPressed.indexOf(e.key), 1);
  });
};
