import { html } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

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
  }

  let editorRef = createRef();

  async function postInit() {
    let { default: codem } = await import(
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.css",
      {
        assert: {
          type: "css",
        },
      }
    );
    let { default: drac } = await import(
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/dracula.min.css",
      {
        assert: {
          type: "css",
        },
      }
    );

    let { default: scroll } = await import(
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/scroll/simplescrollbars.min.css",
      {
        assert: {
          type: "css",
        },
      }
    );

    editorRef.value.parentNode.adoptedStyleSheets = [codem, drac, scroll];

    editor = CodeMirror(editorRef.value, {
      lineNumbers: true,
      tabSize: 2,
      value: state.code,
      mode: "javascript",
      theme: "dracula",
      viewportMargin: Infinity,
      scrollbarStyle: "simple",
      gutters: ["error"],
    });

    outports.js.value = state.code;

    editor.on("changes", handleChange);
  }

  function render() {
    return html` <style>
        #editor {
          height: 100%;
        }
        .CodeMirror {
          height: 100% !important;
        }
      </style>
      <div id="editor" ${ref(editorRef)}></div>`;
  }

  return { render, postInit };
}

export default { config, tool: editor };
