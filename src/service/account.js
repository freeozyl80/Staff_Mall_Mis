import axios from './axios'
import { apiHost } from '@src/config'

export const AdiminLogin = ({name, pwd}) => {
  let url = apiHost + '/manage/admin/AdminLogin'
  return axios.request({
    url: url,
    method: 'post',
    data: {
      name: name,
      pwd: pwd
    }
  })
}