import { createListener } from "./utils.js";

export async function addBackgroundInteraction(svgBackground, state) {
  const listen = createListener(svgBackground);

  let down, dy, dx;

  listen("pointerdown", "#svg-layer", (e) => {
    down = true;
    dy = 0;
    dx = 0;
  });

  listen("pointermove", "#svg-layer", (e) => {
    if (!down) return;
    dx += e.movementX;
    dy += e.movementY;
  });

  listen("pointerup", "#svg-layer", (e) => {
    down = false;
    if (Math.abs(dy) < 5 && Math.abs(dx) < 5) {
      state.selection.clear();
    }
  });
}
