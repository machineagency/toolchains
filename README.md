# toolchains

- core
  - [x] add/remove tools
  - [ ] save/load toolchain state
  - [ ] connect/disconnect ports
  - [ ] basic port type checking
- tool lifecyle
  - [ ] init
  - [ ] onResize
  - [ ] onConnection (in/outport)
  - [ ] onPortUpdate
- workspace ui
  - [x] tool library
  - [x] pan zoom
  - [x] background
  - [x] click button to add a tool
  - [ ] collapse all toolui
  - [ ] box select tools for moving
  - [ ] nice pipe routing
  - [ ] tool alignment/layout
  - [ ] mobile pan zoom
  - [ ] tool layering
  - [ ] active tool should be highlighted?
  - [ ] toolchain shape pane
- tool ui
  - [x] render template tool ui
  - [x] ports
  - [x] header
  - [x] state pane
  - [x] pin tool ui panels open
  - [ ] drag tool
  - [ ] edit displayname
- in-tool ui
  - [x] set initial width and height from tool config
  - how to handle tool style scoping?
  - should i stick with lit-html templating?

## tool implementation

- initialized from a default/saved state
- returns lifecycle methods
- tool lifecycle
  - init
  - save
  - reload
  - render
  - resize
  - connect
  - disconnect
  - inportsUpdated

```js
export function tool(toolState, globalState) {
  let localVar = 123;

  const init = () => {};
  const resize = () => {};
  const inports = () => {};
  const view = () => {};
}
```
