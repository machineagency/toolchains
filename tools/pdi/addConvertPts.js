import {
  createListener,
  dataIndicesSamePathCmd,
  dataIndexFromString,
} from "./utils.js";

export function addConvertPts(parentEl, state) {
  const listen = createListener(parentEl);

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

    return true;
  };

  listen("dblclick", ".point", (e) => {
    const type = e.target.dataset.type;
    const dataIndex = dataIndexFromString(e.target.dataset.index);
    const path = state.paths[dataIndex[0]];

    if (type === "point" || (type === "cubic" && dataIndex.at(-1) === 2)) {
      state.selectedPts.forEach((x) => {
        if (!dataIndicesSamePathCmd(e.target.dataset.index, x)) return;
        state.selectedPts.delete(x);

        applyMatchPt(e.target.dataset.index, (i) => {
          state.selectedPts.delete(i);
        });
      });

      const closed = state.closedPaths.has(dataIndex[0]);

      const pt = dataIndex.reduce((acc, cur) => acc[cur], state.paths);

      if (type === "cubic") {
        path[dataIndex[1]] = [...pt];

        if (closed) {
          if (dataIndex[1] === 0) {
            path[path.length - 1] = [...pt];
          }

          if (dataIndex[1] === path.length - 1) {
            path[0] = [...pt];
          }
        }
      }

      if (type === "point") {
        const angle = getAnglePath(path, dataIndex[1]);

        const mag = 2;

        let h0 = [pt[0] - mag * Math.cos(angle), pt[1] - mag * Math.sin(angle)];

        let h1 = [pt[0] + mag * Math.cos(angle), pt[1] + mag * Math.sin(angle)];

        const bisectingPoint = [
          pt[0] - mag * Math.cos(angle + Math.PI / 2),
          pt[1] - mag * Math.sin(angle + Math.PI / 2),
        ];

        const side = (l0, l1, p0) =>
          (l1[0] - l0[0]) * (p0[1] - l0[1]) - (l1[1] - l0[1]) * (p0[0] - l0[0]);

        const pointBefore =
          dataIndex[1] >= 1
            ? getPoint(path, dataIndex[1] - 1)
            : getPoint(path, dataIndex[1]);

        const sameSide =
          side(pt, bisectingPoint, h0) *
            side(pt, bisectingPoint, pointBefore) >=
          0;

        if (!sameSide) {
          const temp = h0;
          h0 = h1;
          h1 = temp;
        }

        const newCubic = ["cubic", h0, [...pt], h1];
        path[dataIndex[1]] = newCubic;

        if (closed) {
          if (dataIndex[1] === 0) {
            path[path.length - 1] = JSON.parse(JSON.stringify(newCubic));
          }

          if (dataIndex[1] === path.length - 1) {
            path[0] = JSON.parse(JSON.stringify(newCubic));
          }
        }
      }
    }
    state.dispatch();
  });
}

function getAnglePath(path, index) {
  if (path.length <= 3) return 0;

  let pointBefore =
    index >= 1 ? getPoint(path, index - 1) : getPoint(path, index);

  let pointAfter =
    index < path.length - 1 ? getPoint(path, index + 1) : getPoint(path, index);

  if (index === 0 || index === path.length - 1) {
    pointBefore = getPoint(path, 1);
    pointAfter = getPoint(path, path.length - 2);
  }

  const point = getPoint(path, index);

  // var dAx = point[0] - pointBefore[0];
  // var dAy = point[1] - pointBefore[1];
  // var dBx = pointAfter[0] - point[0];
  // var dBy = pointAfter[1] - point[1];
  // var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
  // if(angle < 0) {angle = angle * -1;}

  const angle0 = getAngle(point, pointBefore);
  const angle1 = getAngle(pointAfter, point);
  const angle = (angle0 + angle1) / 2;

  // const prevNorm = normDiff(pointBefore, point);
  // const nextNorm = normDiff(point, pointAfter);
  // const angle = Math.acos(
  //   (prevNorm[0] * nextNorm[0]) +
  //   (prevNorm[1] * nextNorm[1])
  // )

  return angle;
}

function cmdType(cmd) {
  if (typeof cmd[0] === "number") return "point";
  else return cmd[0];
}

function getPoint(path, index) {
  const cmd = path[index];
  const type = cmdType(cmd);

  return type === "point" ? cmd : cmd[2];
}

function getAngle(lastPoint, secondLastPoint) {
  const x = lastPoint[0] - secondLastPoint[0];
  const y = lastPoint[1] - secondLastPoint[1];

  // in rads
  return Math.atan2(y, x);
}

function magDiff(p0, p1) {
  return Math.sqrt((p1[0] - p0[0]) ** 2 + (p1[1] - p0[1]) ** 2);
}

function normDiff(p0, p1) {
  const m = magDiff(p0, p1);

  return [(p1[0] - p0[0]) / m, (p1[1] - p0[1]) / m];
}
