import { html, render, svg } from "lit-html";
import { dracula } from "./themes";

import _ from "lodash";

import { addPanZoom } from "./addPanZoom";
import { addGlobalInteraction } from "./addGlobalInteraction";
import { addToolInteraction } from "./addToolInteraction";
import { queryPortCoords, addPortInteraction } from "./addPortInteraction";
import { addPipeInteraction } from "./addPipeInteraction";

import { toolView } from "./ui/toolView";

let globalState = {
  mouse: null,
  initialized: false,
  toolbox: ["test", "dataViewer", "color", "toggle", "text", "gradient"],
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

export function calculatePipeBezier(pipeInfo) {
  let start = pipeInfo.startCoords;
  let end = pipeInfo.endCoords;

  return `M${start.x},${start.y}
    C${start.x + 100},${start.y}
    ${end.x - 100},${end.y}
    ${end.x},${end.y}`;
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
        ${Object.entries(state.toolchain.tools).map(
          ([toolID, toolInfo]) =>
            html`<div>
              ${toolID}${JSON.stringify(toolInfo.outports)}${JSON.stringify(
                toolInfo.inports
              )}
            </div>`
        )}
        <div class="pane-header">pipes</div>
        ${Object.keys(state.toolchain.pipes).map(
          (pipeID) => html`<div>${pipeID}</div>`
        )}
      </div>
    </div>
  </div>`;
};

function getConnectedInports(toolID, portID) {
  let pipes = Object.entries(globalState.toolchain.pipes).filter(
    ([pipeID, pipeData]) => {
      return pipeData.start.toolID == toolID && pipeData.start.portID == portID;
    }
  );
  return pipes;
}

const outportHandler = (toolID, portID) => {
  return {
    set(target, prop, val, receiver) {
      const pipes = getConnectedInports(toolID, portID);
      pipes.forEach(([pipeID, pipeData]) => {
        let toolToUpdate = globalState.toolchain.tools[pipeData.end.toolID];
        let portToUpdate = toolToUpdate.inports[pipeData.end.portID];
        portToUpdate.value = val;
      });
      return Reflect.set(target, prop, val, receiver);
    },
  };
};

const inportHandler = (toolID, portID) => {
  return {
    set(target, prop, val, receiver) {
      console.log(`inport ${prop} updated to ${val}!`);
      return Reflect.set(target, prop, val, receiver);
    },
  };
};

function makeTool(toolID, toolObj) {
  let outports = {};
  let inports = {};
  let state = {};

  const stateHandler = {
    set(target, prop, val, receiver) {
      // console.log(`state ${prop} updated to ${val}!`);
      return Reflect.set(target, prop, val, receiver);
    },
  };

  for (const [portID, val] of Object.entries(toolObj.inports)) {
    inports[portID] = new Proxy(
      _.cloneDeep(val),
      inportHandler(toolID, portID)
    );
  }

  for (const [portID, val] of Object.entries(toolObj.outports)) {
    outports[portID] = new Proxy(
      _.cloneDeep(val),
      outportHandler(toolID, portID)
    );
  }

  state = new Proxy(_.cloneDeep(toolObj.state), stateHandler);

  let lifecycle = toolObj.tool(inports, outports, state);

  return { inports, outports, state, lifecycle };
}

function addToolToToolchain(toolName) {
  console.log(globalState.imports[toolName]);
  const toolObj = globalState.imports[toolName];

  let toolID = `${toolName}_${currID}`;
  let newTool = makeTool(toolID, toolObj);

  newTool.uiState = {
    toolbar: true,
    statePanel: false,
  };

  newTool.pos = { x: 0, y: 0 };
  newTool.pos.x += currID * 30;
  newTool.pos.y += currID * 30;
  newTool.ui = toolObj.ui;

  globalState.toolchain.tools[toolID] = newTool;
  if ("init" in newTool.lifecycle) newTool.lifecycle.init();

  currID++;
}

async function importTool(toolName) {
  const { default: toolExport } = await import(`./tools/${toolName}.js`);
  globalState.imports[toolName] = toolExport;
  addToolToToolchain(toolName);
}

async function addTool(toolName) {
  if (toolName in globalState.imports) {
    addToolToToolchain(toolName);
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
addPortInteraction(workspace, globalState);
addToolInteraction(workspace, globalState);
addPipeInteraction(workspace, globalState);

window.requestAnimationFrame(r);
