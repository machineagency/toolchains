import { svg } from "lit-html";

function portConnectionPoint(state, portEl) {
  let rect = portEl.getBoundingClientRect();

  return state.panZoom.toWorkspaceCoords({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  });
}

function queryPortCoords(state, pipeData) {
  let startCoords, endCoords;
  if (pipeData.start) {
    let startPort = document.querySelector(
      `[data-toolid="${pipeData.start.toolID}"] [data-portside="outport"][data-portid="${pipeData.start.portID}"]`
    );
    if (!startPort) return;
    startCoords = portConnectionPoint(state, startPort);
  } else {
    startCoords = state.mouse;
  }
  if (pipeData.end) {
    let endPort = document.querySelector(
      `[data-toolid="${pipeData.end.toolID}"] [data-portside="inport"][data-portid="${pipeData.end.portID}"]`
    );
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

function calculatePipeBezier(pipeInfo) {
  let start = pipeInfo.startCoords;
  let end = pipeInfo.endCoords;

  return `M${start.x},${start.y}
    C${start.x + 100},${start.y}
    ${end.x - 100},${end.y}
    ${end.x},${end.y}`;
}

export function pipesView(state) {
  return Object.entries(state.toolchain.pipes).map(([pipeID, pipeData]) => {
    let portCoords = queryPortCoords(state, pipeData);
    if (!portCoords) return;
    let pipeD = calculatePipeBezier(portCoords);

    return svg`<path class="pipe-background" data-pipeid=${pipeID} d="${pipeD}" /><path class="pipe" data-pipeid=${pipeID} d="${pipeD}" />`;
  });
}
