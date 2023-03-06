import { html } from "lit-html";

export function debugView(state) {
  return html`<div id="debug-pane">
    <div class="pane-header">debug</div>
    <div class="debug-content">
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
