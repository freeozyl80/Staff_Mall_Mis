import axios from 'axios'

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  if(response.ok) {
    return response.data
  } else if (response.errorCode == '401' || response.errorCode == 401){
    return {
      errorCode: 401,
      errorMsg: '您无权限操作',
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
}, function () {
  return {
    errorCode: 404,
    errorMsg: '您访问的接口不存在',
    ok: false,
    data: {}
  }
});


export default axios