<template>
  <div class="login-page">
    <LoginBg>
      <div class="content">
        <div class="title">欢迎开启新世界</div>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
          label-position="right"
          label-width="auto"
          size="large"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              placeholder="账号"
              auto-complete="off"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="密　码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              auto-complete="off"
              @keyup.enter="handleLogin"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="isLogging"
              @click.prevent="handleLogin"
              style="width: 100%"
            >
              {{ isLogging ? "登录中..." : "登录" }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="third-party">
          <span class="tip">第三方账号登录</span>
          <el-icon><Edit /></el-icon>
        </div>
      </div>
    </LoginBg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import storetify from "storetify";
import LoginBg from "./components/LoginBg.vue";
import { useRouter } from "vue-router";
import { Edit, User, Lock } from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/user";
import { encrypt, decrypt } from "@/utils";

const userStore = useUserStore();
const router = useRouter();
const loginFormRef = ref();

const isLogging = ref(false);

const loginForm = ref({
  username: "",
  password: "",
  rememberMe: true,
});

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const handleLogin = async () => {
  await loginFormRef.value.validate(async (valid: boolean) => {
    if (!valid) return;

    isLogging.value = true;

    if (loginForm.value.rememberMe) {
      storetify("rememberMe", {
        username: loginForm.value.username,
        password: encrypt(loginForm.value.password),
        rememberMe: loginForm.value.rememberMe,
      });
    } else {
      storetify("rememberMe", undefined);
    }

    // 调用action的登录方法
    userStore
      .login(loginForm.value)
      .then(() => {
        ElMessage({
          message: "登陆成功",
          type: "success",
          plain: true,
        });
        router.push({ path: "/" });
      })
      .catch(() => {
        ElMessage({
          message: "登陆失败",
          type: "error",
          plain: true,
        });
        isLogging.value = false;
      });
  });
};

const loadRemembered = () => {
  const { username, password, rememberMe } =
    (storetify("rememberMe") as any) || {};
  loginForm.value.username = username || "";
  loginForm.value.password = decrypt(password || "");
  loginForm.value.rememberMe = rememberMe;
};

onMounted(() => {
  loadRemembered();
});
</script>

<style scoped lang="scss">
.login-page {
  .content {
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 35px;

    .title {
      font-size: 32px;
      margin-top: 10px;
      margin-bottom: 24px;
    }

    .third-party {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 20px;
      color: #888;

      .tip {
        font-size: 14px;
      }
    }

    :deep(.el-button--large) {
      border-radius: 20px;
    }
  }
}
</style>
