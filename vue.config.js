const webpack = require('webpack')
const path = require('path')

module.exports = {
    outputDir: "./dist", // 构建输出目录

    devServer: {
        host: '0.0.0.0', // IP
        port: 8080, // 端口
        open: true, // 启动服务后是否打开浏览器
        // proxy: { //代理方式  注意：需要在连接前面添加"/api".不添加正则识别不了
        //     "/api": {
        //         target: "http://127.0.0.1:3000",
        //         changeOrigin: true,
        //         ws: true,
        //         pathRewrite: {
        //             "^/api": ''
        //         }
        //     }
        // }
    },
    lintOnSave: false, // 取消eslint验证
}