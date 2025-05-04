<!-- Logo.vue -->
<template>
  <div class="logo-wrapper">
    <img class="logo-img" src="/logo.svg" alt="Logo" />
    <h1>G-ADMIN</h1>
  </div>
</template>

<style scoped>
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 199px;
  height: 60px;
  background-color: var(--sidebar-bg-color);
  border-right: 1px solid var(--el-menu-border-color);
  .logo-img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }
  h1 {
    font-size: 20px;
    color: #fff;
  }
}
</style>
