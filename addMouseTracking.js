import { createListener } from "./utils.js";

export const addMouseTracking = (workspace, state) => {
  const listen = createListener(workspace);

  window.addEventListener("pointermove", (e) => {
    state.mouse = state.panZoom.toWorkspaceCoords({
      x: e.clientX,
      y: e.clientY,
    });
  });

  window.addEventListener("keydown", (e) => {
    if (!state.keysPressed.includes(e.key)) state.keysPressed.push(e.key);

    // Reset selected points on escape
    if (e.key === "Escape") delete state.toolchain.pipes["loose"];
  });

  window.addEventListener("keyup", (e) => {
    state.keysPressed.splice(state.keysPressed.indexOf(e.key), 1);
  });
};
