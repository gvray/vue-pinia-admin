import request from '@/utils/request';

// 获取当前用户
export function getInfo() {
  return request({
    url: '/currentUser',
    method: 'get',
  });
}

// 获取用户列表
export function listUser() {
  return request({
    url: '/user/list',
    method: 'get',
  });
}

// 根据 ID 删除用户
export function deleteUser(userId: number) {
  return request({
    url: `/user/${userId}`,
    method: 'delete',
  });
}

// 新增用户
export function addUser(data: any) {
  return request({
    url: '/user',
    method: 'post',
    data,
  });
}

// 更新用户
export function updateUser(data: any) {
  return request({
    url: '/user',
    method: 'put',
    data,
  });
}

// 获取指定用户详情
export function getUser(userId: number) {
  return request({
    url: `/user/${userId}`,
    method: 'get',
  });
}
