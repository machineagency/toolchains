import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

import "https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/comment/comment.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/javascript/javascript.min.js";

import base from "./codemirror/codemirror.min.css?inline";
import scroll from "./codemirror/simplescrollbars.min.css?inline";
import theme from "./codemirror/dracula.min.css?inline";

const config = {
  inports: {},
  outports: {
    js: {
      type: "string",
      value: null,
    },
  },
  state: {
    code: `function makeArr(start, stop, numSteps) {
  var arr = [];
  var step = (stop - start) / (numSteps - 1);
  for (var i = 0; i < numSteps; i++) {
    arr.push(start + (step * i));
  }
  return arr;
}

makeArr(0,100,21);`,
  },
  ui: {
    displayName: "Editor",
    width: 400,
    height: 400,
  },
};

function editor(inports, outports, state) {
  let editor;

  function handleChange() {
    state.code = editor.getValue();
    outports.js.value = state.code;
    editor.refresh();
  }

  let editorRef = createRef();

  function postInit() {
    const baseSheet = new CSSStyleSheet();
    baseSheet.replaceSync(base);
    const draculaSheet = new CSSStyleSheet();
    draculaSheet.replaceSync(theme);
    const scrollbarsSheet = new CSSStyleSheet();
    scrollbarsSheet.replaceSync(scroll);

    editorRef.value.parentNode.adoptedStyleSheets = [
      baseSheet,
      draculaSheet,
      scrollbarsSheet,
    ];

    editor = CodeMirror(editorRef.value, {
      lineNumbers: true,
      tabSize: 2,
      value: state.code,
      mode: "javascript",
      theme: "dracula",
      viewportMargin: Infinity,
      gutters: ["error"],
    });

    outports.js.value = state.code;

    editor.on("changes", handleChange);
    editor.setSize("100%", "100%");
    setTimeout(() => {
      editor.refresh();
    }, 1);
  }

  function render() {
    return html`
      <style>
        #editor {
          height: 100%;
        }
      </style>
      <div id="editor" ${ref(editorRef)}></div>
    `;
  }

  return { render, postInit };
}

export default { config, tool: editor };
