class LineBreakTransformer {
  constructor() {
    // Holds stream data until a new line
    this.container = "";
  }

  transform(chunk, controller) {
    // appends the incoming incoming chunk to the container
    this.container += chunk;
    // tries to split on newline characters
    const lines = this.container.split("\r\n");
    // update the container to be whatever is left after splitting
    this.container = lines.pop();
    // for each line enqueue it in the controller (pop removed any unfinished line)
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    // Flush the stream
    controller.enqueue(this.container);
  }
}

export default function serialSetup(streamReader) {
  let port;
  let reader;
  let inputDone;
  let outputDone;
  let inputStream;
  let outputStream;

  async function readLoop() {
    while (true) {
      const { value, done } = await reader.read();
      if (value) {
        streamReader(value);
      }
      if (done) {
        console.log("[readLoop] DONE", done);
        reader.releaseLock();
        break;
      }
    }
  }

  function writeToStream(...lines) {
    const writer = outputStream.getWriter();
    lines.forEach((line) => {
      console.debug("[SEND]", line);
      writer.write(line + "\n");
    });
    writer.releaseLock();
  }

  async function connect() {
    if (!"serial" in navigator) {
      // The Web Serial API is not supported.
      alert("Please update to the latest Chrome");
      return;
    }
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const encoder = new TextEncoderStream();
    outputDone = encoder.readable.pipeTo(port.writable);
    outputStream = encoder.writable;

    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable.pipeThrough(
      new TransformStream(new LineBreakTransformer())
    );
    reader = inputStream.getReader();
    readLoop();
    return port;
  }

  async function disconnect() {
    // Close the input stream
    if (reader) {
      await reader.cancel();
      await inputDone.catch(() => {});
      reader = null;
      inputDone = null;
    }

    // Close the output stream
    if (outputStream) {
      await outputStream.getWriter().close();
      await outputDone;
      outputStream = null;
      outputDone = null;
    }

    // Close the port
    await port.close();
    port = null;
    return port;
  }

  return { connect, disconnect, writeToStream };
}
