<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增用户</el-button>
    <el-table :data="userList" style="width: 100%" :loading="loading">
      <el-table-column prop="userId" label="用户编号" width="100" />
      <el-table-column prop="userName" label="用户名称" />
      <el-table-column prop="nickName" label="用户昵称" />
      <el-table-column prop="phoneNumber" label="手机号" />
      <el-table-column prop="status" label="状态" :formatter="formatStatus" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button
            type="primary"
            text
            size="small"
            @click="handleEdit(scope.row)"
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

    <!-- 弹窗组件 -->
    <!-- <UpdateForm
        v-model:visible="updateVisible"
        :form-data="formData"
        @refresh="getUsers"
      /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { listUser, deleteUser, getUser } from "@/api/user";
//   import UpdateForm from './components/UpdateForm';

const userList = ref([]);
const updateVisible = ref(false);
const formData = ref({});
const loading = ref(false);

const getUsers = async () => {
  loading.value = true;
  const data = await listUser();
  userList.value = data.rows;
  loading.value = false;
};

const handleAdd = () => {
  formData.value = {};
  updateVisible.value = true;
};

const handleEdit = async (row: any) => {
  const res = await getUser(row.userId);
  formData.value = res.data;
  updateVisible.value = true;
};

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确认删除用户 ${row.userName} 吗？`, "提示", {
    type: "warning",
  })
    .then(async () => {
      await deleteUser(row.userId);
      ElMessage.success("删除成功");
      getUsers();
    })
    .catch(() => {});
};

const formatStatus = (row: any) => {
  return row.status === "0" ? "正常" : "停用";
};

onMounted(() => {
  getUsers();
});
</script>
