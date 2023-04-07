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

  // listen("dblclick", ".tool-displayname", (e) => {
  //   let [toolID, toolInfo] = getToolDetails(e);

  //   e.target.contentEditable = true;

  //   e.target.addEventListener("focusout", (e) => {
  //     state.toolchain.tools[toolID].ui.displayName = e.target.textContent;
  //     e.target.contentEditable = false;
  //   });

  //   e.target.addEventListener("keypress", (e) => {
  //     if (e.code === "Enter") {
  //       e.preventDefault();
  //       e.target.blur();
  //     }
  //   });
  // });

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

  listen("pointerdown", ".collapse", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    toolInfo.ui.mini = !toolInfo.ui.mini;
    console.log(toolInfo);
  });

  listen("pointerdown", ".resize-handle", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    state.resizing = true;
    state.selection.add(toolID);
  });

  function startDrag(e) {
    let [toolID, toolInfo] = getToolDetails(e);

    if (e.shiftKey) state.selection.add(toolID);

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
  }

  listen("pointerdown", ".tool-displayname", (e) => {
    startDrag(e);
  });

  listen("pointerdown", ".toolbar", (e) => {
    startDrag(e);
  });

  listen("pointermove", "", (e) => {
    let dx = e.movementX / state.panZoom.scale();
    let dy = e.movementY / state.panZoom.scale();

    if (state.transforming) {
      state.selection.forEach((toolID) => {
        state.toolchain.tools[toolID].pos.x += dx;
        state.toolchain.tools[toolID].pos.y += dy;
      });
    } else if (state.resizing) {
      state.selection.forEach((toolID) => {
        let toolTo = state.toolchain.tools[toolID];
        toolTo.ui.width += dx;
        toolTo.ui.height += dy;
        if ("onResize" in toolTo.lifecycle) toolTo.lifecycle.onResize();
      });
    }
  });

  listen("pointerup", "", (e) => {
    if ((state.transforming || state.resizing) && state.selection.size == 1) {
      if (!e.shiftKey) state.selection.clear();
    }

    state.transforming = false;
    state.resizing = false;
  });

  // listen("pointerdown", ".pin", (e) => {
  //   let [toolID, toolInfo] = getToolDetails(e);
  //   toolInfo.uiState.toolbar = !toolInfo.uiState.toolbar;
  // });

  // listen("pointerdown", ".toggle-state", (e) => {
  //   let [toolID, toolInfo] = getToolDetails(e);
  //   toolInfo.uiState.statePanel = !toolInfo.uiState.statePanel;
  //   console.log("Toggle state");
  // });
}
