import { createListener } from "./utils.js";

export function addToolInteraction(tools, state) {
  const listen = createListener(tools);

  function getToolDetails(e) {
    let id = e.target.closest(".mod").dataset.toolid;
    return [id, state.toolchain.modules[id]];
  }

  listen("pointerdown", ".remove", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    console.log(`Removing ${toolID}`);

    // TODO: should call the module's delete lifecycle method
    delete state.toolchain.modules[toolID];
  });

  listen("pointerdown", ".drag", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    state.selection.add(toolID);
    state.transforming = true;
  });

  listen("pointermove", "", (e) => {
    if (!state.transforming) return;
    let dx = e.movementX / state.panZoom.scale();
    let dy = e.movementY / state.panZoom.scale();

    state.selection.forEach((toolID) => {
      state.toolchain.modules[toolID].pos.x += dx;
      state.toolchain.modules[toolID].pos.y += dy;
    });
  });

  listen("pointerup", "", (e) => {
    state.selection.clear();
    state.transforming = false;
  });

  listen("pointerdown", ".pin", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    toolInfo.ui.toolbar = !toolInfo.ui.toolbar;
    console.log("Toggle pin");
  });

  listen("pointerdown", ".toggle-state", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    toolInfo.ui.statePanel = !toolInfo.ui.statePanel;
    console.log("Toggle state");
  });

  listen("pointerdown", ".outports .port", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    console.log("outport");
  });
  listen("pointerdown", ".inports .port", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    console.log("inport");
  });
}
