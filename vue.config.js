const path = require('path')
const config = require('./src/config')

const resolve = dir => {
  return path.join(__dirname, dir)
}
const BASE_URL = config.appName && process.env.NODE_ENV == 'production' ? '/' + config.appName + '/' : '/'

module.exports = {
  publicPath: BASE_URL,
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@components', resolve('src/components'))
      .set('@config', resolve('src/config'))
    config.module
      .rule('vue')
      .use('iview-loader')
      .loader('iview-loader')
      .options({
        "prefix":false
      })
      .end()
  },
  configureWebpack: {
    entry: './src/main.js',
    devtool:process.env.NODE_ENV == 'production' ? 'none' : '#eval-source-map'
  },
  outputDir: './web',
  devServer: {
    inline: true,
    host: 'localhost',
    port: 8001,
    disableHostCheck: true
  }
}