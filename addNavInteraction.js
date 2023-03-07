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
      state.uploadToolchain(JSON.parse(fileReader.result));
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

  listen("pointerdown", ".ex", (e) => {
    fetch(`./examples/${e.target.dataset.example}.json`)
      .then((response) => response.json())
      .then((data) => state.uploadToolchain(data));
  });

  listen("pointerdown", ".settings", (e) => {
    console.log("settings");
  });

  listen("pointerdown", ".debug", (e) => {
    console.log("debug");
    state.debug = !state.debug;
  });
}
