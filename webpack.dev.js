const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(
  common,
  /** @type { import("webpack").Configuration } */
  {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
      hot: true,
      historyApiFallback: true,
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      proxy: {
        '/api': {
          target: 'https://hk.warrants.com',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
          headers: {
            referer: 'https://hk.warrants.com',
          },
        },
      },
    },
    output: {
      publicPath: '/',
    },
  }
);
