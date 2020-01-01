import axios from './axios'
import { apiHost } from '@src/config'

export const AuthCheck = () => {
  let url = apiHost + '/manage/admin/auth'
  return axios.request({
    url: url,
    method: 'get'
  })
}

export const getUserInfoApi = () => {
  let url = apiHost + '/manage/user/userinfo'
   return axios.request({
    url: url,
    method: 'get'
  })
}

export const getQiniuToken = () => {
  let url = apiHost + '/third/qiniu/token'
   return axios.request({
    url: url,
    method: 'post'
  })
}