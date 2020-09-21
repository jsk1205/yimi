// vue.config.js
const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 75   //remUnit = 设计稿/等分数10， 网易严选首页750宽，正好相当于是设计稿宽度，所以值为750/10 = 75
})
module.exports = {
  lintOnSave: false,  // 暂时关闭eslint检查
  devServer: {
    hot:true,
    disableHostCheck: true,
    // 浏览器eslint检查给出报错信息
    overlay: {
        warnings: false,
        errors: false
    },
    // 设置主机地址
    // host: '192.168.2.142', 
    // 设置默认端口
    port: 8082,
    open:true,
    // 设置代理
    /* proxy: {
        '/api': {
            // 目标 API 地址
            // 开发环境
            target: 'http://127.0.0.1/api/',
            // 如果要代理 websockets
            ws: false,
            // 将主机标头的原点更改为目标URL(设置跨域)
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    } */
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  }

  
}