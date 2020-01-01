import axios from './axios'
import { apiHost, apiDevHost } from '@src/config'

let api = (NODE_ENV == 'development' ? apiDevHost : apiHost)

export const orderList = ({fid, pageIndex, pageSize}) => {
  let url = api + '/manage/order/list'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      fid: fid,
      page_index: pageIndex,
      page_size: pageSize
    }
  })
}

export const orderDetail = ({order_id, uid}) => {
  let url = api + '/manage/order/detail'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      order_id: order_id,
      uid: uid
    }
  })
}