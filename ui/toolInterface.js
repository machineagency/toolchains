import { html } from "lit-html";
import { statePane } from "./statePane";

function portUI(portID, portInfo) {
  return html`<div class="port" data-portid=${portID} title=${portID}></div>`;
}

function toolUI(toolID, tool) {
  return html`<div
    class="mod ${tool.uiState.toolbar ? "show-toolbar" : "hide-toolbar"} ${
    tool.uiState.statePanel ? "show-state" : "hide-state"
  }"
    data-toolid=${toolID}
    style="
      --x:${tool.pos.x}px;
      --y:${tool.pos.y}px;
      --ui-width:${tool.ui.width};
      --ui-height:${tool.ui.height};">
    <div class="module-background">
      <div class="b1"></div>
      <div class="b2"></div>
      <div class="b3"></div>
    </div>
      <div class="toolbar">
        <span class="module-displayname">${tool.ui.displayName}</span>
        <span class="module-actions">
          <i class="toggle-state fa-solid fa-code fa-xs "></i>
          <i class="remove fa-solid fa-rectangle-xmark"></i>
          <i class="pin fa-solid fa-xs fa-thumbtack"></i>
          <i class="drag fa-solid fa-grip-vertical"></i>
        </span>
      </div>
      <div class="inports port-container">
        ${Object.entries(tool.inports).map(([portID, port]) =>
          portUI(portID, port)
        )}
      </div>
      <div class="outports port-container">
        ${Object.entries(tool.outports).map(([portID, port]) =>
          portUI(portID, port)
        )}
      </div>
      <div class="tool-view">${tool.render()}</div>
      <div class="module-state">${statePane(tool.state)}</div>
    </div>
  </div>`;
}

export { toolUI };
