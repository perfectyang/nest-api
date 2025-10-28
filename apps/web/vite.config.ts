import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 端口号
    port: 3001,
    // 是否自动打开浏览器(默认false)
    open: true,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:3004",
        changeOrigin: true,
        // rewrite: (name: string) => name.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});
