import { html, render, svg, nothing } from "lit-html";
import { pathToCubics } from "./path.js";
import { addPanZoom } from "./addPanZoom.js";
import { addPanZoomMobile } from "./addPanZoomMobile.js";
import { addPointInteraction } from "./addPointInteraction.js";
import { addConvertPts } from "./addConvertPts.js";
import { addPathDrawing } from "./addPathDrawing.js";
import { addPointDeletion } from "./addPointDeletion.js";
import { addGlobalKeypress } from "./addGlobalKeypress.js";
import { addMouseTracking } from "./addMouseTracking.js";
import { addSelectBox } from "./addSelectBox.js";
import { cmdType } from "./utils.js";
import { addPathInteraction } from "./addPathInteraction.js";
import { exportSVG } from "./exportSVG.js";

const examplePath = [
  [0, 0],
  ["cubic", [-8, -5], [-5, -8], [-2, -11]],
  [0, -6],
  ["cubic", [2, -11], [5, -8], [8, -5]],
  [0, 0],
];

const examplePath1 = [
  [0, 12],
  ["cubic", [-8, 7], [-5, 4], [-2, 1]],
  [0, 6],
  ["cubic", [2, 1], [5, 4], [8, 7]],
  [0, 12],
];

const examplePath2 = [
  [0, 0], // TODO: this has bug on interaction
  ["relative", 10, 0],
  ["fillet", 0.3, ["relative", 0, 5]],
  ["turnForward", 90, 10],
  ["turnForward", 90, 5],
];

const defaultTheme = {
  "--background": "#0091c2",
  "--handle": "#b1d36f",
  "--preview": "#b7afa6",
  "--handleLine": "#20344c",
  "--point": "#f75060",
  "--cubicPoint": "#de7895",
  "--path": "#faead6",
  "--selectedPoint": "#20344c",
};

const global_state = {
  paths: {
    uniqueName: [],
  },
  bounds: null,
  closedPaths: new Set(["uniqueName"]),
  transforming: false,
  panZoom: null,
  handleMovement: "colinear",
  mode: "selection",
  viewMode: "handles",
  gridMode: "none",
  drawing: false,
  preview: null,
  selectedPts: new Set(),
  keysPressed: [],
  selectBox: {},
  mouse: [0, 0],
  drawingID: "",
  theme: defaultTheme,
  dispatch: null,
};

window.state = global_state;

const renderPreviewLine = (start, end) => {
  if (!start || !end) return "";

  const d = `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`;

  return svg`
    <path
      d=${d}
      stroke="var(--preview)"
      stroke-width="0.5"
      stroke-linecap="round"
      fill="none"></path>
  `;
};

const renderPath = (path) => {
  let d = "";

  path.forEach((cmd, cmdIndex) => {
    const [p0, h0, h1, p1] = cmd;
    const start = cmdIndex === 0 ? `M ${p0[0]} ${p0[1]}` : "";
    d += `${start} C ${h0[0]} ${h0[1]}, ${h1[0]} ${h1[1]}, ${p1[0]} ${p1[1]} `;
  });

  return svg`
    <path
      d=${d}
      stroke="var(--path)"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      class="path">
    </path>
  `;
};

const ptToCircle = (pt, ops = {}) => svg`
  <circle
    cx=${pt[0]}
    cy=${pt[1]}
    r=${getComputedStyle(document.documentElement).getPropertyValue(
      "--pointSize"
    )}
    display=${ops.display ?? "inherit"}
    fill=${ops.fill ?? "var(--point)"}
    stroke-width="0.15"
    stroke=${
      global_state.selectedPts.has(ops.index) ? "var(--selectedPoint)" : ""
    }
    data-index=${ops.index}
    data-type=${ops.type}
    class="point"
  >`;

