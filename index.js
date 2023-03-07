import { html, nothing, render, svg } from "lit-html";
import { dracula } from "./themes";

import _ from "lodash";

import { addPanZoom } from "./addPanZoom";
import { addGlobalInteraction } from "./addGlobalInteraction";
import { addToolInteraction } from "./addToolInteraction";
import { queryPortCoords, addPortInteraction } from "./addPortInteraction";
import { addPipeInteraction } from "./addPipeInteraction";
import { addNavInteraction } from "./addNavInteraction";

import { toolView } from "./ui/toolView";
import { debugView } from "./ui/debugView";

let globalState = {
  mouse: null,
  initialized: false,
  toolbox: ["test", "color", "toggle", "text", "gradient", "axi"],
  examples: ["gradients"],
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
  debug: false,
  uploadToolchain: uploadToolchain,
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
    if (!portCoords) return;
    let pipeD = calculatePipeBezier(portCoords);

    return svg`<path class="pipe-background" data-pipeid=${pipeID} d="${pipeD}" /><path class="pipe" data-pipeid=${pipeID} d="${pipeD}" />`;
  });
}

const view = (state) => {
  const x = state.panZoom ? state.panZoom.x() : 0;
  const y = state.panZoom ? state.panZoom.y() : 0;
  const scale = state.panZoom ? state.panZoom.scale() : 1;

  return html`<div id="app-container">
    <div id="nav">
      <span>toolchains</span>
      <span id="nav-buttons">
        <i class="upload fa-solid fa-upload"></i>
        <i class="download fa-solid fa-download"></i>
        <i id="ex-button" class="examples fa-solid fa-book">
          <div id="ex-dropdown">
            ${state.examples.map((example) => {
              return html`<div data-example=${example} class="ex">
                ${example}
              </div>`;
            })}
          </div>
        </i>
        <i class="debug fa-solid fa-bug"></i>
      </span>
    </div>
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
          (toolType) =>
            html`<button class="add-tool" @click=${() => addTool(toolType)}>
              ${toolType}
            </button>`
        )}
      </div>
      ${state.debug ? debugView(state) : nothing}
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

const makeOutportProxy = (toolID, portID) => {
  return {
    set(target, prop, val, receiver) {
      const pipes = getConnectedInports(toolID, portID);
      pipes.forEach(([pipeID, pipeData]) => {
        let toolToUpdate = globalState.toolchain.tools[pipeData.end.toolID];
        if (!toolToUpdate) return;
        let portToUpdate = toolToUpdate.inports[pipeData.end.portID];
        portToUpdate.value = val;
      });
      return Reflect.set(target, prop, val, receiver);
    },
  };
};

const makeInportProxy = (toolID, portID) => {
  return {
    set(target, prop, val, receiver) {
      // console.log(`inport ${portID} updated to ${val}!`);
      return Reflect.set(target, prop, val, receiver);
    },
  };
};

const makeStateProxy = () => {
  return {
    set(target, prop, val, receiver) {
      // console.log(`state ${prop} updated to ${val}!`);
      return Reflect.set(target, prop, val, receiver);
    },
  };
};

function setupProxies(toolFunc, tool) {
  const inportProxies = {};
  const outportProxies = {};

  for (const [portID, val] of Object.entries(tool.inports)) {
    inportProxies[portID] = new Proxy(
      _.cloneDeep(val),
      makeInportProxy(tool.toolID, portID)
    );
  }

  for (const [portID, val] of Object.entries(tool.outports)) {
    outportProxies[portID] = new Proxy(
      _.cloneDeep(val),
      makeOutportProxy(tool.toolID, portID)
    );
  }

  tool.inports = inportProxies;
  tool.outports = outportProxies;
  tool.state = new Proxy(_.cloneDeep(tool.state), makeStateProxy());
  tool.lifecycle = toolFunc(tool.inports, tool.outports, tool.state);

  return true;
}

function initializeConfig(toolType, toolConfig) {
  return {
    toolType: toolType,
    toolID: `${toolType}_${currID}`,
    pos: { x: currID * 30, y: currID * 30 },
    inports: toolConfig.inports ?? {},
    outports: toolConfig.outports ?? {},
    state: toolConfig.state ?? {},
    uiState: {
      toolbar: true,
      statePanel: false,
    },
    ui: toolConfig.ui ?? {
      displayName: toolType,
      width: "200px",
      height: "200px",
    },
  };
}

async function importTool(toolType) {
  const { default: toolExport } = await import(`./tools/${toolType}.js`);
  globalState.imports[toolType] = toolExport;
}

async function addTool(toolType, config) {
  if (!(toolType in globalState.imports)) {
    await importTool(toolType);
  }

  const toolObj = globalState.imports[toolType];
  const newTool = config ?? initializeConfig(toolType, toolObj.config);

  setupProxies(toolObj.tool, newTool);

  globalState.toolchain.tools[newTool.toolID] = newTool;

  if ("init" in newTool.lifecycle) newTool.lifecycle.init();
  currID++;
}

function uploadToolchain(toolchainJSON) {
  // Clear the current toolchain (should probably warn/prompt if there is a toolchain)
  globalState.toolchain = {
    tools: {},
    pipes: {},
  };

  Object.entries(toolchainJSON.tools).map(([toolID, tool]) => {
    addTool(tool.toolType, tool);
  });

  // TODO: Ensure all tools are added before adding pipes?
  // Doesn't seem like this is currently an issue but it might be in the future
  globalState.toolchain.pipes = toolchainJSON.pipes;
  globalState.panZoom.setPanZoom(toolchainJSON.workspace);
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
const nav = document.getElementById("nav");

const panZoom = addPanZoom(svgBackground, globalState);
globalState.panZoom = panZoom;

addGlobalInteraction(workspace, globalState);
addPortInteraction(workspace, globalState);
addToolInteraction(workspace, globalState);
addPipeInteraction(workspace, globalState);
addNavInteraction(nav, globalState);

window.requestAnimationFrame(r);
