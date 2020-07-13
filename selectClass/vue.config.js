module.exports = {
    baseUrl: './',
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: 810,   // 端口号
    },
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}