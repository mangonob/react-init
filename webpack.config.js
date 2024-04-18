const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

/** @type { import("webpack").Configuration } */
module.exports = (env) => {
  const production = env.production;
  const dotenv = production ? 'production' : 'dev';

  const cssModule = {
    loader: 'css-loader',
    options: {
      modules: {
        auto: true,
        exportLocalsConvention: 'camelCaseOnly',
        localIdentName: production
          ? '[hash:base64]'
          : '[hash:base64:5]__[local]',
      },
    },
  };

  /** @type { import("webpack").Configuration } */
  const common = {
    entry: {
      index: './src/index.tsx',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new WebpackBar(),
      new ForkTsCheckerWebpackPlugin(),
      new Dotenv({
        path: path.resolve(__dirname, `.env.${dotenv}`),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(m?js|tsx?|jsx?)$/,
          loader: 'babel-loader',
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
          generator: {
            filename: 'static/fonts/[hash][ext][query]',
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/images/[hash][ext][query]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },
  };

  /** @type { import("webpack").Configuration } */
  const serve = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
      hot: true,
      historyApiFallback: true,
      allowedHosts: 'all',
      port: 3000,
      client: {
        overlay: false,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      proxy: [
        {
          context: ['/api'],
          target: 'https://hk.warrants.com',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
          headers: {
            referer: 'https://hk.warrants.com',
          },
        },
      ],
    },
    output: {
      publicPath: '/',
    },
  };

  /** @type { import("webpack").Configuration } */
  const build = {
    mode: 'production',
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
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
  };

  if (env.WEBPACK_BUILD) {
    return merge(common, build);
  } else if (env.WEBPACK_SERVE) {
    return merge(common, serve);
  }
};
