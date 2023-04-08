import { createListener } from "./utils.js";
import { html, render } from "lit-html";

function contextView(x, y) {
  return html`<input
    id="context-box"
    type="text"
    placeholder="search..."
    style="
      --x:${x}px;
      --y:${y}px;" />`;
}

export async function addBackgroundInteraction(svgBackground, state) {
  const listen = createListener(svgBackground);

  let down, dy, dx;

  let ctxContainer = document.getElementById("context-box-container");

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

  listen("contextmenu", "#svg-layer", (e) => {
    e.preventDefault();
    if (state.toolchain.pipes["loose"]) {
      delete state.toolchain.pipes["loose"];
    }

    // render(contextView(e.offsetX, e.offsetY), ctxContainer);
  });
}
