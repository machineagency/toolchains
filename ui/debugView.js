import { html } from "lit-html";

export function debugView(state) {
  const x = state.panZoom ? state.panZoom.x() : 0;
  const y = state.panZoom ? state.panZoom.y() : 0;
  const scale = state.panZoom ? state.panZoom.scale() : 1;

  return html`<div id="debug-pane">
    <div class="pane-header">debug</div>
    <div class="debug-content">
      <div class="debug-header"><span>workspace</span></div>
      <div class="debug-entry">
        <div class="debug-info">x: ${x.toFixed(2)}</div>
        <div class="debug-info">y: ${y.toFixed(2)}</div>
        <div class="debug-info">scale: ${scale.toFixed(2)}</div>
      </div>
      <div class="debug-header"><span>tools</span></div>
      <div class="debug-entry">
        ${Object.entries(state.toolchain.tools).map(
          ([toolID, toolInfo]) =>
            html` <div class="debug-info">
              <div>${toolID}</div>
              <div class="debug-details">
                <div>
                  X: ${toolInfo.pos.x.toFixed(2)}, Y:
                  ${toolInfo.pos.y.toFixed(2)}
                </div>
              </div>
            </div>`
        )}
        </div>
        <div class="debug-header"><span>pipes</span></div>
        <div class="debug-entry">
          ${Object.keys(state.toolchain.pipes).map(
            (pipeID) => html`<div class="debug-info">${pipeID}</div>`
          )}
        </div>
      </div>
    </div>
  </div>`;
}
