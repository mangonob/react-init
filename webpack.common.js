const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const WebpackBar = require('webpackbar');

const cssModule = {
  loader: 'css-loader',
  options: {
    modules: {
      auto: true,
      exportLocalsConvention: 'camelCaseOnly',
      localIdentName: '[hash:base64]__[local]',
    },
  },
};

/** @type { import("webpack").Configuration } */
module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn|zh-hk|en/
    ),
    new WebpackBar(),
  ],
  cache: {
    type: 'filesystem',
  },
  module: {
    rules: [
      {
        test: /\.(m?js|tsx?|jsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', cssModule],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', cssModule, 'sass-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
