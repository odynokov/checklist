const path = require('path');
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
        test: /\.js/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('client/src/template.html'),
      filename: path.join(path.resolve('dist/index.html'))
    })
  ]
};


module.exports = config;
