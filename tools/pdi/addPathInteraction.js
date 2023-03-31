import { createListener } from "./utils.js";

export const addPathInteraction = (parentEl, state) => {
  const listen = createListener(parentEl);
  listen("dblclick", ".path", (e) => {
    e.preventDefault();
    console.log(e.target);
  });
};
