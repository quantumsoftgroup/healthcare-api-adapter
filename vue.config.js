module.exports = {
  devServer: {
    proxy: {
      '/v1alpha': {
        target: 'https://healthcare.googleapis.com/',
        changeOrigin: true
      }
    }
  }
};
