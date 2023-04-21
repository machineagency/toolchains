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
    height: {
      type: "number",
      value: null,
    },
    radius: {
      type: "number",
      value: null,
    },
    layerHeight: {
      type: "number",
      value: null,
    },
    fast: {
      type: "number",
      value: null,
    },
    slow: {
      type: "number",
      value: null,
    },
  },
  outports: {
    gcode: {
      type: "string",
      value: null,
    },
  },
  state: {},
  ui: {
    displayName: "Potter Velocity",
    width: 200,
    height: 100,
  },
};

function velocity(inports, outports, state) {
  function makeGcode() {
    let r = inports.radius.value;
    let layer_height = inports.layerHeight.value;
    let nozzleRadius = 5;
    let num_layers = inports.height.value / layer_height;

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

  function inportsUpdated() {
    if (
      !inports.height.value ||
      !inports.pixelArr.value ||
      !inports.radius.value ||
      !inports.layerHeight.value ||
      !inports.fast.value ||
      !inports.slow.value
    ) {
      outports.gcode.value = null;
      return;
    }
    makeGcode();
  }

  return { inportsUpdated };
}

export default { config, tool: velocity };
