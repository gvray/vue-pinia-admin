<template>
  <div class="page-container">
    <el-row :gutter="20">
      <el-col>
        <el-form
          v-show="showSearch"
          ref="queryRef"
          :model="queryParams"
          :inline="true"
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
                dayjs(scope.row.createTime).format('YYYY MM-DD')
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
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          :total="total"
          @pagination="getList"
      /></el-col>
    </el-row>
    <!-- 用户表单组件 -->
    <user-form
      ref="userFormRef"
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :user-data="userData"
      @success="handleFormSuccess"
      @cancel="handleFormCancel"
    />
  </div>
</template>

<script setup lang="ts" name="User">
import { ref, onMounted, toRefs, reactive, getCurrentInstance } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { ElFormInstance } from 'element-plus'
import dayjs from 'dayjs'
import { listUser, deleteUser, getUser } from '@/api/user'
import { useModal } from '@/composables/useModal'
import UserForm from './components/UserForm.vue'

const { proxy } = getCurrentInstance()

const userList = ref([])
const loading = ref(true)
const showSearch = ref(true)
const total = ref(0)
const dateRange = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const userData = ref({})
const userFormRef = ref()

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
    phoneNumber: undefined,
    status: undefined,
  },
})

const { queryParams } = toRefs(data)
const modal = useModal()

// 查询用户列表
const getList = async () => {
  loading.value = true
  try {
    const data = await listUser(
      proxy.$addDateRange(queryParams.value, dateRange.value),
    )
    userList.value = data.rows
    total.value = data.total
  } catch (error) {
    // 根据自己的业务来处理错误
  } finally {
    loading.value = false
  }
}

// 搜索按钮操作
const handleQuery = () => {
  queryParams.value.pageNum = 1
  getList()
}

// 重置按钮操作
const resetQuery = () => {
  dateRange.value = []
  handleQuery()
}

// 添加用户操作
const handleAdd = () => {
  dialogTitle.value = '添加用户'
  userData.value = {
    userId: undefined,
    userName: '',
    nickName: '',
    password: '',
    phoneNumber: '',
    email: '',
    sex: '1',
    status: '0',
    remark: '',
    roleIds: [],
  }
  dialogVisible.value = true
}

// 修改用户操作
const handleUpdate = async (row) => {
  dialogTitle.value = '修改用户'
  try {
    const response = await getUser(row.userId)
    userData.value = response
    // 如果有角色数据，设置角色选项
    if (response.roles) {
      userFormRef.value?.setRoleOptions(response.roles)
    }
    dialogVisible.value = true
  } catch (error) {
    console.error('获取用户详情失败', error)
  }
}

// 删除用户操作
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除用户 ${row.userName} 吗？`, '提示', {
    type: 'warning',
  })
    .then(async () => {
      await deleteUser(row.userId)
      ElMessage.success('删除成功')
      getList()
    })
    .catch(() => {})
}

// 表单提交成功回调
const handleFormSuccess = () => {
  getList()
}

// 表单取消回调
const handleFormCancel = () => {
  dialogVisible.value = false
}

// 格式化状态
const formatStatus = (row) => {
  return row.status === '0' ? '正常' : '停用'
}

onMounted(() => {
  getList()
})
</script>
