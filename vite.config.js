import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { 
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Cấu hình port và proxy đã có
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    }
  },
});