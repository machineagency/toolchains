import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";

import { editorSetup } from "../common/editor";

const config = {
  inports: {},
  outports: {
    program: {
      type: "string",
      value: null,
    },
  },
  state: {
    language: "javascript",
    program: "console.log('hello world!');\n",
  },
  ui: {
    displayName: "Editor",
    resize: "both",
    width: 200,
    height: 500,
  },
};

function editor(inports, outports, state, global) {
  let editorRef = createRef();
  let view;

  function listener() {
    return EditorView.updateListener.of((v) => {
      state.program = v.state.doc.toString();
      outports.program.value = v.state.doc.toString();
    });
  }

  function makeState() {
    return EditorState.create({
      doc: state.program,
      extensions: [editorSetup, javascript(), listener()],
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

export default { config, tool: editor };
