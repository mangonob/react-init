const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(
  common,
  /** @type { import("webpack").Configuration } */
  {
    mode: "production",
    devtool: "source-map",
    devServer: {
      static: "./dist",
      hot: true,
    },
  }
);
