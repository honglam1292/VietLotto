import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    checker({
      overlay: false,
      typescript: true,
      enableBuild: false,
    }),
    tailwindcss(),
  ],
  base: '/VietLotto/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 0, // Tránh inline các asset SVG lớn
  },
  server: {
    port: 3000,
    open: true,
  },
});
