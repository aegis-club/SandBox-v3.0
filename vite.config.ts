import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: false },
  build: {
    rollupOptions: {
      input: { main: resolve(import.meta.dirname, "index.html"), lab: resolve(import.meta.dirname, "logo-lab.html") },
    },
  },
});
