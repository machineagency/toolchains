import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { json } from "@codemirror/lang-json";

import beautify from "json-beautify";
import { editorSetup } from "../../common/editor";

const config = {
  inports: {
    in: {
      type: "any",
      value: null,
    },
  },
  outports: {},
  state: {
    mode: "json",
  },
  ui: {
    displayName: "Data Viewer",
    resize: "both",
    width: 400,
    height: 500,
  },
};

function dataViewer(inports, outports, state, global) {
  let editorRef = createRef();
  let view;

  function makeState() {
    return EditorState.create({
      doc: beautify(inports.in.value, null, 2, 100),
      extensions: [editorSetup, json(), EditorState.readOnly.of(true)],
    });
  }

  function postInit() {
    view = new EditorView({
      parent: editorRef.value,
      state: makeState(),
    });
  }

  function inportsUpdated() {
    view.setState(makeState());
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
          border: 0;
          outline: none;
        }
        .cm-editor.cm-focused {
          outline: none;
          border: 0;
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
          /* transform-origin: 0 0; */
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

  return { render, postInit, inportsUpdated, onZoom };
}

export default { config, tool: dataViewer };
