export function addGlobalInteraction(state) {
  window.addEventListener("pointermove", (e) => {
    state.mouse = state.panZoom.toWorkspaceCoords({
      x: e.clientX,
      y: e.clientY,
    });
  });

  window.addEventListener("keydown", (e) => {
    if (!state.keysPressed.includes(e.key)) state.keysPressed.push(e.key);

    if (e.key === "Escape") {
      // Delete any loose pipe
      delete state.toolchain.pipes["loose"];
      // Clear selection
      state.selection.clear();
    }
  });

  window.addEventListener("keyup", (e) => {
    state.keysPressed.splice(state.keysPressed.indexOf(e.key), 1);
  });
}
