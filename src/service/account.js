import axios from './axios'
import { apiHost, apiDevHost } from '@src/config'

let api = (NODE_ENV == 'development' ? apiDevHost : apiHost)

export const AdiminLogin = ({name, pwd, type}) => {
  let url = api + '/manage/admin/login'

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

export const AdminListRegister = api + '/manage/user/import'

export const accountList = ({pageIndex, pageSize, userType}) => {
  let url = api + '/manage/user/list'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      page_index: pageIndex,
      page_size: pageSize,
      user_type: userType
    }
  })
}

export const getAccountInfo = ({uid}) => {
  let url = api + '/manage/user/info'
  return axios.request({
    url: url,
    method: 'get',
    params: {
      uid: uid
    }
  })
}

export const accountRest = ({uid}) => {
  let url = api + '/manage/user/reset'

  let bodyFormData = new FormData();
  bodyFormData.set('uid', uid);
  return axios.request({ 
    url: url,
    method: 'post',
     headers: {
      'Content-Type': 'application/form-data'
    },
    data: bodyFormData
  })
}

export const createService = ({name, realname, pwd}) => {
  let url = api + '/manage/service/create'

  let bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('realname', realname);
  bodyFormData.set('pwd', pwd);
  return axios.request({ 
    url: url,
    method: 'post',
     headers: {
      'Content-Type': 'application/form-data'
    },
    data: bodyFormData
  })
}
export const offService = ({uid}) => {
  let url = api + '/manage/user/off'

  let bodyFormData = new FormData();
  bodyFormData.set('uid', uid);
  return axios.request({ 
    url: url,
    method: 'post',
     headers: {
      'Content-Type': 'application/form-data'
    },
    data: bodyFormData
  })
}

