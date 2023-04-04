import { html } from "lit-html";
import { Printer } from "../common/printer";

const config = {
  inports: {
    pixelArr: {
      type: "array",
      value: null,
    },
  },
  outports: {
    gcode: {
      type: "string",
      value: null,
    },
  },
  state: { fast: 30, slow: 5, radius: 20, height: 35 },
  ui: {
    displayName: "Velocity",
    width: 200,
    height: 200,
  },
};

function velocity(inports, outports, state) {
  function makeGcode() {
    let r = state.radius;
    let layer_height = 0.2;
    let num_layers = state.height / layer_height;
    let center = [100, 100];
    let pixelSize = 1; // pixel size in mm
    let numSteps = 4 * Math.PI * r;
    let stepDist = (2 * Math.PI * r) / numSteps;

    console.log(stepDist);

    let pixelArr = inports.pixelArr.value;
    pixelArr.reverse();
    let p = new Printer();
    p.start();
    p.extrude_rel();

    let current_row = 0;

    for (let layer = 0; layer < num_layers; layer++) {
      if (layer == 0) {
        p.fanOff();
        p.move(center[0] + r, center[1], layer_height);
        p.cmd("G1 F1500 E6.5");
        p.setTemp(215);
        p.setFeedrate(p.speeds["wall_outer"]);
      } else if (layer == 1) {
        p.setFan(85);
        p.setFeedrate(p.speeds["wall_outer"]);
      } else if (layer == 2) {
        p.setFan(170);
      } else if (layer == 3) {
        p.setFan(255);
      }

      let current_col = 0;

      for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / numSteps) {
        if (layer > 5) {
          let pixelValue =
            pixelArr[Math.floor(current_row)][Math.floor(current_col)];
          let feed = pixelValue > 125 ? state.fast : state.slow;
          p.setFeedrate(feed);
          current_col += 0.5;
          if (current_col > pixelArr[0].length - 1) current_col = 0;
        }
        let x = r * Math.cos(theta) + center[0];
        let y = r * Math.sin(theta) + center[1];
        p.extrude_xy(x, y);
      }
      if (layer > 5) {
        current_row += 0.5;
        if (current_row > pixelArr.length - 1) current_row = 0;
      }
      p.zInc();
    }

    p.end();
    let gcode = p.gcode();
    outports.gcode.value = gcode;
  }

  function render() {
    return html`<style>
        .container {
          display: grid;
          grid-template-columns: auto auto auto;
          width: fit-content;
          grid-gap: 0.2rem;
          margin: 0.2rem auto;
        }
        input[type="number"] {
          width: 30px;
        }
      </style>
      <div class="container">
        <span>Slowest</span>
        <input
          type="number"
          value=${state.slow}
          @change=${(e) => (state.slow = Number(e.target.value))} />
        <span>mm/s</span>
        <span>Fastest</span>
        <input
          type="number"
          value=${state.fast}
          @change=${(e) => (state.fast = Number(e.target.value))} />
        <span>mm/s</span>
        <span>Radius</span>
        <input
          type="number"
          value=${state.radius}
          @change=${(e) => (state.radius = Number(e.target.value))} />
        <span>mm</span>
        <span>Height</span>
        <input
          type="number"
          value=${state.height}
          @change=${(e) => (state.height = Number(e.target.value))} />
        <span>mm</span>
        <button @click=${makeGcode}>Make G-code</button>
      </div>`;
  }

  return { render };
}

export default { config, tool: velocity };
