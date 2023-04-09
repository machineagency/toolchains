import {
  createListener,
  dataIndexIsHandle,
  dataIndexFromString,
  removeCommand,
  removePath,
  getCmdType,
  isPathEmpty,
  getCmdPt,
} from "./utils.js";

export const addPointDeletion = (parentEl, state) => {
  const listen = createListener(parentEl);
  // listen("contextmenu", ".point", (e) => {
  //   e.preventDefault();

  //   const dataIndex = dataIndexFromString(e.target.dataset.index);
  //   const command = getCmdType(state.paths, dataIndex);

  //   if (command === "cubic" && dataIndexIsHandle(dataIndex)) return;

  //   removeCommand(state.paths, dataIndex);

  //   if (isPathEmpty(state.paths, dataIndex[0])) {
  //     // if path has no commands, remove it
  //     removePath(state.paths, dataIndex[0]);
  //   }
  // });

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Backspace") return;

    // TODO: if we deleted end point or start of closed path it ain't closed anymore
    const toDelete = [];
    state.selectedPts.forEach((id) => {
      const index = dataIndexFromString(id);
      const cmd = index.slice(0, 2).join(",");
      const path = state.paths[index[0]];

      const start = `${index[0]},${0}`;
      const end = `${index[0]},${path.length - 1}`;
      if (start === cmd || end === cmd) toDelete.push(index[0]);
    });

    toDelete.forEach((x) => state.closedPaths.delete(x));

    const newPaths = {};

    Object.entries(state.paths).forEach((e) => {
      const [k, v] = e;
      newPaths[k] = v.filter((cmd, i) => {
        const key = `${k},${i}`;

        return ![...state.selectedPts]
          .map((x) => x.split(",").slice(0, 2).join(","))
          .includes(key);
      });
    });

    state.paths = newPaths;
    state.selectedPts = new Set();
    state.dispatch();
  });
};
