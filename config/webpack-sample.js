/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    sample: './sample/entry.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /sample\/.+\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    isProduction && new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    isProduction && new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  ].filter(Boolean),
};
