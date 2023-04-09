import { createListener } from "./utils.js";

export function addSelectBox(el, state) {
  const listen = createListener(el);

  let start = null;
  let end = null;

  const stop = () => {
    start = null;
    end = null;
    state.selectBox.start = start;
    state.selectBox.end = end;
  };

  listen("mousedown", "", (e) => {
    if (!e.shiftKey) return;

    start = state.panZoom.svgPoint({ x: e.offsetX, y: e.offsetY });
  });

  listen("mousemove", "", (e) => {
    // document.body.classList.add("no-select");
    if (!e.shiftKey) {
      stop();
      return;
    }
    if (start === null) return;

    end = state.panZoom.svgPoint({ x: e.offsetX, y: e.offsetY });

    state.selectBox.start = start;
    state.selectBox.end = end;
  });

  function contains(p, selectBox) {
    // console.log(p, selectBox);
    let { start, end } = selectBox;
    return (
      (p.x > start.x && p.x < end.x && p.y > start.y && p.y < end.y) ||
      (p.x > start.x && p.x < end.x && p.y < start.y && p.y > end.y) ||
      (p.x < start.x && p.x > end.x && p.y > start.y && p.y < end.y) ||
      (p.x < start.x && p.x > end.x && p.y < start.y && p.y > end.y)
    );
  }

  listen("mouseup", "", (e) => {

    // document.body.classList.remove("no-select");
    if (start && end) {
      const selectBox = { start, end };
      // select

      getPtsFromPaths(Object.entries(state.paths)).forEach((pt) => {
        let [index, loc] = pt;
        loc = { x: loc[0], y: loc[1] };

        if (contains(loc, selectBox)) {
          const ptVisible = document
            .querySelector(`[data-index="${index}"]`)
            .getAttribute("display") !== "none";

          if (ptVisible) state.selectedPts.add(index);
        }
      });
    }

    stop();
  });
}

function getPtsFromPaths(paths) {
  const pts = [];

  paths.forEach(([key, path]) => pts.push(...getPtsFromPath(path, key)));

  return pts;
}

function getPtsFromPath(path, pathKey) {
  const pts = [];

  path.forEach((cmd, cmdIndex) => {
    const pathcmd = `${pathKey},${cmdIndex}`;

    // cmd type is point
    if (cmd.length === 2) {
      pts.push([pathcmd, cmd]);
    }

    // cmd type is cubic
    if (cmd.length === 4) {
      const [_, h0, p0, h1] = cmd;
      if (cmdIndex !== 0) pts.push([`${pathcmd},1`, h0]);
      pts.push([`${pathcmd},2`, p0]);
      if (cmdIndex !== path.length - 1) pts.push([`${pathcmd},3`, h1]);
    }
  });

  return pts;
}
