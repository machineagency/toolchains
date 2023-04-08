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

  listen("contextmenu", ".pipe-background", (e) => {
    e.preventDefault();

    const pipeID = e.target.dataset.pipeid;
    if (pipeID === "loose") {
      delete state.toolchain.pipes[pipeID];
    }
  });
}
