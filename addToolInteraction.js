import { update } from "lodash";
import { createListener } from "./utils.js";

export function addToolInteraction(workspace, state) {
  const listen = createListener(workspace);

  function getToolDetails(e) {
    let id = parentToolElement(e).dataset.toolid;
    return [id, state.toolchain.tools[id]];
  }

  function parentToolElement(e) {
    return e.target.closest(".tool");
  }

  function getConnectedPipes(toolID) {
    let pipes = Object.entries(state.toolchain.pipes).filter(
      ([pipeID, pipeData]) => {
        return pipeData.start.toolID == toolID || pipeData.end.toolID == toolID;
      }
    );
    return pipes;
  }

  listen("dblclick", ".tool-displayname", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    console.log(toolID);

    e.target.contentEditable = true;

    e.target.addEventListener("focusout", (e) => {
      console.log("blurring");
      state.toolchain.tools[toolID].ui.displayName = e.target.textContent;
      e.target.contentEditable = false;
    });

    e.target.addEventListener("keypress", (e) => {
      if (e.code === "Enter") {
        e.preventDefault();
        e.target.blur();
      }
    });
  });

  listen("pointerdown", ".remove", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    console.log(`Removing ${toolID}`);
    let pipes = getConnectedPipes(toolID);
    pipes.forEach(([pipeID, pipe]) => {
      if (pipe.end.toolID != toolID) {
        let endTool = state.toolchain.tools[pipe.end.toolID];
        let endPort = endTool.inports[pipe.end.portID];
        endPort.value = null;
      }
      delete state.toolchain.pipes[pipeID];
    });

    // TODO: should call the tool's remove lifecycle method
    delete state.toolchain.tools[toolID];
  });

  listen("pointerdown", ".drag", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);

    // Get the parent tool and reappend it to the parentNode,
    // this brings it to the front
    // Nope, this causes issues with deleting tools - not entirely sure why
    // let parentTool = parentToolElement(e);
    // parentTool.parentNode.appendChild(parentTool);
    if (!e.shiftKey && !state.selection.has(toolID)) {
      state.selection.clear();
    }
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
    if (state.selection.size == 1) {
      state.selection.clear();
    }
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
}
