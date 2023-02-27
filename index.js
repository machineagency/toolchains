import { html, render } from "lit-html";
import { dracula } from "./themes";

import { addPanZoom } from "./addPanZoom";
import { addToolInteraction } from "./addToolInteraction";

import { toolView } from "./ui/toolView";

let globalState = {
  initialized: false,
  toolbox: ["test", "dataViewer", "color", "toggle", "text"],
  imports: {},
  toolchain: {
    tools: {},
    shape: {},
  },
  theme: dracula,
  panZoom: null,
  transforming: false,
  selection: new Set(),
};

const layers = {
  SELECTED: 5,
  BACKGROUND: 0,
  PIPES: 1,
  TOOLS: 3,
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
    layer: layers.TOOLS,
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
      <div id="tools" class="transform-group">${renderTools(state)}</div>
      <div id="toolbox">
        <div id="toolbox-title">toolbox</div>
        ${state.toolbox.map(
          (toolName) =>
            html`<button class="add-tool" @click=${() => addTool(toolName)}>
              ${toolName}
            </button>`
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

const background = document.getElementById("background");
const workspace = document.getElementById("workspace");

const panZoom = addPanZoom(background, globalState);
globalState.panZoom = panZoom;

addToolInteraction(workspace, globalState);

window.requestAnimationFrame(r);
