<template>
  <el-dialog
    v-model="visible"
    :title="formData.userId ? '编辑用户' : '新增用户'"
    width="600px"
    @close="handleClose"
  >
    <el-form :model="form" ref="formRef" label-width="100px" :rules="rules">
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item v-if="!form.userId" label="用户名" prop="userName">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item v-if="!form.userId" label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio label="0">正常</el-radio>
          <el-radio label="1">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { addUser, updateUser } from "@/api/user";
import { ElMessage } from "element-plus";

const props = defineProps<{
  visible: boolean;
  formData: Record<string, any>;
}>();
const emit = defineEmits(["update:visible", "refresh"]);

const visible = ref(props.visible);
watch(
  () => props.visible,
  (val) => (visible.value = val)
);
watch(
  () => props.formData,
  (val) => {
    form.value = { ...val };
  },
  { immediate: true }
);

const form = ref({
  userName: "",
  password: "",
  nickName: "",
  phoneNumber: "",
  email: "",
  status: "0",
  remark: "",
});
const formRef = ref();

const rules = {
  nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  phoneNumber: [
    {
      validator: (_: any, value: string, callback: any) => {
        const reg = /^1[3-9]\d{9}$/;
        if (!value || reg.test(value)) callback();
        else callback(new Error("请输入正确手机号"));
      },
      trigger: "blur",
    },
  ],
};

const submitForm = async () => {
  await formRef.value.validate();
  if (form.value.userId) {
    await updateUser(form.value);
    ElMessage.success("修改成功");
  } else {
    await addUser(form.value);
    ElMessage.success("新增成功");
  }
  emit("update:visible", false);
  emit("refresh");
};

const handleClose = () => {
  emit("update:visible", false);
};
</script>
