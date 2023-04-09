import { defineConfig } from "vite";
import { basename, resolve } from "path";
import { default as tools } from "./toolbox.json";

// import glob from "glob";
// import path from "node:path";
// import { fileURLToPath } from "node:url";

let inputs = {
  main: resolve(__dirname, "index.html"),
  pdi: resolve(__dirname, "./tools/path/pdi/index.html"),
};

for (const group of tools) {
  for (const tool of group.entries) {
    // inputs[tool.path] = resolve(__dirname, tool.path);
    let entry = tool.path.split(".")[0];
    console.log(entry);
    inputs[entry] = resolve(__dirname, tool.path);
  }
}

// let test = Object.fromEntries(
//   glob.sync("tools/**/*.js").map((file) => [
//     // This remove `src/` as well as the file extension from each
//     // file, so e.g. src/nested/foo.js becomes nested/foo
//     path.relative(
//       "src",
//       file.slice(0, file.length - path.extname(file).length)
//     ),
//     // This expands the relative paths to absolute paths, so e.g.
//     // src/nested/foo becomes /project/src/nested/foo.js
//     fileURLToPath(new URL(file, import.meta.url)),
//   ])
// );

// console.log(test);

export default defineConfig({
  build: {
    rollupOptions: {
      // input: {
      //   main: resolve(__dirname, "index.html"),
      //   pdi: resolve(__dirname, "tools/path/pdi/index.html"),
      //   tools: toolPaths,
      // },
      input: inputs,
    },
  },
});
