import request from '@/utils/request'

// 获取菜单列表
export function getMenus(params?: { [key: string]: any }) {
  return request({
    url: '/menu/list',
    method: 'get',
    params,
  })
}
