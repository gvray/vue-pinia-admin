import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "mock", // mock 文件目录
      watchFiles: true,
      enable: true,
    }),
  ],
  resolve: {
    // https://cn.vitejs.dev/config/#resolve-alias
    alias: {
      // 设置路径
      "~": path.resolve(__dirname, "./"),
      // 设置别名
      "@": path.resolve(__dirname, "./src"),
    },
    // https://cn.vitejs.dev/config/#resolve-extensions
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
