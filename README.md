# toolchains

- core
  - [x] add/remove tools
  - [x] pan/zoom workspace
  - [x] drag tools
  - [x] add/remove pipes
    - [x] draw pipes between ports
    - [x] send data from outports to inports
    - [x] pipes update when tools moved
    - [x] remove pipes between ports
  - [x] save/load toolchain state
  - [x] save/load workspace view (pan zoom)
  - [x] example dropdown
  - [ ] basic port type checking
  - [ ] clear current toolchain
- tool lifecycle
  - [x] init
  - [ ] resize
  - [ ] save state
  - [ ] load state
- tool ui
  - [x] set initial width and height from tool config
  - [x] render template tool ui
  - [x] ports
  - [x] header
  - [x] state pane
  - [x] pin tool ui panels open
  - [x] allow tools with no ui
  - [x] edit displayname
  - [x] collapse ui
  - [ ] hide state toggle if no state
  - [ ] ui flex mode
- debug pane
  - [ ] highlight tool/pipe when hovered
  - [ ] inspect current port values
- workspace ui
  - [x] tool library
  - [x] background dots
  - [x] click button to add a tool
  - [x] tool layering
  - [x] box select tools for moving
  - [ ] collapse all toolui
  - [ ] nice pipe routing
  - [ ] tool alignment/layout
  - [ ] mobile pan zoom
- questions
  - _how to handle tool style scoping?_ - I made a custom lit directive which
    renders each tool's UI to a shadow DOM. Unsure if this will cause
    performance issues down the road, but it seems to work fine right now.

## tool implementation

**Current approach:** when a tool is imported, we import the default export from
the tool's file. This should be a object containing the tool's configuration and
a function which returns its lifecycle methods.

- lifecycle methods
  - `render` - returns a template that is rendered in a toolpane
  - `init` - run when the tool is added to the toolchain. _saved state will be
    passed in if present?_
  - `save` - run when a toolchain's state is saved. should return an object
    representing the saved state of the tool.
  - `resize` - run when the tool's ui is resized in the toolchain interface
  - `connect` - run when a pipe is connected to a port
  - `disconnect` - run when a pipe is disconnected from a port
  - `inportsUpdated` - run when inports receive new data
  - `remove` - when tool is removed from toolchain
- tool config
  - `ui`
  - `state`
  - `inports`
  - `outports`

Tool types?

- stateless
- stateful
- push
- pull
- mini

### Example tool definition

```js
import { html } from "lit-html";

const config = {
  inports: {
    text: {
      type: "string",
      value: "asdf",
    },
    num: {
      type: "number",
      value: 57,
    },
    bool: {
      type: "boolean",
      value: false,
    },
  },
  outports: {
    text: {
      type: "string",
      value: "asdf",
    },
    num: {
      type: "number",
      value: 57,
    },
    bool: {
      type: "boolean",
      value: false,
    },
  },
  state: {
    colors: [],
    currentColor: "#ffff00",
    num: 500000,
    floatieBoi: 25.8,
    obj: { currentColor: "#ffff00", num: 500000, floatieBoi: 25.8 },
  },
  ui: {
    displayName: "Test",
    width: "200px",
    height: "200px",
  },
};

function test(inports, outports, state) {
  let localVar = Math.floor(Math.random() * 40);

  const init = () => {
    shuffle();
  };

  const resize = () => {};

  const shuffle = (e) => {
    state.colors = new Array(30).fill(0).map(() => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });
  };

  const render = () => {
    return html`<style>
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
          grid-auto-rows: auto;
          flex: 1;
        }
        .grid-container > div {
          width: 100%;
        }
        .grid-container > div:hover {
          background-color: var(--pink);
        }
        button {
          width: 100%;
        }
      </style>
      <div class="container">
        <div class="grid-container">
          ${state.colors.map(
            (color) => html`<div style="background-color: ${color};"></div>`
          )}
        </div>
        <button @click=${shuffle}>Shuffle!</button>
      </div>`;
  };

  return { init, resize, render };
}

export default { config, tool: test };
```
