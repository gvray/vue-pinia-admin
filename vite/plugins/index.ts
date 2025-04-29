import vue from "@vitejs/plugin-vue";
import createSvgIcon from "./svg-icon";
import createAutoImport from "./auto-import";
import createComponents from "./components";
import createMockServer from "./mock";

export default function createVitePlugins(viteEnv: any, isBuild = false) {
  const vitePlugins = [vue()];

  // 添加 AutoImport 插件
  const autoImportPlugin = createAutoImport();
  if (Array.isArray(autoImportPlugin)) {
    vitePlugins.push(...autoImportPlugin);
  } else {
    vitePlugins.push(autoImportPlugin);
  }

  // 添加 SvgIcon 插件
  vitePlugins.push(createSvgIcon(isBuild));

  // 添加 Components 插件
  vitePlugins.push(createComponents());

  // 添加 Mock 服务插件
  vitePlugins.push(createMockServer());

  return vitePlugins;
}
