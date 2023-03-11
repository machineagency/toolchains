import { render, html, nothing } from "lit-html";
import { Directive, directive } from "lit-html/directive.js";
import { stateView } from "./stateView";

class Shadow extends Directive {
  constructor(partInfo) {
    super(partInfo);
    partInfo.parentNode.attachShadow({ mode: "open" });
  }
  update(part, arr) {
    let tool = arr[1];

    render(arr[0], part.parentNode.shadowRoot);

    if (!tool.domInitialized) {
      tool.domInitialized = true;
      if ("postInit" in tool.lifecycle) {
        tool.lifecycle.postInit();

        render(arr[0], part.parentNode.shadowRoot);
      }
    }
  }
}

const shadow = directive(Shadow);

const portTypes = {
  boolean: "var(--green)",
  string: "var(--purple)",
  number: "var(--blue)",
  array: "var(--pink)",
  object: "var(--orange)",
};

function portView(portID, portInfo, portSide) {
  return html`<div
    class="port"
    data-portside=${portSide}
    data-portid=${portID}
    style="--port-color: ${portTypes[portInfo.type] ?? "var(--port-hover)"}">
    ${portID}
  </div>`;
}

export function toolView(toolID, tool, state) {
  return html`<div
    class="tool
      ${tool.uiState.toolbar ? "show-toolbar" : "hide-toolbar"}
      ${tool.uiState.statePanel ? "show-state" : "hide-state"}
      ${tool.ui.mini ? "mini" : "full"}
      ${state.selection.has(toolID) ? "selected" : ""}"
    data-toolid=${toolID}
    style="
      --x:${tool.pos.x}px;
      --y:${tool.pos.y}px;
      --ui-width:${tool.ui.width ?? 0}px;
      --ui-height:${tool.ui.height ?? 0}px;">
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
        portView(portID, port, "inport")
      )}
    </div>
    <div class="outports port-container">
      ${Object.entries(tool.outports).map(([portID, port]) =>
        portView(portID, port, "outport")
      )}
    </div>
    ${tool.ui.mini
      ? nothing
      : html`<div class="tool-view">
          ${shadow(tool.lifecycle.render(), tool)}
        </div>`}
    <div class="tool-state">${stateView(tool.state)}</div>
  </div>`;
}
