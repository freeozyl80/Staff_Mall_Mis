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
    config.plugin('define').tap(definitions => {
      definitions[0] = Object.assign(definitions[0], {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      })
      return definitions
    })
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
  outputDir: process.env.NODE_ENV == 'production' ? '/Users/zhangyunlu/code/go/projects/src/staff-mall-center/www' : './web',
  devServer: {
    inline: true,
    host: 'localhost',
    port: 8001,
    disableHostCheck: true
  }
}