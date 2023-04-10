# toolchains

This is prototype V4~ish of [Hannah](https://twigg.gg) building an extensible
event-driven dataflow environment. It's a JS-only implementation of my previous
version, [Planager](https://github.com/machineagency/planager). I originally
began this project with the goal of using it for digital fabrication, but the
feature set general enough that I could see it be used for many applications.

## Running Locally

Running Toolchains locally is easy!

- Make sure you have [Node](https://nodejs.org/) installed.
- Clone the repository locally and `cd` into it
- `npm install` installs the dependencies
- `npm run dev` starts the local development server

## Todo List

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
  - [ ] compound tools
  - [ ] mobile pan zoom
- QoL things
  - [ ] tool layering - any selected tool should be above others
  - [ ] add tool to coordinates in current view, rather than 0,0
  - [ ] clear current toolchain
  - [x] name toolchain
  - [ ] pipe coloring for boolean/null values
  - [ ] cache toolchains to local storage?
  - [ ] adaptive pipe routing? current beziers are fine for most cases but not
        great for e.g. cycles.
  - [ ] tool alignment/layout commands, should be available under selection
        context menu
    - align left, right, center
    - vertical/horizontal even spread
  - [ ] fade/adjust dotted background on scroll
- tool ui
  - [x] set initial width and height from tool config
  - [x] render template tool ui
  - [x] ports
  - [x] header
  - [x] state pane
  - [x] edit displayname
  - [x] collapse ui
  - [x] resize handle
  - [ ] toolbar context menu
    - [x] remove tool
    - [x] collapse ui elements (hide ports when not active)
    - [x] Edit tool display name
    - [ ] show state inspector
- workspace ui
  - [x] tool library
  - [x] background dots
  - [x] box select tools
  - [x] move box selection
  - [ ] background context menu - maybe like grasshopper's commands
  - [ ] selection context menu
  - [ ] background annotations

### Debug Panel / Toolchain Inspector

- [x] current view coords and scale (in workspace coords)
- [x] current mouse coords (in workspace coords)
- [ ] highlight tool/pipe when hovered
- [ ] inspect current port values in debug pane

## Future Directions

Ideas for features that I think would be cool to implement.

- _In-workspace tool definition editor._ This is easily one of the future
  features I am most excited about working on.
- _Tool suggestions._ Right clicking a port gives a dropdown of tools it could
  be connected to. For example, an inport with type `boolean` could suggest a
  boolean toggle switch tool. Clicking on the suggestion would add the tool and
  connect it automatically.
- _Auto tool configuration._ Ports with built-in value checking could suggest
  tools that are auto-configured for them. For example, the saturation inport
  for HSL should accept a float between 0 and 100. The tool suggestion could be
  a number slider where `min = 0`, `max = 100`, `step = 0.001`, and
  `displayName = "saturation"`.

## Open Questions

Things I haven't decided how to implement yet, or for which I may not have an
ideal solution.

- ~~_How to handle tool style scoping?_~~
  - I made a custom lit directive which renders each tool's UI to a shadow DOM
    that is created when the tool is added to the toolchain. Unsure if this will
    cause performance issues related to render optimizations down the road, but
    it seems to work fine right now.
- _How to handle in-tool DOM querying?_
  - Querying the DOM from within the tool function doesn't work because the view
    is rendered to the shadow DOM. It is possible to use `lit-html`s'
    `createRef` directive to manage a reference to elements defined in the
    tool's view template, but I don't like this approach because it relies on an
    external library. I've thought of a few ways of implementing this, one of
    which is to pass in the root shadow DOM element to the tool definition
    function. This would let the tool query its own DOM directly. However, this
    means that the shadow DOM node would need to exist before initializing the
    tool. Open question indeed.
- _How to handle tool dependencies? (stylesheets, libraries, assets, etc)_
  - I definitely don't want tool dependencies to be installed/bundled with the
    toolchain environment. Currently, tools with external dependencies can
    dynamically import them from a CDN. This works locally, but causes some
    issues when using vite for bundling that I haven't looked into yet. For
    example, the `editor` tool uses CodeMirror and the dynamic imports in the
    built/deployed version fail.
- _Where to place the state inspection pane?_
  - In Planager, I had the tool's state pane be a dropdown from the tool view.
    This only looks nice when the tool view is the right size, otherwise it
    overflows, is too narrow/wide, etc. I'm not sure where to put it in the
    workspace interface, especially as I think it should be possible to have
    multiple state panes open at once. It might be a panel that has some visual
    indication it is connected to a tool, like a bounding box around both of
    them?
- _How to handle tool view resizing?_
  - Tools should be able to request resizing of their view. In Planager they
    arbitrarily expanded the view pane, which is not ideal because they have a
    fixed position and would then overlap other tools if they got too big. One
    approach would be to move other tools in the toolchain to accomodate changes
    in view size. I think this would be nice in some cases, but annoying in
    others.
- _Should there be different tool types?_
  - My gut says no. stateless vs stateful tools? Mini (no-view) tools?

## Tool Definition

**Current approach:** when a tool is imported, we import the default export from
the tool's file. This should be a object containing the tool's configuration and
a function which returns its lifecycle methods.

### Tool Configuration Object

This is subject to change. See current tool implementations in `tools/` for
current examples.

- `displayName` - The tool's display name, shown in its' view toolbar
- `width` - UI initial width in pixels
- `height` - UI initial height in pixels
- `state` - JSON-serializable object containing initial state values
- `inports` - JSON-serializable object defining the ports, their types, and
  their display names.
- `outports` - thinking of removing the concept of outports alltogether.
  outports could just be state.

```js
// Example configuration object - subject to change
const config = {
  displayName: "Counter",
  width: 200,
  height: 200,
  inports: {
    text: {
      type: "string",
    },
  },
  outports: {
    text: {
      type: "bool",
    },
  },
  state: {
    colors: [],
    currentColor: "#ffff00",
  },
};
```

### Tool Lifecycle Callbacks

- [x] `init` - called when tool added to toolchain, before the tool view is
      added to the DOM
- [x] `render` - called during the workspace render loop. Returns something
      `lit-html` can render, such as an `html` tagged template literal.
- [x] `postInit` - called after the tool's view has been added to the DOM
- [x] `inportsUpdated` - called when one of the outports connected to a tool's
      inport changes.
- [ ] `stateUpdated` - called when one of the tool's state values change. Could
      use this for built-in
- [ ] `onResize` - called on changes to tool view bounds
- [ ] `onZoom`/`onScale` - called on changes to workspace zoom
- [ ] `saveState` - called when saving a toolchain. Should return a
      JSON-serializable version of the state.
- [ ] `loadState` - called when loading a tool, before the first render. Should
      accept a JSON-serialized representation of the state and initialize state
      accordingly

### Global Toolchain Callbacks

These are callbacks that would be passed into the tool function. They allow the
tool to communicate with the toolchain runtime environment.

- [ ] `log` - logs a message to a toolchain-wide console
- [ ] `resize` - resizes the tool view
- [ ] `notify` - sends a notification - perhaps using the browser notification
      API.
- [ ] `isMobile` - checks if the toolchain is running in a mobile browser

### Example Tool Definition

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

## Icebox Features

These are things that are probably not worth taking the time to do, but I'll
list them anyway as I think of them.

- _pipe layering_ - A foreground tool's pipes would be drawn over a background
  tool if they are overlapping. The actual benefits from doing this are small
  and it would require making another SVG layer _and_ tool view layer, if not
  multiple.

## Project History

**V0: NoFlo.** I initially tried to use [NoFlo](https://noflojs.org/) to handle
dataflow. I quickly decided that relying on an existing dataflow framework was
too limiting, particularly because I wanted to be able to easily write custom
tool views to visualize and modify tool state - something that was not easily
acheivable with the framework.

**V1: Client-side JS + React.** Despite knowing _some_ JavaScript, this version
was mostly about me learning JavaScript and React. Many mistakes were made and
terrible code was written. Thinking back on it now, it's clear how little I knew
at the start.

**V2: React + Python Backend.** I realized many of the example applications I
wanted to build could easily be built from Python modules. For example, I wanted
to work with the AxiDraw plotter, which has a great Python library for
controlling it. I also had far more experience writing Python than I did
JavaScript. So, I wrote a Python library for managing the data flow and the
toolchain data structure. This version dynamically creates websocket connections
with the frontend, which pass port and state data between the back- and
front-ends. The frontend react components for each tool received proxy objects
for this data as props, and could modify the port/state values (which
automatically sent data to the backend). I again learned a lot building this
version.

**V3: Lit + Python Backend.** React's reliance on the virtual DOM made it hard
to build tools that used libraries that manipulate the DOM. Every workaround
felt hacky, such as needing to use a React-specific version of some library
(e.g. D3) that might not be well maintained or documented. Given that one of my
core goals is extensibility, particularly by others who might not be familiar
with the nuances of a virtual DOM, I thought it better to scrap React in favor
of a more external-library friendly component system. So I switched to Lit,
which extends HTMLElement rather than relying on JSX + a virtual DOM layer.
(This also meant I no longer had to deal with JSX transpilation, a big win).

**V4: Vanilla JS + `lit-html`.** Working within a component system began to be
more annoying than beneficial, particularly when it came to managing the
toolchain state. I also piloted V3 of the system in a small workshop study, and
one thing that became clear was that requiring the full stack was far clunkier
than desired. It also complicated building and deployment. So I started over in
vanilla JS with just the HTML templating and rendering functionality provided by
the standalone `lit-html` library. I am _far_ happier with the current
implementation, and see many clear paths toward implementing fun and interesting
features.
