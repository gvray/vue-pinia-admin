import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          name: 'Gavin',
          role: 'admin',
        }
      }
    }
  }
] as MockMethod[]