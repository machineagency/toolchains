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

// pipe ID utils

export const buildPipeID = (startTool, startPort, endTool, endPort) => {
  return `${startTool}_${startPort}_${endTool}_${endPort}`;
};

export function selectElementContents(element) {
  let range = document.createRange();
  range.selectNodeContents(element);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

export function blurTargetOnEnter(e) {
  if (e.code === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
}

export function checkCharacterCount(element, max, e) {
  if (element.textContent.length > max) {
    e.preventDefault();
  }
}
