import { html, nothing } from "lit-html";

// speed: mm/s
// dx: mm
// dy: mm
function segment(speed, dx, dy) {
  const stepsMM = 40;
  let dist = Math.sqrt(dx * dx + dy * dy);
  let duration = Math.floor((dist / speed) * 1000);
  let stepsX = Math.floor(dx * stepsMM);
  let stepsY = Math.floor(dy * stepsMM);

  return `XM,${duration},${stepsX},${stepsY}\r`;
}

const commands = {
  nickname: "QT\r",
  reboot: "RB\r",
  queryPenUp: "QP\r",
  togglePen: "TP\r",
  home: "HM,1000\r",
  disableMotors: "EM,0,0\r",
  enableMotors: "EM,1,1\r",
  segment: segment(5, 10, 10),
  eStop: "ES\r",
};

const config = {
  inports: {},
  outports: {
    serialOut: {
      type: "string",
      value: null,
    },
  },
  state: { connected: false, currentCommand: commands.nickname },
  ui: {
    displayName: "Axi",
    width: "200px",
    height: "200px",
  },
};

function axidrawSerial(inports, outports, state) {
  function init() {}

  let writer;
  let reader;
  let readableStreamClosed;
  let writableStreamClosed;
  let port;

  async function read() {
    const textDecoder = new TextDecoderStream();
    readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    reader = textDecoder.readable.getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break;
      }
      console.log(`AXI says ${value}`);
      outports.serialOut.value = value;
    }
  }

  async function write() {
    const textEncoder = new TextEncoderStream();
    writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

    writer = textEncoder.writable.getWriter();
  }

  async function sendCommand(command) {
    await writer.write(command);
  }

  async function openPort() {
    await port.open({ baudRate: 9600 });
    state.connected = true;
    read();
    write();
  }

  async function closePort() {
    reader.cancel();
    await readableStreamClosed.catch(() => {
      /* Ignore the error */
    });

    writer.close();
    await writableStreamClosed;

    await port.close();
    state.connected = false;
  }

  async function connect() {
    if (!state.connected) {
      navigator.serial
        .requestPort()
        .then((connectedPort) => {
          port = connectedPort;
          openPort();
        })
        .catch((e) => {
          console.log("oops no port selected");
        });
    } else {
      console.log("Disconnect");
      closePort();
    }
  }

  function controls() {
    return html`<input type="text" value=${state.currentCommand} />
      <button @click=${() => sendCommand(state.currentCommand)}>send</button>`;
  }

  function render() {
    return html`
      <button @click=${connect}>
        ${state.connected ? "Disconnect" : "Connect"}
      </button>
      ${state.connected ? controls() : nothing}
    `;
  }

  return { init, render };
}

export default { config, tool: axidrawSerial };
