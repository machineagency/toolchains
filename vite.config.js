import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        pdi: resolve(__dirname, "./tools/path/pdi/index.html"),
      },
    },
  },
});
