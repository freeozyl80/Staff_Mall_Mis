import axios from './axios'
import { apiHost, apiDevHost } from '@src/config'

let api = (NODE_ENV == 'development' ? apiDevHost : apiHost)

export const ProductListRegister = api + '/manage/product/import'

export const productList = ({pageIndex, pageSize, productStatus}) => {
  let url = api + '/manage/product/list'

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

