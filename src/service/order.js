import axios from './axios'
import { apiHost } from '@src/config'

export const orderList = ({fid, pageIndex, pageSize}) => {
  let url = apiHost + '/manage/order/list'

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
  let url = apiHost + '/manage/order/detail'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      order_id: order_id,
      uid: uid
    }
  })
}