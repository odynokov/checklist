const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.resolve('client/src/bootstrap.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.yaml/,
        use: 'yml-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('client/src/template.html'),
      filename: path.join(path.resolve('dist/index.html'))
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};


module.exports = config;
