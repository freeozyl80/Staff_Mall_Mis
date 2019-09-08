import axios from './axios'
import { apiHost } from '@src/config'

export const AdiminLogin = ({name, pwd, type}) => {
  let url = apiHost + '/manage/admin/login'

  let bodyFormData = new FormData();

  bodyFormData.set('name', name);
  bodyFormData.set('pwd', pwd);
  bodyFormData.set('type', type);

  return axios.request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/form-data'
    },
    data: bodyFormData
  })
}

export const AdminListRegister = apiHost + '/manage/user/import'

export const accountList = ({pageIndex, pageSize}) => {
  let url = apiHost + '/manage/user/list'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      page_index: pageIndex,
      page_size: pageSize
    }
  })
}