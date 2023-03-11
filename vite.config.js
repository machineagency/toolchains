import { defineConfig } from "vite";
import { importAssertionsPlugin } from "rollup-plugin-import-assert";
import { importAssertions } from "acorn-import-assertions";

export default defineConfig({
  build: {
    rollupOptions: {
      acornInjectPlugins: [importAssertions],
      plugins: [importAssertionsPlugin],
      output: {
        externalImportAssertions: true,
      },
    },
  },
});
