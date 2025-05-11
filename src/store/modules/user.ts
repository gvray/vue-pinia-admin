import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/login'
// TODO
const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((data) => {
            setToken(data.accessToken)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logOut() {},
    getUserInfo() {},
  },
})

export default useUserStore
