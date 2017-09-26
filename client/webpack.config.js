const path                     = require('path');
const OccurrenceOrderPlugin    = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const HtmlWebpackPlugin        = require('html-webpack-plugin');
const ExtractTextPlugin        = require('extract-text-webpack-plugin');

module.exports = {
  entry:'./src/app.js',
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/,use: ['ng-annotate-loader','babel-loader']},
      //{test: /\.js$/, enforce: "pre", loader: "eslint-loader", exclude: /node_modules/},
      {test: /\.html$/, use: ['html-loader'] },
      {test: /\.(eot|woff(2)?|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader?name=fonts/[name]---[hash].[ext]'] },
      {test: /\.(png|jpg)$/, use: 'file-loader?name=images/[name]---[hash].[ext]' },
      {test: /\.css$/,  use: ExtractTextPlugin.extract({fallback:'style-loader', use:['css-loader','postcss-loader']})},
      {test: /\.scss$/, use: ExtractTextPlugin.extract({fallback:'style-loader',
         use:[ {loader:'css-loader',options: {sourceMap: true}},{ loader:'sass-loader', options: {sourceMap: true}}, 'postcss-loader']})}
    ]
  },
  output: {
    path    : path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new OccurrenceOrderPlugin(true),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      hash: true
    }),
  ]    
};