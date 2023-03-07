import { html, nothing } from "lit-html";
import { toolView } from "./toolView";
import { debugView } from "./debugView";
import { pipesView } from "./pipesView";

function renderTools(state) {
  return Object.entries(state.toolchain.tools).map(([id, tool]) => {
    return toolView(id, tool);
  });
}

function navView(state) {
  return html`<div id="nav">
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
  </div>`;
}

export function view(state) {
  const x = state.panZoom ? state.panZoom.x() : 0;
  const y = state.panZoom ? state.panZoom.y() : 0;
  const scale = state.panZoom ? state.panZoom.scale() : 1;

  return html`<div id="app-container">
    ${navView(state)}
    <div id="workspace">
      <canvas
        id="background"
        style="--offset-x: ${x}px;--offset-y: ${y}px;--scale: ${scale}"></canvas>
      <svg id="pipes" preserveAspectRatio="xMidYMid meet">
        <g class="transform-group">${pipesView(state)}</g>
      </svg>
      <div id="toolchain" class="transform-group">${renderTools(state)}</div>
      <div id="toolbox">
        <div class="pane-header">toolbox</div>
        ${state.toolbox.map(
          (toolType) =>
            html`<button class="add-tool" data-tooltype=${toolType}>
              ${toolType}
            </button>`
        )}
      </div>
      ${state.debug ? debugView(state) : nothing}
    </div>
  </div>`;
}
