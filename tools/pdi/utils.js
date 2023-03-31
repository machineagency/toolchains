export const removeCommand = (paths, dataIndex) => {
  paths[dataIndex[0]].splice(dataIndex[1], 1);
};

export const removePath = (paths, pathIndex) => {
  delete paths[pathIndex[0]];
};

export const isPathEmpty = (paths, pathIndex) => {
  return paths[pathIndex].length === 0;
};

export function cmdType(cmd) {
  if (typeof cmd[0] === "number") return "point";
  else return cmd[0];
}

export const getCmdType = (paths, dataIndex) => {
  return cmdType(paths[dataIndex[0]][dataIndex[1]]);
};

export const getCmdPt = (cmd) => {
   const type = cmdType(cmd);

   const pt = {
     "point": cmd,
     "cubic": cmd[2]
   }[type];

   if (!pt) console.log("unknown command type");

   return pt;
}



//////////////////////////////////////////////////

const trigger = (e) => e.composedPath()[0];
const matchesTrigger = (e, selectorString) =>
  trigger(e).matches(selectorString);

// create on listener
export const createListener =
  (target) => (eventName, selectorString, event) => {
    // focus doesn't work with this, focus doesn't bubble, need focusin
    target.addEventListener(eventName, (e) => {
      e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
      if (selectorString === "" || matchesTrigger(e, selectorString)) event(e);
    });
  };


//////////////////////////////////////////////////


export const getPathCmdString = (dataIndexString) => {
  return dataIndexString.split(",").slice(0, 2).join(",");
};

export const dataIndicesSamePathCmd = (firstStr, secondStr) => {
  return getPathCmdString(firstStr) === getPathCmdString(secondStr);
};

export const dataIndexFromString = (dataIndexString) => {
  return dataIndexString
    .split(",")
    .map((x, i, arr) => 
      i !== 0
      ? Number(x.trim())
      : x.trim()
    );
};

export const dataIndexToString = (dataIndex) => {
  return dataIndex.join(",");
};

export const dataIndexIsHandle = (dataIndex) => {
  return dataIndex[2] === 1 || dataIndex[2] === 3;
};


/////////////////////////////////

export const overlap = (p1, p2) => length(p1, p2) < 0.000001;
export const length = ([x1, y1], [x2, y2]) => Math.sqrt((x2-x1)**2 + (y2-y1)**2);

export function isClosed(path) {
  const getPoint = (index) => {
     const cmd = path[index];
     const type = cmdType(cmd);

     const pt = {
       "point": cmd,
       "cubic": cmd[2]
     }[type];

     if (!pt) console.log("unknown command type");


     return pt;
  }

  const first = getPoint(0);
  const last = getPoint(path.length-1);

  return overlap(first, last);
}

export function makeID(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
