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
import { pipesView } from "./ui/pipesView";

import { addSelectBox } from "./addSelectBox";
import { addBackgroundInteraction } from "./addBackgroundInteraction";

import toolboxData from "./toolbox.json";

const globalState = {
  mouse: null,
  initialized: false,
  toolbox: toolboxData,
  examples: [
    "p5_sketch",
    // "velocity",
    "path_drawing",
    // "path-testing",
    "gradients",
    "hsl",
  ],
  // snippets: ["squareDomain2D", "domainA3"],
  imports: {},
  toolchain: {
    title: "untitled",
    tools: {},
    pipes: {},
  },
  selectBox: {},
  theme: dracula,
  panZoom: null,
  resizing: false,
  transforming: false,
  lockInteraction: false,
  selection: new Set(),
  keysPressed: [],
  debug: false,
  uploadToolchain: uploadToolchain,
  addTool: addTool,
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

function makeStateProxy(toolID) {
  return {
    set(target, prop, val, receiver) {
      let tool = globalState.toolchain.tools[toolID];

      if ("stateUpdated" in tool.lifecycle) {
        tool.lifecycle.stateUpdated();
      }
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
  tool.state = new Proxy(_.cloneDeep(tool.state), makeStateProxy(tool.toolID));
  tool.lifecycle = toolFunc(
    tool.inports,
    tool.outports,
    tool.state,
    globalState // definitely don't actually pass in global state here, just testing. should make an object with allowed global vars
  );

  return true;
}

function initializeConfig(path, toolConfig) {
  const toolType = path.split("/").at(-1).split(".")[0];
  const conf = {
    path: path,
    toolID: `${toolType}_${uuidv4()}`,
    pos: { x: globalState.mouse.x, y: globalState.mouse.y },
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
        resize: "none",
      }
    ),
    domInitialized: false,
  };
  return conf;
}

async function importTool(path) {
  const { default: toolExport } = await import(path);
  globalState.imports[path] = toolExport;
}

async function addTool(path, config) {
  if (!(path in globalState.imports)) {
    await importTool(path);
  }

  const toolObj = globalState.imports[path];
  const newTool = config ?? initializeConfig(path, toolObj.config);
  newTool.domInitialized = false;

  setupProxies(toolObj.tool, newTool);

  globalState.toolchain.tools[newTool.toolID] = newTool;

  if ("init" in newTool.lifecycle) newTool.lifecycle.init();
}

function newToolcahin() {
  globalState.toolchain = {
    tools: {},
    pipes: {},
    title: "untitled",
  };
}

function uploadToolchain(toolchainJSON, snippet = false) {
  if (!snippet) {
    // If we're not adding a snippet, clear the current toolchain
    // TODO: (should probably warn / prompt if there is a toolchain)
    newToolcahin();
    // Also if not a snippet, set panzoom to the uploaded panzoom
    globalState.panZoom.setPanZoom(toolchainJSON.workspace);
  }

  // For each tool in the toolchain JSON, add the tool
  Object.entries(toolchainJSON.tools).forEach(([toolID, toolState]) => {
    addTool(toolState.path, toolState);
  });

  globalState.toolchain.title = toolchainJSON.title ?? "untitled";

  // Add all the toolchain's pipes to the global toolchain
  Object.assign(globalState.toolchain.pipes, toolchainJSON.pipes);
  // TODO: Ensure all tools are added before adding pipes?
  // Doesn't seem like this is currently an issue but it might be in the future
}

function setCustomProperties() {
  Object.entries(globalState.theme).map(([key, val]) => {
    document.documentElement.style.setProperty(key, val);
  });
}

function r() {
  render(view(globalState), document.body);
  // Render pipes after the rest of the UI so that the port queries are accurate
  // and the pipes don't update one frame after
  render(pipesView(globalState), pipesContainer);
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
const pipesContainer = document.getElementById("pipes-container");

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

window.requestAnimationFrame(r);
