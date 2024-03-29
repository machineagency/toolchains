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

function toolMenu(tool) {
  return html`<div class="menu-item edit-toolname">
      <i class="edit-toolname fa-solid fa-pen-to-square fa-fw"></i
      ><span class="edit-toolname ">Edit Display Name</span>
    </div>
    <div class="menu-item remove">
      <i class="fa-solid fa-trash fa-fw remove"></i
      ><span class="remove">Delete</span>
    </div>`;
}

export function toolView(toolID, tool, state) {
  let mini = !("render" in tool.lifecycle);
  let selected = state.selection.has(toolID);
  let locked = state.resizing || state.transforming || state.lockInteraction;

  return html`<div
    class="tool resize-${tool.ui.resize}
    ${mini ? "mini" : "full"}
    ${selected ? "selected" : "not-selected"}"
    data-toolid=${toolID}
    draggable="false"
    style="
      --x:${tool.pos.x}px;
      --y:${tool.pos.y}px;
      --ui-width:${tool.ui.width ?? 0}px;
      --ui-height:${tool.ui.height ?? 0}px;">
    <div class="toolbar drag-tool">
      ${tool.ui.icon
        ? html`<i class="drag-tool fa-solid fa-fw fa-${tool.ui.icon}"></i>`
        : nothing}
      <span class="drag-tool tool-displayname">${tool.ui.displayName}</span>
      <div class="menu-icon">
        <a class="menu" href="#"
          ><i class="fa-solid fa-ellipsis-vertical"> </i>
        </a>
        <div class="tool-menu">${toolMenu(tool)}</div>
      </div>
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
    ${mini
      ? nothing
      : html`<div class="tool-view ${locked ? "disable-pointer" : ""}">
            ${shadow(tool.lifecycle.render(), tool)}
          </div>
          <div class="resize-handle"></div>`}
  </div>`;
}
