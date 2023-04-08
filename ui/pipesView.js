import { svg } from "lit-html";

function portConnectionPoint(state, portEl) {
  let rect = portEl.getBoundingClientRect();

  return state.panZoom.toWorkspaceCoords({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  });
}

function queryPortCoords(state, pipeData) {
  let startCoords = null;
  let endCoords = null;
  let inProgress = false;
  if (pipeData.start) {
    let startPort = document.querySelector(
      `[data-toolid="${pipeData.start.toolID}"] [data-portside="outport"][data-portid="${pipeData.start.portID}"]`
    );
    if (!startPort) return;
    startCoords = portConnectionPoint(state, startPort);
  } else {
    startCoords = state.mouse;
    inProgress = true;
  }
  if (pipeData.end) {
    let endPort = document.querySelector(
      `[data-toolid="${pipeData.end.toolID}"] [data-portside="inport"][data-portid="${pipeData.end.portID}"]`
    );
    if (!endPort) return;
    endCoords = portConnectionPoint(state, endPort);
  } else {
    endCoords = state.mouse;
    inProgress = true;
  }

  return {
    startCoords: startCoords,
    endCoords: endCoords,
    inProgress: inProgress,
  };
}

function calculatePipeBezier(start, end) {
  return `M${start.x},${start.y}
    C${start.x + 100},${start.y}
    ${end.x - 100},${end.y}
    ${end.x},${end.y}`;
}

export function pipesView(state) {
  return Object.entries(state.toolchain.pipes).map(([pipeID, pipeData]) => {
    let q = queryPortCoords(state, pipeData);
    if (!q) return;

    let { startCoords, endCoords, inProgress } = q;
    if (!startCoords || !endCoords) return;
    let pipeD = calculatePipeBezier(startCoords, endCoords);

    // If a connection is in progress, only render the gray background - not the actual pipe
    if (inProgress) {
      return svg`<path class="pipe-background" data-pipeid=${pipeID} d="${pipeD}" />`;
    } else {
      return svg`<path class="pipe-background" data-pipeid=${pipeID} d="${pipeD}" />
    <path class="pipe" data-pipeid=${pipeID} d="${pipeD}" />`;
    }
  });
}
