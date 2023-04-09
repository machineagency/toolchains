import { createListener } from "./utils.js";

export const addMouseTracking = (parentEl, state) => {
  const listen = createListener(parentEl);

  listen("pointermove", "", (e) => {
    const { x, y } = state.panZoom.svgPoint({ x: e.offsetX, y: e.offsetY });
    state.mouse = [x, y];
  });
};
