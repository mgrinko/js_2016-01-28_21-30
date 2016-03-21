'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname,
    filename: "build.js"
  },
  //
  //externals: {
  //  lodash: '_'
  //},

  watch: true,
  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'js'),
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      }

    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]

};

