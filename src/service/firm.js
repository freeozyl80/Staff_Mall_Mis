import axios from './axios'
import { apiHost } from '@src/config'

export const firmList = ({pageIndex, pageSize}) => {
  let url = apiHost + '/manage/firm/list'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      page_index: pageIndex,
      page_size: pageSize
    }
  })
}

export const firmAdd = (params) => {
  let url = apiHost + '/manage/firm/add'

  let bodyFormData = new FormData();
  bodyFormData.set('firmname', params.firmName);
  bodyFormData.set('firm_realname', params.firmRealName);
  bodyFormData.set('balance', params.balance);

  return axios.request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/form-data'
    },
    data: bodyFormData
  })
}


export const firmLsit = ({pageIndex, pageSize}) => {
  let url = apiHost + '/manage/firm/list'

 return axios.request({
    url: url,
    method: 'get',
    params: {
      page_index: pageIndex,
      page_size: pageSize
    }
  })
}

export const accountList = ({pageIndex, pageSize, auth1}) => {
  let url = apiHost + '/manage/firm/account'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      fid: auth1,
      page_index: pageIndex,
      page_size: pageSize
    }
  })
}

export const delegateFirm = ({auth1, uid, uname, type}) => {
  let url = apiHost + '/manage/firm/delegate'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      type: type,
      fid: auth1,
      uname: uname,
      uid: uid
    }
  })
}

export const firmProductList = ({pageIndex, pageSize, auth1}) => {
  let url = apiHost + '/manage/product/firm/list'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      fid: auth1,
      page_index: pageIndex,
      page_size: pageSize
    }
  })
}

export const getStaffInfo = ({uid, fid}) => {
  let url = apiHost + `/manage/firm/staff`
  return axios.request({
    url: url,
    method: 'get',
    params: {
      fid: fid,
      uid: uid
    }
  })
}

export const deliverStaffCoin = ({uid, fid, coin}) => {
  let url = apiHost + `/manage/firm/staff/operate`


  let bodyFormData = new FormData();
  bodyFormData.set('data', JSON.stringify({
    coin: coin
  }));


  return axios.request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/form-data'
    },
    data: bodyFormData,
    params: {
      fid: fid,
      uid: uid
    }
  })
}

export const orderList = ({fid}) => {
  
}