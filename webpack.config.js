'use strict'

let path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'application.js'
  },
  resolve: {
    root: path.resolve('./node_modules')
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        cacheDirectory: true
      }
    }]
  }
}
