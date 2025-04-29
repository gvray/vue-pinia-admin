import { defineConfig } from "vite";
import path from "path";
import createVitePlugins from "./vite/plugins";

// https://vite.dev/config/
export default defineConfig({
  plugins: createVitePlugins({}, false),
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