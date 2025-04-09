import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000, // 模拟网络延迟（单位：ms）
    response:({ body }) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return {
          success: true,
          code: 200,
          message: '登陆成功',
          data: {
            accessToken: 'admin',
            refreshToken: 'admin',
          },
        }
      }
      if (username === 'user' && password === '123456') {
        return {
          success: true,
          code: 200,
          message: '登陆成功',
          data: {
            accessToken: 'user',
            refreshToken: 'user',
          },
        }
      }
      return {
        success: false,
        code: 500,
        message: '用户不存在/密码错误',
      }
    },
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => ({
      success: true,
      code: 200,
      message: '退出成功',
    }),
  },
  {
    url: '/api/currentUser',
    method: 'get',
    response: ({ headers }) => {
      const authorization = headers?.authorization
      const token = authorization?.split(' ')[1]

      if (token === 'admin') {
        return {
          success: true,
          code: 200,
          message: '操作成功',
          data: {
            user: {
              name: 'Gavin',
              avatar:
                'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
              userid: '00000001',
              email: 'gavinbirkhoff@gmail.com',
            },
          },
        }
      }

      return {
        success: false,
        code: 401,
        message: '认证失败，无法访问系统资源',
      }
    },
  },
] as MockMethod[]