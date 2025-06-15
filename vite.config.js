import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  base: "/",
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  server: {
    port: 5371,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
