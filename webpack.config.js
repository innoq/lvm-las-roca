'use strict'

let path = require('path')
let webpack = require('webpack')

module.exports = {
  entry: './frontend/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'application.js'
  },
  resolve: {
    root: path.resolve('./node_modules')
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        cacheDirectory: true
      }
    }]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new webpack.ContextReplacementPlugin(
        /moment[\/\\]locale$/, /de/
    )
  ]
}
