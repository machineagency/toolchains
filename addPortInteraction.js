import { createListener, buildPipeID } from "./utils.js";

function portConnectionPoint(state, portEl) {
  let rect = portEl.getBoundingClientRect();

  return state.panZoom.toWorkspaceCoords({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  });
}

export function queryPortCoords(state, pipeData) {
  // maybe should use the live directive?
  let startCoords, endCoords;
  if (pipeData.start) {
    let startPort = document.querySelector(
      `[data-toolid="${pipeData.start.toolID}"] [data-portside="outport"][data-portid="${pipeData.start.portID}"]`
    );
    // console.log(pipeData.start.toolID);
    // console.log(startPort);
    if (!startPort) return;
    startCoords = portConnectionPoint(state, startPort);
  } else {
    startCoords = state.mouse;
  }
  if (pipeData.end) {
    let endPort = document.querySelector(
      `[data-toolid="${pipeData.end.toolID}"] [data-portside="inport"][data-portid="${pipeData.end.portID}"]`
    );
    // console.log(pipeData.end.toolID);
    // console.log(endPort);
    if (!endPort) return;
    endCoords = portConnectionPoint(state, endPort);
  } else {
    endCoords = state.mouse;
  }

  return {
    startCoords,
    endCoords,
  };
}

export function addPortInteraction(workspace, state) {
  const listen = createListener(workspace);

  function getToolDetails(e) {
    let id = parentToolElement(e).dataset.toolid;
    return [id, state.toolchain.tools[id]];
  }

  function parentToolElement(e) {
    return e.target.closest(".tool");
  }

  function addPipe(start, end) {
    if (start.toolID == end.toolID) {
      console.log("Can't connect a tool to itself!");
      return;
    }
    let pipeID = buildPipeID(
      start.toolID,
      start.portID,
      end.toolID,
      end.portID
    );

    state.toolchain.pipes[pipeID] = { start, end };
    state.toolchain.tools[end.toolID].inports[end.portID].value =
      state.toolchain.tools[start.toolID].outports[start.portID].value;
  }

  listen("click", ".inports .port", (e) => {
    const [toolID, toolInfo] = getToolDetails(e);
    const portID = e.target.dataset.portid;

    if ("loose" in state.toolchain.pipes) {
      let start = state.toolchain.pipes["loose"].start;
      if (!start) {
        delete state.toolchain.pipes["loose"];
        return;
      }
      let end = {
        toolID: toolID,
        portID: portID,
      };

      addPipe(start, end);
      delete state.toolchain.pipes["loose"];
    } else {
      state.toolchain.pipes["loose"] = {
        end: {
          toolID: toolID,
          portID: portID,
        },
      };
    }
  });

  listen("pointerdown", ".outports .port", (e) => {
    let [toolID, toolInfo] = getToolDetails(e);
    const portID = e.target.dataset.portid;

    if ("loose" in state.toolchain.pipes) {
      let end = state.toolchain.pipes["loose"].end;
      if (!end) {
        delete state.toolchain.pipes["loose"];
        return;
      }
      let start = {
        toolID: toolID,
        portID: portID,
      };

      addPipe(start, end);
      delete state.toolchain.pipes["loose"];
    } else {
      state.toolchain.pipes["loose"] = {
        start: {
          toolID: toolID,
          portID: portID,
        },
      };
    }
  });
}
