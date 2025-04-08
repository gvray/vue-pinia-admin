import { defineStore } from 'pinia'
//TODO
const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  }),
  actions: {
    login(){},
    logOut() {
    },
    getUserInfo(){}

  }
})

export default useUserStore