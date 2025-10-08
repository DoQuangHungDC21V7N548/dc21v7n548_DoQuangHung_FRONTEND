import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // Cấu hình Port cho ứng dụng frontend
    port: 3001,
    
    // Cấu hình Proxy để chuyển tiếp yêu cầu /api sang server backend (API chạy ở 3000)
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    }
  },
});