import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // server: {
  //   port: 5000,
  //   proxy: {
  //     "/api": "http://localhost:5000",
  //     "/auth": "http://localhost:5000",
  //     "/auth/google/callback": "http://localhost:5000",
  //     "/auth/instagram": "http://localhost:5000",
  //   },
  // },
  // build: {
  //   outDir: "dist",
  //   assetsDir: "assets",
  // },
});
