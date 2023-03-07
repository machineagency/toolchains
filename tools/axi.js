import { html, nothing } from "lit-html";

const config = {
  inports: {},
  outports: {
    serialOut: {
      type: "pulse",
      value: null,
    },
  },
  state: { connected: false },
  ui: {
    displayName: "Axi",
    width: "200px",
    height: "200px",
  },
};

const xyMove = (duration, dx, dy) => `SM,${duration},${dx},${dy}\r`;
const abMove = (duration, dx, dy) => `XM,${duration},${dx},${dy}\r`;

const commands = {
  nickname: "QT\r",
  reboot: "RB\r",
  queryPenUp: "QP\r",
  togglePen: "TP\r",
  disableMotors: "EM,0,0\r",
  enableMotors: "EM,1,1\r",
  abMove: abMove(1000, 1000, 1000),
  xyMove: xyMove(1000, 1000, 1000),
  eStop: "ES\r",
};

function axi(inports, outports, state) {
  function init() {}

  let responses = [];
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
      responses.push(value);
    }
  }

  async function write() {
    const textEncoder = new TextEncoderStream();
    writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

    writer = textEncoder.writable.getWriter();
  }

  async function sendCommand(command) {
    await writer.write(commands[command]);
  }

  async function doMove() {
    await writer.write(xyMove(1, 1, 1));
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

  const render = () => {
    return html`<style>
        button {
          width: 100%;
        }
      </style>
      <div>Connected: ${state.connected}</div>
      <button @click=${connect}>
        ${state.connected ? "Disconnect" : "Connect"}
      </button>
      ${state.connected
        ? Object.keys(commands).map(
            (cmd) =>
              html`<button @click=${() => sendCommand(cmd)}>${cmd}</button>`
          )
        : nothing}
      <div>
        ${responses.map((response) => {
          return html`<div>${response}</div>`;
        })}
      </div>`;
  };

  return { init, render };
}

export default { config, tool: axi };
