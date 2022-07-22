const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(
  common,
  /** @type { import("webpack").Configuration } */
  {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  }
);
