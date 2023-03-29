import { showPanel, EditorView, keymap } from "@codemirror/view";
import { StateField, StateEffect } from "@codemirror/state";

const toggleHelp = StateEffect.define();

const helpPanelState = StateField.define({
  create: () => false,
  update(value, tr) {
    for (let e of tr.effects) if (e.is(toggleHelp)) value = e.value;
    return value;
  },
  provide: (f) => showPanel.from(f, (on) => (on ? createHelpPanel : null)),
});

function createHelpPanel(view) {
  let dom = document.createElement("div");
  dom.textContent = "F1: Toggle the help panel";
  dom.className = "cm-help-panel";
  return { top: true, dom };
}

const helpKeymap = [
  {
    key: "F1",
    run(view) {
      view.dispatch({
        effects: toggleHelp.of(!view.state.field(helpPanelState)),
      });
      return true;
    },
  },
];

const helpTheme = EditorView.baseTheme({
  ".cm-help-panel": {
    padding: "5px 10px",
    color: `var(--black)`,
    backgroundColor: "#fffa8f",
    fontFamily: "monospace",
  },
});

export function helpPanel() {
  return [helpPanelState, keymap.of(helpKeymap), helpTheme];
}
