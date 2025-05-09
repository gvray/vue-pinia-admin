<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    width="600px"
    append-to-body
    @close="handleClose"
  >
    <el-form
      :model="formData"
      :rules="rules"
      ref="userFormRef"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            v-if="formData.userId == undefined"
            label="用户名称"
            prop="userName"
          >
            <el-input
              v-model="formData.userName"
              placeholder="请输入用户名称"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            v-if="formData.userId == undefined"
            label="用户密码"
            prop="password"
          >
            <el-input
              v-model="formData.password"
              placeholder="请输入用户密码"
              type="password"
              maxlength="20"
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input
              v-model="formData.phoneNumber"
              placeholder="请输入手机号码"
              maxlength="11"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="formData.email"
              placeholder="请输入邮箱"
              maxlength="50"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-radio-group v-model="formData.status">
              <el-radio
                v-for="dict in statusOptions"
                :key="dict.value"
                :value="dict.value"
                >{{ dict.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-select v-model="formData.roleIds" multiple placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
                :disabled="item.status == 1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input
              v-model="formData.nickName"
              placeholder="请输入用户昵称"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户性别">
            <el-select v-model="formData.sex" placeholder="请选择">
              <el-option
                v-for="dict in sexOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              v-model="formData.remark"
              type="textarea"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, watch, computed } from "vue";
import type { ElFormInstance } from "element-plus";
import { isEmpty } from "ts-copilot";
import { useModal } from "@/composables/useModal";
import { addUser, updateUser } from "@/api/user";

// 定义组件属性
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  userData: {
    type: Object,
    default: () => ({}),
  },
});

// 定义组件事件
const emit = defineEmits(["update:visible", "success", "cancel"]);

// 表单引用
const userFormRef = ref<ElFormInstance>();

// 对话框可见性
const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value)
});

// 使用自定义的模态框组件
const modal = useModal();

// 表单数据
const formData = reactive({
  userId: undefined,
  userName: "",
  nickName: "",
  password: "",
  phoneNumber: "",
  email: "",
  sex: "1",
  status: "0",
  remark: "",
  roleIds: [],
});

// 状态选项
const statusOptions = [
  { label: "正常", value: "0" },
  { label: "停用", value: "1" },
];

// 性别选项
const sexOptions = [
  { label: "男", value: "1" },
  { label: "女", value: "0" },
];

// 角色选项
const roleOptions = ref([]);

// 表单验证规则
const rules = {
  userName: [
    { required: true, message: "用户名称不能为空", trigger: "blur" },
    {
      min: 2,
      max: 20,
      message: "用户名称长度必须介于 2 和 20 之间",
      trigger: "blur",
    },
  ],
  nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "用户密码不能为空", trigger: "blur" },
    {
      min: 5,
      max: 20,
      message: "用户密码长度必须介于 5 和 20 之间",
      trigger: "blur",
    },
    {
      pattern: /^[^<>"'|\\]+$/,
      message: "不能包含非法字符：< > \" ' \\ |",
      trigger: "blur",
    },
  ],
  email: [
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  phoneNumber: [
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur",
    },
  ],
};

watchEffect(() => {
  const val = props.userData;
  if (!isEmpty(val)) {
    Object.assign(formData, val);
    // 如果是编辑模式，清空密码
    if (formData.userId) {
      formData.password = "";
    }
  }
});
// 提交表单
const submitForm = () => {
  userFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        if (formData.userId) {
          // 更新用户
          await updateUser(formData);
          modal.msgSuccess("修改成功");
        } else {
          // 添加用户
          await addUser(formData);
          modal.msgSuccess("新增成功");
        }
        // 通知父组件操作成功
        emit("success");
        // 关闭对话框
        dialogVisible.value = false;
      } catch (error) {
        console.error("提交表单失败", error);
        modal.msgError("操作失败");
      }
    }
  });
};

// 取消操作
const handleCancel = () => {
  dialogVisible.value = false;
  emit("cancel");
};

// 关闭对话框
const handleClose = () => {
  userFormRef.value?.resetFields();
  emit("cancel");
};

// 设置角色选项
const setRoleOptions = (roles) => {
  roleOptions.value = roles || [];
};

// 暴露方法给父组件
defineExpose({
  setRoleOptions,
});
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