const renderPts = (path, pathKey) => {
  let result = [];

  const pointDisplay = global_state["viewMode"] === "none" ? "none" : "inherit";
  const handleDisplay =
    global_state["viewMode"] === "handles" ? "inherit" : "none";

  path.forEach((cmd, cmdIndex) => {
    const pathcmd = `${pathKey},${cmdIndex}`;
    const type = cmdType(cmd);

    if (type === "point") {
      // Draw just a point
      result.push(
        ptToCircle(cmd, {
          display: pointDisplay,
          index: pathcmd,
          type: "point",
        })
      );
    }

    if (type === "cubic") {
      // Draw a point and handles
      const [_, h0, p0, h1] = cmd;

      const lineStyle = `
        stroke: var(--handleLine);
        stroke-width: 0.15;
        stroke-dasharray: 0.3;
        opacity: .7;
      `;

      if (cmdIndex !== 0)
        result.push(svg`
        <path display=${handleDisplay} style="${lineStyle}" d="M ${h0.join(
          " "
        )} L ${p0.join(" ")}">
      `);

      if (cmdIndex !== path.length - 1)
        result.push(svg`
        <path display=${handleDisplay} style="${lineStyle}" d="M ${h1.join(
          " "
        )} L ${p0.join(" ")}">
      `);

      // draw a handle (h0)
      if (cmdIndex !== 0)
        result.push(
          ptToCircle(h0, {
            display: handleDisplay,
            fill: "var(--handle)",
            index: `${pathcmd},1`,
            type: "cubic",
          })
        );

      // draw point on path (p0)
      result.push(
        ptToCircle(p0, {
          display: pointDisplay,
          index: `${pathcmd},2`,
          fill: "var(--cubicPoint)",
          type: "cubic",
        })
      );

      // draw a handle (h1)
      if (cmdIndex !== path.length - 1)
        result.push(
          ptToCircle(h1, {
            display: handleDisplay,
            fill: "var(--handle)",
            index: `${pathcmd},3`,
            type: "cubic",
          })
        );
    }

    if (type === "rel") {
    }
  });

  return result;
};

const drawPreview = (state) => {
  if (!state.drawing) return "";

  const lastPath = state.paths[state.drawingID];
  if (!lastPath) return "";
  const lastCommand = lastPath.at(-1);

  const lastPoint =
    cmdType(lastCommand) === "cubic" ? lastCommand[2] : lastCommand;

  return renderPreviewLine(lastPoint, state.preview);
};

const renderRadioSelect = (state, setting, options, displayName) => {
  return html` <div class="tool">
    <div class="tool-label">${displayName ?? setting}</div>
    <div class="radio-select">
      ${options.map(
        (op) => html`<span
          class="select-option ${state[setting] === op ? "selected" : ""}"
          @click=${() => {
            if (setting === "viewMode") state.selectedPts = new Set();

            state[setting] = op;
            state.drawing = false;
            state.preview = null;
          }}
          >${op}</span
        >`
      )}
    </div>
  </div>`;
};

const updateColorTheme = (state, colorVar, newVal) => {
  state.theme[colorVar] = newVal;
  window.localStorage.setItem(colorVar, newVal);
  document.documentElement.style.setProperty(colorVar, newVal);
};

const renderColorChooser = (state) => {
  return html` <div class="tool color-picker-tool">
    <div class="color-picker-label">
      <span>colors</span>
    </div>
    <div class="color-picker-container">
      ${Object.entries(state.theme).map((entry) => {
        return html`<div class="color-picker">
          <label for=${entry[0]}>${entry[0]}</label
          ><input
            id=${entry[0]}
            @input=${(e) => {
              updateColorTheme(state, entry[0], e.target.value);
            }}
            value=${entry[1]}
            type="color" />
        </div>`;
      })}
    </div>
  </div>`;
};

const renderGrid = (state) => {
  if (state.gridMode === "none") return;
  const x = state.panZoom.x();
  const y = state.panZoom.y();
  const scale = state.panZoom.scale();
  return svg`
    <defs>
      <pattern
        id="dots"
        x="${x - scale / 2}"
        y="${y - scale / 2}"
        width="${scale}"
        height="${scale}"
        patternUnits="userSpaceOnUse">
        <circle fill="var(--white)" cx="${scale / 2}" cy="${scale / 2}" r="1">
        </circle>
      </pattern>
      <pattern
        id="grid"
        x="${x}"
        y="${y}"
        width="${scale}"
        height="${scale}"
        patternUnits="userSpaceOnUse">
        <line stroke="var(--white)" x1="0" y1="0" x2="${scale}" y2="0"></line>
        <line stroke="var(--white)" x1="0" y1="0" x2="0" y2="${scale}"></line>
      </pattern>
    </defs>
    <rect
      class="grid-background"
      width="100%"
      height="100%"
      fill="url(#${state.gridMode})">
    </rect>`;
};

