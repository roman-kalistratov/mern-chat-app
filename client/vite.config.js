import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import serverURI from "./src/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: serverURI,
      },
    },
  },
});
