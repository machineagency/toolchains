import { createListener } from "./utils.js";

export function pipeInteraction(workspace, state) {
  const listen = createListener(workspace);

  listen("contextmenu", ".pipe", (e) => {
    e.preventDefault();
    console.log(e.target.dataset.pipeid);
    delete state.toolchain.pipes[e.target.dataset.pipeid];
  });
}
