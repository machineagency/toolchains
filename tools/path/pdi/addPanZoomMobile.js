import { createListener } from "./utils.js";

export function addPanZoomMobile(el, state) {
  const listen = createListener(el);
  let scale = 1;
  let pointX = 0;
  let pointY = 0;
  let start = { x: 0, y: 0 };
  let pointerCache = [];
  let prevPointerDiff = -1;
  let didZoom = false;

  function setTransform(el) {
    el.style.transformOrigin = `${0}px ${0}px`;
    el.style.transform =
      "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    // if (state.gridSize > 0) dispatch("RENDER");
  }

  function svgPoint({ x, y }) {
    let newX = (x - pointX) / scale;
    let newY = (y - pointY) / scale;

    return { x: newX, y: newY };
  }

  listen("pointerdown", "", (e) => {
    if (state.keysPressed.includes("Shift")) return;

    pointerCache.push(e);

    start = { x: e.offsetX - pointX, y: e.offsetY - pointY };

    if (e.detail === 2) {
      // console.log(
      //   e.offsetX,
      //   e.offsetY,
      //   svgPoint({ x: e.offsetX, y: e.offsetY })
      // );
    }
  });

  listen("pointermove", "", (e) => {
    if (pointerCache.length === 0) return;
    if (state.transforming) return;
    if (state.keysPressed.includes("Shift")) return;

    const pointerIndex = pointerCache.findIndex(
      (cachedEv) => cachedEv.pointerId === e.pointerId
    );
    pointerCache[pointerIndex] = e;

    if (pointerCache.length === 2) {
      didZoom = true;
      const curDiff = Math.abs(
        pointerCache[0].clientX - pointerCache[1].clientX
      );

      if (prevPointerDiff > 0) {
        if (curDiff > prevPointerDiff) {
          console.log("pinching out, zoom in");
          pinchZoom(true);
        }
        if (curDiff < prevPointerDiff) {
          console.log("pinching in, zoom out");
          pinchZoom(false);
        }
      }
      prevPointerDiff = curDiff;
    } else if (pointerCache.length === 1) {
      if (didZoom) return;
      pointX = e.offsetX - start.x;
      pointY = e.offsetY - start.y;

      const imgs = document.querySelectorAll(".transform-group");

      for (const img of imgs) {
        setTransform(img);
      }
    }
  });

  listen("pointerup", "", (e) => {
    const pointerIndex = pointerCache.findIndex(
      (cachedEv) => cachedEv.pointerId === e.pointerId
    );
    pointerCache.splice(pointerIndex, 1);
    if (pointerCache.length === 0) {
      didZoom = false;
    }
  });

  const pinchZoom = (zoomIn) => {
    if (zoomIn) scale *= 1.01;
    else scale /= 1.01;

    const imgs = document.querySelectorAll(".transform-group");
    for (const img of imgs) {
      setTransform(img);
    }
  };

  listen("wheel", "", (e) => {
    let xs = (e.offsetX - pointX) / scale;
    let ys = (e.offsetY - pointY) / scale;

    if (Math.sign(e.deltaY) < 0) scale *= 1.03;
    else scale /= 1.03;

    pointX = e.offsetX - xs * scale;
    pointY = e.offsetY - ys * scale;

    const imgs = document.querySelectorAll(".transform-group");
    for (const img of imgs) {
      setTransform(img);
    }

    e.preventDefault();
  });

  function setScaleXY(limits) {
    const bb = el.getBoundingClientRect();
    const xr = limits.x[1] - limits.x[0];
    const yr = limits.y[1] - limits.y[0];
    const xScalingFactor = bb.width / xr;
    const yScalingFactor = bb.height / yr;

    const scalingFactor = Math.min(xScalingFactor, yScalingFactor) * 0.9;

    scale = scalingFactor;

    const center = {
      x: ((limits.x[0] + limits.x[1]) / 2) * scalingFactor - bb.width / 2,
      y: ((limits.y[0] + limits.y[1]) / 2) * scalingFactor - bb.height / 2,
    };

    pointX = -center.x;
    pointY = -center.y;

    const imgs = document.querySelectorAll(".transform-group");
    for (const img of imgs) {
      setTransform(img);
    }
  }

  function corners() {
    const { left, right, bottom, top, width, height } =
      el.getBoundingClientRect();
    // need rt, lt, rb, lb
    const rt = svgPoint({ x: width, y: height });
    // rt.y = -rt.y
    const lt = svgPoint({ x: 0, y: height });
    // lt.y = -lt.y
    const rb = svgPoint({ x: width, y: 0 });
    // rb.y = -rb.y
    const lb = svgPoint({ x: 0, y: 0 });
    // lb.y = -lb.y

    return { rt, lt, rb, lb };
  }

  return {
    scale: () => scale,
    x: () => pointX,
    y: () => pointY,
    corners,
    svgPoint,
    setScaleXY,
  };
}
