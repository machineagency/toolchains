export function addGlobalInteraction(state) {
  function updateMouse(e) {
    state.mouse = state.panZoom.toWorkspaceCoords({
      x: e.clientX,
      y: e.clientY,
    });
  }
  window.addEventListener("pointermove", updateMouse);
  window.addEventListener("dragover", updateMouse);

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
