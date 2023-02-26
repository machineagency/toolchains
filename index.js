import { html, render } from "lit-html";
import { dracula } from "./themes";
import { addPanZoom } from "./addPanZoom";
import { addToolInteraction } from "./addToolInteraction";
import { statePane } from "./ui/statePane";

let globalState = {
  initialized: false,
  toolbox: ["test", "textInput", "toggle", "colorInput"],
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
  displayName: null,
  inports: [],
  outports: [],
  state: {},
  lifecycle: {},
  view: { height: "100px", width: "100px" },
  pos: { x: 0, y: 0 },
  focus: false,
  ui: {
    toolbar: true,
    statePanel: false,
  },
};

let modID = 0;

function toolUI(toolID, mod, toolView) {
  return html`<div
    class="mod ${mod.ui.toolbar ? "show-toolbar" : "hide-toolbar"} ${
    mod.ui.statePanel ? "show-state" : "hide-state"
  }"
    data-toolid=${toolID}
    style="
      --x:${mod.pos.x}px;
      --y:${mod.pos.y}px;
      --ui-width:${mod.view.width};
      --ui-height:${mod.view.height};">
    <div class="module-background">
      <div class="b1"></div>
      <div class="b2"></div>
      <div class="b3"></div>
    </div>
      <div class="toolbar">
        <span class="module-displayname">${mod.displayName}</span>
        <span class="module-actions">
          <i class="toggle-state fa-solid fa-code fa-xs "></i>
          <i class="remove fa-solid fa-rectangle-xmark"></i>
          <i class="pin fa-solid fa-xs fa-thumbtack"></i>
          <i class="drag fa-solid fa-grip-vertical"></i>
        </span>
      </div>
      <div class="inports port-container">
        <div class="port"></div>
        <div class="port"></div>
      </div>
      <div class="outports port-container">
        <div class="port"></div>
        <div class="port"></div>
        <div class="port"></div>
        <div class="port"></div>
      </div>
      <div class="tool-view">${toolView(mod.state)}</div>
      <div class="module-state">${statePane(mod.state)}</div>
    </div>
  </div>`;
}

function renderModules(state) {
  return Object.entries(state.toolchain.modules).map(([id, tool]) => {
    return toolUI(id, tool, state.imports[tool.moduleClass].view);
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

function addToolToToolchain(toolName, lifecycle) {
  // Deep copy the default config
  let config = JSON.parse(JSON.stringify(globalState.imports[toolName].config));

  let toolID = `${toolName}_${modID}`;

  // Deep copy the default tool
  let newTool = JSON.parse(JSON.stringify(defaultTool));

  Object.assign(newTool, config);

  newTool.moduleClass = toolName;
  newTool.pos.x += modID * 30;
  newTool.pos.y += modID * 30;

  // Run the tool's init method
  if ("init" in lifecycle) {
    lifecycle.init(newTool.state);
  }

  globalState.toolchain.modules[toolID] = newTool;
  modID++;
}

function importTool(toolName) {
  import(`./tools/${toolName}.js`)
    .then((tool) => {
      globalState.imports[toolName] = {
        config: tool.config,
        view: tool.view,
        lifecycle: tool.lifecycle ?? {},
      };
      addToolToToolchain(toolName, tool.lifecycle);
    })
    .catch((err) => {
      console.log(err);
    });
}

function addTool(toolName) {
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
