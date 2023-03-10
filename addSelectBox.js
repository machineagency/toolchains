import { createListener } from "./utils.js";

export function addSelectBox(el, state) {
  const listen = createListener(el);

  let start = null;
  let end = null;

  const endSelect = () => {
    start = null;
    end = null;
    state.selectBox = { start, end };
  };

  listen("pointercancel", "", (e) => {
    endSelect();
    state.selection.clear();
  });

  listen("pointerdown", "", (e) => {
    if (!e.shiftKey) return;
    start = state.mouse;
  });

  listen("pointermove", "", (e) => {
    if (!e.shiftKey) {
      endSelect();
      return;
    }
    if (start === null) return;

    end = state.mouse;
    state.selectBox = { start, end };
    state.selection.clear();
    if (start && end) {
      const selectBox = { start, end };
      Object.entries(state.toolchain.tools).forEach(([toolID, tool]) => {
        const bounds = {
          xMin: tool.pos.x,
          xMax: tool.pos.x + (tool.ui.width ?? 0),
          yMin: tool.pos.y,
          yMax: tool.pos.y + (tool.ui.height ?? 0),
        };
        if (isSelected(bounds, selectBox)) {
          state.selection.add(toolID);
        }
      });
    }
  });

  function isSelected(t, selectBox) {
    let { start, end } = selectBox;
    return (
      (t.xMin > start.x &&
        t.xMax < end.x &&
        t.yMin > start.y &&
        t.yMax < end.y) ||
      (t.xMin > start.x &&
        t.xMax < end.x &&
        t.yMin < start.y &&
        t.yMax > end.y) ||
      (t.xMin < start.x &&
        t.xMax > end.x &&
        t.yMin > start.y &&
        t.yMax < end.y) ||
      (t.xMin < start.x && t.xMax > end.x && t.yMin < start.y && t.yMax > end.y)
    );
  }

  listen("pointerup", "", (e) => {
    endSelect();
  });
}
