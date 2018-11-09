const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  baseUrl: '/packages/ohif_google-cloud/healthcare-api/dist',
  configureWebpack: {
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true
        },
        extractComments: true
      })
    ]
  }
};
