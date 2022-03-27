const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(
  common,
  /** @type { import("webpack").Configuration } */
  {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: "./dist",
      hot: true,
      historyApiFallback: true,
    },
    output: {
      publicPath: "/",
    },
  }
);
