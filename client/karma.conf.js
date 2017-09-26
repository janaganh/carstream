const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ENV  = 'test';
const metadata = {
    env : ENV
};

module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','chai'],

    // list of files/patterns to load in the browser
    files: [{ pattern: 'spec.bundle.js', watched: false }, 'src/**/*.html'],

    // files to exclude
    exclude: [],

    plugins: [
      require("karma-chai"),
      require("karma-chrome-launcher"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-sourcemap-loader"),
      require("karma-webpack"),
      require("karma-ng-html2js-preprocessor")
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'], 'src/**/*.html': ['ng-html2js'] },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.js$/, exclude: /node_modules/,use: ['ng-annotate-loader','babel-loader']},
          {test: /\.json$/, use: ['json-loader']},
          {test: /\.html$/, use: ['html-loader']},
          {test: /\.(eot|woff(2)?|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader?name=fonts/[name].[ext]'] },
          {test: /\.(png|jpg)$/, use: 'file-loader?name=images/[name]---[hash].[ext]' },
          {test: /\.css$/,  use: ExtractTextPlugin.extract({fallback:'style-loader', use:['css-loader','postcss-loader']})},
          {test: /\.scss$/, use: ExtractTextPlugin.extract({fallback:'style-loader',
            use:[ {loader:'css-loader',options: {sourceMap: true}},{ loader:'sass-loader', options: {sourceMap: true}}, 'postcss-loader']})}
        ]
      },
      plugins: [
          new ExtractTextPlugin("styles.css"),
          new DefinePlugin({'webpack': {'ENV': JSON.stringify(metadata.env)}})
      ]
    },

    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // if true, Karma runs tests once and exits
    singleRun: true,

    ngHtml2JsPreprocessor: {
      cacheIdFromPath: function(filepath) {
        return  filepath.replace(/src/i, '');
      },
      moduleName: 'templates'
    }
  });
};
