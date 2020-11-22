module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  }
};