const view = (state) => {
  let style = "";
  for (const prop in state.theme) {
    const val = state.theme[prop];
    style += `${prop}: ${val};\n`;
  }

  return html`
    <div class="toolbox">
      <!-- ${renderColorChooser(state)} -->
      ${renderRadioSelect(
        state,
        "handleMovement",
        ["symmetric", "colinear", "broken"],
        "handles"
      )}
      ${renderRadioSelect(state, "mode", ["drawing", "selection"])}
      ${renderRadioSelect(
        state,
        "viewMode",
        ["handles", "points", "none"],
        "view"
      )}
      ${renderRadioSelect(
        state,
        "gridMode",
        ["grid", "dots", "none"],
        "background"
      )}
    </div>
    <!-- <div class="mouse-coords">
      ${state.mouse[0].toFixed(2)},${state.mouse[1].toFixed(2)}
    </div> -->
    <svg class="drawing-area" preserveAspectRatio="xMidYMid meet">
      <g style=${style}>
        <rect width="100%" height="100%" fill="var(--background)"></rect>
        ${state.panZoom ? renderGrid(state) : ""}
        <g class="transform-group">
          ${drawSelectBox(state)} ${drawPreview(state)}
          ${Object.entries(state.paths).map(([k, v], i) =>
            renderPath(pathToCubics(v).cubics)
          )}
          ${Object.entries(state.paths).map(([k, v], i) => renderPts(v, k))}
          ${state.bounds
            ? svg`<rect x=${state.bounds.d1.min} y=${state.bounds.d2.min}
              height=${state.bounds.d2.max - state.bounds.d2.min}
              width=${state.bounds.d1.max - state.bounds.d1.min}
              fill="none"
              stroke="black"
              stroke-width="0.1"></rect>`
            : nothing}
        </g>
      </g>
    </svg>
  `;
};

const drawSelectBox = (state) =>
  state.selectBox.start && state.selectBox.end
    ? svg`
  <path
    style="
      fill:#cb94e7;
      opacity: 0.6;
    "
    d="
      M ${state.selectBox.start.x} ${state.selectBox.start.y}
      L ${state.selectBox.end.x} ${state.selectBox.start.y}
      L ${state.selectBox.end.x} ${state.selectBox.end.y}
      L ${state.selectBox.start.x} ${state.selectBox.end.y}
    "
  />`
    : "";

render(view(global_state), document.body);

const svgEl = document.querySelector(".drawing-area");

// const panZoom = isMobile()
//   ? addPanZoomMobile(svgEl, global_state)
//   : addPanZoom(svgEl, global_state);
const panZoom = addPanZoom(svgEl, global_state);
global_state.panZoom = panZoom;

panZoom.setScaleXY({
  x: [0, 40],
  y: [0, 40],
});

const setBounds = (bounds) => {
  global_state.bounds = bounds;
  panZoom.setScaleXY({
    x: [bounds.d1.min, bounds.d1.max],
    y: [bounds.d2.min, bounds.d2.max],
  });
};

window.setBounds = setBounds;

addGlobalKeypress(global_state);
addPathInteraction(svgEl, global_state);
addPointInteraction(svgEl, global_state);
addPointDeletion(svgEl, global_state);
addConvertPts(svgEl, global_state);
addPathDrawing(svgEl, global_state);
addSelectBox(svgEl, global_state);
addMouseTracking(svgEl, global_state);

svgEl.addEventListener("mousedown", (e) => {
  if (e.detail === 2) e.preventDefault();
});

const r = () => {
  // Manually set vh and vw custom property units from inner height and width (for mobile browsers)
  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);

  render(view(global_state), document.body);
  window.requestAnimationFrame(r);
};

function pathsUpdated() {
  if (window.setPaths) {
    window.setPaths(global_state.paths);
  }
}

window.onload = (e) => {
  Object.keys(defaultTheme).map((varName) => {
    // global_state.theme[varName] = window.localStorage.getItem(varName) ?? defaultTheme[varName];
    global_state.theme[varName] = defaultTheme[varName];
    document.documentElement.style.setProperty(
      varName,
      global_state.theme[varName]
    );
  });

  global_state.dispatch = pathsUpdated;
};

window.requestAnimationFrame(r);

// function isMobile() {
//   let check = false;
//   (function (a) {
//     if (
//       /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
//         a
//       ) ||
//       /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
//         a.substr(0, 4)
//       )
//     )
//       check = true;
//   })(navigator.userAgent || navigator.vendor || window.opera);

//   return check;
// }
