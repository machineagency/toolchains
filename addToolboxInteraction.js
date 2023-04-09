import { createListener } from "./utils.js";

export function addToolboxInteraction(toolbox, state) {
  const listen = createListener(toolbox);

  listen("dragend", ".add-tool", (e) => {
    state.addTool(e.target.dataset.path);
  });

  listen("click", ".add-tool", (e) => {
    state.addTool(e.target.dataset.path);
  });
}
