<template>
  <div v-if="!item.hidden">
    <!-- 如果是空路径且有子路由，直接渲染子路由项 -->
    <template v-if="item.path === '' && hasChildren(item)">
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </template>

    <!-- 如果没有子菜单，直接渲染菜单项 -->
    <template v-else-if="!hasChildren(item)">
      <el-menu-item :index="resolvePath(item.path)">
        <svg-icon :icon-class="item.meta && item.meta.icon" />
        <!-- <el-icon><location /></el-icon> -->
        <span class="title">{{ item.meta && item.meta.title }}</span>
      </el-menu-item>
    </template>

    <!-- 如果有子菜单，渲染子菜单组 -->
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <svg-icon :icon-class="item.meta && item.meta.icon" />
        <span class="title">{{ item.meta && item.meta.title }}</span>
      </template>

      <!-- 递归渲染子菜单项 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(item.path)"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { isAbsolute, join } from "path-copilot";

// 定义组件属性
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: "",
  },
});

// 判断是否有子菜单
const hasChildren = (item: any) => {
  return item.children && item.children.length > 0 && !item.noShowingChildren;
};

// 解析路径
const resolvePath = (routePath: string) => {
  if (isAbsolute(routePath)) {
    return routePath;
  }
  return join(props.basePath, routePath);
};
</script>

<style scoped lang="scss">
.title {
  margin-left: 12px;
}
</style>
