import { snippetCompletion as snip } from "@codemirror/autocomplete";

export const snippets = [
  snip("function ${name}(${params}) {\n\t${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword",
  }),
  snip("function setup() {\n\t${}\n}\n\nfunction draw() {\n\t${}\n}", {
    label: "function",
    detail: "sketch skeleton",
    type: "keyword",
  }),
];
