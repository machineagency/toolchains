import { createListener } from "./utils.js";

export function addPipeInteraction(workspace, state) {
  const listen = createListener(workspace);

  listen("contextmenu", ".pipe", (e) => {
    e.preventDefault();

    const pipeID = e.target.dataset.pipeid;
    const end = state.toolchain.pipes[pipeID].end;
    state.toolchain.tools[end.toolID].inports[end.portID].value = null;

    delete state.toolchain.pipes[pipeID];
  });
}
