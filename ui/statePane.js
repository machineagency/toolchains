import { html } from "lit-html";

function* intersperse(a, delim) {
  let first = true;
  for (const x of a) {
    if (!first) yield delim;
    first = false;
    yield x;
  }
}

const comma = html`,`;
const openSquareBracket = html`[`;
const closeSquareBracket = html`]`;
const openCurlyBrace = html`{`;
const closeCurlyBrace = html`}`;
const newLine = html`<br />`;

function renderObject(val) {
  if (Array.isArray(val)) return renderArray(val);
  if (!val) return renderNull();
  let arr = [];
  for (const [key, value] of Object.entries(val)) {
    arr.push(
      html`
        <span class="state-key">${key}:</span>
        <span class="state-value">${renderValue(value)}</span>
      `
    );
  }
  return html`<div class="keyval-container">${arr}</div>`;
}

function renderPreview(numChildren) {
  return html`<span>...</span>`;
}

function renderArray(val) {
  let arrHTML = [];
  for (const item of val) {
    arrHTML.push(renderValue(item));
  }
  let n = [
    openSquareBracket,
    ...intersperse(arrHTML, comma),
    closeSquareBracket,
  ];
  return n;
}

function renderNull() {
  return html`<span class="undef">null</span>`;
}

function renderNumber(val) {
  return html`<span class="number">${val}</span>`;
}

function renderString(val) {
  return html`<span class="string">${val}</span>`;
}

function renderBoolean(val) {
  return html`<span class="boolean">${val}</span>`;
}

function renderUndefined(val) {
  return html`<span>undef</span>`;
}

function renderPrimitive(node, path) {}

function renderValue(value) {
  let renderedValue;
  switch (typeof value) {
    case "object":
      renderedValue = renderObject(value);
      break;
    case "number":
      renderedValue = renderNumber(value);
      break;
    case "string":
      renderedValue = renderString(value);
      break;
    case "boolean":
      renderedValue = renderBoolean(value);
      break;
    case "undefined":
      renderedValue = renderUndefined(value);
      break;
  }
  let node = renderedValue;
  return node;
}

function renderState(state) {
  let arr = [];
  for (const [key, value] of Object.entries(state)) {
    arr.push(
      html` <span class="state-key">${key}</span>
        <span class="state-value">${renderValue(value)}</span>`
    );
  }
  return arr;
}

// function render() {
//   return html`<div>
//     <div id="header" class="unselectable" @click=${this.toggleCollapse}>
//       State
//     </div>
//     ${this.expanded
//       ? html`<div class="state-container">${this.renderState()}</div>`
//       : nothing}
//   </div>`;
// }

export function statePane(state) {
  return html` <div class="state-container">${renderState(state)}</div>`;
}
