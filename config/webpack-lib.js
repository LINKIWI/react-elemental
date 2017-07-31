/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'react-elemental',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /src\/.+\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
    ],
  },
  externals: {
    react: 'react',
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
    isProduction && new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  ].filter(Boolean),
};
