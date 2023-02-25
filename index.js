import { html, render } from "lit-html";
import { initializeApp } from "firebase/app";
import { dracula } from "./themes";
import { addPanZoom } from "./addPanZoom";
import { statePane } from "./ui/statePane";

const firebaseConfig = {
  apiKey: "AIzaSyDOVuFoZPjhBG3yW1ahTsrnqTWbXMSTtek",
  authDomain: "toolchains-5434e.firebaseapp.com",
  projectId: "toolchains-5434e",
  storageBucket: "toolchains-5434e.appspot.com",
  messagingSenderId: "92747901115",
  appId: "1:92747901115:web:fd3833a481c10d3977219e",
};

const app = initializeApp(firebaseConfig);

let globalState = {
  initialized: false,
  toolbox: ["textInput", "toggle", "colorInput"],
  imports: {},
  toolchain: {
    modules: {},
    shape: {},
  },
  theme: dracula,
  panZoom: null,
};

let modID = 0;

function renderModules(state) {
  return Object.entries(state.toolchain.modules).map(([id, mod]) => {
    return html`<div class="mod" style="--x:${mod.pos.x}px;--y:${mod.pos.y}px;">
      <div class="module-header"><span>${mod.displayName}</span></div>
      <div class="inport-container">
        <div class="port"></div>
        <div class="port"></div>
      </div>
      <div class="outport-container">
        <div class="port"></div>
        <div class="port"></div>
      </div>
      <div class="module-ui">
        ${state.imports[mod.moduleClass].view(mod.state)}
      </div>
      <div class="module-state">${statePane(mod.state)}</div>
    </div>`;
  });
}

const view = (state) => {
  const x = state.panZoom ? state.panZoom.x() : 0;
  const y = state.panZoom ? state.panZoom.y() : 0;
  const scale = state.panZoom ? state.panZoom.scale() : 1;
  return html`<div id="app-container">
    <div id="toolbar"><span>toolchains</span></div>
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
  let config = globalState.imports[toolName].config;
  globalState.toolchain.modules[`${toolName}_${modID}`] = {
    moduleClass: toolName,
    displayName: config.displayName,
    state: config.state,
    pos: {
      x: modID * 30,
      y: modID * 30,
    },
    focus: false,
  };
  modID++;
}

function importTool(toolName) {
  import(`./tools/${toolName}.js`)
    .then((module) => {
      globalState.imports[toolName] = {
        config: module.config,
        view: module.view,
      };
      addToolToToolchain(toolName);
    })
    .catch((err) => {
      console.log(err);
    });
}

function addTool(toolName) {
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

const background = document.getElementById("background");
const panZoom = addPanZoom(background, globalState);
globalState.panZoom = panZoom;

panZoom.setScaleXY({
  x: [-window.innerWidth / 2, window.innerWidth / 2],
  y: [-window.innerHeight / 2, window.innerHeight / 2],
});

window.requestAnimationFrame(r);
