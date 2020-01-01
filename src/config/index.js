module.exports =  {
  apiHost: 'NODE_ENV' == 'production' ? '' : '//127.0.0.1:8888',
  appName: 'web',
  loginOpts: {
  	cookieKey: 'hualvmall_authorization'
  },
  qiniuHost: 'https://img.cdn.hualvmall.com/'
}