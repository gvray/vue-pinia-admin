import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default function createAutoImport() {
  return AutoImport({
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    imports: ["vue", "vue-router", "pinia"],
    // 自动导入 Element Plus 相关函数
    resolvers: [ElementPlusResolver()],
    // 生成自动导入的 d.ts 文件
    dts: "types/auto-imports.d.ts",
  });
}
