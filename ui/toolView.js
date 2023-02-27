import { html } from "lit-html";
import { stateView } from "./stateView";

const portTypes = {
  boolean: "var(--green)",
  string: "var(--purple)",
  number: "var(--blue)",
  array: "var(--pink)",
  object: "var(--orange)",
};

function portView(portID, portInfo) {
  return html`<div
    class="port"
    data-portid=${portID}
    style="--port-color: ${portTypes[portInfo.type]}">
    <div class="port-id">${portID}</div>
  </div>`;
}

export function toolView(toolID, tool) {
  return html`<div
    class="tool ${tool.uiState.toolbar ? "show-toolbar" : "hide-toolbar"} ${
    tool.uiState.statePanel ? "show-state" : "hide-state"
  }"
    data-toolid=${toolID}
    style="
      --x:${tool.pos.x}px;
      --y:${tool.pos.y}px;
      --ui-width:${tool.ui.width};
      --ui-height:${tool.ui.height};">
    <div class="tool-background">
      <div class="b1"></div>
      <div class="b2"></div>
      <div class="b3"></div>
    </div>
      <div class="toolbar">
        <span class="tool-displayname">${tool.ui.displayName}</span>
        <span class="tool-actions">
          <i class="toggle-state fa-solid fa-code fa-xs "></i>
          <i class="remove fa-solid fa-rectangle-xmark"></i>
          <i class="pin fa-solid fa-xs fa-thumbtack"></i>
          <i class="drag fa-solid fa-grip-vertical"></i>
        </span>
      </div>
      <div class="inports port-container">
        ${Object.entries(tool.inports).map(([portID, port]) =>
          portView(portID, port)
        )}
      </div>
      <div class="outports port-container">
        ${Object.entries(tool.outports).map(([portID, port]) =>
          portView(portID, port)
        )}
      </div>
      <div class="tool-view">${tool.render()}</div>
      <div class="tool-state">${stateView(tool.state)}</div>
    </div>
  </div>`;
}
