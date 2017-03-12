'use strict';

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'source-map', // highest quality for debugging
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), // output dir (std)
    publicPath: '/',
    filename: '[name].[chunkhash].js' // use entry point names here / add hash to filename
  },
  plugins: [
    // generate external css file with a hash in filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // hash files using md5 so that their names change when content changes
    new WebpackMd5Hash({ debug: true }),

    // use CommonsChunkPlugin to create separate bundle
    // of vendor libs so that they're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      debug: true
    }),

    // create html file that includes ref to bundled js
    new HtmlWebpackPlugin({
      debug: true,
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // props you def here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: '2ab7f61d7a064e5380cfd1dddcd3b84d'
    }),

    // eliminate duplicate pkgs when generating bundle
    new webpack.optimize.DedupePlugin({ debug: true }),

    // minify js
    new webpack.optimize.UglifyJsPlugin({ debug: true })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap')}
    ]
  }
}
