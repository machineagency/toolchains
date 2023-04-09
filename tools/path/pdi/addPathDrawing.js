import { createListener, makeID } from "./utils.js";

export const addPathDrawing = (parentEl, state) => {
  const listen = createListener(parentEl);
  let dragged = false;

  listen("pointerdown", "", (e) => {
    dragged = false;
  });

  listen("pointermove", "", (e) => {
    dragged = true;
    const { x, y } = state.panZoom.svgPoint({ x: e.offsetX, y: e.offsetY });
    state.preview = [x, y];
  });

  listen("pointerup", "", (e) => {
    if (e.button === 2) return;
    if (dragged) return;
    if (state.mode !== "drawing") return;

    const { x, y } = state.panZoom.svgPoint({ x: e.offsetX, y: e.offsetY });

    if (!state.drawing) {
      state.drawing = true;
      const id = makeID(5);
      state.drawingID = id;
      state.paths[id] = [[x, y]];
    } else {
      state.paths[state.drawingID].push([x, y]);
    }
    state.dispatch();
  });
};
