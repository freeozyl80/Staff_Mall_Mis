import axios from 'axios'
import config from '@src/config'
import Cookies from 'js-cookie'


console.log(NODE_ENV === 'production')
axios.interceptors.request.use(conf=> {
  if ('NODE_ENV' === 'development') {
    conf.withCredentials = true
  }
  let key = config.loginOpts.cookieKey
  conf.headers = Object.assign(conf.headers, {
    hualvmall_authorization: Cookies.get(key) || ''
  });
  return conf
}, err=> {
  console.log(err)
  return Promise.resolve(err);
})

axios.interceptors.response.use(function (response) {
  if(response.data.errorCode == 0 || response.data.errorCode == '0') {
    response.data.ok = true
    return response.data
  } else if (response.data.errorCode == '401' || response.data.errorCode == 401){
    return {
      errorCode: 401,
      errorMsg: '您无权限操作',
      ok: false,
      data: {}
    }
  } else if(response.data.errorCode == '400' || response.data.errorCode == 400) {
    return {
      errorCode: 400,
      errorMsg: response.data.errorMsg,
      info: response.data.info,
      ok: false,
      data: {}
    }
  } else {
    return {
      errorCode: 500,
      errorMsg: '服务端故障',
      ok: false,
      data: {}
    }
  }
}, function (error) {

  return {
    errorCode: error.response.status,
    errorMsg: error.response.data && error.response.data.info || '您访问的接口不存在',
    ok: false,
    data: {}
  };

  // return {
  //   errorCode: 404,
  //   errorMsg: '您访问的接口不存在',
  //   ok: false,
  //   data: {}
  // }
});


export default axios
