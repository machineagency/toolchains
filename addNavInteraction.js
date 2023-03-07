import { createListener } from "./utils.js";

export async function addNavInteraction(nav, state) {
  const listen = createListener(nav);

  listen("pointerdown", ".download", (e) => {
    const x = state.panZoom ? state.panZoom.x() : 0;
    const y = state.panZoom ? state.panZoom.y() : 0;
    const scale = state.panZoom ? state.panZoom.scale() : 1;

    const tools = Object.fromEntries(
      Object.entries(state.toolchain.tools).map(([toolID, tool]) => {
        // Can't serialize the lifecycle methods, use destructuring to get rid of them
        const { lifecycle: _, ...newTool } = tool;
        return [toolID, newTool];
      })
    );

    const toolchainJSON = {
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
    downloadLink.download = "toolchain.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });

  function uploadToolchain(e) {
    let file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      let jsonToolchain = JSON.parse(fileReader.result);

      // Clear the current toolchain (should probably warn/prompt if there is a toolchain)
      state.toolchain = {
        tools: {},
        pipes: {},
      };

      Object.entries(jsonToolchain.tools).map(([toolID, tool]) => {
        state.addTool(tool.toolType, tool);
      });

      // TODO: Ensure all tools are added before adding pipes?
      // Doesn't seem like this is currently an issue but it might be in the future
      state.toolchain.pipes = jsonToolchain.pipes;
      state.panZoom.setPanZoom(jsonToolchain.workspace);
    };
  }

  listen("pointerdown", ".upload", (e) => {
    let fileInputElement = document.createElement("input");

    fileInputElement.setAttribute("type", "file");
    fileInputElement.style.display = "none";

    document.body.appendChild(fileInputElement);
    fileInputElement.click();
    fileInputElement.onchange = uploadToolchain;
    document.body.removeChild(fileInputElement);
  });

  listen("pointerdown", ".examples", (e) => {
    console.log("examples");
  });

  listen("pointerdown", ".settings", (e) => {
    console.log("settings");
  });

  listen("pointerdown", ".debug", (e) => {
    console.log("debug");
  });
}
