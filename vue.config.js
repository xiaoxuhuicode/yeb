let proxyObj = {};

// 斜杠 / 表示所有都要代理
proxyObj['/'] = {
    // websocket
    ws: false,
    // 目标地址，表示要代理到哪里去
    target: 'http://localhost:8081',
    // true：表示浏览器的发送请求头host会被设置成target的内容
    changeOrigin: true,
    // 不重写请求地址
    pathRewrite: {
        '^/': '/'
    }
};


module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        // 重点，通过代理转发到8081
        proxy: proxyObj
    }
};