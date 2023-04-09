import { html } from "lit-html";

const config = {
  inports: {
    sketch: {
      type: "javascript",
      value: null,
    },
  },
  outports: {},
  state: {},
  ui: {
    displayName: "P5 Sketch Viewer",
    width: 300,
    height: 300,
    resize: "both",
  },
};

function makeSrc(sketch) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sketch</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"></script>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <script>
${sketch}
    </script>
  </body>
</html>`;
}

function p5Viewer(inports, outports, state) {
  function render() {
    return html` <style>
        #sketch {
          display: block;
          border: none;
          height: 100%;
          width: 100%;
        }
      </style>
      <iframe id="sketch" srcdoc=${makeSrc(inports.sketch.value)}></iframe>`;
  }

  return { render };
}

export default { config, tool: p5Viewer };
