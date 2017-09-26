const DefinePlugin             = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin        = require('copy-webpack-plugin');
const UglifyJsPlugin           = require('webpack/lib/optimize/UglifyJsPlugin');
const webpackConfig            = require('./webpack.config');
const extend                   = require('extend');

const ENV = process.env.NODE_ENV || 'production';
const metadata = {
    env: ENV
};

const config = extend(true, {}, webpackConfig, {
    plugins: webpackConfig.plugins.concat([
        new DefinePlugin({'process': {'env': { 'NODE_ENV': JSON.stringify(metadata.env)}}}),
        new UglifyJsPlugin({
            compress: {screw_ie8 : true, warnings: false},
            mangle: {screw_ie8 : true}
        }),
        new CopyWebpackPlugin([{from: './src/index.html', to: 'index.html'}])
    ])
});

module.exports = config;