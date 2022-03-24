const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

/** @type { import("webpack").Configuration } */
module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /zh-cn|zh-hk|en/
    ),
  ],
  module: {
    rules: [
      {
        test: /(\.m?js|.tsx?|.jsx?)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
