const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

/** @type { import("webpack").Configuration } */
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.ts",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
