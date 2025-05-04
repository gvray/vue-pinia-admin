import { defineStore } from "pinia";
import storetify from "storetify";
import { useDark, useToggle } from "@vueuse/core";
import defaultSettings from '@/settings';

// 定义设置状态的接口
interface SettingsState {
  theme: string;
  isDark: boolean;
  title: string;
  sideTheme: string;
}

const {sidebarTheme, theme, title} = defaultSettings;

const storetifySettings = storetify<SettingsState>("layout-setting");
// 使用useDark获取系统偏好的暗黑模式状态
const isDark = useDark();
const toggleDark = useToggle(isDark);

const getDefaultState = (): SettingsState => ({
  theme: storetifySettings?.theme || theme, // 默认主题
  sideTheme: storetifySettings?.sideTheme || sidebarTheme, // 默认主题
  isDark: isDark.value, // 使用系统偏好作为默认值
  title: title, // 默认标题
});

// 创建设置相关的store
const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => getDefaultState(),

  getters: {
    // 获取当前主题
    getTheme(): string {
      return this.theme;
    },
    // 获取当前是否为暗黑模式
    getIsDark(): boolean {
      return this.isDark;
    },
    // 获取当前标题
    getTitle(): string {
      return this.title;
    },
  },

  actions: {
    changeSettings(settings: Partial<SettingsState>) {
      Object.assign(this, settings);
    },
    changeSetting<K extends keyof SettingsState>(data: {
      key: K;
      value: SettingsState[K];
    }) {
      this[data.key] = data.value;
    },
    // 设置主题
    setTheme(theme: string) {
      this.theme = theme;
    },
    // 切换暗黑模式
    toggleDarkMode() {
      // 使用useToggle来切换暗黑模式
      toggleDark();
      this.isDark = isDark.value;
      // DOM的class会由useDark自动处理
    },
    // 设置标题
    setTitle(title: string) {
      this.title = title;
      // 可以在这里同步更新document的title
      document.title = title;
    },
    // 重置设置到默认值
    resetSettings() {
      const defaultState = getDefaultState();
      Object.assign(this, defaultState);
      // 同步更新isDark的值
      isDark.value = defaultState.isDark;
      document.title = this.title;
    },
  },
});

export default useSettingsStore;
