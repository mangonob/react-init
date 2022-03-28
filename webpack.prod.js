const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(
  common,
  /** @type { import("webpack").Configuration } */
  {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        generateStatsFile: true,
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  }
);
