import {
  createListener,
  cmdType,
  dataIndexFromString,
  dataIndicesSamePathCmd,
  isClosed,
} from "./utils.js";

export const addPointInteraction = (parentEl, state) => {
  const listen = createListener(parentEl);
  let draggedPoint = null;
  let indexString = "";
  let clearOnUp = false;

  listen("pointerdown", ".point", (e) => {
    state.transforming = true;
    draggedPoint = e.target;
    indexString = e.target.dataset.index;

    let removedEndSelection = false;
    if (state.keysPressed.includes("Shift")) {
      if (state.selectedPts.has(indexString)) {
        state.selectedPts.delete(indexString);

        removedEndSelection = applyMatchPt(indexString, (indices) => {
          state.selectedPts.delete(indices.join(","));
        });
      } else {
        state.selectedPts.add(indexString);
      }
    } else if (!state.selectedPts.has(indexString)) {
      state.selectedPts = new Set([indexString]);
    }

    if (!removedEndSelection)
      applyMatchPt(indexString, (indices) => {
        state.selectedPts.add(indices.join(","));
        if (state.selectedPts.size === 2) clearOnUp = true;
      });

    if (state.selectedPts.size === 1) clearOnUp = true;
    state.dispatch();
  });

  listen("pointermove", "", (e) => {
    if (!state.transforming) return;

    const { x, y } = state.panZoom.svgPoint({ x: e.offsetX, y: e.offsetY });

    const movingPt = dataIndexFromString(indexString).reduce(
      (acc, cur) => acc[cur],
      state.paths
    );

    const offsetX = x - movingPt[0];
    const offsetY = y - movingPt[1];

    // only do one of each end point

    const isEndPoint = (indexString) => {
      const [pathIndex, cmdIndex] = indexString.split(",");

      return (
        Number(cmdIndex) === 0 ||
        Number(cmdIndex) === state.paths[pathIndex].length - 1
      );
    };
    // const seenEndpoints = new Set();

    const closed = state.closedPaths.has(indexString.split(",")[0]);

    state.selectedPts.forEach((currIndexString) => {
      // Don't relative move the same point (or its handles, that will be handled by movePt)
      if (dataIndicesSamePathCmd(currIndexString, indexString)) return;
      if (closed && isEndPoint(indexString) && isEndPoint(currIndexString))
        return;

      const pathIndex = currIndexString.split(",")[0];
      relMovePt(dataIndexFromString(currIndexString), offsetX, offsetY);
    });

    movePt(dataIndexFromString(indexString), x, y);

    applyMatchPt(indexString, (i) => {
      // movePt(i, x, y);
      relMovePt(i, offsetX, offsetY);
    });
    state.dispatch();
  });

  listen("pointerup", "", (e) => {
    if (clearOnUp && !e.shiftKey) state.selectedPts = new Set();

    state.transforming = false;
    draggedPoint = null;
    clearOnUp = false;
    state.dispatch();
  });

  const applyMatchPt = (indexString, fn) => {
    const indices = dataIndexFromString(indexString);

    if (indices.length === 3 && [1, 3].includes(indices.at(-1))) return;

    const closed = state.closedPaths.has(indices[0]);
    if (!closed) return false;

    const path = state.paths[indices[0]];
    const isFirstCmd = indices[1] === 0;
    const isLastCmd = indices[1] === path.length - 1;
    if (isFirstCmd) {
      indices[1] = path.length - 1;
      fn(indices);
    }

    if (isLastCmd) {
      indices[1] = 0;
      fn(indices);
    }
    state.dispatch();

    return true;
  };

  function relMovePt(index, dx, dy) {
    let movingPt = index.reduce((acc, cur) => acc[cur], state.paths);

    movingPt[0] += dx;
    movingPt[1] += dy;
    state.dispatch();

    return;
  }

  function movePt(index, x, y) {
    const path = state.paths[index[0]];
    const cmd = path[index[1]];
    const type = cmdType(cmd);

    // selected single pt
    if (type === "point") {
      const movingPt = index.reduce((acc, cur) => acc[cur], state.paths);
      movingPt[0] = x;
      movingPt[1] = y;
      state.dispatch();

      return;
    }

    let [_, h0, p0, h1] = getBezier(index);

    const lastIndex = index.at(-1);

    const movingPt = {
      1: h0,
      2: p0,
      3: h1,
    }[lastIndex];

    const startingPt = [...movingPt];

    movingPt[0] = x;
    movingPt[1] = y;

    const offsetX = movingPt[0] - startingPt[0];
    const offsetY = movingPt[1] - startingPt[1];

    if (state.handleMovement !== "broken" && [1, 3].includes(lastIndex)) {
      const center = p0;

      let partnerPt = {
        1: h1,
        3: h0,
      }[lastIndex];

      const dx = x - center[0];
      const dy = y - center[1];

      const angle = getAngle([x, y], center);

      if (state.handleMovement === "symmetric") {
        partnerPt[0] = center[0] - dx;
        partnerPt[1] = center[1] - dy;
      } else if (state.handleMovement === "colinear") {
        const mag = Math.sqrt(
          (partnerPt[0] - center[0]) ** 2 + (partnerPt[1] - center[1]) ** 2
        );

        partnerPt[0] = center[0] - mag * Math.cos(angle);
        partnerPt[1] = center[1] - mag * Math.sin(angle);
      }
    }

    if (lastIndex === 2) {
      h0[0] += offsetX;
      h0[1] += offsetY;

      h1[0] += offsetX;
      h1[1] += offsetY;
    }
    state.dispatch();
  }

  function getBezier(index) {
    let [_, h0, p0, h1] = index
      .slice(0, -1)
      .reduce((acc, cur) => acc[cur], state.paths);

    const path = state.paths[index[0]];
    const closed = state.closedPaths.has(index[0]);
    const firstCmd = path[0];
    const lastCmd = path.at(-1);

    if (closed && [0, path.length - 1].includes(index[1])) {
      h0 = lastCmd[1];
      h1 = firstCmd[3];
    }

    return ["cubic", h0, p0, h1];
  }
};

function getAngle(lastPoint, secondLastPoint) {
  const x = lastPoint[0] - secondLastPoint[0];
  const y = lastPoint[1] - secondLastPoint[1];

  // in rads
  return Math.atan2(y, x);
}
