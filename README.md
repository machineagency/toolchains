# toolchains

- core

  - [x] add/remove tools
  - [ ] save/load toolchain state
  - [ ] connect/disconnect ports
  - [ ] basic port type checking

- in-tool ui
  - [x] set initial width and height from tool config
  - how to handle tool style scoping?
  - should i stick with lit-html templating?

## tool implementation

**Current approach:** when a tool is imported, we import the default export from
the tool's file. This should be a function which returns the tool's
configuration, state, and lifecycle methods. It can optionally accept a
`toolchain` parameter, which is an object containing methods the tool can use to
interact with the global toolchain interface, e.g. by logging to the console.

- tool methods
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

### Example tool definition

```js
export default function tool(toolchain) {
  const ui = {
    displayName: "Example",
    width: "200px",
    height: "200px",
  };

  const state = {
    colors: [],
    currentColor: "#ffff00",
    num: 500000,
    floatieBoi: 25.8,
    obj: { currentColor: "#ffff00", num: 500000, floatieBoi: 25.8 },
  };

  const inports = {
    text: {
      type: "string",
      value: null,
    },
  };

  const outports = {
    text: {
      type: "string",
      value: null,
    },
  };

  const init = () => {};
  const resize = () => {};

  const render = () => {
    return html`<button @click=${shuffle}>Shuffle!</button>
      <div class="grid-container">
        ${state.colors.map(
          (color) => html`<div style="background-color: ${color};"></div>`
        )}
      </div> `;
  };
}
```

## Tool UI

The tool ui comprises the additional interface elements rendered around a tool's
view. This includes:

- Toolbar

  - tool display name
  - show/hide state pane bu
  - show/hide tool ui
  - remove tool

### todo

- [x] render template tool ui
- [x] ports
- [x] header
- [x] state pane
- [x] pin tool ui panels open
- [x] drag tool
- [ ] edit displayname

### Questions

- Should the active tool be highlighted?

## Toolchain workspace

- workspace ui
  - [x] tool library
  - [x] pan zoom
  - [x] background
  - [x] click button to add a tool
  - [x] tool layering
  - [ ] toolchain console
  - [ ] collapse all toolui
  - [ ] box select tools for moving
  - [ ] nice pipe routing
  - [ ] tool alignment/layout
  - [ ] mobile pan zoom
  - [ ] toolchain shape pane
