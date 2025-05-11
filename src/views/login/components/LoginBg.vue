<template>
  <div class="login-warp">
    <div class="login-bg"></div>
    <div class="login-title">
      <img class="logo-img" src="/logo-dark.svg" />
      <strong>G-ADMIN</strong>
    </div>
    <div class="login-text">
      <h3>用真诚</h3>
      <p>让复杂的世界更美好</p>
    </div>
    <div class="login-form">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-warp {
  .login-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url('@/assets/login-bg_1.jpg') no-repeat;
    background-size: cover;
  }

  .login-title {
    position: fixed;
    top: 60px;
    left: 70px;
    font-size: 24px;
    display: flex;
    align-items: center;
    color: #fff;

    .logo-img {
      width: 38px;
      margin-right: 4px;
    }
  }

  .login-text {
    position: fixed;
    left: 195px;
    top: 314px;
    color: #fff;

    h3 {
      font-size: 54px;
      letter-spacing: 0;
      font-weight: 700;
      margin-bottom: 0;
    }

    p {
      font-size: 32px;
      letter-spacing: 3.8px;
      font-weight: 300;
    }

    @media (max-width: 1150px) {
      display: none;
    }
  }

  .login-form {
    position: absolute;
    right: 139px;
    top: 50%;
    margin-top: -340px;
    width: 480px;
    height: 680px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
</style>
