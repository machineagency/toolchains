import {
  createListener,
  selectElementContents,
  blurTargetOnEnter,
  checkCharacterCount,
} from "./utils.js";

export async function addNavInteraction(nav, state) {
  const listen = createListener(nav);

  let tcTitle = document.getElementById("title-field");

  listen("pointerdown", ".download", (e) => {
    const x = state.panZoom ? state.panZoom.x() : 0;
    const y = state.panZoom ? state.panZoom.y() : 0;
    const scale = state.panZoom ? state.panZoom.scale() : 1;

    const tools = Object.fromEntries(
      Object.entries(state.toolchain.tools).map(([toolID, tool]) => {
        // Can't serialize the lifecycle methods, use destructuring to get rid of them

        const toolObj = state.imports[tool.path];

        const { lifecycle: x, inports: y, outports: z, ...newTool } = tool;

        // We don't need to save inport and outport values, because they are derived
        // from state.So we save them as their initial config values
        newTool.inports = toolObj.config.inports ?? {};
        newTool.outports = toolObj.config.outports ?? {};

        return [toolID, newTool];
      })
    );

    const toolchainJSON = {
      title: state.toolchain.title ?? untitled,
      pipes: state.toolchain.pipes,
      tools: tools,
      workspace: {
        x: x,
        y: y,
        scale: scale,
      },
    };

    const downloadLink = document.createElement("a");
    downloadLink.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(toolchainJSON));
    downloadLink.download = (state.toolchain.title ?? "toolchain") + ".json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });

  function upload(e) {
    let file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      state.uploadToolchain(JSON.parse(fileReader.result));
    };
  }

  listen("pointerdown", ".upload", (e) => {
    let fileInputElement = document.createElement("input");

    fileInputElement.setAttribute("type", "file");
    fileInputElement.style.display = "none";

    document.body.appendChild(fileInputElement);
    fileInputElement.click();
    fileInputElement.onchange = upload;
    document.body.removeChild(fileInputElement);
  });

  async function importExample(e) {
    const { default: toolchainJSON } = await state.examples[
      e.target.dataset.path
    ]();

    state.uploadToolchain(toolchainJSON);
  }

  async function importSnippet(e) {
    const { default: toolchainJSON } = await state.snippets[
      e.target.dataset.path
    ]();

    state.uploadToolchain(toolchainJSON, true);
  }

  listen("pointerdown", ".ex", importExample);

  listen("pointerdown", ".snip", importSnippet);

  listen("pointerdown", ".debug", (e) => {
    state.debug = !state.debug;
  });

  function updateToolchainName(e) {
    state.toolchain.title = tcTitle.textContent;
    tcTitle.contentEditable = false;
    tcTitle.removeEventListener("focusout", updateToolchainName);
    tcTitle.removeEventListener("keypress", blurTargetOnEnter);
    tcTitle.removeEventListener("keypress", check);
  }

  function check(e) {
    checkCharacterCount(tcTitle, 50, e);
  }

  listen("pointerdown", ".edit-name", (e) => {
    tcTitle.contentEditable = true;

    tcTitle.addEventListener("focusout", updateToolchainName);
    tcTitle.addEventListener("keypress", blurTargetOnEnter);
    tcTitle.addEventListener("keypress", check);

    setTimeout(function () {
      selectElementContents(tcTitle);
      tcTitle.focus();
    }, 0);
  });
}
