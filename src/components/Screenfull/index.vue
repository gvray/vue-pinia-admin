<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" />
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

// 使用 useFullscreen 钩子
const { isFullscreen, toggle } = useFullscreen()
</script>