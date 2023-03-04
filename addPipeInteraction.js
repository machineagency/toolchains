import { createListener } from "./utils.js";

export function addPipeInteraction(workspace, state) {
  const listen = createListener(workspace);

  listen("contextmenu", ".pipe", (e) => {
    e.preventDefault();
    delete state.toolchain.pipes[e.target.dataset.pipeid];
  });
}
