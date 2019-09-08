import { getUserInfoApi } from '@src/service/common'
import { setUserToken, getUserToken } from '@src/util'
import router from '../router/'

export default {
  state: {
    userName: '',
    userId: '',
    userType: '',
    token: getUserToken(),
    hasGetInfo: false,
    auth1: [],
    auth2: [],
    auth3: []
  },
  mutations: {
    setAuth1 (state, auth) {
      state.auth1 = auth
    },
    setAuth2 (state, auth) {
      state.auth2 = auth
    },
    setAuth3 (state, auth) {
      state.auth3 = auth
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setUseType (state, utype) {
      state.userType = utype
    },
    setToken (state, token) {
      state.token = token
      setUserToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }) {
      return new Promise((resolve, reject) => {
        let token = getUserToken()
        resolve && resolve()
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        resolve('')
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit, rootState }, {force}) {
      return new Promise((resolve, reject) => {
        getUserInfoApi().then((res) => {
          if (res && res.errorCode == 0) {
            commit('setUserName', res.data.uname)
            commit('setUserId', res.data.uid)
            commit('setUseType', res.data.utype)

            let arr1 = res.data.auth1.split(',')
            let arr2 = res.data.auth2.split(',')
            let arr3 = res.data.auth3.split(',')

            commit('setAuth1', arr1)
            commit('setAuth2', arr2)
            commit('setAuth3', arr3)
          }
          resolve && resolve({
            name: state.userName,
            access: state.right1
          })
        })
      })
    }
  }
}
