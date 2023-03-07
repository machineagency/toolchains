import { createListener } from "./utils.js";

export function addToolboxInteraction(toolbox, state) {
  const listen = createListener(toolbox);

  listen("pointerdown", ".add-tool", (e) => {
    state.addTool(e.target.dataset.tooltype);
  });
}
