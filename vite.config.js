import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        pdi: resolve(__dirname, "tools/pdi/index.html"),
      },
    },
  },
});
