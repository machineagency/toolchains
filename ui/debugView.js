import { html } from "lit-html";

export function debugView(state) {
  const x = state.panZoom ? state.panZoom.x() : 0;
  const y = state.panZoom ? state.panZoom.y() : 0;
  const scale = state.panZoom ? state.panZoom.scale() : 1;

  return html`<div id="debug-pane">
    <div class="debug-header">debug</div>
    <div class="debug-content">
      <div class="debug-header"><span>workspace</span></div>
      <div class="debug-workspace">
        <span>x</span><span>${x.toFixed(2)}</span>
        <span>y</span><span>${y.toFixed(2)}</span>
        <span>scale</span><span>${scale.toFixed(2)}</span>
      </div>
      <div class="debug-header"><span>tools</span></div>
      <div class="debug-section">
        ${Object.entries(state.toolchain.tools).map(
          ([toolID, toolInfo]) =>
            html`<div class="debug-tools">
              <div>display name</div>
              <div>${toolInfo.ui.displayName}</div>
              <div>tool id</div>
              <div>${toolID}</div>
              <div>coords</div>
              <div>
                X: ${toolInfo.pos.x.toFixed(2)}, Y: ${toolInfo.pos.y.toFixed(2)}
              </div>
            </div>`
        )}
        </div>
        <div class="debug-header"><span>pipes</span></div>
        <div class="debug-section">
          ${Object.keys(state.toolchain.pipes).map(
            (pipeID) => html`<div class="debug-pipes">${pipeID}</div>`
          )}
        </div>
      </div>
    </div>
  </div>`;
}
