<template>
  <div class="page-container">
    <el-row :gutter="20">
      <el-col>
        <el-form
          :model="queryParams"
          ref="queryRef"
          :inline="true"
          v-show="showSearch"
          label-width="68px"
        >
          <el-form-item label="用户名称" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名称"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input
              v-model="queryParams.phoneNumber"
              placeholder="请输入手机号码"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="用户状态"
              clearable
              style="width: 240px"
            >
              <el-option label="正常" :value="0" />
              <el-option label="停用" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" style="width: 308px">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form></el-col
      >
      <el-col>
        <el-button type="primary" @click="handleAdd"
          >新增用户</el-button
        ></el-col
      >
      <el-col>
        <el-table :data="userList" style="width: 100%" :loading="loading">
          <el-table-column prop="userId" label="用户编号" width="100" />
          <el-table-column prop="userName" label="用户名称" />
          <el-table-column prop="nickName" label="用户昵称" />
          <el-table-column prop="phoneNumber" label="手机号" />
          <el-table-column
            prop="status"
            label="状态"
            :formatter="formatStatus"
          />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            width="160"
          >
            <template #default="scope">
              <span>{{
                dayjs(scope.row.createTime).format("YYYY MM-DD")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template #default="scope">
              <el-button
                type="primary"
                text
                size="small"
                @click="handleUpdate(scope.row)"
              >
                修改
              </el-button>
              <el-button
                type="danger"
                text
                size="small"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
      /></el-col>
    </el-row>
    <!-- 添加或修改用户配置对话窗口 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" ref="userRef" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户名称"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
                placeholder="请输入用户名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户密码"
              prop="password"
            >
              <el-input
                v-model="form.password"
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
                v-model="form.phoneNumber"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in [
                    { label: '正常', value: '0' },
                    { label: '停用', value: '1' },
                  ]"
                  :key="dict.value"
                  :value="dict.value"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="form.roleIds" multiple placeholder="请选择">
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
                v-model="form.nickName"
                placeholder="请输入用户昵称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option
                  v-for="dict in [
                    { label: '男', value: '1' },
                    { label: '女', value: '0' },
                  ]"
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
                v-model="form.remark"
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
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="User">
import { ref, onMounted, toRefs, reactive, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import type { ElFormInstance } from "element-plus";
import dayjs from "dayjs";
import { listUser, deleteUser, getUser, addUser, updateUser } from "@/api/user";
import { useModal } from "@/composables/useModal";

const { proxy } = getCurrentInstance();

const userList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);
const dateRange = ref([]);
const title = ref(""); // 弹出框标题
const ids = ref([]); // 用于接收传递的id

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
    phoneNumber: undefined,
    status: undefined,
  },
  rules: {
    userName: [
      { required: true, message: "用户名称不能为空", trigger: "blur" },
      {
        min: 2,
        max: 20,
        message: "用户名称长度必须介于 2 和 20 之间",
        trigger: "blur",
      },
    ],
    nickName: [
      { required: true, message: "用户昵称不能为空", trigger: "blur" },
    ],
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
        message: "不能包含非法字符：< > \" ' \\\ |",
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
  },
});

const { queryParams, form, rules } = toRefs(data);
const roleOptions = ref([]);

const updateVisible = ref(false);
const formData = ref({});

const userRef = ref<ElFormInstance>();
const modal = useModal();

// 查询用户列表
const getList = async () => {
  loading.value = true;
  try {
    const data = await listUser(
      proxy.$addDateRange(queryParams.value, dateRange.value)
    );
    userList.value = data.rows;
    total.value = data.total;
  } catch (error) {
    // 根据自己的业务来处理错误
  } finally {
    loading.value = false;
  }
};

// 搜索按钮操作
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
// 重置按钮操作
const resetQuery = () => {
  dateRange.value = [];
  userRef.value?.resetFields();
  handleQuery();
};

// 重置添加用户表单
const reset = () => {
  // 第一步
  form.value = {
    userId: undefined,
    userName: undefined,
    nickName: undefined,
    password: undefined,
    phoneNumber: undefined,
    email: undefined,
    sex: undefined,
    status: "0",
    remark: undefined,
    roleIds: [],
  };
  // 第二步
  proxy.$resetForm("userRef");
};

// 添加用户操作
const handleAdd = () => {
  reset();
  title.value = "添加用户";
  open.value = true;
};

// 编辑用户操作
const handleEdit = async (row: any) => {
  const res = await getUser(row.userId);
  formData.value = res.data;
  updateVisible.value = true;
};

// 删除用户操作
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确认删除用户 ${row.userName} 吗？`, "提示", {
    type: "warning",
  })
    .then(async () => {
      await deleteUser(row.userId);
      ElMessage.success("删除成功");
      getList();
    })
    .catch(() => {});
};

// 修改用户操作
const handleUpdate =(row)=> {
  reset();
  const userId = row.userId || ids.value;
  getUser(userId).then(response => {
    form.value = response;
    roleOptions.value = response.roles;
    open.value = true;
    title.value = "修改用户";
    form.password = "";
  });
};

// 取消按钮操作
function cancel() {
  open.value = false;
  reset();
}

// 保存用户操作
function submitForm() {
  userRef.value?.validate((valid) => {
    if (valid) {
      if (form.value.userId != undefined) {
        updateUser(form.value).then((response) => {
          modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addUser(form.value).then((response) => {
          modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

// 格式化状态
const formatStatus = (row: any) => {
  return row.status === "0" ? "正常" : "停用";
};

onMounted(() => {
  getList();
});
</script>
