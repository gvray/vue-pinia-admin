<template>
  <div class="app-container">
    <side-bar> </side-bar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar/index.vue'
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain/index.vue'
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
