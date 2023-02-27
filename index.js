import { html, render } from "lit-html";
import { dracula } from "./themes";
import { addPanZoom } from "./addPanZoom";
import { addToolInteraction } from "./addToolInteraction";
import { toolUI } from "./ui/toolInterface";

let globalState = {
  initialized: false,
  toolbox: ["test", "color", "toggle", "text"],
  imports: {},
  toolchain: {
    modules: {},
    shape: {},
  },
  theme: dracula,
  panZoom: null,
  transforming: false,
  selection: new Set(),
};

let defaultTool = {
  moduleClass: null,
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

let modID = 0;

// function portUI(portID, portInfo) {
//   return html`<div class="port" data-portid=${portID} title=${portID}></div>`;
// }

// function toolUI(toolID, tool) {
//   return html`<div
//     class="mod ${tool.uiState.toolbar ? "show-toolbar" : "hide-toolbar"} ${
//     tool.uiState.statePanel ? "show-state" : "hide-state"
//   }"
//     data-toolid=${toolID}
//     style="
//       --x:${tool.pos.x}px;
//       --y:${tool.pos.y}px;
//       --ui-width:${tool.ui.width};
//       --ui-height:${tool.ui.height};">
//     <div class="module-background">
//       <div class="b1"></div>
//       <div class="b2"></div>
//       <div class="b3"></div>
//     </div>
//       <div class="toolbar">
//         <span class="module-displayname">${tool.ui.displayName}</span>
//         <span class="module-actions">
//           <i class="toggle-state fa-solid fa-code fa-xs "></i>
//           <i class="remove fa-solid fa-rectangle-xmark"></i>
//           <i class="pin fa-solid fa-xs fa-thumbtack"></i>
//           <i class="drag fa-solid fa-grip-vertical"></i>
//         </span>
//       </div>
//       <div class="inports port-container">
//         ${Object.entries(tool.inports).map(([portID, port]) =>
//           portUI(portID, port)
//         )}
//       </div>
//       <div class="outports port-container">
//         ${Object.entries(tool.outports).map(([portID, port]) =>
//           portUI(portID, port)
//         )}
//       </div>
//       <div class="tool-view">${tool.render()}</div>
//       <div class="module-state">${statePane(tool.state)}</div>
//     </div>
//   </div>`;
// }

function renderModules(state) {
  return Object.entries(state.toolchain.modules).map(([id, tool]) => {
    return toolUI(id, tool);
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
      <div id="modules" class="transform-group">${renderModules(state)}</div>
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

  let toolID = `${toolName}_${modID}`;
  let newTool = JSON.parse(JSON.stringify(defaultTool));

  newTool.pos.x += modID * 30;
  newTool.pos.y += modID * 30;

  Object.assign(newTool, toolConstructor(globalCallbacks(toolID)));

  if ("init" in newTool) {
    newTool.init();
  }

  globalState.toolchain.modules[toolID] = newTool;
  modID++;
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
