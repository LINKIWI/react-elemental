/* eslint-disable import/no-extraneous-dependencies */

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = [
  {
    mode: isProduction ? 'production' : 'development',
    entry: {
      sample: './entry.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /.+\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [
      new webpack.ProgressPlugin(),
      isProduction && new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      isProduction && new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      isProduction && new HTMLWebpackPlugin({
        template: './index.html',
        title: 'Elemental UI',
        inlineSource: '.js$',
      }),
      isProduction && new HtmlWebpackInlineSourcePlugin(),
    ].filter(Boolean),
  },
  {
    mode: 'production',
    entry: {
      lib: './lib.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /.+\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [
      // Always generate production bundle
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
    externals: {
      react: 'React',
    },
  },
];
