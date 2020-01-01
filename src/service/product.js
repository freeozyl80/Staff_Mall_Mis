import axios from './axios'
import { apiHost } from '@src/config'
export const ProductListRegister = apiHost + '/manage/product/import'

export const productList = ({pageIndex, pageSize, productStatus}) => {
  let url = apiHost + '/manage/product/list'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      product_status: productStatus,
      page_index: pageIndex,
      page_size: pageSize
    }
  })
}

