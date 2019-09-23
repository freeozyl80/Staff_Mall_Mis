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

export const firmProductList = ({pageIndex, pageSize, fid}) => {
  let url = apiHost + '/manage/product/firm/list'

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
// 新增
export const firmProductDetail = ({fid, pid}) => {
  let url = apiHost + '/manage/product/firm/detail'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      fid: fid,
      pid: pid
    }
  })
}

export const firmProductCreate = (params) => {
  let url = apiHost + '/manage/product/firm/new'

  let bodyFormData = new FormData();

  bodyFormData.set('fid', params.fid);
  bodyFormData.set('product_name', params.productName);
  bodyFormData.set('product_realname', params.productRealname);
  bodyFormData.set('category_id', params.categoryId);
  bodyFormData.set('category_name', params.categoryName);
  bodyFormData.set('category_realname', params.categoryRealname);
  bodyFormData.set('product_price', params.productPrice);
  bodyFormData.set('product_count', params.productCount);
  bodyFormData.set('product_img', params.productImg);
  bodyFormData.set('product_status', params.productStatus);
  bodyFormData.set('product_desc', params.productDesc);


  return axios.request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/form-data'
    },
    data: bodyFormData
  })
}
export const firmProductEdit = (params) => {
  let url = apiHost + '/manage/product/firm/update'
  let bodyFormData = new FormData();

  bodyFormData.set('fid', params.fid);
  bodyFormData.set('pid', params.pid);
  bodyFormData.set('product_name', params.productName);
  bodyFormData.set('product_realname', params.productRealname);
  bodyFormData.set('category_id', params.categoryId);
  bodyFormData.set('category_name', params.categoryName);
  bodyFormData.set('category_realname', params.categoryRealname);
  bodyFormData.set('product_price', params.productPrice);
  bodyFormData.set('product_count', params.productCount);
  bodyFormData.set('product_img', params.productImg);
  bodyFormData.set('product_status', params.productStatus);
  bodyFormData.set('product_desc', params.productDesc);



  return axios.request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/form-data'
    },
    data: bodyFormData
  })
}

export const firmProductCategoryList = ({fid}) => {
    let url = apiHost + '/manage/product/firm/categroy/list'

  return axios.request({
    url: url,
    method: 'get',
    params: {
      fid: fid,
      page_index: 1,
      page_size: 100
    }
  })
}



// 新增结束
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
  let url = apiHost + `/manage/firm/staff/coin`


  let bodyFormData = new FormData();
  bodyFormData.set('data', coin);


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

export const deliverStaffCoins = ({uids, fid, coin}) => {
  let url = apiHost + `/manage/firm/staff/list/coin`


  let bodyFormData = new FormData();
  bodyFormData.set('data', coin);


  return axios.request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/form-data'
    },
    data: bodyFormData,
    params: {
      fid: fid,
      uids: uids.join(',')
    }
  })
}

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

export const cancelOrder = ({fid, orderId}) => {
  let url = apiHost + '/manage/order/cancel'

  let bodyFormData = new FormData();
  bodyFormData.set('orderId', orderId);

  return axios.request({
    url: url,
    method: 'get',
    data: bodyFormData,
    params: {
      fid: fid
    }
  })
}