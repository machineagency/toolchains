import { html } from "lit-html";
import { Printer } from "../../common/printer";

const POTTER_START = `
M82 ;absolute extrusion mode
G28 ;Home
G1 X207.5 Y202.5 Z20 F10000 ;Move X and Y to center, Z to 20mm high
G1 E2000 F20000 ; !!Prime Extruder
G92 E0
G1 F30000`;

const POTTER_END = `
M83 ;Set to Relative Extrusion Mode
G28 Z ;Home Z
; === DEPRESSURIZE ===
G91
G91
G1 E-1300 F4000
G90
G90
`;

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
  state: { fast: 40, slow: 15, radius: 40, height: 200 },
  ui: {
    displayName: "Potter Velocity",
    width: 200,
    height: 100,
  },
};

function velocity(inports, outports, state) {
  function makeGcode() {
    let r = state.radius;
    let layer_height = 2.5;
    let nozzleRadius = 5;
    let num_layers = state.height / layer_height;
    let center = [140, 132];
    let numSteps = Math.PI * r;

    let pixelArr = inports.pixelArr.value;

    let p = new Printer(nozzleRadius, layer_height);
    p.start(POTTER_START);

    let current_row = 0;

    for (let layer = 0; layer < num_layers; layer++) {
      if (layer == 0) {
        p.move(center[0] + r, center[1], layer_height);
        p.setFeedrate(p.speeds["wall_outer"]);
      }

      let current_col = 0;

      for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / numSteps) {
        if (layer > 1) {
          let pixelValue =
            pixelArr[Math.floor(current_row)][Math.floor(current_col)];
          let feed = pixelValue > 125 ? state.fast : state.slow;
          p.setFeedrate(feed);
          current_col += 1;
          if (current_col > pixelArr[0].length - 1) current_col = 0;
        }
        let x = r * Math.cos(theta) + center[0];
        let y = r * Math.sin(theta) + center[1];

        p.extrude_xy(x, y);
      }

      current_row += 1;
      if (current_row > pixelArr.length - 1) current_row = 0;

      p.zInc();
    }

    p.end(POTTER_END);
    let gcode = p.gcode();
    outports.gcode.value = gcode;
  }

  function render() {
    return html`<style>
        .container {
          display: grid;
          grid-template-columns: auto auto auto;
          width: 100%;
          grid-gap: 0.2rem;
          background-color: var(--text-light);
        }
        input[type="number"] {
          width: 50px;
        }
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          background-color: var(--blue);
          font-weight: 600;
          border-top: 1px solid var(--black);
          padding: 0.3rem;
        }
        .btn:hover {
          cursor: pointer;
          background-color: var(--purple);
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
      </div>
      <div class="btn" @click=${makeGcode}>
        <span>Make G-code</span>
      </div>`;
  }

  return { render };
}

export default { config, tool: velocity };
