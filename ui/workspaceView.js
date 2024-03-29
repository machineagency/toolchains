import { html, svg, nothing } from "lit-html";
import { toolView } from "./toolView";
import { debugView } from "./debugView";

function renderTools(state) {
  return Object.entries(state.toolchain.tools).map(([id, tool]) => {
    return toolView(id, tool, state);
  });
}

function navView(state) {
  return html`<div id="nav">
    <span>toolchains</span>
    <span id="toolchain-title">
      <span id="title-field">${state.toolchain.title ?? "untitled"}</span>
      <i class="edit-name fa-solid fa-pen-to-square fa-fw fa-sm"></i>
    </span>
    <span id="nav-buttons">
      <i class="upload fa-solid fa-upload"></i>
      <i class="download fa-solid fa-download"></i>
      <i class="dropdown-icon fa-solid fa-book">
        <div class="dropdown">
          ${Object.entries(state.examples).map(([path, _]) => {
            return html`<div data-path=${path} class="dropdown-item ex">
              ${path.split("/").at(-1).split(".")[0]}
            </div>`;
          })}
        </div>
      </i>

      <i class="debug fa-solid fa-bug"></i>
      <a
        href="https://github.com/branchwelder/toolchains"
        target="_blank"
        rel="noreferrer noopener">
        <i class="fa-brands fa-github"></i>
      </a>
    </span>
  </div>`;
}

function drawSelectBox(state) {
  let start = state.selectBox.start;
  let end = state.selectBox.end;
  return svg`

  <path class="select-box"
    d="
    M ${start.x} ${start.y}
    L ${end.x} ${start.y}
    L ${end.x} ${end.y}
    L ${start.x} ${end.y}
    Z
    "/>`;
}

function toolboxSection(data) {
  return html`<div class="section">
    <input type="checkbox" class="collapse-toggle" id="check-${data.group}" />
    <label for="check-${data.group}" class="collapse-header">
      <i class="fa-fw fa-solid fa-${data.icon}"></i>
      <span class="section-title">${data.group}</span>
      <i class="expand-caret fa-solid fa-caret-left"></i>
    </label>
    <div class="collapsible">
      ${data.entries.map(
        (entry) =>
          html`<div
            draggable="true"
            class="add-tool collapse-item"
            data-path=${entry.path}>
            ${entry.displayName}
          </div> `
      )}
    </div>
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
        draggable="false"
        id="background"
        style="--offset-x: ${x}px;--offset-y: ${y}px;--scale: ${scale};"></canvas>
      <svg id="svg-layer" preserveAspectRatio="xMidYMid meet" draggable="false">
        <g id="select-box-container" class="transform-group">
          ${state.selectBox.start && state.selectBox.end
            ? drawSelectBox(state)
            : nothing}
        </g>
        <g id="pipes-container" class="transform-group"></g>
      </svg>
      <div id="toolchain" class="transform-group">${renderTools(state)}</div>
      <div id="toolbox">
        <div id="toolbox-title">toolbox</div>
        ${state.toolbox.map((sectionData) => toolboxSection(sectionData))}
      </div>
      <div id="context-box-container"></div>
      ${state.debug ? debugView(state) : nothing}
    </div>
  </div>`;
}
