const webpackConfig            = require('./webpack.config.js');
const DefinePlugin             = require('webpack/lib/DefinePlugin');
const extend                   = require('extend');

const ENV  = process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8082;

const metadata = {
    env : ENV,
    host: HOST,
    port: PORT
};

const config = extend(true, {}, webpackConfig, {
    devServer: {
        contentBase: 'src',
        historyApiFallback: true,
        host: metadata.host,
        port: metadata.port,
    },
    devtool: 'source-map',
    plugins: webpackConfig.plugins.concat([
        new DefinePlugin({'process': {'env': { 'NODE_ENV': JSON.stringify(metadata.env)}}})
    ])
});

module.exports = config;