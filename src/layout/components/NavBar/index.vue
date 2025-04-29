<template>
  <nav class="navbar">
    <div class="navbar-left">
      <breadcrumb />
    </div>
    <div class="navbar-center">
      <slot></slot>
    </div>
    <div class="navbar-right">
      <el-space>
        <el-button type="text" icon="el-icon-setting" />
        <el-button type="text" icon="el-icon-bell" />
        <el-button type="text" icon="el-icon-user" />
        <screenfull />
        <div class="avatar-container">
          <el-dropdown @command="handleCommand">
            <el-avatar
              shape="square"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item command="themeSettings" :icon="Setting">
                  主题配置
                </el-dropdown-item>
                <el-dropdown-item command="logout" :icon="Mug" divided
                  >退出登陆</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-space>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/Breadcrumb";
import Screenfull from '@/components/Screenfull';
import { User, Setting, Mug } from "@element-plus/icons-vue";
import { logger } from "~/src/utils";

const handleCommand = (command: string) => {
  logger.info("Command executed:" + command);
};
</script>

<script lang="ts">
export default {
  name: "NavBar",
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.navbar-left,
.navbar-center,
.navbar-right {
  display: flex;
  align-items: center;
}
</style>
