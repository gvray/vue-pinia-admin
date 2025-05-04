<template>
  <div class="sidebar">
    <logo></logo>
    <el-menu
      class="el-menu-vertical"
      :background-color="getMenuBackground"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      router
    >
      <el-menu-item
        v-for="item in menuItems"
        :key="item.index"
        :index="item.index"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import useSettingsStore from '@/store/modules/settings'
import variables from '@/assets/styles/variables.module.scss'
import Logo from "./Logo.vue";
const menuItems = [
  { index: "/dashboard", title: "Dashboard", icon: "el-icon-s-home" },
  { index: "/user", title: "User", icon: "el-icon-s-home" },
];

const settingsStore = useSettingsStore();

const sideTheme = computed(()=>settingsStore.sideTheme)

const getMenuBackground = computed(() => {
  if(settingsStore.isDark){
    return `var(--sidebar-bg-color)`;
  }
  return sideTheme.value === 'theme-dark' ? variables.menuBg : variables.menuBgLight ;
});
</script>

<style lang="scss" scoped>
.sidebar {
  flex: 0 0 200px;
  max-width: 200px;
  min-width: 200px;
  width: 200px;
  height: 100%;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  .el-menu-vertical {
    height: 100%;
  }
}
</style>
