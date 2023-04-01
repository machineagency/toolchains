import { html, nothing } from "lit-html";
import serialSetup from "../common/serial.js";
import { path } from "./pdi/path.js";

const stepsMM = 40;

// speed: mm/s
// dx: mm
// dy: mm
function relativeMove(speed, dx, dy) {
  let dist = Math.sqrt(dx * dx + dy * dy);
  let duration = Math.round((dist / speed) * 1000);
  let stepsX = Math.round(dx * stepsMM);
  let stepsY = Math.round(dy * stepsMM);

  if (duration == 0) console.log("INVALID DURATION");

  // Probably a bad fix but streaming XM commands can only be sustained
  // at 3 - 4ms duration. see https://evil-mad.github.io/EggBot/ebb.html#performance
  duration = duration < 4 ? 4 : duration;

  return `XM,${duration},${stepsX},${stepsY}`;
}

// speed: mm/s
// x: mm
// y: mm
function absoluteMove(stepFrequency, x, y) {
  if (!x) x = 0;
  if (!y) y = 0;

  let stepsX = Math.round(x * stepsMM);
  let stepsY = Math.round(y * stepsMM);

  // Convert to stepper move for mixed-axis geometry
  const AxisSteps1 = stepsX + stepsY;
  const AxisSteps2 = stepsX - stepsY;

  stepFrequency = stepFrequency > 25000 ? 25000 : stepFrequency;
  stepFrequency = stepFrequency < 2 ? 2 : stepFrequency;

  return `HM,${stepFrequency},${AxisSteps1},${AxisSteps2}`;
}

const commands = {
  penDown: "SP,0,500",
  penUp: "SP,1,500",
  home: "HM,20000",
  motorsOff: "EM,0,0",
  motorsOn: "EM,1,1",
  nickname: "QT",
  reboot: "RB",
  queryPenUp: "QP",
  togglePen: "TP",
  home: "HM,1000",
  disableMotors: "EM,0,0",
  enableMotors: "EM,1,1",
  eStop: "ES",
};

const config = {
  inports: {
    path: {
      type: "array",
      value: null,
    },
    testBounds: {
      type: "domain2D",
      value: null,
    },
    workspaceBounds: {
      type: "domain2D",
      value: null,
    },
  },
  outports: {
    serialOut: {
      type: "string",
      value: null,
    },
  },
  state: {
    connected: false,
    commandStream: [],
    commandHistory: [],
    currentPos: [0, 0],
    testOffset: 20,
    numTest: 0,
    penUpSpeed: 1000,
  },
  ui: {
    displayName: "Axi",
    width: 200,
    height: 200,
  },
};

function axidrawSerial(inports, outports, state) {
  let port, connect, disconnect, writeToStream;

  let currentCallback;

  function logger(value) {
    if (value.includes("OK")) {
      if (currentCallback) currentCallback();
    }
    if (value.includes("Err")) {
      console.log("ERROR!");
      console.log(value);
    }
  }

  function beginStream() {
    currentCallback = feedCommand;
    feedCommand();
  }

  function feedCommand() {
    if (state.commandStream.length === 0) {
      currentCallback = null;
      return;
    }
    // Write the command at the start of the stream
    writeToStream(state.commandStream[0]);
    // update the command array
    state.commandStream.shift();
  }

  function testPath() {
    console.log(state.numTest);
    // TODO: Actually calculate the test offset here
    const absStart = [state.numTest * state.testOffset, 0];

    // state.commandStream.push(absoluteMove(25000, absStart[0], absStart[1]));

    for (const cmdSet of Object.values(inports.path.value)) {
      // Move to the test start location
      state.commandStream.push(
        absoluteMove(state.penUpSpeed, absStart[0], absStart[1])
      );

      let flattenedPath = path(cmdSet);
      let lastX = flattenedPath[0][0];
      let lastY = flattenedPath[0][0];
      state.commandStream.push(commands.penUp);
      state.commandStream.push(commands.penDown);
      flattenedPath.forEach(([x, y]) => {
        let dx = x - lastX;
        let dy = y - lastY;
        lastX = x;
        lastY = y;
        // In-path moves are relative to the test start location
        state.commandStream.push(relativeMove(20, dx, dy));
      });
      state.commandStream.push(commands.penUp);
    }
    state.numTest++;
    beginStream();
  }

  async function onConnectClick() {
    if (port) {
      port = await disconnect();
      return;
    }

    ({ connect, disconnect, writeToStream } = serialSetup(logger));

    port = await connect();
  }

  function controls() {
    return html`<span
        >${state.commandStream.length > 0 ? "MOVING" : "NOT MOVING"}</span
      >
      <button @click=${() => writeToStream(commands.togglePen)}>
        Toggle Pen
      </button>
      <button @click=${() => writeToStream(commands.home)}>Home</button>
      <button @click=${testPath}>Test Path</button>
      <button @click=${() => writeToStream(commands.motorsOff)}>
        motorsOff
      </button>
      <button @click=${() => writeToStream(commands.motorsOn)}>
        motorsOn
      </button>`;
  }

  function render() {
    return html`
      <style>
        #controls-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
      </style>
      <div id="controls-container">
        <button @click=${onConnectClick}>
          ${port ? "Disconnect" : "Connect"}
        </button>
        ${port ? controls() : nothing}
      </div>
    `;
  }

  return { render };
}

export default { config, tool: axidrawSerial };
