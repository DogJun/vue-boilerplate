module.exports = {
  output: {
    filename: "assets/scripts/[name].js"
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: {
      '/retesting': {
        target: 'http://yf-test.myyscm.com',
        changeOrigin: true,
      }
    }
  }
}