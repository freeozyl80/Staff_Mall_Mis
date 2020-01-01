import axios from './axios'
import { apiHost, apiDevHost } from '@src/config'

let api = (NODE_ENV == 'development' ? apiDevHost : apiHost)
export const AuthCheck = () => {
  let url = api + '/manage/admin/auth'
  return axios.request({
    url: url,
    method: 'get'
  })
}

export const getUserInfoApi = () => {
  let url = api + '/manage/user/userinfo'
   return axios.request({
    url: url,
    method: 'get'
  })
}

export const getQiniuToken = () => {
  let url = api + '/third/qiniu/token'
   return axios.request({
    url: url,
    method: 'post'
  })
}