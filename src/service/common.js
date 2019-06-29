import axios from './axios'
import { apiHost } from '@src/config'

export const AuthCheck = () => {
  let url = apiHost + '/manage/admin/authCheck'
  return axios.request({
    url: url,
    method: 'post',
    data: {
      
    }
  })
}