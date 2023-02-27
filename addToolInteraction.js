import { createListener } from "./utils.js";

export function addToolInteraction(tools, state) {
  const listen = createListener(tools);

  function getToolDetails(e) {
    let id = parentToolElement(e).dataset.toolid;
    return [id, state.toolchain.tools[id]];
  }

  function parentToolElement(e) {
    return e.target.closest(".tool");
  }

  listen("pointerdown", ".remove", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    console.log(`Removing ${toolID}`);

    // TODO: should call the tool's remove lifecycle method
    delete state.toolchain.tools[toolID];
  });

  listen("pointerdown", ".drag", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);

    // Get the parent tool and reappend it to the parentNode,
    // this brings it to the front
    let parentTool = parentToolElement(e);
    parentTool.parentNode.appendChild(parentTool);

    state.selection.add(toolID);
    state.transforming = true;
  });

  listen("pointermove", "", (e) => {
    if (!state.transforming) return;
    let dx = e.movementX / state.panZoom.scale();
    let dy = e.movementY / state.panZoom.scale();

    state.selection.forEach((toolID) => {
      state.toolchain.tools[toolID].pos.x += dx;
      state.toolchain.tools[toolID].pos.y += dy;
    });
  });

  listen("pointerup", "", (e) => {
    state.selection.clear();
    state.transforming = false;
  });

  listen("pointerdown", ".pin", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    toolInfo.uiState.toolbar = !toolInfo.uiState.toolbar;
  });

  listen("pointerdown", ".toggle-state", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    toolInfo.uiState.statePanel = !toolInfo.uiState.statePanel;
    console.log("Toggle state");
  });

  listen("pointerdown", ".outports .port", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    const portID = e.target.dataset.portid;
    console.log(`${toolID} outport ${portID}`);
  });
  listen("pointerdown", ".inports .port", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    const portID = e.target.dataset.portid;
    console.log(`${toolID} inport ${portID}`);
  });
}
