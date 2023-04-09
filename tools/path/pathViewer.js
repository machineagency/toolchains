import { pathToCubics } from "./pdi/path.js";
import { html, svg, nothing } from "lit-html";

const examplePath = [
  [0, 0],
  ["cubic", [-8, -5], [-5, -8], [-2, -11]],
  [0, -6],
  ["cubic", [2, -11], [5, -8], [8, -5]],
  [0, 0],
];

const config = {
  inports: {
    paths: {
      type: "array",
      value: false,
    },
    bounds: {
      type: "domain2D",
      value: false,
    },
  },
  outports: {},
  state: {
    paths: {
      uniqueName: examplePath,
    },
  },
  ui: {
    displayName: "Path",
    width: 500,
    height: 300,
    resize: "both",
  },
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

function pathViewer(inports, outports, state) {
  const render = () => {
    let bounds = inports.bounds.value;
    return html`<style>
        svg {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        path {
          stroke: black;
          stroke-width: 3px;
        }
      </style>
      <svg preserveAspectRatio="xMidYMid meet">
        ${bounds
          ? svg`<rect x=${bounds.d1.min} y=${bounds.d2.min}
              height=${bounds.d2.max - bounds.d2.min}
              width=${bounds.d1.max - bounds.d1.min}
              fill="none"
              stroke="black"
              stroke-width="0.1"></rect>`
          : nothing}
        ${Object.entries(inports.paths.value).map(([k, v], i) =>
          renderPath(pathToCubics(v).cubics)
        )}
      </svg>`;
  };

  return { render };
}

export default { config, tool: pathViewer };
