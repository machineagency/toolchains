import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";

import { helpPanel } from "../../common/editorPanel";
import { snippets } from "../../common/completions";
import { editorSetup } from "../../common/editor";

function p5Completions(context) {
  let word = context.matchBefore(/\w*/);
  if (word.from == word.to && !context.explicit) return null;
  return {
    from: word.from,
    options: [
      { label: "HALF_PI", type: "constant" },
      { label: "PI", type: "constant" },
      { label: "QUARTER_PI", type: "constant" },
      { label: "TAU", type: "constant" },
      { label: "TWO_PI", type: "constant" },
      { label: "DEGREES", type: "constant" },
      { label: "RADIANS", type: "constant" },
      {
        label: "arc",
        type: "function",
        info: "https://p5js.org/reference/#/p5/arc",
      },
      { label: "ellipse", type: "function" },
      { label: "circle", type: "function" },
      { label: "line", type: "function" },
      { label: "point", type: "function" },
      { label: "quad", type: "function" },
      { label: "rect", type: "function" },
      { label: "square", type: "function" },
      { label: "triangle", type: "function" },
    ],
  };
}

const config = {
  inports: {},
  outports: {
    sketch: {
      type: "string",
      value: null,
    },
  },
  state: {
    sketch: `function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102);
}

function draw() {
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}`,
  },
  ui: {
    displayName: "P5 Sketch Editor",
    width: 500,
    height: 400,
    resize: "both",
  },
};

function p5Editor(inports, outports, state, global) {
  let editorRef = createRef();
  let view;

  function listener() {
    return EditorView.updateListener.of((v) => {
      state.sketch = v.state.doc.toString();
      outports.sketch.value = v.state.doc.toString();
    });
  }

  function editorState(stateDoc) {
    return EditorState.create({
      doc: stateDoc,
      extensions: [
        editorSetup,
        javascript(),
        autocompletion({
          override: [p5Completions, completeFromList(snippets)],
        }),
        helpPanel(),
        listener(),
      ],
    });
  }

  function postInit() {
    view = new EditorView({
      parent: editorRef.value,
      state: editorState(state.sketch),
    });
  }

  function onResize() {
    view.requestMeasure();
  }

  function onZoom() {
    view.requestMeasure();
  }

  function render() {
    let scale = global.panZoom.scale();
    return html`
      <style>
        #editor {
          height: 100%;
          display: flex;
          overflow: auto;
        }
        .cm-editor {
          flex: 1;
        }
        .cm-editor.cm-focused {
          outline: none;
        }

        /* Prepare yourself for the jankiest CSS ever written */
        /* This is because Codemirror doesn't behave properly when
         inside something that has been transformed with CSS */
        .cm-gutter {
          transform-origin: 0 0;
          transform: scale(${1 / scale});
        }
        .cm-gutter > * {
          transform-origin: 0 0;
          transform: scale(${scale});
        }
        .cm-cursorLayer {
          transform-origin: 0 0;
          transform: scale(${1 / scale});
        }
        .cm-selectionLayer {
          transform-origin: 0 0;
          transform: scale(${1 / scale});
        }

        /* Works on Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: blue var(--purple);
        }

        /* Works on Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        *::-webkit-scrollbar-track {
          background: var(--black);
        }

        *::-webkit-scrollbar-thumb {
          background-color: var(--purple);
          border: none;
        }
      </style>
      <div id="editor" ${ref(editorRef)}></div>
    `;
  }

  return { render, postInit, onResize, onZoom };
}

export default { config, tool: p5Editor };
