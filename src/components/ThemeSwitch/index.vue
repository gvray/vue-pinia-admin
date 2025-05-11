<template>
  <div class="theme-switch" @click="toggleTheme">
    <el-icon>
      <Sunny v-if="settingsStore.isDark" />
      <MoonNight v-else />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { MoonNight, Sunny } from '@element-plus/icons-vue'
import useSettingsStore from '@/store/modules/settings'

// 获取设置store
const settingsStore = useSettingsStore()

// 切换主题方法
const toggleTheme = () => {
  settingsStore.toggleDarkMode()
}
</script>

<style scoped>
.theme-switch {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.theme-switch:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .theme-switch:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
