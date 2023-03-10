import { render } from "lit-html";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { dracula } from "./themes";

import { addPanZoom } from "./addPanZoom";
import { addGlobalInteraction } from "./addGlobalInteraction";
import { addToolInteraction } from "./addToolInteraction";
import { addPortInteraction } from "./addPortInteraction";
import { addPipeInteraction } from "./addPipeInteraction";
import { addNavInteraction } from "./addNavInteraction";
import { addToolboxInteraction } from "./addToolboxInteraction";

import { view } from "./ui/workspaceView";
import { addSelectBox } from "./addSelectBox";
import { addBackgroundInteraction } from "./addBackgroundInteraction";

const globalState = {
  mouse: null,
  initialized: false,
  toolbox: [
    "and",
    "not",
    "bool",
    "inputSlider",
    "domain",
    "test",
    "evalJS",
    "color",
    "dataViewer",
    "range",
    "gradient",
    "axidrawSerial",
    "velocity",
    "editor",
    "logger",
    "hsl",
  ],
  examples: ["gradients", "range", "editor", "hsl"],
  imports: {},
  toolchain: {
    tools: {},
    pipes: {},
  },
  selectBox: {},
  theme: dracula,
  panZoom: null,
  transforming: false,
  selection: new Set(),
  keysPressed: [],
  debug: false,
  uploadToolchain: uploadToolchain,
  addTool: addTool,
  offset: 0,
};

function getConnectedInports(toolID, portID) {
  let pipes = Object.entries(globalState.toolchain.pipes).filter(
    ([pipeID, pipeData]) => {
      return pipeData.start.toolID == toolID && pipeData.start.portID == portID;
    }
  );
  return pipes;
}

function makeOutportProxy(toolID, portID) {
  return {
    set(target, prop, val, receiver) {
      const pipes = getConnectedInports(toolID, portID);
      pipes.forEach(([pipeID, pipeData]) => {
        let toolToUpdate = globalState.toolchain.tools[pipeData.end.toolID];

        if (!toolToUpdate) return;
        let portToUpdate = toolToUpdate.inports[pipeData.end.portID];
        portToUpdate.value = val;
        if ("inportsUpdated" in toolToUpdate.lifecycle) {
          toolToUpdate.lifecycle.inportsUpdated();
        }
      });
      return Reflect.set(target, prop, val, receiver);
    },
  };
}

function makeInportProxy(toolID, portID) {
  return {
    set(target, prop, val, receiver) {
      // console.log(`inport ${portID} updated to ${val}!`);
      return Reflect.set(target, prop, val, receiver);
    },
  };
}

function makeStateProxy() {
  return {
    set(target, prop, val, receiver) {
      // console.log(`state ${prop} updated to ${val}!`);
      return Reflect.set(target, prop, val, receiver);
    },
  };
}

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
  const conf = {
    toolType: toolType,
    toolID: `${toolType}_${uuidv4()}`,
    pos: { x: globalState.offset * 30, y: globalState.offset * 30 },
    inports: toolConfig.inports ?? {},
    outports: toolConfig.outports ?? {},
    state: toolConfig.state ?? {},
    uiState: {
      toolbar: true,
      statePanel: false,
    },
    ui: _.cloneDeep(
      toolConfig.ui ?? {
        displayName: toolType,
        width: "200px",
        height: "200px",
        mini: false,
      }
    ),
    domInitialized: false,
  };
  globalState.offset++;
  return conf;
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
  newTool.domInitialized = false;

  setupProxies(toolObj.tool, newTool);

  globalState.toolchain.tools[newTool.toolID] = newTool;

  if ("init" in newTool.lifecycle) newTool.lifecycle.init();
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

const svgLayer = document.getElementById("svg-layer");
const workspace = document.getElementById("workspace");
const toolbox = document.getElementById("toolbox");
const nav = document.getElementById("nav");

const panZoom = addPanZoom(svgLayer, globalState);
globalState.panZoom = panZoom;

addGlobalInteraction(globalState);
addPortInteraction(workspace, globalState);
addToolInteraction(workspace, globalState);
addPipeInteraction(workspace, globalState);
addToolboxInteraction(toolbox, globalState);
addNavInteraction(nav, globalState);
addSelectBox(workspace, globalState);
addBackgroundInteraction(svgLayer, globalState);

// if (globalState.debug) {
//   const { default: toolchainJSON } = await import(`./examples/range.json`, {
//     assert: {
//       type: "json",
//     },
//   });
//   uploadToolchain(toolchainJSON);
// }

window.requestAnimationFrame(r);
