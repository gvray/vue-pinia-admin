<template>
  <el-breadcrumb class="breadcrumb-wrapper" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
        class="no-redirect"
        >{{ item.meta.title }}</span
      >
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type {
  RouteLocationMatched,
  RouteLocationNormalizedLoaded,
} from 'vue-router'

interface Meta {
  title: string
  breadcrumb?: boolean
}

interface MatchedRoute {
  path: string
  meta: Meta
  redirect?: string
}

interface BreadcrumbItem {
  path: string
  redirect?: string
  meta: {
    title: string
    breadcrumb?: boolean
  }
}

const levelList: Ref<MatchedRoute[]> = ref([
  { path: '', meta: { title: '首页' } },
])

const route: RouteLocationNormalizedLoaded = useRoute()
const router = useRouter()
import { useRoute, useRouter } from 'vue-router'

const isDashboard = (route: any) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim() === 'Dashboard'
}
const getBreadcrumb = () => {
  // 过滤掉不需要显示的面包屑
  let matched = [
    ...route.matched
      .filter(
        (item) =>
          item.meta && item.meta.title && item.meta.breadcrumb !== false,
      )
      .map((item) => {
        return {
          name: item.name,
          path: item.path,
          meta: item.meta,
          redirect: item.redirect,
        }
      }),
  ]
  console.log(matched)
  if (isDashboard(matched[1])) {
    matched = matched.concat(matched[0].matched)
  }
  // 判断是否为首页
  if (!isDashboard(matched[0])) {
    matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
  }
  // 过滤掉不需要显示的面包屑
  levelList.value = matched
}
const handleLink = (item: BreadcrumbItem) => {
  if (item.redirect) {
    router.push(item.redirect)
  } else {
    router.push(item.path)
  }
}

watchEffect(() => {
  if (route.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
})
</script>

<style lang="scss" scoped></style>
