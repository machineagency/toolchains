import { html, render, svg } from "lit-html";
import { dracula } from "./themes";

import { addPanZoom } from "./addPanZoom";
import { addGlobalInteraction } from "./addGlobalInteraction";
import { addToolInteraction } from "./addToolInteraction";
import { addPipeConnection } from "./addPipeConnection";

import { toolView } from "./ui/toolView";
import { pipeInteraction } from "./pipeInteraction";

let globalState = {
  mouse: null,
  initialized: false,
  toolbox: ["test", "dataViewer", "color", "toggle", "text"],
  imports: {},
  toolchain: {
    tools: {},
    pipes: {},
  },
  theme: dracula,
  panZoom: null,
  transforming: false,
  selection: new Set(),
  keysPressed: [],
};

let defaultTool = {
  toolClass: null,
  inports: {},
  outports: {},
  state: {},
  lifecycle: {},
  ui: { displayName: null, height: "100px", width: "100px" },
  pos: { x: 0, y: 0 },
  focus: false,
  uiState: {
    toolbar: true,
    statePanel: false,
  },
};

const toolchainLog = (toolID, message) => {
  console.log(`${toolID} says: ${message}`);
};

const globalCallbacks = (toolID) => {
  return {
    log: (msg) => toolchainLog(toolID, msg),
  };
};

let currID = 0;

function renderTools(state) {
  return Object.entries(state.toolchain.tools).map(([id, tool]) => {
    return toolView(id, tool);
  });
}

function calculatePipeBezier(pipeInfo) {
  let start = pipeInfo.startCoords;
  let end = pipeInfo.endCoords;

  return `M${start.x},${start.y}
    C${start.x + 100},${start.y}
    ${end.x - 100},${end.y}
    ${end.x},${end.y}`;
}

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
    startCoords = portConnectionPoint(state, startPort);
  } else {
    startCoords = state.mouse;
  }
  if (pipeData.end) {
    let endPort = document.querySelector(
      `[data-toolid="${pipeData.end.toolID}"] [data-portside="inport"][data-portid="${pipeData.end.portID}"]`
    );
    endCoords = portConnectionPoint(state, endPort);
  } else {
    endCoords = state.mouse;
  }

  return {
    startCoords,
    endCoords,
  };
}

function renderPipes(state) {
  return Object.entries(state.toolchain.pipes).map(([pipeID, pipeData]) => {
    let portCoords = queryPortCoords(state, pipeData);
    let pipeD = calculatePipeBezier(portCoords);

    return svg`<path class="pipe-background" data-pipeid=${pipeID} d="${pipeD}" /><path class="pipe" data-pipeid=${pipeID} d="${pipeD}" />`;
  });
}

const view = (state) => {
  const x = state.panZoom ? state.panZoom.x() : 0;
  const y = state.panZoom ? state.panZoom.y() : 0;
  const scale = state.panZoom ? state.panZoom.scale() : 1;
  return html`<div id="app-container">
    <div id="top-bar"><span>toolchains</span></div>
    <div id="workspace">
      <canvas
        id="background"
        style="--offset-x: ${x}px;--offset-y: ${y}px;--scale: ${scale}"></canvas>
      <svg id="pipes" preserveAspectRatio="xMidYMid meet">
        <g class="transform-group">${renderPipes(state)}</g>
      </svg>
      <div id="toolchain" class="transform-group">${renderTools(state)}</div>
      <div id="toolbox">
        <div class="pane-header">toolbox</div>
        ${state.toolbox.map(
          (toolName) =>
            html`<button class="add-tool" @click=${() => addTool(toolName)}>
              ${toolName}
            </button>`
        )}
      </div>
      <div id="toolchain-info" class="ui-pane">
        <div class="pane-header">tools</div>
        ${Object.keys(state.toolchain.tools).map(
          (toolID) => html`<div>${toolID}</div>`
        )}
        <div class="pane-header">pipes</div>
        ${Object.keys(state.toolchain.pipes).map(
          (pipeID) => html`<div>${pipeID}</div>`
        )}
      </div>
    </div>
  </div>`;
};

function addToolToToolchain(toolName) {
  const toolConstructor = globalState.imports[toolName];

  let toolID = `${toolName}_${currID}`;
  let newTool = JSON.parse(JSON.stringify(defaultTool));

  newTool.pos.x += currID * 30;
  newTool.pos.y += currID * 30;

  Object.assign(newTool, toolConstructor(globalCallbacks(toolID)));

  if ("init" in newTool) {
    newTool.init();
  }

  globalState.toolchain.tools[toolID] = newTool;
  currID++;
}

async function importTool(toolName) {
  const { default: toolExport } = await import(`./tools/${toolName}.js`);
  globalState.imports[toolName] = toolExport;
  addToolToToolchain(toolName);
}

async function addTool(toolName) {
  if (toolName in globalState.imports) {
    addToolToToolchain(toolName, globalState.imports[toolName].lifecycle);
  } else {
    importTool(toolName);
  }
}

function setCustomProperties() {
  Object.entries(globalState.theme).map(([key, val]) => {
    document.documentElement.style.setProperty(key, val);
  });
}

function r() {
  render(view(globalState), document.body);
  window.requestAnimationFrame(r);
}

function init() {
  if (globalState.initialized) return;
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  globalState.initialized = true;
  setCustomProperties();
  render(view(globalState), document.body);
}

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

init();

const svgBackground = document.getElementById("pipes");
const workspace = document.getElementById("workspace");

const panZoom = addPanZoom(svgBackground, globalState);
globalState.panZoom = panZoom;

addGlobalInteraction(workspace, globalState);
addPipeConnection(workspace, globalState);
addToolInteraction(workspace, globalState);
pipeInteraction(workspace, globalState);

window.requestAnimationFrame(r);
