import { EditorView } from "@codemirror/view";
import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const dracula = {
  red: "#FF5555",
  orange: "#FFB86C",
  yellow: "#F1FA8C",
  green: "#50FA7B",
  purple: "#BD93F9",
  cyan: "#8BE9FD",
  pink: "#FF79C6",
  background: "#282A36",
  foreground: "#F8F8F2",
  selection: "#44475A",
  comment: "#6272A4",
  darkBackground: "#21222c",
  highlightBackground: "#44475A",
  numbers: "#3f5d9d",
  cursor: "#528bff",
};

const nord = {
  red: "#BF616A",
  orange: "#D08770",
  yellow: "#EBCB8B",
  green: "#A3BE8C",
  purple: "#B48EAD",
  cyan: "#88C0D0",
  pink: "#B48EAD",
  background: "#2E3440",
  foreground: "#ECEFF4",
  selection: "#434C5E",
  comment: "#6272A4",
  darkBackground: "#2E3440",
  highlightBackground: "#4C566A",
  numbers: "#5E81AC",
  cursor: "#528bff",
};

function makeTheme(theme) {
  return EditorView.theme(
    {
      "&": {
        color: theme.foreground,
        backgroundColor: theme.background,
      },

      ".cm-content": {
        caretColor: theme.cursor,
      },

      ".cm-cursor, .cm-dropCursor": { borderLeftColor: theme.cursor },
      "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
        { backgroundColor: theme.selection },

      ".cm-panels": {
        backgroundColor: theme.darkBackground,
        color: theme.foreground,
      },

      ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },

      ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

      ".cm-searchMatch": {
        backgroundColor: "#72a1ff59",
        outline: "1px solid #457dff",
      },
      ".cm-searchMatch.cm-searchMatch-selected": {
        backgroundColor: "#6199ff2f",
      },

      ".cm-activeLine": { backgroundColor: "#6699ff0b" },
      ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

      "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
        backgroundColor: "#bad0f847",
      },

      ".cm-gutters": {
        backgroundColor: theme.background,
        color: theme.numbers,
        border: "none",
      },

      ".cm-activeLineGutter": {
        backgroundColor: theme.background,
        color: theme.foreground,
      },

      ".cm-foldPlaceholder": {
        backgroundColor: "transparent",
        border: "none",
        color: "#ddd",
      },

      ".cm-tooltip": {
        border: "none",
        backgroundColor: theme.tooltipBackground,
      },
      ".cm-tooltip .cm-tooltip-arrow:before": {
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
      },
      ".cm-tooltip .cm-tooltip-arrow:after": {
        borderTopColor: theme.tooltipBackground,
        borderBottomColor: theme.tooltipBackground,
      },
      ".cm-tooltip-autocomplete": {
        "& > ul > li[aria-selected]": {
          backgroundColor: theme.highlightBackground,
          color: theme.foreground,
        },
      },
    },
    { dark: true }
  );
}

function makeHighlightStyle(theme) {
  return HighlightStyle.define([
    // General
    { tag: t.invalid, backgroundColor: theme.red, color: theme.foreground },

    // Diffs
    { tag: t.inserted, color: theme.green },
    { tag: t.deleted, color: theme.red },
    { tag: t.changed, color: theme.orange },

    // Markup
    { tag: t.strong, color: theme.orange, fontWeight: "bold" },
    { tag: t.heading, color: theme.purple, fontWeight: "bold" },
    { tag: t.emphasis, color: theme.yellow, fontStyle: "italic" },
    { tag: t.monospace, color: theme.green },
    { tag: t.link, color: theme.cyan, textDecoration: "underline" },
    { tag: t.strikethrough, textDecoration: "line-through" },

    // Comments
    { tag: t.comment, color: theme.comment },
    { tag: t.meta, color: theme.comment },

    // Constants
    { tag: t.constant(t.name), color: theme.purple },
    { tag: t.constant(t.variableName), color: theme.purple },

    // Entities
    { tag: t.tagName, color: theme.pink }, // HtmlTags and CssParentSelectors
    { tag: t.attributeName, color: theme.green, fontStyle: "italic" }, // HtmlCssAttributeNames
    { tag: t.attributeValue, color: theme.yellow },
    { tag: t.unit, color: theme.pink },
    { tag: t.className, color: theme.green, fontStyle: "italic" },
    { tag: t.labelName, color: theme.green, fontStyle: "italic" },

    // Functions/Methods
    { tag: t.function(t.variableName), color: theme.green },
    { tag: t.function(t.name), color: theme.green },

    // Keywords
    { tag: t.keyword, color: theme.pink },
    { tag: t.operatorKeyword, color: theme.cyan }, // e.g. css functions like calc?
    { tag: t.controlKeyword, color: theme.pink }, // e.g. conditionals
    { tag: t.definitionKeyword, color: theme.pink },

    // Language Built-ins
    { tag: t.standard(t.name), color: theme.purple },

    // Punctuation
    { tag: t.punctuation, color: theme.pink },
    { tag: t.separator, color: theme.foreground },
    { tag: t.bracket, color: theme.foreground },

    // Strings
    { tag: t.string, color: theme.yellow },
    { tag: t.regexp, color: theme.red },
    { tag: t.escape, color: theme.red },

    // Variables
    { tag: t.definition(t.name), color: theme.foreground },

    // Literals
    { tag: t.atom, color: theme.purple },
    { tag: t.number, color: theme.purple },
    { tag: t.color, color: theme.purple },
    { tag: t.bool, color: theme.purple },
    { tag: t.null, color: theme.purple },
    { tag: t.url, color: theme.cyan },
    { tag: t.self, color: theme.purple, fontStyle: "italic" },

    // OTHER
    { tag: t.propertyName, color: theme.cyan },
    { tag: t.function(t.propertyName), color: theme.green },

    // OPERATORS
    { tag: t.operator, color: theme.pink },
    { tag: t.definitionOperator, color: theme.pink },
    { tag: t.compareOperator, color: theme.pink },
    { tag: t.logicOperator, color: theme.pink },
    { tag: t.bitwiseOperator, color: theme.pink },
    { tag: t.arithmeticOperator, color: theme.pink },
    { tag: t.typeOperator, color: theme.pink },
    { tag: t.updateOperator, color: theme.pink },
    { tag: t.controlOperator, color: theme.pink },
    { tag: t.derefOperator, color: theme.pink },
  ]);
}

export const draculaTheme = makeTheme(dracula);
export const draculaHighlightStyle = makeHighlightStyle(dracula);

export const nordTheme = makeTheme(nord);
export const nordHighlightStyle = makeHighlightStyle(nord);
