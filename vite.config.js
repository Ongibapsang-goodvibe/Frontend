import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/restaurants/api": {
        target: "http://localhost:8000", // Django 등 백엔드
        changeOrigin: true,
        secure: false,
      },
    },
  },
});