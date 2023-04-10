import { createListener } from "./utils.js";

export function addPipeInteraction(workspace, state) {
  const listen = createListener(workspace);

  listen("contextmenu", ".pipe", (e) => {
    e.preventDefault();

    const pipeID = e.target.dataset.pipeid;
    const end = state.toolchain.pipes[pipeID].end;
    const endTool = state.toolchain.tools[end.toolID];
    endTool.inports[end.portID].value = null;

    if ("inportsUpdated" in endTool.lifecycle) {
      // run the inports updated method when a pipe is disconnected
      endTool.lifecycle.inportsUpdated();
    }
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
